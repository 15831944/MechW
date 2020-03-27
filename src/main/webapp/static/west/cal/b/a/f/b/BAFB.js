$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bafbSketch = $("#d2");
    let bafbModel = $("#d3");
    let bafbd2d3 = $('#d2d3');

    $("#cal").html("<table id='bafb'></table>");
    let pg = $("#bafb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/f/b/BAFB.json", function (result) {

        let BAFBDT;
        let BAFB1Category, BAFB1CategoryVal, BAFB1Type, BAFB1TypeVal, BAFB1STD, BAFB1STDVal, BAFB1Name, BAFB1NameVal,
            BAFB2Category, BAFB2CategoryVal, BAFB2Type, BAFB2TypeVal, BAFB2STD, BAFB2STDVal, BAFB2Name, BAFB2NameVal,
            BAFB3Category, BAFB3CategoryVal, BAFB3Type, BAFB3TypeVal, BAFB3STD, BAFB3STDVal, BAFB3Name, BAFB3NameVal,
            BAFBJCategory, BAFBJCategoryVal, BAFBJType, BAFBJTypeVal, BAFBJSTD, BAFBJSTDVal, BAFBJName, BAFBJNameVal;
        let columns, rows, ed;

        function bafb2d(l = "L", bh = "H", bh1 = "0.45H", bh2 = "0.3H", bh3 = "0.25H") {

            bafbSketch.empty();

            let width = bafbSketch.width();
            let height = bafbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAFB2VG").attr("height", height);

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
                {x: padding + wg - thk, y: padding + 1.8 * hg},
                {x: padding + wg - thk, y: padding + 1.8 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 1.8 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 1.8 * hg},
                {x: padding + wg - 2 * thk, y: padding + 1.8 * hg},
                {x: padding + wg - 2 * thk, y: padding + 1.8 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 1.8 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 1.8 * hg - thk, padding + wg, padding + 1.8 * hg - thk);

            // 角钢 第一道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 1.8 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.8 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.8 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.8 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.8 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.8 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 1.8 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 1.8 * hg - thk, padding + 3 * wg + thk, padding + 1.8 * hg - thk);

            // 角钢 第一道 左
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3 * hg},
                {x: padding + wg - thk, y: padding + 3 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 3 * hg - thk},
                {x: padding + wg - 6 * thk, y: padding + 3 * hg},
                {x: padding + wg - 2 * thk, y: padding + 3 * hg},
                {x: padding + wg - 2 * thk, y: padding + 3 * hg + 4 * thk},
                {x: padding + wg - thk, y: padding + 3 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + wg - thk, padding + 3 * hg - thk, padding + wg, padding + 3 * hg - thk);

            // 角钢 第一道 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + 3 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3 * hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3 * hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3 * hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg + 4 * thk}
            ])).classed("sketch", true);
            drawLine(padding + 3 * wg, padding + 3 * hg - thk, padding + 3 * wg + thk, padding + 3 * hg - thk);

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
            ])).attr("id", "BAFB2ketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAFB2ketchH")
                .attr("startOffset", "50%").text(bh);

            // L
            dimBottomH(padding + wg, height - padding, padding + 3 * wg, height - padding, l, "BAFBSketchL");

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 1.8 * hg - thk, padding + wg - 6 * thk, padding - thk, bh1, "BAFBSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 3 * hg - thk, padding + wg - 6 * thk, padding + 1.8 * hg - thk, bh2, "BAFBSketchBH2");

            // BH3
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3 * hg - thk, bh3, "BAFBSketchBH3");
        }

        currentTabIndex = bafbd2d3.tabs('getTabIndex', bafbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bafb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bafb").length > 0) {
                    bafb2d();
                }
            });
        }
        bafbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bafb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bafb").length > 0) {
                            bafb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 顶边加固、二道加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAFB1Category);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAFB1Type);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAFB1STD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAFB1Name);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAFB2Category);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAFB2Type);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAFB2STD);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAFB2Name);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAFB3Category);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAFB3Type);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAFB3STD);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", BAFB3Name);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAFBJCategory);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAFBJType);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAFBJSTD);
                }
                else if (index === 25) {
                    $(ed.target).combobox("loadData", BAFBJName);
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
                    bafbSketch.empty();

                    // model
                    bafbModel.empty();

                    // sketch
                    currentTabIndex = bafbd2d3.tabs('getTabIndex', bafbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafb2d();
                        bafbSketch.off("resize").on("resize", function () {
                            if ($("#bafb").length > 0) {
                                bafb2d();
                            }
                        });
                    }
                    bafbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafb2d();
                                bafbSketch.off("resize").on("resize", function () {
                                    if ($("#bafb").length > 0) {
                                        bafb2d();
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

                        BAFBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAFB1Category = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAFB1Type = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFB1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFB1Name = null;

                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAFB2Category = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAFB2Type = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFB2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFB2Name = null;

                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAFB3Category = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAFB3Type = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFB3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFB3Name = null;

                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAFBJCategory = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAFBJType = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFBJSTD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFBJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB1Category = [];
                                BAFB2Category = [];
                                BAFB3Category = [];
                                BAFBJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAFBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAFB1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFB2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFB3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFBJCategory[index] = {
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

                        BAFB1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAFB1Type = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFB1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFB1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB1CategoryVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB1Type = [];
                                $(result).each(function (index, element) {
                                    BAFB1Type[index] = {
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

                        BAFB1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFB1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFB1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB1CategoryVal,
                                type: BAFB1TypeVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB1STD = [];
                                $(result).each(function (index, element) {
                                    BAFB1STD[index] = {
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

                        BAFB1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFB1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB1CategoryVal,
                                type: BAFB1TypeVal,
                                std: BAFB1STDVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB1Name = [];
                                $(result).each(function (index, element) {
                                    BAFB1Name[index] = {
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

                        BAFB2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAFB2Type = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFB2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFB2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB2CategoryVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB2Type = [];
                                $(result).each(function (index, element) {
                                    BAFB2Type[index] = {
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

                        BAFB2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFB2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFB2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB2CategoryVal,
                                type: BAFB2TypeVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB2STD = [];
                                $(result).each(function (index, element) {
                                    BAFB2STD[index] = {
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

                        BAFB2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFB2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB2CategoryVal,
                                type: BAFB2TypeVal,
                                std: BAFB2STDVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB2Name = [];
                                $(result).each(function (index, element) {
                                    BAFB2Name[index] = {
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

                        BAFB3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAFB3Type = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFB3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFB3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB3CategoryVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB3Type = [];
                                $(result).each(function (index, element) {
                                    BAFB3Type[index] = {
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

                        BAFB3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFB3STD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFB3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB3CategoryVal,
                                type: BAFB3TypeVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB3STD = [];
                                $(result).each(function (index, element) {
                                    BAFB3STD[index] = {
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

                        BAFB3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFB3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFB3CategoryVal,
                                type: BAFB3TypeVal,
                                std: BAFB3STDVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFB3Name = [];
                                $(result).each(function (index, element) {
                                    BAFB3Name[index] = {
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

                        BAFBJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAFBJType = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFBJSTD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFBJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFBJCategoryVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFBJType = [];
                                $(result).each(function (index, element) {
                                    BAFBJType[index] = {
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

                        BAFBJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAFBJSTD = null;
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFBJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFBJCategoryVal,
                                type: BAFBJTypeVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFBJSTD = [];
                                $(result).each(function (index, element) {
                                    BAFBJSTD[index] = {
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

                        BAFBJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BAFBJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFBJCategoryVal,
                                type: BAFBJTypeVal,
                                std: BAFBJSTDVal,
                                temp: BAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFBJName = [];
                                $(result).each(function (index, element) {
                                    BAFBJName[index] = {
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
                    let BAFBD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAFBD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // L
                    let BAFBL;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAFBL = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafb2d(BAFBL);
                        bafbSketch.off("resize").on("resize", function () {
                            if ($("#bafb").length > 0) {
                                bafb2d(BAFBL);
                            }
                        });
                    }
                    bafbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafb2d(BAFBL);
                                bafbSketch.off("resize").on("resize", function () {
                                    if ($("#bafb").length > 0) {
                                        bafb2d(BAFBL);
                                    }
                                });
                            }
                        }
                    });

                    // H
                    let BAFBBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 / 0.45 * BAFBL, 0.1 / 0.3 * BAFBL, 0.1 / 0.25 * BAFBL)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 / 0.45 * BAFBL, 5 / 0.3 * BAFBL, 5 / 0.25 * BAFBL)) {
                        BAFBBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 / 0.45 * BAFBL, 0.1 / 0.3 * BAFBL, 0.1 / 0.25 * BAFBL)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 / 0.45 * BAFBL, 0.1 / 0.3 * BAFBL, 0.1 / 0.25 * BAFBL).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 / 0.45 * BAFBL, 5 / 0.3 * BAFBL, 5 / 0.25 * BAFBL)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 / 0.45 * BAFBL, 5 / 0.3 * BAFBL, 5 / 0.25 * BAFBL).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafb2d(BAFBL, BAFBBH, (0.45 * BAFBBH).toFixed(2), (0.30 * BAFBBH).toFixed(2), (0.25 * BAFBBH).toFixed(2));
                        bafbSketch.off("resize").on("resize", function () {
                            if ($("#bafb").length > 0) {
                                bafb2d(BAFBL, BAFBBH, (0.45 * BAFBBH).toFixed(2), (0.3 * BAFBBH).toFixed(2), (0.25 * BAFBBH).toFixed(2));
                            }
                        });
                    }
                    bafbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafb2d(BAFBL, BAFBBH, (0.45 * BAFBBH).toFixed(2), (0.3 * BAFBBH).toFixed(2), (0.25 * BAFBBH).toFixed(2));
                                bafbSketch.off("resize").on("resize", function () {
                                    if ($("#bafb").length > 0) {
                                        bafb2d(BAFBL, BAFBBH, (0.45 * BAFBBH).toFixed(2), (0.3 * BAFBBH).toFixed(2), (0.25 * BAFBBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // 第一段壁板材料名称
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        BAFB1NameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAFBD1, BAFB1ThkMin, BAFB1ThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAFB1CategoryVal,
                            "type": BAFB1TypeVal,
                            "std": BAFB1STDVal,
                            "name": BAFB1NameVal,
                            "temp": BAFBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAFBD1 = parseFloat(result.density);
                            BAFB1ThkMin = parseFloat(result.thkMin);
                            BAFB1ThkMax = parseFloat(result.thkMax);

                            // 第一层壁板腐蚀裕量 C12
                            let BAFBC12;
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) < BAFB1ThkMax) {
                                BAFBC12 = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) >= BAFB1ThkMax) {
                                south.html("第一段壁板腐蚀裕量不能大于等于 " + BAFB1ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 第一段壁板名义厚度
                            let BAFBTHK1N;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > Math.max(BAFBC12, BAFB1ThkMin)
                                && parseFloat(rows[9][columns[0][1].field]) <= BAFB1ThkMax) {
                                BAFBTHK1N = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) <= Math.max(BAFBC12, BAFB1ThkMin)) {
                                south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAFBC12, BAFB1ThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > BAFB1ThkMax) {
                                south.html("第一段壁板名义厚度不能大于 " + BAFB1ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 O1T E1T C11
                            let BAFBO1T, BAFBE1T, BAFBC11;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAFB1CategoryVal,
                                    "type": BAFB1TypeVal,
                                    "std": BAFB1STDVal,
                                    "name": BAFB1NameVal,
                                    "thk": BAFBTHK1N,
                                    "temp": BAFBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAFBO1T = parseFloat(result.ot);
                                    if (BAFBO1T < 0) {
                                        south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAFBE1T = 1000 * parseFloat(result.et);
                                    if (BAFBE1T < 0) {
                                        south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }
                                    BAFBC11 = parseFloat(result.c1);
                                    if (BAFBC11 < 0) {
                                        south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 第二段壁板材料名称
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                        BAFB2NameVal = rows[13][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAFBD2, BAFB2ThkMin, BAFB2ThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAFB2CategoryVal,
                                            "type": BAFB2TypeVal,
                                            "std": BAFB2STDVal,
                                            "name": BAFB2NameVal,
                                            "temp": BAFBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAFBD2 = parseFloat(result.density);
                                            BAFB2ThkMin = parseFloat(result.thkMin);
                                            BAFB2ThkMax = parseFloat(result.thkMax);

                                            // 第二层壁板腐蚀裕量 C22
                                            let BAFBC22;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) < BAFB2ThkMax) {
                                                BAFBC22 = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) >= BAFB2ThkMax) {
                                                south.html("第二段壁板腐蚀裕量不能大于等于 " + BAFB2ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 第二段壁板名义厚度
                                            let BAFBTHK2N;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) > Math.max(BAFBC22, BAFB2ThkMin)
                                                && parseFloat(rows[15][columns[0][1].field]) <= BAFB2ThkMax) {
                                                BAFBTHK2N = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) <= Math.max(BAFBC22, BAFB2ThkMin)) {
                                                south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAFBC22, BAFB2ThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) > BAFB2ThkMax) {
                                                south.html("第二段壁板名义厚度不能大于 " + BAFB2ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 O2T E2T C21
                                            let BAFBO2T, BAFBE2T, BAFBC21;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAFB2CategoryVal,
                                                    "type": BAFB2TypeVal,
                                                    "std": BAFB2STDVal,
                                                    "name": BAFB2NameVal,
                                                    "thk": BAFBTHK2N,
                                                    "temp": BAFBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAFBO2T = parseFloat(result.ot);
                                                    if (BAFBO2T < 0) {
                                                        south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAFBE2T = 1000 * parseFloat(result.et);
                                                    if (BAFBE2T < 0) {
                                                        south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAFBC21 = parseFloat(result.c1);
                                                    if (BAFBC21 < 0) {
                                                        south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 第三段壁板材料名称
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                        BAFB3NameVal = rows[19][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // AJAX 获取材料密度、最大最小厚度
                                                    let BAFBD3, BAFB3ThkMin, BAFB3ThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAFB3CategoryVal,
                                                            "type": BAFB3TypeVal,
                                                            "std": BAFB3STDVal,
                                                            "name": BAFB3NameVal,
                                                            "temp": BAFBDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAFBD3 = parseFloat(result.density);
                                                            BAFB3ThkMin = parseFloat(result.thkMin);
                                                            BAFB3ThkMax = parseFloat(result.thkMax);

                                                            // 第三层壁板腐蚀裕量 C32
                                                            let BAFBC32;
                                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                && parseFloat(rows[20][columns[0][1].field]) < BAFB3ThkMax) {
                                                                BAFBC32 = parseFloat(rows[20][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                && parseFloat(rows[20][columns[0][1].field]) >= BAFB3ThkMax) {
                                                                south.html("第三段壁板腐蚀裕量不能大于等于 " + BAFB3ThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // 第三段壁板名义厚度
                                                            let BAFBTHK3N;
                                                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) > Math.max(BAFBC32, BAFB3ThkMin)
                                                                && parseFloat(rows[21][columns[0][1].field]) <= BAFB3ThkMax) {
                                                                BAFBTHK3N = parseFloat(rows[21][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) <= Math.max(BAFBC32, BAFB3ThkMin)) {
                                                                south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAFBC32, BAFB3ThkMin) + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                && parseFloat(rows[21][columns[0][1].field]) > BAFB3ThkMax) {
                                                                south.html("第三段壁板名义厚度不能大于 " + BAFB3ThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // ajax 获取 O3T E3T C31
                                                            let BAFBO3T, BAFBE3T, BAFBC31;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAFB3CategoryVal,
                                                                    "type": BAFB3TypeVal,
                                                                    "std": BAFB3STDVal,
                                                                    "name": BAFB3NameVal,
                                                                    "thk": BAFBTHK3N,
                                                                    "temp": BAFBDT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": 100000
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAFBO3T = parseFloat(result.ot);
                                                                    BAFBE3T = 1000 * parseFloat(result.et);
                                                                    BAFBC31 = parseFloat(result.c1);


                                                                    BAFBO3T = parseFloat(result.ot);
                                                                    if (BAFBO3T < 0) {
                                                                        south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAFBE3T = 1000 * parseFloat(result.et);
                                                                    if (BAFBE3T < 0) {
                                                                        south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BAFBC31 = parseFloat(result.c1);
                                                                    if (BAFBC31 < 0) {
                                                                        south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 加固件材料名称
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                                        BAFBJNameVal = rows[25][columns[0][1].field];
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // ajax 获取 EJT
                                                                    let BAFBEJT;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_e.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAFBJCategoryVal,
                                                                            "type": BAFBJTypeVal,
                                                                            "std": BAFBJSTDVal,
                                                                            "name": BAFBJNameVal,
                                                                            "temp": BAFBDT
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAFBEJT = 1000 * parseFloat(result.et);
                                                                            if (BAFBEJT < 0) {
                                                                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 过程参数
                                                                            let BAFBG = 9.81;

                                                                            let BAFBBH1 = 0.45 * BAFBBH;
                                                                            let BAFBC1 = BAFBC11 + BAFBC12;
                                                                            let BAFBTHK1E = BAFBTHK1N - BAFBC1;
                                                                            let BAFBBH1L = BAFBBH1 / BAFBL;
                                                                            let BAFBSH1 = BAFBBH1;

                                                                            let BAFBBH2 = 0.3 * BAFBBH;
                                                                            let BAFBC2 = BAFBC21 + BAFBC22;
                                                                            let BAFBTHK2E = BAFBTHK2N - BAFBC2;
                                                                            let BAFBBH2L = BAFBBH2 / BAFBL;
                                                                            let BAFBSH2 = BAFBBH1 + BAFBBH2;

                                                                            let BAFBBH3 = 0.25 * BAFBBH;
                                                                            let BAFBC3 = BAFBC31 + BAFBC32;
                                                                            let BAFBTHK3E = BAFBTHK3N - BAFBC3;
                                                                            let BAFBBH3L = BAFBBH3 / BAFBL;
                                                                            let BAFBSH3 = BAFBBH1 + BAFBBH2 + BAFBBH3;

                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "ba": BAFBBH1L
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    let BAFBALPHA1 = parseFloat(result.alpha);
                                                                                    let BAFBBETA1 = parseFloat(result.beta);

                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "ba": BAFBBH2L
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            let BAFBALPHA2 = parseFloat(result.alpha);
                                                                                            let BAFBBETA2 = parseFloat(result.beta);

                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "ba": BAFBBH3L
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    let BAFBALPHA3 = parseFloat(result.alpha);
                                                                                                    let BAFBBETA3 = parseFloat(result.beta);

                                                                                                    // 顶边加固件
                                                                                                    let BAFBI0 = 0.217 * BAFBD * BAFBG * BAFBSH1 * BAFBSH1 * BAFBL * BAFBL * BAFBL / BAFBEJT / 1000000000;
                                                                                                    south.html(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "顶边加固件所需最小惯性矩：" + BAFBI0.toFixed(2) + " mm⁴" +
                                                                                                        "</span>");

                                                                                                    // 第一段壁板
                                                                                                    let BAFBTHK1C = BAFBL * Math.sqrt(3 * BAFBALPHA1 * BAFBD * BAFBG * BAFBSH1 / BAFBO1T / 1000000000);
                                                                                                    let BAFBTHK1D = BAFBTHK1C + BAFBC12;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第一段壁板所需厚度：" + (BAFBTHK1D + BAFBC11).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAFBTHK1CHK;
                                                                                                    if (BAFBTHK1N >= (BAFBTHK1D + BAFBC11)) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAFBTHK1N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBTHK1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAFBTHK1N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBTHK1CHK = "不合格";
                                                                                                    }

                                                                                                    let BAFBF1ALLOW = 5 * (BAFBTHK1E / 2 + Math.sqrt(BAFBBH1L) * BAFBL / 500);
                                                                                                    let BAFBF1MAX = BAFBBETA1 * Math.pow(BAFBL, 4) * BAFBD * BAFBG * BAFBSH1 / 1000000000 / (2 * BAFBE1T * Math.pow(BAFBTHK1E, 3));
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第一段壁板许用挠度：" + BAFBF1ALLOW.toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAFBF1CHK;
                                                                                                    if (BAFBF1MAX <= BAFBF1ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAFBF1MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBF1CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAFBF1MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBF1CHK = "不合格";
                                                                                                    }

                                                                                                    // 第一道加固件
                                                                                                    let BAFBF1 = BAFBD * BAFBG * BAFBSH2 * (BAFBSH1 + BAFBSH2) / 6 / 1000000000;
                                                                                                    let BAFBI1 = 1.3 * BAFBF1 * BAFBL * BAFBL * BAFBL / BAFBEJT;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第一道加固件所需最小惯性矩：" + BAFBI1.toFixed(2) + " mm⁴" +
                                                                                                        "</span>");

                                                                                                    // 第二段壁板
                                                                                                    let BAFBTHK2C = BAFBL * Math.sqrt(6 * BAFBALPHA2 * BAFBD * BAFBG * (BAFBSH1 + BAFBSH2) / BAFBO2T / 1000000000);
                                                                                                    let BAFBTHK2D = BAFBTHK2C + BAFBC22;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第二段壁板所需厚度：" + (BAFBTHK2D + BAFBC21).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAFBTHK2CHK;
                                                                                                    if (BAFBTHK2N >= (BAFBTHK2D + BAFBC21)) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAFBTHK2N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBTHK2CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAFBTHK2N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBTHK2CHK = "不合格";
                                                                                                    }

                                                                                                    let BAFBF2ALLOW = 5 * (BAFBTHK2E / 2 + Math.sqrt(BAFBBH2L) * BAFBL / 500);
                                                                                                    let BAFBF2MAX = BAFBBETA2 * Math.pow(BAFBL, 4) * BAFBD * BAFBG * (BAFBSH1 + BAFBSH2) / 1000000000 / (2 * BAFBE2T * Math.pow(BAFBTHK2E, 3));
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第二段壁板许用挠度：" + BAFBF2ALLOW.toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAFBF2CHK;
                                                                                                    if (BAFBF2MAX <= BAFBF2ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAFBF2MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBF2CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAFBF2MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBF2CHK = "不合格";
                                                                                                    }

                                                                                                    // 第二道加固件
                                                                                                    let BAFBF2 = BAFBD * BAFBG * (BAFBSH3 - BAFBSH1) * (BAFBSH1 + BAFBSH2 + BAFBSH3) / 6 / 1000000000;
                                                                                                    let BAFBI2 = 1.3 * BAFBF2 * BAFBL * BAFBL * BAFBL / BAFBEJT;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第二道加固件所需最小惯性矩：" + BAFBI2.toFixed(2) + " mm⁴" +
                                                                                                        "</span>");

                                                                                                    // 第三段壁板
                                                                                                    let BAFBTHK3C = BAFBL * Math.sqrt(6 * BAFBALPHA3 * BAFBD * BAFBG * (BAFBSH2 + BAFBSH3) / BAFBO3T / 1000000000);
                                                                                                    let BAFBTHK3D = BAFBTHK3C + BAFBC32;
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第三段壁板所需厚度：" + (BAFBTHK3D + BAFBC31).toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAFBTHK3CHK;
                                                                                                    if (BAFBTHK3N >= (BAFBTHK3D + BAFBC31)) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAFBTHK3N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBTHK3CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "输入厚度：" + BAFBTHK3N + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBTHK3CHK = "不合格";
                                                                                                    }

                                                                                                    let BAFBF3ALLOW = 5 * (BAFBTHK3E / 2 + Math.sqrt(BAFBBH3L) * BAFBL / 500);
                                                                                                    let BAFBF3MAX = BAFBBETA3 * Math.pow(BAFBL, 4) * BAFBD * BAFBG * (BAFBSH2 + BAFBSH3) / 1000000000 / (2 * BAFBE3T * Math.pow(BAFBTHK3E, 3));
                                                                                                    south.append(
                                                                                                        "<span style='color:#444444;'>" +
                                                                                                        "&ensp;|&ensp;" +
                                                                                                        "第三段壁板许用挠度：" + BAFBF3ALLOW.toFixed(2) + " mm" +
                                                                                                        "</span>");
                                                                                                    let BAFBF3CHK;
                                                                                                    if (BAFBF3MAX <= BAFBF3ALLOW) {
                                                                                                        south.append(
                                                                                                            "<span style='color:#444444;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAFBF3MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBF3CHK = "合格";
                                                                                                    }
                                                                                                    else {
                                                                                                        south.append(
                                                                                                            "<span style='color:red;'>" +
                                                                                                            "&ensp;|&ensp;" +
                                                                                                            "实际挠度：" + BAFBF3MAX.toFixed(2) + " mm" +
                                                                                                            "</span>");
                                                                                                        BAFBF3CHK = "不合格";
                                                                                                    }

                                                                                                    // docx
                                                                                                    let BAFBPayJS = $('#payjs');

                                                                                                    function getDocx() {
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "bafbdocx.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                ribbonName: "BAFB",

                                                                                                                t: BAFBDT,
                                                                                                                d: BAFBD,
                                                                                                                l: BAFBL,
                                                                                                                bh: BAFBBH,
                                                                                                                fstd: BAFB1STDVal,
                                                                                                                fname: BAFB1NameVal,
                                                                                                                c12: BAFBC12,
                                                                                                                thk1n: BAFBTHK1N,
                                                                                                                sstd: BAFB2STDVal,
                                                                                                                sname: BAFB2NameVal,
                                                                                                                c22: BAFBC22,
                                                                                                                thk2n: BAFBTHK2N,
                                                                                                                tstd: BAFB3STDVal,
                                                                                                                tname: BAFB3NameVal,
                                                                                                                c32: BAFBC32,
                                                                                                                thk3n: BAFBTHK3N,
                                                                                                                jstd: BAFBJSTDVal,
                                                                                                                jname: BAFBJNameVal,
                                                                                                                d1: BAFBD1.toFixed(4),
                                                                                                                c11: BAFBC11.toFixed(4),
                                                                                                                o1t: BAFBO1T.toFixed(4),
                                                                                                                e1t: (BAFBE1T / 1000).toFixed(4),
                                                                                                                d2: BAFBD2.toFixed(4),
                                                                                                                c21: BAFBC21.toFixed(4),
                                                                                                                o2t: BAFBO2T.toFixed(4),
                                                                                                                e2t: (BAFBE2T / 1000).toFixed(4),
                                                                                                                d3: BAFBD3.toFixed(4),
                                                                                                                c31: BAFBC31.toFixed(4),
                                                                                                                o3t: BAFBO3T.toFixed(4),
                                                                                                                e3t: (BAFBE3T / 1000).toFixed(4),
                                                                                                                ejt: (BAFBEJT / 1000).toFixed(4),
                                                                                                                g: BAFBG.toFixed(4),
                                                                                                                bh1: BAFBBH1.toFixed(4),
                                                                                                                c1: BAFBC1.toFixed(4),
                                                                                                                thk1e: BAFBTHK1E.toFixed(4),
                                                                                                                bh1l: BAFBBH1L.toFixed(4),
                                                                                                                alpha1: BAFBALPHA1.toFixed(8),
                                                                                                                beta1: BAFBBETA1.toFixed(8),
                                                                                                                bh2: BAFBBH2.toFixed(4),
                                                                                                                c2: BAFBC2.toFixed(4),
                                                                                                                thk2e: BAFBTHK2E.toFixed(4),
                                                                                                                bh2l: BAFBBH2L.toFixed(4),
                                                                                                                alpha2: BAFBALPHA2.toFixed(8),
                                                                                                                beta2: BAFBBETA2.toFixed(8),
                                                                                                                bh3: BAFBBH3.toFixed(4),
                                                                                                                c3: BAFBC3.toFixed(4),
                                                                                                                thk3e: BAFBTHK3E.toFixed(4),
                                                                                                                bh3l: BAFBBH3L.toFixed(4),
                                                                                                                alpha3: BAFBALPHA3.toFixed(8),
                                                                                                                beta3: BAFBBETA3.toFixed(8),
                                                                                                                sh1: BAFBSH1.toFixed(4),
                                                                                                                sh2: BAFBSH2.toFixed(4),
                                                                                                                sh3: BAFBSH3.toFixed(4),
                                                                                                                i0: BAFBI0.toFixed(4),
                                                                                                                thk1c: BAFBTHK1C.toFixed(4),
                                                                                                                thk1d: BAFBTHK1D.toFixed(4),
                                                                                                                thk1chk: BAFBTHK1CHK,
                                                                                                                f1allow: BAFBF1ALLOW.toFixed(4),
                                                                                                                f1max: BAFBF1MAX.toFixed(4),
                                                                                                                f1chk: BAFBF1CHK,
                                                                                                                f1: BAFBF1.toFixed(4),
                                                                                                                i1: BAFBI1.toFixed(4),
                                                                                                                thk2c: BAFBTHK2C.toFixed(4),
                                                                                                                thk2d: BAFBTHK2D.toFixed(4),
                                                                                                                thk2chk: BAFBTHK2CHK,
                                                                                                                f2allow: BAFBF2ALLOW.toFixed(4),
                                                                                                                f2max: BAFBF2MAX.toFixed(4),
                                                                                                                f2chk: BAFBF2CHK,
                                                                                                                f2: BAFBF2.toFixed(4),
                                                                                                                i2: BAFBI2.toFixed(4),
                                                                                                                thk3c: BAFBTHK3C.toFixed(4),
                                                                                                                thk3d: BAFBTHK3D.toFixed(4),
                                                                                                                thk3chk: BAFBTHK3CHK,
                                                                                                                f3allow: BAFBF3ALLOW.toFixed(4),
                                                                                                                f3max: BAFBF3MAX.toFixed(4),
                                                                                                                f3chk: BAFBF3CHK
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
                                                                                                                    BAFBPayJS.dialog({
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
                                                                                                                                BAFBPayJS.dialog("close");
                                                                                                                                BAFBPayJS.dialog("clear");
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
                                                                                                                                            BAFBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                    BAFBPayJS.dialog('close');
                                                                                                                                                    BAFBPayJS.dialog('clear');
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