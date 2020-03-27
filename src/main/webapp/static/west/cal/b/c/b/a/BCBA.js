$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcbaSketch = $("#d2");
    let bcbaModel = $("#d3");
    let bcbad2d3 = $('#d2d3');

    $("#cal").html("<table id='bcba'></table>");
    let pg = $("#bcba");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/b/a/BCBA.json", function (result) {

        let BCBADT, BCBACategory, BCBACategoryVal, BCBAType, BCBATypeVal, BCBASTD, BCBASTDVal, BCBAName, columns, rows,
            ed;

        // 2D Sketch
        function bcba2d(di, thkn, hi, h) {

            if (!di) di = "ϕDi";
            if (!h) h = "h";
            if (!thkn) thkn = "δn";
            if (!hi) hi = "hi";

            bcbaSketch.empty();

            let width = bcbaSketch.width();
            let height = bcbaSketch.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCBASVG")
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
                ])).attr("id", "BCBASketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCBASketchDI").attr("startOffset", "50%").text(text);

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
                ])).attr("id", "BCBASketchH").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCBASketchH").attr("startOffset", "50%").text(text);

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

            // 底部水平标注
            dimBottomH(padding + 25, height - padding, width - padding - 25, height - padding, di);

            // 左侧垂直标注
            dimLeftV(padding, height - padding, padding, height - padding - straightHeight, h);

            // 中心线
            drawCenterLine(width / 2, height - padding + 10, width / 2, padding - 10);

            // 深度标注
            drawLine(padding - 40, padding + straightHeight, width / 2 - 3, padding + straightHeight);

            svg.append("path").attr("d", line([
                {x: padding - 30, y: height - padding - straightHeight - 30},
                {x: padding - 30, y: padding + straightHeight}
            ])).attr("id", "BCBASketchHI").classed("sketch", true);

            let g2 = svg.append("g");
            let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text2.append("textPath").attr("xlink:href", "#BCBASketchHI").attr("startOffset", "50%").text(hi);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 30, y: padding + straightHeight},
                    {x: padding - 27, y: padding + straightHeight + 15},
                    {x: padding - 33, y: padding + straightHeight + 15},
                    {x: padding - 30, y: padding + straightHeight}
                ]));

            // 厚度标注
            extLineBottomV(width - padding, height - padding);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding, y: height - padding + 30},
                    {x: width - padding + 15, y: height - padding + 30 - 3},
                    {x: width - padding + 15, y: height - padding + 30 + 3},
                    {x: width - padding, y: height - padding + 30}
                ]));
            drawLine(width - padding - straightHeight, height - padding + 30, width - padding, height - padding + 30);
            svg.append("path").attr("d", line([
                {x: width - padding + 15, y: height - padding + 30},
                {x: width - padding + 15 + 40, y: height - padding + 30}
            ])).attr("id", "BCBASketchTHKN").classed("sketch", true);
            let g3 = svg.append("g");
            let text3 = g3.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text3.append("textPath").attr("xlink:href", "#BCBASketchTHKN").attr("startOffset", "50%").text(thkn);

        }

        currentTabIndex = bcbad2d3.tabs('getTabIndex', bcbad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcba2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcba").length > 0) {
                    bcba2d();
                }
            });
        }
        bcbad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcba2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcba").length > 0) {
                            bcba2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 椭圆封头内压强度校核",
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

                if (index === 6) {
                    $(ed.target).combobox("loadData", BCBACategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCBAType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BCBASTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BCBAName);
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
                    bcbaSketch.empty();
                    // model
                    bcbaModel.empty();

                    // sketch
                    currentTabIndex = bcbad2d3.tabs('getTabIndex', bcbad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcba2d();
                        bcbaSketch.off("resize").on("resize", function () {
                            if ($("#bcba").length > 0) {
                                bcba2d();
                            }
                        });
                    }
                    bcbad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcba2d();
                                bcbaSketch.off("resize").on("resize", function () {
                                    if ($("#bcba").length > 0) {
                                        bcba2d();
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

                        BCBADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCBACategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCBAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCBADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCBACategory[index] = {
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
                    else if (index === 6) {

                        BCBACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCBAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBACategoryVal,
                                temp: BCBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBAType = [];
                                $(result).each(function (index, element) {
                                    BCBAType[index] = {
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
                    else if (index === 7) {

                        BCBATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBACategoryVal,
                                type: BCBATypeVal,
                                temp: BCBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBASTD = [];
                                $(result).each(function (index, element) {
                                    BCBASTD[index] = {
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
                    else if (index === 8) {

                        BCBASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBACategoryVal,
                                type: BCBATypeVal,
                                std: BCBASTDVal,
                                temp: BCBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBAName = [];
                                $(result).each(function (index, element) {
                                    BCBAName[index] = {
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

                        // 设计压力
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            let BCBAPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCBAPS = parseFloat(rows[2][columns[0][1].field]);

                                // 腐蚀裕量
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCBAC2 = parseFloat(rows[3][columns[0][1].field]);

                                    // 焊接接头系数
                                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                                        let BCBAE = parseFloat(rows[4][columns[0][1].field]);

                                        // 试验类型
                                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                            let BCBATestVal = rows[5][columns[0][1].field];

                                            // 材料名称
                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                let BCBANameVal = rows[9][columns[0][1].field];

                                                // AJAX 获取材料密度、最大最小厚度
                                                let BCBADensity, BCBAThkMin, BCBAThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCBACategoryVal,
                                                        "type": BCBATypeVal,
                                                        "std": BCBASTDVal,
                                                        "name": BCBANameVal,
                                                        "temp": BCBADT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCBADensity = parseFloat(result.density);
                                                        BCBAThkMin = parseFloat(result.thkMin);
                                                        BCBAThkMax = parseFloat(result.thkMax);

                                                        // 内直径
                                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                            let BCBADI = parseFloat(rows[10][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                bcba2d("ϕ" + BCBADI);
                                                                bcbaSketch.off("resize").on("resize", function () {
                                                                    if ($("#bcba").length > 0) {
                                                                        bcba2d("ϕ" + BCBADI);
                                                                    }
                                                                });
                                                            }
                                                            bcbad2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        bcba2d("ϕ" + BCBADI);
                                                                        bcbaSketch.off("resize").on("resize", function () {
                                                                            if ($("#bcba").length > 0) {
                                                                                bcba2d("ϕ" + BCBADI);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 筒体名义厚度
                                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) > Math.max(BCBAC2, BCBAThkMin)
                                                                && parseFloat(rows[11][columns[0][1].field]) <= BCBAThkMax) {
                                                                let BCBATHKN = parseFloat(rows[11][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcba2d("ϕ" + BCBADI, BCBATHKN);
                                                                    bcbaSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcba").length > 0) {
                                                                            bcba2d("ϕ" + BCBADI, BCBATHKN);
                                                                        }
                                                                    });
                                                                }
                                                                bcbad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcba2d("ϕ" + BCBADI, BCBATHKN);
                                                                            bcbaSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcba").length > 0) {
                                                                                    bcba2d("ϕ" + BCBADI, BCBATHKN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 外直径
                                                                let BCBADO = BCBADI + 2 * BCBATHKN;

                                                                // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                                let BCBADesignStress, BCBATestStress, BCBATestRel,
                                                                    BCBAC1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": BCBACategoryVal,
                                                                        "type": BCBATypeVal,
                                                                        "std": BCBASTDVal,
                                                                        "name": BCBANameVal,
                                                                        "thk": BCBATHKN,
                                                                        "temp": BCBADT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": BCBADO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        BCBADesignStress = parseFloat(result.ot);
                                                                        if (BCBADesignStress < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCBATestStress = parseFloat(result.o);
                                                                        if (BCBATestStress < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCBATestRel = parseFloat(result.rel);
                                                                        if (BCBATestRel < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCBAC1 = parseFloat(result.c1);
                                                                        if (BCBAC1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 曲面深度 HI
                                                                        if ((!jQuery.isEmptyObject(rows[12][columns[0][1].field]))
                                                                            && parseFloat(rows[12][columns[0][1].field]) <= BCBADI / 2) {
                                                                            let BCBAHI = parseFloat(rows[12][columns[0][1].field]);

                                                                            // Sketch
                                                                            if (currentTabIndex === 0) {
                                                                                bcba2d("ϕ" + BCBADI, BCBATHKN, BCBAHI);
                                                                                bcbaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bcba").length > 0) {
                                                                                        bcba2d("ϕ" + BCBADI, BCBATHKN, BCBAHI);
                                                                                    }
                                                                                });
                                                                            }
                                                                            bcbad2d3.tabs({
                                                                                onSelect: function (title, index) {
                                                                                    if (index === 0) {
                                                                                        bcba2d("ϕ" + BCBADI, BCBATHKN, BCBAHI);
                                                                                        bcbaSketch.off("resize").on("resize", function () {
                                                                                            if ($("#bcba").length > 0) {
                                                                                                bcba2d("ϕ" + BCBADI, BCBATHKN, BCBAHI);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });

                                                                            // 厚度附加量C
                                                                            let BCBAC = BCBAC1 + BCBAC2;

                                                                            // 有效厚度
                                                                            let BCBATHKE = BCBATHKN - BCBAC;

                                                                            // 计算压力
                                                                            let BCBAPC = BCBAPD + BCBAPS;

                                                                            // 形状系数 K
                                                                            let BCBAK = (2 + (BCBADI / (2 * BCBAHI)) * (BCBADI / (2 * BCBAHI))) / 6;

                                                                            // 计算厚度
                                                                            let BCBATHKC = (BCBAK * BCBAPC * BCBADI) / (2 * BCBADesignStress * BCBAE);

                                                                            // 封头最小厚度
                                                                            let BCBATHKMinimum;
                                                                            if (BCBAK <= 1) {
                                                                                BCBATHKMinimum = 0.0015 * BCBADI;
                                                                            } else {
                                                                                BCBATHKMinimum = 0.003 * BCBADI;
                                                                            }

                                                                            // 设计厚度
                                                                            let BCBATHKD = Math.max(BCBATHKC, BCBATHKMinimum) + BCBAC2;

                                                                            // 所需厚度提示信息
                                                                            south.html(
                                                                                "<span style='color:#444444;'>" +
                                                                                "所需厚度：" + (BCBATHKD + BCBAC1).toFixed(2) + " mm" +
                                                                                "</span>");

                                                                            // 厚度校核
                                                                            let BCBATHKCHK;
                                                                            if (BCBATHKN >= (BCBATHKD + BCBAC1).toFixed(2)) {
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + BCBATHKN + " mm" +
                                                                                    "</span>");
                                                                                BCBATHKCHK = "合格";
                                                                            } else {
                                                                                south.append(
                                                                                    "<span style='color:red;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "输入厚度：" + BCBATHKN + " mm" +
                                                                                    "</span>");
                                                                                BCBATHKCHK = "不合格";
                                                                            }

                                                                            // 应力校核
                                                                            let BCBADesignActStress = BCBAPC * (BCBAK * BCBADI) / (2 * BCBATHKE);

                                                                            let BCBADesignAllowStress = BCBAE * BCBADesignStress;
                                                                            let BCBADesignStressChk;
                                                                            if (BCBADesignActStress <= BCBADesignAllowStress) {
                                                                                BCBADesignStressChk = "合格";
                                                                            } else {
                                                                                BCBADesignStressChk = "不合格";
                                                                            }

                                                                            // 压力试验
                                                                            let BCBATestPT, BCBATestAllowStress;
                                                                            if (BCBATestVal === "液压试验") {

                                                                                // 试验压力
                                                                                BCBATestPT = Math.max(1.25 * BCBAPD * BCBATestStress / BCBADesignStress, 0.05);

                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "试压类型：液压" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "试验压力：" + BCBATestPT.toFixed(4) + " MPa" +
                                                                                    "</span>");

                                                                                // 许用应力
                                                                                BCBATestAllowStress = 0.9 * BCBATestRel * BCBAE;

                                                                            } else if (BCBATestVal === "气压试验") {

                                                                                // 试验压力
                                                                                BCBATestPT = Math.max(1.1 * BCBAPD * BCBATestStress / BCBADesignStress, 0.05);

                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "试压类型：气压" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "试验压力：" + BCBATestPT.toFixed(4) + " MPa" +
                                                                                    "</span>");

                                                                                // 许用应力
                                                                                BCBATestAllowStress = 0.8 * BCBATestRel * BCBAE;

                                                                            }

                                                                            // 压力试验时的实际应力
                                                                            let BCBATestActStress = BCBATestPT * BCBAK * BCBADI / (2 * BCBATHKE);

                                                                            // 压力试验时的应力校核
                                                                            let BCBATestStressChk;
                                                                            if (BCBATestActStress <= BCBATestAllowStress) {
                                                                                BCBATestStressChk = "合格";
                                                                            } else {
                                                                                BCBATestStressChk = "不合格";
                                                                            }

                                                                            // MAWP
                                                                            let BCBAMAWP = (2 * BCBATHKE * BCBADesignStress * BCBAE) / (BCBAK * BCBADI) - BCBAPS;

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "MAWP：" + BCBAMAWP.toFixed(4) + " MPa" +
                                                                                "</span>");

                                                                            // 直边高度 H
                                                                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                                                let BCBAH = parseFloat(rows[13][columns[0][1].field]);

                                                                                // 内壁长半轴
                                                                                let BCBAAXI = BCBADI / 2;

                                                                                // 内壁短半轴
                                                                                let BCBABXI = BCBAHI;

                                                                                // 内表面积
                                                                                let BCBAAI = Math.PI * BCBAAXI * (BCBAAXI + (BCBABXI / (Math.sqrt((BCBAAXI / BCBABXI) * (BCBAAXI / BCBABXI) - 1)) * Math.log(BCBAAXI / BCBABXI + Math.sqrt((BCBAAXI / BCBABXI) * (BCBAAXI / BCBABXI) - 1))) + 2 * BCBAH) / 1000000;

                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "内表面积：" + BCBAAI.toFixed(4) + " ㎡" +
                                                                                    "</span>");

                                                                                // 外壁长半轴
                                                                                let BCBAAXO = BCBAAXI + BCBATHKN;

                                                                                // 外壁短半轴
                                                                                let BCBABXO = BCBABXI + BCBATHKN;

                                                                                // 外表面积
                                                                                let BCBAAO = Math.PI * BCBAAXO * (BCBAAXO + (BCBABXO / (Math.sqrt((BCBAAXO / BCBABXO) * (BCBAAXO / BCBABXO) - 1)) * Math.log(BCBAAXO / BCBABXO + Math.sqrt((BCBAAXO / BCBABXO) * (BCBAAXO / BCBABXO) - 1))) + 2 * BCBAH) / 1000000;

                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "外表面积：" + BCBAAO.toFixed(4) + " ㎡" +
                                                                                    "</span>");

                                                                                // 内容积
                                                                                let BCBAVI = (2 / 3 * Math.PI * BCBAAXI * BCBAAXI * BCBABXI + Math.PI * BCBAAXI * BCBAAXI * BCBAH) / 1000000000;

                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "内容积：" + BCBAVI.toFixed(4) + " m³" +
                                                                                    "</span>");

                                                                                // 外容积
                                                                                let BCBAVO = (2 / 3 * Math.PI * BCBAAXO * BCBAAXO * BCBABXO + Math.PI * BCBAAXO * BCBAAXO * BCBAH) / 1000000000;

                                                                                // 质量
                                                                                let BCBAM = BCBADensity * (BCBAVO - BCBAVI);

                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "重量：" + BCBAM.toFixed(4) + " kg" +
                                                                                    "</span>");

                                                                                // docx
                                                                                let BCBAPayJS = $('#payjs');

                                                                                function getDocx() {
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "bcbadocx.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            ribbonName: "BCBA",

                                                                                            designPressure: BCBAPD,
                                                                                            designTemp: BCBADT,
                                                                                            staticPressure: BCBAPS,
                                                                                            innerDiameter: BCBADI,
                                                                                            hi: BCBAHI,
                                                                                            h: BCBAH,
                                                                                            thkn: BCBATHKN,
                                                                                            std: BCBASTDVal,
                                                                                            name: BCBANameVal,
                                                                                            c2: BCBAC2.toFixed(4),
                                                                                            e: BCBAE.toFixed(4),
                                                                                            test: BCBATestVal,
                                                                                            density: BCBADensity.toFixed(4),
                                                                                            testRel: BCBATestRel.toFixed(4),
                                                                                            c1: BCBAC1.toFixed(4),
                                                                                            designStress: BCBADesignStress.toFixed(4),
                                                                                            testStress: BCBATestStress.toFixed(4),
                                                                                            c: BCBAC.toFixed(4),
                                                                                            thke: BCBATHKE.toFixed(4),
                                                                                            calPressure: BCBAPC.toFixed(4),
                                                                                            k: BCBAK.toFixed(4),
                                                                                            thkc: BCBATHKC.toFixed(4),
                                                                                            thkMin: BCBATHKMinimum.toFixed(4),
                                                                                            thkd: BCBATHKD.toFixed(4),
                                                                                            thkChk: BCBATHKCHK,
                                                                                            designActStress: BCBADesignActStress.toFixed(4),
                                                                                            designAllowStress: BCBADesignAllowStress.toFixed(4),
                                                                                            designStressChk: BCBADesignStressChk,
                                                                                            testPressure: BCBATestPT.toFixed(4),
                                                                                            testActStress: BCBATestActStress.toFixed(4),
                                                                                            testAllowStress: BCBATestAllowStress.toFixed(4),
                                                                                            testStressChk: BCBATestStressChk,
                                                                                            mawp: BCBAMAWP.toFixed(4),
                                                                                            ai: BCBAAI.toFixed(4),
                                                                                            ao: BCBAAO.toFixed(4),
                                                                                            vi: BCBAVI.toFixed(4),
                                                                                            m: BCBAM.toFixed(4)
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
                                                                                                BCBAPayJS.dialog({
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
                                                                                                            BCBAPayJS.dialog("close");
                                                                                                            BCBAPayJS.dialog("clear");
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
                                                                                                                        BCBAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                BCBAPayJS.dialog('close');
                                                                                                                                BCBAPayJS.dialog('clear');
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

                                                                                // 3D 渲染
                                                                                function bcba3d() {

                                                                                    bcbaModel.empty();

                                                                                    // support webgl
                                                                                    if (!Detector.webgl) {
                                                                                        Detector.addGetWebGLMessage();
                                                                                    }

                                                                                    // scene
                                                                                    let scene = new THREE.Scene();

                                                                                    // light
                                                                                    let ambientLight = new THREE.AmbientLight(0xffffff);
                                                                                    scene.add(ambientLight);
                                                                                    let directionLight_1 = new THREE.DirectionalLight(0xffffff);
                                                                                    directionLight_1.position.set(1.5 * Math.max(BCBADO + BCBAH, BCBAHI + BCBAH), 1.5 * Math.max(BCBADO + BCBAH, BCBAHI + BCBAH), 1.5 * Math.max(BCBADO + BCBAH, BCBAHI + BCBAH));
                                                                                    scene.add(directionLight_1);
                                                                                    let directionLight_2 = new THREE.DirectionalLight(0xffffff);
                                                                                    directionLight_2.position.set(-1.5 * Math.max(BCBADO + BCBAH, BCBAHI + BCBAH), -1.5 * Math.max(BCBADO + BCBAH, BCBAHI + BCBAH), -1.5 * Math.max(BCBADO + BCBAH, BCBAHI + BCBAH));
                                                                                    scene.add(directionLight_2);

                                                                                    // material
                                                                                    let material = new THREE.MeshLambertMaterial({
                                                                                        color: 0x4f4f4f,
                                                                                        side: THREE.DoubleSide
                                                                                    });

                                                                                    // 线旋转 直边段 model
                                                                                    let points = [];
                                                                                    points.push(new THREE.Vector3(BCBADO / 2, 0, 0));
                                                                                    points.push(new THREE.Vector3(BCBADO / 2, -BCBAH, 0));
                                                                                    points.push(new THREE.Vector3(BCBADI / 2, -BCBAH, 0));
                                                                                    points.push(new THREE.Vector3(BCBADI / 2, 0, 0));
                                                                                    points.push(new THREE.Vector3(BCBADO / 2, 0, 0));
                                                                                    let straightGeometry = new THREE.LatheGeometry(points, 100, 0, 2 * Math.PI);
                                                                                    let straightMesh = new THREE.Mesh(straightGeometry, material);
                                                                                    scene.add(straightMesh);

                                                                                    // 通过椭圆旋转创建椭球
                                                                                    let outerEllipseCurve = new THREE.EllipseCurve(0, 0, BCBADO / 2, BCBAHI + BCBATHKN, 0, Math.PI / 2, false);
                                                                                    let outerPoints = outerEllipseCurve.getPoints(100);
                                                                                    let outerEllipseGeometry = new THREE.LatheGeometry(outerPoints, 100, 0, 2 * Math.PI);
                                                                                    let outerEllipseMesh = new THREE.Mesh(outerEllipseGeometry, material);
                                                                                    scene.add(outerEllipseMesh);

                                                                                    let innerEllipseCurve = new THREE.EllipseCurve(0, 0, BCBADI / 2, BCBAHI, 0, Math.PI / 2, false);
                                                                                    let innerPoints = innerEllipseCurve.getPoints(100);
                                                                                    let innerEllipseGeometry = new THREE.LatheGeometry(innerPoints, 100, 0, 2 * Math.PI);
                                                                                    let innerEllipseMesh = new THREE.Mesh(innerEllipseGeometry, material);
                                                                                    scene.add(innerEllipseMesh);

                                                                                    // camera
                                                                                    let camera = new THREE.PerspectiveCamera(60, bcbaModel.width() / bcbaModel.height(), 1, 100000);
                                                                                    camera.position.z = 1.5 * Math.max(BCBADO + BCBAH, BCBAHI + BCBAH);

                                                                                    // render
                                                                                    let renderer = new THREE.WebGLRenderer({
                                                                                        antialias: true,                                 //是否开启反锯齿
                                                                                        precision: "lowp",                              //highp/mediump/lowp着色精度选择
                                                                                        alpha: true,                                     //是否可以设置背景色透明
                                                                                        premultipliedAlpha: false,
                                                                                        stencil: false,
                                                                                        preserveDrawingBuffer: true,                     //是否保存绘图缓冲
                                                                                        maxLights: 3                                     //最大灯光数
                                                                                    });
                                                                                    renderer.setPixelRatio(window.devicePixelRatio);
                                                                                    renderer.setClearColor(0x00bfff, 0);
                                                                                    renderer.setSize(bcbaModel.width(), bcbaModel.height());
                                                                                    bcbaModel.append(renderer.domElement);

                                                                                    // 渲染函数
                                                                                    function render() {
                                                                                        renderer.render(scene, camera);
                                                                                    }

                                                                                    // controls
                                                                                    let controls = new THREE.TrackballControls(camera, renderer.domElement);
                                                                                    controls.rotateSpeed = 1.0;
                                                                                    controls.zoomSpeed = 1.2;
                                                                                    controls.panSpeed = 0.8;
                                                                                    controls.noZoom = false;
                                                                                    controls.noPan = false;
                                                                                    controls.staticMoving = true;
                                                                                    controls.dynamicDampingFactor = 0.3;
                                                                                    controls.keys = [65, 83, 68];
                                                                                    controls.addEventListener("change", render);

                                                                                    // animate
                                                                                    function animate() {
                                                                                        requestAnimationFrame(animate);
                                                                                        controls.update();
                                                                                    }

                                                                                    // resize
                                                                                    bcbaModel.resize(function () {
                                                                                        camera.aspect = bcbaModel.width() / bcbaModel.height();
                                                                                        camera.updateProjectionMatrix();
                                                                                        renderer.setSize(bcbaModel.width(), bcbaModel.height());
                                                                                        controls.handleResize();
                                                                                        render();
                                                                                    });

                                                                                    render();
                                                                                    animate();

                                                                                }

                                                                                // sketch
                                                                                if (currentTabIndex === 0) {

                                                                                    bcba2d("ϕ" + BCBADI, BCBATHKN, BCBAHI, BCBAH);
                                                                                    bcbaSketch.off("resize").on("resize", function () {
                                                                                        if ($("#bcba").length > 0) {
                                                                                            bcba2d("ϕ" + BCBADI, BCBATHKN, BCBAHI, BCBAH);
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else if (currentTabIndex === 1) {

                                                                                    bcba3d();
                                                                                }
                                                                                bcbad2d3.tabs({
                                                                                    onSelect: function (title, index) {
                                                                                        if (index === 0) {
                                                                                            bcba2d("ϕ" + BCBADI, BCBATHKN, BCBAHI, BCBAH);
                                                                                            bcbaSketch.off("resize").on("resize", function () {
                                                                                                if ($("#bcba").length > 0) {
                                                                                                    bcba2d("ϕ" + BCBADI, BCBATHKN, BCBAHI, BCBAH);
                                                                                                }
                                                                                            });
                                                                                        } else if (index === 1) {
                                                                                            bcba3d();
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                        else if ((!jQuery.isEmptyObject(rows[12][columns[0][1].field]))
                                                                            && parseFloat(rows[12][columns[0][1].field]) > BCBADI / 2) {
                                                                            south.html("封头深度 h<sub>i</sub> 不能大于 " + BCBADI / 2).css("color", "red");

                                                                        }
                                                                    },
                                                                    error: function () {
                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                    }
                                                                });
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) <= Math.max(BCBAC2, BCBAThkMin)) {
                                                                south.html("材料厚度不能小于等于 " + Math.max(BCBAC2, BCBAThkMin) + " mm").css("color", "red");
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) > BCBAThkMax) {
                                                                south.html("材料厚度不能大于 " + BCBAThkMax + " mm").css("color", "red");
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