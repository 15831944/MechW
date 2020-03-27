$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aafcSketch = $("#d2");
    let aafcModel = $("#d3");
    let aafcd2d3 = $('#d2d3');

    $("#cal").html("<table id='aafc'></table>");
    let pg = $("#aafc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/f/c/AAFC.json", function (result) {

        let AAFCDT,
            AAFCCategory, AAFCCategoryVal, AAFCType, AAFCTypeVal, AAFCSTD, AAFCSTDVal, AAFCName, AAFCNameVal,
            columns, rows, ed;

        function aafc2d(dil = "ΦDil", thkn = "δn", r = "r", alpha = "α") {

            aafcSketch.empty();

            let width = aafcSketch.width();
            let height = aafcSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAFCSVG").attr("height", height);

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
            let padding = 0;
            let thk = 12;
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

            // 直边段
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + hg - thk},
                {x: width / 2 + 3 * thk, y: padding + hg - thk},
                {x: width / 2 + 3 * thk, y: padding + hg},
                {x: width / 2, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2, y: padding + 3 * hg},
                {x: width / 2 + 3 * thk, y: padding + 3 * hg},
                {x: width / 2 + 3 * thk, y: padding + 3 * hg + thk},
                {x: width / 2, y: padding + 3 * hg + thk}
            ])).classed("sketch", true);
            drawCenterLine(width / 2, padding + hg - thk, width / 2, padding + 3 * hg + thk);
            drawLine(width / 2 + 3 * thk, padding + hg, width / 2 + 3 * thk, padding + 3 * hg);

            // 上部折边
            let sr = 3 * thk;
            let sro = sr + thk;
            let deg = 60;
            let rad = deg / 180 * Math.PI;
            drawArc(sr, sr, width / 2 - sr * Math.sin(rad), padding + hg + sr - sr * Math.cos(rad), width / 2, padding + hg);
            drawArc(sro, sro, width / 2 - sro * Math.sin(rad), padding + hg + sr - sro * Math.cos(rad), width / 2, padding + hg - thk);

            // 下部折边
            drawArc(sr, sr, width / 2, padding + 3 * hg, width / 2 - sr * Math.sin(rad), padding + 3 * hg - sr + sr * Math.cos(rad));
            drawArc(sro, sro, width / 2, padding + 3 * hg + thk, width / 2 - sro * Math.sin(rad), padding + 3 * hg - sr + sro * Math.cos(rad));

            // 上部锥壳部分
            let deltaY = 0.5 * hg - (sr - sr * Math.cos(rad));
            let deltaX = deltaY / Math.tan(rad);
            drawLine(width / 2 - sr * Math.sin(rad), padding + hg + sr - sr * Math.cos(rad),
                width / 2 - sr * Math.sin(rad) - deltaX, padding + hg + sr - sr * Math.cos(rad) + deltaY);
            drawLine(width / 2 - sro * Math.sin(rad), padding + hg + sr - sro * Math.cos(rad),
                width / 2 - sro * Math.sin(rad) - deltaX, padding + hg + sr - sro * Math.cos(rad) + deltaY);

            // 下部锥壳部分
            drawLine(width / 2 - sr * Math.sin(rad), padding + 3 * hg - sr + sr * Math.cos(rad),
                width / 2 - sr * Math.sin(rad) - deltaX, padding + 3 * hg - sr + sr * Math.cos(rad) - deltaY);
            drawLine(width / 2 - sro * Math.sin(rad), padding + 3 * hg - sr + sro * Math.cos(rad),
                width / 2 - sro * Math.sin(rad) - deltaX, padding + 3 * hg - sr + sro * Math.cos(rad) - deltaY);

            drawCenterLine(width / 2 - sro * Math.sin(rad) - deltaX - 10, height / 2, width / 2 + 3 * thk + 10, height / 2);

            // dbi
            dimRightV(width / 2 + 3 * thk, padding + 3 * hg, width / 2 + 3 * thk, padding + hg, dil, "AAFCSketchDIL");

            // alpha
            let cx0 = width / 2 - sr * Math.sin(rad) - deltaX - 0.5 * hg / Math.tan(rad);
            let cy0 = height / 2;
            let cr = (0.5 * deltaY + 0.5 * hg) / Math.sin(rad);

            // alpha
            svg.append("path").attr("d", "M "
                + (cx0 + cr * Math.cos(rad)) + " " + (cy0 + cr * Math.sin(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0 + cr) + " " + (cy0)
            ).classed("sketch", true).attr("id", "AAFCSketchALPHA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFCSketchALPHA")
                .attr("startOffset", "50%").text(alpha);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 - 15},
                    {x: cx0 + cr + 3, y: cy0 - 15},
                    {x: cx0 + cr, y: cy0}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 + 15},
                    {x: cx0 + cr + 3, y: cy0 + 15},
                    {x: cx0 + cr, y: cy0}
                ]));

            // thkcn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)},
                    {x: cx0 + cr - 3, y: cy0 + thk * Math.cos(rad) + 15},
                    {x: cx0 + cr + 3, y: cy0 + thk * Math.cos(rad) + 15},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad) + 15 + 40},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad) + 15}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")")
                .attr("id", "AAFCSketchTHKCN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFCSketchTHKCN")
                .attr("startOffset", "50%").text(thkn);

            // r
            let cx1 = width / 2;
            let cy1 = padding + hg + sr;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1 - sr},
                    {x: cx1 - 3, y: cy1 - sr + 15},
                    {x: cx1 + 3, y: cy1 - sr + 15},
                    {x: cx1, y: cy1 - sr}
                ])).attr("transform", "rotate(" + -(deg / 2) + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1},
                    {x: cx1, y: cy1 - sr - thk - thk}
                ])).attr("transform", "rotate(" + -(deg / 2) + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {
                        x: cx1 - (sr + thk + thk) * Math.sin(deg / 2 / 180 * Math.PI) - 40,
                        y: cy1 - (sr + thk + thk) * Math.cos(deg / 2 / 180 * Math.PI)
                    },
                    {
                        x: cx1 - (sr + thk + thk) * Math.sin(deg / 2 / 180 * Math.PI),
                        y: cy1 - (sr + thk + thk) * Math.cos(deg / 2 / 180 * Math.PI)
                    }
                ])).attr("id", "AAFCSketchR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFCSketchR")
                .attr("startOffset", "50%").text(r);
        }

        currentTabIndex = aafcd2d3.tabs('getTabIndex', aafcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aafc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aafc").length > 0) {
                    aafc2d();
                }
            });
        }
        aafcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aafc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aafc").length > 0) {
                            aafc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 折边锥壳(10°≤α≤60°)大端强度计算",
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
            rowStyler: function (index, row) {
            },
            onClickRow: function (index) {
                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 4) {
                    $(ed.target).combobox("loadData", AAFCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAFCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAFCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAFCName);
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
                    aafcSketch.empty();

                    // model
                    aafcModel.empty();

                    // sketch
                    currentTabIndex = aafcd2d3.tabs('getTabIndex', aafcd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        aafc2d();
                        aafcSketch.off("resize").on("resize", function () {
                            if ($("#aafc").length > 0) {
                                aafc2d();
                            }
                        });
                    }
                    aafcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aafc2d();
                                aafcSketch.off("resize").on("resize", function () {
                                    if ($("#aafc").length > 0) {
                                        aafc2d();
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

                        AAFCDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAFCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFCName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAFCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAFCCategory[index] = {
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

                        AAFCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFCCategoryVal,
                                temp: AAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFCType = [];
                                $(result).each(function (index, element) {
                                    AAFCType[index] = {
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

                        AAFCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFCCategoryVal,
                                type: AAFCTypeVal,
                                temp: AAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFCSTD = [];
                                $(result).each(function (index, element) {
                                    AAFCSTD[index] = {
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

                        AAFCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFCCategoryVal,
                                type: AAFCTypeVal,
                                std: AAFCSTDVal,
                                temp: AAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFCName = [];
                                $(result).each(function (index, element) {
                                    AAFCName[index] = {
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
                        let AAFCPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAFCPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAFCPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAFCPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAFCTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAFCTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 锥壳材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAFCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        let AAFCD, AAFCThkMin, AAFCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAFCCategoryVal,
                                "type": AAFCTypeVal,
                                "std": AAFCSTDVal,
                                "name": AAFCNameVal,
                                "temp": AAFCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAFCD = parseFloat(result.density);
                                AAFCThkMin = parseFloat(result.thkMin);
                                AAFCThkMax = parseFloat(result.thkMax);

                                // DIL
                                let AAFCDIL;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAFCDIL = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafc2d("Φ" + AAFCDIL);
                                    aafcSketch.off("resize").on("resize", function () {
                                        if ($("#aafc").length > 0) {
                                            aafc2d("Φ" + AAFCDIL);
                                        }
                                    });
                                }
                                aafcd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafc2d("Φ" + AAFCDIL);
                                            aafcSketch.off("resize").on("resize", function () {
                                                if ($("#aafc").length > 0) {
                                                    aafc2d("Φ" + AAFCDIL);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 封头名义厚度
                                let AAFCTHKN;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > AAFCThkMin
                                    && parseFloat(rows[9][columns[0][1].field]) <= AAFCThkMax) {
                                    AAFCTHKN = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) <= AAFCThkMin) {
                                    south.html("封头材料厚度不能小于等于 " + AAFCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > AAFCThkMax) {
                                    south.html("封头材料厚度不能大于 " + AAFCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafc2d("Φ" + AAFCDIL, AAFCTHKN);
                                    aafcSketch.off("resize").on("resize", function () {
                                        if ($("#aafc").length > 0) {
                                            aafc2d("Φ" + AAFCDIL, AAFCTHKN);
                                        }
                                    });
                                }
                                aafcd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafc2d("Φ" + AAFCDIL, AAFCTHKN);
                                            aafcSketch.off("resize").on("resize", function () {
                                                if ($("#aafc").length > 0) {
                                                    aafc2d("Φ" + AAFCDIL, AAFCTHKN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAFCOT, AAFCO, AAFCOT1, AAFCREL, AAFCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAFCCategoryVal,
                                        "type": AAFCTypeVal,
                                        "std": AAFCSTDVal,
                                        "name": AAFCNameVal,
                                        "thk": AAFCTHKN,
                                        "temp": AAFCDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAFCDIL + 2 * AAFCTHKN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAFCOT = parseFloat(result.ot);
                                        if (AAFCOT < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFCO = parseFloat(result.o);
                                        if (AAFCO < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFCREL = parseFloat(result.rel);
                                        if (AAFCREL < 0) {
                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFCC1 = parseFloat(result.c1);
                                        if (AAFCC1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFCOT1 = parseFloat(result.ot1);

                                        // R
                                        let AAFCR;
                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                            && parseFloat(rows[10][columns[0][1].field]) >= Math.max(0.1 * AAFCDIL, 3 * AAFCTHKN)
                                            && parseFloat(rows[10][columns[0][1].field]) < 0.5 * AAFCDIL) {
                                            AAFCR = parseFloat(rows[10][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                            && parseFloat(rows[10][columns[0][1].field]) < Math.max(0.1 * AAFCDIL, 3 * AAFCTHKN)) {
                                            south.html("封头过渡段转角内半径不能小于 " + Math.max(0.1 * AAFCDIL, 3 * AAFCTHKN).toFixed(2) + " mm").css("color", "red");
                                            return false;
                                        }
                                        else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                            && parseFloat(rows[10][columns[0][1].field]) >= 0.5 * AAFCDIL) {
                                            south.html("封头过渡段转角内半径不能大于等于 " + 0.5 * AAFCDIL.toFixed(2) + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aafc2d("Φ" + AAFCDIL, AAFCTHKN, "R" + AAFCR);
                                            aafcSketch.off("resize").on("resize", function () {
                                                if ($("#aafc").length > 0) {
                                                    aafc2d("Φ" + AAFCDIL, AAFCTHKN, "R" + AAFCR);
                                                }
                                            });
                                        }
                                        aafcd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aafc2d("Φ" + AAFCDIL, AAFCTHKN, "R" + AAFCR);
                                                    aafcSketch.off("resize").on("resize", function () {
                                                        if ($("#aafc").length > 0) {
                                                            aafc2d("Φ" + AAFCDIL, AAFCTHKN, "R" + AAFCR);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 半顶角α
                                        let AAFCALPHA;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                            AAFCALPHA = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aafc2d("Φ" + AAFCDIL, AAFCTHKN, "R" + AAFCR, AAFCALPHA + "°");
                                            aafcSketch.off("resize").on("resize", function () {
                                                if ($("#aafc").length > 0) {
                                                    aafc2d("Φ" + AAFCDIL, AAFCTHKN, "R" + AAFCR, AAFCALPHA + "°");
                                                }
                                            });
                                        }
                                        aafcd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aafc2d("Φ" + AAFCDIL, AAFCTHKN, "R" + AAFCR, AAFCALPHA + "°");
                                                    aafcSketch.off("resize").on("resize", function () {
                                                        if ($("#aafc").length > 0) {
                                                            aafc2d("Φ" + AAFCDIL, AAFCTHKN, "R" + AAFCR, AAFCALPHA + "°");
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 封头腐蚀裕量
                                        let AAFCC2;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) < AAFCTHKN) {
                                            AAFCC2 = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) >= AAFCTHKN) {
                                            south.html("封头腐蚀裕量不能大于等于 " + AAFCTHKN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 焊接接头系数
                                        let AAFCE;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                            AAFCE = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        let AAFCPC = AAFCPD + AAFCPS;
                                        let AAFCC = AAFCC1 + AAFCC2;
                                        let AAFCTHKE = AAFCTHKN - AAFCC;
                                        let AAFCRDIL = AAFCR / AAFCDIL;

                                        // 获取系数 k
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "gbt_150_2011_table_5_6_get_k.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "alpha": AAFCALPHA,
                                                "rdil": AAFCRDIL.toFixed(4)
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {
                                                let AAFCK = parseFloat(result);

                                                let AAFCTHKRC = AAFCK * AAFCPC * AAFCDIL / (2 * AAFCOT * AAFCE - 0.5 * AAFCPC);
                                                let AAFCF = (1 - 2 * AAFCRDIL * (1 - Math.cos(AAFCALPHA / 180 * Math.PI))) / (2 * Math.cos(AAFCALPHA / 180 * Math.PI));

                                                let AAFCTHKCC = AAFCF * AAFCPC * AAFCDIL / (AAFCOT * AAFCE - 0.5 * AAFCPC);
                                                let AAFCTHKSC = AAFCPC * AAFCDIL / (2 * AAFCOT * AAFCE - AAFCPC);
                                                let AAFCTHKD = Math.max(AAFCTHKRC, AAFCTHKCC, AAFCTHKSC, 0.003 * AAFCDIL) + AAFCC2;

                                                let AAFCTHKCHK;
                                                south.html(
                                                    "<span style='color:#444444;'>" +
                                                    "锥形封头所需厚度：" + (AAFCTHKD + AAFCC1).toFixed(2) + " mm" +
                                                    "</span>");
                                                if (AAFCTHKN >= (AAFCTHKD + AAFCC1).toFixed(2)) {
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + AAFCTHKN + " mm" +
                                                        "</span>");
                                                    AAFCTHKCHK = "合格";
                                                }
                                                else {
                                                    south.append(
                                                        "<span style='color:red;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + AAFCTHKN + " mm" +
                                                        "</span>");
                                                    AAFCTHKCHK = "不合格";
                                                }

                                                // 压力试验
                                                let AAFCPT;
                                                if (AAFCTest === "液压试验") {
                                                    AAFCPT = 1.25 * AAFCPD * AAFCO / Math.max(AAFCOT, AAFCOT1);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：液压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + AAFCPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }
                                                else if (AAFCTest === "气压试验") {
                                                    AAFCPT = 1.10 * AAFCPD * AAFCO / Math.max(AAFCOT, AAFCOT1);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：气压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + AAFCPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }
                                                else {
                                                    return false;
                                                }

                                                // docx
                                                let AAFCPayJS = $('#payjs');

                                                function getDocx() {
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "aafcdocx.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            ribbonName: "AAFC",

                                                            pd: AAFCPD,
                                                            t: AAFCDT,
                                                            ps: AAFCPS,

                                                            std: AAFCSTDVal,
                                                            name: AAFCNameVal,
                                                            dil: AAFCDIL,
                                                            r: AAFCR,
                                                            alpha: AAFCALPHA,
                                                            thkn: AAFCTHKN,
                                                            c2: AAFCC2,
                                                            e: AAFCE,

                                                            test: AAFCTest,

                                                            d: AAFCD.toFixed(4),
                                                            rel: AAFCREL.toFixed(4),
                                                            c1: AAFCC1.toFixed(4),
                                                            ot: AAFCOT.toFixed(4),
                                                            o: AAFCO.toFixed(4),
                                                            ot1: AAFCOT1.toFixed(4),

                                                            pc: AAFCPC.toFixed(4),

                                                            c: AAFCC.toFixed(4),
                                                            thke: AAFCTHKE.toFixed(4),
                                                            rdil: AAFCRDIL.toFixed(4),

                                                            k: AAFCK.toFixed(4),
                                                            thkrc: AAFCTHKRC.toFixed(4),
                                                            f: AAFCF.toFixed(4),
                                                            thkcc: AAFCTHKCC.toFixed(4),
                                                            thksc: AAFCTHKSC.toFixed(4),
                                                            thkd: AAFCTHKD.toFixed(4),
                                                            thkchk: AAFCTHKCHK,

                                                            pt: AAFCPT.toFixed(4)
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
                                                                AAFCPayJS.dialog({
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
                                                                            AAFCPayJS.dialog("close");
                                                                            AAFCPayJS.dialog("clear");
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
                                                                                        AAFCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                        // 倒计时计数器
                                                                                        let maxTime = 4, timer;

                                                                                        function CountDown() {
                                                                                            if (maxTime >= 0) {
                                                                                                $("#payjs_timer").html(maxTime);
                                                                                                --maxTime;
                                                                                            } else {

                                                                                                clearInterval(timer);
                                                                                                // 关闭并清空收银台
                                                                                                AAFCPayJS.dialog('close');
                                                                                                AAFCPayJS.dialog('clear');
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
                                                    "<span style='color:red;'>&ensp;查表5-6获取K值失败，请检查网络后重试</span>");
                                            }
                                        });
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;封头材料力学特性获取失败，请检查网络后重试</span>");
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