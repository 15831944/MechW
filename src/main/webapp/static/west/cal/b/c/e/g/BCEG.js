$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcegSketch = $("#d2");
    let bcegModel = $("#d3");
    let bcegd2d3 = $('#d2d3');

    $("#cal").html("<table id='bceg'></table>");
    let pg = $("#bceg");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/e/g/BCEG.json", function (result) {

        let BCEGDT,
            BCEGCCategory, BCEGCCategoryVal, BCEGCType, BCEGCTypeVal, BCEGCSTD, BCEGCSTDVal, BCEGCName, BCEGCNameVal,
            columns, rows, ed;

        function bceg2d(dsi = "ϕDsi", alpha = "α", thkcn = "δcn", sh = "≥3δcn", ri = "ri") {

            bcegSketch.empty();

            let width = bcegSketch.width();
            let height = bcegSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCEGSVG").attr("height", height);

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
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            let padding = 60;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let thk = 10;

            // 筒体
            drawLine(padding + wg, padding + 2 * hg, padding + wg, padding + 2 * hg + 3 * thk);
            drawLine(padding + wg - thk, padding + 2 * hg, padding + wg - thk, padding + 2 * hg + 3 * thk);
            drawLine(padding + 3 * wg, padding + 2 * hg, padding + 3 * wg, padding + 2 * hg + 3 * thk);
            drawLine(padding + 3 * wg + thk, padding + 2 * hg, padding + 3 * wg + thk, padding + 2 * hg + 3 * thk);
            drawCenterLine(padding + wg - thk, padding + 2 * hg, padding + 3 * wg + thk, padding + 2 * hg);
            drawLine(padding + wg - thk, padding + 2 * hg + 3 * thk, padding + 3 * wg + thk, padding + 2 * hg + 3 * thk);

            // dsi
            dimBottomH(padding + wg, padding + 2 * hg + 3 * thk, padding + 3 * wg, padding + 2 * hg + 3 * thk, dsi, "BCEGSketchDSI");

            // thkcn
            extLineBottomV(padding + wg - thk, padding + 2 * hg + 3 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + wg - thk, y: padding + 2 * hg + 3 * thk + 30},
                    {x: padding + wg - thk - 15, y: padding + 2 * hg + 3 * thk + 27},
                    {x: padding + wg - thk - 15, y: padding + 2 * hg + 3 * thk + 33},
                    {x: padding + wg - thk, y: padding + 2 * hg + 3 * thk + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + wg, y: padding + 2 * hg + 3 * thk + 30},
                {x: padding + wg - thk, y: padding + 2 * hg + 3 * thk + 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg - thk - 15 - 40, y: padding + 2 * hg + 3 * thk + 30},
                {x: padding + wg - thk - 15, y: padding + 2 * hg + 3 * thk + 30}
            ])).attr("id", "BCEGSketchTHKCN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEGSketchTHKCN").attr("startOffset", "50%").text(thkcn);

            // 转角区
            let ang = 70 / 180 * Math.PI;
            let bri = 3 * thk;
            let bro = bri + thk;

            // 左侧
            svg.append("path").attr("d", "M "
                + (padding + wg) + " " + (height / 2) + " "
                + "A" + bri + " " + bri + " "
                + "1 0 1" + " "
                + (padding + wg + bri - bri * Math.cos(ang)) + " " + (height / 2 - bri * Math.sin(ang))
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (padding + wg - thk) + " " + (height / 2) + " "
                + "A" + bro + " " + bro + " "
                + "1 0 1" + " "
                + (padding + wg + bri - bro * Math.cos(ang)) + " " + (height / 2 - bro * Math.sin(ang))
            ).classed("sketch", true);

            let deltaX = 0.7 * wg - bri + bri * Math.cos(ang);
            let deltaY = deltaX / Math.tan(ang);
            drawLine(padding + wg + bri - bri * Math.cos(ang), height / 2 - bri * Math.sin(ang),
                padding + wg + bri - bri * Math.cos(ang) + deltaX, height / 2 - bri * Math.sin(ang) - deltaY);
            drawLine(padding + wg + bri - bro * Math.cos(ang), height / 2 - bro * Math.sin(ang),
                padding + wg + bri - bro * Math.cos(ang) + deltaX, height / 2 - bro * Math.sin(ang) - deltaY);

            // 右侧
            svg.append("path").attr("d", "M "
                + (padding + 3 * wg - bri + bri * Math.cos(ang)) + " " + (height / 2 - bri * Math.sin(ang)) + " "
                + "A" + bri + " " + bri + " "
                + "1 0 1" + " "
                + (padding + 3 * wg) + " " + (height / 2)
            ).classed("sketch", true);
            svg.append("path").attr("d", "M "
                + (padding + 3 * wg - bri + bro * Math.cos(ang)) + " " + (height / 2 - bro * Math.sin(ang)) + " "
                + "A" + bro + " " + bro + " "
                + "1 0 1" + " "
                + (padding + 3 * wg + thk) + " " + (height / 2)
            ).classed("sketch", true);
            drawLine(padding + 3 * wg - bri + bro * Math.cos(ang), height / 2 - bro * Math.sin(ang),
                padding + 3 * wg - bri + bro * Math.cos(ang) - deltaX, height / 2 - bro * Math.sin(ang) - deltaY);
            drawLine(padding + 3 * wg - bri + bri * Math.cos(ang), height / 2 - bri * Math.sin(ang),
                padding + 3 * wg - bri + bri * Math.cos(ang) - deltaX, height / 2 - bri * Math.sin(ang) - deltaY);

            svg.append("path").attr("d", line([
                {x: padding + wg + bri - bri * Math.cos(ang) + deltaX, y: height / 2 - bri * Math.sin(ang) - deltaY},
                {x: padding + wg + bri - bro * Math.cos(ang) + deltaX, y: height / 2 - bro * Math.sin(ang) - deltaY},
                {
                    x: padding + 3 * wg - bri + bro * Math.cos(ang) - deltaX,
                    y: height / 2 - bro * Math.sin(ang) - deltaY
                },
                {
                    x: padding + 3 * wg - bri + bri * Math.cos(ang) - deltaX,
                    y: height / 2 - bri * Math.sin(ang) - deltaY
                },
                {x: padding + wg + bri - bri * Math.cos(ang) + deltaX, y: height / 2 - bri * Math.sin(ang) - deltaY}
            ])).classed("sketch", true);

            drawCenterLine(width / 2, height / 2 - bro * Math.sin(ang) - deltaY - 10, width / 2, height / 2 + 3 * thk + 10);

            // alpha
            let cr = 0.5 * wg / Math.sin(ang);
            let cx0 = width / 2;
            let cy0 = height / 2 - bri * Math.sin(ang) - deltaY - 0.3 * wg / Math.tan(ang);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: cy0 + cr},
                    {x: width / 2 - 15, y: cy0 + cr + 3},
                    {x: width / 2 - 15, y: cy0 + cr - 3},
                    {x: width / 2, y: cy0 + cr}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2, y: cy0 + cr},
                    {x: width / 2 + 15, y: cy0 + cr + 3},
                    {x: width / 2 + 15, y: cy0 + cr - 3},
                    {x: width / 2, y: cy0 + cr}
                ])).attr("transform", "rotate(" + (ang / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").attr("d", "M "
                + (cx0 - cr * Math.sin(ang)) + " " + (cy0 + cr * Math.cos(ang)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0) + " " + (cy0 + cr)
            ).attr("id", "BCEGSketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEGSketchALPHA").attr("startOffset", "50%").text(alpha);

            // ri
            let cx1 = padding + wg + bri;
            let cy1 = height / 2;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx1 + bri, y: cy1},
                    {x: cx1 + bri - 15, y: cy1 + 3},
                    {x: cx1 + bri - 15, y: cy1 - 3},
                    {x: cx1 + bri, y: cy1}
                ])).attr("transform", "rotate(" + -135 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx1, y: cy1},
                    {x: cx1 + bri + 1.5 * thk, y: cy1}
                ])).attr("transform", "rotate(" + -135 + ", " + cx1 + " " + cy1 + ")");
            svg.append("path").attr("d", line([
                {x: cx1 - 0.707 * (bri + 1.5 * thk) - 50, y: cy1 - 0.707 * (bri + 1.5 * thk)},
                {x: cx1 - 0.707 * (bri + 1.5 * thk), y: cy1 - 0.707 * (bri + 1.5 * thk)}
            ])).attr("id", "BCEGSketchRI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEGSketchRI").attr("startOffset", "50%").text(ri);

            // sh
            extLineRightH(padding + 3 * wg + thk, height / 2);
            extLineRightH(padding + 3 * wg + thk, height / 2 + 3 * thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + thk + 30, y: height / 2},
                    {x: padding + 3 * wg + thk + 30 + 3, y: height / 2 - 15},
                    {x: padding + 3 * wg + thk + 30 - 3, y: height / 2 - 15},
                    {x: padding + 3 * wg + thk + 30, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + thk + 30, y: height / 2 + 3 * thk},
                    {x: padding + 3 * wg + thk + 30 + 3, y: height / 2 + 3 * thk + 15},
                    {x: padding + 3 * wg + thk + 30 - 3, y: height / 2 + 3 * thk + 15},
                    {x: padding + 3 * wg + thk + 30, y: height / 2 + 3 * thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk + 30, y: height / 2 - 15 - 10},
                {x: padding + 3 * wg + thk + 30, y: height / 2 + 3 * thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + thk + 30, y: height / 2 + 3 * thk + 15 + 40},
                {x: padding + 3 * wg + thk + 30, y: height / 2 + 3 * thk + 15}
            ])).attr("id", "BCEGSketchSH").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCEGSketchSH").attr("startOffset", "50%").text(sh);
        }

        currentTabIndex = bcegd2d3.tabs('getTabIndex', bcegd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            bceg2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bceg").length > 0) {
                    bceg2d();
                }
            });
        }
        bcegd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bceg2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bceg").length > 0) {
                            bceg2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 大锥角(α≥70°)带折边锥壳内压计算",
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
                    $(ed.target).combobox("loadData", BCEGCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCEGCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCEGCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCEGCName);
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
                    bcegSketch.empty();

                    // model
                    bcegModel.empty();

                    // sketch
                    currentTabIndex = bcegd2d3.tabs('getTabIndex', bcegd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        bceg2d();
                        bcegSketch.off("resize").on("resize", function () {
                            if ($("#bceg").length > 0) {
                                bceg2d();
                            }
                        });
                    }
                    bcegd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bceg2d();
                                bcegSketch.off("resize").on("resize", function () {
                                    if ($("#bceg").length > 0) {
                                        bceg2d();
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

                        BCEGDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCEGCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEGCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEGCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEGCName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCEGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEGCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCEGDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BCEGCCategory[index] = {
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

                        BCEGCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCEGCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEGCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEGCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEGCCategoryVal,
                                temp: BCEGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEGCType = [];
                                $(result).each(function (index, element) {
                                    BCEGCType[index] = {
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

                        BCEGCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCEGCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEGCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEGCCategoryVal,
                                type: BCEGCTypeVal,
                                temp: BCEGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEGCSTD = [];
                                $(result).each(function (index, element) {
                                    BCEGCSTD[index] = {
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

                        BCEGCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCEGCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCEGCCategoryVal,
                                type: BCEGCTypeVal,
                                std: BCEGCSTDVal,
                                temp: BCEGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCEGCName = [];
                                $(result).each(function (index, element) {
                                    BCEGCName[index] = {
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
                        let BCEGPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BCEGPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BCEGPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            BCEGPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let BCEGTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BCEGTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 封头材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            BCEGCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取筒体材料密度、最大最小厚度
                        let BCEGDC, BCEGCThkMin, BCEGCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BCEGCCategoryVal,
                                "type": BCEGCTypeVal,
                                "std": BCEGCSTDVal,
                                "name": BCEGCNameVal,
                                "temp": BCEGDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BCEGDC = parseFloat(result.density);
                                BCEGCThkMin = parseFloat(result.thkMin);
                                BCEGCThkMax = parseFloat(result.thkMax);

                                // 筒体内直径
                                let BCEGDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    BCEGDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bceg2d("Φ" + BCEGDSI);
                                    bcegSketch.off("resize").on("resize", function () {
                                        if ($("#bceg").length > 0) {
                                            bceg2d("Φ" + BCEGDSI);
                                        }
                                    });
                                }
                                bcegd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bceg2d("Φ" + BCEGDSI);
                                            bcegSketch.off("resize").on("resize", function () {
                                                if ($("#bceg").length > 0) {
                                                    bceg2d("Φ" + BCEGDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 半顶角 alpha
                                let BCEGALPHA;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    BCEGALPHA = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°");
                                    bcegSketch.off("resize").on("resize", function () {
                                        if ($("#bceg").length > 0) {
                                            bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°");
                                        }
                                    });
                                }
                                bcegd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°");
                                            bcegSketch.off("resize").on("resize", function () {
                                                if ($("#bceg").length > 0) {
                                                    bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                // 封头名义厚度
                                let BCEGTHKCN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BCEGCThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= BCEGCThkMax) {
                                    BCEGTHKCN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= BCEGCThkMin) {
                                    south.html("封头材料厚度不能小于等于 " + BCEGCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BCEGCThkMax) {
                                    south.html("封头材料厚度不能大于 " + BCEGCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°", BCEGTHKCN, "≥" + 3 * BCEGTHKCN);
                                    bcegSketch.off("resize").on("resize", function () {
                                        if ($("#bceg").length > 0) {
                                            bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°", BCEGTHKCN, "≥" + 3 * BCEGTHKCN);
                                        }
                                    });
                                }
                                bcegd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°", BCEGTHKCN, "≥" + 3 * BCEGTHKCN);
                                            bcegSketch.off("resize").on("resize", function () {
                                                if ($("#bceg").length > 0) {
                                                    bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°", BCEGTHKCN, "≥" + 3 * BCEGTHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BCEGOCT, BCEGOC, BCEGRCEL, BCEGCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BCEGCCategoryVal,
                                        "type": BCEGCTypeVal,
                                        "std": BCEGCSTDVal,
                                        "name": BCEGCNameVal,
                                        "thk": BCEGTHKCN,
                                        "temp": BCEGDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BCEGDSI + 2 * BCEGTHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BCEGOCT = parseFloat(result.ot);
                                        if (BCEGOCT < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEGOC = parseFloat(result.o);
                                        if (BCEGOC < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEGRCEL = parseFloat(result.rel);
                                        if (BCEGRCEL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BCEGCC1 = parseFloat(result.c1);
                                        if (BCEGCC1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        // 转角内半径
                                        let BCEGRI;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= Math.max(0.1 * BCEGDSI, 3 * BCEGTHKCN)) {
                                            BCEGRI = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < Math.max(0.1 * BCEGDSI, 3 * BCEGTHKCN)) {
                                            south.html("封头大端转角内半径不能小于 " + Math.max(0.1 * BCEGDSI, 3 * BCEGTHKCN).toFixed(1) + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°", BCEGTHKCN, "≥" + 3 * BCEGTHKCN, "R" + BCEGRI);
                                            bcegSketch.off("resize").on("resize", function () {
                                                if ($("#bceg").length > 0) {
                                                    bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°", BCEGTHKCN, "≥" + 3 * BCEGTHKCN, "R" + BCEGRI);
                                                }
                                            });
                                        }
                                        bcegd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°", BCEGTHKCN, "≥" + 3 * BCEGTHKCN, "R" + BCEGRI);
                                                    bcegSketch.off("resize").on("resize", function () {
                                                        if ($("#bceg").length > 0) {
                                                            bceg2d("Φ" + BCEGDSI, BCEGALPHA + "°", BCEGTHKCN, "≥" + 3 * BCEGTHKCN, "R" + BCEGRI);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 封头焊接接头系数
                                        let BCEGEC;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            BCEGEC = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 封头腐蚀裕量
                                        let BCEGCC2;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                            && parseFloat(rows[13][columns[0][1].field]) < BCEGTHKCN) {
                                            BCEGCC2 = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                            && parseFloat(rows[13][columns[0][1].field]) >= BCEGTHKCN) {
                                            south.html("封头腐蚀裕量不能大于等于 " + BCEGTHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 过程参数
                                        let BCEGPC = BCEGPD + BCEGPS;
                                        let BCEGCC = BCEGCC1 + BCEGCC2;
                                        let BCEGTHKCE = BCEGTHKCN - BCEGCC;

                                        // 内压计算及校核
                                        let BCEGBETA = 0.4 * Math.sqrt(BCEGDSI / BCEGTHKCE)
                                            * Math.tan(BCEGALPHA / 180 * Math.PI)
                                            / (1 + Math.sqrt(1 / Math.cos(BCEGALPHA / 180 * Math.PI)))
                                            - 0.25;
                                        let BCEGBETAT = 1 / (1 + (0.028 * BCEGRI / BCEGDSI * Math.sqrt(BCEGDSI / BCEGTHKCE * BCEGALPHA)) / (1 + 1 / Math.sqrt(Math.cos(BCEGALPHA / 180 * Math.PI))));
                                        let BCEGBETA3 = Math.max(0.5, BCEGBETA * BCEGBETAT);
                                        let BCEGTHKK = BCEGPC * BCEGDSI / (2 * BCEGOCT * BCEGEC - BCEGPC) / Math.cos(BCEGALPHA / 180 * Math.PI);
                                        let BCEGTHKT = BCEGPC * BCEGDSI * BCEGBETA3 / (2 * BCEGOCT * BCEGEC - BCEGPC);
                                        let BCEGTHKP = 0.3 * (BCEGDSI - BCEGRI) * (BCEGALPHA / 90) * Math.sqrt(BCEGPC / (BCEGOCT * BCEGEC));
                                        let BCEGTHKCC = Math.min(Math.max(BCEGTHKK, BCEGTHKT), BCEGTHKP);
                                        let BCEGTHKCD = BCEGTHKCC + BCEGCC2;
                                        south.html(
                                            "<span style='color:#444444;'>" +
                                            "封头所需厚度：" + (BCEGTHKCD + BCEGCC1).toFixed(2) + " mm" +
                                            "</span>");
                                        let BCEGTHKCCHK;
                                        if (BCEGTHKCN >= (BCEGTHKCD + BCEGCC1).toFixed(2)) {
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "输入厚度：" + BCEGTHKCN + " mm" +
                                                "</span>");
                                            BCEGTHKCCHK = "合格";
                                        } else {
                                            south.append(
                                                "<span style='color:red;'>" +
                                                "&ensp;|&ensp;" +
                                                "输入厚度：" + BCEGTHKCN + " mm" +
                                                "</span>");
                                            BCEGTHKCCHK = "不合格";
                                        }

                                        // 压力试验
                                        let BCEGPCT;
                                        if (BCEGTest === "液压试验") {
                                            BCEGPCT = Math.max(1.25 * BCEGPD * BCEGOC / BCEGOCT, 0.05);
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "试压类型：液压" +
                                                "&ensp;|&ensp;" +
                                                "试验压力：" + BCEGPCT.toFixed(4) + " MPa" +
                                                "</span>");
                                        }
                                        else if (BCEGTest === "气压试验") {
                                            BCEGPCT = Math.max(1.10 * BCEGPD * BCEGOC / BCEGOCT, 0.05);
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "试压类型：气压" +
                                                "&ensp;|&ensp;" +
                                                "试验压力：" + BCEGPCT.toFixed(4) + " MPa" +
                                                "</span>");
                                        }

                                        let BCEGPK = 2 * BCEGOCT * BCEGEC * BCEGTHKCE / (BCEGDSI / Math.cos(BCEGALPHA) + BCEGTHKCE);
                                        let BCEGPT = 2 * BCEGOCT * BCEGEC * BCEGTHKCE / (BCEGDSI * BCEGBETA3 + BCEGTHKCE);
                                        let BCEGPP = BCEGOCT * BCEGEC * Math.pow(BCEGTHKCE * 90 / 0.3 / (BCEGDSI - BCEGRI) / BCEGALPHA, 2);
                                        let BCEGMAWPC = Math.max(Math.min(BCEGPK, BCEGPT), BCEGPP) - BCEGPS;
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "MAWP：" + BCEGMAWPC.toFixed(4) + " MPa" +
                                            "</span>");

                                        // docx
                                        let BCEGPayJS = $('#payjs');

                                        function getDocx() {
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "bcegdocx.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    ribbonName: "BCEG",

                                                    pd: BCEGPD,
                                                    t: BCEGDT,
                                                    ps: BCEGPS,

                                                    stdc: BCEGCSTDVal,
                                                    namec: BCEGCNameVal,
                                                    dsi: BCEGDSI,
                                                    alpha: BCEGALPHA,
                                                    thkcn: BCEGTHKCN,
                                                    ri: BCEGRI,
                                                    cc2: BCEGCC2,
                                                    ec: BCEGEC,

                                                    test: BCEGTest,

                                                    dc: BCEGDC.toFixed(4),
                                                    cc1: BCEGCC1.toFixed(4),
                                                    oct: BCEGOCT.toFixed(4),
                                                    oc: BCEGOC.toFixed(4),
                                                    rcel: BCEGRCEL.toFixed(4),

                                                    pc: BCEGPC.toFixed(4),

                                                    cc: BCEGCC.toFixed(4),
                                                    thkce: BCEGTHKCE.toFixed(4),

                                                    beta: BCEGBETA.toFixed(4),
                                                    betat: BCEGBETAT.toFixed(4),
                                                    beta3: BCEGBETA3.toFixed(4),
                                                    thkk: BCEGTHKK.toFixed(4),
                                                    thkt: BCEGTHKT.toFixed(4),
                                                    thkp: BCEGTHKP.toFixed(4),
                                                    thkcc: BCEGTHKCC.toFixed(4),
                                                    thkcd: BCEGTHKCD.toFixed(4),
                                                    thkcchk: BCEGTHKCCHK,

                                                    pct: BCEGPCT.toFixed(4),

                                                    pk: BCEGPK.toFixed(4),
                                                    pt: BCEGPT.toFixed(4),
                                                    pp: BCEGPP.toFixed(4),
                                                    mawpc: BCEGMAWPC.toFixed(4)
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
                                                        BCEGPayJS.dialog({
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
                                                                    BCEGPayJS.dialog("close");
                                                                    BCEGPayJS.dialog("clear");
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
                                                                                BCEGPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                // 倒计时计数器
                                                                                let maxTime = 4, timer;

                                                                                function CountDown() {
                                                                                    if (maxTime >= 0) {
                                                                                        $("#payjs_timer").html(maxTime);
                                                                                        --maxTime;
                                                                                    } else {

                                                                                        clearInterval(timer);
                                                                                        // 关闭并清空收银台
                                                                                        BCEGPayJS.dialog('close');
                                                                                        BCEGPayJS.dialog('clear');
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
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});