$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcjSketch = $("#d2");
    let bcjModel = $("#d3");
    let bcjd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcj'></table>");
    let pg = $("#bcj");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/j/BCJ.json", function (result) {

        let BCJDT,
            BCJSCategory, BCJSCategoryVal, BCJSType, BCJSTypeVal, BCJSSTD, BCJSSTDVal, BCJSName, BCJSNameVal,
            BCJBCategory, BCJBCategoryVal, BCJBType, BCJBTypeVal, BCJBSTD, BCJBSTDVal, BCJBName, BCJBNameVal,
            BCJECategory, BCJECategoryVal, BCJEType, BCJETypeVal, BCJESTD, BCJESTDVal, BCJEName, BCJENameVal,
            columns, rows, ed;

        function bcj2d(dso = "ΦDso", l = "L", thksn = "δsn", thkbn = "δbn", thken = "δen") {

            bcjSketch.empty();

            let width = bcjSketch.width();
            let height = bcjSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCJSVG").attr("height", height);

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

            let padding = 100;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 10;

            svg.append("path").attr("d", line([
                {x: padding, y: padding + hg},
                {x: width / 2, y: padding + hg},
                {x: width / 2, y: padding + 3 * hg},
                {x: padding, y: padding + 3 * hg},
                {x: padding, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding, y: padding + hg + thk},
                {x: width / 2, y: padding + hg + thk}
            ])).classed("sketch", true).attr("stroke-dasharray", "5,5,5");
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 3 * hg - thk},
                {x: width / 2, y: padding + 3 * hg - thk}
            ])).classed("sketch", true).attr("stroke-dasharray", "5,5,5");
            svg.append("path").attr("d", line([
                {x: padding + thk, y: padding + hg + thk},
                {x: padding + thk, y: padding + 3 * hg - thk}
            ])).classed("sketch", true).attr("stroke-dasharray", "5,5,5");
            svg.append("path").attr("d", line([
                {x: width / 2 - thk, y: padding + hg + thk},
                {x: width / 2 - thk, y: padding + 3 * hg - thk}
            ])).classed("sketch", true).attr("stroke-dasharray", "5,5,5");
            drawCenterLine(padding - 10, height / 2, width / 2 + 10, height / 2);

            let cx = padding + 3 * wg;
            let cy = height / 2;
            svg.append("path").attr("d", line([
                {x: cx - thk, y: cy - hg},
                {x: cx, y: cy - hg},
                {x: cx, y: cy + hg},
                {x: cx - thk, y: cy + hg},
                {x: cx - thk, y: cy - hg}
            ])).classed("sketch", true);

            drawArc(hg, hg, cx, cy - hg, cx, cy + hg);
            drawArc(hg - thk, hg - thk, cx, cy - hg + thk, cx, cy + hg - thk);
            drawCenterLine(cx - thk - 10, cy, cx + hg + 10, cy);

            // DSO
            dimLeftV(cx - thk, cy + hg, cx - thk, cy - hg, dso, "BCJSketchDSO");

            // L
            dimBottomH(padding, cy + hg, width / 2, cy + hg, l, "BCJSketchL");

            // THKSN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + hg - thk, y: cy},
                    {x: cx + hg - thk - 15, y: cy - 3},
                    {x: cx + hg - thk - 15, y: cy + 3},
                    {x: cx + hg - thk, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", line([
                {x: cx + hg - thk - 15 - 10, y: cy},
                {x: cx + hg, y: cy}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + hg, y: cy},
                    {x: cx + hg + 15, y: cy - 3},
                    {x: cx + hg + 15, y: cy + 3},
                    {x: cx + hg, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", line([
                {x: cx + hg + 15, y: cy},
                {x: cx + hg + 15 + 40, y: cy}
            ])).attr("id", "BCJSketchTHKSN").classed("sketch", true)
                .attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCJSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // THKBN
            extLineBottomV(cx - thk, cy + hg);
            extLineBottomV(cx, cy + hg);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx, y: cy + hg + 30},
                    {x: cx + 15, y: cy + hg + 27},
                    {x: cx + 15, y: cy + hg + 33},
                    {x: cx, y: cy + hg + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - thk, y: cy + hg + 30},
                    {x: cx - thk - 15, y: cy + hg + 27},
                    {x: cx - thk - 15, y: cy + hg + 33},
                    {x: cx - thk, y: cy + hg + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: cx - thk, y: cy + hg + 30},
                {x: cx + 15 + 10, y: cy + hg + 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx - thk - 15 - 40, y: cy + hg + 30},
                {x: cx - thk - 15, y: cy + hg + 30}
            ])).attr("id", "BCJSketchTHKBN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCJSketchTHKBN").attr("startOffset", "50%").text(thkbn);

            // THKEN
            extLineTopV(width / 2 - thk, padding + hg);
            extLineTopV(width / 2, padding + hg);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding + hg - 30},
                    {x: width / 2 + 15, y: padding + hg - 27},
                    {x: width / 2 + 15, y: padding + hg - 33},
                    {x: width / 2, y: padding + hg - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - thk, y: padding + hg - 30},
                    {x: width / 2 - thk - 15, y: padding + hg - 27},
                    {x: width / 2 - thk - 15, y: padding + hg - 33},
                    {x: width / 2 - thk, y: padding + hg - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - thk, y: padding + hg - 30},
                {x: width / 2 + 15 + 10, y: padding + hg - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2 - thk - 15 - 40, y: padding + hg - 30},
                {x: width / 2 - thk - 15, y: padding + hg - 30}
            ])).attr("id", "BCJSketchTHKEN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCJSketchTHKEN").attr("startOffset", "50%").text(thken);
        }

        currentTabIndex = bcjd2d3.tabs('getTabIndex', bcjd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcj2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcj").length > 0) {
                    bcj2d();
                }
            });
        }
        bcjd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcj2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcj").length > 0) {
                            bcj2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "半圆形常压容器强度计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 190,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 133,
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
                    $(ed.target).combobox("loadData", BCJSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCJSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCJSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCJSName);
                }

                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCJBCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCJBType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCJBSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BCJBName);
                }

                else if (index === 20) {
                    $(ed.target).combobox("loadData", BCJECategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BCJEType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BCJESTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BCJEName);
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

                    // docx button
                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch & model
                    bcjSketch.empty();
                    bcjModel.empty();

                    // sketch
                    currentTabIndex = bcjd2d3.tabs('getTabIndex', bcjd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcj2d();
                        bcjSketch.off("resize").on("resize", function () {
                            if ($("#bcj").length > 0) {
                                bcj2d();
                            }
                        });
                    }
                    bcjd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcj2d();
                                bcjSketch.off("resize").on("resize", function () {
                                    if ($("#bcj").length > 0) {
                                        bcj2d();
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

                        BCJDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCJSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCJSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCJSName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCJBCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCJBType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCJBSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCJBName = null;

                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BCJECategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCJEType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCJESTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCJEName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJSCategory = [];
                                BCJBCategory = [];
                                BCJECategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCJDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCJSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCJBCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCJECategory[index] = {
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

                        BCJSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCJSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCJSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJSCategoryVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJSType = [];
                                $(result).each(function (index, element) {
                                    BCJSType[index] = {
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

                        BCJSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCJSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJSCategoryVal,
                                type: BCJSTypeVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJSSTD = [];
                                $(result).each(function (index, element) {
                                    BCJSSTD[index] = {
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

                        BCJSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCJSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJSCategoryVal,
                                type: BCJSTypeVal,
                                std: BCJSSTDVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJSName = [];
                                $(result).each(function (index, element) {
                                    BCJSName[index] = {
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
                    else if (index === 13) {

                        BCJBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCJBType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCJBSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCJBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJBCategoryVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJBType = [];
                                $(result).each(function (index, element) {
                                    BCJBType[index] = {
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
                    else if (index === 14) {

                        BCJBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCJBSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCJBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJBCategoryVal,
                                type: BCJBTypeVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJBSTD = [];
                                $(result).each(function (index, element) {
                                    BCJBSTD[index] = {
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
                    else if (index === 15) {

                        BCJBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCJBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJBCategoryVal,
                                type: BCJBTypeVal,
                                std: BCJBSTDVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJBName = [];
                                $(result).each(function (index, element) {
                                    BCJBName[index] = {
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
                    else if (index === 20) {

                        BCJECategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCJEType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCJESTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCJEName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJECategoryVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJEType = [];
                                $(result).each(function (index, element) {
                                    BCJEType[index] = {
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
                    else if (index === 21) {

                        BCJETypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCJESTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCJEName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJECategoryVal,
                                type: BCJETypeVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJESTD = [];
                                $(result).each(function (index, element) {
                                    BCJESTD[index] = {
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
                    else if (index === 22) {

                        BCJESTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCJEName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCJECategoryVal,
                                type: BCJETypeVal,
                                std: BCJESTDVal,
                                temp: BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCJEName = [];
                                $(result).each(function (index, element) {
                                    BCJEName[index] = {
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

                    // name 及业务逻辑
                    else {

                        // PD
                        let BCJPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCJPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // PS
                        let BCJPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCJPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Test
                        let BCJTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCJTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 半圆筒材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCJSNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取材料密度、最大最小厚度
                        let BCJDS, BCJSThkMin, BCJSThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BCJSCategoryVal,
                                "type": BCJSTypeVal,
                                "std": BCJSSTDVal,
                                "name": BCJSNameVal,
                                "temp": BCJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BCJDS = parseFloat(result.density);
                                BCJSThkMin = parseFloat(result.thkMin);
                                BCJSThkMax = parseFloat(result.thkMax);

                                // DSO
                                let BCJDSO;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    BCJDSO = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcj2d("Φ" + BCJDSO);
                                    bcjSketch.off("resize").on("resize", function () {
                                        if ($("#bcj").length > 0) {
                                            bcj2d("Φ" + BCJDSO);
                                        }
                                    });
                                }
                                bcjd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcj2d("Φ" + BCJDSO);
                                            bcjSketch.off("resize").on("resize", function () {
                                                if ($("#bcj").length > 0) {
                                                    bcj2d("Φ" + BCJDSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                // L
                                let BCJL;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    BCJL = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcj2d("Φ" + BCJDSO, BCJL);
                                    bcjSketch.off("resize").on("resize", function () {
                                        if ($("#bcj").length > 0) {
                                            bcj2d("Φ" + BCJDSO, BCJL);
                                        }
                                    });
                                }
                                bcjd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcj2d("Φ" + BCJDSO, BCJL);
                                            bcjSketch.off("resize").on("resize", function () {
                                                if ($("#bcj").length > 0) {
                                                    bcj2d("Φ" + BCJDSO, BCJL);
                                                }
                                            });
                                        }
                                    }
                                });

                                // THKSN
                                let BCJTHKSN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BCJSThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= BCJSThkMax) {
                                    BCJTHKSN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= BCJSThkMin) {
                                    south.html("半圆筒材料厚度不能小于等于 " + BCJSThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BCJSThkMax) {
                                    south.html("半圆筒材料厚度不能大于 " + BCJSThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN);
                                    bcjSketch.off("resize").on("resize", function () {
                                        if ($("#bcj").length > 0) {
                                            bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN);
                                        }
                                    });
                                }
                                bcjd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN);
                                            bcjSketch.off("resize").on("resize", function () {
                                                if ($("#bcj").length > 0) {
                                                    bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCJOST, BCJOS, BCJRTSEL, BCJCS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BCJSCategoryVal,
                                        "type": BCJSTypeVal,
                                        "std": BCJSSTDVal,
                                        "name": BCJSNameVal,
                                        "thk": BCJTHKSN,
                                        "temp": BCJDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BCJDSO
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BCJOST = parseFloat(result.ot);
                                        if (BCJOST < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCJOS = parseFloat(result.o);
                                        if (BCJOS < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCJRTSEL = parseFloat(result.rel);
                                        if (BCJRTSEL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BCJCS1 = parseFloat(result.c1);
                                        if (BCJCS1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        // CS2
                                        let BCJCS2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < BCJTHKSN) {
                                            BCJCS2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= BCJTHKSN) {
                                            south.html("半圆筒腐蚀裕量不能大于等于 " + BCJTHKSN + " mm!").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // ES
                                        let BCJES;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            BCJES = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 底板材料名称
                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                            BCJBNameVal = rows[16][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取材料密度、最大最小厚度
                                        let BCJDB, BCJBThkMin, BCJBThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCJBCategoryVal,
                                                "type": BCJBTypeVal,
                                                "std": BCJBSTDVal,
                                                "name": BCJBNameVal,
                                                "temp": BCJDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCJDB = parseFloat(result.density);
                                                BCJBThkMin = parseFloat(result.thkMin);
                                                BCJBThkMax = parseFloat(result.thkMax);

                                                // THKBN
                                                let BCJTHKBN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > BCJBThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= BCJBThkMax) {
                                                    BCJTHKBN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= BCJBThkMin) {
                                                    south.html("底板材料厚度不能小于等于 " + BCJBThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > BCJBThkMax) {
                                                    south.html("底板材料厚度不能大于 " + BCJBThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN, BCJTHKBN);
                                                    bcjSketch.off("resize").on("resize", function () {
                                                        if ($("#bcj").length > 0) {
                                                            bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN, BCJTHKBN);
                                                        }
                                                    });
                                                }
                                                bcjd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN, BCJTHKBN);
                                                            bcjSketch.off("resize").on("resize", function () {
                                                                if ($("#bcj").length > 0) {
                                                                    bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN, BCJTHKBN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BCJOBT, BCJOB, BCJRTBEL, BCJCB1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCJBCategoryVal,
                                                        "type": BCJBTypeVal,
                                                        "std": BCJBSTDVal,
                                                        "name": BCJBNameVal,
                                                        "thk": BCJTHKBN,
                                                        "temp": BCJDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": 100000
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCJOBT = parseFloat(result.ot);
                                                        if (BCJOBT < 0) {
                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCJOB = parseFloat(result.o);
                                                        if (BCJOB < 0) {
                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCJRTBEL = parseFloat(result.rel);
                                                        if (BCJRTBEL < 0) {
                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCJCB1 = parseFloat(result.c1);
                                                        if (BCJCB1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        // CB2
                                                        let BCJCB2;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) < BCJTHKBN) {
                                                            BCJCB2 = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) >= BCJTHKBN) {
                                                            south.html("底板腐蚀裕量不能大于等于 " + BCJTHKBN + " mm!").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // EB
                                                        let BCJEB;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                            BCJEB = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 端板材料名称
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                            BCJENameVal = rows[23][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // AJAX 获取材料密度、最大最小厚度
                                                        let BCJDE, BCJEThkMin, BCJEThkMax;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_index.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCJECategoryVal,
                                                                "type": BCJETypeVal,
                                                                "std": BCJESTDVal,
                                                                "name": BCJENameVal,
                                                                "temp": BCJDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCJDE = parseFloat(result.density);
                                                                BCJEThkMin = parseFloat(result.thkMin);
                                                                BCJEThkMax = parseFloat(result.thkMax);

                                                                // THKEN
                                                                let BCJTHKEN;
                                                                if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > BCJEThkMin
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= BCJEThkMax) {
                                                                    BCJTHKEN = parseFloat(rows[24][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= BCJEThkMin) {
                                                                    south.html("端板材料厚度不能小于等于 " + BCJEThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > BCJEThkMax) {
                                                                    south.html("端板材料厚度不能大于 " + BCJEThkMax + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN, BCJTHKBN, BCJTHKEN);
                                                                    bcjSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcj").length > 0) {
                                                                            bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN, BCJTHKBN, BCJTHKEN);
                                                                        }
                                                                    });
                                                                }
                                                                bcjd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN, BCJTHKBN, BCJTHKEN);
                                                                            bcjSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcj").length > 0) {
                                                                                    bcj2d("Φ" + BCJDSO, BCJL, BCJTHKSN, BCJTHKBN, BCJTHKEN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                let BCJOET, BCJOE, BCJRTEEL, BCJCE1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": BCJECategoryVal,
                                                                        "type": BCJETypeVal,
                                                                        "std": BCJESTDVal,
                                                                        "name": BCJENameVal,
                                                                        "thk": BCJTHKEN,
                                                                        "temp": BCJDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": 100000
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        BCJOET = parseFloat(result.ot);
                                                                        if (BCJOET < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCJOE = parseFloat(result.o);
                                                                        if (BCJOE < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCJRTEEL = parseFloat(result.rel);
                                                                        if (BCJRTEEL < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCJCE1 = parseFloat(result.c1);
                                                                        if (BCJCE1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // CE2
                                                                        let BCJCE2;
                                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) < BCJTHKEN) {
                                                                            BCJCE2 = parseFloat(rows[25][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) >= BCJTHKEN) {
                                                                            south.html("端板腐蚀裕量不能大于等于 " + BCJTHKEN + " mm!").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // EE
                                                                        let BCJEE;
                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                                            BCJEE = parseFloat(rows[26][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 过程参数
                                                                        let BCJPC = BCJPD + BCJPS;
                                                                        let BCJCS = BCJCS1 + BCJCS2;
                                                                        let BCJTHKSE = BCJTHKSN - BCJCS;
                                                                        let BCJRSO = BCJDSO / 2;
                                                                        let BCJCB = BCJCB1 + BCJCB2;
                                                                        let BCJTHKBE = BCJTHKBN - BCJCB;
                                                                        let BCJCE = BCJCE1 + BCJCE2;
                                                                        let BCJTHKEE = BCJTHKEN - BCJCE;

                                                                        // 半圆筒
                                                                        let BCJOSC = BCJPC * (BCJDSO - BCJTHKSE) / (2 * BCJTHKSE);
                                                                        let BCJOSTES = BCJOST * BCJES;
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "半圆筒许用应力：" + BCJOSTES.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        // 环向应力校核
                                                                        let BCJOSCCHK;
                                                                        if (BCJOSC <= BCJOSTES) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "半圆筒中央部分实际环向应力：" + BCJOSC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            BCJOSCCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "半圆筒中央部分实际环向应力：" + BCJOSC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            BCJOSCCHK = "不合格";
                                                                        }

                                                                        let BCJKS = (0.8 * BCJDSO / BCJL - 3) + 0.67 * BCJRSO / BCJTHKBE;
                                                                        let BCJOSCC = Math.abs(BCJKS * BCJPC * BCJRSO / BCJTHKSE);
                                                                        let BCJESOST = BCJES * BCJOST;
                                                                        // 连接部分压应力校核
                                                                        let BCJOSCCCHK;
                                                                        if (BCJOSCC <= BCJOSTES) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "半圆筒与底板连接处压应力：" + BCJOSCC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            BCJOSCCCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "半圆筒与底板连接处压应力：" + BCJOSCC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            BCJOSCCCHK = "不合格";
                                                                        }

                                                                        // 底板应力计算及校核
                                                                        let BCJKB = (0.4 + 0.275 * BCJDSO / BCJL) - 1.18 * BCJTHKSE / BCJTHKBE;
                                                                        let BCJOBC = Math.abs(BCJKB * BCJPC * BCJL * BCJL / BCJTHKBE / BCJTHKBE);
                                                                        let BCJEBOBT = BCJEB * BCJOBT;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "底板许用应力：" + BCJEBOBT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        let BCJOBCCHK;
                                                                        if (BCJOBC <= BCJEBOBT) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "底板最大应力：" + BCJOBC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            BCJOBCCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "底板最大应力：" + BCJOBC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            BCJOBCCHK = "不合格";
                                                                        }

                                                                        // 端板应力计算及校核
                                                                        let BCJKE = (0.44 * BCJDSO / BCJL - 1.44) + 0.224 * BCJRSO / BCJTHKBE;
                                                                        let BCJOEC = Math.abs(BCJKE * BCJPC * BCJRSO * BCJRSO / BCJTHKEE / BCJTHKEE);
                                                                        let BCJEEOET = BCJEE * BCJOET;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "端板许用应力：" + BCJEEOET.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        let BCJOECCHK;
                                                                        if (BCJOEC <= BCJEEOET) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "端板最大应力：" + BCJOEC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            BCJOECCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "端板最大应力：" + BCJOEC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            BCJOECCHK = "不合格";
                                                                        }

                                                                        // 压力试验
                                                                        let BCJETA, BCJPST, BCJPBT, BCJPET, BCJPT;
                                                                        if (BCJTest === "液压试验") {
                                                                            BCJETA = 1.25;
                                                                            BCJPST = Math.max(BCJETA * BCJPD * BCJOS / BCJOST, 0.05);
                                                                            BCJPBT = Math.max(BCJETA * BCJPD * BCJOB / BCJOBT, 0.05);
                                                                            BCJPET = Math.max(BCJETA * BCJPD * BCJOE / BCJOET, 0.05);
                                                                            BCJPT = Math.min(BCJPST, BCJPBT, BCJPET);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCJPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (BCJTest === "气压试验") {
                                                                            BCJETA = 1.10;
                                                                            BCJPST = Math.max(BCJETA * BCJPD * BCJOS / BCJOST, 0.05);
                                                                            BCJPBT = Math.max(BCJETA * BCJPD * BCJOB / BCJOBT, 0.05);
                                                                            BCJPET = Math.max(BCJETA * BCJPD * BCJOE / BCJOET, 0.05);
                                                                            BCJPT = Math.min(BCJPST, BCJPBT, BCJPET);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCJPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // docx
                                                                        let BCJPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "bcjdocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "BCJ",

                                                                                    pd: BCJPD,
                                                                                    t: BCJDT,
                                                                                    ps: BCJPS,
                                                                                    test: BCJTest,

                                                                                    stds: BCJSSTDVal,
                                                                                    names: BCJSNameVal,
                                                                                    dso: BCJDSO,
                                                                                    l: BCJL,
                                                                                    thksn: BCJTHKSN,
                                                                                    cs2: BCJCS2,
                                                                                    es: BCJES,

                                                                                    stdb: BCJBSTDVal,
                                                                                    nameb: BCJBNameVal,
                                                                                    thkbn: BCJTHKBN,
                                                                                    cb2: BCJCB2,
                                                                                    eb: BCJEB,

                                                                                    stde: BCJESTDVal,
                                                                                    namee: BCJENameVal,
                                                                                    thken: BCJTHKEN,
                                                                                    ce2: BCJCE2,
                                                                                    ee: BCJEE,

                                                                                    ds: BCJDS.toFixed(4),
                                                                                    cs1: BCJCS1.toFixed(4),
                                                                                    rtsel: BCJRTSEL.toFixed(4),
                                                                                    ost: BCJOST.toFixed(4),
                                                                                    os: BCJOS.toFixed(4),

                                                                                    db: BCJDB.toFixed(4),
                                                                                    cb1: BCJCB1.toFixed(4),
                                                                                    rtbel: BCJRTBEL.toFixed(4),
                                                                                    obt: BCJOBT.toFixed(4),
                                                                                    ob: BCJOB.toFixed(4),

                                                                                    de: BCJDE.toFixed(4),
                                                                                    ce1: BCJCE1.toFixed(4),
                                                                                    rteel: BCJRTEEL.toFixed(4),
                                                                                    oet: BCJOET.toFixed(4),
                                                                                    oe: BCJOE.toFixed(4),

                                                                                    pc: BCJPC.toFixed(4),

                                                                                    cs: BCJCS.toFixed(4),
                                                                                    thkse: BCJTHKSE.toFixed(4),
                                                                                    rso: BCJRSO.toFixed(4),

                                                                                    cb: BCJCB.toFixed(4),
                                                                                    thkbe: BCJTHKBE.toFixed(4),

                                                                                    ce: BCJCE.toFixed(4),
                                                                                    thkee: BCJTHKEE.toFixed(4),

                                                                                    osc: BCJOSC.toFixed(4),
                                                                                    ostes: BCJOSTES.toFixed(4),
                                                                                    oscchk: BCJOSCCHK,

                                                                                    ks: BCJKS.toFixed(4),
                                                                                    oscc: BCJOSCC.toFixed(4),
                                                                                    esost: BCJESOST.toFixed(4),
                                                                                    osccchk: BCJOSCCCHK,

                                                                                    kb: BCJKB.toFixed(4),
                                                                                    obc: BCJOBC.toFixed(4),
                                                                                    ebobt: BCJEBOBT.toFixed(4),
                                                                                    obcchk: BCJOBCCHK,

                                                                                    ke: BCJKE.toFixed(4),
                                                                                    oec: BCJOEC.toFixed(4),
                                                                                    eeoet: BCJEEOET.toFixed(4),
                                                                                    oecchk: BCJOECCHK,

                                                                                    eta: BCJETA.toFixed(4),
                                                                                    pst: BCJPST.toFixed(4),
                                                                                    pbt: BCJPBT.toFixed(4),
                                                                                    pet: BCJPET.toFixed(4),
                                                                                    pt: BCJPT.toFixed(4)
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
                                                                                        BCJPayJS.dialog({
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
                                                                                                    BCJPayJS.dialog("close");
                                                                                                    BCJPayJS.dialog("clear");
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
                                                                                                                BCJPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                        BCJPayJS.dialog('close');
                                                                                                                        BCJPayJS.dialog('clear');
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