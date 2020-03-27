$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcdcd2 = $("#d2");
    let bcdcd3 = $("#d3");
    let bcdcd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcdc'></table>");
    let pg = $("#bcdc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/d/c/BCDC.json", function (result) {

        // 设计温度
        let BCDCDT;

        // 许用压缩应力
        let BCDCOTCR = -1;

        // 材料
        let BCDCSCategory, BCDCSCategoryVal, BCDCSType, BCDCSTypeVal, BCDCSSTD, BCDCSSTDVal, BCDCSName,
            BCDCCCategory, BCDCCCategoryVal, BCDCCType, BCDCCTypeVal, BCDCCSTD, BCDCCSTDVal, BCDCCName,
            BCDCRCategory, BCDCRCategoryVal, BCDCRType, BCDCRTypeVal, BCDCRSTD, BCDCRSTDVal, BCDCRName;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function bcdc2d(di = "ϕDi", thksn = "δsn",
                        ri = "Ri", thkcn = "δcn",
                        thkrn = "δrn", wr = "Wr") {

            bcdcd2.empty();

            let width = bcdcd2.width();
            let height = bcdcd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCDCSVG")
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
                ])).attr("id", "BCDCSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCDCSketchDI").attr("startOffset", "50%").text(text);

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
            let BCDCRI = height - 2 * padding;
            let BCDCRM = height - 2 * padding + thickness;

            // let centerX = width-padding-BCDCRO;
            let centerX = width / 2;
            let centerY = height / 2;

            // 内壁
            let innerArcTopX = centerX + BCDCRI * Math.cos(Math.PI / 6);
            let innerArcTopY = padding;
            let innerArcBottomX = centerX + BCDCRI * Math.cos(Math.PI / 6);
            let innerArcBottomY = height - padding;
            drawArc(BCDCRI, BCDCRI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);

            // 球冠区外壁
            let midArcStartX = centerX + BCDCRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcStartY = centerY - BCDCRM * Math.sin(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            let midArcEndX = centerX + BCDCRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcEndY = centerY + BCDCRM * Math.sin(Math.PI / 6) - thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            drawArc(BCDCRM, BCDCRM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);

            // 中心线
            drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
            drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);

            // 筒体内直径
            dimLeftV(padding + 100, height - padding, padding + 100, padding, di, "BCDCSketchSDI");

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
            ])).attr("id", "BCDCSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDCSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // ri
            let ang = 4;
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY},
                {x: centerX + BCDCRI - 15, y: centerY}
            ])).attr("id", "BCDCSketchRi").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCDCSketchRi").attr("startOffset", "50%").text(ri);

            // thkcn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + BCDCRI, y: centerY},
                    {x: centerX + BCDCRI - 15, y: centerY - 3},
                    {x: centerX + BCDCRI - 15, y: centerY + 3},
                    {x: centerX + BCDCRI, y: centerY}
                ]))
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + BCDCRI, y: centerY},
                {x: centerX + BCDCRM, y: centerY}
            ])).classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + BCDCRM, y: centerY},
                    {x: centerX + BCDCRM + 15, y: centerY - 3},
                    {x: centerX + BCDCRM + 15, y: centerY + 3},
                    {x: centerX + BCDCRM, y: centerY}
                ]))
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + BCDCRM + 15, y: centerY},
                {x: centerX + BCDCRM + 60, y: centerY}
            ])).attr("id", "BCDCSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCDCSketchTHKCN").attr("startOffset", "50%").text(thkcn);

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
            ])).attr("id", "BCDCSketchWR").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDCSketchWR").attr("startOffset", "50%").text(wr);

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
            ])).attr("id", "BCDCSketchTHKRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDCSketchTHKRN").attr("startOffset", "50%").text(thkrn);

        }

        currentTabIndex = bcdcd2d3.tabs('getTabIndex', bcdcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcdc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcdc").length > 0) {
                    bcdc2d();
                }
            });
        }
        bcdcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcdc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcdc").length > 0) {
                            bcdc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 球冠形中间封头内压计算",
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
                    $(ed.target).combobox("loadData", BCDCSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCDCSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCDCSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCDCSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCDCCCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCDCCType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCDCCSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCDCCName);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BCDCRCategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BCDCRType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BCDCRSTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BCDCRName);
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
                    bcdcd2.empty();

                    // model
                    bcdcd3.empty();

                    // sketch
                    currentTabIndex = bcdcd2d3.tabs('getTabIndex', bcdcd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        bcdc2d();
                        bcdcd2.off("resize").on("resize", function () {
                            if ($("#bcdc").length > 0) {
                                bcdc2d();
                            }
                        });
                    }
                    bcdcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcdc2d();
                                bcdcd2.off("resize").on("resize", function () {
                                    if ($("#bcdc").length > 0) {
                                        bcdc2d();
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

                        BCDCDT = parseFloat(changes.value);

                        if (BCDCDT <= 100) {
                            BCDCOTCR = 103;
                        }
                        else if (BCDCDT > 100 && BCDCDT <= 200) {
                            BCDCOTCR = 100;
                        }
                        else if (BCDCDT > 200 && BCDCDT <= 250) {
                            BCDCOTCR = 95;
                        }
                        else if (BCDCDT > 250 && BCDCDT <= 350) {
                            BCDCOTCR = 80;
                        }

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCDCSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCDCSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDCSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCDCCCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCDCCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCDCCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDCCName = null;

                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BCDCRCategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCDCRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCDCRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCDCRName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCSCategory = [];
                                BCDCCCategory = [];
                                BCDCRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCDCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCDCSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCDCCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCDCRCategory[index] = {
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

                        BCDCSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCDCSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDCSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCSCategoryVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCSType = [];
                                $(result).each(function (index, element) {
                                    BCDCSType[index] = {
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

                        BCDCSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDCSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDCSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCSCategoryVal,
                                type: BCDCSTypeVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCSSTD = [];
                                $(result).each(function (index, element) {
                                    BCDCSSTD[index] = {
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

                        BCDCSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDCSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCSCategoryVal,
                                type: BCDCSTypeVal,
                                std: BCDCSSTDVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCSName = [];
                                $(result).each(function (index, element) {
                                    BCDCSName[index] = {
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

                        BCDCCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCDCCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCDCCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDCCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCCCategoryVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCCType = [];
                                $(result).each(function (index, element) {
                                    BCDCCType[index] = {
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

                        BCDCCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCDCCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDCCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCCCategoryVal,
                                type: BCDCCTypeVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCCSTD = [];
                                $(result).each(function (index, element) {
                                    BCDCCSTD[index] = {
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

                        BCDCCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDCCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCCCategoryVal,
                                type: BCDCCTypeVal,
                                std: BCDCCSTDVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCCName = [];
                                $(result).each(function (index, element) {
                                    BCDCCName[index] = {
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

                        BCDCRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCDCRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCDCRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCDCRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCRCategoryVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCRType = [];
                                $(result).each(function (index, element) {
                                    BCDCRType[index] = {
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

                        BCDCRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCDCRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCDCRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCRCategoryVal,
                                type: BCDCRTypeVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCRSTD = [];
                                $(result).each(function (index, element) {
                                    BCDCRSTD[index] = {
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

                        BCDCRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCDCRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDCRCategoryVal,
                                type: BCDCRTypeVal,
                                std: BCDCRSTDVal,
                                temp: BCDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDCRName = [];
                                $(result).each(function (index, element) {
                                    BCDCRName[index] = {
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
                            let BCDCPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCDCPS = parseFloat(rows[2][columns[0][1].field]);

                                // 计算压力
                                let BCDCPC = BCDCPD + BCDCPS;

                                // 试验类型
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCDCTest = rows[3][columns[0][1].field];

                                    // 筒体材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let BCDCSNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取筒体材料密度、最大最小厚度
                                        let BCDCDS, BCDCSThkMin, BCDCSThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCDCSCategoryVal,
                                                "type": BCDCSTypeVal,
                                                "std": BCDCSSTDVal,
                                                "name": BCDCSNameVal,
                                                "temp": BCDCDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCDCDS = parseFloat(result.density);
                                                BCDCSThkMin = parseFloat(result.thkMin);
                                                BCDCSThkMax = parseFloat(result.thkMax);

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let BCDCSDI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bcdc2d("Φ" + BCDCSDI);
                                                        bcdcd2.off("resize").on("resize", function () {
                                                            if ($("#bcdc").length > 0) {
                                                                bcdc2d("Φ" + BCDCSDI);
                                                            }
                                                        });
                                                    }
                                                    bcdcd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bcdc2d("Φ" + BCDCSDI);
                                                                bcdcd2.off("resize").on("resize", function () {
                                                                    if ($("#bcdc").length > 0) {
                                                                        bcdc2d("Φ" + BCDCSDI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCDCSThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCDCSThkMax) {
                                                        let BCDCTHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcdc2d("Φ" + BCDCSDI, BCDCTHKSN);
                                                            bcdcd2.off("resize").on("resize", function () {
                                                                if ($("#bcdc").length > 0) {
                                                                    bcdc2d("Φ" + BCDCSDI, BCDCTHKSN);
                                                                }
                                                            });
                                                        }
                                                        bcdcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcdc2d("Φ" + BCDCSDI, BCDCTHKSN);
                                                                    bcdcd2.off("resize").on("resize", function () {
                                                                        if ($("#bcdc").length > 0) {
                                                                            bcdc2d("Φ" + BCDCSDI, BCDCTHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BCDCSDO = BCDCSDI + 2 * BCDCTHKSN;

                                                        let BCDCOST, BCDCOS, BCDCRSREL, BCDCCS1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCDCSCategoryVal,
                                                                "type": BCDCSTypeVal,
                                                                "std": BCDCSSTDVal,
                                                                "name": BCDCSNameVal,
                                                                "thk": BCDCTHKSN,
                                                                "temp": BCDCDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": BCDCSDO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCDCOST = parseFloat(result.ot);
                                                                if (BCDCOST < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDCOS = parseFloat(result.o);
                                                                if (BCDCOS < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDCRSREL = parseFloat(result.rel);
                                                                if (BCDCRSREL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDCCS1 = parseFloat(result.c1);
                                                                if (BCDCCS1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < BCDCTHKSN) {
                                                                    let BCDCCS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体焊接接头系数
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let BCDCES = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量C
                                                                        let BCDCCS = BCDCCS1 + BCDCCS2;

                                                                        // 筒体有效厚度
                                                                        let BCDCTHKSE = BCDCTHKSN - BCDCCS;

                                                                        // 筒体计算厚度
                                                                        let BCDCTHKSC = BCDCPC * BCDCSDI / (2 * BCDCOST * BCDCES);

                                                                        // 筒体设计厚度
                                                                        let BCDCTHKSD = BCDCTHKSC + BCDCCS2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "筒体所需厚度：" + (BCDCTHKSD + BCDCCS1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 筒体厚度校核
                                                                        let BCDCTHKSCHK;
                                                                        if (BCDCTHKSN >= (BCDCTHKSD + BCDCCS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCDCTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCDCTHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCDCTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCDCTHKSCHK = "不合格";
                                                                        }

                                                                        // 封头材料名称
                                                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                            let BCDCCNameVal = rows[15][columns[0][1].field];

                                                                            // AJAX 获取封头材料密度、最大最小厚度
                                                                            let BCDCDC, BCDCCThkMin, BCDCCThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BCDCCCategoryVal,
                                                                                    "type": BCDCCTypeVal,
                                                                                    "std": BCDCCSTDVal,
                                                                                    "name": BCDCCNameVal,
                                                                                    "temp": BCDCDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BCDCDC = parseFloat(result.density);
                                                                                    BCDCCThkMin = parseFloat(result.thkMin);
                                                                                    BCDCCThkMax = parseFloat(result.thkMax);

                                                                                    // 封头内半径
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                        && parseFloat(rows[16][columns[0][1].field]) >= 0.5 * BCDCSDI) {
                                                                                        let BCDCCRI = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI);
                                                                                            bcdcd2.off("resize").on("resize", function () {
                                                                                                if ($("#bcdc").length > 0) {
                                                                                                    bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        bcdcd2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI);
                                                                                                    bcdcd2.off("resize").on("resize", function () {
                                                                                                        if ($("#bcdc").length > 0) {
                                                                                                            bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // 球壳切线与圆筒壁夹角 alpha(弧度)
                                                                                        let BCDCALPHA = Math.acos(BCDCSDI / (2 * BCDCCRI));

                                                                                        // 度数
                                                                                        let BCDCDEGREE = BCDCALPHA / Math.PI * 180;

                                                                                        // 封头名义厚度
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) > BCDCCThkMin
                                                                                            && parseFloat(rows[17][columns[0][1].field]) <= BCDCCThkMax) {
                                                                                            let BCDCTHKCN = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN);
                                                                                                bcdcd2.off("resize").on("resize", function () {
                                                                                                    if ($("#bcdc").length > 0) {
                                                                                                        bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            bcdcd2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN);
                                                                                                        bcdcd2.off("resize").on("resize", function () {
                                                                                                            if ($("#bcdc").length > 0) {
                                                                                                                bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            let BCDCCRO = BCDCCRI + BCDCTHKCN;

                                                                                            let BCDCOCT, BCDCOC,
                                                                                                BCDCRCREL, BCDCCC1;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BCDCCCategoryVal,
                                                                                                    "type": BCDCCTypeVal,
                                                                                                    "std": BCDCCSTDVal,
                                                                                                    "name": BCDCCNameVal,
                                                                                                    "thk": BCDCTHKCN,
                                                                                                    "temp": BCDCDT,
                                                                                                    "highLow": 3,
                                                                                                    "isTube": 0,
                                                                                                    "od": BCDCCRO * 2
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BCDCOCT = parseFloat(result.ot);
                                                                                                    if (BCDCOCT < 0) {
                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCDCOC = parseFloat(result.o);
                                                                                                    if (BCDCOC < 0) {
                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCDCRCREL = parseFloat(result.rel);
                                                                                                    if (BCDCRCREL < 0) {
                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCDCCC1 = parseFloat(result.c1);
                                                                                                    if (BCDCCC1 < 0) {
                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 封头腐蚀裕量
                                                                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) < BCDCTHKCN) {
                                                                                                        let BCDCCC2 = parseFloat(rows[18][columns[0][1].field]);

                                                                                                        // 封头厚度附加量
                                                                                                        let BCDCCC = BCDCCC1 + BCDCCC2;

                                                                                                        // 封头有效厚度
                                                                                                        let BCDCTHKCE = BCDCTHKCN - BCDCCC;

                                                                                                        // 封头焊接接头系数
                                                                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                                                                            let BCDCEC = parseFloat(rows[19][columns[0][1].field]);

                                                                                                            // 封头计算厚度
                                                                                                            let BCDCTHKCC = BCDCPC * BCDCSDI / (2 * BCDCOCT * BCDCEC);

                                                                                                            // 设计厚度
                                                                                                            let BCDCTHKCD = BCDCTHKCC + BCDCCC2;

                                                                                                            // 所需厚度提示信息
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "封头所需厚度：" + (BCDCTHKCD + BCDCCC1).toFixed(2) + " mm" +
                                                                                                                "</span>");

                                                                                                            // 封头厚度校核
                                                                                                            let BCDCTHKCCHK;
                                                                                                            if (BCDCTHKCN >= (BCDCTHKCD + BCDCCC1).toFixed(2)) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BCDCTHKCN + " mm" +
                                                                                                                    "</span>");
                                                                                                                BCDCTHKCCHK = "合格";
                                                                                                            } else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BCDCTHKCN + " mm" +
                                                                                                                    "</span>");
                                                                                                                BCDCTHKCCHK = "不合格";
                                                                                                            }

                                                                                                            // 扁钢材料名称
                                                                                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                                                                                let BCDCRNameVal = rows[23][columns[0][1].field];

                                                                                                                // AJAX 获取扁钢材料密度、最大最小厚度
                                                                                                                let BCDCDR,
                                                                                                                    BCDCRThkMin,
                                                                                                                    BCDCRThkMax;
                                                                                                                $.ajax({
                                                                                                                    type: "POST",
                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                                    async: true,
                                                                                                                    dataType: "json",
                                                                                                                    data: JSON.stringify({
                                                                                                                        "category": BCDCRCategoryVal,
                                                                                                                        "type": BCDCRTypeVal,
                                                                                                                        "std": BCDCRSTDVal,
                                                                                                                        "name": BCDCRNameVal,
                                                                                                                        "temp": BCDCDT
                                                                                                                    }),
                                                                                                                    beforeSend: function () {
                                                                                                                    },
                                                                                                                    success: function (result) {

                                                                                                                        BCDCDR = parseFloat(result.density);
                                                                                                                        BCDCRThkMin = parseFloat(result.thkMin);
                                                                                                                        BCDCRThkMax = parseFloat(result.thkMax);

                                                                                                                        // 扁钢名义厚度
                                                                                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) > BCDCRThkMin
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) <= BCDCRThkMax) {
                                                                                                                            let BCDCTHKRN = parseFloat(rows[24][columns[0][1].field]);

                                                                                                                            // Sketch
                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN, BCDCTHKRN);
                                                                                                                                bcdcd2.off("resize").on("resize", function () {
                                                                                                                                    if ($("#bcdc").length > 0) {
                                                                                                                                        bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN, BCDCTHKRN);
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            }
                                                                                                                            bcdcd2d3.tabs({
                                                                                                                                onSelect: function (title, index) {
                                                                                                                                    if (index === 0) {
                                                                                                                                        bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN, BCDCTHKRN);
                                                                                                                                        bcdcd2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bcdc").length > 0) {
                                                                                                                                                bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN, BCDCTHKRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            });

                                                                                                                            let BCDCORT,
                                                                                                                                BCDCOR,
                                                                                                                                BCDCRRREL,
                                                                                                                                BCDCCR1;
                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "category": BCDCRCategoryVal,
                                                                                                                                    "type": BCDCRTypeVal,
                                                                                                                                    "std": BCDCRSTDVal,
                                                                                                                                    "name": BCDCRNameVal,
                                                                                                                                    "thk": BCDCTHKRN,
                                                                                                                                    "temp": BCDCDT,
                                                                                                                                    "highLow": 3,
                                                                                                                                    "isTube": 0,
                                                                                                                                    "od": 100000
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    BCDCORT = parseFloat(result.ot);
                                                                                                                                    if (BCDCORT < 0) {
                                                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDCOR = parseFloat(result.o);
                                                                                                                                    if (BCDCOR < 0) {
                                                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDCRRREL = parseFloat(result.rel);
                                                                                                                                    if (BCDCRRREL < 0) {
                                                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDCCR1 = parseFloat(result.c1);
                                                                                                                                    if (BCDCCR1 < 0) {
                                                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }

                                                                                                                                    // 扁钢宽度
                                                                                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) <= 16 * BCDCTHKRN) {
                                                                                                                                        let BCDCWR = parseFloat(rows[25][columns[0][1].field]);

                                                                                                                                        // Sketch
                                                                                                                                        if (currentTabIndex === 0) {
                                                                                                                                            bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN, BCDCTHKRN, BCDCWR);
                                                                                                                                            bcdcd2.off("resize").on("resize", function () {
                                                                                                                                                if ($("#bcdc").length > 0) {
                                                                                                                                                    bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN, BCDCTHKRN, BCDCWR);
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        }
                                                                                                                                        bcdcd2d3.tabs({
                                                                                                                                            onSelect: function (title, index) {
                                                                                                                                                if (index === 0) {
                                                                                                                                                    bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN, BCDCTHKRN, BCDCWR);
                                                                                                                                                    bcdcd2.off("resize").on("resize", function () {
                                                                                                                                                        if ($("#bcdc").length > 0) {
                                                                                                                                                            bcdc2d("Φ" + BCDCSDI, BCDCTHKSN, "SR" + BCDCCRI, BCDCTHKCN, BCDCTHKRN, BCDCWR);
                                                                                                                                                        }
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        });

                                                                                                                                        // 扁钢厚度附加量
                                                                                                                                        let BCDCCR = BCDCCR1 + 0;

                                                                                                                                        // 扁钢有效厚度
                                                                                                                                        let BCDCTHKRE = BCDCTHKRN - BCDCCR1;

                                                                                                                                        // 扁钢截面积
                                                                                                                                        let BCDCAC = BCDCWR * BCDCTHKRE;

                                                                                                                                        // 扁钢焊接接头系数
                                                                                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                                                                                                            let BCDCER = parseFloat(rows[26][columns[0][1].field]);

                                                                                                                                            // t2s
                                                                                                                                            let BCDCT2S = BCDCCRI * BCDCPC;

                                                                                                                                            let BCDCT1 = 0.5 * BCDCCRI * BCDCPC;

                                                                                                                                            let BCDCT2 = 0.5 * BCDCCRI * BCDCPC;

                                                                                                                                            let BCDCWS = 0.6 * Math.sqrt(BCDCCRI * BCDCTHKSE);
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "封头单侧的筒体最小宽度：" + BCDCWS.toFixed(4) + " mm" +
                                                                                                                                                "</span>");

                                                                                                                                            let BCDCWC = 0.6 * Math.sqrt(BCDCCRI * BCDCTHKCE);

                                                                                                                                            let BCDCQ = BCDCT2 * BCDCWC + BCDCT2S * BCDCWS - BCDCT2 * BCDCCRI * Math.sin(BCDCALPHA);

                                                                                                                                            let BCDCA = -1,
                                                                                                                                                BCDCAR = -1,
                                                                                                                                                BCDCARCHK = -1,
                                                                                                                                                BCDCWCSINALPHA = -1,
                                                                                                                                                BCDCRI00752 = -1,
                                                                                                                                                BCDCWCSINALPHACHK = -1;

                                                                                                                                            if (BCDCQ < 0) {

                                                                                                                                                BCDCA = Math.abs(BCDCQ) / BCDCOTCR;
                                                                                                                                                BCDCAR = BCDCA - 2 * BCDCWS * BCDCTHKSE - BCDCWC * BCDCTHKCE;
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "连接处需增加的承压面积：" + BCDCAR.toFixed(4) + " mm²" +
                                                                                                                                                    "</span>");

                                                                                                                                                if (BCDCAR <= BCDCAC) {
                                                                                                                                                    BCDCARCHK = "合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "扁钢实际截面积：" + BCDCAC.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");
                                                                                                                                                } else {
                                                                                                                                                    BCDCARCHK = "不合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "扁钢实际截面积：" + BCDCAC.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");
                                                                                                                                                }

                                                                                                                                                BCDCRI00752 = 0.0075 * 2 * BCDCCRI;
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "连接处防止失稳所需的最小径向投影长度：" + BCDCRI00752.toFixed(4) + " mm" +
                                                                                                                                                    "</span>");

                                                                                                                                                BCDCWCSINALPHA = BCDCWC * Math.sin(BCDCALPHA);
                                                                                                                                                if (BCDCWCSINALPHA >= BCDCRI00752) {
                                                                                                                                                    BCDCWCSINALPHACHK = "合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "实际径向投影长度：" + BCDCWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                } else {
                                                                                                                                                    BCDCWCSINALPHACHK = "不合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "实际径向投影长度：" + BCDCWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                        "</span>");
                                                                                                                                                }

                                                                                                                                            } else {

                                                                                                                                                BCDCA = Math.abs(BCDCQ) / Math.min(BCDCEC * BCDCOCT, BCDCES * BCDCOST, BCDCER * BCDCORT);
                                                                                                                                                BCDCAR = BCDCA - 2 * BCDCWS * BCDCTHKSE - BCDCWC * BCDCTHKCE;
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "连接处需增加的承压面积：" + BCDCAR.toFixed(4) + " mm²" +
                                                                                                                                                    "</span>");

                                                                                                                                                if (BCDCAR <= BCDCAC) {
                                                                                                                                                    BCDCARCHK = "合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "扁钢实际截面积：" + BCDCAC.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");
                                                                                                                                                } else {
                                                                                                                                                    BCDCARCHK = "不合格";
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:red;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "扁钢实际截面积：" + BCDCAC.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");
                                                                                                                                                }

                                                                                                                                            }

                                                                                                                                            // 试验压力
                                                                                                                                            let BCDCPCT,
                                                                                                                                                BCDCPST,
                                                                                                                                                BCDCPRT,
                                                                                                                                                BCDCPT;
                                                                                                                                            if (BCDCTest === "液压试验") {
                                                                                                                                                BCDCPCT = Math.max(1.25 * BCDCPD * BCDCOC / BCDCOCT, 0.05);
                                                                                                                                                BCDCPST = Math.max(1.25 * BCDCPD * BCDCOS / BCDCOST, 0.05);
                                                                                                                                                BCDCPRT = Math.max(1.25 * BCDCPD * BCDCOR / BCDCORT, 0.05);
                                                                                                                                                BCDCPT = Math.min(BCDCPCT, BCDCPST, BCDCPRT);
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "压力试验：" + "液压/" + BCDCPT.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                            } else {
                                                                                                                                                BCDCPCT = Math.max(1.10 * BCDCPD * BCDCOC / BCDCOCT, 0.05);
                                                                                                                                                BCDCPST = Math.max(1.10 * BCDCPD * BCDCOS / BCDCOST, 0.05);
                                                                                                                                                BCDCPRT = Math.max(1.10 * BCDCPD * BCDCOR / BCDCORT, 0.05);
                                                                                                                                                BCDCPT = Math.min(BCDCPCT, BCDCPST, BCDCPRT);
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "压力试验：" + "气压/" + BCDCPT.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                            }

                                                                                                                                            // docx
                                                                                                                                            let BCDCPayJS = $('#payjs');

                                                                                                                                            function getDocx() {
                                                                                                                                                $.ajax({
                                                                                                                                                    type: "POST",
                                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                                    url: "bcdcdocx.action",
                                                                                                                                                    async: true,
                                                                                                                                                    dataType: "json",
                                                                                                                                                    data: JSON.stringify({
                                                                                                                                                        ribbonName: "BCDC",

                                                                                                                                                        t: BCDCDT,
                                                                                                                                                        pd: BCDCPD,
                                                                                                                                                        ps: BCDCPS,
                                                                                                                                                        sstd: BCDCSSTDVal,
                                                                                                                                                        sname: BCDCSNameVal,
                                                                                                                                                        di: BCDCSDI,
                                                                                                                                                        thksn: BCDCTHKSN,
                                                                                                                                                        cs2: BCDCCS2,
                                                                                                                                                        es: BCDCES,
                                                                                                                                                        cstd: BCDCCSTDVal,
                                                                                                                                                        cname: BCDCCNameVal,
                                                                                                                                                        ri: BCDCCRI,
                                                                                                                                                        thkcn: BCDCTHKCN,
                                                                                                                                                        cc2: BCDCCC2,
                                                                                                                                                        ec: BCDCEC,
                                                                                                                                                        rstd: BCDCRSTDVal,
                                                                                                                                                        rname: BCDCRNameVal,
                                                                                                                                                        thkrn: BCDCTHKRN,
                                                                                                                                                        wr: BCDCWR,
                                                                                                                                                        er: BCDCER,
                                                                                                                                                        test: BCDCTest,
                                                                                                                                                        dc: BCDCDC.toFixed(4),
                                                                                                                                                        ds: BCDCDS.toFixed(4),
                                                                                                                                                        oct: BCDCOCT.toFixed(4),
                                                                                                                                                        ost: BCDCOST.toFixed(4),
                                                                                                                                                        oc: BCDCOC.toFixed(4),
                                                                                                                                                        os: BCDCOS.toFixed(4),
                                                                                                                                                        rcrel: BCDCRCREL.toFixed(4),
                                                                                                                                                        rsrel: BCDCRSREL.toFixed(4),
                                                                                                                                                        cc1: BCDCCC1.toFixed(4),
                                                                                                                                                        cs1: BCDCCS1.toFixed(4),
                                                                                                                                                        dr: BCDCDR.toFixed(4),
                                                                                                                                                        ort: BCDCORT.toFixed(4),
                                                                                                                                                        or: BCDCOR.toFixed(4),
                                                                                                                                                        rrrel: BCDCRRREL.toFixed(4),
                                                                                                                                                        cr1: BCDCCR1.toFixed(4),
                                                                                                                                                        pc: BCDCPC.toFixed(4),
                                                                                                                                                        cc: BCDCCC.toFixed(4),
                                                                                                                                                        thkce: BCDCTHKCE.toFixed(4),
                                                                                                                                                        cs: BCDCCS.toFixed(4),
                                                                                                                                                        thkse: BCDCTHKSE.toFixed(4),
                                                                                                                                                        cr: BCDCCR.toFixed(4),
                                                                                                                                                        thkre: BCDCTHKRE.toFixed(4),
                                                                                                                                                        alpha: BCDCDEGREE.toFixed(4),
                                                                                                                                                        otcr: BCDCOTCR.toFixed(4),
                                                                                                                                                        thkcc: BCDCTHKCC.toFixed(4),
                                                                                                                                                        thkcd: BCDCTHKCD.toFixed(4),
                                                                                                                                                        thkcchk: BCDCTHKCCHK,
                                                                                                                                                        thksc: BCDCTHKSC.toFixed(4),
                                                                                                                                                        thksd: BCDCTHKSD.toFixed(4),
                                                                                                                                                        thkschk: BCDCTHKSCHK,
                                                                                                                                                        t2s: BCDCT2S.toFixed(4),
                                                                                                                                                        t1: BCDCT1.toFixed(4),
                                                                                                                                                        t2: BCDCT2.toFixed(4),
                                                                                                                                                        ws: BCDCWS.toFixed(4),
                                                                                                                                                        wc: BCDCWC.toFixed(4),
                                                                                                                                                        q: BCDCQ.toFixed(4),
                                                                                                                                                        a: BCDCA.toFixed(4),
                                                                                                                                                        ar: BCDCAR.toFixed(4),
                                                                                                                                                        ac: BCDCAC.toFixed(4),
                                                                                                                                                        archk: BCDCARCHK,
                                                                                                                                                        wcsinalpha: BCDCWCSINALPHA.toFixed(4),
                                                                                                                                                        ri000752: BCDCRI00752.toFixed(4),
                                                                                                                                                        wcsinalphachk: BCDCWCSINALPHACHK,
                                                                                                                                                        pct: BCDCPCT.toFixed(4),
                                                                                                                                                        pst: BCDCPST.toFixed(4),
                                                                                                                                                        prt: BCDCPRT.toFixed(4),
                                                                                                                                                        pt: BCDCPT.toFixed(4)
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
                                                                                                                                                            BCDCPayJS.dialog({
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
                                                                                                                                                                        BCDCPayJS.dialog("close");
                                                                                                                                                                        BCDCPayJS.dialog("clear");
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
                                                                                                                                                                                    BCDCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                            BCDCPayJS.dialog('close');
                                                                                                                                                                                            BCDCPayJS.dialog('clear');
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
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) > 16 * BCDCTHKRN) {
                                                                                                                                        south.html("扁钢宽度不能大于 " + 16 * BCDCTHKRN + " mm").css("color", "red");
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                error: function () {
                                                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                                                }
                                                                                                                            });
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) <= BCDCRThkMin) {
                                                                                                                            south.html("扁钢名义厚度不能小于等于 " + BCDCRThkMin + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) > BCDCRThkMax) {
                                                                                                                            south.html("扁钢名义厚度不能大于 " + BCDCRThkMax + " mm").css("color", "red");
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
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) >= BCDCTHKCN) {
                                                                                                        south.html("封头腐蚀裕量不能大于等于 " + BCDCTHKCN + " mm").css("color", "red");
                                                                                                    }
                                                                                                },
                                                                                                error: function () {
                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) <= BCDCCThkMin) {
                                                                                            south.html("封头名义厚度不能小于等于 " + BCDCCThkMin + " mm").css("color", "red");
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) > BCDCCThkMax) {
                                                                                            south.html("封头名义厚度不能大于 " + BCDCCThkMax + " mm").css("color", "red");
                                                                                        }
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                        && parseFloat(rows[16][columns[0][1].field]) < 0.5 * BCDCSDI) {
                                                                                        south.html("封头内半径不能小于 " + 0.5 * BCDCSDI + " mm").css("color", "red");
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
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCDCTHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCDCTHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCDCSThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + BCDCSThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCDCSThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + BCDCSThkMax + " mm").css("color", "red");
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