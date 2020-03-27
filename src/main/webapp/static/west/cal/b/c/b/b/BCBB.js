$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcbbSketch = $("#d2");
    let bcbbModel = $("#d3");
    let bcbbd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcbb'></table>");
    let pg = $("#bcbb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/b/b/BCBB.json", function (result) {

        let BCBBDT, BCBBCategory, BCBBCategoryVal, BCBBType, BCBBTypeVal, BCBBSTD, BCBBSTDVal, BCBBName, columns, rows,
            ed;

        // 2D Sketch
        function bcbb2d(di, thkn, h) {

            if (!di) di = "ϕDi";
            if (!h) h = "h";
            if (!thkn) thkn = "δn";

            bcbbSketch.empty();

            let width = bcbbSketch.width();
            let height = bcbbSketch.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCBBSVG")
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
            let reduceHeight = 50;

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
                ])).attr("id", "BCBBSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCBBSketchDI").attr("startOffset", "50%").text(text);

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
                ])).attr("id", "BCBBSketchH").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCBBSketchH").attr("startOffset", "50%").text(text);

            }

            // 球壳外直径
            let outRadius = Math.min(width - 2 * padding, height - 2 * padding);
            let innerRadius = outRadius - 25;

            // 外壁实线
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding)
                .attr("rx", outRadius).attr("ry", outRadius).classed("sketch", true);

            // 内壁实线
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding)
                .attr("rx", outRadius - 25).attr("ry", outRadius - 25).classed("sketch", true);

            // 遮罩
            svg.append("rect").attr("x", 0).attr("y", height - padding - reduceHeight)
                .attr("width", width).attr("height", padding + reduceHeight).attr("fill", "white");

            // 外壁虚线
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding)
                .attr("rx", outRadius).attr("ry", outRadius).attr("stroke-dasharray", "5,5,5,5").classed("sketch", true);

            // 内壁虚线
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding)
                .attr("rx", outRadius - 25).attr("ry", outRadius - 25).attr("stroke-dasharray", "5,5,5,5").classed("sketch", true);

            // 遮罩
            svg.append("rect").attr("x", 0).attr("y", height - padding)
                .attr("width", width).attr("height", padding).attr("fill", "white");

            // 中心线
            drawCenterLine(width / 2 - outRadius - 10, height - padding, width / 2 + outRadius + 10, height - padding);
            drawCenterLine(width / 2, height - padding - outRadius - 10, width / 2, height - padding + 10);

            //截断线
            drawLine(width / 2 - Math.sqrt(outRadius * outRadius - reduceHeight * reduceHeight), height - padding - reduceHeight, width / 2 + Math.sqrt(outRadius * outRadius - reduceHeight * reduceHeight), height - padding - reduceHeight);

            // 缺边高度 h 标注
            dimLeftV(width / 2 - outRadius - 10, height - padding, width / 2 - outRadius - 10, height - padding - reduceHeight, h);
            drawLine(width / 2 - outRadius - 10 - 3, height - padding - reduceHeight, width / 2 - Math.sqrt(outRadius * outRadius - reduceHeight * reduceHeight) - 3, height - padding - reduceHeight);

            // DI
            dimBottomH(width / 2 - innerRadius, height - padding, width / 2 + innerRadius, height - padding, di);

            //厚度标注
            extLineBottomV(width / 2 + outRadius, height - padding);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + outRadius, y: height - padding + 30},
                    {x: width / 2 + outRadius + 15, y: height - padding + 30 - 3},
                    {x: width / 2 + outRadius + 15, y: height - padding + 30 + 3},
                    {x: width / 2 + outRadius, y: height - padding + 30}
                ]));

            drawLine(width / 2 + innerRadius, height - padding + 30, width / 2 + outRadius, height - padding + 30);

            svg.append("path").attr("d", line([
                {x: width / 2 + outRadius + 15, y: height - padding + 30},
                {x: width / 2 + outRadius + 15 + 40, y: height - padding + 30}
            ])).attr("id", "BCBBSketchTHKN").classed("sketch", true);

            let g3 = svg.append("g");
            let text3 = g3.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text3.append("textPath").attr("xlink:href", "#BCBBSketchTHKN").attr("startOffset", "50%").text(thkn);

        }

        currentTabIndex = bcbbd2d3.tabs('getTabIndex', bcbbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcbb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcbb").length > 0) {
                    bcbb2d();
                }
            });
        }
        bcbbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcbb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcbb").length > 0) {
                            bcbb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 球形封头内压强度校核",
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
                    $(ed.target).combobox("loadData", BCBBCategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCBBType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BCBBSTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BCBBName);
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
                    bcbbSketch.empty();
                    // model
                    bcbbModel.empty();

                    // sketch
                    currentTabIndex = bcbbd2d3.tabs('getTabIndex', bcbbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcbb2d();
                        bcbbSketch.off("resize").on("resize", function () {
                            if ($("#bcbb").length > 0) {
                                bcbb2d();
                            }
                        });
                    }
                    bcbbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcbb2d();
                                bcbbSketch.off("resize").on("resize", function () {
                                    if ($("#bcbb").length > 0) {
                                        bcbb2d();
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

                        BCBBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCBBCategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCBBType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBBName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBBCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCBBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCBBCategory[index] = {
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

                        BCBBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCBBType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBBCategoryVal,
                                temp: BCBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBBType = [];
                                $(result).each(function (index, element) {
                                    BCBBType[index] = {
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

                        BCBBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBBCategoryVal,
                                type: BCBBTypeVal,
                                temp: BCBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBBSTD = [];
                                $(result).each(function (index, element) {
                                    BCBBSTD[index] = {
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

                        BCBBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBBCategoryVal,
                                type: BCBBTypeVal,
                                std: BCBBSTDVal,
                                temp: BCBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBBName = [];
                                $(result).each(function (index, element) {
                                    BCBBName[index] = {
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
                            let BCBBPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCBBPS = parseFloat(rows[2][columns[0][1].field]);

                                // 腐蚀裕量
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCBBC2 = parseFloat(rows[3][columns[0][1].field]);

                                    // 焊接接头系数
                                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                                        let BCBBE = parseFloat(rows[4][columns[0][1].field]);

                                        // 试验类型
                                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                            let BCBBTestVal = rows[5][columns[0][1].field];

                                            // 材料名称
                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                let BCBBNameVal = rows[9][columns[0][1].field];

                                                // AJAX 获取材料密度、最大最小厚度
                                                let BCBBDensity, BCBBThkMin, BCBBThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCBBCategoryVal,
                                                        "type": BCBBTypeVal,
                                                        "std": BCBBSTDVal,
                                                        "name": BCBBNameVal,
                                                        "temp": BCBBDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCBBDensity = parseFloat(result.density);
                                                        BCBBThkMin = parseFloat(result.thkMin);
                                                        BCBBThkMax = parseFloat(result.thkMax);

                                                        // 内直径
                                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                            let BCBBDI = parseFloat(rows[10][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                bcbb2d("ϕ" + BCBBDI);
                                                                bcbbSketch.off("resize").on("resize", function () {
                                                                    if ($("#bcbb").length > 0) {
                                                                        bcbb2d("ϕ" + BCBBDI);
                                                                    }
                                                                });
                                                            }
                                                            bcbbd2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        bcbb2d("ϕ" + BCBBDI);
                                                                        bcbbSketch.off("resize").on("resize", function () {
                                                                            if ($("#bcbb").length > 0) {
                                                                                bcbb2d("ϕ" + BCBBDI);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 筒体名义厚度
                                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) > Math.max(BCBBC2, BCBBThkMin)
                                                                && parseFloat(rows[11][columns[0][1].field]) <= BCBBThkMax) {
                                                                let BCBBTHKN = parseFloat(rows[11][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcbb2d("ϕ" + BCBBDI, BCBBTHKN);
                                                                    bcbbSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcbb").length > 0) {
                                                                            bcbb2d("ϕ" + BCBBDI, BCBBTHKN);
                                                                        }
                                                                    });
                                                                }
                                                                bcbbd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcbb2d("ϕ" + BCBBDI, BCBBTHKN);
                                                                            bcbbSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcbb").length > 0) {
                                                                                    bcbb2d("ϕ" + BCBBDI, BCBBTHKN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // DO
                                                                let BCBBDO = BCBBDI + 2 * BCBBTHKN;

                                                                // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                                let BCBBDesignStress, BCBBTestStress, BCBBTestRel,
                                                                    BCBBC1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": BCBBCategoryVal,
                                                                        "type": BCBBTypeVal,
                                                                        "std": BCBBSTDVal,
                                                                        "name": BCBBNameVal,
                                                                        "thk": BCBBTHKN,
                                                                        "temp": BCBBDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": BCBBDO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        BCBBDesignStress = parseFloat(result.ot);
                                                                        if (BCBBDesignStress < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCBBTestStress = parseFloat(result.o);
                                                                        if (BCBBTestStress < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCBBTestRel = parseFloat(result.rel);
                                                                        if (BCBBTestRel < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCBBC1 = parseFloat(result.c1);
                                                                        if (BCBBC1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // C
                                                                        let BCBBC = BCBBC1 + BCBBC2;

                                                                        // THKE
                                                                        let BCBBTHKE = BCBBTHKN - BCBBC;

                                                                        // PC
                                                                        let BCBBPC = BCBBPD + BCBBPS;

                                                                        // THKC
                                                                        let BCBBTHKC = (BCBBPC * BCBBDI) / (4 * BCBBDesignStress * BCBBE);

                                                                        // THKD
                                                                        let BCBBTHKD = BCBBTHKC + BCBBC2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "所需厚度：" + (BCBBTHKD + BCBBC1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 厚度校核
                                                                        let BCBBTHKCHK;
                                                                        if (BCBBTHKN >= (BCBBTHKD + BCBBC1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCBBTHKN + " mm" +
                                                                                "</span>");
                                                                            BCBBTHKCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCBBTHKN + " mm" +
                                                                                "</span>");
                                                                            BCBBTHKCHK = "不合格";
                                                                        }

                                                                        // 应力校核
                                                                        let BCBBDesignActStress = BCBBPC * BCBBDI / (4 * BCBBTHKE);

                                                                        let BCBBDesignAllowStress = BCBBE * BCBBDesignStress;
                                                                        let BCBBDesignStressChk;
                                                                        if (BCBBDesignActStress <= BCBBDesignAllowStress) {
                                                                            BCBBDesignStressChk = "合格";
                                                                        } else {
                                                                            BCBBDesignStressChk = "不合格";
                                                                        }

                                                                        // 压力试验
                                                                        let BCBBTestPT, BCBBTestAllowStress;
                                                                        if (BCBBTestVal === "液压试验") {

                                                                            // 试验压力
                                                                            BCBBTestPT = Math.max(1.25 * BCBBPD * BCBBTestStress / BCBBDesignStress, 0.05);

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCBBTestPT.toFixed(4) + " MPa" +
                                                                                "</span>");

                                                                            // 许用应力
                                                                            BCBBTestAllowStress = 0.9 * BCBBTestRel * BCBBE;

                                                                        } else if (BCBBTestVal === "气压试验") {

                                                                            // 试验压力
                                                                            BCBBTestPT = Math.max(1.10 * BCBBPD * BCBBTestStress / BCBBDesignStress, 0.05);

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCBBTestPT.toFixed(4) + " MPa" +
                                                                                "</span>");

                                                                            // 许用应力
                                                                            BCBBTestAllowStress = 0.8 * BCBBTestRel * BCBBE;

                                                                        }

                                                                        // 压力试验时的实际应力
                                                                        let BCBBTestActStress = BCBBTestPT * BCBBDI / (4 * BCBBTHKE);

                                                                        // 压力试验时的应力校核
                                                                        let BCBBTestStressChk;
                                                                        if (BCBBTestActStress <= BCBBTestAllowStress) {
                                                                            BCBBTestStressChk = "合格";
                                                                        } else {
                                                                            BCBBTestStressChk = "不合格";
                                                                        }

                                                                        // MAWP
                                                                        let BCBBMAWP = 4 * BCBBTHKE * BCBBDesignStress * BCBBE / BCBBDI - BCBBPS;

                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "MAWP：" + BCBBMAWP.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                        // 缺边高度 H
                                                                        if ((!jQuery.isEmptyObject(rows[12][columns[0][1].field]))
                                                                            && parseFloat(rows[12][columns[0][1].field]) < BCBBDI / 2) {
                                                                            let BCBBH = parseFloat(rows[12][columns[0][1].field]);

                                                                            // Sketch
                                                                            if (currentTabIndex === 0) {
                                                                                bcbb2d("ϕ" + BCBBDI, BCBBTHKN, BCBBH);
                                                                                bcbbSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bcbb").length > 0) {
                                                                                        bcbb2d("ϕ" + BCBBDI, BCBBTHKN, BCBBH);
                                                                                    }
                                                                                });
                                                                            }
                                                                            bcbbd2d3.tabs({
                                                                                onSelect: function (title, index) {
                                                                                    if (index === 0) {
                                                                                        bcbb2d("ϕ" + BCBBDI, BCBBTHKN, BCBBH);
                                                                                        bcbbSketch.off("resize").on("resize", function () {
                                                                                            if ($("#bcbb").length > 0) {
                                                                                                bcbb2d("ϕ" + BCBBDI, BCBBTHKN, BCBBH);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });

                                                                            // AI
                                                                            let BCBBAI = (0.5 * Math.PI * BCBBDI * BCBBDI - Math.PI * BCBBDI * BCBBH) / 1000000;

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "内表面积：" + BCBBAI.toFixed(4) + " ㎡" +
                                                                                "</span>");

                                                                            // AO
                                                                            let BCBBAO = (0.5 * Math.PI * BCBBDO * BCBBDO - Math.PI * BCBBDO * BCBBH) / 1000000;

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "外表面积：" + BCBBAO.toFixed(4) + " ㎡" +
                                                                                "</span>");

                                                                            // VI
                                                                            let BCBBVI = (Math.PI * BCBBDI * BCBBDI * BCBBDI / 12 - Math.PI * BCBBDI * BCBBDI * BCBBH / 4) / 1000000000;

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "内容积：" + BCBBVI.toFixed(4) + " m³" +
                                                                                "</span>");

                                                                            // 外容积
                                                                            let BCBBVO = (Math.PI * BCBBDO * BCBBDO * BCBBDO / 12 - Math.PI * BCBBDO * BCBBDO * BCBBH / 4) / 1000000000;

                                                                            // 质量
                                                                            let BCBBM = BCBBDensity * (BCBBVO - BCBBVI);

                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "重量：" + BCBBM.toFixed(4) + " kg" +
                                                                                "</span>");

                                                                            // docx
                                                                            let BCBBPayJS = $('#payjs');

                                                                            function getDocx() {
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "bcbbdocx.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        ribbonName: "BCBB",

                                                                                        designPressure: BCBBPD,
                                                                                        designTemp: BCBBDT,
                                                                                        staticPressure: BCBBPS,
                                                                                        innerDiameter: BCBBDI,
                                                                                        h: BCBBH,
                                                                                        thkn: BCBBTHKN,
                                                                                        std: BCBBSTDVal,
                                                                                        name: BCBBNameVal,
                                                                                        c2: BCBBC2.toFixed(4),
                                                                                        e: BCBBE.toFixed(4),
                                                                                        test: BCBBTestVal,
                                                                                        density: BCBBDensity.toFixed(4),
                                                                                        testRel: BCBBTestRel.toFixed(4),
                                                                                        c1: BCBBC1.toFixed(4),
                                                                                        designStress: BCBBDesignStress.toFixed(4),
                                                                                        testStress: BCBBTestStress.toFixed(4),
                                                                                        c: BCBBC.toFixed(4),
                                                                                        thke: BCBBTHKE.toFixed(4),
                                                                                        calPressure: BCBBPC.toFixed(4),
                                                                                        thkc: BCBBTHKC.toFixed(4),
                                                                                        thkd: BCBBTHKD.toFixed(4),
                                                                                        thkChk: BCBBTHKCHK,
                                                                                        designActStress: BCBBDesignActStress.toFixed(4),
                                                                                        designAllowStress: BCBBDesignAllowStress.toFixed(4),
                                                                                        designStressChk: BCBBDesignStressChk,
                                                                                        testPressure: BCBBTestPT.toFixed(4),
                                                                                        testActStress: BCBBTestActStress.toFixed(4),
                                                                                        testAllowStress: BCBBTestAllowStress.toFixed(4),
                                                                                        testStressChk: BCBBTestStressChk,
                                                                                        mawp: BCBBMAWP.toFixed(4),
                                                                                        ai: BCBBAI.toFixed(4),
                                                                                        ao: BCBBAO.toFixed(4),
                                                                                        vi: BCBBVI.toFixed(4),
                                                                                        m: BCBBM.toFixed(4)
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
                                                                                            BCBBPayJS.dialog({
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
                                                                                                        BCBBPayJS.dialog("close");
                                                                                                        BCBBPayJS.dialog("clear");
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
                                                                                                                    BCBBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                            BCBBPayJS.dialog('close');
                                                                                                                            BCBBPayJS.dialog('clear');
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
                                                                            function bcbb3d() {

                                                                                bcbbModel.empty();

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
                                                                                directionLight_1.position.set(1.5 * BCBBDO, 1.5 * BCBBDO, 1.5 * BCBBDO);
                                                                                scene.add(directionLight_1);
                                                                                let directionLight_2 = new THREE.DirectionalLight(0xffffff);
                                                                                directionLight_2.position.set(-1.5 * BCBBDO, -1.5 * BCBBDO, -1.5 * BCBBDO);
                                                                                scene.add(directionLight_2);

                                                                                // material
                                                                                let material = new THREE.MeshLambertMaterial({
                                                                                    color: 0x4f4f4f,
                                                                                    side: THREE.DoubleSide
                                                                                });

                                                                                // 通过圆弧旋转创建球面
                                                                                let outerCircleCurve = new THREE.EllipseCurve(0, 0, BCBBDO / 2, BCBBDO / 2, Math.asin(BCBBH / (BCBBDO / 2)), Math.PI / 2, false);
                                                                                let outerPoints = outerCircleCurve.getPoints(100);
                                                                                let outerCircleGeometry = new THREE.LatheGeometry(outerPoints, 100, 0, 2 * Math.PI);
                                                                                let outerCircleMesh = new THREE.Mesh(outerCircleGeometry, material);
                                                                                scene.add(outerCircleMesh);

                                                                                let innerCircleCurve = new THREE.EllipseCurve(0, 0, BCBBDI / 2, BCBBDI / 2, Math.asin(BCBBH / (BCBBDI / 2)), Math.PI / 2, false);
                                                                                let innerPoints = innerCircleCurve.getPoints(100);
                                                                                let innerCircleGeometry = new THREE.LatheGeometry(innerPoints, 100, 0, 2 * Math.PI);
                                                                                let innerCircleMesh = new THREE.Mesh(innerCircleGeometry, material);
                                                                                scene.add(innerCircleMesh);

                                                                                let points = [];
                                                                                points.push(new THREE.Vector3(Math.sqrt((BCBBDO / 2) * (BCBBDO / 2) - BCBBH * BCBBH), BCBBH, 0));
                                                                                points.push(new THREE.Vector3(Math.sqrt((BCBBDI / 2) * (BCBBDI / 2) - BCBBH * BCBBH), BCBBH, 0));
                                                                                let straightGeometry = new THREE.LatheGeometry(points, 100, 0, 2 * Math.PI);
                                                                                let straightMesh = new THREE.Mesh(straightGeometry, material);
                                                                                scene.add(straightMesh);

                                                                                // camera
                                                                                let camera = new THREE.PerspectiveCamera(60, bcbbModel.width() / bcbbModel.height(), 1, 100000);
                                                                                camera.position.z = 1.5 * BCBBDO;

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
                                                                                renderer.setSize(bcbbModel.width(), bcbbModel.height());
                                                                                bcbbModel.append(renderer.domElement);

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
                                                                                bcbbModel.resize(function () {
                                                                                    camera.aspect = bcbbModel.width() / bcbbModel.height();
                                                                                    camera.updateProjectionMatrix();
                                                                                    renderer.setSize(bcbbModel.width(), bcbbModel.height());
                                                                                    controls.handleResize();
                                                                                    render();
                                                                                });

                                                                                render();
                                                                                animate();

                                                                            }

                                                                            // sketch
                                                                            if (currentTabIndex === 0) {
                                                                                bcbb2d("ϕ" + BCBBDI, BCBBTHKN, BCBBH);
                                                                                bcbbSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bcbb").length > 0) {
                                                                                        bcbb2d("ϕ" + BCBBDI, BCBBTHKN, BCBBH);
                                                                                    }
                                                                                });
                                                                            }
                                                                            else if (currentTabIndex === 1) {
                                                                                bcbb3d();
                                                                            }
                                                                            bcbbd2d3.tabs({
                                                                                onSelect: function (title, index) {
                                                                                    if (index === 0) {
                                                                                        bcbb2d("ϕ" + BCBBDI, BCBBTHKN, BCBBH);
                                                                                        bcbbSketch.off("resize").on("resize", function () {
                                                                                            if ($("#bcbb").length > 0) {
                                                                                                bcbb2d("ϕ" + BCBBDI, BCBBTHKN, BCBBH);
                                                                                            }
                                                                                        });
                                                                                    } else if (index === 1) {
                                                                                        bcbb3d();
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        else if ((!jQuery.isEmptyObject(rows[12][columns[0][1].field]))
                                                                            && parseFloat(rows[12][columns[0][1].field]) > BCBBDI / 2) {
                                                                            south.html("缺段高度 h 不能大于 " + BCBBDI / 2).css("color", "red");

                                                                        }
                                                                    },
                                                                    error: function () {
                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                    }
                                                                });
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) <= Math.max(BCBBC2, BCBBThkMin)) {
                                                                south.html("材料厚度不能小于等于 " + Math.max(BCBBC2, BCBBThkMin) + " mm").css("color", "red");
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) > BCBBThkMax) {
                                                                south.html("材料厚度不能大于 " + BCBBThkMax + " mm").css("color", "red");
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