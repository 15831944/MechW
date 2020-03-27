$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");
    let baghSketch = $("#d2");
    let baghModel = $("#d3");
    let baghd2d3 = $('#d2d3');
    $("#cal").html("<table id='bagh'></table>");
    let pg = $("#bagh");
    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/b/a/g/h/BAGH.json", function (result) {

        let BAGHDT;
        let BAGH1Category, BAGH1CategoryVal, BAGH1Type, BAGH1TypeVal, BAGH1STD, BAGH1STDVal, BAGH1Name, BAGH1NameVal,
            BAGH2Category, BAGH2CategoryVal, BAGH2Type, BAGH2TypeVal, BAGH2STD, BAGH2STDVal, BAGH2Name, BAGH2NameVal,
            BAGH3Category, BAGH3CategoryVal, BAGH3Type, BAGH3TypeVal, BAGH3STD, BAGH3STDVal, BAGH3Name, BAGH3NameVal,
            BAGH4Category, BAGH4CategoryVal, BAGH4Type, BAGH4TypeVal, BAGH4STD, BAGH4STDVal, BAGH4Name, BAGH4NameVal,
            BAGH5Category, BAGH5CategoryVal, BAGH5Type, BAGH5TypeVal, BAGH5STD, BAGH5STDVal, BAGH5Name, BAGH5NameVal,
            BAGHJCategory, BAGHJCategoryVal, BAGHJType, BAGHJTypeVal, BAGHJSTD, BAGHJSTDVal, BAGHJName, BAGHJNameVal;
        let columns, rows, ed;

        function bagh2d(bh = "H", bh1 = "0.31H", bh2 = "0.21H", bh3 = "0.18H", bh4 = "0.16H", bh5 = "0.14H", l = "L") {

            baghSketch.empty();

            let width = baghSketch.width();
            let height = baghSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAGH2VG").attr("height", height);

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
            let padding = 50;
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
                {x: padding + wg - thk, y: padding + thk},
                {x: padding + wg, y: padding + thk},
                {x: padding + wg, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: padding + thk},
                {x: padding + 3 * wg + thk, y: padding + thk},
                {x: padding + 3 * wg + thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + thk},
                {x: padding + 3 * wg, y: padding + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding},
                {x: padding + 3 * wg + thk, y: padding}
            ])).classed("sketch", true);

            // 角钢 第一层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding},
                {x: padding + wg - thk, y: padding},
                {x: padding + wg - thk, y: padding + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + thk},
                {x: padding + wg - 6 * thk, y: padding + thk},
                {x: padding + wg - 6 * thk, y: padding}
            ])).classed("sketch", true);

            // 角钢 第一层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding},
                {x: padding + 3 * wg + thk, y: padding},
                {x: padding + 3 * wg + thk, y: padding + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding}
            ])).classed("sketch", true);

            // 角钢 第二层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 1.2 * hg},
                {x: padding + wg - thk, y: padding + 1.2 * hg},
                {x: padding + wg - thk, y: padding + 1.2 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 1.2 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 1.2 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 1.2 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 1.2 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 1.2 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.2 * hg}
            ])).classed("sketch", true);

            // 角钢 第二层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.2 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.2 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.2 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.2 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.2 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.2 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.2 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 左
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

            // 角钢 第三层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.1 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.1 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.1 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.1 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.1 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.1 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.1 * hg}
            ])).classed("sketch", true);

            // 角钢 第四层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 2.8 * hg},
                {x: padding + wg - thk, y: padding + 2.8 * hg},
                {x: padding + wg - thk, y: padding + 2.8 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.8 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.8 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.8 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.8 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.8 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.8 * hg}
            ])).classed("sketch", true);

            // 角钢 第四层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.8 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.8 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.8 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.8 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.8 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.8 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.8 * hg}
            ])).classed("sketch", true);

            // 角钢 第五层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 3.4 * hg},
                {x: padding + wg - thk, y: padding + 3.4 * hg},
                {x: padding + wg - thk, y: padding + 3.4 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.4 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.4 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.4 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.4 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3.4 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.4 * hg}
            ])).classed("sketch", true);

            // 角钢 第五层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.4 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.4 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.4 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.4 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.4 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.4 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.4 * hg}
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
                    {x: padding + 2.5 * wg, y: padding},
                    {x: padding + 2.5 * wg + 3, y: padding + 15},
                    {x: padding + 2.5 * wg - 3, y: padding + 15},
                    {x: padding + 2.5 * wg, y: padding}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: height - padding - 15},
                {x: padding + 2.5 * wg, y: padding + 15}
            ])).attr("id", "BAGHSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGHSketchH")
                .attr("startOffset", "50%").text(bh);

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 1.2 * hg, padding + wg - 6 * thk, padding, bh1, "BAGHSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 2.1 * hg, padding + wg - 6 * thk, padding + 1.2 * hg, bh2, "BAGHSketchBH2");

            // BH3
            dimLeftV(padding + wg - 6 * thk, padding + 2.8 * hg, padding + wg - 6 * thk, padding + 2.1 * hg, bh3, "BAGHSketchBH3");

            // BH4
            dimLeftV(padding + wg - 6 * thk, padding + 3.4 * hg, padding + wg - 6 * thk, padding + 2.8 * hg, bh4, "BAGHSketchBH4");

            // BH5
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3.4 * hg, bh5, "BAGHSketchBH5");

            // 垂直加固柱
            drawLine(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + thk);
            drawLine(padding + 3 * wg + 6 * thk, height - padding, padding + 3 * wg + 6 * thk, padding + thk);

            // L
            dimBottomH(padding + wg, height - padding, padding + 3 * wg, height - padding, l, "BAGHSketchL");
        }

        currentTabIndex = baghd2d3.tabs('getTabIndex', baghd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bagh2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bagh").length > 0) {
                    bagh2d();
                }
            });
        }
        baghd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bagh2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bagh").length > 0) {
                            bagh2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "顶边加固、无拉杆、垂直加固、四道水平加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAGHJCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAGHJType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAGHJSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAGHJName);
                }

                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAGH1Category);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAGH1Type);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAGH1STD);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAGH1Name);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAGH2Category);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAGH2Type);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAGH2STD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAGH2Name);
                }

                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAGH3Category);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAGH3Type);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAGH3STD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAGH3Name);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", BAGH4Category);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAGH4Type);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAGH4STD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAGH4Name);
                }

                else if (index === 33) {
                    $(ed.target).combobox("loadData", BAGH5Category);
                }
                else if (index === 34) {
                    $(ed.target).combobox("loadData", BAGH5Type);
                }
                else if (index === 35) {
                    $(ed.target).combobox("loadData", BAGH5STD);
                }
                else if (index === 36) {
                    $(ed.target).combobox("loadData", BAGH5Name);
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
                    baghSketch.empty();

                    // model
                    baghModel.empty();

                    // sketch
                    currentTabIndex = baghd2d3.tabs('getTabIndex', baghd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagh2d();
                        baghSketch.off("resize").on("resize", function () {
                            if ($("#bagh").length > 0) {
                                bagh2d();
                            }
                        });
                    }
                    baghd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagh2d();
                                baghSketch.off("resize").on("resize", function () {
                                    if ($("#bagh").length > 0) {
                                        bagh2d();
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

                        BAGHDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGHJCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGHJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGHJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGHJName = null;

                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGH1Category = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGH1Type = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGH1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGH1Name = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAGH2Category = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGH2Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGH2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGH2Name = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAGH3Category = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGH3Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGH3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGH3Name = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BAGH4Category = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGH4Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGH4STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGH4Name = null;

                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        BAGH5Category = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAGH5Type = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGH5STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGH5Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH1Category = [];
                                BAGH2Category = [];
                                BAGH3Category = [];
                                BAGH4Category = [];
                                BAGH5Category = [];
                                BAGHJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAGHDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAGH1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGH2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGH3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGH4Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGH5Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGHJCategory[index] = {
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

                        BAGHJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGHJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGHJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGHJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGHJCategoryVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGHJType = [];
                                $(result).each(function (index, element) {
                                    BAGHJType[index] = {
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
                    if (index === 6) {

                        BAGHJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGHJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGHJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGHJCategoryVal,
                                type: BAGHJTypeVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGHJSTD = [];
                                $(result).each(function (index, element) {
                                    BAGHJSTD[index] = {
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
                    if (index === 7) {

                        BAGHJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGHJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGHJCategoryVal,
                                type: BAGHJTypeVal,
                                std: BAGHJSTDVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGHJName = [];
                                $(result).each(function (index, element) {
                                    BAGHJName[index] = {
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

                    if (index === 9) {

                        BAGH1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGH1Type = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGH1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGH1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH1CategoryVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH1Type = [];
                                $(result).each(function (index, element) {
                                    BAGH1Type[index] = {
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
                    if (index === 10) {

                        BAGH1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGH1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGH1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH1CategoryVal,
                                type: BAGH1TypeVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH1STD = [];
                                $(result).each(function (index, element) {
                                    BAGH1STD[index] = {
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
                    if (index === 11) {

                        BAGH1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGH1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH1CategoryVal,
                                type: BAGH1TypeVal,
                                std: BAGH1STDVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH1Name = [];
                                $(result).each(function (index, element) {
                                    BAGH1Name[index] = {
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

                        BAGH2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGH2Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGH2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGH2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH2CategoryVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH2Type = [];
                                $(result).each(function (index, element) {
                                    BAGH2Type[index] = {
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

                        BAGH2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGH2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGH2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH2CategoryVal,
                                type: BAGH2TypeVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH2STD = [];
                                $(result).each(function (index, element) {
                                    BAGH2STD[index] = {
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

                        BAGH2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGH2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH2CategoryVal,
                                type: BAGH2TypeVal,
                                std: BAGH2STDVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH2Name = [];
                                $(result).each(function (index, element) {
                                    BAGH2Name[index] = {
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

                        BAGH3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGH3Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGH3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGH3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH3CategoryVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH3Type = [];
                                $(result).each(function (index, element) {
                                    BAGH3Type[index] = {
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

                        BAGH3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGH3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGH3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH3CategoryVal,
                                type: BAGH3TypeVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH3STD = [];
                                $(result).each(function (index, element) {
                                    BAGH3STD[index] = {
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

                        BAGH3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGH3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH3CategoryVal,
                                type: BAGH3TypeVal,
                                std: BAGH3STDVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH3Name = [];
                                $(result).each(function (index, element) {
                                    BAGH3Name[index] = {
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

                        BAGH4CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGH4Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGH4STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGH4Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH4CategoryVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH4Type = [];
                                $(result).each(function (index, element) {
                                    BAGH4Type[index] = {
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

                        BAGH4TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGH4STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGH4Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH4CategoryVal,
                                type: BAGH4TypeVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH4STD = [];
                                $(result).each(function (index, element) {
                                    BAGH4STD[index] = {
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

                        BAGH4STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGH4Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH4CategoryVal,
                                type: BAGH4TypeVal,
                                std: BAGH4STDVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH4Name = [];
                                $(result).each(function (index, element) {
                                    BAGH4Name[index] = {
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

                        BAGH5CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAGH5Type = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGH5STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGH5Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH5CategoryVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH5Type = [];
                                $(result).each(function (index, element) {
                                    BAGH5Type[index] = {
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

                        BAGH5TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAGH5STD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGH5Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH5CategoryVal,
                                type: BAGH5TypeVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH5STD = [];
                                $(result).each(function (index, element) {
                                    BAGH5STD[index] = {
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

                        BAGH5STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAGH5Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGH5CategoryVal,
                                type: BAGH5TypeVal,
                                std: BAGH5STDVal,
                                temp: BAGHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGH5Name = [];
                                $(result).each(function (index, element) {
                                    BAGH5Name[index] = {
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
                    let BAGHD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAGHD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LC
                    let BAGHLC;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAGHLC = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H
                    let BAGHBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAGHLC, 0.1 / 0.31 * BAGHLC, 0.1 / 0.21 * BAGHLC, 0.1 / 0.18 * BAGHLC, 0.1 / 0.16 * BAGHLC, 0.1 / 0.14 * BAGHLC)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAGHLC, 5 / 0.31 * BAGHLC, 5 / 0.21 * BAGHLC, 5 / 0.18 * BAGHLC, 5 / 0.16 * BAGHLC, 5 / 0.14 * BAGHLC)) {
                        BAGHBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAGHLC, 0.1 / 0.31 * BAGHLC, 0.1 / 0.21 * BAGHLC, 0.1 / 0.18 * BAGHLC, 0.1 / 0.16 * BAGHLC, 0.1 / 0.14 * BAGHLC)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAGHLC, 0.1 / 0.31 * BAGHLC, 0.1 / 0.21 * BAGHLC, 0.1 / 0.18 * BAGHLC, 0.1 / 0.16 * BAGHLC, 0.1 / 0.14 * BAGHLC).toFixed(2) + " mm")
                            .css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAGHLC, 5 / 0.31 * BAGHLC, 5 / 0.21 * BAGHLC, 5 / 0.18 * BAGHLC, 5 / 0.16 * BAGHLC, 5 / 0.14 * BAGHLC)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAGHLC, 5 / 0.31 * BAGHLC, 5 / 0.21 * BAGHLC, 5 / 0.18 * BAGHLC, 5 / 0.16 * BAGHLC, 5 / 0.14 * BAGHLC).toFixed(2) + " mm")
                            .css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagh2d(BAGHBH, (0.31 * BAGHBH).toFixed(2), (0.21 * BAGHBH).toFixed(2), (0.18 * BAGHBH).toFixed(2), (0.16 * BAGHBH).toFixed(2), (0.14 * BAGHBH).toFixed(2));
                        baghSketch.off("resize").on("resize", function () {
                            if ($("#bagh").length > 0) {
                                bagh2d(BAGHBH, (0.31 * BAGHBH).toFixed(2), (0.21 * BAGHBH).toFixed(2), (0.18 * BAGHBH).toFixed(2), (0.16 * BAGHBH).toFixed(2), (0.14 * BAGHBH).toFixed(2));
                            }
                        });
                    }
                    baghd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagh2d(BAGHBH, (0.31 * BAGHBH).toFixed(2), (0.21 * BAGHBH).toFixed(2), (0.18 * BAGHBH).toFixed(2), (0.16 * BAGHBH).toFixed(2), (0.14 * BAGHBH).toFixed(2));
                                baghSketch.off("resize").on("resize", function () {
                                    if ($("#bagh").length > 0) {
                                        bagh2d(BAGHBH, (0.31 * BAGHBH).toFixed(2), (0.21 * BAGHBH).toFixed(2), (0.18 * BAGHBH).toFixed(2), (0.16 * BAGHBH).toFixed(2), (0.14 * BAGHBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // L
                    let BAGHL;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])
                        && parseFloat(rows[4][columns[0][1].field]) >= BAGHLC) {
                        BAGHL = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])
                        && parseFloat(rows[4][columns[0][1].field]) < BAGHLC) {
                        south.html("壁板宽度 L 不能小于 " + BAGHLC + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagh2d(BAGHBH, (0.31 * BAGHBH).toFixed(2), (0.21 * BAGHBH).toFixed(2), (0.18 * BAGHBH).toFixed(2), (0.16 * BAGHBH).toFixed(2), (0.14 * BAGHBH).toFixed(2), BAGHL);
                        baghSketch.off("resize").on("resize", function () {
                            if ($("#bagh").length > 0) {
                                bagh2d(BAGHBH, (0.31 * BAGHBH).toFixed(2), (0.21 * BAGHBH).toFixed(2), (0.18 * BAGHBH).toFixed(2), (0.16 * BAGHBH).toFixed(2), (0.14 * BAGHBH).toFixed(2), BAGHL);
                            }
                        });
                    }
                    baghd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagh2d(BAGHBH, (0.31 * BAGHBH).toFixed(2), (0.21 * BAGHBH).toFixed(2), (0.18 * BAGHBH).toFixed(2), (0.16 * BAGHBH).toFixed(2), (0.14 * BAGHBH).toFixed(2), BAGHL);
                                baghSketch.off("resize").on("resize", function () {
                                    if ($("#bagh").length > 0) {
                                        bagh2d(BAGHBH, (0.31 * BAGHBH).toFixed(2), (0.21 * BAGHBH).toFixed(2), (0.18 * BAGHBH).toFixed(2), (0.16 * BAGHBH).toFixed(2), (0.14 * BAGHBH).toFixed(2), BAGHL);
                                    }
                                });
                            }
                        }
                    });

                    // 加固件材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        BAGHJNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // ajax 获取 EJT
                    let BAGHEJT;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_e.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAGHJCategoryVal,
                            "type": BAGHJTypeVal,
                            "std": BAGHJSTDVal,
                            "name": BAGHJNameVal,
                            "temp": BAGHDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAGHEJT = 1000 * parseFloat(result.et);
                            if (BAGHEJT < 0) {
                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                return false;
                            }

                            // 第一段壁板材料名称
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                BAGH1NameVal = rows[12][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // AJAX 获取材料密度、最大最小厚度
                            let BAGHD1, BAGH1ThkMin, BAGH1ThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAGH1CategoryVal,
                                    "type": BAGH1TypeVal,
                                    "std": BAGH1STDVal,
                                    "name": BAGH1NameVal,
                                    "temp": BAGHDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAGHD1 = parseFloat(result.density);
                                    BAGH1ThkMin = parseFloat(result.thkMin);
                                    BAGH1ThkMax = parseFloat(result.thkMax);

                                    // 第一层壁板腐蚀裕量 C12
                                    let BAGHC12;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < BAGH1ThkMax) {
                                        BAGHC12 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= BAGH1ThkMax) {
                                        south.html("第一段壁板腐蚀裕量不能大于等于 " + BAGH1ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 第一段壁板名义厚度
                                    let BAGHTHK1N;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) > Math.max(BAGHC12, BAGH1ThkMin)
                                        && parseFloat(rows[14][columns[0][1].field]) <= BAGH1ThkMax) {
                                        BAGHTHK1N = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) <= Math.max(BAGHC12, BAGH1ThkMin)) {
                                        south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAGHC12, BAGH1ThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) > BAGH1ThkMax) {
                                        south.html("第一段壁板名义厚度不能大于 " + BAGH1ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // ajax 获取 O1T E1T C11
                                    let BAGHO1T, BAGHE1T, BAGHC11;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAGH1CategoryVal,
                                            "type": BAGH1TypeVal,
                                            "std": BAGH1STDVal,
                                            "name": BAGH1NameVal,
                                            "thk": BAGHTHK1N,
                                            "temp": BAGHDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAGHO1T = parseFloat(result.ot);
                                            if (BAGHO1T < 0) {
                                                south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGHE1T = 1000 * parseFloat(result.et);
                                            if (BAGHE1T < 0) {
                                                south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGHC11 = parseFloat(result.c1);
                                            if (BAGHC11 < 0) {
                                                south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 第二段壁板材料名称
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                BAGH2NameVal = rows[18][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAGHD2, BAGH2ThkMin, BAGH2ThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAGH2CategoryVal,
                                                    "type": BAGH2TypeVal,
                                                    "std": BAGH2STDVal,
                                                    "name": BAGH2NameVal,
                                                    "temp": BAGHDT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAGHD2 = parseFloat(result.density);
                                                    BAGH2ThkMin = parseFloat(result.thkMin);
                                                    BAGH2ThkMax = parseFloat(result.thkMax);

                                                    // 第二层壁板腐蚀裕量 C22
                                                    let BAGHC22;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAGH2ThkMax) {
                                                        BAGHC22 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAGH2ThkMax) {
                                                        south.html("第二段壁板腐蚀裕量不能大于等于 " + BAGH2ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 第二段壁板名义厚度
                                                    let BAGHTHK2N;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.max(BAGHC22, BAGH2ThkMin)
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BAGH2ThkMax) {
                                                        BAGHTHK2N = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.max(BAGHC22, BAGH2ThkMin)) {
                                                        south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAGHC22, BAGH2ThkMin) + " mm")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BAGH2ThkMax) {
                                                        south.html("第二段壁板名义厚度不能大于 " + BAGH2ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 O2T E2T C21
                                                    let BAGHO2T, BAGHE2T, BAGHC21;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAGH2CategoryVal,
                                                            "type": BAGH2TypeVal,
                                                            "std": BAGH2STDVal,
                                                            "name": BAGH2NameVal,
                                                            "thk": BAGHTHK2N,
                                                            "temp": BAGHDT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAGHO2T = parseFloat(result.ot);
                                                            if (BAGHO2T < 0) {
                                                                south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGHE2T = 1000 * parseFloat(result.et);
                                                            if (BAGHE2T < 0) {
                                                                south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGHC21 = parseFloat(result.c1);
                                                            if (BAGHC21 < 0) {
                                                                south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 第三段壁板材料名称
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                BAGH3NameVal = rows[24][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // AJAX 获取材料密度、最大最小厚度
                                                            let BAGHD3, BAGH3ThkMin, BAGH3ThkMax;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAGH3CategoryVal,
                                                                    "type": BAGH3TypeVal,
                                                                    "std": BAGH3STDVal,
                                                                    "name": BAGH3NameVal,
                                                                    "temp": BAGHDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAGHD3 = parseFloat(result.density);
                                                                    BAGH3ThkMin = parseFloat(result.thkMin);
                                                                    BAGH3ThkMax = parseFloat(result.thkMax);

                                                                    // 第三层壁板腐蚀裕量 C32
                                                                    let BAGHC32;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) < BAGH3ThkMax) {
                                                                        BAGHC32 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BAGH3ThkMax) {
                                                                        south.html("第三段壁板腐蚀裕量不能大于等于 " + BAGH3ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第三段壁板名义厚度
                                                                    let BAGHTHK3N;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > Math.max(BAGHC32, BAGH3ThkMin)
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= BAGH3ThkMax) {
                                                                        BAGHTHK3N = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= Math.max(BAGHC32, BAGH3ThkMin)) {
                                                                        south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAGHC32, BAGH3ThkMin) + " mm")
                                                                            .css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > BAGH3ThkMax) {
                                                                        south.html("第三段壁板名义厚度不能大于 " + BAGH3ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // ajax 获取 O3T E3T C31
                                                                    let BAGHO3T, BAGHE3T, BAGHC31;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAGH3CategoryVal,
                                                                            "type": BAGH3TypeVal,
                                                                            "std": BAGH3STDVal,
                                                                            "name": BAGH3NameVal,
                                                                            "thk": BAGHTHK3N,
                                                                            "temp": BAGHDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": 100000
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAGHO3T = parseFloat(result.ot);
                                                                            if (BAGHO3T < 0) {
                                                                                south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGHE3T = 1000 * parseFloat(result.et);
                                                                            if (BAGHE3T < 0) {
                                                                                south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGHC31 = parseFloat(result.c1);
                                                                            if (BAGHC31 < 0) {
                                                                                south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 第四段壁板材料名称
                                                                            if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                                BAGH4NameVal = rows[30][columns[0][1].field];
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                            let BAGHD4, BAGH4ThkMin, BAGH4ThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAGH4CategoryVal,
                                                                                    "type": BAGH4TypeVal,
                                                                                    "std": BAGH4STDVal,
                                                                                    "name": BAGH4NameVal,
                                                                                    "temp": BAGHDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAGHD4 = parseFloat(result.density);
                                                                                    BAGH4ThkMin = parseFloat(result.thkMin);
                                                                                    BAGH4ThkMax = parseFloat(result.thkMax);

                                                                                    // 第四层壁板腐蚀裕量 C42
                                                                                    let BAGHC42;
                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) < BAGH4ThkMax) {
                                                                                        BAGHC42 = parseFloat(rows[31][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= BAGH4ThkMax) {
                                                                                        south.html("第四段壁板腐蚀裕量不能大于等于 " + BAGH4ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // 第四段壁板名义厚度
                                                                                    let BAGHTHK4N
                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > Math.max(BAGHC42, BAGH4ThkMin)
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= BAGH4ThkMax) {
                                                                                        BAGHTHK4N = parseFloat(rows[32][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= Math.max(BAGHC42, BAGH4ThkMin)) {
                                                                                        south.html("第四段壁板名义厚度不能小于等于 " + Math.max(BAGHC42, BAGH4ThkMin) + " mm")
                                                                                            .css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > BAGH4ThkMax) {
                                                                                        south.html("第四段壁板名义厚度不能大于 " + BAGH4ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // ajax 获取 O4T E4T C41
                                                                                    let BAGHO4T, BAGHE4T, BAGHC41;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": BAGH4CategoryVal,
                                                                                            "type": BAGH4TypeVal,
                                                                                            "std": BAGH4STDVal,
                                                                                            "name": BAGH4NameVal,
                                                                                            "thk": BAGHTHK4N,
                                                                                            "temp": BAGHDT,
                                                                                            "highLow": 3,
                                                                                            "isTube": 0,
                                                                                            "od": 100000
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            BAGHO4T = parseFloat(result.ot);
                                                                                            if (BAGHO4T < 0) {
                                                                                                south.html("查询第四段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGHE4T = 1000 * parseFloat(result.et);
                                                                                            if (BAGHE4T < 0) {
                                                                                                south.html("查询第四段壁板材料弹性模量失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGHC41 = parseFloat(result.c1);
                                                                                            if (BAGHC41 < 0) {
                                                                                                south.html("查询第四段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                return false;
                                                                                            }

                                                                                            // 第五段壁板材料名称
                                                                                            if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                                                                BAGH5NameVal = rows[36][columns[0][1].field];
                                                                                            }
                                                                                            else {
                                                                                                return false;
                                                                                            }

                                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                                            let BAGHD5, BAGH5ThkMin,
                                                                                                BAGH5ThkMax;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BAGH5CategoryVal,
                                                                                                    "type": BAGH5TypeVal,
                                                                                                    "std": BAGH5STDVal,
                                                                                                    "name": BAGH5NameVal,
                                                                                                    "temp": BAGHDT
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BAGHD5 = parseFloat(result.density);
                                                                                                    BAGH5ThkMin = parseFloat(result.thkMin);
                                                                                                    BAGH5ThkMax = parseFloat(result.thkMax);

                                                                                                    // 第五层壁板腐蚀裕量 C52
                                                                                                    let BAGHC52;
                                                                                                    if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                                        && parseFloat(rows[37][columns[0][1].field]) < BAGH5ThkMax) {
                                                                                                        BAGHC52 = parseFloat(rows[37][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                                                        && parseFloat(rows[37][columns[0][1].field]) >= BAGH5ThkMax) {
                                                                                                        south.html("第五段壁板腐蚀裕量不能大于等于 " + BAGH5ThkMax + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 第五段壁板名义厚度
                                                                                                    let BAGHTHK5N;
                                                                                                    if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) > Math.max(BAGHC52, BAGH5ThkMin)
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) <= BAGH5ThkMax) {
                                                                                                        BAGHTHK5N = parseFloat(rows[38][columns[0][1].field]);
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) <= Math.max(BAGHC52, BAGH5ThkMin)) {
                                                                                                        south.html("第五段壁板名义厚度不能小于等于 " + Math.max(BAGHC52, BAGH5ThkMin) + " mm")
                                                                                                            .css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                                                        && parseFloat(rows[38][columns[0][1].field]) > BAGH5ThkMax) {
                                                                                                        south.html("第五段壁板名义厚度不能大于 " + BAGH5ThkMax + " mm").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // ajax 获取 O5T E5T C51
                                                                                                    let BAGHO5T,
                                                                                                        BAGHE5T,
                                                                                                        BAGHC51;
                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "category": BAGH5CategoryVal,
                                                                                                            "type": BAGH5TypeVal,
                                                                                                            "std": BAGH5STDVal,
                                                                                                            "name": BAGH5NameVal,
                                                                                                            "thk": BAGHTHK5N,
                                                                                                            "temp": BAGHDT,
                                                                                                            "highLow": 3,
                                                                                                            "isTube": 0,
                                                                                                            "od": 100000
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            BAGHO5T = parseFloat(result.ot);
                                                                                                            if (BAGHO5T < 0) {
                                                                                                                south.html("查询第五段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            BAGHE5T = 1000 * parseFloat(result.et);
                                                                                                            if (BAGHE5T < 0) {
                                                                                                                south.html("查询第五段壁板材料弹性模量失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }
                                                                                                            BAGHC51 = parseFloat(result.c1);
                                                                                                            if (BAGHC51 < 0) {
                                                                                                                south.html("查询第五段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }

                                                                                                            // 过程参数
                                                                                                            let BAGHG = 9.81;
                                                                                                            let BAGHPC = BAGHD * BAGHG * BAGHBH / 1000000000;
                                                                                                            let BAGHBHLC = BAGHBH / BAGHLC;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "ba": BAGHBHLC
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    let BAGHALPHA = parseFloat(result.alpha);
                                                                                                                    let BAGHBETA = parseFloat(result.beta);

                                                                                                                    let BAGHBH1 = 0.31 * BAGHBH;
                                                                                                                    let BAGHC1 = BAGHC11 + BAGHC12;
                                                                                                                    let BAGHTHK1E = BAGHTHK1N - BAGHC1;
                                                                                                                    let BAGHBH1LC = BAGHBH1 / BAGHLC;
                                                                                                                    let BAGHSH1 = BAGHBH1;
                                                                                                                    let BAGHPC1 = BAGHD * BAGHG * BAGHSH1 / 1000000000;

                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "ba": BAGHBH1LC
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            let BAGHALPHA1 = parseFloat(result.alpha);
                                                                                                                            let BAGHBETA1 = parseFloat(result.beta);

                                                                                                                            let BAGHBH2 = 0.21 * BAGHBH;
                                                                                                                            let BAGHC2 = BAGHC21 + BAGHC22;
                                                                                                                            let BAGHTHK2E = BAGHTHK2N - BAGHC2;
                                                                                                                            let BAGHBH2LC = BAGHBH2 / BAGHLC;
                                                                                                                            let BAGHSH2 = BAGHBH1 + BAGHBH2;
                                                                                                                            let BAGHPC2 = BAGHD * BAGHG * BAGHSH2 / 1000000000;

                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "ba": BAGHBH2LC
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    let BAGHALPHA2 = parseFloat(result.alpha);
                                                                                                                                    let BAGHBETA2 = parseFloat(result.beta);

                                                                                                                                    let BAGHBH3 = 0.18 * BAGHBH;
                                                                                                                                    let BAGHC3 = BAGHC31 + BAGHC32;
                                                                                                                                    let BAGHTHK3E = BAGHTHK3N - BAGHC3;
                                                                                                                                    let BAGHBH3LC = BAGHBH3 / BAGHLC;
                                                                                                                                    let BAGHSH3 = BAGHBH1 + BAGHBH2 + BAGHBH3;
                                                                                                                                    let BAGHPC3 = BAGHD * BAGHG * BAGHSH3 / 1000000000;

                                                                                                                                    $.ajax({
                                                                                                                                        type: "POST",
                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                        async: true,
                                                                                                                                        dataType: "json",
                                                                                                                                        data: JSON.stringify({
                                                                                                                                            "ba": BAGHBH3LC
                                                                                                                                        }),
                                                                                                                                        beforeSend: function () {
                                                                                                                                        },
                                                                                                                                        success: function (result) {

                                                                                                                                            let BAGHALPHA3 = parseFloat(result.alpha);
                                                                                                                                            let BAGHBETA3 = parseFloat(result.beta);

                                                                                                                                            let BAGHBH4 = 0.16 * BAGHBH;
                                                                                                                                            let BAGHC4 = BAGHC41 + BAGHC42;
                                                                                                                                            let BAGHTHK4E = BAGHTHK4N - BAGHC4;
                                                                                                                                            let BAGHBH4LC = BAGHBH4 / BAGHLC;
                                                                                                                                            let BAGHSH4 = BAGHBH1 + BAGHBH2 + BAGHBH3 + BAGHBH4;
                                                                                                                                            let BAGHPC4 = BAGHD * BAGHG * BAGHSH4 / 1000000000;

                                                                                                                                            $.ajax({
                                                                                                                                                type: "POST",
                                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                                async: true,
                                                                                                                                                dataType: "json",
                                                                                                                                                data: JSON.stringify({
                                                                                                                                                    "ba": BAGHBH4LC
                                                                                                                                                }),
                                                                                                                                                beforeSend: function () {
                                                                                                                                                },
                                                                                                                                                success: function (result) {

                                                                                                                                                    let BAGHALPHA4 = parseFloat(result.alpha);
                                                                                                                                                    let BAGHBETA4 = parseFloat(result.beta);

                                                                                                                                                    let BAGHBH5 = 0.14 * BAGHBH;
                                                                                                                                                    let BAGHC5 = BAGHC51 + BAGHC52;
                                                                                                                                                    let BAGHTHK5E = BAGHTHK5N - BAGHC5;
                                                                                                                                                    let BAGHBH5LC = BAGHBH5 / BAGHLC;
                                                                                                                                                    let BAGHSH5 = BAGHBH1 + BAGHBH2 + BAGHBH3 + BAGHBH4 + BAGHBH5;
                                                                                                                                                    let BAGHPC5 = BAGHD * BAGHG * BAGHSH5 / 1000000000;

                                                                                                                                                    $.ajax({
                                                                                                                                                        type: "POST",
                                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                                        async: true,
                                                                                                                                                        dataType: "json",
                                                                                                                                                        data: JSON.stringify({
                                                                                                                                                            "ba": BAGHBH5LC
                                                                                                                                                        }),
                                                                                                                                                        beforeSend: function () {
                                                                                                                                                        },
                                                                                                                                                        success: function (result) {

                                                                                                                                                            let BAGHALPHA5 = parseFloat(result.alpha);
                                                                                                                                                            let BAGHBETA5 = parseFloat(result.beta);

                                                                                                                                                            // 顶边加固件
                                                                                                                                                            let BAGHI0 = 0.217 * BAGHPC1 * BAGHSH1 * BAGHL * BAGHL * BAGHL / BAGHEJT;
                                                                                                                                                            south.html(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "顶边加固件所需最小惯性矩：" + BAGHI0.toFixed(2) + " mm⁴" +
                                                                                                                                                                "</span>");
// 第一段加固柱校核
                                                                                                                                                            let BAGHLMAX1 = 0.408 * BAGHTHK1E * Math.sqrt(BAGHO1T / (BAGHALPHA * BAGHPC));
                                                                                                                                                            let BAGHZP1 = BAGHLC * (0.0642 * BAGHPC * BAGHBH * BAGHBH / BAGHO1T - BAGHTHK1E * BAGHTHK1E / 6);
// 第一段壁板
                                                                                                                                                            let BAGHTHK1C = BAGHLC * Math.sqrt(3 * BAGHALPHA1 * BAGHPC1 / BAGHO1T);
                                                                                                                                                            let BAGHTHK1D = BAGHTHK1C + BAGHC12;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第一段壁板所需厚度：" + (BAGHTHK1D + BAGHC11).toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHTHK1CHK;
                                                                                                                                                            if (BAGHTHK1N >= (BAGHTHK1D + BAGHC11)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK1N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK1CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK1N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK1CHK = "不合格";
                                                                                                                                                            }
                                                                                                                                                            let BAGHF1ALLOW = 5 * (BAGHTHK1E / 2 + Math.sqrt(BAGHBH1LC) * BAGHLC / 500);
                                                                                                                                                            let BAGHF1MAX = BAGHBETA1 * Math.pow(BAGHLC, 4) * BAGHPC1 / (2 * BAGHE1T * Math.pow(BAGHTHK1E, 3));
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第一段壁板许用挠度：" + BAGHF1ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHF1CHK;
                                                                                                                                                            if (BAGHF1MAX <= BAGHF1ALLOW) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF1MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF1CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF1MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF1CHK = "不合格";
                                                                                                                                                            }
// 第一道水平加固件
                                                                                                                                                            let BAGHF1 = BAGHPC2 * (BAGHSH1 + BAGHSH2) / 6;
                                                                                                                                                            let BAGHI1 = 1.3 * BAGHF1 * BAGHLC * BAGHLC * BAGHLC / BAGHEJT;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第一道水平加固件所需最小惯性矩：" + BAGHI1.toFixed(2) + " mm⁴" +
                                                                                                                                                                "</span>");
// 第二段加固柱校核
                                                                                                                                                            let BAGHLMAX2 = 0.408 * BAGHTHK2E * Math.sqrt(BAGHO2T / (BAGHALPHA * BAGHPC));
                                                                                                                                                            let BAGHZP2 = BAGHLC * (0.0642 * BAGHPC * BAGHBH * BAGHBH / BAGHO2T - BAGHTHK2E * BAGHTHK2E / 6);
// 第二段壁板
                                                                                                                                                            let BAGHTHK2C = BAGHLC * Math.sqrt(6 * BAGHALPHA2 * (BAGHPC1 + BAGHPC2) / BAGHO2T);
                                                                                                                                                            let BAGHTHK2D = BAGHTHK2C + BAGHC22;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第二段壁板所需厚度：" + (BAGHTHK2D + BAGHC21).toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHTHK2CHK;
                                                                                                                                                            if (BAGHTHK2N >= (BAGHTHK2D + BAGHC21)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK2N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK2CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK2N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK2CHK = "不合格";
                                                                                                                                                            }
                                                                                                                                                            let BAGHF2ALLOW = 5 * (BAGHTHK2E / 2 + Math.sqrt(BAGHBH2LC) * BAGHLC / 500);
                                                                                                                                                            let BAGHF2MAX = BAGHBETA2 * Math.pow(BAGHLC, 4) * (BAGHPC1 + BAGHPC2) / (2 * BAGHE2T * Math.pow(BAGHTHK2E, 3));
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第二段壁板许用挠度：" + BAGHF2ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHF2CHK;
                                                                                                                                                            if (BAGHF2MAX <= BAGHF2ALLOW) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF2MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF2CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF2MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF2CHK = "不合格";
                                                                                                                                                            }
// 第二道水平加固件
                                                                                                                                                            let BAGHF2 = (BAGHPC3 - BAGHPC1) * (BAGHSH1 + BAGHSH2 + BAGHSH3) / 6;
                                                                                                                                                            let BAGHI2 = 1.3 * BAGHF2 * BAGHLC * BAGHLC * BAGHLC / BAGHEJT;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第二道水平加固件所需最小惯性矩：" + BAGHI2.toFixed(2) + " mm⁴" +
                                                                                                                                                                "</span>");
// 第三段加固柱校核
                                                                                                                                                            let BAGHLMAX3 = 0.408 * BAGHTHK3E * Math.sqrt(BAGHO3T / (BAGHALPHA * BAGHPC));
                                                                                                                                                            let BAGHZP3 = BAGHLC * (0.0642 * BAGHPC * BAGHBH * BAGHBH / BAGHO3T - BAGHTHK3E * BAGHTHK3E / 6);
// 第三段壁板
                                                                                                                                                            let BAGHTHK3C = BAGHLC * Math.sqrt(6 * BAGHALPHA3 * (BAGHPC2 + BAGHPC3) / BAGHO3T);
                                                                                                                                                            let BAGHTHK3D = BAGHTHK3C + BAGHC32;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第三段壁板所需厚度：" + (BAGHTHK3D + BAGHC31).toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHTHK3CHK;
                                                                                                                                                            if (BAGHTHK3N >= (BAGHTHK3D + BAGHC31)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK3N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK3CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK3N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK3CHK = "不合格";
                                                                                                                                                            }
                                                                                                                                                            let BAGHF3ALLOW = 5 * (BAGHTHK3E / 2 + Math.sqrt(BAGHBH3LC) * BAGHLC / 500);
                                                                                                                                                            let BAGHF3MAX = BAGHBETA3 * Math.pow(BAGHLC, 4) * (BAGHPC2 + BAGHPC3) / (2 * BAGHE3T * Math.pow(BAGHTHK3E, 3));
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第三段壁板许用挠度：" + BAGHF3ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHF3CHK;
                                                                                                                                                            if (BAGHF3MAX <= BAGHF3ALLOW) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF3MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF3CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF3MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF3CHK = "不合格";
                                                                                                                                                            }
// 第三道水平加固件
                                                                                                                                                            let BAGHF3 = (BAGHPC4 - BAGHPC2) * (BAGHSH2 + BAGHSH3 + BAGHSH4) / 6;
                                                                                                                                                            let BAGHI3 = 1.3 * BAGHF3 * BAGHLC * BAGHLC * BAGHLC / BAGHEJT;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第三道水平加固件所需最小惯性矩：" + BAGHI3.toFixed(2) + " mm⁴" +
                                                                                                                                                                "</span>");
// 第四段加固柱校核
                                                                                                                                                            let BAGHLMAX4 = 0.408 * BAGHTHK4E * Math.sqrt(BAGHO4T / (BAGHALPHA * BAGHPC));
                                                                                                                                                            let BAGHZP4 = BAGHLC * (0.0642 * BAGHPC * BAGHBH * BAGHBH / BAGHO4T - BAGHTHK4E * BAGHTHK4E / 6);
// 第四段壁板
                                                                                                                                                            let BAGHTHK4C = BAGHLC * Math.sqrt(6 * BAGHALPHA4 * (BAGHPC3 + BAGHPC4) / BAGHO4T);
                                                                                                                                                            let BAGHTHK4D = BAGHTHK4C + BAGHC42;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第四段壁板所需厚度：" + (BAGHTHK4D + BAGHC41).toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHTHK4CHK;
                                                                                                                                                            if (BAGHTHK4N >= (BAGHTHK4D + BAGHC41)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK4N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK4CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK4N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK4CHK = "不合格";
                                                                                                                                                            }
                                                                                                                                                            let BAGHF4ALLOW = 5 * (BAGHTHK4E / 2 + Math.sqrt(BAGHBH4LC) * BAGHLC / 500);
                                                                                                                                                            let BAGHF4MAX = BAGHBETA4 * Math.pow(BAGHLC, 4) * (BAGHPC3 + BAGHPC4) / (2 * BAGHE4T * Math.pow(BAGHTHK4E, 3));
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第四段壁板许用挠度：" + BAGHF4ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHF4CHK;
                                                                                                                                                            if (BAGHF4MAX <= BAGHF4ALLOW) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF4MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF4CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF4MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF4CHK = "不合格";
                                                                                                                                                            }

                                                                                                                                                            let BAGHF4 = (BAGHPC5 - BAGHPC3) * (BAGHSH3 + BAGHSH4 + BAGHSH5) / 6;
                                                                                                                                                            let BAGHI4 = 1.3 * BAGHF4 * BAGHLC * BAGHLC * BAGHLC / BAGHEJT;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第四道水平加固件所需最小惯性矩：" + BAGHI4.toFixed(2) + " mm⁴" +
                                                                                                                                                                "</span>");
// 第五段加固柱校核
                                                                                                                                                            let BAGHLMAX5 = 0.408 * BAGHTHK5E * Math.sqrt(BAGHO5T / (BAGHALPHA * BAGHPC));
                                                                                                                                                            let BAGHZP5 = BAGHLC * (0.0642 * BAGHPC * BAGHBH * BAGHBH / BAGHO5T - BAGHTHK5E * BAGHTHK5E / 6);
// 第五段壁板
                                                                                                                                                            let BAGHTHK5C = BAGHLC * Math.sqrt(6 * BAGHALPHA5 * (BAGHPC4 + BAGHPC5) / BAGHO5T);
                                                                                                                                                            let BAGHTHK5D = BAGHTHK5C + BAGHC52;
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第五段壁板所需厚度：" + (BAGHTHK5D + BAGHC51).toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHTHK5CHK;
                                                                                                                                                            if (BAGHTHK5N >= (BAGHTHK5D + BAGHC51)) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK5N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK5CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "输入厚度：" + BAGHTHK5N + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHTHK5CHK = "不合格";
                                                                                                                                                            }
                                                                                                                                                            let BAGHF5ALLOW = 5 * (BAGHTHK5E / 2 + Math.sqrt(BAGHBH5LC) * BAGHLC / 500);
                                                                                                                                                            let BAGHF5MAX = BAGHBETA5 * Math.pow(BAGHLC, 4) * (BAGHPC4 + BAGHPC5) / (2 * BAGHE5T * Math.pow(BAGHTHK5E, 3));
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "第五段壁板许用挠度：" + BAGHF5ALLOW.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHF5CHK;
                                                                                                                                                            if (BAGHF5MAX <= BAGHF5ALLOW) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF5MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF5CHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际挠度：" + BAGHF5MAX.toFixed(2) + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHF5CHK = "不合格";
                                                                                                                                                            }
// 加固柱结果汇总
                                                                                                                                                            let BAGHLMAX = Math.min(BAGHLMAX1, BAGHLMAX2, BAGHLMAX3, BAGHLMAX4, BAGHLMAX5);
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "垂直加固柱允许最大间距：" + BAGHLMAX.toFixed(2) + " mm" +
                                                                                                                                                                "</span>");
                                                                                                                                                            let BAGHLCCHK;
                                                                                                                                                            if (BAGHLC <= BAGHLMAX) {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际输入间距：" + BAGHLC + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHLCCHK = "合格";
                                                                                                                                                            }
                                                                                                                                                            else {
                                                                                                                                                                south.append(
                                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                                    "实际输入间距：" + BAGHLC + " mm" +
                                                                                                                                                                    "</span>");
                                                                                                                                                                BAGHLCCHK = "不合格";
                                                                                                                                                            }
                                                                                                                                                            let BAGHZP = Math.max(BAGHZP1, BAGHZP2, BAGHZP3, BAGHZP4, BAGHZP5);
                                                                                                                                                            south.append(
                                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                                "垂直加固柱所需最小截面系数：" + BAGHZP.toFixed(4) + " mm³" +
                                                                                                                                                                "</span>");

                                                                                                                                                            // docx
                                                                                                                                                            let BAGHPayJS = $('#payjs');

                                                                                                                                                            function getDocx() {
                                                                                                                                                                $.ajax({
                                                                                                                                                                    type: "POST",
                                                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                                                    url: "baghdocx.action",
                                                                                                                                                                    async: true,
                                                                                                                                                                    dataType: "json",
                                                                                                                                                                    data: JSON.stringify({
                                                                                                                                                                        ribbonName: "BAGH",

                                                                                                                                                                        t: BAGHDT,
                                                                                                                                                                        d: BAGHD,
                                                                                                                                                                        lc: BAGHLC,
                                                                                                                                                                        bh: BAGHBH,
                                                                                                                                                                        l: BAGHL,

                                                                                                                                                                        jstd: BAGHJSTDVal,
                                                                                                                                                                        jname: BAGHJNameVal,

                                                                                                                                                                        std1: BAGH1STDVal,
                                                                                                                                                                        name1: BAGH1NameVal,
                                                                                                                                                                        c12: BAGHC12,
                                                                                                                                                                        thk1n: BAGHTHK1N,

                                                                                                                                                                        std2: BAGH2STDVal,
                                                                                                                                                                        name2: BAGH2NameVal,
                                                                                                                                                                        c22: BAGHC22,
                                                                                                                                                                        thk2n: BAGHTHK2N,

                                                                                                                                                                        std3: BAGH3STDVal,
                                                                                                                                                                        name3: BAGH3NameVal,
                                                                                                                                                                        c32: BAGHC32,
                                                                                                                                                                        thk3n: BAGHTHK3N,

                                                                                                                                                                        std4: BAGH4STDVal,
                                                                                                                                                                        name4: BAGH4NameVal,
                                                                                                                                                                        c42: BAGHC42,
                                                                                                                                                                        thk4n: BAGHTHK4N,

                                                                                                                                                                        std5: BAGH5STDVal,
                                                                                                                                                                        name5: BAGH5NameVal,
                                                                                                                                                                        c52: BAGHC52,
                                                                                                                                                                        thk5n: BAGHTHK5N,

                                                                                                                                                                        d1: BAGHD1.toFixed(4),
                                                                                                                                                                        c11: BAGHC11.toFixed(4),
                                                                                                                                                                        o1t: BAGHO1T.toFixed(4),
                                                                                                                                                                        e1t: (BAGHE1T / 1000).toFixed(4),

                                                                                                                                                                        d2: BAGHD2.toFixed(4),
                                                                                                                                                                        c21: BAGHC21.toFixed(4),
                                                                                                                                                                        o2t: BAGHO2T.toFixed(4),
                                                                                                                                                                        e2t: (BAGHE2T / 1000).toFixed(4),

                                                                                                                                                                        d3: BAGHD3.toFixed(4),
                                                                                                                                                                        c31: BAGHC31.toFixed(4),
                                                                                                                                                                        o3t: BAGHO3T.toFixed(4),
                                                                                                                                                                        e3t: (BAGHE3T / 1000).toFixed(4),

                                                                                                                                                                        d4: BAGHD4.toFixed(4),
                                                                                                                                                                        c41: BAGHC41.toFixed(4),
                                                                                                                                                                        o4t: BAGHO4T.toFixed(4),
                                                                                                                                                                        e4t: (BAGHE4T / 1000).toFixed(4),

                                                                                                                                                                        d5: BAGHD5.toFixed(4),
                                                                                                                                                                        c51: BAGHC51.toFixed(4),
                                                                                                                                                                        o5t: BAGHO5T.toFixed(4),
                                                                                                                                                                        e5t: (BAGHE5T / 1000).toFixed(4),

                                                                                                                                                                        ejt: (BAGHEJT / 1000).toFixed(4),

                                                                                                                                                                        g: BAGHG.toFixed(4),
                                                                                                                                                                        pc: BAGHPC.toFixed(4),
                                                                                                                                                                        bhlc: BAGHBHLC.toFixed(4),
                                                                                                                                                                        alpha: BAGHALPHA.toFixed(8),
                                                                                                                                                                        beta: BAGHBETA.toFixed(8),

                                                                                                                                                                        bh1: BAGHBH1.toFixed(4),
                                                                                                                                                                        c1: BAGHC1.toFixed(4),
                                                                                                                                                                        thk1e: BAGHTHK1E.toFixed(4),
                                                                                                                                                                        bh1lc: BAGHBH1LC.toFixed(4),
                                                                                                                                                                        alpha1: BAGHALPHA1.toFixed(8),
                                                                                                                                                                        beta1: BAGHBETA1.toFixed(8),
                                                                                                                                                                        sh1: BAGHSH1.toFixed(4),
                                                                                                                                                                        pc1: BAGHPC1.toFixed(4),

                                                                                                                                                                        bh2: BAGHBH2.toFixed(4),
                                                                                                                                                                        c2: BAGHC2.toFixed(4),
                                                                                                                                                                        thk2e: BAGHTHK2E.toFixed(4),
                                                                                                                                                                        bh2lc: BAGHBH2LC.toFixed(4),
                                                                                                                                                                        alpha2: BAGHALPHA2.toFixed(8),
                                                                                                                                                                        beta2: BAGHBETA2.toFixed(8),
                                                                                                                                                                        sh2: BAGHSH2.toFixed(4),
                                                                                                                                                                        pc2: BAGHPC2.toFixed(4),

                                                                                                                                                                        bh3: BAGHBH3.toFixed(4),
                                                                                                                                                                        c3: BAGHC3.toFixed(4),
                                                                                                                                                                        thk3e: BAGHTHK3E.toFixed(4),
                                                                                                                                                                        bh3lc: BAGHBH3LC.toFixed(4),
                                                                                                                                                                        alpha3: BAGHALPHA3.toFixed(8),
                                                                                                                                                                        beta3: BAGHBETA3.toFixed(8),
                                                                                                                                                                        sh3: BAGHSH3.toFixed(4),
                                                                                                                                                                        pc3: BAGHPC3.toFixed(4),

                                                                                                                                                                        bh4: BAGHBH4.toFixed(4),
                                                                                                                                                                        c4: BAGHC4.toFixed(4),
                                                                                                                                                                        thk4e: BAGHTHK4E.toFixed(4),
                                                                                                                                                                        bh4lc: BAGHBH4LC.toFixed(4),
                                                                                                                                                                        alpha4: BAGHALPHA4.toFixed(8),
                                                                                                                                                                        beta4: BAGHBETA4.toFixed(8),
                                                                                                                                                                        sh4: BAGHSH4.toFixed(4),
                                                                                                                                                                        pc4: BAGHPC4.toFixed(4),

                                                                                                                                                                        bh5: BAGHBH5.toFixed(4),
                                                                                                                                                                        c5: BAGHC5.toFixed(4),
                                                                                                                                                                        thk5e: BAGHTHK5E.toFixed(4),
                                                                                                                                                                        bh5lc: BAGHBH5LC.toFixed(4),
                                                                                                                                                                        alpha5: BAGHALPHA5.toFixed(8),
                                                                                                                                                                        beta5: BAGHBETA5.toFixed(8),
                                                                                                                                                                        sh5: BAGHSH5.toFixed(4),
                                                                                                                                                                        pc5: BAGHPC5.toFixed(4),

                                                                                                                                                                        i0: BAGHI0.toFixed(4),

                                                                                                                                                                        lmax1: BAGHLMAX1.toFixed(4),
                                                                                                                                                                        zp1: BAGHZP1.toFixed(4),

                                                                                                                                                                        thk1c: BAGHTHK1C.toFixed(4),
                                                                                                                                                                        thk1d: BAGHTHK1D.toFixed(4),
                                                                                                                                                                        thk1chk: BAGHTHK1CHK,
                                                                                                                                                                        f1allow: BAGHF1ALLOW.toFixed(4),
                                                                                                                                                                        f1max: BAGHF1MAX.toFixed(4),
                                                                                                                                                                        f1chk: BAGHF1CHK,

                                                                                                                                                                        f1: BAGHF1.toFixed(4),
                                                                                                                                                                        i1: BAGHI1.toFixed(4),

                                                                                                                                                                        lmax2: BAGHLMAX2.toFixed(4),
                                                                                                                                                                        zp2: BAGHZP2.toFixed(4),

                                                                                                                                                                        thk2c: BAGHTHK2C.toFixed(4),
                                                                                                                                                                        thk2d: BAGHTHK2D.toFixed(4),
                                                                                                                                                                        thk2chk: BAGHTHK2CHK,
                                                                                                                                                                        f2allow: BAGHF2ALLOW.toFixed(4),
                                                                                                                                                                        f2max: BAGHF2MAX.toFixed(4),
                                                                                                                                                                        f2chk: BAGHF2CHK,

                                                                                                                                                                        f2: BAGHF2.toFixed(4),
                                                                                                                                                                        i2: BAGHI2.toFixed(4),

                                                                                                                                                                        lmax3: BAGHLMAX3.toFixed(4),
                                                                                                                                                                        zp3: BAGHZP3.toFixed(4),

                                                                                                                                                                        thk3c: BAGHTHK3C.toFixed(4),
                                                                                                                                                                        thk3d: BAGHTHK3D.toFixed(4),
                                                                                                                                                                        thk3chk: BAGHTHK3CHK,
                                                                                                                                                                        f3allow: BAGHF3ALLOW.toFixed(4),
                                                                                                                                                                        f3max: BAGHF3MAX.toFixed(4),
                                                                                                                                                                        f3chk: BAGHF3CHK,

                                                                                                                                                                        f3: BAGHF3.toFixed(4),
                                                                                                                                                                        i3: BAGHI3.toFixed(4),

                                                                                                                                                                        lmax4: BAGHLMAX4.toFixed(4),
                                                                                                                                                                        zp4: BAGHZP4.toFixed(4),

                                                                                                                                                                        thk4c: BAGHTHK4C.toFixed(4),
                                                                                                                                                                        thk4d: BAGHTHK4D.toFixed(4),
                                                                                                                                                                        thk4chk: BAGHTHK4CHK,
                                                                                                                                                                        f4allow: BAGHF4ALLOW.toFixed(4),
                                                                                                                                                                        f4max: BAGHF4MAX.toFixed(4),
                                                                                                                                                                        f4chk: BAGHF4CHK,

                                                                                                                                                                        f4: BAGHF4.toFixed(4),
                                                                                                                                                                        i4: BAGHI4.toFixed(4),

                                                                                                                                                                        lmax5: BAGHLMAX5.toFixed(4),
                                                                                                                                                                        zp5: BAGHZP5.toFixed(4),

                                                                                                                                                                        thk5c: BAGHTHK5C.toFixed(4),
                                                                                                                                                                        thk5d: BAGHTHK5D.toFixed(4),
                                                                                                                                                                        thk5chk: BAGHTHK5CHK,
                                                                                                                                                                        f5allow: BAGHF5ALLOW.toFixed(4),
                                                                                                                                                                        f5max: BAGHF5MAX.toFixed(4),
                                                                                                                                                                        f5chk: BAGHF5CHK,

                                                                                                                                                                        lmax: BAGHLMAX.toFixed(4),
                                                                                                                                                                        lcchk: BAGHLCCHK,
                                                                                                                                                                        zp: BAGHZP.toFixed(4)
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
                                                                                                                                                                            BAGHPayJS.dialog({
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
                                                                                                                                                                                        BAGHPayJS.dialog("close");
                                                                                                                                                                                        BAGHPayJS.dialog("clear");
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
                                                                                                                                                                                                    BAGHPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                                            BAGHPayJS.dialog('close');
                                                                                                                                                                                                            BAGHPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});