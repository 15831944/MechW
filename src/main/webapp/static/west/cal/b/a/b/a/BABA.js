$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let babaSketch = $("#d2");
    let babaModel = $("#d3");
    let babad2d3 = $('#d2d3');

    $("#cal").html("<table id='baba'></table>");
    let pg = $("#baba");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/b/a/BABA.json", function (result) {

        let BABADT;
        let BABACategory, BABACategoryVal, BABAType, BABATypeVal, BABASTD, BABASTDVal, BABAName, BABANameVal;
        let columns, rows, ed;

        function baba2d(thkn = "δn", lb = "Lb") {

            babaSketch.empty();

            let width = babaSketch.width();
            let height = babaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BABASVG").attr("height", height);

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
                ])).attr("id", "AAEBSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AAEBSketchDI").attr("startOffset", "50%").text(text);

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

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg},
                {x: padding + 3 * wg, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg + thk},
                {x: padding + 3 * wg, y: padding + hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg - 30},
                {x: padding + wg, y: padding + hg + thk + 30}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding + hg - 30},
                {x: padding + 3 * wg, y: padding + hg + thk + 30}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 1.25 * wg, y: padding + hg + thk},
                {x: padding + 1.25 * wg, y: padding + hg + 2 * thk},
                {x: padding + 1.5 * wg - thk / 2, y: padding + hg + 2 * thk},
                {x: padding + 1.5 * wg - thk / 2, y: padding + 2 * hg},
                {x: padding + 1.25 * wg, y: padding + 2 * hg},
                {x: padding + 1.25 * wg, y: padding + 2 * hg + thk},
                {x: padding + 1.75 * wg, y: padding + 2 * hg + thk},
                {x: padding + 1.75 * wg, y: padding + 2 * hg},
                {x: padding + 1.5 * wg + thk / 2, y: padding + 2 * hg},
                {x: padding + 1.5 * wg + thk / 2, y: padding + hg + 2 * thk},
                {x: padding + 1.75 * wg, y: padding + hg + 2 * thk},
                {x: padding + 1.75 * wg, y: padding + hg + thk}
            ])).classed("sketch", true);
            drawCenterLine(padding + 1.5 * wg, padding + hg + thk - 5, padding + 1.5 * wg, padding + 2 * hg + thk + 10);

            svg.append("path").attr("d", line([
                {x: padding + 2.25 * wg, y: padding + hg + thk},
                {x: padding + 2.25 * wg, y: padding + hg + 2 * thk},
                {x: padding + 2.5 * wg - thk / 2, y: padding + hg + 2 * thk},
                {x: padding + 2.5 * wg - thk / 2, y: padding + 2 * hg},
                {x: padding + 2.25 * wg, y: padding + 2 * hg},
                {x: padding + 2.25 * wg, y: padding + 2 * hg + thk},
                {x: padding + 2.75 * wg, y: padding + 2 * hg + thk},
                {x: padding + 2.75 * wg, y: padding + 2 * hg},
                {x: padding + 2.5 * wg + thk / 2, y: padding + 2 * hg},
                {x: padding + 2.5 * wg + thk / 2, y: padding + hg + 2 * thk},
                {x: padding + 2.75 * wg, y: padding + hg + 2 * thk},
                {x: padding + 2.75 * wg, y: padding + hg + thk}
            ])).classed("sketch", true);
            drawCenterLine(padding + 2.5 * wg, padding + hg + thk - 5, padding + 2.5 * wg, padding + 2 * hg + thk + 10);

            dimBottomH(padding + 1.5 * wg, padding + 2 * hg + thk + 10, padding + 2.5 * wg, padding + 2 * hg + thk + 10, lb, "BABASketchLB");

            // THKN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding + hg},
                    {x: width / 2 + 3, y: padding + hg - 15},
                    {x: width / 2 - 3, y: padding + hg - 15},
                    {x: width / 2, y: padding + hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: padding + hg + thk},
                    {x: width / 2 + 3, y: padding + hg + thk + 15},
                    {x: width / 2 - 3, y: padding + hg + thk + 15},
                    {x: width / 2, y: padding + hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + hg},
                {x: width / 2, y: padding + hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + hg - 15},
                {x: width / 2, y: padding + hg - 15 - 40}
            ])).attr("id", "BABASketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BABASketchTHKN").attr("startOffset", "50%").text(thkn);

        }

        currentTabIndex = babad2d3.tabs('getTabIndex', babad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baba2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baba").length > 0) {
                    baba2d();
                }
            });
        }
        babad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baba2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baba").length > 0) {
                            baba2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 型钢支承的矩形容器底板计算",
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
                if (index === 1) {
                    $(ed.target).combobox("loadData", BABACategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", BABAType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", BABASTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BABAName);
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
                    babaSketch.empty();

                    // model
                    babaModel.empty();

                    // sketch
                    currentTabIndex = babad2d3.tabs('getTabIndex', babad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baba2d();
                        babaSketch.off("resize").on("resize", function () {
                            if ($("#baba").length > 0) {
                                baba2d();
                            }
                        });
                    }
                    babad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baba2d();
                                babaSketch.off("resize").on("resize", function () {
                                    if ($("#baba").length > 0) {
                                        baba2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // t - category
                    if (index === 0) {

                        BABADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[1][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 1);
                        BABACategory = null;
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BABAType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BABASTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BABAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BABACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BABADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BABACategory[index] = {
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

                    // category - type
                    if (index === 1) {

                        BABACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BABAType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BABASTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BABAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BABACategoryVal,
                                temp: BABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BABAType = [];
                                $(result).each(function (index, element) {
                                    BABAType[index] = {
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

                    // type - std
                    if (index === 2) {

                        BABATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BABASTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BABAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BABACategoryVal,
                                type: BABATypeVal,
                                temp: BABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BABASTD = [];
                                $(result).each(function (index, element) {
                                    BABASTD[index] = {
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

                    // std - Name
                    if (index === 3) {

                        BABASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BABAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BABACategoryVal,
                                type: BABATypeVal,
                                std: BABASTDVal,
                                temp: BABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BABAName = [];
                                $(result).each(function (index, element) {
                                    BABAName[index] = {
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

                    // 材料名称
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        BABANameVal = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BABAD0, BABAThkMin, BABAThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BABACategoryVal,
                            "type": BABATypeVal,
                            "std": BABASTDVal,
                            "name": BABANameVal,
                            "temp": BABADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BABAD0 = parseFloat(result.density);
                            BABAThkMin = parseFloat(result.thkMin);
                            BABAThkMax = parseFloat(result.thkMax);

                            // 腐蚀裕量
                            let BABAC2;
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                BABAC2 = parseFloat(rows[5][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // 名义厚度
                            let BABATHKN;
                            if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > Math.max(BABAC2, BABAThkMin)
                                && parseFloat(rows[6][columns[0][1].field]) <= BABAThkMax) {
                                BABATHKN = parseFloat(rows[6][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) <= Math.max(BABAC2, BABAThkMin)) {
                                south.html("底板名义厚度 δn 不能小于等于 " + Math.max(BABAC2, BABAThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > BABAThkMax) {
                                south.html("底板名义厚度 δn 不能大于 " + BABAThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                baba2d(BABATHKN);
                                babaSketch.off("resize").on("resize", function () {
                                    if ($("#baba").length > 0) {
                                        baba2d(BABATHKN);
                                    }
                                });
                            }
                            babad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        baba2d(BABATHKN);
                                        babaSketch.off("resize").on("resize", function () {
                                            if ($("#baba").length > 0) {
                                                baba2d(BABATHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // ajax 获取 OT C1
                            let BABAOT, BABAC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BABACategoryVal,
                                    "type": BABATypeVal,
                                    "std": BABASTDVal,
                                    "name": BABANameVal,
                                    "thk": BABATHKN,
                                    "temp": BABADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BABAOT = parseFloat(result.ot);
                                    if (BABAOT < 0) {
                                        south.html("查询底板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BABAC1 = parseFloat(result.c1);
                                    if (BABAC1 < 0) {
                                        south.html("查询底板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // D
                                    let BABAD;
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        BABAD = parseFloat(rows[7][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // H
                                    let BABAH;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BABAH = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // LB
                                    let BABALB;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                        BABALB = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baba2d(BABATHKN, BABALB);
                                        babaSketch.off("resize").on("resize", function () {
                                            if ($("#baba").length > 0) {
                                                baba2d(BABATHKN, BABALB);
                                            }
                                        });
                                    }
                                    babad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baba2d(BABATHKN, BABALB);
                                                babaSketch.off("resize").on("resize", function () {
                                                    if ($("#baba").length > 0) {
                                                        baba2d(BABATHKN, BABALB);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 过程参数
                                    let BABAG = 9.81;
                                    let BABAC = BABAC1 + BABAC2;
                                    let BABATHKE = BABATHKN - BABAC;

                                    // 厚度校核
                                    let BABATHKC = 0.8 * BABALB * Math.sqrt(BABAD * BABAG * BABAH / BABAOT / 1000000000);
                                    let BABATHKD = BABATHKC + BABAC2;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "支承梁间距 Lb = " + BABALB + " mm 时，底板所需厚度：" + (BABATHKD + BABAC1).toFixed(2) + " mm" +
                                        "</span>");
                                    let BABATHKCHK;
                                    if (BABATHKN >= (BABATHKD + BABAC1)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + BABATHKN + " mm" +
                                            "</span>");
                                        BABATHKCHK = "合格";
                                    }
                                    else if (BABATHKN < (BABATHKD + BABAC1)) {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + BABATHKN + " mm" +
                                            "</span>");
                                        BABATHKCHK = "不合格";
                                    }

                                    // 间距校核
                                    let BABALBMAX = 1.25 * BABATHKE * Math.sqrt(BABAOT / (BABAD * BABAG * BABAH / 1000000000));
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "底板厚度 δn = " + BABATHKN + " mm 时，支承梁允许最大间距：" + BABALBMAX.toFixed(2) + " mm" +
                                        "</span>");
                                    let BABALBCHK;
                                    if (BABALB <= BABALBMAX) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入间距：" + BABALB + " mm" +
                                            "</span>");
                                        BABALBCHK = "合格";
                                    }
                                    else if (BABALB > BABALBMAX) {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入间距：" + BABALB + " mm" +
                                            "</span>");
                                        BABALBCHK = "不合格";
                                    }

                                    // docx
                                    let BABAPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "babadocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "BABA",

                                                t: BABADT,
                                                std: BABASTDVal,
                                                name: BABANameVal,
                                                c2: BABAC2,
                                                thkn: BABATHKN,
                                                d: BABAD,
                                                h: BABAH,
                                                lb: BABALB,
                                                d0: BABAD0.toFixed(4),
                                                c1: BABAC1.toFixed(4),
                                                ot: BABAOT.toFixed(4),
                                                g: BABAG.toFixed(4),
                                                c: BABAC.toFixed(4),
                                                thke: BABATHKE.toFixed(4),
                                                thkc: BABATHKC.toFixed(4),
                                                thkd: BABATHKD.toFixed(4),
                                                thkchk: BABATHKCHK,
                                                lbmax: BABALBMAX.toFixed(4),
                                                lbchk: BABALBCHK
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
                                                    BABAPayJS.dialog({
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
                                                                BABAPayJS.dialog("close");
                                                                BABAPayJS.dialog("clear");
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
                                                                            BABAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    BABAPayJS.dialog('close');
                                                                                    BABAPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});