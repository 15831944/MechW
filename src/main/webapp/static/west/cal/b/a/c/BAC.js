$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bacSketch = $("#d2");
    let bacModel = $("#d3");
    let bacd2d3 = $('#d2d3');

    $("#cal").html("<table id='bac'></table>");
    let pg = $("#bac");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/c/BAC.json", function (result) {

        let BACDT;
        let BACCategory, BACCategoryVal, BACType, BACTypeVal, BACSTD, BACSTDVal, BACName, BACNameVal;
        let columns, rows, ed;

        function bac2d(l = "L", h = "H") {

            bacSketch.empty();

            let width = bacSketch.width();
            let height = bacSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BACSVG").attr("height", height);

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
            let thk = 12;

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

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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
                {x: padding + wg - 4 * thk, y: height - padding - hg - thk},
                {x: padding + 3 * wg + 4 * thk, y: height - padding - hg - thk},
                {x: padding + 3 * wg + 4 * thk, y: height - padding - hg},
                {x: padding + wg - 4 * thk, y: height - padding - hg},
                {x: padding + wg - 4 * thk, y: height - padding - thk - hg}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: height - padding - hg - thk},
                {x: padding + wg - thk, y: padding + hg},
                {x: padding + wg, y: padding + hg},
                {x: padding + wg, y: height - padding - hg - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding - hg - thk},
                {x: padding + 3 * wg, y: padding + hg},
                {x: padding + 3 * wg + thk, y: padding + hg},
                {x: padding + 3 * wg + thk, y: height - padding - hg - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg},
                {x: padding + 3 * wg, y: padding + hg}
            ])).classed("sketch", true);

            drawCenterLine(width / 2, padding + hg - 10, width / 2, height - padding - hg + 10);

            dimBottomH(padding + wg, height - padding - hg - thk + 10, padding + 3 * wg, height - padding - hg - thk + 10, l, "BACSketchL");
            svg.append("path").attr("d", line([
                {x: padding + wg, y: height - padding - hg - thk + 3},
                {x: padding + wg, y: height - padding - hg - thk + 13}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding - hg - thk + 3},
                {x: padding + 3 * wg, y: height - padding - hg - thk + 13}
            ])).classed("sketch", true);

            dimRightV(padding + 3 * wg + 4 * thk, height - padding - hg - thk, padding + 3 * wg + 4 * thk, padding + hg, h, "BACSketchH");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk + 3, y: padding + hg},
                {x: padding + 3 * wg + 4 * thk + 3, y: padding + hg}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - thk / 2, y: height / 2},
                {x: padding + wg - thk / 2 - 40, y: height / 2 - 40}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk / 2 - 40 - 40, y: height / 2 - 40},
                {x: padding + wg - thk / 2 - 40, y: height / 2 - 40}
            ])).attr("id", "BACSketchBB").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BACSketchBB").attr("startOffset", "50%").text("壁板");
        }

        currentTabIndex = bacd2d3.tabs('getTabIndex', bacd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bac2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bac").length > 0) {
                    bac2d();
                }
            });
        }
        bacd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bac2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bac").length > 0) {
                            bac2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 A型(不加固型)矩形容器壁板计算",
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
                    $(ed.target).combobox("loadData", BACCategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", BACType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", BACSTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BACName);
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

                    // sketch model
                    bacSketch.empty();
                    bacModel.empty();

                    // sketch
                    currentTabIndex = bacd2d3.tabs('getTabIndex', bacd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bac2d();
                        bacSketch.off("resize").on("resize", function () {
                            if ($("#bac").length > 0) {
                                bac2d();
                            }
                        });
                    }
                    bacd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bac2d();
                                bacSketch.off("resize").on("resize", function () {
                                    if ($("#bac").length > 0) {
                                        bac2d();
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

                        BACDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[1][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 1);
                        BACCategory = null;
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BACType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BACSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BACName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BACCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BACDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BACCategory[index] = {
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

                        BACCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BACType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BACSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BACName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BACCategoryVal,
                                temp: BACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BACType = [];
                                $(result).each(function (index, element) {
                                    BACType[index] = {
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

                        BACTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BACSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BACName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BACCategoryVal,
                                type: BACTypeVal,
                                temp: BACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BACSTD = [];
                                $(result).each(function (index, element) {
                                    BACSTD[index] = {
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

                        BACSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BACName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BACCategoryVal,
                                type: BACTypeVal,
                                std: BACSTDVal,
                                temp: BACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BACName = [];
                                $(result).each(function (index, element) {
                                    BACName[index] = {
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
                        BACNameVal = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BACD0, BACThkMin, BACThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BACCategoryVal,
                            "type": BACTypeVal,
                            "std": BACSTDVal,
                            "name": BACNameVal,
                            "temp": BACDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BACD0 = parseFloat(result.density);
                            BACThkMin = parseFloat(result.thkMin);
                            BACThkMax = parseFloat(result.thkMax);

                            // 腐蚀裕量
                            let BACC2;
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                BACC2 = parseFloat(rows[5][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // 名义厚度
                            let BACTHKN;
                            if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > Math.max(BACC2, BACThkMin)
                                && parseFloat(rows[6][columns[0][1].field]) <= BACThkMax) {
                                BACTHKN = parseFloat(rows[6][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) <= Math.max(BACC2, BACThkMin)) {
                                south.html("壁板名义厚度 δn 不能小于等于 " + Math.max(BACC2, BACThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > BACThkMax) {
                                south.html("壁板名义厚度 δn 不能大于 " + BACThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 OT ET C1
                            let BACOT, BACET, BACC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BACCategoryVal,
                                    "type": BACTypeVal,
                                    "std": BACSTDVal,
                                    "name": BACNameVal,
                                    "thk": BACTHKN,
                                    "temp": BACDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BACOT = parseFloat(result.ot);
                                    if (BACOT < 0) {
                                        south.html("查询壁板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BACC1 = parseFloat(result.c1);
                                    if (BACC1 < 0) {
                                        south.html("查询壁板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    BACET = 1000 * parseFloat(result.et);
                                    if (BACET < 0) {
                                        south.html("查询壁板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // L
                                    let BACL;
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        BACL = parseFloat(rows[7][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bac2d(BACL);
                                        $("#d2").off("resize").on("resize", function () {
                                            if ($("#bac").length > 0) {
                                                bac2d(BACL);
                                            }
                                        });
                                    }
                                    bacd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bac2d(BACL);
                                                $("#d2").off("resize").on("resize", function () {
                                                    if ($("#bac").length > 0) {
                                                        bac2d(BACL);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // H
                                    let BACH;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) >= 0.1 * BACL
                                        && parseFloat(rows[8][columns[0][1].field]) <= 5 * BACL) {
                                        BACH = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) < 0.1 * BACL) {
                                        south.html("壁板高度 H 不能小于 " + 0.1 * BACL + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) > 5 * BACL) {
                                        south.html("壁板高度 H 不能大于 " + 5 * BACL + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bac2d(BACL, BACH);
                                        $("#d2").off("resize").on("resize", function () {
                                            if ($("#bac").length > 0) {
                                                bac2d(BACL, BACH);
                                            }
                                        });
                                    }
                                    bacd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bac2d(BACL, BACH);
                                                $("#d2").off("resize").on("resize", function () {
                                                    if ($("#bac").length > 0) {
                                                        bac2d(BACL, BACH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // D
                                    let BACD;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                        BACD = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 过程参数
                                    let BACG = 9.81;
                                    let BACPC = BACD * BACG * BACH / 1000000000;
                                    let BACC = BACC1 + BACC2;
                                    let BACTHKE = BACTHKN - BACC;
                                    let BACHL = BACH / BACL;

                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "nbt_47003_1_2009_table_8_5_get_alpha_and_beta.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "ba": BACHL
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            let BACALPHA = parseFloat(result.alpha);
                                            let BACBETA = parseFloat(result.beta);

                                            // 厚度
                                            let BACTHKC = 2.45 * BACL * Math.sqrt(BACALPHA * BACPC / BACOT);

                                            let BACTHKD = BACTHKC + BACC2;
                                            south.html(
                                                "<span style='color:#444444;'>" +
                                                "壁板所需厚度：" + (BACTHKD + BACC1).toFixed(2) + " mm" +
                                                "</span>");
                                            let BACTHKCHK;
                                            if (BACTHKN >= (BACTHKD + BACC1)) {
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "输入厚度：" + BACTHKN + " mm" +
                                                    "</span>");
                                                BACTHKCHK = "合格";
                                            }
                                            else if (BACTHKN < (BACTHKD + BACC1)) {
                                                south.append(
                                                    "<span style='color:red;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "输入厚度：" + BACTHKN + " mm" +
                                                    "</span>");
                                                BACTHKCHK = "不合格";
                                            }

                                            // 挠度
                                            let BACFALLOW = 5 * (BACTHKE / 2 + Math.sqrt(BACHL) * BACL / 500);
                                            let BACFMAX = BACBETA * Math.pow(BACL, 4) * BACPC / (BACET * Math.pow(BACTHKE, 3));

                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "壁板许用挠度：" + BACFALLOW.toFixed(2) + " mm" +
                                                "</span>");
                                            let BACFTMAXCHK;
                                            if (BACFMAX <= BACFALLOW) {
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "实际挠度：" + BACFMAX.toFixed(2) + " mm" +
                                                    "</span>");
                                                BACFTMAXCHK = "合格";
                                            }
                                            else if (BACFMAX > BACFALLOW) {
                                                south.append(
                                                    "<span style='color:red;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "实际挠度：" + BACFMAX.toFixed(2) + " mm" +
                                                    "</span>");
                                                BACFTMAXCHK = "不合格";
                                            }

                                            // docx
                                            let BACPayJS = $('#payjs');

                                            function getDocx() {
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "bacdocx.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        ribbonName: "BAC",

                                                        t: BACDT,
                                                        d: BACD,
                                                        std: BACSTDVal,
                                                        name: BACNameVal,
                                                        c2: BACC2,
                                                        thkn: BACTHKN,
                                                        l: BACL,
                                                        h: BACH,
                                                        d0: BACD0.toFixed(4),
                                                        c1: BACC1.toFixed(4),
                                                        ot: BACOT.toFixed(4),
                                                        et: (BACET / 1000).toFixed(4),
                                                        g: BACG.toFixed(4),
                                                        pc: BACPC.toFixed(4),
                                                        c: BACC.toFixed(4),
                                                        thke: BACTHKE.toFixed(4),
                                                        hl: BACHL.toFixed(4),
                                                        alpha: BACALPHA.toFixed(8),
                                                        beta: BACBETA.toFixed(8),
                                                        thkc: BACTHKC.toFixed(4),
                                                        thkd: BACTHKD.toFixed(4),
                                                        thkchk: BACTHKCHK,
                                                        fallow: BACFALLOW.toFixed(4),
                                                        ftmax: BACFMAX.toFixed(4),
                                                        ftmaxchk: BACFTMAXCHK
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
                                                            BACPayJS.dialog({
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
                                                                        BACPayJS.dialog("close");
                                                                        BACPayJS.dialog("clear");
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
                                                                                    BACPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                    // 倒计时计数器
                                                                                    let maxTime = 4, timer;

                                                                                    function CountDown() {
                                                                                        if (maxTime >= 0) {
                                                                                            $("#payjs_timer").html(maxTime);
                                                                                            --maxTime;
                                                                                        } else {

                                                                                            clearInterval(timer);
                                                                                            // 关闭并清空收银台
                                                                                            BACPayJS.dialog('close');
                                                                                            BACPayJS.dialog('clear');
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
                                                "<span style='color:red;'>&ensp;查表 8-5 获取 α、β失败，请检查网络后重试</span>");
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});