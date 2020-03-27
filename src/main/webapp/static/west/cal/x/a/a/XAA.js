$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xaaSketch = $("#d2");
    let xaaModel = $("#d3");
    let xaad2d3 = $('#d2d3');

    $("#cal").html("<table id='xaa'></table>");
    let pg = $("#xaa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/a/a/XAA.json", function (result) {

        let XAADT,
            XAACategory, XAACategoryVal, XAAType, XAATypeVal, XAASTD, XAASTDVal, XAAName, XAANameVal,
            columns, rows, ed;

        function xaa2d(sh = "h", thkn = "δn", l = "L", delta = "Δ", bh = "H") {

            xaaSketch.empty();
            let width = xaaSketch.width();
            let height = xaaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XAASVG").attr("height", height);
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

            // 顶部水平标注
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
                ]))
                    .attr("id", id).classed("sketch", true);
                svg.append("g").append("text").attr("x", 0)
                    .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id)
                    .attr("startOffset", "50%").text(text);

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

            let wg = (width - 2 * padding) / 16;
            let hg = (height - 2 * padding) / 20;

            // 填料块
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 4 * hg},
                {x: width - padding - 3 * wg, y: padding},
                {x: width - padding, y: padding + 3 * hg},
                {x: padding + 3 * wg, y: padding + 7 * hg},
                {x: padding, y: padding + 4 * hg}
            ])).attr("stroke-dasharray", "25,5,5,5,5,5").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 4 * hg + 9 * hg},
                {x: width - padding - 3 * wg, y: padding + 9 * hg},
                {x: width - padding, y: padding + 3 * hg + 9 * hg},
                {x: padding + 3 * wg, y: padding + 7 * hg + 9 * hg},
                {x: padding, y: padding + 4 * hg + 9 * hg}
            ])).attr("stroke-dasharray", "25,5,5,5,5,5").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding, y: padding + 4 * hg},
                {x: padding, y: padding + 13 * hg}
            ])).attr("stroke-dasharray", "25,5,5,5,5,5").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 3 * wg, y: padding + 7 * hg},
                {x: padding + 3 * wg, y: padding + 7 * hg + 9 * hg}
            ])).attr("stroke-dasharray", "25,5,5,5,5,5").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - padding - 3 * wg, y: padding},
                {x: width - padding - 3 * wg, y: padding + 9 * hg}
            ])).attr("stroke-dasharray", "25,5,5,5,5,5").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - padding, y: padding + 3 * hg},
                {x: width - padding, y: padding + 3 * hg + 9 * hg}
            ])).attr("stroke-dasharray", "25,5,5,5,5,5").classed("sketch", true);

            // 格栅板
            svg.append("path").attr("d", line([
                {x: padding + wg, y: height - padding - 6 * hg},
                {x: width - padding - 2 * wg, y: height - padding - 10 * hg},
                {x: width - padding - wg, y: height - padding - 9 * hg},
                {x: padding + 2 * wg, y: height - padding - 5 * hg},
                {x: padding + wg, y: height - padding - 6 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: height - padding - hg},
                {x: padding + 2 * wg, y: height - padding},
                {x: width - padding - wg, y: height - padding - 4 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + wg, y: height - padding - 6 * hg},
                {x: padding + wg, y: height - padding - hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg, y: height - padding - 5 * hg},
                {x: padding + 2 * wg, y: height - padding}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: width - padding - wg, y: height - padding - 9 * hg},
                {x: width - padding - wg, y: height - padding - 4 * hg}
            ])).classed("sketch", true);

            // 文字
            svg.append("path").attr("d", line([
                {x: padding + 7 * wg, y: padding + 9 * hg},
                {x: padding + 9 * wg, y: padding + 9 * hg}
            ])).attr("id", "XAASketchTL");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XAASketchTL")
                .attr("startOffset", "50%").text("填料");
            svg.append("path").attr("d", line([
                {x: padding + 7 * wg, y: padding + 17 * hg},
                {x: padding + 9 * wg, y: padding + 17 * hg}
            ])).attr("id", "XAASketchGS");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XAASketchGS")
                .attr("startOffset", "50%").text("格栅板");

            let ratio = hg / wg;

            //sh = "h" bh = "H"
            drawLine(padding - 3, padding + 4 * hg - 3 * ratio, padding - 40, padding + 4 * hg - 40 * ratio);
            drawLine(padding - 3, padding + 13 * hg - 3 * ratio, padding - 40, padding + 13 * hg - 40 * ratio);
            drawLine(padding + wg - 3, height - padding - hg - 3 * ratio, padding - 40, height - padding - hg - (40 + wg) * ratio);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 25, y: height - padding - 2 * hg - 25 * ratio},
                    {x: padding - 25 + 3, y: height - padding - 2 * hg - 25 * ratio - 15},
                    {x: padding - 25 - 3, y: height - padding - 2 * hg - 25 * ratio - 15},
                    {x: padding - 25, y: height - padding - 2 * hg - 25 * ratio}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 25, y: height - padding - 7 * hg - 25 * ratio},
                    {x: padding - 25 + 3, y: height - padding - 7 * hg - 25 * ratio + 15},
                    {x: padding - 25 - 3, y: height - padding - 7 * hg - 25 * ratio + 15},
                    {x: padding - 25, y: height - padding - 7 * hg - 25 * ratio}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 25, y: height - padding - 7 * hg - 25 * ratio},
                    {x: padding - 25 + 3, y: height - padding - 7 * hg - 25 * ratio - 15},
                    {x: padding - 25 - 3, y: height - padding - 7 * hg - 25 * ratio - 15},
                    {x: padding - 25, y: height - padding - 7 * hg - 25 * ratio}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 25, y: height - padding - 16 * hg - 25 * ratio},
                    {x: padding - 25 + 3, y: height - padding - 16 * hg - 25 * ratio + 15},
                    {x: padding - 25 - 3, y: height - padding - 16 * hg - 25 * ratio + 15},
                    {x: padding - 25, y: height - padding - 16 * hg - 25 * ratio}
                ]));

            svg.append("path").attr("d", line([
                {x: padding - 25, y: height - padding - 2 * hg - 25 * ratio},
                {x: padding - 25, y: height - padding - 7 * hg - 25 * ratio}
            ])).classed("sketch", true).attr("id", "XAASketchSH");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XAASketchSH")
                .attr("startOffset", "50%").text(sh);

            svg.append("path").attr("d", line([
                {x: padding - 25, y: height - padding - 7 * hg - 25 * ratio},
                {x: padding - 25, y: height - padding - 16 * hg - 25 * ratio}
            ])).classed("sketch", true).attr("id", "XAASketchBH");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XAASketchBH")
                .attr("startOffset", "50%").text(bh);

            //thkn = "δn"
            let f = 4 * hg / (13 * wg);
            drawLine(width - padding - 2 * wg + 3, height - padding - 10 * hg - 3 * f, width - padding - 2 * wg + 40, height - padding - 10 * hg - 40 * f);
            drawLine(width - padding - wg + 3, height - padding - 9 * hg - 3 * f, width - padding - wg + 40, height - padding - 9 * hg - 40 * f);
            svg.append("path").attr("d", line([
                {x: width - padding - 2 * wg + 30, y: height - padding - 10 * hg - 30 * f},
                {x: width - padding - wg + 30, y: height - padding - 9 * hg - 30 * f}
            ])).classed("sketch", true).attr("id", "XAASketchTHKN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XAASketchTHKN")
                .attr("startOffset", "50%").text(thkn);

            //l = "L"
            drawLine(padding + 2 * wg + 3, height - padding + 3 * ratio, padding + 2 * wg + 60, height - padding + 60 * ratio);
            drawLine(width - padding - wg + 3, height - padding - 4 * hg + 3 * ratio, width - padding - wg + 60, height - padding - 4 * hg + 60 * ratio);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * wg + 50, y: height - padding + 50 * ratio},
                    {x: padding + 2 * wg + 50 + 15, y: height - padding + 50 * ratio + 3 - 15 * f},
                    {x: padding + 2 * wg + 50 + 15, y: height - padding + 50 * ratio - 3 - 15 * f},
                    {x: padding + 2 * wg + 50, y: height - padding + 50 * ratio}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - wg + 50, y: height - padding - 4 * hg + 50 * ratio},
                    {x: width - padding - wg + 50 - 15, y: height - padding - 4 * hg + 50 * ratio + 3 + 15 * f},
                    {x: width - padding - wg + 50 - 15, y: height - padding - 4 * hg + 50 * ratio - 3 + 15 * f},
                    {x: width - padding - wg + 50, y: height - padding - 4 * hg + 50 * ratio}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * wg + 50, y: height - padding + 50 * ratio},
                {x: width - padding - wg + 50, y: height - padding - 4 * hg + 50 * ratio}
            ])).classed("sketch", true).attr("id", "XAASketchL");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XAASketchL")
                .attr("startOffset", "50%").text(l);

            //delta = "Δ"
            drawLine(padding, padding + 4 * hg - 3, padding, padding - 40);
            drawLine(padding + 3 * wg, padding + 7 * hg - 3, padding + 3 * wg, padding + 3 * hg - 40);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding, y: padding - 25},
                    {x: padding + 15, y: padding - 25 + 3 + 15 * ratio},
                    {x: padding + 15, y: padding - 25 - 3 + 15 * ratio},
                    {x: padding, y: padding - 25}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: padding + 3 * hg - 25},
                    {x: padding + 3 * wg - 15, y: padding + 3 * hg - 25 + 3 - 15 * ratio},
                    {x: padding + 3 * wg - 15, y: padding + 3 * hg - 25 - 3 - 15 * ratio},
                    {x: padding + 3 * wg, y: padding + 3 * hg - 25}
                ]));
            svg.append("path").attr("d", line([
                {x: padding, y: padding - 25},
                {x: padding + 3 * wg, y: padding + 3 * hg - 25}
            ])).classed("sketch", true).attr("id", "XAASketchDELTA");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XAASketchDELTA")
                .attr("startOffset", "50%").text(delta);
        }

        currentTabIndex = xaad2d3.tabs('getTabIndex', xaad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xaa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xaa").length > 0) {
                    xaa2d();
                }
            });
        }
        xaad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xaa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xaa").length > 0) {
                            xaa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "SH/T 3098-2011 填料格栅板强度计算",
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

                if (index === 2) {
                    $(ed.target).combobox("loadData", XAACategory);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", XAAType);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", XAASTD);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", XAAName);
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

                    // docx button
                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch & model
                    xaaSketch.empty();
                    xaaModel.empty();

                    // sketch
                    currentTabIndex = xaad2d3.tabs('getTabIndex', xaad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xaa2d();
                        xaaSketch.off("resize").on("resize", function () {
                            if ($("#xaa").length > 0) {
                                xaa2d();
                            }
                        });
                    }
                    xaad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xaa2d();
                                xaaSketch.off("resize").on("resize", function () {
                                    if ($("#xaa").length > 0) {
                                        xaa2d();
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

                        XAADT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        XAACategory = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XAAType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XAASTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XAAName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: XAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XAACategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + XAADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        XAACategory[index] = {
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
                    else if (index === 2) {

                        XAACategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XAAType = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XAASTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XAAName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XAACategoryVal,
                                temp: XAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XAAType = [];
                                $(result).each(function (index, element) {
                                    XAAType[index] = {
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
                    else if (index === 3) {

                        XAATypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XAASTD = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XAAName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XAACategoryVal,
                                type: XAATypeVal,
                                temp: XAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XAASTD = [];
                                $(result).each(function (index, element) {
                                    XAASTD[index] = {
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
                    else if (index === 4) {

                        XAASTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        XAAName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XAACategoryVal,
                                type: XAATypeVal,
                                std: XAASTDVal,
                                temp: XAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XAAName = [];
                                $(result).each(function (index, element) {
                                    XAAName[index] = {
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

                    // name 及业务逻辑
                    else {

                        // 持液密度
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let XAAVL = parseFloat(rows[1][columns[0][1].field]);

                            // 材料名称
                            if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                                XAANameVal = rows[5][columns[0][1].field];

                                // AJAX 获取材料密度、最大最小厚度
                                let XAADensity, XAAThkMin, XAAThkMax;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_gbt_150_2011_index.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": XAACategoryVal,
                                        "type": XAATypeVal,
                                        "std": XAASTDVal,
                                        "name": XAANameVal,
                                        "temp": XAADT
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        XAADensity = parseFloat(result.density);
                                        XAAThkMin = parseFloat(result.thkMin);
                                        XAAThkMax = parseFloat(result.thkMax);

                                        // 腐蚀裕量
                                        if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                            && parseFloat(rows[6][columns[0][1].field]) < XAAThkMax) {
                                            let XAAC2 = parseFloat(rows[6][columns[0][1].field]);

                                            // sh
                                            if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                                let XAASH = parseFloat(rows[7][columns[0][1].field]);

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    xaa2d(XAASH);
                                                    xaaSketch.off("resize").on("resize", function () {
                                                        if ($("#xaa").length > 0) {
                                                            xaa2d(XAASH);
                                                        }
                                                    });
                                                }
                                                xaad2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            xaa2d(XAASH);
                                                            xaaSketch.off("resize").on("resize", function () {
                                                                if ($("#xaa").length > 0) {
                                                                    xaa2d(XAASH);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // 筒体名义厚度
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                    && parseFloat(rows[8][columns[0][1].field]) > Math.max(XAAC2, XAAThkMin)
                                                    && parseFloat(rows[8][columns[0][1].field]) <= XAAThkMax) {
                                                    let XAATHKN = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xaa2d(XAASH, XAATHKN);
                                                        xaaSketch.off("resize").on("resize", function () {
                                                            if ($("#xaa").length > 0) {
                                                                xaa2d(XAASH, XAATHKN);
                                                            }
                                                        });
                                                    }
                                                    xaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xaa2d(XAASH, XAATHKN);
                                                                xaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#xaa").length > 0) {
                                                                        xaa2d(XAASH, XAATHKN);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // ajax 获取 OT、Rel、C1
                                                    let XAAOT, XAARel, XAAC1;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_gbt_150_2011_com_property.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": XAACategoryVal,
                                                            "type": XAATypeVal,
                                                            "std": XAASTDVal,
                                                            "name": XAANameVal,
                                                            "thk": XAATHKN,
                                                            "temp": XAADT,
                                                            "highLow": 3,
                                                            "isTube": 0,
                                                            "od": 1000000
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            XAAOT = parseFloat(result.ot);
                                                            if (XAAOT < 0) {
                                                                south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            XAARel = parseFloat(result.rel);
                                                            if (XAARel < 0) {
                                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                return false;
                                                            }
                                                            XAAC1 = parseFloat(result.c1);
                                                            if (XAAC1 < 0) {
                                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                return false;
                                                            }

                                                            // L
                                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                                let XAAL = parseFloat(rows[9][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    xaa2d(XAASH, XAATHKN, XAAL);
                                                                    xaaSketch.off("resize").on("resize", function () {
                                                                        if ($("#xaa").length > 0) {
                                                                            xaa2d(XAASH, XAATHKN, XAAL);
                                                                        }
                                                                    });
                                                                }
                                                                xaad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            xaa2d(XAASH, XAATHKN, XAAL);
                                                                            xaaSketch.off("resize").on("resize", function () {
                                                                                if ($("#xaa").length > 0) {
                                                                                    xaa2d(XAASH, XAATHKN, XAAL);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // DELTA
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) > XAATHKN) {
                                                                    let XAADELTA = parseFloat(rows[10][columns[0][1].field]);

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xaa2d(XAASH, XAATHKN, XAAL, XAADELTA);
                                                                        xaaSketch.off("resize").on("resize", function () {
                                                                            if ($("#xaa").length > 0) {
                                                                                xaa2d(XAASH, XAATHKN, XAAL, XAADELTA);
                                                                            }
                                                                        });
                                                                    }
                                                                    xaad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xaa2d(XAASH, XAATHKN, XAAL, XAADELTA);
                                                                                xaaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#xaa").length > 0) {
                                                                                        xaa2d(XAASH, XAATHKN, XAAL, XAADELTA);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // 填料类型
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let XAAPACK = rows[11][columns[0][1].field];

                                                                        // V
                                                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                                            let XAAV = parseFloat(rows[12][columns[0][1].field]);

                                                                            // BH
                                                                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                                                let XAABH = parseFloat(rows[13][columns[0][1].field]);

                                                                                // Sketch
                                                                                if (currentTabIndex === 0) {
                                                                                    xaa2d(XAASH, XAATHKN, XAAL, XAADELTA, XAABH);
                                                                                    xaaSketch.off("resize").on("resize", function () {
                                                                                        if ($("#xaa").length > 0) {
                                                                                            xaa2d(XAASH, XAATHKN, XAAL, XAADELTA, XAABH);
                                                                                        }
                                                                                    });
                                                                                }
                                                                                xaad2d3.tabs({
                                                                                    onSelect: function (title, index) {
                                                                                        if (index === 0) {
                                                                                            xaa2d(XAASH, XAATHKN, XAAL, XAADELTA, XAABH);
                                                                                            xaaSketch.off("resize").on("resize", function () {
                                                                                                if ($("#xaa").length > 0) {
                                                                                                    xaa2d(XAASH, XAATHKN, XAAL, XAADELTA, XAABH);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                });

                                                                                // 过程参数
                                                                                let XAAC = XAAC1 + XAAC2;
                                                                                let XAATHKE = XAATHKN - XAAC;
                                                                                let XAAG = 9.8;
                                                                                let XAAMP = XAABH * XAADELTA * XAAL * XAAV / 1000000000;
                                                                                let XAAK;
                                                                                if (XAAPACK === "散装填料") {
                                                                                    XAAK = 0.35;
                                                                                } else if (XAAPACK === "波网填料") {
                                                                                    XAAK = 0.05
                                                                                }
                                                                                let XAAML = XAAK * XAABH * XAADELTA * XAAL * XAAVL / 1000000000;

                                                                                // 强度校核
                                                                                let XAAQ = (XAAMP + XAAML) * XAAG / XAAL;
                                                                                let XAAO = XAAQ * XAAL * XAAL / (XAATHKE * (XAASH - XAAC2) * (XAASH - XAAC2));

                                                                                south.html(
                                                                                    "<span style='color:#444444;'>" +
                                                                                    "格栅板许用应力：" + XAAOT.toFixed(2) + " MPa" +
                                                                                    "</span>");

                                                                                let XAAOCHK;
                                                                                if (XAAO <= XAAOT) {
                                                                                    south.append(
                                                                                        "<span style='color:#444444;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "格栅板实际应力：" + XAAO.toFixed(2) + " MPa" +
                                                                                        "</span>");
                                                                                    XAAOCHK = "合格";
                                                                                }
                                                                                else {
                                                                                    south.append(
                                                                                        "<span style='color:red;'>" +
                                                                                        "&ensp;|&ensp;" +
                                                                                        "格栅板实际应力：" + XAAO.toFixed(2) + " MPa" +
                                                                                        "</span>");
                                                                                    XAAOCHK = "不合格";
                                                                                }

                                                                                // docx
                                                                                let XAAPayJS = $('#payjs');

                                                                                function getDocx() {
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "xaadocx.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            ribbonName: "XAA",

                                                                                            t: XAADT,
                                                                                            vl: XAAVL,
                                                                                            std: XAASTDVal,
                                                                                            name: XAANameVal,
                                                                                            c2: XAAC2,
                                                                                            sh: XAASH,
                                                                                            thkn: XAATHKN,
                                                                                            l: XAAL,
                                                                                            delta: XAADELTA,
                                                                                            pack: XAAPACK,
                                                                                            v: XAAV,
                                                                                            bh: XAABH,
                                                                                            density: XAADensity.toFixed(4),
                                                                                            rel: XAARel.toFixed(4),
                                                                                            ot: XAAOT.toFixed(4),
                                                                                            c1: XAAC1.toFixed(4),
                                                                                            c: XAAC.toFixed(4),
                                                                                            thke: XAATHKE.toFixed(4),
                                                                                            g: XAAG.toFixed(4),
                                                                                            mp: XAAMP.toFixed(4),
                                                                                            k: XAAK.toFixed(4),
                                                                                            ml: XAAML.toFixed(4),
                                                                                            q: XAAQ.toFixed(4),
                                                                                            o: XAAO.toFixed(4),
                                                                                            ochk: XAAOCHK
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
                                                                                                XAAPayJS.dialog({
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
                                                                                                            XAAPayJS.dialog("close");
                                                                                                            XAAPayJS.dialog("clear");
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
                                                                                                                        XAAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                XAAPayJS.dialog('close');
                                                                                                                                XAAPayJS.dialog('clear');
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
                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) <= XAATHKN) {
                                                                    south.html("格栅板间距 Δ 不能小于等于 " + XAATHKN + " mm").css("color", "red");
                                                                }
                                                            }
                                                        },
                                                        error: function () {
                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                        }
                                                    });
                                                }
                                                else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                    && parseFloat(rows[8][columns[0][1].field]) <= Math.max(XAAC2, XAAThkMin)) {
                                                    south.html("格栅板名义厚度 δn 不能小于等于 " + Math.max(XAAC2, XAAThkMin) + " mm").css("color", "red");
                                                }
                                                else if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])
                                                    && parseFloat(rows[8][columns[0][1].field]) > XAAThkMax) {
                                                    south.html("格栅板名义厚度 δn 不能大于 " + XAAThkMax + " mm").css("color", "red");
                                                }
                                            }
                                        }
                                        else if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])
                                            && parseFloat(rows[6][columns[0][1].field]) >= XAAThkMax) {
                                            south.html("格栅板腐蚀裕量不能大于等于 " + XAAThkMax + " mm").css("color", "red");
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});