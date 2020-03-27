$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bahbSketch = $("#d2");
    let bahbModel = $("#d3");
    let bahbd2d3 = $('#d2d3');

    $("#cal").html("<table id='bahb'></table>");
    let pg = $("#bahb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/h/b/BAHB.json", function (result) {

        let BAHBDT;
        let BAHBGCategory, BAHBGCategoryVal, BAHBGType, BAHBGTypeVal, BAHBGSTD, BAHBGSTDVal, BAHBGName, BAHBGNameVal,
            BAHB1Category, BAHB1CategoryVal, BAHB1Type, BAHB1TypeVal, BAHB1STD, BAHB1STDVal, BAHB1Name, BAHB1NameVal;
        let columns, rows, ed;

        function bahb2d(hi = "hi", a = "a", h = "h") {

            bahbSketch.empty();

            let width = bahbSketch.width();
            let height = bahbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAHBSVG").attr("height", height);

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
                    {x: padding + 2.5 * wg, y: height - padding - 1.5 * hg},
                    {x: padding + 2.5 * wg - 3, y: height - padding - 1.5 * hg - 15},
                    {x: padding + 2.5 * wg + 3, y: height - padding - 1.5 * hg - 15},
                    {x: padding + 2.5 * wg, y: height - padding - 1.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding},
                    {x: padding + 2.5 * wg + 3, y: padding + 15},
                    {x: padding + 2.5 * wg - 3, y: padding + 15},
                    {x: padding + 2.5 * wg, y: padding}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: height - padding - 1.5 * hg - 15},
                {x: padding + 2.5 * wg, y: padding + 15}
            ])).attr("id", "BAHBSketchH1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAHBSketchH1")
                .attr("startOffset", "50%").text(hi);

            // 拉杆1
            drawLine(padding + wg, padding + hg - thk, padding + 3 * wg, padding + hg - thk);
            drawLine(padding + wg, padding + hg + thk, padding + 3 * wg, padding + hg + thk);
            drawCenterLine(padding + wg - thk - 10, padding + hg, padding + 3 * wg + thk + 10, padding + hg);

            // 拉杆2
            drawLine(padding + wg, padding + 2 * hg - thk, padding + 3 * wg, padding + 2 * hg - thk);
            drawLine(padding + wg, padding + 2 * hg + thk, padding + 3 * wg, padding + 2 * hg + thk);
            drawCenterLine(padding + wg - thk - 10, padding + 2 * hg, padding + 3 * wg + thk + 10, padding + 2 * hg);

            // 拉杆3
            drawLine(padding + wg, padding + 3 * hg - thk, padding + 1.5 * wg - 50, padding + 3 * hg - thk);
            drawLine(padding + 1.5 * wg - 25, padding + 3 * hg - thk, padding + 3 * wg, padding + 3 * hg - thk);
            drawLine(padding + wg, padding + 3 * hg + thk, padding + 1.5 * wg - 50, padding + 3 * hg + thk);
            drawLine(padding + 1.5 * wg - 25, padding + 3 * hg + thk, padding + 3 * wg, padding + 3 * hg + thk);
            drawCenterLine(padding + wg - thk - 10, padding + 3 * hg, padding + 1.5 * wg - 50, padding + 3 * hg);
            drawCenterLine(padding + 1.5 * wg - 25, padding + 3 * hg, padding + 3 * wg + thk + 10, padding + 3 * hg);

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

            // a
            dimBottomH(padding + 1.5 * wg, padding + 2.5 * hg, padding + 2 * wg, padding + 2.5 * hg, a, "a");

            // h
            dimLeftV(padding + 1.5 * wg, padding + 3.5 * hg, padding + 1.5 * wg, padding + 2.5 * hg, h, "h");
        }

        currentTabIndex = bahbd2d3.tabs('getTabIndex', bahbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bahb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bahb").length > 0) {
                    bahb2d();
                }
            });
        }
        bahbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bahb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bahb").length > 0) {
                            bahb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 第 i 层拉杆及壁板设计计算",
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

                if (index === 2) {
                    $(ed.target).combobox("loadData", BAHBGCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", BAHBGType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BAHBGSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAHBGName);
                }

                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAHB1Category);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAHB1Type);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAHB1STD);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BAHB1Name);
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
                    bahbSketch.empty();

                    // model
                    bahbModel.empty();

                    // sketch
                    currentTabIndex = bahbd2d3.tabs('getTabIndex', bahbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bahb2d();
                        bahbSketch.off("resize").on("resize", function () {
                            if ($("#bahb").length > 0) {
                                bahb2d();
                            }
                        });
                    }
                    bahbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bahb2d();
                                bahbSketch.off("resize").on("resize", function () {
                                    if ($("#bahb").length > 0) {
                                        bahb2d();
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

                        BAHBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BAHBGCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAHBGType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAHBGSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAHBGName = null;

                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAHB1Category = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAHB1Type = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAHB1STD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAHB1Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHB1Category = [];
                                BAHBGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAHBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAHB1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAHBGCategory[index] = {
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
                    if (index === 2) {

                        BAHBGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空

                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAHBGType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAHBGSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAHBGName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHBGCategoryVal,
                                temp: BAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHBGType = [];
                                $(result).each(function (index, element) {
                                    BAHBGType[index] = {
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
                    if (index === 3) {

                        BAHBGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAHBGSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAHBGName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHBGCategoryVal,
                                type: BAHBGTypeVal,
                                temp: BAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHBGSTD = [];
                                $(result).each(function (index, element) {
                                    BAHBGSTD[index] = {
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
                    if (index === 4) {

                        BAHBGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAHBGName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHBGCategoryVal,
                                type: BAHBGTypeVal,
                                std: BAHBGSTDVal,
                                temp: BAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHBGName = [];
                                $(result).each(function (index, element) {
                                    BAHBGName[index] = {
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
                    if (index === 11) {

                        BAHB1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAHB1Type = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAHB1STD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAHB1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHB1CategoryVal,
                                temp: BAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHB1Type = [];
                                $(result).each(function (index, element) {
                                    BAHB1Type[index] = {
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
                    if (index === 12) {

                        BAHB1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAHB1STD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAHB1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHB1CategoryVal,
                                type: BAHB1TypeVal,
                                temp: BAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHB1STD = [];
                                $(result).each(function (index, element) {
                                    BAHB1STD[index] = {
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
                    if (index === 13) {

                        BAHB1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAHB1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAHB1CategoryVal,
                                type: BAHB1TypeVal,
                                std: BAHB1STDVal,
                                temp: BAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAHB1Name = [];
                                $(result).each(function (index, element) {
                                    BAHB1Name[index] = {
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
                    let BAHBD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAHBD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 拉杆材料名称
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        BAHBGNameVal = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAHBDG, BAHBGThkMin, BAHBGThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAHBGCategoryVal,
                            "type": BAHBGTypeVal,
                            "std": BAHBGSTDVal,
                            "name": BAHBGNameVal,
                            "temp": BAHBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAHBDG = parseFloat(result.density);
                            BAHBGThkMin = parseFloat(result.thkMin);
                            BAHBGThkMax = parseFloat(result.thkMax);

                            // 拉杆腐蚀裕量 CG2
                            let BAHBCG2;
                            if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) < BAHBGThkMax / 2) {
                                BAHBCG2 = parseFloat(rows[6][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) >= BAHBGThkMax / 2) {
                                south.html("拉杆腐蚀裕量不能大于等于 " + BAHBGThkMax / 2 + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 拉杆名义直径
                            let BAHBDGN;
                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) > Math.max(BAHBCG2, BAHBGThkMin)
                                && parseFloat(rows[7][columns[0][1].field]) <= BAHBGThkMax) {
                                BAHBDGN = parseFloat(rows[7][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) <= Math.max(BAHBCG2, BAHBGThkMin)) {
                                south.html("拉杆直径不能小于等于 " + Math.max(BAHBCG2, BAHBGThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) > BAHBGThkMax) {
                                south.html("拉杆直径不能大于 " + BAHBGThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 OGT CG1
                            let BAHBOGT, BAHBCG1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAHBGCategoryVal,
                                    "type": BAHBGTypeVal,
                                    "std": BAHBGSTDVal,
                                    "name": BAHBGNameVal,
                                    "thk": BAHBDGN,
                                    "temp": BAHBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAHBOGT = parseFloat(result.ot);
                                    if (BAHBOGT < 0) {
                                        south.html("查询拉杆材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAHBCG1 = parseFloat(result.c1);
                                    if (BAHBCG1 < 0) {
                                        south.html("查询拉杆材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // hi
                                    let BAHBHi;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BAHBHi = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bahb2d(BAHBHi);
                                        bahbSketch.off("resize").on("resize", function () {
                                            if ($("#bahb").length > 0) {
                                                bahb2d(BAHBHi);
                                            }
                                        });
                                    }
                                    bahbd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bahb2d(BAHBHi);
                                                bahbSketch.off("resize").on("resize", function () {
                                                    if ($("#bahb").length > 0) {
                                                        bahb2d(BAHBHi);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // A
                                    let BAHBA;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                        BAHBA = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bahb2d(BAHBHi, BAHBA);
                                        bahbSketch.off("resize").on("resize", function () {
                                            if ($("#bahb").length > 0) {
                                                bahb2d(BAHBHi, BAHBA);
                                            }
                                        });
                                    }
                                    bahbd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bahb2d(BAHBHi, BAHBA);
                                                bahbSketch.off("resize").on("resize", function () {
                                                    if ($("#bahb").length > 0) {
                                                        bahb2d(BAHBHi, BAHBA);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // H
                                    let BAHBH;
                                    if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                        BAHBH = parseFloat(rows[10][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bahb2d(BAHBHi, BAHBA, BAHBH);
                                        bahbSketch.off("resize").on("resize", function () {
                                            if ($("#bahb").length > 0) {
                                                bahb2d(BAHBHi, BAHBA, BAHBH);
                                            }
                                        });
                                    }
                                    bahbd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bahb2d(BAHBHi, BAHBA, BAHBH);
                                                bahbSketch.off("resize").on("resize", function () {
                                                    if ($("#bahb").length > 0) {
                                                        bahb2d(BAHBHi, BAHBA, BAHBH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 壁板材料名称
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        BAHB1NameVal = rows[14][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAHBD1, BAHB1ThkMin, BAHB1ThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAHB1CategoryVal,
                                            "type": BAHB1TypeVal,
                                            "std": BAHB1STDVal,
                                            "name": BAHB1NameVal,
                                            "temp": BAHBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAHBD1 = parseFloat(result.density);
                                            BAHB1ThkMin = parseFloat(result.thkMin);
                                            BAHB1ThkMax = parseFloat(result.thkMax);

                                            // 壁板腐蚀裕量 C12
                                            let BAHBC12;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) < BAHB1ThkMax) {
                                                BAHBC12 = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) >= BAHB1ThkMax) {
                                                south.html("壁板腐蚀裕量不能大于等于 " + BAHB1ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 壁板名义厚度
                                            let BAHBTHK1N;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                && parseFloat(rows[16][columns[0][1].field]) > Math.max(BAHBC12, BAHB1ThkMin)
                                                && parseFloat(rows[16][columns[0][1].field]) <= BAHB1ThkMax) {
                                                BAHBTHK1N = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                && parseFloat(rows[16][columns[0][1].field]) <= Math.max(BAHBC12, BAHB1ThkMin)) {
                                                south.html("壁板名义厚度不能小于等于 " + Math.max(BAHBC12, BAHB1ThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                && parseFloat(rows[16][columns[0][1].field]) > BAHB1ThkMax) {
                                                south.html("壁板名义厚度不能大于 " + BAHB1ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 O1T C11
                                            let BAHBO1T, BAHBC11;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAHB1CategoryVal,
                                                    "type": BAHB1TypeVal,
                                                    "std": BAHB1STDVal,
                                                    "name": BAHB1NameVal,
                                                    "thk": BAHBTHK1N,
                                                    "temp": BAHBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAHBO1T = parseFloat(result.ot);
                                                    if (BAHBO1T < 0) {
                                                        south.html("查询壁板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAHBC11 = parseFloat(result.c1);
                                                    if (BAHBC11 < 0) {
                                                        south.html("查询壁板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 过程参数
                                                    let BAHBG = 9.81;
                                                    let BAHBPi = BAHBD * BAHBG * BAHBHi / 1000000000;
                                                    let BAHBC1 = BAHBC11 + BAHBC12;
                                                    let BAHBTHK1E = BAHBTHK1N - BAHBC1;
                                                    let BAHBCG = BAHBCG1 + 2 * BAHBCG2;
                                                    let BAHBDGE = BAHBDGN - BAHBCG;

                                                    // 壁板
                                                    let BAHBTHK1C = BAHBH * Math.sqrt(BAHBPi / (2 * BAHBO1T));
                                                    let BAHBTHK1D = BAHBTHK1C + BAHBC12;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "壁板所需厚度：" + (BAHBTHK1D + BAHBC11).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BAHBTHK1CHK;
                                                    if (BAHBTHK1N >= (BAHBTHK1D + BAHBC11)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + BAHBTHK1N + " mm" +
                                                            "</span>");
                                                        BAHBTHK1CHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + BAHBTHK1N + " mm" +
                                                            "</span>");
                                                        BAHBTHK1CHK = "不合格";
                                                    }

                                                    // 拉杆
                                                    let BAHBDGC = 1.13 * Math.sqrt(BAHBA * BAHBH * BAHBPi / (2 * BAHBOGT));
                                                    let BAHBDGD = BAHBDGC + 2 * BAHBCG2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "拉杆所需直径：" + (BAHBDGD + BAHBCG1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let BAHBDGCHK;
                                                    if (BAHBDGN >= (BAHBDGD + BAHBCG1)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入直径：" + BAHBDGN + " mm" +
                                                            "</span>");
                                                        BAHBDGCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入直径：" + BAHBDGN + " mm" +
                                                            "</span>");
                                                        BAHBDGCHK = "不合格";
                                                    }

                                                    // docx
                                                    let BAHBPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "bahbdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "BAHB",

                                                                t: BAHBDT,
                                                                d: BAHBD,

                                                                gstd: BAHBGSTDVal,
                                                                gname: BAHBGNameVal,
                                                                cg2: BAHBCG2,
                                                                dgn: BAHBDGN,
                                                                hi: BAHBHi,
                                                                a: BAHBA,
                                                                h: BAHBH,

                                                                std1: BAHB1STDVal,
                                                                name1: BAHB1NameVal,
                                                                c12: BAHBC12,
                                                                thk1n: BAHBTHK1N,

                                                                dg: BAHBDG.toFixed(4),
                                                                cg1: BAHBCG1.toFixed(4),
                                                                ogt: BAHBOGT.toFixed(4),

                                                                d1: BAHBD1.toFixed(4),
                                                                c11: BAHBC11.toFixed(4),
                                                                o1t: BAHBO1T.toFixed(4),

                                                                g: BAHBG.toFixed(4),
                                                                pi: BAHBPi.toFixed(4),
                                                                c1: BAHBC1.toFixed(4),
                                                                thk1e: BAHBTHK1E.toFixed(4),
                                                                cg: BAHBCG.toFixed(4),
                                                                dge: BAHBDGE.toFixed(4),

                                                                thk1c: BAHBTHK1C.toFixed(4),
                                                                thk1d: BAHBTHK1D.toFixed(4),
                                                                thk1chk: BAHBTHK1CHK,

                                                                dgc: BAHBDGC.toFixed(4),
                                                                dgd: BAHBDGD.toFixed(4),
                                                                dgchk: BAHBDGCHK
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
                                                                    BAHBPayJS.dialog({
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
                                                                                BAHBPayJS.dialog("close");
                                                                                BAHBPayJS.dialog("clear");
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
                                                                                            BAHBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    BAHBPayJS.dialog('close');
                                                                                                    BAHBPayJS.dialog('clear');
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