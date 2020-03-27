$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bceaSketch = $("#d2");
    let bceaModel = $("#d3");
    let bcead2d3 = $('#d2d3');

    $("#cal").html("<table id='bcea'></table>");
    let pg = $("#bcea");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/e/a/BCEA.json", function (result) {

        let BCEADT;
        let BCEACategory, BCEACategoryVal, BCEAType, BCEATypeVal, BCEASTD, BCEASTDVal, BCEAName;
        let columns, rows, ed;

        function bcea2d(ldi = "ϕDi", sdi = "ϕdi", a = "α", thkn = "δn") {

            bceaSketch.empty();

            let width = bceaSketch.width();
            let height = bceaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCEASVG").attr("height", height);

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
            dimRightV(ilbX, ilbY, iltX, iltY, sdi, "BCEASketchSDI");

            // 右侧大端直径
            dimRightV(irbX, irbY, irtX, irtY, ldi, "BCEASketchLDI");

            // thkn
            let ang = alpha / Math.PI * 180;
            let centerX = irtX - (height / 2 - irtY) / Math.tan(alpha);
            let centerY = height / 2;
            svg.append("path").attr("d", line([
                {x: width / 2, y: height / 2 + thickness + 15 + 40},
                {x: width / 2, y: height / 2 + thickness + 15}
            ])).attr("id", "BCEASketchTHKN").classed("sketch", true)
                .attr("transform", "rotate(" + ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCEASketchTHKN").attr("startOffset", "50%").text(thkn);
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
            ).classed("sketch", true).attr("id", "BCEASketchA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCEASketchA").attr("startOffset", "50%").text(a);
        }

        currentTabIndex = bcead2d3.tabs('getTabIndex', bcead2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcea2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcea").length > 0) {
                    bcea2d();
                }
            });
        }
        bcead2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcea2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcea").length > 0) {
                            bcea2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 锥壳段内压强度校核",
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
                    $(ed.target).combobox("loadData", BCEACategory);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCEAType);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BCEASTD);
                }
                else if (index === 9) {
                    $(ed.target).combobox("loadData", BCEAName);
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
                    bceaSketch.empty();

                    // model
                    bceaModel.empty();

                    // sketch
                    currentTabIndex = bcead2d3.tabs('getTabIndex', bcead2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcea2d();
                        bceaSketch.off("resize").on("resize", function () {
                            if ($("#bcea").length > 0) {
                                bcea2d();
                            }
                        });
                    }
                    bcead2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcea2d();
                                bceaSketch.off("resize").on("resize", function () {
                                    if ($("#bcea").length > 0) {
                                        bcea2d();
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

                        BCEADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEACategory = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCEASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCEAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCEADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCEACategory[index] = {
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
                    else if (index === 6) {

                        BCEACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEAType = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCEASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCEAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEACategoryVal,
                                temp: BCEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEAType = [];
                                $(result).each(function (index, element) {
                                    BCEAType[index] = {
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
                    else if (index === 7) {

                        BCEATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCEASTD = null;
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCEAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEACategoryVal,
                                type: BCEATypeVal,
                                temp: BCEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEASTD = [];
                                $(result).each(function (index, element) {
                                    BCEASTD[index] = {
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
                    else if (index === 8) {

                        BCEASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[9][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 9);
                        BCEAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEACategoryVal,
                                type: BCEATypeVal,
                                std: BCEASTDVal,
                                temp: BCEADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEAName = [];
                                $(result).each(function (index, element) {
                                    BCEAName[index] = {
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
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            let BCEAPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCEAPS = parseFloat(rows[2][columns[0][1].field]);

                                // 计算压力
                                let BCEAPC = BCEAPD + BCEAPS;

                                // 腐蚀裕量
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCEAC2 = parseFloat(rows[3][columns[0][1].field]);

                                    // 焊接接头系数
                                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                                        let BCEAE = parseFloat(rows[4][columns[0][1].field]);

                                        // 试验类型
                                        if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                            let BCEATestVal = rows[5][columns[0][1].field];

                                            // 材料名称
                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                let BCEANameVal = rows[9][columns[0][1].field];

                                                // AJAX 获取材料密度、最大最小厚度
                                                let BCEADensity, BCEAThkMin, BCEAThkMax;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_index.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BCEACategoryVal,
                                                        "type": BCEATypeVal,
                                                        "std": BCEASTDVal,
                                                        "name": BCEANameVal,
                                                        "temp": BCEADT
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BCEADensity = parseFloat(result.density);
                                                        BCEAThkMin = parseFloat(result.thkMin);
                                                        BCEAThkMax = parseFloat(result.thkMax);

                                                        // 大端内直径
                                                        if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                                            let BCEALDI = parseFloat(rows[10][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                bcea2d("ϕ" + BCEALDI);
                                                                bceaSketch.off("resize").on("resize", function () {
                                                                    if ($("#bcea").length > 0) {
                                                                        bcea2d("ϕ" + BCEALDI);
                                                                    }
                                                                });
                                                            }
                                                            bcead2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        bcea2d("ϕ" + BCEALDI);
                                                                        bceaSketch.off("resize").on("resize", function () {
                                                                            if ($("#bcea").length > 0) {
                                                                                bcea2d("ϕ" + BCEALDI);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 小端内直径
                                                            if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) <= BCEALDI) {
                                                                let BCEASDI = parseFloat(rows[11][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI);
                                                                    bceaSketch.off("resize").on("resize", function () {
                                                                        if ($("#bcea").length > 0) {
                                                                            bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI);
                                                                        }
                                                                    });
                                                                }
                                                                bcead2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI);
                                                                            bceaSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcea").length > 0) {
                                                                                    bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 半顶角α
                                                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                                    let BCEAA = parseFloat(rows[12][columns[0][1].field]);

                                                                    let BCEARAD = BCEAA / 180 * Math.PI;

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°");
                                                                        bceaSketch.off("resize").on("resize", function () {
                                                                            if ($("#bcea").length > 0) {
                                                                                bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°");
                                                                            }
                                                                        });
                                                                    }
                                                                    bcead2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°");
                                                                                bceaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bcea").length > 0) {
                                                                                        bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°");
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // 筒体名义厚度
                                                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                        && parseFloat(rows[13][columns[0][1].field]) > Math.max(BCEAC2, BCEAThkMin)
                                                                        && parseFloat(rows[13][columns[0][1].field]) <= BCEAThkMax) {
                                                                        let BCEATHKN = parseFloat(rows[13][columns[0][1].field]);

                                                                        // Sketch
                                                                        if (currentTabIndex === 0) {
                                                                            bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°", BCEATHKN);
                                                                            bceaSketch.off("resize").on("resize", function () {
                                                                                if ($("#bcea").length > 0) {
                                                                                    bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°", BCEATHKN);
                                                                                }
                                                                            });
                                                                        }
                                                                        bcead2d3.tabs({
                                                                            onSelect: function (title, index) {
                                                                                if (index === 0) {
                                                                                    bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°", BCEATHKN);
                                                                                    bceaSketch.off("resize").on("resize", function () {
                                                                                        if ($("#bcea").length > 0) {
                                                                                            bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°", BCEATHKN);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        });

                                                                        // 大端外直径
                                                                        let BCEALDO = BCEALDI + 2 * BCEATHKN * Math.cos(BCEARAD);

                                                                        // 小端外直径
                                                                        let BCEASDO = BCEASDI + 2 * BCEATHKN * Math.cos(BCEARAD);

                                                                        // ajax 获取 设计应力、常温应力、标记应力、常温屈服强度、厚度负偏差
                                                                        let BCEADesignStress, BCEATestStress,
                                                                            BCEATestRel, BCEAC1;
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                "category": BCEACategoryVal,
                                                                                "type": BCEATypeVal,
                                                                                "std": BCEASTDVal,
                                                                                "name": BCEANameVal,
                                                                                "thk": BCEATHKN,
                                                                                "temp": BCEADT,
                                                                                "highLow": 3,
                                                                                "isTube": 0,
                                                                                "od": BCEALDO
                                                                            }),
                                                                            beforeSend: function () {
                                                                            },
                                                                            success: function (result) {

                                                                                BCEADesignStress = parseFloat(result.ot);
                                                                                if (BCEADesignStress < 0) {
                                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                    return false;
                                                                                }
                                                                                BCEATestStress = parseFloat(result.o);
                                                                                if (BCEATestStress < 0) {
                                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                    return false;
                                                                                }
                                                                                BCEATestRel = parseFloat(result.rel);
                                                                                if (BCEATestRel < 0) {
                                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                    return false;
                                                                                }
                                                                                BCEAC1 = parseFloat(result.c1);
                                                                                if (BCEAC1 < 0) {
                                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                    return false;
                                                                                }

                                                                                // 厚度附加量C
                                                                                let BCEAC = BCEAC1 + BCEAC2;

                                                                                // 有效厚度
                                                                                let BCEATHKE = BCEATHKN - BCEAC;

                                                                                // 计算厚度
                                                                                let BCEATHKC = BCEAPC * BCEALDI / (2 * BCEADesignStress * BCEAE) / Math.cos(BCEARAD);

                                                                                // 设计厚度
                                                                                let BCEATHKD = BCEATHKC + BCEAC2;

                                                                                // 所需厚度提示信息
                                                                                south.html(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "所需厚度：" + (BCEATHKD + BCEAC1).toFixed(2) + " mm" +
                                                                                    "</span>");

                                                                                // 厚度校核
                                                                                let BCEATHKCHK;
                                                                                if (BCEATHKN >= (BCEATHKD + BCEAC1).toFixed(2)) {
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "输入厚度：" + BCEATHKN + " mm" +
                                                                                        "</span>");
                                                                                    BCEATHKCHK = "合格";
                                                                                } else {
                                                                                    south.append(
                                                                                        "<span style='color:red;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "输入厚度：" + BCEATHKN + " mm" +
                                                                                        "</span>");
                                                                                    BCEATHKCHK = "不合格";
                                                                                }

                                                                                // 压力试验
                                                                                let BCEATestPT;
                                                                                if (BCEATestVal === "液压试验") {
                                                                                    BCEATestPT = Math.max(1.25 * BCEAPD * BCEATestStress / BCEADesignStress, 0.05);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "试压类型：液压" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "试验压力：" + BCEATestPT.toFixed(4) + " MPa" +
                                                                                        "</span>");
                                                                                }
                                                                                else if (BCEATestVal === "气压试验") {

                                                                                    BCEATestPT = Math.max(1.10 * BCEAPD * BCEATestStress / BCEADesignStress, 0.05);
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "试压类型：气压" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "试验压力：" + BCEATestPT.toFixed(4) + " MPa" +
                                                                                        "</span>");
                                                                                }

                                                                                // MAWP
                                                                                let BCEAMAWP = (2 * BCEATHKE * BCEADesignStress * BCEAE) / (BCEALDI / Math.cos(BCEARAD)) - BCEAPS;
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "MAWP：" + BCEAMAWP.toFixed(4) + " MPa" +
                                                                                    "</span>");

                                                                                // 总高
                                                                                let BCEAH = (BCEALDO / 2 - BCEASDO / 2) / Math.tan(BCEARAD);

                                                                                // 内表面积
                                                                                let BCEAAI = Math.PI * ((BCEALDI / 2 - BCEASDI / 2) / Math.sin(BCEARAD)) * (BCEALDI / 2 + BCEASDI / 2) / 1000000;
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "内表面积：" + BCEAAI.toFixed(4) + " ㎡" +
                                                                                    "</span>");

                                                                                // 中面面积
                                                                                let BCEALDM = (BCEALDO + BCEALDI) / 2;
                                                                                let BCEASDM = (BCEASDO + BCEASDI) / 2;
                                                                                let BCEAAM = Math.PI * ((BCEALDM / 2 - BCEASDM / 2) / Math.sin(BCEARAD)) * (BCEALDM / 2 + BCEASDM / 2) / 1000000;

                                                                                // 外表面积
                                                                                let BCEAAO = Math.PI * ((BCEALDO / 2 - BCEASDO / 2) / Math.sin(BCEARAD)) * (BCEALDO / 2 + BCEASDO / 2) / 1000000;
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "外表面积：" + BCEAAO.toFixed(4) + " ㎡" +
                                                                                    "</span>");

                                                                                // 内容积
                                                                                let BCEAVI = Math.PI * ((BCEALDI / 2 - BCEASDI / 2) / Math.tan(BCEARAD)) * ((BCEASDI / 2) * (BCEASDI / 2) + (BCEASDI / 2) * (BCEALDI / 2) + (BCEALDI / 2) * (BCEALDI / 2)) / 3 / 1000000000;
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "内容积：" + BCEAVI.toFixed(4) + " m³" +
                                                                                    "</span>");

                                                                                // 质量
                                                                                let BCEAM = BCEADensity * BCEAAM * BCEATHKN / 1000;
                                                                                south.append(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "&ensp;|&ensp;" +
                                                                                    "重量：" + BCEAM.toFixed(4) + " kg" +
                                                                                    "</span>");

                                                                                // docx
                                                                                let BCEAPayJS = $('#payjs');

                                                                                function getDocx() {
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "bceadocx.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            ribbonName: "BCEA",

                                                                                            designPressure: BCEAPD,
                                                                                            designTemp: BCEADT,
                                                                                            staticPressure: BCEAPS,
                                                                                            std: BCEASTDVal,
                                                                                            name: BCEANameVal,
                                                                                            c2: BCEAC2.toFixed(4),
                                                                                            e: BCEAE.toFixed(4),
                                                                                            largeInnerDiameter: BCEALDI,
                                                                                            smallInnerDiameter: BCEASDI,
                                                                                            a: BCEAA,
                                                                                            thkn: BCEATHKN,
                                                                                            test: BCEATestVal,
                                                                                            density: BCEADensity.toFixed(4),
                                                                                            testRel: BCEATestRel.toFixed(4),
                                                                                            c1: BCEAC1.toFixed(4),
                                                                                            designStress: BCEADesignStress.toFixed(4),
                                                                                            testStress: BCEATestStress.toFixed(4),
                                                                                            c: BCEAC.toFixed(4),
                                                                                            thke: BCEATHKE.toFixed(4),
                                                                                            calPressure: BCEAPC.toFixed(4),
                                                                                            thkc: BCEATHKC.toFixed(4),
                                                                                            thkd: BCEATHKD.toFixed(4),
                                                                                            thkChk: BCEATHKCHK,
                                                                                            testPressure: BCEATestPT.toFixed(4),
                                                                                            mawp: BCEAMAWP.toFixed(4),
                                                                                            ai: BCEAAI.toFixed(4),
                                                                                            ao: BCEAAO.toFixed(4),
                                                                                            vi: BCEAVI.toFixed(4),
                                                                                            m: BCEAM.toFixed(4)
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
                                                                                                BCEAPayJS.dialog({
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
                                                                                                            BCEAPayJS.dialog("close");
                                                                                                            BCEAPayJS.dialog("clear");
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
                                                                                                                        BCEAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                BCEAPayJS.dialog('close');
                                                                                                                                BCEAPayJS.dialog('clear');
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

                                                                                function bcea3d() {

                                                                                    bceaModel.empty();

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
                                                                                    directionLight_1.position.set(1.5 * Math.max(BCEALDO, BCEAH), 1.5 * Math.max(BCEALDO, BCEAH), 1.5 * Math.max(BCEALDO, BCEAH));
                                                                                    scene.add(directionLight_1);
                                                                                    let directionLight_2 = new THREE.DirectionalLight(0x4f4f4f);
                                                                                    directionLight_2.position.set(-1.5 * Math.max(BCEALDO, BCEAH), -1.5 * Math.max(BCEALDO, BCEAH), -1.5 * Math.max(BCEALDO, BCEAH));
                                                                                    scene.add(directionLight_2);


                                                                                    // model
                                                                                    let material = new THREE.MeshLambertMaterial({
                                                                                        color: 0x4f4f4f,
                                                                                        side: THREE.DoubleSide
                                                                                    });

                                                                                    // 旋转建模筒体
                                                                                    let points = [];
                                                                                    points.push(new THREE.Vector3(BCEASDI / 2, 0 - BCEAH / 2, 0));
                                                                                    points.push(new THREE.Vector3(BCEASDI / 2 + BCEAH * Math.tan(BCEARAD), BCEAH - BCEAH / 2, 0));
                                                                                    points.push(new THREE.Vector3(BCEASDI / 2 + BCEAH * Math.tan(BCEARAD) + BCEATHKN * Math.cos(BCEARAD), BCEAH - BCEATHKN * Math.sin(BCEARAD) - BCEAH / 2, 0));
                                                                                    points.push(new THREE.Vector3(BCEASDI / 2 + BCEATHKN * Math.cos(BCEARAD), 0 - BCEATHKN * Math.sin(BCEARAD) - BCEAH / 2, 0));
                                                                                    points.push(new THREE.Vector3(BCEASDI / 2, 0 - BCEAH / 2, 0));
                                                                                    let cylinderShellGeometry = new THREE.LatheGeometry(points, 100, 0, 2 * Math.PI);
                                                                                    let cylinderShellMesh = new THREE.Mesh(cylinderShellGeometry, material);
                                                                                    scene.add(cylinderShellMesh);

                                                                                    // camera
                                                                                    let camera = new THREE.PerspectiveCamera(60, bceaModel.width() / bceaModel.height(), 1, 100000);
                                                                                    camera.position.z = 1.5 * Math.max(BCEALDO, BCEAH);

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
                                                                                    renderer.setSize(bceaModel.width(), bceaModel.height());
                                                                                    bceaModel.append(renderer.domElement);

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
                                                                                    bceaModel.resize(function () {
                                                                                        camera.aspect = bceaModel.width() / bceaModel.height();
                                                                                        camera.updateProjectionMatrix();
                                                                                        renderer.setSize(bceaModel.width(), bceaModel.height());
                                                                                        controls.handleResize();
                                                                                        render();
                                                                                    });

                                                                                    render();
                                                                                    animate();

                                                                                }

                                                                                // sketch
                                                                                if (currentTabIndex === 0) {

                                                                                    bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°", BCEATHKN);
                                                                                    bceaSketch.off("resize").on("resize", function () {
                                                                                        if ($("#bcea").length > 0) {
                                                                                            bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°", BCEATHKN);
                                                                                        }
                                                                                    });

                                                                                }
                                                                                else if (currentTabIndex === 1) {

                                                                                    bcea3d();
                                                                                }
                                                                                bcead2d3.tabs({
                                                                                    onSelect: function (title, index) {
                                                                                        if (index === 0) {
                                                                                            bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°", BCEATHKN);
                                                                                            bceaSketch.off("resize").on("resize", function () {
                                                                                                if ($("#bcea").length > 0) {
                                                                                                    bcea2d("ϕ" + BCEALDI, "ϕ" + BCEASDI, BCEAA + "°", BCEATHKN);
                                                                                                }
                                                                                            });
                                                                                        } else if (index === 1) {
                                                                                            bcea3d();
                                                                                        }
                                                                                    }
                                                                                });
                                                                            },
                                                                            error: function () {
                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                            }
                                                                        });
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                        && parseFloat(rows[13][columns[0][1].field]) <= Math.max(BCEAC2, BCEAThkMin)) {
                                                                        south.html("材料厚度不能小于等于 " + Math.max(BCEAC2, BCEAThkMin) + " mm").css("color", "red");
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                        && parseFloat(rows[13][columns[0][1].field]) > BCEAThkMax) {
                                                                        south.html("材料厚度不能大于 " + BCEAThkMax + " mm").css("color", "red");
                                                                    }
                                                                }
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                && parseFloat(rows[11][columns[0][1].field]) > BCEALDI) {
                                                                south.html("小端内直径 di 不能大于 " + BCEALDI + " mm").css("color", "red");
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
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});