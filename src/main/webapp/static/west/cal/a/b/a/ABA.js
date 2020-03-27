$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let abaSketch = $("#d2");
    let abaModel = $("#d3");
    let abad2d3 = $('#d2d3');

    $("#cal").html("<table id='aba'></table>");
    let pg = $("#aba");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/b/a/ABA.json", function (result) {

        let ABADT,
            ABACCategory, ABACCategoryVal, ABACType, ABACTypeVal, ABACSTD, ABACSTDVal, ABACName, ABACNameVal,
            columns, rows, ed;

        function aba2d(dsi = "ϕDsi", alpha = "α", thkcn = "δcn") {

            abaSketch.empty();

            let width = abaSketch.width();
            let height = abaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ABASVG").attr("height", height);

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

            let padding = 60;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 10;

            // 筒体
            drawLine(padding + wg, padding + 2 * hg, padding + wg, padding + 2 * hg + 3 * thk);
            drawLine(padding + wg - thk, padding + 2 * hg, padding + wg - thk, padding + 2 * hg + 3 * thk);
            drawCenterLine(padding + wg - thk, padding + 2 * hg, width / 2, padding + 2 * hg);
            drawLine(padding + wg - thk, padding + 2 * hg + 3 * thk, padding + 3 * wg + thk, padding + 2 * hg + 3 * thk);

            // dsi
            dimBottomH(padding + wg, padding + 2 * hg + 3 * thk, padding + 3 * wg, padding + 2 * hg + 3 * thk, dsi, "ABASketchDSI");

            // thkcn
            extLineBottomV(padding + wg - thk, padding + 2 * hg + 3 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk, y: padding + 2 * hg + 3 * thk + 30},
                    {x: padding + wg - thk - 15, y: padding + 2 * hg + 3 * thk + 27},
                    {x: padding + wg - thk - 15, y: padding + 2 * hg + 3 * thk + 33},
                    {x: padding + wg - thk, y: padding + 2 * hg + 3 * thk + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 2 * hg + 3 * thk + 30},
                {x: padding + wg - thk, y: padding + 2 * hg + 3 * thk + 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 15 - 40, y: padding + 2 * hg + 3 * thk + 30},
                {x: padding + wg - thk - 15, y: padding + 2 * hg + 3 * thk + 30}
            ])).attr("id", "ABASketchTHKCN1").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ABASketchTHKCN1").attr("startOffset", "50%").text(thkcn);

            // 转角区
            let ang = 70 / 180 * Math.PI;
            let bri = 3 * thk;
            let bro = bri + thk;

            // 左侧
            svg.append("path").attr("d", "M "
                + (padding + wg) + " " + (height / 2) + " "
                + "A" + bri + " " + bri + " "
                + "1 0 1" + " "
                + (padding + wg + bri - bri * Math.cos(ang)) + " " + (height / 2 - bri * Math.sin(ang))
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (padding + wg - thk) + " " + (height / 2) + " "
                + "A" + bro + " " + bro + " "
                + "1 0 1" + " "
                + (padding + wg + bri - bro * Math.cos(ang)) + " " + (height / 2 - bro * Math.sin(ang))
            ).classed("sketch", true);

            let deltaX = 0.7 * wg - bri + bri * Math.cos(ang);
            let deltaY = deltaX / Math.tan(ang);
            drawLine(padding + wg + bri - bri * Math.cos(ang), height / 2 - bri * Math.sin(ang),
                padding + wg + bri - bri * Math.cos(ang) + deltaX, height / 2 - bri * Math.sin(ang) - deltaY);
            drawLine(padding + wg + bri - bro * Math.cos(ang), height / 2 - bro * Math.sin(ang),
                padding + wg + bri - bro * Math.cos(ang) + deltaX, height / 2 - bro * Math.sin(ang) - deltaY);

            // 右侧
            drawLine(padding + 3 * wg, padding + 2 * hg - bro - thk, padding + 3 * wg, padding + 2 * hg + 3 * thk);
            drawLine(padding + 3 * wg + thk, padding + 2 * hg - bro - thk, padding + 3 * wg + thk, padding + 2 * hg + 3 * thk);
            drawLine(padding + 3 * wg + thk, padding + 2 * hg - bro - thk, padding + 3 * wg, padding + 2 * hg - bro - thk);

            // 下侧
            drawLine(padding + 3 * wg - 0.7 * wg, height / 2 - bri * Math.sin(ang) - deltaY,
                padding + 3 * wg, height / 2 - bri * Math.sin(ang) - deltaY + 0.7 * wg / Math.tan(ang));
            drawLine(padding + 3 * wg - 0.7 * wg + thk * Math.cos(ang), height / 2 - bri * Math.sin(ang) - deltaY - thk * Math.sin(ang),
                padding + 3 * wg, height / 2 - bri * Math.sin(ang) - deltaY + 0.7 * wg / Math.tan(ang) - thk / Math.sin(ang));
            svg.append("path").attr("d", line([
                {x: padding + wg + bri - bri * Math.cos(ang) + deltaX, y: height / 2 - bri * Math.sin(ang) - deltaY},
                {x: padding + wg + bri - bro * Math.cos(ang) + deltaX, y: height / 2 - bro * Math.sin(ang) - deltaY},
                {
                    x: padding + 3 * wg - bri + bro * Math.cos(ang) - deltaX,
                    y: height / 2 - bro * Math.sin(ang) - deltaY
                },
                {
                    x: padding + 3 * wg - bri + bri * Math.cos(ang) - deltaX,
                    y: height / 2 - bri * Math.sin(ang) - deltaY
                },
                {x: padding + wg + bri - bri * Math.cos(ang) + deltaX, y: height / 2 - bri * Math.sin(ang) - deltaY}
            ])).classed("sketch", true);
            drawCenterLine(width / 2, height / 2 - bro * Math.sin(ang) - deltaY - 10, width / 2, height / 2 + 3 * thk + 10);

            // alpha
            let cr = 0.5 * wg / Math.sin(ang);
            let cx0 = width / 2;
            let cy0 = height / 2 - bri * Math.sin(ang) - deltaY - 0.3 * wg / Math.tan(ang);
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
                ])).attr("transform", "rotate(" + (ang / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", "M "
                + (cx0 - cr * Math.sin(ang)) + " " + (cy0 + cr * Math.cos(ang)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0) + " " + (cy0 + cr)
            ).attr("id", "ABASketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ABASketchALPHA").attr("startOffset", "50%").text(alpha);

            // thkcn2
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr + 3, y: cy0 + 15},
                    {x: cx0 + cr - 3, y: cy0 + 15},
                    {x: cx0 + cr, y: cy0}
                ])).attr("transform", "rotate(" + (90 - ang / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 - thk},
                    {x: cx0 + cr + 3, y: cy0 - thk - 15},
                    {x: cx0 + cr - 3, y: cy0 - thk - 15},
                    {x: cx0 + cr, y: cy0 - thk}
                ])).attr("transform", "rotate(" + (90 - ang / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 + 15 + 10},
                    {x: cx0 + cr, y: cy0 - thk}
                ])).attr("transform", "rotate(" + (90 - ang / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 - thk - 15},
                    {x: cx0 + cr, y: cy0 - thk - 15 - 40}
                ])).attr("id", "ABASketchTHKCN2").attr("transform", "rotate(" + (90 - ang / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ABASketchTHKCN2").attr("startOffset", "50%").text(thkcn);
        }

        currentTabIndex = abad2d3.tabs('getTabIndex', abad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aba2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aba").length > 0) {
                    aba2d();
                }
            });
        }
        abad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aba2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aba").length > 0) {
                            aba2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 大锥角(α≥70°)锥壳外压计算",
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

                if (index === 3) {
                    $(ed.target).combobox("loadData", ABACCategory);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", ABACType);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", ABACSTD);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ABACName);
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
                    abaSketch.empty();

                    // model
                    abaModel.empty();

                    // sketch
                    currentTabIndex = abad2d3.tabs('getTabIndex', abad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aba2d();
                        abaSketch.off("resize").on("resize", function () {
                            if ($("#aba").length > 0) {
                                aba2d();
                            }
                        });
                    }
                    abad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aba2d();
                                abaSketch.off("resize").on("resize", function () {
                                    if ($("#aba").length > 0) {
                                        aba2d();
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

                        ABADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        ABACCategory = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        ABACType = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ABACSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ABACName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ABACCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ABADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ABACCategory[index] = {
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
                    else if (index === 3) {

                        ABACCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        ABACType = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ABACSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ABACName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ABACCategoryVal,
                                temp: ABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ABACType = [];
                                $(result).each(function (index, element) {
                                    ABACType[index] = {
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
                    else if (index === 4) {

                        ABACTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ABACSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ABACName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ABACCategoryVal,
                                type: ABACTypeVal,
                                temp: ABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ABACSTD = [];
                                $(result).each(function (index, element) {
                                    ABACSTD[index] = {
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
                    else if (index === 5) {

                        ABACSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ABACName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ABACCategoryVal,
                                type: ABACTypeVal,
                                std: ABACSTDVal,
                                temp: ABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ABACName = [];
                                $(result).each(function (index, element) {
                                    ABACName[index] = {
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
                        let ABAPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            ABAPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let ABATest;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            ABATest = rows[2][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 封头材料名称
                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                            ABACNameVal = rows[6][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取封头材料密度、最大最小厚度
                        let ABADC, ABACThkMin, ABACThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": ABACCategoryVal,
                                "type": ABACTypeVal,
                                "std": ABACSTDVal,
                                "name": ABACNameVal,
                                "temp": ABADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                ABADC = parseFloat(result.density);
                                ABACThkMin = parseFloat(result.thkMin);
                                ABACThkMax = parseFloat(result.thkMax);

                                // 筒体内直径
                                let ABADSI;
                                if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                    ABADSI = parseFloat(rows[7][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aba2d("Φ" + ABADSI);
                                    abaSketch.off("resize").on("resize", function () {
                                        if ($("#aba").length > 0) {
                                            aba2d("Φ" + ABADSI);
                                        }
                                    });
                                }
                                abad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aba2d("Φ" + ABADSI);
                                            abaSketch.off("resize").on("resize", function () {
                                                if ($("#aba").length > 0) {
                                                    aba2d("Φ" + ABADSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 半顶角 alpha
                                let ABAALPHA;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    ABAALPHA = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aba2d("Φ" + ABADSI, ABAALPHA + "°");
                                    abaSketch.off("resize").on("resize", function () {
                                        if ($("#aba").length > 0) {
                                            aba2d("Φ" + ABADSI, ABAALPHA + "°");
                                        }
                                    });
                                }
                                abad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aba2d("Φ" + ABADSI, ABAALPHA + "°");
                                            abaSketch.off("resize").on("resize", function () {
                                                if ($("#aba").length > 0) {
                                                    aba2d("Φ" + ABADSI, ABAALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                // 封头名义厚度
                                let ABATHKCN;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > ABACThkMin
                                    && parseFloat(rows[9][columns[0][1].field]) <= ABACThkMax) {
                                    ABATHKCN = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) <= ABACThkMin) {
                                    south.html("封头材料厚度不能小于等于 " + ABACThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) > ABACThkMax) {
                                    south.html("封头材料厚度不能大于 " + ABACThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aba2d("Φ" + ABADSI, ABAALPHA + "°", ABATHKCN);
                                    abaSketch.off("resize").on("resize", function () {
                                        if ($("#aba").length > 0) {
                                            aba2d("Φ" + ABADSI, ABAALPHA + "°", ABATHKCN);
                                        }
                                    });
                                }
                                abad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aba2d("Φ" + ABADSI, ABAALPHA + "°", ABATHKCN);
                                            abaSketch.off("resize").on("resize", function () {
                                                if ($("#aba").length > 0) {
                                                    aba2d("Φ" + ABADSI, ABAALPHA + "°", ABATHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let ABAOCT, ABACC1, ABAECT;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_e_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": ABACCategoryVal,
                                        "type": ABACTypeVal,
                                        "std": ABACSTDVal,
                                        "name": ABACNameVal,
                                        "thk": ABATHKCN,
                                        "temp": ABADT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": ABADSI + 2 * ABATHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        // 设计应力
                                        ABAOCT = parseFloat(result.ot);
                                        if (ABAOCT < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        ABAECT = 1000 * parseFloat(result.et);
                                        if (ABAECT < 0) {
                                            south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                            return false;
                                        }
                                        ABACC1 = parseFloat(result.c1);
                                        if (ABACC1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        // 封头焊接接头系数
                                        let ABAEC;
                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                            ABAEC = parseFloat(rows[10][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 封头腐蚀裕量
                                        let ABACC2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < ABATHKCN) {
                                            ABACC2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= ABATHKCN) {
                                            south.html("封头腐蚀裕量不能大于等于 " + ABATHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 过程参数
                                        let ABACC = ABACC1 + ABACC2;
                                        let ABATHKCE = ABATHKCN - ABACC;

                                        // 外压计算及校核
                                        let ABAGAMMA = ABADSI / (2 * ABATHKCE * Math.cos(ABAALPHA / 180 * Math.PI));
                                        let ABAK = Math.min(0.36, Math.max((0.1 * ABAGAMMA + 5) / (ABAGAMMA - 4), 0.12));
                                        let ABANY = 3.0;
                                        let ABAPE = 4 * ABAECT * ABAK / ABANY * Math.pow(ABATHKCE / ABADSI, 2) * Math.pow(Math.cos(ABAALPHA / 180 * Math.PI), 2);
                                        let ABAPH = 2 * ABAOCT * ABAEC * ABATHKCE / (ABADSI / Math.cos(ABAALPHA / 180 * Math.PI) + ABATHKCE);
                                        let ABAP = ABAPH / Math.sqrt(1 + Math.pow(ABAPH / ABAPE, 2));
                                        south.html(
                                            "<span style='color:#444444;'>" +
                                            "封头设计外压：" + ABAPD + " MPa" +
                                            "</span>");
                                        let ABAPCHK;
                                        if (ABAP >= ABAPD) {
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "实际许用外压：" + ABAP.toFixed(4) + " MPa" +
                                                "</span>");
                                            ABAPCHK = "合格";
                                        }
                                        else {
                                            south.append(
                                                "<span style='color:red;'>" +
                                                "&ensp;|&ensp;" +
                                                "实际许用外压：" + ABAP.toFixed(4) + " MPa" +
                                                "</span>");
                                            ABAPCHK = "不合格";
                                        }

                                        // 压力试验
                                        let ABAPCT;
                                        if (ABATest === "液压试验") {
                                            ABAPCT = 1.25 * ABAPD;
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "试压类型：液压" +
                                                "&ensp;|&ensp;" +
                                                "试验压力：" + ABAPCT.toFixed(4) + " MPa" +
                                                "</span>");
                                        }
                                        else if (ABATest === "气压试验") {
                                            ABAPCT = 1.1 * ABAPD;
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "试压类型：气压" +
                                                "&ensp;|&ensp;" +
                                                "试验压力：" + ABAPCT.toFixed(4) + " MPa" +
                                                "</span>");
                                        }

                                        // docx
                                        let ABAPayJS = $('#payjs');

                                        function getDocx() {
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "abadocx.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    ribbonName: "ABA",

                                                    pd: ABAPD,
                                                    t: ABADT,

                                                    stdc: ABACSTDVal,
                                                    namec: ABACNameVal,
                                                    dsi: ABADSI,
                                                    alpha: ABAALPHA,
                                                    thkcn: ABATHKCN,
                                                    cc2: ABACC2,
                                                    ec: ABAEC,

                                                    test: ABATest,

                                                    dc: ABADC.toFixed(4),
                                                    cc1: ABACC1.toFixed(4),
                                                    oct: ABAOCT.toFixed(4),
                                                    ect: (ABAECT / 1000).toFixed(4),

                                                    cc: ABACC.toFixed(4),
                                                    thkce: ABATHKCE.toFixed(4),

                                                    gamma: ABAGAMMA.toFixed(4),
                                                    k: ABAK.toFixed(4),
                                                    ny: ABANY.toFixed(4),
                                                    pe: ABAPE.toFixed(4),
                                                    ph: ABAPH.toFixed(4),
                                                    p: ABAP.toFixed(4),
                                                    pchk: ABAPCHK,

                                                    pct: ABAPCT.toFixed(4)
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
                                                        ABAPayJS.dialog({
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
                                                                    ABAPayJS.dialog("close");
                                                                    ABAPayJS.dialog("clear");
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
                                                                                ABAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                // 倒计时计数器
                                                                                let maxTime = 4, timer;

                                                                                function CountDown() {
                                                                                    if (maxTime >= 0) {
                                                                                        $("#payjs_timer").html(maxTime);
                                                                                        --maxTime;
                                                                                    } else {

                                                                                        clearInterval(timer);
                                                                                        // 关闭并清空收银台
                                                                                        ABAPayJS.dialog('close');
                                                                                        ABAPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});