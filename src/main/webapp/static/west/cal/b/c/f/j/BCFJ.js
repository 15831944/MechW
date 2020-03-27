$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfjSketch = $("#d2");
    let bcfjModel = $("#d3");
    let bcfjd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfj'></table>");
    let pg = $("#bcfj");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/j/BCFJ.json", function (result) {

        let BCFJDT,
            BCFJSCategory, BCFJSCategoryVal, BCFJSType, BCFJSTypeVal, BCFJSSTD, BCFJSSTDVal, BCFJSName, BCFJSNameVal,
            BCFJJCategory, BCFJJCategoryVal, BCFJJType, BCFJJTypeVal, BCFJJSTD, BCFJJSTDVal, BCFJJName, BCFJJNameVal,
            columns, rows, ed;

        function bcfj2d(dsi = "ϕDsi", thksn = "δsn", thkjn = "δjn", hj = "hj") {

            bcfjSketch.empty();

            let width = bcfjSketch.width();
            let height = bcfjSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFJSVG").attr("height", height);

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
            let padding = 45;
            let thk = 6;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

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

            /*
            左侧筒体
             */
            drawLine(padding, padding + 3 * hg, padding, height / 2 - 3 * thk);
            drawLine(padding + thk, padding + 3 * hg, padding + thk, height / 2 - 3 * thk);
            drawLine(width / 2, padding + 3 * hg, width / 2, height / 2 - 3 * thk);
            drawLine(width / 2 - thk, padding + 3 * hg, width / 2 - thk, height / 2 - 3 * thk);
            drawLine(padding, height / 2 - 3 * thk, width / 2, height / 2 - 3 * thk);
            drawLine(padding, padding + 3 * hg, width / 2, padding + 3 * hg);
            drawCenterLine(padding + wg, height / 2 - 3 * thk - 10, padding + wg, height / 2 + hg + 10);

            /*
            左侧加强筋
             */
            drawLine(padding + wg - thk / 2, height / 2 - 3 * thk, padding + wg - thk / 2, height / 2);
            drawLine(padding + wg + thk / 2, height / 2 - 3 * thk, padding + wg + thk / 2, height / 2);

            /*
            左侧平盖
             */
            drawLine(padding + thk, height / 2, width / 2 - thk, height / 2);
            drawLine(padding + thk, height / 2 + thk, width / 2 - thk, height / 2 + thk);

            /*
            右侧筒体
             */
            let r0 = Math.min(wg, hg);
            let cx0 = padding + 3 * wg;
            let cy0 = height / 2;
            drawArc(r0, r0, cx0, cy0 + r0, cx0, cy0 - r0);
            drawArc(r0, r0, cx0, cy0 - r0, cx0, cy0 + r0);
            drawArc(r0 - thk, r0 - thk, cx0, cy0 + r0 - thk, cx0, cy0 - r0 + thk);
            drawArc(r0 - thk, r0 - thk, cx0, cy0 - r0 + thk, cx0, cy0 + r0 - thk);
            drawCenterLine(cx0 - r0 - 10, cy0, cx0 + r0 + 10, cy0);
            drawCenterLine(cx0, cy0 - r0 - 10, cx0, cy0 + r0 + 10);

            /*
            右侧加强筋
             */
            drawLine(cx0 - thk / 2, cy0 - r0 + thk, cx0 - thk / 2, cy0 + r0 - thk);
            drawLine(cx0 + thk / 2, cy0 - r0 + thk, cx0 + thk / 2, cy0 + r0 - thk);

            // dsi
            dimBottomH(padding + thk, height / 2 + hg, width / 2 - thk, height / 2 + hg, dsi, "BCFJSketchDSI");

            // thksn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg, y: height / 2},
                    {x: padding + 0.5 * wg + 3, y: height / 2 - 15},
                    {x: padding + 0.5 * wg - 3, y: height / 2 - 15},
                    {x: padding + 0.5 * wg, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg, y: height / 2 + thk},
                    {x: padding + 0.5 * wg + 3, y: height / 2 + thk + 15},
                    {x: padding + 0.5 * wg - 3, y: height / 2 + thk + 15},
                    {x: padding + 0.5 * wg, y: height / 2 + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: height / 2},
                {x: padding + 0.5 * wg, y: height / 2 + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: height / 2 - 15},
                {x: padding + 0.5 * wg, y: height / 2 - 15 - 35}
            ])).attr("id", "BCFJSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFJSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // hj
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: height / 2 - 3 * thk},
                    {x: padding + 1.5 * wg + 3, y: height / 2 - 3 * thk - 15},
                    {x: padding + 1.5 * wg - 3, y: height / 2 - 3 * thk - 15},
                    {x: padding + 1.5 * wg, y: height / 2 - 3 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: height / 2},
                    {x: padding + 1.5 * wg + 3, y: height / 2 + 15},
                    {x: padding + 1.5 * wg - 3, y: height / 2 + 15},
                    {x: padding + 1.5 * wg, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: height / 2 - 3 * thk},
                {x: padding + 1.5 * wg, y: height / 2 + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: height / 2 - 3 * thk - 15},
                {x: padding + 1.5 * wg, y: height / 2 - 3 * thk - 15 - 35}
            ])).attr("id", "BCFJSketchHJ").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFJSketchHJ").attr("startOffset", "50%").text(hj);

            // thkjn
            extLineTopV(padding + wg + thk / 2, height / 2 - 3 * thk);
            extLineTopV(padding + wg - thk / 2, height / 2 - 3 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg + thk / 2, y: height / 2 - 3 * thk - 30},
                    {x: padding + wg + thk / 2 + 15, y: height / 2 - 3 * thk - 27},
                    {x: padding + wg + thk / 2 + 15, y: height / 2 - 3 * thk - 33},
                    {x: padding + wg + thk / 2, y: height / 2 - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk / 2, y: height / 2 - 3 * thk - 30},
                    {x: padding + wg - thk / 2 - 15, y: height / 2 - 3 * thk - 27},
                    {x: padding + wg - thk / 2 - 15, y: height / 2 - 3 * thk - 33},
                    {x: padding + wg - thk / 2, y: height / 2 - 3 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg - thk / 2 - 15 - 10, y: height / 2 - 3 * thk - 30},
                {x: padding + wg + thk / 2, y: height / 2 - 3 * thk - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg + thk / 2 + 15, y: height / 2 - 3 * thk - 30},
                {x: padding + wg + thk / 2 + 15 + 40, y: height / 2 - 3 * thk - 30}
            ])).attr("id", "BCFJSketchTHKJN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFJSketchTHKJN")
                .attr("startOffset", "50%").text(thkjn);

            // A 向
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg, y: padding + 0.75 * hg},
                    {x: padding + wg + 3, y: padding + 0.75 * hg - 15},
                    {x: padding + wg - 3, y: padding + 0.75 * hg - 15},
                    {x: padding + wg, y: padding + 0.75 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 0.75 * hg},
                {x: padding + wg, y: padding + 0.75 * hg - 35}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFJSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFJSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFJSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFJSketchAX").attr("startOffset", "50%").text("A向");

        }

        currentTabIndex = bcfjd2d3.tabs('getTabIndex', bcfjd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfj2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfj").length > 0) {
                    bcfj2d();
                }
            });
        }
        bcfjd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfj2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfj").length > 0) {
                            bcfj2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号10筋板加强圆平盖计算",
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
                    }
                },
                {
                    field: 'value',
                    title: '值',
                    width: 153,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function (value, row, index) {
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
                    $(ed.target).combobox("loadData", BCFJSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFJSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFJSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFJSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFJJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFJJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFJJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFJJName);
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
                    bcfjSketch.empty();

                    // model
                    bcfjModel.empty();

                    // sketch
                    currentTabIndex = bcfjd2d3.tabs('getTabIndex', bcfjd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bcfj2d();
                        bcfjSketch.off("resize").on("resize", function () {
                            if ($("#bcfj").length > 0) {
                                bcfj2d();
                            }
                        });
                    }
                    bcfjd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfj2d();
                                bcfjSketch.off("resize").on("resize", function () {
                                    if ($("#bcfj").length > 0) {
                                        bcfj2d();
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

                        BCFJDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFJSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFJSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFJSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFJJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFJJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFJJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFJJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFJSCategory = [];
                                BCFJJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFJDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFJSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFJJCategory[index] = {
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

                        BCFJSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFJSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFJSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFJSCategoryVal,
                                temp: BCFJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFJSType = [];
                                $(result).each(function (index, element) {
                                    BCFJSType[index] = {
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

                        BCFJSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFJSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFJSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFJSCategoryVal,
                                type: BCFJSTypeVal,
                                temp: BCFJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFJSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFJSSTD[index] = {
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

                        BCFJSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFJSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFJSCategoryVal,
                                type: BCFJSTypeVal,
                                std: BCFJSSTDVal,
                                temp: BCFJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFJSName = [];
                                $(result).each(function (index, element) {
                                    BCFJSName[index] = {
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

                        BCFJJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFJJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFJJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFJJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFJJCategoryVal,
                                temp: BCFJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFJJType = [];
                                $(result).each(function (index, element) {
                                    BCFJJType[index] = {
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

                        BCFJJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFJJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFJJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFJJCategoryVal,
                                type: BCFJJTypeVal,
                                temp: BCFJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFJJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFJJSTD[index] = {
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

                        BCFJJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFJJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFJJCategoryVal,
                                type: BCFJJTypeVal,
                                std: BCFJJSTDVal,
                                temp: BCFJDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFJJName = [];
                                $(result).each(function (index, element) {
                                    BCFJJName[index] = {
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

                        // pd
                        let BCFJPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFJPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFJPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFJPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFJTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFJTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFJSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFJSDensity, BCFJSThkMin, BCFJSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFJSCategoryVal,
                                    "type": BCFJSTypeVal,
                                    "std": BCFJSSTDVal,
                                    "name": BCFJSNameVal,
                                    "temp": BCFJDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFJSDensity = parseFloat(result.density);
                                    BCFJSThkMin = parseFloat(result.thkMin);
                                    BCFJSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFJDSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFJDSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfj2d("Φ" + BCFJDSI);
                                        bcfjSketch.off("resize").on("resize", function () {
                                            if ($("#bcfj").length > 0) {
                                                bcfj2d("Φ" + BCFJDSI);
                                            }
                                        });
                                    }
                                    bcfjd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfj2d("Φ" + BCFJDSI);
                                                bcfjSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfj").length > 0) {
                                                        bcfj2d("Φ" + BCFJDSI);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFJTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFJSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFJSThkMax) {
                                        BCFJTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFJSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFJSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFJSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFJSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfj2d("Φ" + BCFJDSI, BCFJTHKSN);
                                        bcfjSketch.off("resize").on("resize", function () {
                                            if ($("#bcfj").length > 0) {
                                                bcfj2d("Φ" + BCFJDSI, BCFJTHKSN);
                                            }
                                        });
                                    }
                                    bcfjd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfj2d("Φ" + BCFJDSI, BCFJTHKSN);
                                                bcfjSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfj").length > 0) {
                                                        bcfj2d("Φ" + BCFJDSI, BCFJTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFJOST, BCFJOS, BCFJRSEL, BCFJCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFJSCategoryVal,
                                            "type": BCFJSTypeVal,
                                            "std": BCFJSSTDVal,
                                            "name": BCFJSNameVal,
                                            "thk": BCFJTHKSN,
                                            "temp": BCFJDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFJOST = parseFloat(result.ot);
                                            if (BCFJOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFJOS = parseFloat(result.o);
                                            if (BCFJOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFJRSEL = parseFloat(result.rel);
                                            if (BCFJRSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFJCS1 = parseFloat(result.c1);
                                            if (BCFJCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFJCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFJTHKSN) {
                                                BCFJCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFJTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFJTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFJES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFJES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFJJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFJJDensity, BCFJJThkMin, BCFJJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFJJCategoryVal,
                                                        "type": BCFJJTypeVal,
                                                        "std": BCFJJSTDVal,
                                                        "name": BCFJJNameVal,
                                                        "temp": BCFJDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFJJDensity = parseFloat(result.density);
                                                        BCFJJThkMin = parseFloat(result.thkMin);
                                                        BCFJJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFJTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFJJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFJJThkMax) {
                                                            BCFJTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFJJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFJJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFJJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFJJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfj2d("Φ" + BCFJDSI, BCFJTHKSN, BCFJTHKJN);
                                                            bcfjSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfj").length > 0) {
                                                                    bcfj2d("Φ" + BCFJDSI, BCFJTHKSN, BCFJTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfjd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfj2d("Φ" + BCFJDSI, BCFJTHKSN, BCFJTHKJN);
                                                                    bcfjSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfj").length > 0) {
                                                                            bcfj2d("Φ" + BCFJDSI, BCFJTHKSN, BCFJTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFJOJT, BCFJOJ, BCFJRJEL, BCFJCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFJJCategoryVal,
                                                                "type": BCFJJTypeVal,
                                                                "std": BCFJJSTDVal,
                                                                "name": BCFJJNameVal,
                                                                "thk": BCFJTHKJN,
                                                                "temp": BCFJDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFJOJT = parseFloat(result.ot);
                                                                if (BCFJOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFJOJ = parseFloat(result.o);
                                                                if (BCFJOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFJRJEL = parseFloat(result.rel);
                                                                if (BCFJRJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFJCJ1 = parseFloat(result.c1);
                                                                if (BCFJCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFJHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFJTHKJN) {
                                                                    BCFJHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFJTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFJTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfj2d("Φ" + BCFJDSI, BCFJTHKSN, BCFJTHKJN, BCFJHJ);
                                                                    bcfjSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfj").length > 0) {
                                                                            bcfj2d("Φ" + BCFJDSI, BCFJTHKSN, BCFJTHKJN, BCFJHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfjd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfj2d("Φ" + BCFJDSI, BCFJTHKSN, BCFJTHKJN, BCFJHJ);
                                                                            bcfjSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfj").length > 0) {
                                                                                    bcfj2d("Φ" + BCFJDSI, BCFJTHKSN, BCFJTHKJN, BCFJHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFJCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFJTHKJN) {
                                                                    BCFJCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFJTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFJTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFJPC = BCFJPD + BCFJPS;

                                                                let BCFJCS = BCFJCS1 + BCFJCS2;
                                                                let BCFJTHKSE = BCFJTHKSN - BCFJCS;
                                                                let BCFJDC = BCFJDSI + 2 * BCFJCS2;

                                                                let BCFJCJ = BCFJCJ1 + BCFJCJ2;
                                                                let BCFJTHKJE = BCFJTHKJN - BCFJCJ;
                                                                let BCFJHJE = BCFJHJ - BCFJCJ2;

                                                                let BCFJKP = 0.132;
                                                                let BCFJTHKSC = BCFJDC * Math.sqrt(BCFJKP * BCFJPC / (BCFJOST * BCFJES));
                                                                let BCFJTHKSD = BCFJTHKSC + BCFJCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFJTHKSD + BCFJCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFJTHKSCHK;
                                                                if (BCFJTHKSN >= (BCFJTHKSD + BCFJCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFJTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFJTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFJTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFJTHKSCHK = "不合格";
                                                                }

                                                                let BCFJZX = 0.05 * BCFJPC * BCFJDC * BCFJDC * BCFJDC / BCFJOST;
                                                                let BCFJLS = 20 * BCFJTHKSE;
                                                                let BCFJE1 = (BCFJTHKJE * (BCFJHJE + BCFJTHKSE) * (BCFJHJE + BCFJTHKSE) + (BCFJLS - BCFJTHKJE) * BCFJTHKSE * BCFJTHKSE)
                                                                    / (2 * (BCFJTHKJE * (BCFJHJE + BCFJTHKSE) + (BCFJLS - BCFJTHKJE) * BCFJTHKSE));
                                                                let BCFJE2 = BCFJHJE + BCFJTHKSE - BCFJE1;
                                                                let BCFJI = (BCFJLS * BCFJE1 * BCFJE1 * BCFJE1 - (BCFJLS - BCFJTHKJE) * (BCFJE1 - BCFJTHKSE) * (BCFJE1 - BCFJTHKSE) * (BCFJE1 - BCFJTHKSE) + BCFJTHKJE * BCFJE2 * BCFJE2 * BCFJE2) / 3;
                                                                let BCFJZACT = BCFJI / Math.max(BCFJE1, BCFJE2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFJZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFJZCHK;
                                                                if (BCFJZACT >= BCFJZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFJZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFJZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFJZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFJZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFJTestPT;
                                                                if (BCFJTest === "液压试验") {
                                                                    BCFJTestPT = Math.max(1.25 * BCFJPD * BCFJOS / BCFJOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFJTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFJTest === "气压试验") {
                                                                    BCFJTestPT = Math.max(1.10 * BCFJPD * BCFJOS / BCFJOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFJTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }

                                                                // MAWP
                                                                let BCFJMAWP = BCFJTHKSE * BCFJTHKSE * BCFJOST * BCFJES / (BCFJKP * BCFJDC * BCFJDC) - BCFJPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFJMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFJPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfjdocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFJ",

                                                                            t: BCFJDT,
                                                                            pd: BCFJPD,
                                                                            ps: BCFJPS,

                                                                            stds: BCFJSSTDVal,
                                                                            names: BCFJSNameVal,
                                                                            dsi: BCFJDSI,
                                                                            thksn: BCFJTHKSN,
                                                                            cs2: BCFJCS2,
                                                                            es: BCFJES,

                                                                            stdj: BCFJJSTDVal,
                                                                            namej: BCFJJNameVal,
                                                                            thkjn: BCFJTHKJN,
                                                                            hj: BCFJHJ,
                                                                            cj2: BCFJCJ2,

                                                                            test: BCFJTest,

                                                                            ds: BCFJSDensity.toFixed(4),
                                                                            rsel: BCFJRSEL.toFixed(4),
                                                                            cs1: BCFJCS1.toFixed(4),
                                                                            ost: BCFJOST.toFixed(4),
                                                                            os: BCFJOS.toFixed(4),

                                                                            dj: BCFJJDensity.toFixed(4),
                                                                            rjel: BCFJRJEL.toFixed(4),
                                                                            cj1: BCFJCJ1.toFixed(4),
                                                                            ojt: BCFJOJT.toFixed(4),
                                                                            oj: BCFJOJ.toFixed(4),

                                                                            pc: BCFJPC.toFixed(4),

                                                                            cs: BCFJCS.toFixed(4),
                                                                            thkse: BCFJTHKSE.toFixed(4),
                                                                            dc: BCFJDC.toFixed(4),

                                                                            cj: BCFJCJ.toFixed(4),
                                                                            thkje: BCFJTHKJE.toFixed(4),
                                                                            hje: BCFJHJE.toFixed(4),

                                                                            kp: BCFJKP.toFixed(4),

                                                                            thksc: BCFJTHKSC.toFixed(4),
                                                                            thksd: BCFJTHKSD.toFixed(4),
                                                                            thkschk: BCFJTHKSCHK,

                                                                            zx: BCFJZX.toFixed(4),
                                                                            ls: BCFJLS.toFixed(4),
                                                                            e1: BCFJE1.toFixed(4),
                                                                            e2: BCFJE2.toFixed(4),
                                                                            i: BCFJI.toFixed(4),
                                                                            zact: BCFJZACT.toFixed(4),
                                                                            zchk: BCFJZCHK,

                                                                            pt: BCFJTestPT.toFixed(4),
                                                                            mawp: BCFJMAWP.toFixed(4)
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
                                                                                BCFJPayJS.dialog({
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
                                                                                            BCFJPayJS.dialog("close");
                                                                                            BCFJPayJS.dialog("clear");
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
                                                                                                        BCFJPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFJPayJS.dialog('close');
                                                                                                                BCFJPayJS.dialog('clear');
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
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                }
                            });
                        }
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        })
    });
});