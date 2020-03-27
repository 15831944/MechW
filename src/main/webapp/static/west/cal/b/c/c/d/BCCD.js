$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bccdd2 = $("#d2");
    let bccdd3 = $("#d3");
    let bccdd2d3 = $('#d2d3');

    $("#cal").html("<table id='bccd'></table>");
    let pg = $("#bccd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/c/d/BCCD.json", function (result) {

        // 设计温度
        let BCCDDT;

        // 许用压缩应力
        let BCCDOTCR = -1;

        // 材料
        let BCCDSCategory, BCCDSCategoryVal, BCCDSType, BCCDSTypeVal, BCCDSSTD, BCCDSSTDVal, BCCDSName,
            BCCDCCategory, BCCDCCategoryVal, BCCDCType, BCCDCTypeVal, BCCDCSTD, BCCDCSTDVal, BCCDCName,
            BCCDRCategory, BCCDRCategoryVal, BCCDRType, BCCDRTypeVal, BCCDRSTD, BCCDRSTDVal, BCCDRName;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function bccd2d(di = "ϕDi", thksn = "δsn", ri = "Ri", thkcn = "δcn", thkrn = "δrn", wr = "Wr", hr = "Hr") {

            bccdd2.empty();

            let width = bccdd2.width();
            let height = bccdd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCCDSVG")
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
                ])).attr("id", "BCCDSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCCDSketchDI").attr("startOffset", "50%").text(text);

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
            let BCCDRI = height - 2 * padding;
            let BCCDRM = height - 2 * padding + thickness;
            let BCCDRO = height - 2 * padding + 2 * thickness;

            let centerX = width - padding - BCCDRO;
            let centerY = height / 2;

            // 内壁
            let innerArcTopX = centerX + BCCDRI * Math.cos(Math.PI / 6);
            let innerArcTopY = padding;
            let innerArcBottomX = centerX + BCCDRI * Math.cos(Math.PI / 6);
            let innerArcBottomY = height - padding;
            drawArc(BCCDRI, BCCDRI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);

            // 球冠区外壁
            let midArcStartX = centerX + BCCDRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcStartY = centerY - BCCDRM * Math.sin(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            let midArcEndX = centerX + BCCDRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcEndY = centerY + BCCDRM * Math.sin(Math.PI / 6) - thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            drawArc(BCCDRM, BCCDRM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);

            // 中心线
            drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
            drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);

            // 筒体内直径
            dimLeftV(padding + 100, height - padding, padding + 100, padding, di, "BCCDSketchSDI");

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
            ])).attr("id", "BCCDSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCDSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 封头球冠区
            // ri
            let ang = 4;
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY},
                {x: width - padding - 2 * thickness - 15, y: centerY}
            ])).attr("id", "BCCDSketchRi").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCDSketchRi").attr("startOffset", "50%").text(ri);

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
            ])).attr("id", "BCCDSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCDSketchTHKCN").attr("startOffset", "50%").text(thkcn);

            // 上部角钢
            let b1x = innerArcTopX, b1y = padding - thickness, b2x = midArcStartX, b2y = padding - thickness;
            let bh = 3 * (b2x - b1x);
            drawLine(b1x, b1y - (b2x - b1x), b1x, b1y - bh);
            drawLine(b2x, b1y, b2x, b1y - bh);
            drawLine(b1x, b1y - bh, b2x, b1y - bh);
            drawLine(b1x, b1y - (b2x - b1x), b2x - bh, b1y - (b2x - b1x));
            drawLine(b2x - bh, b1y - (b2x - b1x), b2x - bh, b1y);

            // wr
            drawLine(b1x - 60, b1y - bh, b1x - 3, b1y - bh);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: b1x - 50, y: b1y - bh},
                    {x: b1x - 50 - 3, y: b1y - bh - 15},
                    {x: b1x - 50 + 3, y: b1y - bh - 15},
                    {x: b1x - 50, y: b1y - bh}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: b1x - 50, y: b1y},
                    {x: b1x - 50 - 3, y: b1y + 15},
                    {x: b1x - 50 + 3, y: b1y + 15},
                    {x: b1x - 50, y: b1y}
                ]));
            svg.append("path").attr("d", line([
                {x: b1x - 50, y: b1y + 15 + 10},
                {x: b1x - 50, y: b1y - bh - 15 - 10}
            ])).attr("id", "BCCDSketchWR").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCDSketchWR").attr("startOffset", "50%").text(wr);

            // 下部角钢
            let b3x = innerArcTopX, b3y = height - padding + thickness, b4x = midArcStartX,
                b4y = height - padding + thickness;
            drawLine(b3x, b3y + (b4x - b3x), b3x, b3y + bh);
            drawLine(b4x, b4y, b4x, b4y + bh);
            drawLine(b3x, b3y + bh, b4x, b3y + bh);
            drawLine(b3x, b3y + (b4x - b3x), b4x - bh, b3y + (b4x - b3x));
            drawLine(b4x - bh, b3y + (b4x - b3x), b4x - bh, b3y);

            // HR
            drawLine(b2x - bh, b1y - (b2x - b1x) - 3, b2x - bh, b1y - (b2x - b1x) - 50);
            drawLine(b2x, b1y - bh - 3, b2x, b1y - (b2x - b1x) - 50);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: b2x - bh, y: b1y - (b2x - b1x) - 40},
                    {x: b2x - bh - 15, y: b1y - (b2x - b1x) - 40 - 3},
                    {x: b2x - bh - 15, y: b1y - (b2x - b1x) - 40 + 3},
                    {x: b2x - bh, y: b1y - (b2x - b1x) - 40}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: b2x, y: b1y - (b2x - b1x) - 40},
                    {x: b2x + 15, y: b1y - (b2x - b1x) - 40 - 3},
                    {x: b2x + 15, y: b1y - (b2x - b1x) - 40 + 3},
                    {x: b2x, y: b1y - (b2x - b1x) - 40}
                ]));
            drawLine(b2x - bh - 15 - 10, b1y - (b2x - b1x) - 40, b2x, b1y - (b2x - b1x) - 40);
            svg.append("path").attr("d", line([
                {x: b2x + 15, y: b1y - (b2x - b1x) - 40},
                {x: b2x + 15 + 40, y: b1y - (b2x - b1x) - 40}
            ])).attr("id", "BCCDSketchHR").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCDSketchHR").attr("startOffset", "50%").text(hr);

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
            ])).attr("id", "BCCDSketchTHKRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCDSketchTHKRN").attr("startOffset", "50%").text(thkrn);

        }

        currentTabIndex = bccdd2d3.tabs('getTabIndex', bccdd2d3.tabs('getSelected'));

        // 初始化 Sketch
        if (currentTabIndex === 0) {
            bccd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bccd").length > 0) {
                    bccd2d();
                }
            });
        }
        bccdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bccd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bccd").length > 0) {
                            bccd2d();
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
                    $(ed.target).combobox("loadData", BCCDSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCCDSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCCDSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCCDSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCCDCCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCCDCType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCCDCSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCCDCName);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BCCDRCategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BCCDRType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BCCDRSTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BCCDRName);
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
                    bccdd2.empty();

                    // model
                    bccdd3.empty();

                    // sketch
                    currentTabIndex = bccdd2d3.tabs('getTabIndex', bccdd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        bccd2d();
                        bccdd2.off("resize").on("resize", function () {
                            if ($("#bccd").length > 0) {
                                bccd2d();
                            }
                        });
                    }
                    bccdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bccd2d();
                                bccdd2.off("resize").on("resize", function () {
                                    if ($("#bccd").length > 0) {
                                        bccd2d();
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

                        BCCDDT = parseFloat(changes.value);

                        if (BCCDDT <= 100) {
                            BCCDOTCR = 103;
                        }
                        else if (BCCDDT > 100 && BCCDDT <= 200) {
                            BCCDOTCR = 100;
                        }
                        else if (BCCDDT > 200 && BCCDDT <= 250) {
                            BCCDOTCR = 95;
                        }
                        else if (BCCDDT > 250 && BCCDDT <= 350) {
                            BCCDOTCR = 80;
                        }

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCCDSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCCDSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCDSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCCDCCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCCDCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCDCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCDCName = null;

                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BCCDRCategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCCDRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCCDRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCCDRName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDSCategory = [];
                                BCCDCCategory = [];
                                BCCDRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCCDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCCDSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCCDCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCCDRCategory[index] = {
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

                        BCCDSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCCDSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCDSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDSCategoryVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDSType = [];
                                $(result).each(function (index, element) {
                                    BCCDSType[index] = {
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

                        BCCDSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCDSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDSCategoryVal,
                                type: BCCDSTypeVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDSSTD = [];
                                $(result).each(function (index, element) {
                                    BCCDSSTD[index] = {
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

                        BCCDSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCDSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDSCategoryVal,
                                type: BCCDSTypeVal,
                                std: BCCDSSTDVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDSName = [];
                                $(result).each(function (index, element) {
                                    BCCDSName[index] = {
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

                        BCCDCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCCDCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCDCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCDCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDCCategoryVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDCType = [];
                                $(result).each(function (index, element) {
                                    BCCDCType[index] = {
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

                        BCCDCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCDCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCDCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDCCategoryVal,
                                type: BCCDCTypeVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDCSTD = [];
                                $(result).each(function (index, element) {
                                    BCCDCSTD[index] = {
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

                        BCCDCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCDCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDCCategoryVal,
                                type: BCCDCTypeVal,
                                std: BCCDCSTDVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDCName = [];
                                $(result).each(function (index, element) {
                                    BCCDCName[index] = {
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

                        BCCDRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCCDRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCCDRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCCDRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDRCategoryVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDRType = [];
                                $(result).each(function (index, element) {
                                    BCCDRType[index] = {
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

                        BCCDRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCCDRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCCDRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDRCategoryVal,
                                type: BCCDRTypeVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDRSTD = [];
                                $(result).each(function (index, element) {
                                    BCCDRSTD[index] = {
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

                        BCCDRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCCDRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCDRCategoryVal,
                                type: BCCDRTypeVal,
                                std: BCCDRSTDVal,
                                temp: BCCDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCDRName = [];
                                $(result).each(function (index, element) {
                                    BCCDRName[index] = {
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
                            let BCCDPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCCDPS = parseFloat(rows[2][columns[0][1].field]);

                                // 计算压力
                                let BCCDPC = BCCDPD + BCCDPS;

                                // 试验类型
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCCDTest = rows[3][columns[0][1].field];

                                    // 筒体材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let BCCDSNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取筒体材料密度、最大最小厚度
                                        let BCCDDS, BCCDSThkMin, BCCDSThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCCDSCategoryVal,
                                                "type": BCCDSTypeVal,
                                                "std": BCCDSSTDVal,
                                                "name": BCCDSNameVal,
                                                "temp": BCCDDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCCDDS = parseFloat(result.density);
                                                BCCDSThkMin = parseFloat(result.thkMin);
                                                BCCDSThkMax = parseFloat(result.thkMax);

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let BCCDSDI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bccd2d("Φ" + BCCDSDI);
                                                        bccdd2.off("resize").on("resize", function () {
                                                            if ($("#bccd").length > 0) {
                                                                bccd2d("Φ" + BCCDSDI);
                                                            }
                                                        });
                                                    }
                                                    bccdd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bccd2d("Φ" + BCCDSDI);
                                                                bccdd2.off("resize").on("resize", function () {
                                                                    if ($("#bccd").length > 0) {
                                                                        bccd2d("Φ" + BCCDSDI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCCDSThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCCDSThkMax) {
                                                        let BCCDTHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bccd2d("Φ" + BCCDSDI, BCCDTHKSN);
                                                            bccdd2.off("resize").on("resize", function () {
                                                                if ($("#bccd").length > 0) {
                                                                    bccd2d("Φ" + BCCDSDI, BCCDTHKSN);
                                                                }
                                                            });
                                                        }
                                                        bccdd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bccd2d("Φ" + BCCDSDI, BCCDTHKSN);
                                                                    bccdd2.off("resize").on("resize", function () {
                                                                        if ($("#bccd").length > 0) {
                                                                            bccd2d("Φ" + BCCDSDI, BCCDTHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BCCDSDO = BCCDSDI + 2 * BCCDTHKSN;

                                                        let BCCDOST, BCCDOS, BCCDRSREL, BCCDCS1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCCDSCategoryVal,
                                                                "type": BCCDSTypeVal,
                                                                "std": BCCDSSTDVal,
                                                                "name": BCCDSNameVal,
                                                                "thk": BCCDTHKSN,
                                                                "temp": BCCDDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": BCCDSDO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCCDOST = parseFloat(result.ot);
                                                                if (BCCDOST < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCDOS = parseFloat(result.o);
                                                                if (BCCDOS < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCDRSREL = parseFloat(result.rel);
                                                                if (BCCDRSREL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCDCS1 = parseFloat(result.c1);
                                                                if (BCCDCS1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < BCCDTHKSN) {
                                                                    let BCCDCS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体焊接接头系数
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let BCCDES = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量C
                                                                        let BCCDCS = BCCDCS1 + BCCDCS2;

                                                                        // 筒体有效厚度
                                                                        let BCCDTHKSE = BCCDTHKSN - BCCDCS;

                                                                        // 筒体计算厚度
                                                                        let BCCDTHKSC = BCCDPC * BCCDSDI / (2 * BCCDOST * BCCDES);

                                                                        // 筒体设计厚度
                                                                        let BCCDTHKSD = BCCDTHKSC + BCCDCS2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "筒体所需厚度：" + (BCCDTHKSD + BCCDCS1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 筒体厚度校核
                                                                        let BCCDTHKSCHK;
                                                                        if (BCCDTHKSN >= (BCCDTHKSD + BCCDCS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCCDTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCCDTHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCCDTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCCDTHKSCHK = "不合格";
                                                                        }

                                                                        // 封头材料名称
                                                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                            let BCCDCNameVal = rows[15][columns[0][1].field];

                                                                            // AJAX 获取封头材料密度、最大最小厚度
                                                                            let BCCDDC, BCCDCThkMin, BCCDCThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BCCDCCategoryVal,
                                                                                    "type": BCCDCTypeVal,
                                                                                    "std": BCCDCSTDVal,
                                                                                    "name": BCCDCNameVal,
                                                                                    "temp": BCCDDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BCCDDC = parseFloat(result.density);
                                                                                    BCCDCThkMin = parseFloat(result.thkMin);
                                                                                    BCCDCThkMax = parseFloat(result.thkMax);

                                                                                    // 封头内半径
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                        && parseFloat(rows[16][columns[0][1].field]) >= 0.5 * BCCDSDI) {
                                                                                        let BCCDCRI = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI);
                                                                                            bccdd2.off("resize").on("resize", function () {
                                                                                                if ($("#bccd").length > 0) {
                                                                                                    bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        bccdd2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI);
                                                                                                    bccdd2.off("resize").on("resize", function () {
                                                                                                        if ($("#bccd").length > 0) {
                                                                                                            bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // 球壳切线与圆筒壁夹角 alpha(弧度)
                                                                                        let BCCDALPHA = Math.acos(BCCDSDI / (2 * BCCDCRI));

                                                                                        // 度数
                                                                                        let BCCDDEGREE = BCCDALPHA / Math.PI * 180;

                                                                                        // 封头名义厚度
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) > BCCDCThkMin
                                                                                            && parseFloat(rows[17][columns[0][1].field]) <= BCCDCThkMax) {
                                                                                            let BCCDTHKCN = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN);
                                                                                                bccdd2.off("resize").on("resize", function () {
                                                                                                    if ($("#bccd").length > 0) {
                                                                                                        bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            bccdd2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN);
                                                                                                        bccdd2.off("resize").on("resize", function () {
                                                                                                            if ($("#bccd").length > 0) {
                                                                                                                bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            let BCCDCRO = BCCDCRI + BCCDTHKCN;

                                                                                            let BCCDOCT, BCCDOC,
                                                                                                BCCDRCREL, BCCDCC1;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BCCDCCategoryVal,
                                                                                                    "type": BCCDCTypeVal,
                                                                                                    "std": BCCDCSTDVal,
                                                                                                    "name": BCCDCNameVal,
                                                                                                    "thk": BCCDTHKCN,
                                                                                                    "temp": BCCDDT,
                                                                                                    "highLow": 3,
                                                                                                    "isTube": 0,
                                                                                                    "od": BCCDCRO * 2
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BCCDOCT = parseFloat(result.ot);
                                                                                                    if (BCCDOCT < 0) {
                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCCDOC = parseFloat(result.o);
                                                                                                    if (BCCDOC < 0) {
                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCCDRCREL = parseFloat(result.rel);
                                                                                                    if (BCCDRCREL < 0) {
                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCCDCC1 = parseFloat(result.c1);
                                                                                                    if (BCCDCC1 < 0) {
                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 封头腐蚀裕量
                                                                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) < BCCDTHKCN) {
                                                                                                        let BCCDCC2 = parseFloat(rows[18][columns[0][1].field]);

                                                                                                        // 封头厚度附加量
                                                                                                        let BCCDCC = BCCDCC1 + BCCDCC2;

                                                                                                        // 封头有效厚度
                                                                                                        let BCCDTHKCE = BCCDTHKCN - BCCDCC;

                                                                                                        // 封头焊接接头系数
                                                                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                                                                            let BCCDEC = parseFloat(rows[19][columns[0][1].field]);

                                                                                                            // 封头计算厚度
                                                                                                            let BCCDTHKCC = BCCDPC * BCCDSDI / (2 * BCCDOCT * BCCDEC);

                                                                                                            // 设计厚度
                                                                                                            let BCCDTHKCD = BCCDTHKCC + BCCDCC2;

                                                                                                            // 所需厚度提示信息
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "封头所需厚度：" + (BCCDTHKCD + BCCDCC1).toFixed(2) + " mm" +
                                                                                                                "</span>");

                                                                                                            // 封头厚度校核
                                                                                                            let BCCDTHKCCHK;
                                                                                                            if (BCCDTHKCN >= (BCCDTHKCD + BCCDCC1).toFixed(2)) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BCCDTHKCN + " mm" +
                                                                                                                    "</span>");
                                                                                                                BCCDTHKCCHK = "合格";
                                                                                                            } else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BCCDTHKCN + " mm" +
                                                                                                                    "</span>");
                                                                                                                BCCDTHKCCHK = "不合格";
                                                                                                            }

                                                                                                            // 角钢材料名称
                                                                                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                                                                                let BCCDRNameVal = rows[23][columns[0][1].field];

                                                                                                                // AJAX 获取角钢材料密度、最大最小厚度
                                                                                                                let BCCDDR,
                                                                                                                    BCCDRThkMin,
                                                                                                                    BCCDRThkMax;
                                                                                                                $.ajax({
                                                                                                                    type: "POST",
                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                                    async: true,
                                                                                                                    dataType: "json",
                                                                                                                    data: JSON.stringify({
                                                                                                                        "category": BCCDRCategoryVal,
                                                                                                                        "type": BCCDRTypeVal,
                                                                                                                        "std": BCCDRSTDVal,
                                                                                                                        "name": BCCDRNameVal,
                                                                                                                        "temp": BCCDDT
                                                                                                                    }),
                                                                                                                    beforeSend: function () {
                                                                                                                    },
                                                                                                                    success: function (result) {

                                                                                                                        BCCDDR = parseFloat(result.density);
                                                                                                                        BCCDRThkMin = parseFloat(result.thkMin);
                                                                                                                        BCCDRThkMax = parseFloat(result.thkMax);

                                                                                                                        // 角钢名义厚度
                                                                                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) > BCCDRThkMin
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) <= BCCDRThkMax) {
                                                                                                                            let BCCDTHKRN = parseFloat(rows[24][columns[0][1].field]);

                                                                                                                            // Sketch
                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN);
                                                                                                                                bccdd2.off("resize").on("resize", function () {
                                                                                                                                    if ($("#bccd").length > 0) {
                                                                                                                                        bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN);
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            }
                                                                                                                            bccdd2d3.tabs({
                                                                                                                                onSelect: function (title, index) {
                                                                                                                                    if (index === 0) {
                                                                                                                                        bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN);
                                                                                                                                        bccdd2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bccd").length > 0) {
                                                                                                                                                bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            });

                                                                                                                            let BCCDORT,
                                                                                                                                BCCDOR,
                                                                                                                                BCCDRRREL,
                                                                                                                                BCCDCR1;
                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "category": BCCDRCategoryVal,
                                                                                                                                    "type": BCCDRTypeVal,
                                                                                                                                    "std": BCCDRSTDVal,
                                                                                                                                    "name": BCCDRNameVal,
                                                                                                                                    "thk": BCCDTHKRN,
                                                                                                                                    "temp": BCCDDT,
                                                                                                                                    "highLow": 3,
                                                                                                                                    "isTube": 0,
                                                                                                                                    "od": 100000
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    BCCDORT = parseFloat(result.ot);
                                                                                                                                    if (BCCDORT < 0) {
                                                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCDOR = parseFloat(result.o);
                                                                                                                                    if (BCCDOR < 0) {
                                                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCDRRREL = parseFloat(result.rel);
                                                                                                                                    if (BCCDRRREL < 0) {
                                                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCDCR1 = parseFloat(result.c1);
                                                                                                                                    if (BCCDCR1 < 0) {
                                                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }

                                                                                                                                    // 角钢宽度
                                                                                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BCCDTHKRN
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) <= 16 * BCCDTHKRN) {
                                                                                                                                        let BCCDWR = parseFloat(rows[25][columns[0][1].field]);

                                                                                                                                        // Sketch
                                                                                                                                        if (currentTabIndex === 0) {
                                                                                                                                            bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN, BCCDWR);
                                                                                                                                            bccdd2.off("resize").on("resize", function () {
                                                                                                                                                if ($("#bccd").length > 0) {
                                                                                                                                                    bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN, BCCDWR);
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        }
                                                                                                                                        bccdd2d3.tabs({
                                                                                                                                            onSelect: function (title, index) {
                                                                                                                                                if (index === 0) {
                                                                                                                                                    bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN, BCCDWR);
                                                                                                                                                    bccdd2.off("resize").on("resize", function () {
                                                                                                                                                        if ($("#bccd").length > 0) {
                                                                                                                                                            bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN, BCCDWR);
                                                                                                                                                        }
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        });

                                                                                                                                        // 角钢高度
                                                                                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                                                                                            && parseFloat(rows[26][columns[0][1].field]) >= BCCDTHKRN) {
                                                                                                                                            let BCCDHR = parseFloat(rows[26][columns[0][1].field]);

                                                                                                                                            // Sketch
                                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                                bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN, BCCDWR, BCCDHR);
                                                                                                                                                bccdd2.off("resize").on("resize", function () {
                                                                                                                                                    if ($("#bccd").length > 0) {
                                                                                                                                                        bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN, BCCDWR, BCCDHR);
                                                                                                                                                    }
                                                                                                                                                });
                                                                                                                                            }
                                                                                                                                            bccdd2d3.tabs({
                                                                                                                                                onSelect: function (title, index) {
                                                                                                                                                    if (index === 0) {
                                                                                                                                                        bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN, BCCDWR, BCCDHR);
                                                                                                                                                        bccdd2.off("resize").on("resize", function () {
                                                                                                                                                            if ($("#bccd").length > 0) {
                                                                                                                                                                bccd2d("Φ" + BCCDSDI, BCCDTHKSN, "SR" + BCCDCRI, BCCDTHKCN, BCCDTHKRN, BCCDWR, BCCDHR);
                                                                                                                                                            }
                                                                                                                                                        });
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            });

                                                                                                                                            // 角钢厚度附加量
                                                                                                                                            let BCCDCR = BCCDCR1 + 0;

                                                                                                                                            // 角钢有效厚度
                                                                                                                                            let BCCDTHKRE = BCCDTHKRN - BCCDCR1;

                                                                                                                                            // 角钢焊接接头系数
                                                                                                                                            if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                                                                                                let BCCDER = parseFloat(rows[27][columns[0][1].field]);

                                                                                                                                                // t2s
                                                                                                                                                let BCCDT2S = BCCDCRI * BCCDPC;

                                                                                                                                                let BCCDT1 = 0.5 * BCCDCRI * BCCDPC;

                                                                                                                                                let BCCDT2 = 0.5 * BCCDCRI * BCCDPC;

                                                                                                                                                let BCCDWS = 0.6 * Math.sqrt(BCCDCRI * BCCDTHKSE);

                                                                                                                                                let BCCDWC = 0.6 * Math.sqrt(BCCDCRI * BCCDTHKCE);

                                                                                                                                                // 角钢截面积
                                                                                                                                                let BCCDAC = BCCDHR * BCCDTHKRE + (BCCDWR - BCCDTHKRN) * BCCDTHKRE;

                                                                                                                                                let BCCDQ = BCCDT2 * BCCDWC + BCCDT2S * BCCDWS - BCCDT2 * BCCDCRI * Math.sin(BCCDALPHA);

                                                                                                                                                let BCCDA = -1,
                                                                                                                                                    BCCDAR = -1,
                                                                                                                                                    BCCDARCHK = -1,
                                                                                                                                                    BCCDWCSINALPHA = -1,
                                                                                                                                                    BCCDRI00752 = -1,
                                                                                                                                                    BCCDWCSINALPHACHK = -1;

                                                                                                                                                if (BCCDQ < 0) {

                                                                                                                                                    BCCDA = Math.abs(BCCDQ) / BCCDOTCR;
                                                                                                                                                    BCCDAR = BCCDA - BCCDWS * BCCDTHKSE - BCCDWC * BCCDTHKCE;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "连接处需增加的承压面积：" + BCCDAR.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");

                                                                                                                                                    if (BCCDAR <= BCCDAC) {
                                                                                                                                                        BCCDARCHK = "合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "角钢实际有效截面积：" + BCCDAC.toFixed(4) + " mm²" +
                                                                                                                                                            "</span>");
                                                                                                                                                    } else {
                                                                                                                                                        BCCDARCHK = "不合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "角钢实际有效截面积：" + BCCDAC.toFixed(4) + " mm²" +
                                                                                                                                                            "</span>");
                                                                                                                                                    }

                                                                                                                                                    BCCDRI00752 = 0.0075 * 2 * BCCDCRI;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "连接处防止失稳所需的最小径向投影长度：" + BCCDRI00752.toFixed(4) + " mm" +
                                                                                                                                                        "</span>");

                                                                                                                                                    BCCDWCSINALPHA = BCCDWC * Math.sin(BCCDALPHA);
                                                                                                                                                    if (BCCDWCSINALPHA >= BCCDRI00752) {
                                                                                                                                                        BCCDWCSINALPHACHK = "合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际径向投影长度：" + BCCDWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                    } else {
                                                                                                                                                        BCCDWCSINALPHACHK = "不合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际径向投影长度：" + BCCDWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                    }

                                                                                                                                                } else {

                                                                                                                                                    BCCDA = Math.abs(BCCDQ) / Math.min(BCCDEC * BCCDOCT, BCCDES * BCCDOST, BCCDER * BCCDORT);
                                                                                                                                                    BCCDAR = BCCDA - BCCDWS * BCCDTHKSE - BCCDWC * BCCDTHKCE;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "连接处需增加的承压面积：" + BCCDAR.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");

                                                                                                                                                    if (BCCDAR <= BCCDAC) {
                                                                                                                                                        BCCDARCHK = "合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "角钢实际有效截面积：" + BCCDAC.toFixed(4) + " mm²" +
                                                                                                                                                            "</span>");
                                                                                                                                                    } else {
                                                                                                                                                        BCCDARCHK = "不合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "角钢实际有效截面积：" + BCCDAC.toFixed(4) + " mm²" +
                                                                                                                                                            "</span>");
                                                                                                                                                    }

                                                                                                                                                }

                                                                                                                                                // 试验压力
                                                                                                                                                let BCCDPCT,
                                                                                                                                                    BCCDPST,
                                                                                                                                                    BCCDPRT,
                                                                                                                                                    BCCDPT;
                                                                                                                                                if (BCCDTest === "液压试验") {
                                                                                                                                                    BCCDPCT = Math.max(1.25 * BCCDPD * BCCDOC / BCCDOCT, 0.05);
                                                                                                                                                    BCCDPST = Math.max(1.25 * BCCDPD * BCCDOS / BCCDOST, 0.05);
                                                                                                                                                    BCCDPRT = Math.max(1.25 * BCCDPD * BCCDOR / BCCDORT, 0.05);
                                                                                                                                                    BCCDPT = Math.min(BCCDPCT, BCCDPST, BCCDPRT);
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "压力试验：" + "液压/" + BCCDPT.toFixed(4) + " MPa" +
                                                                                                                                                        "</span>");
                                                                                                                                                } else {
                                                                                                                                                    BCCDPCT = Math.max(1.10 * BCCDPD * BCCDOC / BCCDOCT, 0.05);
                                                                                                                                                    BCCDPST = Math.max(1.10 * BCCDPD * BCCDOS / BCCDOST, 0.05);
                                                                                                                                                    BCCDPRT = Math.max(1.10 * BCCDPD * BCCDOR / BCCDORT, 0.05);
                                                                                                                                                    BCCDPT = Math.min(BCCDPCT, BCCDPST, BCCDPRT);
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "压力试验：" + "气压/" + BCCDPT.toFixed(4) + " MPa" +
                                                                                                                                                        "</span>");
                                                                                                                                                }

                                                                                                                                                // docx
                                                                                                                                                let BCCDPayJS = $('#payjs');

                                                                                                                                                function getDocx() {
                                                                                                                                                    $.ajax({
                                                                                                                                                        type: "POST",
                                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                                        url: "bccddocx.action",
                                                                                                                                                        async: true,
                                                                                                                                                        dataType: "json",
                                                                                                                                                        data: JSON.stringify({
                                                                                                                                                            ribbonName: "BCCD",

                                                                                                                                                            t: BCCDDT,
                                                                                                                                                            pd: BCCDPD,
                                                                                                                                                            ps: BCCDPS,
                                                                                                                                                            sstd: BCCDSSTDVal,
                                                                                                                                                            sname: BCCDSNameVal,
                                                                                                                                                            di: BCCDSDI,
                                                                                                                                                            thksn: BCCDTHKSN,
                                                                                                                                                            cs2: BCCDCS2,
                                                                                                                                                            es: BCCDES,
                                                                                                                                                            cstd: BCCDCSTDVal,
                                                                                                                                                            cname: BCCDCNameVal,
                                                                                                                                                            ri: BCCDCRI,
                                                                                                                                                            thkcn: BCCDTHKCN,
                                                                                                                                                            cc2: BCCDCC2,
                                                                                                                                                            ec: BCCDEC,
                                                                                                                                                            rstd: BCCDRSTDVal,
                                                                                                                                                            rname: BCCDRNameVal,
                                                                                                                                                            thkrn: BCCDTHKRN,
                                                                                                                                                            wr: BCCDWR,
                                                                                                                                                            hr: BCCDHR,
                                                                                                                                                            er: BCCDER,
                                                                                                                                                            test: BCCDTest,
                                                                                                                                                            dc: BCCDDC.toFixed(4),
                                                                                                                                                            ds: BCCDDS.toFixed(4),
                                                                                                                                                            oct: BCCDOCT.toFixed(4),
                                                                                                                                                            ost: BCCDOST.toFixed(4),
                                                                                                                                                            oc: BCCDOC.toFixed(4),
                                                                                                                                                            os: BCCDOS.toFixed(4),
                                                                                                                                                            rcrel: BCCDRCREL.toFixed(4),
                                                                                                                                                            rsrel: BCCDRSREL.toFixed(4),
                                                                                                                                                            cc1: BCCDCC1.toFixed(4),
                                                                                                                                                            cs1: BCCDCS1.toFixed(4),
                                                                                                                                                            dr: BCCDDR.toFixed(4),
                                                                                                                                                            ort: BCCDORT.toFixed(4),
                                                                                                                                                            or: BCCDOR.toFixed(4),
                                                                                                                                                            rrrel: BCCDRRREL.toFixed(4),
                                                                                                                                                            cr1: BCCDCR1.toFixed(4),
                                                                                                                                                            pc: BCCDPC.toFixed(4),
                                                                                                                                                            cc: BCCDCC.toFixed(4),
                                                                                                                                                            thkce: BCCDTHKCE.toFixed(4),
                                                                                                                                                            cs: BCCDCS.toFixed(4),
                                                                                                                                                            thkse: BCCDTHKSE.toFixed(4),
                                                                                                                                                            cr: BCCDCR.toFixed(4),
                                                                                                                                                            thkre: BCCDTHKRE.toFixed(4),
                                                                                                                                                            alpha: BCCDDEGREE.toFixed(4),
                                                                                                                                                            otcr: BCCDOTCR.toFixed(4),
                                                                                                                                                            thkcc: BCCDTHKCC.toFixed(4),
                                                                                                                                                            thkcd: BCCDTHKCD.toFixed(4),
                                                                                                                                                            thkcchk: BCCDTHKCCHK,
                                                                                                                                                            thksc: BCCDTHKSC.toFixed(4),
                                                                                                                                                            thksd: BCCDTHKSD.toFixed(4),
                                                                                                                                                            thkschk: BCCDTHKSCHK,
                                                                                                                                                            t2s: BCCDT2S.toFixed(4),
                                                                                                                                                            t1: BCCDT1.toFixed(4),
                                                                                                                                                            t2: BCCDT2.toFixed(4),
                                                                                                                                                            ws: BCCDWS.toFixed(4),
                                                                                                                                                            wc: BCCDWC.toFixed(4),
                                                                                                                                                            q: BCCDQ.toFixed(4),
                                                                                                                                                            a: BCCDA.toFixed(4),
                                                                                                                                                            ar: BCCDAR.toFixed(4),
                                                                                                                                                            ac: BCCDAC.toFixed(4),
                                                                                                                                                            archk: BCCDARCHK,
                                                                                                                                                            wcsinalpha: BCCDWCSINALPHA.toFixed(4),
                                                                                                                                                            ri000752: BCCDRI00752.toFixed(4),
                                                                                                                                                            wcsinalphachk: BCCDWCSINALPHACHK,
                                                                                                                                                            pct: BCCDPCT.toFixed(4),
                                                                                                                                                            pst: BCCDPST.toFixed(4),
                                                                                                                                                            prt: BCCDPRT.toFixed(4),
                                                                                                                                                            pt: BCCDPT.toFixed(4)
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
                                                                                                                                                                BCCDPayJS.dialog({
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
                                                                                                                                                                            BCCDPayJS.dialog("close");
                                                                                                                                                                            BCCDPayJS.dialog("clear");
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
                                                                                                                                                                                        BCCDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                                BCCDPayJS.dialog('close');
                                                                                                                                                                                                BCCDPayJS.dialog('clear');
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
                                                                                                                                        else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                                                                                            && parseFloat(rows[26][columns[0][1].field]) < BCCDTHKRN) {
                                                                                                                                            south.html("角钢高度不能小于 " + BCCDTHKRN + " mm").css("color", "red");
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) < BCCDTHKRN) {
                                                                                                                                        south.html("角钢宽度不能小于 " + BCCDTHKRN + " mm").css("color", "red");
                                                                                                                                    }
                                                                                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) > 16 * BCCDTHKRN) {
                                                                                                                                        south.html("角钢宽度不能大于 " + 16 * BCCDTHKRN + " mm").css("color", "red");
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                error: function () {
                                                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                                                }
                                                                                                                            });
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) <= BCCDRThkMin) {
                                                                                                                            south.html("角钢名义厚度不能小于等于 " + BCCDRThkMin + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) > BCCDRThkMax) {
                                                                                                                            south.html("角钢名义厚度不能大于 " + BCCDRThkMax + " mm").css("color", "red");
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
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) >= BCCDTHKCN) {
                                                                                                        south.html("封头腐蚀裕量不能大于等于 " + BCCDTHKCN + " mm").css("color", "red");
                                                                                                    }
                                                                                                },
                                                                                                error: function () {
                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) <= BCCDCThkMin) {
                                                                                            south.html("封头名义厚度不能小于等于 " + BCCDCThkMin + " mm").css("color", "red");
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) > BCCDCThkMax) {
                                                                                            south.html("封头名义厚度不能大于 " + BCCDCThkMax + " mm").css("color", "red");
                                                                                        }
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                        && parseFloat(rows[16][columns[0][1].field]) < 0.5 * BCCDSDI) {
                                                                                        south.html("封头内半径不能小于 " + 0.5 * BCCDSDI + " mm").css("color", "red");
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
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCCDTHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCCDTHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCCDSThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + BCCDSThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCCDSThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + BCCDSThkMax + " mm").css("color", "red");
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