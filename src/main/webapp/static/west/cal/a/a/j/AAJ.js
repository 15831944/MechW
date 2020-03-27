$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aajSketch = $("#d2");
    let aajModel = $("#d3");
    let aajd2d3 = $('#d2d3');

    $("#cal").html("<table id='aaj'></table>");
    let pg = $("#aaj");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/j/AAJ.json", function (result) {

        let AAJDT,
            AAJSCategory, AAJSCategoryVal, AAJSType, AAJSTypeVal, AAJSSTD, AAJSSTDVal, AAJSName, AAJSNameVal,
            AAJBCategory, AAJBCategoryVal, AAJBType, AAJBTypeVal, AAJBSTD, AAJBSTDVal, AAJBName, AAJBNameVal,
            AAJECategory, AAJECategoryVal, AAJEType, AAJETypeVal, AAJESTD, AAJESTDVal, AAJEName, AAJENameVal,
            columns, rows, ed;

        function aaj2d(dso = "ΦDso", l = "L", thksn = "δsn", thkbn = "δbn", thken = "δen") {

            aajSketch.empty();

            let width = aajSketch.width();
            let height = aajSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAJSVG").attr("height", height);

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
            dimLeftV(cx - thk, cy + hg, cx - thk, cy - hg, dso, "AAJSketchDSO");

            // L
            dimBottomH(padding, cy + hg, width / 2, cy + hg, l, "AAJSketchL");

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
            ])).attr("id", "AAJSketchTHKSN").classed("sketch", true)
                .attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#AAJSketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ])).attr("id", "AAJSketchTHKBN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAJSketchTHKBN").attr("startOffset", "50%").text(thkbn);

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
            ])).attr("id", "AAJSketchTHKEN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAJSketchTHKEN").attr("startOffset", "50%").text(thken);
        }

        currentTabIndex = aajd2d3.tabs('getTabIndex', aajd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aaj2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aaj").length > 0) {
                    aaj2d();
                }
            });
        }
        aajd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aaj2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aaj").length > 0) {
                            aaj2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "半圆形压力容器强度计算",
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
                    $(ed.target).combobox("loadData", AAJSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAJSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAJSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAJSName);
                }

                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAJBCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAJBType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAJBSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", AAJBName);
                }

                else if (index === 20) {
                    $(ed.target).combobox("loadData", AAJECategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", AAJEType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", AAJESTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", AAJEName);
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
                    aajSketch.empty();
                    aajModel.empty();

                    // sketch
                    currentTabIndex = aajd2d3.tabs('getTabIndex', aajd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aaj2d();
                        aajSketch.off("resize").on("resize", function () {
                            if ($("#aaj").length > 0) {
                                aaj2d();
                            }
                        });
                    }
                    aajd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aaj2d();
                                aajSketch.off("resize").on("resize", function () {
                                    if ($("#aaj").length > 0) {
                                        aaj2d();
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

                        AAJDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAJSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAJSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAJSName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAJBCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAJBType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAJBSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAJBName = null;

                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        AAJECategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAJEType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAJESTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAJEName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJSCategory = [];
                                AAJBCategory = [];
                                AAJECategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAJDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAJSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAJBCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAJECategory[index] = {
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

                        AAJSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAJSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAJSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJSCategoryVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJSType = [];
                                $(result).each(function (index, element) {
                                    AAJSType[index] = {
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

                        AAJSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAJSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJSCategoryVal,
                                type: AAJSTypeVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJSSTD = [];
                                $(result).each(function (index, element) {
                                    AAJSSTD[index] = {
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

                        AAJSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAJSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJSCategoryVal,
                                type: AAJSTypeVal,
                                std: AAJSSTDVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJSName = [];
                                $(result).each(function (index, element) {
                                    AAJSName[index] = {
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

                        AAJBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAJBType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAJBSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAJBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJBCategoryVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJBType = [];
                                $(result).each(function (index, element) {
                                    AAJBType[index] = {
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

                        AAJBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAJBSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAJBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJBCategoryVal,
                                type: AAJBTypeVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJBSTD = [];
                                $(result).each(function (index, element) {
                                    AAJBSTD[index] = {
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

                        AAJBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAJBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJBCategoryVal,
                                type: AAJBTypeVal,
                                std: AAJBSTDVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJBName = [];
                                $(result).each(function (index, element) {
                                    AAJBName[index] = {
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

                        AAJECategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAJEType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAJESTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAJEName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJECategoryVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJEType = [];
                                $(result).each(function (index, element) {
                                    AAJEType[index] = {
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

                        AAJETypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAJESTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAJEName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJECategoryVal,
                                type: AAJETypeVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJESTD = [];
                                $(result).each(function (index, element) {
                                    AAJESTD[index] = {
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

                        AAJESTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        AAJEName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAJECategoryVal,
                                type: AAJETypeVal,
                                std: AAJESTDVal,
                                temp: AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAJEName = [];
                                $(result).each(function (index, element) {
                                    AAJEName[index] = {
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
                        let AAJPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAJPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // PS
                        let AAJPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAJPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Test
                        let AAJTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAJTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 半圆筒材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAJSNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取材料密度、最大最小厚度
                        let AAJDS, AAJSThkMin, AAJSThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAJSCategoryVal,
                                "type": AAJSTypeVal,
                                "std": AAJSSTDVal,
                                "name": AAJSNameVal,
                                "temp": AAJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAJDS = parseFloat(result.density);
                                AAJSThkMin = parseFloat(result.thkMin);
                                AAJSThkMax = parseFloat(result.thkMax);

                                // DSO
                                let AAJDSO;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAJDSO = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aaj2d("Φ" + AAJDSO);
                                    aajSketch.off("resize").on("resize", function () {
                                        if ($("#aaj").length > 0) {
                                            aaj2d("Φ" + AAJDSO);
                                        }
                                    });
                                }
                                aajd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aaj2d("Φ" + AAJDSO);
                                            aajSketch.off("resize").on("resize", function () {
                                                if ($("#aaj").length > 0) {
                                                    aaj2d("Φ" + AAJDSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                // L
                                let AAJL;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    AAJL = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aaj2d("Φ" + AAJDSO, AAJL);
                                    aajSketch.off("resize").on("resize", function () {
                                        if ($("#aaj").length > 0) {
                                            aaj2d("Φ" + AAJDSO, AAJL);
                                        }
                                    });
                                }
                                aajd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aaj2d("Φ" + AAJDSO, AAJL);
                                            aajSketch.off("resize").on("resize", function () {
                                                if ($("#aaj").length > 0) {
                                                    aaj2d("Φ" + AAJDSO, AAJL);
                                                }
                                            });
                                        }
                                    }
                                });

                                // THKSN
                                let AAJTHKSN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAJSThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAJSThkMax) {
                                    AAJTHKSN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAJSThkMin) {
                                    south.html("半圆筒材料厚度不能小于等于 " + AAJSThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAJSThkMax) {
                                    south.html("半圆筒材料厚度不能大于 " + AAJSThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN);
                                    aajSketch.off("resize").on("resize", function () {
                                        if ($("#aaj").length > 0) {
                                            aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN);
                                        }
                                    });
                                }
                                aajd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN);
                                            aajSketch.off("resize").on("resize", function () {
                                                if ($("#aaj").length > 0) {
                                                    aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAJOST, AAJOS, AAJOST1, AAJRTSEL, AAJCS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAJSCategoryVal,
                                        "type": AAJSTypeVal,
                                        "std": AAJSSTDVal,
                                        "name": AAJSNameVal,
                                        "thk": AAJTHKSN,
                                        "temp": AAJDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAJDSO
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAJOST = parseFloat(result.ot);
                                        if (AAJOST < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        AAJOS = parseFloat(result.o);
                                        if (AAJOS < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        AAJRTSEL = parseFloat(result.rel);
                                        if (AAJRTSEL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        AAJCS1 = parseFloat(result.c1);
                                        if (AAJCS1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }
                                        AAJOST1 = parseFloat(result.ot1);

                                        // CS2
                                        let AAJCS2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < AAJTHKSN) {
                                            AAJCS2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= AAJTHKSN) {
                                            south.html("半圆筒腐蚀裕量不能大于等于 " + AAJTHKSN + " mm!").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // ES
                                        let AAJES;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            AAJES = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 底板材料名称
                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                            AAJBNameVal = rows[16][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取材料密度、最大最小厚度
                                        let AAJDB, AAJBThkMin, AAJBThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": AAJBCategoryVal,
                                                "type": AAJBTypeVal,
                                                "std": AAJBSTDVal,
                                                "name": AAJBNameVal,
                                                "temp": AAJDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                AAJDB = parseFloat(result.density);
                                                AAJBThkMin = parseFloat(result.thkMin);
                                                AAJBThkMax = parseFloat(result.thkMax);

                                                // THKBN
                                                let AAJTHKBN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAJBThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAJBThkMax) {
                                                    AAJTHKBN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAJBThkMin) {
                                                    south.html("底板材料厚度不能小于等于 " + AAJBThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAJBThkMax) {
                                                    south.html("底板材料厚度不能大于 " + AAJBThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN, AAJTHKBN);
                                                    aajSketch.off("resize").on("resize", function () {
                                                        if ($("#aaj").length > 0) {
                                                            aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN, AAJTHKBN);
                                                        }
                                                    });
                                                }
                                                aajd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN, AAJTHKBN);
                                                            aajSketch.off("resize").on("resize", function () {
                                                                if ($("#aaj").length > 0) {
                                                                    aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN, AAJTHKBN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let AAJOBT, AAJOB, AAJOBT1, AAJRTBEL, AAJCB1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": AAJBCategoryVal,
                                                        "type": AAJBTypeVal,
                                                        "std": AAJBSTDVal,
                                                        "name": AAJBNameVal,
                                                        "thk": AAJTHKBN,
                                                        "temp": AAJDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": 100000
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        AAJOBT = parseFloat(result.ot);
                                                        if (AAJOBT < 0) {
                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAJOB = parseFloat(result.o);
                                                        if (AAJOB < 0) {
                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAJRTBEL = parseFloat(result.rel);
                                                        if (AAJRTBEL < 0) {
                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAJCB1 = parseFloat(result.c1);
                                                        if (AAJCB1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAJOBT1 = parseFloat(result.ot1);

                                                        // CB2
                                                        let AAJCB2;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) < AAJTHKBN) {
                                                            AAJCB2 = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) >= AAJTHKBN) {
                                                            south.html("底板腐蚀裕量不能大于等于 " + AAJTHKBN + " mm!").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // EB
                                                        let AAJEB;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                            AAJEB = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 端板材料名称
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                            AAJENameVal = rows[23][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // AJAX 获取材料密度、最大最小厚度
                                                        let AAJDE, AAJEThkMin, AAJEThkMax;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_index.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": AAJECategoryVal,
                                                                "type": AAJETypeVal,
                                                                "std": AAJESTDVal,
                                                                "name": AAJENameVal,
                                                                "temp": AAJDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                AAJDE = parseFloat(result.density);
                                                                AAJEThkMin = parseFloat(result.thkMin);
                                                                AAJEThkMax = parseFloat(result.thkMax);

                                                                // THKEN
                                                                let AAJTHKEN;
                                                                if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > AAJEThkMin
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= AAJEThkMax) {
                                                                    AAJTHKEN = parseFloat(rows[24][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) <= AAJEThkMin) {
                                                                    south.html("端板材料厚度不能小于等于 " + AAJEThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                    && parseFloat(rows[24][columns[0][1].field]) > AAJEThkMax) {
                                                                    south.html("端板材料厚度不能大于 " + AAJEThkMax + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN, AAJTHKBN, AAJTHKEN);
                                                                    aajSketch.off("resize").on("resize", function () {
                                                                        if ($("#aaj").length > 0) {
                                                                            aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN, AAJTHKBN, AAJTHKEN);
                                                                        }
                                                                    });
                                                                }
                                                                aajd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN, AAJTHKBN, AAJTHKEN);
                                                                            aajSketch.off("resize").on("resize", function () {
                                                                                if ($("#aaj").length > 0) {
                                                                                    aaj2d("Φ" + AAJDSO, AAJL, AAJTHKSN, AAJTHKBN, AAJTHKEN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                let AAJOET, AAJOE, AAJOET1, AAJRTEEL, AAJCE1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": AAJECategoryVal,
                                                                        "type": AAJETypeVal,
                                                                        "std": AAJESTDVal,
                                                                        "name": AAJENameVal,
                                                                        "thk": AAJTHKEN,
                                                                        "temp": AAJDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": 100000
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        AAJOET = parseFloat(result.ot);
                                                                        if (AAJOET < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        AAJOE = parseFloat(result.o);
                                                                        if (AAJOE < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        AAJRTEEL = parseFloat(result.rel);
                                                                        if (AAJRTEEL < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        AAJCE1 = parseFloat(result.c1);
                                                                        if (AAJCE1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        AAJOET1 = parseFloat(result.ot1);

                                                                        // CE2
                                                                        let AAJCE2;
                                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) < AAJTHKEN) {
                                                                            AAJCE2 = parseFloat(rows[25][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                            && parseFloat(rows[25][columns[0][1].field]) >= AAJTHKEN) {
                                                                            south.html("端板腐蚀裕量不能大于等于 " + AAJTHKEN + " mm!").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // EE
                                                                        let AAJEE;
                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                                            AAJEE = parseFloat(rows[26][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 过程参数
                                                                        let AAJPC = AAJPD + AAJPS;
                                                                        let AAJCS = AAJCS1 + AAJCS2;
                                                                        let AAJTHKSE = AAJTHKSN - AAJCS;
                                                                        let AAJRSO = AAJDSO / 2;
                                                                        let AAJCB = AAJCB1 + AAJCB2;
                                                                        let AAJTHKBE = AAJTHKBN - AAJCB;
                                                                        let AAJCE = AAJCE1 + AAJCE2;
                                                                        let AAJTHKEE = AAJTHKEN - AAJCE;

                                                                        // 半圆筒
                                                                        let AAJOSC = AAJPC * (AAJDSO - AAJTHKSE) / (2 * AAJTHKSE);
                                                                        let AAJOSTES = AAJOST * AAJES;
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "半圆筒许用应力：" + AAJOSTES.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        // 环向应力校核
                                                                        let AAJOSCCHK;
                                                                        if (AAJOSC <= AAJOSTES) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "半圆筒中央部分实际环向应力：" + AAJOSC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            AAJOSCCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "半圆筒中央部分实际环向应力：" + AAJOSC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            AAJOSCCHK = "不合格";
                                                                        }

                                                                        let AAJKS = (0.8 * AAJDSO / AAJL - 3) + 0.67 * AAJRSO / AAJTHKBE;
                                                                        let AAJOSCC = Math.abs(AAJKS * AAJPC * AAJRSO / AAJTHKSE);
                                                                        let AAJESOST = AAJES * AAJOST;
                                                                        // 连接部分压应力校核
                                                                        let AAJOSCCCHK;
                                                                        if (AAJOSCC <= AAJOSTES) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "半圆筒与底板连接处压应力：" + AAJOSCC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            AAJOSCCCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "半圆筒与底板连接处压应力：" + AAJOSCC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            AAJOSCCCHK = "不合格";
                                                                        }

                                                                        // 底板应力计算及校核
                                                                        let AAJKB = (0.4 + 0.275 * AAJDSO / AAJL) - 1.18 * AAJTHKSE / AAJTHKBE;
                                                                        let AAJOBC = Math.abs(AAJKB * AAJPC * AAJL * AAJL / AAJTHKBE / AAJTHKBE);
                                                                        let AAJEBOBT = AAJEB * AAJOBT;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "底板许用应力：" + AAJEBOBT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        let AAJOBCCHK;
                                                                        if (AAJOBC <= AAJEBOBT) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "底板最大应力：" + AAJOBC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            AAJOBCCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "底板最大应力：" + AAJOBC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            AAJOBCCHK = "不合格";
                                                                        }

                                                                        // 端板应力计算及校核
                                                                        let AAJKE = (0.44 * AAJDSO / AAJL - 1.44) + 0.224 * AAJRSO / AAJTHKBE;
                                                                        let AAJOEC = Math.abs(AAJKE * AAJPC * AAJRSO * AAJRSO / AAJTHKEE / AAJTHKEE);
                                                                        let AAJEEOET = AAJEE * AAJOET;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "端板许用应力：" + AAJEEOET.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        let AAJOECCHK;
                                                                        if (AAJOEC <= AAJEEOET) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "端板最大应力：" + AAJOEC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            AAJOECCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "端板最大应力：" + AAJOEC.toFixed(2) + " MPa" +
                                                                                "</span>");
                                                                            AAJOECCHK = "不合格";
                                                                        }

                                                                        // 压力试验
                                                                        let AAJETA, AAJPST, AAJPBT, AAJPET, AAJPT;
                                                                        if (AAJTest === "液压试验") {
                                                                            AAJETA = 1.25;
                                                                            AAJPST = AAJETA * AAJPD * AAJOS / Math.max(AAJOST, AAJOST1);
                                                                            AAJPBT = AAJETA * AAJPD * AAJOB / Math.max(AAJOBT, AAJOBT1);
                                                                            AAJPET = AAJETA * AAJPD * AAJOE / Math.max(AAJOET, AAJOET1);
                                                                            AAJPT = Math.min(AAJPST, AAJPBT, AAJPET);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + AAJPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (AAJTest === "气压试验") {
                                                                            AAJETA = 1.10;
                                                                            AAJPST = AAJETA * AAJPD * AAJOS / Math.max(AAJOST, AAJOST1);
                                                                            AAJPBT = AAJETA * AAJPD * AAJOB / Math.max(AAJOBT, AAJOBT1);
                                                                            AAJPET = AAJETA * AAJPD * AAJOE / Math.max(AAJOET, AAJOET1);
                                                                            AAJPT = Math.min(AAJPST, AAJPBT, AAJPET);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + AAJPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // docx
                                                                        let AAJPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "aajdocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "AAJ",

                                                                                    pd: AAJPD,
                                                                                    t: AAJDT,
                                                                                    ps: AAJPS,
                                                                                    test: AAJTest,

                                                                                    stds: AAJSSTDVal,
                                                                                    names: AAJSNameVal,
                                                                                    dso: AAJDSO,
                                                                                    l: AAJL,
                                                                                    thksn: AAJTHKSN,
                                                                                    cs2: AAJCS2,
                                                                                    es: AAJES,

                                                                                    stdb: AAJBSTDVal,
                                                                                    nameb: AAJBNameVal,
                                                                                    thkbn: AAJTHKBN,
                                                                                    cb2: AAJCB2,
                                                                                    eb: AAJEB,

                                                                                    stde: AAJESTDVal,
                                                                                    namee: AAJENameVal,
                                                                                    thken: AAJTHKEN,
                                                                                    ce2: AAJCE2,
                                                                                    ee: AAJEE,

                                                                                    ds: AAJDS.toFixed(4),
                                                                                    cs1: AAJCS1.toFixed(4),
                                                                                    rtsel: AAJRTSEL.toFixed(4),
                                                                                    ost: AAJOST.toFixed(4),
                                                                                    os: AAJOS.toFixed(4),
                                                                                    ost1: AAJOST1.toFixed(4),

                                                                                    db: AAJDB.toFixed(4),
                                                                                    cb1: AAJCB1.toFixed(4),
                                                                                    rtbel: AAJRTBEL.toFixed(4),
                                                                                    obt: AAJOBT.toFixed(4),
                                                                                    ob: AAJOB.toFixed(4),
                                                                                    obt1: AAJOBT1.toFixed(4),

                                                                                    de: AAJDE.toFixed(4),
                                                                                    ce1: AAJCE1.toFixed(4),
                                                                                    rteel: AAJRTEEL.toFixed(4),
                                                                                    oet: AAJOET.toFixed(4),
                                                                                    oe: AAJOE.toFixed(4),
                                                                                    oet1: AAJOET1.toFixed(4),

                                                                                    pc: AAJPC.toFixed(4),

                                                                                    cs: AAJCS.toFixed(4),
                                                                                    thkse: AAJTHKSE.toFixed(4),
                                                                                    rso: AAJRSO.toFixed(4),

                                                                                    cb: AAJCB.toFixed(4),
                                                                                    thkbe: AAJTHKBE.toFixed(4),

                                                                                    ce: AAJCE.toFixed(4),
                                                                                    thkee: AAJTHKEE.toFixed(4),

                                                                                    osc: AAJOSC.toFixed(4),
                                                                                    ostes: AAJOSTES.toFixed(4),
                                                                                    oscchk: AAJOSCCHK,

                                                                                    ks: AAJKS.toFixed(4),
                                                                                    oscc: AAJOSCC.toFixed(4),
                                                                                    esost: AAJESOST.toFixed(4),
                                                                                    osccchk: AAJOSCCCHK,

                                                                                    kb: AAJKB.toFixed(4),
                                                                                    obc: AAJOBC.toFixed(4),
                                                                                    ebobt: AAJEBOBT.toFixed(4),
                                                                                    obcchk: AAJOBCCHK,

                                                                                    ke: AAJKE.toFixed(4),
                                                                                    oec: AAJOEC.toFixed(4),
                                                                                    eeoet: AAJEEOET.toFixed(4),
                                                                                    oecchk: AAJOECCHK,

                                                                                    eta: AAJETA.toFixed(4),
                                                                                    pst: AAJPST.toFixed(4),
                                                                                    pbt: AAJPBT.toFixed(4),
                                                                                    pet: AAJPET.toFixed(4),
                                                                                    pt: AAJPT.toFixed(4)
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
                                                                                        AAJPayJS.dialog({
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
                                                                                                    AAJPayJS.dialog("close");
                                                                                                    AAJPayJS.dialog("clear");
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
                                                                                                                AAJPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                        AAJPayJS.dialog('close');
                                                                                                                        AAJPayJS.dialog('clear');
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