$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcddd2 = $("#d2");
    let bcddd3 = $("#d3");
    let bcddd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcdd'></table>");
    let pg = $("#bcdd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/d/d/BCDD.json", function (result) {

        // 设计温度
        let BCDDDT;

        // 许用压缩应力
        let BCDDOTCR = -1;

        // 材料
        let BCDDSCategory, BCDDSCategoryVal, BCDDSType, BCDDSTypeVal, BCDDSSTD, BCDDSSTDVal, BCDDSName,
            BCDDCCategory, BCDDCCategoryVal, BCDDCType, BCDDCTypeVal, BCDDCSTD, BCDDCSTDVal, BCDDCName,
            BCDDRCategory, BCDDRCategoryVal, BCDDRType, BCDDRTypeVal, BCDDRSTD, BCDDRSTDVal, BCDDRName;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function bcdd2d(di = "ϕDi", thksn = "δsn", ri = "Ri", thkcn = "δcn", thkrn = "δrn", wr = "Wr", hr = "Hr") {

            bcddd2.empty();

            let width = bcddd2.width();
            let height = bcddd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCDDSVG")
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
                ])).attr("id", "BCDDSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCDDSketchDI").attr("startOffset", "50%").text(text);

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
            let BCDDRI = height - 2 * padding;
            let BCDDRM = height - 2 * padding + thickness;

            let centerX = width / 2;
            let centerY = height / 2;

            // 内壁
            let innerArcTopX = centerX + BCDDRI * Math.cos(Math.PI / 6);
            let innerArcTopY = padding;
            let innerArcBottomX = centerX + BCDDRI * Math.cos(Math.PI / 6);
            let innerArcBottomY = height - padding;
            drawArc(BCDDRI, BCDDRI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);

            // 球冠区外壁
            let midArcStartX = centerX + BCDDRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcStartY = centerY - BCDDRM * Math.sin(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            let midArcEndX = centerX + BCDDRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcEndY = centerY + BCDDRM * Math.sin(Math.PI / 6) - thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            drawArc(BCDDRM, BCDDRM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);

            // 中心线
            drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
            drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);

            // 筒体内直径
            dimLeftV(padding + 100, height - padding, padding + 100, padding, di, "BCDDSketchSDI");

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
            ])).attr("id", "BCDDSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDDSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 封头 ri
            let ang = 4;
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY},
                {x: centerX + BCDDRI - 15, y: centerY}
            ])).attr("id", "BCDDSketchRi").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCDDSketchRi").attr("startOffset", "50%").text(ri);

            // thkcn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + BCDDRI, y: centerY},
                    {x: centerX + BCDDRI - 15, y: centerY - 3},
                    {x: centerX + BCDDRI - 15, y: centerY + 3},
                    {x: centerX + BCDDRI, y: centerY}
                ]))
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + BCDDRI, y: centerY},
                {x: centerX + BCDDRM, y: centerY}
            ])).classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + BCDDRM, y: centerY},
                    {x: centerX + BCDDRM + 15, y: centerY - 3},
                    {x: centerX + BCDDRM + 15, y: centerY + 3},
                    {x: centerX + BCDDRM, y: centerY}
                ]))
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + BCDDRM + 15, y: centerY},
                {x: centerX + BCDDRM + 60, y: centerY}
            ])).attr("id", "BCDDSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCDDSketchTHKCN").attr("startOffset", "50%").text(thkcn);

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
            ])).attr("id", "BCDDSketchWR").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDDSketchWR").attr("startOffset", "50%").text(wr);

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
            ])).attr("id", "BCDDSketchHR").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDDSketchHR").attr("startOffset", "50%").text(hr);

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
            ])).attr("id", "BCDDSketchTHKRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDDSketchTHKRN").attr("startOffset", "50%").text(thkrn);

        }

        currentTabIndex = bcddd2d3.tabs('getTabIndex', bcddd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcdd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcdd").length > 0) {
                    bcdd2d();
                }
            });
        }
        bcddd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcdd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcdd").length > 0) {
                            bcdd2d();
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
                    $(ed.target).combobox("loadData", BCDDSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCDDSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCDDSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCDDSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCDDCCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCDDCType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCDDCSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCDDCName);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BCDDRCategory);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BCDDRType);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BCDDRSTD);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BCDDRName);
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
                    bcddd2.empty();

                    // model
                    bcddd3.empty();

                    // sketch
                    currentTabIndex = bcddd2d3.tabs('getTabIndex', bcddd2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        bcdd2d();
                        bcddd2.off("resize").on("resize", function () {
                            if ($("#bcdd").length > 0) {
                                bcdd2d();
                            }
                        });
                    }
                    bcddd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcdd2d();
                                bcddd2.off("resize").on("resize", function () {
                                    if ($("#bcdd").length > 0) {
                                        bcdd2d();
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

                        BCDDDT = parseFloat(changes.value);

                        if (BCDDDT <= 100) {
                            BCDDOTCR = 103;
                        }
                        else if (BCDDDT > 100 && BCDDDT <= 200) {
                            BCDDOTCR = 100;
                        }
                        else if (BCDDDT > 200 && BCDDDT <= 250) {
                            BCDDOTCR = 95;
                        }
                        else if (BCDDDT > 250 && BCDDDT <= 350) {
                            BCDDOTCR = 80;
                        }

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCDDSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCDDSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDDSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCDDCCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCDDCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCDDCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDDCName = null;

                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BCDDRCategory = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCDDRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCDDRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCDDRName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDSCategory = [];
                                BCDDCCategory = [];
                                BCDDRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCDDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCDDSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCDDCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCDDRCategory[index] = {
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

                        BCDDSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCDDSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDDSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDSCategoryVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDSType = [];
                                $(result).each(function (index, element) {
                                    BCDDSType[index] = {
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

                        BCDDSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDDSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDDSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDSCategoryVal,
                                type: BCDDSTypeVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDSSTD = [];
                                $(result).each(function (index, element) {
                                    BCDDSSTD[index] = {
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

                        BCDDSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDDSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDSCategoryVal,
                                type: BCDDSTypeVal,
                                std: BCDDSSTDVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDSName = [];
                                $(result).each(function (index, element) {
                                    BCDDSName[index] = {
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

                        BCDDCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCDDCType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCDDCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDDCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDCCategoryVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDCType = [];
                                $(result).each(function (index, element) {
                                    BCDDCType[index] = {
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

                        BCDDCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCDDCSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDDCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDCCategoryVal,
                                type: BCDDCTypeVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDCSTD = [];
                                $(result).each(function (index, element) {
                                    BCDDCSTD[index] = {
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

                        BCDDCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDDCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDCCategoryVal,
                                type: BCDDCTypeVal,
                                std: BCDDCSTDVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDCName = [];
                                $(result).each(function (index, element) {
                                    BCDDCName[index] = {
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

                        BCDDRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCDDRType = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCDDRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCDDRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDRCategoryVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDRType = [];
                                $(result).each(function (index, element) {
                                    BCDDRType[index] = {
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

                        BCDDRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCDDRSTD = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCDDRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDRCategoryVal,
                                type: BCDDRTypeVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDRSTD = [];
                                $(result).each(function (index, element) {
                                    BCDDRSTD[index] = {
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

                        BCDDRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCDDRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDDRCategoryVal,
                                type: BCDDRTypeVal,
                                std: BCDDRSTDVal,
                                temp: BCDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDDRName = [];
                                $(result).each(function (index, element) {
                                    BCDDRName[index] = {
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
                            let BCDDPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCDDPS = parseFloat(rows[2][columns[0][1].field]);

                                // 计算压力
                                let BCDDPC = BCDDPD + BCDDPS;

                                // 试验类型
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCDDTest = rows[3][columns[0][1].field];

                                    // 筒体材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let BCDDSNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取筒体材料密度、最大最小厚度
                                        let BCDDDS, BCDDSThkMin, BCDDSThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCDDSCategoryVal,
                                                "type": BCDDSTypeVal,
                                                "std": BCDDSSTDVal,
                                                "name": BCDDSNameVal,
                                                "temp": BCDDDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCDDDS = parseFloat(result.density);
                                                BCDDSThkMin = parseFloat(result.thkMin);
                                                BCDDSThkMax = parseFloat(result.thkMax);

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let BCDDSDI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bcdd2d("Φ" + BCDDSDI);
                                                        bcddd2.off("resize").on("resize", function () {
                                                            if ($("#bcdd").length > 0) {
                                                                bcdd2d("Φ" + BCDDSDI);
                                                            }
                                                        });
                                                    }
                                                    bcddd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bcdd2d("Φ" + BCDDSDI);
                                                                bcddd2.off("resize").on("resize", function () {
                                                                    if ($("#bcdd").length > 0) {
                                                                        bcdd2d("Φ" + BCDDSDI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCDDSThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCDDSThkMax) {
                                                        let BCDDTHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcdd2d("Φ" + BCDDSDI, BCDDTHKSN);
                                                            bcddd2.off("resize").on("resize", function () {
                                                                if ($("#bcdd").length > 0) {
                                                                    bcdd2d("Φ" + BCDDSDI, BCDDTHKSN);
                                                                }
                                                            });
                                                        }
                                                        bcddd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcdd2d("Φ" + BCDDSDI, BCDDTHKSN);
                                                                    bcddd2.off("resize").on("resize", function () {
                                                                        if ($("#bcdd").length > 0) {
                                                                            bcdd2d("Φ" + BCDDSDI, BCDDTHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BCDDSDO = BCDDSDI + 2 * BCDDTHKSN;

                                                        let BCDDOST, BCDDOS, BCDDRSREL, BCDDCS1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCDDSCategoryVal,
                                                                "type": BCDDSTypeVal,
                                                                "std": BCDDSSTDVal,
                                                                "name": BCDDSNameVal,
                                                                "thk": BCDDTHKSN,
                                                                "temp": BCDDDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": BCDDSDO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCDDOST = parseFloat(result.ot);
                                                                if (BCDDOST < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDDOS = parseFloat(result.o);
                                                                if (BCDDOS < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDDRSREL = parseFloat(result.rel);
                                                                if (BCDDRSREL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDDCS1 = parseFloat(result.c1);
                                                                if (BCDDCS1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < BCDDTHKSN) {
                                                                    let BCDDCS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体焊接接头系数
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let BCDDES = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量C
                                                                        let BCDDCS = BCDDCS1 + BCDDCS2;

                                                                        // 筒体有效厚度
                                                                        let BCDDTHKSE = BCDDTHKSN - BCDDCS;

                                                                        // 筒体计算厚度
                                                                        let BCDDTHKSC = BCDDPC * BCDDSDI / (2 * BCDDOST * BCDDES);

                                                                        // 筒体设计厚度
                                                                        let BCDDTHKSD = BCDDTHKSC + BCDDCS2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "筒体所需厚度：" + (BCDDTHKSD + BCDDCS1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 筒体厚度校核
                                                                        let BCDDTHKSCHK;
                                                                        if (BCDDTHKSN >= (BCDDTHKSD + BCDDCS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCDDTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCDDTHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCDDTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCDDTHKSCHK = "不合格";
                                                                        }

                                                                        // 封头材料名称
                                                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                            let BCDDCNameVal = rows[15][columns[0][1].field];

                                                                            // AJAX 获取封头材料密度、最大最小厚度
                                                                            let BCDDDC, BCDDCThkMin, BCDDCThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BCDDCCategoryVal,
                                                                                    "type": BCDDCTypeVal,
                                                                                    "std": BCDDCSTDVal,
                                                                                    "name": BCDDCNameVal,
                                                                                    "temp": BCDDDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BCDDDC = parseFloat(result.density);
                                                                                    BCDDCThkMin = parseFloat(result.thkMin);
                                                                                    BCDDCThkMax = parseFloat(result.thkMax);

                                                                                    // 封头内半径
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                        && parseFloat(rows[16][columns[0][1].field]) >= 0.5 * BCDDSDI) {
                                                                                        let BCDDCRI = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // Sketch
                                                                                        if (currentTabIndex === 0) {
                                                                                            bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI);
                                                                                            bcddd2.off("resize").on("resize", function () {
                                                                                                if ($("#bcdd").length > 0) {
                                                                                                    bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        bcddd2d3.tabs({
                                                                                            onSelect: function (title, index) {
                                                                                                if (index === 0) {
                                                                                                    bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI);
                                                                                                    bcddd2.off("resize").on("resize", function () {
                                                                                                        if ($("#bcdd").length > 0) {
                                                                                                            bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                            }
                                                                                        });

                                                                                        // 球壳切线与圆筒壁夹角 alpha(弧度)
                                                                                        let BCDDALPHA = Math.acos(BCDDSDI / (2 * BCDDCRI));

                                                                                        // 度数
                                                                                        let BCDDDEGREE = BCDDALPHA / Math.PI * 180;

                                                                                        // 封头名义厚度
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) > BCDDCThkMin
                                                                                            && parseFloat(rows[17][columns[0][1].field]) <= BCDDCThkMax) {
                                                                                            let BCDDTHKCN = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN);
                                                                                                bcddd2.off("resize").on("resize", function () {
                                                                                                    if ($("#bcdd").length > 0) {
                                                                                                        bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            bcddd2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN);
                                                                                                        bcddd2.off("resize").on("resize", function () {
                                                                                                            if ($("#bcdd").length > 0) {
                                                                                                                bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            let BCDDCRO = BCDDCRI + BCDDTHKCN;

                                                                                            let BCDDOCT, BCDDOC,
                                                                                                BCDDRCREL, BCDDCC1;
                                                                                            $.ajax({
                                                                                                type: "POST",
                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                async: true,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify({
                                                                                                    "category": BCDDCCategoryVal,
                                                                                                    "type": BCDDCTypeVal,
                                                                                                    "std": BCDDCSTDVal,
                                                                                                    "name": BCDDCNameVal,
                                                                                                    "thk": BCDDTHKCN,
                                                                                                    "temp": BCDDDT,
                                                                                                    "highLow": 3,
                                                                                                    "isTube": 0,
                                                                                                    "od": BCDDCRO * 2
                                                                                                }),
                                                                                                beforeSend: function () {
                                                                                                },
                                                                                                success: function (result) {

                                                                                                    BCDDOCT = parseFloat(result.ot);
                                                                                                    if (BCDDOCT < 0) {
                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCDDOC = parseFloat(result.o);
                                                                                                    if (BCDDOC < 0) {
                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCDDRCREL = parseFloat(result.rel);
                                                                                                    if (BCDDRCREL < 0) {
                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }
                                                                                                    BCDDCC1 = parseFloat(result.c1);
                                                                                                    if (BCDDCC1 < 0) {
                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                        return false;
                                                                                                    }

                                                                                                    // 封头腐蚀裕量
                                                                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) < BCDDTHKCN) {
                                                                                                        let BCDDCC2 = parseFloat(rows[18][columns[0][1].field]);

                                                                                                        // 封头厚度附加量
                                                                                                        let BCDDCC = BCDDCC1 + BCDDCC2;

                                                                                                        // 封头有效厚度
                                                                                                        let BCDDTHKCE = BCDDTHKCN - BCDDCC;

                                                                                                        // 封头焊接接头系数
                                                                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                                                                            let BCDDEC = parseFloat(rows[19][columns[0][1].field]);

                                                                                                            // 封头计算厚度
                                                                                                            let BCDDTHKCC = BCDDPC * BCDDSDI / (2 * BCDDOCT * BCDDEC);

                                                                                                            // 设计厚度
                                                                                                            let BCDDTHKCD = BCDDTHKCC + BCDDCC2;

                                                                                                            // 所需厚度提示信息
                                                                                                            south.append(
                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                "&ensp;|&ensp;" +
                                                                                                                "封头所需厚度：" + (BCDDTHKCD + BCDDCC1).toFixed(2) + " mm" +
                                                                                                                "</span>");

                                                                                                            // 封头厚度校核
                                                                                                            let BCDDTHKCCHK;
                                                                                                            if (BCDDTHKCN >= (BCDDTHKCD + BCDDCC1).toFixed(2)) {
                                                                                                                south.append(
                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BCDDTHKCN + " mm" +
                                                                                                                    "</span>");
                                                                                                                BCDDTHKCCHK = "合格";
                                                                                                            } else {
                                                                                                                south.append(
                                                                                                                    "<span style='color:red;'>" +
                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                    "输入厚度：" + BCDDTHKCN + " mm" +
                                                                                                                    "</span>");
                                                                                                                BCDDTHKCCHK = "不合格";
                                                                                                            }

                                                                                                            // 角钢材料名称
                                                                                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                                                                                let BCDDRNameVal = rows[23][columns[0][1].field];

                                                                                                                // AJAX 获取角钢材料密度、最大最小厚度
                                                                                                                let BCDDDR,
                                                                                                                    BCDDRThkMin,
                                                                                                                    BCDDRThkMax;
                                                                                                                $.ajax({
                                                                                                                    type: "POST",
                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                                                                                    async: true,
                                                                                                                    dataType: "json",
                                                                                                                    data: JSON.stringify({
                                                                                                                        "category": BCDDRCategoryVal,
                                                                                                                        "type": BCDDRTypeVal,
                                                                                                                        "std": BCDDRSTDVal,
                                                                                                                        "name": BCDDRNameVal,
                                                                                                                        "temp": BCDDDT
                                                                                                                    }),
                                                                                                                    beforeSend: function () {
                                                                                                                    },
                                                                                                                    success: function (result) {

                                                                                                                        BCDDDR = parseFloat(result.density);
                                                                                                                        BCDDRThkMin = parseFloat(result.thkMin);
                                                                                                                        BCDDRThkMax = parseFloat(result.thkMax);

                                                                                                                        // 角钢名义厚度
                                                                                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) > BCDDRThkMin
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) <= BCDDRThkMax) {
                                                                                                                            let BCDDTHKRN = parseFloat(rows[24][columns[0][1].field]);

                                                                                                                            // Sketch
                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN);
                                                                                                                                bcddd2.off("resize").on("resize", function () {
                                                                                                                                    if ($("#bcdd").length > 0) {
                                                                                                                                        bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN);
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            }
                                                                                                                            bcddd2d3.tabs({
                                                                                                                                onSelect: function (title, index) {
                                                                                                                                    if (index === 0) {
                                                                                                                                        bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN);
                                                                                                                                        bcddd2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bcdd").length > 0) {
                                                                                                                                                bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            });

                                                                                                                            let BCDDORT,
                                                                                                                                BCDDOR,
                                                                                                                                BCDDRRREL,
                                                                                                                                BCDDCR1;
                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "category": BCDDRCategoryVal,
                                                                                                                                    "type": BCDDRTypeVal,
                                                                                                                                    "std": BCDDRSTDVal,
                                                                                                                                    "name": BCDDRNameVal,
                                                                                                                                    "thk": BCDDTHKRN,
                                                                                                                                    "temp": BCDDDT,
                                                                                                                                    "highLow": 3,
                                                                                                                                    "isTube": 0,
                                                                                                                                    "od": 100000
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    BCDDORT = parseFloat(result.ot);
                                                                                                                                    if (BCDDORT < 0) {
                                                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDDOR = parseFloat(result.o);
                                                                                                                                    if (BCDDOR < 0) {
                                                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDDRRREL = parseFloat(result.rel);
                                                                                                                                    if (BCDDRRREL < 0) {
                                                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDDCR1 = parseFloat(result.c1);
                                                                                                                                    if (BCDDCR1 < 0) {
                                                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }

                                                                                                                                    // 角钢宽度
                                                                                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) >= BCDDTHKRN
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) <= 16 * BCDDTHKRN) {
                                                                                                                                        let BCDDWR = parseFloat(rows[25][columns[0][1].field]);

                                                                                                                                        // Sketch
                                                                                                                                        if (currentTabIndex === 0) {
                                                                                                                                            bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN, BCDDWR);
                                                                                                                                            bcddd2.off("resize").on("resize", function () {
                                                                                                                                                if ($("#bcdd").length > 0) {
                                                                                                                                                    bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN, BCDDWR);
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        }
                                                                                                                                        bcddd2d3.tabs({
                                                                                                                                            onSelect: function (title, index) {
                                                                                                                                                if (index === 0) {
                                                                                                                                                    bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN, BCDDWR);
                                                                                                                                                    bcddd2.off("resize").on("resize", function () {
                                                                                                                                                        if ($("#bcdd").length > 0) {
                                                                                                                                                            bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN, BCDDWR);
                                                                                                                                                        }
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        });

                                                                                                                                        // 角钢高度
                                                                                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                                                                                            && parseFloat(rows[26][columns[0][1].field]) >= BCDDTHKRN) {
                                                                                                                                            let BCDDHR = parseFloat(rows[26][columns[0][1].field]);

                                                                                                                                            // Sketch
                                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                                bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN, BCDDWR, BCDDHR);
                                                                                                                                                bcddd2.off("resize").on("resize", function () {
                                                                                                                                                    if ($("#bcdd").length > 0) {
                                                                                                                                                        bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN, BCDDWR, BCDDHR);
                                                                                                                                                    }
                                                                                                                                                });
                                                                                                                                            }
                                                                                                                                            bcddd2d3.tabs({
                                                                                                                                                onSelect: function (title, index) {
                                                                                                                                                    if (index === 0) {
                                                                                                                                                        bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN, BCDDWR, BCDDHR);
                                                                                                                                                        bcddd2.off("resize").on("resize", function () {
                                                                                                                                                            if ($("#bcdd").length > 0) {
                                                                                                                                                                bcdd2d("Φ" + BCDDSDI, BCDDTHKSN, "SR" + BCDDCRI, BCDDTHKCN, BCDDTHKRN, BCDDWR, BCDDHR);
                                                                                                                                                            }
                                                                                                                                                        });
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            });

                                                                                                                                            // 角钢厚度附加量
                                                                                                                                            let BCDDCR = BCDDCR1 + 0;

                                                                                                                                            // 角钢有效厚度
                                                                                                                                            let BCDDTHKRE = BCDDTHKRN - BCDDCR1;

                                                                                                                                            // 角钢焊接接头系数
                                                                                                                                            if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                                                                                                let BCDDER = parseFloat(rows[27][columns[0][1].field]);

                                                                                                                                                // t2s
                                                                                                                                                let BCDDT2S = BCDDCRI * BCDDPC;

                                                                                                                                                let BCDDT1 = 0.5 * BCDDCRI * BCDDPC;

                                                                                                                                                let BCDDT2 = 0.5 * BCDDCRI * BCDDPC;

                                                                                                                                                let BCDDWS = 0.6 * Math.sqrt(BCDDCRI * BCDDTHKSE);
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "封头单侧筒体最小宽度：" + BCDDWS.toFixed(4) + " mm" +
                                                                                                                                                    "</span>");

                                                                                                                                                let BCDDWC = 0.6 * Math.sqrt(BCDDCRI * BCDDTHKCE);

                                                                                                                                                // 角钢截面积
                                                                                                                                                let BCDDAC = BCDDHR * BCDDTHKRE + (BCDDWR - BCDDTHKRN) * BCDDTHKRE;

                                                                                                                                                let BCDDQ = BCDDT2 * BCDDWC + BCDDT2S * BCDDWS - BCDDT2 * BCDDCRI * Math.sin(BCDDALPHA);

                                                                                                                                                let BCDDA = -1,
                                                                                                                                                    BCDDAR = -1,
                                                                                                                                                    BCDDARCHK = -1,
                                                                                                                                                    BCDDWCSINALPHA = -1,
                                                                                                                                                    BCDDRI00752 = -1,
                                                                                                                                                    BCDDWCSINALPHACHK = -1;

                                                                                                                                                if (BCDDQ < 0) {

                                                                                                                                                    BCDDA = Math.abs(BCDDQ) / BCDDOTCR;
                                                                                                                                                    BCDDAR = BCDDA - 2 * BCDDWS * BCDDTHKSE - BCDDWC * BCDDTHKCE;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "连接处需增加的承压面积：" + BCDDAR.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");

                                                                                                                                                    if (BCDDAR <= BCDDAC) {
                                                                                                                                                        BCDDARCHK = "合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "角钢实际有效截面积：" + BCDDAC.toFixed(4) + " mm²" +
                                                                                                                                                            "</span>");
                                                                                                                                                    } else {
                                                                                                                                                        BCDDARCHK = "不合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "角钢实际有效截面积：" + BCDDAC.toFixed(4) + " mm²" +
                                                                                                                                                            "</span>");
                                                                                                                                                    }

                                                                                                                                                    BCDDRI00752 = 0.0075 * 2 * BCDDCRI;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "连接处防止失稳所需的最小径向投影长度：" + BCDDRI00752.toFixed(4) + " mm" +
                                                                                                                                                        "</span>");

                                                                                                                                                    BCDDWCSINALPHA = BCDDWC * Math.sin(BCDDALPHA);
                                                                                                                                                    if (BCDDWCSINALPHA >= BCDDRI00752) {
                                                                                                                                                        BCDDWCSINALPHACHK = "合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际径向投影长度：" + BCDDWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                    } else {
                                                                                                                                                        BCDDWCSINALPHACHK = "不合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "实际径向投影长度：" + BCDDWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                            "</span>");
                                                                                                                                                    }

                                                                                                                                                } else {

                                                                                                                                                    BCDDA = Math.abs(BCDDQ) / Math.min(BCDDEC * BCDDOCT, BCDDES * BCDDOST, BCDDER * BCDDORT);
                                                                                                                                                    BCDDAR = BCDDA - 2 * BCDDWS * BCDDTHKSE - BCDDWC * BCDDTHKCE;
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "连接处需增加的承压面积：" + BCDDAR.toFixed(4) + " mm²" +
                                                                                                                                                        "</span>");

                                                                                                                                                    if (BCDDAR <= BCDDAC) {
                                                                                                                                                        BCDDARCHK = "合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "角钢实际有效截面积：" + BCDDAC.toFixed(4) + " mm²" +
                                                                                                                                                            "</span>");
                                                                                                                                                    } else {
                                                                                                                                                        BCDDARCHK = "不合格";
                                                                                                                                                        south.append(
                                                                                                                                                            "<span style='color:red;'>" +
                                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                                            "角钢实际有效截面积：" + BCDDAC.toFixed(4) + " mm²" +
                                                                                                                                                            "</span>");
                                                                                                                                                    }

                                                                                                                                                }

                                                                                                                                                // 试验压力
                                                                                                                                                let BCDDPCT,
                                                                                                                                                    BCDDPST,
                                                                                                                                                    BCDDPRT,
                                                                                                                                                    BCDDPT;
                                                                                                                                                if (BCDDTest === "液压试验") {
                                                                                                                                                    BCDDPCT = Math.max(1.25 * BCDDPD * BCDDOC / BCDDOCT, 0.05);
                                                                                                                                                    BCDDPST = Math.max(1.25 * BCDDPD * BCDDOS / BCDDOST, 0.05);
                                                                                                                                                    BCDDPRT = Math.max(1.25 * BCDDPD * BCDDOR / BCDDORT, 0.05);
                                                                                                                                                    BCDDPT = Math.min(BCDDPCT, BCDDPST, BCDDPRT);
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "压力试验：" + "液压/" + BCDDPT.toFixed(4) + " MPa" +
                                                                                                                                                        "</span>");
                                                                                                                                                } else {
                                                                                                                                                    BCDDPCT = Math.max(1.10 * BCDDPD * BCDDOC / BCDDOCT, 0.05);
                                                                                                                                                    BCDDPST = Math.max(1.10 * BCDDPD * BCDDOS / BCDDOST, 0.05);
                                                                                                                                                    BCDDPRT = Math.max(1.10 * BCDDPD * BCDDOR / BCDDORT, 0.05);
                                                                                                                                                    BCDDPT = Math.min(BCDDPCT, BCDDPST, BCDDPRT);
                                                                                                                                                    south.append(
                                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                                        "压力试验：" + "气压/" + BCDDPT.toFixed(4) + " MPa" +
                                                                                                                                                        "</span>");
                                                                                                                                                }

                                                                                                                                                // docx
                                                                                                                                                let BCDDPayJS = $('#payjs');

                                                                                                                                                function getDocx() {
                                                                                                                                                    $.ajax({
                                                                                                                                                        type: "POST",
                                                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                                                        url: "bcdddocx.action",
                                                                                                                                                        async: true,
                                                                                                                                                        dataType: "json",
                                                                                                                                                        data: JSON.stringify({
                                                                                                                                                            ribbonName: "BCDD",

                                                                                                                                                            t: BCDDDT,
                                                                                                                                                            pd: BCDDPD,
                                                                                                                                                            ps: BCDDPS,
                                                                                                                                                            sstd: BCDDSSTDVal,
                                                                                                                                                            sname: BCDDSNameVal,
                                                                                                                                                            di: BCDDSDI,
                                                                                                                                                            thksn: BCDDTHKSN,
                                                                                                                                                            cs2: BCDDCS2,
                                                                                                                                                            es: BCDDES,
                                                                                                                                                            cstd: BCDDCSTDVal,
                                                                                                                                                            cname: BCDDCNameVal,
                                                                                                                                                            ri: BCDDCRI,
                                                                                                                                                            thkcn: BCDDTHKCN,
                                                                                                                                                            cc2: BCDDCC2,
                                                                                                                                                            ec: BCDDEC,
                                                                                                                                                            rstd: BCDDRSTDVal,
                                                                                                                                                            rname: BCDDRNameVal,
                                                                                                                                                            thkrn: BCDDTHKRN,
                                                                                                                                                            wr: BCDDWR,
                                                                                                                                                            hr: BCDDHR,
                                                                                                                                                            er: BCDDER,
                                                                                                                                                            test: BCDDTest,
                                                                                                                                                            dc: BCDDDC.toFixed(4),
                                                                                                                                                            ds: BCDDDS.toFixed(4),
                                                                                                                                                            oct: BCDDOCT.toFixed(4),
                                                                                                                                                            ost: BCDDOST.toFixed(4),
                                                                                                                                                            oc: BCDDOC.toFixed(4),
                                                                                                                                                            os: BCDDOS.toFixed(4),
                                                                                                                                                            rcrel: BCDDRCREL.toFixed(4),
                                                                                                                                                            rsrel: BCDDRSREL.toFixed(4),
                                                                                                                                                            cc1: BCDDCC1.toFixed(4),
                                                                                                                                                            cs1: BCDDCS1.toFixed(4),
                                                                                                                                                            dr: BCDDDR.toFixed(4),
                                                                                                                                                            ort: BCDDORT.toFixed(4),
                                                                                                                                                            or: BCDDOR.toFixed(4),
                                                                                                                                                            rrrel: BCDDRRREL.toFixed(4),
                                                                                                                                                            cr1: BCDDCR1.toFixed(4),
                                                                                                                                                            pc: BCDDPC.toFixed(4),
                                                                                                                                                            cc: BCDDCC.toFixed(4),
                                                                                                                                                            thkce: BCDDTHKCE.toFixed(4),
                                                                                                                                                            cs: BCDDCS.toFixed(4),
                                                                                                                                                            thkse: BCDDTHKSE.toFixed(4),
                                                                                                                                                            cr: BCDDCR.toFixed(4),
                                                                                                                                                            thkre: BCDDTHKRE.toFixed(4),
                                                                                                                                                            alpha: BCDDDEGREE.toFixed(4),
                                                                                                                                                            otcr: BCDDOTCR.toFixed(4),
                                                                                                                                                            thkcc: BCDDTHKCC.toFixed(4),
                                                                                                                                                            thkcd: BCDDTHKCD.toFixed(4),
                                                                                                                                                            thkcchk: BCDDTHKCCHK,
                                                                                                                                                            thksc: BCDDTHKSC.toFixed(4),
                                                                                                                                                            thksd: BCDDTHKSD.toFixed(4),
                                                                                                                                                            thkschk: BCDDTHKSCHK,
                                                                                                                                                            t2s: BCDDT2S.toFixed(4),
                                                                                                                                                            t1: BCDDT1.toFixed(4),
                                                                                                                                                            t2: BCDDT2.toFixed(4),
                                                                                                                                                            ws: BCDDWS.toFixed(4),
                                                                                                                                                            wc: BCDDWC.toFixed(4),
                                                                                                                                                            q: BCDDQ.toFixed(4),
                                                                                                                                                            a: BCDDA.toFixed(4),
                                                                                                                                                            ar: BCDDAR.toFixed(4),
                                                                                                                                                            ac: BCDDAC.toFixed(4),
                                                                                                                                                            archk: BCDDARCHK,
                                                                                                                                                            wcsinalpha: BCDDWCSINALPHA.toFixed(4),
                                                                                                                                                            ri000752: BCDDRI00752.toFixed(4),
                                                                                                                                                            wcsinalphachk: BCDDWCSINALPHACHK,
                                                                                                                                                            pct: BCDDPCT.toFixed(4),
                                                                                                                                                            pst: BCDDPST.toFixed(4),
                                                                                                                                                            prt: BCDDPRT.toFixed(4),
                                                                                                                                                            pt: BCDDPT.toFixed(4)
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
                                                                                                                                                                BCDDPayJS.dialog({
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
                                                                                                                                                                            BCDDPayJS.dialog("close");
                                                                                                                                                                            BCDDPayJS.dialog("clear");
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
                                                                                                                                                                                        BCDDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                                BCDDPayJS.dialog('close');
                                                                                                                                                                                                BCDDPayJS.dialog('clear');
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
                                                                                                                                            && parseFloat(rows[26][columns[0][1].field]) < BCDDTHKRN) {
                                                                                                                                            south.html("角钢高度不能小于 " + BCDDTHKRN + " mm").css("color", "red");
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) < BCDDTHKRN) {
                                                                                                                                        south.html("角钢宽度不能小于 " + BCDDTHKRN + " mm").css("color", "red");
                                                                                                                                    }
                                                                                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[25][columns[0][1].field]) > 16 * BCDDTHKRN) {
                                                                                                                                        south.html("角钢宽度不能大于 " + 16 * BCDDTHKRN + " mm").css("color", "red");
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                error: function () {
                                                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                                                }
                                                                                                                            });
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) <= BCDDRThkMin) {
                                                                                                                            south.html("角钢名义厚度不能小于等于 " + BCDDRThkMin + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                            && parseFloat(rows[24][columns[0][1].field]) > BCDDRThkMax) {
                                                                                                                            south.html("角钢名义厚度不能大于 " + BCDDRThkMax + " mm").css("color", "red");
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
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) >= BCDDTHKCN) {
                                                                                                        south.html("封头腐蚀裕量不能大于等于 " + BCDDTHKCN + " mm").css("color", "red");
                                                                                                    }
                                                                                                },
                                                                                                error: function () {
                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) <= BCDDCThkMin) {
                                                                                            south.html("封头名义厚度不能小于等于 " + BCDDCThkMin + " mm").css("color", "red");
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                            && parseFloat(rows[17][columns[0][1].field]) > BCDDCThkMax) {
                                                                                            south.html("封头名义厚度不能大于 " + BCDDCThkMax + " mm").css("color", "red");
                                                                                        }
                                                                                    }
                                                                                    else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                        && parseFloat(rows[16][columns[0][1].field]) < 0.5 * BCDDSDI) {
                                                                                        south.html("封头内半径不能小于 " + 0.5 * BCDDSDI + " mm").css("color", "red");
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
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCDDTHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCDDTHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCDDSThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + BCDDSThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCDDSThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + BCDDSThkMax + " mm").css("color", "red");
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