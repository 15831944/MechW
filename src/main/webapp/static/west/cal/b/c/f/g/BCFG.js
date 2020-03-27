$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfgSketch = $("#d2");
    let bcfgModel = $("#d3");
    let bcfgd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfg'></table>");
    let pg = $("#bcfg");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/g/BCFG.json", function (result) {

        let BCFGDT,
            BCFGCategory, BCFGCategoryVal, BCFGType, BCFGTypeVal, BCFGSTD, BCFGSTDVal, BCFGName, BCFGNameVal,
            columns, rows, ed;

        function bcfg2d(di = "ϕDi", thkn = "δn", r = "r") {

            bcfgSketch.empty();

            let width = bcfgSketch.width();
            let height = bcfgSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFGSVG").attr("height", height);

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
            let padding = 60;
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

            // 封头 sketch
            let ri = 3 * thk;
            let ro = ri + thk;
            let sh = 2 * thk;
            // 直边段
            drawLine(padding + wg - thk, height / 2 + sh, padding + 3 * wg + thk, height / 2 + sh);
            drawCenterLine(padding + wg - thk, height / 2, padding + 3 * wg + thk, height / 2);
            drawLine(padding + wg - thk, height / 2, padding + wg - thk, height / 2 + sh);
            drawLine(padding + wg, height / 2, padding + wg, height / 2 + sh);
            drawLine(padding + 3 * wg, height / 2, padding + 3 * wg, height / 2 + sh);
            drawLine(padding + 3 * wg + thk, height / 2, padding + 3 * wg + thk, height / 2 + sh);
            // 顶部
            drawLine(padding + wg + ri, height / 2 - ri, padding + 3 * wg - ri, height / 2 - ri);
            drawLine(padding + wg + ri, height / 2 - ro, padding + 3 * wg - ri, height / 2 - ro);
            // 圆弧段
            drawArc(ri, ri, padding + wg, height / 2, padding + wg + ri, height / 2 - ri);
            drawArc(ro, ro, padding + wg - thk, height / 2, padding + wg + ri, height / 2 - ro);
            drawArc(ri, ri, padding + 3 * wg - ri, height / 2 - ri, padding + 3 * wg, height / 2);
            drawArc(ro, ro, padding + 3 * wg - ri, height / 2 - ro, padding + 3 * wg + thk, height / 2);

            // di
            dimBottomH(padding + wg, height / 2 + sh, padding + 3 * wg, height / 2 + sh, di, "BCFGSketchDI");

            // thkn
            let cx1 = padding + 3 * wg - ri;
            let cy1 = height / 2;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + ri, y: cy1},
                    {x: cx1 + ri - 15, y: cy1 - 3},
                    {x: cx1 + ri - 15, y: cy1 + 3},
                    {x: cx1 + ri, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + ro, y: cy1},
                    {x: cx1 + ro + 15, y: cy1 - 3},
                    {x: cx1 + ro + 15, y: cy1 + 3},
                    {x: cx1 + ro, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1 + ri - 15 - 10, y: cy1},
                    {x: cx1 + ro, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1 + ro + 15, y: cy1},
                    {x: cx1 + ro + 15 + 40, y: cy1}
                ])).attr("transform", "rotate(" + -45 + ", " + cx1 + " " + cy1 + ")")
                .attr("id", "BCFGSketchTHKN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFGSketchTHKN")
                .attr("startOffset", "50%").text(thkn);

            // r
            let cx2 = padding + wg + ri;
            let cy2 = height / 2;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx2 - ri, y: cy2},
                    {x: cx2 - ri + 15, y: cy2 - 3},
                    {x: cx2 - ri + 15, y: cy2 + 3},
                    {x: cx2 - ri, y: cy2}
                ])).attr("transform", "rotate(" + 45 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - ro - thk, y: cy2},
                    {x: cx2, y: cy2}
                ])).attr("transform", "rotate(" + 45 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - 0.707 * (ro + thk) - 40, y: cy2 - 0.707 * (ro + thk)},
                    {x: cx2 - 0.707 * (ro + thk), y: cy2 - 0.707 * (ro + thk)}
                ])).attr("id", "BCFGSketchR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFGSketchR")
                .attr("startOffset", "50%").text(r);

            drawCenterLine(width / 2, height / 2 + sh + 10, width / 2, height / 2 - ro - 10);
        }

        currentTabIndex = bcfgd2d3.tabs('getTabIndex', bcfgd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfg2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfg").length > 0) {
                    bcfg2d();
                }
            });
        }
        bcfgd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfg2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfg").length > 0) {
                            bcfg2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号7圆形平盖计算",
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
                    $(ed.target).combobox("loadData", BCFGCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFGType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFGSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFGName);
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
                    bcfgSketch.empty();

                    // model
                    bcfgModel.empty();

                    // sketch
                    currentTabIndex = bcfgd2d3.tabs('getTabIndex', bcfgd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcfg2d();
                        bcfgSketch.off("resize").on("resize", function () {
                            if ($("#bcfg").length > 0) {
                                bcfg2d();
                            }
                        });
                    }
                    bcfgd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfg2d();
                                bcfgSketch.off("resize").on("resize", function () {
                                    if ($("#bcfg").length > 0) {
                                        bcfg2d();
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

                        BCFGDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFGCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFGType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFGSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFGName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFGDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFGCategory[index] = {
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

                        BCFGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFGType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFGSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFGName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFGCategoryVal,
                                temp: BCFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFGType = [];
                                $(result).each(function (index, element) {
                                    BCFGType[index] = {
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

                        BCFGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFGSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFGName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFGCategoryVal,
                                type: BCFGTypeVal,
                                temp: BCFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFGSTD = [];
                                $(result).each(function (index, element) {
                                    BCFGSTD[index] = {
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

                        BCFGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFGName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFGCategoryVal,
                                type: BCFGTypeVal,
                                std: BCFGSTDVal,
                                temp: BCFGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFGName = [];
                                $(result).each(function (index, element) {
                                    BCFGName[index] = {
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
                        let BCFGPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFGPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFGPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFGPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFGTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFGTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFGNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFGDensity, BCFGThkMin, BCFGThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFGCategoryVal,
                                    "type": BCFGTypeVal,
                                    "std": BCFGSTDVal,
                                    "name": BCFGNameVal,
                                    "temp": BCFGDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFGDensity = parseFloat(result.density);
                                    BCFGThkMin = parseFloat(result.thkMin);
                                    BCFGThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFGDI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFGDI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // init Sketch
                                    if (currentTabIndex === 0) {
                                        bcfg2d("ϕ" + BCFGDI);
                                        bcfgSketch.off("resize").on("resize", function () {
                                            if ($("#bcfg").length > 0) {
                                                bcfg2d("ϕ" + BCFGDI);
                                            }
                                        });
                                    }
                                    bcfgd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfg2d("ϕ" + BCFGDI);
                                                bcfgSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfg").length > 0) {
                                                        bcfg2d("ϕ" + BCFGDI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thkn
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFGThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFGThkMax) {
                                        let BCFGTHKN = parseFloat(rows[9][columns[0][1].field]);

                                        // init Sketch
                                        if (currentTabIndex === 0) {
                                            bcfg2d("ϕ" + BCFGDI, BCFGTHKN, "r≥" + BCFGTHKN);
                                            bcfgSketch.off("resize").on("resize", function () {
                                                if ($("#bcfg").length > 0) {
                                                    bcfg2d("ϕ" + BCFGDI, BCFGTHKN, "r≥" + BCFGTHKN);
                                                }
                                            });
                                        }
                                        bcfgd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    bcfg2d("ϕ" + BCFGDI, BCFGTHKN, "r≥" + BCFGTHKN);
                                                    bcfgSketch.off("resize").on("resize", function () {
                                                        if ($("#bcfg").length > 0) {
                                                            bcfg2d("ϕ" + BCFGDI, BCFGTHKN, "r≥" + BCFGTHKN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                        let BCFGOT, BCFGO, BCFGREL, BCFGC1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCFGCategoryVal,
                                                "type": BCFGTypeVal,
                                                "std": BCFGSTDVal,
                                                "name": BCFGNameVal,
                                                "thk": BCFGTHKN,
                                                "temp": BCFGDT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": 10000
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCFGOT = parseFloat(result.ot);
                                                if (BCFGOT < 0) {
                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFGO = parseFloat(result.o);
                                                if (BCFGO < 0) {
                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFGREL = parseFloat(result.rel);
                                                if (BCFGREL < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFGC1 = parseFloat(result.c1);
                                                if (BCFGC1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 平盖腐蚀裕量
                                                let BCFGC2;
                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) < BCFGTHKN) {
                                                    BCFGC2 = parseFloat(rows[10][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCFGTHKN) {
                                                    south.html("平盖腐蚀裕量不能大于等于 " + BCFGTHKN + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 平盖焊接接头系数
                                                let BCFGE;
                                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                    BCFGE = parseFloat(rows[11][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                let BCFGPC = BCFGPD + BCFGPS;
                                                let BCFGKP = 0.2;

                                                let BCFGC = BCFGC1 + BCFGC2;
                                                let BCFGTHKE = BCFGTHKN - BCFGC;
                                                let BCFGDC = BCFGDI + 2 * BCFGC2;
                                                let BCFGTHKC = BCFGDC * Math.sqrt(BCFGKP * BCFGPC / (BCFGOT * BCFGE));
                                                let BCFGTHKD = BCFGTHKC + BCFGC2;
                                                south.html(
                                                    "<span style='color:#444444;'>" +
                                                    "平盖所需厚度：" + (BCFGTHKD + BCFGC1).toFixed(2) + " mm" +
                                                    "</span>");
                                                let BCFGTHKCHK;
                                                if (BCFGTHKN >= (BCFGTHKD + BCFGC1).toFixed(2)) {
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + BCFGTHKN + " mm" +
                                                        "</span>");
                                                    BCFGTHKCHK = "合格";
                                                }
                                                else {
                                                    south.append(
                                                        "<span style='color:red;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + BCFGTHKN + " mm" +
                                                        "</span>");
                                                    BCFGTHKCHK = "不合格";
                                                }

                                                // 压力试验
                                                let BCFGTestPT;
                                                if (BCFGTest === "液压试验") {
                                                    BCFGTestPT = Math.max(1.25 * BCFGPD * BCFGO / BCFGOT, 0.05);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：液压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + BCFGTestPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }
                                                else if (BCFGTest === "气压试验") {
                                                    BCFGTestPT = Math.max(1.10 * BCFGPD * BCFGO / BCFGOT, 0.05);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：气压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + BCFGTestPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }

                                                // MAWP
                                                let BCFGMAWP = BCFGTHKE * BCFGTHKE * BCFGOT * BCFGE / (BCFGKP * BCFGDC * BCFGDC) - BCFGPS;
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "MAWP：" + BCFGMAWP.toFixed(4) + " MPa" +
                                                    "</span>");

                                                // docx
                                                let BCFGPayJS = $('#payjs');

                                                function getDocx() {
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "bcfgdocx.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            ribbonName: "BCFG",

                                                            t: BCFGDT,
                                                            pd: BCFGPD,
                                                            ps: BCFGPS,

                                                            std: BCFGSTDVal,
                                                            name: BCFGNameVal,
                                                            di: BCFGDI,
                                                            thkn: BCFGTHKN,
                                                            c2: BCFGC2,
                                                            e: BCFGE,

                                                            test: BCFGTest,

                                                            d: BCFGDensity.toFixed(4),
                                                            rel: BCFGREL.toFixed(4),
                                                            c1: BCFGC1.toFixed(4),
                                                            ot: BCFGOT.toFixed(4),
                                                            o: BCFGO.toFixed(4),

                                                            pc: BCFGPC.toFixed(4),
                                                            kp: BCFGKP.toFixed(4),
                                                            c: BCFGC.toFixed(4),
                                                            thke: BCFGTHKE.toFixed(4),
                                                            dc: BCFGDC.toFixed(4),
                                                            thkc: BCFGTHKC.toFixed(4),
                                                            thkd: BCFGTHKD.toFixed(4),
                                                            thkchk: BCFGTHKCHK,

                                                            pt: BCFGTestPT.toFixed(4),
                                                            mawp: BCFGMAWP.toFixed(4)
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
                                                                BCFGPayJS.dialog({
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
                                                                            BCFGPayJS.dialog("close");
                                                                            BCFGPayJS.dialog("clear");
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
                                                                                        BCFGPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                        // 倒计时计数器
                                                                                        let maxTime = 4, timer;

                                                                                        function CountDown() {
                                                                                            if (maxTime >= 0) {
                                                                                                $("#payjs_timer").html(maxTime);
                                                                                                --maxTime;
                                                                                            } else {

                                                                                                clearInterval(timer);
                                                                                                // 关闭并清空收银台
                                                                                                BCFGPayJS.dialog('close');
                                                                                                BCFGPayJS.dialog('clear');
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
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFGThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFGThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFGThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFGThkMax + " mm").css("color", "red");
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