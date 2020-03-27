$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let zzhaSketch = $("#d2");
    let zzhaModel = $("#d3");
    let zzhad2d3 = $('#d2d3');

    $("#cal").html("<table id='zzha'></table>");
    let pg = $("#zzha");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/z/z/h/a/ZZHA.json", function (result) {

        let columns, rows;

        function zzha2d(dout = "ΦDo", thk = "δ", dm = "ΦDm", h = "h") {

            zzhaSketch.empty();

            let width = zzhaSketch.width();
            let height = zzhaSketch.height();

            let svg = d3.select("#d2").append("svg").attr("id", "ZZHASVG")
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
            let ZZHADO = (height - 2 * paddingV) / 8;
            let ZZHARO = ZZHADO / 2;
            let ZZHADI = ZZHADO - thickness;
            let ZZHARI = ZZHADI / 2;

            // 右上
            let cx0 = width - paddingH + ZZHARO;
            let cy0 = height / 2 - ZZHADO;
            drawArc(ZZHARO, ZZHARO, cx0, cy0 - ZZHARO, cx0, cy0 + ZZHARO);
            drawArc(ZZHARO, ZZHARO, cx0, cy0 + ZZHARO, cx0, cy0 - ZZHARO);
            drawArc(ZZHARI, ZZHARI, cx0, cy0 - ZZHARI, cx0, cy0 + ZZHARI);
            drawArc(ZZHARI, ZZHARI, cx0, cy0 + ZZHARI, cx0, cy0 - ZZHARI);
            drawCenterLine(cx0 - ZZHARO - 10, cy0, cx0 + ZZHARO + 10, cy0);
            drawCenterLine(cx0, cy0 - ZZHARO - 10, cx0, cy0 + ZZHARO + 10);

            // 右下
            let cx1 = width - paddingH + ZZHARO;
            let cy1 = height / 2 + ZZHADO;
            drawArc(ZZHARO, ZZHARO, cx1, cy1 - ZZHARO, cx1, cy1 + ZZHARO);
            drawArc(ZZHARO, ZZHARO, cx1, cy1 + ZZHARO, cx1, cy1 - ZZHARO);
            drawArc(ZZHARI, ZZHARI, cx1, cy1 - ZZHARI, cx1, cy1 + ZZHARI);
            drawArc(ZZHARI, ZZHARI, cx1, cy1 + ZZHARI, cx1, cy1 - ZZHARI);
            drawCenterLine(cx1 - ZZHARO - 10, cy1, cx1 + ZZHARO + 10, cy1);
            drawCenterLine(cx1, cy1 - ZZHARO - 10, cx1, cy1 + ZZHARO + 10);

            // 左下
            let cx2 = paddingH - ZZHARO;
            let cy2 = height / 2;
            drawArc(ZZHARO, ZZHARO, cx2, cy2 + ZZHARO, cx2, cy2 - ZZHARO);
            drawCenterLine(cx2 - ZZHARO - 10, cy2, cx2 + ZZHARO + 10, cy2);
            drawCenterLine(cx2, cy2 - ZZHARO - 10, cx2, cy2 + ZZHARO + 10);

            // 左上
            let cx3 = paddingH - ZZHARO;
            let cy3 = height / 2 - 2 * ZZHADO;
            drawArc(ZZHARO, ZZHARO, cx3, cy3 + ZZHARO, cx3, cy3 - ZZHARO);
            drawCenterLine(cx3 - ZZHARO - 10, cy3, cx3 + ZZHARO + 10, cy3);
            drawCenterLine(cx3, cy3 - ZZHARO - 10, cx3, cy3 + ZZHARO + 10);

            // delta
            let delta = ZZHADO * ZZHARO / (ZZHADO + width - 2 * paddingH);
            drawLine(paddingH, paddingV, paddingH, cy3 - ZZHARO + delta);
            drawLine(paddingH, cy3 + ZZHARO + delta, paddingH, cy2 - ZZHARO + delta);
            drawLine(paddingH, cy2 + ZZHARO + delta, paddingH, height - paddingV);

            // 斜线
            drawLine(cx2, cy3 - ZZHARO, width / 2, cy3);
            drawLine(cx2, cy3 + ZZHARO, width / 2, cy3 + ZZHADO);
            drawLine(cx2, cy2 - ZZHARO, width / 2, cy2);
            drawLine(cx2, cy2 + ZZHARO, width / 2, cy2 + ZZHADO);

            // 斜线中心线
            drawCenterLine(cx2, cy3, cx0, cy0);
            drawCenterLine(cx2, cy2, cx0, cy1);

            // DM
            dimBottomH(cx2, cy1, cx1, cy1, dm, "ZZHASketchDM");
            drawLine(cx2, cy1, cx2, cy2);

            // h
            dimRightV(cx0 + ZZHARO + 10, cy1, cx0 + ZZHARO + 10, cy0, h, "ZZHASketchSH");

            // thk
            svg.append("path").attr("d", line([
                {x: cx1 + ZZHARO + 15, y: cy1},
                {x: cx1 + ZZHARO + 15 + 40, y: cy1}
            ])).attr("id", "ZZHASketchTHK").classed("sketch", true)
                .attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#ZZHASketchTHK").attr("startOffset", "50%").text(thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + ZZHARO, y: cy1},
                    {x: cx1 + ZZHARO + 15, y: cy1 - 3},
                    {x: cx1 + ZZHARO + 15, y: cy1 + 3},
                    {x: cx1 + ZZHARO, y: cy1}
                ])).attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + ZZHARI, y: cy1},
                    {x: cx1 + ZZHARI - 15, y: cy1 - 3},
                    {x: cx1 + ZZHARI - 15, y: cy1 + 3},
                    {x: cx1 + ZZHARI, y: cy1}
                ])).attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").attr("d", line([
                {x: cx1 + ZZHARI, y: cy1},
                {x: cx1 + ZZHARO, y: cy1}
            ])).classed("sketch", true).attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").attr("d", line([
                {x: cx1 + ZZHARI - 15, y: cy1},
                {x: cx1 + ZZHARI - 30, y: cy1}
            ])).classed("sketch", true).attr("transform", "rotate(" + 45 + ", " + cx1 + " " + cy1 + ")");

            // 夹套外直径
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + ZZHARO, y: cy0},
                    {x: cx0 + ZZHARO + 15, y: cy0 - 3},
                    {x: cx0 + ZZHARO + 15, y: cy0 + 3},
                    {x: cx0 + ZZHARO, y: cy0}
                ])).attr("transform", "rotate(" + -45 + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", line([
                {x: cx0 + ZZHARO + 30, y: cy0},
                {x: cx0 + ZZHARO + 15, y: cy0}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + cx0 + " " + (cy0) + ")");
            svg.append("path").attr("d", line([
                {x: cx0 + 0.707 * (ZZHARO + 30), y: cy0 - 0.707 * (ZZHARO + 30)},
                {x: cx0 + 0.707 * (ZZHARO + 30) + 40, y: cy0 - 0.707 * (ZZHARO + 30)}
            ])).attr("id", "ZZHASketchDJO").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#ZZHASketchDJO").attr("startOffset", "50%").text(dout);
        }

        currentTabIndex = zzhad2d3.tabs('getTabIndex', zzhad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            zzha2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#zzha").length > 0) {
                    zzha2d();
                }
            });
        }
        zzhad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    zzha2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#zzha").length > 0) {
                            zzha2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "盘管(全管)计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 190,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 133,
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

                    // docx button
                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch & model
                    zzhaSketch.empty();
                    zzhaModel.empty();

                    // sketch
                    currentTabIndex = zzhad2d3.tabs('getTabIndex', zzhad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzha2d();
                        zzhaSketch.off("resize").on("resize", function () {
                            if ($("#zzha").length > 0) {
                                zzha2d();
                            }
                        });
                    }
                    zzhad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzha2d();
                                zzhaSketch.off("resize").on("resize", function () {
                                    if ($("#zzha").length > 0) {
                                        zzha2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // DO
                    let ZZHADO;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ZZHADO = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzha2d("Φ" + ZZHADO);
                        zzhaSketch.off("resize").on("resize", function () {
                            if ($("#zzha").length > 0) {
                                zzha2d("Φ" + ZZHADO);
                            }
                        });
                    }
                    zzhad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzha2d("Φ" + ZZHADO);
                                zzhaSketch.off("resize").on("resize", function () {
                                    if ($("#zzha").length > 0) {
                                        zzha2d("Φ" + ZZHADO);
                                    }
                                });
                            }
                        }
                    });

                    // thk
                    let ZZHATHK;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])
                        && parseFloat(rows[1][columns[0][1].field]) < ZZHADO / 2) {
                        ZZHATHK = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])
                        && parseFloat(rows[1][columns[0][1].field]) >= ZZHADO / 2) {
                        south.html("盘管厚度 δ 不能大于等于 " + ZZHADO / 2 + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzha2d("Φ" + ZZHADO, ZZHATHK);
                        zzhaSketch.off("resize").on("resize", function () {
                            if ($("#zzha").length > 0) {
                                zzha2d("Φ" + ZZHADO, ZZHATHK);
                            }
                        });
                    }
                    zzhad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzha2d("Φ" + ZZHADO, ZZHATHK);
                                zzhaSketch.off("resize").on("resize", function () {
                                    if ($("#zzha").length > 0) {
                                        zzha2d("Φ" + ZZHADO, ZZHATHK);
                                    }
                                });
                            }
                        }
                    });

                    // DM
                    let ZZHADM;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                        && parseFloat(rows[2][columns[0][1].field]) > ZZHADO) {
                        ZZHADM = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                        && parseFloat(rows[2][columns[0][1].field]) <= ZZHADO) {
                        south.html("盘管中心圆直径 Dm 不能小于等于 " + ZZHADO + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzha2d("Φ" + ZZHADO, ZZHATHK, "Φ" + ZZHADM);
                        zzhaSketch.off("resize").on("resize", function () {
                            if ($("#zzha").length > 0) {
                                zzha2d("Φ" + ZZHADO, ZZHATHK, "Φ" + ZZHADM);
                            }
                        });
                    }
                    zzhad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzha2d("Φ" + ZZHADO, ZZHATHK, "Φ" + ZZHADM);
                                zzhaSketch.off("resize").on("resize", function () {
                                    if ($("#zzha").length > 0) {
                                        zzha2d("Φ" + ZZHADO, ZZHATHK, "Φ" + ZZHADM);
                                    }
                                });
                            }
                        }
                    });

                    // SH
                    let ZZHASH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > ZZHADO) {
                        ZZHASH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) <= ZZHADO) {
                        south.html("盘管中心节距 h 不能小于等于 " + ZZHADO + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzha2d("Φ" + ZZHADO, ZZHATHK, "Φ" + ZZHADM, ZZHASH);
                        zzhaSketch.off("resize").on("resize", function () {
                            if ($("#zzha").length > 0) {
                                zzha2d("Φ" + ZZHADO, ZZHATHK, "Φ" + ZZHADM, ZZHASH);
                            }
                        });
                    }
                    zzhad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzha2d("Φ" + ZZHADO, ZZHATHK, "Φ" + ZZHADM, ZZHASH);
                                zzhaSketch.off("resize").on("resize", function () {
                                    if ($("#zzha").length > 0) {
                                        zzha2d("Φ" + ZZHADO, ZZHATHK, "Φ" + ZZHADM, ZZHASH);
                                    }
                                });
                            }
                        }
                    });

                    // N
                    let ZZHAN;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ZZHAN = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Density
                    let ZZHADensity;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        ZZHADensity = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let ZZHATHETA = Math.atan(ZZHASH / Math.PI / ZZHADM) / Math.PI * 180;
                    south.html(
                        "<span style='color:#444444;'>" +
                        "螺旋上升角：" + ZZHATHETA.toFixed(2) + " °" +
                        "</span>");

                    let ZZHAL = Math.PI * ZZHADM;
                    let ZZHALF = ZZHAL / Math.cos(ZZHATHETA / 180 * Math.PI);
                    let ZZHAA = Math.PI * ZZHADO * ZZHALF / 1000000;

                    let ZZHABH = ZZHASH * ZZHAN + ZZHADO;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管总高：" + ZZHABH.toFixed(2) + " mm" +
                        "</span>");

                    let ZZHALT = ZZHALF * ZZHAN;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管总展开长度：" + (ZZHALT / 1000).toFixed(2) + " m" +
                        "</span>");

                    let ZZHAAT = ZZHAA * ZZHAN;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管总外表面积：" + ZZHAAT.toFixed(2) + " m²" +
                        "</span>");

                    let ZZHAVT = 0.25 * Math.PI * (ZZHADO - 2 * ZZHATHK) * (ZZHADO - 2 * ZZHATHK) * ZZHALT / 1000000000;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管内容积：" + ZZHAVT.toFixed(2) + " m³" +
                        "</span>");

                    let ZZHAAH = ZZHALT * ZZHADO / 1000000;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "作为外盘管时对筒体的传热面积：" + ZZHAAH.toFixed(2) + " m²" +
                        "</span>");

                    let ZZHAW = ZZHADensity * 0.25 * Math.PI * (ZZHADO * ZZHADO - (ZZHADO - 2 * ZZHATHK) * (ZZHADO - 2 * ZZHATHK)) * ZZHALT / 1000000000;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管重量：" + ZZHAW.toFixed(2) + " kg" +
                        "</span>");

                    // docx
                    let ZZHAPayJS = $('#payjs');

                    function getDocx() {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "zzhadocx.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                ribbonName: "ZZHA",

                                dout: ZZHADO,
                                thk: ZZHATHK,
                                dm: ZZHADM,
                                sh: ZZHASH,
                                n: ZZHAN,
                                density: ZZHADensity,
                                theta: ZZHATHETA.toFixed(2),
                                l: ZZHAL.toFixed(2),
                                lf: ZZHALF.toFixed(2),
                                a: ZZHAA.toFixed(2),
                                bh: ZZHABH.toFixed(2),
                                lt: ZZHALT.toFixed(2),
                                at: ZZHAAT.toFixed(2),
                                vt: ZZHAVT.toFixed(2),
                                ah: ZZHAAH.toFixed(2),
                                w: ZZHAW.toFixed(2)
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
                                    ZZHAPayJS.dialog({
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
                                                ZZHAPayJS.dialog("close");
                                                ZZHAPayJS.dialog("clear");
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
                                                            ZZHAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                            // 倒计时计数器
                                                            let maxTime = 4, timer;

                                                            function CountDown() {
                                                                if (maxTime >= 0) {
                                                                    $("#payjs_timer").html(maxTime);
                                                                    --maxTime;
                                                                } else {

                                                                    clearInterval(timer);
                                                                    // 关闭并清空收银台
                                                                    ZZHAPayJS.dialog('close');
                                                                    ZZHAPayJS.dialog('clear');
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});