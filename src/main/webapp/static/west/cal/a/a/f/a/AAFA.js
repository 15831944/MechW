$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aafaSketch = $("#d2");
    let aafaModel = $("#d3");
    let aafad2d3 = $('#d2d3');

    $("#cal").html("<table id='aafa'></table>");
    let pg = $("#aafa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/f/a/AAFA.json", function (result) {

        let AAFADT, AAFACategory, AAFACategoryVal, AAFAType, AAFATypeVal, AAFASTD, AAFASTDVal, AAFAName, columns, rows,
            ed;

        function aafa2d(ldi = "ϕDi", sdi = "ϕdi", a = "α", thkn = "δn") {

            aafaSketch.empty();

            let width = aafaSketch.width();
            let height = aafaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAFASVG").attr("height", height);

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
                ])).attr("id", "AAEBSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#AAEBSketchDI").attr("startOffset", "50%").text(text);

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

            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            // 内壁
            let iltX = padding + wg;
            let iltY = padding + hg;
            let ilbX = padding + wg;
            let ilbY = height - padding - hg;
            let irtX = width - padding - wg;
            let irtY = padding;
            let irbX = width - padding - wg;
            let irbY = height - padding;
            svg.append("path").attr("d", line([
                {x: iltX, y: iltY},
                {x: irtX, y: irtY},
                {x: irbX, y: irbY},
                {x: ilbX, y: ilbY},
                {x: iltX, y: iltY}
            ])).classed("sketch", true);

            let alpha = Math.atan((((irbY - irtY) - (ilbY - iltY)) / 2) / (irtX - iltX));
            let deltaX = thickness * Math.sin(alpha);
            let deltaY = thickness * Math.cos(alpha);

            // 左侧延伸
            svg.append("path").attr("d", line([
                {x: iltX, y: iltY},
                {x: iltX - wg / 2, y: iltY + wg / 2 * Math.tan(alpha)}
            ])).attr("stroke-dasharray", "6,6,6").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: ilbX, y: ilbY},
                {x: ilbX - wg / 2, y: ilbY - wg / 2 * Math.tan(alpha)}
            ])).attr("stroke-dasharray", "6,6,6").classed("sketch", true);

            // 右侧延伸
            svg.append("path").attr("d", line([
                {x: irtX, y: irtY},
                {x: irtX + wg / 2, y: irtY - wg / 2 * Math.tan(alpha)}
            ])).attr("stroke-dasharray", "6,6,6").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: irbX, y: irbY},
                {x: irbX + wg / 2, y: irbY + wg / 2 * Math.tan(alpha)}
            ])).attr("stroke-dasharray", "6,6,6").classed("sketch", true);

            // 外壁
            let oltX = iltX - deltaX;
            let oltY = iltY - deltaY;
            let olbX = ilbX - deltaX;
            let olbY = ilbY + deltaY;
            let ortX = irtX - deltaX;
            let ortY = irtY - deltaY;
            let orbX = irbX - deltaX;
            let orbY = irbY + deltaY;
            svg.append("path").attr("d", line([
                {x: iltX, y: iltY},
                {x: oltX, y: oltY},
                {x: ortX, y: ortY},
                {x: irtX, y: irtY}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: ilbX, y: ilbY},
                {x: olbX, y: olbY},
                {x: orbX, y: orbY},
                {x: irbX, y: irbY}
            ])).classed("sketch", true);

            // 左侧延伸
            svg.append("path").attr("d", line([
                {x: oltX, y: oltY},
                {x: oltX - wg / 2, y: oltY + wg / 2 * Math.tan(alpha)}
            ])).attr("stroke-dasharray", "6,6,6").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: olbX, y: olbY},
                {x: olbX - wg / 2, y: olbY - wg / 2 * Math.tan(alpha)}
            ])).attr("stroke-dasharray", "6,6,6").classed("sketch", true);

            // 右侧延伸
            svg.append("path").attr("d", line([
                {x: ortX, y: ortY},
                {x: ortX + wg / 2, y: ortY - wg / 2 * Math.tan(alpha)}
            ])).attr("stroke-dasharray", "6,6,6").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: orbX, y: orbY},
                {x: orbX + wg / 2, y: orbY + wg / 2 * Math.tan(alpha)}
            ])).attr("stroke-dasharray", "6,6,6").classed("sketch", true);

            // 中心线
            drawCenterLine(iltX - 10, height / 2, iltX + 15, height / 2);
            drawCenterLine(iltX + 35, height / 2, irtX + 10, height / 2);

            // 左侧小端直径
            dimRightV(ilbX, ilbY, iltX, iltY, sdi, "AAFASketchSDI");

            // 右侧大端直径
            dimRightV(irbX, irbY, irtX, irtY, ldi, "AAFASketchLDI");

            // thkn
            let ang = alpha / Math.PI * 180;
            let centerX = irtX - (height / 2 - irtY) / Math.tan(alpha);
            let centerY = height / 2;
            svg.append("path").attr("d", line([
                {x: width / 2, y: height / 2 + thickness + 15 + 40},
                {x: width / 2, y: height / 2 + thickness + 15}
            ])).attr("id", "AAFASketchTHKN").classed("sketch", true)
                .attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#AAFASketchTHKN").attr("startOffset", "50%").text(thkn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: height / 2},
                    {x: width / 2 - 3, y: height / 2 - 15},
                    {x: width / 2 + 3, y: height / 2 - 15},
                    {x: width / 2, y: height / 2}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2, y: height / 2 - 15 - 15},
                    {x: width / 2, y: height / 2 - 15}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: width / 2, y: height / 2},
                    {x: width / 2, y: height / 2 + thickness}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: height / 2 + thickness},
                    {x: width / 2 - 3, y: height / 2 + thickness + 15},
                    {x: width / 2 + 3, y: height / 2 + thickness + 15},
                    {x: width / 2, y: height / 2 + thickness}
                ])).attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");

            // a
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: height / 2},
                    {x: width / 2 - 3, y: height / 2 - 15},
                    {x: width / 2 + 3, y: height / 2 - 15},
                    {x: width / 2, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: height / 2},
                    {x: width / 2 - 3, y: height / 2 + 15},
                    {x: width / 2 + 3, y: height / 2 + 15},
                    {x: width / 2, y: height / 2}
                ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            let adimradius = width / 2 - centerX;
            svg.append("path").attr("d", "M "
                + (centerX + adimradius * Math.cos(alpha)) + " " + (centerY - adimradius * Math.sin(alpha)) + " "
                + "A" + adimradius + " " + adimradius + " "
                + "1 0 1" + " "
                + (width / 2) + " " + (centerY)
            ).classed("sketch", true).attr("id", "AAFASketchA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#AAFASketchA").attr("startOffset", "50%").text(a);
        }

        currentTabIndex = aafad2d3.tabs('getTabIndex', aafad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aafa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aafa").length > 0) {
                    aafa2d();
                }
            });
        }
        aafad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aafa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aafa").length > 0) {
                            aafa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 锥壳段内压强度校核",
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

                if (index === 6) {
                    $(ed.target).combobox("loadData", AAFACategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAFAType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AAFASTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", AAFAName);
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
                    aafaSketch.empty();

                    // model
                    aafaModel.empty();

                    // sketch
                    currentTabIndex = aafad2d3.tabs('getTabIndex', aafad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aafa2d();
                        aafaSketch.off("resize").on("resize", function () {
                            if ($("#aafa").length > 0) {
                                aafa2d();
                            }
                        });
                    }
                    aafad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aafa2d();
                                aafaSketch.off("resize").on("resize", function () {
                                    if ($("#aafa").length > 0) {
                                        aafa2d();
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

                        AAFADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFACategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAFASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAFAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAFADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAFACategory[index] = {
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
                    if (index === 6) {

                        AAFACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAFASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAFAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFACategoryVal,
                                temp: AAFADT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFAType = [];
                                $(result).each(function (index, element) {
                                    AAFAType[index] = {
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
                    if (index === 7) {

                        AAFATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAFASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAFAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFACategoryVal,
                                type: AAFATypeVal,
                                temp: AAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFASTD = [];
                                $(result).each(function (index, element) {
                                    AAFASTD[index] = {
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
                    if (index === 8) {

                        AAFASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        AAFAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFACategoryVal,
                                type: AAFATypeVal,
                                std: AAFASTDVal,
                                temp: AAFADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFAName = [];
                                $(result).each(function (index, element) {
                                    AAFAName[index] = {
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

                    // 设计压力
                    let AAFAPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AAFAPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let AAFAPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AAFAPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 计算压力
                    let AAFAPC = AAFAPD + AAFAPS;

                    // 腐蚀裕量
                    let AAFAC2;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AAFAC2 = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 焊接接头系数
                    let AAFAE;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AAFAE = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 试验类型
                    let AAFATestVal;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        AAFATestVal = rows[5][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 材料名称
                    let AAFANameVal;
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        AAFANameVal = rows[9][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取材料密度、最大最小厚度
                    let AAFADensity, AAFAThkMin, AAFAThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AAFACategoryVal,
                            "type": AAFATypeVal,
                            "std": AAFASTDVal,
                            "name": AAFANameVal,
                            "temp": AAFADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AAFADensity = parseFloat(result.density);
                            AAFAThkMin = parseFloat(result.thkMin);
                            AAFAThkMax = parseFloat(result.thkMax);

                            // 大端内直径
                            let AAFALDI;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                AAFALDI = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aafa2d("ϕ" + AAFALDI);
                                aafaSketch.off("resize").on("resize", function () {
                                    if ($("#aafa").length > 0) {
                                        aafa2d("ϕ" + AAFALDI);
                                    }
                                });
                            }
                            aafad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aafa2d("ϕ" + AAFALDI);
                                        aafaSketch.off("resize").on("resize", function () {
                                            if ($("#aafa").length > 0) {
                                                aafa2d("ϕ" + AAFALDI);
                                            }
                                        });
                                    }
                                }
                            });

                            // 小端内直径
                            let AAFASDI;
                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) <= AAFALDI) {
                                AAFASDI = parseFloat(rows[11][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                && parseFloat(rows[11][columns[0][1].field]) > AAFALDI) {
                                south.html("小端内直径 di 不能大于 " + AAFALDI + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI);
                                aafaSketch.off("resize").on("resize", function () {
                                    if ($("#aafa").length > 0) {
                                        aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI);
                                    }
                                });
                            }
                            aafad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI);
                                        aafaSketch.off("resize").on("resize", function () {
                                            if ($("#aafa").length > 0) {
                                                aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI);
                                            }
                                        });
                                    }
                                }
                            });

                            // 半顶角α
                            let AAFAA;
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                AAFAA = parseFloat(rows[12][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            let AAFARAD = AAFAA / 180 * Math.PI;

                            // Sketch
                            if (currentTabIndex === 0) {
                                aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°");
                                aafaSketch.off("resize").on("resize", function () {
                                    if ($("#aafa").length > 0) {
                                        aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°");
                                    }
                                });
                            }
                            aafad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°");
                                        aafaSketch.off("resize").on("resize", function () {
                                            if ($("#aafa").length > 0) {
                                                aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°");
                                            }
                                        });
                                    }
                                }
                            });

                            // 筒体名义厚度
                            let AAFATHKN;
                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > Math.max(AAFAC2, AAFAThkMin)
                                && parseFloat(rows[13][columns[0][1].field]) <= AAFAThkMax) {
                                AAFATHKN = parseFloat(rows[13][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) <= Math.max(AAFAC2, AAFAThkMin)) {
                                south.html("材料厚度不能小于等于 " + Math.max(AAFAC2, AAFAThkMin) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                && parseFloat(rows[13][columns[0][1].field]) > AAFAThkMax) {
                                south.html("材料厚度不能大于 " + AAFAThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°", AAFATHKN);
                                aafaSketch.off("resize").on("resize", function () {
                                    if ($("#aafa").length > 0) {
                                        aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°", AAFATHKN);
                                    }
                                });
                            }
                            aafad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°", AAFATHKN);
                                        aafaSketch.off("resize").on("resize", function () {
                                            if ($("#aafa").length > 0) {
                                                aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°", AAFATHKN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 大端外直径
                            let AAFALDO = AAFALDI + 2 * AAFATHKN * Math.cos(AAFARAD);

                            // 小端外直径
                            let AAFASDO = AAFASDI + 2 * AAFATHKN * Math.cos(AAFARAD);

                            // ajax 获取 设计应力、常温应力、标记应力、常温屈服强度、厚度负偏差
                            let AAFAOT, AAFAO, AAFAOT1, AAFARel, AAFAC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AAFACategoryVal,
                                    "type": AAFATypeVal,
                                    "std": AAFASTDVal,
                                    "name": AAFANameVal,
                                    "thk": AAFATHKN,
                                    "temp": AAFADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AAFALDO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    AAFAOT = parseFloat(result.ot);
                                    if (AAFAOT < 0) {
                                        south.html("查询锥壳材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    AAFAO = parseFloat(result.o);
                                    if (AAFAO < 0) {
                                        south.html("查询锥壳材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    AAFARel = parseFloat(result.rel);
                                    if (AAFARel < 0) {
                                        south.html("查询锥壳材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    AAFAC1 = parseFloat(result.c1);
                                    if (AAFAC1 < 0) {
                                        south.html("查询锥壳材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    AAFAOT1 = parseFloat(result.ot1);

                                    // 厚度附加量C
                                    let AAFAC = AAFAC1 + AAFAC2;

                                    // 有效厚度
                                    let AAFATHKE = AAFATHKN - AAFAC;

                                    // 计算厚度
                                    let AAFATHKC = (AAFAPC * AAFALDI) / (2 * AAFAOT * AAFAE - AAFAPC) / Math.cos(AAFARAD);

                                    // 设计厚度
                                    let AAFATHKD = AAFATHKC + AAFAC2;

                                    // 所需厚度提示信息
                                    south.html(
                                        "<span style='color:#444444;'>" +
                                        "所需厚度：" + (AAFATHKD + AAFAC1).toFixed(2) + " mm" +
                                        "</span>");

                                    // 厚度校核
                                    let AAFATHKCHK;
                                    if (AAFATHKN >= (AAFATHKD + AAFAC1).toFixed(2)) {
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AAFATHKN + " mm" +
                                            "</span>");
                                        AAFATHKCHK = "合格";
                                    }
                                    else {
                                        south.append(
                                            "<span style='color:red;'>" +
                                            "&ensp;|&ensp;" +
                                            "输入厚度：" + AAFATHKN + " mm" +
                                            "</span>");
                                        AAFATHKCHK = "不合格";
                                    }

                                    // 压力试验
                                    let AAFATestPT;
                                    if (AAFATestVal === "液压试验") {
                                        AAFATestPT = 1.25 * AAFAPD * AAFAO / Math.max(AAFAOT, AAFAOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：液压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AAFATestPT.toFixed(4) + " MPa" +
                                            "</span>");
                                    }
                                    else if (AAFATestVal === "气压试验") {

                                        AAFATestPT = 1.1 * AAFAPD * AAFAO / Math.max(AAFAOT, AAFAOT1);
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "试压类型：气压" +
                                            "&ensp;|&ensp;" +
                                            "试验压力：" + AAFATestPT.toFixed(4) + " MPa" +
                                            "</span>");
                                    }

                                    // MAWP
                                    let AAFAMAWP = (2 * AAFATHKE * AAFAOT * AAFAE) / (AAFALDI / Math.cos(AAFARAD) + AAFATHKE) - AAFAPS;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "MAWP：" + AAFAMAWP.toFixed(4) + " MPa" +
                                        "</span>");

                                    // 总高
                                    let AAFAH = (AAFALDO / 2 - AAFASDO / 2) / Math.tan(AAFARAD);

                                    // 内表面积
                                    let AAFAAI = Math.PI * ((AAFALDI / 2 - AAFASDI / 2) / Math.sin(AAFARAD)) * (AAFALDI / 2 + AAFASDI / 2) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内表面积：" + AAFAAI.toFixed(4) + " ㎡" +
                                        "</span>");

                                    // 中面面积
                                    let AAFALDM = (AAFALDO + AAFALDI) / 2;
                                    let AAFASDM = (AAFASDO + AAFASDI) / 2;
                                    let AAFAAM = Math.PI * ((AAFALDM / 2 - AAFASDM / 2) / Math.sin(AAFARAD)) * (AAFALDM / 2 + AAFASDM / 2) / 1000000;

                                    // 外表面积
                                    let AAFAAO = Math.PI * ((AAFALDO / 2 - AAFASDO / 2) / Math.sin(AAFARAD)) * (AAFALDO / 2 + AAFASDO / 2) / 1000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "外表面积：" + AAFAAO.toFixed(4) + " ㎡" +
                                        "</span>");

                                    // 内容积
                                    let AAFAVI = Math.PI * ((AAFALDI / 2 - AAFASDI / 2) / Math.tan(AAFARAD)) * ((AAFASDI / 2) * (AAFASDI / 2) + (AAFASDI / 2) * (AAFALDI / 2) + (AAFALDI / 2) * (AAFALDI / 2)) / 3 / 1000000000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "内容积：" + AAFAVI.toFixed(4) + " m³" +
                                        "</span>");

                                    // 质量
                                    let AAFAM = AAFADensity * AAFAAM * AAFATHKN / 1000;
                                    south.append(
                                        "<span style='color:#444444;'>" +
                                        "&ensp;|&ensp;" +
                                        "重量：" + AAFAM.toFixed(4) + " kg" +
                                        "</span>");

                                    // docx
                                    let AAFAPayJS = $('#payjs');

                                    function getDocx() {
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "aafadocx.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                ribbonName: "AAFA",

                                                designPressure: AAFAPD,
                                                designTemp: AAFADT,
                                                staticPressure: AAFAPS,
                                                std: AAFASTDVal,
                                                name: AAFANameVal,
                                                c2: AAFAC2.toFixed(4),
                                                e: AAFAE.toFixed(4),
                                                largeInnerDiameter: AAFALDI,
                                                smallInnerDiameter: AAFASDI,
                                                a: AAFAA,
                                                thkn: AAFATHKN,
                                                test: AAFATestVal,
                                                density: AAFADensity.toFixed(4),
                                                testRel: AAFARel.toFixed(4),
                                                c1: AAFAC1.toFixed(4),
                                                designStress: AAFAOT.toFixed(4),
                                                testStress: AAFAO.toFixed(4),
                                                tagStress: AAFAOT1.toFixed(4),
                                                c: AAFAC.toFixed(4),
                                                thke: AAFATHKE.toFixed(4),
                                                calPressure: AAFAPC.toFixed(4),
                                                thkc: AAFATHKC.toFixed(4),
                                                thkd: AAFATHKD.toFixed(4),
                                                thkChk: AAFATHKCHK,
                                                testPressure: AAFATestPT.toFixed(4),
                                                mawp: AAFAMAWP.toFixed(4),
                                                ai: AAFAAI.toFixed(4),
                                                ao: AAFAAO.toFixed(4),
                                                vi: AAFAVI.toFixed(4),
                                                m: AAFAM.toFixed(4)
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
                                                    AAFAPayJS.dialog({
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
                                                                AAFAPayJS.dialog("close");
                                                                AAFAPayJS.dialog("clear");
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
                                                                            AAFAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                            // 倒计时计数器
                                                                            let maxTime = 4, timer;

                                                                            function CountDown() {
                                                                                if (maxTime >= 0) {
                                                                                    $("#payjs_timer").html(maxTime);
                                                                                    --maxTime;
                                                                                } else {

                                                                                    clearInterval(timer);
                                                                                    // 关闭并清空收银台
                                                                                    AAFAPayJS.dialog('close');
                                                                                    AAFAPayJS.dialog('clear');
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

                                    function aafa3d() {

                                        aafaModel.empty();

                                        // support webgl
                                        if (!Detector.webgl) {
                                            Detector.addGetWebGLMessage();
                                        }

                                        // scene
                                        let scene = new THREE.Scene();

                                        // light
                                        let ambientLight = new THREE.AmbientLight(0xffffff);
                                        scene.add(ambientLight);
                                        let directionLight_1 = new THREE.DirectionalLight(0xffffff);
                                        directionLight_1.position.set(1.5 * Math.max(AAFALDO, AAFAH), 1.5 * Math.max(AAFALDO, AAFAH), 1.5 * Math.max(AAFALDO, AAFAH));
                                        scene.add(directionLight_1);
                                        let directionLight_2 = new THREE.DirectionalLight(0x4f4f4f);
                                        directionLight_2.position.set(-1.5 * Math.max(AAFALDO, AAFAH), -1.5 * Math.max(AAFALDO, AAFAH), -1.5 * Math.max(AAFALDO, AAFAH));
                                        scene.add(directionLight_2);


                                        // model
                                        let material = new THREE.MeshLambertMaterial({
                                            color: 0x4f4f4f,
                                            side: THREE.DoubleSide
                                        });

                                        // 旋转建模筒体
                                        let points = [];
                                        points.push(new THREE.Vector3(AAFASDI / 2, 0 - AAFAH / 2, 0));
                                        points.push(new THREE.Vector3(AAFASDI / 2 + AAFAH * Math.tan(AAFARAD), AAFAH - AAFAH / 2, 0));
                                        points.push(new THREE.Vector3(AAFASDI / 2 + AAFAH * Math.tan(AAFARAD) + AAFATHKN * Math.cos(AAFARAD), AAFAH - AAFATHKN * Math.sin(AAFARAD) - AAFAH / 2, 0));
                                        points.push(new THREE.Vector3(AAFASDI / 2 + AAFATHKN * Math.cos(AAFARAD), 0 - AAFATHKN * Math.sin(AAFARAD) - AAFAH / 2, 0));
                                        points.push(new THREE.Vector3(AAFASDI / 2, 0 - AAFAH / 2, 0));
                                        let cylinderShellGeometry = new THREE.LatheGeometry(points, 100, 0, 2 * Math.PI);
                                        let cylinderShellMesh = new THREE.Mesh(cylinderShellGeometry, material);
                                        scene.add(cylinderShellMesh);

                                        // camera
                                        let camera = new THREE.PerspectiveCamera(60, aafaModel.width() / aafaModel.height(), 1, 100000);
                                        camera.position.z = 1.5 * Math.max(AAFALDO, AAFAH);

                                        // render
                                        let renderer = new THREE.WebGLRenderer({
                                            antialias: true,                                 //是否开启反锯齿
                                            precision: "lowp",                              //highp/mediump/lowp着色精度选择
                                            alpha: true,                                     //是否可以设置背景色透明
                                            premultipliedAlpha: false,
                                            stencil: false,
                                            preserveDrawingBuffer: true,                     //是否保存绘图缓冲
                                            maxLights: 3                                     //最大灯光数
                                        });
                                        renderer.setPixelRatio(window.devicePixelRatio);
                                        renderer.setClearColor(0x00bfff, 0);
                                        renderer.setSize(aafaModel.width(), aafaModel.height());
                                        aafaModel.append(renderer.domElement);

                                        // 渲染函数
                                        function render() {
                                            renderer.render(scene, camera);
                                        }

                                        // controls
                                        let controls = new THREE.TrackballControls(camera, renderer.domElement);
                                        controls.rotateSpeed = 1.0;
                                        controls.zoomSpeed = 1.2;
                                        controls.panSpeed = 0.8;
                                        controls.noZoom = false;
                                        controls.noPan = false;
                                        controls.staticMoving = true;
                                        controls.dynamicDampingFactor = 0.3;
                                        controls.keys = [65, 83, 68];
                                        controls.addEventListener("change", render);

                                        // animate
                                        function animate() {
                                            requestAnimationFrame(animate);
                                            controls.update();
                                        }

                                        // resize
                                        aafaModel.resize(function () {
                                            camera.aspect = aafaModel.width() / aafaModel.height();
                                            camera.updateProjectionMatrix();
                                            renderer.setSize(aafaModel.width(), aafaModel.height());
                                            controls.handleResize();
                                            render();
                                        });

                                        render();
                                        animate();

                                    }

                                    // sketch
                                    if (currentTabIndex === 0) {

                                        aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°", AAFATHKN);
                                        aafaSketch.off("resize").on("resize", function () {
                                            if ($("#aafa").length > 0) {
                                                aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°", AAFATHKN);
                                            }
                                        });

                                    }
                                    else if (currentTabIndex === 1) {
                                        aafa3d();
                                    }
                                    aafad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°", AAFATHKN);
                                                aafaSketch.off("resize").on("resize", function () {
                                                    if ($("#aafa").length > 0) {
                                                        aafa2d("ϕ" + AAFALDI, "ϕ" + AAFASDI, AAFAA + "°", AAFATHKN);
                                                    }
                                                });
                                            } else if (index === 1) {
                                                aafa3d();
                                            }
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