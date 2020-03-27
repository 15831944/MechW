$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bceeSketch = $("#d2");
    let bceeModel = $("#d3");
    let bceed2d3 = $('#d2d3');

    $("#cal").html("<table id='bcee'></table>");
    let pg = $("#bcee");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/e/e/BCEE.json", function (result) {

        let BCEEDT,
            BCEESCategory, BCEESCategoryVal, BCEESType, BCEESTypeVal, BCEESSTD, BCEESSTDVal, BCEESName, BCEESNameVal,
            BCEECCategory, BCEECCategoryVal, BCEECType, BCEECTypeVal, BCEECSTD, BCEECSTDVal, BCEECName, BCEECNameVal,
            columns, rows, ed;

        function bcee2d(dsi = "ϕDsi", thksn = "δsn", alpha = "α", thkcn = "δcn") {

            bceeSketch.empty();

            let width = bceeSketch.width();
            let height = bceeSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCEESVG").attr("height", height);

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
                ])).attr("id", "BCEBSketchDI").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#BCEBSketchDI").attr("startOffset", "50%").text(text);

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
            ])).attr("id", "BCEESketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEESketchDSI").attr("startOffset", "50%").text(dsi);

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
            ])).attr("id", "BCEESketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEESketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ).attr("id", "BCEESketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEESketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "BCEESketchTHKCN").classed("sketch", true).attr("transform", "rotate(" + (90 - rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEESketchTHKCN").attr("startOffset", "50%").text(thkcn);
        }

        currentTabIndex = bceed2d3.tabs('getTabIndex', bceed2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            bcee2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcee").length > 0) {
                    bcee2d();
                }
            });
        }
        bceed2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcee2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcee").length > 0) {
                            bcee2d();
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
                    $(ed.target).combobox("loadData", BCEESCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCEESType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCEESSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCEESName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCEECCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCEECType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCEECSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCEECName);
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
                    bceeSketch.empty();

                    // model
                    bceeModel.empty();

                    // sketch
                    currentTabIndex = bceed2d3.tabs('getTabIndex', bceed2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcee2d();
                        bceeSketch.off("resize").on("resize", function () {
                            if ($("#bcee").length > 0) {
                                bcee2d();
                            }
                        });
                    }
                    bceed2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcee2d();
                                bceeSketch.off("resize").on("resize", function () {
                                    if ($("#bcee").length > 0) {
                                        bcee2d();
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

                        BCEEDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCEESCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEESType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEESSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEESName = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCEECCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCEECType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCEECSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEECName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCEEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEESCategory = [];
                                BCEECCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCEEDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCEESCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCEECCategory[index] = {
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

                        BCEESCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEESType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEESSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEESName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEESCategoryVal,
                                temp: BCEEDT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEESType = [];
                                $(result).each(function (index, element) {
                                    BCEESType[index] = {
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

                        BCEESTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEESSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEESName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEESCategoryVal,
                                type: BCEESTypeVal,
                                temp: BCEEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEESSTD = [];
                                $(result).each(function (index, element) {
                                    BCEESSTD[index] = {
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

                        BCEESSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEESName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEESCategoryVal,
                                type: BCEESTypeVal,
                                std: BCEESSTDVal,
                                temp: BCEEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEESName = [];
                                $(result).each(function (index, element) {
                                    BCEESName[index] = {
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

                        BCEECCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCEECType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCEECSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEECName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEECCategoryVal,
                                temp: BCEEDT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEECType = [];
                                $(result).each(function (index, element) {
                                    BCEECType[index] = {
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

                        BCEECTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCEECSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEECName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEECCategoryVal,
                                type: BCEECTypeVal,
                                temp: BCEEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEECSTD = [];
                                $(result).each(function (index, element) {
                                    BCEECSTD[index] = {
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

                        BCEECSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEECName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEECCategoryVal,
                                type: BCEECTypeVal,
                                std: BCEECSTDVal,
                                temp: BCEEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEECName = [];
                                $(result).each(function (index, element) {
                                    BCEECName[index] = {
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
                        let BCEEPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCEEPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BCEEPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCEEPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCEETest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCEETest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 筒体材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCEESNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取筒体材料密度、最大最小厚度
                        let BCEEDS, BCEESThkMin, BCEESThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BCEESCategoryVal,
                                "type": BCEESTypeVal,
                                "std": BCEESSTDVal,
                                "name": BCEESNameVal,
                                "temp": BCEEDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BCEEDS = parseFloat(result.density);
                                BCEESThkMin = parseFloat(result.thkMin);
                                BCEESThkMax = parseFloat(result.thkMax);

                                // 筒体内直径
                                let BCEEDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    BCEEDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcee2d("ϕ" + BCEEDSI);
                                    bceeSketch.off("resize").on("resize", function () {
                                        if ($("#bcee").length > 0) {
                                            bcee2d("ϕ" + BCEEDSI);
                                        }
                                    });
                                }
                                bceed2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcee2d("ϕ" + BCEEDSI);
                                            bceeSketch.off("resize").on("resize", function () {
                                                if ($("#bcee").length > 0) {
                                                    bcee2d("ϕ" + BCEEDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 筒体名义厚度
                                let BCEETHKSN;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > BCEESThkMin
                                    && parseFloat(rows[9][columns[0][1].field]) <= BCEESThkMax) {
                                    BCEETHKSN = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) <= BCEESThkMin) {
                                    south.html("筒体材料厚度不能小于等于 " + BCEESThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > BCEESThkMax) {
                                    south.html("筒体材料厚度不能大于 " + BCEESThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bcee2d("ϕ" + BCEEDSI, BCEETHKSN);
                                    bceeSketch.off("resize").on("resize", function () {
                                        if ($("#bcee").length > 0) {
                                            bcee2d("ϕ" + BCEEDSI, BCEETHKSN);
                                        }
                                    });
                                }
                                bceed2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bcee2d("ϕ" + BCEEDSI, BCEETHKSN);
                                            bceeSketch.off("resize").on("resize", function () {
                                                if ($("#bcee").length > 0) {
                                                    bcee2d("ϕ" + BCEEDSI, BCEETHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCEEOST, BCEEOS, BCEERSEL, BCEECS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BCEESCategoryVal,
                                        "type": BCEESTypeVal,
                                        "std": BCEESSTDVal,
                                        "name": BCEESNameVal,
                                        "thk": BCEETHKSN,
                                        "temp": BCEEDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BCEEDSI + 2 * BCEETHKSN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BCEEOST = parseFloat(result.ot);
                                        if (BCEEOST < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEEOS = parseFloat(result.o);
                                        if (BCEEOS < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEERSEL = parseFloat(result.rel);
                                        if (BCEERSEL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEECS1 = parseFloat(result.c1);
                                        if (BCEECS1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        // 筒体焊接接头系数
                                        let BCEEES;
                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                            BCEEES = parseFloat(rows[10][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 筒体腐蚀裕量
                                        let BCEECS2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < BCEETHKSN) {
                                            BCEECS2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= BCEETHKSN) {
                                            south.html("筒体腐蚀裕量不能大于等于 " + BCEETHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 封头材料名称
                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                            BCEECNameVal = rows[15][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取封头材料密度、最大最小厚度
                                        let BCEEDC, BCEECThkMin, BCEECThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCEECCategoryVal,
                                                "type": BCEECTypeVal,
                                                "std": BCEECSTDVal,
                                                "name": BCEECNameVal,
                                                "temp": BCEEDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCEEDC = parseFloat(result.density);
                                                BCEECThkMin = parseFloat(result.thkMin);
                                                BCEECThkMax = parseFloat(result.thkMax);

                                                // 半顶角 alpha
                                                let BCEEALPHA;
                                                if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                    BCEEALPHA = parseFloat(rows[16][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bcee2d("ϕ" + BCEEDSI, BCEETHKSN, BCEEALPHA + "°");
                                                    bceeSketch.off("resize").on("resize", function () {
                                                        if ($("#bcee").length > 0) {
                                                            bcee2d("ϕ" + BCEEDSI, BCEETHKSN, BCEEALPHA + "°");
                                                        }
                                                    });
                                                }
                                                bceed2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bcee2d("ϕ" + BCEEDSI, BCEETHKSN, BCEEALPHA + "°");
                                                            bceeSketch.off("resize").on("resize", function () {
                                                                if ($("#bcee").length > 0) {
                                                                    bcee2d("ϕ" + BCEEDSI, BCEETHKSN, BCEEALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 封头名义厚度
                                                let BCEETHKCN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > BCEECThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= BCEECThkMax) {
                                                    BCEETHKCN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= BCEECThkMin) {
                                                    south.html("封头材料厚度不能小于等于 " + BCEECThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > BCEECThkMax) {
                                                    south.html("封头材料厚度不能大于 " + BCEECThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bcee2d("ϕ" + BCEEDSI, BCEETHKSN, BCEEALPHA + "°", BCEETHKCN);
                                                    bceeSketch.off("resize").on("resize", function () {
                                                        if ($("#bcee").length > 0) {
                                                            bcee2d("ϕ" + BCEEDSI, BCEETHKSN, BCEEALPHA + "°", BCEETHKCN);
                                                        }
                                                    });
                                                }
                                                bceed2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bcee2d("ϕ" + BCEEDSI, BCEETHKSN, BCEEALPHA + "°", BCEETHKCN);
                                                            bceeSketch.off("resize").on("resize", function () {
                                                                if ($("#bcee").length > 0) {
                                                                    bcee2d("ϕ" + BCEEDSI, BCEETHKSN, BCEEALPHA + "°", BCEETHKCN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BCEEOCT, BCEEOC, BCEERCEL, BCEECC1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCEECCategoryVal,
                                                        "type": BCEECTypeVal,
                                                        "std": BCEECSTDVal,
                                                        "name": BCEECNameVal,
                                                        "thk": BCEETHKCN,
                                                        "temp": BCEEDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BCEEDSI
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCEEOCT = parseFloat(result.ot);
                                                        if (BCEEOCT < 0) {
                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEEOC = parseFloat(result.o);
                                                        if (BCEEOC < 0) {
                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEERCEL = parseFloat(result.rel);
                                                        if (BCEERCEL < 0) {
                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEECC1 = parseFloat(result.c1);
                                                        if (BCEECC1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        // 封头焊接接头系数
                                                        let BCEEEC;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                            BCEEEC = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 封头腐蚀裕量
                                                        let BCEECC2;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) < BCEETHKCN) {
                                                            BCEECC2 = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) >= BCEETHKCN) {
                                                            south.html("封头腐蚀裕量不能大于等于 " + BCEETHKCN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 过程参数
                                                        let BCEEPC = BCEEPD + BCEEPS;
                                                        let BCEECS = BCEECS1 + BCEECS2;
                                                        let BCEETHKSE = BCEETHKSN - BCEECS;
                                                        let BCEECC = BCEECC1 + BCEECC2;
                                                        let BCEETHKCE = BCEETHKCN - BCEECC;

                                                        // 封头计算及校核
                                                        let BCEEBETA = 0.4 * Math.sqrt(BCEEDSI / BCEETHKSE)
                                                            * Math.tan(BCEEALPHA / 180 * Math.PI)
                                                            / (1 + Math.sqrt((1 + Math.pow(BCEETHKCE / BCEETHKSE, 2)) / (2 * Math.cos(BCEEALPHA / 180 * Math.PI)) * BCEETHKCE / BCEETHKSE))
                                                            - 0.25;
                                                        let BCEEBETA1 = Math.max(0.5, BCEEBETA);
                                                        let BCEETHK2 = BCEEPC * BCEEDSI * BCEEBETA1 / (2 * BCEEOST * BCEEES - BCEEPC) / Math.cos(BCEEALPHA / 180 * Math.PI);
                                                        let BCEETHK1 = BCEETHKCE * BCEETHK2 / BCEETHKSE;
                                                        let BCEETHKK = BCEEPC * BCEEDSI / (2 * BCEEOCT * BCEEEC - BCEEPC) / Math.cos(BCEEALPHA / 180 * Math.PI);
                                                        let BCEETHKP = 0.3 * BCEEDSI * BCEEALPHA / 90 * Math.sqrt(BCEEPC / (BCEEOCT * BCEEEC));
                                                        let BCEETHKCC = Math.min(Math.max(BCEETHKK, BCEETHK1), BCEETHKP);
                                                        let BCEETHKCD = BCEETHKCC + BCEECC2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "封头所需厚度：" + (BCEETHKCD + BCEECC1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BCEETHKCCHK;
                                                        if (BCEETHKCN >= (BCEETHKCD + BCEECC1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCEETHKCN + " mm" +
                                                                "</span>");
                                                            BCEETHKCCHK = "合格";
                                                        } else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCEETHKCN + " mm" +
                                                                "</span>");
                                                            BCEETHKCCHK = "不合格";
                                                        }

                                                        // 筒体计算及校核
                                                        let BCEETHKSC = BCEEPC * BCEEDSI / (2 * BCEEOST * BCEEES - BCEEPC);
                                                        let BCEETHKSD = BCEETHKSC + BCEECS2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "筒体所需厚度：" + (BCEETHKSD + BCEECS1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BCEETHKSCHK;
                                                        if (BCEETHKSN >= (BCEETHKSD + BCEECS1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCEETHKSN + " mm" +
                                                                "</span>");
                                                            BCEETHKSCHK = "合格";
                                                        } else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BCEETHKSN + " mm" +
                                                                "</span>");
                                                            BCEETHKSCHK = "不合格";
                                                        }

                                                        // 压力试验
                                                        let BCEEPCT, BCEEPST, BCEEPT;
                                                        if (BCEETest === "液压试验") {
                                                            BCEEPCT = Math.max(1.25 * BCEEPD * BCEEOC / BCEEOCT, 0.05);
                                                            BCEEPST = Math.max(1.25 * BCEEPD * BCEEOS / BCEEOST, 0.05);
                                                            BCEEPT = Math.min(BCEEPCT, BCEEPST);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BCEEPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (BCEETest === "气压试验") {
                                                            BCEEPCT = Math.max(1.10 * BCEEPD * BCEEOC / BCEEOCT, 0.05);
                                                            BCEEPST = Math.max(1.10 * BCEEPD * BCEEOS / BCEEOST, 0.05);
                                                            BCEEPT = Math.min(BCEEPCT, BCEEPST);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BCEEPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }

                                                        // MAWP
                                                        let BCEEPK = (2 * BCEEOCT * BCEEEC * BCEETHKCE) / (BCEEDSI / Math.cos(BCEEALPHA / 180 * Math.PI) + BCEETHKCE);
                                                        let BCEEP2 = (2 * BCEEOST * BCEEES * BCEETHKSE) / (BCEEDSI * BCEEBETA1 / Math.cos(BCEEALPHA / 180 * Math.PI) + BCEETHKSE);
                                                        let BCEEPP = BCEEOCT * BCEEEC * Math.pow(BCEETHKCE * 90 / (0.3 * BCEEDSI * BCEEALPHA), 2);
                                                        let BCEEMAWPC = Math.max(Math.min(BCEEPK, BCEEP2), BCEEPP) - BCEEPS;
                                                        let BCEEMAWPS = (2 * BCEEOST * BCEEES * BCEETHKSE) / (BCEEDSI + BCEETHKSE) - BCEEPS;
                                                        let BCEEMAWP = Math.min(BCEEMAWPC, BCEEMAWPS);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "MAWP：" + BCEEMAWP.toFixed(4) + " MPa" +
                                                            "</span>");

                                                        // docx
                                                        let BCEEPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "bceedocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "BCEE",

                                                                    pd: BCEEPD,
                                                                    t: BCEEDT,
                                                                    ps: BCEEPS,

                                                                    stds: BCEESSTDVal,
                                                                    names: BCEESNameVal,
                                                                    dsi: BCEEDSI,
                                                                    thksn: BCEETHKSN,
                                                                    es: BCEEES,
                                                                    cs2: BCEECS2,

                                                                    stdc: BCEECSTDVal,
                                                                    namec: BCEECNameVal,
                                                                    alpha: BCEEALPHA,
                                                                    thkcn: BCEETHKCN,
                                                                    cc2: BCEECC2,
                                                                    ec: BCEEEC,

                                                                    test: BCEETest,

                                                                    ds: BCEEDS.toFixed(4),
                                                                    cs1: BCEECS1.toFixed(4),
                                                                    ost: BCEEOST.toFixed(4),
                                                                    os: BCEEOS.toFixed(4),
                                                                    rsel: BCEERSEL.toFixed(4),

                                                                    dc: BCEEDC.toFixed(4),
                                                                    cc1: BCEECC1.toFixed(4),
                                                                    oct: BCEEOCT.toFixed(4),
                                                                    oc: BCEEOC.toFixed(4),
                                                                    rcel: BCEERCEL.toFixed(4),

                                                                    pc: BCEEPC.toFixed(4),

                                                                    cs: BCEECS,
                                                                    thkse: BCEETHKSE.toFixed(4),

                                                                    cc: BCEECC.toFixed(4),
                                                                    thkce: BCEETHKCE.toFixed(4),

                                                                    beta: BCEEBETA.toFixed(4),
                                                                    beta1: BCEEBETA1.toFixed(4),
                                                                    thk2: BCEETHK2.toFixed(4),
                                                                    thk1: BCEETHK1.toFixed(4),
                                                                    thkk: BCEETHKK.toFixed(4),
                                                                    thkp: BCEETHKP.toFixed(4),
                                                                    thkcc: BCEETHKCC.toFixed(4),
                                                                    thkcd: BCEETHKCD.toFixed(4),
                                                                    thkcchk: BCEETHKCCHK,

                                                                    thksc: BCEETHKSC.toFixed(4),
                                                                    thksd: BCEETHKSD.toFixed(4),
                                                                    thkschk: BCEETHKSCHK,

                                                                    pct: BCEEPCT.toFixed(4),
                                                                    pst: BCEEPST.toFixed(4),
                                                                    pt: BCEEPT.toFixed(4),

                                                                    pk: BCEEPK.toFixed(4),
                                                                    p2: BCEEP2.toFixed(4),
                                                                    pp: BCEEPP.toFixed(4),
                                                                    mawpc: BCEEMAWPC.toFixed(4),
                                                                    mawps: BCEEMAWPS.toFixed(4),
                                                                    mawp: BCEEMAWP.toFixed(4)
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
                                                                        BCEEPayJS.dialog({
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
                                                                                    BCEEPayJS.dialog("close");
                                                                                    BCEEPayJS.dialog("clear");
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
                                                                                                BCEEPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        BCEEPayJS.dialog('close');
                                                                                                        BCEEPayJS.dialog('clear');
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