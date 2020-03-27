$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aafeSketch = $("#d2");
    let aafeModel = $("#d3");
    let aafed2d3 = $('#d2d3');

    $("#cal").html("<table id='aafe'></table>");
    let pg = $("#aafe");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/f/e/AAFE.json", function (result) {

        let AAFEDT,
            AAFECategory, AAFECategoryVal, AAFEType, AAFETypeVal, AAFESTD, AAFESTDVal, AAFEName, AAFENameVal,
            columns, rows, ed;

        function aafe2d(dbi = "ΦDbi", dsi = "ΦDsi", thkn = "δn", r = "r", alpha = "α") {

            aafeSketch.empty();

            let width = aafeSketch.width();
            let height = aafeSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAFESVG").attr("height", height);

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
                {x: padding + wg, y: padding + hg - thk},
                {x: padding + wg - 3 * thk, y: padding + hg - thk},
                {x: padding + wg - 3 * thk, y: padding + hg},
                {x: padding + wg, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 3 * hg},
                {x: padding + wg - 3 * thk, y: padding + 3 * hg},
                {x: padding + wg - 3 * thk, y: padding + 3 * hg + thk},
                {x: padding + wg, y: padding + 3 * hg + thk}
            ])).classed("sketch", true);
            drawCenterLine(padding + wg, padding + hg - thk, padding + wg, padding + 3 * hg + thk);
            drawLine(padding + wg - 3 * thk, padding + hg, padding + wg - 3 * thk, padding + 3 * hg);

            // 上部折边
            let sr = 3 * thk;
            let sro = sr + thk;
            let deg = 30;
            let rad = deg / 180 * Math.PI;
            let cx9 = padding + wg;
            let cy9 = padding + hg - sro;
            drawArc(sr, sr, cx9 + sr * Math.sin(rad), cy9 + sr * Math.cos(rad), cx9, padding + hg - thk);
            drawArc(sro, sro, cx9 + sro * Math.sin(rad), cy9 + sro * Math.cos(rad), cx9, padding + hg);

            // 上部锥壳部分
            let deltaY = hg - (sr - sr * Math.cos(rad));
            let deltaX = deltaY / Math.tan(rad);
            drawLine(cx9 + sr * Math.sin(rad), cy9 + sr * Math.cos(rad),
                cx9 + sr * Math.sin(rad) + deltaX, cy9 + sr * Math.cos(rad) - deltaY);
            drawLine(cx9 + sro * Math.sin(rad), cy9 + sro * Math.cos(rad),
                cx9 + sro * Math.sin(rad) + deltaX, cy9 + sro * Math.cos(rad) - deltaY);

            // 下部折边
            let cx8 = padding + wg;
            let cy8 = padding + 3 * hg + sro;
            drawArc(sr, sr, cx8, cy8 - sr, cx8 + sr * Math.sin(rad), cy8 - sr * Math.cos(rad));
            drawArc(sro, sro, cx8, cy8 - sro, cx8 + sro * Math.sin(rad), cy8 - sro * Math.cos(rad));

            // 下部锥壳部分
            drawLine(cx8 + sr * Math.sin(rad), cy8 - sr * Math.cos(rad),
                cx8 + sr * Math.sin(rad) + deltaX, cy8 - sr * Math.cos(rad) + deltaY);
            drawLine(cx8 + sro * Math.sin(rad), cy8 - sro * Math.cos(rad),
                cx8 + sro * Math.sin(rad) + deltaX, cy8 - sro * Math.cos(rad) + deltaY);

            drawCenterLine(cx8 + sro * Math.sin(rad) + deltaX + 10, height / 2, padding + wg - 3 * thk - 10, height / 2);

            // dbi
            dimRightV(cx8 + sro * Math.sin(rad) + deltaX, cy8 - sro * Math.cos(rad) + deltaY,
                cx8 + sro * Math.sin(rad) + deltaX, cy9 + sro * Math.cos(rad) - deltaY, dbi, "AAFESketchDBI");

            // dsi
            dimLeftV(padding + wg - 3 * thk, padding + 3 * hg, padding + wg - 3 * thk, padding + hg, dsi, "AAFESketchDSI");

            // alpha
            let cx0 = cx8 + sro * Math.sin(rad) + deltaX - 2 * hg / Math.tan(rad);
            let cy0 = height / 2;
            let cr = 1.5 * hg / Math.sin(rad);

            // alpha
            svg.append("path").attr("d", "M "
                + (cx0 + cr * Math.cos(rad)) + " " + (cy0 + cr * Math.sin(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0 + cr) + " " + (cy0)
            ).classed("sketch", true).attr("id", "AAFESketchALPHA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFESketchALPHA")
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
                .attr("id", "AAFESketchTHKCN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFESketchTHKCN")
                .attr("startOffset", "50%").text(thkn);

            // r
            let cx1 = padding + wg;
            let cy1 = padding + hg - sro;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1 + sr},
                    {x: cx1 - 3, y: cy1 + sr - 15},
                    {x: cx1 + 3, y: cy1 + sr - 15},
                    {x: cx1, y: cy1 + sr}
                ])).attr("transform", "rotate(" + -(deg / 2) + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1},
                    {x: cx1, y: cy1 + sr}
                ])).attr("transform", "rotate(" + -(deg / 2) + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1 - 40, y: cy1},
                    {x: cx1, y: cy1}
                ])).attr("id", "AAFESketchR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFESketchR")
                .attr("startOffset", "50%").text(r);
        }

        currentTabIndex = aafed2d3.tabs('getTabIndex', aafed2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aafe2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aafe").length > 0) {
                    aafe2d();
                }
            });
        }
        aafed2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aafe2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aafe").length > 0) {
                            aafe2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 折边锥壳(5°≤α≤60°)小端强度计算",
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
                    $(ed.target).combobox("loadData", AAFECategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAFEType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAFESTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAFEName);
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
                    aafeSketch.empty();

                    // model
                    aafeModel.empty();

                    // sketch
                    currentTabIndex = aafed2d3.tabs('getTabIndex', aafed2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aafe2d();
                        aafeSketch.off("resize").on("resize", function () {
                            if ($("#aafe").length > 0) {
                                aafe2d();
                            }
                        });
                    }
                    aafed2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aafe2d();
                                aafeSketch.off("resize").on("resize", function () {
                                    if ($("#aafe").length > 0) {
                                        aafe2d();
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

                        AAFEDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAFECategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFEType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFESTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFEName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFECategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAFEDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAFECategory[index] = {
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

                        AAFECategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFEType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFESTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFEName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFECategoryVal,
                                temp: AAFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFEType = [];
                                $(result).each(function (index, element) {
                                    AAFEType[index] = {
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

                        AAFETypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFESTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFEName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFECategoryVal,
                                type: AAFETypeVal,
                                temp: AAFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFESTD = [];
                                $(result).each(function (index, element) {
                                    AAFESTD[index] = {
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

                        AAFESTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFEName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFECategoryVal,
                                type: AAFETypeVal,
                                std: AAFESTDVal,
                                temp: AAFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFEName = [];
                                $(result).each(function (index, element) {
                                    AAFEName[index] = {
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
                        let AAFEPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAFEPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAFEPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAFEPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAFETest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAFETest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 锥壳材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAFENameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        let AAFED, AAFEThkMin, AAFEThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAFECategoryVal,
                                "type": AAFETypeVal,
                                "std": AAFESTDVal,
                                "name": AAFENameVal,
                                "temp": AAFEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAFED = parseFloat(result.density);
                                AAFEThkMin = parseFloat(result.thkMin);
                                AAFEThkMax = parseFloat(result.thkMax);

                                // DBI
                                let AAFEDBI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAFEDBI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafe2d("Φ" + AAFEDBI);
                                    aafeSketch.off("resize").on("resize", function () {
                                        if ($("#aafe").length > 0) {
                                            aafe2d("Φ" + AAFEDBI);
                                        }
                                    });
                                }
                                aafed2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafe2d("Φ" + AAFEDBI);
                                            aafeSketch.off("resize").on("resize", function () {
                                                if ($("#aafe").length > 0) {
                                                    aafe2d("Φ" + AAFEDBI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // DSI
                                let AAFEDSI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    AAFEDSI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI);
                                    aafeSketch.off("resize").on("resize", function () {
                                        if ($("#aafe").length > 0) {
                                            aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI);
                                        }
                                    });
                                }
                                aafed2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI);
                                            aafeSketch.off("resize").on("resize", function () {
                                                if ($("#aafe").length > 0) {
                                                    aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 封头名义厚度
                                let AAFETHKN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAFEThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAFEThkMax) {
                                    AAFETHKN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAFEThkMin) {
                                    south.html("封头材料厚度不能小于等于 " + AAFEThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAFEThkMax) {
                                    south.html("封头材料厚度不能大于 " + AAFEThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN);
                                    aafeSketch.off("resize").on("resize", function () {
                                        if ($("#aafe").length > 0) {
                                            aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN);
                                        }
                                    });
                                }
                                aafed2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN);
                                            aafeSketch.off("resize").on("resize", function () {
                                                if ($("#aafe").length > 0) {
                                                    aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAFEOT, AAFEO, AAFEOT1, AAFEREL, AAFEC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAFECategoryVal,
                                        "type": AAFETypeVal,
                                        "std": AAFESTDVal,
                                        "name": AAFENameVal,
                                        "thk": AAFETHKN,
                                        "temp": AAFEDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAFEDBI + 2 * AAFETHKN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAFEOT = parseFloat(result.ot);
                                        if (AAFEOT < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFEO = parseFloat(result.o);
                                        if (AAFEO < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFEREL = parseFloat(result.rel);
                                        if (AAFEREL < 0) {
                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFEC1 = parseFloat(result.c1);
                                        if (AAFEC1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFEOT1 = parseFloat(result.ot1);

                                        // R
                                        let AAFER;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= Math.max(0.05 * AAFEDSI, 3 * AAFETHKN)) {
                                            AAFER = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < Math.max(0.05 * AAFEDSI, 3 * AAFETHKN)) {
                                            south.html("封头过渡段转角内半径不能小于 " + Math.max(0.05 * AAFEDSI, 3 * AAFETHKN).toFixed(2) + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN, "R" + AAFER);
                                            aafeSketch.off("resize").on("resize", function () {
                                                if ($("#aafe").length > 0) {
                                                    aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN, "R" + AAFER);
                                                }
                                            });
                                        }
                                        aafed2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN, "R" + AAFER);
                                                    aafeSketch.off("resize").on("resize", function () {
                                                        if ($("#aafe").length > 0) {
                                                            aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN, "R" + AAFER);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 半顶角α
                                        let AAFEALPHA;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            AAFEALPHA = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN, "R" + AAFER, AAFEALPHA + "°");
                                            aafeSketch.off("resize").on("resize", function () {
                                                if ($("#aafe").length > 0) {
                                                    aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN, "R" + AAFER, AAFEALPHA + "°");
                                                }
                                            });
                                        }
                                        aafed2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN, "R" + AAFER, AAFEALPHA + "°");
                                                    aafeSketch.off("resize").on("resize", function () {
                                                        if ($("#aafe").length > 0) {
                                                            aafe2d("Φ" + AAFEDBI, "Φ" + AAFEDSI, AAFETHKN, "R" + AAFER, AAFEALPHA + "°");
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 封头腐蚀裕量
                                        let AAFEC2;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                            && parseFloat(rows[13][columns[0][1].field]) < AAFETHKN) {
                                            AAFEC2 = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                            && parseFloat(rows[13][columns[0][1].field]) >= AAFETHKN) {
                                            south.html("封头腐蚀裕量不能大于等于 " + AAFETHKN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 焊接接头系数
                                        let AAFEE;
                                        if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                            AAFEE = parseFloat(rows[14][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        let AAFEPC = AAFEPD + AAFEPS;
                                        let AAFEC = AAFEC1 + AAFEC2;
                                        let AAFETHKE = AAFETHKN - AAFEC;
                                        let AAFERSM = (AAFEDSI + AAFETHKN) / 2;

                                        let AAFETHKSC = AAFEPC * AAFEDSI / (2 * AAFEOT * AAFEE - AAFEPC);
                                        let AAFETHKCC = AAFEPC * AAFEDBI / (2 * AAFEOT * AAFEE - AAFEPC) / Math.cos(AAFEALPHA / 180 * Math.PI);

                                        let AAFETHKSCRSM = AAFETHKSC / AAFERSM;

                                        // 获取系数 Q2
                                        let url;
                                        if (AAFEALPHA <= 45) {
                                            url = "gbt_150_2011_chart_5_14_get_q2.action"
                                        } else {
                                            url = "gbt_150_2011_chart_5_15_get_q2.action"
                                        }
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: url,
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "alpha": AAFEALPHA,
                                                "thkrs": Math.max(AAFETHKSCRSM, 0.002)
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                let AAFEQ2 = parseFloat(result);

                                                let AAFETHKRC = AAFEQ2 * AAFETHKSC;
                                                let AAFETHKD = Math.max(AAFETHKRC, AAFETHKCC, AAFETHKSC, 0.003 * AAFEDSI) + AAFEC2;

                                                let AAFETHKCHK;
                                                south.html(
                                                    "<span style='color:#444444;'>" +
                                                    "锥形封头所需厚度：" + (AAFETHKD + AAFEC1).toFixed(2) + " mm" +
                                                    "</span>");
                                                if (AAFETHKN >= (AAFETHKD + AAFEC1).toFixed(2)) {
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + AAFETHKN + " mm" +
                                                        "</span>");
                                                    AAFETHKCHK = "合格";
                                                }
                                                else {
                                                    south.append(
                                                        "<span style='color:red;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "输入厚度：" + AAFETHKN + " mm" +
                                                        "</span>");
                                                    AAFETHKCHK = "不合格";
                                                }

                                                let AAFELRC = Math.sqrt(AAFEDSI * AAFETHKRC / Math.cos(AAFEALPHA / 180 * Math.PI));
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "连接锥壳段最小长度：" + AAFELRC.toFixed(2) + " mm" +
                                                    "</span>");

                                                let AAFELRS = Math.sqrt(AAFEDSI * AAFETHKRC);
                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "小端直边段最小长度：" + AAFELRS.toFixed(2) + " mm" +
                                                    "</span>");

                                                // 压力试验
                                                let AAFEPT;
                                                if (AAFETest === "液压试验") {
                                                    AAFEPT = 1.25 * AAFEPD * AAFEO / Math.max(AAFEOT, AAFEOT1);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：液压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + AAFEPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }
                                                else if (AAFETest === "气压试验") {
                                                    AAFEPT = 1.10 * AAFEPD * AAFEO / Math.max(AAFEOT, AAFEOT1);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "试压类型：气压" +
                                                        "&ensp;|&ensp;" +
                                                        "试验压力：" + AAFEPT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                }
                                                else {
                                                    return false;
                                                }

                                                // docx
                                                let AAFEPayJS = $('#payjs');

                                                function getDocx() {
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "aafedocx.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            ribbonName: "AAFE",

                                                            pd: AAFEPD,
                                                            t: AAFEDT,
                                                            ps: AAFEPS,

                                                            std: AAFESTDVal,
                                                            name: AAFENameVal,
                                                            dbi: AAFEDBI,
                                                            dsi: AAFEDSI,
                                                            thkn: AAFETHKN,
                                                            alpha: AAFEALPHA,
                                                            r: AAFER,
                                                            c2: AAFEC2,
                                                            e: AAFEE,

                                                            test: AAFETest,

                                                            d: AAFED.toFixed(4),
                                                            rel: AAFEREL.toFixed(4),
                                                            c1: AAFEC1.toFixed(4),
                                                            ot: AAFEOT.toFixed(4),
                                                            o: AAFEO.toFixed(4),
                                                            ot1: AAFEOT1.toFixed(4),

                                                            pc: AAFEPC.toFixed(4),

                                                            c: AAFEC.toFixed(4),
                                                            thke: AAFETHKE.toFixed(4),
                                                            rsm: AAFERSM.toFixed(4),

                                                            thksc: AAFETHKSC.toFixed(4),
                                                            thkcc: AAFETHKCC.toFixed(4),
                                                            thkscrsm: AAFETHKSCRSM.toFixed(4),
                                                            q2: AAFEQ2.toFixed(4),
                                                            thkrc: AAFETHKRC.toFixed(4),
                                                            thkd: AAFETHKD.toFixed(4),
                                                            thkchk: AAFETHKCHK,
                                                            lrc: AAFELRC.toFixed(4),
                                                            lrs: AAFELRS.toFixed(4),

                                                            pt: AAFEPT.toFixed(4)
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
                                                                AAFEPayJS.dialog({
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
                                                                            AAFEPayJS.dialog("close");
                                                                            AAFEPayJS.dialog("clear");
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
                                                                                        AAFEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                        // 倒计时计数器
                                                                                        let maxTime = 4, timer;

                                                                                        function CountDown() {
                                                                                            if (maxTime >= 0) {
                                                                                                $("#payjs_timer").html(maxTime);
                                                                                                --maxTime;
                                                                                            } else {

                                                                                                clearInterval(timer);
                                                                                                // 关闭并清空收银台
                                                                                                AAFEPayJS.dialog('close');
                                                                                                AAFEPayJS.dialog('clear');
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
                                                    "<span style='color:red;'>&ensp;查表5-14/15获取Q2值失败，请检查网络后重试</span>");
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