$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aakbd2 = $("#d2");
    let aakbd3 = $("#d3");
    let aakbd2d3 = $('#d2d3');

    $("#cal").html("<table id='aakb'></table>");
    let pg = $("#aakb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/k/b/AAKB.json", function (result) {

        let AAKBDT,
            AAKBCategory, AAKBCategoryVal, AAKBType, AAKBTypeVal, AAKBSTD, AAKBSTDVal, AAKBName, AAKBNameVal,
            columns, rows, ed;

        // Sketch
        function aakb2d(di = "ϕDi", thkn = "δn", bri = "Ri", sri = "ri", h = "h") {

            aakbd2.empty();

            let width = aakbd2.width();
            let height = aakbd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "AAKBSVG")
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
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);
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
                ])).attr("id", "AAKBSketchH").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AAKBSketchH").attr("startOffset", "50%").text(text);

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
            dimBottomH(padding + thickness, height - padding, width - padding - thickness, height - padding, di, "AAKBSketchDI");

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
                    {x: width - padding - thickness, y: height - padding - straightHeight / 2},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight / 2 - 3},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight / 2 + 3},
                    {x: width - padding - thickness, y: height - padding - straightHeight / 2}
                ]));
            drawLine(width - padding - thickness - 15 - 10, height - padding - straightHeight / 2, width - padding, height - padding - straightHeight / 2);
            svg.append("path").attr("d", line([
                {x: width - padding + 15, y: height - padding - straightHeight / 2},
                {x: width - padding + 15 + 40, y: height - padding - straightHeight / 2}
            ])).attr("id", "AAKBSketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAKBSketchTHKN").attr("startOffset", "50%").text(thkn);

            // h
            dimLeftV(padding, height - padding, padding, height - padding - straightHeight, h);

            // bri
            svg.append("path").attr("d", line([
                {
                    x: width / 2,
                    y: height - padding - straightHeight - (crownRadiusInner * Math.sin(ANG) - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                },
                {
                    x: width / 2,
                    y: height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))
                }
            ])).attr("id", "AAKBSketchBRI").classed("sketch", true).attr("transform", "rotate(" + (90 - ANG / Math.PI * 180) / 2 + ", " + width / 2 + " " + (crownRadiusInner + height - padding - straightHeight - (crownRadiusInner - ((width - 2 * padding - 2 * thickness) / 2 - cornerRadiusInner) * Math.tan(ANG))) + ")");
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
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAKBSketchBRI").attr("startOffset", "50%").text(bri);

            // sri
            svg.append("path").attr("d", line([
                {x: width - padding - thickness - cornerRadiusInner, y: height - padding - straightHeight},
                {x: width - padding - thickness - 15, y: height - padding - straightHeight}
            ])).attr("id", "AAKBSketchSRI").classed("sketch", true).attr("transform", "rotate(" + (-ANG / Math.PI * 180) / 2 + ", " + (width - padding - thickness - cornerRadiusInner) + " " + (height - padding - straightHeight) + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - thickness, y: height - padding - straightHeight},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight - 3},
                    {x: width - padding - thickness - 15, y: height - padding - straightHeight + 3},
                    {x: width - padding - thickness, y: height - padding - straightHeight}
                ])).attr("transform", "rotate(" + (-ANG / Math.PI * 180) / 2 + ", " + (width - padding - thickness - cornerRadiusInner) + " " + (height - padding - straightHeight) + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAKBSketchSRI").attr("startOffset", "50%").text(sri);
        }

        currentTabIndex = aakbd2d3.tabs('getTabIndex', aakbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aakb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aakb").length > 0) {
                    aakb2d();
                }
            });
        }
        aakbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aakb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aakb").length > 0) {
                            aakb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 薄壁碟形封头内压计算",
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
                    $(ed.target).combobox("loadData", AAKBCategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAKBType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AAKBSTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", AAKBName);
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
                    aakbd2.empty();
                    aakbd3.empty();

                    // sketch
                    currentTabIndex = aakbd2d3.tabs('getTabIndex', aakbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aakb2d();
                        aakbd2.off("resize").on("resize", function () {
                            if ($("#aakb").length > 0) {
                                aakb2d();
                            }
                        });
                    }
                    aakbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aakb2d();
                                aakbd2.off("resize").on("resize", function () {
                                    if ($("#aakb").length > 0) {
                                        aakb2d();
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

                        AAKBDT = parseFloat(changes.value);

                        // category、type、std、name
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAKBCategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAKBType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAKBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAKBName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAKBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAKBCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAKBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAKBCategory[index] = {
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

                        AAKBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAKBType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAKBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAKBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAKBCategoryVal,
                                temp: AAKBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAKBType = [];
                                $(result).each(function (index, element) {
                                    AAKBType[index] = {
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

                        AAKBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAKBSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAKBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAKBCategoryVal,
                                type: AAKBTypeVal,
                                temp: AAKBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAKBSTD = [];
                                $(result).each(function (index, element) {
                                    AAKBSTD[index] = {
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

                        AAKBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAKBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAKBCategoryVal,
                                type: AAKBTypeVal,
                                std: AAKBSTDVal,
                                temp: AAKBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAKBName = [];
                                $(result).each(function (index, element) {
                                    AAKBName[index] = {
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
                    let AAKBPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AAKBPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAKBPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AAKBPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAKBC2;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AAKBC2 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAKBFAI;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AAKBFAI = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AAKBTest;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        AAKBTest = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // NameVal
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        AAKBNameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AAKBD, AAKBThkMin, AAKBThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AAKBCategoryVal,
                            "type": AAKBTypeVal,
                            "std": AAKBSTDVal,
                            "name": AAKBNameVal,
                            "temp": AAKBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AAKBD = parseFloat(result.density);
                            AAKBThkMin = parseFloat(result.thkMin);
                            AAKBThkMax = parseFloat(result.thkMax);

                            let AAKBDI;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AAKBDI = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aakb2d("Φ" + AAKBDI);
                                aakbd2.off("resize").on("resize", function () {
                                    if ($("#aakb").length > 0) {
                                        aakb2d("Φ" + AAKBDI);
                                    }
                                });
                            }
                            aakbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aakb2d("Φ" + AAKBDI);
                                        aakbd2.off("resize").on("resize", function () {
                                            if ($("#aakb").length > 0) {
                                                aakb2d("Φ" + AAKBDI);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAKBTHKN;
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) > Math.max(AAKBC2, AAKBThkMin)
                                && parseFloat(rows[11][columns[0][1].field]) <= AAKBThkMax) {
                                AAKBTHKN = parseFloat(rows[11][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) <= Math.max(AAKBC2, AAKBThkMin)) {
                                south.html("封头材料厚度不能小于等于 " + Math.max(AAKBC2, AAKBThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) > AAKBThkMax) {
                                south.html("封头材料厚度不能大于 " + AAKBThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            let AAKBDOUT = AAKBDI + 2 * AAKBTHKN;

                            // Sketch
                            if (currentTabIndex === 0) {
                                aakb2d("Φ" + AAKBDI, AAKBTHKN);
                                aakbd2.off("resize").on("resize", function () {
                                    if ($("#aakb").length > 0) {
                                        aakb2d("Φ" + AAKBDI, AAKBTHKN);
                                    }
                                });
                            }
                            aakbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aakb2d("Φ" + AAKBDI, AAKBTHKN);
                                        aakbd2.off("resize").on("resize", function () {
                                            if ($("#aakb").length > 0) {
                                                aakb2d("Φ" + AAKBDI, AAKBTHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAKBOT, AAKBO, AAKBOT1, AAKBRel, AAKBC1, AAKBRelT, AAKBET;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_et_com_relt_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AAKBCategoryVal,
                                    "type": AAKBTypeVal,
                                    "std": AAKBSTDVal,
                                    "name": AAKBNameVal,
                                    "thk": AAKBTHKN,
                                    "temp": AAKBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AAKBDOUT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计应力
                                    AAKBOT = parseFloat(result.ot);
                                    if (AAKBOT < 0) {
                                        south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    AAKBO = parseFloat(result.o);
                                    if (AAKBO < 0) {
                                        south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    AAKBRel = parseFloat(result.rel);
                                    if (AAKBRel < 0) {
                                        south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 设计温度屈服强度
                                    AAKBRelT = parseFloat(result.relt);
                                    if (AAKBRelT < 0) {
                                        south.html("查询封头材料设计温度屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 设计温度屈服强度
                                    AAKBET = parseFloat(result.et);
                                    if (AAKBET < 0) {
                                        south.html("查询封头材料设计温度弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    AAKBC1 = parseFloat(result.c1);
                                    if (AAKBC1 < 0) {
                                        south.html("查询封头厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 标记应力
                                    AAKBOT1 = parseFloat(result.ot1);

                                    let AAKBBRI;
                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) <= AAKBDI
                                        && parseFloat(rows[12][columns[0][1].field]) > AAKBDI / 2) {
                                        AAKBBRI = parseFloat(rows[12][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) > AAKBDI) {
                                        south.html("封头球冠区内半径 R<sub>i</sub> 不能大于 " + AAKBDI + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                        && parseFloat(rows[12][columns[0][1].field]) <= AAKBDI / 2) {
                                        south.html("封头球冠区内半径 R<sub>i</sub> 不能小于等于 " + AAKBDI / 2 + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI);
                                        aakbd2.off("resize").on("resize", function () {
                                            if ($("#aakb").length > 0) {
                                                aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI);
                                            }
                                        });
                                    }
                                    aakbd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI);
                                                aakbd2.off("resize").on("resize", function () {
                                                    if ($("#aakb").length > 0) {
                                                        aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    let AAKBSRI;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= Math.max(AAKBDI / 10, 3 * AAKBTHKN)) {
                                        AAKBSRI = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < Math.max(AAKBDI / 10, 3 * AAKBTHKN)) {
                                        south.html("封头转角过渡段内半径 r<sub>i</sub> 不能小于 " + Math.max(AAKBDI / 10, 3 * AAKBTHKN) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI, "R" + AAKBSRI);
                                        aakbd2.off("resize").on("resize", function () {
                                            if ($("#aakb").length > 0) {
                                                aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI, "R" + AAKBSRI);
                                            }
                                        });
                                    }
                                    aakbd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI, "R" + AAKBSRI);
                                                aakbd2.off("resize").on("resize", function () {
                                                    if ($("#aakb").length > 0) {
                                                        aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI, "R" + AAKBSRI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 过程参数
                                    let AAKBPC = AAKBPD + AAKBPS;
                                    let AAKBC = AAKBC1 + AAKBC2;
                                    let AAKBTHKE = AAKBTHKN - AAKBC;
                                    let AAKBBRO = AAKBBRI + AAKBTHKN;
                                    let AAKBSRO = AAKBSRI + AAKBTHKN;

                                    // 强度厚度校核
                                    let AAKBM = (3 + Math.sqrt(AAKBBRI / AAKBSRI)) / 4;
                                    let AAKBTHKC = (AAKBM * AAKBPC * AAKBBRI) / (2 * AAKBOT * AAKBFAI - 0.5 * AAKBPC);
                                    let AAKBTHKMinimum;
                                    if (AAKBCategoryVal === "碳素钢和低合金钢" || AAKBCategoryVal === "铝及铝合金") {
                                        AAKBTHKMinimum = 3;
                                    }
                                    else if (AAKBCategoryVal === "高合金钢" || AAKBCategoryVal === "钛及钛合金"
                                        || AAKBCategoryVal === "铜及铜合金" || AAKBCategoryVal === "镍及镍合金"
                                        || AAKBCategoryVal === "锆及锆合金") {
                                        AAKBTHKMinimum = 2;
                                    }
                                    else {
                                        return false;
                                    }

                                    let AAKBTHKD = Math.max(AAKBTHKC, AAKBTHKMinimum) + AAKBC2;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "球冠区强度计算所需厚度：" + (AAKBTHKD + AAKBC1).toFixed(2) + " mm" +
                                        "</span>");
                                    let AAKBTHKCHK;
                                    if (AAKBTHKN >= (AAKBTHKD + AAKBC1).toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AAKBTHKN + " mm" +
                                            "</span>");
                                        AAKBTHKCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AAKBTHKN + " mm" +
                                            "</span>");
                                        AAKBTHKCHK = "不合格";
                                    }

                                    // 稳定性校核
                                    if (AAKBTHKN < 0.0005 * AAKBBRI || AAKBTHKN > 0.002 * AAKBBRI) {
                                        south.html("封头厚径比超限，程序无法计算!").css("color", "red");
                                        return false;
                                    }
                                    let AAKBK1, AAKBK2;
                                    if (AAKBSRI / AAKBDI <= 0.08) {
                                        AAKBK1 = 9.31 * AAKBSRI / AAKBDI - 0.086;
                                        AAKBK2 = 1.25;
                                    } else {
                                        AAKBK1 = 0.692 * AAKBSRI / AAKBDI + 0.605;
                                        AAKBK2 = 1.46 - 2.6 * AAKBSRI / AAKBDI;
                                    }
                                    let AAKBA = 0.5 * AAKBDI - AAKBSRI;
                                    let AAKBB = AAKBBRI - AAKBSRI;
                                    let AAKBBETA = Math.acos(AAKBA / AAKBB);
                                    let AAKBSAI = Math.sqrt(AAKBBRI * AAKBTHKE) / AAKBSRI;
                                    let AAKBF;
                                    if (AAKBSAI >= AAKBBETA) {
                                        AAKBF = AAKBA;
                                    } else {
                                        AAKBF = AAKBA / Math.cos(AAKBBETA - AAKBSAI);
                                    }
                                    let AAKBRE = AAKBF + AAKBSRI;
                                    let AAKBOE = AAKBK1 * 1000 * AAKBET * AAKBTHKE / AAKBSRI;
                                    let AAKBPE = AAKBOE * AAKBTHKE / AAKBK2 / AAKBRE / (0.5 * AAKBRE / AAKBSRI - 1);
                                    let AAKBPY = AAKBRelT * AAKBTHKE / AAKBK2 / AAKBRE / (0.5 * AAKBRE / AAKBSRI - 1);
                                    let AAKBPCK;
                                    if (AAKBPE / AAKBPY <= 1.0) {
                                        AAKBPCK = 0.6 * AAKBPE;
                                    } else if (AAKBPE / AAKBPY > 1.0 && AAKBPE / AAKBPY <= 8.29) {
                                        AAKBPCK = 0.408 * AAKBPY + 0.192 * AAKBPE;
                                    } else {
                                        AAKBPCK = 2 * AAKBPY;
                                    }
                                    let AAKBN = 1.5;
                                    let AAKBPK = AAKBPCK / AAKBN;
                                    let AAKBPCHK;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "封头计算压力：" + AAKBPC + " MPa" +
                                        "</span>");
                                    if (AAKBPC <= AAKBPK) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "转角过渡区稳定性许用内压：" + AAKBPK.toFixed(2) + " MPa" +
                                            "</span>");
                                        AAKBPCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "转角过渡区稳定性许用内压：" + AAKBPK.toFixed(2) + " MPa" +
                                            "</span>");
                                        AAKBPCHK = "不合格";
                                    }

                                    // 压力试验
                                    let AAKBETA, AAKBPT;
                                    if (AAKBTest === "液压试验") {

                                        AAKBETA = 1.25;
                                        AAKBPT = AAKBETA * AAKBPD * AAKBO / Math.max(AAKBOT, AAKBOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：液压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AAKBPT.toFixed(4) + " MPa" +
                                            "</span>");
                                    }
                                    else if (AAKBTest === "气压试验") {

                                        AAKBETA = 1.1;
                                        AAKBPT = AAKBETA * AAKBPD * AAKBO / Math.max(AAKBOT, AAKBOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：气压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AAKBPT.toFixed(4) + " MPa" +
                                            "</span>");
                                    }
                                    else {
                                        return false;
                                    }

                                    // MAWP
                                    let AAKBPM = (2 * AAKBTHKE * AAKBOT * AAKBFAI) / (AAKBM * AAKBBRI + 0.5 * AAKBTHKE) - AAKBPS;
                                    let AAKBMAWP = Math.min(AAKBPM, AAKBPK - AAKBPS);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP：" + AAKBMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    let AAKBH;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        AAKBH = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI, "R" + AAKBSRI, AAKBH);
                                        aakbd2.off("resize").on("resize", function () {
                                            if ($("#aakb").length > 0) {
                                                aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI, "R" + AAKBSRI, AAKBH);
                                            }
                                        });
                                    }
                                    aakbd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI, "R" + AAKBSRI, AAKBH);
                                                aakbd2.off("resize").on("resize", function () {
                                                    if ($("#aakb").length > 0) {
                                                        aakb2d("Φ" + AAKBDI, AAKBTHKN, "R" + AAKBBRI, "R" + AAKBSRI, AAKBH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 几何特性
                                    let AAKBANG = Math.acos((AAKBDI / 2 - AAKBSRI) / (AAKBBRI - AAKBSRI));
                                    let AAKBXC1 = (Math.sin(AAKBANG)) / 4;
                                    let AAKBXC2 = ((Math.sin(AAKBANG) * Math.cos(AAKBANG)) + AAKBANG) / 2 - Math.sin(AAKBANG);
                                    let AAKBXC3 = (2 * Math.sin(AAKBANG)) - ((Math.pow(Math.sin(AAKBANG), 3)) / 3) - (Math.sin(AAKBANG) * Math.cos(AAKBANG)) - AAKBANG;
                                    let AAKBXC4 = (2 + Math.sin(AAKBANG)) * Math.pow(1 - Math.sin(AAKBANG), 2) / 3;

                                    let AAKBHI = (1 - Math.sin(AAKBANG)) * AAKBBRI + AAKBSRI * Math.sin(AAKBANG);

                                    let AAKBAI = 2 * Math.PI * (AAKBDI * AAKBSRI * AAKBANG / 2 + AAKBSRI * AAKBSRI * (Math.sin(AAKBANG) - AAKBANG) + AAKBBRI * AAKBBRI * (1 - Math.sin(AAKBANG)) + AAKBDI * AAKBH / 2) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内表面积：" + AAKBAI.toFixed(4) + " m²" +
                                        "</span>");

                                    let AAKBAO = 2 * Math.PI * (AAKBDOUT * AAKBSRO * AAKBANG / 2 + AAKBSRO * AAKBSRO * (Math.sin(AAKBANG) - AAKBANG) + AAKBBRO * AAKBBRO * (1 - Math.sin(AAKBANG)) + AAKBDOUT * AAKBH / 2) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积：" + AAKBAO.toFixed(4) + " m²" +
                                        "</span>");

                                    let AAKBVI = Math.PI * (AAKBXC1 * AAKBDI * AAKBDI * AAKBSRI + AAKBXC2 * AAKBDI * AAKBSRI * AAKBSRI + AAKBXC3 * AAKBSRI * AAKBSRI * AAKBSRI + AAKBXC4 * AAKBBRI * AAKBBRI * AAKBBRI + AAKBDI * AAKBDI * AAKBH / 4) / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积：" + AAKBVI.toFixed(4) + " m³" +
                                        "</span>");

                                    let AAKBVO = Math.PI * (AAKBXC1 * AAKBDOUT * AAKBDOUT * AAKBSRO + AAKBXC2 * AAKBDOUT * AAKBSRO * AAKBSRO + AAKBXC3 * AAKBSRO * AAKBSRO * AAKBSRO + AAKBXC4 * AAKBBRO * AAKBBRO * AAKBBRO + AAKBDOUT * AAKBDOUT * AAKBH / 4) / 1000000000;

                                    let AAKBMass = AAKBD * (AAKBVO - AAKBVI);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量：" + AAKBMass.toFixed(4) + " kg" +
                                        "</span>");

                                    // docx
                                    let AAKBPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "aakbdocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "AAKB",

                                                pd: AAKBPD,
                                                t: AAKBDT,
                                                ps: AAKBPS,
                                                test: AAKBTest,

                                                c2: AAKBC2,
                                                fai: AAKBFAI,
                                                std: AAKBSTDVal,
                                                name: AAKBNameVal,

                                                di: AAKBDI,
                                                bri: AAKBBRI,
                                                sri: AAKBSRI,
                                                thkn: AAKBTHKN,
                                                h: AAKBH,

                                                density: AAKBD.toFixed(4),
                                                rel: AAKBRel.toFixed(4),
                                                c1: AAKBC1.toFixed(4),
                                                relt: AAKBRelT.toFixed(4),
                                                ot: AAKBOT.toFixed(4),
                                                o: AAKBO.toFixed(4),
                                                ot1: AAKBOT1.toFixed(4),
                                                et: AAKBET.toFixed(4),

                                                pc: AAKBPC.toFixed(4),
                                                c: AAKBC.toFixed(4),
                                                thke: AAKBTHKE.toFixed(4),
                                                dout: AAKBDOUT.toFixed(4),
                                                bro: AAKBBRO.toFixed(4),
                                                sro: AAKBSRO.toFixed(4),

                                                m: AAKBM.toFixed(4),
                                                thkc: AAKBTHKC.toFixed(4),
                                                thkm: AAKBTHKMinimum.toFixed(4),
                                                thkd: AAKBTHKD.toFixed(4),
                                                thkchk: AAKBTHKCHK,

                                                k1: AAKBK1.toFixed(4),
                                                k2: AAKBK2.toFixed(4),
                                                a: AAKBA.toFixed(4),
                                                b: AAKBB.toFixed(4),
                                                beta: AAKBBETA.toFixed(4),
                                                sai: AAKBSAI.toFixed(4),
                                                f: AAKBF.toFixed(4),
                                                re: AAKBRE.toFixed(4),
                                                oe: AAKBOE.toFixed(4),
                                                pe: AAKBPE.toFixed(4),
                                                py: AAKBPY.toFixed(4),
                                                pck: AAKBPCK.toFixed(4),
                                                n: AAKBN.toFixed(4),
                                                pk: AAKBPK.toFixed(4),
                                                pchk: AAKBPCHK,

                                                eta: AAKBETA.toFixed(4),
                                                pt: AAKBPT.toFixed(4),

                                                pm: AAKBPM.toFixed(4),
                                                mawp: AAKBMAWP.toFixed(4),

                                                ai: AAKBAI.toFixed(2),
                                                ao: AAKBAO.toFixed(2),
                                                vi: AAKBVI.toFixed(2),
                                                mass: AAKBMass.toFixed(2)
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
                                                    AAKBPayJS.dialog({
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
                                                                AAKBPayJS.dialog("close");
                                                                AAKBPayJS.dialog("clear");
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
                                                                            AAKBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    AAKBPayJS.dialog('close');
                                                                                    AAKBPayJS.dialog('clear');
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