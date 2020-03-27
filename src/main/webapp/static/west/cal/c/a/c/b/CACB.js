$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cacbd2 = $("#d2");
    let cacbd3 = $("#d3");
    let cacbd2d3 = $('#d2d3');

    $("#cal").html("<table id='cacb'></table>");
    let pg = $("#cacb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/c/b/CACB.json", function (result) {

        let CACBDT;
        let CACBSCategory, CACBSCategoryVal, CACBSType, CACBSTypeVal, CACBSSTD, CACBSSTDVal, CACBSName,
            CACBJCategory, CACBJCategoryVal, CACBJType, CACBJTypeVal, CACBJSTD, CACBJSTDVal, CACBJName;
        let columns, rows, ed;

        // 2D Sketch
        function cacb2d(dsi = "ϕDsi", thksn = "δsn", j = "j", t = "t", thkjn = "δjn") {

            cacbd2.empty();

            let width = cacbd2.width();
            let height = cacbd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CACBSVG")
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

            // 图形边距
            let padding = 60;
            let thickness = 10;

            // 筒体内外壁
            drawLine(width / 2, padding, width / 2, height - padding);
            drawLine(width / 2 + thickness, padding, width / 2 + thickness, height - padding);

            let innerL = 40;
            let outerL = innerL + thickness;

            // 夹套外壁横边
            let n = parseInt((height - 2 * padding) / 2 / outerL);
            for (let i = 0; i < n; i++) {
                // 外-横
                drawLine(width / 2 - outerL, height / 2 - i * outerL, width / 2, height / 2 - i * outerL);
                drawLine(width / 2 - outerL, height / 2 + i * outerL, width / 2, height / 2 + i * outerL);

                // 内-横
                drawLine(width / 2 - outerL + thickness, height / 2 - i * outerL + thickness, width / 2, height / 2 - i * outerL + thickness);
                drawLine(width / 2 - outerL + thickness, height / 2 + i * outerL + thickness, width / 2, height / 2 + i * outerL + thickness);

                // 外-竖
                drawLine(width / 2 - outerL, height / 2 - i * outerL, width / 2 - outerL, height / 2 - i * outerL + outerL);
                drawLine(width / 2 - outerL, height / 2 + i * outerL, width / 2 - outerL, height / 2 + i * outerL + outerL);

                // 内-竖
                drawLine(width / 2 - outerL + thickness, height / 2 - i * outerL + thickness, width / 2 - outerL + thickness, height / 2 - i * outerL + outerL);
                drawLine(width / 2 - outerL + thickness, height / 2 + i * outerL + thickness, width / 2 - outerL + thickness, height / 2 + i * outerL + outerL);

                drawLine(width / 2 - outerL, height / 2 + (i + 1) * outerL, width / 2 - outerL + thickness, height / 2 + (i + 1) * outerL);
            }

            // DSI
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + thickness, y: height / 2 - innerL / 2},
                    {x: width / 2 + thickness + 15, y: height / 2 - innerL / 2 - 3},
                    {x: width / 2 + thickness + 15, y: height / 2 - innerL / 2 + 3},
                    {x: width / 2 + thickness, y: height / 2 - innerL / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 + thickness + 15, y: height / 2 - innerL / 2},
                {x: width / 2 + thickness + 15 + 60, y: height / 2 - innerL / 2}
            ])).attr("id", "CACBSketchDSI").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CACBSketchDSI").attr("startOffset", "50%").text(dsi);

            // 内筒体厚度
            drawLine(width / 2 - 15 - 10, height / 2 + outerL / 2, width / 2 + thickness, height / 2 + outerL / 2);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: height / 2 + outerL / 2},
                    {x: width / 2 - 15, y: height / 2 + outerL / 2 - 3},
                    {x: width / 2 - 15, y: height / 2 + outerL / 2 + 3},
                    {x: width / 2, y: height / 2 + outerL / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + thickness, y: height / 2 + outerL / 2},
                    {x: width / 2 + thickness + 15, y: height / 2 + outerL / 2 - 3},
                    {x: width / 2 + thickness + 15, y: height / 2 + outerL / 2 + 3},
                    {x: width / 2 + thickness, y: height / 2 + outerL / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 + thickness + 15, y: height / 2 + outerL / 2},
                {x: width / 2 + thickness + 15 + 40, y: height / 2 + outerL / 2}
            ])).attr("id", "CACBSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CACBSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // J
            let x0 = width / 2 - outerL, y0 = height / 2 - (n - 1) * outerL;
            let x1 = width / 2, y1 = height / 2 - (n - 1) * outerL;
            svg.append("path").attr("d", line([
                {x: x0, y: y0 - 30},
                {x: x1, y: y0 - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: x1 + 15, y: y0 - 30},
                {x: x1 + 15 + 10, y: y0 - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: x0, y: y0 - 40},
                {x: x0, y: y0 - 3}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: x1, y: y1 - 30},
                    {x: x1 + 15, y: y1 - 30 - 3},
                    {x: x1 + 15, y: y1 - 30 + 3},
                    {x: x1, y: y1 - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: x0, y: y0 - 30},
                    {x: x0 - 15, y: y0 - 30 - 3},
                    {x: x0 - 15, y: y0 - 30 + 3},
                    {x: x0, y: y0 - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: x0 - 15 - 40, y: y0 - 30},
                {x: x0 - 15, y: y0 - 30}
            ])).attr("id", "CACBSketchJ").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CACBSketchJ")
                .attr("startOffset", "50%").text(j);

            // thkjn
            svg.append("path").attr("d", line([
                {x: width / 2 - outerL, y: height / 2 + n * outerL + 40},
                {x: width / 2 - outerL, y: height / 2 + n * outerL + 3}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2 - outerL, y: height / 2 + n * outerL + 30},
                {x: width / 2 - outerL + thickness + 15 + 10, y: height / 2 + n * outerL + 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width / 2 - outerL + thickness, y: height / 2 + n * outerL + 40},
                {x: width / 2 - outerL + thickness, y: height / 2 + n * outerL + 3}
            ])).classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - outerL, y: height / 2 + n * outerL + 30},
                    {x: width / 2 - outerL - 15, y: height / 2 + n * outerL + 27},
                    {x: width / 2 - outerL - 15, y: height / 2 + n * outerL + 33},
                    {x: width / 2 - outerL, y: height / 2 + n * outerL + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - outerL + thickness, y: height / 2 + n * outerL + 30},
                    {x: width / 2 - outerL + thickness + 15, y: height / 2 + n * outerL + 27},
                    {x: width / 2 - outerL + thickness + 15, y: height / 2 + n * outerL + 33},
                    {x: width / 2 - outerL + thickness, y: height / 2 + n * outerL + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - outerL - 15 - 40, y: height / 2 + n * outerL + 30},
                {x: width / 2 - outerL - 15, y: height / 2 + n * outerL + 30}
            ])).attr("id", "CACBSketchTHKJN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CACBSketchTHKJN").attr("startOffset", "50%").text(thkjn);

            // t
            drawCenterLine(width / 2 - outerL - 10, height / 2 + thickness / 2, width / 2 + 10, height / 2 + thickness / 2);
            drawCenterLine(width / 2 - outerL - 10, height / 2 - outerL + thickness / 2, width / 2 + 10, height / 2 - outerL + thickness / 2);
            dimLeftV(width / 2 - outerL - 10, height / 2 + thickness / 2, width / 2 - outerL - 10, height / 2 - outerL + thickness / 2, t, "CACBSketchT");

        }

        currentTabIndex = cacbd2d3.tabs('getTabIndex', cacbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            cacb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#cacb").length > 0) {
                    cacb2d();
                }
            });
        }
        cacbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    cacb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#cacb").length > 0) {
                            cacb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20569-2013 互搭式螺旋型钢夹套校核",
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
                    $(ed.target).combobox("loadData", CACBSCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", CACBSType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", CACBSSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CACBSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", CACBJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", CACBJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CACBJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CACBJName);
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
                    cacbd2.empty();

                    // model
                    cacbd3.empty();

                    // sketch
                    currentTabIndex = cacbd2d3.tabs('getTabIndex', cacbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        cacb2d();
                        cacbd2.off("resize").on("resize", function () {
                            if ($("#cacb").length > 0) {
                                cacb2d();
                            }
                        });
                    }
                    cacbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                cacb2d();
                                cacbd2.off("resize").on("resize", function () {
                                    if ($("#cacb").length > 0) {
                                        cacb2d();
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

                        CACBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        CACBSCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CACBSType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CACBSSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CACBSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        CACBJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CACBJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CACBJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CACBJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CACBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACBSCategory = [];
                                CACBJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CACBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CACBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CACBJCategory[index] = {
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

                        CACBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CACBSType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CACBSSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CACBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACBSCategoryVal,
                                temp: CACBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACBSType = [];
                                $(result).each(function (index, element) {
                                    CACBSType[index] = {
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

                        CACBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CACBSSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CACBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACBSCategoryVal,
                                type: CACBSTypeVal,
                                temp: CACBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACBSSTD = [];
                                $(result).each(function (index, element) {
                                    CACBSSTD[index] = {
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

                        CACBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CACBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACBSCategoryVal,
                                type: CACBSTypeVal,
                                std: CACBSSTDVal,
                                temp: CACBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACBSName = [];
                                $(result).each(function (index, element) {
                                    CACBSName[index] = {
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

                        CACBJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CACBJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CACBJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CACBJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACBJCategoryVal,
                                temp: CACBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACBJType = [];
                                $(result).each(function (index, element) {
                                    CACBJType[index] = {
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

                        CACBJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CACBJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CACBJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACBJCategoryVal,
                                type: CACBJTypeVal,
                                temp: CACBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACBJSTD = [];
                                $(result).each(function (index, element) {
                                    CACBJSTD[index] = {
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

                        CACBJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CACBJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACBJCategoryVal,
                                type: CACBJTypeVal,
                                std: CACBJSTDVal,
                                temp: CACBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACBJName = [];
                                $(result).each(function (index, element) {
                                    CACBJName[index] = {
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
                            let CACBTest = rows[1][columns[0][1].field];

                            // 筒体材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                let CACBSNameVal = rows[5][columns[0][1].field];

                                // AJAX 获取筒体材料密度、最大最小厚度
                                let CACBSDensity, CACBSThkMin, CACBSThkMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": CACBSCategoryVal,
                                        "type": CACBSTypeVal,
                                        "std": CACBSSTDVal,
                                        "name": CACBSNameVal,
                                        "temp": CACBDT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        CACBSDensity = parseFloat(result.density);
                                        CACBSThkMin = parseFloat(result.thkMin);
                                        CACBSThkMax = parseFloat(result.thkMax);

                                        // 筒体设计压力
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                            let CACBPSD = parseFloat(rows[6][columns[0][1].field]);

                                            // 筒体静压力
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                let CACBPSS = parseFloat(rows[7][columns[0][1].field]);

                                                // 筒体计算压力
                                                let CACBPSC = CACBPSD + CACBPSS;

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CACBDSI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        cacb2d("ϕ" + CACBDSI);
                                                        cacbd2.off("resize").on("resize", function () {
                                                            if ($("#cacb").length > 0) {
                                                                cacb2d("ϕ" + CACBDSI);
                                                            }
                                                        });
                                                    }
                                                    cacbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                cacb2d("ϕ" + CACBDSI);
                                                                cacbd2.off("resize").on("resize", function () {
                                                                    if ($("#cacb").length > 0) {
                                                                        cacb2d("ϕ" + CACBDSI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CACBSThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CACBSThkMax) {
                                                        let CACBTHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            cacb2d("ϕ" + CACBDSI, CACBTHKSN);
                                                            cacbd2.off("resize").on("resize", function () {
                                                                if ($("#cacb").length > 0) {
                                                                    cacb2d("ϕ" + CACBDSI, CACBTHKSN);
                                                                }
                                                            });
                                                        }
                                                        cacbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    cacb2d("ϕ" + CACBDSI, CACBTHKSN);
                                                                    cacbd2.off("resize").on("resize", function () {
                                                                        if ($("#cacb").length > 0) {
                                                                            cacb2d("ϕ" + CACBDSI, CACBTHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // 筒体外直径
                                                        let CACBDSO = CACBDSI + 2 * CACBTHKSN;

                                                        // 筒体材料物性
                                                        let CACBSOT, CACBSO, CACBSOT1, CACBSREL, CACBCS1, CACBEST;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CACBSCategoryVal,
                                                                "type": CACBSTypeVal,
                                                                "std": CACBSSTDVal,
                                                                "name": CACBSNameVal,
                                                                "thk": CACBTHKSN,
                                                                "temp": CACBDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CACBDSO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CACBSOT = parseFloat(result.ot);
                                                                if (CACBSOT < 0) {
                                                                    south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACBSO = parseFloat(result.o);
                                                                if (CACBSO < 0) {
                                                                    south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACBSREL = parseFloat(result.rel);
                                                                if (CACBSREL < 0) {
                                                                    south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACBCS1 = parseFloat(result.c1);
                                                                if (CACBCS1 < 0) {
                                                                    south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACBEST = 1000 * parseFloat(result.et);
                                                                if (CACBEST < 0) {
                                                                    south.html("查询筒体材料弹性模量失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACBSOT1 = parseFloat(result.ot1);

                                                                // 焊接接头系数
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                                    let CACBES = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体腐蚀裕量
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                        && parseFloat(rows[11][columns[0][1].field]) < CACBTHKSN) {
                                                                        let CACBCS2 = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量
                                                                        let CACBCS = CACBCS1 + CACBCS2;

                                                                        // 筒体有效厚度
                                                                        let CACBTHKSE = CACBTHKSN - CACBCS;

                                                                        // 夹套材料名称
                                                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                            let CACBJNameVal = rows[15][columns[0][1].field];

                                                                            // AJAX 获取夹套材料密度、最大最小厚度
                                                                            let CACBJDensity, CACBJThkMin, CACBJThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_gbt_150_2011_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": CACBJCategoryVal,
                                                                                    "type": CACBJTypeVal,
                                                                                    "std": CACBJSTDVal,
                                                                                    "name": CACBJNameVal,
                                                                                    "temp": CACBDT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    CACBJDensity = parseFloat(result.density);
                                                                                    CACBJThkMin = parseFloat(result.thkMin);
                                                                                    CACBJThkMax = parseFloat(result.thkMax);

                                                                                    // 夹套设计压力
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                        let CACBPJD = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // 夹套静压力
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                            let CACBPJS = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // 夹套计算压力
                                                                                            let CACBPJC = CACBPJD + CACBPJS;

                                                                                            // 尺寸j
                                                                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                                                let CACBJ = parseFloat(rows[18][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ);
                                                                                                    cacbd2.off("resize").on("resize", function () {
                                                                                                        if ($("#cacb").length > 0) {
                                                                                                            cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                cacbd2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ);
                                                                                                            cacbd2.off("resize").on("resize", function () {
                                                                                                                if ($("#cacb").length > 0) {
                                                                                                                    cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                // 尺寸T
                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                                                                    let CACBT = parseFloat(rows[19][columns[0][1].field]);

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ, CACBT);
                                                                                                        cacbd2.off("resize").on("resize", function () {
                                                                                                            if ($("#cacb").length > 0) {
                                                                                                                cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ, CACBT);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    cacbd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ, CACBT);
                                                                                                                cacbd2.off("resize").on("resize", function () {
                                                                                                                    if ($("#cacb").length > 0) {
                                                                                                                        cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ, CACBT);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // 夹套名义厚度
                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) > CACBJThkMin
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) < Math.min(CACBJ, CACBT)) {
                                                                                                        let CACBTHKJN = parseFloat(rows[20][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ, CACBT, CACBTHKJN);
                                                                                                            cacbd2.off("resize").on("resize", function () {
                                                                                                                if ($("#cacb").length > 0) {
                                                                                                                    cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ, CACBT, CACBTHKJN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        cacbd2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ, CACBT, CACBTHKJN);
                                                                                                                    cacbd2.off("resize").on("resize", function () {
                                                                                                                        if ($("#cacb").length > 0) {
                                                                                                                            cacb2d("ϕ" + CACBDSI, CACBTHKSN, CACBJ, CACBT, CACBTHKJN);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        // 夹套外直径
                                                                                                        let CACBDJO = CACBDSO + 2 * CACBJ;

                                                                                                        // 夹套内直径
                                                                                                        let CACBDJI = CACBDJO - 2 * CACBTHKJN;

                                                                                                        // 夹套材料物性
                                                                                                        let CACBJOT,
                                                                                                            CACBJO,
                                                                                                            CACBJOT1,
                                                                                                            CACBJREL,
                                                                                                            CACBCJ1,
                                                                                                            CACBEJT;
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                "category": CACBJCategoryVal,
                                                                                                                "type": CACBJTypeVal,
                                                                                                                "std": CACBJSTDVal,
                                                                                                                "name": CACBJNameVal,
                                                                                                                "thk": CACBTHKJN,
                                                                                                                "temp": CACBDT,
                                                                                                                "highLow": 3,
                                                                                                                "isTube": 0,
                                                                                                                "od": CACBDJO
                                                                                                            }),
                                                                                                            beforeSend: function () {
                                                                                                            },
                                                                                                            success: function (result) {

                                                                                                                CACBJOT = parseFloat(result.ot);
                                                                                                                if (CACBJOT < 0) {
                                                                                                                    south.html("查询夹套材料设计温度许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACBJO = parseFloat(result.o);
                                                                                                                if (CACBJO < 0) {
                                                                                                                    south.html("查询夹套材料常温许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACBJREL = parseFloat(result.rel);
                                                                                                                if (CACBJREL < 0) {
                                                                                                                    south.html("查询夹套材料常温屈服强度失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACBCJ1 = parseFloat(result.c1);
                                                                                                                if (CACBCJ1 < 0) {
                                                                                                                    south.html("查询夹套材料厚度负偏差失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACBEJT = 1000 * parseFloat(result.et);
                                                                                                                if (CACBEJT < 0) {
                                                                                                                    south.html("查询夹套材料弹性模量失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACBJOT1 = parseFloat(result.ot1);

                                                                                                                // 夹套腐蚀裕量
                                                                                                                if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) < CACBTHKJN) {
                                                                                                                    let CACBCJ2 = parseFloat(rows[21][columns[0][1].field]);

                                                                                                                    // 夹套厚度附加量
                                                                                                                    let CACBCJ = CACBCJ1 + CACBCJ2;

                                                                                                                    // 夹套有效厚度
                                                                                                                    let CACBTHKJE = CACBTHKJN - CACBCJ;

                                                                                                                    // 筒体计算厚度1
                                                                                                                    let CACBTHKSC1 = CACBT * Math.sqrt(Math.max(CACBPSC, CACBPJC) / (2 * CACBSOT * CACBES)) + (CACBDSI * CACBPSC) / (8 * CACBSOT * CACBES);

                                                                                                                    // 筒体计算厚度2
                                                                                                                    let CACBTHKSC2 = (CACBDSI * CACBPSC) / (2 * CACBSOT * CACBES - CACBPSC);

                                                                                                                    // 容器筒体厚度
                                                                                                                    let CACBTHKSC = Math.max(CACBTHKSC1, CACBTHKSC2);
                                                                                                                    let CACBTHKSD = CACBTHKSC + CACBCS2;

                                                                                                                    // 所需厚度提示信息
                                                                                                                    south.html(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "容器筒体所需厚度：" + (CACBTHKSD + CACBCS1).toFixed(2) + " mm" +
                                                                                                                        "</span>");

                                                                                                                    // 容器筒体厚度校核
                                                                                                                    let CACBTHKSCHK;
                                                                                                                    if (CACBTHKSN >= (CACBTHKSD + CACBCS1).toFixed(2)) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CACBTHKSN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CACBTHKSCHK = "合格";
                                                                                                                    } else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CACBTHKSN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CACBTHKSCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 夹套计算厚度1\2\3
                                                                                                                    let CACBTHKJC1 = CACBJ * Math.sqrt(CACBPJC / (2 * CACBSOT * CACBES));
                                                                                                                    let CACBTHKJC2 = CACBT * Math.sqrt(CACBPJC / (2 * CACBSOT * CACBES));
                                                                                                                    let CACBTHKJC3 = CACBPJC * CACBDJI / (2 * CACBSOT * CACBES);
                                                                                                                    let CACBTHKJC = Math.max(CACBTHKJC1, CACBTHKJC2, CACBTHKJC3);
                                                                                                                    let CACBTHKJD = CACBTHKJC + CACBCJ2;

                                                                                                                    // 所需厚度提示信息
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套所需厚度：" + (CACBTHKJD + CACBCJ1).toFixed(2) + " mm" +
                                                                                                                        "</span>");

                                                                                                                    // 夹套厚度校核
                                                                                                                    let CACBTHKJCHK;
                                                                                                                    if (CACBTHKJN >= (CACBTHKJD + CACBCJ1).toFixed(2)) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CACBTHKJN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CACBTHKJCHK = "合格";
                                                                                                                    } else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CACBTHKJN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CACBTHKJCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 试验压力
                                                                                                                    let CACBPJT;
                                                                                                                    if (CACBTest === "液压试验") {
                                                                                                                        CACBPJT = 1.25 * CACBPJD * Math.min(CACBSO / Math.max(CACBSOT, CACBSOT1), CACBJO / Math.max(CACBJOT, CACBJOT1));
                                                                                                                    }
                                                                                                                    else if (CACBTest === "气压试验") {
                                                                                                                        CACBPJT = 1.10 * CACBPJD * Math.min(CACBSO / Math.max(CACBSOT, CACBSOT1), CACBJO / Math.max(CACBJOT, CACBJOT1));
                                                                                                                    }
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套试验压力：" + CACBPJT.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // docx
                                                                                                                    let CACBPayJS = $('#payjs');

                                                                                                                    function getDocx() {
                                                                                                                        $.ajax({
                                                                                                                            type: "POST",
                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                            url: "cacbdocx.action",
                                                                                                                            async: true,
                                                                                                                            dataType: "json",
                                                                                                                            data: JSON.stringify({
                                                                                                                                ribbonName: "CACB",

                                                                                                                                dt: CACBDT,
                                                                                                                                test: CACBTest,
                                                                                                                                sstd: CACBSSTDVal,
                                                                                                                                sname: CACBSNameVal,
                                                                                                                                psd: CACBPSD,
                                                                                                                                pss: CACBPSS,
                                                                                                                                dsi: CACBDSI,
                                                                                                                                thksn: CACBTHKSN,
                                                                                                                                es: CACBES,
                                                                                                                                cs2: CACBCS2,
                                                                                                                                jstd: CACBJSTDVal,
                                                                                                                                jname: CACBJNameVal,
                                                                                                                                pjd: CACBPJD,
                                                                                                                                pjs: CACBPJS,
                                                                                                                                j: CACBJ,
                                                                                                                                t: CACBT,
                                                                                                                                thkjn: CACBTHKJN,
                                                                                                                                cj2: CACBCJ2,
                                                                                                                                densitys: CACBSDensity.toFixed(4),
                                                                                                                                densityj: CACBJDensity.toFixed(4),
                                                                                                                                ost: CACBSOT.toFixed(4),
                                                                                                                                ojt: CACBJOT.toFixed(4),
                                                                                                                                os: CACBSO.toFixed(4),
                                                                                                                                oj: CACBJO.toFixed(4),
                                                                                                                                ost1: CACBSOT1.toFixed(4),
                                                                                                                                ojt1: CACBJOT1.toFixed(4),
                                                                                                                                rsel: CACBSREL.toFixed(4),
                                                                                                                                rjel: CACBJREL.toFixed(4),
                                                                                                                                est: (CACBEST / 1000).toFixed(4),
                                                                                                                                ejt: (CACBEJT / 1000).toFixed(4),
                                                                                                                                cs1: CACBCS1.toFixed(4),
                                                                                                                                cj1: CACBCJ1.toFixed(4),
                                                                                                                                cs: CACBCS.toFixed(4),
                                                                                                                                thkse: CACBTHKSE.toFixed(4),
                                                                                                                                psc: CACBPSC.toFixed(4),
                                                                                                                                cj: CACBCJ.toFixed(4),
                                                                                                                                thkje: CACBTHKJE.toFixed(4),
                                                                                                                                pjc: CACBPJC.toFixed(4),
                                                                                                                                dji: CACBDJI.toFixed(4),
                                                                                                                                thksc1: CACBTHKSC1.toFixed(4),
                                                                                                                                thksc2: CACBTHKSC2.toFixed(4),
                                                                                                                                thksd: CACBTHKSD.toFixed(4),
                                                                                                                                thkschk: CACBTHKSCHK,
                                                                                                                                thkjc1: CACBTHKJC1.toFixed(4),
                                                                                                                                thkjc2: CACBTHKJC2.toFixed(4),
                                                                                                                                thkjc3: CACBTHKJC3.toFixed(4),
                                                                                                                                thkjc: CACBTHKJC.toFixed(4),
                                                                                                                                thkjd: CACBTHKJD.toFixed(4),
                                                                                                                                thkjchk: CACBTHKJCHK,
                                                                                                                                pjt: CACBPJT.toFixed(4)
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
                                                                                                                                    CACBPayJS.dialog({
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
                                                                                                                                                CACBPayJS.dialog("close");
                                                                                                                                                CACBPayJS.dialog("clear");
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
                                                                                                                                                            CACBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                    CACBPayJS.dialog('close');
                                                                                                                                                                    CACBPayJS.dialog('clear');
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
                                                                                                                else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) >= CACBTHKJN) {
                                                                                                                    south.html("夹套腐蚀裕量不能大于等于 " + CACBTHKJN + " mm").css("color", "red");
                                                                                                                }
                                                                                                            },
                                                                                                            error: function () {
                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                            }
                                                                                                        });

                                                                                                    }

                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) <= CACBJThkMin) {
                                                                                                        south.html("夹套名义厚度不能小于等于 " + CACBJThkMin + " mm").css("color", "red");
                                                                                                    }

                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) >= Math.min(CACBJ, CACBT)) {
                                                                                                        south.html("夹套名义厚度不能大于等于 " + Math.min(CACBJ, CACBT).toFixed(4) + " mm").css("color", "red");
                                                                                                    }

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

                                                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                        && parseFloat(rows[11][columns[0][1].field]) >= CACBTHKSN) {
                                                                        south.html("筒体腐蚀裕量不能大于等于 " + CACBTHKSN + " mm").css("color", "red");
                                                                    }

                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CACBSThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + CACBSThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CACBSThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + CACBSThkMax + " mm").css("color", "red");
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