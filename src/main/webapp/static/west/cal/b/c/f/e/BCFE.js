$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfeSketch = $("#d2");
    let bcfeModel = $("#d3");
    let bcfed2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfe'></table>");
    let pg = $("#bcfe");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/e/BCFE.json", function (result) {

        let BCFEDT,
            BCFESCategory, BCFESCategoryVal, BCFESType, BCFESTypeVal, BCFESSTD, BCFESSTDVal, BCFESName, BCFESNameVal,
            BCFEPCategory, BCFEPCategoryVal, BCFEPType, BCFEPTypeVal, BCFEPSTD, BCFEPSTDVal, BCFEPName, BCFEPNameVal,
            columns, rows, ed;

        function bcfe2d(di = "ϕDi", thksn = "δsn", thkpn = "δpn") {

            bcfeSketch.empty();

            let width = bcfeSketch.width();
            let height = bcfeSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFESVG").attr("height", height);

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
            drawLine(padding + wg, padding - thk, padding + wg, height - padding);
            drawLine(padding + wg - thk, height - padding, width - padding - wg + thk, height - padding);
            drawLine(padding + wg - thk, padding, padding + wg, padding);
            drawLine(padding + wg - thk, padding, padding + wg, padding - thk);
            drawLine(padding + wg, padding + 3 * thk, width - padding - wg, padding + 3 * thk);
            drawLine(padding + wg, padding - thk, width - padding - wg, padding - thk);
            drawCenterLine(width / 2, padding - thk - 10, width / 2, height - padding + 10);
            drawLine(width - padding - wg, padding - thk, width - padding - wg, height - padding);
            drawLine(width - padding - wg + thk, padding, width - padding - wg + thk, height - padding);
            drawLine(width - padding - wg, padding, width - padding - wg + thk, padding);
            drawLine(width - padding - wg + thk, padding, width - padding - wg, padding - thk);

            // dsi
            dimBottomH(padding + wg, height - padding, width - padding - wg, height - padding, di, "BCFESketchDI");

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
            ])).attr("id", "BCFESketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFESketchTHKSN").attr("startOffset", "50%")
                .text(thksn);

            // THKPN1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + 3 * thk},
                    {x: padding + 1.5 * wg - 3, y: padding + 3 * thk + 15},
                    {x: padding + 1.5 * wg + 3, y: padding + 3 * thk + 15},
                    {x: padding + 1.5 * wg, y: padding + 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding - thk},
                    {x: padding + 1.5 * wg - 3, y: padding - thk - 15},
                    {x: padding + 1.5 * wg + 3, y: padding - thk - 15},
                    {x: padding + 1.5 * wg, y: padding - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding - thk - 15 - 10},
                {x: padding + 1.5 * wg, y: padding + 3 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + 3 * thk + 15 + 50},
                {x: padding + 1.5 * wg, y: padding + 3 * thk + 15}
            ])).attr("id", "BCFESketchTHKPN1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFESketchTHKPN1").attr("startOffset", "50%")
                .text(thkpn);
        }

        currentTabIndex = bcfed2d3.tabs('getTabIndex', bcfed2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfe2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfe").length > 0) {
                    bcfe2d();
                }
            });
        }
        bcfed2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfe2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfe").length > 0) {
                            bcfe2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号5圆形平盖计算",
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
                    $(ed.target).combobox("loadData", BCFESCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFESType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFESSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFESName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFEPCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFEPType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFEPSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFEPName);
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
                    bcfeSketch.empty();

                    // model
                    bcfeModel.empty();

                    // sketch
                    currentTabIndex = bcfed2d3.tabs('getTabIndex', bcfed2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcfe2d();
                        bcfeSketch.off("resize").on("resize", function () {
                            if ($("#bcfe").length > 0) {
                                bcfe2d();
                            }
                        });
                    }
                    bcfed2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfe2d();
                                bcfeSketch.off("resize").on("resize", function () {
                                    if ($("#bcfe").length > 0) {
                                        bcfe2d();
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

                        BCFEDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFESCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFESType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFESSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFESName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFEPCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFEPType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFEPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFEPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFESCategory = [];
                                BCFEPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFEDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFESCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFEPCategory[index] = {
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

                        BCFESCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFESType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFESSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFESName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFESCategoryVal,
                                temp: BCFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFESType = [];
                                $(result).each(function (index, element) {
                                    BCFESType[index] = {
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

                        BCFESTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFESSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFESName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFESCategoryVal,
                                type: BCFESTypeVal,
                                temp: BCFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFESSTD = [];
                                $(result).each(function (index, element) {
                                    BCFESSTD[index] = {
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

                        BCFESSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFESName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFESCategoryVal,
                                type: BCFESTypeVal,
                                std: BCFESSTDVal,
                                temp: BCFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFESName = [];
                                $(result).each(function (index, element) {
                                    BCFESName[index] = {
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

                        BCFEPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFEPType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFEPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFEPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFEPCategoryVal,
                                temp: BCFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFEPType = [];
                                $(result).each(function (index, element) {
                                    BCFEPType[index] = {
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

                        BCFEPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFEPSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFEPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFEPCategoryVal,
                                type: BCFEPTypeVal,
                                temp: BCFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFEPSTD = [];
                                $(result).each(function (index, element) {
                                    BCFEPSTD[index] = {
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

                        BCFEPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFEPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFEPCategoryVal,
                                type: BCFEPTypeVal,
                                std: BCFEPSTDVal,
                                temp: BCFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFEPName = [];
                                $(result).each(function (index, element) {
                                    BCFEPName[index] = {
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
                        let BCFEPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFEPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFEPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFEPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFETest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFETest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 筒体材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFESNameVal = rows[7][columns[0][1].field];

                            // 筒体材料密度、最大最小厚度
                            let BCFESDensity, BCFESThkMin, BCFESThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFESCategoryVal,
                                    "type": BCFESTypeVal,
                                    "std": BCFESSTDVal,
                                    "name": BCFESNameVal,
                                    "temp": BCFEDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFESDensity = parseFloat(result.density);
                                    BCFESThkMin = parseFloat(result.thkMin);
                                    BCFESThkMax = parseFloat(result.thkMax);

                                    // 筒体内直径
                                    let BCFESDI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFESDI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfe2d("ϕ" + BCFESDI);
                                        bcfeSketch.off("resize").on("resize", function () {
                                            if ($("#bcfe").length > 0) {
                                                bcfe2d("ϕ" + BCFESDI);
                                            }
                                        });
                                    }
                                    bcfed2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfe2d("ϕ" + BCFESDI);
                                                bcfeSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfe").length > 0) {
                                                        bcfe2d("ϕ" + BCFESDI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 筒体名义厚度 thksn
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFESThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFESThkMax) {
                                        let BCFETHKSN = parseFloat(rows[9][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            bcfe2d("ϕ" + BCFESDI, BCFETHKSN);
                                            bcfeSketch.off("resize").on("resize", function () {
                                                if ($("#bcfe").length > 0) {
                                                    bcfe2d("ϕ" + BCFESDI, BCFETHKSN);
                                                }
                                            });
                                        }
                                        bcfed2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    bcfe2d("ϕ" + BCFESDI, BCFETHKSN);
                                                    bcfeSketch.off("resize").on("resize", function () {
                                                        if ($("#bcfe").length > 0) {
                                                            bcfe2d("ϕ" + BCFESDI, BCFETHKSN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 筒体外直径
                                        let BCFESDO = BCFESDI + 2 * BCFETHKSN;

                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                        let BCFEOST, BCFEOS, BCFERSEL, BCFECS1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCFESCategoryVal,
                                                "type": BCFESTypeVal,
                                                "std": BCFESSTDVal,
                                                "name": BCFESNameVal,
                                                "thk": BCFETHKSN,
                                                "temp": BCFEDT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": BCFESDO
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCFEOST = parseFloat(result.ot);
                                                if (BCFEOST < 0) {
                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFEOS = parseFloat(result.o);
                                                if (BCFEOS < 0) {
                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFERSEL = parseFloat(result.rel);
                                                if (BCFERSEL < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFECS1 = parseFloat(result.c1);
                                                if (BCFECS1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 筒体腐蚀裕量
                                                let BCFECS2;
                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) < BCFETHKSN) {
                                                    BCFECS2 = parseFloat(rows[10][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCFETHKSN) {
                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCFETHKSN + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 筒体焊接接头系数
                                                let BCFEES;
                                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                    BCFEES = parseFloat(rows[11][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 平盖材料名称
                                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                    BCFEPNameVal = rows[15][columns[0][1].field];

                                                    // 平盖材料密度、最大最小厚度
                                                    let BCFEPDensity, BCFEPThkMin, BCFEPThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BCFEPCategoryVal,
                                                            "type": BCFEPTypeVal,
                                                            "std": BCFEPSTDVal,
                                                            "name": BCFEPNameVal,
                                                            "temp": BCFEDT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BCFEPDensity = parseFloat(result.density);
                                                            BCFEPThkMin = parseFloat(result.thkMin);
                                                            BCFEPThkMax = parseFloat(result.thkMax);

                                                            // 平盖名义厚度 thkpn
                                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                && parseFloat(rows[16][columns[0][1].field]) > BCFEPThkMin
                                                                && parseFloat(rows[16][columns[0][1].field]) <= BCFEPThkMax) {
                                                                let BCFETHKPN = parseFloat(rows[16][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfe2d("ϕ" + BCFESDI, BCFETHKSN, BCFETHKPN);
                                                                    bcfeSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfe").length > 0) {
                                                                            bcfe2d("ϕ" + BCFESDI, BCFETHKSN, BCFETHKPN);
                                                                        }
                                                                    });
                                                                }
                                                                bcfed2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfe2d("ϕ" + BCFESDI, BCFETHKSN, BCFETHKPN);
                                                                            bcfeSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfe").length > 0) {
                                                                                    bcfe2d("ϕ" + BCFESDI, BCFETHKSN, BCFETHKPN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                                let BCFEOPT, BCFEOP, BCFERPEL, BCFECP1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": BCFEPCategoryVal,
                                                                        "type": BCFEPTypeVal,
                                                                        "std": BCFEPSTDVal,
                                                                        "name": BCFEPNameVal,
                                                                        "thk": BCFETHKPN,
                                                                        "temp": BCFEDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": 100000
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        BCFEOPT = parseFloat(result.ot);
                                                                        if (BCFEOPT < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFEOP = parseFloat(result.o);
                                                                        if (BCFEOP < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFERPEL = parseFloat(result.rel);
                                                                        if (BCFERPEL < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCFECP1 = parseFloat(result.c1);
                                                                        if (BCFECP1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 平盖腐蚀裕量
                                                                        let BCFECP2;
                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                            && parseFloat(rows[17][columns[0][1].field]) < BCFETHKPN) {
                                                                            BCFECP2 = parseFloat(rows[17][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                            && parseFloat(rows[17][columns[0][1].field]) >= BCFETHKPN) {
                                                                            south.html("平盖腐蚀裕量不能大于等于 " + BCFETHKPN + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 平盖焊接接头系数
                                                                        let BCFEEP;
                                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                            BCFEEP = parseFloat(rows[18][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 计算压力
                                                                        let BCFEPC = BCFEPD + BCFEPS;

                                                                        // 筒体
                                                                        let BCFECS = BCFECS1 + BCFECS2;
                                                                        let BCFETHKSE = BCFETHKSN - BCFECS;
                                                                        let BCFEDC = BCFESDI + 2 * BCFECS2;
                                                                        let BCFETHKSC = BCFEPC * BCFEDC / (2 * BCFEOST * BCFEES);
                                                                        let BCFEKP = Math.max(0.2, 0.44 * BCFETHKSC / BCFETHKSE);

                                                                        // 平盖
                                                                        let BCFECP = BCFECP1 + BCFECP2;
                                                                        let BCFETHKPE = BCFETHKPN - BCFECP;
                                                                        let BCFETHKPC = BCFEDC * Math.sqrt(BCFEKP * BCFEPC / (BCFEOPT * BCFEEP));

                                                                        // 设计厚度
                                                                        let BCFETHKPD = BCFETHKPC + BCFECP2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "平盖所需厚度：" + (BCFETHKPD + BCFECP1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 平盖厚度校核
                                                                        let BCFETHKPCHK;
                                                                        if (BCFETHKPN >= (BCFETHKPD + BCFECP1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCFETHKPN + " mm" +
                                                                                "</span>");
                                                                            BCFETHKPCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCFETHKPN + " mm" +
                                                                                "</span>");
                                                                            BCFETHKPCHK = "不合格";
                                                                        }

                                                                        // 压力试验
                                                                        let BCFETestPT;
                                                                        if (BCFETest === "液压试验") {
                                                                            BCFETestPT = Math.max(1.25 * BCFEPD * BCFEOP / BCFEOPT, 0.05);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCFETestPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (BCFETest === "气压试验") {
                                                                            BCFETestPT = Math.max(1.10 * BCFEPD * BCFEOP / BCFEOPT, 0.05);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCFETestPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }

                                                                        // MAWP
                                                                        let BCFEMAWP = BCFETHKPE * BCFETHKPE * BCFEOPT * BCFEEP / (BCFEKP * BCFEDC * BCFEDC) - BCFEPS;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "MAWP：" + BCFEMAWP.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                        // docx
                                                                        let BCFEPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "bcfedocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "BCFE",

                                                                                    t: BCFEDT,
                                                                                    pd: BCFEPD,
                                                                                    ps: BCFEPS,
                                                                                    stds: BCFESSTDVal,
                                                                                    names: BCFESNameVal,
                                                                                    thksn: BCFETHKSN,
                                                                                    cs2: BCFECS2,
                                                                                    dsi: BCFESDI,
                                                                                    es: BCFEES,
                                                                                    stdp: BCFEPSTDVal,
                                                                                    namep: BCFEPNameVal,
                                                                                    thkpn: BCFETHKPN,
                                                                                    cp2: BCFECP2,
                                                                                    ep: BCFEEP,
                                                                                    test: BCFETest,
                                                                                    ds: BCFESDensity.toFixed(4),
                                                                                    rsel: BCFERSEL.toFixed(4),
                                                                                    cs1: BCFECS1.toFixed(4),
                                                                                    ost: BCFEOST.toFixed(4),
                                                                                    os: BCFEOS.toFixed(4),
                                                                                    dp: BCFEPDensity.toFixed(4),
                                                                                    rpel: BCFERPEL.toFixed(4),
                                                                                    cp1: BCFECP1.toFixed(4),
                                                                                    opt: BCFEOPT.toFixed(4),
                                                                                    op: BCFEOP.toFixed(4),
                                                                                    pc: BCFEPC.toFixed(4),
                                                                                    cs: BCFECS.toFixed(4),
                                                                                    thkse: BCFETHKSE.toFixed(4),
                                                                                    dc: BCFEDC.toFixed(4),
                                                                                    thksc: BCFETHKSC.toFixed(4),
                                                                                    kp: BCFEKP.toFixed(4),
                                                                                    cp: BCFECP.toFixed(4),
                                                                                    thkpe: BCFETHKPE.toFixed(4),
                                                                                    thkpc: BCFETHKPC.toFixed(4),
                                                                                    thkpd: BCFETHKPD.toFixed(4),
                                                                                    thkpchk: BCFETHKPCHK,
                                                                                    pt: BCFETestPT.toFixed(4),
                                                                                    mawp: BCFEMAWP.toFixed(4)
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
                                                                                        BCFEPayJS.dialog({
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
                                                                                                    BCFEPayJS.dialog("close");
                                                                                                    BCFEPayJS.dialog("clear");
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
                                                                                                                BCFEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                        BCFEPayJS.dialog('close');
                                                                                                                        BCFEPayJS.dialog('clear');
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
                                                                && parseFloat(rows[16][columns[0][1].field]) <= BCFEPThkMin) {
                                                                south.html("平盖材料厚度不能小于等于 " + BCFEPThkMin + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                && parseFloat(rows[16][columns[0][1].field]) > BCFEPThkMax) {
                                                                south.html("平盖材料厚度不能大于 " + BCFEPThkMax + " mm").css("color", "red");
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
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFESThkMin) {
                                        south.html("筒体材料厚度不能小于等于 " + BCFESThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFESThkMax) {
                                        south.html("筒体材料厚度不能大于 " + BCFESThkMax + " mm").css("color", "red");
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