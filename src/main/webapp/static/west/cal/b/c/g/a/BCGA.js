$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcgaSketch = $("#d2");
    let bcgaModel = $("#d3");
    let bcgad2d3 = $('#d2d3');

    $("#cal").html("<table id='bcga'></table>");
    let pg = $("#bcga");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/g/a/BCGA.json", function (result) {

        let BCGADT,
            BCGAPCategory, BCGAPCategoryVal, BCGAPType, BCGAPTypeVal, BCGAPSTD, BCGAPSTDVal, BCGAPName, BCGAPNameVal,
            columns, rows, ed;

        function bcga2d(thkpn = "δpn") {

            bcgaSketch.empty();

            let width = bcgaSketch.width();
            let height = bcgaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCGASVG").attr("height", height);

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
            drawLine(width - padding - wg, padding - thk, width - padding - wg, height - padding);
            drawLine(width - padding - wg + thk, padding, width - padding - wg + thk, height - padding);
            drawLine(width - padding - wg, padding, width - padding - wg + thk, padding);
            drawLine(width - padding - wg + thk, padding, width - padding - wg, padding - thk);

            // THKPN
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
            ])).attr("id", "BCGASketchTHKPN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCGASketchTHKPN").attr("startOffset", "50%")
                .text(thkpn);
        }

        currentTabIndex = bcgad2d3.tabs('getTabIndex', bcgad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcga2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcga").length > 0) {
                    bcga2d();
                }
            });
        }
        bcgad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcga2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcga").length > 0) {
                            bcga2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 非圆形平盖计算(序号5)",
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
                    $(ed.target).combobox("loadData", BCGAPCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCGAPType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCGAPSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCGAPName);
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
                    bcgaSketch.empty();

                    // model
                    bcgaModel.empty();

                    // sketch
                    currentTabIndex = bcgad2d3.tabs('getTabIndex', bcgad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcga2d();
                        bcgaSketch.off("resize").on("resize", function () {
                            if ($("#bcga").length > 0) {
                                bcga2d();
                            }
                        });
                    }
                    bcgad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcga2d();
                                bcgaSketch.off("resize").on("resize", function () {
                                    if ($("#bcga").length > 0) {
                                        bcga2d();
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

                        BCGADT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCGAPCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCGAPType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCGAPSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCGAPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCGAPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCGADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCGAPCategory[index] = {
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

                        BCGAPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCGAPType = null;

                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCGAPSTD = null;

                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCGAPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCGAPCategoryVal,
                                temp: BCGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCGAPType = [];
                                $(result).each(function (index, element) {
                                    BCGAPType[index] = {
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

                        BCGAPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCGAPSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCGAPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCGAPCategoryVal,
                                type: BCGAPTypeVal,
                                temp: BCGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCGAPSTD = [];
                                $(result).each(function (index, element) {
                                    BCGAPSTD[index] = {
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

                        BCGAPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCGAPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCGAPCategoryVal,
                                type: BCGAPTypeVal,
                                std: BCGAPSTDVal,
                                temp: BCGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCGAPName = [];
                                $(result).each(function (index, element) {
                                    BCGAPName[index] = {
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
                        let BCGAPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCGAPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCGAPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCGAPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCGATest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCGATest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCGAPNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCGAPDensity, BCGAPThkMin, BCGAPThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCGAPCategoryVal,
                                    "type": BCGAPTypeVal,
                                    "std": BCGAPSTDVal,
                                    "name": BCGAPNameVal,
                                    "temp": BCGADT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCGAPDensity = parseFloat(result.density);
                                    BCGAPThkMin = parseFloat(result.thkMin);
                                    BCGAPThkMax = parseFloat(result.thkMax);

                                    // 平盖名义厚度 thkpn
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) > BCGAPThkMin
                                        && parseFloat(rows[8][columns[0][1].field]) <= BCGAPThkMax) {
                                        let BCGATHKPN = parseFloat(rows[8][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            bcga2d(BCGATHKPN);
                                            bcgaSketch.off("resize").on("resize", function () {
                                                if ($("#bcga").length > 0) {
                                                    bcga2d(BCGATHKPN);
                                                }
                                            });
                                        }
                                        bcgad2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    bcga2d(BCGATHKPN);
                                                    bcgaSketch.off("resize").on("resize", function () {
                                                        if ($("#bcga").length > 0) {
                                                            bcga2d(BCGATHKPN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                        let BCGAOPT, BCGAOP, BCGARPEL, BCGACP1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCGAPCategoryVal,
                                                "type": BCGAPTypeVal,
                                                "std": BCGAPSTDVal,
                                                "name": BCGAPNameVal,
                                                "thk": BCGATHKPN,
                                                "temp": BCGADT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": 100000
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCGAOPT = parseFloat(result.ot);
                                                if (BCGAOPT < 0) {
                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCGAOP = parseFloat(result.o);
                                                if (BCGAOP < 0) {
                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCGARPEL = parseFloat(result.rel);
                                                if (BCGARPEL < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCGACP1 = parseFloat(result.c1);
                                                if (BCGACP1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 平盖腐蚀裕量
                                                let BCGACP2;
                                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                    && parseFloat(rows[9][columns[0][1].field]) < BCGATHKPN) {
                                                    BCGACP2 = parseFloat(rows[9][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                    && parseFloat(rows[9][columns[0][1].field]) >= BCGATHKPN) {
                                                    south.html("平盖腐蚀裕量不能大于等于 " + BCGATHKPN + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 平盖焊接接头系数
                                                let BCGAEP;
                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                    BCGAEP = parseFloat(rows[10][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 平盖短轴长度 a
                                                let BCGAA;
                                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                    BCGAA = parseFloat(rows[11][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 平盖长轴长度 b
                                                let BCGAB;
                                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                    && parseFloat(rows[12][columns[0][1].field]) >= BCGAA) {
                                                    BCGAB = parseFloat(rows[12][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                    && parseFloat(rows[12][columns[0][1].field]) < BCGAA) {
                                                    south.html("平盖长轴长度 b 不能小于 " + BCGAA + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 计算压力
                                                let BCGAPC = BCGAPD + BCGAPS;
                                                let BCGAKP = 0.44;

                                                // 平盖
                                                let BCGACP = BCGACP1 + BCGACP2;
                                                let BCGATHKPE = BCGATHKPN - BCGACP;
                                                let BCGAZP = Math.min(3.4 - 2.4 * BCGAA / BCGAB, 2.5);
                                                let BCGATHKPC = BCGAA * Math.sqrt(BCGAKP * BCGAZP * BCGAPC / (BCGAOPT * BCGAEP));

                                                // 设计厚度
                                                let BCGATHKPD = BCGATHKPC + BCGACP2;

                                                // 所需厚度提示信息
                                                south.html(
                                                    "<span style='color:#444444;'>" +
                                                    "平盖所需厚度：" + (BCGATHKPD + BCGACP1).toFixed(2) + " mm" +
                                                    "</span>");

                                                // 平盖厚度校核
                                                let BCGATHKPCHK;
                                                if (BCGATHKPN >= (BCGATHKPD + BCGACP1).toFixed(2)) {
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + BCGATHKPN + " mm" +
                                                        "</span>");
                                                    BCGATHKPCHK = "合格";
                                                }
                                                else {
                                                    south.append(
                                                        "<span style='color:red;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + BCGATHKPN + " mm" +
                                                        "</span>");
                                                    BCGATHKPCHK = "不合格";
                                                }

                                                // 压力试验
                                                let BCGATestPT;
                                                if (BCGATest === "液压试验") {
                                                    BCGATestPT = Math.max(1.25 * BCGAPD * BCGAOP / BCGAOPT, 0.05);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：液压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + BCGATestPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }
                                                else if (BCGATest === "气压试验") {
                                                    BCGATestPT = Math.max(1.10 * BCGAPD * BCGAOP / BCGAOPT, 0.05);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：气压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + BCGATestPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }

                                                // MAWP
                                                let BCGAMAWP = BCGATHKPE * BCGATHKPE * BCGAOPT * BCGAEP / (BCGAKP * BCGAZP * BCGAA * BCGAA) - BCGAPS;
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "MAWP：" + BCGAMAWP.toFixed(4) + " MPa" +
                                                    "</span>");

                                                // docx
                                                let BCGAPayJS = $('#payjs');

                                                function getDocx() {
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "bcgadocx.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            ribbonName: "BCGA",

                                                            t: BCGADT,
                                                            pd: BCGAPD,
                                                            ps: BCGAPS,

                                                            stdp: BCGAPSTDVal,
                                                            namep: BCGAPNameVal,
                                                            thkpn: BCGATHKPN,
                                                            cp2: BCGACP2,
                                                            ep: BCGAEP,
                                                            a: BCGAA,
                                                            b: BCGAB,

                                                            test: BCGATest,

                                                            dp: BCGAPDensity.toFixed(4),
                                                            rpel: BCGARPEL.toFixed(4),
                                                            cp1: BCGACP1.toFixed(4),
                                                            opt: BCGAOPT.toFixed(4),
                                                            op: BCGAOP.toFixed(4),

                                                            pc: BCGAPC.toFixed(4),
                                                            kp: BCGAKP.toFixed(4),

                                                            cp: BCGACP.toFixed(4),
                                                            thkpe: BCGATHKPE.toFixed(4),
                                                            zp: BCGAZP.toFixed(4),
                                                            thkpc: BCGATHKPC.toFixed(4),
                                                            thkpd: BCGATHKPD.toFixed(4),
                                                            thkpchk: BCGATHKPCHK,

                                                            pt: BCGATestPT.toFixed(4),
                                                            mawp: BCGAMAWP.toFixed(4)
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
                                                                BCGAPayJS.dialog({
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
                                                                            BCGAPayJS.dialog("close");
                                                                            BCGAPayJS.dialog("clear");
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
                                                                                        BCGAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                        // 倒计时计数器
                                                                                        let maxTime = 4, timer;

                                                                                        function CountDown() {
                                                                                            if (maxTime >= 0) {
                                                                                                $("#payjs_timer").html(maxTime);
                                                                                                --maxTime;
                                                                                            } else {

                                                                                                clearInterval(timer);
                                                                                                // 关闭并清空收银台
                                                                                                BCGAPayJS.dialog('close');
                                                                                                BCGAPayJS.dialog('clear');
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
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) <= BCGAPThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCGAPThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) > BCGAPThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCGAPThkMax + " mm").css("color", "red");
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