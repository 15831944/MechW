$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bagdSketch = $("#d2");
    let bagdModel = $("#d3");
    let bagdd2d3 = $('#d2d3');

    $("#cal").html("<table id='bagd'></table>");
    let pg = $("#bagd");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/b/a/g/d/BAGD.json", function (result) {

        let BAGDDT;
        let BAGD1Category, BAGD1CategoryVal, BAGD1Type, BAGD1TypeVal, BAGD1STD, BAGD1STDVal, BAGD1Name, BAGD1NameVal,
            BAGD2Category, BAGD2CategoryVal, BAGD2Type, BAGD2TypeVal, BAGD2STD, BAGD2STDVal, BAGD2Name, BAGD2NameVal,
            BAGD3Category, BAGD3CategoryVal, BAGD3Type, BAGD3TypeVal, BAGD3STD, BAGD3STDVal, BAGD3Name, BAGD3NameVal,
            BAGDJCategory, BAGDJCategoryVal, BAGDJType, BAGDJTypeVal, BAGDJSTD, BAGDJSTDVal, BAGDJName, BAGDJNameVal;
        let columns, rows, ed;

        function bagd2d(bh = "H", bh1 = "0.45H", bh2 = "0.30H", bh3 = "0.25H", l = "L") {

            bagdSketch.empty();

            let width = bagdSketch.width();
            let height = bagdSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAGD2VG").attr("height", height);

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
                {x: padding + wg - 6 * thk, y: padding + 1.8 * hg},
                {x: padding + wg - thk, y: padding + 1.8 * hg},
                {x: padding + wg - thk, y: padding + 1.8 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 1.8 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 1.8 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 1.8 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 1.8 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 1.8 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.8 * hg}
            ])).classed("sketch", true);

            // 角钢 第二层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.8 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.8 * hg},
                {x: padding + 3 * wg + thk, y: padding + 1.8 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.8 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 1.8 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.8 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 1.8 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 左
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + 3 * hg},
                {x: padding + wg - thk, y: padding + 3 * hg},
                {x: padding + wg - thk, y: padding + 3 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 3 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 3 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 3 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg}
            ])).classed("sketch", true);

            // 角钢 第三层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 3 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg},
                {x: padding + 3 * wg + thk, y: padding + 3 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 3 * hg}
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
            ])).attr("id", "BAGDSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGDSketchH")
                .attr("startOffset", "50%").text(bh);

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 1.8 * hg, padding + wg - 6 * thk, padding, bh1, "BAGDSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, padding + 3 * hg, padding + wg - 6 * thk, padding + 1.8 * hg, bh2, "BAGDSketchBH2");

            // BH2
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 3 * hg, bh3, "BAGDSketchBH3");

            // 垂直加固柱
            drawLine(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + thk);
            drawLine(padding + 3 * wg + 6 * thk, height - padding, padding + 3 * wg + 6 * thk, padding + thk);

            // L
            dimBottomH(padding + wg, height - padding, padding + 3 * wg, height - padding, l, "BAGDSketchL");
        }

        currentTabIndex = bagdd2d3.tabs('getTabIndex', bagdd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bagd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bagd").length > 0) {
                    bagd2d();
                }
            });
        }
        bagdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bagd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bagd").length > 0) {
                            bagd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "顶边加固、无拉杆、垂直加固、二道水平加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAGDJCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAGDJType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAGDJSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAGDJName);
                }

                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAGD1Category);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAGD1Type);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAGD1STD);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAGD1Name);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAGD2Category);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAGD2Type);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAGD2STD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAGD2Name);
                }

                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAGD3Category);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BAGD3Type);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BAGD3STD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BAGD3Name);
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
                    bagdSketch.empty();

                    // model
                    bagdModel.empty();

                    // sketch
                    currentTabIndex = bagdd2d3.tabs('getTabIndex', bagdd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagd2d();
                        bagdSketch.off("resize").on("resize", function () {
                            if ($("#bagd").length > 0) {
                                bagd2d();
                            }
                        });
                    }
                    bagdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagd2d();
                                bagdSketch.off("resize").on("resize", function () {
                                    if ($("#bagd").length > 0) {
                                        bagd2d();
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

                        BAGDDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGDJCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGDJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGDJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGDJName = null;

                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGD1Category = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGD1Type = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGD1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGD1Name = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAGD2Category = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGD2Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGD2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGD2Name = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAGD3Category = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGD3Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGD3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGD3Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD1Category = [];
                                BAGD2Category = [];
                                BAGD3Category = [];
                                BAGDJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAGDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAGD1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGD2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGD3Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGDJCategory[index] = {
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

                        BAGDJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGDJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGDJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGDJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGDJCategoryVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGDJType = [];
                                $(result).each(function (index, element) {
                                    BAGDJType[index] = {
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

                        BAGDJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGDJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGDJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGDJCategoryVal,
                                type: BAGDJTypeVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGDJSTD = [];
                                $(result).each(function (index, element) {
                                    BAGDJSTD[index] = {
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

                        BAGDJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGDJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGDJCategoryVal,
                                type: BAGDJTypeVal,
                                std: BAGDJSTDVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGDJName = [];
                                $(result).each(function (index, element) {
                                    BAGDJName[index] = {
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

                        BAGD1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGD1Type = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGD1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGD1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD1CategoryVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD1Type = [];
                                $(result).each(function (index, element) {
                                    BAGD1Type[index] = {
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

                        BAGD1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGD1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGD1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD1CategoryVal,
                                type: BAGD1TypeVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD1STD = [];
                                $(result).each(function (index, element) {
                                    BAGD1STD[index] = {
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

                        BAGD1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGD1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD1CategoryVal,
                                type: BAGD1TypeVal,
                                std: BAGD1STDVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD1Name = [];
                                $(result).each(function (index, element) {
                                    BAGD1Name[index] = {
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

                        BAGD2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGD2Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGD2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGD2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD2CategoryVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD2Type = [];
                                $(result).each(function (index, element) {
                                    BAGD2Type[index] = {
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

                        BAGD2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGD2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGD2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD2CategoryVal,
                                type: BAGD2TypeVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD2STD = [];
                                $(result).each(function (index, element) {
                                    BAGD2STD[index] = {
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

                        BAGD2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGD2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD2CategoryVal,
                                type: BAGD2TypeVal,
                                std: BAGD2STDVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD2Name = [];
                                $(result).each(function (index, element) {
                                    BAGD2Name[index] = {
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

                        BAGD3CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BAGD3Type = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGD3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGD3Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD3CategoryVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD3Type = [];
                                $(result).each(function (index, element) {
                                    BAGD3Type[index] = {
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

                        BAGD3TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BAGD3STD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGD3Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD3CategoryVal,
                                type: BAGD3TypeVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD3STD = [];
                                $(result).each(function (index, element) {
                                    BAGD3STD[index] = {
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

                        BAGD3STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BAGD3Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGD3CategoryVal,
                                type: BAGD3TypeVal,
                                std: BAGD3STDVal,
                                temp: BAGDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGD3Name = [];
                                $(result).each(function (index, element) {
                                    BAGD3Name[index] = {
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
                    let BAGDD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAGDD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LC
                    let BAGDLC;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAGDLC = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H
                    let BAGDBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAGDLC, 0.1 / 0.45 * BAGDLC, 0.1 / 0.30 * BAGDLC, 0.1 / 0.25 * BAGDLC)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAGDLC, 5 / 0.45 * BAGDLC, 5 / 0.30 * BAGDLC, 5 / 0.25 * BAGDLC)) {
                        BAGDBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAGDLC, 0.1 / 0.45 * BAGDLC, 0.1 / 0.30 * BAGDLC, 0.1 / 0.25 * BAGDLC)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAGDLC, 0.1 / 0.45 * BAGDLC, 0.1 / 0.30 * BAGDLC, 0.1 / 0.25 * BAGDLC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAGDLC, 5 / 0.45 * BAGDLC, 5 / 0.30 * BAGDLC, 5 / 0.25 * BAGDLC)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAGDLC, 5 / 0.45 * BAGDLC, 5 / 0.30 * BAGDLC, 5 / 0.25 * BAGDLC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagd2d(BAGDBH, (0.45 * BAGDBH).toFixed(2), (0.30 * BAGDBH).toFixed(2), (0.25 * BAGDBH).toFixed(2));
                        bagdSketch.off("resize").on("resize", function () {
                            if ($("#bagd").length > 0) {
                                bagd2d(BAGDBH, (0.45 * BAGDBH).toFixed(2), (0.30 * BAGDBH).toFixed(2), (0.25 * BAGDBH).toFixed(2));
                            }
                        });
                    }
                    bagdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagd2d(BAGDBH, (0.45 * BAGDBH).toFixed(2), (0.30 * BAGDBH).toFixed(2), (0.25 * BAGDBH).toFixed(2));
                                bagdSketch.off("resize").on("resize", function () {
                                    if ($("#bagd").length > 0) {
                                        bagd2d(BAGDBH, (0.45 * BAGDBH).toFixed(2), (0.30 * BAGDBH).toFixed(2), (0.25 * BAGDBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // L
                    let BAGDL;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])
                        && parseFloat(rows[4][columns[0][1].field]) >= BAGDLC) {
                        BAGDL = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])
                        && parseFloat(rows[4][columns[0][1].field]) < BAGDLC) {
                        south.html("壁板宽度 L 不能小于 " + BAGDLC + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagd2d(BAGDBH, (0.45 * BAGDBH).toFixed(2), (0.30 * BAGDBH).toFixed(2), (0.25 * BAGDBH).toFixed(2), BAGDL);
                        bagdSketch.off("resize").on("resize", function () {
                            if ($("#bagd").length > 0) {
                                bagd2d(BAGDBH, (0.45 * BAGDBH).toFixed(2), (0.30 * BAGDBH).toFixed(2), (0.25 * BAGDBH).toFixed(2), BAGDL);
                            }
                        });
                    }
                    bagdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagd2d(BAGDBH, (0.45 * BAGDBH).toFixed(2), (0.30 * BAGDBH).toFixed(2), (0.25 * BAGDBH).toFixed(2), BAGDL);
                                bagdSketch.off("resize").on("resize", function () {
                                    if ($("#bagd").length > 0) {
                                        bagd2d(BAGDBH, (0.45 * BAGDBH).toFixed(2), (0.30 * BAGDBH).toFixed(2), (0.25 * BAGDBH).toFixed(2), BAGDL);
                                    }
                                });
                            }
                        }
                    });

                    // 加固件材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        BAGDJNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // ajax 获取 EJT
                    let BAGDEJT;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_e.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAGDJCategoryVal,
                            "type": BAGDJTypeVal,
                            "std": BAGDJSTDVal,
                            "name": BAGDJNameVal,
                            "temp": BAGDDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAGDEJT = 1000 * parseFloat(result.et);
                            if (BAGDEJT < 0) {
                                south.html("查询顶边加固件材料弹性模量失败！").css("color", "red");
                                return false;
                            }

                            // 第一段壁板材料名称
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                BAGD1NameVal = rows[12][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // AJAX 获取材料密度、最大最小厚度
                            let BAGDD1, BAGD1ThkMin, BAGD1ThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAGD1CategoryVal,
                                    "type": BAGD1TypeVal,
                                    "std": BAGD1STDVal,
                                    "name": BAGD1NameVal,
                                    "temp": BAGDDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAGDD1 = parseFloat(result.density);
                                    BAGD1ThkMin = parseFloat(result.thkMin);
                                    BAGD1ThkMax = parseFloat(result.thkMax);

                                    // 第一层壁板腐蚀裕量 C12
                                    let BAGDC12;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < BAGD1ThkMax) {
                                        BAGDC12 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= BAGD1ThkMax) {
                                        south.html("第一段壁板腐蚀裕量不能大于等于 " + BAGD1ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 第一段壁板名义厚度
                                    let BAGDTHK1N;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) > Math.max(BAGDC12, BAGD1ThkMin)
                                        && parseFloat(rows[14][columns[0][1].field]) <= BAGD1ThkMax) {
                                        BAGDTHK1N = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) <= Math.max(BAGDC12, BAGD1ThkMin)) {
                                        south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAGDC12, BAGD1ThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) > BAGD1ThkMax) {
                                        south.html("第一段壁板名义厚度不能大于 " + BAGD1ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // ajax 获取 O1T E1T C11
                                    let BAGDO1T, BAGDE1T, BAGDC11;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAGD1CategoryVal,
                                            "type": BAGD1TypeVal,
                                            "std": BAGD1STDVal,
                                            "name": BAGD1NameVal,
                                            "thk": BAGDTHK1N,
                                            "temp": BAGDDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAGDO1T = parseFloat(result.ot);
                                            if (BAGDO1T < 0) {
                                                south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGDE1T = 1000 * parseFloat(result.et);
                                            if (BAGDE1T < 0) {
                                                south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGDC11 = parseFloat(result.c1);
                                            if (BAGDC11 < 0) {
                                                south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 第二段壁板材料名称
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                BAGD2NameVal = rows[18][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAGDD2, BAGD2ThkMin, BAGD2ThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAGD2CategoryVal,
                                                    "type": BAGD2TypeVal,
                                                    "std": BAGD2STDVal,
                                                    "name": BAGD2NameVal,
                                                    "temp": BAGDDT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAGDD2 = parseFloat(result.density);
                                                    BAGD2ThkMin = parseFloat(result.thkMin);
                                                    BAGD2ThkMax = parseFloat(result.thkMax);

                                                    // 第二层壁板腐蚀裕量 C22
                                                    let BAGDC22;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAGD2ThkMax) {
                                                        BAGDC22 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAGD2ThkMax) {
                                                        south.html("第二段壁板腐蚀裕量不能大于等于 " + BAGD2ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 第二段壁板名义厚度
                                                    let BAGDTHK2N;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.max(BAGDC22, BAGD2ThkMin)
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BAGD2ThkMax) {
                                                        BAGDTHK2N = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.max(BAGDC22, BAGD2ThkMin)) {
                                                        south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAGDC22, BAGD2ThkMin) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BAGD2ThkMax) {
                                                        south.html("第二段壁板名义厚度不能大于 " + BAGD2ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 O2T E2T C21
                                                    let BAGDO2T, BAGDE2T, BAGDC21;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAGD2CategoryVal,
                                                            "type": BAGD2TypeVal,
                                                            "std": BAGD2STDVal,
                                                            "name": BAGD2NameVal,
                                                            "thk": BAGDTHK2N,
                                                            "temp": BAGDDT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAGDO2T = parseFloat(result.ot);
                                                            if (BAGDO2T < 0) {
                                                                south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGDE2T = 1000 * parseFloat(result.et);
                                                            if (BAGDE2T < 0) {
                                                                south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGDC21 = parseFloat(result.c1);
                                                            if (BAGDC21 < 0) {
                                                                south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 第三段壁板材料名称
                                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                BAGD3NameVal = rows[24][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // AJAX 获取材料密度、最大最小厚度
                                                            let BAGDD3, BAGD3ThkMin, BAGD3ThkMax;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BAGD3CategoryVal,
                                                                    "type": BAGD3TypeVal,
                                                                    "std": BAGD3STDVal,
                                                                    "name": BAGD3NameVal,
                                                                    "temp": BAGDDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BAGDD3 = parseFloat(result.density);
                                                                    BAGD3ThkMin = parseFloat(result.thkMin);
                                                                    BAGD3ThkMax = parseFloat(result.thkMax);

                                                                    // 第三层壁板腐蚀裕量 C32
                                                                    let BAGDC32;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) < BAGD3ThkMax) {
                                                                        BAGDC32 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BAGD3ThkMax) {
                                                                        south.html("第三段壁板腐蚀裕量不能大于等于 " + BAGD3ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 第三段壁板名义厚度
                                                                    let BAGDTHK3N;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > Math.max(BAGDC32, BAGD3ThkMin)
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= BAGD3ThkMax) {
                                                                        BAGDTHK3N = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= Math.max(BAGDC32, BAGD3ThkMin)) {
                                                                        south.html("第三段壁板名义厚度不能小于等于 " + Math.max(BAGDC32, BAGD3ThkMin) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > BAGD3ThkMax) {
                                                                        south.html("第三段壁板名义厚度不能大于 " + BAGD3ThkMax + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // ajax 获取 O3T E3T C31
                                                                    let BAGDO3T, BAGDE3T, BAGDC31;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BAGD3CategoryVal,
                                                                            "type": BAGD3TypeVal,
                                                                            "std": BAGD3STDVal,
                                                                            "name": BAGD3NameVal,
                                                                            "thk": BAGDTHK3N,
                                                                            "temp": BAGDDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": 100000
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BAGDO3T = parseFloat(result.ot);
                                                                            if (BAGDO3T < 0) {
                                                                                south.html("查询第三段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGDE3T = 1000 * parseFloat(result.et);
                                                                            if (BAGDE3T < 0) {
                                                                                south.html("查询第三段壁板材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BAGDC31 = parseFloat(result.c1);
                                                                            if (BAGDC31 < 0) {
                                                                                south.html("查询第三段壁板材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 过程参数
                                                                            let BAGDG = 9.81;
                                                                            let BAGDPC = BAGDD * BAGDG * BAGDBH / 1000000000;
                                                                            let BAGDBHLC = BAGDBH / BAGDLC;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "ba": BAGDBHLC
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    let BAGDALPHA = parseFloat(result.alpha);
                                                                                    let BAGDBETA = parseFloat(result.beta);

                                                                                    let BAGDBH1 = 0.45 * BAGDBH;
                                                                                    let BAGDC1 = BAGDC11 + BAGDC12;
                                                                                    let BAGDTHK1E = BAGDTHK1N - BAGDC1;
                                                                                    let BAGDBH1LC = BAGDBH1 / BAGDLC;
                                                                                    let BAGDSH1 = BAGDBH1;
                                                                                    let BAGDPC1 = BAGDD * BAGDG * BAGDSH1 / 1000000000;

                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "ba": BAGDBH1LC
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            let BAGDALPHA1 = parseFloat(result.alpha);
                                                                                            let BAGDBETA1 = parseFloat(result.beta);

                                                                                            let BAGDBH2 = 0.30 * BAGDBH;
                                                                                            let BAGDC2 = BAGDC21 + BAGDC22;
                                                                                            let BAGDTHK2E = BAGDTHK2N - BAGDC2;
                                                                                            let BAGDBH2LC = BAGDBH2 / BAGDLC;
                                                                                            let BAGDSH2 = BAGDBH1 + BAGDBH2;
                                                                                            let BAGDPC2 = BAGDD * BAGDG * BAGDSH2 / 1000000000;

                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "ba": BAGDBH2LC
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    let BAGDALPHA2 = parseFloat(result.alpha);
                                                                                                    let BAGDBETA2 = parseFloat(result.beta);

                                                                                                    let BAGDBH3 = 0.25 * BAGDBH;
                                                                                                    let BAGDC3 = BAGDC31 + BAGDC32;
                                                                                                    let BAGDTHK3E = BAGDTHK3N - BAGDC3;
                                                                                                    let BAGDBH3LC = BAGDBH3 / BAGDLC;
                                                                                                    let BAGDSH3 = BAGDBH1 + BAGDBH2 + BAGDBH3;
                                                                                                    let BAGDPC3 = BAGDD * BAGDG * BAGDSH3 / 1000000000;

                                                                                                    $.ajax({
                                                                                                        type: "POST",
                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                                        async: true,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify({
                                                                                                            "ba": BAGDBH3LC
                                                                                                        }),
                                                                                                        beforeSend: function () {
                                                                                                        },
                                                                                                        success: function (result) {

                                                                                                            let BAGDALPHA3 = parseFloat(result.alpha);
                                                                                                            let BAGDBETA3 = parseFloat(result.beta);

                                                                                                            // 顶边加固件
                                                                                                            let BAGDI0 = 0.217 * BAGDPC1 * BAGDSH1 * BAGDL * BAGDL * BAGDL / BAGDEJT;
                                                                                                            south.html(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "顶边加固件所需最小惯性矩：" + BAGDI0.toFixed(2) + " mm⁴" +
                                                                                                                "</span>");

                                                                                                            // 第一段加固柱校核
                                                                                                            let BAGDLMAX1 = 0.408 * BAGDTHK1E * Math.sqrt(BAGDO1T / (BAGDALPHA * BAGDPC));
                                                                                                            let BAGDZP1 = BAGDLC * (0.0642 * BAGDPC * BAGDBH * BAGDBH / BAGDO1T - BAGDTHK1E * BAGDTHK1E / 6);

                                                                                                            // 第一段壁板
                                                                                                            let BAGDTHK1C = BAGDLC * Math.sqrt(3 * BAGDALPHA1 * BAGDPC1 / BAGDO1T);
                                                                                                            let BAGDTHK1D = BAGDTHK1C + BAGDC12;
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "第一段壁板所需厚度：" + (BAGDTHK1D + BAGDC11).toFixed(2) + " mm" +
                                                                                                                "</span>");
                                                                                                            let BAGDTHK1CHK;
                                                                                                            if (BAGDTHK1N >= (BAGDTHK1D + BAGDC11)) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BAGDTHK1N + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDTHK1CHK = "合格";
                                                                                                            }
                                                                                                            else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BAGDTHK1N + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDTHK1CHK = "不合格";
                                                                                                            }

                                                                                                            let BAGDF1ALLOW = 5 * (BAGDTHK1E / 2 + Math.sqrt(BAGDBH1LC) * BAGDLC / 500);
                                                                                                            let BAGDF1MAX = BAGDBETA1 * Math.pow(BAGDLC, 4) * BAGDPC1 / (2 * BAGDE1T * Math.pow(BAGDTHK1E, 3));
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "第一段壁板许用挠度：" + BAGDF1ALLOW.toFixed(2) + " mm" +
                                                                                                                "</span>");
                                                                                                            let BAGDF1CHK;
                                                                                                            if (BAGDF1MAX <= BAGDF1ALLOW) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "实际挠度：" + BAGDF1MAX.toFixed(2) + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDF1CHK = "合格";
                                                                                                            }
                                                                                                            else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "实际挠度：" + BAGDF1MAX.toFixed(2) + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDF1CHK = "不合格";
                                                                                                            }

                                                                                                            // 第一道水平加固件
                                                                                                            let BAGDF1 = BAGDPC2 * (BAGDSH1 + BAGDSH2) / 6;
                                                                                                            let BAGDI1 = 1.3 * BAGDF1 * BAGDLC * BAGDLC * BAGDLC / BAGDEJT;
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "第一道水平加固件所需最小惯性矩：" + BAGDI1.toFixed(2) + " mm⁴" +
                                                                                                                "</span>");

                                                                                                            // 第二段加固柱校核
                                                                                                            let BAGDLMAX2 = 0.408 * BAGDTHK2E * Math.sqrt(BAGDO2T / (BAGDALPHA * BAGDPC));
                                                                                                            let BAGDZP2 = BAGDLC * (0.0642 * BAGDPC * BAGDBH * BAGDBH / BAGDO2T - BAGDTHK2E * BAGDTHK2E / 6);

                                                                                                            // 第二段壁板
                                                                                                            let BAGDTHK2C = BAGDLC * Math.sqrt(6 * BAGDALPHA2 * (BAGDPC1 + BAGDPC2) / BAGDO2T);
                                                                                                            let BAGDTHK2D = BAGDTHK2C + BAGDC22;
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "第二段壁板所需厚度：" + (BAGDTHK2D + BAGDC21).toFixed(2) + " mm" +
                                                                                                                "</span>");
                                                                                                            let BAGDTHK2CHK;
                                                                                                            if (BAGDTHK2N >= (BAGDTHK2D + BAGDC21)) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BAGDTHK2N + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDTHK2CHK = "合格";
                                                                                                            }
                                                                                                            else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BAGDTHK2N + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDTHK2CHK = "不合格";
                                                                                                            }
                                                                                                            let BAGDF2ALLOW = 5 * (BAGDTHK2E / 2 + Math.sqrt(BAGDBH2LC) * BAGDLC / 500);
                                                                                                            let BAGDF2MAX = BAGDBETA2 * Math.pow(BAGDLC, 4) * (BAGDPC1 + BAGDPC2) / (2 * BAGDE2T * Math.pow(BAGDTHK2E, 3));
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "第二段壁板许用挠度：" + BAGDF2ALLOW.toFixed(2) + " mm" +
                                                                                                                "</span>");
                                                                                                            let BAGDF2CHK;
                                                                                                            if (BAGDF2MAX <= BAGDF2ALLOW) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "实际挠度：" + BAGDF2MAX.toFixed(2) + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDF2CHK = "合格";
                                                                                                            }
                                                                                                            else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "实际挠度：" + BAGDF2MAX.toFixed(2) + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDF2CHK = "不合格";
                                                                                                            }

                                                                                                            // 第二道水平加固件
                                                                                                            let BAGDF2 = (BAGDPC3 - BAGDPC1) * (BAGDSH1 + BAGDSH2 + BAGDSH3) / 6;
                                                                                                            let BAGDI2 = 1.3 * BAGDF2 * BAGDLC * BAGDLC * BAGDLC / BAGDEJT;
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "第二道水平加固件所需最小惯性矩：" + BAGDI2.toFixed(2) + " mm⁴" +
                                                                                                                "</span>");

                                                                                                            // 第三段加固柱校核
                                                                                                            let BAGDLMAX3 = 0.408 * BAGDTHK3E * Math.sqrt(BAGDO3T / (BAGDALPHA * BAGDPC));
                                                                                                            let BAGDZP3 = BAGDLC * (0.0642 * BAGDPC * BAGDBH * BAGDBH / BAGDO3T - BAGDTHK3E * BAGDTHK3E / 6);

                                                                                                            // 第三段壁板
                                                                                                            let BAGDTHK3C = BAGDLC * Math.sqrt(6 * BAGDALPHA3 * (BAGDPC2 + BAGDPC3) / BAGDO3T);
                                                                                                            let BAGDTHK3D = BAGDTHK3C + BAGDC32;
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "第三段壁板所需厚度：" + (BAGDTHK3D + BAGDC31).toFixed(2) + " mm" +
                                                                                                                "</span>");
                                                                                                            let BAGDTHK3CHK;
                                                                                                            if (BAGDTHK3N >= (BAGDTHK3D + BAGDC31)) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BAGDTHK3N + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDTHK3CHK = "合格";
                                                                                                            }
                                                                                                            else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BAGDTHK3N + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDTHK3CHK = "不合格";
                                                                                                            }
                                                                                                            let BAGDF3ALLOW = 5 * (BAGDTHK3E / 2 + Math.sqrt(BAGDBH3LC) * BAGDLC / 500);
                                                                                                            let BAGDF3MAX = BAGDBETA3 * Math.pow(BAGDLC, 4) * (BAGDPC2 + BAGDPC3) / (2 * BAGDE3T * Math.pow(BAGDTHK3E, 3));
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "第三段壁板许用挠度：" + BAGDF3ALLOW.toFixed(2) + " mm" +
                                                                                                                "</span>");
                                                                                                            let BAGDF3CHK;
                                                                                                            if (BAGDF3MAX <= BAGDF3ALLOW) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "实际挠度：" + BAGDF3MAX.toFixed(2) + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDF3CHK = "合格";
                                                                                                            }
                                                                                                            else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "实际挠度：" + BAGDF3MAX.toFixed(2) + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDF3CHK = "不合格";
                                                                                                            }

                                                                                                            // 加固柱结果汇总
                                                                                                            let BAGDLMAX = Math.min(BAGDLMAX1, BAGDLMAX2, BAGDLMAX3);
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "垂直加固柱允许最大间距：" + BAGDLMAX.toFixed(2) + " mm" +
                                                                                                                "</span>");
                                                                                                            let BAGDLCCHK;
                                                                                                            if (BAGDLC <= BAGDLMAX) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "实际输入间距：" + BAGDLC + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDLCCHK = "合格";
                                                                                                            }
                                                                                                            else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "实际输入间距：" + BAGDLC + " mm" +
                                                                                                                    "</span>");
                                                                                                                BAGDLCCHK = "不合格";
                                                                                                            }
                                                                                                            let BAGDZP = Math.max(BAGDZP1, BAGDZP2, BAGDZP3);
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "垂直加固柱所需最小截面系数：" + BAGDZP.toFixed(4) + " mm³" +
                                                                                                                "</span>");

                                                                                                            // docx
                                                                                                            let BAGDPayJS = $('#payjs');

                                                                                                            function getDocx() {
                                                                                                                $.ajax({
                                                                                                                    type: "POST",
                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                    url: "bagddocx.action",
                                                                                                                    async: true,
                                                                                                                    dataType: "json",
                                                                                                                    data: JSON.stringify({
                                                                                                                        ribbonName: "BAGD",

                                                                                                                        t: BAGDDT,
                                                                                                                        d: BAGDD,
                                                                                                                        lc: BAGDLC,
                                                                                                                        bh: BAGDBH,
                                                                                                                        l: BAGDL,

                                                                                                                        jstd: BAGDJSTDVal,
                                                                                                                        jname: BAGDJNameVal,

                                                                                                                        std1: BAGD1STDVal,
                                                                                                                        name1: BAGD1NameVal,
                                                                                                                        c12: BAGDC12,
                                                                                                                        thk1n: BAGDTHK1N,

                                                                                                                        std2: BAGD2STDVal,
                                                                                                                        name2: BAGD2NameVal,
                                                                                                                        c22: BAGDC22,
                                                                                                                        thk2n: BAGDTHK2N,

                                                                                                                        std3: BAGD3STDVal,
                                                                                                                        name3: BAGD3NameVal,
                                                                                                                        c32: BAGDC32,
                                                                                                                        thk3n: BAGDTHK3N,

                                                                                                                        d1: BAGDD1.toFixed(4),
                                                                                                                        c11: BAGDC11.toFixed(4),
                                                                                                                        o1t: BAGDO1T.toFixed(4),
                                                                                                                        e1t: (BAGDE1T / 1000).toFixed(4),

                                                                                                                        d2: BAGDD2.toFixed(4),
                                                                                                                        c21: BAGDC21.toFixed(4),
                                                                                                                        o2t: BAGDO2T.toFixed(4),
                                                                                                                        e2t: (BAGDE2T / 1000).toFixed(4),

                                                                                                                        d3: BAGDD3.toFixed(4),
                                                                                                                        c31: BAGDC31.toFixed(4),
                                                                                                                        o3t: BAGDO3T.toFixed(4),
                                                                                                                        e3t: (BAGDE3T / 1000).toFixed(4),

                                                                                                                        ejt: (BAGDEJT / 1000).toFixed(4),

                                                                                                                        g: BAGDG.toFixed(4),
                                                                                                                        pc: BAGDPC.toFixed(4),
                                                                                                                        bhlc: BAGDBHLC.toFixed(4),
                                                                                                                        alpha: BAGDALPHA.toFixed(8),
                                                                                                                        beta: BAGDBETA.toFixed(8),

                                                                                                                        bh1: BAGDBH1.toFixed(4),
                                                                                                                        c1: BAGDC1.toFixed(4),
                                                                                                                        thk1e: BAGDTHK1E.toFixed(4),
                                                                                                                        bh1lc: BAGDBH1LC.toFixed(4),
                                                                                                                        alpha1: BAGDALPHA1.toFixed(8),
                                                                                                                        beta1: BAGDBETA1.toFixed(8),
                                                                                                                        sh1: BAGDSH1.toFixed(4),
                                                                                                                        pc1: BAGDPC1.toFixed(4),

                                                                                                                        bh2: BAGDBH2.toFixed(4),
                                                                                                                        c2: BAGDC2.toFixed(4),
                                                                                                                        thk2e: BAGDTHK2E.toFixed(4),
                                                                                                                        bh2lc: BAGDBH2LC.toFixed(4),
                                                                                                                        alpha2: BAGDALPHA2.toFixed(8),
                                                                                                                        beta2: BAGDBETA2.toFixed(8),
                                                                                                                        sh2: BAGDSH2.toFixed(4),
                                                                                                                        pc2: BAGDPC2.toFixed(4),

                                                                                                                        bh3: BAGDBH3.toFixed(4),
                                                                                                                        c3: BAGDC3.toFixed(4),
                                                                                                                        thk3e: BAGDTHK3E.toFixed(4),
                                                                                                                        bh3lc: BAGDBH3LC.toFixed(4),
                                                                                                                        alpha3: BAGDALPHA3.toFixed(8),
                                                                                                                        beta3: BAGDBETA3.toFixed(8),
                                                                                                                        sh3: BAGDSH3.toFixed(4),
                                                                                                                        pc3: BAGDPC3.toFixed(4),

                                                                                                                        i0: BAGDI0.toFixed(4),

                                                                                                                        lmax1: BAGDLMAX1.toFixed(4),
                                                                                                                        zp1: BAGDZP1.toFixed(4),

                                                                                                                        thk1c: BAGDTHK1C.toFixed(4),
                                                                                                                        thk1d: BAGDTHK1D.toFixed(4),
                                                                                                                        thk1chk: BAGDTHK1CHK,
                                                                                                                        f1allow: BAGDF1ALLOW.toFixed(4),
                                                                                                                        f1max: BAGDF1MAX.toFixed(4),
                                                                                                                        f1chk: BAGDF1CHK,

                                                                                                                        f1: BAGDF1.toFixed(4),
                                                                                                                        i1: BAGDI1.toFixed(4),

                                                                                                                        lmax2: BAGDLMAX2.toFixed(4),
                                                                                                                        zp2: BAGDZP2.toFixed(4),

                                                                                                                        thk2c: BAGDTHK2C.toFixed(4),
                                                                                                                        thk2d: BAGDTHK2D.toFixed(4),
                                                                                                                        thk2chk: BAGDTHK2CHK,
                                                                                                                        f2allow: BAGDF2ALLOW.toFixed(4),
                                                                                                                        f2max: BAGDF2MAX.toFixed(4),
                                                                                                                        f2chk: BAGDF2CHK,

                                                                                                                        f2: BAGDF2.toFixed(4),
                                                                                                                        i2: BAGDI2.toFixed(4),

                                                                                                                        lmax3: BAGDLMAX3.toFixed(4),
                                                                                                                        zp3: BAGDZP3.toFixed(4),

                                                                                                                        thk3c: BAGDTHK3C.toFixed(4),
                                                                                                                        thk3d: BAGDTHK3D.toFixed(4),
                                                                                                                        thk3chk: BAGDTHK3CHK,
                                                                                                                        f3allow: BAGDF3ALLOW.toFixed(4),
                                                                                                                        f3max: BAGDF3MAX.toFixed(4),
                                                                                                                        f3chk: BAGDF3CHK,

                                                                                                                        lmax: BAGDLMAX.toFixed(4),
                                                                                                                        lcchk: BAGDLCCHK,
                                                                                                                        zp: BAGDZP.toFixed(4)
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
                                                                                                                            BAGDPayJS.dialog({
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
                                                                                                                                        BAGDPayJS.dialog("close");
                                                                                                                                        BAGDPayJS.dialog("clear");
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
                                                                                                                                                    BAGDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                            BAGDPayJS.dialog('close');
                                                                                                                                                            BAGDPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});