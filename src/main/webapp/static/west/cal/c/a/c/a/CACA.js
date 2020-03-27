$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cacad2 = $("#d2");
    let cacad3 = $("#d3");
    let cacad2d3 = $('#d2d3');

    $("#cal").html("<table id='caca'></table>");
    let pg = $("#caca");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/c/a/CACA.json", function (result) {

        let CACADT;
        let CACASCategory, CACASCategoryVal, CACASType, CACASTypeVal, CACASSTD, CACASSTDVal, CACASName,
            CACAJCategory, CACAJCategoryVal, CACAJType, CACAJTypeVal, CACAJSTD, CACAJSTDVal, CACAJName;
        let columns, rows, ed;

        // 2D Sketch
        function caca2d(dsi = "ϕDsi", thksn = "δsn", j = "j", t = "t", thkjn = "δjn") {

            cacad2.empty();

            let width = cacad2.width();
            let height = cacad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CACASVG")
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
            let padding = 40;
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

            // 筒体内外壁
            drawLine(width / 2, padding, width / 2, height - padding);
            drawLine(width / 2 + thickness, padding, width / 2 + thickness, height - padding);

            let innerL = 40;
            let outerL = innerL + thickness;

            // 0 型钢内壁
            let cx0 = width / 2, cy0 = height / 2;
            drawLine(cx0 - innerL, cy0, cx0, cy0 - innerL);
            drawLine(cx0 - innerL, cy0, cx0, cy0 + innerL);
            // 0 型钢外壁
            drawLine(cx0 - outerL, cy0, cx0, cy0 - outerL);
            drawLine(cx0 - outerL, cy0, cx0, cy0 + outerL);
            // 焊缝线
            drawLine(cx0, cy0 - innerL, cx0 - 0.5 * thickness, cy0 - innerL - 0.5 * thickness);
            drawLine(cx0, cy0 + innerL, cx0 - 0.5 * thickness, cy0 + innerL + 0.5 * thickness);
            //中心线
            drawCenterLine(cx0 - outerL - 10, cy0, cx0 + thickness + 10, cy0);

            // 1 型钢内壁
            let cx1 = width / 2, cy1 = cy0 - 120;
            drawLine(cx1 - innerL, cy1, cx1, cy1 - innerL);
            drawLine(cx1 - innerL, cy1, cx1, cy1 + innerL);
            // 1 型钢外壁
            drawLine(cx1 - outerL, cy1, cx1, cy1 - outerL);
            drawLine(cx1 - outerL, cy1, cx1, cy1 + outerL);
            // 焊缝线
            drawLine(cx1, cy1 - innerL, cx1 - 0.5 * thickness, cy1 - innerL - 0.5 * thickness);
            drawLine(cx1, cy1 + innerL, cx1 - 0.5 * thickness, cy1 + innerL + 0.5 * thickness);
            //中心线
            drawCenterLine(cx1 - outerL - 10, cy1, cx1 + thickness + 10, cy1);

            // 2 型钢内壁
            let cx2 = width / 2, cy2 = cy0 + 120;
            drawLine(cx2 - innerL, cy2, cx2, cy2 - innerL);
            drawLine(cx2 - innerL, cy2, cx2, cy2 + innerL);
            // 2 型钢外壁
            drawLine(cx2 - outerL, cy2, cx2, cy2 - outerL);
            drawLine(cx2 - outerL, cy2, cx2, cy2 + outerL);
            // 焊缝线
            drawLine(cx2, cy2 - innerL, cx2 - 0.5 * thickness, cy2 - innerL - 0.5 * thickness);
            drawLine(cx2, cy2 + innerL, cx2 - 0.5 * thickness, cy2 + innerL + 0.5 * thickness);
            //中心线
            drawCenterLine(cx2 - outerL - 10, cy2, cx2 + thickness + 10, cy2);

            // DSI
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + thickness, y: (cy0 + cy1) / 2},
                    {x: cx0 + thickness + 15, y: (cy0 + cy1) / 2 - 3},
                    {x: cx0 + thickness + 15, y: (cy0 + cy1) / 2 + 3},
                    {x: cx0 + thickness, y: (cy0 + cy1) / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: cx0 + thickness + 15, y: (cy0 + cy1) / 2},
                {x: cx0 + thickness + 15 + 60, y: (cy0 + cy1) / 2}
            ])).attr("id", "CACASketchDSI").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CACASketchDSI").attr("startOffset", "50%").text(dsi);

            // 内筒体厚度
            drawLine(cx0, (cy0 + cy1) / 2, cx0 + thickness, (cy0 + cy1) / 2);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0, y: (cy0 + cy1) / 2},
                    {x: cx0 - 15, y: (cy0 + cy1) / 2 - 3},
                    {x: cx0 - 15, y: (cy0 + cy1) / 2 + 3},
                    {x: cx0, y: (cy0 + cy1) / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: cx0 - 15 - 40, y: (cy0 + cy1) / 2},
                {x: cx0 - 15, y: (cy0 + cy1) / 2}
            ])).attr("id", "CACASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#CACASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // J
            let centerx0 = cx0 - outerL - 3, centery0 = cy1;
            svg.append("path").attr("d", line([
                {x: cx1 - outerL, y: cy1 - 3},
                {x: cx1 - outerL, y: cy1 - 40}
            ])).classed("sketch", true)
                .attr("transform", "rotate(" + -45 + ", " + centerx0 + " " + centery0 + ")");
            svg.append("path").attr("d", line([
                {x: cx1 + 0.414 * outerL - 8, y: cy1 - 3},
                {x: cx1 + 0.414 * outerL - 8, y: cy1 - 40}
            ])).classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + centerx0 + " " + centery0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 - outerL, y: cy1 + 3 - 30},
                    {x: cx1 - outerL + 15, y: cy1 + 3 - 27},
                    {x: cx1 - outerL + 15, y: cy1 + 3 - 33},
                    {x: cx1 - outerL, y: cy1 + 3 - 30}
                ])).attr("transform", "rotate(" + -45 + ", " + centerx0 + " " + centery0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + 0.414 * outerL - 8, y: cy1 + 3 - 30},
                    {x: cx1 + 0.414 * outerL - 8 - 15, y: cy1 + 3 - 27},
                    {x: cx1 + 0.414 * outerL - 8 - 15, y: cy1 + 3 - 33},
                    {x: cx1 + 0.414 * outerL - 8, y: cy1 + 3 - 30}
                ])).attr("transform", "rotate(" + -45 + ", " + centerx0 + " " + centery0 + ")");
            svg.append("path").attr("d", line([
                {x: cx1 - outerL, y: cy1 + 3 - 30},
                {x: cx1 + 0.414 * outerL - 8, y: cy1 + 3 - 30}
            ])).attr("id", "CACASketchJ")
                .classed("sketch", true).attr("transform", "rotate(" + -45 + ", " + centerx0 + " " + centery0 + ")");
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CACASketchJ")
                .attr("startOffset", "50%").text(j).attr("transform", "rotate(" + -45 + ", " + centerx0 + " " + centery0 + ")");

            // t
            drawLine(cx2 - 0.5 * thickness - 43, cy2 + innerL + 0.5 * thickness, cx2 - 0.5 * thickness - 3, cy2 + innerL + 0.5 * thickness);
            drawLine(cx2 - 0.5 * thickness - 43, cy2 - innerL - 0.5 * thickness, cx2 - 0.5 * thickness - 3, cy2 - innerL - 0.5 * thickness);
            dimLeftV(cx2 - 0.5 * thickness - 40, cy2 + innerL + 0.5 * thickness, cx2 - 0.5 * thickness - 40, cy2 - innerL - 0.5 * thickness, t, "CACASketchT");

            // thkjn
            let centerx1 = cx0, centery1 = cy0;
            svg.append("path").attr("d", line([
                {x: centerx1, y: centery1},
                {x: centerx1 + 0.707 * innerL + 0.707 * thickness, y: centery1}
            ])).classed("sketch", true)
                .attr("transform", "rotate(" + 135 + ", " + centerx1 + " " + centery1 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerx1 + 0.707 * innerL, y: centery1},
                    {x: centerx1 + 0.707 * innerL - 15, y: centery1 + 3},
                    {x: centerx1 + 0.707 * innerL - 15, y: centery1 - 3},
                    {x: centerx1 + 0.707 * innerL, y: centery1}
                ])).attr("transform", "rotate(" + 135 + ", " + centerx1 + " " + centery1 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerx1 + 0.707 * outerL, y: centery1},
                    {x: centerx1 + 0.707 * outerL + 15, y: centery1 + 3},
                    {x: centerx1 + 0.707 * outerL + 15, y: centery1 - 3},
                    {x: centerx1 + 0.707 * outerL, y: centery1}
                ])).attr("transform", "rotate(" + 135 + ", " + centerx1 + " " + centery1 + ")");
            svg.append("path").attr("d", line([
                {x: centerx1 + 0.707 * outerL + 15 + 40, y: centery1},
                {x: centerx1 + 0.707 * outerL + 15, y: centery1}
            ])).attr("id", "CACASketchTHKJN")
                .classed("sketch", true)
                .attr("transform", "rotate(" + 135 + ", " + centerx1 + " " + centery1 + ")");
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CACASketchTHKJN")
                .attr("startOffset", "50%").text(thkjn)
                .attr("transform", "rotate(" + 135 + ", " + centerx1 + " " + centery1 + ")");

        }

        currentTabIndex = cacad2d3.tabs('getTabIndex', cacad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            caca2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#caca").length > 0) {
                    caca2d();
                }
            });
        }
        cacad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    caca2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#caca").length > 0) {
                            caca2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20569-2013 分隔式螺旋型钢夹套校核",
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
                    $(ed.target).combobox("loadData", CACASCategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", CACASType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", CACASSTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CACASName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", CACAJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", CACAJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CACAJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CACAJName);
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
                    cacad2.empty();

                    // model
                    cacad3.empty();

                    // sketch
                    currentTabIndex = cacad2d3.tabs('getTabIndex', cacad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        caca2d();
                        cacad2.off("resize").on("resize", function () {
                            if ($("#caca").length > 0) {
                                caca2d();
                            }
                        });
                    }
                    cacad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                caca2d();
                                cacad2.off("resize").on("resize", function () {
                                    if ($("#caca").length > 0) {
                                        caca2d();
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

                        CACADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        CACASCategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CACASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CACASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CACASName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        CACAJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CACAJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CACAJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CACAJName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CACADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACASCategory = [];
                                CACAJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CACADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CACASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CACAJCategory[index] = {
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

                        CACASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        CACASType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CACASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CACASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACASCategoryVal,
                                temp: CACADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACASType = [];
                                $(result).each(function (index, element) {
                                    CACASType[index] = {
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

                        CACASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CACASSTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CACASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACASCategoryVal,
                                type: CACASTypeVal,
                                temp: CACADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACASSTD = [];
                                $(result).each(function (index, element) {
                                    CACASSTD[index] = {
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

                        CACASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CACASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACASCategoryVal,
                                type: CACASTypeVal,
                                std: CACASSTDVal,
                                temp: CACADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACASName = [];
                                $(result).each(function (index, element) {
                                    CACASName[index] = {
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

                        CACAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        CACAJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CACAJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CACAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACAJCategoryVal,
                                temp: CACADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACAJType = [];
                                $(result).each(function (index, element) {
                                    CACAJType[index] = {
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

                        CACAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CACAJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CACAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACAJCategoryVal,
                                type: CACAJTypeVal,
                                temp: CACADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACAJSTD = [];
                                $(result).each(function (index, element) {
                                    CACAJSTD[index] = {
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

                        CACAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CACAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CACAJCategoryVal,
                                type: CACAJTypeVal,
                                std: CACAJSTDVal,
                                temp: CACADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CACAJName = [];
                                $(result).each(function (index, element) {
                                    CACAJName[index] = {
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
                            let CACATest = rows[1][columns[0][1].field];

                            // 筒体材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                let CACASNameVal = rows[5][columns[0][1].field];

                                // AJAX 获取筒体材料密度、最大最小厚度
                                let CACASDensity, CACASThkMin, CACASThkMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": CACASCategoryVal,
                                        "type": CACASTypeVal,
                                        "std": CACASSTDVal,
                                        "name": CACASNameVal,
                                        "temp": CACADT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {
                                        CACASDensity = parseFloat(result.density);
                                        CACASThkMin = parseFloat(result.thkMin);
                                        CACASThkMax = parseFloat(result.thkMax);

                                        // 筒体设计压力
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                            let CACAPSD = parseFloat(rows[6][columns[0][1].field]);

                                            // 筒体静压力
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                let CACAPSS = parseFloat(rows[7][columns[0][1].field]);

                                                // 筒体计算压力
                                                let CACAPSC = CACAPSD + CACAPSS;

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CACADSI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        caca2d("ϕ" + CACADSI);
                                                        cacad2.off("resize").on("resize", function () {
                                                            if ($("#caca").length > 0) {
                                                                caca2d("ϕ" + CACADSI);
                                                            }
                                                        });
                                                    }
                                                    cacad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                caca2d("ϕ" + CACADSI);
                                                                cacad2.off("resize").on("resize", function () {
                                                                    if ($("#caca").length > 0) {
                                                                        caca2d("ϕ" + CACADSI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CACASThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CACASThkMax) {
                                                        let CACATHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            caca2d("ϕ" + CACADSI, CACATHKSN);
                                                            cacad2.off("resize").on("resize", function () {
                                                                if ($("#caca").length > 0) {
                                                                    caca2d("ϕ" + CACADSI, CACATHKSN);
                                                                }
                                                            });
                                                        }
                                                        cacad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    caca2d("ϕ" + CACADSI, CACATHKSN);
                                                                    cacad2.off("resize").on("resize", function () {
                                                                        if ($("#caca").length > 0) {
                                                                            caca2d("ϕ" + CACADSI, CACATHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // 筒体外直径
                                                        let CACADSO = CACADSI + 2 * CACATHKSN;

                                                        // 筒体材料物性
                                                        let CACASOT, CACASO, CACASOT1, CACASREL, CACACS1, CACAEST;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CACASCategoryVal,
                                                                "type": CACASTypeVal,
                                                                "std": CACASSTDVal,
                                                                "name": CACASNameVal,
                                                                "thk": CACATHKSN,
                                                                "temp": CACADT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CACADSO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CACASOT = parseFloat(result.ot);
                                                                if (CACASOT < 0) {
                                                                    south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACASO = parseFloat(result.o);
                                                                if (CACASO < 0) {
                                                                    south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACASREL = parseFloat(result.rel);
                                                                if (CACASREL < 0) {
                                                                    south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACACS1 = parseFloat(result.c1);
                                                                if (CACACS1 < 0) {
                                                                    south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACAEST = 1000 * parseFloat(result.et);
                                                                if (CACAEST < 0) {
                                                                    south.html("查询筒体材料弹性模量失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                CACASOT1 = parseFloat(result.ot1);

                                                                // 焊接接头系数
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                                    let CACAES = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体腐蚀裕量
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                        && parseFloat(rows[11][columns[0][1].field]) < CACATHKSN) {
                                                                        let CACACS2 = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量
                                                                        let CACACS = CACACS1 + CACACS2;

                                                                        // 筒体有效厚度
                                                                        let CACATHKSE = CACATHKSN - CACACS;

                                                                        // 夹套材料名称
                                                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                                            let CACAJNameVal = rows[15][columns[0][1].field];

                                                                            // AJAX 获取夹套材料密度、最大最小厚度
                                                                            let CACAJDensity, CACAJThkMin, CACAJThkMax;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_gbt_150_2011_index.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": CACAJCategoryVal,
                                                                                    "type": CACAJTypeVal,
                                                                                    "std": CACAJSTDVal,
                                                                                    "name": CACAJNameVal,
                                                                                    "temp": CACADT
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    CACAJDensity = parseFloat(result.density);
                                                                                    CACAJThkMin = parseFloat(result.thkMin);
                                                                                    CACAJThkMax = parseFloat(result.thkMax);

                                                                                    // 夹套设计压力
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                        let CACAPJD = parseFloat(rows[16][columns[0][1].field]);

                                                                                        // 夹套静压力
                                                                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                            let CACAPJS = parseFloat(rows[17][columns[0][1].field]);

                                                                                            // 夹套计算压力
                                                                                            let CACAPJC = CACAPJD + CACAPJS;

                                                                                            // 尺寸j
                                                                                            if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                                                                let CACAJ = parseFloat(rows[18][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ);
                                                                                                    cacad2.off("resize").on("resize", function () {
                                                                                                        if ($("#caca").length > 0) {
                                                                                                            caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                cacad2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ);
                                                                                                            cacad2.off("resize").on("resize", function () {
                                                                                                                if ($("#caca").length > 0) {
                                                                                                                    caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                // 尺寸T
                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                    && parseFloat(rows[19][columns[0][1].field]) > CACAJ) {
                                                                                                    let CACAT = parseFloat(rows[19][columns[0][1].field]);

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ, CACAT);
                                                                                                        cacad2.off("resize").on("resize", function () {
                                                                                                            if ($("#caca").length > 0) {
                                                                                                                caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ, CACAT);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    cacad2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ, CACAT);
                                                                                                                cacad2.off("resize").on("resize", function () {
                                                                                                                    if ($("#caca").length > 0) {
                                                                                                                        caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ, CACAT);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // 三角形限制的最大厚度
                                                                                                    let CACALargeTHKJN = 0.707 * CACAJ;

                                                                                                    // 夹套名义厚度
                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) > CACAJThkMin
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) <= Math.min(CACAJThkMax, CACALargeTHKJN)) {
                                                                                                        let CACATHKJN = parseFloat(rows[20][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ, CACAT, CACATHKJN);
                                                                                                            cacad2.off("resize").on("resize", function () {
                                                                                                                if ($("#caca").length > 0) {
                                                                                                                    caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ, CACAT, CACATHKJN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        cacad2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ, CACAT, CACATHKJN);
                                                                                                                    cacad2.off("resize").on("resize", function () {
                                                                                                                        if ($("#caca").length > 0) {
                                                                                                                            caca2d("ϕ" + CACADSI, CACATHKSN, CACAJ, CACAT, CACATHKJN);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        // 夹套外直径
                                                                                                        let CACADJO = CACAJ;

                                                                                                        // 夹套材料物性
                                                                                                        let CACAJOT,
                                                                                                            CACAJO,
                                                                                                            CACAJOT1,
                                                                                                            CACAJREL,
                                                                                                            CACACJ1,
                                                                                                            CACAEJT;
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "web_get_gbt_150_2011_e_com_property.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                "category": CACAJCategoryVal,
                                                                                                                "type": CACAJTypeVal,
                                                                                                                "std": CACAJSTDVal,
                                                                                                                "name": CACAJNameVal,
                                                                                                                "thk": CACATHKJN,
                                                                                                                "temp": CACADT,
                                                                                                                "highLow": 3,
                                                                                                                "isTube": 0,
                                                                                                                "od": CACADJO
                                                                                                            }),
                                                                                                            beforeSend: function () {
                                                                                                            },
                                                                                                            success: function (result) {

                                                                                                                CACAJOT = parseFloat(result.ot);
                                                                                                                if (CACAJOT < 0) {
                                                                                                                    south.html("查询夹套材料设计温度许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACAJO = parseFloat(result.o);
                                                                                                                if (CACAJO < 0) {
                                                                                                                    south.html("查询夹套材料常温许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACAJREL = parseFloat(result.rel);
                                                                                                                if (CACAJREL < 0) {
                                                                                                                    south.html("查询夹套材料常温屈服强度失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACACJ1 = parseFloat(result.c1);
                                                                                                                if (CACACJ1 < 0) {
                                                                                                                    south.html("查询夹套材料厚度负偏差失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACAEJT = 1000 * parseFloat(result.et);
                                                                                                                if (CACAEJT < 0) {
                                                                                                                    south.html("查询夹套材料弹性模量失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                CACAJOT1 = parseFloat(result.ot1);

                                                                                                                // 夹套腐蚀裕量
                                                                                                                if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) < CACATHKJN) {
                                                                                                                    let CACACJ2 = parseFloat(rows[21][columns[0][1].field]);

                                                                                                                    // 夹套厚度附加量
                                                                                                                    let CACACJ = CACACJ1 + CACACJ2;

                                                                                                                    // 夹套有效厚度
                                                                                                                    let CACATHKJE = CACATHKJN - CACACJ;

                                                                                                                    // 筒体计算厚度1
                                                                                                                    let CACATHKSC1 = CACAT * Math.sqrt(Math.max(CACAPSC, CACAPJC) / (2 * CACASOT * CACAES)) + (CACADSI * CACAPSC) / (8 * CACASOT * CACAES);

                                                                                                                    // 筒体计算厚度2
                                                                                                                    let CACATHKSC2 = (CACADSI * CACAPSC) / (2 * CACASOT * CACAES - CACAPSC);

                                                                                                                    // 容器筒体厚度
                                                                                                                    let CACATHKSC = Math.max(CACATHKSC1, CACATHKSC2);
                                                                                                                    let CACATHKSD = CACATHKSC + CACACS2;

                                                                                                                    // 所需厚度提示信息
                                                                                                                    south.html(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "容器筒体所需厚度：" + (CACATHKSD + CACACS1).toFixed(2) + " mm" +
                                                                                                                        "</span>");

                                                                                                                    // 容器筒体厚度校核
                                                                                                                    let CACATHKSCHK;
                                                                                                                    if (CACATHKSN >= (CACATHKSD + CACACS1).toFixed(2)) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CACATHKSN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CACATHKSCHK = "合格";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CACATHKSN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CACATHKSCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 夹套计算厚度
                                                                                                                    let CACATHKJC = CACAJ * Math.sqrt(CACAPJC / (2 * CACASOT * CACAES));
                                                                                                                    let CACATHKJD = CACATHKJC + CACACJ2;

                                                                                                                    // 所需厚度提示信息
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套所需厚度：" + (CACATHKJD + CACACJ1).toFixed(2) + " mm" +
                                                                                                                        "</span>");

                                                                                                                    // 容器筒体厚度校核
                                                                                                                    let CACATHKJCHK;
                                                                                                                    if (CACATHKJN >= (CACATHKJD + CACACJ1).toFixed(2)) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CACATHKJN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CACATHKJCHK = "合格";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "输入厚度：" + CACATHKJN + " mm" +
                                                                                                                            "</span>");
                                                                                                                        CACATHKJCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 试验压力
                                                                                                                    let CACAPJT;
                                                                                                                    if (CACATest === "液压试验") {
                                                                                                                        CACAPJT = 1.25 * CACAPJD * Math.min(CACASO / Math.max(CACASOT, CACASOT1), CACAJO / Math.max(CACAJOT, CACAJOT1));
                                                                                                                    }
                                                                                                                    else if (CACATest === "气压试验") {
                                                                                                                        CACAPJT = 1.10 * CACAPJD * Math.min(CACASO / Math.max(CACASOT, CACASOT1), CACAJO / Math.max(CACAJOT, CACAJOT1));
                                                                                                                    }
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套试验压力：" + CACAPJT.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // docx
                                                                                                                    let CACAPayJS = $('#payjs');

                                                                                                                    function getDocx() {
                                                                                                                        $.ajax({
                                                                                                                            type: "POST",
                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                            url: "cacadocx.action",
                                                                                                                            async: true,
                                                                                                                            dataType: "json",
                                                                                                                            data: JSON.stringify({
                                                                                                                                ribbonName: "CACA",

                                                                                                                                dt: CACADT,
                                                                                                                                test: CACATest,
                                                                                                                                sstd: CACASSTDVal,
                                                                                                                                sname: CACASNameVal,
                                                                                                                                psd: CACAPSD,
                                                                                                                                pss: CACAPSS,
                                                                                                                                dsi: CACADSI,
                                                                                                                                thksn: CACATHKSN,
                                                                                                                                es: CACAES,
                                                                                                                                cs2: CACACS2,
                                                                                                                                jstd: CACAJSTDVal,
                                                                                                                                jname: CACAJNameVal,
                                                                                                                                pjd: CACAPJD,
                                                                                                                                pjs: CACAPJS,
                                                                                                                                j: CACAJ,
                                                                                                                                t: CACAT,
                                                                                                                                thkjn: CACATHKJN,
                                                                                                                                cj2: CACACJ2,
                                                                                                                                densitys: CACASDensity.toFixed(4),
                                                                                                                                densityj: CACAJDensity.toFixed(4),
                                                                                                                                ost: CACASOT.toFixed(4),
                                                                                                                                ojt: CACAJOT.toFixed(4),
                                                                                                                                os: CACASO.toFixed(4),
                                                                                                                                oj: CACAJO.toFixed(4),
                                                                                                                                ost1: CACASOT1.toFixed(4),
                                                                                                                                ojt1: CACAJOT1.toFixed(4),
                                                                                                                                rsel: CACASREL.toFixed(4),
                                                                                                                                rjel: CACAJREL.toFixed(4),
                                                                                                                                est: (CACAEST / 1000).toFixed(4),
                                                                                                                                ejt: (CACAEJT / 1000).toFixed(4),
                                                                                                                                cs1: CACACS1.toFixed(4),
                                                                                                                                cj1: CACACJ1.toFixed(4),
                                                                                                                                cs: CACACS.toFixed(4),
                                                                                                                                thkse: CACATHKSE.toFixed(4),
                                                                                                                                psc: CACAPSC.toFixed(4),
                                                                                                                                cj: CACACJ.toFixed(4),
                                                                                                                                thkje: CACATHKJE.toFixed(4),
                                                                                                                                pjc: CACAPJC.toFixed(4),
                                                                                                                                thksc1: CACATHKSC1.toFixed(4),
                                                                                                                                thksc2: CACATHKSC2.toFixed(4),
                                                                                                                                thksd: CACATHKSD.toFixed(4),
                                                                                                                                thkschk: CACATHKSCHK,
                                                                                                                                thkjc: CACATHKJC.toFixed(4),
                                                                                                                                thkjd: CACATHKJD.toFixed(4),
                                                                                                                                thkjchk: CACATHKJCHK,
                                                                                                                                pjt: CACAPJT.toFixed(4)
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
                                                                                                                                    CACAPayJS.dialog({
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
                                                                                                                                                CACAPayJS.dialog("close");
                                                                                                                                                CACAPayJS.dialog("clear");
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
                                                                                                                                                            CACAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                    CACAPayJS.dialog('close');
                                                                                                                                                                    CACAPayJS.dialog('clear');
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
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) >= CACATHKJN) {
                                                                                                                    south.html("夹套腐蚀裕量不能大于等于 " + CACATHKJN + " mm").css("color", "red");
                                                                                                                }
                                                                                                            },
                                                                                                            error: function () {
                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) <= CACAJThkMin) {
                                                                                                        south.html("夹套名义厚度不能小于等于 " + CACAJThkMin + " mm").css("color", "red");
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                        && parseFloat(rows[20][columns[0][1].field]) > Math.min(CACAJThkMax, CACALargeTHKJN)) {
                                                                                                        south.html("夹套名义厚度不能大于 " + Math.min(CACAJThkMax, CACALargeTHKJN).toFixed(4) + " mm").css("color", "red");
                                                                                                    }
                                                                                                }
                                                                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                    && parseFloat(rows[19][columns[0][1].field]) <= CACAJ) {
                                                                                                    south.html("尺寸 t 不能小于等于 " + CACAJ + " mm").css("color", "red");
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
                                                                        && parseFloat(rows[11][columns[0][1].field]) >= CACATHKSN) {
                                                                        south.html("筒体腐蚀裕量不能大于等于 " + CACATHKSN + " mm").css("color", "red");
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
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CACASThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + CACASThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CACASThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + CACASThkMax + " mm").css("color", "red");
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