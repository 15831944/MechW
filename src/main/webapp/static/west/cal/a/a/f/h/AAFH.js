$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aafhSketch = $("#d2");
    let aafhModel = $("#d3");
    let aafhd2d3 = $('#d2d3');

    $("#cal").html("<table id='aafh'></table>");
    let pg = $("#aafh");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/f/h/AAFH.json", function (result) {

        let AAFHDT,
            AAFHCategory, AAFHCategoryVal, AAFHType, AAFHTypeVal, AAFHSTD, AAFHSTDVal, AAFHName, AAFHNameVal,
            columns, rows, ed;

        function aafh2d(dsi = "ΦDsi", dpi = "ΦDpi", thkn = "δn", rs = "rs", rp = "rp", alpha = "α") {

            aafhSketch.empty();

            let width = aafhSketch.width();
            let height = aafhSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAFHSVG").attr("height", height);

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
            let thk = 12;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;
            let ri = 3 * thk;
            let ro = ri + thk;
            let rad = Math.atan(hg / (wg));
            let deg = rad / Math.PI * 180;

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

            // 锥段内壁
            drawLine(padding + 1.5 * wg, padding + hg, padding + 2.5 * wg, padding);
            drawLine(padding + 1.5 * wg, padding + 3 * hg, padding + 2.5 * wg, padding + 4 * hg);

            // 锥段外壁
            drawLine(padding + 1.5 * wg - thk * Math.sin(rad), padding + hg - thk * Math.cos(rad), padding + 2.5 * wg - thk * Math.sin(rad), padding - thk * Math.cos(rad));
            drawLine(padding + 1.5 * wg - thk * Math.sin(rad), padding + 3 * hg + thk * Math.cos(rad), padding + 2.5 * wg - thk * Math.sin(rad), padding + 4 * hg + thk * Math.cos(rad));

            // 小端 上
            drawArc(ro, ro, padding + 1.5 * wg, padding + hg, padding + 1.5 * wg - ro * Math.sin(rad), padding + hg + ro - ro * Math.cos(rad));

            // 小端-下
            drawArc(ro, ro, padding + 1.5 * wg - ro * Math.sin(rad), padding + 3 * hg - ro + ro * Math.cos(rad), padding + 1.5 * wg, padding + 3 * hg);

            // 小端直边段
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - ro * Math.sin(rad), y: padding + hg + ro - ro * Math.cos(rad)},
                {x: padding + 1.5 * wg - ro * Math.sin(rad) - 3 * thk, y: padding + hg + ro - ro * Math.cos(rad)},
                {x: padding + 1.5 * wg - ro * Math.sin(rad) - 3 * thk, y: padding + hg + ro - ro * Math.cos(rad) - thk},
                {x: padding + 1.5 * wg - ro * Math.sin(rad), y: padding + hg + ro - ro * Math.cos(rad) - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - ro * Math.sin(rad), y: padding + 3 * hg - ro + ro * Math.cos(rad)},
                {x: padding + 1.5 * wg - ro * Math.sin(rad) - 3 * thk, y: padding + 3 * hg - ro + ro * Math.cos(rad)},
                {
                    x: padding + 1.5 * wg - ro * Math.sin(rad) - 3 * thk,
                    y: padding + 3 * hg - ro + ro * Math.cos(rad) + thk
                },
                {x: padding + 1.5 * wg - ro * Math.sin(rad), y: padding + 3 * hg - ro + ro * Math.cos(rad) + thk}
            ])).classed("sketch", true);
            drawLine(padding + 1.5 * wg - ro * Math.sin(rad) - 3 * thk, padding + hg + ro - ro * Math.cos(rad), padding + 1.5 * wg - ro * Math.sin(rad) - 3 * thk, padding + 3 * hg - ro + ro * Math.cos(rad));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - ro * Math.sin(rad), y: padding + hg + ro - ro * Math.cos(rad) - thk},
                {x: padding + 1.5 * wg - ro * Math.sin(rad), y: padding + 3 * hg - ro + ro * Math.cos(rad) + thk}
            ])).attr("stroke-dasharray", "5,5,5").classed("sketch", true);

            // 小端外壁转角
            drawArc(ri, ri,
                padding + 1.5 * wg - ro * Math.sin(rad) + ri * Math.sin(rad), padding + hg - ro * Math.cos(rad) + ri * Math.cos(rad),
                padding + 1.5 * wg - ro * Math.sin(rad), padding + hg - ro * Math.cos(rad) + ri);
            drawArc(ri, ri,
                padding + 1.5 * wg - ro * Math.sin(rad), padding + 3 * hg + ro * Math.cos(rad) - ri,
                padding + 1.5 * wg - ro * Math.sin(rad) + ri * Math.sin(rad), padding + 3 * hg + ro * Math.cos(rad) - ri * Math.cos(rad));

            // 大端上
            let cx0 = padding + 2.5 * wg + ri * Math.sin(rad);
            let cy0 = padding + ri * Math.cos(rad);
            drawArc(ri, ri,
                cx0 - ri * Math.sin(rad), cy0 - ri * Math.cos(rad),
                cx0, cy0 - ri);
            drawArc(ro, ro,
                cx0 - ro * Math.sin(rad), cy0 - ro * Math.cos(rad),
                cx0, cy0 - ro);

            // 大端下
            let cx1 = padding + 2.5 * wg + ri * Math.sin(rad);
            let cy1 = padding + 4 * hg - ri * Math.cos(rad);
            drawArc(ri, ri,
                cx1, cy1 + ri,
                cx1 - ri * Math.sin(rad), cy1 + ri * Math.cos(rad));
            drawArc(ro, ro,
                cx1, cy1 + ro,
                cx1 - ro * Math.sin(rad), cy1 + ro * Math.cos(rad));

            // 大端直边段
            svg.append("path").attr("d", line([
                {x: cx1, y: cy0 - ri},
                {x: cx1 + 3 * thk, y: cy0 - ri},
                {x: cx1 + 3 * thk, y: cy0 - ri - thk},
                {x: cx1, y: cy0 - ri - thk}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx1, y: cy1 + ri},
                {x: cx1 + 3 * thk, y: cy1 + ri},
                {x: cx1 + 3 * thk, y: cy1 + ri + thk},
                {x: cx1, y: cy1 + ri + thk}
            ])).classed("sketch", true);
            drawLine(cx1 + 3 * thk, cy0 - ri, cx1 + 3 * thk, cy1 + ri);
            svg.append("path").attr("d", line([
                {x: cx1, y: cy0 - ro},
                {x: cx1, y: cy1 + ro}
            ])).attr("stroke-dasharray", "5,5,5").classed("sketch", true);

            // 中心线
            drawCenterLine(padding + 1.5 * wg - ri * Math.sin(rad) - 3 * thk - 10, height / 2, padding + 2.5 * wg + ri * Math.sin(rad) + 3 * thk + 10, height / 2);

            // dsi
            dimRightV(cx0 + 3 * thk, cy1 + ri, cx0 + 3 * thk, cy0 - ri, dsi, "AAFHSketchDSI");

            // dpi
            dimLeftV(padding + 1.5 * wg - ro * Math.sin(rad) - 3 * thk, padding + 3 * hg - ro + ro * Math.cos(rad),
                padding + 1.5 * wg - ro * Math.sin(rad) - 3 * thk, padding + hg + ro - ro * Math.cos(rad),
                dpi, "AAFHSketchDPI");

            // alpha
            let cx10 = padding + 2.5 * wg - 2 * hg / Math.tan(rad);
            let cy10 = height / 2;
            let cr = width / 2 - cx10;

            // alpha
            svg.append("path").attr("d", "M "
                + (cx10 + cr * Math.cos(rad)) + " " + (cy10 + cr * Math.sin(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx10 + cr) + " " + (cy10)
            ).classed("sketch", true).attr("id", "AAFHSketchALPHA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFHSketchALPHA")
                .attr("startOffset", "50%").text(alpha);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx10 + cr, y: cy10},
                    {x: cx10 + cr - 3, y: cy10 - 15},
                    {x: cx10 + cr + 3, y: cy10 - 15},
                    {x: cx10 + cr, y: cy10}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx10 + " " + cy10 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx10 + cr, y: cy10},
                    {x: cx10 + cr - 3, y: cy10 + 15},
                    {x: cx10 + cr + 3, y: cy10 + 15},
                    {x: cx10 + cr, y: cy10}
                ]));

            // thkn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx10 + cr, y: cy10 + thk * Math.cos(rad)},
                    {x: cx10 + cr - 3, y: cy10 + thk * Math.cos(rad) + 15},
                    {x: cx10 + cr + 3, y: cy10 + thk * Math.cos(rad) + 15},
                    {x: cx10 + cr, y: cy10 + thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx10 + " " + cy10 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx10 + cr, y: cy10},
                    {x: cx10 + cr, y: cy10 + thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx10 + " " + cy10 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx10 + cr, y: cy10 + thk * Math.cos(rad) + 15 + 40},
                    {x: cx10 + cr, y: cy10 + thk * Math.cos(rad) + 15}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx10 + " " + cy10 + ")")
                .attr("id", "AAFHSketchTHKCN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFHSketchTHKCN")
                .attr("startOffset", "50%").text(thkn);

            // rs
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0, y: cy0 - ri},
                    {x: cx0 - 2, y: cy0 - ri + 10},
                    {x: cx0 + 2, y: cy0 - ri + 10},
                    {x: cx0, y: cy0 - ri}
                ])).attr("transform", "rotate(" + -(deg / 2) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0, y: cy0},
                    {x: cx0, y: cy0 - ro - 2 * thk}
                ])).attr("transform", "rotate(" + -(deg / 2) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 - (ro + 2 * thk) * Math.sin(rad / 2) - 40, y: cy0 - (ro + 2 * thk) * Math.cos(rad / 2)},
                    {x: cx0 - (ro + 2 * thk) * Math.sin(rad / 2), y: cy0 - (ro + 2 * thk) * Math.cos(rad / 2)}
                ])).attr("id", "AAFHSketchRS");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFHSketchRS")
                .attr("startOffset", "50%").text(rs);

            // rp
            let cx00 = padding + 1.5 * wg - ro * Math.sin(rad);
            let cy00 = padding + hg - ro * Math.cos(rad);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx00, y: cy00 + ri},
                    {x: cx00 - 2, y: cy00 + ri - 10},
                    {x: cx00 + 2, y: cy00 + ri - 10},
                    {x: cx00, y: cy00 + ri}
                ])).attr("transform", "rotate(" + (-deg / 2) + ", " + cx00 + " " + cy00 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx00, y: cy00},
                    {x: cx00, y: cy00 + ri}
                ])).attr("transform", "rotate(" + (-deg / 2) + ", " + cx00 + " " + cy00 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx00 - 40, y: cy00},
                    {x: cx00, y: cy00}
                ])).attr("id", "AAFHSketchRP");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFHSketchRP")
                .attr("startOffset", "50%").text(rp);
        }

        currentTabIndex = aafhd2d3.tabs('getTabIndex', aafhd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aafh2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aafh").length > 0) {
                    aafh2d();
                }
            });
        }
        aafhd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aafh2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aafh").length > 0) {
                            aafh2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 大端、小端带折边锥壳(10°≤α≤60°)",
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
            rowStyler: function (index, row) {
            },
            onClickRow: function (index) {
                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 4) {
                    $(ed.target).combobox("loadData", AAFHCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAFHType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAFHSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAFHName);
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
                    aafhSketch.empty();

                    // model
                    aafhModel.empty();

                    // sketch
                    currentTabIndex = aafhd2d3.tabs('getTabIndex', aafhd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aafh2d();
                        aafhSketch.off("resize").on("resize", function () {
                            if ($("#aafh").length > 0) {
                                aafh2d();
                            }
                        });
                    }
                    aafhd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aafh2d();
                                aafhSketch.off("resize").on("resize", function () {
                                    if ($("#aafh").length > 0) {
                                        aafh2d();
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

                        AAFHDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAFHCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFHType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFHSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFHName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFHCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAFHDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAFHCategory[index] = {
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

                        AAFHCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFHType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFHSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFHName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFHCategoryVal,
                                temp: AAFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFHType = [];
                                $(result).each(function (index, element) {
                                    AAFHType[index] = {
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

                        AAFHTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFHSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFHName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFHCategoryVal,
                                type: AAFHTypeVal,
                                temp: AAFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFHSTD = [];
                                $(result).each(function (index, element) {
                                    AAFHSTD[index] = {
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

                        AAFHSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFHName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFHCategoryVal,
                                type: AAFHTypeVal,
                                std: AAFHSTDVal,
                                temp: AAFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFHName = [];
                                $(result).each(function (index, element) {
                                    AAFHName[index] = {
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
                        let AAFHPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAFHPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAFHPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAFHPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAFHTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAFHTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 锥壳材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAFHNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        let AAFHD, AAFHThkMin, AAFHThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAFHCategoryVal,
                                "type": AAFHTypeVal,
                                "std": AAFHSTDVal,
                                "name": AAFHNameVal,
                                "temp": AAFHDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAFHD = parseFloat(result.density);
                                AAFHThkMin = parseFloat(result.thkMin);
                                AAFHThkMax = parseFloat(result.thkMax);

                                // DSI
                                let AAFHDSI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAFHDSI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafh2d("Φ" + AAFHDSI);
                                    aafhSketch.off("resize").on("resize", function () {
                                        if ($("#aafh").length > 0) {
                                            aafh2d("Φ" + AAFHDSI);
                                        }
                                    });
                                }
                                aafhd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafh2d("Φ" + AAFHDSI);
                                            aafhSketch.off("resize").on("resize", function () {
                                                if ($("#aafh").length > 0) {
                                                    aafh2d("Φ" + AAFHDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // DPI
                                let AAFHDPI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    AAFHDPI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI);
                                    aafhSketch.off("resize").on("resize", function () {
                                        if ($("#aafh").length > 0) {
                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI);
                                        }
                                    });
                                }
                                aafhd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI);
                                            aafhSketch.off("resize").on("resize", function () {
                                                if ($("#aafh").length > 0) {
                                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 锥壳名义厚度
                                let AAFHTHKN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAFHThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAFHThkMax) {
                                    AAFHTHKN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAFHThkMin) {
                                    south.html("锥壳材料厚度不能小于等于 " + AAFHThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAFHThkMax) {
                                    south.html("锥壳材料厚度不能大于 " + AAFHThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN);
                                    aafhSketch.off("resize").on("resize", function () {
                                        if ($("#aafh").length > 0) {
                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN);
                                        }
                                    });
                                }
                                aafhd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN);
                                            aafhSketch.off("resize").on("resize", function () {
                                                if ($("#aafh").length > 0) {
                                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAFHOT, AAFHO, AAFHOT1, AAFHREL, AAFHC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAFHCategoryVal,
                                        "type": AAFHTypeVal,
                                        "std": AAFHSTDVal,
                                        "name": AAFHNameVal,
                                        "thk": AAFHTHKN,
                                        "temp": AAFHDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAFHDSI + 2 * AAFHTHKN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAFHOT = parseFloat(result.ot);
                                        if (AAFHOT < 0) {
                                            south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFHO = parseFloat(result.o);
                                        if (AAFHO < 0) {
                                            south.html("查询材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFHREL = parseFloat(result.rel);
                                        if (AAFHREL < 0) {
                                            south.html("查询材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFHC1 = parseFloat(result.c1);
                                        if (AAFHC1 < 0) {
                                            south.html("查询材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFHOT1 = parseFloat(result.ot1);

                                        // RS
                                        let AAFHRS;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= Math.max(0.1 * AAFHDSI, 3 * AAFHTHKN)) {
                                            AAFHRS = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < Math.max(0.1 * AAFHDSI, 3 * AAFHTHKN)) {
                                            south.html("锥壳大端转角内半径 rs 不能小于 " + Math.max(0.1 * AAFHDSI, 3 * AAFHTHKN).toFixed(2) + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS);
                                            aafhSketch.off("resize").on("resize", function () {
                                                if ($("#aafh").length > 0) {
                                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS);
                                                }
                                            });
                                        }
                                        aafhd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS);
                                                    aafhSketch.off("resize").on("resize", function () {
                                                        if ($("#aafh").length > 0) {
                                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // RP
                                        let AAFHRP;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) >= Math.max(0.05 * AAFHDPI, 3 * AAFHTHKN)) {
                                            AAFHRP = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) < Math.max(0.05 * AAFHDPI, 3 * AAFHTHKN)) {
                                            south.html("锥壳小端转角内半径 rp 不能小于 " + Math.max(0.05 * AAFHDPI, 3 * AAFHTHKN).toFixed(2) + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS, "R" + AAFHRP);
                                            aafhSketch.off("resize").on("resize", function () {
                                                if ($("#aafh").length > 0) {
                                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS, "R" + AAFHRP);
                                                }
                                            });
                                        }
                                        aafhd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS, "R" + AAFHRP);
                                                    aafhSketch.off("resize").on("resize", function () {
                                                        if ($("#aafh").length > 0) {
                                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS, "R" + AAFHRP);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 半顶角α
                                        let AAFHALPHA;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                            AAFHALPHA = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS, "R" + AAFHRP, AAFHALPHA + "°");
                                            aafhSketch.off("resize").on("resize", function () {
                                                if ($("#aafh").length > 0) {
                                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS, "R" + AAFHRP, AAFHALPHA + "°");
                                                }
                                            });
                                        }
                                        aafhd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS, "R" + AAFHRP, AAFHALPHA + "°");
                                                    aafhSketch.off("resize").on("resize", function () {
                                                        if ($("#aafh").length > 0) {
                                                            aafh2d("Φ" + AAFHDSI, "Φ" + AAFHDPI, AAFHTHKN, "R" + AAFHRS, "R" + AAFHRP, AAFHALPHA + "°");
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // 锥壳腐蚀裕量
                                        let AAFHC2;
                                        if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                            && parseFloat(rows[14][columns[0][1].field]) < AAFHTHKN) {
                                            AAFHC2 = parseFloat(rows[14][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                            && parseFloat(rows[14][columns[0][1].field]) >= AAFHTHKN) {
                                            south.html("锥壳腐蚀裕量不能大于等于 " + AAFHTHKN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 锥壳焊接接头系数
                                        let AAFHE;
                                        if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                            AAFHE = parseFloat(rows[15][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        let AAFHPC = AAFHPD + AAFHPS;
                                        let AAFHC = AAFHC1 + AAFHC2;
                                        let AAFHTHKE = AAFHTHKN - AAFHC;
                                        let AAFHRSDSI = AAFHRS / AAFHDSI;
                                        let AAFHRPM = (AAFHDPI + AAFHTHKN) / 2;

                                        let AAFHTHKSC = AAFHPC * AAFHDSI / (2 * AAFHOT * AAFHE - AAFHPC);
                                        let AAFHTHKPC = AAFHPC * AAFHDPI / (2 * AAFHOT * AAFHE - AAFHPC);

                                        // 获取系数 k
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "gbt_150_2011_table_5_6_get_k.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "alpha": AAFHALPHA,
                                                "rdil": AAFHRSDSI.toFixed(4)
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {
                                                let AAFHK = parseFloat(result);

                                                let AAFHTHKSRC = AAFHK * AAFHPC * AAFHDSI / (2 * AAFHOT * AAFHE - 0.5 * AAFHPC);
                                                let AAFHF = (1 - 2 * AAFHRSDSI * (1 - Math.cos(AAFHALPHA / 180 * Math.PI))) / (2 * Math.cos(AAFHALPHA / 180 * Math.PI));
                                                let AAFHTHKCC = AAFHF * AAFHPC * AAFHDSI / (AAFHOT * AAFHE - 0.5 * AAFHPC);

                                                let AAFHTHKPCRPM = AAFHTHKPC / AAFHRPM;
                                                let url;
                                                if (AAFHALPHA <= 45) {
                                                    url = "gbt_150_2011_chart_5_14_get_q2.action"
                                                } else {
                                                    url = "gbt_150_2011_chart_5_15_get_q2.action"
                                                }
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: url,
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "alpha": AAFHALPHA,
                                                        "thkrs": Math.max(AAFHTHKPCRPM, 0.002)
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {
                                                        let AAFHQ2 = parseFloat(result);

                                                        let AAFHTHKPRC = AAFHQ2 * AAFHTHKPC;
                                                        let AAFHTHKD = Math.max(AAFHTHKSC, AAFHTHKPC, AAFHTHKSRC, AAFHTHKCC, AAFHTHKPRC, 0.003 * AAFHDSI, 0.003 * AAFHDPI) + AAFHC2;
                                                        let AAFHTHKCHK;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "锥形封头所需厚度：" + (AAFHTHKD + AAFHC1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        if (AAFHTHKN >= (AAFHTHKD + AAFHC1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + AAFHTHKN + " mm" +
                                                                "</span>");
                                                            AAFHTHKCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + AAFHTHKN + " mm" +
                                                                "</span>");
                                                            AAFHTHKCHK = "不合格";
                                                        }

                                                        let AAFHLPRC = Math.sqrt(AAFHDPI * AAFHTHKPRC / Math.cos(AAFHALPHA / 180 * Math.PI));
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "连接锥壳段最小长度：" + AAFHLPRC.toFixed(2) + " mm" +
                                                            "</span>");

                                                        let AAFHLPRS = Math.sqrt(AAFHDPI * AAFHTHKPRC);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "小端直边段最小长度：" + AAFHLPRS.toFixed(2) + " mm" +
                                                            "</span>");

                                                        // 压力试验
                                                        let AAFHPT, AAFHETA;
                                                        if (AAFHTest === "液压试验") {
                                                            AAFHETA = 1.25;
                                                            AAFHPT = AAFHETA * AAFHPD * AAFHO / Math.max(AAFHOT, AAFHOT1);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + AAFHPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (AAFHTest === "气压试验") {
                                                            AAFHETA = 1.10;
                                                            AAFHPT = AAFHETA * AAFHPD * AAFHO / Math.max(AAFHOT, AAFHOT1);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + AAFHPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // docx
                                                        let AAFHPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "aafhdocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "AAFH",

                                                                    pd: AAFHPD,
                                                                    t: AAFHDT,
                                                                    ps: AAFHPS,
                                                                    test: AAFHTest,

                                                                    std: AAFHSTDVal,
                                                                    name: AAFHNameVal,
                                                                    dsi: AAFHDSI,
                                                                    dpi: AAFHDPI,
                                                                    thkn: AAFHTHKN,
                                                                    rs: AAFHRS,
                                                                    rp: AAFHRP,
                                                                    alpha: AAFHALPHA,
                                                                    c2: AAFHC2,
                                                                    e: AAFHE,

                                                                    d: AAFHD.toFixed(4),
                                                                    rel: AAFHREL.toFixed(4),
                                                                    c1: AAFHC1.toFixed(4),
                                                                    ot: AAFHOT.toFixed(4),
                                                                    o: AAFHO.toFixed(4),
                                                                    ot1: AAFHOT1.toFixed(4),

                                                                    pc: AAFHPC.toFixed(4),

                                                                    c: AAFHC.toFixed(4),
                                                                    thke: AAFHTHKE.toFixed(4),
                                                                    rsdsi: AAFHRSDSI.toFixed(4),
                                                                    rpm: AAFHRPM.toFixed(4),

                                                                    thksc: AAFHTHKSC.toFixed(4),
                                                                    thkpc: AAFHTHKPC.toFixed(4),
                                                                    k: AAFHK.toFixed(4),
                                                                    thksrc: AAFHTHKSRC.toFixed(4),
                                                                    f: AAFHF.toFixed(4),
                                                                    thkcc: AAFHTHKCC.toFixed(4),
                                                                    thkpcrpm: AAFHTHKPCRPM.toFixed(4),
                                                                    q2: AAFHQ2.toFixed(4),
                                                                    thkprc: AAFHTHKPRC.toFixed(4),
                                                                    thkd: AAFHTHKD.toFixed(4),
                                                                    thkchk: AAFHTHKCHK,
                                                                    lprc: AAFHLPRC.toFixed(4),
                                                                    lprs: AAFHLPRS.toFixed(4),

                                                                    eta: AAFHETA.toFixed(4),
                                                                    pt: AAFHPT.toFixed(4)
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
                                                                        AAFHPayJS.dialog({
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
                                                                                    AAFHPayJS.dialog("close");
                                                                                    AAFHPayJS.dialog("clear");
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
                                                                                                AAFHPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        AAFHPayJS.dialog('close');
                                                                                                        AAFHPayJS.dialog('clear');
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
                                                            "<span style='color:red;'>&ensp;查表5-14/15获取Q2值失败，请检查网络后重试</span>");
                                                    }
                                                });
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;查表5-6获取K值失败，请检查网络后重试</span>");
                                            }
                                        });
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;锥壳材料力学特性获取失败，请检查网络后重试</span>");
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