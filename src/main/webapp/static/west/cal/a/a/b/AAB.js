$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aabd2 = $("#d2");
    let aabd3 = $("#d3");
    let aabd2d3 = $('#d2d3');

    $("#cal").html("<table id='aab'></table>");
    let pg = $("#aab");

    let south = $("#south");
    let currentTabIndex = null;

    let AABPayJS = $('#payjs');
    $.getJSON("/static/west/cal/a/a/b/AAB.json", function (result) {

        let AABDT,
            AABCategory, AABCategoryVal, AABType, AABTypeVal, AABSTD, AABSTDVal, AABName, AABNameVal,
            columns, rows, ed;

        function aab2d(idod, di = "ϕDi", dout = "ϕDo", thkn = "δn", hi = "hi", ho = "ho", h = "h") {

            aabd2.empty();

            let width = aabd2.width();
            let height = aabd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "AABSVG")
                .attr("width", width).attr("height", height);

            // X 轴比例尺
            let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);

            // Y 轴比例尺
            let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

            // 轮廓线对象
            let line = d3.line().x(function (d) {
                return xScale(d.x);
            }).y(function (d) {
                return yScale(d.y);
            });

            // 图形边距
            let padding = 100;
            let straightHeight = 25;

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
            function dimBottomH(startX, startY, endX, endY, text) {

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
                ])).attr("id", "AABSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AABSketchDI").attr("startOffset", "50%").text(text);

            }

            // 左侧垂直标注
            function dimLeftV(startX, startY, endX, endY, text) {

                extLineLeftH(startX, startY);
                extLineLeftH(endX, endY);

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX - 30, y: startY},
                        {x: startX - 27, y: startY + 15},
                        {x: startX - 33, y: startY + 15},
                        {x: startX - 30, y: startY}
                    ]));

                drawLine(startX - 30, startY + 15, startX - 30, startY + 30);

                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX - 30, y: endY},
                        {x: endX - 27, y: endY - 15},
                        {x: endX - 33, y: endY - 15},
                        {x: endX - 30, y: endY}
                    ]));

                drawLine(endX - 30, endY - 15, endX - 30, endY - 30);

                svg.append("path").attr("d", line([
                    {x: startX - 30, y: startY},
                    {x: endX - 30, y: endY}
                ])).attr("id", "AABSketchH").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AABSketchH").attr("startOffset", "50%").text(text);

            }

            /*
            ** 轮廓线
             */
            // 椭圆外壁
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding - straightHeight)
                .attr("rx", (width - 2 * padding) / 2).attr("ry", height - 2 * padding - straightHeight).classed("sketch", true);

            // 椭圆内壁
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding - straightHeight)
                .attr("rx", (width - 2 * padding) / 2 - straightHeight).attr("ry", height - 2 * padding - 2 * straightHeight).classed("sketch", true);

            // 遮罩下半圆
            svg.append("rect").attr("x", 0).attr("y", height - padding - straightHeight)
                .attr("width", width).attr("height", padding + straightHeight).attr("fill", "white");

            // 直边段横线
            drawLine(padding, height - padding, width - padding, height - padding);
            drawLine(padding, height - padding - straightHeight, width - padding, height - padding - straightHeight);

            // 直边段竖线
            drawLine(padding, height - padding, padding, height - padding - straightHeight);
            drawLine(width - padding, height - padding, width - padding, height - padding - straightHeight);
            drawLine(padding + straightHeight, height - padding, padding + straightHeight, height - padding - straightHeight);
            drawLine(width - padding - straightHeight, height - padding, width - padding - straightHeight, height - padding - straightHeight);

            // di dout
            if (idod === "内径") {
                dimBottomH(padding + 25, height - padding, width - padding - 25, height - padding, di);
            }
            else if (idod === "外径") {
                dimBottomH(padding, height - padding, width - padding, height - padding, dout);
            }


            // h
            dimLeftV(padding, height - padding, padding, height - padding - straightHeight, h);

            // 中心线
            drawCenterLine(width / 2, height - padding + 10, width / 2, padding - 10);

            // hi ho
            if (idod === "内径") {
                drawLine(padding - 40, padding + straightHeight, width / 2 - 3, padding + straightHeight);
                svg.append("path").attr("d", line([
                    {x: padding - 30, y: height - padding - straightHeight - 30},
                    {x: padding - 30, y: padding + straightHeight}
                ])).attr("id", "AABSketchHI").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AABSketchHI").attr("startOffset", "50%").text(hi);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: padding - 30, y: padding + straightHeight},
                        {x: padding - 27, y: padding + straightHeight + 15},
                        {x: padding - 33, y: padding + straightHeight + 15},
                        {x: padding - 30, y: padding + straightHeight}
                    ]));
            }
            else if (idod === "外径") {
                drawLine(padding - 40, padding, width / 2 - 3, padding);
                svg.append("path").attr("d", line([
                    {x: padding - 30, y: height - padding - straightHeight - 30},
                    {x: padding - 30, y: padding}
                ])).attr("id", "AABSketchHO").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AABSketchHO").attr("startOffset", "50%").text(ho);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: padding - 30, y: padding},
                        {x: padding - 27, y: padding + 15},
                        {x: padding - 33, y: padding + 15},
                        {x: padding - 30, y: padding}
                    ]));
            }

            // thkn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding, y: height - padding - straightHeight / 2},
                    {x: width - padding + 15, y: height - padding - straightHeight / 2 - 3},
                    {x: width - padding + 15, y: height - padding - straightHeight / 2 + 3},
                    {x: width - padding, y: height - padding - straightHeight / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - straightHeight, y: height - padding - straightHeight / 2},
                    {x: width - padding - straightHeight - 15, y: height - padding - straightHeight / 2 - 3},
                    {x: width - padding - straightHeight - 15, y: height - padding - straightHeight / 2 + 3},
                    {x: width - padding - straightHeight, y: height - padding - straightHeight / 2}
                ]));
            drawLine(width - padding - straightHeight - 15 - 10, height - padding - straightHeight / 2, width - padding, height - padding - straightHeight / 2);
            svg.append("path").attr("d", line([
                {x: width - padding + 15, y: height - padding - straightHeight / 2},
                {x: width - padding + 15 + 40, y: height - padding - straightHeight / 2}
            ])).attr("id", "AABSketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AABSketchTHKN").attr("startOffset", "50%").text(thkn);
        }

        currentTabIndex = aabd2d3.tabs('getTabIndex', aabd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aab2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aab").length > 0) {
                    aab2d();
                }
            });
        }
        aabd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aab2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aab").length > 0) {
                            aab2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 椭圆封头内压强度计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 180,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 143,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {

                if (index === 12) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
                else if (index === 15) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }

                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 6) {
                    $(ed.target).combobox("loadData", AABCategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AABType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AABSTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", AABName);
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

                    // sketch & model
                    aabd2.empty();
                    aabd3.empty();

                    // sketch
                    currentTabIndex = aabd2d3.tabs('getTabIndex', aabd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aab2d();
                        aabd2.off("resize").on("resize", function () {
                            if ($("#aab").length > 0) {
                                aab2d();
                            }
                        });
                    }
                    aabd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aab2d();
                                aabd2.off("resize").on("resize", function () {
                                    if ($("#aab").length > 0) {
                                        aab2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    /*
                    级联菜单区
                     */
                    // 温度改变，重新加载 category
                    if (index === 1) {

                        AABDT = parseFloat(changes.value);

                        // category、type、std、name
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AABCategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AABType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AABSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AABName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AABCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AABDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AABCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                    });
                                }
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料类别获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // category 改变，重新加载type
                    if (index === 6) {

                        AABCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AABType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AABSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AABName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AABCategoryVal,
                                temp: AABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AABType = [];
                                $(result).each(function (index, element) {
                                    AABType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // type 改变，重新加载 std
                    if (index === 7) {

                        AABTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AABSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AABName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AABCategoryVal,
                                type: AABTypeVal,
                                temp: AABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AABSTD = [];
                                $(result).each(function (index, element) {
                                    AABSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // std 改变，重新加载 Name
                    if (index === 8) {

                        AABSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AABName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AABCategoryVal,
                                type: AABTypeVal,
                                std: AABSTDVal,
                                temp: AABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AABName = [];
                                $(result).each(function (index, element) {
                                    AABName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;筒体材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // UI - DI DOUT
                    if (index === 10) {
                        if (rows[10][columns[0][1].field] === "内径") {
                            pg.datagrid('options').finder.getTr(this, 11).show();
                            pg.datagrid('options').finder.getTr(this, 14).show();
                            pg.datagrid('options').finder.getTr(this, 12).hide();
                            pg.datagrid('options').finder.getTr(this, 15).hide();
                        }
                        else if (rows[10][columns[0][1].field] === "外径") {
                            pg.datagrid('options').finder.getTr(this, 12).show();
                            pg.datagrid('options').finder.getTr(this, 15).show();
                            pg.datagrid('options').finder.getTr(this, 11).hide();
                            pg.datagrid('options').finder.getTr(this, 14).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    /*
                    数据获取和计算区
                     */
                    let AABPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AABPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AABPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AABPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AABC2;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AABC2 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AABFAI;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AABFAI = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AABTest;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        AABTest = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // NameVal
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        AABNameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AABD, AABThkMin, AABThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AABCategoryVal,
                            "type": AABTypeVal,
                            "std": AABSTDVal,
                            "name": AABNameVal,
                            "temp": AABDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AABD = parseFloat(result.density);
                            AABThkMin = parseFloat(result.thkMin);
                            AABThkMax = parseFloat(result.thkMax);

                            let AABIDOD;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AABIDOD = rows[10][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aab2d(AABIDOD);
                                aabd2.off("resize").on("resize", function () {
                                    if ($("#aab").length > 0) {
                                        aab2d(AABIDOD);
                                    }
                                });
                            }
                            aabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aab2d(AABIDOD);
                                        aabd2.off("resize").on("resize", function () {
                                            if ($("#aab").length > 0) {
                                                aab2d(AABIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let AABDI = -1, AABDOUT = -1;
                            if (AABIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    AABDI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (AABIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                    AABDOUT = parseFloat(rows[12][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT);
                                aabd2.off("resize").on("resize", function () {
                                    if ($("#aab").length > 0) {
                                        aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT);
                                    }
                                });
                            }
                            aabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT);
                                        aabd2.off("resize").on("resize", function () {
                                            if ($("#aab").length > 0) {
                                                aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT);
                                            }
                                        });
                                    }
                                }
                            });

                            let AABTHKN;
                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > Math.max(AABC2, AABThkMin)
                                && parseFloat(rows[13][columns[0][1].field]) <= AABThkMax) {
                                AABTHKN = parseFloat(rows[13][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) <= Math.max(AABC2, AABThkMin)) {
                                south.html("封头材料厚度不能小于等于 " + Math.max(AABC2, AABThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > AABThkMax) {
                                south.html("封头材料厚度不能大于 " + AABThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN);
                                aabd2.off("resize").on("resize", function () {
                                    if ($("#aab").length > 0) {
                                        aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN);
                                    }
                                });
                            }
                            aabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN);
                                        aabd2.off("resize").on("resize", function () {
                                            if ($("#aab").length > 0) {
                                                aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 补齐内外径
                            if (AABIDOD === "内径") {
                                AABDOUT = AABDI + 2 * AABTHKN;
                            }
                            else if (AABIDOD === "外径") {
                                AABDI = AABDOUT - 2 * AABTHKN;
                            }
                            else {
                                return false;
                            }

                            let AABOT, AABO, AABOT1, AABRel, AABC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AABCategoryVal,
                                    "type": AABTypeVal,
                                    "std": AABSTDVal,
                                    "name": AABNameVal,
                                    "thk": AABTHKN,
                                    "temp": AABDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AABDOUT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计应力
                                    AABOT = parseFloat(result.ot);
                                    if (AABOT < 0) {
                                        south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    AABO = parseFloat(result.o);
                                    if (AABO < 0) {
                                        south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    AABRel = parseFloat(result.rel);
                                    if (AABRel < 0) {
                                        south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    AABC1 = parseFloat(result.c1);
                                    if (AABC1 < 0) {
                                        south.html("查询封头厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 标记应力
                                    AABOT1 = parseFloat(result.ot1);

                                    let AABHI = -1, AABHO = -1;
                                    if (AABIDOD === "内径") {

                                        if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                            && parseFloat(rows[14][columns[0][1].field]) <= AABDI / 2) {
                                            AABHI = parseFloat(rows[14][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                            && parseFloat(rows[14][columns[0][1].field]) > AABDI / 2) {
                                            south.html("封头内壁曲面深度 h<sub>i</sub> 不能大于 " + AABDI / 2 + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }
                                    }
                                    else if (AABIDOD === "外径") {

                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                            && parseFloat(rows[15][columns[0][1].field]) <= AABDOUT / 2) {
                                            AABHO = parseFloat(rows[15][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                            && parseFloat(rows[15][columns[0][1].field]) > AABDOUT / 2) {
                                            south.html("封头外壁曲面高度 h<sub>o</sub> 不能大于 " + AABDOUT / 2 + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN, AABHI, AABHO);
                                        aabd2.off("resize").on("resize", function () {
                                            if ($("#aab").length > 0) {
                                                aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN, AABHI, AABHO);
                                            }
                                        });
                                    }
                                    aabd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN, AABHI, AABHO);
                                                aabd2.off("resize").on("resize", function () {
                                                    if ($("#aab").length > 0) {
                                                        aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN, AABHI, AABHO);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 补齐曲面高度
                                    if (AABIDOD === "内径") {
                                        AABHO = AABHI + AABTHKN;
                                    }
                                    else if (AABIDOD === "外径") {
                                        AABHI = AABHO - AABTHKN;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 过程参数
                                    let AABPC = AABPD + AABPS;
                                    let AABC = AABC1 + AABC2;
                                    let AABTHKE = AABTHKN - AABC;

                                    // 厚度校核
                                    let AABK = (2 + (AABDI / (2 * AABHI)) * (AABDI / (2 * AABHI))) / 6;
                                    let AABTHKC;
                                    if (AABIDOD === "内径") {
                                        AABTHKC = (AABK * AABPC * AABDI) / (2 * AABOT * AABFAI - 0.5 * AABPC);
                                    }
                                    else if (AABIDOD === "外径") {
                                        AABTHKC = (AABK * AABPC * AABDOUT) / (2 * AABOT * AABFAI + (2 * AABK - 0.5) * AABPC);
                                    }
                                    else {
                                        return false;
                                    }
                                    let AABTHKMini;
                                    if (AABDI / (2 * AABHI) <= 2) {
                                        AABTHKMini = 0.0015 * AABDI;
                                    }
                                    else {
                                        AABTHKMini = 0.003 * AABDI;
                                    }
                                    let AABTHKMinimum;
                                    if (AABCategoryVal === "碳素钢和低合金钢" || AABCategoryVal === "铝及铝合金") {
                                        AABTHKMinimum = 3;
                                    }
                                    else if (AABCategoryVal === "高合金钢" || AABCategoryVal === "钛及钛合金"
                                        || AABCategoryVal === "铜及铜合金" || AABCategoryVal === "镍及镍合金"
                                        || AABCategoryVal === "锆及锆合金") {
                                        AABTHKMinimum = 2;
                                    }
                                    else {
                                        return false;
                                    }

                                    let AABTHKD = Math.max(AABTHKC, AABTHKMinimum, AABTHKMini) + AABC2;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "封头所需厚度：" + (AABTHKD + AABC1).toFixed(2) + " mm" +
                                        "</span>");
                                    let AABTHKCHK;
                                    if (AABTHKN >= (AABTHKD + AABC1).toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AABTHKN + " mm" +
                                            "</span>");
                                        AABTHKCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AABTHKN + " mm" +
                                            "</span>");
                                        AABTHKCHK = "不合格";
                                    }

                                    // 应力校核
                                    let AABOAct;
                                    if (AABIDOD === "内径") {
                                        AABOAct = AABPC * (AABK * AABDI + 0.5 * AABTHKE) / (2 * AABTHKE);
                                    }
                                    else if (AABIDOD === "外径") {
                                        AABOAct = AABPC * (AABK * AABDOUT - (2 * AABK - 0.5) * AABTHKE) / (2 * AABTHKE);
                                    }
                                    else {
                                        return false;
                                    }
                                    let AABOActAllow = AABFAI * AABOT;
                                    let AABOActChk;
                                    if (AABOAct <= AABOActAllow) {
                                        AABOActChk = "合格";
                                    }
                                    else {
                                        AABOActChk = "不合格";
                                    }

                                    // 压力试验
                                    let AABETA, AABZETA, AABPT, AABOTestAllow;
                                    if (AABTest === "液压试验") {

                                        AABETA = 1.25;
                                        AABPT = AABETA * AABPD * AABO / Math.max(AABOT, AABOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：液压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AABPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        AABZETA = 0.9;
                                        AABOTestAllow = AABZETA * AABRel * AABFAI;
                                    }
                                    else if (AABTest === "气压试验") {

                                        AABETA = 1.1;
                                        AABPT = AABETA * AABPD * AABO / Math.max(AABOT, AABOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：气压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AABPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        AABZETA = 0.8;
                                        AABOTestAllow = AABZETA * AABRel * AABFAI;
                                    }
                                    else {
                                        return false;
                                    }
                                    let AABOTest;
                                    if (AABIDOD === "内径") {
                                        AABOTest = (AABPT * (AABK * AABDI + 0.5 * AABTHKE)) / (2 * AABTHKE);
                                    }
                                    else if (AABIDOD === "外径") {
                                        AABOTest = AABPT * (AABK * AABDOUT - (2 * AABK - 0.5) * AABTHKE) / (2 * AABTHKE);
                                    }
                                    else {
                                        return false;
                                    }

                                    let AABOTestChk;
                                    if (AABOTest <= AABOTestAllow) {
                                        AABOTestChk = "合格";
                                    }
                                    else {
                                        AABOTestChk = "不合格";
                                    }

                                    let AABMAWP;
                                    if (AABIDOD === "内径") {
                                        AABMAWP = (2 * AABTHKE * AABOT * AABFAI) / (AABK * AABDI + 0.5 * AABTHKE) - AABPS;
                                    }
                                    else if (AABIDOD === "外径") {
                                        AABMAWP = (2 * AABOT * AABFAI * AABTHKE) / (AABK * AABDOUT - (2 * AABK - 0.5) * AABTHKE) - AABPS;
                                    }
                                    else {
                                        return false;
                                    }

                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP：" + AABMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    let AABH;
                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                        AABH = parseFloat(rows[16][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN, AABHI, AABHO, AABH);
                                        aabd2.off("resize").on("resize", function () {
                                            if ($("#aab").length > 0) {
                                                aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN, AABHI, AABHO, AABH);
                                            }
                                        });
                                    }
                                    aabd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN, AABHI, AABHO, AABH);
                                                aabd2.off("resize").on("resize", function () {
                                                    if ($("#aab").length > 0) {
                                                        aab2d(AABIDOD, "Φ" + AABDI, "Φ" + AABDOUT, AABTHKN, AABHI, AABHO, AABH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 几何特性
                                    let AABAXI = AABDI / 2;
                                    let AABBXI = AABHI;
                                    let AABAI = Math.PI * AABAXI * (AABAXI + (AABBXI / (Math.sqrt((AABAXI / AABBXI) * (AABAXI / AABBXI) - 1)) * Math.log(AABAXI / AABBXI + Math.sqrt((AABAXI / AABBXI) * (AABAXI / AABBXI) - 1))) + 2 * AABH) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内表面积：" + AABAI.toFixed(4) + " ㎡" +
                                        "</span>");
                                    let AABAXO = AABAXI + AABTHKN;
                                    let AABBXO = AABBXI + AABTHKN;
                                    let AABAO = Math.PI * AABAXO * (AABAXO + (AABBXO / (Math.sqrt((AABAXO / AABBXO) * (AABAXO / AABBXO) - 1)) * Math.log(AABAXO / AABBXO + Math.sqrt((AABAXO / AABBXO) * (AABAXO / AABBXO) - 1))) + 2 * AABH) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积：" + AABAO.toFixed(4) + " ㎡" +
                                        "</span>");
                                    let AABVI = (2 / 3 * Math.PI * AABAXI * AABAXI * AABBXI + Math.PI * AABAXI * AABAXI * AABH) / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积：" + AABVI.toFixed(4) + " m³" +
                                        "</span>");
                                    let AABVO = (2 / 3 * Math.PI * AABAXO * AABAXO * AABBXO + Math.PI * AABAXO * AABAXO * AABH) / 1000000000;
                                    let AABM = AABD * (AABVO - AABVI);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量：" + AABM.toFixed(4) + " kg" +
                                        "</span>");

                                    // docx
                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "aabdocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "AAB",

                                                idod: AABIDOD,

                                                pd: AABPD,
                                                t: AABDT,
                                                ps: AABPS,
                                                test: AABTest,
                                                c2: AABC2,
                                                fai: AABFAI,
                                                std: AABSTDVal,
                                                name: AABNameVal,
                                                di: AABDI,
                                                hi: AABHI,
                                                thkn: AABTHKN,
                                                h: AABH,

                                                d: AABD.toFixed(4),
                                                rel: AABRel.toFixed(4),
                                                c1: AABC1.toFixed(4),
                                                ot: AABOT.toFixed(4),
                                                o: AABO.toFixed(4),
                                                ot1: AABOT1.toFixed(4),

                                                pc: AABPC.toFixed(4),
                                                c: AABC.toFixed(4),
                                                thke: AABTHKE.toFixed(4),
                                                dout: AABDOUT.toFixed(4),
                                                ho: AABHO.toFixed(4),

                                                k: AABK.toFixed(4),
                                                thkc: AABTHKC.toFixed(4),
                                                thkMin: AABTHKMini.toFixed(4),
                                                thkMinimum: AABTHKMinimum.toFixed(4),
                                                thkd: AABTHKD.toFixed(4),
                                                thkChk: AABTHKCHK,
                                                oAct: AABOAct.toFixed(4),
                                                otfai: AABOActAllow.toFixed(4),
                                                oActChk: AABOActChk,

                                                eta: AABETA.toFixed(4),
                                                pt: AABPT.toFixed(4),
                                                oTest: AABOTest.toFixed(4),
                                                zeta: AABZETA.toFixed(4),
                                                OTestAllow: AABOTestAllow.toFixed(4),
                                                OTestChk: AABOTestChk,

                                                mawp: AABMAWP.toFixed(4),

                                                ai: AABAI.toFixed(4),
                                                ao: AABAO.toFixed(4),
                                                vi: AABVI.toFixed(4),
                                                m: AABM.toFixed(4)
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
                                                    AABPayJS.dialog({
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
                                                                AABPayJS.dialog("close");
                                                                AABPayJS.dialog("clear");
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
                                                                            AABPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    AABPayJS.dialog('close');
                                                                                    AABPayJS.dialog('clear');
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
                                        "<span style='color:red;'>&ensp;封头材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;封头材料物理性质获取失败，请检查网络后重试</span>");
                        }
                    });
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 12).hide();
                pg.propertygrid('options').finder.getTr(this, 15).hide();
            }
        });
    });
});