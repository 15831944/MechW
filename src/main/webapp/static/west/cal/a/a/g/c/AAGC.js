$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aagcSketch = $("#d2");
    let aagcModel = $("#d3");
    let aagcd2d3 = $('#d2d3');

    $("#cal").html("<table id='aagc'></table>");
    let pg = $("#aagc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/g/c/AAGC.json", function (result) {

        let AAGCDT,
            AAGCCCategory, AAGCCCategoryVal, AAGCCType, AAGCCTypeVal, AAGCCSTD, AAGCCSTDVal, AAGCCName, AAGCCNameVal,
            columns, rows, ed;

        function aagc2d(dsi = "ϕDsi", alpha = "α", thkcn = "δcn", sh = "≥3δcn", ri = "ri") {

            aagcSketch.empty();

            let width = aagcSketch.width();
            let height = aagcSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAGCSVG").attr("height", height);

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
            dimBottomH(padding + wg, padding + 2 * hg + 3 * thk, padding + 3 * wg, padding + 2 * hg + 3 * thk, dsi, "AAGCSketchDSI");

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
            ])).attr("id", "AAGCSketchTHKCN").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGCSketchTHKCN").attr("startOffset", "50%").text(thkcn);

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
            ).attr("id", "AAGCSketchALPHA").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGCSketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "AAGCSketchRI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGCSketchRI").attr("startOffset", "50%").text(ri);

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
            ])).attr("id", "AAGCSketchSH").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAGCSketchSH").attr("startOffset", "50%").text(sh);
        }

        currentTabIndex = aagcd2d3.tabs('getTabIndex', aagcd2d3.tabs('getSelected'));

        // init Sketch
        if (currentTabIndex === 0) {
            aagc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aagc").length > 0) {
                    aagc2d();
                }
            });
        }
        aagcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aagc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aagc").length > 0) {
                            aagc2d();
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
                    $(ed.target).combobox("loadData", AAGCCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAGCCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAGCCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAGCCName);
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
                    aagcSketch.empty();

                    // model
                    aagcModel.empty();

                    // sketch
                    currentTabIndex = aagcd2d3.tabs('getTabIndex', aagcd2d3.tabs('getSelected'));

                    // init Sketch
                    if (currentTabIndex === 0) {
                        aagc2d();
                        aagcSketch.off("resize").on("resize", function () {
                            if ($("#aagc").length > 0) {
                                aagc2d();
                            }
                        });
                    }
                    aagcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aagc2d();
                                aagcSketch.off("resize").on("resize", function () {
                                    if ($("#aagc").length > 0) {
                                        aagc2d();
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

                        AAGCDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAGCCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAGCCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGCCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGCCName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGCCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAGCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAGCCCategory[index] = {
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

                        AAGCCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAGCCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGCCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGCCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGCCCategoryVal,
                                temp: AAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGCCType = [];
                                $(result).each(function (index, element) {
                                    AAGCCType[index] = {
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

                        AAGCCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAGCCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGCCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGCCCategoryVal,
                                type: AAGCCTypeVal,
                                temp: AAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGCCSTD = [];
                                $(result).each(function (index, element) {
                                    AAGCCSTD[index] = {
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

                        AAGCCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAGCCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAGCCCategoryVal,
                                type: AAGCCTypeVal,
                                std: AAGCCSTDVal,
                                temp: AAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAGCCName = [];
                                $(result).each(function (index, element) {
                                    AAGCCName[index] = {
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
                        let AAGCPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAGCPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAGCPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAGCPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAGCTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAGCTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 封头材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAGCCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取筒体材料密度、最大最小厚度
                        let AAGCDC, AAGCCThkMin, AAGCCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAGCCCategoryVal,
                                "type": AAGCCTypeVal,
                                "std": AAGCCSTDVal,
                                "name": AAGCCNameVal,
                                "temp": AAGCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAGCDC = parseFloat(result.density);
                                AAGCCThkMin = parseFloat(result.thkMin);
                                AAGCCThkMax = parseFloat(result.thkMax);

                                // 筒体内直径
                                let AAGCDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAGCDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aagc2d("Φ" + AAGCDSI);
                                    aagcSketch.off("resize").on("resize", function () {
                                        if ($("#aagc").length > 0) {
                                            aagc2d("Φ" + AAGCDSI);
                                        }
                                    });
                                }
                                aagcd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aagc2d("Φ" + AAGCDSI);
                                            aagcSketch.off("resize").on("resize", function () {
                                                if ($("#aagc").length > 0) {
                                                    aagc2d("Φ" + AAGCDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 半顶角 alpha
                                let AAGCALPHA;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    AAGCALPHA = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°");
                                    aagcSketch.off("resize").on("resize", function () {
                                        if ($("#aagc").length > 0) {
                                            aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°");
                                        }
                                    });
                                }
                                aagcd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°");
                                            aagcSketch.off("resize").on("resize", function () {
                                                if ($("#aagc").length > 0) {
                                                    aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                // 封头名义厚度
                                let AAGCTHKCN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAGCCThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAGCCThkMax) {
                                    AAGCTHKCN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAGCCThkMin) {
                                    south.html("封头材料厚度不能小于等于 " + AAGCCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAGCCThkMax) {
                                    south.html("封头材料厚度不能大于 " + AAGCCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°", AAGCTHKCN, "≥" + 3 * AAGCTHKCN);
                                    aagcSketch.off("resize").on("resize", function () {
                                        if ($("#aagc").length > 0) {
                                            aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°", AAGCTHKCN, "≥" + 3 * AAGCTHKCN);
                                        }
                                    });
                                }
                                aagcd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°", AAGCTHKCN, "≥" + 3 * AAGCTHKCN);
                                            aagcSketch.off("resize").on("resize", function () {
                                                if ($("#aagc").length > 0) {
                                                    aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°", AAGCTHKCN, "≥" + 3 * AAGCTHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAGCOCT, AAGCOC, AAGCOCT1, AAGCRCEL, AAGCCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAGCCCategoryVal,
                                        "type": AAGCCTypeVal,
                                        "std": AAGCCSTDVal,
                                        "name": AAGCCNameVal,
                                        "thk": AAGCTHKCN,
                                        "temp": AAGCDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAGCDSI + 2 * AAGCTHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAGCOCT = parseFloat(result.ot);
                                        if (AAGCOCT < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGCOC = parseFloat(result.o);
                                        if (AAGCOC < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGCRCEL = parseFloat(result.rel);
                                        if (AAGCRCEL < 0) {
                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGCCC1 = parseFloat(result.c1);
                                        if (AAGCCC1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }
                                        AAGCOCT1 = parseFloat(result.ot1);

                                        // 转角内半径
                                        let AAGCRI;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= Math.max(0.1 * AAGCDSI, 3 * AAGCTHKCN)) {
                                            AAGCRI = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < Math.max(0.1 * AAGCDSI, 3 * AAGCTHKCN)) {
                                            south.html("封头大端转角内半径不能小于 " + Math.max(0.1 * AAGCDSI, 3 * AAGCTHKCN).toFixed(1) + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°", AAGCTHKCN, "≥" + 3 * AAGCTHKCN, "R" + AAGCRI);
                                            aagcSketch.off("resize").on("resize", function () {
                                                if ($("#aagc").length > 0) {
                                                    aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°", AAGCTHKCN, "≥" + 3 * AAGCTHKCN, "R" + AAGCRI);
                                                }
                                            });
                                        }
                                        aagcd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°", AAGCTHKCN, "≥" + 3 * AAGCTHKCN, "R" + AAGCRI);
                                                    aagcSketch.off("resize").on("resize", function () {
                                                        if ($("#aagc").length > 0) {
                                                            aagc2d("Φ" + AAGCDSI, AAGCALPHA + "°", AAGCTHKCN, "≥" + 3 * AAGCTHKCN, "R" + AAGCRI);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 封头焊接接头系数
                                        let AAGCEC;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            AAGCEC = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 封头腐蚀裕量
                                        let AAGCCC2;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                            && parseFloat(rows[13][columns[0][1].field]) < AAGCTHKCN) {
                                            AAGCCC2 = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                            && parseFloat(rows[13][columns[0][1].field]) >= AAGCTHKCN) {
                                            south.html("封头腐蚀裕量不能大于等于 " + AAGCTHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 过程参数
                                        let AAGCPC = AAGCPD + AAGCPS;
                                        let AAGCCC = AAGCCC1 + AAGCCC2;
                                        let AAGCTHKCE = AAGCTHKCN - AAGCCC;

                                        // 内压计算及校核
                                        let AAGCBETA = 0.4 * Math.sqrt(AAGCDSI / AAGCTHKCE)
                                            * Math.tan(AAGCALPHA / 180 * Math.PI)
                                            / (1 + Math.sqrt(1 / Math.cos(AAGCALPHA / 180 * Math.PI)))
                                            - 0.25;
                                        let AAGCBETAT = 1 / (1 + (0.028 * AAGCRI / AAGCDSI * Math.sqrt(AAGCDSI / AAGCTHKCE * AAGCALPHA)) / (1 + 1 / Math.sqrt(Math.cos(AAGCALPHA / 180 * Math.PI))));
                                        let AAGCBETA3 = Math.max(0.5, AAGCBETA * AAGCBETAT);
                                        let AAGCTHKK = AAGCPC * AAGCDSI / (2 * AAGCOCT * AAGCEC - AAGCPC) / Math.cos(AAGCALPHA / 180 * Math.PI);
                                        let AAGCTHKT = AAGCPC * AAGCDSI * AAGCBETA3 / (2 * AAGCOCT * AAGCEC - AAGCPC);
                                        let AAGCTHKP = 0.3 * (AAGCDSI - AAGCRI) * (AAGCALPHA / 90) * Math.sqrt(AAGCPC / (AAGCOCT * AAGCEC));
                                        let AAGCTHKCC = Math.min(Math.max(AAGCTHKK, AAGCTHKT), AAGCTHKP);
                                        let AAGCTHKCD = AAGCTHKCC + AAGCCC2;
                                        south.html(
                                            "<span style='color:#444444;'>" +
                                            "封头所需厚度：" + (AAGCTHKCD + AAGCCC1).toFixed(2) + " mm" +
                                            "</span>");
                                        let AAGCTHKCCHK;
                                        if (AAGCTHKCN >= (AAGCTHKCD + AAGCCC1).toFixed(2)) {
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "输入厚度：" + AAGCTHKCN + " mm" +
                                                "</span>");
                                            AAGCTHKCCHK = "合格";
                                        } else {
                                            south.append(
                                                "<span style='color:red;'>" +
                                                "&ensp;|&ensp;" +
                                                "输入厚度：" + AAGCTHKCN + " mm" +
                                                "</span>");
                                            AAGCTHKCCHK = "不合格";
                                        }

                                        // 压力试验
                                        let AAGCPCT;
                                        if (AAGCTest === "液压试验") {
                                            AAGCPCT = 1.25 * AAGCPD * AAGCOC / Math.max(AAGCOCT, AAGCOCT1);
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "试压类型：液压" +
                                                "&ensp;|&ensp;" +
                                                "试验压力：" + AAGCPCT.toFixed(4) + " MPa" +
                                                "</span>");
                                        }
                                        else if (AAGCTest === "气压试验") {
                                            AAGCPCT = 1.1 * AAGCPD * AAGCOC / Math.max(AAGCOCT, AAGCOCT1);
                                            south.append(
                                                "<span style='color:#444444;'>" +
                                                "&ensp;|&ensp;" +
                                                "试压类型：气压" +
                                                "&ensp;|&ensp;" +
                                                "试验压力：" + AAGCPCT.toFixed(4) + " MPa" +
                                                "</span>");
                                        }

                                        let AAGCPK = 2 * AAGCOCT * AAGCEC * AAGCTHKCE / (AAGCDSI / Math.cos(AAGCALPHA) + AAGCTHKCE);
                                        let AAGCPT = 2 * AAGCOCT * AAGCEC * AAGCTHKCE / (AAGCDSI * AAGCBETA3 + AAGCTHKCE);
                                        let AAGCPP = AAGCOCT * AAGCEC * Math.pow(AAGCTHKCE * 90 / 0.3 / (AAGCDSI - AAGCRI) / AAGCALPHA, 2);
                                        let AAGCMAWPC = Math.max(Math.min(AAGCPK, AAGCPT), AAGCPP) - AAGCPS;
                                        south.append(
                                            "<span style='color:#444444;'>" +
                                            "&ensp;|&ensp;" +
                                            "MAWP：" + AAGCMAWPC.toFixed(4) + " MPa" +
                                            "</span>");

                                        // docx
                                        let AAGCPayJS = $('#payjs');

                                        function getDocx() {
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "aagcdocx.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    ribbonName: "AAGC",

                                                    pd: AAGCPD,
                                                    t: AAGCDT,
                                                    ps: AAGCPS,

                                                    stdc: AAGCCSTDVal,
                                                    namec: AAGCCNameVal,
                                                    dsi: AAGCDSI,
                                                    alpha: AAGCALPHA,
                                                    thkcn: AAGCTHKCN,
                                                    ri: AAGCRI,
                                                    cc2: AAGCCC2,
                                                    ec: AAGCEC,

                                                    test: AAGCTest,

                                                    dc: AAGCDC.toFixed(4),
                                                    cc1: AAGCCC1.toFixed(4),
                                                    oct: AAGCOCT.toFixed(4),
                                                    oc: AAGCOC.toFixed(4),
                                                    rcel: AAGCRCEL.toFixed(4),
                                                    oct1: AAGCOCT1.toFixed(4),

                                                    pc: AAGCPC.toFixed(4),

                                                    cc: AAGCCC.toFixed(4),
                                                    thkce: AAGCTHKCE.toFixed(4),

                                                    beta: AAGCBETA.toFixed(4),
                                                    betat: AAGCBETAT.toFixed(4),
                                                    beta3: AAGCBETA3.toFixed(4),
                                                    thkk: AAGCTHKK.toFixed(4),
                                                    thkt: AAGCTHKT.toFixed(4),
                                                    thkp: AAGCTHKP.toFixed(4),
                                                    thkcc: AAGCTHKCC.toFixed(4),
                                                    thkcd: AAGCTHKCD.toFixed(4),
                                                    thkcchk: AAGCTHKCCHK,

                                                    pct: AAGCPCT.toFixed(4),

                                                    pk: AAGCPK.toFixed(4),
                                                    pt: AAGCPT.toFixed(4),
                                                    pp: AAGCPP.toFixed(4),
                                                    mawpc: AAGCMAWPC.toFixed(4)
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
                                                        AAGCPayJS.dialog({
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
                                                                    AAGCPayJS.dialog("close");
                                                                    AAGCPayJS.dialog("clear");
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
                                                                                AAGCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                // 倒计时计数器
                                                                                let maxTime = 4, timer;

                                                                                function CountDown() {
                                                                                    if (maxTime >= 0) {
                                                                                        $("#payjs_timer").html(maxTime);
                                                                                        --maxTime;
                                                                                    } else {

                                                                                        clearInterval(timer);
                                                                                        // 关闭并清空收银台
                                                                                        AAGCPayJS.dialog('close');
                                                                                        AAGCPayJS.dialog('clear');
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