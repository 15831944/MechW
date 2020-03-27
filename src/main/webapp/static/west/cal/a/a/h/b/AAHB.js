$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aahbSketch = $("#d2");
    let aahbModel = $("#d3");
    let aahbd2d3 = $('#d2d3');

    $("#cal").html("<table id='aahb'></table>");
    let pg = $("#aahb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/h/b/AAHB.json", function (result) {

        let AAHBDT,
            AAHBJCategory, AAHBJCategoryVal, AAHBJType, AAHBJTypeVal, AAHBJSTD, AAHBJSTDVal, AAHBJName, AAHBJNameVal,
            AAHBBCategory, AAHBBCategoryVal, AAHBBType, AAHBBTypeVal, AAHBBSTD, AAHBBSTDVal, AAHBBName, AAHBBNameVal,
            columns, rows, ed;

        function aahb2d(sdo = "do", thkjn = "δjn",
                        bdi = "Di", thkbn = "δbn",
                        l2 = "L2", h = "h", l1 = "L1") {

            aahbSketch.empty();

            let width = aahbSketch.width();
            let height = aahbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAHBSVG").attr("height", height);

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
            dimTopH(cx - gapJ, cy + lengthI, cx + gapJ, cy + lengthI, l2, "AAHBSketchL2");

            // L1
            dimBottomH(cx - ro - thks, cy + ro + 2 * thks, cx + ro + thks, cy + ro + 2 * thks, l1, "AAHBSketchL1");

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
            ])).attr("id", "AAHBSketchBDI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHBSketchBDI")
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
            ])).attr("id", "AAHBSketchTHKBN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHBSketchTHKBN")
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
            ])).attr("id", "AAHBSketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHBSketchH")
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
                ])).classed("sketch", true).attr("id", "AAHBSketchSDO");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHBSketchSDO")
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
                ])).classed("sketch", true).attr("id", "AAHBSketchTHKJN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHBSketchTHKJN")
                .attr("startOffset", "50%").text(thkjn);
        }

        currentTabIndex = aahbd2d3.tabs('getTabIndex', aahbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aahb2d();
            aahbSketch.off("resize").on("resize", function () {
                if (pg.length > 0) {
                    aahb2d();
                }
            });
        }
        aahbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aahb2d();
                    aahbSketch.off("resize").on("resize", function () {
                        if (pg.length > 0) {
                            aahb2d();
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
                    $(ed.target).combobox("loadData", AAHBJCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAHBJType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAHBJSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AAHBJName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", AAHBBCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAHBBType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAHBBSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAHBBName);
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
                    aahbSketch.empty();
                    aahbModel.empty();

                    // sketch
                    currentTabIndex = aahbd2d3.tabs('getTabIndex', aahbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aahb2d();
                        aahbSketch.off("resize").on("resize", function () {
                            if (pg.length > 0) {
                                aahb2d();
                            }
                        });
                    }
                    aahbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aahb2d();
                                aahbSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        aahb2d();
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

                        AAHBDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAHBJCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAHBJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAHBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAHBJName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        AAHBBCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAHBBType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAHBBSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAHBBName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHBJCategory = [];
                                AAHBBCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAHBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        if (element === "碳素钢和低合金钢" || element === "高合金钢") {
                                            AAHBJCategory.push({
                                                "value": element,
                                                "text": element
                                            });
                                        }
                                        AAHBBCategory[index] = {
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

                        AAHBJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAHBJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAHBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAHBJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHBJCategoryVal,
                                temp: AAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHBJType = [];
                                $(result).each(function (index, element) {
                                    AAHBJType[index] = {
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

                        AAHBJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAHBJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAHBJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHBJCategoryVal,
                                type: AAHBJTypeVal,
                                temp: AAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHBJSTD = [];
                                $(result).each(function (index, element) {
                                    AAHBJSTD[index] = {
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

                        AAHBJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAHBJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHBJCategoryVal,
                                type: AAHBJTypeVal,
                                std: AAHBJSTDVal,
                                temp: AAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHBJName = [];
                                $(result).each(function (index, element) {
                                    AAHBJName[index] = {
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

                        AAHBBCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAHBBType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAHBBSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAHBBName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHBBCategoryVal,
                                temp: AAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHBBType = [];
                                $(result).each(function (index, element) {
                                    AAHBBType[index] = {
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

                        AAHBBTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAHBBSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAHBBName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHBBCategoryVal,
                                type: AAHBBTypeVal,
                                temp: AAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHBBSTD = [];
                                $(result).each(function (index, element) {
                                    AAHBBSTD[index] = {
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

                        AAHBBSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAHBBName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHBBCategoryVal,
                                type: AAHBBTypeVal,
                                std: AAHBBSTDVal,
                                temp: AAHBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHBBName = [];
                                $(result).each(function (index, element) {
                                    AAHBBName[index] = {
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
                    let AAHBPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AAHBPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // PS
                    let AAHBPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AAHBPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // test
                    let AAHBTest;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AAHBTest = rows[3][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // delta
                    let AAHBDelta;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AAHBDelta = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // JName
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        AAHBJNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // DJ、JThkMin、JThkMax
                    let AAHBDJ, AAHBJThkMin, AAHBJThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AAHBJCategoryVal,
                            "type": AAHBJTypeVal,
                            "std": AAHBJSTDVal,
                            "name": AAHBJNameVal,
                            "temp": AAHBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AAHBDJ = parseFloat(result.density);
                            AAHBJThkMin = parseFloat(result.thkMin);
                            AAHBJThkMax = parseFloat(result.thkMax);

                            // SDO
                            let AAHBSDO;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                AAHBSDO = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aahb2d("Φ" + AAHBSDO);
                                aahbSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        aahb2d("Φ" + AAHBSDO);
                                    }
                                });
                            }
                            aahbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aahb2d("Φ" + AAHBSDO);
                                        aahbSketch.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                aahb2d("Φ" + AAHBSDO);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKJN
                            let AAHBTHKJN;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > AAHBJThkMin
                                && parseFloat(rows[10][columns[0][1].field]) <= Math.min(AAHBJThkMax, AAHBSDO / 2)) {
                                AAHBTHKJN = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) <= AAHBJThkMin) {
                                south.html("管子名义厚度不能小于等于 " + AAHBJThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > Math.min(AAHBJThkMax, AAHBSDO / 2)) {
                                south.html("管子名义厚度不能大于 " + Math.min(AAHBJThkMax, AAHBSDO / 2) + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN);
                                aahbSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN);
                                    }
                                });
                            }
                            aahbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN);
                                        aahbSketch.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAHBOJT, AAHBOJ, AAHBOJT1, AAHBRJEL, AAHBEJT, AAHBCJ1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AAHBJCategoryVal,
                                    "type": AAHBJTypeVal,
                                    "std": AAHBJSTDVal,
                                    "name": AAHBJNameVal,
                                    "thk": AAHBTHKJN,
                                    "temp": AAHBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AAHBSDO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计弹性模量
                                    AAHBEJT = 1000 * parseFloat(result.et);
                                    if (AAHBEJT < 0) {
                                        south.html("查询管子材料设计温度弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // 设计应力
                                    AAHBOJT = parseFloat(result.ot);
                                    if (AAHBOJT < 0) {
                                        south.html("查询管子材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    AAHBOJ = parseFloat(result.o);
                                    if (AAHBOJ < 0) {
                                        south.html("查询管子材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    AAHBRJEL = parseFloat(result.rel);
                                    if (AAHBRJEL < 0) {
                                        south.html("查询管子材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    AAHBCJ1 = parseFloat(result.c1);
                                    if (AAHBCJ1 < 0) {
                                        south.html("查询管子材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 标记应力
                                    AAHBOJT1 = parseFloat(result.ot1);

                                    // CJ2
                                    let AAHBCJ2;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) < AAHBTHKJN) {
                                        AAHBCJ2 = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) >= AAHBTHKJN) {
                                        south.html("管子腐蚀裕量不能大于等于 " + AAHBTHKJN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // BName
                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                        AAHBBNameVal = rows[15][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // DB、BThkMin、BThkMax
                                    let AAHBDB, AAHBBThkMin, AAHBBThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": AAHBBCategoryVal,
                                            "type": AAHBBTypeVal,
                                            "std": AAHBBSTDVal,
                                            "name": AAHBBNameVal,
                                            "temp": AAHBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            AAHBDB = parseFloat(result.density);
                                            AAHBBThkMin = parseFloat(result.thkMin);
                                            AAHBBThkMax = parseFloat(result.thkMax);

                                            // BDI
                                            let AAHBBDI;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                AAHBBDI = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI);
                                                aahbSketch.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI);
                                                    }
                                                });
                                            }
                                            aahbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI);
                                                        aahbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKBN
                                            let AAHBTHKBN;
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > AAHBBThkMin
                                                && parseFloat(rows[17][columns[0][1].field]) <= AAHBBThkMax) {
                                                AAHBTHKBN = parseFloat(rows[17][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) <= AAHBBThkMin) {
                                                south.html("短节名义厚度不能小于等于 " + AAHBBThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > AAHBBThkMax) {
                                                south.html("短节名义厚度不能大于 " + AAHBBThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN);
                                                aahbSketch.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN);
                                                    }
                                                });
                                            }
                                            aahbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN);
                                                        aahbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let AAHBBDO = AAHBBDI + 2 * AAHBTHKBN;

                                            let AAHBOBT, AAHBOB, AAHBOBT1, AAHBRBEL, AAHBEBT, AAHBCB1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": AAHBBCategoryVal,
                                                    "type": AAHBBTypeVal,
                                                    "std": AAHBBSTDVal,
                                                    "name": AAHBBNameVal,
                                                    "thk": AAHBTHKBN,
                                                    "temp": AAHBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": AAHBBDO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    // 设计弹性模量
                                                    AAHBEBT = 1000 * parseFloat(result.et);
                                                    if (AAHBEBT < 0) {
                                                        south.html("查询短节材料设计温度弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 设计应力
                                                    AAHBOBT = parseFloat(result.ot);
                                                    if (AAHBOBT < 0) {
                                                        south.html("查询短节材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 常温应力
                                                    AAHBOB = parseFloat(result.o);
                                                    if (AAHBOB < 0) {
                                                        south.html("查询短节材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 常温屈服强度
                                                    AAHBRBEL = parseFloat(result.rel);
                                                    if (AAHBRBEL < 0) {
                                                        south.html("查询短节材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 厚度负偏差
                                                    AAHBCB1 = parseFloat(result.c1);
                                                    if (AAHBCB1 < 0) {
                                                        south.html("查询短节材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 标记应力
                                                    AAHBOBT1 = parseFloat(result.ot1);

                                                    // CB2
                                                    let AAHBCB2;
                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) < AAHBTHKBN) {
                                                        AAHBCB2 = parseFloat(rows[18][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) >= AAHBTHKBN) {
                                                        south.html("短节腐蚀裕量不能大于等于 " + AAHBTHKBN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // L2
                                                    let AAHBL2;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                        AAHBL2 = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2);
                                                        aahbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2);
                                                            }
                                                        });
                                                    }
                                                    aahbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2);
                                                                aahbSketch.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // H
                                                    let AAHBH;
                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) > AAHBTHKBN) {
                                                        AAHBH = parseFloat(rows[20][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                        && parseFloat(rows[20][columns[0][1].field]) <= AAHBTHKBN) {
                                                        south.html("开槽处管子外侧至短节外侧高度 h 不能小于等于 " + AAHBTHKBN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2, AAHBH);
                                                        aahbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2, AAHBH);
                                                            }
                                                        });
                                                    }
                                                    aahbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2, AAHBH);
                                                                aahbSketch.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2, AAHBH);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // ND
                                                    let AAHBND;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        AAHBND = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 过程参数
                                                    let AAHBPC = AAHBPD + AAHBPS;
                                                    let AAHBCJ = AAHBCJ1 + AAHBCJ2;
                                                    let AAHBTHKJE = AAHBTHKJN - AAHBCJ;
                                                    let AAHBSDM = AAHBSDO - AAHBTHKJN;
                                                    let AAHBSDI = AAHBSDO - 2 * AAHBTHKJN;
                                                    let AAHBCB = AAHBCB1 + AAHBCB2;
                                                    let AAHBTHKBE = AAHBTHKBN - AAHBCB;

                                                    // 管子应力校核
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "管子许用应力：" + AAHBOJT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let AAHBO1 = (AAHBPC * AAHBSDM) / (2 * AAHBTHKJE);
                                                    let AAHBO1CHK;
                                                    if (AAHBO1 <= AAHBOJT) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "管子实际应力：" + AAHBO1.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        AAHBO1CHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "管子实际应力：" + AAHBO1.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        AAHBO1CHK = "不合格";
                                                    }

                                                    // 短节应力校核
                                                    let AAHBL1 = Math.min(1.1 * Math.sqrt(AAHBBDO * AAHBTHKBE), 120);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "短节长度：" + AAHBL1.toFixed(2) + " mm" +
                                                        "</span>");

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2, AAHBH, AAHBL1.toFixed(2));
                                                        aahbSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2, AAHBH, AAHBL1.toFixed(2));
                                                            }
                                                        });
                                                    }
                                                    aahbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2, AAHBH, AAHBL1.toFixed(2));
                                                                aahbSketch.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        aahb2d("Φ" + AAHBSDO, AAHBTHKJN, "Φ" + AAHBBDI, AAHBTHKBN, AAHBL2, AAHBH, AAHBL1.toFixed(2));
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let AAHBO2 = AAHBPC * (AAHBBDO * AAHBL1 + 2 * (AAHBL2 * AAHBH + 0.25 * Math.PI * AAHBSDI * AAHBSDI)) / (2 * ((AAHBL1 - AAHBL2) * AAHBTHKBN + Math.PI * AAHBSDM * AAHBTHKJE));
                                                    let AAHBOMIN = Math.min(AAHBOJT, AAHBOBT);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "膨胀节许用应力：" + AAHBOMIN.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let AAHBO2CHK;
                                                    if (AAHBO2 <= AAHBOMIN) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + AAHBO2.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        AAHBO2CHK = "合格";
                                                    } else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际应力：" + AAHBO2.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        AAHBO2CHK = "不合格";
                                                    }

                                                    // 疲劳寿命计算
                                                    let AAHBO3 = 1.5 * AAHBEJT * AAHBTHKJN * AAHBDelta / (AAHBSDO * AAHBSDO * AAHBND);
                                                    let AAHBOR = AAHBO1 + AAHBO3;
                                                    let AAHBN;
                                                    if (AAHBJCategoryVal === "碳素钢和低合金钢") {
                                                        AAHBN = Math.pow(6187 / AAHBOR, 2.9);
                                                    }
                                                    else if (AAHBJCategoryVal === "高合金钢") {
                                                        AAHBN = Math.pow(5835.5 / AAHBOR, 3.5);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "膨胀节疲劳寿命：" + AAHBN.toFixed(0) +
                                                        "</span>");

                                                    // 压力试验
                                                    let AAHBETA, AAHBPJT, AAHBPBT, AAHBPT;
                                                    if (AAHBTest === "液压试验") {
                                                        AAHBETA = 1.25;
                                                        AAHBPJT = AAHBETA * AAHBPD * AAHBOJ / Math.max(AAHBOJT, AAHBOJT1);
                                                        AAHBPBT = AAHBETA * AAHBPD * AAHBOB / Math.max(AAHBOBT, AAHBOBT1);
                                                        AAHBPT = Math.min(AAHBPJT, AAHBPBT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + AAHBPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (AAHBTest === "气压试验") {
                                                        AAHBETA = 1.10;
                                                        AAHBPJT = AAHBETA * AAHBPD * AAHBOJ / Math.max(AAHBOJT, AAHBOJT1);
                                                        AAHBPBT = AAHBETA * AAHBPD * AAHBOB / Math.max(AAHBOBT, AAHBOBT1);
                                                        AAHBPT = Math.min(AAHBPJT, AAHBPBT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + AAHBPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // docx
                                                    let AAHBPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "aahbdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "AAHB",
                                                                pd: AAHBPD,
                                                                t: AAHBDT,
                                                                ps: AAHBPS,
                                                                test: AAHBTest,
                                                                delta: AAHBDelta,
                                                                jstd: AAHBJSTDVal,
                                                                jname: AAHBJNameVal,
                                                                sdo: AAHBSDO,
                                                                thkjn: AAHBTHKJN,
                                                                cj2: AAHBCJ2,
                                                                bstd: AAHBBSTDVal,
                                                                bname: AAHBBNameVal,
                                                                bdi: AAHBBDI,
                                                                thkbn: AAHBTHKBN,
                                                                cb2: AAHBCB2,
                                                                l2: AAHBL2,
                                                                h: AAHBH,
                                                                nd: AAHBND,
                                                                dj: AAHBDJ.toFixed(4),
                                                                ojt: AAHBOJT.toFixed(4),
                                                                oj: AAHBOJ.toFixed(4),
                                                                rjel: AAHBRJEL.toFixed(4),
                                                                ojt1: AAHBOJT1.toFixed(4),
                                                                ejt: (AAHBEJT / 1000).toFixed(4),
                                                                cj1: AAHBCJ1.toFixed(4),
                                                                db: AAHBDB.toFixed(4),
                                                                obt: AAHBOBT.toFixed(4),
                                                                ob: AAHBOB.toFixed(4),
                                                                rbel: AAHBRBEL.toFixed(4),
                                                                obt1: AAHBOBT1.toFixed(4),
                                                                ebt: (AAHBEBT / 1000).toFixed(4),
                                                                cb1: AAHBCB1.toFixed(4),
                                                                pc: AAHBPC.toFixed(4),
                                                                cj: AAHBCJ.toFixed(4),
                                                                thkje: AAHBTHKJE.toFixed(4),
                                                                sdm: AAHBSDM.toFixed(4),
                                                                sdi: AAHBSDI.toFixed(4),
                                                                cb: AAHBCB.toFixed(4),
                                                                thkbe: AAHBTHKBE.toFixed(4),
                                                                bdo: AAHBBDO.toFixed(4),
                                                                o1: AAHBO1.toFixed(4),
                                                                o1chk: AAHBO1CHK,
                                                                l1: AAHBL1.toFixed(4),
                                                                o2: AAHBO2.toFixed(4),
                                                                omin: AAHBOMIN.toFixed(4),
                                                                o2chk: AAHBO2CHK,
                                                                o3: AAHBO3.toFixed(4),
                                                                or: AAHBOR.toFixed(4),
                                                                n: AAHBN.toFixed(0),
                                                                eta: AAHBETA.toFixed(4),
                                                                pjt: AAHBPJT.toFixed(4),
                                                                pbt: AAHBPBT.toFixed(4),
                                                                pt: AAHBPT.toFixed(4)
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
                                                                    AAHBPayJS.dialog({
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
                                                                                AAHBPayJS.dialog("close");
                                                                                AAHBPayJS.dialog("clear");
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
                                                                                            AAHBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    AAHBPayJS.dialog('close');
                                                                                                    AAHBPayJS.dialog('clear');
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