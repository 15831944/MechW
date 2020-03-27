$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcfkSketch = $("#d2");
    let bcfkModel = $("#d3");
    let bcfkd2d3 = $('#d2d3');

    $("#cal").html("<table id='bcfk'></table>");
    let pg = $("#bcfk");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/f/k/BCFK.json", function (result) {

        let BCFKDT,
            BCFKSCategory, BCFKSCategoryVal, BCFKSType, BCFKSTypeVal, BCFKSSTD, BCFKSSTDVal, BCFKSName, BCFKSNameVal,
            BCFKJCategory, BCFKJCategoryVal, BCFKJType, BCFKJTypeVal, BCFKJSTD, BCFKJSTDVal, BCFKJName, BCFKJNameVal,
            columns, rows, ed;

        function bcfk2d(dsi = "ϕDsi", ls = "0.3Dsi", thksn = "δsn", thkjn = "δjn", hj = "hj") {

            bcfkSketch.empty();

            let width = bcfkSketch.width();
            let height = bcfkSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCFKSVG").attr("height", height);

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
            drawLine(padding + 0.7 * wg - thk / 2, height / 2 - 3 * thk, padding + 0.7 * wg - thk / 2, height / 2);
            drawLine(padding + 0.7 * wg + thk / 2, height / 2 - 3 * thk, padding + 0.7 * wg + thk / 2, height / 2);
            drawLine(padding + 1.3 * wg - thk / 2, height / 2 - 3 * thk, padding + 1.3 * wg - thk / 2, height / 2);
            drawLine(padding + 1.3 * wg + thk / 2, height / 2 - 3 * thk, padding + 1.3 * wg + thk / 2, height / 2);

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
            drawLine(cx0 - 0.3 * r0 - thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 - 0.3 * r0 - thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawLine(cx0 - 0.3 * r0 + thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 - 0.3 * r0 + thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawLine(cx0 + 0.3 * r0 - thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 + 0.3 * r0 - thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawLine(cx0 + 0.3 * r0 + thk / 2, cy0 - r0 + thk + 0.046 * r0, cx0 + 0.3 * r0 + thk / 2, cy0 + r0 - thk - 0.046 * r0);
            drawCenterLine(cx0 - 0.3 * r0, cy0 - r0 + thk + 0.046 * r0 - 10, cx0 - 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10);
            drawCenterLine(cx0 + 0.3 * r0, cy0 - r0 + thk + 0.046 * r0 - 10, cx0 + 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10);

            dimBottomH(cx0 - 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10, cx0 + 0.3 * r0, cy0 + r0 - thk - 0.046 * r0 + 10, ls, "BCFKSketchLS");

            // dsi
            dimBottomH(padding + thk, height / 2 + hg, width / 2 - thk, height / 2 + hg, dsi, "BCFKSketchDSI");

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
            ])).attr("id", "BCFKSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFKSketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ])).attr("id", "BCFKSketchHJ").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFKSketchHJ").attr("startOffset", "50%").text(hj);

            // thkjn
            extLineTopV(padding + 0.7 * wg + thk / 2, height / 2 - 3 * thk);
            extLineTopV(padding + 0.7 * wg - thk / 2, height / 2 - 3 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.7 * wg + thk / 2, y: height / 2 - 3 * thk - 30},
                    {x: padding + 0.7 * wg + thk / 2 + 15, y: height / 2 - 3 * thk - 27},
                    {x: padding + 0.7 * wg + thk / 2 + 15, y: height / 2 - 3 * thk - 33},
                    {x: padding + 0.7 * wg + thk / 2, y: height / 2 - 3 * thk - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.7 * wg - thk / 2, y: height / 2 - 3 * thk - 30},
                    {x: padding + 0.7 * wg - thk / 2 - 15, y: height / 2 - 3 * thk - 27},
                    {x: padding + 0.7 * wg - thk / 2 - 15, y: height / 2 - 3 * thk - 33},
                    {x: padding + 0.7 * wg - thk / 2, y: height / 2 - 3 * thk - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.7 * wg - thk / 2 - 15 - 10, y: height / 2 - 3 * thk - 30},
                {x: padding + 0.7 * wg + thk / 2, y: height / 2 - 3 * thk - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.7 * wg + thk / 2 + 15, y: height / 2 - 3 * thk - 30},
                {x: padding + 0.7 * wg + thk / 2 + 15 + 40, y: height / 2 - 3 * thk - 30}
            ])).attr("id", "BCFKSketchTHKJN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFKSketchTHKJN")
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
            ])).attr("id", "BCFKSketchAJ");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFKSketchAJ").attr("startOffset", "50%").text("A");

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg - 10, y: padding + 0.75 * hg - 35},
                {x: padding + 3 * wg + 10, y: padding + 0.75 * hg - 35}
            ])).attr("id", "BCFKSketchAX");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCFKSketchAX").attr("startOffset", "50%").text("A向");

        }

        currentTabIndex = bcfkd2d3.tabs('getTabIndex', bcfkd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcfk2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcfk").length > 0) {
                    bcfk2d();
                }
            });
        }
        bcfkd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcfk2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcfk").length > 0) {
                            bcfk2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 序号11筋板加强圆平盖计算",
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
                    $(ed.target).combobox("loadData", BCFKSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCFKSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCFKSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCFKSName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCFKJCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCFKJType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCFKJSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCFKJName);
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
                    bcfkSketch.empty();

                    // model
                    bcfkModel.empty();

                    // sketch
                    currentTabIndex = bcfkd2d3.tabs('getTabIndex', bcfkd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcfk2d();
                        bcfkSketch.off("resize").on("resize", function () {
                            if ($("#bcfk").length > 0) {
                                bcfk2d();
                            }
                        });
                    }
                    bcfkd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcfk2d();
                                bcfkSketch.off("resize").on("resize", function () {
                                    if ($("#bcfk").length > 0) {
                                        bcfk2d();
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

                        BCFKDT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCFKSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFKSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFKSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFKSName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCFKJCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFKJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFKJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFKJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCFKDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFKSCategory = [];
                                BCFKJCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCFKDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCFKSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCFKJCategory[index] = {
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

                        BCFKSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCFKSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFKSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFKSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFKSCategoryVal,
                                temp: BCFKDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFKSType = [];
                                $(result).each(function (index, element) {
                                    BCFKSType[index] = {
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

                        BCFKSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCFKSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFKSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFKSCategoryVal,
                                type: BCFKSTypeVal,
                                temp: BCFKDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFKSSTD = [];
                                $(result).each(function (index, element) {
                                    BCFKSSTD[index] = {
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

                        BCFKSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCFKSName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFKSCategoryVal,
                                type: BCFKSTypeVal,
                                std: BCFKSSTDVal,
                                temp: BCFKDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFKSName = [];
                                $(result).each(function (index, element) {
                                    BCFKSName[index] = {
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

                        BCFKJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCFKJType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFKJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFKJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFKJCategoryVal,
                                temp: BCFKDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFKJType = [];
                                $(result).each(function (index, element) {
                                    BCFKJType[index] = {
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

                        BCFKJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCFKJSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFKJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFKJCategoryVal,
                                type: BCFKJTypeVal,
                                temp: BCFKDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFKJSTD = [];
                                $(result).each(function (index, element) {
                                    BCFKJSTD[index] = {
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

                        BCFKJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCFKJName = null;

                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCFKJCategoryVal,
                                type: BCFKJTypeVal,
                                std: BCFKJSTDVal,
                                temp: BCFKDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCFKJName = [];
                                $(result).each(function (index, element) {
                                    BCFKJName[index] = {
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
                        let BCFKPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCFKPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // ps
                        let BCFKPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCFKPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCFKTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCFKTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 平盖材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCFKSNameVal = rows[7][columns[0][1].field];

                            // 平盖材料密度、最大最小厚度
                            let BCFKSDensity, BCFKSThkMin, BCFKSThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCFKSCategoryVal,
                                    "type": BCFKSTypeVal,
                                    "std": BCFKSSTDVal,
                                    "name": BCFKSNameVal,
                                    "temp": BCFKDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCFKSDensity = parseFloat(result.density);
                                    BCFKSThkMin = parseFloat(result.thkMin);
                                    BCFKSThkMax = parseFloat(result.thkMax);

                                    // 内直径
                                    let BCFKDSI;
                                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                        BCFKDSI = parseFloat(rows[8][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1));
                                        bcfkSketch.off("resize").on("resize", function () {
                                            if ($("#bcfk").length > 0) {
                                                bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1));
                                            }
                                        });
                                    }
                                    bcfkd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1));
                                                bcfkSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfk").length > 0) {
                                                        bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1));
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 名义厚度 thksn
                                    let BCFKTHKSN;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFKSThkMin
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFKSThkMax) {
                                        BCFKTHKSN = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) <= BCFKSThkMin) {
                                        south.html("平盖材料厚度不能小于等于 " + BCFKSThkMin + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > BCFKSThkMax) {
                                        south.html("平盖材料厚度不能大于 " + BCFKSThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN);
                                        bcfkSketch.off("resize").on("resize", function () {
                                            if ($("#bcfk").length > 0) {
                                                bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN);
                                            }
                                        });
                                    }
                                    bcfkd2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN);
                                                bcfkSketch.off("resize").on("resize", function () {
                                                    if ($("#bcfk").length > 0) {
                                                        bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                    let BCFKOST, BCFKOS, BCFKRSEL, BCFKCS1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCFKSCategoryVal,
                                            "type": BCFKSTypeVal,
                                            "std": BCFKSSTDVal,
                                            "name": BCFKSNameVal,
                                            "thk": BCFKTHKSN,
                                            "temp": BCFKDT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 10000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCFKOST = parseFloat(result.ot);
                                            if (BCFKOST < 0) {
                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFKOS = parseFloat(result.o);
                                            if (BCFKOS < 0) {
                                                south.html("查询材料常温许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFKRSEL = parseFloat(result.rel);
                                            if (BCFKRSEL < 0) {
                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                return false;
                                            }
                                            BCFKCS1 = parseFloat(result.c1);
                                            if (BCFKCS1 < 0) {
                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 平盖腐蚀裕量
                                            let BCFKCS2;
                                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) < BCFKTHKSN) {
                                                BCFKCS2 = parseFloat(rows[10][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                && parseFloat(rows[10][columns[0][1].field]) >= BCFKTHKSN) {
                                                south.html("平盖腐蚀裕量不能大于等于 " + BCFKTHKSN + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // 平盖焊接接头系数
                                            let BCFKES;
                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                BCFKES = parseFloat(rows[11][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 加强筋材料名称
                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                                BCFKJNameVal = rows[15][columns[0][1].field];

                                                // 加强筋材料密度、最大最小厚度
                                                let BCFKJDensity, BCFKJThkMin, BCFKJThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCFKJCategoryVal,
                                                        "type": BCFKJTypeVal,
                                                        "std": BCFKJSTDVal,
                                                        "name": BCFKJNameVal,
                                                        "temp": BCFKDT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCFKJDensity = parseFloat(result.density);
                                                        BCFKJThkMin = parseFloat(result.thkMin);
                                                        BCFKJThkMax = parseFloat(result.thkMax);

                                                        // 名义厚度 thkjn
                                                        let BCFKTHKJN;
                                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFKJThkMin
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFKJThkMax) {
                                                            BCFKTHKJN = parseFloat(rows[16][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) <= BCFKJThkMin) {
                                                            south.html("加强筋材料厚度不能小于等于 " + BCFKJThkMin + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                            && parseFloat(rows[16][columns[0][1].field]) > BCFKJThkMax) {
                                                            south.html("加强筋材料厚度不能大于 " + BCFKJThkMax + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN, BCFKTHKJN);
                                                            bcfkSketch.off("resize").on("resize", function () {
                                                                if ($("#bcfk").length > 0) {
                                                                    bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN, BCFKTHKJN);
                                                                }
                                                            });
                                                        }
                                                        bcfkd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN, BCFKTHKJN);
                                                                    bcfkSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfk").length > 0) {
                                                                            bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN, BCFKTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // ajax 获取 设计应力、常温应力、常温屈服强度、厚度负偏差
                                                        let BCFKOJT, BCFKOJ, BCFKRJEL, BCFKCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCFKJCategoryVal,
                                                                "type": BCFKJTypeVal,
                                                                "std": BCFKJSTDVal,
                                                                "name": BCFKJNameVal,
                                                                "thk": BCFKTHKJN,
                                                                "temp": BCFKDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": 100000
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCFKOJT = parseFloat(result.ot);
                                                                if (BCFKOJT < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFKOJ = parseFloat(result.o);
                                                                if (BCFKOJ < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFKRJEL = parseFloat(result.rel);
                                                                if (BCFKRJEL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCFKCJ1 = parseFloat(result.c1);
                                                                if (BCFKCJ1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 加强筋高度 HJ
                                                                let BCFKHJ;
                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) <= 16 * BCFKTHKJN) {
                                                                    BCFKHJ = parseFloat(rows[17][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                    && parseFloat(rows[17][columns[0][1].field]) > 16 * BCFKTHKJN) {
                                                                    south.html("加强筋高度 hj 不能大于 " + 16 * BCFKTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN, BCFKTHKJN, BCFKHJ);
                                                                    bcfkSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcfk").length > 0) {
                                                                            bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN, BCFKTHKJN, BCFKHJ);
                                                                        }
                                                                    });
                                                                }
                                                                bcfkd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN, BCFKTHKJN, BCFKHJ);
                                                                            bcfkSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcfk").length > 0) {
                                                                                    bcfk2d("Φ" + BCFKDSI, (0.3 * BCFKDSI).toFixed(1), BCFKTHKSN, BCFKTHKJN, BCFKHJ);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 加强筋腐蚀裕量
                                                                let BCFKCJ2;
                                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) < BCFKTHKJN) {
                                                                    BCFKCJ2 = parseFloat(rows[18][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                    && parseFloat(rows[18][columns[0][1].field]) >= BCFKTHKJN) {
                                                                    south.html("加强筋腐蚀裕量不能大于等于 " + BCFKTHKJN + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                let BCFKPC = BCFKPD + BCFKPS;

                                                                let BCFKCS = BCFKCS1 + BCFKCS2;
                                                                let BCFKTHKSE = BCFKTHKSN - BCFKCS;
                                                                let BCFKDC = BCFKDSI + 2 * BCFKCS2;

                                                                let BCFKCJ = BCFKCJ1 + BCFKCJ2;
                                                                let BCFKTHKJE = BCFKTHKJN - BCFKCJ;
                                                                let BCFKHJE = BCFKHJ - BCFKCJ2;

                                                                let BCFKKP = 0.08;
                                                                let BCFKTHKSC = BCFKDC * Math.sqrt(BCFKKP * BCFKPC / (BCFKOST * BCFKES));
                                                                let BCFKTHKSD = BCFKTHKSC + BCFKCS2;
                                                                south.html(
                                                                    "<span style='color:#444444;'>" +
                                                                    "平盖所需厚度：" + (BCFKTHKSD + BCFKCS1).toFixed(2) + " mm" +
                                                                    "</span>");
                                                                let BCFKTHKSCHK;
                                                                if (BCFKTHKSN >= (BCFKTHKSD + BCFKCS1).toFixed(2)) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFKTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFKTHKSCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "输入厚度：" + BCFKTHKSN + " mm" +
                                                                        "</span>");
                                                                    BCFKTHKSCHK = "不合格";
                                                                }

                                                                let BCFKZX = 0.041 * BCFKPC * BCFKDC * BCFKDC * BCFKDC / BCFKOST;
                                                                let BCFKLS = 20 * BCFKTHKSE;
                                                                let BCFKE1 = (BCFKTHKJE * (BCFKHJE + BCFKTHKSE) * (BCFKHJE + BCFKTHKSE) + (BCFKLS - BCFKTHKJE) * BCFKTHKSE * BCFKTHKSE)
                                                                    / (2 * (BCFKTHKJE * (BCFKHJE + BCFKTHKSE) + (BCFKLS - BCFKTHKJE) * BCFKTHKSE));
                                                                let BCFKE2 = BCFKHJE + BCFKTHKSE - BCFKE1;
                                                                let BCFKI = (BCFKLS * BCFKE1 * BCFKE1 * BCFKE1 - (BCFKLS - BCFKTHKJE) * (BCFKE1 - BCFKTHKSE) * (BCFKE1 - BCFKTHKSE) * (BCFKE1 - BCFKTHKSE) + BCFKTHKJE * BCFKE2 * BCFKE2 * BCFKE2) / 3;
                                                                let BCFKZACT = BCFKI / Math.max(BCFKE1, BCFKE2);
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "所需截面系数：" + BCFKZX.toFixed(4) + " mm³" +
                                                                    "</span>");
                                                                let BCFKZCHK;
                                                                if (BCFKZACT >= BCFKZX) {
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFKZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFKZCHK = "合格";
                                                                }
                                                                else {
                                                                    south.append(
                                                                        "<span style='color:red;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "实际截面系数：" + BCFKZACT.toFixed(2) + " mm³" +
                                                                        "</span>");
                                                                    BCFKZCHK = "不合格";
                                                                }

                                                                // 压力试验
                                                                let BCFKTestPT;
                                                                if (BCFKTest === "液压试验") {
                                                                    BCFKTestPT = Math.max(1.25 * BCFKPD * BCFKOS / BCFKOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：液压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFKTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }
                                                                else if (BCFKTest === "气压试验") {
                                                                    BCFKTestPT = Math.max(1.10 * BCFKPD * BCFKOS / BCFKOST, 0.05);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试压类型：气压" +
                                                                        "&ensp;|&ensp;" +
                                                                        "试验压力：" + BCFKTestPT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                }

                                                                // MAWP
                                                                let BCFKMAWP = BCFKTHKSE * BCFKTHKSE * BCFKOST * BCFKES / (BCFKKP * BCFKDC * BCFKDC) - BCFKPS;
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "MAWP：" + BCFKMAWP.toFixed(4) + " MPa" +
                                                                    "</span>");

                                                                // docx
                                                                let BCFKPayJS = $('#payjs');

                                                                function getDocx() {
                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "bcfkdocx.action",
                                                                        async: true,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            ribbonName: "BCFK",

                                                                            t: BCFKDT,
                                                                            pd: BCFKPD,
                                                                            ps: BCFKPS,

                                                                            stds: BCFKSSTDVal,
                                                                            names: BCFKSNameVal,
                                                                            dsi: BCFKDSI,
                                                                            thksn: BCFKTHKSN,
                                                                            cs2: BCFKCS2,
                                                                            es: BCFKES,

                                                                            stdj: BCFKJSTDVal,
                                                                            namej: BCFKJNameVal,
                                                                            thkjn: BCFKTHKJN,
                                                                            hj: BCFKHJ,
                                                                            cj2: BCFKCJ2,

                                                                            test: BCFKTest,

                                                                            ds: BCFKSDensity.toFixed(4),
                                                                            rsel: BCFKRSEL.toFixed(4),
                                                                            cs1: BCFKCS1.toFixed(4),
                                                                            ost: BCFKOST.toFixed(4),
                                                                            os: BCFKOS.toFixed(4),

                                                                            dj: BCFKJDensity.toFixed(4),
                                                                            rjel: BCFKRJEL.toFixed(4),
                                                                            cj1: BCFKCJ1.toFixed(4),
                                                                            ojt: BCFKOJT.toFixed(4),
                                                                            oj: BCFKOJ.toFixed(4),

                                                                            pc: BCFKPC.toFixed(4),

                                                                            cs: BCFKCS.toFixed(4),
                                                                            thkse: BCFKTHKSE.toFixed(4),
                                                                            dc: BCFKDC.toFixed(4),

                                                                            cj: BCFKCJ.toFixed(4),
                                                                            thkje: BCFKTHKJE.toFixed(4),
                                                                            hje: BCFKHJE.toFixed(4),

                                                                            kp: BCFKKP.toFixed(4),

                                                                            thksc: BCFKTHKSC.toFixed(4),
                                                                            thksd: BCFKTHKSD.toFixed(4),
                                                                            thkschk: BCFKTHKSCHK,

                                                                            zx: BCFKZX.toFixed(4),
                                                                            ls: BCFKLS.toFixed(4),
                                                                            e1: BCFKE1.toFixed(4),
                                                                            e2: BCFKE2.toFixed(4),
                                                                            i: BCFKI.toFixed(4),
                                                                            zact: BCFKZACT.toFixed(4),
                                                                            zchk: BCFKZCHK,

                                                                            pt: BCFKTestPT.toFixed(4),
                                                                            mawp: BCFKMAWP.toFixed(4)
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
                                                                                BCFKPayJS.dialog({
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
                                                                                            BCFKPayJS.dialog("close");
                                                                                            BCFKPayJS.dialog("clear");
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
                                                                                                        BCFKPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                BCFKPayJS.dialog('close');
                                                                                                                BCFKPayJS.dialog('clear');
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