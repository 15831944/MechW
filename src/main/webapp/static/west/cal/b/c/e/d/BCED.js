$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcedSketch = $("#d2");
    let bcedModel = $("#d3");
    let bcedd2d3 = $('#d2d3');

    $("#cal").html("<table id='bced'></table>");
    let pg = $("#bced");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/e/d/BCED.json", function (result) {

        let BCEDDT;
        let BCEDCCategory, BCEDCCategoryVal, BCEDCType, BCEDCTypeVal, BCEDCSTD, BCEDCSTDVal, BCEDCName, BCEDCNameVal,
            BCEDSCategory, BCEDSCategoryVal, BCEDSType, BCEDSTypeVal, BCEDSSTD, BCEDSSTDVal, BCEDSName, BCEDSNameVal,
            BCEDPCategory, BCEDPCategoryVal, BCEDPType, BCEDPTypeVal, BCEDPSTD, BCEDPSTDVal, BCEDPName, BCEDPNameVal;
        let columns, rows, ed;

        function bced2d(dsi = "ΦDsi", dpi = "ΦDpi", alpha = "α", thkcn = "δcn", thksn = "δsn", thkpn = "δpn") {

            bcedSketch.empty();

            let width = bcedSketch.width();
            let height = bcedSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCEDSVG").attr("height", height);

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
            let padding = 100;
            let thk = 10;

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
            function dimBottomH(startX, startY, endX, endY, text) {

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
                ])).attr("id", "BCEBSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCEBSketchDI").attr("startOffset", "50%").text(text);

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

            // sketch
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding - thk},
                {x: padding + 3 * wg, y: padding - thk},
                {x: padding + wg, y: padding + 1.5 * hg - thk},
                {x: padding, y: padding + 1.5 * hg - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding},
                {x: padding + 3 * wg, y: padding},
                {x: padding + wg, y: padding + 1.5 * hg},
                {x: padding, y: padding + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding + 4 * hg},
                {x: padding + 3 * wg, y: padding + 4 * hg},
                {x: padding + wg, y: padding + 2.5 * hg},
                {x: padding, y: padding + 2.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding + 4 * hg + thk},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk},
                {x: padding + wg, y: padding + 2.5 * hg + thk},
                {x: padding, y: padding + 2.5 * hg + thk}
            ])).classed("sketch", true);

            svg.append("path").attr("d", line([
                {x: padding + 4 * wg, y: padding - thk},
                {x: padding + 4 * wg, y: padding + 4 * hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding - thk},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 1.5 * hg - thk},
                {x: padding + wg, y: padding + 2.5 * hg + thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 1.5 * hg - thk},
                {x: padding, y: padding + 2.5 * hg + thk}
            ])).classed("sketch", true);

            drawCenterLine(padding - 10, height / 2, padding + 4 * wg + 10, height / 2);

            // dsi
            dimRightV(padding + 4 * wg, padding + 4 * hg, padding + 4 * wg, padding, dsi, "BCEDSketchDSI");

            // thksn
            extLineRightH(padding + 4 * wg, padding - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 4 * wg + 30, y: padding - thk},
                    {x: padding + 4 * wg + 27, y: padding - thk - 15},
                    {x: padding + 4 * wg + 33, y: padding - thk - 15},
                    {x: padding + 4 * wg + 30, y: padding - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg + 30, y: padding - thk},
                {x: padding + 4 * wg + 30, y: padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 4 * wg + 30, y: padding - thk - 15},
                {x: padding + 4 * wg + 30, y: padding - thk - 15 - 40}
            ])).attr("id", "BCEDSketchTHKSN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEDSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // dpi
            dimLeftV(padding, padding + 2.5 * hg, padding, padding + 1.5 * hg, dpi, "BCEDSketchDPI");

            // thkpn
            extLineRightH(padding, padding + 1.5 * hg - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 30, y: padding + 1.5 * hg - thk},
                    {x: padding - 27, y: padding + 1.5 * hg - thk - 15},
                    {x: padding - 33, y: padding + 1.5 * hg - thk - 15},
                    {x: padding - 30, y: padding + 1.5 * hg - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding + 1.5 * hg - thk},
                {x: padding - 30, y: padding + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding + 1.5 * hg - thk - 15},
                {x: padding - 30, y: padding + 1.5 * hg - thk - 15 - 40}
            ])).attr("id", "BCEDSketchTHKPN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEDSketchTHKPN").attr("startOffset", "50%").text(thkpn);

            // thkcn
            let rad = Math.atan(1.5 * hg / (2 * wg));
            let ang = rad / Math.PI * 180;
            let centerX = padding + 3 * wg - 2 * hg / Math.tan(rad);
            let centerY = height / 2;
            svg.append("path").attr("d", line([
                {x: width / 2, y: centerY + thk + 15 + 40},
                {x: width / 2, y: centerY + thk + 15}
            ])).attr("id", "BCEDSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEDSketchTHKCN").attr("startOffset", "50%").text(thkcn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY - 15},
                    {x: width / 2 + 3, y: centerY - 15},
                    {x: width / 2, y: centerY}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY - 15 - 15},
                    {x: width / 2, y: centerY - 15}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2, y: centerY + thk}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY + thk},
                    {x: width / 2 - 3, y: centerY + thk + 15},
                    {x: width / 2 + 3, y: centerY + thk + 15},
                    {x: width / 2, y: centerY + thk}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");

            // alpha
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY - 15},
                    {x: width / 2 + 3, y: centerY - 15},
                    {x: width / 2, y: centerY}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: centerY},
                    {x: width / 2 - 3, y: centerY + 15},
                    {x: width / 2 + 3, y: centerY + 15},
                    {x: width / 2, y: centerY}
                ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            let adimradius = width / 2 - centerX;
            svg.append("path").attr("d", "M "
                + (centerX + adimradius * Math.cos(rad)) + " " + (centerY - adimradius * Math.sin(rad)) + " "
                + "A" + adimradius + " " + adimradius + " "
                + "1 0 1" + " "
                + (width / 2) + " " + (centerY)
            ).classed("sketch", true).attr("id", "BCEDSketchALPHA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCEDSketchALPHA").attr("startOffset", "50%").text(alpha);
        }

        currentTabIndex = bcedd2d3.tabs('getTabIndex', bcedd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bced2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bced").length > 0) {
                    bced2d();
                }
            });
        }
        bcedd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bced2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bced").length > 0) {
                            bced2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 锥壳内压强度校核",
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

                if (index === 4) {
                    $(ed.target).combobox("loadData", BCEDCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCEDCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCEDCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCEDCName);
                }

                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCEDSCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCEDSType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BCEDSSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BCEDSName);
                }

                else if (index === 21) {
                    $(ed.target).combobox("loadData", BCEDPCategory);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BCEDPType);
                }
                else if (index === 23) {
                    $(ed.target).combobox("loadData", BCEDPSTD);
                }
                else if (index === 24) {
                    $(ed.target).combobox("loadData", BCEDPName);
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
                    bcedSketch.empty();

                    // model
                    bcedModel.empty();

                    // sketch
                    currentTabIndex = bcedd2d3.tabs('getTabIndex', bcedd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bced2d();
                        bcedSketch.off("resize").on("resize", function () {
                            if ($("#bced").length > 0) {
                                bced2d();
                            }
                        });
                    }
                    bcedd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bced2d();
                                bcedSketch.off("resize").on("resize", function () {
                                    if ($("#bced").length > 0) {
                                        bced2d();
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

                        BCEDDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCEDCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEDCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEDCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEDCName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCEDSCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEDSType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCEDSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BCEDSName = null;

                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCEDPCategory = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCEDPType = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCEDPSTD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BCEDPName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDCCategory = [];
                                BCEDSCategory = [];
                                BCEDPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCEDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCEDCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCEDSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCEDPCategory[index] = {
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

                        BCEDCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEDCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEDCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEDCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDCCategoryVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDCType = [];
                                $(result).each(function (index, element) {
                                    BCEDCType[index] = {
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

                        BCEDCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEDCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEDCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDCCategoryVal,
                                type: BCEDCTypeVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDCSTD = [];
                                $(result).each(function (index, element) {
                                    BCEDCSTD[index] = {
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

                        BCEDCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEDCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDCCategoryVal,
                                type: BCEDCTypeVal,
                                std: BCEDCSTDVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDCName = [];
                                $(result).each(function (index, element) {
                                    BCEDCName[index] = {
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
                    else if (index === 14) {

                        BCEDSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCEDSType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCEDSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BCEDSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDSCategoryVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDSType = [];
                                $(result).each(function (index, element) {
                                    BCEDSType[index] = {
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
                    else if (index === 15) {

                        BCEDSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCEDSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BCEDSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDSCategoryVal,
                                type: BCEDSTypeVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDSSTD = [];
                                $(result).each(function (index, element) {
                                    BCEDSSTD[index] = {
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
                    else if (index === 16) {

                        BCEDSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BCEDSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDSCategoryVal,
                                type: BCEDSTypeVal,
                                std: BCEDSSTDVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDSName = [];
                                $(result).each(function (index, element) {
                                    BCEDSName[index] = {
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
                    else if (index === 21) {

                        BCEDPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCEDPType = null;
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCEDPSTD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BCEDPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDPCategoryVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDPType = [];
                                $(result).each(function (index, element) {
                                    BCEDPType[index] = {
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
                    else if (index === 22) {

                        BCEDPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[23][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 23);
                        BCEDPSTD = null;
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BCEDPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDPCategoryVal,
                                type: BCEDPTypeVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDPSTD = [];
                                $(result).each(function (index, element) {
                                    BCEDPSTD[index] = {
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
                    else if (index === 23) {

                        BCEDPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[24][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 24);
                        BCEDPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEDPCategoryVal,
                                type: BCEDPTypeVal,
                                std: BCEDPSTDVal,
                                temp: BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEDPName = [];
                                $(result).each(function (index, element) {
                                    BCEDPName[index] = {
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

                        // 设计压力
                        let BCEDPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCEDPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BCEDPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCEDPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCEDTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCEDTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 封头材料
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCEDCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取材料密度、最大最小厚度
                        let BCEDDC, BCEDCThkMin, BCEDCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BCEDCCategoryVal,
                                "type": BCEDCTypeVal,
                                "std": BCEDCSTDVal,
                                "name": BCEDCNameVal,
                                "temp": BCEDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BCEDDC = parseFloat(result.density);
                                BCEDCThkMin = parseFloat(result.thkMin);
                                BCEDCThkMax = parseFloat(result.thkMax);

                                // DSI
                                let BCEDDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    BCEDDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bced2d("Φ" + BCEDDSI);
                                    bcedSketch.off("resize").on("resize", function () {
                                        if ($("#bced").length > 0) {
                                            bced2d("Φ" + BCEDDSI);
                                        }
                                    });
                                }
                                bcedd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bced2d("Φ" + BCEDDSI);
                                            bcedSketch.off("resize").on("resize", function () {
                                                if ($("#bced").length > 0) {
                                                    bced2d("Φ" + BCEDDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // DPI
                                let BCEDDPI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) < BCEDDSI) {
                                    BCEDDPI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                    && parseFloat(rows[9][columns[0][1].field]) >= BCEDDSI) {
                                    south.html("锥壳小端内直径 Dpi 不能大于等于 " + BCEDDSI + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI);
                                    bcedSketch.off("resize").on("resize", function () {
                                        if ($("#bced").length > 0) {
                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI);
                                        }
                                    });
                                }
                                bcedd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI);
                                            bcedSketch.off("resize").on("resize", function () {
                                                if ($("#bced").length > 0) {
                                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // α
                                let BCEDALPHA;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    BCEDALPHA = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°");
                                    bcedSketch.off("resize").on("resize", function () {
                                        if ($("#bced").length > 0) {
                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°");
                                        }
                                    });
                                }
                                bcedd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°");
                                            bcedSketch.off("resize").on("resize", function () {
                                                if ($("#bced").length > 0) {
                                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCEDTHKCN;
                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > BCEDCThkMin
                                    && parseFloat(rows[11][columns[0][1].field]) <= BCEDCThkMax) {
                                    BCEDTHKCN = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) <= BCEDCThkMin) {
                                    south.html("锥壳材料厚度不能小于等于 " + BCEDCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > BCEDCThkMax) {
                                    south.html("锥壳材料厚度不能大于 " + BCEDCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN);
                                    bcedSketch.off("resize").on("resize", function () {
                                        if ($("#bced").length > 0) {
                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN);
                                        }
                                    });
                                }
                                bcedd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN);
                                            bcedSketch.off("resize").on("resize", function () {
                                                if ($("#bced").length > 0) {
                                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCEDOCT, BCEDOC, BCEDRCEL, BCEDCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BCEDCCategoryVal,
                                        "type": BCEDCTypeVal,
                                        "std": BCEDCSTDVal,
                                        "name": BCEDCNameVal,
                                        "thk": BCEDTHKCN,
                                        "temp": BCEDDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BCEDDSI + 2 * BCEDTHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BCEDOCT = parseFloat(result.ot);
                                        if (BCEDOCT < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEDOC = parseFloat(result.o);
                                        if (BCEDOC < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEDRCEL = parseFloat(result.rel);
                                        if (BCEDRCEL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEDCC1 = parseFloat(result.c1);
                                        if (BCEDCC1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        // 腐蚀裕量
                                        let BCEDCC2;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) < BCEDTHKCN) {
                                            BCEDCC2 = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) >= BCEDTHKCN) {
                                            south.html("锥壳腐蚀裕量不能大于等于 " + BCEDTHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 焊接接头系数
                                        let BCEDEC;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                            BCEDEC = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 大端筒体材料
                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                            BCEDSNameVal = rows[17][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取材料密度、最大最小厚度
                                        let BCEDDS, BCEDSThkMin, BCEDSThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCEDSCategoryVal,
                                                "type": BCEDSTypeVal,
                                                "std": BCEDSSTDVal,
                                                "name": BCEDSNameVal,
                                                "temp": BCEDDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCEDDS = parseFloat(result.density);
                                                BCEDSThkMin = parseFloat(result.thkMin);
                                                BCEDSThkMax = parseFloat(result.thkMax);

                                                let BCEDTHKSN;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > BCEDSThkMin
                                                    && parseFloat(rows[18][columns[0][1].field]) <= BCEDSThkMax) {
                                                    BCEDTHKSN = parseFloat(rows[18][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) <= BCEDSThkMin) {
                                                    south.html("大端筒体材料厚度不能小于等于 " + BCEDSThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > BCEDSThkMax) {
                                                    south.html("大端筒体材料厚度不能大于 " + BCEDSThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN, BCEDTHKSN);
                                                    bcedSketch.off("resize").on("resize", function () {
                                                        if ($("#bced").length > 0) {
                                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN, BCEDTHKSN);
                                                        }
                                                    });
                                                }
                                                bcedd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN, BCEDTHKSN);
                                                            bcedSketch.off("resize").on("resize", function () {
                                                                if ($("#bced").length > 0) {
                                                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN, BCEDTHKSN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BCEDOST, BCEDOS, BCEDRSEL, BCEDCS1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCEDSCategoryVal,
                                                        "type": BCEDSTypeVal,
                                                        "std": BCEDSSTDVal,
                                                        "name": BCEDSNameVal,
                                                        "thk": BCEDTHKSN,
                                                        "temp": BCEDDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BCEDDSI + 2 * BCEDTHKSN
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCEDOST = parseFloat(result.ot);
                                                        if (BCEDOST < 0) {
                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEDOS = parseFloat(result.o);
                                                        if (BCEDOS < 0) {
                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEDRSEL = parseFloat(result.rel);
                                                        if (BCEDRSEL < 0) {
                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BCEDCS1 = parseFloat(result.c1);
                                                        if (BCEDCS1 < 0) {
                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        // 腐蚀裕量
                                                        let BCEDCS2;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) < BCEDTHKSN) {
                                                            BCEDCS2 = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) >= BCEDTHKSN) {
                                                            south.html("大端筒体腐蚀裕量不能大于等于 " + BCEDTHKSN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 焊接接头系数
                                                        let BCEDES;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                            BCEDES = parseFloat(rows[20][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 小端筒体材料
                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                            BCEDPNameVal = rows[24][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // AJAX 获取材料密度、最大最小厚度
                                                        let BCEDDP, BCEDPThkMin, BCEDPThkMax;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_index.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCEDPCategoryVal,
                                                                "type": BCEDPTypeVal,
                                                                "std": BCEDPSTDVal,
                                                                "name": BCEDPNameVal,
                                                                "temp": BCEDDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCEDDP = parseFloat(result.density);
                                                                BCEDPThkMin = parseFloat(result.thkMin);
                                                                BCEDPThkMax = parseFloat(result.thkMax);

                                                                let BCEDTHKPN;
                                                                if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                    && parseFloat(rows[25][columns[0][1].field]) > BCEDPThkMin
                                                                    && parseFloat(rows[25][columns[0][1].field]) <= BCEDPThkMax) {
                                                                    BCEDTHKPN = parseFloat(rows[25][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                    && parseFloat(rows[25][columns[0][1].field]) <= BCEDPThkMin) {
                                                                    south.html("小端筒体材料厚度不能小于等于 " + BCEDPThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                    && parseFloat(rows[25][columns[0][1].field]) > BCEDPThkMax) {
                                                                    south.html("小端筒体材料厚度不能大于 " + BCEDPThkMax + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN, BCEDTHKSN, BCEDTHKPN);
                                                                    bcedSketch.off("resize").on("resize", function () {
                                                                        if ($("#bced").length > 0) {
                                                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN, BCEDTHKSN, BCEDTHKPN);
                                                                        }
                                                                    });
                                                                }
                                                                bcedd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN, BCEDTHKSN, BCEDTHKPN);
                                                                            bcedSketch.off("resize").on("resize", function () {
                                                                                if ($("#bced").length > 0) {
                                                                                    bced2d("Φ" + BCEDDSI, "Φ" + BCEDDPI, BCEDALPHA + "°", BCEDTHKCN, BCEDTHKSN, BCEDTHKPN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                let BCEDOPT, BCEDOP, BCEDRPEL, BCEDCP1;
                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                    async: true,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": BCEDPCategoryVal,
                                                                        "type": BCEDPTypeVal,
                                                                        "std": BCEDPSTDVal,
                                                                        "name": BCEDPNameVal,
                                                                        "thk": BCEDTHKPN,
                                                                        "temp": BCEDDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": BCEDDPI + 2 * BCEDTHKPN
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        BCEDOPT = parseFloat(result.ot);
                                                                        if (BCEDOPT < 0) {
                                                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCEDOP = parseFloat(result.o);
                                                                        if (BCEDOP < 0) {
                                                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCEDRPEL = parseFloat(result.rel);
                                                                        if (BCEDRPEL < 0) {
                                                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        BCEDCP1 = parseFloat(result.c1);
                                                                        if (BCEDCP1 < 0) {
                                                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }

                                                                        // 腐蚀裕量
                                                                        let BCEDCP2;
                                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                            && parseFloat(rows[26][columns[0][1].field]) < BCEDTHKPN) {
                                                                            BCEDCP2 = parseFloat(rows[26][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                            && parseFloat(rows[26][columns[0][1].field]) >= BCEDTHKPN) {
                                                                            south.html("小端筒体腐蚀裕量不能大于等于 " + BCEDTHKPN + " mm").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 焊接接头系数
                                                                        let BCEDEP;
                                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                            BCEDEP = parseFloat(rows[27][columns[0][1].field]);
                                                                        }
                                                                        else {
                                                                            return false;
                                                                        }

                                                                        // 过程参数
                                                                        let BCEDPC = BCEDPD + BCEDPS;
                                                                        let BCEDCC = BCEDCC1 + BCEDCC2;
                                                                        let BCEDTHKCE = BCEDTHKCN - BCEDCC;
                                                                        let BCEDWSC = 0.6 * Math.sqrt(BCEDDSI * BCEDTHKCE / 2 / Math.cos(BCEDALPHA / 180 * Math.PI));
                                                                        let BCEDTS1 = BCEDPC * BCEDDSI / 4 / Math.cos(BCEDALPHA / 180 * Math.PI);
                                                                        let BCEDTS2 = BCEDPC * BCEDDSI / 2 / Math.cos(BCEDALPHA / 180 * Math.PI);
                                                                        let BCEDWPC = 0.6 * Math.sqrt(BCEDDPI * BCEDTHKCE / 2 / Math.cos(BCEDALPHA / 180 * Math.PI));
                                                                        let BCEDTP1 = BCEDPC * BCEDDPI / 4 / Math.cos(BCEDALPHA / 180 * Math.PI);
                                                                        let BCEDTP2 = BCEDPC * BCEDDPI / 2 / Math.cos(BCEDALPHA / 180 * Math.PI);

                                                                        let BCEDCS = BCEDCS1 + BCEDCS2;
                                                                        let BCEDTHKSE = BCEDTHKSN - BCEDCS;
                                                                        let BCEDWS = 0.6 * Math.sqrt(BCEDDSI * BCEDTHKSE / 2);
                                                                        let BCEDT2S = BCEDDSI * BCEDPC / 2;

                                                                        let BCEDCP = BCEDCP1 + BCEDCP2;
                                                                        let BCEDTHKPE = BCEDTHKPN - BCEDCP;
                                                                        let BCEDWP = 0.6 * Math.sqrt(BCEDDPI * BCEDTHKPE / 2);
                                                                        let BCEDT2P = BCEDDPI * BCEDPC / 2;

                                                                        // 锥壳内压计算及校核
                                                                        let BCEDTHKCC = BCEDPC * BCEDDSI / (2 * BCEDOCT * BCEDEC) / Math.cos(BCEDALPHA / 180 * Math.PI);
                                                                        let BCEDTHKCD = BCEDTHKCC + BCEDCC2;
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "锥壳内压所需厚度：" + (BCEDTHKCD + BCEDCC1).toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        let BCEDTHKCCHK;
                                                                        if (BCEDTHKCN >= (BCEDTHKCD + BCEDCC1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEDTHKCN + " mm" +
                                                                                "</span>");
                                                                            BCEDTHKCCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEDTHKCN + " mm" +
                                                                                "</span>");
                                                                            BCEDTHKCCHK = "不合格";
                                                                        }

                                                                        // 大端筒体内压计算及校核
                                                                        let BCEDTHKSC = BCEDPC * BCEDDSI / (2 * BCEDOST * BCEDES);
                                                                        let BCEDTHKSD = BCEDTHKSC + BCEDCS2;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "大端筒体内压所需厚度：" + (BCEDTHKSD + BCEDCS1).toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        let BCEDTHKSCHK;
                                                                        if (BCEDTHKSN >= (BCEDTHKSD + BCEDCS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEDTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCEDTHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEDTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCEDTHKSCHK = "不合格";
                                                                        }

                                                                        // 小端筒体内压计算及校核
                                                                        let BCEDTHKPC = BCEDPC * BCEDDPI / (2 * BCEDOPT * BCEDEP);
                                                                        let BCEDTHKPD = BCEDTHKPC + BCEDCP2;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "小端筒体内压所需厚度：" + (BCEDTHKPD + BCEDCP1).toFixed(2) + " mm" +
                                                                            "</span>");
                                                                        let BCEDTHKPCHK;
                                                                        if (BCEDTHKPN >= (BCEDTHKPD + BCEDCP1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEDTHKPN + " mm" +
                                                                                "</span>");
                                                                            BCEDTHKPCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCEDTHKPN + " mm" +
                                                                                "</span>");
                                                                            BCEDTHKPCHK = "不合格";
                                                                        }

                                                                        // 大端连接处计算及校核
                                                                        let BCEDQS = BCEDTS2 * BCEDWSC + BCEDT2S * BCEDWS - 0.5 * BCEDTS2 * BCEDDSI * Math.sin(BCEDALPHA / 180 * Math.PI);
                                                                        let BCEDOCRT = -1;
                                                                        if (BCEDQS < 0) {
                                                                            if (BCEDDT <= 100) {
                                                                                BCEDOCRT = 103;
                                                                            }
                                                                            else if (BCEDDT > 100 && BCEDDT <= 200) {
                                                                                BCEDOCRT = 100;
                                                                            }
                                                                            else if (BCEDDT > 200 && BCEDDT <= 250) {
                                                                                BCEDOCRT = 95;
                                                                            }
                                                                            else if (BCEDDT > 250 && BCEDDT <= 350) {
                                                                                BCEDOCRT = 80;
                                                                            }
                                                                            else {
                                                                                south.html("查表6-3超界，程序无法计算！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                        }
                                                                        let BCEDAS;
                                                                        if (BCEDQS < 0) {
                                                                            BCEDAS = Math.abs(BCEDQS) / BCEDOCRT;
                                                                        }
                                                                        else {
                                                                            BCEDAS = Math.abs(BCEDQS) / Math.min(BCEDOCT * BCEDEC, BCEDOST * BCEDES);
                                                                        }
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "大端连接处所需承压面积：" + BCEDAS.toFixed(4) + " mm²" +
                                                                            "</span>");
                                                                        let BCEDAACTS = BCEDWSC * BCEDTHKCE + BCEDWS * BCEDTHKSE;
                                                                        let BCEDASCHK, BCEDAREQS = -1.0;
                                                                        if (BCEDAACTS >= BCEDAS) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际承压面积：" + BCEDAACTS.toFixed(4) + " mm²" +
                                                                                "</span>");
                                                                            BCEDASCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际承压面积：" + BCEDAACTS.toFixed(4) + " mm²" +
                                                                                "</span>");
                                                                            BCEDASCHK = "不合格";
                                                                            BCEDAREQS = BCEDAS - BCEDAACTS;
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "连接处需要增加的承压面积：" + BCEDAREQS.toFixed(4) + " mm²" +
                                                                                "</span>");
                                                                        }
                                                                        let BCEDWSCSINALPHA = BCEDWSC * Math.sin(BCEDALPHA / 180 * Math.PI);
                                                                        let BCEDDSI075 = 0.0075 * BCEDDSI;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "大端最小投影宽度：" + BCEDDSI075.toFixed(4) + " mm" +
                                                                            "</span>");
                                                                        let BCEDWSCSINALPHACHK;
                                                                        if (BCEDWSCSINALPHA >= BCEDDSI075) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际投影宽度：" + BCEDWSCSINALPHA.toFixed(4) + " mm" +
                                                                                "</span>");
                                                                            BCEDWSCSINALPHACHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际投影宽度：" + BCEDWSCSINALPHA.toFixed(4) + " mm" +
                                                                                "</span>");
                                                                            BCEDWSCSINALPHACHK = "不合格";
                                                                        }

                                                                        // 小端连接处计算及校核
                                                                        let BCEDQP = BCEDTP2 * BCEDWPC + BCEDT2P * BCEDWP - 0.5 * BCEDTP2 * BCEDDPI * Math.sin(BCEDALPHA / 180 * Math.PI);
                                                                        let BCEDAP;
                                                                        if (BCEDQP < 0) {
                                                                            BCEDAP = Math.abs(BCEDQP) / BCEDOCRT;
                                                                        }
                                                                        else {
                                                                            BCEDAP = Math.abs(BCEDQP) / Math.min(BCEDOCT * BCEDEC, BCEDOPT * BCEDEP);
                                                                        }
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "小端连接处所需承压面积：" + BCEDAP.toFixed(4) + " mm²" +
                                                                            "</span>");
                                                                        let BCEDAACTP = BCEDWPC * BCEDTHKCE + BCEDWP * BCEDTHKPE;
                                                                        let BCEDAPCHK, BCEDAREQP = -1.0;
                                                                        if (BCEDAACTP >= BCEDAP) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际承压面积：" + BCEDAACTP.toFixed(4) + " mm²" +
                                                                                "</span>");
                                                                            BCEDAPCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际承压面积：" + BCEDAACTP.toFixed(4) + " mm²" +
                                                                                "</span>");
                                                                            BCEDAPCHK = "不合格";
                                                                            BCEDAREQP = BCEDAP - BCEDAACTP;
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "连接处需要增加的承压面积：" + BCEDAREQP.toFixed(4) + " mm²" +
                                                                                "</span>");
                                                                        }
                                                                        let BCEDWPCSINALPHA = BCEDWPC * Math.sin(BCEDALPHA / 180 * Math.PI);
                                                                        let BCEDDPI075 = 0.0075 * BCEDDPI;
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "小端最小投影宽度：" + BCEDDPI075.toFixed(4) + " mm" +
                                                                            "</span>");
                                                                        let BCEDWPCSINALPHACHK;
                                                                        if (BCEDWPCSINALPHA >= BCEDDPI075) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际投影宽度：" + BCEDWPCSINALPHA.toFixed(4) + " mm" +
                                                                                "</span>");
                                                                            BCEDWPCSINALPHACHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "实际投影宽度：" + BCEDWPCSINALPHA.toFixed(4) + " mm" +
                                                                                "</span>");
                                                                            BCEDWPCSINALPHACHK = "不合格";
                                                                        }

                                                                        // 压力试验
                                                                        let BCEDETA, BCEDPCT, BCEDPST, BCEDPPT, BCEDPT;
                                                                        if (BCEDTest === "液压试验") {
                                                                            BCEDETA = 1.25;
                                                                            BCEDPCT = Math.max(BCEDETA * BCEDPD * BCEDOC / BCEDOCT, 0.05);
                                                                            BCEDPST = Math.max(BCEDETA * BCEDPD * BCEDOS / BCEDOST, 0.05);
                                                                            BCEDPPT = Math.max(BCEDETA * BCEDPD * BCEDOP / BCEDOPT, 0.05);
                                                                            BCEDPT = Math.min(BCEDPCT, BCEDPST, BCEDPPT);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：液压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCEDPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }
                                                                        else if (BCEDTest === "气压试验") {
                                                                            BCEDETA = 1.10;
                                                                            BCEDPCT = Math.max(BCEDETA * BCEDPD * BCEDOC / BCEDOCT, 0.05);
                                                                            BCEDPST = Math.max(BCEDETA * BCEDPD * BCEDOS / BCEDOST, 0.05);
                                                                            BCEDPPT = Math.max(BCEDETA * BCEDPD * BCEDOP / BCEDOPT, 0.05);
                                                                            BCEDPT = Math.min(BCEDPCT, BCEDPST, BCEDPPT);
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试压类型：气压" +
                                                                                "&ensp;|&ensp;" +
                                                                                "试验压力：" + BCEDPT.toFixed(4) + " MPa" +
                                                                                "</span>");
                                                                        }

                                                                        // docx
                                                                        let BCEDPayJS = $('#payjs');

                                                                        function getDocx() {
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "bceddocx.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    ribbonName: "BCED",

                                                                                    pd: BCEDPD,
                                                                                    t: BCEDDT,
                                                                                    ps: BCEDPS,
                                                                                    test: BCEDTest,

                                                                                    stdc: BCEDCSTDVal,
                                                                                    namec: BCEDCNameVal,
                                                                                    dsi: BCEDDSI,
                                                                                    dpi: BCEDDPI,
                                                                                    alpha: BCEDALPHA,
                                                                                    thkcn: BCEDTHKCN,
                                                                                    cc2: BCEDCC2,
                                                                                    ec: BCEDEC,

                                                                                    stds: BCEDSSTDVal,
                                                                                    names: BCEDSNameVal,
                                                                                    thksn: BCEDTHKSN,
                                                                                    cs2: BCEDCS2,
                                                                                    es: BCEDES,

                                                                                    stdp: BCEDPSTDVal,
                                                                                    namep: BCEDPNameVal,
                                                                                    thkpn: BCEDTHKPN,
                                                                                    cp2: BCEDCP2,
                                                                                    ep: BCEDEP,

                                                                                    dc: BCEDDC.toFixed(4),
                                                                                    rcel: BCEDRCEL.toFixed(4),
                                                                                    cc1: BCEDCC1.toFixed(4),
                                                                                    oct: BCEDOCT.toFixed(4),
                                                                                    oc: BCEDOC.toFixed(4),

                                                                                    ds: BCEDDS.toFixed(4),
                                                                                    rsel: BCEDRSEL.toFixed(4),
                                                                                    cs1: BCEDCS1.toFixed(4),
                                                                                    ost: BCEDOST.toFixed(4),
                                                                                    os: BCEDOS.toFixed(4),

                                                                                    dp: BCEDDP.toFixed(4),
                                                                                    rpel: BCEDRPEL.toFixed(4),
                                                                                    cp1: BCEDCP1.toFixed(4),
                                                                                    opt: BCEDOPT.toFixed(4),
                                                                                    op: BCEDOP.toFixed(4),

                                                                                    pc: BCEDPC.toFixed(4),

                                                                                    cc: BCEDCC.toFixed(4),
                                                                                    thkce: BCEDTHKCE.toFixed(4),
                                                                                    wsc: BCEDWSC.toFixed(4),
                                                                                    ts1: BCEDTS1.toFixed(4),
                                                                                    ts2: BCEDTS2.toFixed(4),
                                                                                    wpc: BCEDWPC.toFixed(4),
                                                                                    tp1: BCEDTP1.toFixed(4),
                                                                                    tp2: BCEDTP2.toFixed(4),

                                                                                    cs: BCEDCS.toFixed(4),
                                                                                    thkse: BCEDTHKSE.toFixed(4),
                                                                                    ws: BCEDWS.toFixed(4),
                                                                                    t2s: BCEDT2S.toFixed(4),

                                                                                    cp: BCEDCP.toFixed(4),
                                                                                    thkpe: BCEDTHKPE.toFixed(4),
                                                                                    wp: BCEDWP.toFixed(4),
                                                                                    t2p: BCEDT2P.toFixed(4),

                                                                                    ocrt: BCEDOCRT.toFixed(4),

                                                                                    thkcc: BCEDTHKCC.toFixed(4),
                                                                                    thkcd: BCEDTHKCD.toFixed(4),
                                                                                    thkcchk: BCEDTHKCCHK,

                                                                                    thksc: BCEDTHKSC.toFixed(4),
                                                                                    thksd: BCEDTHKSD.toFixed(4),
                                                                                    thkschk: BCEDTHKSCHK,

                                                                                    thkpc: BCEDTHKPC.toFixed(4),
                                                                                    thkpd: BCEDTHKPD.toFixed(4),
                                                                                    thkpchk: BCEDTHKPCHK,

                                                                                    qs: BCEDQS.toFixed(4),
                                                                                    as: BCEDAS.toFixed(4),
                                                                                    aacts: BCEDAACTS.toFixed(4),
                                                                                    aschk: BCEDASCHK,
                                                                                    areqs: BCEDAREQS.toFixed(4),
                                                                                    wscsinalpha: BCEDWSCSINALPHA.toFixed(4),
                                                                                    dsi075: BCEDDSI075.toFixed(4),
                                                                                    wscsinalphachk: BCEDWSCSINALPHACHK,

                                                                                    qp: BCEDQP.toFixed(4),
                                                                                    ap: BCEDAP.toFixed(4),
                                                                                    aactp: BCEDAACTP.toFixed(4),
                                                                                    apchk: BCEDAPCHK,
                                                                                    areqp: BCEDAREQP.toFixed(4),
                                                                                    wpcsinalpha: BCEDWPCSINALPHA.toFixed(4),
                                                                                    dpi075: BCEDDPI075.toFixed(4),
                                                                                    wpcsinalphachk: BCEDWPCSINALPHACHK,

                                                                                    eta: BCEDETA.toFixed(4),
                                                                                    pct: BCEDPCT.toFixed(4),
                                                                                    pst: BCEDPST.toFixed(4),
                                                                                    ppt: BCEDPPT.toFixed(4),
                                                                                    pt: BCEDPT.toFixed(4)
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
                                                                                        BCEDPayJS.dialog({
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
                                                                                                    BCEDPayJS.dialog("close");
                                                                                                    BCEDPayJS.dialog("clear");
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
                                                                                                                BCEDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                        BCEDPayJS.dialog('close');
                                                                                                                        BCEDPayJS.dialog('clear');
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