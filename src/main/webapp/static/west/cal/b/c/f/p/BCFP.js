$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfpSketch = $("#d2");
    let bcfpModel = $("#d3");
    let bcfpd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfp'></table>");
    let pg = $("#bcfp");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/p/BCFP.json", function (result) {

        let BCFPDT,
            BCFPCategory, BCFPCategoryVal, BCFPType, BCFPTypeVal, BCFPSTD, BCFPSTDVal, BCFPName, BCFPNameVal,
            columns, rows, ed;

        function bcfp2d(dc = "ϕDc", thkn = "δn") {

            bcfpSketch.empty();

            let width = bcfpSketch.width();
            let height = bcfpSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFPSVG").attr("height", height);

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
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            // 法兰盖及垫片、法兰
            drawLine(padding + wg - 4 * thk, padding + hg - 2 * thk, padding + 3 * wg + 4 * thk, padding + hg - 2 * thk);
            drawLine(padding + wg - 4 * thk, padding + hg, padding + 3 * wg + 4 * thk, padding + hg);
            drawLine(padding + wg - 4 * thk, padding + hg + thk / 2, padding + 3 * wg + 4 * thk, padding + hg + thk / 2);

            drawLine(padding + wg - 4 * thk, padding + hg - 2 * thk, padding + wg - 4 * thk, padding + hg + 2.5 * thk);
            drawLine(padding + 3 * wg + 4 * thk, padding + hg - 2 * thk, padding + 3 * wg + 4 * thk, padding + hg + 2.5 * thk);

            drawLine(padding + wg - 4 * thk, padding + hg + 2.5 * thk, padding + wg, padding + hg + 2.5 * thk);
            drawLine(padding + 3 * wg + 4 * thk, padding + hg + 2.5 * thk, padding + 3 * wg, padding + hg + 2.5 * thk);

            // 螺栓孔
            drawLine(padding + wg - 3 * thk, padding + hg - 2 * thk, padding + wg - 3 * thk, padding + hg + 2.5 * thk);
            drawLine(padding + wg - thk, padding + hg - 2 * thk, padding + wg - thk, padding + hg + 2.5 * thk);
            drawCenterLine(padding + wg - 2 * thk, padding + hg - 2 * thk - 20, padding + wg - 2 * thk, padding + hg + 2.5 * thk + 20);
            drawLine(padding + wg - 2 * thk - 0.5 * thk, padding + hg - 2 * thk - 10 - 0.5 * thk, padding + wg - 2 * thk + 0.5 * thk, padding + hg - 2 * thk - 10 + 0.5 * thk);
            drawLine(padding + wg - 2 * thk + 0.5 * thk, padding + hg - 2 * thk - 10 - 0.5 * thk, padding + wg - 2 * thk - 0.5 * thk, padding + hg - 2 * thk - 10 + 0.5 * thk);
            drawLine(padding + wg - 2 * thk - 0.5 * thk, padding + hg + 2.5 * thk + 10 - 0.5 * thk, padding + wg - 2 * thk + 0.5 * thk, padding + hg + 2.5 * thk + 10 + 0.5 * thk);
            drawLine(padding + wg - 2 * thk + 0.5 * thk, padding + hg + 2.5 * thk + 10 - 0.5 * thk, padding + wg - 2 * thk - 0.5 * thk, padding + hg + 2.5 * thk + 10 + 0.5 * thk);

            drawLine(padding + 3 * wg + 3 * thk, padding + hg - 2 * thk, padding + 3 * wg + 3 * thk, padding + hg + 2.5 * thk);
            drawLine(padding + 3 * wg + thk, padding + hg - 2 * thk, padding + 3 * wg + thk, padding + hg + 2.5 * thk);
            drawCenterLine(padding + 3 * wg + 2 * thk, padding + hg - 2 * thk - 20, padding + 3 * wg + 2 * thk, padding + hg + 2.5 * thk + 20);
            drawLine(padding + 3 * wg + 2 * thk - 0.5 * thk, padding + hg - 2 * thk - 10 - 0.5 * thk, padding + 3 * wg + 2 * thk + 0.5 * thk, padding + hg - 2 * thk - 10 + 0.5 * thk);
            drawLine(padding + 3 * wg + 2 * thk + 0.5 * thk, padding + hg - 2 * thk - 10 - 0.5 * thk, padding + 3 * wg + 2 * thk - 0.5 * thk, padding + hg - 2 * thk - 10 + 0.5 * thk);
            drawLine(padding + 3 * wg + 2 * thk - 0.5 * thk, padding + hg + 2.5 * thk + 10 - 0.5 * thk, padding + 3 * wg + 2 * thk + 0.5 * thk, padding + hg + 2.5 * thk + 10 + 0.5 * thk);
            drawLine(padding + 3 * wg + 2 * thk + 0.5 * thk, padding + hg + 2.5 * thk + 10 - 0.5 * thk, padding + 3 * wg + 2 * thk - 0.5 * thk, padding + hg + 2.5 * thk + 10 + 0.5 * thk);

            // 筒体
            drawLine(padding + wg, padding + hg, padding + wg, padding + 3 * hg);
            drawLine(padding + 3 * wg, padding + hg, padding + 3 * wg, padding + 3 * hg);
            drawLine(padding + wg + thk, padding + hg + 1.5 * thk, padding + wg + thk, padding + 3 * hg);
            drawLine(padding + 3 * wg - thk, padding + hg + 1.5 * thk, padding + 3 * wg - thk, padding + 3 * hg);
            drawLine(padding + wg, padding + hg + 1.5 * thk, padding + 3 * wg, padding + hg + 1.5 * thk);
            drawLine(padding + wg, padding + 3 * hg, padding + 3 * wg, padding + 3 * hg);

            // 角焊缝
            drawLine(padding + wg, padding + hg + 0.5 * thk, padding + wg + thk, padding + hg + 1.5 * thk);
            drawLine(padding + 3 * wg, padding + hg + 0.5 * thk, padding + 3 * wg - thk, padding + hg + 1.5 * thk);
            drawLine(padding + wg - 0.5 * thk, padding + hg + 2.5 * thk, padding + wg, padding + hg + 3 * thk);
            drawLine(padding + 3 * wg + 0.5 * thk, padding + hg + 2.5 * thk, padding + 3 * wg, padding + hg + 3 * thk);

            // dc
            dimTopH(padding + wg - 2 * thk, padding + hg - 2 * thk - 20, padding + 3 * wg + 2 * thk, padding + hg - 2 * thk - 20, dc, "BCFPSketchDC");

            // thkn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + hg - 2 * thk},
                    {x: padding + 1.5 * wg + 3, y: padding + hg - 2 * thk - 15},
                    {x: padding + 1.5 * wg - 3, y: padding + hg - 2 * thk - 15},
                    {x: padding + 1.5 * wg, y: padding + hg - 2 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + hg},
                    {x: padding + 1.5 * wg + 3, y: padding + hg + 15},
                    {x: padding + 1.5 * wg - 3, y: padding + hg + 15},
                    {x: padding + 1.5 * wg, y: padding + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg - 2 * thk - 15 - 10},
                {x: padding + 1.5 * wg, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg + 15 + 40},
                {x: padding + 1.5 * wg, y: padding + hg + 15}
            ])).attr("id", "BCFPSketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFPSketchTHKN").attr("startOffset", "50%").text(thkn);

            drawCenterLine(width / 2, padding + hg - 2 * thk - 10, width / 2, padding + 3 * hg + 10);
        }

        currentTabIndex = bcfpd2d3.tabs('getTabIndex', bcfpd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfp2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfp").length > 0) {
                    bcfp2d();
                }
            });
        }
        bcfpd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfp2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfp").length > 0) {
                            bcfp2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号16螺栓宽垫圆平盖",
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
                    $(ed.target).combobox("loadData", BCFPCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFPType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFPSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFPName);
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
                    bcfpSketch.empty();

                    // model
                    bcfpModel.empty();

                    // sketch
                    currentTabIndex = bcfpd2d3.tabs('getTabIndex', bcfpd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcfp2d();
                        bcfpSketch.off("resize").on("resize", function () {
                            if ($("#bcfp").length > 0) {
                                bcfp2d();
                            }
                        });
                    }
                    bcfpd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfp2d();
                                bcfpSketch.off("resize").on("resize", function () {
                                    if ($("#bcfp").length > 0) {
                                        bcfp2d();
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

                        BCFPDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFPCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFPType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFPSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFPDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFPDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFPCategory[index] = {
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

                        BCFPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFPType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFPSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFPCategoryVal,
                                temp: BCFPDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFPType = [];
                                $(result).each(function (index, element) {
                                    BCFPType[index] = {
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

                        BCFPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFPSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFPCategoryVal,
                                type: BCFPTypeVal,
                                temp: BCFPDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFPSTD = [];
                                $(result).each(function (index, element) {
                                    BCFPSTD[index] = {
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

                        BCFPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFPName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFPCategoryVal,
                                type: BCFPTypeVal,
                                std: BCFPSTDVal,
                                temp: BCFPDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFPName = [];
                                $(result).each(function (index, element) {
                                    BCFPName[index] = {
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
                        let BCFPPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFPPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFPPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFPPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFPTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFPTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFPNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFPDensity, BCFPThkMin, BCFPThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFPCategoryVal,
                                    "type": BCFPTypeVal,
                                    "std": BCFPSTDVal,
                                    "name": BCFPNameVal,
                                    "temp": BCFPDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFPDensity = parseFloat(result.density);
                                    BCFPThkMin = parseFloat(result.thkMin);
                                    BCFPThkMax = parseFloat(result.thkMax);

                                    // dc
                                    let BCFPDC;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFPDC = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // init Sketch
                                    if (currentTabIndex === 0) {
                                        bcfp2d("ϕ" + BCFPDC);
                                        bcfpSketch.off("resize").on("resize", function () {
                                            if ($("#bcfp").length > 0) {
                                                bcfp2d("ϕ" + BCFPDC);
                                            }
                                        });
                                    }
                                    bcfpd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfp2d("ϕ" + BCFPDC);
                                                bcfpSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfp").length > 0) {
                                                        bcfp2d("ϕ" + BCFPDC);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thkn
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFPThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFPThkMax) {
                                        let BCFPTHKN = parseFloat(rows[9][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            bcfp2d("ϕ" + BCFPDC, BCFPTHKN);
                                            bcfpSketch.off("resize").on("resize", function () {
                                                if ($("#bcfp").length > 0) {
                                                    bcfp2d("ϕ" + BCFPDC, BCFPTHKN);
                                                }
                                            });
                                        }
                                        bcfpd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    bcfp2d("ϕ" + BCFPDC, BCFPTHKN);
                                                    bcfpSketch.off("resize").on("resize", function () {
                                                        if ($("#bcfp").length > 0) {
                                                            bcfp2d("ϕ" + BCFPDC, BCFPTHKN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                        let BCFPOT, BCFPO, BCFPREL, BCFPC1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCFPCategoryVal,
                                                "type": BCFPTypeVal,
                                                "std": BCFPSTDVal,
                                                "name": BCFPNameVal,
                                                "thk": BCFPTHKN,
                                                "temp": BCFPDT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": 100000
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCFPOT = parseFloat(result.ot);
                                                if (BCFPOT < 0) {
                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFPO = parseFloat(result.o);
                                                if (BCFPO < 0) {
                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFPREL = parseFloat(result.rel);
                                                if (BCFPREL < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }
                                                BCFPC1 = parseFloat(result.c1);
                                                if (BCFPC1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 平盖腐蚀裕量
                                                let BCFPC2;
                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) < BCFPTHKN) {
                                                    BCFPC2 = parseFloat(rows[10][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCFPTHKN) {
                                                    south.html("平盖腐蚀裕量不能大于等于 " + BCFPTHKN + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // 平盖焊接接头系数
                                                let BCFPE;
                                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                    BCFPE = parseFloat(rows[11][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                let BCFPPC = BCFPPD + BCFPPS;
                                                let BCFPKP = 0.25;

                                                let BCFPC = BCFPC1 + BCFPC2;
                                                let BCFPTHKE = BCFPTHKN - BCFPC;
                                                let BCFPTHKC = BCFPDC * Math.sqrt(BCFPKP * BCFPPC / (BCFPOT * BCFPE));
                                                let BCFPTHKD = BCFPTHKC + BCFPC2;
                                                south.html(
                                                    "<span style='color:#444444;'>" +
                                                    "平盖所需厚度：" + (BCFPTHKD + BCFPC1).toFixed(2) + " mm" +
                                                    "</span>");
                                                let BCFPTHKCHK;
                                                if (BCFPTHKN >= (BCFPTHKD + BCFPC1).toFixed(2)) {
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + BCFPTHKN + " mm" +
                                                        "</span>");
                                                    BCFPTHKCHK = "合格";
                                                }
                                                else {
                                                    south.append(
                                                        "<span style='color:red;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + BCFPTHKN + " mm" +
                                                        "</span>");
                                                    BCFPTHKCHK = "不合格";
                                                }

                                                // 压力试验
                                                let BCFPTestPT;
                                                if (BCFPTest === "液压试验") {
                                                    BCFPTestPT = Math.max(1.25 * BCFPPD * BCFPO / BCFPOT, 0.05);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：液压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + BCFPTestPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }
                                                else if (BCFPTest === "气压试验") {
                                                    BCFPTestPT = Math.max(1.10 * BCFPPD * BCFPO / BCFPOT, 0.05);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：气压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + BCFPTestPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }

                                                // MAWP
                                                let BCFPMAWP = BCFPTHKE * BCFPTHKE * BCFPOT * BCFPE / (BCFPKP * BCFPDC * BCFPDC) - BCFPPS;
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "MAWP：" + BCFPMAWP.toFixed(4) + " MPa" +
                                                    "</span>");

                                                // docx
                                                let BCFPPayJS = $('#payjs');

                                                function getDocx() {
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "bcfpdocx.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            ribbonName: "BCFP",

                                                            t: BCFPDT,
                                                            pd: BCFPPD,
                                                            ps: BCFPPS,

                                                            std: BCFPSTDVal,
                                                            name: BCFPNameVal,
                                                            dc: BCFPDC,
                                                            thkn: BCFPTHKN,
                                                            c2: BCFPC2,
                                                            e: BCFPE,

                                                            test: BCFPTest,

                                                            d: BCFPDensity.toFixed(4),
                                                            rel: BCFPREL.toFixed(4),
                                                            c1: BCFPC1.toFixed(4),
                                                            ot: BCFPOT.toFixed(4),
                                                            o: BCFPO.toFixed(4),

                                                            pc: BCFPPC.toFixed(4),
                                                            kp: BCFPKP.toFixed(4),
                                                            c: BCFPC.toFixed(4),
                                                            thke: BCFPTHKE.toFixed(4),
                                                            thkc: BCFPTHKC.toFixed(4),
                                                            thkd: BCFPTHKD.toFixed(4),
                                                            thkchk: BCFPTHKCHK,

                                                            pt: BCFPTestPT.toFixed(4),
                                                            mawp: BCFPMAWP.toFixed(4)
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
                                                                BCFPPayJS.dialog({
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
                                                                            BCFPPayJS.dialog("close");
                                                                            BCFPPayJS.dialog("clear");
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
                                                                                        BCFPPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                        // 倒计时计数器
                                                                                        let maxTime = 4, timer;

                                                                                        function CountDown() {
                                                                                            if (maxTime >= 0) {
                                                                                                $("#payjs_timer").html(maxTime);
                                                                                                --maxTime;
                                                                                            } else {

                                                                                                clearInterval(timer);
                                                                                                // 关闭并清空收银台
                                                                                                BCFPPayJS.dialog('close');
                                                                                                BCFPPayJS.dialog('clear');
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
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFPThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFPThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFPThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFPThkMax + " mm").css("color", "red");
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