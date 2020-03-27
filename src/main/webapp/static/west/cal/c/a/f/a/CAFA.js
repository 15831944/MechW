$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cafad2 = $("#d2");
    let cafad3 = $("#d3");
    let cafad2d3 = $('#d2d3');

    $("#cal").html("<table id='cafa'></table>");
    let pg = $("#cafa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/f/a/CAFA.json", function (result) {

        let CAFADT;
        let CAFASCategory, CAFASCategoryVal, CAFASType, CAFASTypeVal, CAFASSTD, CAFASSTDVal, CAFASName,
            CAFAJCategory, CAFAJCategoryVal, CAFAJType, CAFAJTypeVal, CAFAJSTD, CAFAJSTDVal, CAFAJName;
        let columns, rows, ed;

        // 2D Sketch
        function cafa2d(djo, thkjn, dsi, thksn) {

            if (!djo) djo = "ϕdjo";
            if (!thkjn) thkjn = "δjn";
            if (!dsi) dsi = "ϕDsi";
            if (!thksn) thksn = "δsn";

            cafad2.empty();

            let width = cafad2.width();
            let height = cafad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CAFASVG")
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
            let padding = 80;
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

            // 筒体内径
            let CAFASketchH = height - 2 * padding;
            let CAFASketchSDI = CAFASketchH / 2;
            let CAFASketchSDO = CAFASketchSDI + 2 * thickness;

            // 筒体端点坐标
            let iltX = width / 2 - CAFASketchSDI / 2;
            let iltY = padding;
            let irtX = width / 2 + CAFASketchSDI / 2;
            let irtY = padding;
            let ilbX = width / 2 - CAFASketchSDI / 2;
            let ilbY = height - padding;
            let irbX = width / 2 + CAFASketchSDI / 2;
            let irbY = height - padding;
            let oltX = width / 2 - CAFASketchSDO / 2;
            let oltY = padding;
            let ortX = width / 2 + CAFASketchSDO / 2;
            let ortY = padding;
            let olbX = width / 2 - CAFASketchSDO / 2;
            let olbY = height - padding;
            let orbX = width / 2 + CAFASketchSDO / 2;
            let orbY = height - padding;

            // 筒体轮廓
            drawLine(iltX, iltY, ilbX, ilbY);
            drawLine(irtX, irtY, irbX, irbY);
            drawLine(oltX, oltY, olbX, olbY);
            drawLine(ortX, ortY, orbX, orbY);
            drawLine(oltX, oltY, ortX, ortY);
            drawLine(olbX, olbY, orbX, orbY);

            // 盘管半径
            let CAFASketchRI = 0.1 * CAFASketchSDI;
            let CAFASketchRO = CAFASketchRI + thickness / 2;
            for (let i = 1, CAFASketchCenterY1 = olbY - (CAFASketchRO + 16); CAFASketchCenterY1 >= padding + CAFASketchRO; i++) {
                drawCenterLine(oltX + 6, CAFASketchCenterY1, oltX - CAFASketchRO - 10, CAFASketchCenterY1);
                drawArc(CAFASketchRI, CAFASketchRI, oltX, CAFASketchCenterY1 + CAFASketchRI, oltX, CAFASketchCenterY1 - CAFASketchRI);
                drawArc(CAFASketchRO, CAFASketchRO, oltX, CAFASketchCenterY1 + CAFASketchRO, oltX, CAFASketchCenterY1 - CAFASketchRO);
                CAFASketchCenterY1 = olbY - i * (2 * CAFASketchRO + 16) - (CAFASketchRO + 16);
            }
            for (let i = 1, CAFASketchCenterY1 = olbY - (2 * CAFASketchRO + 24); CAFASketchCenterY1 >= padding + CAFASketchRO; i++) {
                drawCenterLine(ortX - 6, CAFASketchCenterY1, ortX + CAFASketchRO + 10, CAFASketchCenterY1);
                drawArc(CAFASketchRI, CAFASketchRI, ortX, CAFASketchCenterY1 - CAFASketchRI, ortX, CAFASketchCenterY1 + CAFASketchRI);
                drawArc(CAFASketchRO, CAFASketchRO, ortX, CAFASketchCenterY1 - CAFASketchRO, ortX, CAFASketchCenterY1 + CAFASketchRO);
                CAFASketchCenterY1 = olbY - i * (2 * CAFASketchRO + 16) - (2 * CAFASketchRO + 24);
            }

            // 中心线
            drawCenterLine(width / 2, padding - 10, width / 2, height - padding + 10);

            // 底部水平标注
            dimBottomH(ilbX, ilbY, irbX, irbY, dsi, "CAFASketchDSI");

            // 厚度标注
            drawLine(olbX, height - padding + 3, olbX, height - padding + 40);
            drawLine(olbX, ilbY + 30, ilbX, ilbY + 30);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: olbX, y: olbY + 30},
                    {x: olbX - 15, y: olbY + 30 - 3},
                    {x: olbX - 15, y: olbY + 30 + 3},
                    {x: olbX, y: olbY + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: olbX - 15 - 40, y: olbY + 30},
                {x: olbX - 15, y: olbY + 30}
            ])).attr("id", "CAFASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 夹套厚度标注
            svg.append("path").attr("d", line([
                {x: orbX + CAFASketchRO + 15, y: olbY - (2 * CAFASketchRO + 24)},
                {x: orbX + CAFASketchRO + 15 + 40, y: olbY - (2 * CAFASketchRO + 24)}
            ])).attr("id", "CAFASketchTHKJN").classed("sketch", true)
                .attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * CAFASketchRO + 24)) + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAFASketchTHKJN").attr("startOffset", "50%").text(thkjn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: orbX + CAFASketchRO, y: olbY - (2 * CAFASketchRO + 24)},
                    {x: orbX + CAFASketchRO + 15, y: olbY - (2 * CAFASketchRO + 24) - 3},
                    {x: orbX + CAFASketchRO + 15, y: olbY - (2 * CAFASketchRO + 24) + 3},
                    {x: orbX + CAFASketchRO, y: olbY - (2 * CAFASketchRO + 24)}
                ])).attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * CAFASketchRO + 24)) + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: orbX + CAFASketchRI, y: olbY - (2 * CAFASketchRO + 24)},
                    {x: orbX + CAFASketchRI - 15, y: olbY - (2 * CAFASketchRO + 24) - 3},
                    {x: orbX + CAFASketchRI - 15, y: olbY - (2 * CAFASketchRO + 24) + 3},
                    {x: orbX + CAFASketchRI, y: olbY - (2 * CAFASketchRO + 24)}
                ])).attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * CAFASketchRO + 24)) + ")");
            svg.append("path").attr("d", line([
                {x: orbX + CAFASketchRI, y: olbY - (2 * CAFASketchRO + 24)},
                {x: orbX + CAFASketchRO, y: olbY - (2 * CAFASketchRO + 24)}
            ])).classed("sketch", true).attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * CAFASketchRO + 24)) + ")");
            svg.append("path").attr("d", line([
                {x: orbX + CAFASketchRI - 15, y: olbY - (2 * CAFASketchRO + 24)},
                {x: orbX + CAFASketchRI - 30, y: olbY - (2 * CAFASketchRO + 24)}
            ])).classed("sketch", true).attr("transform", "rotate(" + -20 + ", " + orbX + " " + (olbY - (2 * CAFASketchRO + 24)) + ")");

            // 夹套外直径
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: olbX - CAFASketchRO, y: olbY - (CAFASketchRO + 16)},
                    {x: olbX - CAFASketchRO - 15, y: olbY - (CAFASketchRO + 16) - 3},
                    {x: olbX - CAFASketchRO - 15, y: olbY - (CAFASketchRO + 16) + 3},
                    {x: olbX - CAFASketchRO, y: olbY - (CAFASketchRO + 16)}
                ])).attr("transform", "rotate(" + 45 + ", " + olbX + " " + (olbY - (CAFASketchRO + 16)) + ")");
            svg.append("path").attr("d", line([
                {x: olbX - CAFASketchRO, y: olbY - (CAFASketchRO + 16)},
                {x: olbX, y: olbY - (CAFASketchRO + 16)}
            ])).classed("sketch", true).attr("transform", "rotate(" + 45 + ", " + olbX + " " + (olbY - (CAFASketchRO + 16)) + ")");
            svg.append("path").attr("d", line([
                {x: olbX - CAFASketchRO - 30, y: olbY - (CAFASketchRO + 16)},
                {x: olbX - CAFASketchRO - 15, y: olbY - (CAFASketchRO + 16)}
            ])).classed("sketch", true).attr("transform", "rotate(" + 45 + ", " + olbX + " " + (olbY - (CAFASketchRO + 16)) + ")");
            svg.append("path").attr("d", line([
                {
                    x: olbX - 0.707 * (CAFASketchRO + 30) - 40,
                    y: olbY - (CAFASketchRO + 16) - 0.707 * (CAFASketchRO + 30)
                },
                {x: olbX - 0.707 * (CAFASketchRO + 30), y: olbY - (CAFASketchRO + 16) - 0.707 * (CAFASketchRO + 30)}
            ])).attr("id", "CAFASketchDJO").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAFASketchDJO").attr("startOffset", "50%").text(djo);

        }

        currentTabIndex = cafad2d3.tabs('getTabIndex', cafad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            cafa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#cafa").length > 0) {
                    cafa2d();
                }
            });
        }
        cafad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    cafa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#cafa").length > 0) {
                            cafa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 半圆管夹套筒体强度校核",
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
                    $(ed.target).combobox("loadData", CAFAJCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CAFAJType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", CAFAJSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", CAFAJName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CAFASCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CAFASType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", CAFASSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", CAFASName);
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
                    cafad2.empty();

                    // model
                    cafad3.empty();

                    // sketch
                    currentTabIndex = cafad2d3.tabs('getTabIndex', cafad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        cafa2d();
                        cafad2.off("resize").on("resize", function () {
                            if ($("#cafa").length > 0) {
                                cafa2d();
                            }
                        });
                    }
                    cafad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                cafa2d();
                                cafad2.off("resize").on("resize", function () {
                                    if ($("#cafa").length > 0) {
                                        cafa2d();
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

                        CAFADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAFAJCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAFAJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFAJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFAJName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAFASCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAFASType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFASSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFASName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFAJCategory = [];
                                CAFASCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CAFADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CAFAJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CAFASCategory[index] = {
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

                        CAFAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAFAJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFAJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFAJCategoryVal,
                                temp: CAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFAJType = [];
                                $(result).each(function (index, element) {
                                    CAFAJType[index] = {
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

                        CAFAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFAJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFAJCategoryVal,
                                type: CAFAJTypeVal,
                                temp: CAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFAJSTD = [];
                                $(result).each(function (index, element) {
                                    CAFAJSTD[index] = {
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

                        CAFAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFAJCategoryVal,
                                type: CAFAJTypeVal,
                                std: CAFAJSTDVal,
                                temp: CAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFAJName = [];
                                $(result).each(function (index, element) {
                                    CAFAJName[index] = {
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

                        CAFASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAFASType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFASSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFASCategoryVal,
                                temp: CAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFASType = [];
                                $(result).each(function (index, element) {
                                    CAFASType[index] = {
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

                        CAFASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFASSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFASCategoryVal,
                                type: CAFASTypeVal,
                                temp: CAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFASSTD = [];
                                $(result).each(function (index, element) {
                                    CAFASSTD[index] = {
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

                        CAFASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFASCategoryVal,
                                type: CAFASTypeVal,
                                std: CAFASSTDVal,
                                temp: CAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFASName = [];
                                $(result).each(function (index, element) {
                                    CAFASName[index] = {
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
                            let CAFATestVal = rows[1][columns[0][1].field];

                            // 夹套设计压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let CAFAPJD = parseFloat(rows[2][columns[0][1].field]);

                                // 夹套静压力
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let CAFAPJS = parseFloat(rows[3][columns[0][1].field]);

                                    // 夹套计算压力
                                    let CAFAPJC = CAFAPJD + CAFAPJS;

                                    // 夹套材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let CAFAJNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取夹套材料密度、最大最小厚度
                                        let CAFAJDensity, CAFAJThkMin, CAFAJThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": CAFAJCategoryVal,
                                                "type": CAFAJTypeVal,
                                                "std": CAFAJSTDVal,
                                                "name": CAFAJNameVal,
                                                "temp": CAFADT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {
                                                CAFAJDensity = parseFloat(result.density);
                                                CAFAJThkMin = parseFloat(result.thkMin);
                                                CAFAJThkMax = parseFloat(result.thkMax);

                                                // 夹套外直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CAFADJO = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        cafa2d("ϕ" + CAFADJO);
                                                        cafad2.off("resize").on("resize", function () {
                                                            if ($("#cafa").length > 0) {
                                                                cafa2d("ϕ" + CAFADJO);
                                                            }
                                                        });
                                                    }
                                                    cafad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                cafa2d("ϕ" + CAFADJO);
                                                                cafad2.off("resize").on("resize", function () {
                                                                    if ($("#cafa").length > 0) {
                                                                        cafa2d("ϕ" + CAFADJO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 标准限制的壳体厚度
                                                    let shellThkMaximum;
                                                    if (CAFADJO === 60) {
                                                        shellThkMaximum = 25.4;
                                                    }
                                                    else {
                                                        shellThkMaximum = 50.8;
                                                    }

                                                    // 夹套名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CAFAJThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= Math.min(CAFADJO / 2, CAFAJThkMax)) {
                                                        let CAFATHKJN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            cafa2d("ϕ" + CAFADJO, CAFATHKJN);
                                                            cafad2.off("resize").on("resize", function () {
                                                                if ($("#cafa").length > 0) {
                                                                    cafa2d("ϕ" + CAFADJO, CAFATHKJN);
                                                                }
                                                            });
                                                        }
                                                        cafad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    cafa2d("ϕ" + CAFADJO, CAFATHKJN);
                                                                    cafad2.off("resize").on("resize", function () {
                                                                        if ($("#cafa").length > 0) {
                                                                            cafa2d("ϕ" + CAFADJO, CAFATHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let CAFADJI = CAFADJO - 2 * CAFATHKJN;

                                                        let CAFAJOT, CAFAJO, CAFAJOT1, CAFAJREL, CAFACJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CAFAJCategoryVal,
                                                                "type": CAFAJTypeVal,
                                                                "std": CAFAJSTDVal,
                                                                "name": CAFAJNameVal,
                                                                "thk": CAFATHKJN,
                                                                "temp": CAFADT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CAFADJO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CAFAJOT = parseFloat(result.ot);
                                                                if (CAFAJOT < 0) {
                                                                    south.html("查询盘管材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFAJO = parseFloat(result.o);
                                                                if (CAFAJO < 0) {
                                                                    south.html("查询盘管材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFAJREL = parseFloat(result.rel);
                                                                if (CAFAJREL < 0) {
                                                                    south.html("查询盘管材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFACJ1 = parseFloat(result.c1);
                                                                if (CAFACJ1 < 0) {
                                                                    south.html("查询盘管材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFAJOT1 = parseFloat(result.ot1);

                                                                // 夹套腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < CAFATHKJN) {
                                                                    let CAFACJ2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 夹套焊接接头系数
                                                                    let CAFAEJ = parseFloat(rows[11][columns[0][1].field]);

                                                                    // 夹套厚度附加量C
                                                                    let CAFACJ = CAFACJ1 + CAFACJ2;

                                                                    // 夹套有效厚度
                                                                    let CAFATHKJE = CAFATHKJN - CAFACJ;

                                                                    // 计算夹套内半径R
                                                                    let CAFARJI = CAFADJI / 2;

                                                                    // 夹套计算厚度
                                                                    let CAFATHKJC = (CAFAPJC * CAFARJI) / (CAFAEJ * CAFAJOT - 0.6 * CAFAPJC);

                                                                    // 设计厚度
                                                                    let CAFATHKJD = CAFATHKJC + CAFACJ2;

                                                                    // 所需厚度提示信息
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "夹套所需厚度：" + (CAFATHKJD + CAFACJ1).toFixed(2) + " mm" +
                                                                        "</span>");

                                                                    // 夹套厚度校核
                                                                    let CAFATHKJCHK;
                                                                    if (CAFATHKJN >= (CAFATHKJD + CAFACJ1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + CAFATHKJN + " mm" +
                                                                            "</span>");
                                                                        CAFATHKJCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + CAFATHKJN + " mm" +
                                                                            "</span>");
                                                                        CAFATHKJCHK = "不合格";
                                                                    }

                                                                    // 夹套试验压力
                                                                    let CAFAPJT;
                                                                    if (CAFATestVal === "液压试验") {
                                                                        CAFAPJT = 1.25 * CAFAPJD * CAFAJO / Math.max(CAFAJOT, CAFAJOT1);
                                                                    }
                                                                    else if (CAFATestVal === "气压试验") {
                                                                        CAFAPJT = 1.1 * CAFAPJD * CAFAJO / Math.max(CAFAJOT, CAFAJOT1);
                                                                    }
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "夹套试验压力：" + CAFAPJT.toFixed(4) + " MPa" +
                                                                        "</span>");

                                                                    // 环向应力限制的夹套 MAWPJJ
                                                                    let CAFAMAWPJJ = CAFATHKJE * CAFAEJ * CAFAJOT / (CAFARJI + 0.6 * CAFATHKJE) - CAFAPJS;

                                                                    // 筒体设计压力
                                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                                        let CAFAPSD = parseFloat(rows[12][columns[0][1].field]);

                                                                        // 筒体静压力
                                                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                                            let CAFAPSS = parseFloat(rows[13][columns[0][1].field]);

                                                                            // 筒体计算压力
                                                                            let CAFAPSC = CAFAPSD + CAFAPSS;

                                                                            // 筒体材料名称
                                                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                let CAFASNameVal = rows[17][columns[0][1].field];

                                                                                // AJAX 获取筒体材料密度、最大最小厚度
                                                                                let CAFASDensity, CAFASThkMin,
                                                                                    CAFASThkMax;
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "web_get_gbt_150_2011_index.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        "category": CAFASCategoryVal,
                                                                                        "type": CAFASTypeVal,
                                                                                        "std": CAFASSTDVal,
                                                                                        "name": CAFASNameVal,
                                                                                        "temp": CAFADT
                                                                                    }),
                                                                                    beforeSend: function () {
                                                                                    },
                                                                                    success: function (result) {

                                                                                        CAFASDensity = parseFloat(result.density);
                                                                                        CAFASThkMin = parseFloat(result.thkMin);
                                                                                        CAFASThkMax = parseFloat(result.thkMax);

                                                                                        // 筒体内直径
                                                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) >= 762
                                                                                            && parseFloat(rows[18][columns[0][1].field]) <= 4318) {
                                                                                            let CAFADSI = parseFloat(rows[18][columns[0][1].field]);

                                                                                            // 筒体内半径
                                                                                            let CAFARSI = CAFADSI / 2;

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                cafa2d("ϕ" + CAFADJO, CAFATHKJN, "ϕ" + CAFADSI);
                                                                                                cafad2.off("resize").on("resize", function () {
                                                                                                    if ($("#cafa").length > 0) {
                                                                                                        cafa2d("ϕ" + CAFADJO, CAFATHKJN, "ϕ" + CAFADSI);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            cafad2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        cafa2d("ϕ" + CAFADJO, CAFATHKJN, "ϕ" + CAFADSI);
                                                                                                        cafad2.off("resize").on("resize", function () {
                                                                                                            if ($("#cafa").length > 0) {
                                                                                                                cafa2d("ϕ" + CAFADJO, CAFATHKJN, "ϕ" + CAFADSI);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            // 筒体名义厚度
                                                                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) > Math.max(CAFASThkMin, 4.8)
                                                                                                && parseFloat(rows[19][columns[0][1].field]) <= Math.min(CAFASThkMax, shellThkMaximum)) {
                                                                                                let CAFATHKSN = parseFloat(rows[19][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    cafa2d("ϕ" + CAFADJO, CAFATHKJN, "ϕ" + CAFADSI, CAFATHKSN);
                                                                                                    cafad2.off("resize").on("resize", function () {
                                                                                                        if ($("#cafa").length > 0) {
                                                                                                            cafa2d("ϕ" + CAFADJO, CAFATHKJN, "ϕ" + CAFADSI, CAFATHKSN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                cafad2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            cafa2d("ϕ" + CAFADJO, CAFATHKJN, "ϕ" + CAFADSI, CAFATHKSN);
                                                                                                            cafad2.off("resize").on("resize", function () {
                                                                                                                if ($("#cafa").length > 0) {
                                                                                                                    cafa2d("ϕ" + CAFADJO, CAFATHKJN, "ϕ" + CAFADSI, CAFATHKSN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                let CAFADSO = CAFADSI + 2 * CAFATHKSN;

                                                                                                let CAFASOT, CAFASO,
                                                                                                    CAFASOT1, CAFASREL,
                                                                                                    CAFACS1;
                                                                                                $.ajax({
                                                                                                    type: "POST",
                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                                                    async: true,
                                                                                                    dataType: "json",
                                                                                                    data: JSON.stringify({
                                                                                                        "category": CAFASCategoryVal,
                                                                                                        "type": CAFASTypeVal,
                                                                                                        "std": CAFASSTDVal,
                                                                                                        "name": CAFASNameVal,
                                                                                                        "thk": CAFATHKSN,
                                                                                                        "temp": CAFADT,
                                                                                                        "highLow": 3,
                                                                                                        "isTube": 0,
                                                                                                        "od": CAFADSO
                                                                                                    }),
                                                                                                    beforeSend: function () {
                                                                                                    },
                                                                                                    success: function (result) {

                                                                                                        CAFASOT = parseFloat(result.ot);
                                                                                                        if (CAFASOT < 0) {
                                                                                                            south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFASO = parseFloat(result.o);
                                                                                                        if (CAFASO < 0) {
                                                                                                            south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFASREL = parseFloat(result.rel);
                                                                                                        if (CAFASREL < 0) {
                                                                                                            south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFACS1 = parseFloat(result.c1);
                                                                                                        if (CAFACS1 < 0) {
                                                                                                            south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFASOT1 = parseFloat(result.ot1);

                                                                                                        // 筒体腐蚀裕量
                                                                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                            && parseFloat(rows[20][columns[0][1].field]) <= (CAFATHKSN - 4.8 - CAFACS1)) {
                                                                                                            let CAFACS2 = parseFloat(rows[20][columns[0][1].field]);

                                                                                                            // 筒体焊接接头系数
                                                                                                            let CAFAES = parseFloat(rows[21][columns[0][1].field]);

                                                                                                            // 筒体厚度附加量C
                                                                                                            let CAFACS = CAFACS1 + CAFACS2;

                                                                                                            // 筒体有效厚度
                                                                                                            let CAFATHKSE = CAFATHKSN - CAFACS;

                                                                                                            // 筒体许用应力
                                                                                                            let CAFAO15 = 1.5 * CAFASOT;

                                                                                                            // 内压轴向拉应力
                                                                                                            let CAFAOPie = CAFAPSC * CAFARSI / (2 * CAFATHKSE);

                                                                                                            // 获取应力系数
                                                                                                            let CAFAK;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "hgt_20582_2011_table_3_2_get_k.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "jacketDo": CAFADJO,
                                                                                                                    "shellDi": CAFADSI,
                                                                                                                    "shellThk": CAFATHKSE,
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {
                                                                                                                    CAFAK = result;

                                                                                                                    // 夹套引起的轴向弯曲应力
                                                                                                                    let CAFAF = CAFAK * CAFAPJC;

                                                                                                                    // 筒体附加轴向力 F1
                                                                                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                                                                                        let CAFASF1 = parseFloat(rows[22][columns[0][1].field]);

                                                                                                                        // 筒体附加轴向弯矩 M1
                                                                                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                                                                                            let CAFASM1 = parseFloat(rows[23][columns[0][1].field]);

                                                                                                                            // 计算总应力
                                                                                                                            let CAFAO = CAFAF + Math.max(0, CAFAOPie + CAFASF1 / (Math.PI * CAFADSI * CAFATHKSE) + 4 * CAFASM1 / (Math.PI * CAFADSI * CAFADSI * CAFATHKSE));

                                                                                                                            // 筒体限制的夹套MAWP
                                                                                                                            let m = CAFAPJC,
                                                                                                                                n = CAFAF + Math.max(0, CAFAOPie + CAFASF1 / (Math.PI * CAFADSI * CAFATHKSE) + 4 * CAFASM1 / (Math.PI * CAFADSI * CAFADSI * CAFATHKSE));
                                                                                                                            for (; n <= CAFAO15; m += 0.0001) {
                                                                                                                                n = CAFAK * m + Math.max(0, CAFAOPie + CAFASF1 / (Math.PI * CAFADSI * CAFATHKSE) + 4 * CAFASM1 / (Math.PI * CAFADSI * CAFADSI * CAFATHKSE));
                                                                                                                            }
                                                                                                                            let CAFAMAWPJS = m - 0.0001 - CAFAPJS;

                                                                                                                            let CAFAMAWPJ = Math.min(CAFAMAWPJJ, CAFAMAWPJS);
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "夹套MAWP：" + CAFAMAWPJ.toFixed(4) + " MPa" +
                                                                                                                                "</span>");

                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "筒体许用应力：" + CAFAO15.toFixed(2) + " MPa" +
                                                                                                                                "</span>");

                                                                                                                            // 筒体应力校核
                                                                                                                            let CAFAOCHK;
                                                                                                                            if (CAFAO <= CAFAO15) {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "筒体实际应力：" + CAFAO.toFixed(2) + " MPa" +
                                                                                                                                    "</span>");
                                                                                                                                CAFAOCHK = "合格";
                                                                                                                            }
                                                                                                                            else {
                                                                                                                                south.append(
                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                    "筒体实际应力：" + CAFAO.toFixed(2) + " MPa" +
                                                                                                                                    "</span>");
                                                                                                                                CAFAOCHK = "不合格";
                                                                                                                            }

                                                                                                                            // 筒体试验压力
                                                                                                                            let CAFAPST;
                                                                                                                            if (CAFATestVal === "液压试验") {
                                                                                                                                CAFAPST = 1.25 * CAFAPSD * CAFASO / Math.max(CAFASOT, CAFASOT1);
                                                                                                                            }
                                                                                                                            else if (CAFATestVal === "气压试验") {
                                                                                                                                CAFAPST = 1.10 * CAFAPSD * CAFASO / Math.max(CAFASOT, CAFASOT1);
                                                                                                                            }

                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "筒体试验压力：" + CAFAPST.toFixed(4) + " MPa" +
                                                                                                                                "</span>");

                                                                                                                            // 筒体受环向应力限制的 MAWPSS
                                                                                                                            let CAFAMAWPSS = 2 * CAFATHKSE * CAFASOT * CAFAES / (CAFADSI + CAFATHKSE) - CAFAPSS;

                                                                                                                            // 筒体受夹套限制的 MAWPSJ
                                                                                                                            let i = CAFAPSC,
                                                                                                                                j = CAFAF + Math.max(0, CAFAOPie + CAFASF1 / (Math.PI * CAFADSI * CAFATHKSE) + 4 * CAFASM1 / (Math.PI * CAFADSI * CAFADSI * CAFATHKSE));
                                                                                                                            for (; j <= CAFAO15; i += 0.0001) {
                                                                                                                                j = CAFAF + Math.max(0, i * CAFARSI / (2 * CAFATHKSE) + CAFASF1 / (Math.PI * CAFADSI * CAFATHKSE) + 4 * CAFASM1 / (Math.PI * CAFADSI * CAFADSI * CAFATHKSE));
                                                                                                                            }
                                                                                                                            let CAFAMAWPSJ = i - 0.0001 - CAFAPSS;
                                                                                                                            let CAFAMAWPS = Math.min(CAFAMAWPSS, CAFAMAWPSJ);
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "筒体MAWP：" + CAFAMAWPS.toFixed(4) + " MPa" +
                                                                                                                                "</span>");

                                                                                                                            // docx
                                                                                                                            let CAFAPayJS = $('#payjs');

                                                                                                                            function getDocx() {
                                                                                                                                $.ajax({
                                                                                                                                    type: "POST",
                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                    url: "cafadocx.action",
                                                                                                                                    async: true,
                                                                                                                                    dataType: "json",
                                                                                                                                    data: JSON.stringify({
                                                                                                                                        ribbonName: "CAFA",

                                                                                                                                        t: CAFADT,
                                                                                                                                        psd: CAFAPSD,
                                                                                                                                        pss: CAFAPSS,
                                                                                                                                        sstd: CAFASSTDVal,
                                                                                                                                        sname: CAFASNameVal,
                                                                                                                                        dsi: CAFADSI,
                                                                                                                                        thksn: CAFATHKSN,
                                                                                                                                        cs2: CAFACS2,
                                                                                                                                        es: CAFAES,
                                                                                                                                        pjd: CAFAPJD,
                                                                                                                                        pjs: CAFAPJS,
                                                                                                                                        jstd: CAFAJSTDVal,
                                                                                                                                        jname: CAFAJNameVal,
                                                                                                                                        djo: CAFADJO,
                                                                                                                                        thkjn: CAFATHKJN,
                                                                                                                                        cj2: CAFACJ2,
                                                                                                                                        ej: CAFAEJ,
                                                                                                                                        f1: CAFASF1,
                                                                                                                                        m1: CAFASM1,
                                                                                                                                        test: CAFATestVal,
                                                                                                                                        densityj: CAFAJDensity.toFixed(4),
                                                                                                                                        densitys: CAFASDensity.toFixed(4),
                                                                                                                                        ojt: CAFAJOT.toFixed(4),
                                                                                                                                        ost: CAFASOT.toFixed(4),
                                                                                                                                        oj: CAFAJO.toFixed(4),
                                                                                                                                        os: CAFASO.toFixed(4),
                                                                                                                                        rjrel: CAFAJREL.toFixed(4),
                                                                                                                                        rsrel: CAFASREL.toFixed(4),
                                                                                                                                        ojt1: CAFAJOT1.toFixed(4),
                                                                                                                                        ost1: CAFASOT1.toFixed(4),
                                                                                                                                        cj1: CAFACJ1.toFixed(4),
                                                                                                                                        cs1: CAFACS1.toFixed(4),
                                                                                                                                        psc: CAFAPSC.toFixed(4),
                                                                                                                                        pjc: CAFAPJC.toFixed(4),
                                                                                                                                        cj: CAFACJ.toFixed(4),
                                                                                                                                        thkje: CAFATHKJE.toFixed(4),
                                                                                                                                        rji: CAFARJI.toFixed(4),
                                                                                                                                        thkjc: CAFATHKJC.toFixed(4),
                                                                                                                                        thkjd: CAFATHKJD.toFixed(4),
                                                                                                                                        thkjchk: CAFATHKJCHK,
                                                                                                                                        cs: CAFACS.toFixed(4),
                                                                                                                                        thkse: CAFATHKSE.toFixed(4),
                                                                                                                                        rsi: CAFARSI.toFixed(4),
                                                                                                                                        opie: CAFAOPie.toFixed(4),
                                                                                                                                        k: CAFAK.toFixed(4),
                                                                                                                                        f: CAFAF.toFixed(4),
                                                                                                                                        o: CAFAO.toFixed(4),
                                                                                                                                        o15: CAFAO15.toFixed(4),
                                                                                                                                        ochk: CAFAOCHK,
                                                                                                                                        pjt: CAFAPJT.toFixed(4),
                                                                                                                                        pst: CAFAPST.toFixed(4),
                                                                                                                                        mawpjj: CAFAMAWPJJ.toFixed(4),
                                                                                                                                        mawpjs: CAFAMAWPJS.toFixed(4),
                                                                                                                                        mawpj: CAFAMAWPJ.toFixed(4),
                                                                                                                                        mawpss: CAFAMAWPSS.toFixed(4),
                                                                                                                                        mawpsj: CAFAMAWPSJ.toFixed(4),
                                                                                                                                        mawps: CAFAMAWPS.toFixed(4)
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
                                                                                                                                            CAFAPayJS.dialog({
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
                                                                                                                                                        CAFAPayJS.dialog("close");
                                                                                                                                                        CAFAPayJS.dialog("clear");
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
                                                                                                                                                                    CAFAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                            CAFAPayJS.dialog('close');
                                                                                                                                                                            CAFAPayJS.dialog('clear');
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
                                                                                                                    }
                                                                                                                },
                                                                                                                error: function () {
                                                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                        "<span style='color:red;'>&ensp;系数 K 获取失败，请检查网络后重试</span>");
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                            && parseFloat(rows[20][columns[0][1].field]) > (CAFATHKSN - 4.8 - CAFACS1)) {
                                                                                                            south.html("筒体有效厚度查表超界，请减小腐蚀裕量或增大筒体厚度！").css("color", "red");
                                                                                                        }
                                                                                                    },
                                                                                                    error: function () {
                                                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) <= Math.max(CAFASThkMin, 4.8)) {
                                                                                                south.html("筒体名义厚度不能小于等于 " + Math.max(CAFASThkMin, 4.8) + " mm").css("color", "red");
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) > Math.min(CAFASThkMax, shellThkMaximum)) {
                                                                                                south.html("筒体名义厚度不能大于 " + Math.min(CAFASThkMax, shellThkMaximum) + " mm").css("color", "red");
                                                                                            }
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) < 762) {
                                                                                            south.html("筒体内直径不能小于 762 mm").css("color", "red");
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) > 4318) {
                                                                                            south.html("筒体内直径不能大于 4318 mm").css("color", "red");
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
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= CAFATHKJN) {
                                                                    south.html("夹套腐蚀裕量不能大于等于 " + CAFATHKJN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CAFAJThkMin) {
                                                        south.html("夹套名义厚度不能小于等于 " + CAFAJThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > Math.min(CAFADJO / 2, CAFAJThkMax)) {
                                                        south.html("夹套名义厚度不能大于 " + Math.min(CAFADJO / 2, CAFAJThkMax) + " mm").css("color", "red");
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
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});