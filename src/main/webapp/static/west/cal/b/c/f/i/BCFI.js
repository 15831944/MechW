$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfiSketch = $("#d2");
    let bcfiModel = $("#d3");
    let bcfid2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfi'></table>");
    let pg = $("#bcfi");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/i/BCFI.json", function (result) {

        let BCFIDT,
            BCFISCategory, BCFISCategoryVal, BCFISType, BCFISTypeVal, BCFISSTD, BCFISSTDVal, BCFISName, BCFISNameVal,
            BCFIPCategory, BCFIPCategoryVal, BCFIPType, BCFIPTypeVal, BCFIPSTD, BCFIPSTDVal, BCFIPName, BCFIPNameVal,
            columns, rows, ed;

        function bcfi2d(di = "ϕDi", thksn = "δsn", thkpn = "δpn") {

            bcfiSketch.empty();

            let width = bcfiSketch.width();
            let height = bcfiSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFISVG").attr("height", height);

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
            let padding = 80;
            let thk = 10;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

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

            // 顶部水平标注
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
                ]))
                    .attr("id", id).classed("sketch", true);
                svg.append("g").append("text").attr("x", 0)
                    .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id)
                    .attr("startOffset", "50%").text(text);

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
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%")
                    .text(text);

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

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            // sketch
            drawLine(padding + wg - thk, padding, padding + wg - thk, height - padding);
            drawLine(padding + wg, padding, padding + wg, height - padding);
            drawLine(width - padding - wg, padding, width - padding - wg, height - padding);
            drawLine(width - padding - wg + thk, padding, width - padding - wg + thk, height - padding);
            drawLine(padding + wg - thk, height - padding, width - padding - wg + thk, height - padding);
            drawLine(padding + wg - thk, padding, width - padding - wg + thk, padding);
            drawCenterLine(width / 2, padding - 10, width / 2, height - padding + 10);

            drawLine(padding + wg, padding + 2 * thk, width - padding - wg, padding + 2 * thk);
            drawLine(padding + wg, padding + 6 * thk, width - padding - wg, padding + 6 * thk);

            drawLine(padding + wg, padding + thk, padding + wg + thk, padding + 2 * thk);
            drawLine(padding + wg + thk, padding + 6 * thk, padding + wg, padding + 7 * thk);
            drawLine(width - padding - wg, padding + thk, width - padding - wg - thk, padding + 2 * thk);
            drawLine(width - padding - wg, padding + 7 * thk, width - padding - wg - thk, padding + 6 * thk);

            // dsi
            dimBottomH(padding + wg, height - padding, width - padding - wg, height - padding, di, "BCFISketchDI");

            // THKSN
            extLineBottomV(width - padding - wg + thk, height - padding);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - wg + thk, y: height - padding + 30},
                    {x: width - padding - wg + thk + 15, y: height - padding + 27},
                    {x: width - padding - wg + thk + 15, y: height - padding + 33},
                    {x: width - padding - wg + thk, y: height - padding + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width - padding - wg, y: height - padding + 30},
                {x: width - padding - wg + thk, y: height - padding + 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - padding - wg + thk + 15, y: height - padding + 30},
                {x: width - padding - wg + thk + 15 + 40, y: height - padding + 30}
            ])).attr("id", "BCFISketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFISketchTHKSN").attr("startOffset", "50%")
                .text(thksn);

            // THKPN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + 6 * thk},
                    {x: padding + 2.5 * wg - 3, y: padding + 6 * thk + 15},
                    {x: padding + 2.5 * wg + 3, y: padding + 6 * thk + 15},
                    {x: padding + 2.5 * wg, y: padding + 6 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + 2 * thk},
                    {x: padding + 2.5 * wg - 3, y: padding + 2 * thk - 15},
                    {x: padding + 2.5 * wg + 3, y: padding + 2 * thk - 15},
                    {x: padding + 2.5 * wg, y: padding + 2 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: padding + 2 * thk - 15 - 10},
                {x: padding + 2.5 * wg, y: padding + 6 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: padding + 6 * thk + 15 + 50},
                {x: padding + 2.5 * wg, y: padding + 6 * thk + 15}
            ])).attr("id", "BCFISketchTHKPN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFISketchTHKPN").attr("startOffset", "50%")
                .text(thkpn);
        }

        currentTabIndex = bcfid2d3.tabs('getTabIndex', bcfid2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfi2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfi").length > 0) {
                    bcfi2d();
                }
            });
        }
        bcfid2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfi2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfi").length > 0) {
                            bcfi2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号9圆形平盖计算",
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
                    $(ed.target).combobox("loadData", BCFISCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFISType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFISSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFISName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFIPCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFIPType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFIPSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFIPName);
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
                    bcfiSketch.empty();

                    // model
                    bcfiModel.empty();

                    // sketch
                    currentTabIndex = bcfid2d3.tabs('getTabIndex', bcfid2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcfi2d();
                        bcfiSketch.off("resize").on("resize", function () {
                            if ($("#bcfi").length > 0) {
                                bcfi2d();
                            }
                        });
                    }
                    bcfid2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfi2d();
                                bcfiSketch.off("resize").on("resize", function () {
                                    if ($("#bcfi").length > 0) {
                                        bcfi2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // 温度改变，重新加载 category
                    if (index === 1) {

                        BCFIDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFISCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFISType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFISSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFISName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFIPCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFIPType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFIPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFIPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFISCategory = [];
                                BCFIPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFIDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFISCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFIPCategory[index] = {
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

                    // category 改变，重新加载type
                    else if (index === 4) {

                        BCFISCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFISType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFISSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFISName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFISCategoryVal,
                                temp: BCFIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFISType = [];
                                $(result).each(function (index, element) {
                                    BCFISType[index] = {
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

                    // type 改变，重新加载 std
                    else if (index === 5) {

                        BCFISTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFISSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFISName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFISCategoryVal,
                                type: BCFISTypeVal,
                                temp: BCFIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFISSTD = [];
                                $(result).each(function (index, element) {
                                    BCFISSTD[index] = {
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

                    // std 改变，重新加载 Name
                    else if (index === 6) {

                        BCFISSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFISName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFISCategoryVal,
                                type: BCFISTypeVal,
                                std: BCFISSTDVal,
                                temp: BCFIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFISName = [];
                                $(result).each(function (index, element) {
                                    BCFISName[index] = {
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

                    // category 改变，重新加载type
                    else if (index === 12) {

                        BCFIPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFIPType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFIPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFIPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFIPCategoryVal,
                                temp: BCFIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFIPType = [];
                                $(result).each(function (index, element) {
                                    BCFIPType[index] = {
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

                    // type 改变，重新加载 std
                    else if (index === 13) {

                        BCFIPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFIPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFIPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFIPCategoryVal,
                                type: BCFIPTypeVal,
                                temp: BCFIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFIPSTD = [];
                                $(result).each(function (index, element) {
                                    BCFIPSTD[index] = {
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

                    // std 改变，重新加载 Name
                    else if (index === 14) {

                        BCFIPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFIPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFIPCategoryVal,
                                type: BCFIPTypeVal,
                                std: BCFIPSTDVal,
                                temp: BCFIDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFIPName = [];
                                $(result).each(function (index, element) {
                                    BCFIPName[index] = {
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

                    // name 及其他修改项改变，获取数据，并计算
                    else {

                        // pd
                        let BCFIPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFIPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFIPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFIPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFITest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFITest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 筒体材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFISNameVal = rows[7][columns[0][1].field];

                            // 筒体材料密度、最大最小厚度
                            let BCFISDensity, BCFISThkMin, BCFISThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFISCategoryVal,
                                    "type": BCFISTypeVal,
                                    "std": BCFISSTDVal,
                                    "name": BCFISNameVal,
                                    "temp": BCFIDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFISDensity = parseFloat(result.density);
                                    BCFISThkMin = parseFloat(result.thkMin);
                                    BCFISThkMax = parseFloat(result.thkMax);

                                    // 筒体内直径
                                    let BCFISDI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFISDI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfi2d("ϕ" + BCFISDI);
                                        bcfiSketch.off("resize").on("resize", function () {
                                            if ($("#bcfi").length > 0) {
                                                bcfi2d("ϕ" + BCFISDI);
                                            }
                                        });
                                    }
                                    bcfid2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfi2d("ϕ" + BCFISDI);
                                                bcfiSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfi").length > 0) {
                                                        bcfi2d("ϕ" + BCFISDI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 筒体名义厚度 thksn
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFISThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFISThkMax) {
                                        let BCFITHKSN = parseFloat(rows[9][columns[0][1].field]);

                                        // init Sketch
                                        if (currentTabIndex === 0) {
                                            bcfi2d("ϕ" + BCFISDI, BCFITHKSN);
                                            bcfiSketch.off("resize").on("resize", function () {
                                                if ($("#bcfi").length > 0) {
                                                    bcfi2d("ϕ" + BCFISDI, BCFITHKSN);
                                                }
                                            });
                                        }
                                        bcfid2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    bcfi2d("ϕ" + BCFISDI, BCFITHKSN);
                                                    bcfiSketch.off("resize").on("resize", function () {
                                                        if ($("#bcfi").length > 0) {
                                                            bcfi2d("ϕ" + BCFISDI, BCFITHKSN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 筒体外直径
                                        let BCFISDO = BCFISDI + 2 * BCFITHKSN;

                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                        let BCFIOST, BCFIOS, BCFIRSEL, BCFICS1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCFISCategoryVal,
                                                "type": BCFISTypeVal,
                                                "std": BCFISSTDVal,
                                                "name": BCFISNameVal,
                                                "thk": BCFITHKSN,
                                                "temp": BCFIDT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": BCFISDO
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCFIOST = parseFloat(result.ot);
                                                if (BCFIOST < 0) {
                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFIOS = parseFloat(result.o);
                                                if (BCFIOS < 0) {
                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFIRSEL = parseFloat(result.rel);
                                                if (BCFIRSEL < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFICS1 = parseFloat(result.c1);
                                                if (BCFICS1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 筒体腐蚀裕量
                                                let BCFICS2;
                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) < BCFITHKSN) {
                                                    BCFICS2 = parseFloat(rows[10][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCFITHKSN) {
                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCFITHKSN + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 筒体焊接接头系数
                                                let BCFIES;
                                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                    BCFIES = parseFloat(rows[11][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 平盖材料名称
                                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                    BCFIPNameVal = rows[15][columns[0][1].field];

                                                    // 平盖材料密度、最大最小厚度
                                                    let BCFIPDensity, BCFIPThkMin, BCFIPThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BCFIPCategoryVal,
                                                            "type": BCFIPTypeVal,
                                                            "std": BCFIPSTDVal,
                                                            "name": BCFIPNameVal,
                                                            "temp": BCFIDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BCFIPDensity = parseFloat(result.density);
                                                            BCFIPThkMin = parseFloat(result.thkMin);
                                                            BCFIPThkMax = parseFloat(result.thkMax);

                                                            // 平盖名义厚度 thkpn
                                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                && parseFloat(rows[16][columns[0][1].field]) > BCFIPThkMin
                                                                && parseFloat(rows[16][columns[0][1].field]) <= BCFIPThkMax) {
                                                                let BCFITHKPN = parseFloat(rows[16][columns[0][1].field]);

                                                                // init Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfi2d("ϕ" + BCFISDI, BCFITHKSN, BCFITHKPN);
                                                                    bcfiSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfi").length > 0) {
                                                                            bcfi2d("ϕ" + BCFISDI, BCFITHKSN, BCFITHKPN);
                                                                        }
                                                                    });
                                                                }
                                                                bcfid2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfi2d("ϕ" + BCFISDI, BCFITHKSN, BCFITHKPN);
                                                                            bcfiSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfi").length > 0) {
                                                                                    bcfi2d("ϕ" + BCFISDI, BCFITHKSN, BCFITHKPN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                                let BCFIOPT, BCFIOP, BCFIRPEL, BCFICP1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": BCFIPCategoryVal,
                                                                        "type": BCFIPTypeVal,
                                                                        "std": BCFIPSTDVal,
                                                                        "name": BCFIPNameVal,
                                                                        "thk": BCFITHKPN,
                                                                        "temp": BCFIDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": 100000
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        BCFIOPT = parseFloat(result.ot);
                                                                        if (BCFIOPT < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFIOP = parseFloat(result.o);
                                                                        if (BCFIOP < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFIRPEL = parseFloat(result.rel);
                                                                        if (BCFIRPEL < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFICP1 = parseFloat(result.c1);
                                                                        if (BCFICP1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 平盖腐蚀裕量
                                                                        let BCFICP2;
                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                            && parseFloat(rows[17][columns[0][1].field]) < BCFITHKPN) {
                                                                            BCFICP2 = parseFloat(rows[17][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                            && parseFloat(rows[17][columns[0][1].field]) >= BCFITHKPN) {
                                                                            south.html("平盖腐蚀裕量不能大于等于 " + BCFITHKPN + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 平盖焊接接头系数
                                                                        let BCFIEP;
                                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                            BCFIEP = parseFloat(rows[18][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 计算压力
                                                                        let BCFIPC = BCFIPD + BCFIPS;

                                                                        // 筒体
                                                                        let BCFICS = BCFICS1 + BCFICS2;
                                                                        let BCFITHKSE = BCFITHKSN - BCFICS;
                                                                        let BCFIDC = BCFISDI + 2 * BCFICS2;
                                                                        let BCFITHKSC = BCFIPC * BCFIDC / (2 * BCFIOST * BCFIES);
                                                                        let BCFIKP = Math.max(0.2, 0.44 * BCFITHKSC / BCFITHKSE);

                                                                        // 平盖
                                                                        let BCFICP = BCFICP1 + BCFICP2;
                                                                        let BCFITHKPE = BCFITHKPN - BCFICP;
                                                                        let BCFITHKPC = BCFIDC * Math.sqrt(BCFIKP * BCFIPC / (BCFIOPT * BCFIEP));

                                                                        // 设计厚度
                                                                        let BCFITHKPD = BCFITHKPC + BCFICP2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "平盖所需厚度：" + (BCFITHKPD + BCFICP1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 平盖厚度校核
                                                                        let BCFITHKPCHK;
                                                                        if (BCFITHKPN >= (BCFITHKPD + BCFICP1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCFITHKPN + " mm" +
                                                                                "</span>");
                                                                            BCFITHKPCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCFITHKPN + " mm" +
                                                                                "</span>");
                                                                            BCFITHKPCHK = "不合格";
                                                                        }

                                                                        // 压力试验
                                                                        let BCFITestPT;
                                                                        if (BCFITest === "液压试验") {
                                                                            BCFITestPT = Math.max(1.25 * BCFIPD * BCFIOP / BCFIOPT, 0.05);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCFITestPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (BCFITest === "气压试验") {
                                                                            BCFITestPT = Math.max(1.10 * BCFIPD * BCFIOP / BCFIOPT, 0.05);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCFITestPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }

                                                                        // MAWP
                                                                        let BCFIMAWP = BCFITHKPE * BCFITHKPE * BCFIOPT * BCFIEP / (BCFIKP * BCFIDC * BCFIDC) - BCFIPS;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "MAWP：" + BCFIMAWP.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                        // docx
                                                                        let BCFIPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "bcfidocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "BCFI",

                                                                                    t: BCFIDT,
                                                                                    pd: BCFIPD,
                                                                                    ps: BCFIPS,
                                                                                    stds: BCFISSTDVal,
                                                                                    names: BCFISNameVal,
                                                                                    thksn: BCFITHKSN,
                                                                                    cs2: BCFICS2,
                                                                                    dsi: BCFISDI,
                                                                                    es: BCFIES,
                                                                                    stdp: BCFIPSTDVal,
                                                                                    namep: BCFIPNameVal,
                                                                                    thkpn: BCFITHKPN,
                                                                                    cp2: BCFICP2,
                                                                                    ep: BCFIEP,
                                                                                    test: BCFITest,
                                                                                    ds: BCFISDensity.toFixed(4),
                                                                                    rsel: BCFIRSEL.toFixed(4),
                                                                                    cs1: BCFICS1.toFixed(4),
                                                                                    ost: BCFIOST.toFixed(4),
                                                                                    os: BCFIOS.toFixed(4),
                                                                                    dp: BCFIPDensity.toFixed(4),
                                                                                    rpel: BCFIRPEL.toFixed(4),
                                                                                    cp1: BCFICP1.toFixed(4),
                                                                                    opt: BCFIOPT.toFixed(4),
                                                                                    op: BCFIOP.toFixed(4),
                                                                                    pc: BCFIPC.toFixed(4),
                                                                                    cs: BCFICS.toFixed(4),
                                                                                    thkse: BCFITHKSE.toFixed(4),
                                                                                    dc: BCFIDC.toFixed(4),
                                                                                    thksc: BCFITHKSC.toFixed(4),
                                                                                    kp: BCFIKP.toFixed(4),
                                                                                    cp: BCFICP.toFixed(4),
                                                                                    thkpe: BCFITHKPE.toFixed(4),
                                                                                    thkpc: BCFITHKPC.toFixed(4),
                                                                                    thkpd: BCFITHKPD.toFixed(4),
                                                                                    thkpchk: BCFITHKPCHK,
                                                                                    pt: BCFITestPT.toFixed(4),
                                                                                    mawp: BCFIMAWP.toFixed(4)
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
                                                                                        BCFIPayJS.dialog({
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
                                                                                                    BCFIPayJS.dialog("close");
                                                                                                    BCFIPayJS.dialog("clear");
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
                                                                                                                BCFIPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                        BCFIPayJS.dialog('close');
                                                                                                                        BCFIPayJS.dialog('clear');
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
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                && parseFloat(rows[16][columns[0][1].field]) <= BCFIPThkMin) {
                                                                south.html("平盖材料厚度不能小于等于 " + BCFIPThkMin + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                && parseFloat(rows[16][columns[0][1].field]) > BCFIPThkMax) {
                                                                south.html("平盖材料厚度不能大于 " + BCFIPThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }
                                                        },
                                                        error: function () {
                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                        }
                                                    });
                                                }
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFISThkMin) {
                                        south.html("筒体材料厚度不能小于等于 " + BCFISThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFISThkMax) {
                                        south.html("筒体材料厚度不能大于 " + BCFISThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                }
                            });
                        }
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        })
    });
});