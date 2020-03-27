/*
一个问题：当锥壳同时需要内压加强计算和轴向载荷加强计算时，内压加强需要设置加强段，轴向载荷计算时，额外加强面积是否考虑加强段的额外厚度？
本程序偏保守计，轴向载荷可用加强面积计算时，不计内压加强带来的加强段，只考虑锥壳及筒体非加强段名义厚度。
 */
$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aafdSketch = $("#d2");
    let aafdModel = $("#d3");
    let aafdd2d3 = $('#d2d3');

    $("#cal").html("<table id='aafd'></table>");
    let pg = $("#aafd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/f/d/AAFD.json", function (result) {

        let AAFDDT,
            AAFDCCategory, AAFDCCategoryVal, AAFDCType, AAFDCTypeVal, AAFDCSTD, AAFDCSTDVal, AAFDCName, AAFDCNameVal,
            AAFDPCategory, AAFDPCategoryVal, AAFDPType, AAFDPTypeVal, AAFDPSTD, AAFDPSTDVal, AAFDPName, AAFDPNameVal,
            columns, rows, ed;
        let AAFDISAXIAL = "否";

        function aafd2d(dbi = "ΦDbi", dsi = "ΦDsi", alpha = "α", thkcn = "δcn", thkpn = "δpn") {

            aafdSketch.empty();

            let width = aafdSketch.width();
            let height = aafdSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAFDSVG").attr("height", height);

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

            // 中心线和半顶角
            drawCenterLine(padding - 10, height / 2, padding + 3 * wg + 10, height / 2);
            let rad = Math.atan(hg / (2 * wg));

            // 端头封闭线
            drawCenterLine(padding, padding + hg - thk - 10, padding, padding + 3 * hg + thk + 10);
            drawCenterLine(padding + 3 * wg, padding - thk - 10, padding + 3 * wg, padding + 4 * hg + thk + 10);

            // 上部无加强段
            svg.append("path").attr("d", line([
                {x: padding, y: padding + hg},
                {x: padding + wg, y: padding + hg},
                {x: padding + 3 * wg, y: padding},
                {x: padding + 3 * wg, y: padding - thk},
                {x: padding + wg, y: padding + hg - thk},
                {x: padding, y: padding + hg - thk},
                {x: padding, y: padding + hg}
            ])).classed("sketch", true);

            // 连接线
            drawLine(padding + wg, padding + hg - thk, padding + wg, padding + 3 * hg + 2 * thk);

            // 下部有加强段
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 3 * hg},
                {x: padding + wg, y: padding + 3 * hg},
                {x: padding + 3 * wg, y: padding + 4 * hg},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk},
                {x: padding + 1.3 * wg + 2 * thk, y: padding + 3 * hg + thk + (0.3 * wg + 2 * thk) * Math.tan(rad)},
                {x: padding + 1.3 * wg, y: padding + 3 * hg + 2 * thk + (0.3 * wg + 2 * thk) * Math.tan(rad)},
                {x: padding + wg, y: padding + 3 * hg + 2 * thk},
                {x: padding + 0.7 * wg, y: padding + 3 * hg + 2 * thk},
                {x: padding + 0.7 * wg - 2 * thk, y: padding + 3 * hg + thk},
                {x: padding, y: padding + 3 * hg + thk}
            ])).classed("sketch", true);

            // 小端加强段垂直线
            drawLine(padding + wg - 0.3 * wg - 2 * thk, height / 2, padding + wg - 0.3 * wg - 2 * thk, padding + 3 * hg + thk);

            // 锥壳加强段垂直线
            svg.append("path").attr("d", line([
                {x: padding + 1.3 * wg + 2 * thk, y: padding + 3 * hg + thk + (0.3 * wg + 2 * thk) * Math.tan(rad)},
                {
                    x: padding + 1.3 * wg + 2 * thk + thk * Math.cos(rad) * Math.sin(rad),
                    y: padding + 3 * hg + thk + (0.3 * wg + 2 * thk) * Math.tan(rad) - thk * Math.cos(rad) * Math.cos(rad)
                },
                {x: padding + 1.3 * wg + 2 * thk + thk * Math.cos(rad) * Math.sin(rad), y: height / 2}
            ])).classed("sketch", true);

            // dbi
            dimRightV(padding + 3 * wg, padding + 4 * hg, padding + 3 * wg, padding, dbi, "AAFDSketchDBI");

            // dsi
            dimLeftV(padding, padding + 3 * hg, padding, padding + hg, dsi, "AAFDSketchDSI");

            // thkpn1
            extLineLeftH(padding, padding + hg - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 30, y: padding + hg - thk},
                    {x: padding - 27, y: padding + hg - thk - 15},
                    {x: padding - 33, y: padding + hg - thk - 15},
                    {x: padding - 30, y: padding + hg - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding + hg - thk},
                {x: padding - 30, y: padding + hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding + hg - thk - 15},
                {x: padding - 30, y: padding + hg - thk - 15 - 40}
            ])).attr("id", "AAFDSketchTHKPN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFDSketchTHKPN1")
                .attr("startOffset", "50%").text(thkpn);

            // thkpn2
            extLineLeftH(padding, padding + 3 * hg + thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 30, y: padding + 3 * hg + thk},
                    {x: padding - 27, y: padding + 3 * hg + thk + 15},
                    {x: padding - 33, y: padding + 3 * hg + thk + 15},
                    {x: padding - 30, y: padding + 3 * hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding + 3 * hg + thk},
                {x: padding - 30, y: padding + 3 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding + 3 * hg + thk + 15 + 40},
                {x: padding - 30, y: padding + 3 * hg + thk + 15}
            ])).attr("id", "AAFDSketchTHKPN2").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFDSketchTHKPN2")
                .attr("startOffset", "50%").text(thkpn);

            // alpha
            let cx0 = padding + 3 * wg - 2 * hg / Math.tan(rad);
            let cy0 = height / 2;
            let cr = 2 * hg / Math.tan(rad) - wg;

            // alpha1
            svg.append("path").attr("d", "M "
                + (cx0 + cr * Math.cos(rad)) + " " + (cy0 + cr * Math.sin(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0 + cr) + " " + (cy0)
            ).classed("sketch", true).attr("id", "AAFDSketchALPHA1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFDSketchALPHA1")
                .attr("startOffset", "50%").text(alpha);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 - 15},
                    {x: cx0 + cr + 3, y: cy0 - 15},
                    {x: cx0 + cr, y: cy0}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 + 15},
                    {x: cx0 + cr + 3, y: cy0 + 15},
                    {x: cx0 + cr, y: cy0}
                ]));

            // alpha2
            svg.append("path").attr("d", "M "
                + (cx0 + cr) + " " + (cy0) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0 + cr * Math.cos(rad)) + " " + (cy0 - cr * Math.sin(rad))
            ).classed("sketch", true).attr("id", "AAFDSketchALPHA2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFDSketchALPHA2")
                .attr("startOffset", "50%").text(alpha);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 + 15},
                    {x: cx0 + cr + 3, y: cy0 + 15},
                    {x: cx0 + cr, y: cy0}
                ])).attr("transform", "rotate(" + -(rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr - 3, y: cy0 - 15},
                    {x: cx0 + cr + 3, y: cy0 - 15},
                    {x: cx0 + cr, y: cy0}
                ]));

            // thkcn1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)},
                    {x: cx0 + cr - 3, y: cy0 + thk * Math.cos(rad) + 15},
                    {x: cx0 + cr + 3, y: cy0 + thk * Math.cos(rad) + 15},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad) + 15 + 40},
                    {x: cx0 + cr, y: cy0 + thk * Math.cos(rad) + 15}
                ])).attr("transform", "rotate(" + (rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")")
                .attr("id", "AAFDSketchTHKCN1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFDSketchTHKCN1")
                .attr("startOffset", "50%").text(thkcn);

            // thkcn1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad)},
                    {x: cx0 + cr - 3, y: cy0 - thk * Math.cos(rad) - 15},
                    {x: cx0 + cr + 3, y: cy0 - thk * Math.cos(rad) - 15},
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + -(rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0},
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad)}
                ])).attr("transform", "rotate(" + -(rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad) - 15},
                    {x: cx0 + cr, y: cy0 - thk * Math.cos(rad) - 15 - 40}
                ])).attr("transform", "rotate(" + -(rad / Math.PI * 180) + ", " + cx0 + " " + cy0 + ")")
                .attr("id", "AAFDSketchTHKCN2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFDSketchTHKCN2")
                .attr("startOffset", "50%").text(thkcn);
        }

        currentTabIndex = aafdd2d3.tabs('getTabIndex', aafdd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aafd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aafd").length > 0) {
                    aafd2d();
                }
            });
        }
        aafdd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aafd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aafd").length > 0) {
                            aafd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 无折边锥壳(5°≤α≤45°)小端强度计算",
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
            rowStyler: function (index) {
                if (index === 22) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {
                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 4) {
                    $(ed.target).combobox("loadData", AAFDCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAFDCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAFDCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAFDCName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAFDPCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAFDPType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", AAFDPSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", AAFDPName);
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
                    aafdSketch.empty();

                    // model
                    aafdModel.empty();

                    // sketch
                    currentTabIndex = aafdd2d3.tabs('getTabIndex', aafdd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aafd2d();
                        aafdSketch.off("resize").on("resize", function () {
                            if ($("#aafd").length > 0) {
                                aafd2d();
                            }
                        });
                    }
                    aafdd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aafd2d();
                                aafdSketch.off("resize").on("resize", function () {
                                    if ($("#aafd").length > 0) {
                                        aafd2d();
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

                        AAFDDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAFDCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFDCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFDCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFDCName = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAFDPCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFDPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFDPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        AAFDPName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFDCCategory = [];
                                AAFDPCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAFDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAFDCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAFDPCategory[index] = {
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

                        AAFDCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFDCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFDCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFDCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFDCCategoryVal,
                                temp: AAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFDCType = [];
                                $(result).each(function (index, element) {
                                    AAFDCType[index] = {
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

                        AAFDCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFDCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFDCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFDCCategoryVal,
                                type: AAFDCTypeVal,
                                temp: AAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFDCSTD = [];
                                $(result).each(function (index, element) {
                                    AAFDCSTD[index] = {
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

                        AAFDCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFDCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFDCCategoryVal,
                                type: AAFDCTypeVal,
                                std: AAFDCSTDVal,
                                temp: AAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFDCName = [];
                                $(result).each(function (index, element) {
                                    AAFDCName[index] = {
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

                        AAFDPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFDPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFDPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        AAFDPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFDPCategoryVal,
                                temp: AAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFDPType = [];
                                $(result).each(function (index, element) {
                                    AAFDPType[index] = {
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

                        AAFDPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFDPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        AAFDPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFDPCategoryVal,
                                type: AAFDPTypeVal,
                                temp: AAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFDPSTD = [];
                                $(result).each(function (index, element) {
                                    AAFDPSTD[index] = {
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

                        AAFDPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        AAFDPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFDPCategoryVal,
                                type: AAFDPTypeVal,
                                std: AAFDPSTDVal,
                                temp: AAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFDPName = [];
                                $(result).each(function (index, element) {
                                    AAFDPName[index] = {
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

                        if (index === 21) {
                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                AAFDISAXIAL = rows[21][columns[0][1].field];
                                if (AAFDISAXIAL === "是") {
                                    pg.datagrid('options').finder.getTr(this, 22).show();
                                }
                                else if (AAFDISAXIAL === "否") {
                                    pg.datagrid('options').finder.getTr(this, 22).hide();
                                }
                            }
                        }

                        // 设计压力
                        let AAFDPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAFDPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAFDPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAFDPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAFDTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAFDTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 锥壳材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAFDCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        let AAFDDC, AAFDCThkMin, AAFDCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAFDCCategoryVal,
                                "type": AAFDCTypeVal,
                                "std": AAFDCSTDVal,
                                "name": AAFDCNameVal,
                                "temp": AAFDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAFDDC = parseFloat(result.density);
                                AAFDCThkMin = parseFloat(result.thkMin);
                                AAFDCThkMax = parseFloat(result.thkMax);

                                // DBI
                                let AAFDDBI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAFDDBI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafd2d("Φ" + AAFDDBI);
                                    aafdSketch.off("resize").on("resize", function () {
                                        if ($("#aafd").length > 0) {
                                            aafd2d("Φ" + AAFDDBI);
                                        }
                                    });
                                }
                                aafdd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafd2d("Φ" + AAFDDBI);
                                            aafdSketch.off("resize").on("resize", function () {
                                                if ($("#aafd").length > 0) {
                                                    aafd2d("Φ" + AAFDDBI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // DSI
                                let AAFDDSI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    AAFDDSI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI);
                                    aafdSketch.off("resize").on("resize", function () {
                                        if ($("#aafd").length > 0) {
                                            aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI);
                                        }
                                    });
                                }
                                aafdd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI);
                                            aafdSketch.off("resize").on("resize", function () {
                                                if ($("#aafd").length > 0) {
                                                    aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 半顶角α
                                let AAFDALPHA;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    AAFDALPHA = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°");
                                    aafdSketch.off("resize").on("resize", function () {
                                        if ($("#aafd").length > 0) {
                                            aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°");
                                        }
                                    });
                                }
                                aafdd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°");
                                            aafdSketch.off("resize").on("resize", function () {
                                                if ($("#aafd").length > 0) {
                                                    aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                // 封头名义厚度
                                let AAFDTHKCN;
                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > AAFDCThkMin
                                    && parseFloat(rows[11][columns[0][1].field]) <= AAFDCThkMax) {
                                    AAFDTHKCN = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) <= AAFDCThkMin) {
                                    south.html("封头材料厚度不能小于等于 " + AAFDCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > AAFDCThkMax) {
                                    south.html("封头材料厚度不能大于 " + AAFDCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°", AAFDTHKCN);
                                    aafdSketch.off("resize").on("resize", function () {
                                        if ($("#aafd").length > 0) {
                                            aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°", AAFDTHKCN);
                                        }
                                    });
                                }
                                aafdd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°", AAFDTHKCN);
                                            aafdSketch.off("resize").on("resize", function () {
                                                if ($("#aafd").length > 0) {
                                                    aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°", AAFDTHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAFDOCT, AAFDOC, AAFDOCT1, AAFDRCEL, AAFDCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAFDCCategoryVal,
                                        "type": AAFDCTypeVal,
                                        "std": AAFDCSTDVal,
                                        "name": AAFDCNameVal,
                                        "thk": AAFDTHKCN,
                                        "temp": AAFDDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAFDDBI + 2 * AAFDTHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAFDOCT = parseFloat(result.ot);
                                        if (AAFDOCT < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFDOC = parseFloat(result.o);
                                        if (AAFDOC < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFDRCEL = parseFloat(result.rel);
                                        if (AAFDRCEL < 0) {
                                            south.html("查询大端筒体封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFDCC1 = parseFloat(result.c1);
                                        if (AAFDCC1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFDOCT1 = parseFloat(result.ot1);

                                        // 封头腐蚀裕量
                                        let AAFDCC2;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) < AAFDTHKCN) {
                                            AAFDCC2 = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) >= AAFDTHKCN) {
                                            south.html("封头腐蚀裕量不能大于等于 " + AAFDTHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 焊接接头系数
                                        let AAFDEC;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                            AAFDEC = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 小端筒体材料名称
                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                            AAFDPNameVal = rows[17][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        let AAFDDP, AAFDPThkMin, AAFDPThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": AAFDPCategoryVal,
                                                "type": AAFDPTypeVal,
                                                "std": AAFDPSTDVal,
                                                "name": AAFDPNameVal,
                                                "temp": AAFDDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                AAFDDP = parseFloat(result.density);
                                                AAFDPThkMin = parseFloat(result.thkMin);
                                                AAFDPThkMax = parseFloat(result.thkMax);

                                                // 小端筒体名义厚度
                                                let AAFDTHKPN;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > AAFDPThkMin
                                                    && parseFloat(rows[18][columns[0][1].field]) <= AAFDPThkMax) {
                                                    AAFDTHKPN = parseFloat(rows[18][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) <= AAFDPThkMin) {
                                                    south.html("小端筒体材料厚度不能小于等于 " + AAFDPThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > AAFDPThkMax) {
                                                    south.html("小端筒体材料厚度不能大于 " + AAFDPThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°", AAFDTHKCN, AAFDTHKPN);
                                                    aafdSketch.off("resize").on("resize", function () {
                                                        if ($("#aafd").length > 0) {
                                                            aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°", AAFDTHKCN, AAFDTHKPN);
                                                        }
                                                    });
                                                }
                                                aafdd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°", AAFDTHKCN, AAFDTHKPN);
                                                            aafdSketch.off("resize").on("resize", function () {
                                                                if ($("#aafd").length > 0) {
                                                                    aafd2d("Φ" + AAFDDBI, "Φ" + AAFDDSI, AAFDALPHA + "°", AAFDTHKCN, AAFDTHKPN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let AAFDOPT, AAFDOP, AAFDOPT1, AAFDRPEL, AAFDCP1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": AAFDPCategoryVal,
                                                        "type": AAFDPTypeVal,
                                                        "std": AAFDPSTDVal,
                                                        "name": AAFDPNameVal,
                                                        "thk": AAFDTHKPN,
                                                        "temp": AAFDDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": AAFDDBI + 2 * AAFDTHKPN
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        AAFDOPT = parseFloat(result.ot);
                                                        if (AAFDOPT < 0) {
                                                            south.html("查询小端筒体材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFDOP = parseFloat(result.o);
                                                        if (AAFDOP < 0) {
                                                            south.html("查询小端筒体材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFDRPEL = parseFloat(result.rel);
                                                        if (AAFDRPEL < 0) {
                                                            south.html("查询小端筒体材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFDCP1 = parseFloat(result.c1);
                                                        if (AAFDCP1 < 0) {
                                                            south.html("查询小端筒体材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFDOPT1 = parseFloat(result.ot1);

                                                        // 小端筒体腐蚀裕量
                                                        let AAFDCP2;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) < AAFDTHKPN) {
                                                            AAFDCP2 = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                            && parseFloat(rows[19][columns[0][1].field]) >= AAFDTHKPN) {
                                                            south.html("小端筒体腐蚀裕量不能大于等于 " + AAFDTHKPN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 焊接接头系数
                                                        let AAFDEP;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                            AAFDEP = parseFloat(rows[20][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 是否考虑轴向外载荷
                                                        let AAFDISAXIAL;
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                            AAFDISAXIAL = rows[21][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 过程参数
                                                        let AAFDPC = AAFDPD + AAFDPS;

                                                        let AAFDCP = AAFDCP1 + AAFDCP2;
                                                        let AAFDTHKPE = AAFDTHKPN - AAFDCP;
                                                        let AAFDDPI = AAFDDSI;
                                                        let AAFDDPO = AAFDDPI + 2 * AAFDTHKPN;
                                                        let AAFDDPM = (AAFDDPI + AAFDDPO) / 2;
                                                        let AAFDRPM = AAFDDPM / 2;

                                                        let AAFDCC = AAFDCC1 + AAFDCC2;
                                                        let AAFDTHKCE = AAFDTHKCN - AAFDCC;
                                                        let AAFDDBC = AAFDDBI;
                                                        let AAFDDSO = AAFDDPO;

                                                        // 小端筒体厚度计算及校核
                                                        let AAFDTHKPC = AAFDPC * AAFDDPI / (2 * AAFDOPT * AAFDEP - AAFDPC);
                                                        let AAFDTHKPD = AAFDTHKPC + AAFDCP2;
                                                        let AAFDTHKPCHK;

                                                        // 锥壳厚度计算及校核
                                                        let AAFDTHKCC = AAFDPC * AAFDDBC / (2 * AAFDOCT * AAFDEC - AAFDPC) / Math.cos(AAFDALPHA / 180 * Math.PI);
                                                        let AAFDTHKCD = AAFDTHKCC + AAFDCC2;
                                                        let AAFDTHKCCHK;

                                                        // 内压加强设计
                                                        let AAFDPCOCTEC = AAFDPC / (AAFDOCT * AAFDEC);

                                                        // 根据 AAFDPCOCTEC 查图 5-13 得 [α]
                                                        let AAFDALPHAALLOW;
                                                        if (AAFDPCOCTEC < 0.002 || AAFDPCOCTEC > 0.10) {
                                                            south.html("查图 5-13 超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (AAFDPCOCTEC === 0.002) {
                                                            AAFDALPHAALLOW = 0.704;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.002 && AAFDPCOCTEC < 0.003) {
                                                            AAFDALPHAALLOW = 0.704 + (AAFDPCOCTEC - 0.002) / (0.003 - 0.002) * (0.933 - 0.704);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.003) {
                                                            AAFDALPHAALLOW = 0.933;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.003 && AAFDPCOCTEC < 0.004) {
                                                            AAFDALPHAALLOW = 0.933 + (AAFDPCOCTEC - 0.003) / (0.004 - 0.003) * (1.1 - 0.933);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.004) {
                                                            AAFDALPHAALLOW = 1.1;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.004 && AAFDPCOCTEC < 0.005) {
                                                            AAFDALPHAALLOW = 1.1 + (AAFDPCOCTEC - 0.004) / (0.005 - 0.004) * (1.247 - 1.1);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.005) {
                                                            AAFDALPHAALLOW = 1.247;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.005 && AAFDPCOCTEC < 0.006) {
                                                            AAFDALPHAALLOW = 1.247 + (AAFDPCOCTEC - 0.005) / (0.006 - 0.005) * (1.375 - 1.247);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.006) {
                                                            AAFDALPHAALLOW = 1.375;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.006 && AAFDPCOCTEC < 0.007) {
                                                            AAFDALPHAALLOW = 1.375 + (AAFDPCOCTEC - 0.006) / (0.007 - 0.006) * (1.49 - 1.375);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.007) {
                                                            AAFDALPHAALLOW = 1.49;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.007 && AAFDPCOCTEC < 0.008) {
                                                            AAFDALPHAALLOW = 1.49 + (AAFDPCOCTEC - 0.007) / (0.008 - 0.007) * (1.605 - 1.49);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.008) {
                                                            AAFDALPHAALLOW = 1.605;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.008 && AAFDPCOCTEC < 0.009) {
                                                            AAFDALPHAALLOW = 1.605 + (AAFDPCOCTEC - 0.008) / (0.009 - 0.008) * (1.686 - 1.605);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.009) {
                                                            AAFDALPHAALLOW = 1.686;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.009 && AAFDPCOCTEC < 0.010) {
                                                            AAFDALPHAALLOW = 1.686 + (AAFDPCOCTEC - 0.009) / (0.010 - 0.009) * (1.774 - 1.686);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.010) {
                                                            AAFDALPHAALLOW = 1.774;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.010 && AAFDPCOCTEC < 0.015) {
                                                            AAFDALPHAALLOW = 1.774 + (AAFDPCOCTEC - 0.010) / (0.015 - 0.010) * (2.147 - 1.774);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.015) {
                                                            AAFDALPHAALLOW = 2.147;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.015 && AAFDPCOCTEC < 0.020) {
                                                            AAFDALPHAALLOW = 2.147 + (AAFDPCOCTEC - 0.015) / (0.02 - 0.015) * (2.5 - 2.147);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.020) {
                                                            AAFDALPHAALLOW = 2.5;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.020 && AAFDPCOCTEC < 0.030) {
                                                            AAFDALPHAALLOW = 2.5 + (AAFDPCOCTEC - 0.02) / (0.03 - 0.02) * (3.03 - 2.5);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.030) {
                                                            AAFDALPHAALLOW = 3.03;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.030 && AAFDPCOCTEC < 0.040) {
                                                            AAFDALPHAALLOW = 3.03 + (AAFDPCOCTEC - 0.03) / (0.04 - 0.03) * (3.48 - 3.03);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.040) {
                                                            AAFDALPHAALLOW = 3.48;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.040 && AAFDPCOCTEC < 0.050) {
                                                            AAFDALPHAALLOW = 3.48 + (AAFDPCOCTEC - 0.04) / (0.05 - 0.04) * (3.86 - 3.48);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.050) {
                                                            AAFDALPHAALLOW = 3.86;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.050 && AAFDPCOCTEC < 0.060) {
                                                            AAFDALPHAALLOW = 3.86 + (AAFDPCOCTEC - 0.05) / (0.06 - 0.05) * (4.215 - 3.86);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.060) {
                                                            AAFDALPHAALLOW = 4.215;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.060 && AAFDPCOCTEC < 0.070) {
                                                            AAFDALPHAALLOW = 4.215 + (AAFDPCOCTEC - 0.06) / (0.07 - 0.06) * (4.553 - 4.215);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.070) {
                                                            AAFDALPHAALLOW = 4.553;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.070 && AAFDPCOCTEC < 0.080) {
                                                            AAFDALPHAALLOW = 4.553 + (AAFDPCOCTEC - 0.07) / (0.08 - 0.07) * (4.855 - 4.553);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.080) {
                                                            AAFDALPHAALLOW = 4.855;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.080 && AAFDPCOCTEC < 0.090) {
                                                            AAFDALPHAALLOW = 4.855 + (AAFDPCOCTEC - 0.08) / (0.09 - 0.08) * (5.06 - 4.855);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.090) {
                                                            AAFDALPHAALLOW = 5.06;
                                                        }
                                                        else if (AAFDPCOCTEC > 0.090 && AAFDPCOCTEC < 0.100) {
                                                            AAFDALPHAALLOW = 5.06 + (AAFDPCOCTEC - 0.09) / (0.10 - 0.09) * (5.235 - 5.06);
                                                        }
                                                        else if (AAFDPCOCTEC === 0.100) {
                                                            AAFDALPHAALLOW = 5.235;
                                                        }

                                                        let AAFDALPHACHK = -1,
                                                            AAFDTHKPCRPM = -1, AAFDQ2 = -1,
                                                            AAFDTHKRC = -1, AAFDTHKRD = -1,
                                                            AAFDLRC = -1, AAFDLRS = -1;
                                                        if (AAFDALPHA < AAFDALPHAALLOW) {

                                                            south.html(
                                                                "<span style='color:#444444;'>" +
                                                                "小端圆筒所需厚度：" + (AAFDTHKPD + AAFDCP1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            if (AAFDTHKPN >= (AAFDTHKPD + AAFDCP1).toFixed(2)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFDTHKPN + " mm" +
                                                                    "</span>");
                                                                AAFDTHKPCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFDTHKPN + " mm" +
                                                                    "</span>");
                                                                AAFDTHKPCHK = "不合格";
                                                            }

                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "锥壳所需厚度：" + (AAFDTHKCD + AAFDCC1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            if (AAFDTHKCN >= (AAFDTHKCD + AAFDCC1).toFixed(2)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFDTHKCN + " mm" +
                                                                    "</span>");
                                                                AAFDTHKCCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFDTHKCN + " mm" +
                                                                    "</span>");
                                                                AAFDTHKCCHK = "不合格";
                                                            }

                                                            AAFDALPHACHK = "否";
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "小端与筒体连接处是否进行内压加强计算？：否" +
                                                                "</span>");
                                                        }
                                                        else {

                                                            south.html(
                                                                "<span style='color:#444444;'>" +
                                                                "小端圆筒(非加强段)所需厚度：" + (AAFDTHKPD + AAFDCP1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            if (AAFDTHKPN >= (AAFDTHKPD + AAFDCP1).toFixed(2)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFDTHKPN + " mm" +
                                                                    "</span>");
                                                                AAFDTHKPCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFDTHKPN + " mm" +
                                                                    "</span>");
                                                                AAFDTHKPCHK = "不合格";
                                                            }

                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "锥壳(非加强段)所需厚度：" + (AAFDTHKCD + AAFDCC1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            if (AAFDTHKCN >= (AAFDTHKCD + AAFDCC1).toFixed(2)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFDTHKCN + " mm" +
                                                                    "</span>");
                                                                AAFDTHKCCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFDTHKCN + " mm" +
                                                                    "</span>");
                                                                AAFDTHKCCHK = "不合格";
                                                            }

                                                            AAFDALPHACHK = "是";
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "小端与筒体连接处是否进行内压加强计算？：是" +
                                                                "</span>");

                                                            AAFDTHKPCRPM = AAFDTHKPC / AAFDRPM;

                                                            // 查图参数
                                                            if (AAFDTHKPCRPM > 0.1 || AAFDTHKPCRPM < 0.002) {
                                                                south.html("查图 5-14 超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }

                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "gbt_150_2011_chart_5_14_get_q2.action",
                                                                async: false,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "alpha": AAFDALPHA,
                                                                    "thkrs": Math.max(AAFDTHKPCRPM, 0.002)
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    AAFDQ2 = parseFloat(result);
                                                                    if (AAFDTHKPCRPM >= 0.002) {
                                                                        AAFDTHKRC = AAFDQ2 * AAFDTHKPC;
                                                                    }
                                                                    else {
                                                                        AAFDTHKRC = 0.001 * AAFDQ2 * AAFDDPI;
                                                                    }

                                                                    AAFDTHKRD = Math.max(AAFDTHKCC, AAFDTHKRC, 0.003 * AAFDDPI) + Math.max(AAFDCC2, AAFDCP2);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强段设计厚度：" + AAFDTHKRD.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    AAFDLRC = Math.sqrt(2 * AAFDDPI * AAFDTHKRC / Math.cos(AAFDALPHA / 180 * Math.PI));
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "锥壳加强段最小长度：" + AAFDLRC.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    AAFDLRS = Math.sqrt(2 * AAFDDPI * AAFDTHKRC);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "小端筒体加强段最小长度：" + AAFDLRS.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                },
                                                                error: function () {
                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                        "<span style='color:red;'>&ensp;查图5-14获取Q2值获取失败，请检查网络后重试</span>");
                                                                }
                                                            });
                                                        }

                                                        // 是否考虑轴向载荷的代码
                                                        let AAFDFS = -1, AAFDDSM = -1, AAFDF2 = -1, AAFDQS = -1,
                                                            AAFDPCOPTEP = -1, AAFDDELTA = -1, AAFDisAxialReinforce = -1,
                                                            AAFDK = -1, AAFDARS = -1, AAFDAES = -1, AAFDACHK = -1,
                                                            AAFDisRing = -1,
                                                            AAFDA = -1, AAFDWR = -1, AAFDLR = -1;
                                                        if (AAFDISAXIAL === "是") {

                                                            // FS
                                                            if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                                AAFDFS = parseFloat(rows[22][columns[0][1].field]);
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            AAFDDSM = (AAFDDSI + AAFDDSO) / 2;
                                                            AAFDF2 = AAFDFS / (Math.PI * AAFDDSM);
                                                            AAFDQS = AAFDPC * AAFDDSO / 4 + AAFDF2;
                                                            if (AAFDQS < 0) {
                                                                south.html("考虑内压+轴向载荷后，轴向总应力为负，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                            AAFDPCOPTEP = AAFDPC / (AAFDOPT * AAFDEP);

                                                            // Δ
                                                            if (AAFDPCOPTEP < 0.002) {
                                                                south.html("查表 5-5 超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (AAFDPCOPTEP === 0.002) {
                                                                AAFDDELTA = 4;
                                                            }
                                                            else if (AAFDPCOPTEP > 0.002 && AAFDPCOPTEP < 0.005) {
                                                                AAFDDELTA = 4 + (AAFDPCOPTEP - 0.002) / (0.005 - 0.002) * (6 - 4);
                                                            }
                                                            else if (AAFDPCOPTEP === 0.005) {
                                                                AAFDDELTA = 6;
                                                            }
                                                            else if (AAFDPCOPTEP > 0.005 && AAFDPCOPTEP < 0.010) {
                                                                AAFDDELTA = 6 + (AAFDPCOPTEP - 0.005) / (0.010 - 0.005) * (9 - 6);
                                                            }
                                                            else if (AAFDPCOPTEP === 0.010) {
                                                                AAFDDELTA = 9;
                                                            }
                                                            else if (AAFDPCOPTEP > 0.010 && AAFDPCOPTEP < 0.020) {
                                                                AAFDDELTA = 9 + (AAFDPCOPTEP - 0.010) / (0.020 - 0.010) * (12.5 - 9);
                                                            }
                                                            else if (AAFDPCOPTEP === 0.020) {
                                                                AAFDDELTA = 12.5;
                                                            }
                                                            else if (AAFDPCOPTEP > 0.020 && AAFDPCOPTEP < 0.040) {
                                                                AAFDDELTA = 12.5 + (AAFDPCOPTEP - 0.020) / (0.040 - 0.020) * (17.5 - 12.5);
                                                            }
                                                            else if (AAFDPCOPTEP === 0.040) {
                                                                AAFDDELTA = 17.5;
                                                            }
                                                            else if (AAFDPCOPTEP > 0.040 && AAFDPCOPTEP < 0.080) {
                                                                AAFDDELTA = 17.5 + (AAFDPCOPTEP - 0.040) / (0.080 - 0.040) * (24 - 17.5);
                                                            }
                                                            else if (AAFDPCOPTEP === 0.080) {
                                                                AAFDDELTA = 24;
                                                            }
                                                            else if (AAFDPCOPTEP > 0.080 && AAFDPCOPTEP < 0.10) {
                                                                AAFDDELTA = 24 + (AAFDPCOPTEP - 0.080) / (0.10 - 0.080) * (27 - 24);
                                                            }
                                                            else if (AAFDPCOPTEP === 0.10) {
                                                                AAFDDELTA = 27;
                                                            }
                                                            else if (AAFDPCOPTEP > 0.10 && AAFDPCOPTEP < 0.125) {
                                                                AAFDDELTA = 27 + (AAFDPCOPTEP - 0.10) / (0.125 - 0.10) * (30 - 27);
                                                            }
                                                            else if (AAFDPCOPTEP >= 0.125) {
                                                                AAFDDELTA = 30;
                                                            }

                                                            if (AAFDALPHA <= AAFDDELTA) {
                                                                AAFDisAxialReinforce = "否";
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "是否进行内压+轴向载荷下的加强计算？：否" +
                                                                    "</span>");
                                                            }
                                                            else {
                                                                AAFDisAxialReinforce = "是";
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "是否进行内压+轴向载荷下的加强计算？：是" +
                                                                    "</span>");

                                                                AAFDK = 1.0;
                                                                AAFDARS = AAFDK * AAFDQS * AAFDDPI * Math.tan(AAFDALPHA / 180 * Math.PI) / (2 * AAFDOPT) * (1 - AAFDDELTA / AAFDALPHA);
                                                                AAFDAES = 0.55 * (AAFDTHKPE - AAFDTHKPC) * Math.sqrt(AAFDDPI * AAFDTHKPE)
                                                                    + 0.55 * (AAFDTHKCE - AAFDTHKCC) * Math.sqrt(AAFDDSI * AAFDTHKCE / Math.cos(AAFDALPHA / 180 * Math.PI));

                                                                if (AAFDAES >= AAFDARS) {
                                                                    AAFDACHK = "合格";
                                                                    AAFDisRing = "否";
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "小端连接处是否需要设置加强圈？：否" +
                                                                        "</span>");
                                                                }
                                                                else {
                                                                    AAFDACHK = "不合格";
                                                                    AAFDisRing = "是";
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "小端连接处是否需要设置加强圈？：是" +
                                                                        "</span>");

                                                                    AAFDA = AAFDARS - AAFDAES;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强圈所需截面积：" + AAFDA.toFixed(2) + " mm²" +
                                                                        "</span>");

                                                                    AAFDWR = Math.sqrt(AAFDDPI / 2 * AAFDTHKPE);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强圈边缘到锥壳和筒体连接处许用最大距离：" + AAFDWR.toFixed(2) + " mm" +
                                                                        "</span>");

                                                                    AAFDLR = 0.25 * Math.sqrt(AAFDDPI / 2 * AAFDTHKPE);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强圈形心到锥壳和筒体连接处许用最大距离：" + AAFDLR.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                }
                                                            }
                                                        }

                                                        // 压力试验
                                                        let AAFDPCT, AAFDPPT, AAFDPT;
                                                        if (AAFDTest === "液压试验") {
                                                            AAFDPCT = 1.25 * AAFDPD * AAFDOC / Math.max(AAFDOCT, AAFDOCT1);
                                                            AAFDPPT = 1.25 * AAFDPD * AAFDOP / Math.max(AAFDOPT, AAFDOPT1);
                                                            AAFDPT = Math.min(AAFDPCT, AAFDPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + AAFDPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (AAFDTest === "气压试验") {
                                                            AAFDPCT = 1.10 * AAFDPD * AAFDOC / Math.max(AAFDOCT, AAFDOCT1);
                                                            AAFDPPT = 1.10 * AAFDPD * AAFDOP / Math.max(AAFDOPT, AAFDOPT1);
                                                            AAFDPT = Math.min(AAFDPCT, AAFDPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + AAFDPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // docx
                                                        let AAFDPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "aafddocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "AAFD",

                                                                    pd: AAFDPD,
                                                                    t: AAFDDT,
                                                                    ps: AAFDPS,

                                                                    stdc: AAFDCSTDVal,
                                                                    namec: AAFDCNameVal,
                                                                    dbi: AAFDDBI,
                                                                    dsi: AAFDDSI,
                                                                    alpha: AAFDALPHA,
                                                                    thkcn: AAFDTHKCN,
                                                                    cc2: AAFDCC2,
                                                                    ec: AAFDEC,
                                                                    isAxial: AAFDISAXIAL,
                                                                    fs: AAFDFS,

                                                                    stdp: AAFDPSTDVal,
                                                                    namep: AAFDPNameVal,
                                                                    thkpn: AAFDTHKPN,
                                                                    cp2: AAFDCP2,
                                                                    ep: AAFDEP,

                                                                    test: AAFDTest,

                                                                    dc: AAFDDC.toFixed(4),
                                                                    rcel: AAFDRCEL.toFixed(4),
                                                                    cc1: AAFDCC1.toFixed(4),
                                                                    oct: AAFDOCT.toFixed(4),
                                                                    oc: AAFDOC.toFixed(4),
                                                                    oct1: AAFDOCT1.toFixed(4),

                                                                    dp: AAFDDP.toFixed(4),
                                                                    rpel: AAFDRPEL.toFixed(4),
                                                                    cp1: AAFDCP1.toFixed(4),
                                                                    opt: AAFDOPT.toFixed(4),
                                                                    op: AAFDOP.toFixed(4),
                                                                    opt1: AAFDOPT1.toFixed(4),

                                                                    pc: AAFDPC.toFixed(4),

                                                                    cp: AAFDCP.toFixed(4),
                                                                    thkpe: AAFDTHKPE.toFixed(4),
                                                                    dpi: AAFDDPI.toFixed(4),
                                                                    dpo: AAFDDPO.toFixed(4),
                                                                    dpm: AAFDDPM.toFixed(4),
                                                                    rpm: AAFDRPM.toFixed(4),

                                                                    cc: AAFDCC.toFixed(4),
                                                                    thkce: AAFDTHKCE.toFixed(4),
                                                                    dbc: AAFDDBC.toFixed(4),
                                                                    dso: AAFDDSO.toFixed(4),
                                                                    dsm: AAFDDSM.toFixed(4),
                                                                    f2: AAFDF2.toFixed(4),
                                                                    qs: AAFDQS.toFixed(4),

                                                                    thkpc: AAFDTHKPC.toFixed(4),
                                                                    thkpd: AAFDTHKPD.toFixed(4),
                                                                    thkpchk: AAFDTHKPCHK,

                                                                    thkcc: AAFDTHKCC.toFixed(4),
                                                                    thkcd: AAFDTHKCD.toFixed(4),
                                                                    thkcchk: AAFDTHKCCHK,

                                                                    pcoctec: AAFDPCOCTEC.toFixed(4),
                                                                    alphaAllow: AAFDALPHAALLOW.toFixed(4),
                                                                    alphachk: AAFDALPHACHK,

                                                                    thkpcrpm: AAFDTHKPCRPM.toFixed(4),
                                                                    q2: AAFDQ2.toFixed(4),
                                                                    thkrc: AAFDTHKRC.toFixed(4),
                                                                    thkrd: AAFDTHKRD.toFixed(4),
                                                                    lrc: AAFDLRC.toFixed(4),
                                                                    lrs: AAFDLRS.toFixed(4),

                                                                    pcoptep: AAFDPCOPTEP.toFixed(4),
                                                                    delta: AAFDDELTA.toFixed(4),
                                                                    isAxialReinforce: AAFDisAxialReinforce,

                                                                    k: AAFDK.toFixed(4),
                                                                    ars: AAFDARS.toFixed(4),
                                                                    aes: AAFDAES.toFixed(4),
                                                                    achk: AAFDACHK,
                                                                    isRing: AAFDisRing,
                                                                    a: AAFDA.toFixed(4),
                                                                    wr: AAFDWR.toFixed(4),
                                                                    lr: AAFDLR.toFixed(4),

                                                                    pct: AAFDPCT.toFixed(4),
                                                                    ppt: AAFDPPT.toFixed(4),
                                                                    pt: AAFDPT.toFixed(4)
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
                                                                        AAFDPayJS.dialog({
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
                                                                                    AAFDPayJS.dialog("close");
                                                                                    AAFDPayJS.dialog("clear");
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
                                                                                                AAFDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        AAFDPayJS.dialog('close');
                                                                                                        AAFDPayJS.dialog('clear');
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
                                                            "<span style='color:red;'>&ensp;小端筒体材料力学特性获取失败，请检查网络后重试</span>");
                                                    }
                                                });
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;小端筒体材料物理性质获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;封头材料力学特性获取失败，请检查网络后重试</span>");
                                    }
                                });
                            },
                            error: function () {
                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                    "<span style='color:red;'>&ensp;封头材料物理性质获取失败，请检查网络后重试</span>");
                            }
                        });
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 22).hide();
            }
        });
    });
});