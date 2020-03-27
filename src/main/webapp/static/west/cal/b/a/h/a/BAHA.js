$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bahaSketch = $("#d2");
    let bahaModel = $("#d3");
    let bahad2d3 = $('#d2d3');

    $("#cal").html("<table id='baha'></table>");
    let pg = $("#baha");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/h/a/BAHA.json", function (result) {

        let BAHADT;
        let BAHAGCategory, BAHAGCategoryVal, BAHAGType, BAHAGTypeVal, BAHAGSTD, BAHAGSTDVal, BAHAGName, BAHAGNameVal,
            BAHA1Category, BAHA1CategoryVal, BAHA1Type, BAHA1TypeVal, BAHA1STD, BAHA1STDVal, BAHA1Name, BAHA1NameVal,
            BAHAJCategory, BAHAJCategoryVal, BAHAJType, BAHAJTypeVal, BAHAJSTD, BAHAJSTDVal, BAHAJName, BAHAJNameVal;
        let columns, rows, ed;

        function baha2d(l = "L", h1 = "h1", a = "a", h = "h") {

            bahaSketch.empty();

            let width = bahaSketch.width();
            let height = bahaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAHASVG").attr("height", height);

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

            // h1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: height - padding - 2.5 * hg},
                    {x: padding + 2.5 * wg - 3, y: height - padding - 2.5 * hg - 15},
                    {x: padding + 2.5 * wg + 3, y: height - padding - 2.5 * hg - 15},
                    {x: padding + 2.5 * wg, y: height - padding - 2.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding},
                    {x: padding + 2.5 * wg + 3, y: padding + 15},
                    {x: padding + 2.5 * wg - 3, y: padding + 15},
                    {x: padding + 2.5 * wg, y: padding}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: height - padding - 2.5 * hg - 15},
                {x: padding + 2.5 * wg, y: padding + 15}
            ])).attr("id", "BAHASketchH1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAHASketchH1")
                .attr("startOffset", "50%").text(h1);

            // 拉杆1
            drawLine(padding + wg, padding + hg - thk, padding + 3 * wg, padding + hg - thk);
            drawLine(padding + wg, padding + hg + thk, padding + 3 * wg, padding + hg + thk);
            drawCenterLine(padding + wg - thk - 10, padding + hg, padding + 3 * wg + thk + 10, padding + hg);

            // 拉杆2
            drawLine(padding + wg, padding + 2 * hg - thk, padding + 1.5 * wg - 50, padding + 2 * hg - thk);
            drawLine(padding + 1.5 * wg - 25, padding + 2 * hg - thk, padding + 3 * wg, padding + 2 * hg - thk);
            drawLine(padding + wg, padding + 2 * hg + thk, padding + 1.5 * wg - 50, padding + 2 * hg + thk);
            drawLine(padding + 1.5 * wg - 25, padding + 2 * hg + thk, padding + 3 * wg, padding + 2 * hg + thk);
            drawCenterLine(padding + wg - thk - 10, padding + 2 * hg, padding + 1.5 * wg - 50, padding + 2 * hg);
            drawCenterLine(padding + 1.5 * wg - 25, padding + 2 * hg, padding + 3 * wg + thk + 10, padding + 2 * hg);

            // 拉杆3
            drawLine(padding + wg, padding + 3 * hg - thk, padding + 3 * wg, padding + 3 * hg - thk);
            drawLine(padding + wg, padding + 3 * hg + thk, padding + 3 * wg, padding + 3 * hg + thk);
            drawCenterLine(padding + wg - thk - 10, padding + 3 * hg, padding + 3 * wg + thk + 10, padding + 3 * hg);

            // 垂直方向拉杆
            let cx1 = padding + 1.5 * wg;
            let cy1 = padding + 1.5 * hg;
            drawArc(thk, thk, cx1, cy1 + thk, cx1, cy1 - thk);
            drawArc(thk, thk, cx1, cy1 - thk, cx1, cy1 + thk);

            // 垂直方向拉杆
            let cx2 = padding + 2 * wg;
            let cy2 = padding + 1.5 * hg;
            drawArc(thk, thk, cx2, cy2 + thk, cx2, cy2 - thk);
            drawArc(thk, thk, cx2, cy2 - thk, cx2, cy2 + thk);

            // 垂直方向拉杆
            let cx3 = padding + 2.5 * wg;
            let cy3 = padding + 1.5 * hg;
            drawArc(thk, thk, cx3, cy3 + thk, cx3, cy3 - thk);
            drawArc(thk, thk, cx3, cy3 - thk, cx3, cy3 + thk);

            // 垂直方向拉杆
            let cx4 = padding + 1.5 * wg;
            let cy4 = padding + 2.5 * hg;
            drawArc(thk, thk, cx4, cy4 + thk, cx4, cy4 - thk);
            drawArc(thk, thk, cx4, cy4 - thk, cx4, cy4 + thk);

            // 垂直方向拉杆
            let cx5 = padding + 2 * wg;
            let cy5 = padding + 2.5 * hg;
            drawArc(thk, thk, cx5, cy5 + thk, cx5, cy5 - thk);
            drawArc(thk, thk, cx5, cy5 - thk, cx5, cy5 + thk);

            // 垂直方向拉杆
            let cx6 = padding + 2.5 * wg;
            let cy6 = padding + 2.5 * hg;
            drawArc(thk, thk, cx6, cy6 + thk, cx6, cy6 - thk);
            drawArc(thk, thk, cx6, cy6 - thk, cx6, cy6 + thk);

            // 垂直方向拉杆
            let cx7 = padding + 1.5 * wg;
            let cy7 = padding + 3.5 * hg;
            drawArc(thk, thk, cx7, cy7 + thk, cx7, cy7 - thk);
            drawArc(thk, thk, cx7, cy7 - thk, cx7, cy7 + thk);

            // 垂直方向拉杆
            let cx8 = padding + 2 * wg;
            let cy8 = padding + 3.5 * hg;
            drawArc(thk, thk, cx8, cy8 + thk, cx8, cy8 - thk);
            drawArc(thk, thk, cx8, cy8 - thk, cx8, cy8 + thk);

            // 垂直方向拉杆
            let cx9 = padding + 2.5 * wg;
            let cy9 = padding + 3.5 * hg;
            drawArc(thk, thk, cx9, cy9 + thk, cx9, cy9 - thk);
            drawArc(thk, thk, cx9, cy9 - thk, cx9, cy9 + thk);

            // L
            dimBottomH(padding + wg, height - padding, padding + 3 * wg, height - padding, l, "BAHASketchL");

            // a
            dimBottomH(padding + 1.5 * wg, padding + 1.5 * hg, padding + 2 * wg, padding + 1.5 * hg, a, "a");

            // h
            dimLeftV(padding + 1.5 * wg, padding + 2.5 * hg, padding + 1.5 * wg, padding + 1.5 * hg, h, "h");
        }

        currentTabIndex = bahad2d3.tabs('getTabIndex', bahad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baha2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baha").length > 0) {
                    baha2d();
                }
            });
        }
        bahad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baha2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baha").length > 0) {
                            baha2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 顶边加固件及第一层拉杆设计计算",
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

                if (index === 3) {
                    $(ed.target).combobox("loadData", BAHAGCategory);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BAHAGType);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAHAGSTD);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAHAGName);
                }

                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAHA1Category);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAHA1Type);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BAHA1STD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAHA1Name);
                }

                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAHAJCategory);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", BAHAJType);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BAHAJSTD);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BAHAJName);
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
                    bahaSketch.empty();

                    // model
                    bahaModel.empty();

                    // sketch
                    currentTabIndex = bahad2d3.tabs('getTabIndex', bahad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baha2d();
                        bahaSketch.off("resize").on("resize", function () {
                            if ($("#baha").length > 0) {
                                baha2d();
                            }
                        });
                    }
                    bahad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baha2d();
                                bahaSketch.off("resize").on("resize", function () {
                                    if ($("#baha").length > 0) {
                                        baha2d();
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

                        BAHADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAHAGCategory = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAHAGType = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAHAGSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAHAGName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAHA1Category = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAHA1Type = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAHA1STD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAHA1Name = null;

                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAHAJCategory = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAHAJType = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BAHAJSTD = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAHAJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHA1Category = [];
                                BAHAJCategory = [];
                                BAHAGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAHADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAHA1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAHAJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAHAGCategory[index] = {
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
                    if (index === 3) {

                        BAHAGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAHAGType = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAHAGSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAHAGName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHAGCategoryVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHAGType = [];
                                $(result).each(function (index, element) {
                                    BAHAGType[index] = {
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
                    if (index === 4) {

                        BAHAGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAHAGSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAHAGName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHAGCategoryVal,
                                type: BAHAGTypeVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHAGSTD = [];
                                $(result).each(function (index, element) {
                                    BAHAGSTD[index] = {
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
                    if (index === 5) {

                        BAHAGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAHAGName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHAGCategoryVal,
                                type: BAHAGTypeVal,
                                std: BAHAGSTDVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHAGName = [];
                                $(result).each(function (index, element) {
                                    BAHAGName[index] = {
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
                    if (index === 12) {

                        BAHA1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAHA1Type = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAHA1STD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAHA1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHA1CategoryVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHA1Type = [];
                                $(result).each(function (index, element) {
                                    BAHA1Type[index] = {
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
                    if (index === 13) {

                        BAHA1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAHA1STD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAHA1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHA1CategoryVal,
                                type: BAHA1TypeVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHA1STD = [];
                                $(result).each(function (index, element) {
                                    BAHA1STD[index] = {
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
                    if (index === 14) {

                        BAHA1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAHA1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHA1CategoryVal,
                                type: BAHA1TypeVal,
                                std: BAHA1STDVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHA1Name = [];
                                $(result).each(function (index, element) {
                                    BAHA1Name[index] = {
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
                    if (index === 18) {

                        BAHAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAHAJType = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BAHAJSTD = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAHAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHAJCategoryVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHAJType = [];
                                $(result).each(function (index, element) {
                                    BAHAJType[index] = {
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
                    if (index === 19) {

                        BAHAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BAHAJSTD = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAHAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHAJCategoryVal,
                                type: BAHAJTypeVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHAJSTD = [];
                                $(result).each(function (index, element) {
                                    BAHAJSTD[index] = {
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
                    if (index === 20) {

                        BAHAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BAHAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHAJCategoryVal,
                                type: BAHAJTypeVal,
                                std: BAHAJSTDVal,
                                temp: BAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHAJName = [];
                                $(result).each(function (index, element) {
                                    BAHAJName[index] = {
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
                    let BAHAD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAHAD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // L
                    let BAHAL;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAHAL = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baha2d(BAHAL);
                        bahaSketch.off("resize").on("resize", function () {
                            if ($("#baha").length > 0) {
                                baha2d(BAHAL);
                            }
                        });
                    }
                    bahad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baha2d(BAHAL);
                                bahaSketch.off("resize").on("resize", function () {
                                    if ($("#baha").length > 0) {
                                        baha2d(BAHAL);
                                    }
                                });
                            }
                        }
                    });

                    // 拉杆材料名称
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        BAHAGNameVal = rows[6][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAHADG, BAHAGThkMin, BAHAGThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAHAGCategoryVal,
                            "type": BAHAGTypeVal,
                            "std": BAHAGSTDVal,
                            "name": BAHAGNameVal,
                            "temp": BAHADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAHADG = parseFloat(result.density);
                            BAHAGThkMin = parseFloat(result.thkMin);
                            BAHAGThkMax = parseFloat(result.thkMax);

                            // 拉杆腐蚀裕量 CG2
                            let BAHACG2;
                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) < BAHAGThkMax / 2) {
                                BAHACG2 = parseFloat(rows[7][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) >= BAHAGThkMax / 2) {
                                south.html("拉杆腐蚀裕量不能大于等于 " + BAHAGThkMax / 2 + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 拉杆名义直径
                            let BAHADGN;
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) > Math.max(BAHACG2, BAHAGThkMin)
                                && parseFloat(rows[8][columns[0][1].field]) <= BAHAGThkMax) {
                                BAHADGN = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) <= Math.max(BAHACG2, BAHAGThkMin)) {
                                south.html("拉杆直径不能小于等于 " + Math.max(BAHACG2, BAHAGThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) > BAHAGThkMax) {
                                south.html("拉杆直径不能大于 " + BAHAGThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 OGT CG1
                            let BAHAOGT, BAHACG1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAHAGCategoryVal,
                                    "type": BAHAGTypeVal,
                                    "std": BAHAGSTDVal,
                                    "name": BAHAGNameVal,
                                    "thk": BAHADGN,
                                    "temp": BAHADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAHAOGT = parseFloat(result.ot);
                                    if (BAHAOGT < 0) {
                                        south.html("查询拉杆材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAHACG1 = parseFloat(result.c1);
                                    if (BAHACG1 < 0) {
                                        south.html("查询拉杆材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // h1
                                    let BAHAH1;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                        BAHAH1 = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baha2d(BAHAL, BAHAH1);
                                        bahaSketch.off("resize").on("resize", function () {
                                            if ($("#baha").length > 0) {
                                                baha2d(BAHAL, BAHAH1);
                                            }
                                        });
                                    }
                                    bahad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baha2d(BAHAL, BAHAH1);
                                                bahaSketch.off("resize").on("resize", function () {
                                                    if ($("#baha").length > 0) {
                                                        baha2d(BAHAL, BAHAH1);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // A
                                    let BAHAA;
                                    if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                        BAHAA = parseFloat(rows[10][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baha2d(BAHAL, BAHAH1, BAHAA);
                                        bahaSketch.off("resize").on("resize", function () {
                                            if ($("#baha").length > 0) {
                                                baha2d(BAHAL, BAHAH1, BAHAA);
                                            }
                                        });
                                    }
                                    bahad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baha2d(BAHAL, BAHAH1, BAHAA);
                                                bahaSketch.off("resize").on("resize", function () {
                                                    if ($("#baha").length > 0) {
                                                        baha2d(BAHAL, BAHAH1, BAHAA);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // H
                                    let BAHAH;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                        BAHAH = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baha2d(BAHAL, BAHAH1, BAHAA, BAHAH);
                                        bahaSketch.off("resize").on("resize", function () {
                                            if ($("#baha").length > 0) {
                                                baha2d(BAHAL, BAHAH1, BAHAA, BAHAH);
                                            }
                                        });
                                    }
                                    bahad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baha2d(BAHAL, BAHAH1, BAHAA, BAHAH);
                                                bahaSketch.off("resize").on("resize", function () {
                                                    if ($("#baha").length > 0) {
                                                        baha2d(BAHAL, BAHAH1, BAHAA, BAHAH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 第一段壁板材料名称
                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                        BAHA1NameVal = rows[15][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAHAD1, BAHA1ThkMin, BAHA1ThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAHA1CategoryVal,
                                            "type": BAHA1TypeVal,
                                            "std": BAHA1STDVal,
                                            "name": BAHA1NameVal,
                                            "temp": BAHADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAHAD1 = parseFloat(result.density);
                                            BAHA1ThkMin = parseFloat(result.thkMin);
                                            BAHA1ThkMax = parseFloat(result.thkMax);

                                            // 第一层壁板腐蚀裕量 C12
                                            let BAHAC12;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                && parseFloat(rows[16][columns[0][1].field]) < BAHA1ThkMax) {
                                                BAHAC12 = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                && parseFloat(rows[16][columns[0][1].field]) >= BAHA1ThkMax) {
                                                south.html("第一段壁板腐蚀裕量不能大于等于 " + BAHA1ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 第一段壁板名义厚度
                                            let BAHATHK1N;
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > Math.max(BAHAC12, BAHA1ThkMin)
                                                && parseFloat(rows[17][columns[0][1].field]) <= BAHA1ThkMax) {
                                                BAHATHK1N = parseFloat(rows[17][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) <= Math.max(BAHAC12, BAHA1ThkMin)) {
                                                south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAHAC12, BAHA1ThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > BAHA1ThkMax) {
                                                south.html("第一段壁板名义厚度不能大于 " + BAHA1ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 O1T C11
                                            let BAHAO1T, BAHAC11;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAHA1CategoryVal,
                                                    "type": BAHA1TypeVal,
                                                    "std": BAHA1STDVal,
                                                    "name": BAHA1NameVal,
                                                    "thk": BAHATHK1N,
                                                    "temp": BAHADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAHAO1T = parseFloat(result.ot);
                                                    if (BAHAO1T < 0) {
                                                        south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAHAC11 = parseFloat(result.c1);
                                                    if (BAHAC11 < 0) {
                                                        south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 加固件材料名称
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        BAHAJNameVal = rows[21][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 EJT
                                                    let BAHAEJT;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAHAJCategoryVal,
                                                            "type": BAHAJTypeVal,
                                                            "std": BAHAJSTDVal,
                                                            "name": BAHAJNameVal,
                                                            "temp": BAHADT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAHAEJT = 1000 * parseFloat(result.et);
                                                            if (BAHAEJT < 0) {
                                                                south.html("查询顶边加固件材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 过程参数
                                                            let BAHAG = 9.81;
                                                            let BAHAP1 = BAHAD * BAHAG * BAHAH1 / 1000000000;
                                                            let BAHAC1 = BAHAC11 + BAHAC12;
                                                            let BAHATHK1E = BAHATHK1N - BAHAC1;
                                                            let BAHACG = BAHACG1 + 2 * BAHACG2;
                                                            let BAHADGE = BAHADGN - BAHACG;

                                                            // 顶边加固件
                                                            let BAHAI0 = 0.217 * BAHAP1 * BAHAH1 * BAHAL * BAHAL * BAHAL / BAHAEJT;
                                                            south.html(
                                                                "<span style='color:#444444;'>" +
                                                                "顶边加固件所需最小惯性矩：" + BAHAI0.toFixed(2) + " mm⁴" +
                                                                "</span>");

                                                            // 第一段壁板
                                                            let BAHATHK1C = BAHAH * Math.sqrt(BAHAP1 / (2 * BAHAO1T));
                                                            let BAHATHK1D = BAHATHK1C + BAHAC12;
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "第一段壁板所需厚度：" + (BAHATHK1D + BAHAC11).toFixed(2) + " mm" +
                                                                "</span>");
                                                            let BAHATHK1CHK;
                                                            if (BAHATHK1N >= (BAHATHK1D + BAHAC11)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + BAHATHK1N + " mm" +
                                                                    "</span>");
                                                                BAHATHK1CHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + BAHATHK1N + " mm" +
                                                                    "</span>");
                                                                BAHATHK1CHK = "不合格";
                                                            }

                                                            // 拉杆
                                                            let BAHADGC = 1.13 * Math.sqrt(BAHAA * BAHAH * BAHAP1 / (2 * BAHAOGT));
                                                            let BAHADGD = BAHADGC + 2 * BAHACG2;
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "拉杆所需直径：" + (BAHADGD + BAHACG1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            let BAHADGCHK;
                                                            if (BAHADGN >= (BAHADGD + BAHACG1)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入直径：" + BAHADGN + " mm" +
                                                                    "</span>");
                                                                BAHADGCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入直径：" + BAHADGN + " mm" +
                                                                    "</span>");
                                                                BAHADGCHK = "不合格";
                                                            }

                                                            // docx
                                                            let BAHAPayJS = $('#payjs');

                                                            function getDocx() {
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "bahadocx.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        ribbonName: "BAHA",

                                                                        t: BAHADT,
                                                                        d: BAHAD,
                                                                        l: BAHAL,

                                                                        gstd: BAHAGSTDVal,
                                                                        gname: BAHAGNameVal,
                                                                        cg2: BAHACG2,
                                                                        dgn: BAHADGN,
                                                                        h1: BAHAH1,
                                                                        a: BAHAA,
                                                                        h: BAHAH,

                                                                        std1: BAHA1STDVal,
                                                                        name1: BAHA1NameVal,
                                                                        c12: BAHAC12,
                                                                        thk1n: BAHATHK1N,

                                                                        jstd: BAHAJSTDVal,
                                                                        jname: BAHAJNameVal,

                                                                        dg: BAHADG.toFixed(4),
                                                                        cg1: BAHACG1.toFixed(4),
                                                                        ogt: BAHAOGT.toFixed(4),

                                                                        d1: BAHAD1.toFixed(4),
                                                                        c11: BAHAC11.toFixed(4),
                                                                        o1t: BAHAO1T.toFixed(4),

                                                                        ejt: (BAHAEJT / 1000).toFixed(4),

                                                                        g: BAHAG.toFixed(4),
                                                                        p1: BAHAP1.toFixed(4),
                                                                        c1: BAHAC1.toFixed(4),
                                                                        thk1e: BAHATHK1E.toFixed(4),
                                                                        cg: BAHACG.toFixed(4),
                                                                        dge: BAHADGE.toFixed(4),

                                                                        i0: BAHAI0.toFixed(4),

                                                                        thk1c: BAHATHK1C.toFixed(4),
                                                                        thk1d: BAHATHK1D.toFixed(4),
                                                                        thk1chk: BAHATHK1CHK,

                                                                        dgc: BAHADGC.toFixed(4),
                                                                        dgd: BAHADGD.toFixed(4),
                                                                        dgchk: BAHADGCHK
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
                                                                            let query = null, status;
                                                                            BAHAPayJS.dialog({
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
                                                                                        BAHAPayJS.dialog("close");
                                                                                        BAHAPayJS.dialog("clear");
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
                                                                                                    BAHAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                            BAHAPayJS.dialog('close');
                                                                                                            BAHAPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});