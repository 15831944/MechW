$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let azccSketch = $("#d2");
    let azccModel = $("#d3");
    let azccd2d3 = $('#d2d3');

    $("#cal").html("<table id='azcc'></table>");
    let pg = $("#azcc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/z/c/c/AZCC.json", function (result) {

        let columns, rows;

        function azcc2d(d = "d") {

            azccSketch.empty();

            let width = azccSketch.width();
            let height = azccSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AZCCSVG").attr("height", height);

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

            // 图形边距
            let padding = 20;
            let hg = (height - 2 * padding) / 4;
            let wg = (width - 2 * padding) / 4;
            let thk = 8;

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
                        {x: startX + 10, y: startY - 28},
                        {x: startX + 10, y: startY - 32},
                        {x: startX, y: startY - 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY - 30},
                        {x: endX - 10, y: endY - 28},
                        {x: endX - 10, y: endY - 32},
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
                        {x: startX + 10, y: startY + 28},
                        {x: startX + 10, y: startY + 32},
                        {x: startX, y: startY + 30}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX, y: endY + 30},
                        {x: endX - 10, y: endY + 28},
                        {x: endX - 10, y: endY + 32},
                        {x: endX, y: endY + 30}
                    ]));
                svg.append("path").attr("d", line([
                    {x: startX, y: startY + 30},
                    {x: endX, y: endY + 30}
                ])).attr("id", id).classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%")
                    .text(text);

            }

            // 左侧垂直标注
            function dimLeftV(startX, startY, endX, endY, text, id) {

                extLineLeftH(startX, startY);
                extLineLeftH(endX, endY);
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: startX - 30, y: startY},
                        {x: startX - 28, y: startY - 10},
                        {x: startX - 32, y: startY - 10},
                        {x: startX - 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX - 30, y: endY},
                        {x: endX - 28, y: endY + 10},
                        {x: endX - 32, y: endY + 10},
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
                        {x: startX + 28, y: startY - 10},
                        {x: startX + 32, y: startY - 10},
                        {x: startX + 30, y: startY}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: endX + 30, y: endY},
                        {x: endX + 28, y: endY + 10},
                        {x: endX + 32, y: endY + 10},
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

            let cx1 = padding + wg;
            let r = 3 * thk;
            drawLine(cx1 - r, padding + 2.5 * hg + thk, cx1 - r, padding + 3 * hg);
            drawLine(cx1 + r, padding + 2.5 * hg + thk, cx1 + r, padding + 3 * hg);
            drawLine(cx1 - r - 2 * thk, padding + 2.5 * hg + thk, cx1 + r + 2 * thk, padding + 2.5 * hg + thk);
            drawLine(cx1 - r - 2 * thk, padding + 2.5 * hg, cx1 + r + 2 * thk, padding + 2.5 * hg);
            drawLine(cx1 - r - 2 * thk, padding + 2.5 * hg - thk, cx1 + r + 2 * thk, padding + 2.5 * hg - thk);
            drawLine(cx1 - r - 2 * thk, padding + 2.5 * hg - thk, cx1 - r - 2 * thk, padding + 2.5 * hg + thk);
            drawLine(cx1 + r + 2 * thk, padding + 2.5 * hg - thk, cx1 + r + 2 * thk, padding + 2.5 * hg + thk);

            let cy1 = height / 2;
            svg.append("path").attr("d", line([
                {x: cx1 + r, y: padding + 2.5 * hg - thk},
                {x: cx1 + r, y: cy1 + r},
                {x: cx1 + 2 * r + 2 * thk, y: cy1 + r}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx1 + 2 * r + 2 * thk, y: cy1 + r + 2 * thk},
                {x: cx1 + 2 * r + 2 * thk, y: cy1 - r - 2 * thk},
                {x: cx1 + 2 * r + 4 * thk, y: cy1 - r - 2 * thk},
                {x: cx1 + 2 * r + 4 * thk, y: cy1 + r + 2 * thk},
                {x: cx1 + 2 * r + 2 * thk, y: cy1 + r + 2 * thk}
            ])).classed("sketch", true);
            drawLine(cx1 + 2 * r + 3 * thk, cy1 - r - 2 * thk, cx1 + 2 * r + 3 * thk, cy1 + r + 2 * thk);

            svg.append("path").attr("d", line([
                {x: cx1 - r, y: padding + 2.5 * hg - thk},
                {x: cx1 - r, y: padding + 2.5 * hg - thk - (padding + 2.5 * hg - thk - (padding + 1.5 * hg)) / 5},
                {
                    x: cx1 - r - thk,
                    y: padding + 2.5 * hg - thk - 2 * (padding + 2.5 * hg - thk - (padding + 1.5 * hg)) / 5
                },
                {
                    x: cx1 - r - thk,
                    y: padding + 2.5 * hg - thk - 3 * (padding + 2.5 * hg - thk - (padding + 1.5 * hg)) / 5
                },
                {
                    x: cx1 - r - 2 * thk,
                    y: padding + 2.5 * hg - thk - 4 * (padding + 2.5 * hg - thk - (padding + 1.5 * hg)) / 5
                },
                {
                    x: cx1 - r - 2 * thk,
                    y: padding + 2.5 * hg - thk - (padding + 2.5 * hg - thk - (padding + 1.5 * hg)) - thk
                }
            ])).classed("sketch", true);
            drawLine(cx1 - r - 2 * thk, padding + 2.5 * hg - thk - (padding + 2.5 * hg - thk - (padding + 1.5 * hg)) - thk, cx1 + r + 2 * thk, padding + 2.5 * hg - thk - (padding + 2.5 * hg - thk - (padding + 1.5 * hg)) - thk);
            drawLine(cx1 - r - 2 * thk, padding + 2.5 * hg - thk - (padding + 2.5 * hg - thk - (padding + 1.5 * hg)), cx1 + r + 2 * thk, padding + 2.5 * hg - thk - (padding + 2.5 * hg - thk - (padding + 1.5 * hg)));

            drawLine(cx1 + r + 2 * thk, padding + 2.5 * hg - thk - (padding + 2.5 * hg - thk - (padding + 1.5 * hg)) - thk, cx1 + r + 2 * thk, cy1 - r);

            drawLine(cx1 + r + 2 * thk, cy1 - r, cx1 + r + 2 * thk + r, cy1 - r);

            drawLine(cx1 - r - thk, padding + hg, cx1 - r - thk, padding + 1.5 * hg - thk);
            drawLine(cx1 + r + thk, padding + hg, cx1 + r + thk, padding + 1.5 * hg - thk);
            svg.append("path").attr("d", line([
                {x: cx1 - r - thk, y: padding + hg},
                {x: cx1 - r - thk - thk, y: padding + hg},
                {x: cx1 - r - thk - thk, y: padding + hg - thk},
                {x: cx1 + r + thk + thk, y: padding + hg - thk},
                {x: cx1 + r + thk + thk, y: padding + hg},
                {x: cx1 + r + thk, y: padding + hg}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: cx1 - 2 * thk, y: padding + hg - thk},
                {x: cx1 - 2 * thk, y: padding + hg - thk - 3 * thk},
                {x: cx1 - thk, y: padding + hg - thk - 3 * thk - 2 * thk},
                {x: cx1 - thk, y: padding + hg - thk - 3 * thk - 2 * thk - 3 * thk},
                {x: cx1 + thk, y: padding + hg - thk - 3 * thk - 2 * thk - 3 * thk},
                {x: cx1 + thk, y: padding + hg - thk - 3 * thk - 2 * thk},
                {x: cx1 + 2 * thk, y: padding + hg - thk - 3 * thk},
                {x: cx1 + 2 * thk, y: padding + hg - thk}
            ])).classed("sketch", true);

            let sr = 3 * r;
            drawLine(cx1 + r + 2 * thk + r + 2 * thk, cy1 - r, cx1 + 2 * wg - sr, cy1 - r);
            drawLine(cx1 + r + 2 * thk + r + 2 * thk, cy1 + r, cx1 + 2 * wg - sr, cy1 + r);

            drawArc(sr - r, sr - r, padding + 3 * wg - r, cy1 - sr, padding + 3 * wg - sr, cy1 - r);
            drawArc(sr + r, sr + r, padding + 3 * wg + r, cy1 - sr, padding + 3 * wg - sr, cy1 + r);

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - r, y: cy1 - sr},
                {x: padding + 3 * wg - r, y: cy1 - sr - r}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + r, y: cy1 - sr - r},
                {x: padding + 3 * wg + r, y: cy1 - sr}
            ])).classed("sketch", true);

            drawArc(r, r / 2, padding + 3 * wg - r, cy1 - sr - r, padding + 3 * wg + r, cy1 - sr - r);
            drawArc(r, r / 2, padding + 3 * wg + r, cy1 - sr - r, padding + 3 * wg - r, cy1 - sr - r);

            // F
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: cy1 - sr - r},
                    {x: padding + 3 * wg + 3, y: cy1 - sr - r - 15},
                    {x: padding + 3 * wg - 3, y: cy1 - sr - r - 15},
                    {x: padding + 3 * wg, y: cy1 - sr - r}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: cy1 - sr - r - 15},
                    {x: padding + 3 * wg, y: cy1 - sr - r - 15 - 2 * r}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 15, y: cy1 - sr - r - 15 - 2 * r},
                {x: padding + 3 * wg + 15, y: cy1 - sr - r - 15 - 2 * r}
            ])).attr("id", "AZCCSketchF");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AZCCSketchF").attr("startOffset", "50%").text("F");

            // D
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + r, y: cy1 - sr - r},
                    {x: padding + 3 * wg + r + 10, y: cy1 - sr - r + 2},
                    {x: padding + 3 * wg + r + 10, y: cy1 - sr - r - 2},
                    {x: padding + 3 * wg + r, y: cy1 - sr - r}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg - r, y: cy1 - sr - r},
                    {x: padding + 3 * wg - r - 10, y: cy1 - sr - r + 2},
                    {x: padding + 3 * wg - r - 10, y: cy1 - sr - r - 2},
                    {x: padding + 3 * wg - r, y: cy1 - sr - r}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + r, y: cy1 - sr - r},
                {x: padding + 3 * wg - r - 10 - 10, y: cy1 - sr - r}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + r + 10, y: cy1 - sr - r},
                {x: padding + 3 * wg + r + 10 + 40, y: cy1 - sr - r}
            ])).attr("id", "AZCCSketchA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AZCCSketchA").attr("startOffset", "50%")
                .text(d);
        }

        currentTabIndex = azccd2d3.tabs('getTabIndex', azccd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            azcc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#azcc").length > 0) {
                    azcc2d();
                }
            });
        }
        azccd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    azcc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#azcc").length > 0) {
                            azcc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "API 520.2-2015 液体安全阀泄放反力计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 210,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 113,
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
                    azccSketch.empty();
                    azccModel.empty();

                    // sketch
                    currentTabIndex = azccd2d3.tabs('getTabIndex', azccd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        azcc2d();
                        azccSketch.off("resize").on("resize", function () {
                            if ($("#azcc").length > 0) {
                                azcc2d();
                            }
                        });
                    }
                    azccd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                azcc2d();
                                azccSketch.off("resize").on("resize", function () {
                                    if ($("#azcc").length > 0) {
                                        azcc2d();
                                    }
                                });
                            }
                        }
                    });

                    south.empty();
                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // W
                    let AZCCW;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AZCCW = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // p
                    let AZCCP;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        AZCCP = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // density
                    let AZCCDensity;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AZCCDensity = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // D
                    let AZCCD;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AZCCD = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        azcc2d("Φ" + AZCCD);
                        azccSketch.off("resize").on("resize", function () {
                            if ($("#azcc").length > 0) {
                                azcc2d("Φ" + AZCCD);
                            }
                        });
                    }
                    azccd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                azcc2d("Φ" + AZCCD);
                                azccSketch.off("resize").on("resize", function () {
                                    if ($("#azcc").length > 0) {
                                        azcc2d("Φ" + AZCCD);
                                    }
                                });
                            }
                        }
                    });

                    let AZCCA = Math.PI * AZCCD * AZCCD / 4;
                    let AZCCF = 1000000 * AZCCW * AZCCW / (AZCCA * AZCCDensity) + AZCCA * AZCCP / 1000;

                    south.html(
                        "<span style='color:#444444;'>" +
                        "安全阀泄放反力 F = " + AZCCF.toFixed(2) + " N" +
                        "</span>");

                    // docx
                    let AZCCPayJS = $('#payjs');

                    function getDocx() {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "azccdocx.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                ribbonName: "AZCC",

                                w: AZCCW,
                                p: AZCCP,
                                density: AZCCDensity,
                                d: AZCCD,
                                a: AZCCA.toFixed(4),
                                f: AZCCF.toFixed(4)
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
                                    AZCCPayJS.dialog({
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
                                                AZCCPayJS.dialog("close");
                                                AZCCPayJS.dialog("clear");
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
                                                            AZCCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                            // 倒计时计数器
                                                            let maxTime = 4, timer;

                                                            function CountDown() {
                                                                if (maxTime >= 0) {
                                                                    $("#payjs_timer").html(maxTime);
                                                                    --maxTime;
                                                                } else {

                                                                    clearInterval(timer);
                                                                    // 关闭并清空收银台
                                                                    AZCCPayJS.dialog('close');
                                                                    AZCCPayJS.dialog('clear');
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