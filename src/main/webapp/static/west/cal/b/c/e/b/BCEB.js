$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcebSketch = $("#d2");
    let bcebModel = $("#d3");
    let bcebd2d3 = $('#d2d3');

    $("#cal").html("<table id='bceb'></table>");
    let pg = $("#bceb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/e/b/BCEB.json", function (result) {

        let BCEBDT;
        let BCEBCCategory, BCEBCCategoryVal, BCEBCType, BCEBCTypeVal, BCEBCSTD, BCEBCSTDVal, BCEBCName, BCEBCNameVal,
            BCEBPCategory, BCEBPCategoryVal, BCEBPType, BCEBPTypeVal, BCEBPSTD, BCEBPSTDVal, BCEBPName, BCEBPNameVal;
        let columns, rows, ed;

        function bceb2d(dbi = "ΦDbi", dpi = "ΦDpi", alpha = "α", thkcn = "δcn", thkpn = "δpn") {

            bcebSketch.empty();

            let width = bcebSketch.width();
            let height = bcebSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCEBSVG").attr("height", height);

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
                ])).attr("id", "BCEBSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCEBSketchDI").attr("startOffset", "50%").text(text);

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

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            // sketch
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 1.5 * hg - thk},
                {x: padding + wg, y: padding + 1.5 * hg - thk},
                {x: padding + 3 * wg, y: padding - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 1.5 * hg},
                {x: padding + wg, y: padding + 1.5 * hg},
                {x: padding + 3 * wg, y: padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 2.5 * hg},
                {x: padding + wg, y: padding + 2.5 * hg},
                {x: padding + 3 * wg, y: padding + 4 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 2.5 * hg + thk},
                {x: padding + wg, y: padding + 2.5 * hg + thk},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding, y: padding + 1.5 * hg - thk},
                {x: padding, y: padding + 2.5 * hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 1.5 * hg - thk},
                {x: padding + wg, y: padding + 2.5 * hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding - thk - 10},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk + 10}
            ])).classed("sketch", true).attr("stroke-dasharray", "25,5,5,5");

            drawCenterLine(padding - 10, height / 2, padding + 3 * wg + 10, height / 2);

            // dbi
            dimRightV(padding + 3 * wg, padding + 4 * hg, padding + 3 * wg, padding, dbi, "BCEBSketchDBI");

            // dpi
            dimLeftV(padding, padding + 2.5 * hg, padding, padding + 1.5 * hg, dpi, "BCEBSketchDPI");

            // thkpn
            extLineLeftH(padding, padding + 1.5 * hg - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 30, y: padding + 1.5 * hg - thk},
                    {x: padding - 27, y: padding + 1.5 * hg - thk - 15},
                    {x: padding - 33, y: padding + 1.5 * hg - thk - 15},
                    {x: padding - 30, y: padding + 1.5 * hg - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding + 1.5 * hg - thk},
                {x: padding - 30, y: padding + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding + 1.5 * hg - thk - 15},
                {x: padding - 30, y: padding + 1.5 * hg - thk - 15 - 40}
            ])).attr("id", "BCEBSketchTHKPN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEBSketchTHKPN").attr("startOffset", "50%").text(thkpn);

            // thkcn
            let rad = Math.atan(1.5 * hg / (2 * wg));
            let ang = rad / Math.PI * 180;
            let centerX = padding + 3 * wg - 2 * hg / Math.tan(rad);
            let centerY = height / 2;
            svg.append("path").attr("d", line([
                {x: width / 2, y: centerY + thk + 15 + 40},
                {x: width / 2, y: centerY + thk + 15}
            ])).attr("id", "BCEBSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEBSketchTHKCN").attr("startOffset", "50%").text(thkcn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY - 15},
                    {x: width / 2 + 3, y: centerY - 15},
                    {x: width / 2, y: centerY}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY - 15 - 15},
                    {x: width / 2, y: centerY - 15}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2, y: centerY + thk}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY + thk},
                    {x: width / 2 - 3, y: centerY + thk + 15},
                    {x: width / 2 + 3, y: centerY + thk + 15},
                    {x: width / 2, y: centerY + thk}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");

            // alpha
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY - 15},
                    {x: width / 2 + 3, y: centerY - 15},
                    {x: width / 2, y: centerY}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY + 15},
                    {x: width / 2 + 3, y: centerY + 15},
                    {x: width / 2, y: centerY}
                ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            let adimradius = width / 2 - centerX;
            svg.append("path").attr("d", "M "
                + (centerX + adimradius * Math.cos(rad)) + " " + (centerY - adimradius * Math.sin(rad)) + " "
                + "A" + adimradius + " " + adimradius + " "
                + "1 0 1" + " "
                + (width / 2) + " " + (centerY)
            ).classed("sketch", true).attr("id", "BCEBSketchALPHA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCEBSketchALPHA").attr("startOffset", "50%").text(alpha);
        }

        currentTabIndex = bcebd2d3.tabs('getTabIndex', bcebd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bceb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bceb").length > 0) {
                    bceb2d();
                }
            });
        }
        bcebd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bceb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bceb").length > 0) {
                            bceb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 锥壳小端内压强度校核",
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
                    $(ed.target).combobox("loadData", BCEBCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCEBCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCEBCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCEBCName);
                }

                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCEBPCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCEBPType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BCEBPSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BCEBPName);
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
                    bcebSketch.empty();

                    // model
                    bcebModel.empty();

                    // sketch
                    currentTabIndex = bcebd2d3.tabs('getTabIndex', bcebd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bceb2d();
                        bcebSketch.off("resize").on("resize", function () {
                            if ($("#bceb").length > 0) {
                                bceb2d();
                            }
                        });
                    }
                    bcebd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bceb2d();
                                bcebSketch.off("resize").on("resize", function () {
                                    if ($("#bceb").length > 0) {
                                        bceb2d();
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

                        BCEBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCEBCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEBCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEBCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEBCName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCEBPCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEBPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCEBPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BCEBPName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEBCCategory = [];
                                BCEBPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCEBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCEBCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCEBPCategory[index] = {
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

                        BCEBCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEBCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEBCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEBCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEBCCategoryVal,
                                temp: BCEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEBCType = [];
                                $(result).each(function (index, element) {
                                    BCEBCType[index] = {
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

                        BCEBCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEBCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEBCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEBCCategoryVal,
                                type: BCEBCTypeVal,
                                temp: BCEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEBCSTD = [];
                                $(result).each(function (index, element) {
                                    BCEBCSTD[index] = {
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

                        BCEBCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEBCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEBCCategoryVal,
                                type: BCEBCTypeVal,
                                std: BCEBCSTDVal,
                                temp: BCEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEBCName = [];
                                $(result).each(function (index, element) {
                                    BCEBCName[index] = {
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

                    // category 改变，重新加载type
                    else if (index === 14) {

                        BCEBPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEBPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCEBPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BCEBPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEBPCategoryVal,
                                temp: BCEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEBPType = [];
                                $(result).each(function (index, element) {
                                    BCEBPType[index] = {
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
                    else if (index === 15) {

                        BCEBPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCEBPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BCEBPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEBPCategoryVal,
                                type: BCEBPTypeVal,
                                temp: BCEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEBPSTD = [];
                                $(result).each(function (index, element) {
                                    BCEBPSTD[index] = {
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
                    else if (index === 16) {

                        BCEBPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BCEBPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEBPCategoryVal,
                                type: BCEBPTypeVal,
                                std: BCEBPSTDVal,
                                temp: BCEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEBPName = [];
                                $(result).each(function (index, element) {
                                    BCEBPName[index] = {
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
                        let BCEBPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCEBPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BCEBPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCEBPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCEBTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCEBTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 封头材料
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCEBCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取材料密度、最大最小厚度
                        let BCEBDC, BCEBCThkMin, BCEBCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BCEBCCategoryVal,
                                "type": BCEBCTypeVal,
                                "std": BCEBCSTDVal,
                                "name": BCEBCNameVal,
                                "temp": BCEBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BCEBDC = parseFloat(result.density);
                                BCEBCThkMin = parseFloat(result.thkMin);
                                BCEBCThkMax = parseFloat(result.thkMax);

                                // DBI
                                let BCEBDBI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    BCEBDBI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bceb2d("Φ" + BCEBDBI);
                                    bcebSketch.off("resize").on("resize", function () {
                                        if ($("#bceb").length > 0) {
                                            bceb2d("Φ" + BCEBDBI);
                                        }
                                    });
                                }
                                bcebd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bceb2d("Φ" + BCEBDBI);
                                            bcebSketch.off("resize").on("resize", function () {
                                                if ($("#bceb").length > 0) {
                                                    bceb2d("Φ" + BCEBDBI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // DPI
                                let BCEBDPI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) <= BCEBDBI) {
                                    BCEBDPI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > BCEBDBI) {
                                    south.html("小端内直径 Dpi 不能大于 " + BCEBDBI + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI);
                                    bcebSketch.off("resize").on("resize", function () {
                                        if ($("#bceb").length > 0) {
                                            bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI);
                                        }
                                    });
                                }
                                bcebd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI);
                                            bcebSketch.off("resize").on("resize", function () {
                                                if ($("#bceb").length > 0) {
                                                    bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // α
                                let BCEBALPHA;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    BCEBALPHA = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°");
                                    bcebSketch.off("resize").on("resize", function () {
                                        if ($("#bceb").length > 0) {
                                            bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°");
                                        }
                                    });
                                }
                                bcebd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°");
                                            bcebSketch.off("resize").on("resize", function () {
                                                if ($("#bceb").length > 0) {
                                                    bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCEBTHKCN;
                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > BCEBCThkMin
                                    && parseFloat(rows[11][columns[0][1].field]) <= BCEBCThkMax) {
                                    BCEBTHKCN = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) <= BCEBCThkMin) {
                                    south.html("锥壳材料厚度不能小于等于 " + BCEBCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > BCEBCThkMax) {
                                    south.html("锥壳材料厚度不能大于 " + BCEBCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°", BCEBTHKCN);
                                    bcebSketch.off("resize").on("resize", function () {
                                        if ($("#bceb").length > 0) {
                                            bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°", BCEBTHKCN);
                                        }
                                    });
                                }
                                bcebd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°", BCEBTHKCN);
                                            bcebSketch.off("resize").on("resize", function () {
                                                if ($("#bceb").length > 0) {
                                                    bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°", BCEBTHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCEBOCT, BCEBOC, BCEBRCEL, BCEBCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BCEBCCategoryVal,
                                        "type": BCEBCTypeVal,
                                        "std": BCEBCSTDVal,
                                        "name": BCEBCNameVal,
                                        "thk": BCEBTHKCN,
                                        "temp": BCEBDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BCEBDBI + 2 * BCEBTHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BCEBOCT = parseFloat(result.ot);
                                        if (BCEBOCT < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEBOC = parseFloat(result.o);
                                        if (BCEBOC < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEBRCEL = parseFloat(result.rel);
                                        if (BCEBRCEL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEBCC1 = parseFloat(result.c1);
                                        if (BCEBCC1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        // 腐蚀裕量
                                        let BCEBCC2;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) < BCEBTHKCN) {
                                            BCEBCC2 = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) >= BCEBTHKCN) {
                                            south.html("锥壳腐蚀裕量不能大于等于 " + BCEBTHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 焊接接头系数
                                        let BCEBEC;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                            BCEBEC = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 小端筒体材料
                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                            BCEBPNameVal = rows[17][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取材料密度、最大最小厚度
                                        let BCEBDP, BCEBPThkMin, BCEBPThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCEBPCategoryVal,
                                                "type": BCEBPTypeVal,
                                                "std": BCEBPSTDVal,
                                                "name": BCEBPNameVal,
                                                "temp": BCEBDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCEBDP = parseFloat(result.density);
                                                BCEBPThkMin = parseFloat(result.thkMin);
                                                BCEBPThkMax = parseFloat(result.thkMax);

                                                let BCEBTHKPN;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > BCEBPThkMin
                                                    && parseFloat(rows[18][columns[0][1].field]) <= BCEBPThkMax) {
                                                    BCEBTHKPN = parseFloat(rows[18][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) <= BCEBPThkMin) {
                                                    south.html("小端筒体材料厚度不能小于等于 " + BCEBPThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > BCEBPThkMax) {
                                                    south.html("小端筒体材料厚度不能大于 " + BCEBPThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°", BCEBTHKCN, BCEBTHKPN);
                                                    bcebSketch.off("resize").on("resize", function () {
                                                        if ($("#bceb").length > 0) {
                                                            bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°", BCEBTHKCN, BCEBTHKPN);
                                                        }
                                                    });
                                                }
                                                bcebd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°", BCEBTHKCN, BCEBTHKPN);
                                                            bcebSketch.off("resize").on("resize", function () {
                                                                if ($("#bceb").length > 0) {
                                                                    bceb2d("Φ" + BCEBDBI, "Φ" + BCEBDPI, BCEBALPHA + "°", BCEBTHKCN, BCEBTHKPN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BCEBOPT, BCEBOP, BCEBRPEL, BCEBCP1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCEBPCategoryVal,
                                                        "type": BCEBPTypeVal,
                                                        "std": BCEBPSTDVal,
                                                        "name": BCEBPNameVal,
                                                        "thk": BCEBTHKPN,
                                                        "temp": BCEBDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BCEBDPI + 2 * BCEBTHKPN
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCEBOPT = parseFloat(result.ot);
                                                        if (BCEBOPT < 0) {
                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEBOP = parseFloat(result.o);
                                                        if (BCEBOP < 0) {
                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEBRPEL = parseFloat(result.rel);
                                                        if (BCEBRPEL < 0) {
                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEBCP1 = parseFloat(result.c1);
                                                        if (BCEBCP1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        // 腐蚀裕量
                                                        let BCEBCP2;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) < BCEBTHKPN) {
                                                            BCEBCP2 = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) >= BCEBTHKPN) {
                                                            south.html("小端筒体腐蚀裕量不能大于等于 " + BCEBTHKPN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 焊接接头系数
                                                        let BCEBEP;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                            BCEBEP = parseFloat(rows[20][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 过程参数
                                                        let BCEBPC = BCEBPD + BCEBPS;
                                                        let BCEBCC = BCEBCC1 + BCEBCC2;
                                                        let BCEBTHKCE = BCEBTHKCN - BCEBCC;
                                                        let BCEBWC = 0.6 * Math.sqrt(BCEBDPI * BCEBTHKCE / 2 / Math.cos(BCEBALPHA / 180 * Math.PI));
                                                        let BCEBT1 = BCEBPC * BCEBDPI / 4 / Math.cos(BCEBALPHA / 180 * Math.PI);
                                                        let BCEBT2 = BCEBPC * BCEBDPI / 2 / Math.cos(BCEBALPHA / 180 * Math.PI);
                                                        let BCEBCP = BCEBCP1 + BCEBCP2;
                                                        let BCEBTHKPE = BCEBTHKPN - BCEBCP;
                                                        let BCEBWP = 0.6 * Math.sqrt(BCEBDPI * BCEBTHKPE / 2);
                                                        let BCEBT2S = BCEBDPI * BCEBPC / 2;

                                                        // 锥壳内压计算及校核
                                                        let BCEBTHKCC = BCEBPC * BCEBDBI / (2 * BCEBOCT * BCEBEC) / Math.cos(BCEBALPHA / 180 * Math.PI);
                                                        let BCEBTHKCD = BCEBTHKCC + BCEBCC2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "小端锥壳内压所需厚度：" + (BCEBTHKCD + BCEBCC1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BCEBTHKCCHK;
                                                        if (BCEBTHKCN >= (BCEBTHKCD + BCEBCC1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCEBTHKCN + " mm" +
                                                                "</span>");
                                                            BCEBTHKCCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCEBTHKCN + " mm" +
                                                                "</span>");
                                                            BCEBTHKCCHK = "不合格";
                                                        }

                                                        // 小端筒体内压计算及校核
                                                        let BCEBTHKPC = BCEBPC * BCEBDPI / (2 * BCEBOPT * BCEBEP);
                                                        let BCEBTHKPD = BCEBTHKPC + BCEBCP2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "小端连接筒体内压所需厚度：" + (BCEBTHKPD + BCEBCP1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BCEBTHKPCHK;
                                                        if (BCEBTHKPN >= (BCEBTHKPD + BCEBCP1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCEBTHKPN + " mm" +
                                                                "</span>");
                                                            BCEBTHKPCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCEBTHKPN + " mm" +
                                                                "</span>");
                                                            BCEBTHKPCHK = "不合格";
                                                        }

                                                        // 连接处计算及校核
                                                        let BCEBQ = BCEBT2 * BCEBWC + BCEBT2S * BCEBWP - 0.5 * BCEBT2 * BCEBDPI * Math.sin(BCEBALPHA / 180 * Math.PI);
                                                        let BCEBOCRT = -1;
                                                        if (BCEBQ < 0) {
                                                            if (BCEBDT <= 100) {
                                                                BCEBOCRT = 103;
                                                            }
                                                            else if (BCEBDT > 100 && BCEBDT <= 200) {
                                                                BCEBOCRT = 100;
                                                            }
                                                            else if (BCEBDT > 200 && BCEBDT <= 250) {
                                                                BCEBOCRT = 95;
                                                            }
                                                            else if (BCEBDT > 250 && BCEBDT <= 350) {
                                                                BCEBOCRT = 80;
                                                            }
                                                            else {
                                                                south.html("查表6-3超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }

                                                        let BCEBA;
                                                        if (BCEBQ < 0) {
                                                            BCEBA = Math.abs(BCEBQ) / BCEBOCRT;
                                                        }
                                                        else {
                                                            BCEBA = Math.abs(BCEBQ) / Math.min(BCEBOCT * BCEBEC, BCEBOPT * BCEBEP);
                                                        }
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "小端连接处所需承压面积：" + BCEBA.toFixed(4) + " mm²" +
                                                            "</span>");

                                                        let BCEBAACT = BCEBWC * BCEBTHKCE + BCEBWP * BCEBTHKPE;
                                                        let BCEBACHK, BCEBAREQ = -1.0;
                                                        if (BCEBAACT >= BCEBA) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际承压面积：" + BCEBAACT.toFixed(4) + " mm²" +
                                                                "</span>");
                                                            BCEBACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际承压面积：" + BCEBAACT.toFixed(4) + " mm²" +
                                                                "</span>");
                                                            BCEBACHK = "不合格";
                                                            BCEBAREQ = BCEBA - BCEBAACT;
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "连接处需要增加的承压面积：" + BCEBAREQ.toFixed(4) + " mm²" +
                                                                "</span>");
                                                        }

                                                        let BCEBWCSINALPHA = BCEBWC * Math.sin(BCEBALPHA / 180 * Math.PI);
                                                        let BCEBDPI075 = 0.0075 * BCEBDPI;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "锥壳最小径向投影宽度：" + BCEBDPI075.toFixed(4) + " mm" +
                                                            "</span>");
                                                        let BCEBWCSINALPHACHK;
                                                        if (BCEBWCSINALPHA >= BCEBDPI075) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际投影宽度：" + BCEBWCSINALPHA.toFixed(4) + " mm" +
                                                                "</span>");
                                                            BCEBWCSINALPHACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际投影宽度：" + BCEBWCSINALPHA.toFixed(4) + " mm" +
                                                                "</span>");
                                                            BCEBWCSINALPHACHK = "不合格";
                                                        }

                                                        // 压力试验
                                                        let BCEBETA, BCEBPCT, BCEBPPT, BCEBPT;
                                                        if (BCEBTest === "液压试验") {
                                                            BCEBETA = 1.25;
                                                            BCEBPCT = Math.max(BCEBETA * BCEBPD * BCEBOC / BCEBOCT, 0.05);
                                                            BCEBPPT = Math.max(BCEBETA * BCEBPD * BCEBOP / BCEBOPT, 0.05);
                                                            BCEBPT = Math.min(BCEBPCT, BCEBPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BCEBPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (BCEBTest === "气压试验") {
                                                            BCEBETA = 1.10;
                                                            BCEBPCT = Math.max(BCEBETA * BCEBPD * BCEBOC / BCEBOCT, 0.05);
                                                            BCEBPPT = Math.max(BCEBETA * BCEBPD * BCEBOP / BCEBOPT, 0.05);
                                                            BCEBPT = Math.min(BCEBPCT, BCEBPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BCEBPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }

                                                        // docx
                                                        let BCEBPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "bcebdocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "BCEB",

                                                                    pd: BCEBPD,
                                                                    t: BCEBDT,
                                                                    ps: BCEBPS,
                                                                    test: BCEBTest,

                                                                    stdc: BCEBCSTDVal,
                                                                    namec: BCEBCNameVal,
                                                                    dbi: BCEBDBI,
                                                                    dpi: BCEBDPI,
                                                                    alpha: BCEBALPHA,
                                                                    thkcn: BCEBTHKCN,
                                                                    cc2: BCEBCC2,
                                                                    ec: BCEBEC,

                                                                    stdp: BCEBPSTDVal,
                                                                    namep: BCEBPNameVal,
                                                                    thkpn: BCEBTHKPN,
                                                                    cp2: BCEBCP2,
                                                                    ep: BCEBEP,

                                                                    dc: BCEBDC.toFixed(4),
                                                                    rcel: BCEBRCEL.toFixed(4),
                                                                    cc1: BCEBCC1.toFixed(4),
                                                                    oct: BCEBOCT.toFixed(4),
                                                                    oc: BCEBOC.toFixed(4),

                                                                    dp: BCEBDP.toFixed(4),
                                                                    rpel: BCEBRPEL.toFixed(4),
                                                                    cp1: BCEBCP1.toFixed(4),
                                                                    opt: BCEBOPT.toFixed(4),
                                                                    op: BCEBOP.toFixed(4),

                                                                    pc: BCEBPC.toFixed(4),

                                                                    cc: BCEBCC.toFixed(4),
                                                                    thkce: BCEBTHKCE.toFixed(4),
                                                                    wc: BCEBWC.toFixed(4),
                                                                    t1: BCEBT1.toFixed(4),
                                                                    t2: BCEBT2.toFixed(4),

                                                                    cp: BCEBCP.toFixed(4),
                                                                    thkpe: BCEBTHKPE.toFixed(4),
                                                                    wp: BCEBWP.toFixed(4),
                                                                    t2s: BCEBT2S.toFixed(4),

                                                                    ocrt: BCEBOCRT.toFixed(4),

                                                                    thkcc: BCEBTHKCC.toFixed(4),
                                                                    thkcd: BCEBTHKCD.toFixed(4),
                                                                    thkcchk: BCEBTHKCCHK,

                                                                    thkpc: BCEBTHKPC.toFixed(4),
                                                                    thkpd: BCEBTHKPD.toFixed(4),
                                                                    thkpchk: BCEBTHKPCHK,

                                                                    q: BCEBQ.toFixed(4),
                                                                    a: BCEBA.toFixed(4),
                                                                    aact: BCEBAACT.toFixed(4),
                                                                    achk: BCEBACHK,

                                                                    areq: BCEBAREQ.toFixed(4),
                                                                    wcsinalpha: BCEBWCSINALPHA.toFixed(4),
                                                                    dpi075: BCEBDPI075.toFixed(4),
                                                                    wcsinalphachk: BCEBWCSINALPHACHK,

                                                                    eta: BCEBETA.toFixed(4),
                                                                    pct: BCEBPCT.toFixed(4),
                                                                    ppt: BCEBPPT.toFixed(4),
                                                                    pt: BCEBPT.toFixed(4),
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
                                                                        BCEBPayJS.dialog({
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
                                                                                    BCEBPayJS.dialog("close");
                                                                                    BCEBPayJS.dialog("clear");
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
                                                                                                BCEBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        BCEBPayJS.dialog('close');
                                                                                                        BCEBPayJS.dialog('clear');
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
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                    }
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                            }
                        });
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});