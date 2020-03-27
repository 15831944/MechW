$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let baabSketch = $("#d2");
    let baabModel = $("#d3");
    let baabd2d3 = $('#d2d3');

    $("#cal").html("<table id='baab'></table>");
    let pg = $("#baab");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/a/b/BAAB.json", function (result) {

        let BAABDT;
        let BAABCategory, BAABCategoryVal, BAABType, BAABTypeVal, BAABSTD, BAABSTDVal, BAABName, BAABNameVal;
        let columns, rows, ed;

        function baab2d(thkn = "δn", l = "L", w = "W") {

            baabSketch.empty();

            let width = baabSketch.width();
            let height = baabSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAABSVG").attr("height", height);

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
                {x: padding + wg, y: padding + hg - thk},
                {x: width - padding - wg, y: padding + hg - thk},
                {x: width - padding - wg, y: padding + hg},
                {x: padding + wg, y: padding + hg},
                {x: padding + wg, y: padding + hg - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg, y: height / 2},
                {x: width - padding - wg, y: height / 2},
                {x: width - padding - wg, y: height / 2 + 2 * hg},
                {x: padding + wg, y: height / 2 + 2 * hg},
                {x: padding + wg, y: height / 2}
            ])).classed("sketch", true);

            drawCenterLine(width / 2, padding + hg - thk - 10, width / 2, padding + hg + 10);
            drawCenterLine(width / 2, height / 2 - 10, width / 2, height - padding + 10);
            drawCenterLine(padding + wg - 10, height - padding - hg, width - padding - wg + 10, height - padding - hg);

            // L
            dimBottomH(padding + wg, padding + hg, width - padding - wg, padding + hg, l, "BAABSketchL");

            // W
            dimRightV(width - padding - wg, height - padding, width - padding - wg, height / 2, w, "BAABSketchW");

            // THKN
            extLineLeftH(padding + wg, padding + hg - thk);
            extLineLeftH(padding + wg, padding + hg);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - 30, y: padding + hg - thk},
                    {x: padding + wg - 30 + 3, y: padding + hg - thk - 15},
                    {x: padding + wg - 30 - 3, y: padding + hg - thk - 15},
                    {x: padding + wg - 30, y: padding + hg - thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - 30, y: padding + hg},
                    {x: padding + wg - 30 + 3, y: padding + hg + 15},
                    {x: padding + wg - 30 - 3, y: padding + hg + 15},
                    {x: padding + wg - 30, y: padding + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - 30, y: padding + hg - thk},
                {x: padding + wg - 30, y: padding + hg + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 30, y: padding + hg - thk - 15},
                {x: padding + wg - 30, y: padding + hg - thk - 15 - 40}
            ])).attr("id", "BAABSketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAABSketchTHKN").attr("startOffset", "50%").text(thkn);

        }

        currentTabIndex = baabd2d3.tabs('getTabIndex', baabd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baab2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baab").length > 0) {
                    baab2d();
                }
            });
        }
        baabd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baab2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baab").length > 0) {
                            baab2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 矩形容器顶板(无加强筋)计算",
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
                    $(ed.target).combobox("loadData", BAABCategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", BAABType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", BAABSTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BAABName);
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
                    baabSketch.empty();

                    // model
                    baabModel.empty();

                    // sketch
                    currentTabIndex = baabd2d3.tabs('getTabIndex', baabd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        baab2d();
                        baabSketch.off("resize").on("resize", function () {
                            if ($("#baab").length > 0) {
                                baab2d();
                            }
                        });
                    }
                    baabd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baab2d();
                                baabSketch.off("resize").on("resize", function () {
                                    if ($("#baab").length > 0) {
                                        baab2d();
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

                        BAABDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[1][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 1);
                        BAABCategory = null;
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BAABType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAABSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAABName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAABCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAABDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAABCategory[index] = {
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

                        BAABCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        BAABType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAABSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAABName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAABCategoryVal,
                                temp: BAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAABType = [];
                                $(result).each(function (index, element) {
                                    BAABType[index] = {
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

                        BAABTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAABSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAABName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAABCategoryVal,
                                type: BAABTypeVal,
                                temp: BAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAABSTD = [];
                                $(result).each(function (index, element) {
                                    BAABSTD[index] = {
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

                        BAABSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAABName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAABCategoryVal,
                                type: BAABTypeVal,
                                std: BAABSTDVal,
                                temp: BAABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAABName = [];
                                $(result).each(function (index, element) {
                                    BAABName[index] = {
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
                        BAABNameVal = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAABD0, BAABThkMin, BAABThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAABCategoryVal,
                            "type": BAABTypeVal,
                            "std": BAABSTDVal,
                            "name": BAABNameVal,
                            "temp": BAABDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAABD0 = parseFloat(result.density);
                            BAABThkMin = parseFloat(result.thkMin);
                            BAABThkMax = parseFloat(result.thkMax);

                            // 腐蚀裕量
                            let BAABC2;
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                BAABC2 = parseFloat(rows[5][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // 筒体名义厚度
                            let BAABTHKN;
                            if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > Math.max(BAABC2, BAABThkMin)
                                && parseFloat(rows[6][columns[0][1].field]) <= BAABThkMax) {
                                BAABTHKN = parseFloat(rows[6][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) <= Math.max(BAABC2, BAABThkMin)) {
                                south.html("顶板名义厚度 δn 不能小于等于 " + Math.max(BAABC2, BAABThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                && parseFloat(rows[6][columns[0][1].field]) > BAABThkMax) {
                                south.html("顶板名义厚度 δn 不能大于 " + BAABThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                baab2d(BAABTHKN);
                                baabSketch.off("resize").on("resize", function () {
                                    if ($("#baab").length > 0) {
                                        baab2d(BAABTHKN);
                                    }
                                });
                            }
                            baabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        baab2d(BAABTHKN);
                                        baabSketch.off("resize").on("resize", function () {
                                            if ($("#baab").length > 0) {
                                                baab2d(BAABTHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // ajax 获取 OT ET C1
                            let BAABOT, BAABET, BAABC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAABCategoryVal,
                                    "type": BAABTypeVal,
                                    "std": BAABSTDVal,
                                    "name": BAABNameVal,
                                    "thk": BAABTHKN,
                                    "temp": BAABDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAABOT = parseFloat(result.ot);
                                    if (BAABOT < 0) {
                                        south.html("查询顶板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAABC1 = parseFloat(result.c1);
                                    if (BAABC1 < 0) {
                                        south.html("查询顶板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    BAABET = 1000 * parseFloat(result.et);
                                    if (BAABET < 0) {
                                        south.html("查询顶板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // L
                                    let BAABL;
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        BAABL = parseFloat(rows[7][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baab2d(BAABTHKN, BAABL);
                                        baabSketch.off("resize").on("resize", function () {
                                            if ($("#baab").length > 0) {
                                                baab2d(BAABTHKN, BAABL);
                                            }
                                        });
                                    }
                                    baabd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baab2d(BAABTHKN, BAABL);
                                                baabSketch.off("resize").on("resize", function () {
                                                    if ($("#baab").length > 0) {
                                                        baab2d(BAABTHKN, BAABL);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // W
                                    let BAABW;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) >= 0.1 * BAABL
                                        && parseFloat(rows[8][columns[0][1].field]) <= 5 * BAABL) {
                                        BAABW = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) < 0.1 * BAABL) {
                                        south.html("顶板宽度 W 不能小于 " + 0.1 * BAABL + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                        && parseFloat(rows[8][columns[0][1].field]) > 5 * BAABL) {
                                        south.html("顶板宽度 W 不能大于 " + 5 * BAABL + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        baab2d(BAABTHKN, BAABL, BAABW);
                                        baabSketch.off("resize").on("resize", function () {
                                            if ($("#baab").length > 0) {
                                                baab2d(BAABTHKN, BAABL, BAABW);
                                            }
                                        });
                                    }
                                    baabd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                baab2d(BAABTHKN, BAABL, BAABW);
                                                baabSketch.off("resize").on("resize", function () {
                                                    if ($("#baab").length > 0) {
                                                        baab2d(BAABTHKN, BAABL, BAABW);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 过程参数
                                    let BAABDM = BAABD0 / 1000000000;
                                    let BAABG = 9.81;
                                    let BAABPA = 1.2 / 1000;
                                    let BAABC = BAABC1 + BAABC2;
                                    let BAABTHKE = BAABTHKN - BAABC;
                                    let BAABBA = BAABW / BAABL;

                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "nbt_47003_1_2009_table_8_15_get_alpha_and_beta.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "ba": BAABBA
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            let BAABALPHA = parseFloat(result.alpha);
                                            let BAABBETA = parseFloat(result.beta);

                                            // 厚度
                                            let BAABTHKC = (3 * BAABL * BAABL * BAABALPHA * BAABDM * BAABG + BAABL * Math.sqrt(3 * BAABALPHA * (3 * BAABL * BAABDM * BAABL * BAABDM * BAABALPHA * BAABG * BAABG + 2 * BAABPA * BAABOT))) / BAABOT;

                                            let BAABTHKD = BAABTHKC + BAABC2;
                                            south.html(
                                                "<span style='color:#444444;'>" +
                                                "顶板所需厚度：" + (BAABTHKD + BAABC1).toFixed(2) + " mm" +
                                                "</span>");
                                            let BAABTHKCHK;
                                            if (BAABTHKN >= (BAABTHKD + BAABC1)) {
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "输入厚度：" + BAABTHKN + " mm" +
                                                    "</span>");
                                                BAABTHKCHK = "合格";
                                            }
                                            else if (BAABTHKN < (BAABTHKD + BAABC1)) {
                                                south.append(
                                                    "<span style='color:red;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "输入厚度：" + BAABTHKN + " mm" +
                                                    "</span>");
                                                BAABTHKCHK = "不合格";
                                            }

                                            // 挠度
                                            let BAABFALLOW = 5 * (BAABTHKE / 2 + Math.sqrt(BAABBA) * BAABL / 500);
                                            let BAABFTMAX = BAABBETA * Math.pow(BAABL, 4) * (BAABDM * BAABG * BAABTHKE + BAABPA) / (BAABET * Math.pow(BAABTHKE, 3));

                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "顶板许用挠度：" + BAABFALLOW.toFixed(2) + " mm" +
                                                "</span>");
                                            let BAABFTMAXCHK;
                                            if (BAABFTMAX <= BAABFALLOW) {
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "实际挠度：" + BAABFTMAX.toFixed(2) + " mm" +
                                                    "</span>");
                                                BAABFTMAXCHK = "合格";
                                            }
                                            else if (BAABFTMAX > BAABFALLOW) {
                                                south.append(
                                                    "<span style='color:red;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "实际挠度：" + BAABFTMAX.toFixed(2) + " mm" +
                                                    "</span>");
                                                BAABFTMAXCHK = "不合格";
                                            }

                                            // docx
                                            let BAABPayJS = $('#payjs');

                                            function getDocx() {
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "baabdocx.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        ribbonName: "BAAB",

                                                        t: BAABDT,
                                                        std: BAABSTDVal,
                                                        name: BAABNameVal,
                                                        c2: BAABC2,
                                                        thkn: BAABTHKN,
                                                        l: BAABL,
                                                        w: BAABW,
                                                        d0: BAABD0.toFixed(4),
                                                        c1: BAABC1.toFixed(4),
                                                        ot: BAABOT.toFixed(4),
                                                        et: (BAABET / 1000).toFixed(4),
                                                        dm: (BAABDM * 1000000).toFixed(4),
                                                        g: BAABG.toFixed(4),
                                                        pa: BAABPA.toFixed(4),
                                                        c: BAABC.toFixed(4),
                                                        thke: BAABTHKE.toFixed(4),
                                                        ba: BAABBA.toFixed(4),
                                                        alpha: BAABALPHA.toFixed(8),
                                                        beta: BAABBETA.toFixed(8),
                                                        thkc: BAABTHKC.toFixed(4),
                                                        thkd: BAABTHKD.toFixed(4),
                                                        thkchk: BAABTHKCHK,
                                                        fallow: BAABFALLOW.toFixed(4),
                                                        ftmax: BAABFTMAX.toFixed(4),
                                                        ftmaxchk: BAABFTMAXCHK
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
                                                            BAABPayJS.dialog({
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
                                                                        BAABPayJS.dialog("close");
                                                                        BAABPayJS.dialog("clear");
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
                                                                                    BAABPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                    // 倒计时计数器
                                                                                    let maxTime = 4, timer;

                                                                                    function CountDown() {
                                                                                        if (maxTime >= 0) {
                                                                                            $("#payjs_timer").html(maxTime);
                                                                                            --maxTime;
                                                                                        } else {

                                                                                            clearInterval(timer);
                                                                                            // 关闭并清空收银台
                                                                                            BAABPayJS.dialog('close');
                                                                                            BAABPayJS.dialog('clear');
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
                                                "<span style='color:red;'>&ensp;查表 8-15 获取 α、β失败，请检查网络后重试</span>");
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