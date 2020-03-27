$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aakad2 = $("#d2");
    let aakad3 = $("#d3");
    let aakad2d3 = $('#d2d3');

    $("#cal").html("<table id='aaka'></table>");
    let pg = $("#aaka");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/k/a/AAKA.json", function (result) {

        let AAKADT,
            AAKACategory, AAKACategoryVal, AAKAType, AAKATypeVal, AAKASTD, AAKASTDVal, AAKAName, AAKANameVal,
            columns, rows, ed;

        function aaka2d(di = "ϕDi", thkn = "δn", hi = "hi", h = "h") {

            aakad2.empty();

            let width = aakad2.width();
            let height = aakad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "AAKASVG")
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
                ])).attr("id", "AAKASketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AAKASketchDI").attr("startOffset", "50%").text(text);

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
                ])).attr("id", "AAKASketchH").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AAKASketchH").attr("startOffset", "50%").text(text);

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

            // di
            dimBottomH(padding + 25, height - padding, width - padding - 25, height - padding, di);

            // h
            dimLeftV(padding, height - padding, padding, height - padding - straightHeight, h);

            // 中心线
            drawCenterLine(width / 2, height - padding + 10, width / 2, padding - 10);

            // hi
            drawLine(padding - 40, padding + straightHeight, width / 2 - 3, padding + straightHeight);
            svg.append("path").attr("d", line([
                {x: padding - 30, y: height - padding - straightHeight - 30},
                {x: padding - 30, y: padding + straightHeight}
            ])).attr("id", "AAKASketchHI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAKASketchHI").attr("startOffset", "50%").text(hi);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 30, y: padding + straightHeight},
                    {x: padding - 27, y: padding + straightHeight + 15},
                    {x: padding - 33, y: padding + straightHeight + 15},
                    {x: padding - 30, y: padding + straightHeight}
                ]));

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
            ])).attr("id", "AAKASketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAKASketchTHKN").attr("startOffset", "50%").text(thkn);
        }

        currentTabIndex = aakad2d3.tabs('getTabIndex', aakad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aaka2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aaka").length > 0) {
                    aaka2d();
                }
            });
        }
        aakad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aaka2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aaka").length > 0) {
                            aaka2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 薄壁椭圆封头内压计算",
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
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }

                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 6) {
                    $(ed.target).combobox("loadData", AAKACategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAKAType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AAKASTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", AAKAName);
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
                    aakad2.empty();
                    aakad3.empty();

                    // sketch
                    currentTabIndex = aakad2d3.tabs('getTabIndex', aakad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aaka2d();
                        aakad2.off("resize").on("resize", function () {
                            if ($("#aaka").length > 0) {
                                aaka2d();
                            }
                        });
                    }
                    aakad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aaka2d();
                                aakad2.off("resize").on("resize", function () {
                                    if ($("#aaka").length > 0) {
                                        aaka2d();
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

                        AAKADT = parseFloat(changes.value);

                        // category、type、std、name
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAKACategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAKAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAKASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAKAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAKADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAKACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAKADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAKACategory[index] = {
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

                        AAKACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAKAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAKASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAKAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAKACategoryVal,
                                temp: AAKADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAKAType = [];
                                $(result).each(function (index, element) {
                                    AAKAType[index] = {
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

                        AAKATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAKASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAKAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAKACategoryVal,
                                type: AAKATypeVal,
                                temp: AAKADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAKASTD = [];
                                $(result).each(function (index, element) {
                                    AAKASTD[index] = {
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

                        AAKASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAKAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAKACategoryVal,
                                type: AAKATypeVal,
                                std: AAKASTDVal,
                                temp: AAKADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAKAName = [];
                                $(result).each(function (index, element) {
                                    AAKAName[index] = {
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

                    /*
                    数据获取和计算区
                     */
                    let AAKAPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AAKAPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAKAPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AAKAPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAKAC2;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AAKAC2 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAKAFAI;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AAKAFAI = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAKATest;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        AAKATest = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // NameVal
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        AAKANameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AAKAD, AAKAThkMin, AAKAThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AAKACategoryVal,
                            "type": AAKATypeVal,
                            "std": AAKASTDVal,
                            "name": AAKANameVal,
                            "temp": AAKADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AAKAD = parseFloat(result.density);
                            AAKAThkMin = parseFloat(result.thkMin);
                            AAKAThkMax = parseFloat(result.thkMax);

                            let AAKADI;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AAKADI = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aaka2d("Φ" + AAKADI);
                                aakad2.off("resize").on("resize", function () {
                                    if ($("#aaka").length > 0) {
                                        aaka2d("Φ" + AAKADI);
                                    }
                                });
                            }
                            aakad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaka2d("Φ" + AAKADI);
                                        aakad2.off("resize").on("resize", function () {
                                            if ($("#aaka").length > 0) {
                                                aaka2d("Φ" + AAKADI);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAKATHKN;
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) > Math.max(AAKAC2, AAKAThkMin)
                                && parseFloat(rows[11][columns[0][1].field]) <= AAKAThkMax) {
                                AAKATHKN = parseFloat(rows[11][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) <= Math.max(AAKAC2, AAKAThkMin)) {
                                south.html("封头材料厚度不能小于等于 " + Math.max(AAKAC2, AAKAThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) > AAKAThkMax) {
                                south.html("封头材料厚度不能大于 " + AAKAThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            let AAKADOUT = AAKADI + 2 * AAKATHKN;

                            // Sketch
                            if (currentTabIndex === 0) {
                                aaka2d("Φ" + AAKADI, AAKATHKN);
                                aakad2.off("resize").on("resize", function () {
                                    if ($("#aaka").length > 0) {
                                        aaka2d("Φ" + AAKADI, AAKATHKN);
                                    }
                                });
                            }
                            aakad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaka2d("Φ" + AAKADI, AAKATHKN);
                                        aakad2.off("resize").on("resize", function () {
                                            if ($("#aaka").length > 0) {
                                                aaka2d("Φ" + AAKADI, AAKATHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAKAOT, AAKAO, AAKAOT1, AAKARel, AAKAC1, AAKARelT, AAKAET;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_et_com_relt_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AAKACategoryVal,
                                    "type": AAKATypeVal,
                                    "std": AAKASTDVal,
                                    "name": AAKANameVal,
                                    "thk": AAKATHKN,
                                    "temp": AAKADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AAKADOUT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计应力
                                    AAKAOT = parseFloat(result.ot);
                                    if (AAKAOT < 0) {
                                        south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    AAKAO = parseFloat(result.o);
                                    if (AAKAO < 0) {
                                        south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    AAKARel = parseFloat(result.rel);
                                    if (AAKARel < 0) {
                                        south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 设计温度屈服强度
                                    AAKARelT = parseFloat(result.relt);
                                    if (AAKARelT < 0) {
                                        south.html("查询封头材料设计温度屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 设计温度屈服强度
                                    AAKAET = parseFloat(result.et);
                                    if (AAKAET < 0) {
                                        south.html("查询封头材料设计温度弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    AAKAC1 = parseFloat(result.c1);
                                    if (AAKAC1 < 0) {
                                        south.html("查询封头厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 标记应力
                                    AAKAOT1 = parseFloat(result.ot1);

                                    let AAKAHI;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) <= AAKADI / 2) {
                                        AAKAHI = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) > AAKADI / 2) {
                                        south.html("封头内壁曲面深度 h<sub>i</sub> 不能大于 " + AAKADI / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aaka2d("Φ" + AAKADI, AAKATHKN, AAKAHI);
                                        aakad2.off("resize").on("resize", function () {
                                            if ($("#aaka").length > 0) {
                                                aaka2d("Φ" + AAKADI, AAKATHKN, AAKAHI);
                                            }
                                        });
                                    }
                                    aakad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aaka2d("Φ" + AAKADI, AAKATHKN, AAKAHI);
                                                aakad2.off("resize").on("resize", function () {
                                                    if ($("#aaka").length > 0) {
                                                        aaka2d("Φ" + AAKADI, AAKATHKN, AAKAHI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 过程参数
                                    let AAKAPC = AAKAPD + AAKAPS;
                                    let AAKAC = AAKAC1 + AAKAC2;
                                    let AAKATHKE = AAKATHKN - AAKAC;
                                    let AAKAHO = AAKAHI + AAKATHKN;

                                    // 强度厚度校核
                                    let AAKAK = (2 + (AAKADI / (2 * AAKAHI)) * (AAKADI / (2 * AAKAHI))) / 6;
                                    let AAKATHKC = (AAKAK * AAKAPC * AAKADI) / (2 * AAKAOT * AAKAFAI - 0.5 * AAKAPC);
                                    let AAKATHKMinimum;
                                    if (AAKACategoryVal === "碳素钢和低合金钢" || AAKACategoryVal === "铝及铝合金") {
                                        AAKATHKMinimum = 3;
                                    }
                                    else if (AAKACategoryVal === "高合金钢" || AAKACategoryVal === "钛及钛合金"
                                        || AAKACategoryVal === "铜及铜合金" || AAKACategoryVal === "镍及镍合金"
                                        || AAKACategoryVal === "锆及锆合金") {
                                        AAKATHKMinimum = 2;
                                    }
                                    else {
                                        return false;
                                    }

                                    let AAKATHKD = Math.max(AAKATHKC, AAKATHKMinimum) + AAKAC2;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "球冠区强度计算所需厚度：" + (AAKATHKD + AAKAC1).toFixed(2) + " mm" +
                                        "</span>");
                                    let AAKATHKCHK;
                                    if (AAKATHKN >= (AAKATHKD + AAKAC1).toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AAKATHKN + " mm" +
                                            "</span>");
                                        AAKATHKCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AAKATHKN + " mm" +
                                            "</span>");
                                        AAKATHKCHK = "不合格";
                                    }

                                    // 稳定性校核
                                    let AAKAR = (5 - Math.sqrt(5)) / 16 * AAKADI;
                                    let AAKAL = (5 + Math.sqrt(5)) / 8 * AAKADI;
                                    if (AAKATHKN < 0.0005 * AAKAL || AAKATHKN > 0.002 * AAKAL) {
                                        south.html("封头厚径比超限，程序无法计算!").css("color", "red");
                                        return false;
                                    }
                                    let AAKAK1, AAKAK2;
                                    if (AAKAR / AAKADI <= 0.08) {
                                        AAKAK1 = 9.31 * AAKAR / AAKADI - 0.086;
                                        AAKAK2 = 1.25;
                                    } else {
                                        AAKAK1 = 0.692 * AAKAR / AAKADI + 0.605;
                                        AAKAK2 = 1.46 - 2.6 * AAKAR / AAKADI;
                                    }
                                    let AAKAA = 0.5 * AAKADI - AAKAR;
                                    let AAKAB = AAKAL - AAKAR;
                                    let AAKABETA = Math.acos(AAKAA / AAKAB);
                                    let AAKASAI = Math.sqrt(AAKAL * AAKATHKE) / AAKAR;
                                    let AAKAF;
                                    if (AAKASAI >= AAKABETA) {
                                        AAKAF = AAKAA;
                                    } else {
                                        AAKAF = AAKAA / Math.cos(AAKABETA - AAKASAI);
                                    }
                                    let AAKARE = AAKAF + AAKAR;
                                    let AAKAOE = AAKAK1 * 1000 * AAKAET * AAKATHKE / AAKAR;
                                    let AAKAPE = AAKAOE * AAKATHKE / AAKAK2 / AAKARE / (0.5 * AAKARE / AAKAR - 1);
                                    let AAKAPY = AAKARelT * AAKATHKE / AAKAK2 / AAKARE / (0.5 * AAKARE / AAKAR - 1);
                                    let AAKAPCK;
                                    if (AAKAPE / AAKAPY <= 1.0) {
                                        AAKAPCK = 0.6 * AAKAPE;
                                    } else if (AAKAPE / AAKAPY > 1.0 && AAKAPE / AAKAPY <= 8.29) {
                                        AAKAPCK = 0.408 * AAKAPY + 0.192 * AAKAPE;
                                    } else {
                                        AAKAPCK = 2 * AAKAPY;
                                    }
                                    let AAKAN = 1.5;
                                    let AAKAPK = AAKAPCK / AAKAN;
                                    let AAKAPCHK;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "封头计算压力：" + AAKAPC + " MPa" +
                                        "</span>");
                                    if (AAKAPC <= AAKAPK) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "转角过渡区稳定性许用内压：" + AAKAPK.toFixed(2) + " MPa" +
                                            "</span>");
                                        AAKAPCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "转角过渡区稳定性许用内压：" + AAKAPK.toFixed(2) + " MPa" +
                                            "</span>");
                                        AAKAPCHK = "不合格";
                                    }

                                    // 压力试验
                                    let AAKAETA, AAKAPT;
                                    if (AAKATest === "液压试验") {

                                        AAKAETA = 1.25;
                                        AAKAPT = AAKAETA * AAKAPD * AAKAO / Math.max(AAKAOT, AAKAOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：液压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AAKAPT.toFixed(4) + " MPa" +
                                            "</span>");
                                    }
                                    else if (AAKATest === "气压试验") {

                                        AAKAETA = 1.1;
                                        AAKAPT = AAKAETA * AAKAPD * AAKAO / Math.max(AAKAOT, AAKAOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：气压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AAKAPT.toFixed(4) + " MPa" +
                                            "</span>");
                                    }
                                    else {
                                        return false;
                                    }

                                    // MAWP
                                    let AAKAPM = (2 * AAKATHKE * AAKAOT * AAKAFAI) / (AAKAK * AAKADI + 0.5 * AAKATHKE) - AAKAPS;
                                    let AAKAMAWP = Math.min(AAKAPM, AAKAPK - AAKAPS);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP：" + AAKAMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    let AAKAH;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                        AAKAH = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aaka2d("Φ" + AAKADI, AAKATHKN, AAKAHI, AAKAH);
                                        aakad2.off("resize").on("resize", function () {
                                            if ($("#aaka").length > 0) {
                                                aaka2d("Φ" + AAKADI, AAKATHKN, AAKAHI, AAKAH);
                                            }
                                        });
                                    }
                                    aakad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aaka2d("Φ" + AAKADI, AAKATHKN, AAKAHI, AAKAH);
                                                aakad2.off("resize").on("resize", function () {
                                                    if ($("#aaka").length > 0) {
                                                        aaka2d("Φ" + AAKADI, AAKATHKN, AAKAHI, AAKAH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 几何特性
                                    let AAKAAXI = AAKADI / 2;
                                    let AAKABXI = AAKAHI;
                                    let AAKAAI = Math.PI * AAKAAXI * (AAKAAXI + (AAKABXI / (Math.sqrt((AAKAAXI / AAKABXI) * (AAKAAXI / AAKABXI) - 1)) * Math.log(AAKAAXI / AAKABXI + Math.sqrt((AAKAAXI / AAKABXI) * (AAKAAXI / AAKABXI) - 1))) + 2 * AAKAH) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内表面积：" + AAKAAI.toFixed(4) + " ㎡" +
                                        "</span>");
                                    let AAKAAXO = AAKAAXI + AAKATHKN;
                                    let AAKABXO = AAKABXI + AAKATHKN;
                                    let AAKAAO = Math.PI * AAKAAXO * (AAKAAXO + (AAKABXO / (Math.sqrt((AAKAAXO / AAKABXO) * (AAKAAXO / AAKABXO) - 1)) * Math.log(AAKAAXO / AAKABXO + Math.sqrt((AAKAAXO / AAKABXO) * (AAKAAXO / AAKABXO) - 1))) + 2 * AAKAH) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积：" + AAKAAO.toFixed(4) + " ㎡" +
                                        "</span>");
                                    let AAKAVI = (2 / 3 * Math.PI * AAKAAXI * AAKAAXI * AAKABXI + Math.PI * AAKAAXI * AAKAAXI * AAKAH) / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积：" + AAKAVI.toFixed(4) + " m³" +
                                        "</span>");
                                    let AAKAVO = (2 / 3 * Math.PI * AAKAAXO * AAKAAXO * AAKABXO + Math.PI * AAKAAXO * AAKAAXO * AAKAH) / 1000000000;
                                    let AAKAM = AAKAD * (AAKAVO - AAKAVI);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量：" + AAKAM.toFixed(4) + " kg" +
                                        "</span>");

                                    // docx
                                    let AAKAPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "aakadocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "AAKA",

                                                pd: AAKAPD,
                                                t: AAKADT,
                                                ps: AAKAPS,
                                                test: AAKATest,

                                                c2: AAKAC2,
                                                fai: AAKAFAI,
                                                std: AAKASTDVal,
                                                name: AAKANameVal,

                                                di: AAKADI,
                                                hi: AAKAHI,
                                                thkn: AAKATHKN,
                                                h: AAKAH,

                                                density: AAKAD.toFixed(4),
                                                rel: AAKARel.toFixed(4),
                                                c1: AAKAC1.toFixed(4),
                                                relt: AAKARelT.toFixed(4),
                                                ot: AAKAOT.toFixed(4),
                                                o: AAKAO.toFixed(4),
                                                ot1: AAKAOT1.toFixed(4),
                                                et: AAKAET.toFixed(4),

                                                pc: AAKAPC.toFixed(4),
                                                c: AAKAC.toFixed(4),
                                                thke: AAKATHKE.toFixed(4),
                                                dout: AAKADOUT.toFixed(4),
                                                ho: AAKAHO.toFixed(4),

                                                k: AAKAK.toFixed(4),
                                                thkc: AAKATHKC.toFixed(4),
                                                thkm: AAKATHKMinimum.toFixed(4),
                                                thkd: AAKATHKD.toFixed(4),
                                                thkchk: AAKATHKCHK,

                                                r: AAKAR.toFixed(4),
                                                l: AAKAL.toFixed(4),
                                                k1: AAKAK1.toFixed(4),
                                                k2: AAKAK2.toFixed(4),
                                                a: AAKAA.toFixed(4),
                                                b: AAKAB.toFixed(4),
                                                beta: AAKABETA.toFixed(4),
                                                sai: AAKASAI.toFixed(4),
                                                f: AAKAF.toFixed(4),
                                                re: AAKARE.toFixed(4),
                                                oe: AAKAOE.toFixed(4),
                                                pe: AAKAPE.toFixed(4),
                                                py: AAKAPY.toFixed(4),
                                                pck: AAKAPCK.toFixed(4),
                                                n: AAKAN.toFixed(4),
                                                pk: AAKAPK.toFixed(4),
                                                pchk: AAKAPCHK,

                                                eta: AAKAETA.toFixed(4),
                                                pt: AAKAPT.toFixed(4),

                                                pm: AAKAPM.toFixed(4),
                                                mawp: AAKAMAWP.toFixed(4),

                                                ai: AAKAAI.toFixed(2),
                                                ao: AAKAAO.toFixed(2),
                                                vi: AAKAVI.toFixed(2),
                                                m: AAKAM.toFixed(2)
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
                                                    AAKAPayJS.dialog({
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
                                                                AAKAPayJS.dialog("close");
                                                                AAKAPayJS.dialog("clear");
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
                                                                            AAKAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    AAKAPayJS.dialog('close');
                                                                                    AAKAPayJS.dialog('clear');
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
            }
        });
    });
});