$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cagSketch = $("#d2");
    let cagModel = $("#d3");
    let cagd2d3 = $('#d2d3');

    $("#cal").html("<table id='cag'></table>");
    let pg = $("#cag");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/g/CAG.json", function (result) {

        let CAGDT,
            CAGCategory, CAGCategoryVal, CAGType, CAGTypeVal, CAGSTD, CAGSTDVal, CAGName,
            columns, rows, ed;

        function cag2d(di = "ϕDi", thkn = "δn") {

            cagSketch.empty();

            let width = cagSketch.width();
            let height = cagSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "CAGSVG").attr("height", height);

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
            let thickness = 10;

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
                svg.append("g").append("text")
                    .attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id)
                    .attr("startOffset", "50%").text(text);

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

            // 筒体壁
            drawLine(padding, padding, width - padding, padding);
            drawLine(padding, height - padding, width - padding, height - padding);
            drawLine(padding, padding, padding, height - padding);
            drawLine(padding + thickness, padding, padding + thickness, height - padding);
            drawLine(width - padding, padding, width - padding, height - padding);
            drawLine(width - padding - thickness, padding, width - padding - thickness, height - padding);
            drawCenterLine(width / 2, padding - 10, width / 2, height - padding + 10);

            // di
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + thickness, y: height / 2},
                    {x: padding + thickness + 15, y: height / 2 - 3},
                    {x: padding + thickness + 15, y: height / 2 + 3},
                    {x: padding + thickness, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - thickness, y: height / 2},
                    {x: width - padding - thickness - 15, y: height / 2 - 3},
                    {x: width - padding - thickness - 15, y: height / 2 + 3},
                    {x: width - padding - thickness, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + thickness + 15, y: height / 2},
                {x: width - padding - thickness - 15, y: height / 2}
            ])).attr("id", "CAGSketchDI").classed("sketch", true);
            svg.append("g").append("text")
                .attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAGSketchDI")
                .attr("startOffset", "50%").text(di);

            // thkn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding, y: height / 2},
                    {x: width - padding + 15, y: height / 2 - 3},
                    {x: width - padding + 15, y: height / 2 + 3},
                    {x: width - padding, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: width - padding, y: height / 2},
                {x: width - padding - thickness, y: height / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - padding + 15, y: height / 2},
                {x: width - padding + 15 + 40, y: height / 2}
            ])).attr("id", "CAGSketchTHKN").classed("sketch", true);
            svg.append("g").append("text")
                .attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAGSketchTHKN")
                .attr("startOffset", "50%").text(thkn);

            // Q
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + thickness / 2, y: padding},
                    {x: padding + thickness / 2 + 3, y: padding - 15},
                    {x: padding + thickness / 2 - 3, y: padding - 15},
                    {x: padding + thickness / 2, y: padding}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + thickness / 2, y: padding - 15},
                {x: padding + thickness / 2, y: padding - 15 - 10}
            ])).classed("sketch", true);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - thickness / 2, y: padding},
                    {x: width - padding - thickness / 2 + 3, y: padding - 15},
                    {x: width - padding - thickness / 2 - 3, y: padding - 15},
                    {x: width - padding - thickness / 2, y: padding}
                ]));
            svg.append("path").attr("d", line([
                {x: width - padding - thickness / 2, y: padding - 15},
                {x: width - padding - thickness / 2, y: padding - 15 - 10}
            ])).classed("sketch", true);

        }

        currentTabIndex = cagd2d3.tabs('getTabIndex', cagd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            cag2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#cag").length > 0) {
                    cag2d();
                }
            });
        }
        cagd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    cag2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#cag").length > 0) {
                            cag2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20569-2013 筒体轴向压缩稳定性校核",
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
                    $(ed.target).combobox("loadData", CAGCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", CAGType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", CAGSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CAGName);
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
                    cagSketch.empty();

                    // model
                    cagModel.empty();

                    // sketch
                    currentTabIndex = cagd2d3.tabs('getTabIndex', cagd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        cag2d();
                        cagSketch.off("resize").on("resize", function () {
                            if ($("#cag").length > 0) {
                                cag2d();
                            }
                        });
                    }
                    cagd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                cag2d();
                                cagSketch.off("resize").on("resize", function () {
                                    if ($("#cag").length > 0) {
                                        cag2d();
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
                    if (index === 0) {

                        CAGDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        CAGCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CAGType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAGSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAGName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CAGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CAGDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        CAGCategory[index] = {
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
                    else if (index === 2) {

                        CAGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CAGType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAGSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAGName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAGCategoryVal,
                                temp: CAGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAGType = [];
                                $(result).each(function (index, element) {
                                    CAGType[index] = {
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
                    else if (index === 3) {

                        CAGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAGSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAGName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAGCategoryVal,
                                type: CAGTypeVal,
                                temp: CAGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAGSTD = [];
                                $(result).each(function (index, element) {
                                    CAGSTD[index] = {
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
                    else if (index === 4) {

                        CAGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAGName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAGCategoryVal,
                                type: CAGTypeVal,
                                std: CAGSTDVal,
                                temp: CAGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAGName = [];
                                $(result).each(function (index, element) {
                                    CAGName[index] = {
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

                        // 腐蚀裕量
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let CAGC2 = parseFloat(rows[1][columns[0][1].field]);

                            // 材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                let CAGNameVal = rows[5][columns[0][1].field];

                                // AJAX 获取材料密度、最大最小厚度
                                let CAGDensity, CAGThkMin, CAGThkMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": CAGCategoryVal,
                                        "type": CAGTypeVal,
                                        "std": CAGSTDVal,
                                        "name": CAGNameVal,
                                        "temp": CAGDT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        CAGDensity = parseFloat(result.density);
                                        CAGThkMin = parseFloat(result.thkMin);
                                        CAGThkMax = parseFloat(result.thkMax);

                                        // 筒体内直径
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                            let CAGDI = parseFloat(rows[6][columns[0][1].field]);

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                cag2d("ϕ" + CAGDI);
                                                cagSketch.off("resize").on("resize", function () {
                                                    if ($("#cag").length > 0) {
                                                        cag2d("ϕ" + CAGDI);
                                                    }
                                                });
                                            }
                                            cagd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        cag2d("ϕ" + CAGDI);
                                                        cagSketch.off("resize").on("resize", function () {
                                                            if ($("#cag").length > 0) {
                                                                cag2d("ϕ" + CAGDI);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // 筒体名义厚度
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                && parseFloat(rows[7][columns[0][1].field]) > Math.max(CAGC2, CAGThkMin)
                                                && parseFloat(rows[7][columns[0][1].field]) <= CAGThkMax) {
                                                let CAGTHKN = parseFloat(rows[7][columns[0][1].field]);

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    cag2d("ϕ" + CAGDI, CAGTHKN);
                                                    cagSketch.off("resize").on("resize", function () {
                                                        if ($("#cag").length > 0) {
                                                            cag2d("ϕ" + CAGDI, CAGTHKN);
                                                        }
                                                    });
                                                }
                                                cagd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            cag2d("ϕ" + CAGDI, CAGTHKN);
                                                            cagSketch.off("resize").on("resize", function () {
                                                                if ($("#cag").length > 0) {
                                                                    cag2d("ϕ" + CAGDI, CAGTHKN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 外直径
                                                let CAGDO = CAGDI + 2 * CAGTHKN;

                                                // ajax 获取设计屈服强度、厚度负偏差、设计弹性模量
                                                let CAGRELT, CAGC1, CAGET;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_relt_et_c1_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": CAGCategoryVal,
                                                        "type": CAGTypeVal,
                                                        "std": CAGSTDVal,
                                                        "name": CAGNameVal,
                                                        "thk": CAGTHKN,
                                                        "temp": CAGDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": CAGDO
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        CAGRELT = parseFloat(result.relt);
                                                        if (CAGRELT < 0) {
                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        CAGC1 = parseFloat(result.c1);
                                                        if (CAGC1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        CAGET = 1000 * parseFloat(result.et);
                                                        if (CAGET < 0) {
                                                            south.html("查询材料弹性模量失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        // 获取Q1
                                                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                            let CAGQ1 = parseFloat(rows[8][columns[0][1].field]);

                                                            // 获取Q2
                                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                                let CAGQ2 = parseFloat(rows[9][columns[0][1].field]);

                                                                // 获取Q3
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                                    let CAGQ3 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // c
                                                                    let CAGC = CAGC1 + CAGC2;

                                                                    // thke
                                                                    let CAGTHKE = CAGTHKN - CAGC;

                                                                    let CAGQ = CAGQ1 + CAGQ2 + CAGQ3;
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "筒体实际压缩力：" + (CAGQ / 1000).toFixed(3) + " kN" +
                                                                        "</span>");

                                                                    let CAGDITHKE = CAGDI / CAGTHKE;
                                                                    let CAGETRELT36 = 0.36 * CAGET / CAGRELT;
                                                                    let CAGKC = 0, CAGEC;
                                                                    if (CAGDITHKE < CAGETRELT36) {
                                                                        CAGEC = 1 / (1 + 5.75 * (CAGRELT / CAGET * CAGDI / CAGTHKE) * (CAGRELT / CAGET * CAGDI / CAGTHKE));
                                                                    } else {
                                                                        if (CAGDITHKE <= 500) {
                                                                            CAGKC = 1.4;
                                                                        } else {
                                                                            // 查表 B.5.2-2
                                                                            CAGKC = 3E-21 * Math.pow(CAGDITHKE, 6) - 4E-17 * Math.pow(CAGDITHKE, 5) + 2E-13 * Math.pow(CAGDITHKE, 4) - 2E-10 * Math.pow(CAGDITHKE, 3) - 7E-08 * Math.pow(CAGDITHKE, 2) - 0.0001 * CAGDITHKE + 1.3988
                                                                        }
                                                                        CAGEC = 2.5 * CAGKC * CAGET / CAGRELT * CAGTHKE / CAGDI;
                                                                    }

                                                                    let CAGQALLOW = 2.09 * CAGEC * CAGDI * CAGTHKE * CAGRELT;
                                                                    let CAGQCHK;
                                                                    if (CAGQ <= CAGQALLOW.toFixed(4)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "许用压缩力：" + (CAGQALLOW / 1000).toFixed(3) + " kN" +
                                                                            "</span>");
                                                                        CAGQCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "许用压缩力：" + (CAGQALLOW / 1000).toFixed(3) + " kN" +
                                                                            "</span>");
                                                                        CAGQCHK = "不合格";
                                                                    }

                                                                    // docx
                                                                    let CAGPayJS = $('#payjs');

                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "cagdocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "CAG",
                                                                                t: CAGDT,
                                                                                std: CAGSTDVal,
                                                                                name: CAGNameVal,
                                                                                di: CAGDI,
                                                                                thkn: CAGTHKN,
                                                                                c2: CAGC2,
                                                                                q1: CAGQ1,
                                                                                q2: CAGQ2,
                                                                                q3: CAGQ3,
                                                                                density: CAGDensity.toFixed(4),
                                                                                relt: CAGRELT.toFixed(4),
                                                                                c1: CAGC1.toFixed(4),
                                                                                et: (CAGET / 1000).toFixed(4),
                                                                                c: CAGC.toFixed(4),
                                                                                thke: CAGTHKE.toFixed(4),
                                                                                dithke: CAGDITHKE.toFixed(4),
                                                                                etrelt36: CAGETRELT36.toFixed(4),
                                                                                kc: CAGKC.toFixed(4),
                                                                                ec: CAGEC.toFixed(4),
                                                                                qallow: CAGQALLOW.toFixed(4),
                                                                                q: CAGQ.toFixed(4),
                                                                                qchk: CAGQCHK
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
                                                                                    CAGPayJS.dialog({
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
                                                                                                CAGPayJS.dialog("close");
                                                                                                CAGPayJS.dialog("clear");
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
                                                                                                            CAGPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    CAGPayJS.dialog('close');
                                                                                                                    CAGPayJS.dialog('clear');
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
                                                                }
                                                            }
                                                        }
                                                    },
                                                    error: function () {
                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                    }
                                                });
                                            }
                                            else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                && parseFloat(rows[7][columns[0][1].field]) <= Math.max(CAGC2, CAGThkMin)) {
                                                south.html("材料厚度不能小于等于 " + Math.max(CAGC2, CAGThkMin) + " mm").css("color", "red");
                                            }
                                            else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                && parseFloat(rows[7][columns[0][1].field]) > CAGThkMax) {
                                                south.html("材料厚度不能大于 " + CAGThkMax + " mm").css("color", "red");
                                            }
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});