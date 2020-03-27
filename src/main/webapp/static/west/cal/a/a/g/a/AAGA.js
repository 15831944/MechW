$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aagaSketch = $("#d2");
    let aagaModel = $("#d3");
    let aagad2d3 = $('#d2d3');

    $("#cal").html("<table id='aaga'></table>");
    let pg = $("#aaga");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/g/a/AAGA.json", function (result) {

        let AAGADT,
            AAGASCategory, AAGASCategoryVal, AAGASType, AAGASTypeVal, AAGASSTD, AAGASSTDVal, AAGASName, AAGASNameVal,
            AAGACCategory, AAGACCategoryVal, AAGACType, AAGACTypeVal, AAGACSTD, AAGACSTDVal, AAGACName, AAGACNameVal,
            columns, rows, ed;

        function aaga2d(dsi = "ϕDsi", thksn = "δsn", alpha = "α", thkcn = "δcn") {

            aagaSketch.empty();

            let width = aagaSketch.width();
            let height = aagaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAGASVG").attr("height", height);

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
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#AAEBSketchDI").attr("startOffset", "50%").text(text);

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

            let padding = 60;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 10;

            // 筒体
            drawLine(padding + wg, padding + hg - 5 * thk, padding + wg, padding + 4 * hg);
            drawLine(padding + wg - thk, padding + hg - 5 * thk, padding + wg - thk, padding + 4 * hg);
            drawLine(padding + 3 * wg, padding + hg - 5 * thk, padding + 3 * wg, padding + 4 * hg);
            drawLine(padding + 3 * wg + thk, padding + hg - 5 * thk, padding + 3 * wg + thk, padding + 4 * hg);
            drawLine(padding + wg - thk, padding + hg - 5 * thk, padding + 3 * wg + thk, padding + hg - 5 * thk);
            drawLine(padding + wg - thk, padding + 4 * hg, padding + 3 * wg + thk, padding + 4 * hg);

            drawCenterLine(width / 2, padding + hg - 5 * thk - 10, width / 2, height / 2 + hg - 20);
            drawCenterLine(width / 2, height / 2 + hg + 5, width / 2, height - padding);

            // dsi
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: height / 2 + hg},
                    {x: padding + wg + 15, y: height / 2 + hg + 3},
                    {x: padding + wg + 15, y: height / 2 + hg - 3},
                    {x: padding + wg, y: height / 2 + hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: height / 2 + hg},
                    {x: padding + 3 * wg - 15, y: height / 2 + hg + 3},
                    {x: padding + 3 * wg - 15, y: height / 2 + hg - 3},
                    {x: padding + 3 * wg, y: height / 2 + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg + 15, y: height / 2 + hg},
                {x: padding + 3 * wg - 15, y: height / 2 + hg}
            ])).attr("id", "AAGASketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGASketchDSI").attr("startOffset", "50%").text(dsi);

            // thksn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk, y: height / 2 + hg},
                    {x: padding + wg - thk - 15, y: height / 2 + hg + 3},
                    {x: padding + wg - thk - 15, y: height / 2 + hg - 3},
                    {x: padding + wg - thk, y: height / 2 + hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: height / 2 + hg},
                {x: padding + wg, y: height / 2 + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 15 - 40, y: height / 2 + hg},
                {x: padding + wg - thk - 15, y: height / 2 + hg}
            ])).attr("id", "AAGASketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 锥壳
            let sr = 0.3 * wg;
            drawLine(padding + wg, padding + hg, width / 2 - sr, padding + hg - 3 * thk);
            drawLine(padding + 3 * wg, padding + hg, width / 2 + sr, padding + hg - 3 * thk);
            drawLine(width / 2 - sr, padding + hg - 3 * thk, width / 2 + sr, padding + hg - 3 * thk);

            let rad = Math.atan(0.7 * wg / (3 * thk));

            drawLine(padding + wg, padding + hg - thk / Math.sin(rad), width / 2 - sr - thk * Math.cos(rad), padding + hg - 3 * thk - thk * Math.sin(rad));
            drawLine(padding + 3 * wg, padding + hg - thk / Math.sin(rad), width / 2 + sr + thk * Math.cos(rad), padding + hg - 3 * thk - thk * Math.sin(rad));
            drawLine(width / 2 - sr - thk * Math.cos(rad), padding + hg - 3 * thk - thk * Math.sin(rad), width / 2 + sr + thk * Math.cos(rad), padding + hg - 3 * thk - thk * Math.sin(rad));

            drawLine(width / 2 - sr, padding + hg - 3 * thk, width / 2 - sr, padding + hg - 3 * thk - thk * Math.sin(rad));
            drawLine(width / 2 + sr, padding + hg - 3 * thk, width / 2 + sr, padding + hg - 3 * thk - thk * Math.sin(rad));

            // alpha
            let cr = 0.5 * wg / Math.sin(rad);
            let cx0 = width / 2;
            let cy0 = padding + hg - wg / Math.tan(rad);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: cy0 + cr},
                    {x: width / 2 - 15, y: cy0 + cr + 3},
                    {x: width / 2 - 15, y: cy0 + cr - 3},
                    {x: width / 2, y: cy0 + cr}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: cy0 + cr},
                    {x: width / 2 + 15, y: cy0 + cr + 3},
                    {x: width / 2 + 15, y: cy0 + cr - 3},
                    {x: width / 2, y: cy0 + cr}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", "M "
                + (cx0 - cr * Math.sin(rad)) + " " + (cy0 + cr * Math.cos(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0) + " " + (cy0 + cr)
            ).attr("id", "AAGASketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGASketchALPHA").attr("startOffset", "50%").text(alpha);

            // thkcn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr + 3, y: cy0 + 15},
                    {x: cx0 + cr - 3, y: cy0 + 15},
                    {x: cx0 + cr, y: cy0}
                ])).attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 - thk},
                    {x: cx0 + cr + 3, y: cy0 - thk - 15},
                    {x: cx0 + cr - 3, y: cy0 - thk - 15},
                    {x: cx0 + cr, y: cy0 - thk}
                ])).attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", line([
                {x: cx0 + cr, y: cy0 - thk - 15 - 10},
                {x: cx0 + cr, y: cy0}
            ])).classed("sketch", true).attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", line([
                {x: cx0 + cr, y: cy0 + 15 + 40},
                {x: cx0 + cr, y: cy0 + 15}
            ])).attr("id", "AAGASketchTHKCN").classed("sketch", true).attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGASketchTHKCN").attr("startOffset", "50%").text(thkcn);
        }

        currentTabIndex = aagad2d3.tabs('getTabIndex', aagad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aaga2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aaga").length > 0) {
                    aaga2d();
                }
            });
        }
        aagad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aaga2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aaga").length > 0) {
                            aaga2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 大锥角(α≥70°)锥壳内压计算",
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
                    $(ed.target).combobox("loadData", AAGASCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAGASType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAGASSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAGASName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", AAGACCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAGACType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAGACSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAGACName);
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
                    aagaSketch.empty();

                    // model
                    aagaModel.empty();

                    // sketch
                    currentTabIndex = aagad2d3.tabs('getTabIndex', aagad2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        aaga2d();
                        aagaSketch.off("resize").on("resize", function () {
                            if ($("#aaga").length > 0) {
                                aaga2d();
                            }
                        });
                    }
                    aagad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aaga2d();
                                aagaSketch.off("resize").on("resize", function () {
                                    if ($("#aaga").length > 0) {
                                        aaga2d();
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

                        AAGADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAGASCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAGASType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGASName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        AAGACCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAGACType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAGACSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAGACName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGASCategory = [];
                                AAGACCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAGADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAGASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAGACCategory[index] = {
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

                        AAGASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAGASType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGASCategoryVal,
                                temp: AAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGASType = [];
                                $(result).each(function (index, element) {
                                    AAGASType[index] = {
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

                        AAGASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGASCategoryVal,
                                type: AAGASTypeVal,
                                temp: AAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGASSTD = [];
                                $(result).each(function (index, element) {
                                    AAGASSTD[index] = {
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

                        AAGASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGASCategoryVal,
                                type: AAGASTypeVal,
                                std: AAGASSTDVal,
                                temp: AAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGASName = [];
                                $(result).each(function (index, element) {
                                    AAGASName[index] = {
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
                    else if (index === 12) {

                        AAGACCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAGACType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAGACSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAGACName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGACCategoryVal,
                                temp: AAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGACType = [];
                                $(result).each(function (index, element) {
                                    AAGACType[index] = {
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
                    else if (index === 13) {

                        AAGACTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAGACSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAGACName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGACCategoryVal,
                                type: AAGACTypeVal,
                                temp: AAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGACSTD = [];
                                $(result).each(function (index, element) {
                                    AAGACSTD[index] = {
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
                    else if (index === 14) {

                        AAGACSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAGACName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGACCategoryVal,
                                type: AAGACTypeVal,
                                std: AAGACSTDVal,
                                temp: AAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGACName = [];
                                $(result).each(function (index, element) {
                                    AAGACName[index] = {
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
                        let AAGAPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAGAPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAGAPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAGAPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAGATest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAGATest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 筒体材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAGASNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取筒体材料密度、最大最小厚度
                        let AAGADS, AAGASThkMin, AAGASThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAGASCategoryVal,
                                "type": AAGASTypeVal,
                                "std": AAGASSTDVal,
                                "name": AAGASNameVal,
                                "temp": AAGADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAGADS = parseFloat(result.density);
                                AAGASThkMin = parseFloat(result.thkMin);
                                AAGASThkMax = parseFloat(result.thkMax);

                                // 筒体内直径
                                let AAGADSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAGADSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aaga2d("ϕ" + AAGADSI);
                                    aagaSketch.off("resize").on("resize", function () {
                                        if ($("#aaga").length > 0) {
                                            aaga2d("ϕ" + AAGADSI);
                                        }
                                    });
                                }
                                aagad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aaga2d("ϕ" + AAGADSI);
                                            aagaSketch.off("resize").on("resize", function () {
                                                if ($("#aaga").length > 0) {
                                                    aaga2d("ϕ" + AAGADSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 筒体名义厚度
                                let AAGATHKSN;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > AAGASThkMin
                                    && parseFloat(rows[9][columns[0][1].field]) <= AAGASThkMax) {
                                    AAGATHKSN = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) <= AAGASThkMin) {
                                    south.html("筒体材料厚度不能小于等于 " + AAGASThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > AAGASThkMax) {
                                    south.html("筒体材料厚度不能大于 " + AAGASThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aaga2d("ϕ" + AAGADSI, AAGATHKSN);
                                    aagaSketch.off("resize").on("resize", function () {
                                        if ($("#aaga").length > 0) {
                                            aaga2d("ϕ" + AAGADSI, AAGATHKSN);
                                        }
                                    });
                                }
                                aagad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aaga2d("ϕ" + AAGADSI, AAGATHKSN);
                                            aagaSketch.off("resize").on("resize", function () {
                                                if ($("#aaga").length > 0) {
                                                    aaga2d("ϕ" + AAGADSI, AAGATHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAGAOST, AAGAOS, AAGAOST1, AAGARSEL, AAGACS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAGASCategoryVal,
                                        "type": AAGASTypeVal,
                                        "std": AAGASSTDVal,
                                        "name": AAGASNameVal,
                                        "thk": AAGATHKSN,
                                        "temp": AAGADT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAGADSI + 2 * AAGATHKSN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAGAOST = parseFloat(result.ot);
                                        if (AAGAOST < 0) {
                                            south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGAOS = parseFloat(result.o);
                                        if (AAGAOS < 0) {
                                            south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGARSEL = parseFloat(result.rel);
                                        if (AAGARSEL < 0) {
                                            south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGACS1 = parseFloat(result.c1);
                                        if (AAGACS1 < 0) {
                                            south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGAOST1 = parseFloat(result.ot1);

                                        // 筒体焊接接头系数
                                        let AAGAES;
                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                            AAGAES = parseFloat(rows[10][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 筒体腐蚀裕量
                                        let AAGACS2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < AAGATHKSN) {
                                            AAGACS2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= AAGATHKSN) {
                                            south.html("筒体腐蚀裕量不能大于等于 " + AAGATHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 封头材料名称
                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                            AAGACNameVal = rows[15][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取封头材料密度、最大最小厚度
                                        let AAGADC, AAGACThkMin, AAGACThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": AAGACCategoryVal,
                                                "type": AAGACTypeVal,
                                                "std": AAGACSTDVal,
                                                "name": AAGACNameVal,
                                                "temp": AAGADT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                AAGADC = parseFloat(result.density);
                                                AAGACThkMin = parseFloat(result.thkMin);
                                                AAGACThkMax = parseFloat(result.thkMax);

                                                // 半顶角 alpha
                                                let AAGAALPHA;
                                                if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                    AAGAALPHA = parseFloat(rows[16][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aaga2d("ϕ" + AAGADSI, AAGATHKSN, AAGAALPHA + "°");
                                                    aagaSketch.off("resize").on("resize", function () {
                                                        if ($("#aaga").length > 0) {
                                                            aaga2d("ϕ" + AAGADSI, AAGATHKSN, AAGAALPHA + "°");
                                                        }
                                                    });
                                                }
                                                aagad2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aaga2d("ϕ" + AAGADSI, AAGATHKSN, AAGAALPHA + "°");
                                                            aagaSketch.off("resize").on("resize", function () {
                                                                if ($("#aaga").length > 0) {
                                                                    aaga2d("ϕ" + AAGADSI, AAGATHKSN, AAGAALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 封头名义厚度
                                                let AAGATHKCN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAGACThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAGACThkMax) {
                                                    AAGATHKCN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAGACThkMin) {
                                                    south.html("封头材料厚度不能小于等于 " + AAGACThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAGACThkMax) {
                                                    south.html("封头材料厚度不能大于 " + AAGACThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aaga2d("ϕ" + AAGADSI, AAGATHKSN, AAGAALPHA + "°", AAGATHKCN);
                                                    aagaSketch.off("resize").on("resize", function () {
                                                        if ($("#aaga").length > 0) {
                                                            aaga2d("ϕ" + AAGADSI, AAGATHKSN, AAGAALPHA + "°", AAGATHKCN);
                                                        }
                                                    });
                                                }
                                                aagad2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aaga2d("ϕ" + AAGADSI, AAGATHKSN, AAGAALPHA + "°", AAGATHKCN);
                                                            aagaSketch.off("resize").on("resize", function () {
                                                                if ($("#aaga").length > 0) {
                                                                    aaga2d("ϕ" + AAGADSI, AAGATHKSN, AAGAALPHA + "°", AAGATHKCN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let AAGAOCT, AAGAOC, AAGAOCT1, AAGARCEL, AAGACC1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": AAGACCategoryVal,
                                                        "type": AAGACTypeVal,
                                                        "std": AAGACSTDVal,
                                                        "name": AAGACNameVal,
                                                        "thk": AAGATHKCN,
                                                        "temp": AAGADT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": AAGADSI
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        AAGAOCT = parseFloat(result.ot);
                                                        if (AAGAOCT < 0) {
                                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAGAOC = parseFloat(result.o);
                                                        if (AAGAOC < 0) {
                                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAGARCEL = parseFloat(result.rel);
                                                        if (AAGARCEL < 0) {
                                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAGACC1 = parseFloat(result.c1);
                                                        if (AAGACC1 < 0) {
                                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        AAGAOCT1 = parseFloat(result.ot1);

                                                        // 封头焊接接头系数
                                                        let AAGAEC;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                            AAGAEC = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 封头腐蚀裕量
                                                        let AAGACC2;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) < AAGATHKCN) {
                                                            AAGACC2 = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) >= AAGATHKCN) {
                                                            south.html("封头腐蚀裕量不能大于等于 " + AAGATHKCN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 过程参数
                                                        let AAGAPC = AAGAPD + AAGAPS;
                                                        let AAGACS = AAGACS1 + AAGACS2;
                                                        let AAGATHKSE = AAGATHKSN - AAGACS;
                                                        let AAGACC = AAGACC1 + AAGACC2;
                                                        let AAGATHKCE = AAGATHKCN - AAGACC;

                                                        // 封头计算及校核
                                                        let AAGABETA = 0.4 * Math.sqrt(AAGADSI / AAGATHKSE)
                                                            * Math.tan(AAGAALPHA / 180 * Math.PI)
                                                            / (1 + Math.sqrt((1 + Math.pow(AAGATHKCE / AAGATHKSE, 2)) / (2 * Math.cos(AAGAALPHA / 180 * Math.PI)) * AAGATHKCE / AAGATHKSE))
                                                            - 0.25;
                                                        let AAGABETA1 = Math.max(0.5, AAGABETA);
                                                        let AAGATHK2 = AAGAPC * AAGADSI * AAGABETA1 / (2 * AAGAOST * AAGAES - AAGAPC) / Math.cos(AAGAALPHA / 180 * Math.PI);
                                                        let AAGATHK1 = AAGATHKCE * AAGATHK2 / AAGATHKSE;
                                                        let AAGATHKK = AAGAPC * AAGADSI / (2 * AAGAOCT * AAGAEC - AAGAPC) / Math.cos(AAGAALPHA / 180 * Math.PI);
                                                        let AAGATHKP = 0.3 * AAGADSI * AAGAALPHA / 90 * Math.sqrt(AAGAPC / (AAGAOCT * AAGAEC));
                                                        let AAGATHKCC = Math.min(Math.max(AAGATHKK, AAGATHK1), AAGATHKP);
                                                        let AAGATHKCD = AAGATHKCC + AAGACC2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "封头所需厚度：" + (AAGATHKCD + AAGACC1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let AAGATHKCCHK;
                                                        if (AAGATHKCN >= (AAGATHKCD + AAGACC1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + AAGATHKCN + " mm" +
                                                                "</span>");
                                                            AAGATHKCCHK = "合格";
                                                        } else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + AAGATHKCN + " mm" +
                                                                "</span>");
                                                            AAGATHKCCHK = "不合格";
                                                        }

                                                        // 筒体计算及校核
                                                        let AAGATHKSC = AAGAPC * AAGADSI / (2 * AAGAOST * AAGAES - AAGAPC);
                                                        let AAGATHKSD = AAGATHKSC + AAGACS2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "筒体所需厚度：" + (AAGATHKSD + AAGACS1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let AAGATHKSCHK;
                                                        if (AAGATHKSN >= (AAGATHKSD + AAGACS1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + AAGATHKSN + " mm" +
                                                                "</span>");
                                                            AAGATHKSCHK = "合格";
                                                        } else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + AAGATHKSN + " mm" +
                                                                "</span>");
                                                            AAGATHKSCHK = "不合格";
                                                        }

                                                        // 压力试验
                                                        let AAGAPCT, AAGAPST, AAGAPT;
                                                        if (AAGATest === "液压试验") {
                                                            AAGAPCT = 1.25 * AAGAPD * AAGAOC / Math.max(AAGAOCT, AAGAOCT1);
                                                            AAGAPST = 1.25 * AAGAPD * AAGAOS / Math.max(AAGAOST, AAGAOST1);
                                                            AAGAPT = Math.min(AAGAPCT, AAGAPST);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + AAGAPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (AAGATest === "气压试验") {
                                                            AAGAPCT = 1.1 * AAGAPD * AAGAOC / Math.max(AAGAOCT, AAGAOCT1);
                                                            AAGAPST = 1.1 * AAGAPD * AAGAOS / Math.max(AAGAOST, AAGAOST1);
                                                            AAGAPT = Math.min(AAGAPCT, AAGAPST);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + AAGAPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }

                                                        // MAWP
                                                        let AAGAPK = (2 * AAGAOCT * AAGAEC * AAGATHKCE) / (AAGADSI / Math.cos(AAGAALPHA / 180 * Math.PI) + AAGATHKCE);
                                                        let AAGAP2 = (2 * AAGAOST * AAGAES * AAGATHKSE) / (AAGADSI * AAGABETA1 / Math.cos(AAGAALPHA / 180 * Math.PI) + AAGATHKSE);
                                                        let AAGAPP = AAGAOCT * AAGAEC * Math.pow(AAGATHKCE * 90 / (0.3 * AAGADSI * AAGAALPHA), 2);
                                                        let AAGAMAWPC = Math.max(Math.min(AAGAPK, AAGAP2), AAGAPP) - AAGAPS;
                                                        let AAGAMAWPS = (2 * AAGAOST * AAGAES * AAGATHKSE) / (AAGADSI + AAGATHKSE) - AAGAPS;
                                                        let AAGAMAWP = Math.min(AAGAMAWPC, AAGAMAWPS);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "MAWP：" + AAGAMAWP.toFixed(4) + " MPa" +
                                                            "</span>");

                                                        // docx
                                                        let AAGAPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "aagadocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "AAGA",

                                                                    pd: AAGAPD,
                                                                    t: AAGADT,
                                                                    ps: AAGAPS,

                                                                    stds: AAGASSTDVal,
                                                                    names: AAGASNameVal,
                                                                    dsi: AAGADSI,
                                                                    thksn: AAGATHKSN,
                                                                    es: AAGAES,
                                                                    cs2: AAGACS2,

                                                                    stdc: AAGACSTDVal,
                                                                    namec: AAGACNameVal,
                                                                    alpha: AAGAALPHA,
                                                                    thkcn: AAGATHKCN,
                                                                    cc2: AAGACC2,
                                                                    ec: AAGAEC,

                                                                    test: AAGATest,

                                                                    ds: AAGADS.toFixed(4),
                                                                    cs1: AAGACS1.toFixed(4),
                                                                    ost: AAGAOST.toFixed(4),
                                                                    os: AAGAOS.toFixed(4),
                                                                    rsel: AAGARSEL.toFixed(4),
                                                                    ost1: AAGAOST1.toFixed(4),

                                                                    dc: AAGADC.toFixed(4),
                                                                    cc1: AAGACC1.toFixed(4),
                                                                    oct: AAGAOCT.toFixed(4),
                                                                    oc: AAGAOC.toFixed(4),
                                                                    rcel: AAGARCEL.toFixed(4),
                                                                    oct1: AAGAOCT1.toFixed(4),

                                                                    pc: AAGAPC.toFixed(4),

                                                                    cs: AAGACS,
                                                                    thkse: AAGATHKSE.toFixed(4),

                                                                    cc: AAGACC.toFixed(4),
                                                                    thkce: AAGATHKCE.toFixed(4),

                                                                    beta: AAGABETA.toFixed(4),
                                                                    beta1: AAGABETA1.toFixed(4),
                                                                    thk2: AAGATHK2.toFixed(4),
                                                                    thk1: AAGATHK1.toFixed(4),
                                                                    thkk: AAGATHKK.toFixed(4),
                                                                    thkp: AAGATHKP.toFixed(4),
                                                                    thkcc: AAGATHKCC.toFixed(4),
                                                                    thkcd: AAGATHKCD.toFixed(4),
                                                                    thkcchk: AAGATHKCCHK,

                                                                    thksc: AAGATHKSC.toFixed(4),
                                                                    thksd: AAGATHKSD.toFixed(4),
                                                                    thkschk: AAGATHKSCHK,

                                                                    pct: AAGAPCT.toFixed(4),
                                                                    pst: AAGAPST.toFixed(4),
                                                                    pt: AAGAPT.toFixed(4),

                                                                    pk: AAGAPK.toFixed(4),
                                                                    p2: AAGAP2.toFixed(4),
                                                                    pp: AAGAPP.toFixed(4),
                                                                    mawpc: AAGAMAWPC.toFixed(4),
                                                                    mawps: AAGAMAWPS.toFixed(4),
                                                                    mawp: AAGAMAWP.toFixed(4)
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
                                                                        AAGAPayJS.dialog({
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
                                                                                    AAGAPayJS.dialog("close");
                                                                                    AAGAPayJS.dialog("clear");
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
                                                                                                AAGAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        AAGAPayJS.dialog('close');
                                                                                                        AAGAPayJS.dialog('clear');
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