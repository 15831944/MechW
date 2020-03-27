$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bagaSketch = $("#d2");
    let bagaModel = $("#d3");
    let bagad2d3 = $('#d2d3');

    $("#cal").html("<table id='baga'></table>");
    let pg = $("#baga");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/b/a/g/a/BAGA.json", function (result) {

        let BAGADT;
        let BAGA1Category, BAGA1CategoryVal, BAGA1Type, BAGA1TypeVal, BAGA1STD, BAGA1STDVal, BAGA1Name, BAGA1NameVal,
            BAGA2Category, BAGA2CategoryVal, BAGA2Type, BAGA2TypeVal, BAGA2STD, BAGA2STDVal, BAGA2Name, BAGA2NameVal,
            BAGAGCategory, BAGAGCategoryVal, BAGAGType, BAGAGTypeVal, BAGAGSTD, BAGAGSTDVal, BAGAGName, BAGAGNameVal,
            BAGAJCategory, BAGAJCategoryVal, BAGAJType, BAGAJTypeVal, BAGAJSTD, BAGAJSTDVal, BAGAJName, BAGAJNameVal;
        let columns, rows, ed;

        function baga2d(bh = "H", bh1 = "0.6H", bh2 = "0.4H", dgn = "dgn", lg = "Lg") {

            bagaSketch.empty();

            let width = bagaSketch.width();
            let height = bagaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAGA2VG").attr("height", height);

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
                {x: padding + wg - 6 * thk, y: padding + 2.5 * hg},
                {x: padding + wg - thk, y: padding + 2.5 * hg},
                {x: padding + wg - thk, y: padding + 2.5 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.5 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.5 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.5 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.5 * hg}
            ])).classed("sketch", true);

            // 角钢 第二层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.5 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.5 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.5 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.5 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.5 * hg}
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
            ])).attr("id", "BAGASketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGASketchH")
                .attr("startOffset", "50%").text(bh);

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 2.5 * hg, padding + wg - 6 * thk, padding + hg, bh1, "BAGASketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 2.5 * hg, bh2, "BAGASketchBH2");

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
            dimTopH(padding + wg - 4 * thk, padding + hg - 4 * thk - 10, padding + 3 * wg + 4 * thk, padding + hg - 4 * thk - 10, lg, "BAGASketchLG");

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
            ])).attr("id", "BAGASketchDGN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGASketchDGN")
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

        currentTabIndex = bagad2d3.tabs('getTabIndex', bagad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baga2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baga").length > 0) {
                    baga2d();
                }
            });
        }
        bagad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baga2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baga").length > 0) {
                            baga2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "顶边加固、有拉杆、垂直加固、一道水平加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAGAJCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAGAJType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAGAJSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAGAJName);
                }

                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAGAGCategory);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAGAGType);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAGAGSTD);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAGAGName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAGA1Category);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAGA1Type);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAGA1STD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAGA1Name);
                }

                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAGA2Category);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAGA2Type);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAGA2STD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAGA2Name);
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
                    bagaSketch.empty();

                    // model
                    bagaModel.empty();

                    // sketch
                    currentTabIndex = bagad2d3.tabs('getTabIndex', bagad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baga2d();
                        bagaSketch.off("resize").on("resize", function () {
                            if ($("#baga").length > 0) {
                                baga2d();
                            }
                        });
                    }
                    bagad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baga2d();
                                bagaSketch.off("resize").on("resize", function () {
                                    if ($("#baga").length > 0) {
                                        baga2d();
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

                        BAGADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAGAJCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGAJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGAJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGAJName = null;

                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGAGCategory = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGAGType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGAGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGAGName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAGA1Category = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGA1Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGA1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGA1Name = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAGA2Category = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGA2Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGA2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGA2Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGA1Category = [];
                                BAGA2Category = [];
                                BAGAJCategory = [];
                                BAGAGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAGADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAGA1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGA2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGAJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGAGCategory[index] = {
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

                        BAGAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGAJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGAJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGAJCategoryVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGAJType = [];
                                $(result).each(function (index, element) {
                                    BAGAJType[index] = {
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

                        BAGAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGAJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGAJCategoryVal,
                                type: BAGAJTypeVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGAJSTD = [];
                                $(result).each(function (index, element) {
                                    BAGAJSTD[index] = {
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

                        BAGAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGAJCategoryVal,
                                type: BAGAJTypeVal,
                                std: BAGAJSTDVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGAJName = [];
                                $(result).each(function (index, element) {
                                    BAGAJName[index] = {
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

                        BAGAGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGAGType = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGAGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGAGName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGAGCategoryVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGAGType = [];
                                $(result).each(function (index, element) {
                                    BAGAGType[index] = {
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

                        BAGAGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGAGSTD = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGAGName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGAGCategoryVal,
                                type: BAGAGTypeVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGAGSTD = [];
                                $(result).each(function (index, element) {
                                    BAGAGSTD[index] = {
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

                        BAGAGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGAGName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGAGCategoryVal,
                                type: BAGAGTypeVal,
                                std: BAGAGSTDVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGAGName = [];
                                $(result).each(function (index, element) {
                                    BAGAGName[index] = {
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

                        BAGA1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGA1Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGA1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGA1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGA1CategoryVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGA1Type = [];
                                $(result).each(function (index, element) {
                                    BAGA1Type[index] = {
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

                        BAGA1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGA1STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGA1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGA1CategoryVal,
                                type: BAGA1TypeVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGA1STD = [];
                                $(result).each(function (index, element) {
                                    BAGA1STD[index] = {
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

                        BAGA1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGA1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGA1CategoryVal,
                                type: BAGA1TypeVal,
                                std: BAGA1STDVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGA1Name = [];
                                $(result).each(function (index, element) {
                                    BAGA1Name[index] = {
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

                        BAGA2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGA2Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGA2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGA2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGA2CategoryVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGA2Type = [];
                                $(result).each(function (index, element) {
                                    BAGA2Type[index] = {
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

                        BAGA2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGA2STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGA2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGA2CategoryVal,
                                type: BAGA2TypeVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGA2STD = [];
                                $(result).each(function (index, element) {
                                    BAGA2STD[index] = {
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

                        BAGA2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGA2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGA2CategoryVal,
                                type: BAGA2TypeVal,
                                std: BAGA2STDVal,
                                temp: BAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGA2Name = [];
                                $(result).each(function (index, element) {
                                    BAGA2Name[index] = {
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
                    let BAGAD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAGAD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LC
                    let BAGALC;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAGALC = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H
                    let BAGABH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAGALC, 0.1 / 0.6 * BAGALC, 0.1 / 0.4 * BAGALC)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAGALC, 5 / 0.6 * BAGALC, 5 / 0.4 * BAGALC)) {
                        BAGABH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAGALC, 0.1 / 0.6 * BAGALC, 0.1 / 0.4 * BAGALC)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAGALC, 0.1 / 0.6 * BAGALC, 0.1 / 0.4 * BAGALC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAGALC, 5 / 0.6 * BAGALC, 5 / 0.4 * BAGALC)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAGALC, 5 / 0.6 * BAGALC, 5 / 0.4 * BAGALC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2));
                        bagaSketch.off("resize").on("resize", function () {
                            if ($("#baga").length > 0) {
                                baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2));
                            }
                        });
                    }
                    bagad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2));
                                bagaSketch.off("resize").on("resize", function () {
                                    if ($("#baga").length > 0) {
                                        baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // 加固件材料名称
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        BAGAJNameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // ajax 获取 EJT
                    let BAGAEJT;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_e.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAGAJCategoryVal,
                            "type": BAGAJTypeVal,
                            "std": BAGAJSTDVal,
                            "name": BAGAJNameVal,
                            "temp": BAGADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAGAEJT = 1000 * parseFloat(result.et);
                            if (BAGAEJT < 0) {
                                south.html("查询顶边加固件材料弹性模量失败！").css("color", "red");
                                return false;
                            }

                            // 拉杆材料名称
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                BAGAGNameVal = rows[11][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // AJAX 获取材料密度、最大最小厚度
                            let BAGADG, BAGAGThkMin, BAGAGThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAGAGCategoryVal,
                                    "type": BAGAGTypeVal,
                                    "std": BAGAGSTDVal,
                                    "name": BAGAGNameVal,
                                    "temp": BAGADT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAGADG = parseFloat(result.density);
                                    BAGAGThkMin = parseFloat(result.thkMin);
                                    BAGAGThkMax = parseFloat(result.thkMax);

                                    // 拉杆腐蚀裕量 CG2
                                    let BAGACG2;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) < BAGAGThkMax / 2) {
                                        BAGACG2 = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) >= BAGAGThkMax / 2) {
                                        south.html("拉杆腐蚀裕量不能大于等于 " + BAGAGThkMax / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 拉杆名义直径
                                    let BAGADGN;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > Math.max(BAGACG2, BAGAGThkMin)
                                        && parseFloat(rows[13][columns[0][1].field]) <= BAGAGThkMax) {
                                        BAGADGN = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) <= Math.max(BAGACG2, BAGAGThkMin)) {
                                        south.html("拉杆直径不能小于等于 " + Math.max(BAGACG2, BAGAGThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) > BAGAGThkMax) {
                                        south.html("拉杆直径不能大于 " + BAGAGThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2), "Φ" + BAGADGN);
                                        bagaSketch.off("resize").on("resize", function () {
                                            if ($("#baga").length > 0) {
                                                baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2), "Φ" + BAGADGN);
                                            }
                                        });
                                    }
                                    bagad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2), "Φ" + BAGADGN);
                                                bagaSketch.off("resize").on("resize", function () {
                                                    if ($("#baga").length > 0) {
                                                        baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2), "Φ" + BAGADGN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 OGT EGT CG1
                                    let BAGAOGT, BAGAEGT, BAGACG1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAGAGCategoryVal,
                                            "type": BAGAGTypeVal,
                                            "std": BAGAGSTDVal,
                                            "name": BAGAGNameVal,
                                            "thk": BAGADGN,
                                            "temp": BAGADT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAGAOGT = parseFloat(result.ot);
                                            if (BAGAOGT < 0) {
                                                south.html("查询拉杆材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGAEGT = 1000 * parseFloat(result.et);
                                            if (BAGAEGT < 0) {
                                                south.html("查询拉杆材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGACG1 = parseFloat(result.c1);
                                            if (BAGACG1 < 0) {
                                                south.html("查询拉杆材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 拉杆长度 LG
                                            let BAGALG;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) > BAGALC) {
                                                BAGALG = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) <= BAGALC) {
                                                south.html("拉杆长度 LG 不能小于等于 " + BAGALC + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2), "Φ" + BAGADGN, BAGALG);
                                                bagaSketch.off("resize").on("resize", function () {
                                                    if ($("#baga").length > 0) {
                                                        baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2), "Φ" + BAGADGN, BAGALG);
                                                    }
                                                });
                                            }
                                            bagad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2), "Φ" + BAGADGN, BAGALG);
                                                        bagaSketch.off("resize").on("resize", function () {
                                                            if ($("#baga").length > 0) {
                                                                baga2d(BAGABH, (0.6 * BAGABH).toFixed(2), (0.4 * BAGABH).toFixed(2), "Φ" + BAGADGN, BAGALG);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // 第一段壁板材料名称
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                BAGA1NameVal = rows[18][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAGAD1, BAGA1ThkMin, BAGA1ThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAGA1CategoryVal,
                                                    "type": BAGA1TypeVal,
                                                    "std": BAGA1STDVal,
                                                    "name": BAGA1NameVal,
                                                    "temp": BAGADT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAGAD1 = parseFloat(result.density);
                                                    BAGA1ThkMin = parseFloat(result.thkMin);
                                                    BAGA1ThkMax = parseFloat(result.thkMax);

                                                    // 第一层壁板腐蚀裕量 C12
                                                    let BAGAC12;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAGA1ThkMax) {
                                                        BAGAC12 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAGA1ThkMax) {
                                                        south.html("第一段壁板腐蚀裕量不能大于等于 " + BAGA1ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 第一段壁板名义厚度
                                                    let BAGATHK1N;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.max(BAGAC12, BAGA1ThkMin)
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BAGA1ThkMax) {
                                                        BAGATHK1N = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.max(BAGAC12, BAGA1ThkMin)) {
                                                        south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAGAC12, BAGA1ThkMin) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BAGA1ThkMax) {
                                                        south.html("第一段壁板名义厚度不能大于 " + BAGA1ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 O2T E2T C21
                                                    let BAGAO1T, BAGAE1T, BAGAC11;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAGA1CategoryVal,
                                                            "type": BAGA1TypeVal,
                                                            "std": BAGA1STDVal,
                                                            "name": BAGA1NameVal,
                                                            "thk": BAGATHK1N,
                                                            "temp": BAGADT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAGAO1T = parseFloat(result.ot);
                                                            if (BAGAO1T < 0) {
                                                                south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGAE1T = 1000 * parseFloat(result.et);
                                                            if (BAGAE1T < 0) {
                                                                south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGAC11 = parseFloat(result.c1);
                                                            if (BAGAC11 < 0) {
                                                                south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 第二段壁板材料名称
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                BAGA2NameVal = rows[24][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // AJAX 获取材料密度、最大最小厚度
                                                            let BAGAD2, BAGA2ThkMin, BAGA2ThkMax;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAGA2CategoryVal,
                                                                    "type": BAGA2TypeVal,
                                                                    "std": BAGA2STDVal,
                                                                    "name": BAGA2NameVal,
                                                                    "temp": BAGADT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAGAD2 = parseFloat(result.density);
                                                                    BAGA2ThkMin = parseFloat(result.thkMin);
                                                                    BAGA2ThkMax = parseFloat(result.thkMax);

                                                                    // 第二层壁板腐蚀裕量 C22
                                                                    let BAGAC22;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) < BAGA2ThkMax) {
                                                                        BAGAC22 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BAGA2ThkMax) {
                                                                        south.html("第二段壁板腐蚀裕量不能大于等于 " + BAGA2ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第二段壁板名义厚度
                                                                    let BAGATHK2N;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > Math.max(BAGAC22, BAGA2ThkMin)
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= BAGA2ThkMax) {
                                                                        BAGATHK2N = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= Math.max(BAGAC22, BAGA2ThkMin)) {
                                                                        south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAGAC22, BAGA2ThkMin) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > BAGA2ThkMax) {
                                                                        south.html("第二段壁板名义厚度不能大于 " + BAGA2ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // ajax 获取 O2T E2T C21
                                                                    let BAGAO2T, BAGAE2T, BAGAC21;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAGA2CategoryVal,
                                                                            "type": BAGA2TypeVal,
                                                                            "std": BAGA2STDVal,
                                                                            "name": BAGA2NameVal,
                                                                            "thk": BAGATHK2N,
                                                                            "temp": BAGADT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": 100000
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAGAO2T = parseFloat(result.ot);
                                                                            if (BAGAO2T < 0) {
                                                                                south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGAE2T = 1000 * parseFloat(result.et);
                                                                            if (BAGAE2T < 0) {
                                                                                south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGAC21 = parseFloat(result.c1);
                                                                            if (BAGAC21 < 0) {
                                                                                south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 过程参数
                                                                            let BAGAG = 9.81;
                                                                            let BAGAPC = BAGAD * BAGAG * BAGABH / 1000000000;
                                                                            let BAGABHLC = BAGABH / BAGALC;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "ba": BAGABHLC
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    let BAGAALPHA = parseFloat(result.alpha);
                                                                                    let BAGABETA = parseFloat(result.beta);

                                                                                    let BAGACG = BAGACG1 + 2 * BAGACG2;
                                                                                    let BAGADGE = BAGADGN - BAGACG;

                                                                                    let BAGABH1 = 0.6 * BAGABH;
                                                                                    let BAGAC1 = BAGAC11 + BAGAC12;
                                                                                    let BAGATHK1E = BAGATHK1N - BAGAC1;
                                                                                    let BAGABH1LC = BAGABH1 / BAGALC;
                                                                                    let BAGASH1 = BAGABH1;
                                                                                    let BAGAPC1 = BAGAD * BAGAG * BAGASH1 / 1000000000;

                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "ba": BAGABH1LC
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            let BAGAALPHA1 = parseFloat(result.alpha);
                                                                                            let BAGABETA1 = parseFloat(result.beta);

                                                                                            let BAGABH2 = 0.4 * BAGABH;
                                                                                            let BAGAC2 = BAGAC21 + BAGAC22;
                                                                                            let BAGATHK2E = BAGATHK2N - BAGAC2;
                                                                                            let BAGABH2LC = BAGABH2 / BAGALC;
                                                                                            let BAGASH2 = BAGABH1 + BAGABH2;
                                                                                            let BAGAPC2 = BAGAD * BAGAG * BAGASH2 / 1000000000;

                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "ba": BAGABH2LC
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    let BAGAALPHA2 = parseFloat(result.alpha);
                                                                                                    let BAGABETA2 = parseFloat(result.beta);

                                                                                                    // 拉杆校核
                                                                                                    let BAGAOMAX = -1,
                                                                                                        BAGAOMAXCHK = -1,
                                                                                                        BAGADGC = -1,
                                                                                                        BAGADGD = -1,
                                                                                                        BAGADGCHK = -1;
                                                                                                    if (BAGALG >= 363 * Math.pow(BAGADGE, 2 / 3)) {
                                                                                                        BAGADGC = 0.553 * BAGABH * Math.sqrt(BAGAD * BAGAG * BAGALC / BAGAOGT / 1000000000);
                                                                                                        BAGADGD = BAGADGC + 2 * BAGACG2;
                                                                                                        south.html(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "拉杆所需直径：" + (BAGADGD + BAGACG1).toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        if (BAGADGN >= (BAGADGD + BAGACG1)) {
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "输入直径：" + BAGADGN + " mm" +
                                                                                                                "</span>");
                                                                                                            BAGADGCHK = "合格";
                                                                                                        }
                                                                                                        else {
                                                                                                            south.append(
                                                                                                                "<span style='color:red;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "输入直径：" + BAGADGN + " mm" +
                                                                                                                "</span>");
                                                                                                            BAGADGCHK = "不合格";
                                                                                                        }
                                                                                                    }
                                                                                                    else {
                                                                                                        south.html(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "拉杆许用应力：" + BAGAOGT.toFixed(2) + " MPa" +
                                                                                                            "</span>");
                                                                                                        BAGAOMAX = 0.864 * BAGAEGT * BAGADGE * BAGADGE / (BAGALG * BAGALG)
                                                                                                            + BAGADG * BAGAG * BAGALG * BAGALG / BAGADGE / 1000000000
                                                                                                            + 0.306 * BAGAPC * BAGABH * BAGALC / (BAGADGE * BAGADGE);
                                                                                                        if (BAGAOMAX <= BAGAOGT) {
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "实际应力：" + BAGAOMAX.toFixed(4) + " MPa" +
                                                                                                                "</span>");
                                                                                                            BAGAOMAXCHK = "合格";
                                                                                                        } else {
                                                                                                            south.append(
                                                                                                                "<span style='color:red;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "实际应力：" + BAGAOMAX.toFixed(4) + " MPa" +
                                                                                                                "</span>");
                                                                                                            BAGAOMAXCHK = "不合格";
                                                                                                        }
                                                                                                    }

                                                                                                    // 顶边加固件
                                                                                                    let BAGAI0 = 0.217 * BAGAPC1 * BAGASH1 * BAGALC * BAGALC * BAGALC / BAGAEJT;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "顶边加固件所需最小惯性矩：" + BAGAI0.toFixed(2) + " mm⁴" +
                                                                                                        "</span>");

                                                                                                    // 第一段加固柱校核
                                                                                                    let BAGALMAX1 = 0.408 * BAGATHK1E * Math.sqrt(BAGAO1T / (BAGAALPHA * BAGAPC));
                                                                                                    let BAGAZP1 = BAGALC * (0.0642 * BAGAPC * BAGABH * BAGABH / BAGAO1T - BAGATHK1E * BAGATHK1E / 6);

                                                                                                    // 第一段壁板
                                                                                                    let BAGATHK1C = BAGALC * Math.sqrt(3 * BAGAALPHA1 * BAGAPC1 / BAGAO1T);
                                                                                                    let BAGATHK1D = BAGATHK1C + BAGAC12;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第一段壁板所需厚度：" + (BAGATHK1D + BAGAC11).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAGATHK1CHK;
                                                                                                    if (BAGATHK1N >= (BAGATHK1D + BAGAC11)) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAGATHK1N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGATHK1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAGATHK1N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGATHK1CHK = "不合格";
                                                                                                    }

                                                                                                    let BAGAF1ALLOW = 5 * (BAGATHK1E / 2 + Math.sqrt(BAGABH1LC) * BAGALC / 500);
                                                                                                    let BAGAF1MAX = BAGABETA1 * Math.pow(BAGALC, 4) * BAGAPC1 / (2 * BAGAE1T * Math.pow(BAGATHK1E, 3));
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第一段壁板许用挠度：" + BAGAF1ALLOW.toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAGAF1CHK;
                                                                                                    if (BAGAF1MAX <= BAGAF1ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAGAF1MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGAF1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAGAF1MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGAF1CHK = "不合格";
                                                                                                    }

                                                                                                    // 第一道水平加固件
                                                                                                    let BAGAF1 = BAGAPC2 * (BAGASH1 + BAGASH2) / 6;
                                                                                                    let BAGAI1 = 1.3 * BAGAF1 * BAGALC * BAGALC * BAGALC / BAGAEJT;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第一道水平加固件所需最小惯性矩：" + BAGAI1.toFixed(2) + " mm⁴" +
                                                                                                        "</span>");

                                                                                                    // 第二段加固柱校核
                                                                                                    let BAGALMAX2 = 0.408 * BAGATHK2E * Math.sqrt(BAGAO2T / (BAGAALPHA * BAGAPC));
                                                                                                    let BAGAZP2 = BAGALC * (0.0642 * BAGAPC * BAGABH * BAGABH / BAGAO2T - BAGATHK2E * BAGATHK2E / 6);

                                                                                                    // 第二段壁板
                                                                                                    let BAGATHK2C = BAGALC * Math.sqrt(6 * BAGAALPHA2 * (BAGAPC1 + BAGAPC2) / BAGAO2T);
                                                                                                    let BAGATHK2D = BAGATHK2C + BAGAC22;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第二段壁板所需厚度：" + (BAGATHK2D + BAGAC21).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAGATHK2CHK;
                                                                                                    if (BAGATHK2N >= (BAGATHK2D + BAGAC21)) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAGATHK2N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGATHK2CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAGATHK2N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGATHK2CHK = "不合格";
                                                                                                    }

                                                                                                    let BAGAF2ALLOW = 5 * (BAGATHK2E / 2 + Math.sqrt(BAGABH2LC) * BAGALC / 500);
                                                                                                    let BAGAF2MAX = BAGABETA2 * Math.pow(BAGALC, 4) * (BAGAPC1 + BAGAPC2) / (2 * BAGAE2T * Math.pow(BAGATHK2E, 3));

                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第二段壁板许用挠度：" + BAGAF2ALLOW.toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAGAF2CHK;
                                                                                                    if (BAGAF2MAX <= BAGAF2ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAGAF2MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGAF2CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAGAF2MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGAF2CHK = "不合格";
                                                                                                    }

                                                                                                    // 加固柱结果汇总
                                                                                                    let BAGALMAX = Math.min(BAGALMAX1, BAGALMAX2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "垂直加固柱允许最大间距：" + BAGALMAX.toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAGALCCHK;
                                                                                                    if (BAGALC <= BAGALMAX) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际输入间距：" + BAGALC + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGALCCHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际输入间距：" + BAGALC + " mm" +
                                                                                                            "</span>");
                                                                                                        BAGALCCHK = "不合格";
                                                                                                    }
                                                                                                    let BAGAZP = Math.max(BAGAZP1, BAGAZP2);
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "垂直加固柱所需最小截面系数：" + BAGAZP.toFixed(4) + " mm³" +
                                                                                                        "</span>");

                                                                                                    // docx
                                                                                                    let BAGAPayJS = $('#payjs');

                                                                                                    function getDocx() {
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "bagadocx.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                ribbonName: "BAGA",

                                                                                                                t: BAGADT,
                                                                                                                d: BAGAD,
                                                                                                                lc: BAGALC,
                                                                                                                bh: BAGABH,

                                                                                                                jstd: BAGAJSTDVal,
                                                                                                                jname: BAGAJNameVal,

                                                                                                                gstd: BAGAGSTDVal,
                                                                                                                gname: BAGAGNameVal,
                                                                                                                dgn: BAGADGN,
                                                                                                                lg: BAGALG,
                                                                                                                cg2: BAGACG2,

                                                                                                                std1: BAGA1STDVal,
                                                                                                                name1: BAGA1NameVal,
                                                                                                                c12: BAGAC12,
                                                                                                                thk1n: BAGATHK1N,

                                                                                                                std2: BAGA2STDVal,
                                                                                                                name2: BAGA2NameVal,
                                                                                                                c22: BAGAC22,
                                                                                                                thk2n: BAGATHK2N,

                                                                                                                d1: BAGAD1.toFixed(4),
                                                                                                                c11: BAGAC11.toFixed(4),
                                                                                                                o1t: BAGAO1T.toFixed(4),
                                                                                                                e1t: (BAGAE1T / 1000).toFixed(4),

                                                                                                                d2: BAGAD2.toFixed(4),
                                                                                                                c21: BAGAC21.toFixed(4),
                                                                                                                o2t: BAGAO2T.toFixed(4),
                                                                                                                e2t: (BAGAE2T / 1000).toFixed(4),

                                                                                                                dg: BAGADG.toFixed(4),
                                                                                                                cg1: BAGACG1.toFixed(4),
                                                                                                                ogt: BAGAOGT.toFixed(4),
                                                                                                                egt: (BAGAEGT / 1000).toFixed(4),

                                                                                                                ejt: (BAGAEJT / 1000).toFixed(4),

                                                                                                                g: BAGAG.toFixed(4),
                                                                                                                pc: BAGAPC.toFixed(4),
                                                                                                                bhlc: BAGABHLC.toFixed(4),
                                                                                                                alpha: BAGAALPHA.toFixed(8),
                                                                                                                beta: BAGABETA.toFixed(8),

                                                                                                                cg: BAGACG.toFixed(4),
                                                                                                                dge: BAGADGE.toFixed(4),

                                                                                                                bh1: BAGABH1.toFixed(4),
                                                                                                                c1: BAGAC1.toFixed(4),
                                                                                                                thk1e: BAGATHK1E.toFixed(4),
                                                                                                                bh1lc: BAGABH1LC.toFixed(4),
                                                                                                                alpha1: BAGAALPHA1.toFixed(8),
                                                                                                                beta1: BAGABETA1.toFixed(8),
                                                                                                                sh1: BAGASH1.toFixed(4),
                                                                                                                pc1: BAGAPC1.toFixed(4),

                                                                                                                bh2: BAGABH2.toFixed(4),
                                                                                                                c2: BAGAC2.toFixed(4),
                                                                                                                thk2e: BAGATHK2E.toFixed(4),
                                                                                                                bh2lc: BAGABH2LC.toFixed(4),
                                                                                                                alpha2: BAGAALPHA2.toFixed(8),
                                                                                                                beta2: BAGABETA2.toFixed(8),
                                                                                                                sh2: BAGASH2.toFixed(4),
                                                                                                                pc2: BAGAPC2.toFixed(4),

                                                                                                                dgc: BAGADGC.toFixed(4),
                                                                                                                dgd: BAGADGD.toFixed(4),
                                                                                                                dgchk: BAGADGCHK,

                                                                                                                omax: BAGAOMAX.toFixed(4),
                                                                                                                omaxchk: BAGAOMAXCHK,

                                                                                                                i0: BAGAI0.toFixed(4),

                                                                                                                lmax1: BAGALMAX1.toFixed(4),
                                                                                                                zp1: BAGAZP1.toFixed(4),

                                                                                                                thk1c: BAGATHK1C.toFixed(4),
                                                                                                                thk1d: BAGATHK1D.toFixed(4),
                                                                                                                thk1chk: BAGATHK1CHK,
                                                                                                                f1allow: BAGAF1ALLOW.toFixed(4),
                                                                                                                f1max: BAGAF1MAX.toFixed(4),
                                                                                                                f1chk: BAGAF1CHK,

                                                                                                                f1: BAGAF1.toFixed(4),
                                                                                                                i1: BAGAI1.toFixed(4),

                                                                                                                lmax2: BAGALMAX2.toFixed(4),
                                                                                                                zp2: BAGAZP2.toFixed(4),

                                                                                                                thk2c: BAGATHK2C.toFixed(4),
                                                                                                                thk2d: BAGATHK2D.toFixed(4),
                                                                                                                thk2chk: BAGATHK2CHK,
                                                                                                                f2allow: BAGAF2ALLOW.toFixed(4),
                                                                                                                f2max: BAGAF2MAX.toFixed(4),
                                                                                                                f2chk: BAGAF2CHK,

                                                                                                                lmax: BAGALMAX.toFixed(4),
                                                                                                                lcchk: BAGALCCHK,
                                                                                                                zp: BAGAZP.toFixed(4)
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
                                                                                                                    BAGAPayJS.dialog({
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
                                                                                                                                BAGAPayJS.dialog("close");
                                                                                                                                BAGAPayJS.dialog("clear");
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
                                                                                                                                            BAGAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                    BAGAPayJS.dialog('close');
                                                                                                                                                    BAGAPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});