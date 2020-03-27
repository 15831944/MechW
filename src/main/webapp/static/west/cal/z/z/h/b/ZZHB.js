$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let zzhbSketch = $("#d2");
    let zzhbModel = $("#d3");
    let zzhbd2d3 = $('#d2d3');

    $("#cal").html("<table id='zzhb'></table>");
    let pg = $("#zzhb");

    let south = $("#south");
    let currentTabIndex = null;

    $.getJSON("/static/west/cal/z/z/h/b/ZZHB.json", function (result) {

        let columns, rows;

        function zzhb2d(dout = "ΦDo", thk = "δ", dm = "ΦDm", h = "h") {

            zzhbSketch.empty();

            let width = zzhbSketch.width();
            let height = zzhbSketch.height();

            let svg = d3.select("#d2").append("svg").attr("id", "ZZHBSVG")
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
            let padding = 80;
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

            // 筒体内径
            let ZZHBSketchH = height - 2 * padding;
            let ZZHBSketchSDI = ZZHBSketchH / 2;
            let ZZHBSketchSDO = ZZHBSketchSDI + 2 * thickness;

            // 筒体端点坐标
            let iltX = width / 2 - ZZHBSketchSDI / 2;
            let iltY = padding;
            let irtX = width / 2 + ZZHBSketchSDI / 2;
            let irtY = padding;
            let ilbX = width / 2 - ZZHBSketchSDI / 2;
            let ilbY = height - padding;
            let irbX = width / 2 + ZZHBSketchSDI / 2;
            let irbY = height - padding;
            let oltX = width / 2 - ZZHBSketchSDO / 2;
            let oltY = padding;
            let ortX = width / 2 + ZZHBSketchSDO / 2;
            let ortY = padding;
            let olbX = width / 2 - ZZHBSketchSDO / 2;
            let olbY = height - padding;
            let orbX = width / 2 + ZZHBSketchSDO / 2;
            let orbY = height - padding;

            // 筒体轮廓
            drawLine(iltX, iltY, ilbX, ilbY);
            drawLine(irtX, irtY, irbX, irbY);
            drawLine(oltX, oltY, olbX, olbY);
            drawLine(ortX, ortY, orbX, orbY);
            drawLine(oltX, oltY, ortX, ortY);
            drawLine(olbX, olbY, orbX, orbY);

            // 盘管半径
            let ZZHBSketchRI = 0.1 * ZZHBSketchSDI;
            let ZZHBSketchRO = ZZHBSketchRI + thickness / 2;
            for (let i = 1, ZZHBSketchCenterY1 = olbY - (ZZHBSketchRO + 16); ZZHBSketchCenterY1 >= padding + ZZHBSketchRO; i++) {
                drawCenterLine(oltX + 6, ZZHBSketchCenterY1, oltX - ZZHBSketchRO - 10, ZZHBSketchCenterY1);
                drawArc(ZZHBSketchRI, ZZHBSketchRI, oltX, ZZHBSketchCenterY1 + ZZHBSketchRI, oltX, ZZHBSketchCenterY1 - ZZHBSketchRI);
                drawArc(ZZHBSketchRO, ZZHBSketchRO, oltX, ZZHBSketchCenterY1 + ZZHBSketchRO, oltX, ZZHBSketchCenterY1 - ZZHBSketchRO);
                ZZHBSketchCenterY1 = olbY - i * (2 * ZZHBSketchRO + 16) - (ZZHBSketchRO + 16);
            }
            for (let i = 1, ZZHBSketchCenterY1 = olbY - (2 * ZZHBSketchRO + 24); ZZHBSketchCenterY1 >= padding + ZZHBSketchRO; i++) {
                drawCenterLine(ortX - 6, ZZHBSketchCenterY1, ortX + ZZHBSketchRO + 10, ZZHBSketchCenterY1);
                drawArc(ZZHBSketchRI, ZZHBSketchRI, ortX, ZZHBSketchCenterY1 - ZZHBSketchRI, ortX, ZZHBSketchCenterY1 + ZZHBSketchRI);
                drawArc(ZZHBSketchRO, ZZHBSketchRO, ortX, ZZHBSketchCenterY1 - ZZHBSketchRO, ortX, ZZHBSketchCenterY1 + ZZHBSketchRO);
                ZZHBSketchCenterY1 = olbY - i * (2 * ZZHBSketchRO + 16) - (2 * ZZHBSketchRO + 24);
            }

            // h
            dimLeftV(oltX - ZZHBSketchRO - 10, olbY - 3 * (2 * ZZHBSketchRO + 16) + ZZHBSketchRO, oltX - ZZHBSketchRO - 10, olbY - 4 * (2 * ZZHBSketchRO + 16) + ZZHBSketchRO, h, "ZZHBSketchH");

            // 中心线
            drawCenterLine(width / 2, padding - 10, width / 2, height - padding + 10);

            // 底部水平标注
            dimBottomH(olbX, ilbY, orbX, irbY, dm, "ZZHBSketchDM");

            // 夹套厚度标注
            svg.append("path").attr("d", line([
                {x: orbX + ZZHBSketchRO + 15, y: olbY - (2 * ZZHBSketchRO + 24)},
                {x: orbX + ZZHBSketchRO + 15 + 40, y: olbY - (2 * ZZHBSketchRO + 24)}
            ])).attr("id", "ZZHBSketchTHK").classed("sketch", true)
                .attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * ZZHBSketchRO + 24)) + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#ZZHBSketchTHK").attr("startOffset", "50%").text(thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: orbX + ZZHBSketchRO, y: olbY - (2 * ZZHBSketchRO + 24)},
                    {x: orbX + ZZHBSketchRO + 15, y: olbY - (2 * ZZHBSketchRO + 24) - 3},
                    {x: orbX + ZZHBSketchRO + 15, y: olbY - (2 * ZZHBSketchRO + 24) + 3},
                    {x: orbX + ZZHBSketchRO, y: olbY - (2 * ZZHBSketchRO + 24)}
                ])).attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * ZZHBSketchRO + 24)) + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: orbX + ZZHBSketchRI, y: olbY - (2 * ZZHBSketchRO + 24)},
                    {x: orbX + ZZHBSketchRI - 15, y: olbY - (2 * ZZHBSketchRO + 24) - 3},
                    {x: orbX + ZZHBSketchRI - 15, y: olbY - (2 * ZZHBSketchRO + 24) + 3},
                    {x: orbX + ZZHBSketchRI, y: olbY - (2 * ZZHBSketchRO + 24)}
                ])).attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * ZZHBSketchRO + 24)) + ")");
            svg.append("path").attr("d", line([
                {x: orbX + ZZHBSketchRI, y: olbY - (2 * ZZHBSketchRO + 24)},
                {x: orbX + ZZHBSketchRO, y: olbY - (2 * ZZHBSketchRO + 24)}
            ])).classed("sketch", true).attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * ZZHBSketchRO + 24)) + ")");
            svg.append("path").attr("d", line([
                {x: orbX + ZZHBSketchRI - 15, y: olbY - (2 * ZZHBSketchRO + 24)},
                {x: orbX + ZZHBSketchRI - 30, y: olbY - (2 * ZZHBSketchRO + 24)}
            ])).classed("sketch", true).attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * ZZHBSketchRO + 24)) + ")");

            // 夹套外直径
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: olbX - ZZHBSketchRO, y: olbY - (ZZHBSketchRO + 16)},
                    {x: olbX - ZZHBSketchRO - 15, y: olbY - (ZZHBSketchRO + 16) - 3},
                    {x: olbX - ZZHBSketchRO - 15, y: olbY - (ZZHBSketchRO + 16) + 3},
                    {x: olbX - ZZHBSketchRO, y: olbY - (ZZHBSketchRO + 16)}
                ])).attr("transform", "rotate(" + 45 + ", " + olbX + " " + (olbY - (ZZHBSketchRO + 16)) + ")");
            svg.append("path").attr("d", line([
                {x: olbX - ZZHBSketchRO, y: olbY - (ZZHBSketchRO + 16)},
                {x: olbX, y: olbY - (ZZHBSketchRO + 16)}
            ])).classed("sketch", true).attr("transform", "rotate(" + 45 + ", " + olbX + " " + (olbY - (ZZHBSketchRO + 16)) + ")");
            svg.append("path").attr("d", line([
                {x: olbX - ZZHBSketchRO - 30, y: olbY - (ZZHBSketchRO + 16)},
                {x: olbX - ZZHBSketchRO - 15, y: olbY - (ZZHBSketchRO + 16)}
            ])).classed("sketch", true).attr("transform", "rotate(" + 45 + ", " + olbX + " " + (olbY - (ZZHBSketchRO + 16)) + ")");
            svg.append("path").attr("d", line([
                {
                    x: olbX - 0.707 * (ZZHBSketchRO + 30) - 40,
                    y: olbY - (ZZHBSketchRO + 16) - 0.707 * (ZZHBSketchRO + 30)
                },
                {x: olbX - 0.707 * (ZZHBSketchRO + 30), y: olbY - (ZZHBSketchRO + 16) - 0.707 * (ZZHBSketchRO + 30)}
            ])).attr("id", "ZZHBSketchDOUT").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#ZZHBSketchDOUT").attr("startOffset", "50%").text(dout);

        }

        currentTabIndex = zzhbd2d3.tabs('getTabIndex', zzhbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            zzhb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#zzhb").length > 0) {
                    zzhb2d();
                }
            });
        }
        zzhbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    zzhb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#zzhb").length > 0) {
                            zzhb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "盘管(半管)计算",
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
                    zzhbSketch.empty();
                    zzhbModel.empty();

                    // sketch
                    currentTabIndex = zzhbd2d3.tabs('getTabIndex', zzhbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzhb2d();
                        zzhbSketch.off("resize").on("resize", function () {
                            if ($("#zzhb").length > 0) {
                                zzhb2d();
                            }
                        });
                    }
                    zzhbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzhb2d();
                                zzhbSketch.off("resize").on("resize", function () {
                                    if ($("#zzhb").length > 0) {
                                        zzhb2d();
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
                    let ZZHBDO;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ZZHBDO = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzhb2d("Φ" + ZZHBDO);
                        zzhbSketch.off("resize").on("resize", function () {
                            if ($("#zzhb").length > 0) {
                                zzhb2d("Φ" + ZZHBDO);
                            }
                        });
                    }
                    zzhbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzhb2d("Φ" + ZZHBDO);
                                zzhbSketch.off("resize").on("resize", function () {
                                    if ($("#zzhb").length > 0) {
                                        zzhb2d("Φ" + ZZHBDO);
                                    }
                                });
                            }
                        }
                    });

                    // thk
                    let ZZHBTHK;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])
                        && parseFloat(rows[1][columns[0][1].field]) < ZZHBDO / 2) {
                        ZZHBTHK = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])
                        && parseFloat(rows[1][columns[0][1].field]) >= ZZHBDO / 2) {
                        south.html("盘管厚度 δ 不能大于等于 " + ZZHBDO / 2 + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzhb2d("Φ" + ZZHBDO, ZZHBTHK);
                        zzhbSketch.off("resize").on("resize", function () {
                            if ($("#zzhb").length > 0) {
                                zzhb2d("Φ" + ZZHBDO, ZZHBTHK);
                            }
                        });
                    }
                    zzhbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzhb2d("Φ" + ZZHBDO, ZZHBTHK);
                                zzhbSketch.off("resize").on("resize", function () {
                                    if ($("#zzhb").length > 0) {
                                        zzhb2d("Φ" + ZZHBDO, ZZHBTHK);
                                    }
                                });
                            }
                        }
                    });

                    // DM
                    let ZZHBDM;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                        && parseFloat(rows[2][columns[0][1].field]) > ZZHBDO) {
                        ZZHBDM = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                        && parseFloat(rows[2][columns[0][1].field]) <= ZZHBDO) {
                        south.html("盘管中心圆直径 Dm 不能小于等于 " + ZZHBDO + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzhb2d("Φ" + ZZHBDO, ZZHBTHK, "Φ" + ZZHBDM);
                        zzhbSketch.off("resize").on("resize", function () {
                            if ($("#zzhb").length > 0) {
                                zzhb2d("Φ" + ZZHBDO, ZZHBTHK, "Φ" + ZZHBDM);
                            }
                        });
                    }
                    zzhbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzhb2d("Φ" + ZZHBDO, ZZHBTHK, "Φ" + ZZHBDM);
                                zzhbSketch.off("resize").on("resize", function () {
                                    if ($("#zzhb").length > 0) {
                                        zzhb2d("Φ" + ZZHBDO, ZZHBTHK, "Φ" + ZZHBDM);
                                    }
                                });
                            }
                        }
                    });

                    // SH
                    let ZZHBSH;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) > ZZHBDO) {
                        ZZHBSH = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])
                        && parseFloat(rows[3][columns[0][1].field]) <= ZZHBDO) {
                        south.html("盘管中心节距 h 不能小于等于 " + ZZHBDO + " mm").css("color", "red");
                        return false;
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        zzhb2d("Φ" + ZZHBDO, ZZHBTHK, "Φ" + ZZHBDM, ZZHBSH);
                        zzhbSketch.off("resize").on("resize", function () {
                            if ($("#zzhb").length > 0) {
                                zzhb2d("Φ" + ZZHBDO, ZZHBTHK, "Φ" + ZZHBDM, ZZHBSH);
                            }
                        });
                    }
                    zzhbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                zzhb2d("Φ" + ZZHBDO, ZZHBTHK, "Φ" + ZZHBDM, ZZHBSH);
                                zzhbSketch.off("resize").on("resize", function () {
                                    if ($("#zzhb").length > 0) {
                                        zzhb2d("Φ" + ZZHBDO, ZZHBTHK, "Φ" + ZZHBDM, ZZHBSH);
                                    }
                                });
                            }
                        }
                    });

                    // N
                    let ZZHBN;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ZZHBN = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Density
                    let ZZHBDensity;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        ZZHBDensity = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    let ZZHBTHETA = Math.atan(ZZHBSH / Math.PI / ZZHBDM) / Math.PI * 180;
                    south.html(
                        "<span style='color:#444444;'>" +
                        "螺旋上升角：" + ZZHBTHETA.toFixed(2) + " °" +
                        "</span>");

                    let ZZHBL = Math.PI * ZZHBDM;
                    let ZZHBLF = ZZHBL / Math.cos(ZZHBTHETA / 180 * Math.PI);
                    let ZZHBA = 0.5 * Math.PI * ZZHBDO * ZZHBLF / 1000000;

                    let ZZHBVB = Math.PI * (ZZHBDO - ZZHBTHK) / 2;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管展开宽度：" + ZZHBVB.toFixed(2) + " mm" +
                        "</span>");

                    let ZZHBBH = ZZHBSH * ZZHBN + ZZHBDO;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管总高：" + ZZHBBH.toFixed(2) + " mm" +
                        "</span>");

                    let ZZHBLT = ZZHBLF * ZZHBN;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管总展开长度：" + (ZZHBLT / 1000).toFixed(2) + " m" +
                        "</span>");

                    let ZZHBAT = ZZHBA * ZZHBN;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管总外表面积：" + ZZHBAT.toFixed(2) + " m²" +
                        "</span>");

                    let ZZHBVT = 0.5 * 0.25 * Math.PI * (ZZHBDO - 2 * ZZHBTHK) * (ZZHBDO - 2 * ZZHBTHK) * ZZHBLT / 1000000000;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管内容积：" + ZZHBVT.toFixed(2) + " m³" +
                        "</span>");

                    let ZZHBAH = ZZHBLT * ZZHBDO / 1000000;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "对筒体的传热面积：" + ZZHBAH.toFixed(2) + " m²" +
                        "</span>");

                    let ZZHBW = 0.5 * ZZHBDensity * 0.25 * Math.PI * (ZZHBDO * ZZHBDO - (ZZHBDO - 2 * ZZHBTHK) * (ZZHBDO - 2 * ZZHBTHK)) * ZZHBLT / 1000000000;
                    south.append(
                        "<span style='color:#444444;'>" +
                        "&ensp;|&ensp;" +
                        "盘管重量：" + ZZHBW.toFixed(2) + " kg" +
                        "</span>");

                    // docx
                    let ZZHBPayJS = $('#payjs');

                    function getDocx() {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "zzhbdocx.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                ribbonName: "ZZHB",

                                dout: ZZHBDO,
                                thk: ZZHBTHK,
                                dm: ZZHBDM,
                                sh: ZZHBSH,
                                n: ZZHBN,
                                density: ZZHBDensity,
                                theta: ZZHBTHETA.toFixed(2),
                                l: ZZHBL.toFixed(2),
                                lf: ZZHBLF.toFixed(2),
                                a: ZZHBA.toFixed(2),
                                bh: ZZHBBH.toFixed(2),
                                lt: ZZHBLT.toFixed(2),
                                at: ZZHBAT.toFixed(2),
                                vt: ZZHBVT.toFixed(2),
                                ah: ZZHBAH.toFixed(2),
                                w: ZZHBW.toFixed(2),
                                vb: ZZHBVB.toFixed(2)
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
                                    ZZHBPayJS.dialog({
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
                                                ZZHBPayJS.dialog("close");
                                                ZZHBPayJS.dialog("clear");
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
                                                            ZZHBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                            // 倒计时计数器
                                                            let maxTime = 4, timer;

                                                            function CountDown() {
                                                                if (maxTime >= 0) {
                                                                    $("#payjs_timer").html(maxTime);
                                                                    --maxTime;
                                                                } else {

                                                                    clearInterval(timer);
                                                                    // 关闭并清空收银台
                                                                    ZZHBPayJS.dialog('close');
                                                                    ZZHBPayJS.dialog('clear');
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