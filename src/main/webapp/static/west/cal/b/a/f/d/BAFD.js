$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bafdSketch = $("#d2");
    let bafdModel = $("#d3");
    let bafdd2d3 = $('#d2d3');

    $("#cal").html("<table id='bafd'></table>");
    let pg = $("#bafd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/f/d/BAFD.json", function (result) {

        let BAFDDT;
        let BAFD1Category, BAFD1CategoryVal, BAFD1Type, BAFD1TypeVal, BAFD1STD, BAFD1STDVal, BAFD1Name, BAFD1NameVal,
            BAFD2Category, BAFD2CategoryVal, BAFD2Type, BAFD2TypeVal, BAFD2STD, BAFD2STDVal, BAFD2Name, BAFD2NameVal,
            BAFD3Category, BAFD3CategoryVal, BAFD3Type, BAFD3TypeVal, BAFD3STD, BAFD3STDVal, BAFD3Name, BAFD3NameVal,
            BAFD4Category, BAFD4CategoryVal, BAFD4Type, BAFD4TypeVal, BAFD4STD, BAFD4STDVal, BAFD4Name, BAFD4NameVal,
            BAFD5Category, BAFD5CategoryVal, BAFD5Type, BAFD5TypeVal, BAFD5STD, BAFD5STDVal, BAFD5Name, BAFD5NameVal,
            BAFDJCategory, BAFDJCategoryVal, BAFDJType, BAFDJTypeVal, BAFDJSTD, BAFDJSTDVal, BAFDJName, BAFDJNameVal;
        let columns, rows, ed;

        function bafd2d(l = "L", bh = "H", bh1 = "0.31H", bh2 = "0.21H", bh3 = "0.18H", bh4 = "0.16H", bh5 = "0.14H") {

            bafdSketch.empty();

            let width = bafdSketch.width();
            let height = bafdSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAFD2VG").attr("height", height);

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
                {x: padding + wg - thk, y: padding},
                {x: padding + wg, y: padding},
                {x: padding + wg, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: padding},
                {x: padding + 3 * wg + thk, y: padding},
                {x: padding + 3 * wg + thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding},
                {x: padding + 3 * wg, y: padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding - thk},
                {x: padding + 3 * wg + thk, y: padding - thk}
            ])).classed("sketch", true);

            // 角钢 顶边 左
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding},
                {x: padding + wg - thk, y: padding - thk},
                {x: padding + wg - 6 * thk, y: padding - thk},
                {x: padding + wg - 6 * thk, y: padding},
                {x: padding + wg - 2 * thk, y: padding},
                {x: padding + wg - 2 * thk, y: padding + 4 * thk},
                {x: padding + wg - thk, y: padding + 4 * thk}
            ])).classed("sketch", true);

            // 角钢 顶边 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding},
                {x: padding + 3 * wg + thk, y: padding - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding},
                {x: padding + 3 * wg + 2 * thk, y: padding},
                {x: padding + 3 * wg + 2 * thk, y: padding + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 4 * thk}
            ])).classed("sketch", true);

            // 角钢 第一道 左
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 1.2 * hg},
                {x: padding + wg - thk, y: padding + 1.2 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 1.2 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 1.2 * hg},
                {x: padding + wg - 2 * thk, y: padding + 1.2 * hg},
                {x: padding + wg - 2 * thk, y: padding + 1.2 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 1.2 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 1.2 * hg - thk, padding + wg, padding + 1.2 * hg - thk);

            // 角钢 第一道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 1.2 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.2 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.2 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.2 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.2 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.2 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 1.2 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 1.2 * hg - thk, padding + 3 * wg + thk, padding + 1.2 * hg - thk);

            // 角钢 第二道 左
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2 * hg},
                {x: padding + wg - thk, y: padding + 2 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 2 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 2 * hg},
                {x: padding + wg - 2 * thk, y: padding + 2 * hg},
                {x: padding + wg - 2 * thk, y: padding + 2 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 2 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 2 * hg - thk, padding + wg, padding + 2 * hg - thk);

            // 角钢 第二道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 2 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 2 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 2 * hg - thk, padding + 3 * wg + thk, padding + 2 * hg - thk);

            // 角钢 第三道 左
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.8 * hg},
                {x: padding + wg - thk, y: padding + 2.8 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 2.8 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 2.8 * hg},
                {x: padding + wg - 2 * thk, y: padding + 2.8 * hg},
                {x: padding + wg - 2 * thk, y: padding + 2.8 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 2.8 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 2.8 * hg - thk, padding + wg, padding + 2.8 * hg - thk);

            // 角钢 第三道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 2.8 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.8 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.8 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.8 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.8 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.8 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 2.8 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 2.8 * hg - thk, padding + 3 * wg + thk, padding + 2.8 * hg - thk);

            // 角钢 第四道 左
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3.45 * hg},
                {x: padding + wg - thk, y: padding + 3.45 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 3.45 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 3.45 * hg},
                {x: padding + wg - 2 * thk, y: padding + 3.45 * hg},
                {x: padding + wg - 2 * thk, y: padding + 3.45 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 3.45 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 3.45 * hg - thk, padding + wg, padding + 3.45 * hg - thk);

            // 角钢 第四道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 3.45 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.45 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.45 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.45 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.45 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.45 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 3.45 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 3.45 * hg - thk, padding + 3 * wg + thk, padding + 3.45 * hg - thk);

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
                    {x: padding + 2.5 * wg, y: padding - thk},
                    {x: padding + 2.5 * wg + 3, y: padding - thk + 15},
                    {x: padding + 2.5 * wg - 3, y: padding - thk + 15},
                    {x: padding + 2.5 * wg, y: padding - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: height - padding - 15},
                {x: padding + 2.5 * wg, y: padding - thk + 15}
            ])).attr("id", "BAFD2ketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAFD2ketchH")
                .attr("startOffset", "50%").text(bh);

            // L
            dimBottomH(padding + wg, height - padding - 2 * hg, padding + 3 * wg, height - padding - 2 * hg, l, "BAFDSketchL");

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 1.2 * hg - thk, padding + wg - 6 * thk, padding - thk, bh1, "BAFDSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 2 * hg - thk, padding + wg - 6 * thk, padding + 1.2 * hg - thk, bh2, "BAFDSketchBH2");

            // BH3
            dimLeftV(padding + wg - 6 * thk, padding + 2.8 * hg - thk, padding + wg - 6 * thk, padding + 2 * hg - thk, bh3, "BAFDSketchBH3");

            // BH4
            dimLeftV(padding + wg - 6 * thk, padding + 3.45 * hg - thk, padding + wg - 6 * thk, padding + 2.8 * hg - thk, bh4, "BAFDSketchBH4");

            // BH4
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3.45 * hg - thk, bh5, "BAFDSketchBH5");
        }

        currentTabIndex = bafdd2d3.tabs('getTabIndex', bafdd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bafd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bafd").length > 0) {
                    bafd2d();
                }
            });
        }
        bafdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bafd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bafd").length > 0) {
                            bafd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 顶边加固、四道加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAFD1Category);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAFD1Type);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAFD1STD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAFD1Name);
                }

                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAFD2Category);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAFD2Type);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAFD2STD);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAFD2Name);
                }

                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAFD3Category);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAFD3Type);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAFD3STD);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", BAFD3Name);
                }

                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAFD4Category);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAFD4Type);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAFD4STD);
                }
                else if (index === 25) {
                    $(ed.target).combobox("loadData", BAFD4Name);
                }

                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAFD5Category);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAFD5Type);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAFD5STD);
                }
                else if (index === 31) {
                    $(ed.target).combobox("loadData", BAFD5Name);
                }

                else if (index === 34) {
                    $(ed.target).combobox("loadData", BAFDJCategory);
                }
                else if (index === 35) {
                    $(ed.target).combobox("loadData", BAFDJType);
                }
                else if (index === 36) {
                    $(ed.target).combobox("loadData", BAFDJSTD);
                }
                else if (index === 37) {
                    $(ed.target).combobox("loadData", BAFDJName);
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
                    bafdSketch.empty();

                    // model
                    bafdModel.empty();

                    // sketch
                    currentTabIndex = bafdd2d3.tabs('getTabIndex', bafdd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafd2d();
                        bafdSketch.off("resize").on("resize", function () {
                            if ($("#bafd").length > 0) {
                                bafd2d();
                            }
                        });
                    }
                    bafdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafd2d();
                                bafdSketch.off("resize").on("resize", function () {
                                    if ($("#bafd").length > 0) {
                                        bafd2d();
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

                        BAFDDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAFD1Category = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAFD1Type = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFD1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFD1Name = null;

                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAFD2Category = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAFD2Type = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFD2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFD2Name = null;

                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAFD3Category = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAFD3Type = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFD3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFD3Name = null;

                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAFD4Category = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAFD4Type = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFD4STD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFD4Name = null;

                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAFD5Category = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAFD5Type = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAFD5STD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BAFD5Name = null;

                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        BAFDJCategory = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAFDJType = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAFDJSTD = null;
                        rows[37][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 37);
                        BAFDJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD1Category = [];
                                BAFD2Category = [];
                                BAFD3Category = [];
                                BAFD4Category = [];
                                BAFD5Category = [];
                                BAFDJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAFDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAFD1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFD2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFD3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFD4Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFD5Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFDJCategory[index] = {
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
                    if (index === 4) {

                        BAFD1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAFD1Type = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFD1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFD1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD1CategoryVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD1Type = [];
                                $(result).each(function (index, element) {
                                    BAFD1Type[index] = {
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
                    if (index === 5) {

                        BAFD1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFD1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFD1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD1CategoryVal,
                                type: BAFD1TypeVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD1STD = [];
                                $(result).each(function (index, element) {
                                    BAFD1STD[index] = {
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
                    if (index === 6) {

                        BAFD1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFD1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD1CategoryVal,
                                type: BAFD1TypeVal,
                                std: BAFD1STDVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD1Name = [];
                                $(result).each(function (index, element) {
                                    BAFD1Name[index] = {
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
                    if (index === 10) {

                        BAFD2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAFD2Type = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFD2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFD2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD2CategoryVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD2Type = [];
                                $(result).each(function (index, element) {
                                    BAFD2Type[index] = {
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
                    if (index === 11) {

                        BAFD2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFD2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFD2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD2CategoryVal,
                                type: BAFD2TypeVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD2STD = [];
                                $(result).each(function (index, element) {
                                    BAFD2STD[index] = {
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
                    if (index === 12) {

                        BAFD2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFD2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD2CategoryVal,
                                type: BAFD2TypeVal,
                                std: BAFD2STDVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD2Name = [];
                                $(result).each(function (index, element) {
                                    BAFD2Name[index] = {
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
                    if (index === 16) {

                        BAFD3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAFD3Type = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFD3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFD3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD3CategoryVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD3Type = [];
                                $(result).each(function (index, element) {
                                    BAFD3Type[index] = {
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
                    if (index === 17) {

                        BAFD3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFD3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFD3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD3CategoryVal,
                                type: BAFD3TypeVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD3STD = [];
                                $(result).each(function (index, element) {
                                    BAFD3STD[index] = {
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
                    if (index === 18) {

                        BAFD3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFD3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD3CategoryVal,
                                type: BAFD3TypeVal,
                                std: BAFD3STDVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD3Name = [];
                                $(result).each(function (index, element) {
                                    BAFD3Name[index] = {
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
                    if (index === 22) {

                        BAFD4CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAFD4Type = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFD4STD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFD4Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD4CategoryVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD4Type = [];
                                $(result).each(function (index, element) {
                                    BAFD4Type[index] = {
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
                    if (index === 23) {

                        BAFD4TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFD4STD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFD4Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD4CategoryVal,
                                type: BAFD4TypeVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD4STD = [];
                                $(result).each(function (index, element) {
                                    BAFD4STD[index] = {
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
                    if (index === 24) {

                        BAFD4STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFD4Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD4CategoryVal,
                                type: BAFD4TypeVal,
                                std: BAFD4STDVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD4Name = [];
                                $(result).each(function (index, element) {
                                    BAFD4Name[index] = {
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
                    if (index === 28) {

                        BAFD5CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAFD5Type = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAFD5STD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BAFD5Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD5CategoryVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD5Type = [];
                                $(result).each(function (index, element) {
                                    BAFD5Type[index] = {
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
                    if (index === 29) {

                        BAFD5TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAFD5STD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BAFD5Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD5CategoryVal,
                                type: BAFD5TypeVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD5STD = [];
                                $(result).each(function (index, element) {
                                    BAFD5STD[index] = {
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
                    if (index === 30) {

                        BAFD5STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BAFD5Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFD5CategoryVal,
                                type: BAFD5TypeVal,
                                std: BAFD5STDVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFD5Name = [];
                                $(result).each(function (index, element) {
                                    BAFD5Name[index] = {
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
                    if (index === 34) {

                        BAFDJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        BAFDJType = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAFDJSTD = null;
                        rows[37][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 37);
                        BAFDJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFDJCategoryVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFDJType = [];
                                $(result).each(function (index, element) {
                                    BAFDJType[index] = {
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
                    if (index === 35) {

                        BAFDJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        BAFDJSTD = null;
                        rows[37][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 37);
                        BAFDJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFDJCategoryVal,
                                type: BAFDJTypeVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFDJSTD = [];
                                $(result).each(function (index, element) {
                                    BAFDJSTD[index] = {
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
                    if (index === 36) {

                        BAFDJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[37][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 37);
                        BAFDJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFDJCategoryVal,
                                type: BAFDJTypeVal,
                                std: BAFDJSTDVal,
                                temp: BAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFDJName = [];
                                $(result).each(function (index, element) {
                                    BAFDJName[index] = {
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
                    let BAFDD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAFDD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // L
                    let BAFDL;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAFDL = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafd2d(BAFDL);
                        bafdSketch.off("resize").on("resize", function () {
                            if ($("#bafd").length > 0) {
                                bafd2d(BAFDL);
                            }
                        });
                    }
                    bafdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafd2d(BAFDL);
                                bafdSketch.off("resize").on("resize", function () {
                                    if ($("#bafd").length > 0) {
                                        bafd2d(BAFDL);
                                    }
                                });
                            }
                        }
                    });

                    // H
                    let BAFDBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 / 0.31 * BAFDL, 0.1 / 0.21 * BAFDL, 0.1 / 0.18 * BAFDL, 0.1 / 0.16 * BAFDL, 0.1 / 0.14 * BAFDL)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 / 0.31 * BAFDL, 5 / 0.21 * BAFDL, 5 / 0.18 * BAFDL, 5 / 0.16 * BAFDL, 5 / 0.14 * BAFDL)) {
                        BAFDBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 / 0.31 * BAFDL, 0.1 / 0.21 * BAFDL, 0.1 / 0.18 * BAFDL, 0.1 / 0.16 * BAFDL, 0.1 / 0.14 * BAFDL)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 / 0.31 * BAFDL, 0.1 / 0.21 * BAFDL, 0.1 / 0.18 * BAFDL, 0.1 / 0.16 * BAFDL, 0.1 / 0.14 * BAFDL).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 / 0.31 * BAFDL, 5 / 0.21 * BAFDL, 5 / 0.18 * BAFDL, 5 / 0.16 * BAFDL, 5 / 0.14 * BAFDL)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 / 0.31 * BAFDL, 5 / 0.21 * BAFDL, 5 / 0.18 * BAFDL, 5 / 0.16 * BAFDL, 5 / 0.14 * BAFDL).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafd2d(BAFDL, BAFDBH, (0.31 * BAFDBH).toFixed(2), (0.21 * BAFDBH).toFixed(2), (0.18 * BAFDBH).toFixed(2), (0.16 * BAFDBH).toFixed(2), (0.14 * BAFDBH).toFixed(2));
                        bafdSketch.off("resize").on("resize", function () {
                            if ($("#bafd").length > 0) {
                                bafd2d(BAFDL, BAFDBH, (0.31 * BAFDBH).toFixed(2), (0.21 * BAFDBH).toFixed(2), (0.18 * BAFDBH).toFixed(2), (0.16 * BAFDBH).toFixed(2), (0.14 * BAFDBH).toFixed(2));
                            }
                        });
                    }
                    bafdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafd2d(BAFDL, BAFDBH, (0.31 * BAFDBH).toFixed(2), (0.21 * BAFDBH).toFixed(2), (0.18 * BAFDBH).toFixed(2), (0.16 * BAFDBH).toFixed(2), (0.14 * BAFDBH).toFixed(2));
                                bafdSketch.off("resize").on("resize", function () {
                                    if ($("#bafd").length > 0) {
                                        bafd2d(BAFDL, BAFDBH, (0.31 * BAFDBH).toFixed(2), (0.21 * BAFDBH).toFixed(2), (0.18 * BAFDBH).toFixed(2), (0.16 * BAFDBH).toFixed(2), (0.14 * BAFDBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // 第一段壁板材料名称
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        BAFD1NameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAFDD1, BAFD1ThkMin, BAFD1ThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAFD1CategoryVal,
                            "type": BAFD1TypeVal,
                            "std": BAFD1STDVal,
                            "name": BAFD1NameVal,
                            "temp": BAFDDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAFDD1 = parseFloat(result.density);
                            BAFD1ThkMin = parseFloat(result.thkMin);
                            BAFD1ThkMax = parseFloat(result.thkMax);

                            // 第一层壁板腐蚀裕量 C12
                            let BAFDC12;
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) < BAFD1ThkMax) {
                                BAFDC12 = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) >= BAFD1ThkMax) {
                                south.html("第一段壁板腐蚀裕量不能大于等于 " + BAFD1ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 第一段壁板名义厚度
                            let BAFDTHK1N;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > Math.max(BAFDC12, BAFD1ThkMin)
                                && parseFloat(rows[9][columns[0][1].field]) <= BAFD1ThkMax) {
                                BAFDTHK1N = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) <= Math.max(BAFDC12, BAFD1ThkMin)) {
                                south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAFDC12, BAFD1ThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > BAFD1ThkMax) {
                                south.html("第一段壁板名义厚度不能大于 " + BAFD1ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 O1T E1T C11
                            let BAFDO1T, BAFDE1T, BAFDC11;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAFD1CategoryVal,
                                    "type": BAFD1TypeVal,
                                    "std": BAFD1STDVal,
                                    "name": BAFD1NameVal,
                                    "thk": BAFDTHK1N,
                                    "temp": BAFDDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAFDO1T = parseFloat(result.ot);
                                    if (BAFDO1T < 0) {
                                        south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAFDE1T = 1000 * parseFloat(result.et);
                                    if (BAFDE1T < 0) {
                                        south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }
                                    BAFDC11 = parseFloat(result.c1);
                                    if (BAFDC11 < 0) {
                                        south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 第二段壁板材料名称
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                        BAFD2NameVal = rows[13][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAFDD2, BAFD2ThkMin, BAFD2ThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAFD2CategoryVal,
                                            "type": BAFD2TypeVal,
                                            "std": BAFD2STDVal,
                                            "name": BAFD2NameVal,
                                            "temp": BAFDDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAFDD2 = parseFloat(result.density);
                                            BAFD2ThkMin = parseFloat(result.thkMin);
                                            BAFD2ThkMax = parseFloat(result.thkMax);

                                            // 第二层壁板腐蚀裕量 C22
                                            let BAFDC22;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) < BAFD2ThkMax) {
                                                BAFDC22 = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) >= BAFD2ThkMax) {
                                                south.html("第二段壁板腐蚀裕量不能大于等于 " + BAFD2ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 第二段壁板名义厚度
                                            let BAFDTHK2N;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) > Math.max(BAFDC22, BAFD2ThkMin)
                                                && parseFloat(rows[15][columns[0][1].field]) <= BAFD2ThkMax) {
                                                BAFDTHK2N = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) <= Math.max(BAFDC22, BAFD2ThkMin)) {
                                                south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAFDC22, BAFD2ThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) > BAFD2ThkMax) {
                                                south.html("第二段壁板名义厚度不能大于 " + BAFD2ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 O2T E2T C21
                                            let BAFDO2T, BAFDE2T, BAFDC21;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAFD2CategoryVal,
                                                    "type": BAFD2TypeVal,
                                                    "std": BAFD2STDVal,
                                                    "name": BAFD2NameVal,
                                                    "thk": BAFDTHK2N,
                                                    "temp": BAFDDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAFDO2T = parseFloat(result.ot);
                                                    if (BAFDO2T < 0) {
                                                        south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAFDE2T = 1000 * parseFloat(result.et);
                                                    if (BAFDE2T < 0) {
                                                        south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAFDC21 = parseFloat(result.c1);
                                                    if (BAFDC21 < 0) {
                                                        south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 第三段壁板材料名称
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                        BAFD3NameVal = rows[19][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // AJAX 获取材料密度、最大最小厚度
                                                    let BAFDD3, BAFD3ThkMin, BAFD3ThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAFD3CategoryVal,
                                                            "type": BAFD3TypeVal,
                                                            "std": BAFD3STDVal,
                                                            "name": BAFD3NameVal,
                                                            "temp": BAFDDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAFDD3 = parseFloat(result.density);
                                                            BAFD3ThkMin = parseFloat(result.thkMin);
                                                            BAFD3ThkMax = parseFloat(result.thkMax);

                                                            // 第三层壁板腐蚀裕量 C32
                                                            let BAFDC32;
                                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                && parseFloat(rows[20][columns[0][1].field]) < BAFD3ThkMax) {
                                                                BAFDC32 = parseFloat(rows[20][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                && parseFloat(rows[20][columns[0][1].field]) >= BAFD3ThkMax) {
                                                                south.html("第三段壁板腐蚀裕量不能大于等于 " + BAFD3ThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 第三段壁板名义厚度
                                                            let BAFDTHK3N;
                                                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) > Math.max(BAFDC32, BAFD3ThkMin)
                                                                && parseFloat(rows[21][columns[0][1].field]) <= BAFD3ThkMax) {
                                                                BAFDTHK3N = parseFloat(rows[21][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) <= Math.max(BAFDC32, BAFD3ThkMin)) {
                                                                south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAFDC32, BAFD3ThkMin) + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) > BAFD3ThkMax) {
                                                                south.html("第三段壁板名义厚度不能大于 " + BAFD3ThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // ajax 获取 O3T E3T C31
                                                            let BAFDO3T, BAFDE3T, BAFDC31;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAFD3CategoryVal,
                                                                    "type": BAFD3TypeVal,
                                                                    "std": BAFD3STDVal,
                                                                    "name": BAFD3NameVal,
                                                                    "thk": BAFDTHK3N,
                                                                    "temp": BAFDDT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": 100000
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAFDO3T = parseFloat(result.ot);
                                                                    if (BAFDO3T < 0) {
                                                                        south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAFDE3T = 1000 * parseFloat(result.et);
                                                                    if (BAFDE3T < 0) {
                                                                        south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAFDC31 = parseFloat(result.c1);
                                                                    if (BAFDC31 < 0) {
                                                                        south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 第四段壁板材料名称
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                                        BAFD4NameVal = rows[25][columns[0][1].field];
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // AJAX 获取材料密度、最大最小厚度
                                                                    let BAFDD4, BAFD4ThkMin, BAFD4ThkMax;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAFD4CategoryVal,
                                                                            "type": BAFD4TypeVal,
                                                                            "std": BAFD4STDVal,
                                                                            "name": BAFD4NameVal,
                                                                            "temp": BAFDDT
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAFDD4 = parseFloat(result.density);
                                                                            BAFD4ThkMin = parseFloat(result.thkMin);
                                                                            BAFD4ThkMax = parseFloat(result.thkMax);

                                                                            // 第四层壁板腐蚀裕量 C42
                                                                            let BAFDC42;
                                                                            if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                                && parseFloat(rows[26][columns[0][1].field]) < BAFD4ThkMax) {
                                                                                BAFDC42 = parseFloat(rows[26][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                                && parseFloat(rows[26][columns[0][1].field]) >= BAFD4ThkMax) {
                                                                                south.html("第四段壁板腐蚀裕量不能大于等于 " + BAFD4ThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // 第四段壁板名义厚度
                                                                            let BAFDTHK4N;
                                                                            if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                                && parseFloat(rows[27][columns[0][1].field]) > Math.max(BAFDC42, BAFD4ThkMin)
                                                                                && parseFloat(rows[27][columns[0][1].field]) <= BAFD4ThkMax) {
                                                                                BAFDTHK4N = parseFloat(rows[27][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                                && parseFloat(rows[27][columns[0][1].field]) <= Math.max(BAFDC42, BAFD4ThkMin)) {
                                                                                south.html("第四段壁板名义厚度不能小于等于 " + Math.max(BAFDC42, BAFD4ThkMin) + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                                && parseFloat(rows[27][columns[0][1].field]) > BAFD4ThkMax) {
                                                                                south.html("第四段壁板名义厚度不能大于 " + BAFD4ThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // ajax 获取 O4T E4T C41
                                                                            let BAFDO4T, BAFDE4T, BAFDC41;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAFD4CategoryVal,
                                                                                    "type": BAFD4TypeVal,
                                                                                    "std": BAFD4STDVal,
                                                                                    "name": BAFD4NameVal,
                                                                                    "thk": BAFDTHK4N,
                                                                                    "temp": BAFDDT,
                                                                                    "highLow": 3,
                                                                                    "isTube": 0,
                                                                                    "od": 100000
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAFDO4T = parseFloat(result.ot);
                                                                                    if (BAFDO4T < 0) {
                                                                                        south.html("查询第四段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BAFDE4T = 1000 * parseFloat(result.et);
                                                                                    if (BAFDE4T < 0) {
                                                                                        south.html("查询第四段壁板材料弹性模量失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BAFDC41 = parseFloat(result.c1);
                                                                                    if (BAFDC41 < 0) {
                                                                                        south.html("查询第四段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                        return false;
                                                                                    }

                                                                                    // 第五段壁板材料名称
                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                                                        BAFD5NameVal = rows[31][columns[0][1].field];
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // AJAX 获取材料密度、最大最小厚度
                                                                                    let BAFDD5, BAFD5ThkMin,
                                                                                        BAFD5ThkMax;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": BAFD5CategoryVal,
                                                                                            "type": BAFD5TypeVal,
                                                                                            "std": BAFD5STDVal,
                                                                                            "name": BAFD5NameVal,
                                                                                            "temp": BAFDDT
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            BAFDD5 = parseFloat(result.density);
                                                                                            BAFD5ThkMin = parseFloat(result.thkMin);
                                                                                            BAFD5ThkMax = parseFloat(result.thkMax);

                                                                                            // 第五层壁板腐蚀裕量 C52
                                                                                            let BAFDC52;
                                                                                            if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                                && parseFloat(rows[32][columns[0][1].field]) < BAFD5ThkMax) {
                                                                                                BAFDC52 = parseFloat(rows[32][columns[0][1].field]);
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                                && parseFloat(rows[32][columns[0][1].field]) >= BAFD5ThkMax) {
                                                                                                south.html("第五段壁板腐蚀裕量不能大于等于 " + BAFD5ThkMax + " mm").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            else {
                                                                                                return false;
                                                                                            }

                                                                                            // 第五段壁板名义厚度
                                                                                            let BAFDTHK5N;
                                                                                            if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                && parseFloat(rows[33][columns[0][1].field]) > Math.max(BAFDC52, BAFD5ThkMin)
                                                                                                && parseFloat(rows[33][columns[0][1].field]) <= BAFD5ThkMax) {
                                                                                                BAFDTHK5N = parseFloat(rows[33][columns[0][1].field]);
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                && parseFloat(rows[33][columns[0][1].field]) <= Math.max(BAFDC52, BAFD5ThkMin)) {
                                                                                                south.html("第五段壁板名义厚度不能小于等于 " + Math.max(BAFDC52, BAFD5ThkMin) + " mm").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                                                && parseFloat(rows[33][columns[0][1].field]) > BAFD5ThkMax) {
                                                                                                south.html("第五段壁板名义厚度不能大于 " + BAFD5ThkMax + " mm").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            else {
                                                                                                return false;
                                                                                            }

                                                                                            // ajax 获取 O5T E5T C51
                                                                                            let BAFDO5T, BAFDE5T,
                                                                                                BAFDC51;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BAFD5CategoryVal,
                                                                                                    "type": BAFD5TypeVal,
                                                                                                    "std": BAFD5STDVal,
                                                                                                    "name": BAFD5NameVal,
                                                                                                    "thk": BAFDTHK5N,
                                                                                                    "temp": BAFDDT,
                                                                                                    "highLow": 3,
                                                                                                    "isTube": 0,
                                                                                                    "od": 100000
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BAFDO5T = parseFloat(result.ot);
                                                                                                    if (BAFDO5T < 0) {
                                                                                                        south.html("查询第五段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BAFDE5T = 1000 * parseFloat(result.et);
                                                                                                    if (BAFDE5T < 0) {
                                                                                                        south.html("查询第五段壁板材料弹性模量失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BAFDC51 = parseFloat(result.c1);
                                                                                                    if (BAFDC51 < 0) {
                                                                                                        south.html("查询第五段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 加固件材料名称
                                                                                                    if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])) {
                                                                                                        BAFDJNameVal = rows[37][columns[0][1].field];
                                                                                                    }
                                                                                                    else {
                                                                                                        return false;
                                                                                                    }

                                                                                                    // ajax 获取 EJT
                                                                                                    let BAFDEJT;
                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "web_get_nbt_47003_1_2009_e.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "category": BAFDJCategoryVal,
                                                                                                            "type": BAFDJTypeVal,
                                                                                                            "std": BAFDJSTDVal,
                                                                                                            "name": BAFDJNameVal,
                                                                                                            "temp": BAFDDT
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            BAFDEJT = 1000 * parseFloat(result.et);
                                                                                                            if (BAFDEJT < 0) {
                                                                                                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                                                                                                return false;
                                                                                                            }

                                                                                                            // 过程参数
                                                                                                            let BAFDG = 9.81;

                                                                                                            let BAFDBH1 = 0.31 * BAFDBH;
                                                                                                            let BAFDC1 = BAFDC11 + BAFDC12;
                                                                                                            let BAFDTHK1E = BAFDTHK1N - BAFDC1;
                                                                                                            let BAFDBH1L = BAFDBH1 / BAFDL;
                                                                                                            let BAFDSH1 = BAFDBH1;

                                                                                                            let BAFDBH2 = 0.21 * BAFDBH;
                                                                                                            let BAFDC2 = BAFDC21 + BAFDC22;
                                                                                                            let BAFDTHK2E = BAFDTHK2N - BAFDC2;
                                                                                                            let BAFDBH2L = BAFDBH2 / BAFDL;
                                                                                                            let BAFDSH2 = BAFDBH1 + BAFDBH2;

                                                                                                            let BAFDBH3 = 0.18 * BAFDBH;
                                                                                                            let BAFDC3 = BAFDC31 + BAFDC32;
                                                                                                            let BAFDTHK3E = BAFDTHK3N - BAFDC3;
                                                                                                            let BAFDBH3L = BAFDBH3 / BAFDL;
                                                                                                            let BAFDSH3 = BAFDBH1 + BAFDBH2 + BAFDBH3;

                                                                                                            let BAFDBH4 = 0.16 * BAFDBH;
                                                                                                            let BAFDC4 = BAFDC41 + BAFDC42;
                                                                                                            let BAFDTHK4E = BAFDTHK4N - BAFDC4;
                                                                                                            let BAFDBH4L = BAFDBH4 / BAFDL;
                                                                                                            let BAFDSH4 = BAFDBH1 + BAFDBH2 + BAFDBH3 + BAFDBH4;

                                                                                                            let BAFDBH5 = 0.14 * BAFDBH;
                                                                                                            let BAFDC5 = BAFDC51 + BAFDC52;
                                                                                                            let BAFDTHK5E = BAFDTHK5N - BAFDC5;
                                                                                                            let BAFDBH5L = BAFDBH5 / BAFDL;
                                                                                                            let BAFDSH5 = BAFDBH1 + BAFDBH2 + BAFDBH3 + BAFDBH4 + BAFDBH5;

                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "ba": BAFDBH1L
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    let BAFDALPHA1 = parseFloat(result.alpha);
                                                                                                                    let BAFDBETA1 = parseFloat(result.beta);

                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "ba": BAFDBH2L
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            let BAFDALPHA2 = parseFloat(result.alpha);
                                                                                                                            let BAFDBETA2 = parseFloat(result.beta);

                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "ba": BAFDBH3L
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    let BAFDALPHA3 = parseFloat(result.alpha);
                                                                                                                                    let BAFDBETA3 = parseFloat(result.beta);

                                                                                                                                    $.ajax({
                                                                                                                                        type: "POST",
                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                        async: true,
                                                                                                                                        dataType: "json",
                                                                                                                                        data: JSON.stringify({
                                                                                                                                            "ba": BAFDBH4L
                                                                                                                                        }),
                                                                                                                                        beforeSend: function () {
                                                                                                                                        },
                                                                                                                                        success: function (result) {

                                                                                                                                            let BAFDALPHA4 = parseFloat(result.alpha);
                                                                                                                                            let BAFDBETA4 = parseFloat(result.beta);

                                                                                                                                            $.ajax({
                                                                                                                                                type: "POST",
                                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                                async: true,
                                                                                                                                                dataType: "json",
                                                                                                                                                data: JSON.stringify({
                                                                                                                                                    "ba": BAFDBH5L
                                                                                                                                                }),
                                                                                                                                                beforeSend: function () {
                                                                                                                                                },
                                                                                                                                                success: function (result) {

                                                                                                                                                    let BAFDALPHA5 = parseFloat(result.alpha);
                                                                                                                                                    let BAFDBETA5 = parseFloat(result.beta);

                                                                                                                                                    // 顶边加固件
                                                                                                                                                    let BAFDI0 = 0.217 * BAFDD * BAFDG * BAFDSH1 * BAFDSH1 * BAFDL * BAFDL * BAFDL / BAFDEJT / 1000000000;
                                                                                                                                                    south.html(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "顶边加固件所需最小惯性矩：" + BAFDI0.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第一段壁板
                                                                                                                                                    let BAFDTHK1C = BAFDL * Math.sqrt(3 * BAFDALPHA1 * BAFDD * BAFDG * BAFDSH1 / BAFDO1T / 1000000000);
                                                                                                                                                    let BAFDTHK1D = BAFDTHK1C + BAFDC12;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第一段壁板所需厚度：" + (BAFDTHK1D + BAFDC11).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDTHK1CHK;
                                                                                                                                                    if (BAFDTHK1N >= (BAFDTHK1D + BAFDC11)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK1N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK1CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK1N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK1CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAFDF1ALLOW = 5 * (BAFDTHK1E / 2 + Math.sqrt(BAFDBH1L) * BAFDL / 500);
                                                                                                                                                    let BAFDF1MAX = BAFDBETA1 * Math.pow(BAFDL, 4) * BAFDD * BAFDG * BAFDSH1 / 1000000000 / (2 * BAFDE1T * Math.pow(BAFDTHK1E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第一段壁板许用挠度：" + BAFDF1ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDF1CHK;
                                                                                                                                                    if (BAFDF1MAX <= BAFDF1ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF1MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF1CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF1MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF1CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // 第一道加固件
                                                                                                                                                    let BAFDF1 = BAFDD * BAFDG * BAFDSH2 * (BAFDSH1 + BAFDSH2) / 6 / 1000000000;
                                                                                                                                                    let BAFDI1 = 1.3 * BAFDF1 * BAFDL * BAFDL * BAFDL / BAFDEJT;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第一道加固件所需最小惯性矩：" + BAFDI1.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第二段壁板
                                                                                                                                                    let BAFDTHK2C = BAFDL * Math.sqrt(6 * BAFDALPHA2 * BAFDD * BAFDG * (BAFDSH1 + BAFDSH2) / BAFDO2T / 1000000000);
                                                                                                                                                    let BAFDTHK2D = BAFDTHK2C + BAFDC22;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第二段壁板所需厚度：" + (BAFDTHK2D + BAFDC21).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDTHK2CHK;
                                                                                                                                                    if (BAFDTHK2N >= (BAFDTHK2D + BAFDC21)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK2N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK2CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK2N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK2CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAFDF2ALLOW = 5 * (BAFDTHK2E / 2 + Math.sqrt(BAFDBH2L) * BAFDL / 500);
                                                                                                                                                    let BAFDF2MAX = BAFDBETA2 * Math.pow(BAFDL, 4) * BAFDD * BAFDG * (BAFDSH1 + BAFDSH2) / 1000000000 / (2 * BAFDE2T * Math.pow(BAFDTHK2E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第二段壁板许用挠度：" + BAFDF2ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDF2CHK;
                                                                                                                                                    if (BAFDF2MAX <= BAFDF2ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF2MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF2CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF2MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF2CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // 第二道加固件
                                                                                                                                                    let BAFDF2 = BAFDD * BAFDG * (BAFDSH3 - BAFDSH1) * (BAFDSH1 + BAFDSH2 + BAFDSH3) / 6 / 1000000000;
                                                                                                                                                    let BAFDI2 = 1.3 * BAFDF2 * BAFDL * BAFDL * BAFDL / BAFDEJT;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第二道加固件所需最小惯性矩：" + BAFDI2.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第三段壁板
                                                                                                                                                    let BAFDTHK3C = BAFDL * Math.sqrt(6 * BAFDALPHA3 * BAFDD * BAFDG * (BAFDSH2 + BAFDSH3) / BAFDO3T / 1000000000);
                                                                                                                                                    let BAFDTHK3D = BAFDTHK3C + BAFDC32;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第三段壁板所需厚度：" + (BAFDTHK3D + BAFDC31).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDTHK3CHK;
                                                                                                                                                    if (BAFDTHK3N >= (BAFDTHK3D + BAFDC31)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK3N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK3CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK3N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK3CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAFDF3ALLOW = 5 * (BAFDTHK3E / 2 + Math.sqrt(BAFDBH3L) * BAFDL / 500);
                                                                                                                                                    let BAFDF3MAX = BAFDBETA3 * Math.pow(BAFDL, 4) * BAFDD * BAFDG * (BAFDSH2 + BAFDSH3) / 1000000000 / (2 * BAFDE3T * Math.pow(BAFDTHK3E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第三段壁板许用挠度：" + BAFDF3ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDF3CHK;
                                                                                                                                                    if (BAFDF3MAX <= BAFDF3ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF3MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF3CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF3MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF3CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // 第三道加固件
                                                                                                                                                    let BAFDF3 = BAFDD * BAFDG * (BAFDSH4 - BAFDSH2) * (BAFDSH4 + BAFDSH3 + BAFDSH2) / 6 / 1000000000;
                                                                                                                                                    let BAFDI3 = 1.3 * BAFDF3 * BAFDL * BAFDL * BAFDL / BAFDEJT;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第三道加固件所需最小惯性矩：" + BAFDI3.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第四段壁板
                                                                                                                                                    let BAFDTHK4C = BAFDL * Math.sqrt(6 * BAFDALPHA4 * BAFDD * BAFDG * (BAFDSH3 + BAFDSH4) / BAFDO4T / 1000000000);
                                                                                                                                                    let BAFDTHK4D = BAFDTHK4C + BAFDC42;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第四段壁板所需厚度：" + (BAFDTHK4D + BAFDC41).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDTHK4CHK;
                                                                                                                                                    if (BAFDTHK4N >= (BAFDTHK4D + BAFDC41)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK4N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK4CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK4N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK4CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAFDF4ALLOW = 5 * (BAFDTHK4E / 2 + Math.sqrt(BAFDBH4L) * BAFDL / 500);
                                                                                                                                                    let BAFDF4MAX = BAFDBETA4 * Math.pow(BAFDL, 4) * BAFDD * BAFDG * (BAFDSH3 + BAFDSH4) / 1000000000 / (2 * BAFDE4T * Math.pow(BAFDTHK4E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第四段壁板许用挠度：" + BAFDF4ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDF4CHK;
                                                                                                                                                    if (BAFDF4MAX <= BAFDF4ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF4MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF4CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF4MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF4CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // 第四道加固件
                                                                                                                                                    let BAFDF4 = BAFDD * BAFDG * (BAFDSH5 - BAFDSH3) * (BAFDSH5 + BAFDSH4 + BAFDSH3) / 6 / 1000000000;
                                                                                                                                                    let BAFDI4 = 1.3 * BAFDF4 * BAFDL * BAFDL * BAFDL / BAFDEJT;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第四道加固件所需最小惯性矩：" + BAFDI4.toFixed(2) + " mm⁴" +
                                                                                                                                                        "</span>");

                                                                                                                                                    // 第五段壁板
                                                                                                                                                    let BAFDTHK5C = BAFDL * Math.sqrt(6 * BAFDALPHA5 * BAFDD * BAFDG * (BAFDSH4 + BAFDSH5) / BAFDO5T / 1000000000);
                                                                                                                                                    let BAFDTHK5D = BAFDTHK5C + BAFDC52;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第五段壁板所需厚度：" + (BAFDTHK5D + BAFDC51).toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDTHK5CHK;
                                                                                                                                                    if (BAFDTHK5N >= (BAFDTHK5D + BAFDC51)) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK5N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK5CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "输入厚度：" + BAFDTHK5N + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDTHK5CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    let BAFDF5ALLOW = 5 * (BAFDTHK5E / 2 + Math.sqrt(BAFDBH5L) * BAFDL / 500);
                                                                                                                                                    let BAFDF5MAX = BAFDBETA5 * Math.pow(BAFDL, 4) * BAFDD * BAFDG * (BAFDSH4 + BAFDSH5) / 1000000000 / (2 * BAFDE5T * Math.pow(BAFDTHK5E, 3));
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "第五段壁板许用挠度：" + BAFDF5ALLOW.toFixed(2) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                    let BAFDF5CHK;
                                                                                                                                                    if (BAFDF5MAX <= BAFDF5ALLOW) {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF5MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF5CHK = "合格";
                                                                                                                                                    }
                                                                                                                                                    else {
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际挠度：" + BAFDF5MAX.toFixed(2) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                        BAFDF5CHK = "不合格";
                                                                                                                                                    }

                                                                                                                                                    // docx
                                                                                                                                                    let BAFDPayJS = $('#payjs');

                                                                                                                                                    function getDocx() {
                                                                                                                                                        $.ajax({
                                                                                                                                                            type: "POST",
                                                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                                                            url: "bafddocx.action",
                                                                                                                                                            async: true,
                                                                                                                                                            dataType: "json",
                                                                                                                                                            data: JSON.stringify({
                                                                                                                                                                ribbonName: "BAFD",

                                                                                                                                                                t: BAFDDT,
                                                                                                                                                                d: BAFDD,
                                                                                                                                                                l: BAFDL,
                                                                                                                                                                bh: BAFDBH,

                                                                                                                                                                std1: BAFD1STDVal,
                                                                                                                                                                name1: BAFD1NameVal,
                                                                                                                                                                c12: BAFDC12,
                                                                                                                                                                thk1n: BAFDTHK1N,

                                                                                                                                                                std2: BAFD2STDVal,
                                                                                                                                                                name2: BAFD2NameVal,
                                                                                                                                                                c22: BAFDC22,
                                                                                                                                                                thk2n: BAFDTHK2N,

                                                                                                                                                                std3: BAFD3STDVal,
                                                                                                                                                                name3: BAFD3NameVal,
                                                                                                                                                                c32: BAFDC32,
                                                                                                                                                                thk3n: BAFDTHK3N,

                                                                                                                                                                std4: BAFD4STDVal,
                                                                                                                                                                name4: BAFD4NameVal,
                                                                                                                                                                c42: BAFDC42,
                                                                                                                                                                thk4n: BAFDTHK4N,

                                                                                                                                                                std5: BAFD5STDVal,
                                                                                                                                                                name5: BAFD5NameVal,
                                                                                                                                                                c52: BAFDC52,
                                                                                                                                                                thk5n: BAFDTHK5N,

                                                                                                                                                                jstd: BAFDJSTDVal,
                                                                                                                                                                jname: BAFDJNameVal,

                                                                                                                                                                d1: BAFDD1.toFixed(4),
                                                                                                                                                                c11: BAFDC11.toFixed(4),
                                                                                                                                                                o1t: BAFDO1T.toFixed(4),
                                                                                                                                                                e1t: (BAFDE1T / 1000).toFixed(4),

                                                                                                                                                                d2: BAFDD2.toFixed(4),
                                                                                                                                                                c21: BAFDC21.toFixed(4),
                                                                                                                                                                o2t: BAFDO2T.toFixed(4),
                                                                                                                                                                e2t: (BAFDE2T / 1000).toFixed(4),

                                                                                                                                                                d3: BAFDD3.toFixed(4),
                                                                                                                                                                c31: BAFDC31.toFixed(4),
                                                                                                                                                                o3t: BAFDO3T.toFixed(4),
                                                                                                                                                                e3t: (BAFDE3T / 1000).toFixed(4),

                                                                                                                                                                d4: BAFDD4.toFixed(4),
                                                                                                                                                                c41: BAFDC41.toFixed(4),
                                                                                                                                                                o4t: BAFDO4T.toFixed(4),
                                                                                                                                                                e4t: (BAFDE4T / 1000).toFixed(4),

                                                                                                                                                                d5: BAFDD5.toFixed(4),
                                                                                                                                                                c51: BAFDC51.toFixed(4),
                                                                                                                                                                o5t: BAFDO5T.toFixed(4),
                                                                                                                                                                e5t: (BAFDE5T / 1000).toFixed(4),

                                                                                                                                                                ejt: (BAFDEJT / 1000).toFixed(4),

                                                                                                                                                                g: BAFDG.toFixed(4),

                                                                                                                                                                bh1: BAFDBH1.toFixed(4),
                                                                                                                                                                c1: BAFDC1.toFixed(4),
                                                                                                                                                                thk1e: BAFDTHK1E.toFixed(4),
                                                                                                                                                                bh1l: BAFDBH1L.toFixed(4),
                                                                                                                                                                alpha1: BAFDALPHA1.toFixed(8),
                                                                                                                                                                beta1: BAFDBETA1.toFixed(8),
                                                                                                                                                                sh1: BAFDSH1.toFixed(4),

                                                                                                                                                                bh2: BAFDBH2.toFixed(4),
                                                                                                                                                                c2: BAFDC2.toFixed(4),
                                                                                                                                                                thk2e: BAFDTHK2E.toFixed(4),
                                                                                                                                                                bh2l: BAFDBH2L.toFixed(4),
                                                                                                                                                                alpha2: BAFDALPHA2.toFixed(8),
                                                                                                                                                                beta2: BAFDBETA2.toFixed(8),
                                                                                                                                                                sh2: BAFDSH2.toFixed(4),

                                                                                                                                                                bh3: BAFDBH3.toFixed(4),
                                                                                                                                                                c3: BAFDC3.toFixed(4),
                                                                                                                                                                thk3e: BAFDTHK3E.toFixed(4),
                                                                                                                                                                bh3l: BAFDBH3L.toFixed(4),
                                                                                                                                                                alpha3: BAFDALPHA3.toFixed(8),
                                                                                                                                                                beta3: BAFDBETA3.toFixed(8),
                                                                                                                                                                sh3: BAFDSH3.toFixed(4),

                                                                                                                                                                bh4: BAFDBH4.toFixed(4),
                                                                                                                                                                c4: BAFDC4.toFixed(4),
                                                                                                                                                                thk4e: BAFDTHK4E.toFixed(4),
                                                                                                                                                                bh4l: BAFDBH4L.toFixed(4),
                                                                                                                                                                alpha4: BAFDALPHA4.toFixed(8),
                                                                                                                                                                beta4: BAFDBETA4.toFixed(8),
                                                                                                                                                                sh4: BAFDSH4.toFixed(4),

                                                                                                                                                                bh5: BAFDBH5.toFixed(4),
                                                                                                                                                                c5: BAFDC5.toFixed(4),
                                                                                                                                                                thk5e: BAFDTHK5E.toFixed(4),
                                                                                                                                                                bh5l: BAFDBH5L.toFixed(4),
                                                                                                                                                                alpha5: BAFDALPHA5.toFixed(8),
                                                                                                                                                                beta5: BAFDBETA5.toFixed(8),
                                                                                                                                                                sh5: BAFDSH5.toFixed(4),

                                                                                                                                                                i0: BAFDI0.toFixed(4),

                                                                                                                                                                thk1c: BAFDTHK1C.toFixed(4),
                                                                                                                                                                thk1d: BAFDTHK1D.toFixed(4),
                                                                                                                                                                thk1chk: BAFDTHK1CHK,
                                                                                                                                                                f1allow: BAFDF1ALLOW.toFixed(4),
                                                                                                                                                                f1max: BAFDF1MAX.toFixed(4),
                                                                                                                                                                f1chk: BAFDF1CHK,

                                                                                                                                                                f1: BAFDF1.toFixed(4),
                                                                                                                                                                i1: BAFDI1.toFixed(4),

                                                                                                                                                                thk2c: BAFDTHK2C.toFixed(4),
                                                                                                                                                                thk2d: BAFDTHK2D.toFixed(4),
                                                                                                                                                                thk2chk: BAFDTHK2CHK,
                                                                                                                                                                f2allow: BAFDF2ALLOW.toFixed(4),
                                                                                                                                                                f2max: BAFDF2MAX.toFixed(4),
                                                                                                                                                                f2chk: BAFDF2CHK,

                                                                                                                                                                f2: BAFDF2.toFixed(4),
                                                                                                                                                                i2: BAFDI2.toFixed(4),

                                                                                                                                                                thk3c: BAFDTHK3C.toFixed(4),
                                                                                                                                                                thk3d: BAFDTHK3D.toFixed(4),
                                                                                                                                                                thk3chk: BAFDTHK3CHK,
                                                                                                                                                                f3allow: BAFDF3ALLOW.toFixed(4),
                                                                                                                                                                f3max: BAFDF3MAX.toFixed(4),
                                                                                                                                                                f3chk: BAFDF3CHK,

                                                                                                                                                                f3: BAFDF3.toFixed(4),
                                                                                                                                                                i3: BAFDI3.toFixed(4),

                                                                                                                                                                thk4c: BAFDTHK4C.toFixed(4),
                                                                                                                                                                thk4d: BAFDTHK4D.toFixed(4),
                                                                                                                                                                thk4chk: BAFDTHK4CHK,
                                                                                                                                                                f4allow: BAFDF4ALLOW.toFixed(4),
                                                                                                                                                                f4max: BAFDF4MAX.toFixed(4),
                                                                                                                                                                f4chk: BAFDF4CHK,

                                                                                                                                                                f4: BAFDF4.toFixed(4),
                                                                                                                                                                i4: BAFDI4.toFixed(4),

                                                                                                                                                                thk5c: BAFDTHK5C.toFixed(4),
                                                                                                                                                                thk5d: BAFDTHK5D.toFixed(4),
                                                                                                                                                                thk5chk: BAFDTHK5CHK,
                                                                                                                                                                f5allow: BAFDF5ALLOW.toFixed(4),
                                                                                                                                                                f5max: BAFDF5MAX.toFixed(4),
                                                                                                                                                                f5chk: BAFDF5CHK
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
                                                                                                                                                                    BAFDPayJS.dialog({
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
                                                                                                                                                                                BAFDPayJS.dialog("close");
                                                                                                                                                                                BAFDPayJS.dialog("clear");
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
                                                                                                                                                                                            BAFDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                                    BAFDPayJS.dialog('close');
                                                                                                                                                                                                    BAFDPayJS.dialog('clear');
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