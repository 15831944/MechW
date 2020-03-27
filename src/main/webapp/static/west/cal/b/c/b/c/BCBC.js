$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcbcSketch = $("#d2");
    let bcbcModel = $("#d3");
    let bcbcd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcbc'></table>");
    let pg = $("#bcbc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/b/c/BCBC.json", function (result) {

        let BCBCDT, BCBCCategory, BCBCCategoryVal, BCBCType, BCBCTypeVal, BCBCSTD, BCBCSTDVal, BCBCName, columns, rows,
            ed;

        // 2D Sketch
        function bcbc2d(di, crownRi, cornerRi, thkn, h) {

            if (!di) di = "ϕDi";
            if (!crownRi) crownRi = "Ri";
            if (!cornerRi) cornerRi = "ri";
            if (!h) h = "h";
            if (!thkn) thkn = "δn";

            bcbcSketch.empty();

            let width = bcbcSketch.width();
            let height = bcbcSketch.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCBCSVG")
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
            let padding = 120;
            let straightHeight = 50;
            let thickness = 20;

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
                ])).attr("id", "BCBCSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCBCSketchDI").attr("startOffset", "50%").text(text);

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
                ])).attr("id", "BCBCSketchH").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCBCSketchH").attr("startOffset", "50%").text(text);

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

            // 直边段
            drawLine(padding, height - padding, width - padding, height - padding);
            drawLine(padding, height - padding - straightHeight, width - padding, height - padding - straightHeight);
            drawLine(padding, height - padding - straightHeight, padding, height - padding);
            drawLine(padding + thickness, height - padding - straightHeight, padding + thickness, height - padding);
            drawLine(width - padding, height - padding - straightHeight, width - padding, height - padding);
            drawLine(width - padding - thickness, height - padding - straightHeight, width - padding - thickness, height - padding);

            // 轮廓弧线
            let cornerRadiusInner = 0.1 * (width - 2 * padding - 2 * thickness);
            let cornerRadiusOuter = cornerRadiusInner + thickness;
            let crownRadiusInner = width - 2 * padding - 2 * thickness;
            let crownRadiusOuter = crownRadiusInner + thickness;

            let ANG = Math.acos(((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) / ((width - 2 * padding - 2 * thickness) - cornerRadiusInner));

            drawArc(cornerRadiusInner, cornerRadiusInner, width - padding - thickness - cornerRadiusInner + cornerRadiusInner * Math.cos(ANG), height - padding - straightHeight - cornerRadiusInner * Math.sin(ANG), width - padding - thickness, height - padding - straightHeight);
            drawArc(cornerRadiusOuter, cornerRadiusOuter, width - padding - cornerRadiusOuter + cornerRadiusOuter * Math.cos(ANG), height - padding - straightHeight - cornerRadiusOuter * Math.sin(ANG), width - padding, height - padding - straightHeight);
            drawArc(cornerRadiusInner, cornerRadiusInner, padding + thickness, height - padding - straightHeight, padding + thickness + cornerRadiusInner - cornerRadiusInner * Math.cos(ANG), height - padding - straightHeight - cornerRadiusInner * Math.sin(ANG));
            drawArc(cornerRadiusOuter, cornerRadiusOuter, padding, height - padding - straightHeight, padding + cornerRadiusOuter - cornerRadiusOuter * Math.cos(ANG), height - padding - straightHeight - cornerRadiusOuter * Math.sin(ANG));
            drawArc(crownRadiusInner, crownRadiusInner, padding + thickness + cornerRadiusInner - cornerRadiusInner * Math.cos(ANG), height - padding - straightHeight - cornerRadiusInner * Math.sin(ANG), width - padding - thickness - cornerRadiusInner + cornerRadiusInner * Math.cos(ANG), height - padding - straightHeight - cornerRadiusInner * Math.sin(ANG));
            drawArc(crownRadiusOuter, crownRadiusOuter, padding + cornerRadiusOuter - cornerRadiusOuter * Math.cos(ANG), height - padding - straightHeight - cornerRadiusOuter * Math.sin(ANG), width - padding - cornerRadiusOuter + cornerRadiusOuter * Math.cos(ANG), height - padding - straightHeight - cornerRadiusOuter * Math.sin(ANG));

            // 中心线
            drawCenterLine(width / 2, height - padding + 10, width / 2, height - padding - straightHeight - ((1 - Math.sin(ANG)) * crownRadiusOuter + cornerRadiusOuter * Math.sin(ANG)) - 10);

            // DI
            dimBottomH(padding + thickness, height - padding, width - padding - thickness, height - padding, di);

            //厚度标注
            extLineBottomV(width - padding, height - padding);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding, y: height - padding + 30},
                    {x: width - padding + 15, y: height - padding + 30 - 3},
                    {x: width - padding + 15, y: height - padding + 30 + 3},
                    {x: width - padding, y: height - padding + 30}
                ]));
            drawLine(width - padding - thickness, height - padding + 30, width - padding, height - padding + 30);
            svg.append("path").attr("d", line([
                {x: width - padding + 15, y: height - padding + 30},
                {x: width - padding + 15 + 40, y: height - padding + 30}
            ])).attr("id", "BCBCSketchTHKN").classed("sketch", true);
            let g3 = svg.append("g");
            let text3 = g3.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text3.append("textPath").attr("xlink:href", "#BCBCSketchTHKN").attr("startOffset", "50%").text(thkn);

            // 直边 h 标注
            dimLeftV(padding, height - padding, padding, height - padding - straightHeight, h);

            // 转角内半径标注
            svg.append("path").attr("d", line([
                {x: width - padding - thickness - cornerRadiusInner, y: height - padding - straightHeight},
                {x: width - padding - thickness - 15, y: height - padding - straightHeight}
            ])).attr("id", "BCBCSketchCornerRi").classed("sketch", true).attr("transform", "rotate(" + (-ANG / Math.PI * 180) / 2 + ", " + (width - padding - thickness - cornerRadiusInner) + " " + (height - padding - straightHeight) + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - thickness, y: height - padding - straightHeight},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight - 3},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight + 3},
                    {x: width - padding - thickness, y: height - padding - straightHeight}
                ])).attr("transform", "rotate(" + (-ANG / Math.PI * 180) / 2 + ", " + (width - padding - thickness - cornerRadiusInner) + " " + (height - padding - straightHeight) + ")");
            let text4 = svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text4.append("textPath").attr("xlink:href", "#BCBCSketchCornerRi").attr("startOffset", "50%").text(cornerRi);

            // 球冠内半径标注
            svg.append("path").attr("d", line([
                {
                    x: width / 2,
                    y: height - padding - straightHeight - (crownRadiusInner * Math.sin(ANG) - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                },
                {
                    x: width / 2,
                    y: height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                }
            ])).attr("id", "BCBCSketchCrownRi").classed("sketch", true).attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 2 + ", " + width / 2 + " " + (crownRadiusInner + height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {
                        x: width / 2,
                        y: height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                    },
                    {
                        x: width / 2 - 3,
                        y: (height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + 15
                    },
                    {
                        x: width / 2 + 3,
                        y: (height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + 15
                    },
                    {
                        x: width / 2,
                        y: height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                    }
                ])).attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 2 + ", " + width / 2 + " " + (crownRadiusInner + height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + ")");
            let text5 = svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
            text5.append("textPath").attr("xlink:href", "#BCBCSketchCrownRi").attr("startOffset", "50%").text(crownRi);

        }

        currentTabIndex = bcbcd2d3.tabs('getTabIndex', bcbcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcbc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcbc").length > 0) {
                    bcbc2d();
                }
            });
        }
        bcbcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcbc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcbc").length > 0) {
                            bcbc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 碟形封头内压强度校核",
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
                    $(ed.target).combobox("loadData", BCBCCategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCBCType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BCBCSTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BCBCName);
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
                    bcbcSketch.empty();

                    // model
                    bcbcModel.empty();

                    // sketch
                    currentTabIndex = bcbcd2d3.tabs('getTabIndex', bcbcd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        bcbc2d();
                        bcbcSketch.off("resize").on("resize", function () {
                            if ($("#bcbc").length > 0) {
                                bcbc2d();
                            }
                        });
                    }
                    bcbcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcbc2d();
                                bcbcSketch.off("resize").on("resize", function () {
                                    if ($("#bcbc").length > 0) {
                                        bcbc2d();
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

                        BCBCDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCBCCategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCBCType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBCSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBCName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCBCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCBCCategory[index] = {
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

                        BCBCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCBCType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBCSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBCCategoryVal,
                                temp: BCBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBCType = [];
                                $(result).each(function (index, element) {
                                    BCBCType[index] = {
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

                        BCBCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCBCSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBCCategoryVal,
                                type: BCBCTypeVal,
                                temp: BCBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBCSTD = [];
                                $(result).each(function (index, element) {
                                    BCBCSTD[index] = {
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

                        BCBCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCBCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCBCCategoryVal,
                                type: BCBCTypeVal,
                                std: BCBCSTDVal,
                                temp: BCBCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCBCName = [];
                                $(result).each(function (index, element) {
                                    BCBCName[index] = {
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
                            let BCBCPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCBCPS = parseFloat(rows[2][columns[0][1].field]);

                                // 腐蚀裕量
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCBCC2 = parseFloat(rows[3][columns[0][1].field]);

                                    // 焊接接头系数
                                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                                        let BCBCE = parseFloat(rows[4][columns[0][1].field]);

                                        // 试验类型
                                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                            let BCBCTestVal = rows[5][columns[0][1].field];

                                            // 材料名称
                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                let BCBCNameVal = rows[9][columns[0][1].field];

                                                // AJAX 获取材料密度、最大最小厚度
                                                let BCBCDensity, BCBCThkMin, BCBCThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCBCCategoryVal,
                                                        "type": BCBCTypeVal,
                                                        "std": BCBCSTDVal,
                                                        "name": BCBCNameVal,
                                                        "temp": BCBCDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCBCDensity = parseFloat(result.density);
                                                        BCBCThkMin = parseFloat(result.thkMin);
                                                        BCBCThkMax = parseFloat(result.thkMax);

                                                        // DI
                                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                            let BCBCDI = parseFloat(rows[10][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                bcbc2d("ϕ" + BCBCDI);
                                                                bcbcSketch.off("resize").on("resize", function () {
                                                                    if ($("#bcbc").length > 0) {
                                                                        bcbc2d("ϕ" + BCBCDI);
                                                                    }
                                                                });
                                                            }
                                                            bcbcd2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        bcbc2d("ϕ" + BCBCDI);
                                                                        bcbcSketch.off("resize").on("resize", function () {
                                                                            if ($("#bcbc").length > 0) {
                                                                                bcbc2d("ϕ" + BCBCDI);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 球冠部分内半径
                                                            if ((!jQuery.isEmptyObject(rows[11][columns[0][1].field]))
                                                                && parseFloat(rows[11][columns[0][1].field]) > BCBCDI / 2
                                                                && parseFloat(rows[11][columns[0][1].field]) <= BCBCDI) {
                                                                let BCBCCrownRi = parseFloat(rows[11][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi);
                                                                    bcbcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcbc").length > 0) {
                                                                            bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi);
                                                                        }
                                                                    });
                                                                }
                                                                bcbcd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi);
                                                                            bcbcSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcbc").length > 0) {
                                                                                    bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 转角部分内半径
                                                                if ((!jQuery.isEmptyObject(rows[12][columns[0][1].field]))
                                                                    && parseFloat(rows[12][columns[0][1].field]) >= BCBCDI / 10) {
                                                                    let BCBCCornerRi = parseFloat(rows[12][columns[0][1].field]);

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi);
                                                                        bcbcSketch.off("resize").on("resize", function () {
                                                                            if ($("#bcbc").length > 0) {
                                                                                bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi);
                                                                            }
                                                                        });
                                                                    }
                                                                    bcbcd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi);
                                                                                bcbcSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bcbc").length > 0) {
                                                                                        bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // THKN
                                                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                        && parseFloat(rows[13][columns[0][1].field]) >= Math.max(BCBCC2, BCBCThkMin)
                                                                        && parseFloat(rows[13][columns[0][1].field]) <= Math.min(BCBCCornerRi / 3, BCBCThkMax).toFixed(2)) {
                                                                        let BCBCTHKN = parseFloat(rows[13][columns[0][1].field]);

                                                                        // Sketch
                                                                        if (currentTabIndex === 0) {
                                                                            bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN);
                                                                            bcbcSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcbc").length > 0) {
                                                                                    bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN);
                                                                                }
                                                                            });
                                                                        }
                                                                        bcbcd2d3.tabs({
                                                                            onSelect: function (title, index) {
                                                                                if (index === 0) {
                                                                                    bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN);
                                                                                    bcbcSketch.off("resize").on("resize", function () {
                                                                                        if ($("#bcbc").length > 0) {
                                                                                            bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        });

                                                                        // DO
                                                                        let BCBCDO = BCBCDI + 2 * BCBCTHKN;

                                                                        let BCBCDesignStress, BCBCTestStress,
                                                                            BCBCTestRel, BCBCC1;
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                "category": BCBCCategoryVal,
                                                                                "type": BCBCTypeVal,
                                                                                "std": BCBCSTDVal,
                                                                                "name": BCBCNameVal,
                                                                                "thk": BCBCTHKN,
                                                                                "temp": BCBCDT,
                                                                                "highLow": 3,
                                                                                "isTube": 0,
                                                                                "od": BCBCDO
                                                                            }),
                                                                            beforeSend: function () {
                                                                            },
                                                                            success: function (result) {

                                                                                BCBCDesignStress = parseFloat(result.ot);
                                                                                if (BCBCDesignStress < 0) {
                                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                    return false;
                                                                                }
                                                                                BCBCTestStress = parseFloat(result.o);
                                                                                if (BCBCTestStress < 0) {
                                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                    return false;
                                                                                }
                                                                                BCBCTestRel = parseFloat(result.rel);
                                                                                if (BCBCTestRel < 0) {
                                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                    return false;
                                                                                }
                                                                                BCBCC1 = parseFloat(result.c1);
                                                                                if (BCBCC1 < 0) {
                                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                    return false;
                                                                                }

                                                                                // 厚度附加量C
                                                                                let BCBCC = BCBCC1 + BCBCC2;

                                                                                // 有效厚度
                                                                                let BCBCTHKE = BCBCTHKN - BCBCC;

                                                                                // 计算压力
                                                                                let BCBCPC = BCBCPD + BCBCPS;

                                                                                // M
                                                                                let BCBCM = (3 + Math.sqrt(BCBCCrownRi / BCBCCornerRi)) / 4;

                                                                                // THKC
                                                                                let BCBCTHKC = (BCBCM * BCBCPC * BCBCCrownRi) / (2 * BCBCDesignStress * BCBCE);

                                                                                // 封头最小厚度
                                                                                let BCBCTHKMinimum;
                                                                                if (BCBCM <= 1.34) {
                                                                                    BCBCTHKMinimum = 0.0015 * BCBCDI;
                                                                                }
                                                                                else {
                                                                                    BCBCTHKMinimum = 0.003 * BCBCDI;
                                                                                }

                                                                                // THKD
                                                                                let BCBCTHKD = Math.max(BCBCTHKC, BCBCTHKMinimum) + BCBCC2;

                                                                                // 所需厚度提示信息
                                                                                south.html(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "所需厚度：" + (BCBCTHKD + BCBCC1).toFixed(2) + " mm" +
                                                                                    "</span>");

                                                                                // 厚度校核
                                                                                let BCBCTHKCHK;
                                                                                if (BCBCTHKN >= (BCBCTHKD + BCBCC1).toFixed(2)) {
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "输入厚度：" + BCBCTHKN + " mm" +
                                                                                        "</span>");
                                                                                    BCBCTHKCHK = "合格";
                                                                                } else {
                                                                                    south.append(
                                                                                        "<span style='color:red;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "输入厚度：" + BCBCTHKN + " mm" +
                                                                                        "</span>");
                                                                                    BCBCTHKCHK = "不合格";
                                                                                }

                                                                                // 应力校核
                                                                                let BCBCDesignActStress = BCBCPC * BCBCM * BCBCCrownRi / (2 * BCBCTHKE);

                                                                                let BCBCDesignAllowStress = BCBCE * BCBCDesignStress;
                                                                                let BCBCDesignStressChk;
                                                                                if (BCBCDesignActStress <= BCBCDesignAllowStress) {
                                                                                    BCBCDesignStressChk = "合格";
                                                                                } else {
                                                                                    BCBCDesignStressChk = "不合格";
                                                                                }

                                                                                // 压力试验
                                                                                let BCBCTestPT, BCBCTestAllowStress;
                                                                                if (BCBCTestVal === "液压试验") {

                                                                                    // 试验压力
                                                                                    BCBCTestPT = Math.max(1.25 * BCBCPD * BCBCTestStress / BCBCDesignStress, 0.05);

                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "试压类型：液压" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "试验压力：" + BCBCTestPT.toFixed(4) + " MPa" +
                                                                                        "</span>");

                                                                                    // 许用应力
                                                                                    BCBCTestAllowStress = 0.9 * BCBCTestRel * BCBCE;

                                                                                }
                                                                                else if (BCBCTestVal === "气压试验") {

                                                                                    // 试验压力
                                                                                    BCBCTestPT = Math.max(1.1 * BCBCPD * BCBCTestStress / BCBCDesignStress, 0.05);

                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "试压类型：气压" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "试验压力：" + BCBCTestPT.toFixed(4) + " MPa" +
                                                                                        "</span>");

                                                                                    // 许用应力
                                                                                    BCBCTestAllowStress = 0.8 * BCBCTestRel * BCBCE;

                                                                                }

                                                                                // 压力试验时的实际应力
                                                                                let BCBCTestActStress = BCBCTestPT * BCBCM * BCBCCrownRi / (2 * BCBCTHKE);

                                                                                // 压力试验时的应力校核
                                                                                let BCBCTestStressChk;
                                                                                if (BCBCTestActStress <= BCBCTestAllowStress) {
                                                                                    BCBCTestStressChk = "合格";
                                                                                } else {
                                                                                    BCBCTestStressChk = "不合格";
                                                                                }

                                                                                // MAWP
                                                                                let BCBCMAWP = (2 * BCBCTHKE * BCBCDesignStress * BCBCE) / (BCBCM * BCBCCrownRi) - BCBCPS;

                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "MAWP：" + BCBCMAWP.toFixed(4) + " MPa" +
                                                                                    "</span>");

                                                                                // 直边高度 H
                                                                                if ((!jQuery.isEmptyObject(rows[14][columns[0][1].field]))) {
                                                                                    let BCBCH = parseFloat(rows[14][columns[0][1].field]);

                                                                                    // Sketch
                                                                                    if (currentTabIndex === 0) {
                                                                                        bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN, BCBCH);
                                                                                        bcbcSketch.off("resize").on("resize", function () {
                                                                                            if ($("#bcbc").length > 0) {
                                                                                                bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN, BCBCH);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    bcbcd2d3.tabs({
                                                                                        onSelect: function (title, index) {
                                                                                            if (index === 0) {
                                                                                                bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN, BCBCH);
                                                                                                bcbcSketch.off("resize").on("resize", function () {
                                                                                                    if ($("#bcbc").length > 0) {
                                                                                                        bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN, BCBCH);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    });

                                                                                    // 弧度角 BCBCANG
                                                                                    let BCBCANG = Math.acos((BCBCDI / 2 - BCBCCornerRi) / (BCBCCrownRi - BCBCCornerRi));

                                                                                    // C1 C2 C3 C4
                                                                                    let BCBCXC1 = (Math.sin(BCBCANG)) / 4;
                                                                                    let BCBCXC2 = ((Math.sin(BCBCANG) * Math.cos(BCBCANG)) + BCBCANG) / 2 - Math.sin(BCBCANG);
                                                                                    let BCBCXC3 = (2 * Math.sin(BCBCANG)) - ((Math.pow(Math.sin(BCBCANG), 3)) / 3) - (Math.sin(BCBCANG) * Math.cos(BCBCANG)) - BCBCANG;
                                                                                    let BCBCXC4 = (2 + Math.sin(BCBCANG)) * Math.pow(1 - Math.sin(BCBCANG), 2) / 3;

                                                                                    // HI
                                                                                    let BCBCHI = (1 - Math.sin(BCBCANG)) * BCBCCrownRi + BCBCCornerRi * Math.sin(BCBCANG);

                                                                                    // 外壁球冠半径
                                                                                    let BCBCCrownRo = BCBCCrownRi + BCBCTHKN;

                                                                                    // 外壁转角半径
                                                                                    let BCBCCornerRo = BCBCCornerRi + BCBCTHKN;

                                                                                    // AI
                                                                                    let BCBCAI = 2 * Math.PI * (BCBCDI * BCBCCornerRi * BCBCANG / 2 + BCBCCornerRi * BCBCCornerRi * (Math.sin(BCBCANG) - BCBCANG) + BCBCCrownRi * BCBCCrownRi * (1 - Math.sin(BCBCANG)) + BCBCDI * BCBCH / 2) / 1000000;

                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "内表面积：" + BCBCAI.toFixed(4) + " ㎡" +
                                                                                        "</span>");

                                                                                    // AO
                                                                                    let BCBCAO = 2 * Math.PI * (BCBCDO * BCBCCornerRo * BCBCANG / 2 + BCBCCornerRo * BCBCCornerRo * (Math.sin(BCBCANG) - BCBCANG) + BCBCCrownRo * BCBCCrownRo * (1 - Math.sin(BCBCANG)) + BCBCDO * BCBCH / 2) / 1000000;

                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "外表面积：" + BCBCAO.toFixed(4) + " ㎡" +
                                                                                        "</span>");

                                                                                    // VI
                                                                                    let BCBCVI = Math.PI * (BCBCXC1 * BCBCDI * BCBCDI * BCBCCornerRi + BCBCXC2 * BCBCDI * BCBCCornerRi * BCBCCornerRi + BCBCXC3 * BCBCCornerRi * BCBCCornerRi * BCBCCornerRi + BCBCXC4 * BCBCCrownRi * BCBCCrownRi * BCBCCrownRi + BCBCDI * BCBCDI * BCBCH / 4) / 1000000000;

                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "内容积：" + BCBCVI.toFixed(4) + " m³" +
                                                                                        "</span>");

                                                                                    // VO
                                                                                    let BCBCVO = Math.PI * (BCBCXC1 * BCBCDO * BCBCDO * BCBCCornerRo + BCBCXC2 * BCBCDO * BCBCCornerRo * BCBCCornerRo + BCBCXC3 * BCBCCornerRo * BCBCCornerRo * BCBCCornerRo + BCBCXC4 * BCBCCrownRo * BCBCCrownRo * BCBCCrownRo + BCBCDO * BCBCDO * BCBCH / 4) / 1000000000;

                                                                                    // 质量
                                                                                    let BCBCMASS = BCBCDensity * (BCBCVO - BCBCVI);

                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "重量：" + BCBCMASS.toFixed(4) + " kg" +
                                                                                        "</span>");

                                                                                    // docx
                                                                                    let BCBCPayJS = $('#payjs');

                                                                                    function getDocx() {
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "bcbcdocx.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                ribbonName: "BCBC",

                                                                                                designPressure: BCBCPD,
                                                                                                designTemp: BCBCDT,
                                                                                                staticPressure: BCBCPS,
                                                                                                innerDiameter: BCBCDI,
                                                                                                crownRi: BCBCCrownRi,
                                                                                                cornerRi: BCBCCornerRi,
                                                                                                h: BCBCH,
                                                                                                thkn: BCBCTHKN,
                                                                                                std: BCBCSTDVal,
                                                                                                name: BCBCNameVal,
                                                                                                c2: BCBCC2.toFixed(4),
                                                                                                e: BCBCE.toFixed(4),
                                                                                                test: BCBCTestVal,
                                                                                                density: BCBCDensity.toFixed(4),
                                                                                                testRel: BCBCTestRel.toFixed(4),
                                                                                                c1: BCBCC1.toFixed(4),
                                                                                                designStress: BCBCDesignStress.toFixed(4),
                                                                                                testStress: BCBCTestStress.toFixed(4),
                                                                                                c: BCBCC.toFixed(4),
                                                                                                thke: BCBCTHKE.toFixed(4),
                                                                                                calPressure: BCBCPC.toFixed(4),
                                                                                                m: BCBCM.toFixed(4),
                                                                                                thkc: BCBCTHKC.toFixed(4),
                                                                                                thkMin: BCBCTHKMinimum.toFixed(4),
                                                                                                thkd: BCBCTHKD.toFixed(4),
                                                                                                thkChk: BCBCTHKCHK,
                                                                                                designActStress: BCBCDesignActStress.toFixed(4),
                                                                                                designAllowStress: BCBCDesignAllowStress.toFixed(4),
                                                                                                designStressChk: BCBCDesignStressChk,
                                                                                                testPressure: BCBCTestPT.toFixed(4),
                                                                                                testActStress: BCBCTestActStress.toFixed(4),
                                                                                                testAllowStress: BCBCTestAllowStress.toFixed(4),
                                                                                                testStressChk: BCBCTestStressChk,
                                                                                                mawp: BCBCMAWP.toFixed(4),
                                                                                                hi: BCBCHI.toFixed(2),
                                                                                                ai: BCBCAI.toFixed(4),
                                                                                                ao: BCBCAO.toFixed(4),
                                                                                                vi: BCBCVI.toFixed(4),
                                                                                                mass: BCBCMASS.toFixed(4)
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
                                                                                                    BCBCPayJS.dialog({
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
                                                                                                                BCBCPayJS.dialog("close");
                                                                                                                BCBCPayJS.dialog("clear");
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
                                                                                                                            BCBCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                    BCBCPayJS.dialog('close');
                                                                                                                                    BCBCPayJS.dialog('clear');
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
                                                                                    function bcbc3d() {

                                                                                        bcbcModel.empty();

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
                                                                                        directionLight_1.position.set(1.5 * BCBCDO, 1.5 * BCBCDO, 1.5 * BCBCDO);
                                                                                        scene.add(directionLight_1);
                                                                                        let directionLight_2 = new THREE.DirectionalLight(0xffffff);
                                                                                        directionLight_2.position.set(-1.5 * BCBCDO, -1.5 * BCBCDO, -1.5 * BCBCDO);
                                                                                        scene.add(directionLight_2);

                                                                                        // material
                                                                                        let material = new THREE.MeshLambertMaterial({
                                                                                            color: 0x4f4f4f,
                                                                                            side: THREE.DoubleSide
                                                                                        });

                                                                                        // 球冠区外壁
                                                                                        let outerCrownCircleCurve = new THREE.EllipseCurve(0, -(BCBCCrownRo - BCBCCornerRo) * Math.sin(BCBCANG), BCBCCrownRo, BCBCCrownRo, BCBCANG, Math.PI / 2, false);
                                                                                        let outerCrownPoints = outerCrownCircleCurve.getPoints(100);
                                                                                        let outerCrownCircleGeometry = new THREE.LatheGeometry(outerCrownPoints, 100, 0, 2 * Math.PI);
                                                                                        let outerCrownCircleMesh = new THREE.Mesh(outerCrownCircleGeometry, material);
                                                                                        scene.add(outerCrownCircleMesh);

                                                                                        // 球冠区内壁
                                                                                        let innerCrownCircleCurve = new THREE.EllipseCurve(0, -(BCBCCrownRi - BCBCCornerRi) * Math.sin(BCBCANG), BCBCCrownRi, BCBCCrownRi, BCBCANG, Math.PI / 2, false);
                                                                                        let innerCrownPoints = innerCrownCircleCurve.getPoints(100);
                                                                                        let innerCrownCircleGeometry = new THREE.LatheGeometry(innerCrownPoints, 100, 0, 2 * Math.PI);
                                                                                        let innerCrownCircleMesh = new THREE.Mesh(innerCrownCircleGeometry, material);
                                                                                        scene.add(innerCrownCircleMesh);

                                                                                        // 转角区外壁
                                                                                        let outerCornerCircleCurve = new THREE.EllipseCurve(BCBCDO / 2 - BCBCCornerRo, 0, BCBCCornerRo, BCBCCornerRo, 0, BCBCANG, false);
                                                                                        let outerCornerPoints = outerCornerCircleCurve.getPoints(100);
                                                                                        let outerCornerCircleGeometry = new THREE.LatheGeometry(outerCornerPoints, 100, 0, 2 * Math.PI);
                                                                                        let outerCornerCircleMesh = new THREE.Mesh(outerCornerCircleGeometry, material);
                                                                                        scene.add(outerCornerCircleMesh);

                                                                                        // 转角区内壁
                                                                                        let innerCornerCircleCurve = new THREE.EllipseCurve(BCBCDO / 2 - BCBCCornerRo, 0, BCBCCornerRi, BCBCCornerRi, 0, BCBCANG, false);
                                                                                        let innerCornerPoints = innerCornerCircleCurve.getPoints(100);
                                                                                        let innerCornerCircleGeometry = new THREE.LatheGeometry(innerCornerPoints, 100, 0, 2 * Math.PI);
                                                                                        let innerCornerCircleMesh = new THREE.Mesh(innerCornerCircleGeometry, material);
                                                                                        scene.add(innerCornerCircleMesh);

                                                                                        // 直边段
                                                                                        let points = [];
                                                                                        points.push(new THREE.Vector3(BCBCDO / 2, 0, 0));
                                                                                        points.push(new THREE.Vector3(BCBCDO / 2, -BCBCH, 0));
                                                                                        points.push(new THREE.Vector3(BCBCDI / 2, -BCBCH, 0));
                                                                                        points.push(new THREE.Vector3(BCBCDI / 2, 0, 0));
                                                                                        let straightGeometry = new THREE.LatheGeometry(points, 100, 0, 2 * Math.PI);
                                                                                        let straightMesh = new THREE.Mesh(straightGeometry, material);
                                                                                        scene.add(straightMesh);

                                                                                        // camera
                                                                                        let camera = new THREE.PerspectiveCamera(60, bcbcModel.width() / bcbcModel.height(), 1, 100000);
                                                                                        camera.position.z = 1.5 * BCBCDO;

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
                                                                                        renderer.setSize(bcbcModel.width(), bcbcModel.height());
                                                                                        bcbcModel.append(renderer.domElement);

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
                                                                                        bcbcModel.resize(function () {
                                                                                            camera.aspect = bcbcModel.width() / bcbcModel.height();
                                                                                            camera.updateProjectionMatrix();
                                                                                            renderer.setSize(bcbcModel.width(), bcbcModel.height());
                                                                                            controls.handleResize();
                                                                                            render();
                                                                                        });

                                                                                        render();
                                                                                        animate();

                                                                                    }

                                                                                    // sketch
                                                                                    if (currentTabIndex === 0) {
                                                                                        bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN, BCBCH);
                                                                                        bcbcSketch.off("resize").on("resize", function () {
                                                                                            if ($("#bcbc").length > 0) {
                                                                                                bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN, BCBCH);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    else if (currentTabIndex === 1) {
                                                                                        bcbc3d();
                                                                                    }
                                                                                    bcbcd2d3.tabs({
                                                                                        onSelect: function (title, index) {
                                                                                            if (index === 0) {
                                                                                                bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN, BCBCH);
                                                                                                bcbcSketch.off("resize").on("resize", function () {
                                                                                                    if ($("#bcbc").length > 0) {
                                                                                                        bcbc2d("ϕ" + BCBCDI, "R" + BCBCCrownRi, "R" + BCBCCornerRi, BCBCTHKN, BCBCH);
                                                                                                    }
                                                                                                });
                                                                                            } else if (index === 1) {
                                                                                                bcbc3d();
                                                                                            }
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
                                                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                        && parseFloat(rows[13][columns[0][1].field]) < Math.max(BCBCC2, BCBCThkMin)) {
                                                                        south.html("材料厚度不能小于 " + Math.max(BCBCC2, BCBCThkMin) + " mm").css("color", "red");
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                        && parseFloat(rows[13][columns[0][1].field]) > Math.min(BCBCCornerRi / 3, BCBCThkMax).toFixed(2)) {
                                                                        south.html("材料厚度不能大于 " + Math.min(BCBCCornerRi / 3, BCBCThkMax).toFixed(2) + " mm").css("color", "red");
                                                                    }
                                                                }
                                                                else if ((!jQuery.isEmptyObject(rows[12][columns[0][1].field]))
                                                                    && parseFloat(rows[12][columns[0][1].field]) < BCBCDI / 10) {
                                                                    south.html("转角部分内半径 ri 不能小于 " + BCBCDI / 10 + " mm").css("color", "red");
                                                                }
                                                            }
                                                            else if ((!jQuery.isEmptyObject(rows[11][columns[0][1].field]))
                                                                && parseFloat(rows[11][columns[0][1].field]) <= BCBCDI / 2) {
                                                                south.html("球冠部分内半径 Ri 不能小于等于 " + BCBCDI / 2 + " mm").css("color", "red");
                                                            }
                                                            else if ((!jQuery.isEmptyObject(rows[11][columns[0][1].field]))
                                                                && parseFloat(rows[11][columns[0][1].field]) > BCBCDI) {
                                                                south.html("球冠部分内半径 Ri 不能大于 " + BCBCDI + " mm").css("color", "red");
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