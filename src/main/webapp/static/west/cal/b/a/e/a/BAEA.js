$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let baeaSketch = $("#d2");
    let baeaModel = $("#d3");
    let baead2d3 = $('#d2d3');

    $("#cal").html("<table id='baea'></table>");
    let pg = $("#baea");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/a/e/a/BAEA.json", function (result) {

        let BAEADT;
        let BAEABCategory, BAEABCategoryVal, BAEABType, BAEABTypeVal, BAEABSTD, BAEABSTDVal, BAEABName, BAEABNameVal,
            BAEADCategory, BAEADCategoryVal, BAEADType, BAEADTypeVal, BAEADSTD, BAEADSTDVal, BAEADName, BAEADNameVal,
            BAEAGCategory, BAEAGCategoryVal, BAEAGType, BAEAGTypeVal, BAEAGSTD, BAEAGSTDVal, BAEAGName, BAEAGNameVal;
        let columns, rows, ed;

        function baea2d(h = "H", dgn = "dgn", lg = "Lg") {

            baeaSketch.empty();

            let width = baeaSketch.width();
            let height = baeaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BAEASVG").attr("height", height);

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
            let thk = 12;

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
                ])).attr("id", id).classed("sketch", true);

                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle").append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            // 底板
            svg.append("path").attr("d", line([
                {x: padding + wg - 7 * thk, y: height - padding},
                {x: padding + 3 * wg + 7 * thk, y: height - padding},
                {x: padding + 3 * wg + 7 * thk, y: height - padding + thk},
                {x: padding + wg - 7 * thk, y: height - padding + thk},
                {x: padding + wg - 7 * thk, y: height - padding}
            ])).classed("sketch", true);

            // 壁板
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: height - padding},
                {x: padding + wg - thk, y: padding + hg},
                {x: padding + wg, y: padding + hg},
                {x: padding + wg, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: height - padding},
                {x: padding + 3 * wg, y: padding + hg},
                {x: padding + 3 * wg + thk, y: padding + hg},
                {x: padding + 3 * wg + thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + hg},
                {x: padding + 3 * wg, y: padding + hg}
            ])).classed("sketch", true);

            // 角钢
            svg.append("path").attr("d", line([
                {x: padding + wg - thk, y: padding + hg},
                {x: padding + wg - thk, y: padding + hg - thk},
                {x: padding + wg - 6 * thk, y: padding + hg - thk},
                {x: padding + wg - 6 * thk, y: padding + hg},
                {x: padding + wg - 2 * thk, y: padding + hg},
                {x: padding + wg - 2 * thk, y: padding + hg + 4 * thk},
                {x: padding + wg - thk, y: padding + hg + 4 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 2 * thk, y: padding + hg + 4 * thk},
                {x: padding + wg - 2 * thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 6 * thk, y: padding + hg},
                {x: padding + wg - 6 * thk, y: height - padding}
            ])).classed("sketch", true);

            // 角钢
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk, y: padding + hg},
                {x: padding + 3 * wg + thk, y: padding + hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + hg - thk},
                {x: padding + 3 * wg + 6 * thk, y: padding + hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + hg},
                {x: padding + 3 * wg + 2 * thk, y: padding + hg + 4 * thk},
                {x: padding + 3 * wg + thk, y: padding + hg + 4 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 2 * thk, y: padding + hg + 4 * thk},
                {x: padding + 3 * wg + 2 * thk, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 6 * thk, y: padding + hg},
                {x: padding + 3 * wg + 6 * thk, y: height - padding}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - thk - thk - 3 * thk, y: padding + hg - thk},
                {x: padding + wg - thk - thk - 3 * thk, y: padding + hg - thk - 4 * thk},
                {x: padding + wg - thk - thk - thk, y: padding + hg - thk - 4 * thk},
                {x: padding + wg - thk - thk - thk, y: padding + hg - thk},
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk + thk + 3 * thk, y: padding + hg - thk},
                {x: padding + 3 * wg + thk + thk + 3 * thk, y: padding + hg - thk - 4 * thk},
                {x: padding + 3 * wg + thk + thk + thk, y: padding + hg - thk - 4 * thk},
                {x: padding + 3 * wg + thk + thk + thk, y: padding + hg - thk},
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - 3 * thk, y: padding + hg - 4 * thk},
                {x: padding + 3 * wg + 3 * thk, y: padding + hg - 4 * thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + wg - 3 * thk, y: padding + hg - 2 * thk},
                {x: padding + 3 * wg + 3 * thk, y: padding + hg - 2 * thk}
            ])).classed("sketch", true);

            drawCenterLine(padding + wg - 4 * thk, padding + hg - 5 * thk - 10, padding + wg - 4 * thk, height - padding + 10);
            drawCenterLine(padding + 3 * wg + 4 * thk, padding + hg - 5 * thk - 10, padding + 3 * wg + 4 * thk, height - padding + 10);

            drawCenterLine(padding + wg - 8 * thk, padding + hg - 3 * thk, padding + 3 * wg + 8 * thk, padding + hg - 3 * thk);

            drawLine(padding + wg - thk, padding + hg - thk, padding + 3 * wg + thk, padding + hg - thk);

            // h
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: height - padding},
                    {x: padding + 2.5 * wg - 3, y: height - padding - 15},
                    {x: padding + 2.5 * wg + 3, y: height - padding - 15},
                    {x: padding + 2.5 * wg, y: height - padding}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2.5 * wg, y: padding + hg - thk},
                    {x: padding + 2.5 * wg + 3, y: padding + hg - thk + 15},
                    {x: padding + 2.5 * wg - 3, y: padding + hg - thk + 15},
                    {x: padding + 2.5 * wg, y: padding + hg - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: height - padding - 15},
                {x: padding + 2.5 * wg, y: padding + hg - thk + 15}
            ])).attr("id", "BAEASketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAEASketchH")
                .attr("startOffset", "50%").text(h);

            dimTopH(padding + wg - 4 * thk, padding + hg - 5 * thk - 10, padding + 3 * wg + 4 * thk, padding + hg - 5 * thk - 10, lg, "BAEASketchLG");

            // DGN
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + hg - 4 * thk},
                    {x: padding + 1.5 * wg - 3, y: padding + hg - 4 * thk - 15},
                    {x: padding + 1.5 * wg + 3, y: padding + hg - 4 * thk - 15},
                    {x: padding + 1.5 * wg, y: padding + hg - 4 * thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg, y: padding + hg - 2 * thk},
                    {x: padding + 1.5 * wg + 3, y: padding + hg - 2 * thk + 15},
                    {x: padding + 1.5 * wg - 3, y: padding + hg - 2 * thk + 15},
                    {x: padding + 1.5 * wg, y: padding + hg - 2 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg - 4 * thk - 15 - 10},
                {x: padding + 1.5 * wg, y: padding + hg - 2 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg - 2 * thk + 15 + 60},
                {x: padding + 1.5 * wg, y: padding + hg - 2 * thk + 15}
            ])).attr("id", "BAEASketchDGN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BAEASketchDGN")
                .attr("startOffset", "50%").text(dgn);

            // 紧固件 X
            svg.append("path").attr("d", line([
                {x: padding + wg - 7.5 * thk, y: padding + hg - 3.5 * thk},
                {x: padding + wg - 6.5 * thk, y: padding + hg - 2.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - 7.5 * thk, y: padding + hg - 2.5 * thk},
                {x: padding + wg - 6.5 * thk, y: padding + hg - 3.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 7.5 * thk, y: padding + hg - 3.5 * thk},
                {x: padding + 3 * wg + 6.5 * thk, y: padding + hg - 2.5 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 7.5 * thk, y: padding + hg - 2.5 * thk},
                {x: padding + 3 * wg + 6.5 * thk, y: padding + hg - 3.5 * thk}
            ])).classed("sketch", true);
        }

        currentTabIndex = baead2d3.tabs('getTabIndex', baead2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            baea2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#baea").length > 0) {
                    baea2d();
                }
            });
        }
        baead2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    baea2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#baea").length > 0) {
                            baea2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 顶边加固、垂直加固、有拉杆矩形容器",
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
                if (index === 3) {
                    $(ed.target).combobox("loadData", BAEABCategory);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", BAEABType);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BAEABSTD);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BAEABName);
                }
                else if (index === 10) {
                    $(ed.target).combobox("loadData", BAEADCategory);
                }
                else if (index === 11) {
                    $(ed.target).combobox("loadData", BAEADType);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BAEADSTD);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BAEADName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BAEAGCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BAEAGType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BAEAGSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BAEAGName);
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
                    baeaSketch.empty();

                    // model
                    baeaModel.empty();

                    // sketch
                    currentTabIndex = baead2d3.tabs('getTabIndex', baead2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        baea2d();
                        baeaSketch.off("resize").on("resize", function () {
                            if ($("#baea").length > 0) {
                                baea2d();
                            }
                        });
                    }
                    baead2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baea2d();
                                baeaSketch.off("resize").on("resize", function () {
                                    if ($("#baea").length > 0) {
                                        baea2d();
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
                    if (index === 0) {

                        BAEADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        BAEABCategory = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAEABType = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAEABSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAEABName = null;

                        rows[10][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 10);
                        BAEADCategory = null;
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAEADType = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAEADSTD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAEADName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BAEAGCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAEAGType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAEAGSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAEAGName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEABCategory = [];
                                BAEADCategory = [];
                                BAEAGCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BAEADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BAEABCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAEADCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BAEAGCategory[index] = {
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

                    // category - type
                    if (index === 3) {

                        BAEABCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BAEABType = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAEABSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAEABName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEABCategoryVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEABType = [];
                                $(result).each(function (index, element) {
                                    BAEABType[index] = {
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

                    // type - std
                    if (index === 4) {

                        BAEABTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BAEABSTD = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAEABName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEABCategoryVal,
                                type: BAEABTypeVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEABSTD = [];
                                $(result).each(function (index, element) {
                                    BAEABSTD[index] = {
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

                    // std - Name
                    if (index === 5) {

                        BAEABSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BAEABName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEABCategoryVal,
                                type: BAEABTypeVal,
                                std: BAEABSTDVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEABName = [];
                                $(result).each(function (index, element) {
                                    BAEABName[index] = {
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

                    // category - type
                    if (index === 10) {

                        BAEADCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        BAEADType = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAEADSTD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAEADName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEADCategoryVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEADType = [];
                                $(result).each(function (index, element) {
                                    BAEADType[index] = {
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

                    // type - std
                    if (index === 11) {

                        BAEADTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BAEADSTD = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAEADName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEADCategoryVal,
                                type: BAEADTypeVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEADSTD = [];
                                $(result).each(function (index, element) {
                                    BAEADSTD[index] = {
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

                    // std - Name
                    if (index === 12) {

                        BAEADSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BAEADName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEADCategoryVal,
                                type: BAEADTypeVal,
                                std: BAEADSTDVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEADName = [];
                                $(result).each(function (index, element) {
                                    BAEADName[index] = {
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

                    // category - type
                    if (index === 14) {

                        BAEAGCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BAEAGType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAEAGSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAEAGName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEAGCategoryVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEAGType = [];
                                $(result).each(function (index, element) {
                                    BAEAGType[index] = {
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

                    // type - std
                    if (index === 15) {

                        BAEAGTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BAEAGSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAEAGName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEAGCategoryVal,
                                type: BAEAGTypeVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEAGSTD = [];
                                $(result).each(function (index, element) {
                                    BAEAGSTD[index] = {
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

                    // std - Name
                    if (index === 16) {

                        BAEAGSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BAEAGName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BAEAGCategoryVal,
                                type: BAEAGTypeVal,
                                std: BAEAGSTDVal,
                                temp: BAEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BAEAGName = [];
                                $(result).each(function (index, element) {
                                    BAEAGName[index] = {
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

                    // H
                    let BAEAH;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        BAEAH = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Sketch
                    if (currentTabIndex === 0) {
                        baea2d(BAEAH);
                        baeaSketch.off("resize").on("resize", function () {
                            if ($("#baea").length > 0) {
                                baea2d(BAEAH);
                            }
                        });
                    }
                    baead2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                baea2d(BAEAH);
                                baeaSketch.off("resize").on("resize", function () {
                                    if ($("#baea").length > 0) {
                                        baea2d(BAEAH);
                                    }
                                });
                            }
                        }
                    });

                    // D
                    let BAEAD;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BAEAD = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 壁板材料名称
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        BAEABNameVal = rows[6][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let BAEADB, BAEABThkMin, BAEABThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BAEABCategoryVal,
                            "type": BAEABTypeVal,
                            "std": BAEABSTDVal,
                            "name": BAEABNameVal,
                            "temp": BAEADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BAEADB = parseFloat(result.density);
                            BAEABThkMin = parseFloat(result.thkMin);
                            BAEABThkMax = parseFloat(result.thkMax);

                            // 壁板腐蚀裕量 CB2
                            let BAEACB2;
                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) < BAEABThkMax) {
                                BAEACB2 = parseFloat(rows[7][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                && parseFloat(rows[7][columns[0][1].field]) >= BAEABThkMax) {
                                south.html("壁板腐蚀裕量不能大于等于 " + BAEABThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 壁板名义厚度
                            let BAEATHKBN;
                            if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) > Math.max(BAEACB2, BAEABThkMin)
                                && parseFloat(rows[8][columns[0][1].field]) <= BAEABThkMax) {
                                BAEATHKBN = parseFloat(rows[8][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) <= Math.max(BAEACB2, BAEABThkMin)) {
                                south.html("壁板名义厚度不能小于等于 " + Math.max(BAEACB2, BAEABThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                && parseFloat(rows[8][columns[0][1].field]) > BAEABThkMax) {
                                south.html("壁板名义厚度不能大于 " + BAEABThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // ajax 获取 OBT EBT CB1
                            let BAEAOBT, BAEAEBT, BAEACB1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BAEABCategoryVal,
                                    "type": BAEABTypeVal,
                                    "std": BAEABSTDVal,
                                    "name": BAEABNameVal,
                                    "thk": BAEATHKBN,
                                    "temp": BAEADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BAEAOBT = parseFloat(result.ot);
                                    if (BAEAOBT < 0) {
                                        south.html("查询壁板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BAEACB1 = parseFloat(result.c1);
                                    if (BAEACB1 < 0) {
                                        south.html("查询壁板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    BAEAEBT = 1000 * parseFloat(result.et);
                                    if (BAEAEBT < 0) {
                                        south.html("查询壁板材料弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // WC
                                    let BAEAWC;
                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) >= 0.2 * BAEAH
                                        && parseFloat(rows[9][columns[0][1].field]) <= 10 * BAEAH) {
                                        BAEAWC = parseFloat(rows[9][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) < 0.2 * BAEAH) {
                                        south.html("垂直加固柱沿壁板方向间距不能小于 " + (0.2 * BAEAH).toFixed(2) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                        && parseFloat(rows[9][columns[0][1].field]) > 10 * BAEAH) {
                                        south.html("垂直加固柱沿壁板方向间距不能大于 " + 10 * BAEAH + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // 顶边加固件材料名称
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                        BAEADNameVal = rows[13][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // ajax 获取 EDT
                                    let BAEAEDT;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_e.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BAEADCategoryVal,
                                            "type": BAEADTypeVal,
                                            "std": BAEADSTDVal,
                                            "name": BAEADNameVal,
                                            "temp": BAEADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BAEAEDT = 1000 * parseFloat(result.et);
                                            if (BAEAEDT < 0) {
                                                south.html("查询加固件材料弹性模量失败！").css("color", "red");
                                                return false;
                                            }

                                            // 拉杆材料名称
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                BAEAGNameVal = rows[17][columns[0][1].field];
                                            }
                                            else {
                                                return false;
                                            }

                                            // AJAX 获取材料密度、最大最小厚度
                                            let BAEADG, BAEAGThkMin, BAEAGThkMax;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BAEAGCategoryVal,
                                                    "type": BAEAGTypeVal,
                                                    "std": BAEAGSTDVal,
                                                    "name": BAEAGNameVal,
                                                    "temp": BAEADT
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BAEADG = parseFloat(result.density);
                                                    BAEAGThkMin = parseFloat(result.thkMin);
                                                    BAEAGThkMax = parseFloat(result.thkMax);

                                                    // 拉杆腐蚀裕量 CG2
                                                    let BAEACG2;
                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) < BAEAGThkMax / 2) {
                                                        BAEACG2 = parseFloat(rows[18][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) >= BAEAGThkMax / 2) {
                                                        south.html("拉杆腐蚀裕量不能大于等于 " + BAEAGThkMax / 2 + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 拉杆直径 DGN
                                                    let BAEADGN;
                                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) > Math.max(BAEACG2, BAEAGThkMin)
                                                        && parseFloat(rows[19][columns[0][1].field]) <= BAEAGThkMax) {
                                                        BAEADGN = parseFloat(rows[19][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) <= Math.max(BAEACG2, BAEAGThkMin)) {
                                                        south.html("拉杆直径 dgn 不能小于等于 " + Math.max(BAEACG2, BAEAGThkMin) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                        && parseFloat(rows[19][columns[0][1].field]) > BAEAGThkMax) {
                                                        south.html("拉杆直径 dgn 不能大于 " + BAEAGThkMax + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        baea2d(BAEAH, BAEADGN);
                                                        baeaSketch.off("resize").on("resize", function () {
                                                            if ($("#baea").length > 0) {
                                                                baea2d(BAEAH, BAEADGN);
                                                            }
                                                        });
                                                    }
                                                    baead2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                baea2d(BAEAH, BAEADGN);
                                                                baeaSketch.off("resize").on("resize", function () {
                                                                    if ($("#baea").length > 0) {
                                                                        baea2d(BAEAH, BAEADGN);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // ajax 获取 OGT EGT CG1
                                                    let BAEAOGT, BAEAEGT, BAEACG1;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BAEAGCategoryVal,
                                                            "type": BAEAGTypeVal,
                                                            "std": BAEAGSTDVal,
                                                            "name": BAEAGNameVal,
                                                            "thk": BAEADGN,
                                                            "temp": BAEADT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 100000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BAEAOGT = parseFloat(result.ot);
                                                            if (BAEAOGT < 0) {
                                                                south.html("查询拉杆材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAEACG1 = parseFloat(result.c1);
                                                            if (BAEACG1 < 0) {
                                                                south.html("查询拉杆材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            BAEAEGT = 1000 * parseFloat(result.et);
                                                            if (BAEAEGT < 0) {
                                                                south.html("查询拉杆材料弹性模量失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // LG
                                                            let BAEALG;
                                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                                BAEALG = parseFloat(rows[20][columns[0][1].field]);
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                baea2d(BAEAH, BAEADGN, BAEALG);
                                                                baeaSketch.off("resize").on("resize", function () {
                                                                    if ($("#baea").length > 0) {
                                                                        baea2d(BAEAH, BAEADGN, BAEALG);
                                                                    }
                                                                });
                                                            }
                                                            baead2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        baea2d(BAEAH, BAEADGN, BAEALG);
                                                                        baeaSketch.off("resize").on("resize", function () {
                                                                            if ($("#baea").length > 0) {
                                                                                baea2d(BAEAH, BAEADGN, BAEALG);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 过程参数
                                                            let BAEAG = 9.81;
                                                            let BAEAPC = BAEAD * BAEAG * BAEAH / 1000000000;
                                                            let BAEACB = BAEACB1 + BAEACB2;
                                                            let BAEATHKBE = BAEATHKBN - BAEACB;
                                                            let BAEACG = BAEACG1 + 2 * BAEACG2;
                                                            let BAEADGE = BAEADGN - BAEACG;
                                                            let BAEAHWC = BAEAH / BAEAWC;

                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "nbt_47003_1_2009_table_8_7_get_alpha_and_beta.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "ba": BAEAHWC
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    let BAEAALPHA = parseFloat(result.alpha);
                                                                    let BAEABETA = parseFloat(result.beta);

                                                                    // 加固柱校核
                                                                    let BAEAWMAX = 0.408 * BAEATHKBE * Math.sqrt(BAEAOBT / (BAEAALPHA * BAEAPC));
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "垂直加固柱允许最大间距：" + BAEAWMAX.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    let BAEAWCCHK;
                                                                    if (BAEAWC <= BAEAWMAX) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际输入间距：" + BAEAWC + " mm" +
                                                                            "</span>");
                                                                        BAEAWCCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际输入间距：" + BAEAWC + " mm" +
                                                                            "</span>");
                                                                        BAEAWCCHK = "不合格";
                                                                    }
                                                                    let BAEAZP = BAEAWC * (0.0642 * BAEAPC * BAEAH * BAEAH / BAEAOBT - BAEATHKBE * BAEATHKBE / 6);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "垂直加固柱所需最小截面系数：" + BAEAZP.toFixed(4) + " mm³" +
                                                                        "</span>");

                                                                    // 壁板厚度
                                                                    let BAEATHKBC = 2.45 * BAEAWC * Math.sqrt(BAEAALPHA * BAEAPC / BAEAOBT);
                                                                    let BAEATHKBD = BAEATHKBC + BAEACB2;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "壁板所需厚度：" + (BAEATHKBD + BAEACB1).toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    let BAEATHKBCHK;
                                                                    if (BAEATHKBN >= (BAEATHKBD + BAEACB1)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + BAEATHKBN + " mm" +
                                                                            "</span>");
                                                                        BAEATHKBCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + BAEATHKBN + " mm" +
                                                                            "</span>");
                                                                        BAEATHKBCHK = "不合格";
                                                                    }

                                                                    // 壁板挠度
                                                                    let BAEAFALLOW = 5 * (BAEATHKBE / 2 + Math.sqrt(BAEAHWC) * BAEAWC / 500);
                                                                    let BAEAFMAX = BAEABETA * Math.pow(BAEAWC, 4) * BAEAPC / (BAEAEBT * Math.pow(BAEATHKBE, 3));

                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "壁板许用挠度：" + BAEAFALLOW.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    let BAEAFCHK;
                                                                    if (BAEAFMAX <= BAEAFALLOW) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际挠度：" + BAEAFMAX.toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        BAEAFCHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "实际挠度：" + BAEAFMAX.toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        BAEAFCHK = "不合格";
                                                                    }

                                                                    // 顶边加固件
                                                                    let BAEAICT = 0.217 * BAEAPC * BAEAH * BAEAWC * BAEAWC * BAEAWC / BAEAEDT;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "顶边加固件所需最小惯性矩：" + BAEAICT.toFixed(4) + " mm⁴" +
                                                                        "</span>");

                                                                    // 拉杆校核
                                                                    let BAEAOMAX = -1, BAEAOMAXCHK = -1, BAEADGC = -1,
                                                                        BAEADGD = -1, BAEADGCHK = -1;
                                                                    if (BAEALG >= 363 * Math.pow(BAEADGE, 2 / 3)) {
                                                                        BAEADGC = 0.553 * BAEAH * Math.sqrt(BAEAD * BAEAG * BAEAWC / BAEAOGT / 1000000000);
                                                                        BAEADGD = BAEADGC + 2 * BAEACG2;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "拉杆所需直径：" + (BAEADGD + BAEACG1).toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        if (BAEADGN >= (BAEADGD + BAEACG1)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入直径：" + BAEADGN + " mm" +
                                                                                "</span>");
                                                                            BAEADGCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入直径：" + BAEADGN + " mm" +
                                                                                "</span>");
                                                                            BAEADGCHK = "不合格";
                                                                        }
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "拉杆许用应力：" + BAEAOGT.toFixed(2) + " MPa" +
                                                                            "</span>");
                                                                        let BAEAOTW = 0.864 * BAEAEGT * BAEADGE * BAEADGE / (BAEALG * BAEALG);
                                                                        let BAEARNW = BAEADG * BAEAG * BAEALG * BAEALG / BAEADGE / 1000000000;
                                                                        let BAEAOLP = 0.306 * BAEAPC * BAEAH * BAEAWC / (BAEADGE * BAEADGE);
                                                                        BAEAOMAX = BAEAOTW + BAEARNW + BAEAOLP;
                                                                        if (BAEAOMAX <= BAEAOGT) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际应力：" + BAEAOMAX.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                            BAEAOMAXCHK = "合格";
                                                                        } else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际应力：" + BAEAOMAX.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                            BAEAOMAXCHK = "不合格";
                                                                        }
                                                                    }

                                                                    // docx
                                                                    let BAEAPayJS = $('#payjs');

                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "baeadocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "BAEA",

                                                                                t: BAEADT,
                                                                                h: BAEAH,
                                                                                d: BAEAD,
                                                                                bstd: BAEABSTDVal,
                                                                                bname: BAEABNameVal,
                                                                                cb2: BAEACB2,
                                                                                thkbn: BAEATHKBN,
                                                                                wc: BAEAWC,
                                                                                dstd: BAEADSTDVal,
                                                                                dname: BAEADNameVal,
                                                                                gstd: BAEAGSTDVal,
                                                                                gname: BAEAGNameVal,
                                                                                dgn: BAEADGN,
                                                                                lg: BAEALG,
                                                                                cg2: BAEACG2,
                                                                                db: BAEADB.toFixed(4),
                                                                                cb1: BAEACB1.toFixed(4),
                                                                                obt: BAEAOBT.toFixed(4),
                                                                                ebt: (BAEAEBT / 1000).toFixed(4),
                                                                                dg: BAEADG.toFixed(4),
                                                                                cg1: BAEACG1.toFixed(4),
                                                                                ogt: BAEAOGT.toFixed(4),
                                                                                egt: (BAEAEGT / 1000).toFixed(4),
                                                                                edt: (BAEAEDT / 1000).toFixed(4),
                                                                                g: BAEAG.toFixed(4),
                                                                                pc: BAEAPC.toFixed(4),
                                                                                cb: BAEACB.toFixed(4),
                                                                                thkbe: BAEATHKBE.toFixed(4),
                                                                                cg: BAEACG.toFixed(4),
                                                                                dge: BAEADGE.toFixed(4),
                                                                                hwc: BAEAHWC.toFixed(4),
                                                                                alpha: BAEAALPHA.toFixed(8),
                                                                                beta: BAEABETA.toFixed(8),
                                                                                wmax: BAEAWMAX.toFixed(4),
                                                                                wcchk: BAEAWCCHK,
                                                                                zp: BAEAZP.toFixed(4),
                                                                                thkbc: BAEATHKBC.toFixed(4),
                                                                                thkbd: BAEATHKBD.toFixed(4),
                                                                                thkbchk: BAEATHKBCHK,
                                                                                fallow: BAEAFALLOW.toFixed(4),
                                                                                fmax: BAEAFMAX.toFixed(4),
                                                                                fchk: BAEAFCHK,
                                                                                ict: BAEAICT.toFixed(4),
                                                                                dgc: BAEADGC.toFixed(4),
                                                                                dgd: BAEADGD.toFixed(4),
                                                                                dgchk: BAEADGCHK,
                                                                                omax: BAEAOMAX.toFixed(4),
                                                                                omaxchk: BAEAOMAXCHK
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
                                                                                    BAEAPayJS.dialog({
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
                                                                                                baeakground: "#ffffff",
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
                                                                                                BAEAPayJS.dialog("close");
                                                                                                BAEAPayJS.dialog("clear");
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
                                                                                                            BAEAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    BAEAPayJS.dialog('close');
                                                                                                                    BAEAPayJS.dialog('clear');
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
                                                                        "<span style='color:red;'>&ensp;查表 8-7 获取 α、β失败，请检查网络后重试</span>");
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});