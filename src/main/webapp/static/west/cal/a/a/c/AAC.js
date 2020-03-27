$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aacd2 = $("#d2");
    let aacd3 = $("#d3");
    let aacd2d3 = $('#d2d3');

    $("#cal").html("<table id='aac'></table>");
    let pg = $("#aac");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/c/AAC.json", function (result) {

        let AACDT,
            AACCategory, AACCategoryVal, AACType, AACTypeVal, AACSTD, AACSTDVal, AACName, AACNameVal,
            columns, rows, ed;

        function aac2d(idod, di = "ϕDi", dout = "ϕDo", thkn = "δn", h = "h") {

            aacd2.empty();

            let width = aacd2.width();
            let height = aacd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "AACSVG")
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
            let padding = 80;
            let reduceHeight = 50;

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
                ])).attr("id", id).classed("sketch", true);

                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

            }

            // 球壳外直径
            let outRadius = Math.min(width - 2 * padding, height - 2 * padding);
            let innerRadius = outRadius - 25;

            // 外壁实线
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding)
                .attr("rx", outRadius).attr("ry", outRadius).classed("sketch", true);

            // 内壁实线
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding)
                .attr("rx", outRadius - 25).attr("ry", outRadius - 25).classed("sketch", true);

            // 遮罩
            svg.append("rect").attr("x", 0).attr("y", height - padding - reduceHeight)
                .attr("width", width).attr("height", padding + reduceHeight).attr("fill", "white");

            // 外壁虚线
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding)
                .attr("rx", outRadius).attr("ry", outRadius).attr("stroke-dasharray", "5,5,5,5").classed("sketch", true);

            // 内壁虚线
            svg.append("ellipse").attr("cx", width / 2).attr("cy", height - padding)
                .attr("rx", outRadius - 25).attr("ry", outRadius - 25).attr("stroke-dasharray", "5,5,5,5").classed("sketch", true);

            // 遮罩
            svg.append("rect").attr("x", 0).attr("y", height - padding)
                .attr("width", width).attr("height", padding).attr("fill", "white");

            // 中心线
            drawCenterLine(width / 2 - outRadius - 10, height - padding, width / 2 + outRadius + 10, height - padding);
            drawCenterLine(width / 2, height - padding - outRadius - 10, width / 2, height - padding + 10);

            //截断线
            drawLine(width / 2 - Math.sqrt(outRadius * outRadius - reduceHeight * reduceHeight), height - padding - reduceHeight, width / 2 + Math.sqrt(outRadius * outRadius - reduceHeight * reduceHeight), height - padding - reduceHeight);

            // h 标注
            dimLeftV(width / 2 - outRadius - 10, height - padding, width / 2 - outRadius - 10, height - padding - reduceHeight, h, "AACSketchH");
            drawLine(width / 2 - outRadius - 10 - 3, height - padding - reduceHeight, width / 2 - Math.sqrt(outRadius * outRadius - reduceHeight * reduceHeight) - 3, height - padding - reduceHeight);

            // DI
            if (idod === "内径") {
                dimBottomH(width / 2 - innerRadius, height - padding, width / 2 + innerRadius, height - padding, di, "AACSketchDI");
            }
            else if (idod === "外径") {
                dimBottomH(width / 2 - outRadius, height - padding, width / 2 + outRadius, height - padding, dout, "AACSketchDOUT");
            }


            // thkn
            extLineTopV(width / 2 + outRadius, height - padding);
            extLineTopV(width / 2 + innerRadius, height - padding);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + outRadius, y: height - padding - 30},
                    {x: width / 2 + outRadius + 15, y: height - padding - 30 - 3},
                    {x: width / 2 + outRadius + 15, y: height - padding - 30 + 3},
                    {x: width / 2 + outRadius, y: height - padding - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + innerRadius, y: height - padding - 30},
                    {x: width / 2 + innerRadius - 15, y: height - padding - 30 - 3},
                    {x: width / 2 + innerRadius - 15, y: height - padding - 30 + 3},
                    {x: width / 2 + innerRadius, y: height - padding - 30}
                ]));
            drawLine(width / 2 + innerRadius - 15 - 10, height - padding - 30, width / 2 + outRadius, height - padding - 30);
            svg.append("path").attr("d", line([
                {x: width / 2 + outRadius + 15, y: height - padding - 30},
                {x: width / 2 + outRadius + 15 + 40, y: height - padding - 30}
            ])).attr("id", "AACSketchTHKN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AACSketchTHKN").attr("startOffset", "50%").text(thkn);
        }

        currentTabIndex = aacd2d3.tabs('getTabIndex', aacd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aac2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aac").length > 0) {
                    aac2d();
                }
            });
        }
        aacd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aac2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aac").length > 0) {
                            aac2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 半球形封头内压强度计算",
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

                if (index === 12) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }

                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 6) {
                    $(ed.target).combobox("loadData", AACCategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AACType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AACSTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", AACName);
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
                    aacd2.empty();
                    aacd3.empty();

                    // sketch
                    currentTabIndex = aacd2d3.tabs('getTabIndex', aacd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aac2d();
                        aacd2.off("resize").on("resize", function () {
                            if ($("#aac").length > 0) {
                                aac2d();
                            }
                        });
                    }
                    aacd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aac2d();
                                aacd2.off("resize").on("resize", function () {
                                    if ($("#aac").length > 0) {
                                        aac2d();
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

                        AACDT = parseFloat(changes.value);

                        // category、type、std、name
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AACCategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AACType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AACSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AACName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AACCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AACDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AACCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                    });
                                }
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;封头材料类别获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // category 改变，重新加载type
                    if (index === 6) {

                        AACCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AACType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AACSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AACName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AACCategoryVal,
                                temp: AACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AACType = [];
                                $(result).each(function (index, element) {
                                    AACType[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;封头材料类型获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // type 改变，重新加载 std
                    if (index === 7) {

                        AACTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AACSTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AACName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AACCategoryVal,
                                type: AACTypeVal,
                                temp: AACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AACSTD = [];
                                $(result).each(function (index, element) {
                                    AACSTD[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;封头材料标准号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // std 改变，重新加载 Name
                    if (index === 8) {

                        AACSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AACName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AACCategoryVal,
                                type: AACTypeVal,
                                std: AACSTDVal,
                                temp: AACDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AACName = [];
                                $(result).each(function (index, element) {
                                    AACName[index] = {
                                        "value": element,
                                        "text": element
                                    };
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;封头材料牌号获取失败，请检查网络后重试</span>");
                            }
                        });
                    }

                    // UI - DI DOUT
                    if (index === 10) {
                        if (rows[10][columns[0][1].field] === "内径") {
                            pg.datagrid('options').finder.getTr(this, 11).show();
                            pg.datagrid('options').finder.getTr(this, 12).hide();
                        }
                        else if (rows[10][columns[0][1].field] === "外径") {
                            pg.datagrid('options').finder.getTr(this, 12).show();
                            pg.datagrid('options').finder.getTr(this, 11).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    /*
                    数据获取和计算区
                     */
                    let AACPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AACPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AACPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AACPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AACC2;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AACC2 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AACFAI;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AACFAI = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let AACTest;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        AACTest = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // NameVal
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        AACNameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    let AACD, AACThkMin, AACThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AACCategoryVal,
                            "type": AACTypeVal,
                            "std": AACSTDVal,
                            "name": AACNameVal,
                            "temp": AACDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AACD = parseFloat(result.density);
                            AACThkMin = parseFloat(result.thkMin);
                            AACThkMax = parseFloat(result.thkMax);

                            let AACIDOD;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AACIDOD = rows[10][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aac2d(AACIDOD);
                                aacd2.off("resize").on("resize", function () {
                                    if ($("#aac").length > 0) {
                                        aac2d(AACIDOD);
                                    }
                                });
                            }
                            aacd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aac2d(AACIDOD);
                                        aacd2.off("resize").on("resize", function () {
                                            if ($("#aac").length > 0) {
                                                aac2d(AACIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let AACDI = -1, AACDOUT = -1;
                            if (AACIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    AACDI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (AACIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                    AACDOUT = parseFloat(rows[12][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT);
                                aacd2.off("resize").on("resize", function () {
                                    if ($("#aac").length > 0) {
                                        aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT);
                                    }
                                });
                            }
                            aacd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT);
                                        aacd2.off("resize").on("resize", function () {
                                            if ($("#aac").length > 0) {
                                                aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT);
                                            }
                                        });
                                    }
                                }
                            });

                            let AACTHKN;
                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > Math.max(AACC2, AACThkMin)
                                && parseFloat(rows[13][columns[0][1].field]) <= AACThkMax) {
                                AACTHKN = parseFloat(rows[13][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) <= Math.max(AACC2, AACThkMin)) {
                                south.html("封头材料厚度不能小于等于 " + Math.max(AACC2, AACThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > AACThkMax) {
                                south.html("封头材料厚度不能大于 " + AACThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT, AACTHKN);
                                aacd2.off("resize").on("resize", function () {
                                    if ($("#aac").length > 0) {
                                        aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT, AACTHKN);
                                    }
                                });
                            }
                            aacd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT, AACTHKN);
                                        aacd2.off("resize").on("resize", function () {
                                            if ($("#aac").length > 0) {
                                                aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT, AACTHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 补齐内外径
                            if (AACIDOD === "内径") {
                                AACDOUT = AACDI + 2 * AACTHKN;
                            }
                            else if (AACIDOD === "外径") {
                                AACDI = AACDOUT - 2 * AACTHKN;
                            }
                            else {
                                return false;
                            }

                            let AACOT, AACO, AACOT1, AACRel, AACC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AACCategoryVal,
                                    "type": AACTypeVal,
                                    "std": AACSTDVal,
                                    "name": AACNameVal,
                                    "thk": AACTHKN,
                                    "temp": AACDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AACDOUT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计应力
                                    AACOT = parseFloat(result.ot);
                                    if (AACOT < 0) {
                                        south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    AACO = parseFloat(result.o);
                                    if (AACO < 0) {
                                        south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    AACRel = parseFloat(result.rel);
                                    if (AACRel < 0) {
                                        south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    AACC1 = parseFloat(result.c1);
                                    if (AACC1 < 0) {
                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 标记应力
                                    AACOT1 = parseFloat(result.ot1);

                                    // 过程参数
                                    let AACC = AACC1 + AACC2;
                                    let AACTHKE = AACTHKN - AACC;
                                    let AACPC = AACPD + AACPS;

                                    // 厚度校核
                                    let AACTHKC;
                                    if (AACIDOD === "内径") {
                                        AACTHKC = (AACPC * AACDI) / (4 * AACOT * AACFAI - AACPC);
                                    }
                                    else if (AACIDOD === "外径") {
                                        AACTHKC = (AACPC * AACDOUT) / (4 * AACOT * AACFAI + AACPC);
                                    }
                                    else {
                                        return false;
                                    }
                                    let AACTHKMinimum;
                                    if (AACCategoryVal === "碳素钢和低合金钢" || AACCategoryVal === "铝及铝合金") {
                                        AACTHKMinimum = 3;
                                    }
                                    else if (AACCategoryVal === "高合金钢" || AACCategoryVal === "钛及钛合金"
                                        || AACCategoryVal === "铜及铜合金" || AACCategoryVal === "镍及镍合金"
                                        || AACCategoryVal === "锆及锆合金") {
                                        AACTHKMinimum = 2;
                                    }
                                    else {
                                        return false;
                                    }

                                    let AACTHKD = Math.max(AACTHKC, AACTHKMinimum) + AACC2;
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "封头所需厚度：" + (AACTHKD + AACC1).toFixed(2) + " mm" +
                                        "</span>");
                                    let AACTHKCHK;
                                    if (AACTHKN >= (AACTHKD + AACC1).toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AACTHKN + " mm" +
                                            "</span>");
                                        AACTHKCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AACTHKN + " mm" +
                                            "</span>");
                                        AACTHKCHK = "不合格";
                                    }

                                    // 应力校核
                                    let AACOAct;
                                    if (AACIDOD === "内径") {
                                        AACOAct = AACPC * (AACDI + AACTHKE) / (4 * AACTHKE);
                                    }
                                    else if (AACIDOD === "外径") {
                                        AACOAct = AACPC * (AACDOUT - AACTHKE) / (4 * AACTHKE);
                                    }
                                    else {
                                        return false;
                                    }
                                    let AACOActAllow = AACFAI * AACOT;
                                    let AACOActChk;
                                    if (AACOAct <= AACOActAllow) {
                                        AACOActChk = "合格";
                                    }
                                    else {
                                        AACOActChk = "不合格";
                                    }

                                    // 压力试验
                                    let AACETA, AACZETA, AACPT, AACOTestAllow;
                                    if (AACTest === "液压试验") {

                                        AACETA = 1.25;
                                        AACPT = AACETA * AACPD * AACO / Math.max(AACOT, AACOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：液压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AACPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        AACZETA = 0.9;
                                        AACOTestAllow = AACZETA * AACRel * AACFAI;
                                    }
                                    else if (AACTest === "气压试验") {

                                        AACETA = 1.1;
                                        AACPT = AACETA * AACPD * AACO / Math.max(AACOT, AACOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：气压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AACPT.toFixed(4) + " MPa" +
                                            "</span>");
                                        AACZETA = 0.8;
                                        AACOTestAllow = AACZETA * AACRel * AACFAI;
                                    }
                                    else {
                                        return false;
                                    }
                                    let AACOTest;
                                    if (AACIDOD === "内径") {
                                        AACOTest = AACPT * (AACDI + AACTHKE) / (4 * AACTHKE);
                                    }
                                    else if (AACIDOD === "外径") {
                                        AACOTest = (AACPT * (AACDOUT - AACTHKE)) / (4 * AACTHKE);
                                    }
                                    else {
                                        return false;
                                    }

                                    let AACOTestChk;
                                    if (AACOTest <= AACOTestAllow) {
                                        AACOTestChk = "合格";
                                    }
                                    else {
                                        AACOTestChk = "不合格";
                                    }

                                    let AACMAWP;
                                    if (AACIDOD === "内径") {
                                        AACMAWP = (4 * AACTHKE * AACOT * AACFAI) / (AACDI + AACTHKE) - AACPS;
                                    }
                                    else if (AACIDOD === "外径") {
                                        AACMAWP = (4 * AACTHKE * AACOT * AACFAI) / (AACDOUT - AACTHKE) - AACPS;
                                    }
                                    else {
                                        return false;
                                    }

                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP：" + AACMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    let AACH;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) < AACDI / 2) {
                                        AACH = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                        && parseFloat(rows[14][columns[0][1].field]) >= AACDI / 2) {
                                        south.html("缺段高度 h 不能大于 " + AACDI / 2).css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT, AACTHKN, AACH);
                                        aacd2.off("resize").on("resize", function () {
                                            if ($("#aac").length > 0) {
                                                aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT, AACTHKN, AACH);
                                            }
                                        });
                                    }
                                    aacd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT, AACTHKN, AACH);
                                                aacd2.off("resize").on("resize", function () {
                                                    if ($("#aac").length > 0) {
                                                        aac2d(AACIDOD, "Φ" + AACDI, "Φ" + AACDOUT, AACTHKN, AACH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // AI
                                    let AACAI = (0.5 * Math.PI * AACDI * AACDI - Math.PI * AACDI * AACH) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内表面积：" + AACAI.toFixed(4) + " m²" +
                                        "</span>");
                                    // AO
                                    let AACAO = (0.5 * Math.PI * AACDOUT * AACDOUT - Math.PI * AACDOUT * AACH) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积：" + AACAO.toFixed(4) + " m²" +
                                        "</span>");
                                    // VI
                                    let AACVI = (Math.PI * AACDI * AACDI * AACDI / 12 - Math.PI * AACDI * AACDI * AACH / 4) / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积：" + AACVI.toFixed(4) + " m³" +
                                        "</span>");
                                    // 外容积
                                    let AACVO = (Math.PI * AACDOUT * AACDOUT * AACDOUT / 12 - Math.PI * AACDOUT * AACDOUT * AACH / 4) / 1000000000;
                                    // 质量
                                    let AACM = AACD * (AACVO - AACVI);
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量：" + AACM.toFixed(4) + " kg" +
                                        "</span>");

                                    // docx
                                    let AACPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "aacdocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "AAC",

                                                idod: AACIDOD,

                                                pd: AACPD,
                                                t: AACDT,
                                                ps: AACPS,
                                                std: AACSTDVal,
                                                name: AACNameVal,
                                                c2: AACC2,
                                                fai: AACFAI,
                                                test: AACTest,
                                                di: AACDI,
                                                thkn: AACTHKN,
                                                h: AACH,

                                                d: AACD.toFixed(4),
                                                rel: AACRel.toFixed(4),
                                                c1: AACC1.toFixed(4),
                                                ot: AACOT.toFixed(4),
                                                o: AACO.toFixed(4),
                                                ot1: AACOT1.toFixed(4),

                                                c: AACC.toFixed(4),
                                                thke: AACTHKE.toFixed(4),
                                                dout: AACDOUT.toFixed(4),
                                                pc: AACPC.toFixed(4),

                                                thkc: AACTHKC.toFixed(4),
                                                thkMinimum: AACTHKMinimum.toFixed(4),
                                                thkd: AACTHKD.toFixed(4),
                                                thkChk: AACTHKCHK,
                                                oAct: AACOAct.toFixed(4),
                                                oActAllow: AACOActAllow.toFixed(4),
                                                oActChk: AACOActChk,

                                                eta: AACETA.toFixed(4),
                                                pt: AACPT.toFixed(4),
                                                oTest: AACOTest.toFixed(4),
                                                zeta: AACZETA.toFixed(4),
                                                oTestAllow: AACOTestAllow.toFixed(4),
                                                oTestChk: AACOTestChk,

                                                mawp: AACMAWP.toFixed(4),

                                                ai: AACAI.toFixed(4),
                                                ao: AACAO.toFixed(4),
                                                vi: AACVI.toFixed(4),
                                                m: AACM.toFixed(4)
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
                                                    AACPayJS.dialog({
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
                                                                AACPayJS.dialog("close");
                                                                AACPayJS.dialog("clear");
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
                                                                            AACPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    AACPayJS.dialog('close');
                                                                                    AACPayJS.dialog('clear');
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
                pg.propertygrid('options').finder.getTr(this, 12).hide();
            }
        });
    });
});