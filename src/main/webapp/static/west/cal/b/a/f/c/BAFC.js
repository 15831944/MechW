$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bafcSketch = $("#d2");
    let bafcModel = $("#d3");
    let bafcd2d3 = $('#d2d3');

    $("#cal").html("<table id='bafc'></table>");
    let pg = $("#bafc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/f/c/BAFC.json", function (result) {

        let BAFCDT;
        let BAFC1Category, BAFC1CategoryVal, BAFC1Type, BAFC1TypeVal, BAFC1STD, BAFC1STDVal, BAFC1Name, BAFC1NameVal,
            BAFC2Category, BAFC2CategoryVal, BAFC2Type, BAFC2TypeVal, BAFC2STD, BAFC2STDVal, BAFC2Name, BAFC2NameVal,
            BAFC3Category, BAFC3CategoryVal, BAFC3Type, BAFC3TypeVal, BAFC3STD, BAFC3STDVal, BAFC3Name, BAFC3NameVal,
            BAFC4Category, BAFC4CategoryVal, BAFC4Type, BAFC4TypeVal, BAFC4STD, BAFC4STDVal, BAFC4Name, BAFC4NameVal,
            BAFCJCategory, BAFCJCategoryVal, BAFCJType, BAFCJTypeVal, BAFCJSTD, BAFCJSTDVal, BAFCJName, BAFCJNameVal;
        let columns, rows, ed;

        function bafc2d(l = "L", bh = "H", bh1 = "0.37H", bh2 = "0.25H", bh3 = "0.21H", bh4 = "0.17H") {

            bafcSketch.empty();

            let width = bafcSketch.width();
            let height = bafcSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAFC2VG").attr("height", height);

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
                {x: padding + wg - thk, y: padding + 1.5 * hg},
                {x: padding + wg - thk, y: padding + 1.5 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 1.5 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 1.5 * hg},
                {x: padding + wg - 2 * thk, y: padding + 1.5 * hg},
                {x: padding + wg - 2 * thk, y: padding + 1.5 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 1.5 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 1.5 * hg - thk, padding + wg, padding + 1.5 * hg - thk);

            // 角钢 第一道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 1.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.5 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.5 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.5 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.5 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.5 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 1.5 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 1.5 * hg - thk, padding + 3 * wg + thk, padding + 1.5 * hg - thk);

            // 角钢 第二道 左
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.5 * hg},
                {x: padding + wg - thk, y: padding + 2.5 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 2.5 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 2.5 * hg},
                {x: padding + wg - 2 * thk, y: padding + 2.5 * hg},
                {x: padding + wg - 2 * thk, y: padding + 2.5 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 2.5 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 2.5 * hg - thk, padding + wg, padding + 2.5 * hg - thk);

            // 角钢 第二道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.5 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.5 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.5 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.5 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 2.5 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 2.5 * hg - thk, padding + 3 * wg + thk, padding + 2.5 * hg - thk);

            // 角钢 第三道 左
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3.3 * hg},
                {x: padding + wg - thk, y: padding + 3.3 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 3.3 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 3.3 * hg},
                {x: padding + wg - 2 * thk, y: padding + 3.3 * hg},
                {x: padding + wg - 2 * thk, y: padding + 3.3 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 3.3 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 3.3 * hg - thk, padding + wg, padding + 3.3 * hg - thk);

            // 角钢 第三道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 3.3 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3.3 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.3 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3.3 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.3 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3.3 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 3.3 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 3.3 * hg - thk, padding + 3 * wg + thk, padding + 3.3 * hg - thk);

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
            ])).attr("id", "BAFC2ketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAFC2ketchH")
                .attr("startOffset", "50%").text(bh);

            // L
            dimBottomH(padding + wg, height - padding, padding + 3 * wg, height - padding, l, "BAFCSketchL");

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 1.5 * hg - thk, padding + wg - 6 * thk, padding - thk, bh1, "BAFCSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 2.5 * hg - thk, padding + wg - 6 * thk, padding + 1.5 * hg - thk, bh2, "BAFCSketchBH2");

            // BH3
            dimLeftV(padding + wg - 6 * thk, padding + 3.3 * hg - thk, padding + wg - 6 * thk, padding + 2.5 * hg - thk, bh3, "BAFCSketchBH3");

            // BH4
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3.3 * hg - thk, bh4, "BAFCSketchBH4");
        }

        currentTabIndex = bafcd2d3.tabs('getTabIndex', bafcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bafc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bafc").length > 0) {
                    bafc2d();
                }
            });
        }
        bafcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bafc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bafc").length > 0) {
                            bafc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 顶边加固、三道加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAFC1Category);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAFC1Type);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAFC1STD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAFC1Name);
                }

                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAFC2Category);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAFC2Type);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAFC2STD);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAFC2Name);
                }

                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAFC3Category);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAFC3Type);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAFC3STD);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", BAFC3Name);
                }

                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAFC4Category);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAFC4Type);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAFC4STD);
                }
                else if (index === 25) {
                    $(ed.target).combobox("loadData", BAFC4Name);
                }

                else if (index === 28) {
                    $(ed.target).combobox("loadData", BAFCJCategory);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BAFCJType);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BAFCJSTD);
                }
                else if (index === 31) {
                    $(ed.target).combobox("loadData", BAFCJName);
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
                    bafcSketch.empty();

                    // model
                    bafcModel.empty();

                    // sketch
                    currentTabIndex = bafcd2d3.tabs('getTabIndex', bafcd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafc2d();
                        bafcSketch.off("resize").on("resize", function () {
                            if ($("#bafc").length > 0) {
                                bafc2d();
                            }
                        });
                    }
                    bafcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafc2d();
                                bafcSketch.off("resize").on("resize", function () {
                                    if ($("#bafc").length > 0) {
                                        bafc2d();
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

                        BAFCDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAFC1Category = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAFC1Type = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFC1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFC1Name = null;

                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAFC2Category = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAFC2Type = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFC2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFC2Name = null;

                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAFC3Category = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAFC3Type = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFC3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFC3Name = null;

                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAFC4Category = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAFC4Type = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFC4STD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFC4Name = null;

                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BAFCJCategory = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAFCJType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAFCJSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BAFCJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC1Category = [];
                                BAFC2Category = [];
                                BAFC3Category = [];
                                BAFC4Category = [];
                                BAFCJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAFCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAFC1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFC2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFC3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFC4Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFCJCategory[index] = {
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

                        BAFC1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAFC1Type = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFC1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFC1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC1CategoryVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC1Type = [];
                                $(result).each(function (index, element) {
                                    BAFC1Type[index] = {
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

                        BAFC1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFC1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFC1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC1CategoryVal,
                                type: BAFC1TypeVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC1STD = [];
                                $(result).each(function (index, element) {
                                    BAFC1STD[index] = {
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

                        BAFC1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFC1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC1CategoryVal,
                                type: BAFC1TypeVal,
                                std: BAFC1STDVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC1Name = [];
                                $(result).each(function (index, element) {
                                    BAFC1Name[index] = {
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

                        BAFC2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAFC2Type = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFC2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFC2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC2CategoryVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC2Type = [];
                                $(result).each(function (index, element) {
                                    BAFC2Type[index] = {
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

                        BAFC2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFC2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFC2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC2CategoryVal,
                                type: BAFC2TypeVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC2STD = [];
                                $(result).each(function (index, element) {
                                    BAFC2STD[index] = {
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

                        BAFC2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFC2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC2CategoryVal,
                                type: BAFC2TypeVal,
                                std: BAFC2STDVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC2Name = [];
                                $(result).each(function (index, element) {
                                    BAFC2Name[index] = {
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

                        BAFC3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAFC3Type = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFC3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFC3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC3CategoryVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC3Type = [];
                                $(result).each(function (index, element) {
                                    BAFC3Type[index] = {
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

                        BAFC3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFC3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFC3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC3CategoryVal,
                                type: BAFC3TypeVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC3STD = [];
                                $(result).each(function (index, element) {
                                    BAFC3STD[index] = {
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

                        BAFC3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFC3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC3CategoryVal,
                                type: BAFC3TypeVal,
                                std: BAFC3STDVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC3Name = [];
                                $(result).each(function (index, element) {
                                    BAFC3Name[index] = {
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

                        BAFC4CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAFC4Type = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFC4STD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFC4Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC4CategoryVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC4Type = [];
                                $(result).each(function (index, element) {
                                    BAFC4Type[index] = {
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

                        BAFC4TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFC4STD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFC4Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC4CategoryVal,
                                type: BAFC4TypeVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC4STD = [];
                                $(result).each(function (index, element) {
                                    BAFC4STD[index] = {
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

                        BAFC4STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFC4Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFC4CategoryVal,
                                type: BAFC4TypeVal,
                                std: BAFC4STDVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFC4Name = [];
                                $(result).each(function (index, element) {
                                    BAFC4Name[index] = {
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

                        BAFCJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BAFCJType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAFCJSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BAFCJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFCJCategoryVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFCJType = [];
                                $(result).each(function (index, element) {
                                    BAFCJType[index] = {
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

                        BAFCJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BAFCJSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BAFCJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFCJCategoryVal,
                                type: BAFCJTypeVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFCJSTD = [];
                                $(result).each(function (index, element) {
                                    BAFCJSTD[index] = {
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

                        BAFCJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BAFCJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFCJCategoryVal,
                                type: BAFCJTypeVal,
                                std: BAFCJSTDVal,
                                temp: BAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFCJName = [];
                                $(result).each(function (index, element) {
                                    BAFCJName[index] = {
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
                    let BAFCD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAFCD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // L
                    let BAFCL;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAFCL = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafc2d(BAFCL);
                        bafcSketch.off("resize").on("resize", function () {
                            if ($("#bafc").length > 0) {
                                bafc2d(BAFCL);
                            }
                        });
                    }
                    bafcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafc2d(BAFCL);
                                bafcSketch.off("resize").on("resize", function () {
                                    if ($("#bafc").length > 0) {
                                        bafc2d(BAFCL);
                                    }
                                });
                            }
                        }
                    });

                    // H
                    let BAFCBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 / 0.37 * BAFCL, 0.1 / 0.25 * BAFCL, 0.1 / 0.21 * BAFCL, 0.1 / 0.17 * BAFCL)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 / 0.37 * BAFCL, 5 / 0.25 * BAFCL, 5 / 0.21 * BAFCL, 5 / 0.17 * BAFCL)) {
                        BAFCBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 / 0.37 * BAFCL, 0.1 / 0.25 * BAFCL, 0.1 / 0.21 * BAFCL, 0.1 / 0.17 * BAFCL)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 / 0.37 * BAFCL, 0.1 / 0.25 * BAFCL, 0.1 / 0.21 * BAFCL, 0.1 / 0.17 * BAFCL).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 / 0.37 * BAFCL, 5 / 0.25 * BAFCL, 5 / 0.21 * BAFCL, 5 / 0.17 * BAFCL)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 / 0.37 * BAFCL, 5 / 0.25 * BAFCL, 5 / 0.21 * BAFCL, 5 / 0.17 * BAFCL).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafc2d(BAFCL, BAFCBH, (0.37 * BAFCBH).toFixed(2), (0.25 * BAFCBH).toFixed(2), (0.21 * BAFCBH).toFixed(2), (0.17 * BAFCBH).toFixed(2));
                        bafcSketch.off("resize").on("resize", function () {
                            if ($("#bafc").length > 0) {
                                bafc2d(BAFCL, BAFCBH, (0.37 * BAFCBH).toFixed(2), (0.25 * BAFCBH).toFixed(2), (0.21 * BAFCBH).toFixed(2), (0.17 * BAFCBH).toFixed(2));
                            }
                        });
                    }
                    bafcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafc2d(BAFCL, BAFCBH, (0.37 * BAFCBH).toFixed(2), (0.25 * BAFCBH).toFixed(2), (0.21 * BAFCBH).toFixed(2), (0.17 * BAFCBH).toFixed(2));
                                bafcSketch.off("resize").on("resize", function () {
                                    if ($("#bafc").length > 0) {
                                        bafc2d(BAFCL, BAFCBH, (0.37 * BAFCBH).toFixed(2), (0.25 * BAFCBH).toFixed(2), (0.21 * BAFCBH).toFixed(2), (0.17 * BAFCBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // 第一段壁板材料名称
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        BAFC1NameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAFCD1, BAFC1ThkMin, BAFC1ThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAFC1CategoryVal,
                            "type": BAFC1TypeVal,
                            "std": BAFC1STDVal,
                            "name": BAFC1NameVal,
                            "temp": BAFCDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAFCD1 = parseFloat(result.density);
                            BAFC1ThkMin = parseFloat(result.thkMin);
                            BAFC1ThkMax = parseFloat(result.thkMax);

                            // 第一层壁板腐蚀裕量 C12
                            let BAFCC12;
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) < BAFC1ThkMax) {
                                BAFCC12 = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) >= BAFC1ThkMax) {
                                south.html("第一段壁板腐蚀裕量不能大于等于 " + BAFC1ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 第一段壁板名义厚度
                            let BAFCTHK1N;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > Math.max(BAFCC12, BAFC1ThkMin)
                                && parseFloat(rows[9][columns[0][1].field]) <= BAFC1ThkMax) {
                                BAFCTHK1N = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) <= Math.max(BAFCC12, BAFC1ThkMin)) {
                                south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAFCC12, BAFC1ThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > BAFC1ThkMax) {
                                south.html("第一段壁板名义厚度不能大于 " + BAFC1ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 O1T E1T C11
                            let BAFCO1T, BAFCE1T, BAFCC11;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAFC1CategoryVal,
                                    "type": BAFC1TypeVal,
                                    "std": BAFC1STDVal,
                                    "name": BAFC1NameVal,
                                    "thk": BAFCTHK1N,
                                    "temp": BAFCDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAFCO1T = parseFloat(result.ot);
                                    if (BAFCO1T < 0) {
                                        south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAFCE1T = 1000 * parseFloat(result.et);
                                    if (BAFCE1T < 0) {
                                        south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }
                                    BAFCC11 = parseFloat(result.c1);
                                    if (BAFCC11 < 0) {
                                        south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 第二段壁板材料名称
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                        BAFC2NameVal = rows[13][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAFCD2, BAFC2ThkMin, BAFC2ThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAFC2CategoryVal,
                                            "type": BAFC2TypeVal,
                                            "std": BAFC2STDVal,
                                            "name": BAFC2NameVal,
                                            "temp": BAFCDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAFCD2 = parseFloat(result.density);
                                            BAFC2ThkMin = parseFloat(result.thkMin);
                                            BAFC2ThkMax = parseFloat(result.thkMax);

                                            // 第二层壁板腐蚀裕量 C22
                                            let BAFCC22;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) < BAFC2ThkMax) {
                                                BAFCC22 = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) >= BAFC2ThkMax) {
                                                south.html("第二段壁板腐蚀裕量不能大于等于 " + BAFC2ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 第二段壁板名义厚度
                                            let BAFCTHK2N;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) > Math.max(BAFCC22, BAFC2ThkMin)
                                                && parseFloat(rows[15][columns[0][1].field]) <= BAFC2ThkMax) {
                                                BAFCTHK2N = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) <= Math.max(BAFCC22, BAFC2ThkMin)) {
                                                south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAFCC22, BAFC2ThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) > BAFC2ThkMax) {
                                                south.html("第二段壁板名义厚度不能大于 " + BAFC2ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 O2T E2T C21
                                            let BAFCO2T, BAFCE2T, BAFCC21;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAFC2CategoryVal,
                                                    "type": BAFC2TypeVal,
                                                    "std": BAFC2STDVal,
                                                    "name": BAFC2NameVal,
                                                    "thk": BAFCTHK2N,
                                                    "temp": BAFCDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAFCO2T = parseFloat(result.ot);
                                                    if (BAFCO2T < 0) {
                                                        south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAFCE2T = 1000 * parseFloat(result.et);
                                                    if (BAFCE2T < 0) {
                                                        south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAFCC21 = parseFloat(result.c1);
                                                    if (BAFCC21 < 0) {
                                                        south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 第三段壁板材料名称
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                        BAFC3NameVal = rows[19][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // AJAX 获取材料密度、最大最小厚度
                                                    let BAFCD3, BAFC3ThkMin, BAFC3ThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAFC3CategoryVal,
                                                            "type": BAFC3TypeVal,
                                                            "std": BAFC3STDVal,
                                                            "name": BAFC3NameVal,
                                                            "temp": BAFCDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAFCD3 = parseFloat(result.density);
                                                            BAFC3ThkMin = parseFloat(result.thkMin);
                                                            BAFC3ThkMax = parseFloat(result.thkMax);

                                                            // 第三层壁板腐蚀裕量 C32
                                                            let BAFCC32;
                                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                && parseFloat(rows[20][columns[0][1].field]) < BAFC3ThkMax) {
                                                                BAFCC32 = parseFloat(rows[20][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                && parseFloat(rows[20][columns[0][1].field]) >= BAFC3ThkMax) {
                                                                south.html("第三段壁板腐蚀裕量不能大于等于 " + BAFC3ThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 第三段壁板名义厚度
                                                            let BAFCTHK3N;
                                                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) > Math.max(BAFCC32, BAFC3ThkMin)
                                                                && parseFloat(rows[21][columns[0][1].field]) <= BAFC3ThkMax) {
                                                                BAFCTHK3N = parseFloat(rows[21][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) <= Math.max(BAFCC32, BAFC3ThkMin)) {
                                                                south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAFCC32, BAFC3ThkMin) + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) > BAFC3ThkMax) {
                                                                south.html("第三段壁板名义厚度不能大于 " + BAFC3ThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // ajax 获取 O3T E3T C31
                                                            let BAFCO3T, BAFCE3T, BAFCC31;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAFC3CategoryVal,
                                                                    "type": BAFC3TypeVal,
                                                                    "std": BAFC3STDVal,
                                                                    "name": BAFC3NameVal,
                                                                    "thk": BAFCTHK3N,
                                                                    "temp": BAFCDT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": 100000
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAFCO3T = parseFloat(result.ot);
                                                                    if (BAFCO3T < 0) {
                                                                        south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAFCE3T = 1000 * parseFloat(result.et);
                                                                    if (BAFCE3T < 0) {
                                                                        south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAFCC31 = parseFloat(result.c1);
                                                                    if (BAFCC31 < 0) {
                                                                        south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 第四段壁板材料名称
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                                        BAFC4NameVal = rows[25][columns[0][1].field];
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // AJAX 获取材料密度、最大最小厚度
                                                                    let BAFCD4, BAFC4ThkMin, BAFC4ThkMax;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAFC4CategoryVal,
                                                                            "type": BAFC4TypeVal,
                                                                            "std": BAFC4STDVal,
                                                                            "name": BAFC4NameVal,
                                                                            "temp": BAFCDT
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAFCD4 = parseFloat(result.density);
                                                                            BAFC4ThkMin = parseFloat(result.thkMin);
                                                                            BAFC4ThkMax = parseFloat(result.thkMax);

                                                                            // 第四层壁板腐蚀裕量 C42
                                                                            let BAFCC42;
                                                                            if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                                && parseFloat(rows[26][columns[0][1].field]) < BAFC4ThkMax) {
                                                                                BAFCC42 = parseFloat(rows[26][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                                && parseFloat(rows[26][columns[0][1].field]) >= BAFC4ThkMax) {
                                                                                south.html("第四段壁板腐蚀裕量不能大于等于 " + BAFC4ThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // 第四段壁板名义厚度
                                                                            let BAFCTHK4N;
                                                                            if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                                && parseFloat(rows[27][columns[0][1].field]) > Math.max(BAFCC42, BAFC4ThkMin)
                                                                                && parseFloat(rows[27][columns[0][1].field]) <= BAFC4ThkMax) {
                                                                                BAFCTHK4N = parseFloat(rows[27][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                                && parseFloat(rows[27][columns[0][1].field]) <= Math.max(BAFCC42, BAFC4ThkMin)) {
                                                                                south.html("第四段壁板名义厚度不能小于等于 " + Math.max(BAFCC42, BAFC4ThkMin) + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                                                && parseFloat(rows[27][columns[0][1].field]) > BAFC4ThkMax) {
                                                                                south.html("第四段壁板名义厚度不能大于 " + BAFC4ThkMax + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }

                                                                            // ajax 获取 O4T E4T C41
                                                                            let BAFCO4T, BAFCE4T, BAFCC41;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BAFC4CategoryVal,
                                                                                    "type": BAFC4TypeVal,
                                                                                    "std": BAFC4STDVal,
                                                                                    "name": BAFC4NameVal,
                                                                                    "thk": BAFCTHK4N,
                                                                                    "temp": BAFCDT,
                                                                                    "highLow": 3,
                                                                                    "isTube": 0,
                                                                                    "od": 100000
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BAFCO4T = parseFloat(result.ot);
                                                                                    if (BAFCO4T < 0) {
                                                                                        south.html("查询第四段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BAFCE4T = 1000 * parseFloat(result.et);
                                                                                    if (BAFCE4T < 0) {
                                                                                        south.html("查询第四段壁板材料弹性模量失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BAFCC41 = parseFloat(result.c1);
                                                                                    if (BAFCC41 < 0) {
                                                                                        south.html("查询第四段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                        return false;
                                                                                    }

                                                                                    // 加固件材料名称
                                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                                                        BAFCJNameVal = rows[31][columns[0][1].field];
                                                                                    }
                                                                                    else {
                                                                                        return false;
                                                                                    }

                                                                                    // ajax 获取 EJT
                                                                                    let BAFCEJT;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_nbt_47003_1_2009_e.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": BAFCJCategoryVal,
                                                                                            "type": BAFCJTypeVal,
                                                                                            "std": BAFCJSTDVal,
                                                                                            "name": BAFCJNameVal,
                                                                                            "temp": BAFCDT
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            BAFCEJT = 1000 * parseFloat(result.et);
                                                                                            if (BAFCEJT < 0) {
                                                                                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                                                                                return false;
                                                                                            }

                                                                                            // 过程参数
                                                                                            let BAFCG = 9.81;

                                                                                            let BAFCBH1 = 0.37 * BAFCBH;
                                                                                            let BAFCC1 = BAFCC11 + BAFCC12;
                                                                                            let BAFCTHK1E = BAFCTHK1N - BAFCC1;
                                                                                            let BAFCBH1L = BAFCBH1 / BAFCL;
                                                                                            let BAFCSH1 = BAFCBH1;

                                                                                            let BAFCBH2 = 0.25 * BAFCBH;
                                                                                            let BAFCC2 = BAFCC21 + BAFCC22;
                                                                                            let BAFCTHK2E = BAFCTHK2N - BAFCC2;
                                                                                            let BAFCBH2L = BAFCBH2 / BAFCL;
                                                                                            let BAFCSH2 = BAFCBH1 + BAFCBH2;

                                                                                            let BAFCBH3 = 0.21 * BAFCBH;
                                                                                            let BAFCC3 = BAFCC31 + BAFCC32;
                                                                                            let BAFCTHK3E = BAFCTHK3N - BAFCC3;
                                                                                            let BAFCBH3L = BAFCBH3 / BAFCL;
                                                                                            let BAFCSH3 = BAFCBH1 + BAFCBH2 + BAFCBH3;

                                                                                            let BAFCBH4 = 0.17 * BAFCBH;
                                                                                            let BAFCC4 = BAFCC41 + BAFCC42;
                                                                                            let BAFCTHK4E = BAFCTHK4N - BAFCC4;
                                                                                            let BAFCBH4L = BAFCBH4 / BAFCL;
                                                                                            let BAFCSH4 = BAFCBH1 + BAFCBH2 + BAFCBH3 + BAFCBH4;

                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "ba": BAFCBH1L
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    let BAFCALPHA1 = parseFloat(result.alpha);
                                                                                                    let BAFCBETA1 = parseFloat(result.beta);

                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "ba": BAFCBH2L
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            let BAFCALPHA2 = parseFloat(result.alpha);
                                                                                                            let BAFCBETA2 = parseFloat(result.beta);

                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "ba": BAFCBH3L
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {

                                                                                                                    let BAFCALPHA3 = parseFloat(result.alpha);
                                                                                                                    let BAFCBETA3 = parseFloat(result.beta);

                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "ba": BAFCBH4L
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            let BAFCALPHA4 = parseFloat(result.alpha);
                                                                                                                            let BAFCBETA4 = parseFloat(result.beta);

                                                                                                                            // 顶边加固件
                                                                                                                            let BAFCI0 = 0.217 * BAFCD * BAFCG * BAFCSH1 * BAFCSH1 * BAFCL * BAFCL * BAFCL / BAFCEJT / 1000000000;
                                                                                                                            south.html(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "顶边加固件所需最小惯性矩：" + BAFCI0.toFixed(2) + " mm⁴" +
                                                                                                                                "</span>");

                                                                                                                            // 第一段壁板
                                                                                                                            let BAFCTHK1C = BAFCL * Math.sqrt(3 * BAFCALPHA1 * BAFCD * BAFCG * BAFCSH1 / BAFCO1T / 1000000000);
                                                                                                                            let BAFCTHK1D = BAFCTHK1C + BAFCC12;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第一段壁板所需厚度：" + (BAFCTHK1D + BAFCC11).toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAFCTHK1CHK;
                                                                                                                            if (BAFCTHK1N >= (BAFCTHK1D + BAFCC11)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAFCTHK1N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCTHK1CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAFCTHK1N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCTHK1CHK = "不合格";
                                                                                                                            }

                                                                                                                            let BAFCF1ALLOW = 5 * (BAFCTHK1E / 2 + Math.sqrt(BAFCBH1L) * BAFCL / 500);
                                                                                                                            let BAFCF1MAX = BAFCBETA1 * Math.pow(BAFCL, 4) * BAFCD * BAFCG * BAFCSH1 / 1000000000 / (2 * BAFCE1T * Math.pow(BAFCTHK1E, 3));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第一段壁板许用挠度：" + BAFCF1ALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAFCF1CHK;
                                                                                                                            if (BAFCF1MAX <= BAFCF1ALLOW) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAFCF1MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCF1CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAFCF1MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCF1CHK = "不合格";
                                                                                                                            }

                                                                                                                            // 第一道加固件
                                                                                                                            let BAFCF1 = BAFCD * BAFCG * BAFCSH2 * (BAFCSH1 + BAFCSH2) / 6 / 1000000000;
                                                                                                                            let BAFCI1 = 1.3 * BAFCF1 * BAFCL * BAFCL * BAFCL / BAFCEJT;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第一道加固件所需最小惯性矩：" + BAFCI1.toFixed(2) + " mm⁴" +
                                                                                                                                "</span>");

                                                                                                                            // 第二段壁板
                                                                                                                            let BAFCTHK2C = BAFCL * Math.sqrt(6 * BAFCALPHA2 * BAFCD * BAFCG * (BAFCSH1 + BAFCSH2) / BAFCO2T / 1000000000);
                                                                                                                            let BAFCTHK2D = BAFCTHK2C + BAFCC22;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第二段壁板所需厚度：" + (BAFCTHK2D + BAFCC21).toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAFCTHK2CHK;
                                                                                                                            if (BAFCTHK2N >= (BAFCTHK2D + BAFCC21)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAFCTHK2N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCTHK2CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAFCTHK2N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCTHK2CHK = "不合格";
                                                                                                                            }

                                                                                                                            let BAFCF2ALLOW = 5 * (BAFCTHK2E / 2 + Math.sqrt(BAFCBH2L) * BAFCL / 500);
                                                                                                                            let BAFCF2MAX = BAFCBETA2 * Math.pow(BAFCL, 4) * BAFCD * BAFCG * (BAFCSH1 + BAFCSH2) / 1000000000 / (2 * BAFCE2T * Math.pow(BAFCTHK2E, 3));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第二段壁板许用挠度：" + BAFCF2ALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAFCF2CHK;
                                                                                                                            if (BAFCF2MAX <= BAFCF2ALLOW) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAFCF2MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCF2CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAFCF2MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCF2CHK = "不合格";
                                                                                                                            }

                                                                                                                            // 第二道加固件
                                                                                                                            let BAFCF2 = BAFCD * BAFCG * (BAFCSH3 - BAFCSH1) * (BAFCSH1 + BAFCSH2 + BAFCSH3) / 6 / 1000000000;
                                                                                                                            let BAFCI2 = 1.3 * BAFCF2 * BAFCL * BAFCL * BAFCL / BAFCEJT;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第二道加固件所需最小惯性矩：" + BAFCI2.toFixed(2) + " mm⁴" +
                                                                                                                                "</span>");

                                                                                                                            // 第三段壁板
                                                                                                                            let BAFCTHK3C = BAFCL * Math.sqrt(6 * BAFCALPHA3 * BAFCD * BAFCG * (BAFCSH2 + BAFCSH3) / BAFCO3T / 1000000000);
                                                                                                                            let BAFCTHK3D = BAFCTHK3C + BAFCC32;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第三段壁板所需厚度：" + (BAFCTHK3D + BAFCC31).toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAFCTHK3CHK;
                                                                                                                            if (BAFCTHK3N >= (BAFCTHK3D + BAFCC31)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAFCTHK3N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCTHK3CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAFCTHK3N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCTHK3CHK = "不合格";
                                                                                                                            }

                                                                                                                            let BAFCF3ALLOW = 5 * (BAFCTHK3E / 2 + Math.sqrt(BAFCBH3L) * BAFCL / 500);
                                                                                                                            let BAFCF3MAX = BAFCBETA3 * Math.pow(BAFCL, 4) * BAFCD * BAFCG * (BAFCSH2 + BAFCSH3) / 1000000000 / (2 * BAFCE3T * Math.pow(BAFCTHK3E, 3));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第三段壁板许用挠度：" + BAFCF3ALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAFCF3CHK;
                                                                                                                            if (BAFCF3MAX <= BAFCF3ALLOW) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAFCF3MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCF3CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAFCF3MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCF3CHK = "不合格";
                                                                                                                            }

                                                                                                                            // 第三道加固件
                                                                                                                            let BAFCF3 = BAFCD * BAFCG * (BAFCSH4 - BAFCSH2) * (BAFCSH4 + BAFCSH3 + BAFCSH2) / 6 / 1000000000;
                                                                                                                            let BAFCI3 = 1.3 * BAFCF3 * BAFCL * BAFCL * BAFCL / BAFCEJT;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第三道加固件所需最小惯性矩：" + BAFCI3.toFixed(2) + " mm⁴" +
                                                                                                                                "</span>");

                                                                                                                            // 第四段壁板
                                                                                                                            let BAFCTHK4C = BAFCL * Math.sqrt(6 * BAFCALPHA4 * BAFCD * BAFCG * (BAFCSH3 + BAFCSH4) / BAFCO4T / 1000000000);
                                                                                                                            let BAFCTHK4D = BAFCTHK4C + BAFCC42;
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第四段壁板所需厚度：" + (BAFCTHK4D + BAFCC41).toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAFCTHK4CHK;
                                                                                                                            if (BAFCTHK4N >= (BAFCTHK4D + BAFCC41)) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAFCTHK4N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCTHK4CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "输入厚度：" + BAFCTHK4N + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCTHK4CHK = "不合格";
                                                                                                                            }

                                                                                                                            let BAFCF4ALLOW = 5 * (BAFCTHK4E / 2 + Math.sqrt(BAFCBH4L) * BAFCL / 500);
                                                                                                                            let BAFCF4MAX = BAFCBETA4 * Math.pow(BAFCL, 4) * BAFCD * BAFCG * (BAFCSH3 + BAFCSH4) / 1000000000 / (2 * BAFCE4T * Math.pow(BAFCTHK4E, 3));
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "第四段壁板许用挠度：" + BAFCF4ALLOW.toFixed(2) + " mm" +
                                                                                                                                "</span>");
                                                                                                                            let BAFCF4CHK;
                                                                                                                            if (BAFCF4MAX <= BAFCF4ALLOW) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAFCF4MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCF4CHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "实际挠度：" + BAFCF4MAX.toFixed(2) + " mm" +
                                                                                                                                    "</span>");
                                                                                                                                BAFCF4CHK = "不合格";
                                                                                                                            }

                                                                                                                            // docx
                                                                                                                            let BAFCPayJS = $('#payjs');

                                                                                                                            function getDocx() {
                                                                                                                                $.ajax({
                                                                                                                                    type: "POST",
                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                    url: "bafcdocx.action",
                                                                                                                                    async: true,
                                                                                                                                    dataType: "json",
                                                                                                                                    data: JSON.stringify({
                                                                                                                                        ribbonName: "BAFC",

                                                                                                                                        t: BAFCDT,
                                                                                                                                        d: BAFCD,
                                                                                                                                        l: BAFCL,
                                                                                                                                        bh: BAFCBH,

                                                                                                                                        std1: BAFC1STDVal,
                                                                                                                                        name1: BAFC1NameVal,
                                                                                                                                        c12: BAFCC12,
                                                                                                                                        thk1n: BAFCTHK1N,

                                                                                                                                        std2: BAFC2STDVal,
                                                                                                                                        name2: BAFC2NameVal,
                                                                                                                                        c22: BAFCC22,
                                                                                                                                        thk2n: BAFCTHK2N,

                                                                                                                                        std3: BAFC3STDVal,
                                                                                                                                        name3: BAFC3NameVal,
                                                                                                                                        c32: BAFCC32,
                                                                                                                                        thk3n: BAFCTHK3N,

                                                                                                                                        std4: BAFC4STDVal,
                                                                                                                                        name4: BAFC4NameVal,
                                                                                                                                        c42: BAFCC42,
                                                                                                                                        thk4n: BAFCTHK4N,

                                                                                                                                        jstd: BAFCJSTDVal,
                                                                                                                                        jname: BAFCJNameVal,

                                                                                                                                        d1: BAFCD1.toFixed(4),
                                                                                                                                        c11: BAFCC11.toFixed(4),
                                                                                                                                        o1t: BAFCO1T.toFixed(4),
                                                                                                                                        e1t: (BAFCE1T / 1000).toFixed(4),

                                                                                                                                        d2: BAFCD2.toFixed(4),
                                                                                                                                        c21: BAFCC21.toFixed(4),
                                                                                                                                        o2t: BAFCO2T.toFixed(4),
                                                                                                                                        e2t: (BAFCE2T / 1000).toFixed(4),

                                                                                                                                        d3: BAFCD3.toFixed(4),
                                                                                                                                        c31: BAFCC31.toFixed(4),
                                                                                                                                        o3t: BAFCO3T.toFixed(4),
                                                                                                                                        e3t: (BAFCE3T / 1000).toFixed(4),

                                                                                                                                        d4: BAFCD4.toFixed(4),
                                                                                                                                        c41: BAFCC41.toFixed(4),
                                                                                                                                        o4t: BAFCO4T.toFixed(4),
                                                                                                                                        e4t: (BAFCE4T / 1000).toFixed(4),

                                                                                                                                        ejt: (BAFCEJT / 1000).toFixed(4),

                                                                                                                                        g: BAFCG.toFixed(4),

                                                                                                                                        bh1: BAFCBH1.toFixed(4),
                                                                                                                                        c1: BAFCC1.toFixed(4),
                                                                                                                                        thk1e: BAFCTHK1E.toFixed(4),
                                                                                                                                        bh1l: BAFCBH1L.toFixed(4),
                                                                                                                                        alpha1: BAFCALPHA1.toFixed(8),
                                                                                                                                        beta1: BAFCBETA1.toFixed(8),
                                                                                                                                        sh1: BAFCSH1.toFixed(4),

                                                                                                                                        bh2: BAFCBH2.toFixed(4),
                                                                                                                                        c2: BAFCC2.toFixed(4),
                                                                                                                                        thk2e: BAFCTHK2E.toFixed(4),
                                                                                                                                        bh2l: BAFCBH2L.toFixed(4),
                                                                                                                                        alpha2: BAFCALPHA2.toFixed(8),
                                                                                                                                        beta2: BAFCBETA2.toFixed(8),
                                                                                                                                        sh2: BAFCSH2.toFixed(4),

                                                                                                                                        bh3: BAFCBH3.toFixed(4),
                                                                                                                                        c3: BAFCC3.toFixed(4),
                                                                                                                                        thk3e: BAFCTHK3E.toFixed(4),
                                                                                                                                        bh3l: BAFCBH3L.toFixed(4),
                                                                                                                                        alpha3: BAFCALPHA3.toFixed(8),
                                                                                                                                        beta3: BAFCBETA3.toFixed(8),
                                                                                                                                        sh3: BAFCSH3.toFixed(4),

                                                                                                                                        bh4: BAFCBH4.toFixed(4),
                                                                                                                                        c4: BAFCC4.toFixed(4),
                                                                                                                                        thk4e: BAFCTHK4E.toFixed(4),
                                                                                                                                        bh4l: BAFCBH4L.toFixed(4),
                                                                                                                                        alpha4: BAFCALPHA4.toFixed(8),
                                                                                                                                        beta4: BAFCBETA4.toFixed(8),
                                                                                                                                        sh4: BAFCSH4.toFixed(4),

                                                                                                                                        i0: BAFCI0.toFixed(4),

                                                                                                                                        thk1c: BAFCTHK1C.toFixed(4),
                                                                                                                                        thk1d: BAFCTHK1D.toFixed(4),
                                                                                                                                        thk1chk: BAFCTHK1CHK,
                                                                                                                                        f1allow: BAFCF1ALLOW.toFixed(4),
                                                                                                                                        f1max: BAFCF1MAX.toFixed(4),
                                                                                                                                        f1chk: BAFCF1CHK,

                                                                                                                                        f1: BAFCF1.toFixed(4),
                                                                                                                                        i1: BAFCI1.toFixed(4),

                                                                                                                                        thk2c: BAFCTHK2C.toFixed(4),
                                                                                                                                        thk2d: BAFCTHK2D.toFixed(4),
                                                                                                                                        thk2chk: BAFCTHK2CHK,
                                                                                                                                        f2allow: BAFCF2ALLOW.toFixed(4),
                                                                                                                                        f2max: BAFCF2MAX.toFixed(4),
                                                                                                                                        f2chk: BAFCF2CHK,

                                                                                                                                        f2: BAFCF2.toFixed(4),
                                                                                                                                        i2: BAFCI2.toFixed(4),

                                                                                                                                        thk3c: BAFCTHK3C.toFixed(4),
                                                                                                                                        thk3d: BAFCTHK3D.toFixed(4),
                                                                                                                                        thk3chk: BAFCTHK3CHK,
                                                                                                                                        f3allow: BAFCF3ALLOW.toFixed(4),
                                                                                                                                        f3max: BAFCF3MAX.toFixed(4),
                                                                                                                                        f3chk: BAFCF3CHK,

                                                                                                                                        f3: BAFCF3.toFixed(4),
                                                                                                                                        i3: BAFCI3.toFixed(4),

                                                                                                                                        thk4c: BAFCTHK4C.toFixed(4),
                                                                                                                                        thk4d: BAFCTHK4D.toFixed(4),
                                                                                                                                        thk4chk: BAFCTHK4CHK,
                                                                                                                                        f4allow: BAFCF4ALLOW.toFixed(4),
                                                                                                                                        f4max: BAFCF4MAX.toFixed(4),
                                                                                                                                        f4chk: BAFCF4CHK
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
                                                                                                                                            BAFCPayJS.dialog({
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
                                                                                                                                                        BAFCPayJS.dialog("close");
                                                                                                                                                        BAFCPayJS.dialog("clear");
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
                                                                                                                                                                    BAFCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                            BAFCPayJS.dialog('close');
                                                                                                                                                                            BAFCPayJS.dialog('clear');
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