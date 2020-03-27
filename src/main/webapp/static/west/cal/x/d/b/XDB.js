$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xdbSketch = $("#d2");
    let xdbModel = $("#d3");
    let xdbd2d3 = $('#d2d3');

    $("#cal").html("<table id='xdb'></table>");
    let pg = $("#xdb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/d/b/XDB.json", function (result) {

        let XDBTC, XDBTH, XDBDT,
            XDBCategory, XDBCategoryVal, XDBType, XDBTypeVal, XDBSTD, XDBSTDVal, XDBName, XDBNameVal,
            columns, rows, ed;

        function xdb2d(dout = "Φdo", thkn = "δn", ls = "Ls", s0 = "S0", s1 = "S1", s2 = "S2", sr = "R") {

            xdbSketch.empty();

            let width = xdbSketch.width();
            let height = xdbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XDBSVG").attr("height", height);

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
            let padding = 60;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let r = Math.min(wg, hg);
            let thk = 5;

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

            let cx = padding + 3 * wg;
            let cy = height / 2;

            svg.append("path").attr("d", line([
                {x: cx, y: cy - r - thk},
                {x: padding + 0.5 * wg, y: cy - r - thk},
                {x: padding + 0.5 * wg, y: cy - r + thk},
                {x: cx, y: cy - r + thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: cx, y: cy + r + thk},
                {x: padding + 0.5 * wg, y: cy + r + thk},
                {x: padding + 0.5 * wg, y: cy + r - thk},
                {x: cx, y: cy + r - thk}
            ])).classed("sketch", true);

            drawCenterLine(padding + 0.5 * wg, cy - r, cx, cy - r);
            drawCenterLine(padding + 0.5 * wg, cy + r, cx, cy + r);

            drawArc(r + thk, r + thk, cx, cy - r - thk, cx, cy + r + thk);
            drawArc(r - thk, r - thk, cx, cy - r + thk, cx, cy + r - thk);

            svg.append("path").attr("d", "M "
                + cx + " " + (cy - r) + " "
                + "A" + r + " " + r + " "
                + "1 0 1" + " "
                + cx + " " + (cy + r)
            ).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);

            drawCenterLine(cx, cy - r - thk - 10, cx, cy + r + thk + 10);
            drawCenterLine(cx - 10, cy, cx + r + thk + 10, cy);

            // 折流板0
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg - thk, y: cy - r - thk},
                {x: padding + 2.5 * wg - thk, y: padding + 0.5 * hg},
                {x: padding + 2.5 * wg + thk, y: padding + 0.5 * hg},
                {x: padding + 2.5 * wg + thk, y: cy - r - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg - thk, y: cy + r + thk},
                {x: padding + 2.5 * wg - thk, y: height - padding - 0.5 * hg},
                {x: padding + 2.5 * wg + thk, y: height - padding - 0.5 * hg},
                {x: padding + 2.5 * wg + thk, y: cy + r + thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg - thk, y: cy - r + thk},
                {x: padding + 2.5 * wg - thk, y: cy + r - thk},
                {x: padding + 2.5 * wg + thk, y: cy + r - thk},
                {x: padding + 2.5 * wg + thk, y: cy - r + thk},
                {x: padding + 2.5 * wg - thk, y: cy - r + thk},
            ])).classed("sketch", true);

            drawCenterLine(padding + 2.5 * wg, padding + 0.5 * hg - 10, padding + 2.5 * wg, height - padding - 0.5 * hg + 10);

            // 折流板1
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg - thk, y: cy - r - thk},
                {x: padding + 2 * wg - thk, y: padding + 0.5 * hg},
                {x: padding + 2 * wg + thk, y: padding + 0.5 * hg},
                {x: padding + 2 * wg + thk, y: cy - r - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 2 * wg - thk, y: cy + r + thk},
                {x: padding + 2 * wg - thk, y: height - padding - 0.5 * hg},
                {x: padding + 2 * wg + thk, y: height - padding - 0.5 * hg},
                {x: padding + 2 * wg + thk, y: cy + r + thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 2 * wg - thk, y: cy - r + thk},
                {x: padding + 2 * wg - thk, y: cy + r - thk},
                {x: padding + 2 * wg + thk, y: cy + r - thk},
                {x: padding + 2 * wg + thk, y: cy - r + thk},
                {x: padding + 2 * wg - thk, y: cy - r + thk},
            ])).classed("sketch", true);

            drawCenterLine(padding + 2 * wg, padding + 0.5 * hg - 10, padding + 2 * wg, height - padding - 0.5 * hg + 10);

            // 折流板2
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: cy - r - thk},
                {x: padding + wg - thk, y: padding + 0.5 * hg},
                {x: padding + wg + thk, y: padding + 0.5 * hg},
                {x: padding + wg + thk, y: cy - r - thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: cy + r + thk},
                {x: padding + wg - thk, y: height - padding - 0.5 * hg},
                {x: padding + wg + thk, y: height - padding - 0.5 * hg},
                {x: padding + wg + thk, y: cy + r + thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: cy - r + thk},
                {x: padding + wg - thk, y: cy + r - thk},
                {x: padding + wg + thk, y: cy + r - thk},
                {x: padding + wg + thk, y: cy - r + thk},
                {x: padding + wg - thk, y: cy - r + thk},
            ])).classed("sketch", true);

            drawCenterLine(padding + wg, padding + 0.5 * hg - 10, padding + wg, height - padding - 0.5 * hg + 10);

            // dout thkn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: cy + r + thk},
                    {x: padding + 1.5 * wg + 2, y: cy + r + thk + 10},
                    {x: padding + 1.5 * wg - 2, y: cy + r + thk + 10},
                    {x: padding + 1.5 * wg, y: cy + r + thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: cy + r - thk},
                    {x: padding + 1.5 * wg + 2, y: cy + r - thk - 10},
                    {x: padding + 1.5 * wg - 2, y: cy + r - thk - 10},
                    {x: padding + 1.5 * wg, y: cy + r - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: cy + r + thk + 10 + 10},
                {x: padding + 1.5 * wg, y: cy + r - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: cy + r - thk - 10},
                {x: padding + 1.5 * wg, y: cy + r - thk - 10 - 60}
            ])).attr("id", "XDBSketchDOUT").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDBSketchDOUT").attr("startOffset", "50%").text(dout + "×" + thkn);

            // LS
            dimBottomH(padding + 0.5 * wg, height - padding - 0.5 * hg + 10, cx, height - padding - 0.5 * hg + 10, ls, "XDBSketchLS");
            drawLine(padding + 0.5 * wg, height - padding - 0.5 * hg + 10 + 3, padding + 0.5 * wg, cy + r + thk + 3);
            drawLine(cx, height - padding - 0.5 * hg + 10 + 3, cx, cy + r + thk + 10 + 3);

            // S0
            dimTopH(padding + 2.5 * wg, padding + 0.5 * hg - 10, cx, padding + 0.5 * hg - 10, s0, "XDBSketchS0");
            drawLine(cx, padding + 0.5 * hg - 10 - 3, cx, cy - r - thk - 10 - 3);

            // S1
            dimTopH(padding + 2 * wg, padding + 0.5 * hg - 10, padding + 2.5 * wg, padding + 0.5 * hg - 10, s1, "XDBSketchS1");

            // S2
            dimTopH(padding + wg, padding + 0.5 * hg - 10, padding + 2 * wg, padding + 0.5 * hg - 10, s2, "XDBSketchS2");

            // R
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + r, y: cy},
                    {x: cx + r - 15, y: cy - 3},
                    {x: cx + r - 15, y: cy + 3},
                    {x: cx + r, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx, y: cy},
                    {x: cx + r + 15 + 30, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + 0.707 * (r + 15 + 30), y: cy - 0.707 * (r + 15 + 30)},
                    {x: cx + 0.707 * (r + 15 + 30) + 40, y: cy - 0.707 * (r + 15 + 30)}
                ])).classed("sketch", true).attr("id", "XDBSketchSR");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDBSketchSR")
                .attr("startOffset", "50%").text(sr);

            // A
            svg.append("path").attr("d", line([
                {x: cx + r + thk + 10, y: cy},
                {x: cx + r + thk + 10 + 20, y: cy}
            ])).attr("id", "XDBSketchA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", 3).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XDBSketchA")
                .attr("startOffset", "50%").text("A");
        }

        currentTabIndex = xdbd2d3.tabs('getTabIndex', xdbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xdb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xdb").length > 0) {
                    xdb2d();
                }
            });
        }
        xdbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xdb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xdb").length > 0) {
                            xdb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "U形管热应力计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 200,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 123,
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

                if (index === 5) {
                    $(ed.target).combobox("loadData", XDBCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", XDBType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", XDBSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", XDBName);
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

                    // docx button
                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch & model
                    xdbSketch.empty();
                    xdbModel.empty();

                    // sketch
                    currentTabIndex = xdbd2d3.tabs('getTabIndex', xdbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xdb2d();
                        xdbSketch.off("resize").on("resize", function () {
                            if ($("#xdb").length > 0) {
                                xdb2d();
                            }
                        });
                    }
                    xdbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xdb2d();
                                xdbSketch.off("resize").on("resize", function () {
                                    if ($("#xdb").length > 0) {
                                        xdb2d();
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

                        XDBTH = parseFloat(changes.value);

                        // category、type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XDBCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XDBType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XDBSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XDBName = null;

                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                            && parseFloat(rows[2][columns[0][1].field]) < XDBTH) {
                            XDBTC = parseFloat(rows[2][columns[0][1].field]);

                            XDBDT = Math.max(XDBTH, XDBTC);

                            // 获取 category 列表
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_list_gbt_150_2011_category.action",
                                async: false,
                                dataType: "json",
                                data: JSON.stringify({
                                    temp: XDBDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {
                                    XDBCategory = [];
                                    if (result.length <= 0) {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "&ensp;" + "<span style='color:red;'>" + XDBDT + "</span>" +
                                            "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                    }
                                    else {
                                        $(result).each(function (index, element) {
                                            XDBCategory[index] = {
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
                        else if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])
                            && parseFloat(rows[2][columns[0][1].field]) >= XDBTH) {
                            south.html("冷段平均金属壁温必须小于热段平均金属壁温！").css("color", "red");
                            return false;
                        }
                        else {
                            return false;
                        }
                    }

                    // 温度改变，重新加载 category
                    if (index === 2) {

                        XDBTC = parseFloat(changes.value);

                        // category、type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XDBCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XDBType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XDBSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XDBName = null;

                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])
                            && parseFloat(rows[1][columns[0][1].field]) > XDBTC) {
                            XDBTH = parseFloat(rows[1][columns[0][1].field]);

                            XDBDT = Math.max(XDBTH, XDBTC);

                            // 获取 category 列表
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_list_gbt_150_2011_category.action",
                                async: false,
                                dataType: "json",
                                data: JSON.stringify({
                                    temp: XDBDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {
                                    XDBCategory = [];
                                    if (result.length <= 0) {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "&ensp;" + "<span style='color:red;'>" + XDBDT + "</span>" +
                                            "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                    }
                                    else {
                                        $(result).each(function (index, element) {
                                            XDBCategory[index] = {
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
                        else if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])
                            && parseFloat(rows[1][columns[0][1].field]) <= XDBTC) {
                            south.html("冷段平均金属壁温必须小于热段平均金属壁温！").css("color", "red");
                            return false;
                        }
                        else {
                            return false;
                        }
                    }

                    // category 改变，重新加载type
                    else if (index === 5) {

                        XDBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        XDBType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XDBSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XDBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDBCategoryVal,
                                temp: XDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDBType = [];
                                $(result).each(function (index, element) {
                                    XDBType[index] = {
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
                    else if (index === 6) {

                        XDBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        XDBSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XDBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDBCategoryVal,
                                type: XDBTypeVal,
                                temp: XDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDBSTD = [];
                                $(result).each(function (index, element) {
                                    XDBSTD[index] = {
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
                    else if (index === 7) {

                        XDBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        XDBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XDBCategoryVal,
                                type: XDBTypeVal,
                                std: XDBSTDVal,
                                temp: XDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XDBName = [];
                                $(result).each(function (index, element) {
                                    XDBName[index] = {
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

                    // name 及业务逻辑
                    else {

                        // 设计压力
                        let XDBPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            XDBPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let XDBPS;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            XDBPS = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 腐蚀裕量
                        let XDBC2;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            XDBC2 = parseFloat(rows[4][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 材料名称
                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                            XDBNameVal = rows[8][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取材料密度、最大最小厚度
                        let XDBDensity, XDBThkMin, XDBThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": XDBCategoryVal,
                                "type": XDBTypeVal,
                                "std": XDBSTDVal,
                                "name": XDBNameVal,
                                "temp": XDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                XDBDensity = parseFloat(result.density);
                                XDBThkMin = parseFloat(result.thkMin);
                                XDBThkMax = parseFloat(result.thkMax);

                                // 外直径
                                let XDBDOUT;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    XDBDOUT = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    xdb2d("Φ" + XDBDOUT);
                                    xdbSketch.off("resize").on("resize", function () {
                                        if ($("#xdb").length > 0) {
                                            xdb2d("Φ" + XDBDOUT);
                                        }
                                    });
                                }
                                xdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            xdb2d("Φ" + XDBDOUT);
                                            xdbSketch.off("resize").on("resize", function () {
                                                if ($("#xdb").length > 0) {
                                                    xdb2d("Φ" + XDBDOUT);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 管子名义厚度
                                let XDBTHKN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > Math.max(XDBC2, XDBThkMin)
                                    && parseFloat(rows[10][columns[0][1].field]) <= Math.min(XDBThkMax, XDBDOUT / 2)) {
                                    XDBTHKN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= Math.max(XDBC2, XDBThkMin)) {
                                    south.html("管子厚度不能小于等于 " + Math.max(XDBC2, XDBThkMin) + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > Math.min(XDBThkMax, XDBDOUT / 2)) {
                                    south.html("管子厚度不能大于 " + Math.min(XDBThkMax, XDBDOUT / 2) + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    xdb2d("Φ" + XDBDOUT, XDBTHKN);
                                    xdbSketch.off("resize").on("resize", function () {
                                        if ($("#xdb").length > 0) {
                                            xdb2d("Φ" + XDBDOUT, XDBTHKN);
                                        }
                                    });
                                }
                                xdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            xdb2d("Φ" + XDBDOUT, XDBTHKN);
                                            xdbSketch.off("resize").on("resize", function () {
                                                if ($("#xdb").length > 0) {
                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 热段特性
                                let XDBC1, XDBEHT, XDBAH, XDBOHT, XDBRHEL;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_relt_et_at_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": XDBCategoryVal,
                                        "type": XDBTypeVal,
                                        "std": XDBSTDVal,
                                        "name": XDBNameVal,
                                        "thk": XDBTHKN,
                                        "temp": XDBTH,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": XDBDOUT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        XDBC1 = parseFloat(result.c1);
                                        if (XDBC1 < 0) {
                                            south.html("查询热段材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }
                                        XDBEHT = 1000 * parseFloat(result.et);
                                        if (XDBEHT < 0) {
                                            south.html("查询热段材料壁温弹性模量失败！").css("color", "red");
                                            return false;
                                        }
                                        XDBAH = parseFloat(result.at) / 1000000;
                                        if (XDBAH < 0) {
                                            south.html("查询热段材料常温-壁温平均线膨胀系数失败！").css("color", "red");
                                            return false;
                                        }
                                        XDBOHT = parseFloat(result.ot);
                                        if (XDBOHT < 0) {
                                            south.html("查询热段材料壁温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        XDBRHEL = parseFloat(result.relt);
                                        if (XDBRHEL < 0) {
                                            south.html("查询热段材料壁温屈服点失败！").css("color", "red");
                                            return false;
                                        }

                                        // 冷段特性
                                        let XDBECT, XDBAC, XDBOCT, XDBRCEL;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_relt_et_at_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": XDBCategoryVal,
                                                "type": XDBTypeVal,
                                                "std": XDBSTDVal,
                                                "name": XDBNameVal,
                                                "thk": XDBTHKN,
                                                "temp": XDBTC,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": XDBDOUT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                XDBECT = 1000 * parseFloat(result.et);
                                                if (XDBECT < 0) {
                                                    south.html("查询冷段材料壁温弹性模量失败！").css("color", "red");
                                                    return false;
                                                }
                                                XDBAC = parseFloat(result.at) / 1000000;
                                                if (XDBAC < 0) {
                                                    south.html("查询冷段材料常温-壁温平均线膨胀系数失败！").css("color", "red");
                                                    return false;
                                                }
                                                XDBOCT = parseFloat(result.ot);
                                                if (XDBOCT < 0) {
                                                    south.html("查询冷段材料壁温许用应力失败！").css("color", "red");
                                                    return false;
                                                }
                                                XDBRCEL = parseFloat(result.relt);
                                                if (XDBRCEL < 0) {
                                                    south.html("查询冷段材料壁温屈服点失败！").css("color", "red");
                                                    return false;
                                                }

                                                // LS
                                                let XDBLS;
                                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                    XDBLS = parseFloat(rows[11][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS);
                                                    xdbSketch.off("resize").on("resize", function () {
                                                        if ($("#xdb").length > 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS);
                                                        }
                                                    });
                                                }
                                                xdbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS);
                                                            xdbSketch.off("resize").on("resize", function () {
                                                                if ($("#xdb").length > 0) {
                                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // S0
                                                let XDBS0;
                                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                    XDBS0 = parseFloat(rows[12][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0);
                                                    xdbSketch.off("resize").on("resize", function () {
                                                        if ($("#xdb").length > 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0);
                                                        }
                                                    });
                                                }
                                                xdbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0);
                                                            xdbSketch.off("resize").on("resize", function () {
                                                                if ($("#xdb").length > 0) {
                                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // S1
                                                let XDBS1;
                                                if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                    XDBS1 = parseFloat(rows[13][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1);
                                                    xdbSketch.off("resize").on("resize", function () {
                                                        if ($("#xdb").length > 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1);
                                                        }
                                                    });
                                                }
                                                xdbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1);
                                                            xdbSketch.off("resize").on("resize", function () {
                                                                if ($("#xdb").length > 0) {
                                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // S2
                                                let XDBS2;
                                                if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                                    XDBS2 = parseFloat(rows[14][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1, XDBS2);
                                                    xdbSketch.off("resize").on("resize", function () {
                                                        if ($("#xdb").length > 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1, XDBS2);
                                                        }
                                                    });
                                                }
                                                xdbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1, XDBS2);
                                                            xdbSketch.off("resize").on("resize", function () {
                                                                if ($("#xdb").length > 0) {
                                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1, XDBS2);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // R
                                                let XDBR;
                                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                    && parseFloat(rows[15][columns[0][1].field]) > XDBDOUT / 2) {
                                                    XDBR = parseFloat(rows[15][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                    && parseFloat(rows[15][columns[0][1].field]) <= XDBDOUT / 2) {
                                                    south.html("管子弯曲半径不能小于等于 " + XDBDOUT / 2 + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1, XDBS2, "R" + XDBR);
                                                    xdbSketch.off("resize").on("resize", function () {
                                                        if ($("#xdb").length > 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1, XDBS2, "R" + XDBR);
                                                        }
                                                    });
                                                }
                                                xdbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1, XDBS2, "R" + XDBR);
                                                            xdbSketch.off("resize").on("resize", function () {
                                                                if ($("#xdb").length > 0) {
                                                                    xdb2d("Φ" + XDBDOUT, XDBTHKN, XDBLS, XDBS0, XDBS1, XDBS2, "R" + XDBR);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 过程参数
                                                let XDBPC = XDBPD + XDBPS;
                                                let XDBC = XDBC1 + XDBC2;
                                                let XDBTHKE = XDBTHKN - XDBC;
                                                let XDBL = XDBLS + XDBR;
                                                let XDBRM = (XDBDOUT - XDBTHKN) / 2;
                                                let XDBEMT = (XDBEHT + XDBECT) / 2;

                                                // 腐蚀前热应力计算
                                                let XDBKN = Math.max(1.0, 1.65 / (XDBR * XDBTHKN / (XDBRM * XDBRM) + 6 * XDBPC / XDBEMT * Math.pow(XDBR / XDBTHKN, 4 / 3)));
                                                let XDBSN = XDBKN * Math.PI / 4 * XDBR + XDBS0 + XDBS1 / 3.46 * (1 - (XDBS1 - XDBS2) / (7.46 * XDBS1 + 6.46 * XDBS2));
                                                let XDBFN = (1 + XDBR * XDBDOUT / (XDBRM * XDBRM)) / (1 + 2 * XDBSN * XDBR * XDBR / (XDBL * XDBRM * XDBRM));
                                                let XDBON = XDBFN * XDBEMT * (XDBAH * (XDBTH - 20) - XDBAC * (XDBTC - 20)) / 2;

                                                south.html(
                                                    "<span style='color:#444444;'>" +
                                                    "腐蚀前U形管顶点A处热应力：" + XDBON.toFixed(2) + " MPa" +
                                                    "</span>");

                                                // 腐蚀后热应力计算
                                                let XDBKC = Math.max(1.0, 1.65 / (XDBR * XDBTHKE / (XDBRM * XDBRM) + 6 * XDBPC / XDBEMT * Math.pow(XDBR / XDBTHKE, 4 / 3)));
                                                let XDBSC = XDBKC * Math.PI / 4 * XDBR + XDBS0 + XDBS1 / 3.46 * (1 - (XDBS1 - XDBS2) / (7.46 * XDBS1 + 6.46 * XDBS2));
                                                let XDBFC = (1 + XDBR * XDBDOUT / (XDBRM * XDBRM)) / (1 + 2 * XDBSC * XDBR * XDBR / (XDBL * XDBRM * XDBRM));
                                                let XDBOC = XDBFC * XDBEMT * (XDBAH * (XDBTH - 20) - XDBAC * (XDBTC - 20)) / 2;

                                                south.append(
                                                    "<span style='color:#444444;'>" +
                                                    "&ensp;|&ensp;" +
                                                    "腐蚀后U形管顶点A处热应力：" + XDBOC.toFixed(2) + " MPa" +
                                                    "</span>");

                                                // docx
                                                let XDBPayJS = $('#payjs');

                                                function getDocx() {
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "xdbdocx.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            ribbonName: "XDB",

                                                            pd: XDBPD,
                                                            th: XDBTH,
                                                            tc: XDBTC,
                                                            ps: XDBPS,

                                                            std: XDBSTDVal,
                                                            name: XDBNameVal,
                                                            dout: XDBDOUT,
                                                            thkn: XDBTHKN,
                                                            ls: XDBLS,
                                                            s0: XDBS0,
                                                            s1: XDBS1,
                                                            s2: XDBS2,
                                                            r: XDBR,
                                                            c2: XDBC2,

                                                            density: XDBDensity.toFixed(2),
                                                            eht: (XDBEHT / 1000).toFixed(2),
                                                            ah: (XDBAH * 1000000).toFixed(2),
                                                            oht: XDBOHT.toFixed(2),
                                                            rhel: XDBRHEL.toFixed(2),
                                                            c1: XDBC1.toFixed(2),
                                                            ect: (XDBECT / 1000).toFixed(2),
                                                            ac: (XDBAC * 1000000).toFixed(2),
                                                            oct: XDBOCT.toFixed(2),
                                                            rcel: XDBRCEL.toFixed(2),

                                                            pc: XDBPC.toFixed(2),
                                                            c: XDBC.toFixed(2),
                                                            thke: XDBTHKE.toFixed(2),
                                                            l: XDBL.toFixed(2),
                                                            rm: XDBRM.toFixed(2),
                                                            emt: XDBEMT.toFixed(2),

                                                            kn: XDBKN.toFixed(2),
                                                            sn: XDBSN.toFixed(2),
                                                            fn: XDBFN.toFixed(2),
                                                            on: XDBON.toFixed(2),

                                                            kc: XDBKC.toFixed(2),
                                                            sc: XDBSC.toFixed(2),
                                                            fc: XDBFC.toFixed(2),
                                                            oc: XDBOC.toFixed(2)
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
                                                                XDBPayJS.dialog({
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
                                                                            XDBPayJS.dialog("close");
                                                                            XDBPayJS.dialog("clear");
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
                                                                                        XDBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                        // 倒计时计数器
                                                                                        let maxTime = 4, timer;

                                                                                        function CountDown() {
                                                                                            if (maxTime >= 0) {
                                                                                                $("#payjs_timer").html(maxTime);
                                                                                                --maxTime;
                                                                                            } else {

                                                                                                clearInterval(timer);
                                                                                                // 关闭并清空收银台
                                                                                                XDBPayJS.dialog('close');
                                                                                                XDBPayJS.dialog('clear');
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