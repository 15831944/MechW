$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bchbSketch = $("#d2");
    let bchbModel = $("#d3");
    let bchbd2d3 = $('#d2d3');

    $("#cal").html("<table id='bchb'></table>");
    let pg = $("#bchb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/h/b/BCHB.json", function (result) {

        let BCHBDT,
            BCHBJCategory, BCHBJCategoryVal, BCHBJType, BCHBJTypeVal, BCHBJSTD, BCHBJSTDVal, BCHBJName, BCHBJNameVal,
            BCHBBCategory, BCHBBCategoryVal, BCHBBType, BCHBBTypeVal, BCHBBSTD, BCHBBSTDVal, BCHBBName, BCHBBNameVal,
            columns, rows, ed;

        function bchb2d(sdo = "do", thkjn = "δjn",
                        bdi = "Di", thkbn = "δbn",
                        l2 = "L2", h = "h", l1 = "L1") {

            bchbSketch.empty();

            let width = bchbSketch.width();
            let height = bchbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCHBSVG").attr("height", height);

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

            let thks = 20;
            let widthGap = (width - 2 * padding) / 8;
            let heightGap = (height - 2 * padding) / 8;

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

            // 管子
            let cx = width / 2;
            let cy = height / 2;
            let thkj = 10;
            let gapJ = 30;
            // 管子内壁
            let ri = Math.min(2 * widthGap, 2 * heightGap);
            let lengthI = Math.sqrt(ri * ri - gapJ * gapJ);
            drawArc(ri, ri, cx - gapJ, cy + lengthI, cx, cy - ri);
            drawArc(ri, ri, cx, cy - ri, cx + gapJ, cy + lengthI);
            // 管子外壁
            let ro = ri + thkj;
            let lengthO = Math.sqrt(ro * ro - (gapJ + thkj) * (gapJ + thkj));
            drawArc(ro, ro, cx - gapJ - thkj, cy + lengthO, cx, cy - ro);
            drawArc(ro, ro, cx, cy - ro, cx + gapJ + thkj, cy + lengthO);
            drawCenterLine(cx - ro - 20, cy, cx + ro + 20, cy);
            drawCenterLine(cx, cy - ro - 20, cx, cy + lengthI - 48);
            drawCenterLine(cx, cy + lengthI - 27, cx, cy + ro + 2 * thks + 10);

            drawLine(cx - gapJ, cy + lengthI, cx - gapJ, cy + ro + 2 * thks);
            drawLine(cx - gapJ, cy + ro + 2 * thks, cx - ro - thks, cy + ro + 2 * thks);
            drawLine(cx - ro - thks, cy + ro + 2 * thks, cx - ro - thks, cy + ro + thks);
            drawLine(cx - ro - thks, cy + ro + thks, cx - thkj - thks - gapJ, cy + ro + thks);
            drawLine(cx - thkj - thks - gapJ, cy + ro + thks, cx - gapJ - thkj, cy + lengthO);

            drawLine(cx + gapJ, cy + lengthI, cx + gapJ, cy + ro + 2 * thks);
            drawLine(cx + gapJ, cy + ro + 2 * thks, cx + ro + thks, cy + ro + 2 * thks);
            drawLine(cx + ro + thks, cy + ro + 2 * thks, cx + ro + thks, cy + ro + thks);
            drawLine(cx + ro + thks, cy + ro + thks, cx + thkj + thks + gapJ, cy + ro + thks);
            drawLine(cx + thkj + thks + gapJ, cy + ro + thks, cx + gapJ + thkj, cy + lengthO);

            // L2
            dimTopH(cx - gapJ, cy + lengthI, cx + gapJ, cy + lengthI, l2, "BCHBSketchL2");

            // L1
            dimBottomH(cx - ro - thks, cy + ro + 2 * thks, cx + ro + thks, cy + ro + 2 * thks, l1, "BCHBSketchL1");

            // bdi
            drawLine(cx - ro - thks - 3, cy + ro + 2 * thks, cx - ro - thks - 40, cy + ro + 2 * thks);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - ro - thks - 30, y: cy + ro + 2 * thks},
                    {x: cx - ro - thks - 30 + 3, y: cy + ro + 2 * thks + 15},
                    {x: cx - ro - thks - 30 - 3, y: cy + ro + 2 * thks + 15},
                    {x: cx - ro - thks - 30, y: cy + ro + 2 * thks}
                ]));
            svg.append("path").attr("d", line([
                {x: cx - ro - thks - 30, y: cy + ro + 2 * thks + 15 + 50},
                {x: cx - ro - thks - 30, y: cy + ro + 2 * thks + 15}
            ])).attr("id", "BCHBSketchBDI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHBSketchBDI")
                .attr("startOffset", "50%").text(bdi);

            // thkbn
            drawLine(cx - ro - thks - 3, cy + ro + thks, cx - ro - thks - 40, cy + ro + thks);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - ro - thks - 30, y: cy + ro + thks},
                    {x: cx - ro - thks - 30 + 3, y: cy + ro + thks - 15},
                    {x: cx - ro - thks - 30 - 3, y: cy + ro + thks - 15},
                    {x: cx - ro - thks - 30, y: cy + ro + thks}
                ]));
            drawLine(cx - ro - thks - 30, cy + ro + thks, cx - ro - thks - 30, cy + ro + 2 * thks + 15 + 10);

            svg.append("path").attr("d", line([
                {x: cx - ro - thks - 30, y: cy + ro + thks - 15},
                {x: cx - ro - thks - 30, y: cy + ro + thks - 15 - 50}
            ])).attr("id", "BCHBSketchTHKBN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHBSketchTHKBN")
                .attr("startOffset", "50%").text(thkbn);

            // h
            drawLine(cx + ro + thks + 3, cy + ro + thks, cx + ro + thks + 40, cy + ro + thks);
            drawLine(cx + gapJ + thkj + 3, cy + lengthO, cx + ro + thks + 40, cy + lengthO);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + ro + thks + 30, y: cy + ro + thks},
                    {x: cx + ro + thks + 30 + 3, y: cy + ro + thks + 15},
                    {x: cx + ro + thks + 30 - 3, y: cy + ro + thks + 15},
                    {x: cx + ro + thks + 30, y: cy + ro + thks}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + ro + thks + 30, y: cy + lengthO},
                    {x: cx + ro + thks + 30 + 3, y: cy + lengthO - 15},
                    {x: cx + ro + thks + 30 - 3, y: cy + lengthO - 15},
                    {x: cx + ro + thks + 30, y: cy + lengthO}
                ]));
            drawLine(cx + ro + thks + 30, cy + lengthO, cx + ro + thks + 30, cy + ro + 3 * thks);
            svg.append("path").attr("d", line([
                {x: cx + ro + thks + 30, y: cy + lengthO - 15},
                {x: cx + ro + thks + 30, y: cy + lengthO - 15 - 50}
            ])).attr("id", "BCHBSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHBSketchH")
                .attr("startOffset", "50%").text(h);

            // sdo
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + ro, y: cy},
                    {x: cx + ro + 15, y: cy - 3},
                    {x: cx + ro + 15, y: cy + 3},
                    {x: cx + ro, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + ro + 15, y: cy},
                    {x: cx + ro + 15 + 30, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + 0.707 * (ro + 15 + 30), y: cy - 0.707 * (ro + 15 + 30)},
                    {x: cx + 0.707 * (ro + 15 + 30) + 40, y: cy - 0.707 * (ro + 15 + 30)}
                ])).classed("sketch", true).attr("id", "BCHBSketchSDO");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHBSketchSDO")
                .attr("startOffset", "50%").text(sdo);

            // thkjn
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx - ro - 15 - 30, y: cy},
                    {x: cx - ro + thkj + 15 + 10, y: cy}
                ])).classed("sketch", true)
                .attr("transform", "rotate(" + 45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - ri, y: cy},
                    {x: cx - ri + 15, y: cy - 3},
                    {x: cx - ri + 15, y: cy + 3},
                    {x: cx - ri, y: cy}
                ])).attr("transform", "rotate(" + 45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - ro, y: cy},
                    {x: cx - ro - 15, y: cy - 3},
                    {x: cx - ro - 15, y: cy + 3},
                    {x: cx - ro, y: cy}
                ])).attr("transform", "rotate(" + 45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx - 0.707 * (ro + 15 + 30) - 40, y: cy - 0.707 * (ro + 15 + 30)},
                    {x: cx - 0.707 * (ro + 15 + 30), y: cy - 0.707 * (ro + 15 + 30)}
                ])).classed("sketch", true).attr("id", "BCHBSketchTHKJN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHBSketchTHKJN")
                .attr("startOffset", "50%").text(thkjn);

        }

        currentTabIndex = bchbd2d3.tabs('getTabIndex', bchbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bchb2d();
            bchbSketch.off("resize").on("resize", function () {
                if (pg.length > 0) {
                    bchb2d();
                }
            });
        }
        bchbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bchb2d();
                    bchbSketch.off("resize").on("resize", function () {
                        if (pg.length > 0) {
                            bchb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 与壳体对接的Ω膨胀节计算",
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

                if (index === 5) {
                    $(ed.target).combobox("loadData", BCHBJCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCHBJType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCHBJSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BCHBJName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCHBBCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCHBBType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCHBBSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCHBBName);
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

                    // sketch & model
                    bchbSketch.empty();
                    bchbModel.empty();

                    // sketch
                    currentTabIndex = bchbd2d3.tabs('getTabIndex', bchbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bchb2d();
                        bchbSketch.off("resize").on("resize", function () {
                            if (pg.length > 0) {
                                bchb2d();
                            }
                        });
                    }
                    bchbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bchb2d();
                                bchbSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        bchb2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // t - category
                    if (index === 1) {

                        BCHBDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCHBJCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCHBJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCHBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCHBJName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCHBBCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCHBBType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCHBBSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCHBBName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHBJCategory = [];
                                BCHBBCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCHBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        if (element === "碳素钢" || element === "低合金钢" || element === "高合金钢") {
                                            BCHBJCategory.push({
                                                "value": element,
                                                "text": element
                                            });
                                        }
                                        BCHBBCategory[index] = {
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
                    if (index === 5) {

                        BCHBJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCHBJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCHBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCHBJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHBJCategoryVal,
                                temp: BCHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHBJType = [];
                                $(result).each(function (index, element) {
                                    BCHBJType[index] = {
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
                    if (index === 6) {

                        BCHBJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCHBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCHBJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHBJCategoryVal,
                                type: BCHBJTypeVal,
                                temp: BCHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHBJSTD = [];
                                $(result).each(function (index, element) {
                                    BCHBJSTD[index] = {
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
                    if (index === 7) {

                        BCHBJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCHBJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHBJCategoryVal,
                                type: BCHBJTypeVal,
                                std: BCHBJSTDVal,
                                temp: BCHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHBJName = [];
                                $(result).each(function (index, element) {
                                    BCHBJName[index] = {
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
                    if (index === 12) {

                        BCHBBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCHBBType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCHBBSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCHBBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHBBCategoryVal,
                                temp: BCHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHBBType = [];
                                $(result).each(function (index, element) {
                                    BCHBBType[index] = {
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
                    if (index === 13) {

                        BCHBBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCHBBSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCHBBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHBBCategoryVal,
                                type: BCHBBTypeVal,
                                temp: BCHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHBBSTD = [];
                                $(result).each(function (index, element) {
                                    BCHBBSTD[index] = {
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
                    if (index === 14) {

                        BCHBBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCHBBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHBBCategoryVal,
                                type: BCHBBTypeVal,
                                std: BCHBBSTDVal,
                                temp: BCHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHBBName = [];
                                $(result).each(function (index, element) {
                                    BCHBBName[index] = {
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

                    // PD
                    let BCHBPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        BCHBPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // PS
                    let BCHBPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BCHBPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // test
                    let BCHBTest;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        BCHBTest = rows[3][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // delta
                    let BCHBDelta;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        BCHBDelta = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // JName
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        BCHBJNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // DJ、JThkMin、JThkMax
                    let BCHBDJ, BCHBJThkMin, BCHBJThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BCHBJCategoryVal,
                            "type": BCHBJTypeVal,
                            "std": BCHBJSTDVal,
                            "name": BCHBJNameVal,
                            "temp": BCHBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BCHBDJ = parseFloat(result.density);
                            BCHBJThkMin = parseFloat(result.thkMin);
                            BCHBJThkMax = parseFloat(result.thkMax);

                            // SDO
                            let BCHBSDO;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                BCHBSDO = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                bchb2d("Φ" + BCHBSDO);
                                bchbSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        bchb2d("Φ" + BCHBSDO);
                                    }
                                });
                            }
                            bchbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        bchb2d("Φ" + BCHBSDO);
                                        bchbSketch.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                bchb2d("Φ" + BCHBSDO);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKJN
                            let BCHBTHKJN;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > BCHBJThkMin
                                && parseFloat(rows[10][columns[0][1].field]) <= Math.min(BCHBJThkMax, BCHBSDO / 2)) {
                                BCHBTHKJN = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) <= BCHBJThkMin) {
                                south.html("管子名义厚度不能小于等于 " + BCHBJThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > Math.min(BCHBJThkMax, BCHBSDO / 2)) {
                                south.html("管子名义厚度不能大于 " + Math.min(BCHBJThkMax, BCHBSDO / 2) + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN);
                                bchbSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN);
                                    }
                                });
                            }
                            bchbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN);
                                        bchbSketch.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN);
                                            }
                                        });
                                    }
                                }
                            });

                            let BCHBOJT, BCHBOJ, BCHBRJEL, BCHBEJT, BCHBCJ1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCHBJCategoryVal,
                                    "type": BCHBJTypeVal,
                                    "std": BCHBJSTDVal,
                                    "name": BCHBJNameVal,
                                    "thk": BCHBTHKJN,
                                    "temp": BCHBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": BCHBSDO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCHBOJT = parseFloat(result.ot);
                                    if (BCHBOJT < 0) {
                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BCHBOJ = parseFloat(result.o);
                                    if (BCHBOJ < 0) {
                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BCHBRJEL = parseFloat(result.rel);
                                    if (BCHBRJEL < 0) {
                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    BCHBEJT = 1000 * parseFloat(result.et);
                                    if (BCHBEJT < 0) {
                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                        return false;
                                    }
                                    BCHBCJ1 = parseFloat(result.c1);
                                    if (BCHBCJ1 < 0) {
                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // CJ2
                                    let BCHBCJ2;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) < BCHBTHKJN) {
                                        BCHBCJ2 = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) >= BCHBTHKJN) {
                                        south.html("管子腐蚀裕量不能大于等于 " + BCHBTHKJN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // BName
                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                        BCHBBNameVal = rows[15][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // DB、BThkMin、BThkMax
                                    let BCHBDB, BCHBBThkMin, BCHBBThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCHBBCategoryVal,
                                            "type": BCHBBTypeVal,
                                            "std": BCHBBSTDVal,
                                            "name": BCHBBNameVal,
                                            "temp": BCHBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCHBDB = parseFloat(result.density);
                                            BCHBBThkMin = parseFloat(result.thkMin);
                                            BCHBBThkMax = parseFloat(result.thkMax);

                                            // BDI
                                            let BCHBBDI;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                BCHBBDI = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI);
                                                bchbSketch.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI);
                                                    }
                                                });
                                            }
                                            bchbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI);
                                                        bchbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKBN
                                            let BCHBTHKBN;
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > BCHBBThkMin
                                                && parseFloat(rows[17][columns[0][1].field]) <= BCHBBThkMax) {
                                                BCHBTHKBN = parseFloat(rows[17][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) <= BCHBBThkMin) {
                                                south.html("短节名义厚度不能小于等于 " + BCHBBThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > BCHBBThkMax) {
                                                south.html("短节名义厚度不能大于 " + BCHBBThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN);
                                                bchbSketch.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN);
                                                    }
                                                });
                                            }
                                            bchbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN);
                                                        bchbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let BCHBBDO = BCHBBDI + 2 * BCHBTHKBN;

                                            let BCHBOBT, BCHBOB, BCHBRBEL, BCHBEBT, BCHBCB1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BCHBBCategoryVal,
                                                    "type": BCHBBTypeVal,
                                                    "std": BCHBBSTDVal,
                                                    "name": BCHBBNameVal,
                                                    "thk": BCHBTHKBN,
                                                    "temp": BCHBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": BCHBBDO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BCHBOBT = parseFloat(result.ot);
                                                    if (BCHBOBT < 0) {
                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BCHBOB = parseFloat(result.o);
                                                    if (BCHBOB < 0) {
                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BCHBRBEL = parseFloat(result.rel);
                                                    if (BCHBRBEL < 0) {
                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BCHBEBT = 1000 * parseFloat(result.et);
                                                    if (BCHBEBT < 0) {
                                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BCHBCB1 = parseFloat(result.c1);
                                                    if (BCHBCB1 < 0) {
                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // CB2
                                                    let BCHBCB2;
                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) < BCHBTHKBN) {
                                                        BCHBCB2 = parseFloat(rows[18][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) >= BCHBTHKBN) {
                                                        south.html("短节腐蚀裕量不能大于等于 " + BCHBTHKBN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // L2
                                                    let BCHBL2;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                        BCHBL2 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2);
                                                        bchbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2);
                                                            }
                                                        });
                                                    }
                                                    bchbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2);
                                                                bchbSketch.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // H
                                                    let BCHBH;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > BCHBTHKBN) {
                                                        BCHBH = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= BCHBTHKBN) {
                                                        south.html("开槽处管子外侧至短节外侧高度 h 不能小于等于 " + BCHBTHKBN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2, BCHBH);
                                                        bchbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2, BCHBH);
                                                            }
                                                        });
                                                    }
                                                    bchbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2, BCHBH);
                                                                bchbSketch.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2, BCHBH);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // ND
                                                    let BCHBND;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        BCHBND = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 过程参数
                                                    let BCHBPC = BCHBPD + BCHBPS;
                                                    let BCHBCJ = BCHBCJ1 + BCHBCJ2;
                                                    let BCHBTHKJE = BCHBTHKJN - BCHBCJ;
                                                    let BCHBSDM = BCHBSDO - BCHBTHKJN;
                                                    let BCHBSDI = BCHBSDO - 2 * BCHBTHKJN;
                                                    let BCHBCB = BCHBCB1 + BCHBCB2;
                                                    let BCHBTHKBE = BCHBTHKBN - BCHBCB;

                                                    // 管子应力校核
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "管子许用应力：" + BCHBOJT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let BCHBO1 = (BCHBPC * BCHBSDM) / (2 * BCHBTHKJE);
                                                    let BCHBO1CHK;
                                                    if (BCHBO1 <= BCHBOJT) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "管子实际应力：" + BCHBO1.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        BCHBO1CHK = "合格";
                                                    } else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "管子实际应力：" + BCHBO1.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        BCHBO1CHK = "不合格";
                                                    }

                                                    // 短节应力校核
                                                    let BCHBL1 = Math.min(1.1 * Math.sqrt(BCHBBDO * BCHBTHKBE), 120);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "短节长度：" + BCHBL1.toFixed(2) + " mm" +
                                                        "</span>");

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2, BCHBH, BCHBL1);
                                                        bchbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2, BCHBH, BCHBL1);
                                                            }
                                                        });
                                                    }
                                                    bchbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2, BCHBH, BCHBL1);
                                                                bchbSketch.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        bchb2d("Φ" + BCHBSDO, BCHBTHKJN, "Φ" + BCHBBDI, BCHBTHKBN, BCHBL2, BCHBH, BCHBL1);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let BCHBO2 = BCHBPC * (BCHBBDO * BCHBL1 + 2 * (BCHBL2 * BCHBH + 0.25 * Math.PI * BCHBSDI * BCHBSDI)) / (2 * ((BCHBL1 - BCHBL2) * BCHBTHKBN + Math.PI * BCHBSDM * BCHBTHKJE));
                                                    let BCHBOMIN = Math.min(BCHBOJT, BCHBOBT);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "膨胀节许用应力：" + BCHBOMIN.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let BCHBO2CHK;
                                                    if (BCHBO2 <= BCHBOMIN) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + BCHBO2.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        BCHBO2CHK = "合格";
                                                    } else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + BCHBO2.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        BCHBO2CHK = "不合格";
                                                    }

                                                    // 疲劳寿命计算
                                                    let BCHBO3 = 1.5 * BCHBEJT * BCHBTHKJN * BCHBDelta / (BCHBSDO * BCHBSDO * BCHBND);
                                                    let BCHBOR = BCHBO1 + BCHBO3;
                                                    let BCHBN;
                                                    if (BCHBJCategoryVal === "碳素钢" || BCHBJCategoryVal === "低合金钢") {
                                                        BCHBN = Math.pow(6187 / BCHBOR, 2.9);
                                                    }
                                                    else if (BCHBJCategoryVal === "高合金钢") {
                                                        BCHBN = Math.pow(5835.5 / BCHBOR, 3.5);
                                                    }
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "膨胀节疲劳寿命：" + BCHBN.toFixed(0) +
                                                        "</span>");

                                                    // 压力试验
                                                    let BCHBPJT, BCHBPBT, BCHBPT;
                                                    if (BCHBTest === "液压试验") {
                                                        BCHBPJT = Math.max(1.25 * BCHBPD * BCHBOJ / BCHBOJT, 0.05);
                                                        BCHBPBT = Math.max(1.25 * BCHBPD * BCHBOB / BCHBOBT, 0.05);
                                                        BCHBPT = Math.min(BCHBPJT, BCHBPBT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + BCHBPT.toFixed(4) + " MPa" +
                                                            "</span>");

                                                    }
                                                    else if (BCHBTest === "气压试验") {

                                                        BCHBPJT = Math.max(1.1 * BCHBPD * BCHBOJ / BCHBOJT, 0.05);
                                                        BCHBPBT = Math.max(1.1 * BCHBPD * BCHBOB / BCHBOBT, 0.05);
                                                        BCHBPT = Math.min(BCHBPJT, BCHBPBT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + BCHBPT.toFixed(4) + " MPa" +
                                                            "</span>");

                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // docx
                                                    let BCHBPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "bchbdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "BCHB",

                                                                jcategory: BCHBJCategoryVal,
                                                                pd: BCHBPD,
                                                                t: BCHBDT,
                                                                ps: BCHBPS,
                                                                test: BCHBTest,
                                                                delta: BCHBDelta,
                                                                jstd: BCHBJSTDVal,
                                                                jname: BCHBJNameVal,
                                                                sdo: BCHBSDO,
                                                                thkjn: BCHBTHKJN,
                                                                cj2: BCHBCJ2,
                                                                bstd: BCHBBSTDVal,
                                                                bname: BCHBBNameVal,
                                                                bdi: BCHBBDI,
                                                                thkbn: BCHBTHKBN,
                                                                cb2: BCHBCB2,
                                                                l2: BCHBL2,
                                                                h: BCHBH,
                                                                nd: BCHBND,
                                                                dj: BCHBDJ.toFixed(4),
                                                                ojt: BCHBOJT.toFixed(4),
                                                                oj: BCHBOJ.toFixed(4),
                                                                rjel: BCHBRJEL.toFixed(4),
                                                                ejt: (BCHBEJT / 1000).toFixed(4),
                                                                cj1: BCHBCJ1.toFixed(4),
                                                                db: BCHBDB.toFixed(4),
                                                                obt: BCHBOBT.toFixed(4),
                                                                ob: BCHBOB.toFixed(4),
                                                                rbel: BCHBRBEL.toFixed(4),
                                                                ebt: (BCHBEBT / 1000).toFixed(4),
                                                                cb1: BCHBCB1.toFixed(4),
                                                                pc: BCHBPC.toFixed(4),
                                                                cj: BCHBCJ.toFixed(4),
                                                                thkje: BCHBTHKJE.toFixed(4),
                                                                sdm: BCHBSDM.toFixed(4),
                                                                sdi: BCHBSDI.toFixed(4),
                                                                cb: BCHBCB.toFixed(4),
                                                                thkbe: BCHBTHKBE.toFixed(4),
                                                                bdo: BCHBBDO.toFixed(4),
                                                                o1: BCHBO1.toFixed(4),
                                                                o1chk: BCHBO1CHK,
                                                                l1: BCHBL1.toFixed(4),
                                                                o2: BCHBO2.toFixed(4),
                                                                omin: BCHBOMIN.toFixed(4),
                                                                o2chk: BCHBO2CHK,
                                                                o3: BCHBO3.toFixed(4),
                                                                or: BCHBOR.toFixed(4),
                                                                n: BCHBN.toFixed(0),
                                                                pjt: BCHBPJT.toFixed(4),
                                                                pbt: BCHBPBT.toFixed(4),
                                                                pt: BCHBPT.toFixed(4)
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
                                                                    BCHBPayJS.dialog({
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
                                                                                BCHBPayJS.dialog("close");
                                                                                BCHBPayJS.dialog("clear");
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
                                                                                            BCHBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    BCHBPayJS.dialog('close');
                                                                                                    BCHBPayJS.dialog('clear');
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
                                                        "<span style='color:red;'>&ensp;短节材料力学特性获取失败，请检查网络后重试</span>");
                                                }
                                            });
                                        },
                                        error: function () {
                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                "<span style='color:red;'>&ensp;短节材料物理性质获取失败，请检查网络后重试</span>");
                                        }
                                    });
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;管子材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;管子材料物理性质获取失败，请检查网络后重试</span>");
                        }
                    });
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});