$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bagfSketch = $("#d2");
    let bagfModel = $("#d3");
    let bagfd2d3 = $('#d2d3');

    $("#cal").html("<table id='bagf'></table>");
    let pg = $("#bagf");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/b/a/g/f/BAGF.json", function (result) {

        let BAGFDT;
        let BAGF1Category, BAGF1CategoryVal, BAGF1Type, BAGF1TypeVal, BAGF1STD, BAGF1STDVal, BAGF1Name, BAGF1NameVal,
            BAGF2Category, BAGF2CategoryVal, BAGF2Type, BAGF2TypeVal, BAGF2STD, BAGF2STDVal, BAGF2Name, BAGF2NameVal,
            BAGF3Category, BAGF3CategoryVal, BAGF3Type, BAGF3TypeVal, BAGF3STD, BAGF3STDVal, BAGF3Name, BAGF3NameVal,
            BAGF4Category, BAGF4CategoryVal, BAGF4Type, BAGF4TypeVal, BAGF4STD, BAGF4STDVal, BAGF4Name, BAGF4NameVal,
            BAGFJCategory, BAGFJCategoryVal, BAGFJType, BAGFJTypeVal, BAGFJSTD, BAGFJSTDVal, BAGFJName, BAGFJNameVal;
        let columns, rows, ed;

        function bagf2d(bh = "H", bh1 = "0.37H", bh2 = "0.25H", bh3 = "0.21H", bh4 = "0.17H", l = "L") {

            bagfSketch.empty();

            let width = bagfSketch.width();
            let height = bagfSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAGF2VG").attr("height", height);

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
                {x: padding + wg - 6 * thk, y: padding + 1.5 * hg},
                {x: padding + wg - thk, y: padding + 1.5 * hg},
                {x: padding + wg - thk, y: padding + 1.5 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 1.5 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 1.5 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 1.5 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 1.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.5 * hg}
            ])).classed("sketch", true);

            // 角钢 第二层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.5 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.5 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.5 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.5 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.5 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 左
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

            // 角钢 第三层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.5 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.5 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.5 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.5 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.5 * hg}
            ])).classed("sketch", true);

            // 角钢 第四层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 3.3 * hg},
                {x: padding + wg - thk, y: padding + 3.3 * hg},
                {x: padding + wg - thk, y: padding + 3.3 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.3 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3.3 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.3 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3.3 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3.3 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.3 * hg}
            ])).classed("sketch", true);

            // 角钢 第四层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.3 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.3 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.3 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.3 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.3 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.3 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.3 * hg}
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
            ])).attr("id", "BAGFSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGFSketchH")
                .attr("startOffset", "50%").text(bh);

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 1.5 * hg, padding + wg - 6 * thk, padding, bh1, "BAGFSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 2.5 * hg, padding + wg - 6 * thk, padding + 1.5 * hg, bh2, "BAGFSketchBH2");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 3.3 * hg, padding + wg - 6 * thk, padding + 2.5 * hg, bh3, "BAGFSketchBH3");

            // BH2
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3.3 * hg, bh4, "BAGFSketchBH4");

            // 垂直加固柱
            drawLine(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + thk);
            drawLine(padding + 3 * wg + 6 * thk, height - padding, padding + 3 * wg + 6 * thk, padding + thk);

            // L
            dimBottomH(padding + wg, height - padding, padding + 3 * wg, height - padding, l, "BAGFSketchL");
        }

        currentTabIndex = bagfd2d3.tabs('getTabIndex', bagfd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bagf2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bagf").length > 0) {
                    bagf2d();
                }
            });
        }
        bagfd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bagf2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bagf").length > 0) {
                            bagf2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "顶边加固、无拉杆、垂直加固、三道水平加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAGFJCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAGFJType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAGFJSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAGFJName);
                }

                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAGF1Category);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAGF1Type);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAGF1STD);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAGF1Name);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAGF2Category);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAGF2Type);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAGF2STD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAGF2Name);
                }

                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAGF3Category);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAGF3Type);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAGF3STD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAGF3Name);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", BAGF4Category);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAGF4Type);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAGF4STD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAGF4Name);
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
                    bagfSketch.empty();

                    // model
                    bagfModel.empty();

                    // sketch
                    currentTabIndex = bagfd2d3.tabs('getTabIndex', bagfd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bagf2d();
                        bagfSketch.off("resize").on("resize", function () {
                            if ($("#bagf").length > 0) {
                                bagf2d();
                            }
                        });
                    }
                    bagfd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagf2d();
                                bagfSketch.off("resize").on("resize", function () {
                                    if ($("#bagf").length > 0) {
                                        bagf2d();
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

                        BAGFDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGFJCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGFJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGFJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGFJName = null;

                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGF1Category = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGF1Type = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGF1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGF1Name = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAGF2Category = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGF2Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGF2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGF2Name = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAGF3Category = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGF3Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGF3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGF3Name = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BAGF4Category = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGF4Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGF4STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGF4Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF1Category = [];
                                BAGF2Category = [];
                                BAGF3Category = [];
                                BAGF4Category = [];
                                BAGFJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAGFDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAGF1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGF2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGF3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGF4Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGFJCategory[index] = {
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

                        BAGFJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGFJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGFJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGFJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGFJCategoryVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGFJType = [];
                                $(result).each(function (index, element) {
                                    BAGFJType[index] = {
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

                        BAGFJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGFJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGFJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGFJCategoryVal,
                                type: BAGFJTypeVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGFJSTD = [];
                                $(result).each(function (index, element) {
                                    BAGFJSTD[index] = {
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

                        BAGFJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGFJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGFJCategoryVal,
                                type: BAGFJTypeVal,
                                std: BAGFJSTDVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGFJName = [];
                                $(result).each(function (index, element) {
                                    BAGFJName[index] = {
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

                        BAGF1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGF1Type = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGF1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGF1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF1CategoryVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF1Type = [];
                                $(result).each(function (index, element) {
                                    BAGF1Type[index] = {
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

                        BAGF1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGF1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGF1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF1CategoryVal,
                                type: BAGF1TypeVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF1STD = [];
                                $(result).each(function (index, element) {
                                    BAGF1STD[index] = {
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

                        BAGF1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGF1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF1CategoryVal,
                                type: BAGF1TypeVal,
                                std: BAGF1STDVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF1Name = [];
                                $(result).each(function (index, element) {
                                    BAGF1Name[index] = {
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

                        BAGF2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGF2Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGF2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGF2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF2CategoryVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF2Type = [];
                                $(result).each(function (index, element) {
                                    BAGF2Type[index] = {
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

                        BAGF2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGF2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGF2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF2CategoryVal,
                                type: BAGF2TypeVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF2STD = [];
                                $(result).each(function (index, element) {
                                    BAGF2STD[index] = {
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

                        BAGF2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGF2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF2CategoryVal,
                                type: BAGF2TypeVal,
                                std: BAGF2STDVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF2Name = [];
                                $(result).each(function (index, element) {
                                    BAGF2Name[index] = {
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

                        BAGF3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGF3Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGF3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGF3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF3CategoryVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF3Type = [];
                                $(result).each(function (index, element) {
                                    BAGF3Type[index] = {
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

                        BAGF3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGF3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGF3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF3CategoryVal,
                                type: BAGF3TypeVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF3STD = [];
                                $(result).each(function (index, element) {
                                    BAGF3STD[index] = {
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

                        BAGF3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGF3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF3CategoryVal,
                                type: BAGF3TypeVal,
                                std: BAGF3STDVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF3Name = [];
                                $(result).each(function (index, element) {
                                    BAGF3Name[index] = {
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

                        BAGF4CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAGF4Type = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGF4STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGF4Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF4CategoryVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF4Type = [];
                                $(result).each(function (index, element) {
                                    BAGF4Type[index] = {
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

                        BAGF4TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAGF4STD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGF4Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF4CategoryVal,
                                type: BAGF4TypeVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF4STD = [];
                                $(result).each(function (index, element) {
                                    BAGF4STD[index] = {
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

                        BAGF4STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAGF4Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGF4CategoryVal,
                                type: BAGF4TypeVal,
                                std: BAGF4STDVal,
                                temp: BAGFDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGF4Name = [];
                                $(result).each(function (index, element) {
                                    BAGF4Name[index] = {
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
                    let BAGFD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAGFD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LC
                    let BAGFLC;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAGFLC = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H
                    let BAGFBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAGFLC, 0.1 / 0.37 * BAGFLC, 0.1 / 0.25 * BAGFLC, 0.1 / 0.21 * BAGFLC, 0.1 / 0.17 * BAGFLC)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAGFLC, 5 / 0.37 * BAGFLC, 5 / 0.25 * BAGFLC, 5 / 0.21 * BAGFLC, 5 / 0.17 * BAGFLC)) {
                        BAGFBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAGFLC, 0.1 / 0.37 * BAGFLC, 0.1 / 0.25 * BAGFLC, 0.1 / 0.21 * BAGFLC, 0.1 / 0.17 * BAGFLC)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAGFLC, 0.1 / 0.37 * BAGFLC, 0.1 / 0.25 * BAGFLC, 0.1 / 0.21 * BAGFLC, 0.1 / 0.17 * BAGFLC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAGFLC, 5 / 0.37 * BAGFLC, 5 / 0.25 * BAGFLC, 5 / 0.21 * BAGFLC, 5 / 0.17 * BAGFLC)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAGFLC, 5 / 0.37 * BAGFLC, 5 / 0.25 * BAGFLC, 5 / 0.21 * BAGFLC, 5 / 0.17 * BAGFLC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagf2d(BAGFBH, (0.37 * BAGFBH).toFixed(2), (0.25 * BAGFBH).toFixed(2), (0.21 * BAGFBH).toFixed(2), (0.17 * BAGFBH).toFixed(2));
                        bagfSketch.off("resize").on("resize", function () {
                            if ($("#bagf").length > 0) {
                                bagf2d(BAGFBH, (0.37 * BAGFBH).toFixed(2), (0.25 * BAGFBH).toFixed(2), (0.21 * BAGFBH).toFixed(2), (0.17 * BAGFBH).toFixed(2));
                            }
                        });
                    }
                    bagfd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagf2d(BAGFBH, (0.37 * BAGFBH).toFixed(2), (0.25 * BAGFBH).toFixed(2), (0.21 * BAGFBH).toFixed(2), (0.17 * BAGFBH).toFixed(2));
                                bagfSketch.off("resize").on("resize", function () {
                                    if ($("#bagf").length > 0) {
                                        bagf2d(BAGFBH, (0.37 * BAGFBH).toFixed(2), (0.25 * BAGFBH).toFixed(2), (0.21 * BAGFBH).toFixed(2), (0.17 * BAGFBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // L
                    let BAGFL;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])
                        && parseFloat(rows[4][columns[0][1].field]) >= BAGFLC) {
                        BAGFL = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])
                        && parseFloat(rows[4][columns[0][1].field]) < BAGFLC) {
                        south.html("壁板宽度 L 不能小于 " + BAGFLC + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagf2d(BAGFBH, (0.37 * BAGFBH).toFixed(2), (0.25 * BAGFBH).toFixed(2), (0.21 * BAGFBH).toFixed(2), (0.17 * BAGFBH).toFixed(2), BAGFL);
                        bagfSketch.off("resize").on("resize", function () {
                            if ($("#bagf").length > 0) {
                                bagf2d(BAGFBH, (0.37 * BAGFBH).toFixed(2), (0.25 * BAGFBH).toFixed(2), (0.21 * BAGFBH).toFixed(2), (0.17 * BAGFBH).toFixed(2), BAGFL);
                            }
                        });
                    }
                    bagfd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagf2d(BAGFBH, (0.37 * BAGFBH).toFixed(2), (0.25 * BAGFBH).toFixed(2), (0.21 * BAGFBH).toFixed(2), (0.17 * BAGFBH).toFixed(2), BAGFL);
                                bagfSketch.off("resize").on("resize", function () {
                                    if ($("#bagf").length > 0) {
                                        bagf2d(BAGFBH, (0.37 * BAGFBH).toFixed(2), (0.25 * BAGFBH).toFixed(2), (0.21 * BAGFBH).toFixed(2), (0.17 * BAGFBH).toFixed(2), BAGFL);
                                    }
                                });
                            }
                        }
                    });

                    // 加固件材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        BAGFJNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // ajax 获取 EJT
                    let BAGFEJT;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_e.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAGFJCategoryVal,
                            "type": BAGFJTypeVal,
                            "std": BAGFJSTDVal,
                            "name": BAGFJNameVal,
                            "temp": BAGFDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAGFEJT = 1000 * parseFloat(result.et);
                            if (BAGFEJT < 0) {
                                south.html("查询顶边加固件材料弹性模量失败！").css("color", "red");
                                return false;
                            }

                            // 第一段壁板材料名称
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                BAGF1NameVal = rows[12][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // AJAX 获取材料密度、最大最小厚度
                            let BAGFD1, BAGF1ThkMin, BAGF1ThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAGF1CategoryVal,
                                    "type": BAGF1TypeVal,
                                    "std": BAGF1STDVal,
                                    "name": BAGF1NameVal,
                                    "temp": BAGFDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAGFD1 = parseFloat(result.density);
                                    BAGF1ThkMin = parseFloat(result.thkMin);
                                    BAGF1ThkMax = parseFloat(result.thkMax);

                                    // 第一层壁板腐蚀裕量 C12
                                    let BAGFC12;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < BAGF1ThkMax) {
                                        BAGFC12 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= BAGF1ThkMax) {
                                        south.html("第一段壁板腐蚀裕量不能大于等于 " + BAGF1ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 第一段壁板名义厚度
                                    let BAGFTHK1N;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) > Math.max(BAGFC12, BAGF1ThkMin)
                                        && parseFloat(rows[14][columns[0][1].field]) <= BAGF1ThkMax) {
                                        BAGFTHK1N = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) <= Math.max(BAGFC12, BAGF1ThkMin)) {
                                        south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAGFC12, BAGF1ThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) > BAGF1ThkMax) {
                                        south.html("第一段壁板名义厚度不能大于 " + BAGF1ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // ajax 获取 O1T E1T C11
                                    let BAGFO1T, BAGFE1T, BAGFC11;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAGF1CategoryVal,
                                            "type": BAGF1TypeVal,
                                            "std": BAGF1STDVal,
                                            "name": BAGF1NameVal,
                                            "thk": BAGFTHK1N,
                                            "temp": BAGFDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAGFO1T = parseFloat(result.ot);
                                            if (BAGFO1T < 0) {
                                                south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGFE1T = 1000 * parseFloat(result.et);
                                            if (BAGFE1T < 0) {
                                                south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGFC11 = parseFloat(result.c1);
                                            if (BAGFC11 < 0) {
                                                south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 第二段壁板材料名称
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                BAGF2NameVal = rows[18][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAGFD2, BAGF2ThkMin, BAGF2ThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAGF2CategoryVal,
                                                    "type": BAGF2TypeVal,
                                                    "std": BAGF2STDVal,
                                                    "name": BAGF2NameVal,
                                                    "temp": BAGFDT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAGFD2 = parseFloat(result.density);
                                                    BAGF2ThkMin = parseFloat(result.thkMin);
                                                    BAGF2ThkMax = parseFloat(result.thkMax);

                                                    // 第二层壁板腐蚀裕量 C22
                                                    let BAGFC22;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAGF2ThkMax) {
                                                        BAGFC22 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAGF2ThkMax) {
                                                        south.html("第二段壁板腐蚀裕量不能大于等于 " + BAGF2ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 第二段壁板名义厚度
                                                    let BAGFTHK2N;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.max(BAGFC22, BAGF2ThkMin)
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BAGF2ThkMax) {
                                                        BAGFTHK2N = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.max(BAGFC22, BAGF2ThkMin)) {
                                                        south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAGFC22, BAGF2ThkMin) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BAGF2ThkMax) {
                                                        south.html("第二段壁板名义厚度不能大于 " + BAGF2ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 O2T E2T C21
                                                    let BAGFO2T, BAGFE2T, BAGFC21;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAGF2CategoryVal,
                                                            "type": BAGF2TypeVal,
                                                            "std": BAGF2STDVal,
                                                            "name": BAGF2NameVal,
                                                            "thk": BAGFTHK2N,
                                                            "temp": BAGFDT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAGFO2T = parseFloat(result.ot);
                                                            if (BAGFO2T < 0) {
                                                                south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGFE2T = 1000 * parseFloat(result.et);
                                                            if (BAGFE2T < 0) {
                                                                south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGFC21 = parseFloat(result.c1);
                                                            if (BAGFC21 < 0) {
                                                                south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 第三段壁板材料名称
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                BAGF3NameVal = rows[24][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // AJAX 获取材料密度、最大最小厚度
                                                            let BAGFD3, BAGF3ThkMin, BAGF3ThkMax;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAGF3CategoryVal,
                                                                    "type": BAGF3TypeVal,
                                                                    "std": BAGF3STDVal,
                                                                    "name": BAGF3NameVal,
                                                                    "temp": BAGFDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAGFD3 = parseFloat(result.density);
                                                                    BAGF3ThkMin = parseFloat(result.thkMin);
                                                                    BAGF3ThkMax = parseFloat(result.thkMax);

                                                                    // 第三层壁板腐蚀裕量 C32
                                                                    let BAGFC32;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) < BAGF3ThkMax) {
                                                                        BAGFC32 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BAGF3ThkMax) {
                                                                        south.html("第三段壁板腐蚀裕量不能大于等于 " + BAGF3ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第三段壁板名义厚度
                                                                    let BAGFTHK3N;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > Math.max(BAGFC32, BAGF3ThkMin)
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= BAGF3ThkMax) {
                                                                        BAGFTHK3N = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= Math.max(BAGFC32, BAGF3ThkMin)) {
                                                                        south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAGFC32, BAGF3ThkMin) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > BAGF3ThkMax) {
                                                                        south.html("第三段壁板名义厚度不能大于 " + BAGF3ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // ajax 获取 O3T E3T C31
                                                                    let BAGFO3T, BAGFE3T, BAGFC31;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAGF3CategoryVal,
                                                                            "type": BAGF3TypeVal,
                                                                            "std": BAGF3STDVal,
                                                                            "name": BAGF3NameVal,
                                                                            "thk": BAGFTHK3N,
                                                                            "temp": BAGFDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": 100000
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAGFO3T = parseFloat(result.ot);
                                                                            if (BAGFO3T < 0) {
                                                                                south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGFE3T = 1000 * parseFloat(result.et);
                                                                            if (BAGFE3T < 0) {
                                                                                south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGFC31 = parseFloat(result.c1);
                                                                            if (BAGFC31 < 0) {
                                                                                south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 第四段壁板材料名称
                                                                            if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                                                BAGF4NameVal = rows[30][columns[0][1].field];
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // AJAX 获取材料密度、最大最小厚度
                                                                            let BAGFD4, BAGF4ThkMin, BAGF4ThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAGF4CategoryVal,
                                                                                    "type": BAGF4TypeVal,
                                                                                    "std": BAGF4STDVal,
                                                                                    "name": BAGF4NameVal,
                                                                                    "temp": BAGFDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAGFD4 = parseFloat(result.density);
                                                                                    BAGF4ThkMin = parseFloat(result.thkMin);
                                                                                    BAGF4ThkMax = parseFloat(result.thkMax);

                                                                                    // 第四层壁板腐蚀裕量 C42
                                                                                    let BAGFC42;
                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) < BAGF4ThkMax) {
                                                                                        BAGFC42 = parseFloat(rows[31][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                        && parseFloat(rows[31][columns[0][1].field]) >= BAGF4ThkMax) {
                                                                                        south.html("第四段壁板腐蚀裕量不能大于等于 " + BAGF4ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // 第四段壁板名义厚度
                                                                                    let BAGFTHK4N;
                                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > Math.max(BAGFC42, BAGF4ThkMin)
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= BAGF4ThkMax) {
                                                                                        BAGFTHK4N = parseFloat(rows[32][columns[0][1].field]);
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) <= Math.max(BAGFC42, BAGF4ThkMin)) {
                                                                                        south.html("第四段壁板名义厚度不能小于等于 " + Math.max(BAGFC42, BAGF4ThkMin) + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                        && parseFloat(rows[32][columns[0][1].field]) > BAGF4ThkMax) {
                                                                                        south.html("第四段壁板名义厚度不能大于 " + BAGF4ThkMax + " mm").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // ajax 获取 O4T E4T C41
                                                                                    let BAGFO4T, BAGFE4T, BAGFC41;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": BAGF4CategoryVal,
                                                                                            "type": BAGF4TypeVal,
                                                                                            "std": BAGF4STDVal,
                                                                                            "name": BAGF4NameVal,
                                                                                            "thk": BAGFTHK4N,
                                                                                            "temp": BAGFDT,
                                                                                            "highLow": 3,
                                                                                            "isTube": 0,
                                                                                            "od": 100000
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            BAGFO4T = parseFloat(result.ot);
                                                                                            if (BAGFO4T < 0) {
                                                                                                south.html("查询第四段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGFE4T = 1000 * parseFloat(result.et);
                                                                                            if (BAGFE4T < 0) {
                                                                                                south.html("查询第四段壁板材料弹性模量失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            BAGFC41 = parseFloat(result.c1);
                                                                                            if (BAGFC41 < 0) {
                                                                                                south.html("查询第四段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                                return false;
                                                                                            }

                                                                                            // 过程参数
                                                                                            let BAGFG = 9.81;
                                                                                            let BAGFPC = BAGFD * BAGFG * BAGFBH / 1000000000;
                                                                                            let BAGFBHLC = BAGFBH / BAGFLC;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "ba": BAGFBHLC
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    let BAGFALPHA = parseFloat(result.alpha);
                                                                                                    let BAGFBETA = parseFloat(result.beta);

                                                                                                    let BAGFBH1 = 0.37 * BAGFBH;
                                                                                                    let BAGFC1 = BAGFC11 + BAGFC12;
                                                                                                    let BAGFTHK1E = BAGFTHK1N - BAGFC1;
                                                                                                    let BAGFBH1LC = BAGFBH1 / BAGFLC;
                                                                                                    let BAGFSH1 = BAGFBH1;
                                                                                                    let BAGFPC1 = BAGFD * BAGFG * BAGFSH1 / 1000000000;

                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "ba": BAGFBH1LC
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            let BAGFALPHA1 = parseFloat(result.alpha);
                                                                                                            let BAGFBETA1 = parseFloat(result.beta);

                                                                                                            let BAGFBH2 = 0.25 * BAGFBH;
                                                                                                            let BAGFC2 = BAGFC21 + BAGFC22;
                                                                                                            let BAGFTHK2E = BAGFTHK2N - BAGFC2;
                                                                                                            let BAGFBH2LC = BAGFBH2 / BAGFLC;
                                                                                                            let BAGFSH2 = BAGFBH1 + BAGFBH2;
                                                                                                            let BAGFPC2 = BAGFD * BAGFG * BAGFSH2 / 1000000000;

                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "ba": BAGFBH2LC
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    let BAGFALPHA2 = parseFloat(result.alpha);
                                                                                                                    let BAGFBETA2 = parseFloat(result.beta);

                                                                                                                    let BAGFBH3 = 0.21 * BAGFBH;
                                                                                                                    let BAGFC3 = BAGFC31 + BAGFC32;
                                                                                                                    let BAGFTHK3E = BAGFTHK3N - BAGFC3;
                                                                                                                    let BAGFBH3LC = BAGFBH3 / BAGFLC;
                                                                                                                    let BAGFSH3 = BAGFBH1 + BAGFBH2 + BAGFBH3;
                                                                                                                    let BAGFPC3 = BAGFD * BAGFG * BAGFSH3 / 1000000000;

                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "ba": BAGFBH3LC
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            let BAGFALPHA3 = parseFloat(result.alpha);
                                                                                                                            let BAGFBETA3 = parseFloat(result.beta);

                                                                                                                            let BAGFBH4 = 0.17 * BAGFBH;
                                                                                                                            let BAGFC4 = BAGFC41 + BAGFC42;
                                                                                                                            let BAGFTHK4E = BAGFTHK4N - BAGFC4;
                                                                                                                            let BAGFBH4LC = BAGFBH4 / BAGFLC;
                                                                                                                            let BAGFSH4 = BAGFBH1 + BAGFBH2 + BAGFBH3 + BAGFBH4;
                                                                                                                            let BAGFPC4 = BAGFD * BAGFG * BAGFSH4 / 1000000000;

                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "ba": BAGFBH4LC
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    let BAGFALPHA4 = parseFloat(result.alpha);
                                                                                                                                    let BAGFBETA4 = parseFloat(result.beta);

                                                                                                                                    // 顶边加固件
                                                                                                                                    let BAGFI0 = 0.217 * BAGFPC1 * BAGFSH1 * BAGFL * BAGFL * BAGFL / BAGFEJT;
                                                                                                                                    south.html(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "顶边加固件所需最小惯性矩：" + BAGFI0.toFixed(2) + " mm⁴" +
                                                                                                                                        "</span>");

                                                                                                                                    // 第一段加固柱校核
                                                                                                                                    let BAGFLMAX1 = 0.408 * BAGFTHK1E * Math.sqrt(BAGFO1T / (BAGFALPHA * BAGFPC));
                                                                                                                                    let BAGFZP1 = BAGFLC * (0.0642 * BAGFPC * BAGFBH * BAGFBH / BAGFO1T - BAGFTHK1E * BAGFTHK1E / 6);

                                                                                                                                    // 第一段壁板
                                                                                                                                    let BAGFTHK1C = BAGFLC * Math.sqrt(3 * BAGFALPHA1 * BAGFPC1 / BAGFO1T);
                                                                                                                                    let BAGFTHK1D = BAGFTHK1C + BAGFC12;
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第一段壁板所需厚度：" + (BAGFTHK1D + BAGFC11).toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFTHK1CHK;
                                                                                                                                    if (BAGFTHK1N >= (BAGFTHK1D + BAGFC11)) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "输入厚度：" + BAGFTHK1N + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFTHK1CHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "输入厚度：" + BAGFTHK1N + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFTHK1CHK = "不合格";
                                                                                                                                    }
                                                                                                                                    let BAGFF1ALLOW = 5 * (BAGFTHK1E / 2 + Math.sqrt(BAGFBH1LC) * BAGFLC / 500);
                                                                                                                                    let BAGFF1MAX = BAGFBETA1 * Math.pow(BAGFLC, 4) * BAGFPC1 / (2 * BAGFE1T * Math.pow(BAGFTHK1E, 3));
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第一段壁板许用挠度：" + BAGFF1ALLOW.toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFF1CHK;
                                                                                                                                    if (BAGFF1MAX <= BAGFF1ALLOW) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际挠度：" + BAGFF1MAX.toFixed(2) + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFF1CHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际挠度：" + BAGFF1MAX.toFixed(2) + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFF1CHK = "不合格";
                                                                                                                                    }

                                                                                                                                    // 第一道水平加固件
                                                                                                                                    let BAGFF1 = BAGFPC2 * (BAGFSH1 + BAGFSH2) / 6;
                                                                                                                                    let BAGFI1 = 1.3 * BAGFF1 * BAGFLC * BAGFLC * BAGFLC / BAGFEJT;
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第一道水平加固件所需最小惯性矩：" + BAGFI1.toFixed(2) + " mm⁴" +
                                                                                                                                        "</span>");

                                                                                                                                    // 第二段加固柱校核
                                                                                                                                    let BAGFLMAX2 = 0.408 * BAGFTHK2E * Math.sqrt(BAGFO2T / (BAGFALPHA * BAGFPC));
                                                                                                                                    let BAGFZP2 = BAGFLC * (0.0642 * BAGFPC * BAGFBH * BAGFBH / BAGFO2T - BAGFTHK2E * BAGFTHK2E / 6);

                                                                                                                                    // 第二段壁板
                                                                                                                                    let BAGFTHK2C = BAGFLC * Math.sqrt(6 * BAGFALPHA2 * (BAGFPC1 + BAGFPC2) / BAGFO2T);
                                                                                                                                    let BAGFTHK2D = BAGFTHK2C + BAGFC22;
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第二段壁板所需厚度：" + (BAGFTHK2D + BAGFC21).toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFTHK2CHK;
                                                                                                                                    if (BAGFTHK2N >= (BAGFTHK2D + BAGFC21)) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "输入厚度：" + BAGFTHK2N + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFTHK2CHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "输入厚度：" + BAGFTHK2N + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFTHK2CHK = "不合格";
                                                                                                                                    }
                                                                                                                                    let BAGFF2ALLOW = 5 * (BAGFTHK2E / 2 + Math.sqrt(BAGFBH2LC) * BAGFLC / 500);
                                                                                                                                    let BAGFF2MAX = BAGFBETA2 * Math.pow(BAGFLC, 4) * (BAGFPC1 + BAGFPC2) / (2 * BAGFE2T * Math.pow(BAGFTHK2E, 3));
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第二段壁板许用挠度：" + BAGFF2ALLOW.toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFF2CHK;
                                                                                                                                    if (BAGFF2MAX <= BAGFF2ALLOW) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际挠度：" + BAGFF2MAX.toFixed(2) + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFF2CHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际挠度：" + BAGFF2MAX.toFixed(2) + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFF2CHK = "不合格";
                                                                                                                                    }

                                                                                                                                    // 第二道水平加固件
                                                                                                                                    let BAGFF2 = (BAGFPC3 - BAGFPC1) * (BAGFSH1 + BAGFSH2 + BAGFSH3) / 6;
                                                                                                                                    let BAGFI2 = 1.3 * BAGFF2 * BAGFLC * BAGFLC * BAGFLC / BAGFEJT;
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第二道水平加固件所需最小惯性矩：" + BAGFI2.toFixed(2) + " mm⁴" +
                                                                                                                                        "</span>");

                                                                                                                                    // 第三段加固柱校核
                                                                                                                                    let BAGFLMAX3 = 0.408 * BAGFTHK3E * Math.sqrt(BAGFO3T / (BAGFALPHA * BAGFPC));
                                                                                                                                    let BAGFZP3 = BAGFLC * (0.0642 * BAGFPC * BAGFBH * BAGFBH / BAGFO3T - BAGFTHK3E * BAGFTHK3E / 6);

                                                                                                                                    // 第三段壁板
                                                                                                                                    let BAGFTHK3C = BAGFLC * Math.sqrt(6 * BAGFALPHA3 * (BAGFPC2 + BAGFPC3) / BAGFO3T);
                                                                                                                                    let BAGFTHK3D = BAGFTHK3C + BAGFC32;
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第三段壁板所需厚度：" + (BAGFTHK3D + BAGFC31).toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFTHK3CHK;
                                                                                                                                    if (BAGFTHK3N >= (BAGFTHK3D + BAGFC31)) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "输入厚度：" + BAGFTHK3N + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFTHK3CHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "输入厚度：" + BAGFTHK3N + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFTHK3CHK = "不合格";
                                                                                                                                    }
                                                                                                                                    let BAGFF3ALLOW = 5 * (BAGFTHK3E / 2 + Math.sqrt(BAGFBH3LC) * BAGFLC / 500);
                                                                                                                                    let BAGFF3MAX = BAGFBETA3 * Math.pow(BAGFLC, 4) * (BAGFPC2 + BAGFPC3) / (2 * BAGFE3T * Math.pow(BAGFTHK3E, 3));
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第三段壁板许用挠度：" + BAGFF3ALLOW.toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFF3CHK;
                                                                                                                                    if (BAGFF3MAX <= BAGFF3ALLOW) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际挠度：" + BAGFF3MAX.toFixed(2) + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFF3CHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际挠度：" + BAGFF3MAX.toFixed(2) + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFF3CHK = "不合格";
                                                                                                                                    }

                                                                                                                                    // 第三道水平加固件
                                                                                                                                    let BAGFF3 = (BAGFPC4 - BAGFPC2) * (BAGFSH2 + BAGFSH3 + BAGFSH4) / 6;
                                                                                                                                    let BAGFI3 = 1.3 * BAGFF3 * BAGFLC * BAGFLC * BAGFLC / BAGFEJT;
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第三道水平加固件所需最小惯性矩：" + BAGFI3.toFixed(2) + " mm⁴" +
                                                                                                                                        "</span>");

                                                                                                                                    // 第四段加固柱校核
                                                                                                                                    let BAGFLMAX4 = 0.408 * BAGFTHK4E * Math.sqrt(BAGFO4T / (BAGFALPHA * BAGFPC));
                                                                                                                                    let BAGFZP4 = BAGFLC * (0.0642 * BAGFPC * BAGFBH * BAGFBH / BAGFO4T - BAGFTHK4E * BAGFTHK4E / 6);

                                                                                                                                    // 第四段壁板
                                                                                                                                    let BAGFTHK4C = BAGFLC * Math.sqrt(6 * BAGFALPHA4 * (BAGFPC3 + BAGFPC4) / BAGFO4T);
                                                                                                                                    let BAGFTHK4D = BAGFTHK4C + BAGFC42;
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第四段壁板所需厚度：" + (BAGFTHK4D + BAGFC41).toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFTHK4CHK;
                                                                                                                                    if (BAGFTHK4N >= (BAGFTHK4D + BAGFC41)) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "输入厚度：" + BAGFTHK4N + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFTHK4CHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "输入厚度：" + BAGFTHK4N + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFTHK4CHK = "不合格";
                                                                                                                                    }
                                                                                                                                    let BAGFF4ALLOW = 5 * (BAGFTHK4E / 2 + Math.sqrt(BAGFBH4LC) * BAGFLC / 500);
                                                                                                                                    let BAGFF4MAX = BAGFBETA4 * Math.pow(BAGFLC, 4) * (BAGFPC3 + BAGFPC4) / (2 * BAGFE4T * Math.pow(BAGFTHK4E, 3));
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "第四段壁板许用挠度：" + BAGFF4ALLOW.toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFF4CHK;
                                                                                                                                    if (BAGFF4MAX <= BAGFF4ALLOW) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际挠度：" + BAGFF4MAX.toFixed(2) + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFF4CHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际挠度：" + BAGFF4MAX.toFixed(2) + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFF4CHK = "不合格";
                                                                                                                                    }

                                                                                                                                    // 加固柱结果汇总
                                                                                                                                    let BAGFLMAX = Math.min(BAGFLMAX1, BAGFLMAX2, BAGFLMAX3, BAGFLMAX4);
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "垂直加固柱允许最大间距：" + BAGFLMAX.toFixed(2) + " mm" +
                                                                                                                                        "</span>");
                                                                                                                                    let BAGFLCCHK;
                                                                                                                                    if (BAGFLC <= BAGFLMAX) {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际输入间距：" + BAGFLC + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFLCCHK = "合格";
                                                                                                                                    }
                                                                                                                                    else {
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "实际输入间距：" + BAGFLC + " mm" +
                                                                                                                                            "</span>");
                                                                                                                                        BAGFLCCHK = "不合格";
                                                                                                                                    }
                                                                                                                                    let BAGFZP = Math.max(BAGFZP1, BAGFZP2, BAGFZP3, BAGFZP4);
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "垂直加固柱所需最小截面系数：" + BAGFZP.toFixed(4) + " mm³" +
                                                                                                                                        "</span>");

                                                                                                                                    // docx
                                                                                                                                    let BAGFPayJS = $('#payjs');

                                                                                                                                    function getDocx() {
                                                                                                                                        $.ajax({
                                                                                                                                            type: "POST",
                                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                                            url: "bagfdocx.action",
                                                                                                                                            async: true,
                                                                                                                                            dataType: "json",
                                                                                                                                            data: JSON.stringify({
                                                                                                                                                ribbonName: "BAGF",

                                                                                                                                                t: BAGFDT,
                                                                                                                                                d: BAGFD,
                                                                                                                                                lc: BAGFLC,
                                                                                                                                                bh: BAGFBH,
                                                                                                                                                l: BAGFL,

                                                                                                                                                jstd: BAGFJSTDVal,
                                                                                                                                                jname: BAGFJNameVal,

                                                                                                                                                std1: BAGF1STDVal,
                                                                                                                                                name1: BAGF1NameVal,
                                                                                                                                                c12: BAGFC12,
                                                                                                                                                thk1n: BAGFTHK1N,

                                                                                                                                                std2: BAGF2STDVal,
                                                                                                                                                name2: BAGF2NameVal,
                                                                                                                                                c22: BAGFC22,
                                                                                                                                                thk2n: BAGFTHK2N,

                                                                                                                                                std3: BAGF3STDVal,
                                                                                                                                                name3: BAGF3NameVal,
                                                                                                                                                c32: BAGFC32,
                                                                                                                                                thk3n: BAGFTHK3N,

                                                                                                                                                std4: BAGF4STDVal,
                                                                                                                                                name4: BAGF4NameVal,
                                                                                                                                                c42: BAGFC42,
                                                                                                                                                thk4n: BAGFTHK4N,

                                                                                                                                                d1: BAGFD1.toFixed(4),
                                                                                                                                                c11: BAGFC11.toFixed(4),
                                                                                                                                                o1t: BAGFO1T.toFixed(4),
                                                                                                                                                e1t: (BAGFE1T / 1000).toFixed(4),

                                                                                                                                                d2: BAGFD2.toFixed(4),
                                                                                                                                                c21: BAGFC21.toFixed(4),
                                                                                                                                                o2t: BAGFO2T.toFixed(4),
                                                                                                                                                e2t: (BAGFE2T / 1000).toFixed(4),

                                                                                                                                                d3: BAGFD3.toFixed(4),
                                                                                                                                                c31: BAGFC31.toFixed(4),
                                                                                                                                                o3t: BAGFO3T.toFixed(4),
                                                                                                                                                e3t: (BAGFE3T / 1000).toFixed(4),

                                                                                                                                                d4: BAGFD4.toFixed(4),
                                                                                                                                                c41: BAGFC41.toFixed(4),
                                                                                                                                                o4t: BAGFO4T.toFixed(4),
                                                                                                                                                e4t: (BAGFE4T / 1000).toFixed(4),

                                                                                                                                                ejt: (BAGFEJT / 1000).toFixed(4),

                                                                                                                                                g: BAGFG.toFixed(4),
                                                                                                                                                pc: BAGFPC.toFixed(4),
                                                                                                                                                bhlc: BAGFBHLC.toFixed(4),
                                                                                                                                                alpha: BAGFALPHA.toFixed(8),
                                                                                                                                                beta: BAGFBETA.toFixed(8),

                                                                                                                                                bh1: BAGFBH1.toFixed(4),
                                                                                                                                                c1: BAGFC1.toFixed(4),
                                                                                                                                                thk1e: BAGFTHK1E.toFixed(4),
                                                                                                                                                bh1lc: BAGFBH1LC.toFixed(4),
                                                                                                                                                alpha1: BAGFALPHA1.toFixed(8),
                                                                                                                                                beta1: BAGFBETA1.toFixed(8),
                                                                                                                                                sh1: BAGFSH1.toFixed(4),
                                                                                                                                                pc1: BAGFPC1.toFixed(4),

                                                                                                                                                bh2: BAGFBH2.toFixed(4),
                                                                                                                                                c2: BAGFC2.toFixed(4),
                                                                                                                                                thk2e: BAGFTHK2E.toFixed(4),
                                                                                                                                                bh2lc: BAGFBH2LC.toFixed(4),
                                                                                                                                                alpha2: BAGFALPHA2.toFixed(8),
                                                                                                                                                beta2: BAGFBETA2.toFixed(8),
                                                                                                                                                sh2: BAGFSH2.toFixed(4),
                                                                                                                                                pc2: BAGFPC2.toFixed(4),

                                                                                                                                                bh3: BAGFBH3.toFixed(4),
                                                                                                                                                c3: BAGFC3.toFixed(4),
                                                                                                                                                thk3e: BAGFTHK3E.toFixed(4),
                                                                                                                                                bh3lc: BAGFBH3LC.toFixed(4),
                                                                                                                                                alpha3: BAGFALPHA3.toFixed(8),
                                                                                                                                                beta3: BAGFBETA3.toFixed(8),
                                                                                                                                                sh3: BAGFSH3.toFixed(4),
                                                                                                                                                pc3: BAGFPC3.toFixed(4),

                                                                                                                                                bh4: BAGFBH4.toFixed(4),
                                                                                                                                                c4: BAGFC4.toFixed(4),
                                                                                                                                                thk4e: BAGFTHK4E.toFixed(4),
                                                                                                                                                bh4lc: BAGFBH4LC.toFixed(4),
                                                                                                                                                alpha4: BAGFALPHA4.toFixed(8),
                                                                                                                                                beta4: BAGFBETA4.toFixed(8),
                                                                                                                                                sh4: BAGFSH4.toFixed(4),
                                                                                                                                                pc4: BAGFPC4.toFixed(4),

                                                                                                                                                i0: BAGFI0.toFixed(4),

                                                                                                                                                lmax1: BAGFLMAX1.toFixed(4),
                                                                                                                                                zp1: BAGFZP1.toFixed(4),

                                                                                                                                                thk1c: BAGFTHK1C.toFixed(4),
                                                                                                                                                thk1d: BAGFTHK1D.toFixed(4),
                                                                                                                                                thk1chk: BAGFTHK1CHK,
                                                                                                                                                f1allow: BAGFF1ALLOW.toFixed(4),
                                                                                                                                                f1max: BAGFF1MAX.toFixed(4),
                                                                                                                                                f1chk: BAGFF1CHK,

                                                                                                                                                f1: BAGFF1.toFixed(4),
                                                                                                                                                i1: BAGFI1.toFixed(4),

                                                                                                                                                lmax2: BAGFLMAX2.toFixed(4),
                                                                                                                                                zp2: BAGFZP2.toFixed(4),

                                                                                                                                                thk2c: BAGFTHK2C.toFixed(4),
                                                                                                                                                thk2d: BAGFTHK2D.toFixed(4),
                                                                                                                                                thk2chk: BAGFTHK2CHK,
                                                                                                                                                f2allow: BAGFF2ALLOW.toFixed(4),
                                                                                                                                                f2max: BAGFF2MAX.toFixed(4),
                                                                                                                                                f2chk: BAGFF2CHK,

                                                                                                                                                f2: BAGFF2.toFixed(4),
                                                                                                                                                i2: BAGFI2.toFixed(4),

                                                                                                                                                lmax3: BAGFLMAX3.toFixed(4),
                                                                                                                                                zp3: BAGFZP3.toFixed(4),

                                                                                                                                                thk3c: BAGFTHK3C.toFixed(4),
                                                                                                                                                thk3d: BAGFTHK3D.toFixed(4),
                                                                                                                                                thk3chk: BAGFTHK3CHK,
                                                                                                                                                f3allow: BAGFF3ALLOW.toFixed(4),
                                                                                                                                                f3max: BAGFF3MAX.toFixed(4),
                                                                                                                                                f3chk: BAGFF3CHK,

                                                                                                                                                f3: BAGFF3.toFixed(4),
                                                                                                                                                i3: BAGFI3.toFixed(4),

                                                                                                                                                lmax4: BAGFLMAX4.toFixed(4),
                                                                                                                                                zp4: BAGFZP4.toFixed(4),

                                                                                                                                                thk4c: BAGFTHK4C.toFixed(4),
                                                                                                                                                thk4d: BAGFTHK4D.toFixed(4),
                                                                                                                                                thk4chk: BAGFTHK4CHK,
                                                                                                                                                f4allow: BAGFF4ALLOW.toFixed(4),
                                                                                                                                                f4max: BAGFF4MAX.toFixed(4),
                                                                                                                                                f4chk: BAGFF4CHK,

                                                                                                                                                lmax: BAGFLMAX.toFixed(4),
                                                                                                                                                lcchk: BAGFLCCHK,
                                                                                                                                                zp: BAGFZP.toFixed(4)
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
                                                                                                                                                    BAGFPayJS.dialog({
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
                                                                                                                                                                BAGFPayJS.dialog("close");
                                                                                                                                                                BAGFPayJS.dialog("clear");
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
                                                                                                                                                                            BAGFPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                    BAGFPayJS.dialog('close');
                                                                                                                                                                                    BAGFPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});