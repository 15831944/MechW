$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bafaSketch = $("#d2");
    let bafaModel = $("#d3");
    let bafad2d3 = $('#d2d3');

    $("#cal").html("<table id='bafa'></table>");
    let pg = $("#bafa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/f/a/BAFA.json", function (result) {

        let BAFADT;
        let BAFA1Category, BAFA1CategoryVal, BAFA1Type, BAFA1TypeVal, BAFA1STD, BAFA1STDVal, BAFA1Name, BAFA1NameVal,
            BAFA2Category, BAFA2CategoryVal, BAFA2Type, BAFA2TypeVal, BAFA2STD, BAFA2STDVal, BAFA2Name, BAFA2NameVal,
            BAFAJCategory, BAFAJCategoryVal, BAFAJType, BAFAJTypeVal, BAFAJSTD, BAFAJSTDVal, BAFAJName, BAFAJNameVal;
        let columns, rows, ed;

        function bafa2d(l = "L", bh = "H", bh1 = "0.6H", bh2 = "0.4H") {

            bafaSketch.empty();

            let width = bafaSketch.width();
            let height = bafaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAFA2VG").attr("height", height);

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
            let thk = 10;

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

            // 角钢
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding},
                {x: padding + wg - thk, y: padding - thk},
                {x: padding + wg - 6 * thk, y: padding - thk},
                {x: padding + wg - 6 * thk, y: padding},
                {x: padding + wg - 2 * thk, y: padding},
                {x: padding + wg - 2 * thk, y: padding + 4 * thk},
                {x: padding + wg - thk, y: padding + 4 * thk}
            ])).classed("sketch", true);

            // 角钢
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

            // 角钢
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding},
                {x: padding + 3 * wg + thk, y: padding - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding},
                {x: padding + 3 * wg + 2 * thk, y: padding},
                {x: padding + 3 * wg + 2 * thk, y: padding + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + 4 * thk}
            ])).classed("sketch", true);

            // 角钢
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
            ])).attr("id", "BAFA2ketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAFA2ketchH")
                .attr("startOffset", "50%").text(bh);

            // L
            dimBottomH(padding + wg, height - padding, padding + 3 * wg, height - padding, l, "BAFASketchL");

            // BH1
            dimLeftV(padding + wg - 6 * thk, height - padding - 1.5 * hg - thk, padding + wg - 6 * thk, padding - thk, bh1, "BAFASketchBH1");

            // BH2
            dimLeftV(padding + wg - 6 * thk, height - padding, padding + wg - 6 * thk, height - padding - 1.5 * hg - thk, bh2, "BAFASketchBH2");
        }

        currentTabIndex = bafad2d3.tabs('getTabIndex', bafad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bafa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bafa").length > 0) {
                    bafa2d();
                }
            });
        }
        bafad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bafa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bafa").length > 0) {
                            bafa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 顶边加固、一道加固圈矩形容器",
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
                    $(ed.target).combobox("loadData", BAFA1Category);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAFA1Type);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAFA1STD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BAFA1Name);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAFA2Category);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAFA2Type);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAFA2STD);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAFA2Name);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAFAJCategory);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAFAJType);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BAFAJSTD);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", BAFAJName);
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
                    bafaSketch.empty();

                    // model
                    bafaModel.empty();

                    // sketch
                    currentTabIndex = bafad2d3.tabs('getTabIndex', bafad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafa2d();
                        bafaSketch.off("resize").on("resize", function () {
                            if ($("#bafa").length > 0) {
                                bafa2d();
                            }
                        });
                    }
                    bafad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafa2d();
                                bafaSketch.off("resize").on("resize", function () {
                                    if ($("#bafa").length > 0) {
                                        bafa2d();
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

                        BAFADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAFA1Category = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAFA1Type = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFA1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFA1Name = null;

                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAFA2Category = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAFA2Type = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFA2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFA2Name = null;

                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAFAJCategory = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAFAJType = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFAJSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFAJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFA1Category = [];
                                BAFA2Category = [];
                                BAFAJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAFADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAFA1Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFA2Category[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAFAJCategory[index] = {
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

                        BAFA1CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAFA1Type = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFA1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFA1Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFA1CategoryVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFA1Type = [];
                                $(result).each(function (index, element) {
                                    BAFA1Type[index] = {
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

                        BAFA1TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAFA1STD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFA1Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFA1CategoryVal,
                                type: BAFA1TypeVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFA1STD = [];
                                $(result).each(function (index, element) {
                                    BAFA1STD[index] = {
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

                        BAFA1STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BAFA1Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFA1CategoryVal,
                                type: BAFA1TypeVal,
                                std: BAFA1STDVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFA1Name = [];
                                $(result).each(function (index, element) {
                                    BAFA1Name[index] = {
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

                        BAFA2CategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAFA2Type = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFA2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFA2Name = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFA2CategoryVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFA2Type = [];
                                $(result).each(function (index, element) {
                                    BAFA2Type[index] = {
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

                        BAFA2TypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAFA2STD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFA2Name = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFA2CategoryVal,
                                type: BAFA2TypeVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFA2STD = [];
                                $(result).each(function (index, element) {
                                    BAFA2STD[index] = {
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

                        BAFA2STDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAFA2Name = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFA2CategoryVal,
                                type: BAFA2TypeVal,
                                std: BAFA2STDVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFA2Name = [];
                                $(result).each(function (index, element) {
                                    BAFA2Name[index] = {
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

                        BAFAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAFAJType = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFAJSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFAJCategoryVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFAJType = [];
                                $(result).each(function (index, element) {
                                    BAFAJType[index] = {
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

                        BAFAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BAFAJSTD = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFAJCategoryVal,
                                type: BAFAJTypeVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFAJSTD = [];
                                $(result).each(function (index, element) {
                                    BAFAJSTD[index] = {
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

                        BAFAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BAFAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAFAJCategoryVal,
                                type: BAFAJTypeVal,
                                std: BAFAJSTDVal,
                                temp: BAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAFAJName = [];
                                $(result).each(function (index, element) {
                                    BAFAJName[index] = {
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
                    let BAFAD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAFAD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // L
                    let BAFAL;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAFAL = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafa2d(BAFAL);
                        bafaSketch.off("resize").on("resize", function () {
                            if ($("#bafa").length > 0) {
                                bafa2d(BAFAL);
                            }
                        });
                    }
                    bafad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafa2d(BAFAL);
                                bafaSketch.off("resize").on("resize", function () {
                                    if ($("#bafa").length > 0) {
                                        bafa2d(BAFAL);
                                    }
                                });
                            }
                        }
                    });

                    // H
                    let BAFABH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) >= Math.max(0.1 / 0.6 * BAFAL, 0.1 / 0.4 * BAFAL)
                        && parseFloat(rows[3][columns[0][1].field]) <= Math.min(5 / 0.6 * BAFAL, 5 / 0.4 * BAFAL)) {
                        BAFABH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) < Math.max(0.1 / 0.6 * BAFAL, 0.1 / 0.4 * BAFAL)) {
                        south.html("容器高度 H 不能小于 " + Math.max(0.1 / 0.6 * BAFAL, 0.1 / 0.4 * BAFAL).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > Math.min(5 / 0.6 * BAFAL, 5 / 0.4 * BAFAL)) {
                        south.html("容器高度 H 不能大于 " + Math.min(5 / 0.6 * BAFAL, 5 / 0.4 * BAFAL).toFixed(2) + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        bafa2d(BAFAL, BAFABH, (0.6 * BAFABH).toFixed(2), (0.4 * BAFABH).toFixed(2));
                        bafaSketch.off("resize").on("resize", function () {
                            if ($("#bafa").length > 0) {
                                bafa2d(BAFAL, BAFABH, (0.6 * BAFABH).toFixed(2), (0.4 * BAFABH).toFixed(2));
                            }
                        });
                    }
                    bafad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bafa2d(BAFAL, BAFABH, (0.6 * BAFABH).toFixed(2), (0.4 * BAFABH).toFixed(2));
                                bafaSketch.off("resize").on("resize", function () {
                                    if ($("#bafa").length > 0) {
                                        bafa2d(BAFAL, BAFABH, (0.6 * BAFABH).toFixed(2), (0.4 * BAFABH).toFixed(2));
                                    }
                                });
                            }
                        }
                    });

                    // 第一段壁板材料名称
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        BAFA1NameVal = rows[7][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAFAD1, BAFA1ThkMin, BAFA1ThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAFA1CategoryVal,
                            "type": BAFA1TypeVal,
                            "std": BAFA1STDVal,
                            "name": BAFA1NameVal,
                            "temp": BAFADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAFAD1 = parseFloat(result.density);
                            BAFA1ThkMin = parseFloat(result.thkMin);
                            BAFA1ThkMax = parseFloat(result.thkMax);

                            // 第一层壁板腐蚀裕量 C12
                            let BAFAC12;
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) < BAFA1ThkMax) {
                                BAFAC12 = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) >= BAFA1ThkMax) {
                                south.html("第一段壁板腐蚀裕量不能大于等于 " + BAFA1ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 第一段壁板名义厚度
                            let BAFATHK1N;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > Math.max(BAFAC12, BAFA1ThkMin)
                                && parseFloat(rows[9][columns[0][1].field]) <= BAFA1ThkMax) {
                                BAFATHK1N = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) <= Math.max(BAFAC12, BAFA1ThkMin)) {
                                south.html("第一段壁板名义厚度不能小于等于 " + Math.max(BAFAC12, BAFA1ThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                && parseFloat(rows[9][columns[0][1].field]) > BAFA1ThkMax) {
                                south.html("第一段壁板名义厚度不能大于 " + BAFA1ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 O1T E1T C11
                            let BAFAO1T, BAFAE1T, BAFAC11;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAFA1CategoryVal,
                                    "type": BAFA1TypeVal,
                                    "std": BAFA1STDVal,
                                    "name": BAFA1NameVal,
                                    "thk": BAFATHK1N,
                                    "temp": BAFADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAFAO1T = parseFloat(result.ot);
                                    if (BAFAO1T < 0) {
                                        south.html("查询第一段壁板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAFAE1T = 1000 * parseFloat(result.et);
                                    if (BAFAE1T < 0) {
                                        south.html("查询第一段壁板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }
                                    BAFAC11 = parseFloat(result.c1);
                                    if (BAFAC11 < 0) {
                                        south.html("查询第一段壁板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 第二段壁板材料名称
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                        BAFA2NameVal = rows[13][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取材料密度、最大最小厚度
                                    let BAFAD2, BAFA2ThkMin, BAFA2ThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAFA2CategoryVal,
                                            "type": BAFA2TypeVal,
                                            "std": BAFA2STDVal,
                                            "name": BAFA2NameVal,
                                            "temp": BAFADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAFAD2 = parseFloat(result.density);
                                            BAFA2ThkMin = parseFloat(result.thkMin);
                                            BAFA2ThkMax = parseFloat(result.thkMax);

                                            // 第二层壁板腐蚀裕量 C22
                                            let BAFAC22;
                                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) < BAFA2ThkMax) {
                                                BAFAC22 = parseFloat(rows[14][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                && parseFloat(rows[14][columns[0][1].field]) >= BAFA2ThkMax) {
                                                south.html("第二段壁板腐蚀裕量不能大于等于 " + BAFA2ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 第二段壁板名义厚度
                                            let BAFATHK2N;
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) > Math.max(BAFAC22, BAFA2ThkMin)
                                                && parseFloat(rows[15][columns[0][1].field]) <= BAFA2ThkMax) {
                                                BAFATHK2N = parseFloat(rows[15][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) <= Math.max(BAFAC22, BAFA2ThkMin)) {
                                                south.html("第二段壁板名义厚度不能小于等于 " + Math.max(BAFAC22, BAFA2ThkMin) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                && parseFloat(rows[15][columns[0][1].field]) > BAFA2ThkMax) {
                                                south.html("第二段壁板名义厚度不能大于 " + BAFA2ThkMax + " mm").css("color", "red");
                                            }
                                            else {
                                                return false;
                                            }

                                            // ajax 获取 O2T E2T C21
                                            let BAFAO2T, BAFAE2T, BAFAC21;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAFA2CategoryVal,
                                                    "type": BAFA2TypeVal,
                                                    "std": BAFA2STDVal,
                                                    "name": BAFA2NameVal,
                                                    "thk": BAFATHK2N,
                                                    "temp": BAFADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAFAO2T = parseFloat(result.ot);
                                                    if (BAFAO2T < 0) {
                                                        south.html("查询第二段壁板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAFAE2T = 1000 * parseFloat(result.et);
                                                    if (BAFAE2T < 0) {
                                                        south.html("查询第二段壁板材料弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BAFAC21 = parseFloat(result.c1);
                                                    if (BAFAC21 < 0) {
                                                        south.html("查询第二段壁板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 加固件材料名称
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                        BAFAJNameVal = rows[19][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // ajax 获取 EJT
                                                    let BAFAEJT;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAFAJCategoryVal,
                                                            "type": BAFAJTypeVal,
                                                            "std": BAFAJSTDVal,
                                                            "name": BAFAJNameVal,
                                                            "temp": BAFADT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAFAEJT = 1000 * parseFloat(result.et);
                                                            if (BAFAEJT < 0) {
                                                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // 过程参数
                                                            let BAFAG = 9.81;
                                                            let BAFABH1 = 0.6 * BAFABH;
                                                            let BAFAC1 = BAFAC11 + BAFAC12;
                                                            let BAFATHK1E = BAFATHK1N - BAFAC1;
                                                            let BAFABH1L = BAFABH1 / BAFAL;
                                                            let BAFABH2 = 0.4 * BAFABH;
                                                            let BAFAC2 = BAFAC21 + BAFAC22;
                                                            let BAFATHK2E = BAFATHK2N - BAFAC2;
                                                            let BAFABH2L = BAFABH2 / BAFAL;
                                                            let BAFASH1 = BAFABH1;
                                                            let BAFASH2 = BAFABH1 + BAFABH2;

                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "ba": BAFABH1L
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    let BAFAALPHA1 = parseFloat(result.alpha);
                                                                    let BAFABETA1 = parseFloat(result.beta);

                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "ba": BAFABH2L
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            let BAFAALPHA2 = parseFloat(result.alpha);
                                                                            let BAFABETA2 = parseFloat(result.beta);

                                                                            // 顶边加固件
                                                                            let BAFAI0 = 0.217 * BAFAD * BAFAG * BAFASH1 * BAFASH1 * BAFAL * BAFAL * BAFAL / BAFAEJT / 1000000000;
                                                                            south.html(
                                                                                "<span style='color:#444444;'>" +
                                                                                "顶边加固件所需最小惯性矩：" + BAFAI0.toFixed(2) + " mm⁴" +
                                                                                "</span>");

                                                                            // 第一段壁板
                                                                            let BAFATHK1C = BAFAL * Math.sqrt(3 * BAFAALPHA1 * BAFAD * BAFAG * BAFASH1 / BAFAO1T / 1000000000);
                                                                            let BAFATHK1D = BAFATHK1C + BAFAC12;
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "第一段壁板所需厚度：" + (BAFATHK1D + BAFAC11).toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            let BAFATHK1CHK;
                                                                            if (BAFATHK1N >= (BAFATHK1D + BAFAC11)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + BAFATHK1N + " mm" +
                                                                                    "</span>");
                                                                                BAFATHK1CHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + BAFATHK1N + " mm" +
                                                                                    "</span>");
                                                                                BAFATHK1CHK = "不合格";
                                                                            }

                                                                            let BAFAF1ALLOW = 5 * (BAFATHK1E / 2 + Math.sqrt(BAFABH1L) * BAFAL / 500);
                                                                            let BAFAF1MAX = BAFABETA1 * Math.pow(BAFAL, 4) * BAFAD * BAFAG * BAFASH1 / 1000000000 / (2 * BAFAE1T * Math.pow(BAFATHK1E, 3));
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "第一段壁板许用挠度：" + BAFAF1ALLOW.toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            let BAFAF1CHK;
                                                                            if (BAFAF1MAX <= BAFAF1ALLOW) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "实际挠度：" + BAFAF1MAX.toFixed(2) + " mm" +
                                                                                    "</span>");
                                                                                BAFAF1CHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "实际挠度：" + BAFAF1MAX.toFixed(2) + " mm" +
                                                                                    "</span>");
                                                                                BAFAF1CHK = "不合格";
                                                                            }

                                                                            // 第一道加固件
                                                                            let BAFAF1 = BAFAD * BAFAG * BAFASH2 * (BAFASH1 + BAFASH2) / 6 / 1000000000;
                                                                            let BAFAI1 = 1.3 * BAFAF1 * BAFAL * BAFAL * BAFAL / BAFAEJT;
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "第一道加固件所需最小惯性矩：" + BAFAI1.toFixed(2) + " mm⁴" +
                                                                                "</span>");

                                                                            // 第二段壁板
                                                                            let BAFATHK2C = BAFAL * Math.sqrt(6 * BAFAALPHA2 * BAFAD * BAFAG * (BAFASH1 + BAFASH2) / BAFAO2T / 1000000000);
                                                                            let BAFATHK2D = BAFATHK2C + BAFAC22;
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "第二段壁板所需厚度：" + (BAFATHK2D + BAFAC21).toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            let BAFATHK2CHK;
                                                                            if (BAFATHK2N >= (BAFATHK2D + BAFAC21)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + BAFATHK2N + " mm" +
                                                                                    "</span>");
                                                                                BAFATHK2CHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + BAFATHK2N + " mm" +
                                                                                    "</span>");
                                                                                BAFATHK2CHK = "不合格";
                                                                            }

                                                                            let BAFAF2ALLOW = 5 * (BAFATHK2E / 2 + Math.sqrt(BAFABH2L) * BAFAL / 500);
                                                                            let BAFAF2MAX = BAFABETA2 * Math.pow(BAFAL, 4) * BAFAD * BAFAG * (BAFASH1 + BAFASH2) / 1000000000 / (2 * BAFAE2T * Math.pow(BAFATHK2E, 3));

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "第二段壁板许用挠度：" + BAFAF2ALLOW.toFixed(2) + " mm" +
                                                                                "</span>");
                                                                            let BAFAF2CHK;
                                                                            if (BAFAF2MAX <= BAFAF2ALLOW) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "实际挠度：" + BAFAF2MAX.toFixed(2) + " mm" +
                                                                                    "</span>");
                                                                                BAFAF2CHK = "合格";
                                                                            }
                                                                            else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "实际挠度：" + BAFAF2MAX.toFixed(2) + " mm" +
                                                                                    "</span>");
                                                                                BAFAF2CHK = "不合格";
                                                                            }

                                                                            // docx
                                                                            let BAFAPayJS = $('#payjs');

                                                                            function getDocx() {
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "bafadocx.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        ribbonName: "BAFA",

                                                                                        t: BAFADT,
                                                                                        d: BAFAD,
                                                                                        l: BAFAL,
                                                                                        h: BAFABH,
                                                                                        fstd: BAFA1STDVal,
                                                                                        fname: BAFA1NameVal,
                                                                                        c12: BAFAC12,
                                                                                        thk1n: BAFATHK1N,
                                                                                        sstd: BAFA2STDVal,
                                                                                        sname: BAFA2NameVal,
                                                                                        c22: BAFAC22,
                                                                                        thk2n: BAFATHK2N,
                                                                                        jstd: BAFAJSTDVal,
                                                                                        jname: BAFAJNameVal,
                                                                                        d1: BAFAD1.toFixed(4),
                                                                                        c11: BAFAC11.toFixed(4),
                                                                                        o1t: BAFAO1T.toFixed(4),
                                                                                        e1t: (BAFAE1T / 1000).toFixed(4),
                                                                                        d2: BAFAD2.toFixed(4),
                                                                                        c21: BAFAC21.toFixed(4),
                                                                                        o2t: BAFAO2T.toFixed(4),
                                                                                        e2t: (BAFAE2T / 1000).toFixed(4),
                                                                                        ejt: (BAFAEJT / 1000).toFixed(4),
                                                                                        g: BAFAG.toFixed(4),
                                                                                        bh1: BAFABH1.toFixed(4),
                                                                                        c1: BAFAC1.toFixed(4),
                                                                                        thk1e: BAFATHK1E.toFixed(4),
                                                                                        bh1l: BAFABH1L.toFixed(4),
                                                                                        alpha1: BAFAALPHA1.toFixed(8),
                                                                                        beta1: BAFABETA1.toFixed(8),
                                                                                        bh2: BAFABH2.toFixed(4),
                                                                                        c2: BAFAC2.toFixed(4),
                                                                                        thk2e: BAFATHK2E.toFixed(4),
                                                                                        bh2l: BAFABH2L.toFixed(4),
                                                                                        alpha2: BAFAALPHA2.toFixed(8),
                                                                                        beta2: BAFABETA2.toFixed(8),
                                                                                        sh1: BAFASH1.toFixed(4),
                                                                                        sh2: BAFASH2.toFixed(4),
                                                                                        i0: BAFAI0.toFixed(4),
                                                                                        f1: BAFAF1.toFixed(4),
                                                                                        i1: BAFAI1.toFixed(4),
                                                                                        thk1c: BAFATHK1C.toFixed(4),
                                                                                        thk1d: BAFATHK1D.toFixed(4),
                                                                                        thk1chk: BAFATHK1CHK,
                                                                                        f1allow: BAFAF1ALLOW.toFixed(4),
                                                                                        f1max: BAFAF1MAX.toFixed(4),
                                                                                        f1chk: BAFAF1CHK,
                                                                                        thk2c: BAFATHK2C.toFixed(4),
                                                                                        thk2d: BAFATHK2D.toFixed(4),
                                                                                        thk2chk: BAFATHK2CHK,
                                                                                        f2allow: BAFAF2ALLOW.toFixed(4),
                                                                                        f2max: BAFAF2MAX.toFixed(4),
                                                                                        f2chk: BAFAF2CHK
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
                                                                                            BAFAPayJS.dialog({
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
                                                                                                        BAFAPayJS.dialog("close");
                                                                                                        BAFAPayJS.dialog("clear");
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
                                                                                                                    BAFAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                            BAFAPayJS.dialog('close');
                                                                                                                            BAFAPayJS.dialog('clear');
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