$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcccd2 = $("#d2");
    let bcccd3 = $("#d3");
    let bcccd2d3 = $('#d2d3');

    $("#cal").html("<table id='bccc'></table>");
    let pg = $("#bccc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/c/c/BCCC.json", function (result) {

        // 设计温度
        let BCCCDT;

        // 许用压缩应力
        let BCCCOTCR = -1;

        // 材料
        let BCCCSCategory, BCCCSCategoryVal, BCCCSType, BCCCSTypeVal, BCCCSSTD, BCCCSSTDVal, BCCCSName,
            BCCCCCategory, BCCCCCategoryVal, BCCCCType, BCCCCTypeVal, BCCCCSTD, BCCCCSTDVal, BCCCCName,
            BCCCRCategory, BCCCRCategoryVal, BCCCRType, BCCCRTypeVal, BCCCRSTD, BCCCRSTDVal, BCCCRName;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function bccc2d(di = "ϕDi", thksn = "δsn", ri = "Ri", thkcn = "δcn", thkrn = "δrn", wr = "Wr") {

            bcccd2.empty();

            let width = bcccd2.width();
            let height = bcccd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCCCSVG")
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
            let padding = 120;
            let thickness = 10;

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
                ])).attr("id", "BCCCSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCCCSketchDI").attr("startOffset", "50%").text(text);

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

            // 画圆弧/椭圆弧
            function drawArc(radiusX, radiusY, startX, startY, endX, endY) {
                svg.append("path").attr("d", "M "
                    + startX + " " + startY + " "
                    + "A" + radiusX + " " + radiusY + " "
                    + "1 0 1" + " "
                    + endX + " " + endY
                ).classed("sketch", true);
            }

            // 筒体轮廓,内壁对应的是 padding 框
            drawLine(padding, height - padding, width - padding, height - padding);
            drawLine(padding, padding, width - padding, padding);
            drawLine(padding, padding - thickness, padding, height - padding + thickness);
            drawLine(width - padding, padding - thickness, width - padding, height - padding + thickness);
            drawLine(padding, padding - thickness, width - padding, padding - thickness);
            drawLine(padding, height - padding + thickness, width - padding, height - padding + thickness);

            // 封头轮廓
            let BCCCRI = height - 2 * padding;
            let BCCCRM = height - 2 * padding + thickness;
            let BCCCRO = height - 2 * padding + 2 * thickness;

            let centerX = width - padding - BCCCRO;
            let centerY = height / 2;

            // 内壁
            let innerArcTopX = centerX + BCCCRI * Math.cos(Math.PI / 6);
            let innerArcTopY = padding;
            let innerArcBottomX = centerX + BCCCRI * Math.cos(Math.PI / 6);
            let innerArcBottomY = height - padding;
            drawArc(BCCCRI, BCCCRI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);

            // 球冠区外壁
            let midArcStartX = centerX + BCCCRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcStartY = centerY - BCCCRM * Math.sin(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            let midArcEndX = centerX + BCCCRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcEndY = centerY + BCCCRM * Math.sin(Math.PI / 6) - thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            drawArc(BCCCRM, BCCCRM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);

            // 中心线
            drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
            drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);

            // 筒体内直径
            dimLeftV(padding + 100, height - padding, padding + 100, padding, di, "BCCCSketchSDI");

            // 筒体厚度
            drawLine(padding + 70, padding - thickness, padding + 70, padding);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 70, y: padding - thickness},
                    {x: padding + 70 - 3, y: padding - thickness - 15},
                    {x: padding + 70 + 3, y: padding - thickness - 15},
                    {x: padding + 70, y: padding - thickness}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 70, y: padding - thickness - 15},
                {x: padding + 70, y: padding - thickness - 15 - 40}
            ])).attr("id", "BCCCSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCCSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 封头球冠区
            // ri
            let ang = 4;
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY},
                {x: width - padding - 2 * thickness - 15, y: centerY}
            ])).attr("id", "BCCCSketchRi").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCCSketchRi").attr("startOffset", "50%").text(ri);

            // thkcn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - 2 * thickness, y: centerY},
                    {x: width - padding - 2 * thickness - 15, y: centerY - 3},
                    {x: width - padding - 2 * thickness - 15, y: centerY + 3},
                    {x: width - padding - 2 * thickness, y: centerY}
                ]))
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: width - padding - 2 * thickness, y: centerY},
                {x: width - padding - thickness, y: centerY}
            ])).classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - thickness, y: centerY},
                    {x: width - padding - thickness + 15, y: centerY - 3},
                    {x: width - padding - thickness + 15, y: centerY + 3},
                    {x: width - padding - thickness, y: centerY}
                ]))
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: width - padding - thickness + 15, y: centerY},
                {x: width - padding - thickness + 60, y: centerY}
            ])).attr("id", "BCCCSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCCSketchTHKCN").attr("startOffset", "50%").text(thkcn);

            // 上部扁钢
            let b1x = innerArcTopX, b1y = padding - thickness, b2x = midArcStartX, b2y = padding - thickness;
            let bh = 3 * (b2x - b1x);
            drawLine(b1x, b1y, b1x, b1y - bh);
            drawLine(b2x, b1y, b2x, b1y - bh);
            drawLine(b1x, b1y - bh, b2x, b1y - bh);

            // wr
            drawLine(b1x - 40, b1y - bh, b1x - 3, b1y - bh);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: b1x - 30, y: b1y - bh},
                    {x: b1x - 30 - 3, y: b1y - bh - 15},
                    {x: b1x - 30 + 3, y: b1y - bh - 15},
                    {x: b1x - 30, y: b1y - bh}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: b1x - 30, y: b1y},
                    {x: b1x - 30 - 3, y: b1y + 15},
                    {x: b1x - 30 + 3, y: b1y + 15},
                    {x: b1x - 30, y: b1y}
                ]));
            svg.append("path").attr("d", line([
                {x: b1x - 30, y: b1y + 15 + 10},
                {x: b1x - 30, y: b1y - bh - 15 - 10}
            ])).attr("id", "BCCCSketchWR").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCCSketchWR").attr("startOffset", "50%").text(wr);

            // 下部扁钢
            let b3x = innerArcTopX, b3y = height - padding + thickness, b4x = midArcStartX,
                b4y = height - padding + thickness;
            drawLine(b3x, b3y, b3x, b3y + bh);
            drawLine(b4x, b4y, b4x, b4y + bh);
            drawLine(b3x, b3y + bh, b4x, b3y + bh);

            // thkrn
            drawLine(b3x, b3y + bh + 3, b3x, b3y + bh + 40);
            drawLine(b4x, b4y + bh + 3, b4x, b4y + bh + 40);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: b3x, y: b3y + bh + 30},
                    {x: b3x - 15, y: b3y + bh + 30 - 3},
                    {x: b3x - 15, y: b3y + bh + 30 + 3},
                    {x: b3x, y: b3y + bh + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: b4x, y: b3y + bh + 30},
                    {x: b4x + 15, y: b3y + bh + 30 - 3},
                    {x: b4x + 15, y: b3y + bh + 30 + 3},
                    {x: b4x, y: b3y + bh + 30}
                ]));
            drawLine(b3x, b3y + bh + 30, b4x + 15 + 10, b3y + bh + 30);
            svg.append("path").attr("d", line([
                {x: b3x - 15 - 40, y: b3y + bh + 30},
                {x: b3x - 15, y: b3y + bh + 30}
            ])).attr("id", "BCCCSketchTHKRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCCSketchTHKRN").attr("startOffset", "50%").text(thkrn);

        }

        currentTabIndex = bcccd2d3.tabs('getTabIndex', bcccd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bccc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bccc").length > 0) {
                    bccc2d();
                }
            });
        }
        bcccd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bccc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bccc").length > 0) {
                            bccc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 球冠端封头内压计算",
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
                    $(ed.target).combobox("loadData", BCCCSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCCCSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCCCSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCCCSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCCCCCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCCCCType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCCCCSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCCCCName);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BCCCRCategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BCCCRType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BCCCRSTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BCCCRName);
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
                    bcccd2.empty();

                    // model
                    bcccd3.empty();

                    // sketch
                    currentTabIndex = bcccd2d3.tabs('getTabIndex', bcccd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bccc2d();
                        bcccd2.off("resize").on("resize", function () {
                            if ($("#bccc").length > 0) {
                                bccc2d();
                            }
                        });
                    }
                    bcccd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bccc2d();
                                bcccd2.off("resize").on("resize", function () {
                                    if ($("#bccc").length > 0) {
                                        bccc2d();
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

                        BCCCDT = parseFloat(changes.value);

                        if (BCCCDT <= 100) {
                            BCCCOTCR = 103;
                        }
                        else if (BCCCDT > 100 && BCCCDT <= 200) {
                            BCCCOTCR = 100;
                        }
                        else if (BCCCDT > 200 && BCCCDT <= 250) {
                            BCCCOTCR = 95;
                        }
                        else if (BCCCDT > 250 && BCCCDT <= 350) {
                            BCCCOTCR = 80;
                        }

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCCCSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCCCSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCCSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCCCCCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCCCCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCCCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCCCName = null;

                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BCCCRCategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCCCRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCCCRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCCCRName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCSCategory = [];
                                BCCCCCategory = [];
                                BCCCRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCCCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCCCSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCCCCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCCCRCategory[index] = {
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

                        BCCCSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCCCSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCCSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCSCategoryVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCSType = [];
                                $(result).each(function (index, element) {
                                    BCCCSType[index] = {
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

                        BCCCSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCCSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCSCategoryVal,
                                type: BCCCSTypeVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCSSTD = [];
                                $(result).each(function (index, element) {
                                    BCCCSSTD[index] = {
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

                        BCCCSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCCSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCSCategoryVal,
                                type: BCCCSTypeVal,
                                std: BCCCSSTDVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCSName = [];
                                $(result).each(function (index, element) {
                                    BCCCSName[index] = {
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

                        BCCCCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCCCCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCCCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCCCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCCCategoryVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCCType = [];
                                $(result).each(function (index, element) {
                                    BCCCCType[index] = {
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

                        BCCCCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCCCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCCCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCCCategoryVal,
                                type: BCCCCTypeVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCCSTD = [];
                                $(result).each(function (index, element) {
                                    BCCCCSTD[index] = {
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

                        BCCCCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCCCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCCCategoryVal,
                                type: BCCCCTypeVal,
                                std: BCCCCSTDVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCCName = [];
                                $(result).each(function (index, element) {
                                    BCCCCName[index] = {
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

                        BCCCRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCCCRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCCCRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCCCRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCRCategoryVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCRType = [];
                                $(result).each(function (index, element) {
                                    BCCCRType[index] = {
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

                        BCCCRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCCCRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCCCRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCRCategoryVal,
                                type: BCCCRTypeVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCRSTD = [];
                                $(result).each(function (index, element) {
                                    BCCCRSTD[index] = {
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

                        BCCCRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCCCRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCCRCategoryVal,
                                type: BCCCRTypeVal,
                                std: BCCCRSTDVal,
                                temp: BCCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCCRName = [];
                                $(result).each(function (index, element) {
                                    BCCCRName[index] = {
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
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            let BCCCPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCCCPS = parseFloat(rows[2][columns[0][1].field]);

                                // 计算压力
                                let BCCCPC = BCCCPD + BCCCPS;

                                // 试验类型
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCCCTest = rows[3][columns[0][1].field];

                                    // 筒体材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let BCCCSNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取筒体材料密度、最大最小厚度
                                        let BCCCDS, BCCCSThkMin, BCCCSThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCCCSCategoryVal,
                                                "type": BCCCSTypeVal,
                                                "std": BCCCSSTDVal,
                                                "name": BCCCSNameVal,
                                                "temp": BCCCDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCCCDS = parseFloat(result.density);
                                                BCCCSThkMin = parseFloat(result.thkMin);
                                                BCCCSThkMax = parseFloat(result.thkMax);

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let BCCCSDI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bccc2d("Φ" + BCCCSDI);
                                                        bcccd2.off("resize").on("resize", function () {
                                                            if ($("#bccc").length > 0) {
                                                                bccc2d("Φ" + BCCCSDI);
                                                            }
                                                        });
                                                    }
                                                    bcccd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bccc2d("Φ" + BCCCSDI);
                                                                bcccd2.off("resize").on("resize", function () {
                                                                    if ($("#bccc").length > 0) {
                                                                        bccc2d("Φ" + BCCCSDI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCCCSThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCCCSThkMax) {
                                                        let BCCCTHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bccc2d("Φ" + BCCCSDI, BCCCTHKSN);
                                                            bcccd2.off("resize").on("resize", function () {
                                                                if ($("#bccc").length > 0) {
                                                                    bccc2d("Φ" + BCCCSDI, BCCCTHKSN);
                                                                }
                                                            });
                                                        }
                                                        bcccd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bccc2d("Φ" + BCCCSDI, BCCCTHKSN);
                                                                    bcccd2.off("resize").on("resize", function () {
                                                                        if ($("#bccc").length > 0) {
                                                                            bccc2d("Φ" + BCCCSDI, BCCCTHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BCCCSDO = BCCCSDI + 2 * BCCCTHKSN;

                                                        let BCCCOST, BCCCOS, BCCCRSREL, BCCCCS1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCCCSCategoryVal,
                                                                "type": BCCCSTypeVal,
                                                                "std": BCCCSSTDVal,
                                                                "name": BCCCSNameVal,
                                                                "thk": BCCCTHKSN,
                                                                "temp": BCCCDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": BCCCSDO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCCCOST = parseFloat(result.ot);
                                                                if (BCCCOST < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCCOS = parseFloat(result.o);
                                                                if (BCCCOS < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCCRSREL = parseFloat(result.rel);
                                                                if (BCCCRSREL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCCCS1 = parseFloat(result.c1);
                                                                if (BCCCCS1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < BCCCTHKSN) {
                                                                    let BCCCCS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体焊接接头系数
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let BCCCES = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量C
                                                                        let BCCCCS = BCCCCS1 + BCCCCS2;

                                                                        // 筒体有效厚度
                                                                        let BCCCTHKSE = BCCCTHKSN - BCCCCS;

                                                                        // 筒体计算厚度
                                                                        let BCCCTHKSC = BCCCPC * BCCCSDI / (2 * BCCCOST * BCCCES);

                                                                        // 筒体设计厚度
                                                                        let BCCCTHKSD = BCCCTHKSC + BCCCCS2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "筒体所需厚度：" + (BCCCTHKSD + BCCCCS1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 筒体厚度校核
                                                                        let BCCCTHKSCHK;
                                                                        if (BCCCTHKSN >= (BCCCTHKSD + BCCCCS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCCCTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCCCTHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCCCTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCCCTHKSCHK = "不合格";
                                                                        }

                                                                        // 封头材料名称
                                                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                            let BCCCCNameVal = rows[15][columns[0][1].field];

                                                                            // AJAX 获取封头材料密度、最大最小厚度
                                                                            let BCCCDC, BCCCCThkMin, BCCCCThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BCCCCCategoryVal,
                                                                                    "type": BCCCCTypeVal,
                                                                                    "std": BCCCCSTDVal,
                                                                                    "name": BCCCCNameVal,
                                                                                    "temp": BCCCDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BCCCDC = parseFloat(result.density);
                                                                                    BCCCCThkMin = parseFloat(result.thkMin);
                                                                                    BCCCCThkMax = parseFloat(result.thkMax);

                                                                                    // 封头内半径
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                        && parseFloat(rows[16][columns[0][1].field]) >= 0.5 * BCCCSDI) {
                                                                                        let BCCCCRI = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI);
                                                                                            bcccd2.off("resize").on("resize", function () {
                                                                                                if ($("#bccc").length > 0) {
                                                                                                    bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        bcccd2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI);
                                                                                                    bcccd2.off("resize").on("resize", function () {
                                                                                                        if ($("#bccc").length > 0) {
                                                                                                            bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // 球壳切线与圆筒壁夹角 alpha(弧度)
                                                                                        let BCCCALPHA = Math.acos(BCCCSDI / (2 * BCCCCRI));

                                                                                        // 度数
                                                                                        let BCCCDEGREE = BCCCALPHA / Math.PI * 180;

                                                                                        // 封头名义厚度
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) > BCCCCThkMin
                                                                                            && parseFloat(rows[17][columns[0][1].field]) <= BCCCCThkMax) {
                                                                                            let BCCCTHKCN = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN);
                                                                                                bcccd2.off("resize").on("resize", function () {
                                                                                                    if ($("#bccc").length > 0) {
                                                                                                        bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            bcccd2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN);
                                                                                                        bcccd2.off("resize").on("resize", function () {
                                                                                                            if ($("#bccc").length > 0) {
                                                                                                                bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            let BCCCCRO = BCCCCRI + BCCCTHKCN;

                                                                                            let BCCCOCT, BCCCOC,
                                                                                                BCCCRCREL, BCCCCC1;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BCCCCCategoryVal,
                                                                                                    "type": BCCCCTypeVal,
                                                                                                    "std": BCCCCSTDVal,
                                                                                                    "name": BCCCCNameVal,
                                                                                                    "thk": BCCCTHKCN,
                                                                                                    "temp": BCCCDT,
                                                                                                    "highLow": 3,
                                                                                                    "isTube": 0,
                                                                                                    "od": BCCCCRO * 2
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BCCCOCT = parseFloat(result.ot);
                                                                                                    if (BCCCOCT < 0) {
                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCCCOC = parseFloat(result.o);
                                                                                                    if (BCCCOC < 0) {
                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCCCRCREL = parseFloat(result.rel);
                                                                                                    if (BCCCRCREL < 0) {
                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCCCCC1 = parseFloat(result.c1);
                                                                                                    if (BCCCCC1 < 0) {
                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 封头腐蚀裕量
                                                                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) < BCCCTHKCN) {
                                                                                                        let BCCCCC2 = parseFloat(rows[18][columns[0][1].field]);

                                                                                                        // 封头厚度附加量
                                                                                                        let BCCCCC = BCCCCC1 + BCCCCC2;

                                                                                                        // 封头有效厚度
                                                                                                        let BCCCTHKCE = BCCCTHKCN - BCCCCC;

                                                                                                        // 封头焊接接头系数
                                                                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                                                                            let BCCCEC = parseFloat(rows[19][columns[0][1].field]);

                                                                                                            // 封头计算厚度
                                                                                                            let BCCCTHKCC = BCCCPC * BCCCSDI / (2 * BCCCOCT * BCCCEC);

                                                                                                            // 设计厚度
                                                                                                            let BCCCTHKCD = BCCCTHKCC + BCCCCC2;

                                                                                                            // 所需厚度提示信息
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "封头所需厚度：" + (BCCCTHKCD + BCCCCC1).toFixed(2) + " mm" +
                                                                                                                "</span>");

                                                                                                            // 封头厚度校核
                                                                                                            let BCCCTHKCCHK;
                                                                                                            if (BCCCTHKCN >= (BCCCTHKCD + BCCCCC1).toFixed(2)) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BCCCTHKCN + " mm" +
                                                                                                                    "</span>");
                                                                                                                BCCCTHKCCHK = "合格";
                                                                                                            } else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BCCCTHKCN + " mm" +
                                                                                                                    "</span>");
                                                                                                                BCCCTHKCCHK = "不合格";
                                                                                                            }

                                                                                                            // 扁钢材料名称
                                                                                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                                                                                let BCCCRNameVal = rows[23][columns[0][1].field];

                                                                                                                // AJAX 获取扁钢材料密度、最大最小厚度
                                                                                                                let BCCCDR,
                                                                                                                    BCCCRThkMin,
                                                                                                                    BCCCRThkMax;
                                                                                                                $.ajax({
                                                                                                                    type: "POST",
                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                                    async: true,
                                                                                                                    dataType: "json",
                                                                                                                    data: JSON.stringify({
                                                                                                                        "category": BCCCRCategoryVal,
                                                                                                                        "type": BCCCRTypeVal,
                                                                                                                        "std": BCCCRSTDVal,
                                                                                                                        "name": BCCCRNameVal,
                                                                                                                        "temp": BCCCDT
                                                                                                                    }),
                                                                                                                    beforeSend: function () {
                                                                                                                    },
                                                                                                                    success: function (result) {

                                                                                                                        BCCCDR = parseFloat(result.density);
                                                                                                                        BCCCRThkMin = parseFloat(result.thkMin);
                                                                                                                        BCCCRThkMax = parseFloat(result.thkMax);

                                                                                                                        // 扁钢名义厚度
                                                                                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) > BCCCRThkMin
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) <= BCCCRThkMax) {
                                                                                                                            let BCCCTHKRN = parseFloat(rows[24][columns[0][1].field]);

                                                                                                                            // Sketch
                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN, BCCCTHKRN);
                                                                                                                                bcccd2.off("resize").on("resize", function () {
                                                                                                                                    if ($("#bccc").length > 0) {
                                                                                                                                        bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN, BCCCTHKRN);
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            }
                                                                                                                            bcccd2d3.tabs({
                                                                                                                                onSelect: function (title, index) {
                                                                                                                                    if (index === 0) {
                                                                                                                                        bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN, BCCCTHKRN);
                                                                                                                                        bcccd2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bccc").length > 0) {
                                                                                                                                                bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN, BCCCTHKRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            });

                                                                                                                            let BCCCORT,
                                                                                                                                BCCCOR,
                                                                                                                                BCCCRRREL,
                                                                                                                                BCCCCR1;
                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "category": BCCCRCategoryVal,
                                                                                                                                    "type": BCCCRTypeVal,
                                                                                                                                    "std": BCCCRSTDVal,
                                                                                                                                    "name": BCCCRNameVal,
                                                                                                                                    "thk": BCCCTHKRN,
                                                                                                                                    "temp": BCCCDT,
                                                                                                                                    "highLow": 3,
                                                                                                                                    "isTube": 0,
                                                                                                                                    "od": 100000
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    BCCCORT = parseFloat(result.ot);
                                                                                                                                    if (BCCCORT < 0) {
                                                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCCOR = parseFloat(result.o);
                                                                                                                                    if (BCCCOR < 0) {
                                                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCCRRREL = parseFloat(result.rel);
                                                                                                                                    if (BCCCRRREL < 0) {
                                                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCCCR1 = parseFloat(result.c1);
                                                                                                                                    if (BCCCCR1 < 0) {
                                                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }

                                                                                                                                    // 扁钢宽度
                                                                                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) <= 16 * BCCCTHKRN) {
                                                                                                                                        let BCCCWR = parseFloat(rows[25][columns[0][1].field]);

                                                                                                                                        // Sketch
                                                                                                                                        if (currentTabIndex === 0) {
                                                                                                                                            bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN, BCCCTHKRN, BCCCWR);
                                                                                                                                            bcccd2.off("resize").on("resize", function () {
                                                                                                                                                if ($("#bccc").length > 0) {
                                                                                                                                                    bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN, BCCCTHKRN, BCCCWR);
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        }
                                                                                                                                        bcccd2d3.tabs({
                                                                                                                                            onSelect: function (title, index) {
                                                                                                                                                if (index === 0) {
                                                                                                                                                    bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN, BCCCTHKRN, BCCCWR);
                                                                                                                                                    bcccd2.off("resize").on("resize", function () {
                                                                                                                                                        if ($("#bccc").length > 0) {
                                                                                                                                                            bccc2d("Φ" + BCCCSDI, BCCCTHKSN, "SR" + BCCCCRI, BCCCTHKCN, BCCCTHKRN, BCCCWR);
                                                                                                                                                        }
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        });

                                                                                                                                        // 扁钢厚度附加量
                                                                                                                                        let BCCCCR = BCCCCR1 + 0;

                                                                                                                                        // 扁钢有效厚度
                                                                                                                                        let BCCCTHKRE = BCCCTHKRN - BCCCCR1;

                                                                                                                                        // 扁钢截面积
                                                                                                                                        let BCCCAC = BCCCWR * BCCCTHKRE;

                                                                                                                                        // 扁钢焊接接头系数
                                                                                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                                                                                                            let BCCCER = parseFloat(rows[26][columns[0][1].field]);

                                                                                                                                            // t2s
                                                                                                                                            let BCCCT2S = BCCCCRI * BCCCPC;

                                                                                                                                            let BCCCT1 = 0.5 * BCCCCRI * BCCCPC;

                                                                                                                                            let BCCCT2 = 0.5 * BCCCCRI * BCCCPC;

                                                                                                                                            let BCCCWS = 0.6 * Math.sqrt(BCCCCRI * BCCCTHKSE);

                                                                                                                                            let BCCCWC = 0.6 * Math.sqrt(BCCCCRI * BCCCTHKCE);

                                                                                                                                            let BCCCQ = BCCCT2 * BCCCWC + BCCCT2S * BCCCWS - BCCCT2 * BCCCCRI * Math.sin(BCCCALPHA);

                                                                                                                                            let BCCCA = -1,
                                                                                                                                                BCCCAR = -1,
                                                                                                                                                BCCCARCHK = -1,
                                                                                                                                                BCCCWCSINALPHA = -1,
                                                                                                                                                BCCCRI00752 = -1,
                                                                                                                                                BCCCWCSINALPHACHK = -1;

                                                                                                                                            if (BCCCQ < 0) {

                                                                                                                                                BCCCA = Math.abs(BCCCQ) / BCCCOTCR;
                                                                                                                                                BCCCAR = BCCCA - BCCCWS * BCCCTHKSE - BCCCWC * BCCCTHKCE;
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "连接处需增加的承压面积：" + BCCCAR.toFixed(4) + " mm²" +
                                                                                                                                                    "</span>");

                                                                                                                                                if (BCCCAR <= BCCCAC) {
                                                                                                                                                    BCCCARCHK = "合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "扁钢实际截面积：" + BCCCAC.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");
                                                                                                                                                } else {
                                                                                                                                                    BCCCARCHK = "不合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "扁钢实际截面积：" + BCCCAC.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");
                                                                                                                                                }

                                                                                                                                                BCCCRI00752 = 0.0075 * 2 * BCCCCRI;
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "连接处防止失稳所需的最小径向投影长度：" + BCCCRI00752.toFixed(4) + " mm" +
                                                                                                                                                    "</span>");

                                                                                                                                                BCCCWCSINALPHA = BCCCWC * Math.sin(BCCCALPHA);
                                                                                                                                                if (BCCCWCSINALPHA >= BCCCRI00752) {
                                                                                                                                                    BCCCWCSINALPHACHK = "合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "实际径向投影长度：" + BCCCWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                } else {
                                                                                                                                                    BCCCWCSINALPHACHK = "不合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "实际径向投影长度：" + BCCCWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                }

                                                                                                                                            } else {

                                                                                                                                                BCCCA = Math.abs(BCCCQ) / Math.min(BCCCEC * BCCCOCT, BCCCES * BCCCOST, BCCCER * BCCCORT);
                                                                                                                                                BCCCAR = BCCCA - BCCCWS * BCCCTHKSE - BCCCWC * BCCCTHKCE;
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "连接处需增加的承压面积：" + BCCCAR.toFixed(4) + " mm²" +
                                                                                                                                                    "</span>");

                                                                                                                                                if (BCCCAR <= BCCCAC) {
                                                                                                                                                    BCCCARCHK = "合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "扁钢实际截面积：" + BCCCAC.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");
                                                                                                                                                } else {
                                                                                                                                                    BCCCARCHK = "不合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "扁钢实际截面积：" + BCCCAC.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");
                                                                                                                                                }

                                                                                                                                            }

                                                                                                                                            // 试验压力
                                                                                                                                            let BCCCPCT,
                                                                                                                                                BCCCPST,
                                                                                                                                                BCCCPRT,
                                                                                                                                                BCCCPT;
                                                                                                                                            if (BCCCTest === "液压试验") {
                                                                                                                                                BCCCPCT = Math.max(1.25 * BCCCPD * BCCCOC / BCCCOCT, 0.05);
                                                                                                                                                BCCCPST = Math.max(1.25 * BCCCPD * BCCCOS / BCCCOST, 0.05);
                                                                                                                                                BCCCPRT = Math.max(1.25 * BCCCPD * BCCCOR / BCCCORT, 0.05);
                                                                                                                                                BCCCPT = Math.min(BCCCPCT, BCCCPST, BCCCPRT);
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "压力试验：" + "液压/" + BCCCPT.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                            } else {
                                                                                                                                                BCCCPCT = Math.max(1.10 * BCCCPD * BCCCOC / BCCCOCT, 0.05);
                                                                                                                                                BCCCPST = Math.max(1.10 * BCCCPD * BCCCOS / BCCCOST, 0.05);
                                                                                                                                                BCCCPRT = Math.max(1.10 * BCCCPD * BCCCOR / BCCCORT, 0.05);
                                                                                                                                                BCCCPT = Math.min(BCCCPCT, BCCCPST, BCCCPRT);
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "压力试验：" + "气压/" + BCCCPT.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                            }

                                                                                                                                            // docx
                                                                                                                                            let BCCCPayJS = $('#payjs');

                                                                                                                                            function getDocx() {
                                                                                                                                                $.ajax({
                                                                                                                                                    type: "POST",
                                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                                    url: "bcccdocx.action",
                                                                                                                                                    async: true,
                                                                                                                                                    dataType: "json",
                                                                                                                                                    data: JSON.stringify({
                                                                                                                                                        ribbonName: "BCCC",

                                                                                                                                                        t: BCCCDT,
                                                                                                                                                        pd: BCCCPD,
                                                                                                                                                        ps: BCCCPS,
                                                                                                                                                        sstd: BCCCSSTDVal,
                                                                                                                                                        sname: BCCCSNameVal,
                                                                                                                                                        di: BCCCSDI,
                                                                                                                                                        thksn: BCCCTHKSN,
                                                                                                                                                        cs2: BCCCCS2,
                                                                                                                                                        es: BCCCES,
                                                                                                                                                        cstd: BCCCCSTDVal,
                                                                                                                                                        cname: BCCCCNameVal,
                                                                                                                                                        ri: BCCCCRI,
                                                                                                                                                        thkcn: BCCCTHKCN,
                                                                                                                                                        cc2: BCCCCC2,
                                                                                                                                                        ec: BCCCEC,
                                                                                                                                                        rstd: BCCCRSTDVal,
                                                                                                                                                        rname: BCCCRNameVal,
                                                                                                                                                        thkrn: BCCCTHKRN,
                                                                                                                                                        wr: BCCCWR,
                                                                                                                                                        er: BCCCER,
                                                                                                                                                        test: BCCCTest,
                                                                                                                                                        dc: BCCCDC.toFixed(4),
                                                                                                                                                        ds: BCCCDS.toFixed(4),
                                                                                                                                                        oct: BCCCOCT.toFixed(4),
                                                                                                                                                        ost: BCCCOST.toFixed(4),
                                                                                                                                                        oc: BCCCOC.toFixed(4),
                                                                                                                                                        os: BCCCOS.toFixed(4),
                                                                                                                                                        rcrel: BCCCRCREL.toFixed(4),
                                                                                                                                                        rsrel: BCCCRSREL.toFixed(4),
                                                                                                                                                        cc1: BCCCCC1.toFixed(4),
                                                                                                                                                        cs1: BCCCCS1.toFixed(4),
                                                                                                                                                        dr: BCCCDR.toFixed(4),
                                                                                                                                                        ort: BCCCORT.toFixed(4),
                                                                                                                                                        or: BCCCOR.toFixed(4),
                                                                                                                                                        rrrel: BCCCRRREL.toFixed(4),
                                                                                                                                                        cr1: BCCCCR1.toFixed(4),
                                                                                                                                                        pc: BCCCPC.toFixed(4),
                                                                                                                                                        cc: BCCCCC.toFixed(4),
                                                                                                                                                        thkce: BCCCTHKCE.toFixed(4),
                                                                                                                                                        cs: BCCCCS.toFixed(4),
                                                                                                                                                        thkse: BCCCTHKSE.toFixed(4),
                                                                                                                                                        cr: BCCCCR.toFixed(4),
                                                                                                                                                        thkre: BCCCTHKRE.toFixed(4),
                                                                                                                                                        alpha: BCCCDEGREE.toFixed(4),
                                                                                                                                                        otcr: BCCCOTCR.toFixed(4),
                                                                                                                                                        thkcc: BCCCTHKCC.toFixed(4),
                                                                                                                                                        thkcd: BCCCTHKCD.toFixed(4),
                                                                                                                                                        thkcchk: BCCCTHKCCHK,
                                                                                                                                                        thksc: BCCCTHKSC.toFixed(4),
                                                                                                                                                        thksd: BCCCTHKSD.toFixed(4),
                                                                                                                                                        thkschk: BCCCTHKSCHK,
                                                                                                                                                        t2s: BCCCT2S.toFixed(4),
                                                                                                                                                        t1: BCCCT1.toFixed(4),
                                                                                                                                                        t2: BCCCT2.toFixed(4),
                                                                                                                                                        ws: BCCCWS.toFixed(4),
                                                                                                                                                        wc: BCCCWC.toFixed(4),
                                                                                                                                                        q: BCCCQ.toFixed(4),
                                                                                                                                                        a: BCCCA.toFixed(4),
                                                                                                                                                        ar: BCCCAR.toFixed(4),
                                                                                                                                                        ac: BCCCAC.toFixed(4),
                                                                                                                                                        archk: BCCCARCHK,
                                                                                                                                                        wcsinalpha: BCCCWCSINALPHA.toFixed(4),
                                                                                                                                                        ri000752: BCCCRI00752.toFixed(4),
                                                                                                                                                        wcsinalphachk: BCCCWCSINALPHACHK,
                                                                                                                                                        pct: BCCCPCT.toFixed(4),
                                                                                                                                                        pst: BCCCPST.toFixed(4),
                                                                                                                                                        prt: BCCCPRT.toFixed(4),
                                                                                                                                                        pt: BCCCPT.toFixed(4)
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
                                                                                                                                                            let query = null,
                                                                                                                                                                status;
                                                                                                                                                            BCCCPayJS.dialog({
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
                                                                                                                                                                        BCCCPayJS.dialog("close");
                                                                                                                                                                        BCCCPayJS.dialog("clear");
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
                                                                                                                                                                                    BCCCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                            BCCCPayJS.dialog('close');
                                                                                                                                                                                            BCCCPayJS.dialog('clear');
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
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) > 16 * BCCCTHKRN) {
                                                                                                                                        south.html("扁钢宽度不能大于 " + 16 * BCCCTHKRN + " mm").css("color", "red");
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                error: function () {
                                                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                                                }
                                                                                                                            });
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) <= BCCCRThkMin) {
                                                                                                                            south.html("扁钢名义厚度不能小于等于 " + BCCCRThkMin + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) > BCCCRThkMax) {
                                                                                                                            south.html("扁钢名义厚度不能大于 " + BCCCRThkMax + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                    },
                                                                                                                    error: function () {
                                                                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                            "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) >= BCCCTHKCN) {
                                                                                                        south.html("封头腐蚀裕量不能大于等于 " + BCCCTHKCN + " mm").css("color", "red");
                                                                                                    }
                                                                                                },
                                                                                                error: function () {
                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) <= BCCCCThkMin) {
                                                                                            south.html("封头名义厚度不能小于等于 " + BCCCCThkMin + " mm").css("color", "red");
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) > BCCCCThkMax) {
                                                                                            south.html("封头名义厚度不能大于 " + BCCCCThkMax + " mm").css("color", "red");
                                                                                        }
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                        && parseFloat(rows[16][columns[0][1].field]) < 0.5 * BCCCSDI) {
                                                                                        south.html("封头内半径不能小于 " + 0.5 * BCCCSDI + " mm").css("color", "red");
                                                                                    }
                                                                                },
                                                                                error: function () {
                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                        "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCCCTHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCCCTHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCCCSThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + BCCCSThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCCCSThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + BCCCSThkMax + " mm").css("color", "red");
                                                    }
                                                }
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});