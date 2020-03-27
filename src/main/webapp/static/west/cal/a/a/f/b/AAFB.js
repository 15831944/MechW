/*
一个问题：当锥壳同时需要内压加强计算和轴向载荷加强计算时，内压加强需要设置加强段，轴向载荷计算时，额外加强面积是否考虑加强段的额外厚度？
本程序偏保守计，轴向载荷可用加强面积计算时，不计内压加强带来的加强段，只考虑锥壳及筒体非加强段名义厚度。
 */

$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aafbSketch = $("#d2");
    let aafbModel = $("#d3");
    let aafbd2d3 = $('#d2d3');

    $("#cal").html("<table id='aafb'></table>");
    let pg = $("#aafb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/f/b/AAFB.json", function (result) {

        let AAFBDT,
            AAFBCCategory, AAFBCCategoryVal, AAFBCType, AAFBCTypeVal, AAFBCSTD, AAFBCSTDVal, AAFBCName, AAFBCNameVal,
            AAFBSCategory, AAFBSCategoryVal, AAFBSType, AAFBSTypeVal, AAFBSSTD, AAFBSSTDVal, AAFBSName, AAFBSNameVal,
            columns, rows, ed;
        let AAFBISAXIAL = "否";

        function aafb2d(dbi = "ΦDbi", alpha = "α", thkcn = "δcn", thksn = "δsn") {

            aafbSketch.empty();

            let width = aafbSketch.width();
            let height = aafbSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAFBSVG").attr("height", height);

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

            // 上部无加强段
            svg.append("path").attr("d", line([
                {x: padding, y: padding + hg},
                {x: padding + 2 * wg, y: padding},
                {x: padding + 3 * wg, y: padding},
                {x: padding + 3 * wg, y: padding - thk},
                {x: padding + 2 * wg, y: padding - thk},
                {x: padding, y: padding + hg - thk},
                {x: padding, y: padding + hg}
            ])).classed("sketch", true);

            // 端头封闭线
            drawCenterLine(padding, padding + hg - thk - 10, padding, padding + 3 * hg + thk + 10);
            drawCenterLine(padding + 3 * wg, padding - thk - 10, padding + 3 * wg, padding + 4 * hg + thk + 10);

            // 连接线
            drawLine(width / 2, padding - thk, width / 2, padding + 4 * hg + 2 * thk);

            // 大端加强段垂直线
            drawLine(width / 2 + 0.3 * wg + 2 * thk, height / 2, width / 2 + 0.3 * wg + 2 * thk, padding + 4 * hg + thk);

            // 下部有加强段
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 3 * hg},
                {x: width / 2, y: padding + 4 * hg},
                {x: padding + 3 * wg, y: padding + 4 * hg},
                {x: padding + 3 * wg, y: padding + 4 * hg + thk},
                {x: padding + 2.3 * wg + 2 * thk, y: padding + 4 * hg + thk},
                {x: padding + 2.3 * wg, y: padding + 4 * hg + 2 * thk},
                {x: width / 2, y: padding + 4 * hg + 2 * thk},
                {x: padding + 1.7 * wg, y: padding + 4 * hg + 2 * thk - 0.3 * wg * Math.tan(rad)},
                {x: padding + 1.7 * wg - 2 * thk, y: padding + 4 * hg + thk - (0.3 * wg + 2 * thk) * Math.tan(rad)},
                {x: padding, y: padding + 3 * hg + thk}
            ])).classed("sketch", true);

            // 锥壳加强段垂直线
            svg.append("path").attr("d", line([
                {x: padding + 1.7 * wg - 2 * thk, y: padding + 4 * hg + thk - (0.3 * wg + 2 * thk) * Math.tan(rad)},
                {
                    x: padding + 1.7 * wg - 2 * thk + thk * Math.cos(rad) * Math.sin(rad),
                    y: padding + 4 * hg + thk - (0.3 * wg + 2 * thk) * Math.tan(rad) - thk * Math.cos(rad) * Math.cos(rad)
                },
                {x: padding + 1.7 * wg - 2 * thk + thk * Math.cos(rad) * Math.sin(rad), y: height / 2}
            ])).classed("sketch", true);

            // dbi
            dimRightV(padding + 3 * wg, padding + 4 * hg, padding + 3 * wg, padding, dbi, "AAFBSketchDBI");

            // thksn1
            extLineRightH(padding + 3 * wg, padding - thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: padding - thk},
                    {x: padding + 3 * wg + 27, y: padding - thk - 15},
                    {x: padding + 3 * wg + 33, y: padding - thk - 15},
                    {x: padding + 3 * wg + 30, y: padding - thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: padding - thk},
                {x: padding + 3 * wg + 30, y: padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: padding - thk - 15},
                {x: padding + 3 * wg + 30, y: padding - thk - 15 - 40}
            ])).attr("id", "AAFBSketchTHKSN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFBSketchTHKSN1")
                .attr("startOffset", "50%").text(thksn);

            // thksn2
            extLineRightH(padding + 3 * wg, padding + 4 * hg + thk);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg + 30, y: padding + 4 * hg + thk},
                    {x: padding + 3 * wg + 27, y: padding + 4 * hg + thk + 15},
                    {x: padding + 3 * wg + 33, y: padding + 4 * hg + thk + 15},
                    {x: padding + 3 * wg + 30, y: padding + 4 * hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: padding + 4 * hg + thk},
                {x: padding + 3 * wg + 30, y: padding + 4 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg + 30, y: padding + 4 * hg + thk + 15 + 40},
                {x: padding + 3 * wg + 30, y: padding + 4 * hg + thk + 15}
            ])).attr("id", "AAFBSketchTHKSN2").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFBSketchTHKSN2")
                .attr("startOffset", "50%").text(thksn);

            // alpha
            let cx0 = width / 2 - 2 * hg / Math.tan(rad);
            let cy0 = height / 2;
            let cr = 2 * hg / Math.tan(rad) - wg;

            // alpha1
            svg.append("path").attr("d", "M "
                + (cx0 + cr * Math.cos(rad)) + " " + (cy0 + cr * Math.sin(rad)) + " "
                + "A" + cr + " " + cr + " "
                + "1 0 0" + " "
                + (cx0 + cr) + " " + (cy0)
            ).classed("sketch", true).attr("id", "AAFBSketchALPHA1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFBSketchALPHA1")
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
            ).classed("sketch", true).attr("id", "AAFBSketchALPHA2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFBSketchALPHA2")
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
                .attr("id", "AAFBSketchTHKCN1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFBSketchTHKCN1")
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
                .attr("id", "AAFBSketchTHKCN2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAFBSketchTHKCN2")
                .attr("startOffset", "50%").text(thkcn);
        }

        currentTabIndex = aafbd2d3.tabs('getTabIndex', aafbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aafb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#aafb").length > 0) {
                    aafb2d();
                }
            });
        }
        aafbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aafb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#aafb").length > 0) {
                            aafb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 无折边锥壳(11°≤α≤30°)大端强度计算",
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
                if (index === 21) {
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
                    $(ed.target).combobox("loadData", AAFBCCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", AAFBCType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAFBCSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAFBCName);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAFBSCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAFBSType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAFBSSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", AAFBSName);
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
                    aafbSketch.empty();

                    // model
                    aafbModel.empty();

                    // sketch
                    currentTabIndex = aafbd2d3.tabs('getTabIndex', aafbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aafb2d();
                        aafbSketch.off("resize").on("resize", function () {
                            if ($("#aafb").length > 0) {
                                aafb2d();
                            }
                        });
                    }
                    aafbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aafb2d();
                                aafbSketch.off("resize").on("resize", function () {
                                    if ($("#aafb").length > 0) {
                                        aafb2d();
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

                        AAFBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        AAFBCCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFBCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFBCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFBCName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAFBSCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAFBSType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFBSSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFBSName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFBCCategory = [];
                                AAFBSCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAFBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        AAFBCCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAFBSCategory[index] = {
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

                        AAFBCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAFBCType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFBCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFBCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFBCCategoryVal,
                                temp: AAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFBCType = [];
                                $(result).each(function (index, element) {
                                    AAFBCType[index] = {
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

                        AAFBCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAFBCSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFBCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFBCCategoryVal,
                                type: AAFBCTypeVal,
                                temp: AAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFBCSTD = [];
                                $(result).each(function (index, element) {
                                    AAFBCSTD[index] = {
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

                        AAFBCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAFBCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFBCCategoryVal,
                                type: AAFBCTypeVal,
                                std: AAFBCSTDVal,
                                temp: AAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFBCName = [];
                                $(result).each(function (index, element) {
                                    AAFBCName[index] = {
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
                    else if (index === 13) {

                        AAFBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAFBSType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFBSSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFBSCategoryVal,
                                temp: AAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFBSType = [];
                                $(result).each(function (index, element) {
                                    AAFBSType[index] = {
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
                    else if (index === 14) {

                        AAFBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAFBSSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFBSCategoryVal,
                                type: AAFBSTypeVal,
                                temp: AAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFBSSTD = [];
                                $(result).each(function (index, element) {
                                    AAFBSSTD[index] = {
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
                    else if (index === 15) {

                        AAFBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        AAFBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAFBSCategoryVal,
                                type: AAFBSTypeVal,
                                std: AAFBSSTDVal,
                                temp: AAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAFBSName = [];
                                $(result).each(function (index, element) {
                                    AAFBSName[index] = {
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

                        if (index === 20) {
                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                AAFBISAXIAL = rows[20][columns[0][1].field];
                                if (AAFBISAXIAL === "是") {
                                    pg.datagrid('options').finder.getTr(this, 21).show();
                                }
                                else if (AAFBISAXIAL === "否") {
                                    pg.datagrid('options').finder.getTr(this, 21).hide();
                                }
                            }
                        }

                        // 设计压力
                        let AAFBPD;
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            AAFBPD = parseFloat(rows[0][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let AAFBPS;
                        if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                            AAFBPS = parseFloat(rows[2][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 试验类型
                        let AAFBTest;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            AAFBTest = rows[3][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 锥壳材料名称
                        if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                            AAFBCNameVal = rows[7][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        let AAFBDC, AAFBCThkMin, AAFBCThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_gbt_150_2011_index.action",
                            async: true,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": AAFBCCategoryVal,
                                "type": AAFBCTypeVal,
                                "std": AAFBCSTDVal,
                                "name": AAFBCNameVal,
                                "temp": AAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                AAFBDC = parseFloat(result.density);
                                AAFBCThkMin = parseFloat(result.thkMin);
                                AAFBCThkMax = parseFloat(result.thkMax);

                                // DBI
                                let AAFBDBI;
                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                    AAFBDBI = parseFloat(rows[8][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafb2d("Φ" + AAFBDBI);
                                    aafbSketch.off("resize").on("resize", function () {
                                        if ($("#aafb").length > 0) {
                                            aafb2d("Φ" + AAFBDBI);
                                        }
                                    });
                                }
                                aafbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafb2d("Φ" + AAFBDBI);
                                            aafbSketch.off("resize").on("resize", function () {
                                                if ($("#aafb").length > 0) {
                                                    aafb2d("Φ" + AAFBDBI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 半顶角α
                                let AAFBALPHA;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    AAFBALPHA = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°");
                                    aafbSketch.off("resize").on("resize", function () {
                                        if ($("#aafb").length > 0) {
                                            aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°");
                                        }
                                    });
                                }
                                aafbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°");
                                            aafbSketch.off("resize").on("resize", function () {
                                                if ($("#aafb").length > 0) {
                                                    aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°");
                                                }
                                            });
                                        }
                                    }
                                });

                                // 封头名义厚度
                                let AAFBTHKCN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAFBCThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAFBCThkMax) {
                                    AAFBTHKCN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= AAFBCThkMin) {
                                    south.html("封头材料厚度不能小于等于 " + AAFBCThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > AAFBCThkMax) {
                                    south.html("封头材料厚度不能大于 " + AAFBCThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°", AAFBTHKCN);
                                    aafbSketch.off("resize").on("resize", function () {
                                        if ($("#aafb").length > 0) {
                                            aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°", AAFBTHKCN);
                                        }
                                    });
                                }
                                aafbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°", AAFBTHKCN);
                                            aafbSketch.off("resize").on("resize", function () {
                                                if ($("#aafb").length > 0) {
                                                    aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°", AAFBTHKCN);
                                                }
                                            });
                                        }
                                    }
                                });

                                let AAFBOCT, AAFBOC, AAFBOCT1, AAFBRCEL, AAFBCC1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": AAFBCCategoryVal,
                                        "type": AAFBCTypeVal,
                                        "std": AAFBCSTDVal,
                                        "name": AAFBCNameVal,
                                        "thk": AAFBTHKCN,
                                        "temp": AAFBDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": AAFBDBI + 2 * AAFBTHKCN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        AAFBOCT = parseFloat(result.ot);
                                        if (AAFBOCT < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFBOC = parseFloat(result.o);
                                        if (AAFBOC < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFBRCEL = parseFloat(result.rel);
                                        if (AAFBRCEL < 0) {
                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFBCC1 = parseFloat(result.c1);
                                        if (AAFBCC1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        AAFBOCT1 = parseFloat(result.ot1);

                                        // 封头腐蚀裕量
                                        let AAFBCC2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < AAFBTHKCN) {
                                            AAFBCC2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= AAFBTHKCN) {
                                            south.html("封头腐蚀裕量不能大于等于 " + AAFBTHKCN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        // 焊接接头系数
                                        let AAFBEC;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            AAFBEC = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 大端筒体材料名称
                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                            AAFBSNameVal = rows[16][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        let AAFBDS, AAFBSThkMin, AAFBSThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": AAFBSCategoryVal,
                                                "type": AAFBSTypeVal,
                                                "std": AAFBSSTDVal,
                                                "name": AAFBSNameVal,
                                                "temp": AAFBDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                AAFBDS = parseFloat(result.density);
                                                AAFBSThkMin = parseFloat(result.thkMin);
                                                AAFBSThkMax = parseFloat(result.thkMax);

                                                // 大端筒体名义厚度
                                                let AAFBTHKSN;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAFBSThkMin
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAFBSThkMax) {
                                                    AAFBTHKSN = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) <= AAFBSThkMin) {
                                                    south.html("大端筒体材料厚度不能小于等于 " + AAFBSThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                    && parseFloat(rows[17][columns[0][1].field]) > AAFBSThkMax) {
                                                    south.html("大端筒体材料厚度不能大于 " + AAFBSThkMax + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°", AAFBTHKCN, AAFBTHKSN);
                                                    aafbSketch.off("resize").on("resize", function () {
                                                        if ($("#aafb").length > 0) {
                                                            aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°", AAFBTHKCN, AAFBTHKSN);
                                                        }
                                                    });
                                                }
                                                aafbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°", AAFBTHKCN, AAFBTHKSN);
                                                            aafbSketch.off("resize").on("resize", function () {
                                                                if ($("#aafb").length > 0) {
                                                                    aafb2d("Φ" + AAFBDBI, AAFBALPHA + "°", AAFBTHKCN, AAFBTHKSN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let AAFBOST, AAFBOS, AAFBOST1, AAFBRSEL, AAFBCS1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": AAFBSCategoryVal,
                                                        "type": AAFBSTypeVal,
                                                        "std": AAFBSSTDVal,
                                                        "name": AAFBSNameVal,
                                                        "thk": AAFBTHKSN,
                                                        "temp": AAFBDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": AAFBDBI + 2 * AAFBTHKSN
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        AAFBOST = parseFloat(result.ot);
                                                        if (AAFBOST < 0) {
                                                            south.html("查询大端筒体材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFBOS = parseFloat(result.o);
                                                        if (AAFBOS < 0) {
                                                            south.html("查询大端筒体材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFBRSEL = parseFloat(result.rel);
                                                        if (AAFBRSEL < 0) {
                                                            south.html("查询大端筒体材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFBCS1 = parseFloat(result.c1);
                                                        if (AAFBCS1 < 0) {
                                                            south.html("查询大端筒体材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        AAFBOST1 = parseFloat(result.ot1);

                                                        // 大端筒体腐蚀裕量
                                                        let AAFBCS2;
                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) < AAFBTHKSN) {
                                                            AAFBCS2 = parseFloat(rows[18][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                            && parseFloat(rows[18][columns[0][1].field]) >= AAFBTHKSN) {
                                                            south.html("大端筒体腐蚀裕量不能大于等于 " + AAFBTHKSN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 焊接接头系数
                                                        let AAFBES;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                            AAFBES = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 是否考虑轴向外载荷
                                                        let AAFBISAXIAL;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                            AAFBISAXIAL = rows[20][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // 过程参数
                                                        let AAFBPC = AAFBPD + AAFBPS;

                                                        let AAFBCS = AAFBCS1 + AAFBCS2;
                                                        let AAFBTHKSE = AAFBTHKSN - AAFBCS;
                                                        let AAFBDSI = AAFBDBI;
                                                        let AAFBDSO = AAFBDSI + 2 * AAFBTHKSN;
                                                        let AAFBDSM = (AAFBDSI + AAFBDSO) / 2;
                                                        let AAFBRSM = AAFBDSM / 2;

                                                        let AAFBCC = AAFBCC1 + AAFBCC2;
                                                        let AAFBTHKCE = AAFBTHKCN - AAFBCC;
                                                        let AAFBDBC = AAFBDBI;
                                                        let AAFBDBO = AAFBDSO;

                                                        // 大端筒体厚度计算及校核
                                                        let AAFBTHKSC = AAFBPC * AAFBDSI / (2 * AAFBOST * AAFBES - AAFBPC);
                                                        let AAFBTHKSD = AAFBTHKSC + AAFBCS2;
                                                        let AAFBTHKSCHK;

                                                        // 锥壳厚度计算及校核
                                                        let AAFBTHKCC = AAFBPC * AAFBDBC / (2 * AAFBOCT * AAFBEC - AAFBPC) / Math.cos(AAFBALPHA / 180 * Math.PI);
                                                        let AAFBTHKCD = AAFBTHKCC + AAFBCC2;
                                                        let AAFBTHKCCHK;


                                                        // 内压加强设计
                                                        let AAFBPCOCTEC = AAFBPC / (AAFBOCT * AAFBEC);

                                                        let AAFBPCOCTECALLOW;
                                                        if (AAFBALPHA < 11 || AAFBALPHA > 30) {
                                                            south.html("查图 5-11 超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (AAFBALPHA === 11) {
                                                            AAFBPCOCTECALLOW = 0.002;
                                                        }
                                                        else if (AAFBALPHA > 11 && AAFBALPHA < 13.732) {
                                                            AAFBPCOCTECALLOW = 0.002 + (AAFBALPHA - 11) / (13.732 - 11) * (0.003 - 0.002);
                                                        }
                                                        else if (AAFBALPHA === 13.732) {
                                                            AAFBPCOCTECALLOW = 0.003;
                                                        }
                                                        else if (AAFBALPHA > 13.732 && AAFBALPHA < 15.965) {
                                                            AAFBPCOCTECALLOW = 0.003 + (AAFBALPHA - 13.732) / (15.965 - 13.732) * (0.004 - 0.003);
                                                        }
                                                        else if (AAFBALPHA === 15.965) {
                                                            AAFBPCOCTECALLOW = 0.004;
                                                        }
                                                        else if (AAFBALPHA > 15.965 && AAFBALPHA < 18.144) {
                                                            AAFBPCOCTECALLOW = 0.004 + (AAFBALPHA - 15.965) / (18.144 - 15.965) * (0.005 - 0.004);
                                                        }
                                                        else if (AAFBALPHA === 18.144) {
                                                            AAFBPCOCTECALLOW = 0.005;
                                                        }
                                                        else if (AAFBALPHA > 18.144 && AAFBALPHA < 20) {
                                                            AAFBPCOCTECALLOW = 0.005 + (AAFBALPHA - 18.144) / (20 - 18.144) * (0.006 - 0.005);
                                                        }
                                                        else if (AAFBALPHA === 20) {
                                                            AAFBPCOCTECALLOW = 0.006;
                                                        }
                                                        else if (AAFBALPHA > 20 && AAFBALPHA < 21.74) {
                                                            AAFBPCOCTECALLOW = 0.006 + (AAFBALPHA - 20) / (21.74 - 20) * (0.007 - 0.006);
                                                        }
                                                        else if (AAFBALPHA === 21.74) {
                                                            AAFBPCOCTECALLOW = 0.007;
                                                        }
                                                        else if (AAFBALPHA > 21.74 && AAFBALPHA < 23.5) {
                                                            AAFBPCOCTECALLOW = 0.007 + (AAFBALPHA - 21.74) / (23.5 - 21.74) * (0.008 - 0.007);
                                                        }
                                                        else if (AAFBALPHA === 23.5) {
                                                            AAFBPCOCTECALLOW = 0.008;
                                                        }
                                                        else if (AAFBALPHA > 23.5 && AAFBALPHA < 25) {
                                                            AAFBPCOCTECALLOW = 0.008 + (AAFBALPHA - 23.5) / (25 - 23.5) * (0.009 - 0.008);
                                                        }
                                                        else if (AAFBALPHA === 25) {
                                                            AAFBPCOCTECALLOW = 0.009;
                                                        }
                                                        else if (AAFBALPHA > 25 && AAFBALPHA < 26.6) {
                                                            AAFBPCOCTECALLOW = 0.009 + (AAFBALPHA - 25) / (26.6 - 25) * (0.010 - 0.009);
                                                        }
                                                        else if (AAFBALPHA === 26.6) {
                                                            AAFBPCOCTECALLOW = 0.010;
                                                        }
                                                        else if (AAFBALPHA > 26.6 && AAFBALPHA < 28.1) {
                                                            AAFBPCOCTECALLOW = 0.010 + (AAFBALPHA - 26.6) / (28.1 - 26.6) * (0.011 - 0.010);
                                                        }
                                                        else if (AAFBALPHA === 28.1) {
                                                            AAFBPCOCTECALLOW = 0.011;
                                                        }
                                                        else if (AAFBALPHA > 28.1 && AAFBALPHA < 29.424) {
                                                            AAFBPCOCTECALLOW = 0.011 + (AAFBALPHA - 28.1) / (29.424 - 28.1) * (0.012 - 0.011);
                                                        }
                                                        else if (AAFBALPHA === 29.424) {
                                                            AAFBPCOCTECALLOW = 0.012;
                                                        }
                                                        else if (AAFBALPHA > 29.424 && AAFBALPHA < 30) {
                                                            AAFBPCOCTECALLOW = 0.012 + (AAFBALPHA - 29.424) / (30 - 29.424) * (0.0126 - 0.012);
                                                        }
                                                        else if (AAFBALPHA === 30) {
                                                            AAFBPCOCTECALLOW = 0.0126;
                                                        }

                                                        let AAFBPCOCTECCHK = -1,
                                                            AAFBTHKSCRSM = -1, AAFBQ1 = -1,
                                                            AAFBTHKRC = -1, AAFBTHKRD = -1,
                                                            AAFBLRC = -1, AAFBLRS = -1;
                                                        if (AAFBPCOCTEC > AAFBPCOCTECALLOW) {

                                                            south.html(
                                                                "<span style='color:#444444;'>" +
                                                                "大端圆筒所需厚度：" + (AAFBTHKSD + AAFBCS1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            if (AAFBTHKSN >= (AAFBTHKSD + AAFBCS1).toFixed(2)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFBTHKSN + " mm" +
                                                                    "</span>");
                                                                AAFBTHKSCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFBTHKSN + " mm" +
                                                                    "</span>");
                                                                AAFBTHKSCHK = "不合格";
                                                            }

                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "锥壳所需厚度：" + (AAFBTHKCD + AAFBCC1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            if (AAFBTHKCN >= (AAFBTHKCD + AAFBCC1).toFixed(2)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFBTHKCN + " mm" +
                                                                    "</span>");
                                                                AAFBTHKCCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFBTHKCN + " mm" +
                                                                    "</span>");
                                                                AAFBTHKCCHK = "不合格";
                                                            }

                                                            AAFBPCOCTECCHK = "否";
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "大端与筒体连接处是否进行内压加强计算？：否" +
                                                                "</span>");
                                                        }
                                                        else {

                                                            south.html(
                                                                "<span style='color:#444444;'>" +
                                                                "大端圆筒(非加强段)所需厚度：" + (AAFBTHKSD + AAFBCS1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            if (AAFBTHKSN >= (AAFBTHKSD + AAFBCS1).toFixed(2)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFBTHKSN + " mm" +
                                                                    "</span>");
                                                                AAFBTHKSCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFBTHKSN + " mm" +
                                                                    "</span>");
                                                                AAFBTHKSCHK = "不合格";
                                                            }

                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "锥壳(非加强段)所需厚度：" + (AAFBTHKCD + AAFBCC1).toFixed(2) + " mm" +
                                                                "</span>");
                                                            if (AAFBTHKCN >= (AAFBTHKCD + AAFBCC1).toFixed(2)) {
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFBTHKCN + " mm" +
                                                                    "</span>");
                                                                AAFBTHKCCHK = "合格";
                                                            }
                                                            else {
                                                                south.append(
                                                                    "<span style='color:red;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "输入厚度：" + AAFBTHKCN + " mm" +
                                                                    "</span>");
                                                                AAFBTHKCCHK = "不合格";
                                                            }

                                                            AAFBPCOCTECCHK = "是";
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "大端与筒体连接处是否进行内压加强计算？：是" +
                                                                "</span>");

                                                            AAFBTHKSCRSM = AAFBTHKSC / AAFBRSM;

                                                            // 查图参数
                                                            /*
                                                            if (AAFBTHKSCRSM > 0.02) {
                                                                south.html("查图 5-12 超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                            */
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "gbt_150_2011_chart_5_12_get_q1.action",
                                                                async: false,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "alpha": AAFBALPHA,
                                                                    "thkrl": Math.min(Math.max(AAFBTHKSCRSM, 0.002), 0.02)
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    AAFBQ1 = parseFloat(result);
                                                                    if (AAFBTHKSCRSM >= 0.002) {
                                                                        AAFBTHKRC = AAFBQ1 * AAFBTHKSC;
                                                                    }
                                                                    else {
                                                                        AAFBTHKRC = 0.001 * AAFBQ1 * AAFBDBI;
                                                                    }

                                                                    AAFBTHKRD = Math.max(AAFBTHKCC, AAFBTHKRC, 0.003 * AAFBDSI) + Math.max(AAFBCC2, AAFBCS2);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强段设计厚度：" + AAFBTHKRD.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    AAFBLRC = Math.sqrt(2 * AAFBDBI * AAFBTHKRC / Math.cos(AAFBALPHA / 180 * Math.PI));
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "锥壳加强段最小长度：" + AAFBLRC.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                    AAFBLRS = Math.sqrt(2 * AAFBDSI * AAFBTHKRC);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "大端筒体加强段最小长度：" + AAFBLRS.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                },
                                                                error: function () {
                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                        "<span style='color:red;'>&ensp;查图5-12获取Q1值获取失败，请检查网络后重试</span>");
                                                                }
                                                            });
                                                        }

                                                        // 是否考虑轴向载荷的代码
                                                        let AAFBFL = -1, AAFBDBM = -1, AAFBF1 = -1, AAFBQL = -1,
                                                            AAFBPCOSTES = -1, AAFBDELTA = -1, AAFBisAxialReinforce = -1,
                                                            AAFBK = -1, AAFBARL = -1, AAFBAEL = -1, AAFBACHK = -1,
                                                            AAFBisRing = -1,
                                                            AAFBA = -1, AAFBWR = -1, AAFBLR = -1;
                                                        if (AAFBISAXIAL === "是") {

                                                            // FL
                                                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                                AAFBFL = parseFloat(rows[21][columns[0][1].field]);
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            AAFBDBM = (AAFBDBC + AAFBDBO) / 2;
                                                            AAFBF1 = AAFBFL / (Math.PI * AAFBDBM);
                                                            AAFBQL = AAFBPC * AAFBDBO / 4 + AAFBF1;
                                                            if (AAFBQL < 0) {
                                                                south.html("考虑内压+轴向载荷后，轴向总应力为负，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                            AAFBPCOSTES = AAFBPC / (AAFBOST * AAFBES);

                                                            // Δ
                                                            if (AAFBPCOSTES < 0.002) {
                                                                south.html("查表 5-5 超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (AAFBPCOSTES === 0.002) {
                                                                AAFBDELTA = 11;
                                                            }
                                                            else if (AAFBPCOSTES > 0.002 && AAFBPCOSTES < 0.003) {
                                                                AAFBDELTA = 11 + (AAFBPCOSTES - 0.002) / (0.003 - 0.002) * (13.5 - 11);
                                                            }
                                                            else if (AAFBPCOSTES === 0.003) {
                                                                AAFBDELTA = 13.5;
                                                            }
                                                            else if (AAFBPCOSTES > 0.003 && AAFBPCOSTES < 0.004) {
                                                                AAFBDELTA = 13.5 + (AAFBPCOSTES - 0.003) / (0.004 - 0.003) * (16 - 13.5);
                                                            }
                                                            else if (AAFBPCOSTES === 0.004) {
                                                                AAFBDELTA = 16;
                                                            }
                                                            else if (AAFBPCOSTES > 0.004 && AAFBPCOSTES < 0.005) {
                                                                AAFBDELTA = 16 + (AAFBPCOSTES - 0.004) / (0.005 - 0.004) * (18 - 16);
                                                            }
                                                            else if (AAFBPCOSTES === 0.005) {
                                                                AAFBDELTA = 18;
                                                            }
                                                            else if (AAFBPCOSTES > 0.005 && AAFBPCOSTES < 0.006) {
                                                                AAFBDELTA = 18 + (AAFBPCOSTES - 0.005) / (0.006 - 0.005) * (19.5 - 18);
                                                            }
                                                            else if (AAFBPCOSTES === 0.006) {
                                                                AAFBDELTA = 19.5;
                                                            }
                                                            else if (AAFBPCOSTES > 0.006 && AAFBPCOSTES < 0.007) {
                                                                AAFBDELTA = 19.5 + (AAFBPCOSTES - 0.006) / (0.007 - 0.006) * (21.5 - 19.5);
                                                            }
                                                            else if (AAFBPCOSTES === 0.007) {
                                                                AAFBDELTA = 21.5;
                                                            }
                                                            else if (AAFBPCOSTES > 0.007 && AAFBPCOSTES < 0.008) {
                                                                AAFBDELTA = 21.5 + (AAFBPCOSTES - 0.007) / (0.008 - 0.007) * (23 - 21.5);
                                                            }
                                                            else if (AAFBPCOSTES === 0.008) {
                                                                AAFBDELTA = 23;
                                                            }
                                                            else if (AAFBPCOSTES > 0.008 && AAFBPCOSTES < 0.009) {
                                                                AAFBDELTA = 23 + (AAFBPCOSTES - 0.008) / (0.009 - 0.008) * (24.5 - 23);
                                                            }
                                                            else if (AAFBPCOSTES === 0.009) {
                                                                AAFBDELTA = 24.5;
                                                            }
                                                            else if (AAFBPCOSTES > 0.009 && AAFBPCOSTES < 0.010) {
                                                                AAFBDELTA = 24.5 + (AAFBPCOSTES - 0.009) / (0.010 - 0.009) * (26 - 24.5);
                                                            }
                                                            else if (AAFBPCOSTES === 0.010) {
                                                                AAFBDELTA = 26;
                                                            }
                                                            else if (AAFBPCOSTES > 0.010 && AAFBPCOSTES < 0.012) {
                                                                AAFBDELTA = 26 + (AAFBPCOSTES - 0.010) / (0.012 - 0.010) * (29 - 26);
                                                            }
                                                            else if (AAFBPCOSTES === 0.012) {
                                                                AAFBDELTA = 29;
                                                            }
                                                            else if (AAFBPCOSTES > 0.012 && AAFBPCOSTES < 0.013) {
                                                                AAFBDELTA = 29 + (AAFBPCOSTES - 0.012) / (0.013 - 0.012) * (30 - 29);
                                                            }
                                                            else if (AAFBPCOSTES === 0.013) {
                                                                AAFBDELTA = 30;
                                                            }
                                                            else if (AAFBPCOSTES > 0.013) {
                                                                AAFBDELTA = 30;
                                                            }

                                                            if (AAFBALPHA <= AAFBDELTA) {
                                                                AAFBisAxialReinforce = "否";
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "是否进行内压+轴向载荷下的加强计算？：否" +
                                                                    "</span>");
                                                            }
                                                            else {
                                                                AAFBisAxialReinforce = "是";
                                                                south.append(
                                                                    "<span style='color:#444444;'>" +
                                                                    "&ensp;|&ensp;" +
                                                                    "是否进行内压+轴向载荷下的加强计算？：是" +
                                                                    "</span>");

                                                                AAFBK = 1.0;
                                                                AAFBARL = AAFBK * AAFBQL * AAFBDBI * Math.tan(AAFBALPHA / 180 * Math.PI) / (2 * AAFBOST) * (1 - AAFBDELTA / AAFBALPHA);
                                                                AAFBAEL = (AAFBTHKSE - AAFBTHKSC) * Math.sqrt(AAFBDSI / 2 * AAFBTHKSE)
                                                                    + (AAFBTHKCE - AAFBTHKCC) * Math.sqrt(AAFBDBI / 2 * AAFBTHKCE / Math.cos(AAFBALPHA / 180 * Math.PI));

                                                                if (AAFBAEL >= AAFBARL) {
                                                                    AAFBACHK = "合格";
                                                                    AAFBisRing = "否";
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "大端连接处是否需要设置加强圈？：否" +
                                                                        "</span>");
                                                                }
                                                                else {
                                                                    AAFBACHK = "不合格";
                                                                    AAFBisRing = "是";
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "大端连接处是否需要设置加强圈？：是" +
                                                                        "</span>");

                                                                    AAFBA = AAFBARL - AAFBAEL;
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强圈所需截面积：" + AAFBA.toFixed(2) + " mm²" +
                                                                        "</span>");

                                                                    AAFBWR = Math.sqrt(AAFBDSI / 2 * AAFBTHKSE);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强圈边缘到锥壳和筒体连接处许用最大距离：" + AAFBWR.toFixed(2) + " mm" +
                                                                        "</span>");

                                                                    AAFBLR = 0.25 * Math.sqrt(AAFBDSI / 2 * AAFBTHKSE);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "加强圈形心到锥壳和筒体连接处许用最大距离：" + AAFBLR.toFixed(2) + " mm" +
                                                                        "</span>");
                                                                }
                                                            }
                                                        }

                                                        // 压力试验
                                                        let AAFBPCT, AAFBPST, AAFBPT;
                                                        if (AAFBTest === "液压试验") {
                                                            AAFBPCT = 1.25 * AAFBPD * AAFBOC / Math.max(AAFBOCT, AAFBOCT1);
                                                            AAFBPST = 1.25 * AAFBPD * AAFBOS / Math.max(AAFBOST, AAFBOST1);
                                                            AAFBPT = Math.min(AAFBPCT, AAFBPST);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + AAFBPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (AAFBTest === "气压试验") {
                                                            AAFBPCT = 1.10 * AAFBPD * AAFBOC / Math.max(AAFBOCT, AAFBOCT1);
                                                            AAFBPST = 1.10 * AAFBPD * AAFBOS / Math.max(AAFBOST, AAFBOST1);
                                                            AAFBPT = Math.min(AAFBPCT, AAFBPST);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + AAFBPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // docx
                                                        let AAFBPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "aafbdocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "AAFB",

                                                                    pd: AAFBPD,
                                                                    t: AAFBDT,
                                                                    ps: AAFBPS,

                                                                    stdc: AAFBCSTDVal,
                                                                    namec: AAFBCNameVal,
                                                                    dbi: AAFBDBI,
                                                                    alpha: AAFBALPHA,
                                                                    thkcn: AAFBTHKCN,
                                                                    cc2: AAFBCC2,
                                                                    ec: AAFBEC,
                                                                    isAxial: AAFBISAXIAL,
                                                                    fl: AAFBFL,

                                                                    stds: AAFBSSTDVal,
                                                                    names: AAFBSNameVal,
                                                                    thksn: AAFBTHKSN,
                                                                    cs2: AAFBCS2,
                                                                    es: AAFBES,

                                                                    test: AAFBTest,

                                                                    dc: AAFBDC.toFixed(4),
                                                                    rcel: AAFBRCEL.toFixed(4),
                                                                    cc1: AAFBCC1.toFixed(4),
                                                                    oct: AAFBOCT.toFixed(4),
                                                                    oc: AAFBOC.toFixed(4),
                                                                    oct1: AAFBOCT1.toFixed(4),

                                                                    ds: AAFBDS.toFixed(4),
                                                                    rsel: AAFBRSEL.toFixed(4),
                                                                    cs1: AAFBCS1.toFixed(4),
                                                                    ost: AAFBOST.toFixed(4),
                                                                    os: AAFBOS.toFixed(4),
                                                                    ost1: AAFBOST1.toFixed(4),

                                                                    pc: AAFBPC.toFixed(4),

                                                                    cs: AAFBCS.toFixed(4),
                                                                    thkse: AAFBTHKSE.toFixed(4),
                                                                    dsi: AAFBDSI.toFixed(4),
                                                                    dso: AAFBDSO.toFixed(4),
                                                                    dsm: AAFBDSM.toFixed(4),
                                                                    rsm: AAFBRSM.toFixed(4),

                                                                    cc: AAFBCC.toFixed(4),
                                                                    thkce: AAFBTHKCE.toFixed(4),
                                                                    dbc: AAFBDBC.toFixed(4),
                                                                    dbo: AAFBDBO.toFixed(4),
                                                                    dbm: AAFBDBM.toFixed(4),
                                                                    f1: AAFBF1.toFixed(4),
                                                                    ql: AAFBQL.toFixed(4),

                                                                    thksc: AAFBTHKSC.toFixed(4),
                                                                    thksd: AAFBTHKSD.toFixed(4),
                                                                    thkschk: AAFBTHKSCHK,

                                                                    thkcc: AAFBTHKCC.toFixed(4),
                                                                    thkcd: AAFBTHKCD.toFixed(4),
                                                                    thkcchk: AAFBTHKCCHK,

                                                                    pcoctec: AAFBPCOCTEC.toFixed(4),
                                                                    pcoctecallow: AAFBPCOCTECALLOW.toFixed(4),
                                                                    pcoctecchk: AAFBPCOCTECCHK,

                                                                    thkscrsm: AAFBTHKSCRSM.toFixed(4),
                                                                    q1: AAFBQ1.toFixed(4),
                                                                    thkrc: AAFBTHKRC.toFixed(4),
                                                                    thkrd: AAFBTHKRD.toFixed(4),
                                                                    lrc: AAFBLRC.toFixed(4),
                                                                    lrs: AAFBLRS.toFixed(4),

                                                                    pcostes: AAFBPCOSTES.toFixed(4),
                                                                    delta: AAFBDELTA.toFixed(4),
                                                                    isAxialReinforce: AAFBisAxialReinforce,

                                                                    k: AAFBK.toFixed(4),
                                                                    arl: AAFBARL.toFixed(4),
                                                                    ael: AAFBAEL.toFixed(4),
                                                                    achk: AAFBACHK,
                                                                    isRing: AAFBisRing,
                                                                    a: AAFBA.toFixed(4),
                                                                    wr: AAFBWR.toFixed(4),
                                                                    lr: AAFBLR.toFixed(4),

                                                                    pct: AAFBPCT.toFixed(4),
                                                                    pst: AAFBPST.toFixed(4),
                                                                    pt: AAFBPT.toFixed(4)
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
                                                                        AAFBPayJS.dialog({
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
                                                                                    AAFBPayJS.dialog("close");
                                                                                    AAFBPayJS.dialog("clear");
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
                                                                                                AAFBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        AAFBPayJS.dialog('close');
                                                                                                        AAFBPayJS.dialog('clear');
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
                                                            "<span style='color:red;'>&ensp;封头材料力学特性获取失败，请检查网络后重试</span>");
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
                                            "<span style='color:red;'>&ensp;封头材料力学特性获取失败，请检查网络后重试</span>");
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
                pg.propertygrid('options').finder.getTr(this, 21).hide();
            }
        });
    });
});