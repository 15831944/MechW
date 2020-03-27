$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bagbSketch = $("#d2");
    let bagbModel = $("#d3");
    let bagbd2d3 = $('#d2d3');

    $("#cal").html("<table id='bagb'></table>");
    let pg = $("#bagb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/g/b/BAGB.json", function (result) {

        let BAGBDT;
        let BAGB1Category, BAGB1CategoryVal, BAGB1Type, BAGB1TypeVal, BAGB1STD, BAGB1STDVal, BAGB1Name, BAGB1NameVal,
            BAGB2Category, BAGB2CategoryVal, BAGB2Type, BAGB2TypeVal, BAGB2STD, BAGB2STDVal, BAGB2Name, BAGB2NameVal,
            BAGBJCategory, BAGBJCategoryVal, BAGBJType, BAGBJTypeVal, BAGBJSTD, BAGBJSTDVal, BAGBJName, BAGBJNameVal;
        let columns, rows, ed;

        function bagb2d(bh = "H", bh1 = "0.6H", bh2 = "0.4H", l = "L") {

            bagbSketch.empty();

            let width = bagbSketch.width();
            let height = bagbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAGB2VG").attr("height", height);

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
                {x: padding + wg - 6 * thk, y: padding + 2.4 * hg},
                {x: padding + wg - thk, y: padding + 2.4 * hg},
                {x: padding + wg - thk, y: padding + 2.4 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.4 * hg + 5 * thk},
                {x: padding + wg - 2 * thk, y: padding + 2.4 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.4 * hg + thk},
                {x: padding + wg - 6 * thk, y: padding + 2.4 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + 2.4 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.4 * hg}
            ])).classed("sketch", true);

            // 角钢 第二层 右
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.4 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.4 * hg},
                {x: padding + 3 * wg + thk, y: padding + 2.4 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.4 * hg + 5 * thk},
                {x: padding + 3 * wg + 2 * thk, y: padding + 2.4 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.4 * hg + thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + 2.4 * hg}
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
            ])).attr("id", "BAGBSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAGBSketchH")
                .attr("startOffset", "50%").text(bh);

            // BH1
            dimLeftV(padding + wg - 6 * thk, padding + 2.4 * hg, padding + wg - 6 * thk, padding, bh1, "BAGBSketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + 2.4 * hg, bh2, "BAGBSketchBH2");

            // 垂直加固柱
            drawLine(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, padding + thk);
            drawLine(padding + 3 * wg + 6 * thk, height - padding, padding + 3 * wg + 6 * thk, padding + thk);

            // L
            dimBottomH(padding + wg, height - padding, padding + 3 * wg, height - padding, l, "BAGBSketchL");
        }

        currentTabIndex = bagbd2d3.tabs('getTabIndex', bagbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bagb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bagb").length > 0) {
                    bagb2d();
                }
            });
        }
        bagbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bagb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bagb").length > 0) {
                            bagb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "顶边加固、无拉杆、垂直加固、一道水平加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAGBJCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAGBJType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAGBJSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BAGBJName);
                }

                else if (index === 9) {
                    $(ed.target).combobox("loadData", BAGB1Category);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAGB1Type);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAGB1STD);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAGB1Name);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAGB2Category);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAGB2Type);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAGB2STD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAGB2Name);
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
                    bagbSketch.empty();

                    // model
                    bagbModel.empty();

                    // sketch
                    currentTabIndex = bagbd2d3.tabs('getTabIndex', bagbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagb2d();
                        bagbSketch.off("resize").on("resize", function () {
                            if ($("#bagb").length > 0) {
                                bagb2d();
                            }
                        });
                    }
                    bagbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagb2d();
                                bagbSketch.off("resize").on("resize", function () {
                                    if ($("#bagb").length > 0) {
                                        bagb2d();
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

                        BAGBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAGBJCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGBJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGBJName = null;

                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BAGB1Category = null;
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGB1Type = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGB1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGB1Name = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAGB2Category = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGB2Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGB2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGB2Name = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGB1Category = [];
                                BAGB2Category = [];
                                BAGBJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAGBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAGB1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGB2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAGBJCategory[index] = {
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

                        BAGBJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAGBJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGBJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGBJCategoryVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGBJType = [];
                                $(result).each(function (index, element) {
                                    BAGBJType[index] = {
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

                        BAGBJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAGBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGBJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGBJCategoryVal,
                                type: BAGBJTypeVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGBJSTD = [];
                                $(result).each(function (index, element) {
                                    BAGBJSTD[index] = {
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

                        BAGBJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BAGBJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGBJCategoryVal,
                                type: BAGBJTypeVal,
                                std: BAGBJSTDVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGBJName = [];
                                $(result).each(function (index, element) {
                                    BAGBJName[index] = {
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

                        BAGB1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAGB1Type = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGB1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGB1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGB1CategoryVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGB1Type = [];
                                $(result).each(function (index, element) {
                                    BAGB1Type[index] = {
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

                        BAGB1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAGB1STD = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGB1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGB1CategoryVal,
                                type: BAGB1TypeVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGB1STD = [];
                                $(result).each(function (index, element) {
                                    BAGB1STD[index] = {
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

                        BAGB1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAGB1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGB1CategoryVal,
                                type: BAGB1TypeVal,
                                std: BAGB1STDVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGB1Name = [];
                                $(result).each(function (index, element) {
                                    BAGB1Name[index] = {
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

                        BAGB2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAGB2Type = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGB2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGB2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGB2CategoryVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGB2Type = [];
                                $(result).each(function (index, element) {
                                    BAGB2Type[index] = {
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

                        BAGB2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAGB2STD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGB2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGB2CategoryVal,
                                type: BAGB2TypeVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGB2STD = [];
                                $(result).each(function (index, element) {
                                    BAGB2STD[index] = {
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

                        BAGB2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAGB2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAGB2CategoryVal,
                                type: BAGB2TypeVal,
                                std: BAGB2STDVal,
                                temp: BAGBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAGB2Name = [];
                                $(result).each(function (index, element) {
                                    BAGB2Name[index] = {
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
                    let BAGBD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAGBD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // LC
                    let BAGBLC;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAGBLC = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H
                    let BAGBBH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 * BAGBLC, 0.1 / 0.6 * BAGBLC, 0.1 / 0.4 * BAGBLC)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 * BAGBLC, 5 / 0.6 * BAGBLC, 5 / 0.4 * BAGBLC)) {
                        BAGBBH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 * BAGBLC, 0.1 / 0.6 * BAGBLC, 0.1 / 0.4 * BAGBLC)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 * BAGBLC, 0.1 / 0.6 * BAGBLC, 0.1 / 0.4 * BAGBLC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 * BAGBLC, 5 / 0.6 * BAGBLC, 5 / 0.4 * BAGBLC)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 * BAGBLC, 5 / 0.6 * BAGBLC, 5 / 0.4 * BAGBLC).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagb2d(BAGBBH, (0.6 * BAGBBH).toFixed(2), (0.4 * BAGBBH).toFixed(2));
                        bagbSketch.off("resize").on("resize", function () {
                            if ($("#bagb").length > 0) {
                                bagb2d(BAGBBH, (0.6 * BAGBBH).toFixed(2), (0.4 * BAGBBH).toFixed(2));
                            }
                        });
                    }
                    bagbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagb2d(BAGBBH, (0.6 * BAGBBH).toFixed(2), (0.4 * BAGBBH).toFixed(2));
                                bagbSketch.off("resize").on("resize", function () {
                                    if ($("#bagb").length > 0) {
                                        bagb2d(BAGBBH, (0.6 * BAGBBH).toFixed(2), (0.4 * BAGBBH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // L
                    let BAGBL;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])
                        && parseFloat(rows[4][columns[0][1].field]) >= BAGBLC) {
                        BAGBL = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])
                        && parseFloat(rows[4][columns[0][1].field]) < BAGBLC) {
                        south.html("壁板宽度 L 不能小于 " + BAGBLC + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bagb2d(BAGBBH, (0.6 * BAGBBH).toFixed(2), (0.4 * BAGBBH).toFixed(2), BAGBL);
                        bagbSketch.off("resize").on("resize", function () {
                            if ($("#bagb").length > 0) {
                                bagb2d(BAGBBH, (0.6 * BAGBBH).toFixed(2), (0.4 * BAGBBH).toFixed(2), BAGBL);
                            }
                        });
                    }
                    bagbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bagb2d(BAGBBH, (0.6 * BAGBBH).toFixed(2), (0.4 * BAGBBH).toFixed(2), BAGBL);
                                bagbSketch.off("resize").on("resize", function () {
                                    if ($("#bagb").length > 0) {
                                        bagb2d(BAGBBH, (0.6 * BAGBBH).toFixed(2), (0.4 * BAGBBH).toFixed(2), BAGBL);
                                    }
                                });
                            }
                        }
                    });

                    // 加固件材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        BAGBJNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // ajax 获取 EJT
                    let BAGBEJT;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_e.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAGBJCategoryVal,
                            "type": BAGBJTypeVal,
                            "std": BAGBJSTDVal,
                            "name": BAGBJNameVal,
                            "temp": BAGBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAGBEJT = 1000 * parseFloat(result.et);
                            if (BAGBEJT < 0) {
                                south.html("查询顶边加固件材料弹性模量失败！").css("color", "red");
                                return false;
                            }

                            // 第一段壁板材料名称
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                BAGB1NameVal = rows[12][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // AJAX 获取材料密度、最大最小厚度
                            let BAGBD1, BAGB1ThkMin, BAGB1ThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAGB1CategoryVal,
                                    "type": BAGB1TypeVal,
                                    "std": BAGB1STDVal,
                                    "name": BAGB1NameVal,
                                    "temp": BAGBDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAGBD1 = parseFloat(result.density);
                                    BAGB1ThkMin = parseFloat(result.thkMin);
                                    BAGB1ThkMax = parseFloat(result.thkMax);

                                    // 第一层壁板腐蚀裕量 C12
                                    let BAGBC12;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < BAGB1ThkMax) {
                                        BAGBC12 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= BAGB1ThkMax) {
                                        south.html("第一段壁板腐蚀裕量不能大于等于 " + BAGB1ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 第一段壁板名义厚度
                                    let BAGBTHK1N;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) > Math.max(BAGBC12, BAGB1ThkMin)
                                        && parseFloat(rows[14][columns[0][1].field]) <= BAGB1ThkMax) {
                                        BAGBTHK1N = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) <= Math.max(BAGBC12, BAGB1ThkMin)) {
                                        south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAGBC12, BAGB1ThkMin) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) > BAGB1ThkMax) {
                                        south.html("第一段壁板名义厚度不能大于 " + BAGB1ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // ajax 获取 O2T E2T C21
                                    let BAGBO1T, BAGBE1T, BAGBC11;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAGB1CategoryVal,
                                            "type": BAGB1TypeVal,
                                            "std": BAGB1STDVal,
                                            "name": BAGB1NameVal,
                                            "thk": BAGBTHK1N,
                                            "temp": BAGBDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAGBO1T = parseFloat(result.ot);
                                            if (BAGBO1T < 0) {
                                                south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGBE1T = 1000 * parseFloat(result.et);
                                            if (BAGBE1T < 0) {
                                                south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }
                                            BAGBC11 = parseFloat(result.c1);
                                            if (BAGBC11 < 0) {
                                                south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 第二段壁板材料名称
                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                BAGB2NameVal = rows[18][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAGBD2, BAGB2ThkMin, BAGB2ThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAGB2CategoryVal,
                                                    "type": BAGB2TypeVal,
                                                    "std": BAGB2STDVal,
                                                    "name": BAGB2NameVal,
                                                    "temp": BAGBDT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAGBD2 = parseFloat(result.density);
                                                    BAGB2ThkMin = parseFloat(result.thkMin);
                                                    BAGB2ThkMax = parseFloat(result.thkMax);

                                                    // 第二层壁板腐蚀裕量 C22
                                                    let BAGBC22;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) < BAGB2ThkMax) {
                                                        BAGBC22 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) >= BAGB2ThkMax) {
                                                        south.html("第二段壁板腐蚀裕量不能大于等于 " + BAGB2ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 第二段壁板名义厚度
                                                    let BAGBTHK2N;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.max(BAGBC22, BAGB2ThkMin)
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BAGB2ThkMax) {
                                                        BAGBTHK2N = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.max(BAGBC22, BAGB2ThkMin)) {
                                                        south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAGBC22, BAGB2ThkMin) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BAGB2ThkMax) {
                                                        south.html("第二段壁板名义厚度不能大于 " + BAGB2ThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 O2T E2T C21
                                                    let BAGBO2T, BAGBE2T, BAGBC21;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAGB2CategoryVal,
                                                            "type": BAGB2TypeVal,
                                                            "std": BAGB2STDVal,
                                                            "name": BAGB2NameVal,
                                                            "thk": BAGBTHK2N,
                                                            "temp": BAGBDT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAGBO2T = parseFloat(result.ot);
                                                            if (BAGBO2T < 0) {
                                                                south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGBE2T = 1000 * parseFloat(result.et);
                                                            if (BAGBE2T < 0) {
                                                                south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAGBC21 = parseFloat(result.c1);
                                                            if (BAGBC21 < 0) {
                                                                south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 过程参数
                                                            let BAGBG = 9.81;
                                                            let BAGBPC = BAGBD * BAGBG * BAGBBH / 1000000000;
                                                            let BAGBBHLC = BAGBBH / BAGBLC;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "ba": BAGBBHLC
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    let BAGBALPHA = parseFloat(result.alpha);
                                                                    let BAGBBETA = parseFloat(result.beta);

                                                                    let BAGBBH1 = 0.6 * BAGBBH;
                                                                    let BAGBC1 = BAGBC11 + BAGBC12;
                                                                    let BAGBTHK1E = BAGBTHK1N - BAGBC1;
                                                                    let BAGBBH1LC = BAGBBH1 / BAGBLC;
                                                                    let BAGBSH1 = BAGBBH1;
                                                                    let BAGBPC1 = BAGBD * BAGBG * BAGBSH1 / 1000000000;

                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "ba": BAGBBH1LC
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            let BAGBALPHA1 = parseFloat(result.alpha);
                                                                            let BAGBBETA1 = parseFloat(result.beta);

                                                                            let BAGBBH2 = 0.4 * BAGBBH;
                                                                            let BAGBC2 = BAGBC21 + BAGBC22;
                                                                            let BAGBTHK2E = BAGBTHK2N - BAGBC2;
                                                                            let BAGBBH2LC = BAGBBH2 / BAGBLC;
                                                                            let BAGBSH2 = BAGBBH1 + BAGBBH2;
                                                                            let BAGBPC2 = BAGBD * BAGBG * BAGBSH2 / 1000000000;

                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "ba": BAGBBH2LC
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    let BAGBALPHA2 = parseFloat(result.alpha);
                                                                                    let BAGBBETA2 = parseFloat(result.beta);

                                                                                    // 顶边加固件
                                                                                    let BAGBI0 = 0.217 * BAGBPC1 * BAGBSH1 * BAGBL * BAGBL * BAGBL / BAGBEJT;
                                                                                    south.html(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "顶边加固件所需最小惯性矩：" + BAGBI0.toFixed(2) + " mm⁴" +
                                                                                        "</span>");

                                                                                    // 第一段加固柱校核
                                                                                    let BAGBLMAX1 = 0.408 * BAGBTHK1E * Math.sqrt(BAGBO1T / (BAGBALPHA * BAGBPC));
                                                                                    let BAGBZP1 = BAGBLC * (0.0642 * BAGBPC * BAGBBH * BAGBBH / BAGBO1T - BAGBTHK1E * BAGBTHK1E / 6);

                                                                                    // 第一段壁板
                                                                                    let BAGBTHK1C = BAGBLC * Math.sqrt(3 * BAGBALPHA1 * BAGBPC1 / BAGBO1T);
                                                                                    let BAGBTHK1D = BAGBTHK1C + BAGBC12;
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "第一段壁板所需厚度：" + (BAGBTHK1D + BAGBC11).toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    let BAGBTHK1CHK;
                                                                                    if (BAGBTHK1N >= (BAGBTHK1D + BAGBC11)) {
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "输入厚度：" + BAGBTHK1N + " mm" +
                                                                                            "</span>");
                                                                                        BAGBTHK1CHK = "合格";
                                                                                    }
                                                                                    else {
                                                                                        south.append(
                                                                                            "<span style='color:red;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "输入厚度：" + BAGBTHK1N + " mm" +
                                                                                            "</span>");
                                                                                        BAGBTHK1CHK = "不合格";
                                                                                    }

                                                                                    let BAGBF1ALLOW = 5 * (BAGBTHK1E / 2 + Math.sqrt(BAGBBH1LC) * BAGBLC / 500);
                                                                                    let BAGBF1MAX = BAGBBETA1 * Math.pow(BAGBLC, 4) * BAGBPC1 / (2 * BAGBE1T * Math.pow(BAGBTHK1E, 3));
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "第一段壁板许用挠度：" + BAGBF1ALLOW.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    let BAGBF1CHK;
                                                                                    if (BAGBF1MAX <= BAGBF1ALLOW) {
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际挠度：" + BAGBF1MAX.toFixed(2) + " mm" +
                                                                                            "</span>");
                                                                                        BAGBF1CHK = "合格";
                                                                                    }
                                                                                    else {
                                                                                        south.append(
                                                                                            "<span style='color:red;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际挠度：" + BAGBF1MAX.toFixed(2) + " mm" +
                                                                                            "</span>");
                                                                                        BAGBF1CHK = "不合格";
                                                                                    }

                                                                                    // 第一道水平加固件
                                                                                    let BAGBF1 = BAGBPC2 * (BAGBSH1 + BAGBSH2) / 6;
                                                                                    let BAGBI1 = 1.3 * BAGBF1 * BAGBLC * BAGBLC * BAGBLC / BAGBEJT;
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "第一道水平加固件所需最小惯性矩：" + BAGBI1.toFixed(2) + " mm⁴" +
                                                                                        "</span>");

                                                                                    // 第二段加固柱校核
                                                                                    let BAGBLMAX2 = 0.408 * BAGBTHK2E * Math.sqrt(BAGBO2T / (BAGBALPHA * BAGBPC));
                                                                                    let BAGBZP2 = BAGBLC * (0.0642 * BAGBPC * BAGBBH * BAGBBH / BAGBO2T - BAGBTHK2E * BAGBTHK2E / 6);

                                                                                    // 第二段壁板
                                                                                    let BAGBTHK2C = BAGBLC * Math.sqrt(6 * BAGBALPHA2 * (BAGBPC1 + BAGBPC2) / BAGBO2T);
                                                                                    let BAGBTHK2D = BAGBTHK2C + BAGBC22;
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "第二段壁板所需厚度：" + (BAGBTHK2D + BAGBC21).toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    let BAGBTHK2CHK;
                                                                                    if (BAGBTHK2N >= (BAGBTHK2D + BAGBC21)) {
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "输入厚度：" + BAGBTHK2N + " mm" +
                                                                                            "</span>");
                                                                                        BAGBTHK2CHK = "合格";
                                                                                    }
                                                                                    else {
                                                                                        south.append(
                                                                                            "<span style='color:red;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "输入厚度：" + BAGBTHK2N + " mm" +
                                                                                            "</span>");
                                                                                        BAGBTHK2CHK = "不合格";
                                                                                    }

                                                                                    let BAGBF2ALLOW = 5 * (BAGBTHK2E / 2 + Math.sqrt(BAGBBH2LC) * BAGBLC / 500);
                                                                                    let BAGBF2MAX = BAGBBETA2 * Math.pow(BAGBLC, 4) * (BAGBPC1 + BAGBPC2) / (2 * BAGBE2T * Math.pow(BAGBTHK2E, 3));

                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "第二段壁板许用挠度：" + BAGBF2ALLOW.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    let BAGBF2CHK;
                                                                                    if (BAGBF2MAX <= BAGBF2ALLOW) {
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际挠度：" + BAGBF2MAX.toFixed(2) + " mm" +
                                                                                            "</span>");
                                                                                        BAGBF2CHK = "合格";
                                                                                    }
                                                                                    else {
                                                                                        south.append(
                                                                                            "<span style='color:red;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际挠度：" + BAGBF2MAX.toFixed(2) + " mm" +
                                                                                            "</span>");
                                                                                        BAGBF2CHK = "不合格";
                                                                                    }

                                                                                    // 加固柱结果汇总
                                                                                    let BAGBLMAX = Math.min(BAGBLMAX1, BAGBLMAX2);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "垂直加固柱允许最大间距：" + BAGBLMAX.toFixed(2) + " mm" +
                                                                                        "</span>");
                                                                                    let BAGBLCCHK;
                                                                                    if (BAGBLC <= BAGBLMAX) {
                                                                                        south.append(
                                                                                            "<span style='color:#444444;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际输入间距：" + BAGBLC + " mm" +
                                                                                            "</span>");
                                                                                        BAGBLCCHK = "合格";
                                                                                    }
                                                                                    else {
                                                                                        south.append(
                                                                                            "<span style='color:red;'>" +
                                                                                            "&ensp;|&ensp;" +
                                                                                            "实际输入间距：" + BAGBLC + " mm" +
                                                                                            "</span>");
                                                                                        BAGBLCCHK = "不合格";
                                                                                    }
                                                                                    let BAGBZP = Math.max(BAGBZP1, BAGBZP2);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "垂直加固柱所需最小截面系数：" + BAGBZP.toFixed(4) + " mm³" +
                                                                                        "</span>");

                                                                                    // docx
                                                                                    let BAGBPayJS = $('#payjs');

                                                                                    function getDocx() {
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "bagbdocx.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                ribbonName: "BAGB",

                                                                                                t: BAGBDT,
                                                                                                d: BAGBD,
                                                                                                lc: BAGBLC,
                                                                                                bh: BAGBBH,
                                                                                                l: BAGBL,

                                                                                                jstd: BAGBJSTDVal,
                                                                                                jname: BAGBJNameVal,

                                                                                                std1: BAGB1STDVal,
                                                                                                name1: BAGB1NameVal,
                                                                                                c12: BAGBC12,
                                                                                                thk1n: BAGBTHK1N,

                                                                                                std2: BAGB2STDVal,
                                                                                                name2: BAGB2NameVal,
                                                                                                c22: BAGBC22,
                                                                                                thk2n: BAGBTHK2N,

                                                                                                d1: BAGBD1.toFixed(4),
                                                                                                c11: BAGBC11.toFixed(4),
                                                                                                o1t: BAGBO1T.toFixed(4),
                                                                                                e1t: (BAGBE1T / 1000).toFixed(4),

                                                                                                d2: BAGBD2.toFixed(4),
                                                                                                c21: BAGBC21.toFixed(4),
                                                                                                o2t: BAGBO2T.toFixed(4),
                                                                                                e2t: (BAGBE2T / 1000).toFixed(4),

                                                                                                ejt: (BAGBEJT / 1000).toFixed(4),

                                                                                                g: BAGBG.toFixed(4),
                                                                                                pc: BAGBPC.toFixed(4),
                                                                                                bhlc: BAGBBHLC.toFixed(4),
                                                                                                alpha: BAGBALPHA.toFixed(8),
                                                                                                beta: BAGBBETA.toFixed(8),

                                                                                                bh1: BAGBBH1.toFixed(4),
                                                                                                c1: BAGBC1.toFixed(4),
                                                                                                thk1e: BAGBTHK1E.toFixed(4),
                                                                                                bh1lc: BAGBBH1LC.toFixed(4),
                                                                                                alpha1: BAGBALPHA1.toFixed(8),
                                                                                                beta1: BAGBBETA1.toFixed(8),
                                                                                                sh1: BAGBSH1.toFixed(4),
                                                                                                pc1: BAGBPC1.toFixed(4),

                                                                                                bh2: BAGBBH2.toFixed(4),
                                                                                                c2: BAGBC2.toFixed(4),
                                                                                                thk2e: BAGBTHK2E.toFixed(4),
                                                                                                bh2lc: BAGBBH2LC.toFixed(4),
                                                                                                alpha2: BAGBALPHA2.toFixed(8),
                                                                                                beta2: BAGBBETA2.toFixed(8),
                                                                                                sh2: BAGBSH2.toFixed(4),
                                                                                                pc2: BAGBPC2.toFixed(4),

                                                                                                i0: BAGBI0.toFixed(4),

                                                                                                lmax1: BAGBLMAX1.toFixed(4),
                                                                                                zp1: BAGBZP1.toFixed(4),

                                                                                                thk1c: BAGBTHK1C.toFixed(4),
                                                                                                thk1d: BAGBTHK1D.toFixed(4),
                                                                                                thk1chk: BAGBTHK1CHK,
                                                                                                f1allow: BAGBF1ALLOW.toFixed(4),
                                                                                                f1max: BAGBF1MAX.toFixed(4),
                                                                                                f1chk: BAGBF1CHK,

                                                                                                f1: BAGBF1.toFixed(4),
                                                                                                i1: BAGBI1.toFixed(4),

                                                                                                lmax2: BAGBLMAX2.toFixed(4),
                                                                                                zp2: BAGBZP2.toFixed(4),

                                                                                                thk2c: BAGBTHK2C.toFixed(4),
                                                                                                thk2d: BAGBTHK2D.toFixed(4),
                                                                                                thk2chk: BAGBTHK2CHK,
                                                                                                f2allow: BAGBF2ALLOW.toFixed(4),
                                                                                                f2max: BAGBF2MAX.toFixed(4),
                                                                                                f2chk: BAGBF2CHK,

                                                                                                lmax: BAGBLMAX.toFixed(4),
                                                                                                lcchk: BAGBLCCHK,
                                                                                                zp: BAGBZP.toFixed(4)
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
                                                                                                    BAGBPayJS.dialog({
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
                                                                                                                BAGBPayJS.dialog("close");
                                                                                                                BAGBPayJS.dialog("clear");
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
                                                                                                                            BAGBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                    BAGBPayJS.dialog('close');
                                                                                                                                    BAGBPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});