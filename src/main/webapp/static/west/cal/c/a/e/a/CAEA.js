$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let caead2 = $("#d2");
    let caead3 = $("#d3");
    let caead2d3 = $('#d2d3');

    $("#cal").html("<table id='caea'></table>");
    let pg = $("#caea");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/e/a/CAEA.json", function (result) {

        let CAEADT;
        let CAEASCategory, CAEASCategoryVal, CAEASType, CAEASTypeVal, CAEASSTD, CAEASSTDVal, CAEASName,
            CAEAJCategory, CAEAJCategoryVal, CAEAJType, CAEAJTypeVal, CAEAJSTD, CAEAJSTDVal, CAEAJName;
        let columns, rows, ed;

        // 2D Sketch
        function caea2d(dsi = "ϕDsi", thksn = "δsn", dout = "ϕdo", ts = "ts", thkjn = "δjn") {

            caead2.empty();

            let width = caead2.width();
            let height = caead2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CAEASVG")
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
            let thickness = 10;
            let paddingH, paddingV;
            if (width >= height) {
                paddingV = 50;
                paddingH = (width - (height - 2 * paddingV) / 2) / 2;
            } else {
                paddingH = 50;
                paddingV = (height - (width - 2 * paddingH) * 2) / 2;
            }

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

            // 顶部水平标注
            function dimTopH(startX, startY, endX, endY, text, id) {

                extLineTopV(startX, startY);
                extLineTopV(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX, y: startY - 30},
                        {x: startX + 15, y: startY - 27},
                        {x: startX + 15, y: startY - 33},
                        {x: startX, y: startY - 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY - 30},
                        {x: endX - 15, y: endY - 27},
                        {x: endX - 15, y: endY - 33},
                        {x: endX, y: endY - 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: startX, y: startY - 30},
                    {x: endX, y: endY - 30}
                ]))
                    .attr("id", id).classed("sketch", true);
                svg.append("g").append("text").attr("x", 0)
                    .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id)
                    .attr("startOffset", "50%").text(text);

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

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            // 筒体壁
            drawLine(paddingH, paddingV, width - paddingH, paddingV);
            drawLine(paddingH, height - paddingV, width - paddingH, height - paddingV);
            drawLine(width - paddingH, paddingV, width - paddingH, height - paddingV);
            drawLine(width - paddingH - thickness, paddingV, width - paddingH - thickness, height - paddingV);
            drawCenterLine(width / 2, paddingV - 10, width / 2, height - paddingV + 10);

            // 盘管外直径
            let CAEADO = (height - 2 * paddingV) / 8;
            let CAEARO = CAEADO / 2;
            let CAEADI = CAEADO - thickness;
            let CAEARI = CAEADI / 2;

            // 右上
            let cx0 = width - paddingH + CAEARO;
            let cy0 = height / 2 - CAEADO;
            drawArc(CAEARO, CAEARO, cx0, cy0 - CAEARO, cx0, cy0 + CAEARO);
            drawArc(CAEARO, CAEARO, cx0, cy0 + CAEARO, cx0, cy0 - CAEARO);
            drawArc(CAEARI, CAEARI, cx0, cy0 - CAEARI, cx0, cy0 + CAEARI);
            drawArc(CAEARI, CAEARI, cx0, cy0 + CAEARI, cx0, cy0 - CAEARI);
            drawCenterLine(cx0 - CAEARO - 10, cy0, cx0 + CAEARO + 10, cy0);
            drawCenterLine(cx0, cy0 - CAEARO - 10, cx0, cy0 + CAEARO + 10);

            // 右下
            let cx1 = width - paddingH + CAEARO;
            let cy1 = height / 2 + CAEADO;
            drawArc(CAEARO, CAEARO, cx1, cy1 - CAEARO, cx1, cy1 + CAEARO);
            drawArc(CAEARO, CAEARO, cx1, cy1 + CAEARO, cx1, cy1 - CAEARO);
            drawArc(CAEARI, CAEARI, cx1, cy1 - CAEARI, cx1, cy1 + CAEARI);
            drawArc(CAEARI, CAEARI, cx1, cy1 + CAEARI, cx1, cy1 - CAEARI);
            drawCenterLine(cx1 - CAEARO - 10, cy1, cx1 + CAEARO + 10, cy1);
            drawCenterLine(cx1, cy1 - CAEARO - 10, cx1, cy1 + CAEARO + 10);

            // 左下
            let cx2 = paddingH - CAEARO;
            let cy2 = height / 2;
            drawArc(CAEARO, CAEARO, cx2, cy2 + CAEARO, cx2, cy2 - CAEARO);
            drawCenterLine(cx2 - CAEARO - 10, cy2, cx2 + CAEARO + 10, cy2);
            drawCenterLine(cx2, cy2 - CAEARO - 10, cx2, cy2 + CAEARO + 10);

            // 左上
            let cx3 = paddingH - CAEARO;
            let cy3 = height / 2 - 2 * CAEADO;
            drawArc(CAEARO, CAEARO, cx3, cy3 + CAEARO, cx3, cy3 - CAEARO);
            drawCenterLine(cx3 - CAEARO - 10, cy3, cx3 + CAEARO + 10, cy3);
            drawCenterLine(cx3, cy3 - CAEARO - 10, cx3, cy3 + CAEARO + 10);

            // delta
            let delta = CAEADO * CAEARO / (CAEADO + width - 2 * paddingH);
            drawLine(paddingH, paddingV, paddingH, cy3 - CAEARO + delta);
            drawLine(paddingH, cy3 + CAEARO + delta, paddingH, cy2 - CAEARO + delta);
            drawLine(paddingH, cy2 + CAEARO + delta, paddingH, height - paddingV);

            // 斜线
            drawLine(cx2, cy3 - CAEARO, width / 2, cy3);
            drawLine(cx2, cy3 + CAEARO, width / 2, cy3 + CAEADO);
            drawLine(cx2, cy2 - CAEARO, width / 2, cy2);
            drawLine(cx2, cy2 + CAEARO, width / 2, cy2 + CAEADO);

            // 斜线中心线
            drawCenterLine(cx2, cy3, cx0, cy0);
            drawCenterLine(cx2, cy2, cx0, cy1);

            // 焊缝
            let weldLength = thickness / 2;
            let weldHeight = Math.sqrt(CAEARO * CAEARO - (CAEARO - weldLength) * (CAEARO - weldLength));
            drawLine(width - paddingH, cy0 - weldHeight, width - paddingH + weldLength, cy0 - weldHeight);
            drawLine(width - paddingH, cy0 + weldHeight, width - paddingH + weldLength, cy0 + weldHeight);
            drawLine(width - paddingH, cy1 - weldHeight, width - paddingH + weldLength, cy1 - weldHeight);
            drawLine(width - paddingH, cy1 + weldHeight, width - paddingH + weldLength, cy1 + weldHeight);

            // DSI
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - paddingH - thickness, y: height - paddingV - 10},
                    {x: width - paddingH - thickness - 15, y: height - paddingV - 10 - 3},
                    {x: width - paddingH - thickness - 15, y: height - paddingV - 10 + 3},
                    {x: width - paddingH - thickness, y: height - paddingV - 10}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2, y: height - paddingV - 10},
                {x: width - paddingH - thickness - 15, y: height - paddingV - 10}
            ])).attr("id", "CAEASketchDSI").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CAEASketchDSI").attr("startOffset", "50%").text(dsi);

            // 内筒体厚度
            drawLine(width - paddingH - thickness, height - paddingV - 10, width - paddingH, height - paddingV - 10);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - paddingH, y: height - paddingV - 10},
                    {x: width - paddingH + 15, y: height - paddingV - 10 - 3},
                    {x: width - paddingH + 15, y: height - paddingV - 10 + 3},
                    {x: width - paddingH, y: height - paddingV - 10}
                ]));
            svg.append("path").attr("d", line([
                {x: width - paddingH + 15, y: height - paddingV - 10},
                {x: width - paddingH + 15 + 40, y: height - paddingV - 10}
            ])).attr("id", "CAEASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CAEASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // ts
            dimRightV(cx0 + CAEARO + 10, cy1, cx0 + CAEARO + 10, cy0, ts, "CAEASketchTS");

            // thkjn
            svg.append("path").attr("d", line([
                {x: cx1 + CAEARO + 15, y: cy1},
                {x: cx1 + CAEARO + 15 + 40, y: cy1}
            ])).attr("id", "CAEASketchTHKJN").classed("sketch", true)
                .attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAEASketchTHKJN").attr("startOffset", "50%").text(thkjn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + CAEARO, y: cy1},
                    {x: cx1 + CAEARO + 15, y: cy1 - 3},
                    {x: cx1 + CAEARO + 15, y: cy1 + 3},
                    {x: cx1 + CAEARO, y: cy1}
                ])).attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + CAEARI, y: cy1},
                    {x: cx1 + CAEARI - 15, y: cy1 - 3},
                    {x: cx1 + CAEARI - 15, y: cy1 + 3},
                    {x: cx1 + CAEARI, y: cy1}
                ])).attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").attr("d", line([
                {x: cx1 + CAEARI, y: cy1},
                {x: cx1 + CAEARO, y: cy1}
            ])).classed("sketch", true).attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").attr("d", line([
                {x: cx1 + CAEARI - 15, y: cy1},
                {x: cx1 + CAEARI - 30, y: cy1}
            ])).classed("sketch", true).attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");

            // 夹套外直径
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + CAEARO, y: cy0},
                    {x: cx0 + CAEARO + 15, y: cy0 - 3},
                    {x: cx0 + CAEARO + 15, y: cy0 + 3},
                    {x: cx0 + CAEARO, y: cy0}
                ])).attr("transform", "rotate(" + -45 + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", line([
                {x: cx0 + CAEARO + 30, y: cy0},
                {x: cx0 + CAEARO + 15, y: cy0}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + cx0 + " " + (cy0) + ")");
            svg.append("path").attr("d", line([
                {x: cx0 + 0.707 * (CAEARO + 30), y: cy0 - 0.707 * (CAEARO + 30)},
                {x: cx0 + 0.707 * (CAEARO + 30) + 40, y: cy0 - 0.707 * (CAEARO + 30)}
            ])).attr("id", "CAEASketchDJO").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAEASketchDJO").attr("startOffset", "50%").text(dout);

            // a
            svg.append("path").attr("d", line([
                {x: width - paddingH - thickness, y: (cy0 + cy1) / 2},
                {x: width - paddingH, y: (cy0 + cy1) / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - paddingH - thickness - 10, y: (cy0 + cy1) / 2},
                {x: width - paddingH - thickness, y: (cy0 + cy1) / 2}
            ])).attr("id", "CAEASketchA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 4)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAEASketchA").attr("startOffset", "50%").text("a");

            //b 上
            svg.append("path").attr("d", line([
                {x: width - paddingH - thickness - 10, y: cy0},
                {x: width - paddingH - thickness, y: cy0}
            ])).attr("id", "CAEASketchB1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 4)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAEASketchB1").attr("startOffset", "50%").text("b");

            // b 下
            svg.append("path").attr("d", line([
                {x: width - paddingH - thickness - 10, y: cy1},
                {x: width - paddingH - thickness, y: cy1}
            ])).attr("id", "CAEASketchB2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 4)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAEASketchB2").attr("startOffset", "50%").text("b");
        }

        currentTabIndex = caead2d3.tabs('getTabIndex', caead2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            caea2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#caea").length > 0) {
                    caea2d();
                }
            });
        }
        caead2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    caea2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#caea").length > 0) {
                            caea2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20569-2013 焊接螺旋外盘管容器强度校核",
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
                    align: "left",
                    styler: function (value, row, index) {
                        // return "background-color:#efefef;";
                    }
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

                if (index === 2) {
                    $(ed.target).combobox("loadData", CAEASCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", CAEASType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", CAEASSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CAEASName);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", CAEAJCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CAEAJType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CAEAJSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", CAEAJName);
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
                    caead2.empty();

                    // model
                    caead3.empty();

                    // sketch
                    currentTabIndex = caead2d3.tabs('getTabIndex', caead2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        caea2d();
                        caead2.off("resize").on("resize", function () {
                            if ($("#caea").length > 0) {
                                caea2d();
                            }
                        });
                    }
                    caead2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                caea2d();
                                caead2.off("resize").on("resize", function () {
                                    if ($("#caea").length > 0) {
                                        caea2d();
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
                    if (index === 0) {

                        CAEADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        CAEASCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CAEASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAEASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAEASName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CAEAJCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAEAJType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAEAJSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAEAJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAEASCategory = [];
                                CAEAJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CAEADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CAEASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CAEAJCategory[index] = {
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
                    else if (index === 2) {

                        CAEASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CAEASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAEASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAEASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAEASCategoryVal,
                                temp: CAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAEASType = [];
                                $(result).each(function (index, element) {
                                    CAEASType[index] = {
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
                    else if (index === 3) {

                        CAEASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAEASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAEASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAEASCategoryVal,
                                type: CAEASTypeVal,
                                temp: CAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAEASSTD = [];
                                $(result).each(function (index, element) {
                                    CAEASSTD[index] = {
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
                    else if (index === 4) {

                        CAEASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAEASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAEASCategoryVal,
                                type: CAEASTypeVal,
                                std: CAEASSTDVal,
                                temp: CAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAEASName = [];
                                $(result).each(function (index, element) {
                                    CAEASName[index] = {
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
                    else if (index === 13) {

                        CAEAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAEAJType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAEAJSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAEAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAEAJCategoryVal,
                                temp: CAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAEAJType = [];
                                $(result).each(function (index, element) {
                                    CAEAJType[index] = {
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
                    else if (index === 14) {

                        CAEAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAEAJSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAEAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAEAJCategoryVal,
                                type: CAEAJTypeVal,
                                temp: CAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAEAJSTD = [];
                                $(result).each(function (index, element) {
                                    CAEAJSTD[index] = {
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
                    else if (index === 15) {

                        CAEAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAEAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAEAJCategoryVal,
                                type: CAEAJTypeVal,
                                std: CAEAJSTDVal,
                                temp: CAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAEAJName = [];
                                $(result).each(function (index, element) {
                                    CAEAJName[index] = {
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

                        // 试验类型
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let CAEATest = rows[1][columns[0][1].field];

                            // 筒体材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                let CAEASNameVal = rows[5][columns[0][1].field];

                                // AJAX 获取筒体材料密度、最大最小厚度
                                let CAEASDensity, CAEASThkMin, CAEASThkMax, CAEAMius, CAEASTempMin, CAEASTempMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": CAEASCategoryVal,
                                        "type": CAEASTypeVal,
                                        "std": CAEASSTDVal,
                                        "name": CAEASNameVal,
                                        "temp": CAEADT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        CAEASDensity = parseFloat(result.density);
                                        CAEASThkMin = parseFloat(result.thkMin);
                                        CAEASThkMax = parseFloat(result.thkMax);
                                        CAEAMius = parseFloat(result.poissonRatio);
                                        CAEASTempMin = parseFloat(result.tempMin);
                                        CAEASTempMax = parseFloat(result.tempMax);

                                        // 筒体设计压力
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                            let CAEAPSD = parseFloat(rows[6][columns[0][1].field]);

                                            // 筒体静压力
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                let CAEAPSS = parseFloat(rows[7][columns[0][1].field]);

                                                // 筒体计算压力
                                                let CAEAPSC = CAEAPSD + CAEAPSS;

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CAEADSI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        caea2d("ϕ" + CAEADSI);
                                                        caead2.off("resize").on("resize", function () {
                                                            if ($("#caea").length > 0) {
                                                                caea2d("ϕ" + CAEADSI);
                                                            }
                                                        });
                                                    }
                                                    caead2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                caea2d("ϕ" + CAEADSI);
                                                                caead2.off("resize").on("resize", function () {
                                                                    if ($("#caea").length > 0) {
                                                                        caea2d("ϕ" + CAEADSI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CAEASThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CAEASThkMax) {
                                                        let CAEATHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            caea2d("ϕ" + CAEADSI, CAEATHKSN);
                                                            caead2.off("resize").on("resize", function () {
                                                                if ($("#caea").length > 0) {
                                                                    caea2d("ϕ" + CAEADSI, CAEATHKSN);
                                                                }
                                                            });
                                                        }
                                                        caead2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    caea2d("ϕ" + CAEADSI, CAEATHKSN);
                                                                    caead2.off("resize").on("resize", function () {
                                                                        if ($("#caea").length > 0) {
                                                                            caea2d("ϕ" + CAEADSI, CAEATHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // 筒体外直径
                                                        let CAEADSO = CAEADSI + 2 * CAEATHKSN;

                                                        // 焊接接头系数
                                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                            let CAEAES = parseFloat(rows[10][columns[0][1].field]);

                                                            // 筒体腐蚀裕量
                                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) < CAEATHKSN) {
                                                                let CAEACS2 = parseFloat(rows[11][columns[0][1].field]);

                                                                // 筒体壁温
                                                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                    && parseFloat(rows[12][columns[0][1].field]) >= CAEASTempMin
                                                                    && parseFloat(rows[12][columns[0][1].field]) <= CAEASTempMax) {
                                                                    let CAEATSB = parseFloat(rows[12][columns[0][1].field]);

                                                                    // 筒体材料物性
                                                                    let CAEASOT, CAEASO, CAEASOT1, CAEASREL, CAEACS1,
                                                                        CAEAEST, CAEAAlphas;
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_gbt_150_2011_e_a_com_property.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": CAEASCategoryVal,
                                                                            "type": CAEASTypeVal,
                                                                            "std": CAEASSTDVal,
                                                                            "name": CAEASNameVal,
                                                                            "thk": CAEATHKSN,
                                                                            "designTemp": CAEADT,
                                                                            "wallTemp": CAEATSB,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": CAEADSO
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            CAEASOT = parseFloat(result.ot);
                                                                            if (CAEASOT < 0) {
                                                                                south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            CAEASO = parseFloat(result.o);
                                                                            if (CAEASO < 0) {
                                                                                south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            CAEASREL = parseFloat(result.rel);
                                                                            if (CAEASREL < 0) {
                                                                                south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            CAEACS1 = parseFloat(result.c1);
                                                                            if (CAEACS1 < 0) {
                                                                                south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            CAEAEST = 1000 * parseFloat(result.et);
                                                                            if (CAEAEST < 0) {
                                                                                south.html("查询筒体材料弹性模量失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            CAEAAlphas = parseFloat(result.at) / 1000000;
                                                                            if (CAEAAlphas < 0) {
                                                                                south.html("查询筒体材料热膨胀系数失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            CAEASOT1 = parseFloat(result.ot1);

                                                                            // 筒体厚度附加量
                                                                            let CAEACS = CAEACS1 + CAEACS2;

                                                                            // 筒体有效厚度
                                                                            let CAEATHKSE = CAEATHKSN - CAEACS;

                                                                            // 筒体平均半径
                                                                            let CAEARM = (CAEADSI + CAEATHKSE) / 2;

                                                                            // 夹套材料名称
                                                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                let CAEAJNameVal = rows[16][columns[0][1].field];

                                                                                // AJAX 获取夹套材料密度、最大最小厚度
                                                                                let CAEAJDensity, CAEAJThkMin,
                                                                                    CAEAJThkMax, CAEAMiuj, CAEAJTempMin,
                                                                                    CAEAJTempMax;
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "web_get_gbt_150_2011_index.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        "category": CAEAJCategoryVal,
                                                                                        "type": CAEAJTypeVal,
                                                                                        "std": CAEAJSTDVal,
                                                                                        "name": CAEAJNameVal,
                                                                                        "temp": CAEADT
                                                                                    }),
                                                                                    beforeSend: function () {
                                                                                    },
                                                                                    success: function (result) {

                                                                                        CAEAJDensity = parseFloat(result.density);
                                                                                        CAEAJThkMin = parseFloat(result.thkMin);
                                                                                        CAEAJThkMax = parseFloat(result.thkMax);
                                                                                        CAEAMiuj = parseFloat(result.poissonRatio);
                                                                                        CAEAJTempMin = parseFloat(result.tempMin);
                                                                                        CAEAJTempMax = parseFloat(result.tempMax);

                                                                                        // 夹套设计压力
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                            let CAEAPJD = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // 夹套静压力
                                                                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                                                let CAEAPJS = parseFloat(rows[18][columns[0][1].field]);

                                                                                                // 夹套计算压力
                                                                                                let CAEAPJC = CAEAPJD + CAEAPJS;

                                                                                                // 外直径 do
                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                                                                    let CAEADJO = parseFloat(rows[19][columns[0][1].field]);

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO);
                                                                                                        caead2.off("resize").on("resize", function () {
                                                                                                            if ($("#caea").length > 0) {
                                                                                                                caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    caead2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO);
                                                                                                                caead2.off("resize").on("resize", function () {
                                                                                                                    if ($("#caea").length > 0) {
                                                                                                                        caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // 节距 ts
                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) > CAEADJO) {
                                                                                                        let CAEATS = parseFloat(rows[20][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO, CAEATS);
                                                                                                            caead2.off("resize").on("resize", function () {
                                                                                                                if ($("#caea").length > 0) {
                                                                                                                    caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO, CAEATS);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        caead2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO, CAEATS);
                                                                                                                    caead2.off("resize").on("resize", function () {
                                                                                                                        if ($("#caea").length > 0) {
                                                                                                                            caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO, CAEATS);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        // 盘管名义厚度
                                                                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                            && parseFloat(rows[21][columns[0][1].field]) > CAEAJThkMin
                                                                                                            && parseFloat(rows[21][columns[0][1].field]) <= Math.min(CAEAJThkMax, CAEADJO / 2)) {
                                                                                                            let CAEATHKJN = parseFloat(rows[21][columns[0][1].field]);

                                                                                                            // Sketch
                                                                                                            if (currentTabIndex === 0) {
                                                                                                                caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO, CAEATS, CAEATHKJN);
                                                                                                                caead2.off("resize").on("resize", function () {
                                                                                                                    if ($("#caea").length > 0) {
                                                                                                                        caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO, CAEATS, CAEATHKJN);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                            caead2d3.tabs({
                                                                                                                onSelect: function (title, index) {
                                                                                                                    if (index === 0) {
                                                                                                                        caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO, CAEATS, CAEATHKJN);
                                                                                                                        caead2.off("resize").on("resize", function () {
                                                                                                                            if ($("#caea").length > 0) {
                                                                                                                                caea2d("ϕ" + CAEADSI, CAEATHKSN, "ϕ" + CAEADJO, CAEATS, CAEATHKJN);
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }
                                                                                                                }
                                                                                                            });

                                                                                                            // 盘管内直径
                                                                                                            let CAEADJI = CAEADJO - 2 * CAEATHKJN;

                                                                                                            // 焊接接头系数
                                                                                                            if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                                                                                let CAEAEJ = parseFloat(rows[22][columns[0][1].field]);

                                                                                                                // 盘管腐蚀裕量
                                                                                                                if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                                                                    && parseFloat(rows[23][columns[0][1].field]) < CAEATHKJN) {
                                                                                                                    let CAEACJ2 = parseFloat(rows[23][columns[0][1].field]);

                                                                                                                    // 盘管壁温
                                                                                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                        && parseFloat(rows[24][columns[0][1].field]) >= CAEAJTempMin
                                                                                                                        && parseFloat(rows[24][columns[0][1].field]) <= CAEAJTempMax) {
                                                                                                                        let CAEATJB = parseFloat(rows[24][columns[0][1].field]);

                                                                                                                        // 夹套材料物性
                                                                                                                        let CAEAJOT,
                                                                                                                            CAEAJO,
                                                                                                                            CAEAJOT1,
                                                                                                                            CAEAJREL,
                                                                                                                            CAEACJ1,
                                                                                                                            CAEAEJT,
                                                                                                                            CAEAAlphaj;
                                                                                                                        $.ajax({
                                                                                                                            type: "POST",
                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                            url: "web_get_gbt_150_2011_e_a_com_property.action",
                                                                                                                            async: true,
                                                                                                                            dataType: "json",
                                                                                                                            data: JSON.stringify({
                                                                                                                                "category": CAEAJCategoryVal,
                                                                                                                                "type": CAEAJTypeVal,
                                                                                                                                "std": CAEAJSTDVal,
                                                                                                                                "name": CAEAJNameVal,
                                                                                                                                "thk": CAEATHKJN,
                                                                                                                                "designTemp": CAEADT,
                                                                                                                                "wallTemp": CAEATJB,
                                                                                                                                "highLow": 3,
                                                                                                                                "isTube": 0,
                                                                                                                                "od": CAEADJO
                                                                                                                            }),
                                                                                                                            beforeSend: function () {
                                                                                                                            },
                                                                                                                            success: function (result) {

                                                                                                                                CAEAJOT = parseFloat(result.ot);
                                                                                                                                if (CAEAJOT < 0) {
                                                                                                                                    south.html("查询盘管材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                    return false;
                                                                                                                                }

                                                                                                                                CAEAJO = parseFloat(result.o);
                                                                                                                                if (CAEAJO < 0) {
                                                                                                                                    south.html("查询盘管材料常温许用应力失败！").css("color", "red");
                                                                                                                                    return false;
                                                                                                                                }

                                                                                                                                CAEAJREL = parseFloat(result.rel);
                                                                                                                                if (CAEAJREL < 0) {
                                                                                                                                    south.html("查询盘管材料常温屈服强度失败！").css("color", "red");
                                                                                                                                    return false;
                                                                                                                                }

                                                                                                                                CAEACJ1 = parseFloat(result.c1);
                                                                                                                                if (CAEACJ1 < 0) {
                                                                                                                                    south.html("查询盘管材料厚度负偏差失败！").css("color", "red");
                                                                                                                                    return false;
                                                                                                                                }

                                                                                                                                CAEAEJT = 1000 * parseFloat(result.et);
                                                                                                                                if (CAEAEJT < 0) {
                                                                                                                                    south.html("查询盘管材料弹性模量失败！").css("color", "red");
                                                                                                                                    return false;
                                                                                                                                }

                                                                                                                                CAEAAlphaj = parseFloat(result.at) / 1000000;
                                                                                                                                if (CAEAAlphaj < 0) {
                                                                                                                                    south.html("查询盘管材料热膨胀系数失败！").css("color", "red");
                                                                                                                                    return false;
                                                                                                                                }

                                                                                                                                CAEAJOT1 = parseFloat(result.ot1);

                                                                                                                                // 盘管厚度附加量
                                                                                                                                let CAEACJ = CAEACJ1 + CAEACJ2;

                                                                                                                                // 盘管有效厚度
                                                                                                                                let CAEATHKJE = CAEATHKJN - CAEACJ;

                                                                                                                                // 制造环境温度
                                                                                                                                let CAEAT0 = 20;

                                                                                                                                /**
                                                                                                                                 * 筒体应力校核
                                                                                                                                 */
                                                                                                                                let CAEAD = CAEAEST * CAEATHKSE * CAEATHKSE * CAEATHKSE / (12 * (1 - CAEAMius * CAEAMius));
                                                                                                                                let CAEAK = CAEAEST * CAEATHKSE / (CAEARM * CAEARM);
                                                                                                                                let CAEAAS = Math.sqrt(CAEAK / (4 * CAEAD));
                                                                                                                                let CAEAAB = 8 * CAEARM * CAEARM / (Math.PI * CAEAEST * (CAEADJO * CAEADJO - (CAEADJI + CAEACJ) * (CAEADJI + CAEACJ)));
                                                                                                                                let CAEAU = CAEAAS * CAEATS / 2;
                                                                                                                                let CAEAQ0 = CAEAK * CAEARM * (CAEAAlphas * (CAEATSB - CAEAT0) - CAEAAlphaj * (CAEATJB - CAEAT0)) - CAEAPSC * (1 - 0.5 * CAEAMius);

                                                                                                                                if (CAEAU < 0 || CAEAU > 5) {
                                                                                                                                    south.html("系数 u 查表 B.4.2 超界！").css("color", "red");
                                                                                                                                    return false;
                                                                                                                                }

                                                                                                                                // 查表 B.4.2
                                                                                                                                let CAEAMiu1U,
                                                                                                                                    CAEAX1U,
                                                                                                                                    CAEAX2U,
                                                                                                                                    CAEAFai1U;
                                                                                                                                $.ajax({
                                                                                                                                    type: "POST",
                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                    url: "hgt_20569_2013_table_b_4_2_get_all.action",
                                                                                                                                    async: true,
                                                                                                                                    dataType: "json",
                                                                                                                                    data: JSON.stringify({
                                                                                                                                        "u": CAEAU,
                                                                                                                                    }),
                                                                                                                                    beforeSend: function () {
                                                                                                                                    },
                                                                                                                                    success: function (result) {

                                                                                                                                        CAEAMiu1U = parseFloat(result.miu1u);
                                                                                                                                        CAEAX1U = parseFloat(result.x1u);
                                                                                                                                        CAEAX2U = parseFloat(result.x2u);
                                                                                                                                        CAEAFai1U = parseFloat(result.fai1u);

                                                                                                                                        let CAEAB1 = CAEAAB * CAEAK * CAEATS * CAEAMiu1U / 2;

                                                                                                                                        // 筒体许用应力
                                                                                                                                        let CAEAESOST = CAEAES * CAEASOT;
                                                                                                                                        south.html(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "筒体许用应力：" + CAEAESOST.toFixed(2) + " MPa" +
                                                                                                                                            "</span>");

                                                                                                                                        // a 内壁轴向力
                                                                                                                                        let CAEAO1AI = CAEAPSC * CAEARM / (2 * CAEATHKSE) - (CAEAQ0 * CAEATS * CAEATS * CAEAX1U) / (4 * CAEATHKSE * CAEATHKSE * (1 + CAEAB1));
                                                                                                                                        if (Math.abs(CAEAO1AI) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "a 点内壁轴向力：" + CAEAO1AI.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "a 点内壁轴向力：" + CAEAO1AI.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // a 外壁轴向力
                                                                                                                                        let CAEAO1AO = CAEAPSC * CAEARM / (2 * CAEATHKSE) + (CAEAQ0 * CAEATS * CAEATS * CAEAX1U) / (4 * CAEATHKSE * CAEATHKSE * (1 + CAEAB1));
                                                                                                                                        if (Math.abs(CAEAO1AO) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "a 点外壁轴向力：" + CAEAO1AO.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "a 点外壁轴向力：" + CAEAO1AO.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // a 点轴向力校核结果
                                                                                                                                        let CAEAO1ACHK;
                                                                                                                                        if (Math.max(Math.abs(CAEAO1AI), Math.abs(CAEAO1AO)) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            CAEAO1ACHK = "合格";
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            CAEAO1ACHK = "不合格";
                                                                                                                                        }

                                                                                                                                        // a 内壁环向力
                                                                                                                                        let CAEAO2AI = CAEAPSC * CAEARM / (2 * CAEATHKSE) + CAEAQ0 * CAEARM / (CAEATHKSE * (1 + CAEAB1)) * (CAEAFai1U - (CAEAMius * CAEAU * CAEAU * CAEAX1U) / Math.sqrt(3 * (1 - CAEAMius * CAEAMius)));
                                                                                                                                        if (Math.abs(CAEAO2AI) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "a 点内壁环向力：" + CAEAO2AI.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "a 点内壁环向力：" + CAEAO2AI.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // a 外壁环向力
                                                                                                                                        let CAEAO2AO = CAEAPSC * CAEARM / (2 * CAEATHKSE) + CAEAQ0 * CAEARM / (CAEATHKSE * (1 + CAEAB1)) * (CAEAFai1U + (CAEAMius * CAEAU * CAEAU * CAEAX1U) / Math.sqrt(3 * (1 - CAEAMius * CAEAMius)));
                                                                                                                                        if (Math.abs(CAEAO2AO) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "a 点外壁环向力：" + CAEAO2AO.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "a 点外壁环向力：" + CAEAO2AO.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // a 点环向力校核结果
                                                                                                                                        let CAEAO2ACHK;
                                                                                                                                        if (Math.max(Math.abs(CAEAO2AI), Math.abs(CAEAO2AO)) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            CAEAO2ACHK = "合格";
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            CAEAO2ACHK = "不合格";
                                                                                                                                        }

                                                                                                                                        // b 内壁轴向力
                                                                                                                                        let CAEAO1BI = CAEAPSC * CAEARM / (2 * CAEATHKSE) - (2 * CAEAQ0 * CAEARM) / (CAEATHKSE * Math.sqrt(3 * (1 - CAEAMius * CAEAMius))) * (CAEAU * CAEAU * CAEAX2U) / (1 + CAEAB1);
                                                                                                                                        if (Math.abs(CAEAO1BI) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "b 点内壁轴向力：" + CAEAO1BI.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "b 点内壁轴向力：" + CAEAO1BI.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // b 外壁轴向力
                                                                                                                                        let CAEAO1BO = CAEAPSC * CAEARM / (2 * CAEATHKSE) + (2 * CAEAQ0 * CAEARM) / (CAEATHKSE * Math.sqrt(3 * (1 - CAEAMius * CAEAMius))) * (CAEAU * CAEAU * CAEAX2U) / (1 + CAEAB1);
                                                                                                                                        if (Math.abs(CAEAO1BO) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "b 点外壁轴向力：" + CAEAO1BO.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "b 点外壁轴向力：" + CAEAO1BO.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // b 点轴向力校核结果
                                                                                                                                        let CAEAO1BCHK;
                                                                                                                                        if (Math.max(Math.abs(CAEAO1BI), Math.abs(CAEAO1BO)) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            CAEAO1BCHK = "合格";
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            CAEAO1BCHK = "不合格";
                                                                                                                                        }

                                                                                                                                        // b 内壁环向力
                                                                                                                                        let CAEAO2BI = CAEAPSC * CAEARM / CAEATHKSE + CAEAQ0 * CAEARM / (CAEATHKSE * (1 + CAEAB1)) * (1 - (2 * CAEAMius * CAEAU * CAEAU * CAEAX2U) / Math.sqrt(3 * (1 - CAEAMius * CAEAMius)));
                                                                                                                                        if (Math.abs(CAEAO2BI) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "b 点内壁环向力：" + CAEAO2BI.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "b 点内壁环向力：" + CAEAO2BI.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // b 外壁环向力
                                                                                                                                        let CAEAO2BO = CAEAPSC * CAEARM / CAEATHKSE + CAEAQ0 * CAEARM / (CAEATHKSE * (1 + CAEAB1)) * (1 + (2 * CAEAMius * CAEAU * CAEAU * CAEAX2U) / Math.sqrt(3 * (1 - CAEAMius * CAEAMius)));
                                                                                                                                        if (Math.abs(CAEAO2BO) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "b 点外壁环向力：" + CAEAO2BO.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "b 点外壁环向力：" + CAEAO2BO.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        // a 点环向力校核结果
                                                                                                                                        let CAEAO2BCHK;
                                                                                                                                        if (Math.max(Math.abs(CAEAO2BI), Math.abs(CAEAO2BO)) <= CAEAESOST.toFixed(2)) {
                                                                                                                                            CAEAO2BCHK = "合格";
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            CAEAO2BCHK = "不合格";
                                                                                                                                        }

                                                                                                                                        // 盘管许用应力
                                                                                                                                        let CAEAEJOJT = CAEAEJ * CAEAJOT;
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "盘管许用应力：" + CAEAEJOJT.toFixed(2) + " MPa" +
                                                                                                                                            "</span>");

                                                                                                                                        // 管壁轴向力
                                                                                                                                        let CAEAO1 = CAEAPJC * (CAEADJI + CAEACJ) / (2 * (CAEADJO - CAEADJI - CAEACJ));
                                                                                                                                        let CAEAO1CHK;
                                                                                                                                        if (Math.abs(CAEAO1) <= CAEAEJOJT.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "盘管轴向力：" + CAEAO1.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                            CAEAO1CHK = "合格";
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "盘管轴向力：" + CAEAO1.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                            CAEAO1CHK = "不合格";
                                                                                                                                        }

                                                                                                                                        // 管壁环向力
                                                                                                                                        let CAEAO2 = (CAEAPSC * CAEARM * (1 - 0.5 * CAEAMius)) / CAEATHKSE + CAEAQ0 * CAEARM / (CAEATHKSE * (1 + CAEAB1)) + CAEAPJC * (CAEADJI + CAEACJ) * (CAEADJI + CAEACJ) / (CAEADJO * CAEADJO - (CAEADJI + CAEACJ) * (CAEADJI + CAEACJ));
                                                                                                                                        let CAEAO2CHK;
                                                                                                                                        if (Math.abs(CAEAO2) <= CAEAEJOJT.toFixed(2)) {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "盘管环向力：" + CAEAO2.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                            CAEAO2CHK = "合格";
                                                                                                                                        }
                                                                                                                                        else {
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "盘管环向力：" + CAEAO2.toFixed(2) + " MPa" +
                                                                                                                                                "</span>");
                                                                                                                                            CAEAO2CHK = "不合格";
                                                                                                                                        }

                                                                                                                                        // 筒体试验压力
                                                                                                                                        let CAEAPST;
                                                                                                                                        if (CAEATest === "液压试验") {
                                                                                                                                            CAEAPST = 1.25 * CAEAPSD * CAEASO / Math.max(CAEASOT, CAEASOT1);
                                                                                                                                        }
                                                                                                                                        else if (CAEATest === "气压试验") {
                                                                                                                                            CAEAPST = 1.10 * CAEAPSD * CAEASO / Math.max(CAEASOT, CAEASOT1);
                                                                                                                                        }
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "筒体试验压力：" + CAEAPST.toFixed(4) + " MPa" +
                                                                                                                                            "</span>");

                                                                                                                                        // 盘管试验压力
                                                                                                                                        let CAEAPJT;
                                                                                                                                        if (CAEATest === "液压试验") {
                                                                                                                                            CAEAPJT = 1.25 * CAEAPJD * CAEAJO / Math.max(CAEAJOT, CAEAJOT1);
                                                                                                                                        }
                                                                                                                                        else if (CAEATest === "气压试验") {
                                                                                                                                            CAEAPJT = 1.10 * CAEAPJD * CAEAJO / Math.max(CAEAJOT, CAEAJOT1);
                                                                                                                                        }
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "盘管试验压力：" + CAEAPJT.toFixed(4) + " MPa" +
                                                                                                                                            "</span>");

                                                                                                                                        // docx
                                                                                                                                        let CAEAPayJS = $('#payjs');

                                                                                                                                        function getDocx() {
                                                                                                                                            $.ajax({
                                                                                                                                                type: "POST",
                                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                                url: "caeadocx.action",
                                                                                                                                                async: true,
                                                                                                                                                dataType: "json",
                                                                                                                                                data: JSON.stringify({
                                                                                                                                                    ribbonName: "CAEA",

                                                                                                                                                    t: CAEADT,
                                                                                                                                                    test: CAEATest,
                                                                                                                                                    sstd: CAEASSTDVal,
                                                                                                                                                    sname: CAEASNameVal,
                                                                                                                                                    psd: CAEAPSD,
                                                                                                                                                    pss: CAEAPSS,
                                                                                                                                                    dsi: CAEADSI,
                                                                                                                                                    thksn: CAEATHKSN,
                                                                                                                                                    es: CAEAES,
                                                                                                                                                    cs2: CAEACS2,
                                                                                                                                                    tsb: CAEATSB,
                                                                                                                                                    jstd: CAEAJSTDVal,
                                                                                                                                                    jname: CAEAJNameVal,
                                                                                                                                                    pjd: CAEAPJD,
                                                                                                                                                    pjs: CAEAPJS,
                                                                                                                                                    dout: CAEADJO,
                                                                                                                                                    ts: CAEATS,
                                                                                                                                                    thkjn: CAEATHKJN,
                                                                                                                                                    ej: CAEAEJ,
                                                                                                                                                    cj2: CAEACJ2,
                                                                                                                                                    tjb: CAEATJB,
                                                                                                                                                    densitys: CAEASDensity.toFixed(4),
                                                                                                                                                    densityj: CAEAJDensity.toFixed(4),
                                                                                                                                                    ost: CAEASOT.toFixed(4),
                                                                                                                                                    ojt: CAEAJOT.toFixed(4),
                                                                                                                                                    os: CAEASO.toFixed(4),
                                                                                                                                                    oj: CAEAJO.toFixed(4),
                                                                                                                                                    ost1: CAEASOT1.toFixed(4),
                                                                                                                                                    ojt1: CAEAJOT1.toFixed(4),
                                                                                                                                                    rsel: CAEASREL.toFixed(4),
                                                                                                                                                    rjel: CAEAJREL.toFixed(4),
                                                                                                                                                    est: (CAEAEST / 1000).toFixed(4),
                                                                                                                                                    ejt: (CAEAEJT / 1000).toFixed(4),
                                                                                                                                                    alphas: (CAEAAlphas * 1000000).toFixed(4),
                                                                                                                                                    alphaj: (CAEAAlphaj * 1000000).toFixed(4),
                                                                                                                                                    mius: CAEAMius.toFixed(4),
                                                                                                                                                    miuj: CAEAMiuj.toFixed(4),
                                                                                                                                                    cs1: CAEACS1.toFixed(4),
                                                                                                                                                    cj1: CAEACJ1.toFixed(4),
                                                                                                                                                    cs: CAEACS.toFixed(4),
                                                                                                                                                    thkse: CAEATHKSE.toFixed(4),
                                                                                                                                                    psc: CAEAPSC.toFixed(4),
                                                                                                                                                    rm: CAEARM.toFixed(4),
                                                                                                                                                    cj: CAEACJ.toFixed(4),
                                                                                                                                                    thkje: CAEATHKJE.toFixed(4),
                                                                                                                                                    pjc: CAEAPJC.toFixed(4),
                                                                                                                                                    di: CAEADJI.toFixed(4),
                                                                                                                                                    t0: CAEAT0.toFixed(4),
                                                                                                                                                    d: CAEAD.toFixed(6),
                                                                                                                                                    k: CAEAK.toFixed(6),
                                                                                                                                                    as: CAEAAS.toFixed(6),
                                                                                                                                                    ab: CAEAAB.toFixed(6),
                                                                                                                                                    u: CAEAU.toFixed(6),
                                                                                                                                                    miu1u: CAEAMiu1U.toFixed(6),
                                                                                                                                                    b1: CAEAB1.toFixed(6),
                                                                                                                                                    q0: CAEAQ0.toFixed(6),
                                                                                                                                                    x1u: CAEAX1U.toFixed(6),
                                                                                                                                                    x2u: CAEAX2U.toFixed(6),
                                                                                                                                                    fai1u: CAEAFai1U.toFixed(6),
                                                                                                                                                    esost: CAEAESOST.toFixed(4),
                                                                                                                                                    o1ai: CAEAO1AI.toFixed(4),
                                                                                                                                                    o1ao: CAEAO1AO.toFixed(4),
                                                                                                                                                    o1achk: CAEAO1ACHK,
                                                                                                                                                    o2ai: CAEAO2AI.toFixed(4),
                                                                                                                                                    o2ao: CAEAO2AO.toFixed(4),
                                                                                                                                                    o2achk: CAEAO2ACHK,
                                                                                                                                                    o1bi: CAEAO1BI.toFixed(4),
                                                                                                                                                    o1bo: CAEAO1BO.toFixed(4),
                                                                                                                                                    o1bchk: CAEAO1BCHK,
                                                                                                                                                    o2bi: CAEAO2BI.toFixed(4),
                                                                                                                                                    o2bo: CAEAO2BO.toFixed(4),
                                                                                                                                                    o2bchk: CAEAO2BCHK,
                                                                                                                                                    ejojt: CAEAEJOJT.toFixed(4),
                                                                                                                                                    o1: CAEAO1.toFixed(4),
                                                                                                                                                    o1chk: CAEAO1CHK,
                                                                                                                                                    o2: CAEAO2.toFixed(4),
                                                                                                                                                    o2chk: CAEAO2CHK,
                                                                                                                                                    pst: CAEAPST.toFixed(4),
                                                                                                                                                    pjt: CAEAPJT.toFixed(4)
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
                                                                                                                                                        CAEAPayJS.dialog({
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
                                                                                                                                                                    CAEAPayJS.dialog("close");
                                                                                                                                                                    CAEAPayJS.dialog("clear");
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
                                                                                                                                                                                CAEAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                        CAEAPayJS.dialog('close');
                                                                                                                                                                                        CAEAPayJS.dialog('clear');
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
                                                                                                                                            "<span style='color:red;'>&ensp;查表 B.4.2 失败，请检查网络后重试</span>");
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            },
                                                                                                                            error: function () {
                                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }
                                                                                                                    else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                                                                        south.html("标准限制的盘管材料许用温度范围 [" + CAEAJTempMin + ", " + CAEAJTempMax + "]").css("color", "red");
                                                                                                                    }
                                                                                                                }
                                                                                                                else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                                                                    && parseFloat(rows[23][columns[0][1].field]) >= CAEATHKJN) {
                                                                                                                    south.html("盘管腐蚀裕量不能大于等于 " + CAEATHKJN + " mm").css("color", "red");
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                            && parseFloat(rows[21][columns[0][1].field]) <= CAEAJThkMin) {
                                                                                                            south.html("盘管名义厚度不能小于等于 " + CAEAJThkMin + " mm").css("color", "red");
                                                                                                        }
                                                                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                            && parseFloat(rows[21][columns[0][1].field]) > Math.min(CAEAJThkMax, CAEADJO / 2)) {
                                                                                                            south.html("盘管名义厚度不能大于 " + Math.min(CAEAJThkMax, CAEADJO / 2).toFixed(4) + " mm").css("color", "red");
                                                                                                        }
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) <= CAEADJO) {
                                                                                                        south.html("螺旋盘管节距 ts 不能小于等于 " + CAEADJO + " mm").css("color", "red");
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    error: function () {
                                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                            "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                                    }
                                                                                });
                                                                            }
                                                                        },
                                                                        error: function () {
                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                        }
                                                                    });
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                                    south.html("标准限制的筒体材料许用温度范围 [" + CAEASTempMin + ", " + CAEASTempMax + "]").css("color", "red");
                                                                }
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) >= CAEATHKSN) {
                                                                south.html("筒体腐蚀裕量不能大于等于 " + CAEATHKSN + " mm").css("color", "red");
                                                            }
                                                        }
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CAEASThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + CAEASThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CAEASThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + CAEASThkMax + " mm").css("color", "red");
                                                    }
                                                }
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});