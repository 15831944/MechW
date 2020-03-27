$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xbaad2 = $("#d2");
    let xbaad3 = $("#d3");
    let xbaad2d3 = $('#d2d3');

    $("#cal").html("<table id='xbaa'></table>");
    let pg = $("#xbaa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/b/a/a/XBAA.json", function (result) {

        let DT;
        let Category, CategoryVal, Type, TypeVal, STD, STDVal, Name, NameVal;
        let columns, rows, ed;

        // 2D Sketch
        function xbaa2d(alpha = "α", thkcn = "δcn", h = "h", b = "b", b2 = "b2",
                        thkbn = "δbn", a = "a", d = "d",
                        thkan = "δan", c = "c") {

            xbaad2.empty();

            let width = xbaad2.width();
            let height = xbaad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "XBAASVG")
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
            let padding = 90;
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

            let widthGap = (width - 2 * padding) / 8;
            let heightGap = (height - 2 * padding) / 4;

            // 左侧
            drawLine(padding + 3 * widthGap, padding, padding + 3 * widthGap, height - padding);
            drawLine(padding + 3 * widthGap + thickness, padding, padding + 3 * widthGap + thickness, height - padding);
            drawLine(padding + 3 * widthGap, padding, padding + 3 * widthGap + thickness, padding);
            drawLine(padding + 3 * widthGap, height - padding, padding + 3 * widthGap + thickness, height - padding);
            drawLine(padding + 2 * widthGap, padding + heightGap, padding + 3 * widthGap, padding + heightGap);
            drawLine(padding + 2 * widthGap, padding + heightGap - thickness, padding + 3 * widthGap, padding + heightGap - thickness);
            drawLine(padding + 2 * widthGap, padding + heightGap - thickness, padding + 2 * widthGap, padding + heightGap);
            drawLine(padding + widthGap, height - padding - heightGap, padding + 3 * widthGap, height - padding - heightGap);
            drawLine(padding + widthGap, height - padding - heightGap + thickness, padding + 3 * widthGap, height - padding - heightGap + thickness);
            drawLine(padding + widthGap, height - padding - heightGap, padding + widthGap, height - padding - heightGap + thickness);
            drawLine(padding + 2 * widthGap, padding + heightGap, padding + widthGap, height - padding - heightGap);
            drawCenterLine(padding + 1.5 * widthGap, height - padding - heightGap - 20, padding + 1.5 * widthGap, height - padding - heightGap + thickness + 20);

            // 右侧
            drawLine(padding + 5 * widthGap, padding + heightGap, padding + 7 * widthGap, padding + heightGap);
            drawLine(padding + 5 * widthGap, padding + heightGap - thickness, padding + 7 * widthGap, padding + heightGap - thickness);
            drawLine(padding + 5 * widthGap, padding + heightGap, padding + 5 * widthGap, padding + heightGap - thickness);
            drawLine(padding + 7 * widthGap, padding + heightGap, padding + 7 * widthGap, padding + heightGap - thickness);
            drawLine(padding + 4.5 * widthGap, height - padding - heightGap, padding + 7.5 * widthGap, height - padding - heightGap);
            drawLine(padding + 4.5 * widthGap, height - padding - heightGap + thickness, padding + 7.5 * widthGap, height - padding - heightGap + thickness);
            drawLine(padding + 4.5 * widthGap, height - padding - heightGap, padding + 4.5 * widthGap, height - padding - heightGap + thickness);
            drawLine(padding + 7.5 * widthGap, height - padding - heightGap, padding + 7.5 * widthGap, height - padding - heightGap + thickness);
            drawLine(padding + 5.5 * widthGap, padding + heightGap, padding + 5.5 * widthGap, height - padding - heightGap);
            drawLine(padding + 5.5 * widthGap + thickness, padding + heightGap, padding + 5.5 * widthGap + thickness, height - padding - heightGap);
            drawLine(padding + 6.5 * widthGap, padding + heightGap, padding + 6.5 * widthGap, height - padding - heightGap);
            drawLine(padding + 6.5 * widthGap - thickness, padding + heightGap, padding + 6.5 * widthGap - thickness, height - padding - heightGap);
            drawCenterLine(padding + 6 * widthGap, height - padding - heightGap - 10, padding + 6 * widthGap, height - padding - heightGap + thickness + 10);

            // α
            let cx = padding + widthGap;
            let cy = height - padding - heightGap;
            let r = widthGap;
            let ang = Math.atan(2 * heightGap / widthGap) / Math.PI * 180;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + r, y: cy},
                    {x: cx + r - 3, y: cy - 15},
                    {x: cx + r + 3, y: cy - 15},
                    {x: cx + r, y: cy}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + r, y: cy},
                    {x: cx + r - 3, y: cy + 15},
                    {x: cx + r + 3, y: cy + 15},
                    {x: cx + r, y: cy}
                ])).attr("transform", "rotate(" + -ang + ", " + cx + " " + cy + ")");
            svg.append("path").attr("d", "M "
                + (cx + r * Math.cos(ang / 180 * Math.PI)) + " " + (cy - r * Math.sin(ang / 180 * Math.PI)) + " "
                + "A" + r + " " + r + " "
                + "1 0 1" + " "
                + (cx + r) + " " + cy
            ).classed("sketch", true).attr("id", "XBAASketchAlpha");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#XBAASketchAlpha").attr("startOffset", "50%").text(alpha);

            // thkcn1
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 5.5 * widthGap, y: height / 2},
                    {x: padding + 5.5 * widthGap - 15, y: height / 2 - 3},
                    {x: padding + 5.5 * widthGap - 15, y: height / 2 + 3},
                    {x: padding + 5.5 * widthGap, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 5.5 * widthGap + thickness, y: height / 2},
                    {x: padding + 5.5 * widthGap + thickness + 15, y: height / 2 - 3},
                    {x: padding + 5.5 * widthGap + thickness + 15, y: height / 2 + 3},
                    {x: padding + 5.5 * widthGap + thickness, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 5.5 * widthGap, y: height / 2},
                {x: padding + 5.5 * widthGap + thickness + 15 + 10, y: height / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 5.5 * widthGap - 15 - 40, y: height / 2},
                {x: padding + 5.5 * widthGap - 15, y: height / 2}
            ])).attr("id", "XBAATHKCN1").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBAATHKCN1")
                .attr("startOffset", "50%").text(thkcn);

            // thkcn2
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 6.5 * widthGap - thickness, y: height / 2},
                    {x: padding + 6.5 * widthGap - thickness - 15, y: height / 2 - 3},
                    {x: padding + 6.5 * widthGap - thickness - 15, y: height / 2 + 3},
                    {x: padding + 6.5 * widthGap - thickness, y: height / 2}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 6.5 * widthGap, y: height / 2},
                    {x: padding + 6.5 * widthGap + 15, y: height / 2 - 3},
                    {x: padding + 6.5 * widthGap + 15, y: height / 2 + 3},
                    {x: padding + 6.5 * widthGap, y: height / 2}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 6.5 * widthGap, y: height / 2},
                {x: padding + 6.5 * widthGap - thickness - 15 - 10, y: height / 2}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 6.5 * widthGap + 15, y: height / 2},
                {x: padding + 6.5 * widthGap + 15 + 40, y: height / 2}
            ])).attr("id", "XBAATHKCN2").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBAATHKCN2")
                .attr("startOffset", "50%").text(thkcn);

            // h
            dimRightV(padding + 3 * widthGap, height - padding - heightGap,
                padding + 3 * widthGap, padding + heightGap,
                h, "XBAASH");

            // b
            dimBottomH(padding + widthGap, height - padding,
                padding + 3 * widthGap, height - padding,
                b, "XBAAB");
            drawLine(padding + widthGap, height - padding - heightGap + thickness + 3,
                padding + widthGap, height - padding + 3);

            // b2
            dimTopH(padding + 5.5 * widthGap + thickness, padding + heightGap,
                padding + 6.5 * widthGap - thickness, padding + heightGap,
                b2, "XBAAB2");

            // thkbn
            drawLine(padding + widthGap - 40, height - padding - heightGap,
                padding + widthGap - 3, height - padding - heightGap);
            drawLine(padding + widthGap - 40, height - padding - heightGap + thickness,
                padding + widthGap - 3, height - padding - heightGap + thickness);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + widthGap - 30, y: height - padding - heightGap},
                    {x: padding + widthGap - 30 + 3, y: height - padding - heightGap - 15},
                    {x: padding + widthGap - 30 - 3, y: height - padding - heightGap - 15},
                    {x: padding + widthGap - 30, y: height - padding - heightGap}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + widthGap - 30, y: height - padding - heightGap + thickness},
                    {x: padding + widthGap - 30 + 3, y: height - padding - heightGap + thickness + 15},
                    {x: padding + widthGap - 30 - 3, y: height - padding - heightGap + thickness + 15},
                    {x: padding + widthGap - 30, y: height - padding - heightGap + thickness}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + widthGap - 30, y: height - padding - heightGap + thickness},
                {x: padding + widthGap - 30, y: height - padding - heightGap - 15 - 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + widthGap - 30, y: height - padding - heightGap + thickness + 15 + 40},
                {x: padding + widthGap - 30, y: height - padding - heightGap + thickness + 15}
            ])).attr("id", "XBAATHKBN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBAATHKBN")
                .attr("startOffset", "50%").text(thkbn);

            // a
            dimBottomH(padding + 4.5 * widthGap, height - padding - heightGap + thickness,
                padding + 7.5 * widthGap, height - padding - heightGap + thickness, a, "XBAAA");

            // d
            dimBottomH(padding + widthGap, height - padding - heightGap + thickness + 20,
                padding + 1.5 * widthGap, height - padding - heightGap + thickness + 20,
                d, "XBAASD");

            // thkan
            drawLine(padding + 2 * widthGap - 40, padding + heightGap,
                padding + 2 * widthGap - 3, padding + heightGap);
            drawLine(padding + 2 * widthGap - 40, padding + heightGap - thickness,
                padding + 2 * widthGap - 3, padding + heightGap - thickness);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthGap - 30, y: padding + heightGap - thickness},
                    {x: padding + 2 * widthGap - 30 + 3, y: padding + heightGap - thickness - 15},
                    {x: padding + 2 * widthGap - 30 - 3, y: padding + heightGap - thickness - 15},
                    {x: padding + 2 * widthGap - 30, y: padding + heightGap - thickness}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 2 * widthGap - 30, y: padding + heightGap},
                    {x: padding + 2 * widthGap - 30 + 3, y: padding + heightGap + 15},
                    {x: padding + 2 * widthGap - 30 - 3, y: padding + heightGap + 15},
                    {x: padding + 2 * widthGap - 30, y: padding + heightGap}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthGap - 30, y: padding + heightGap - thickness},
                {x: padding + 2 * widthGap - 30, y: padding + heightGap + 15 + 10}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 2 * widthGap - 30, y: padding + heightGap - thickness - 15},
                {x: padding + 2 * widthGap - 30, y: padding + heightGap - thickness - 15 - 40}
            ])).attr("id", "XBAATHKAN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XBAATHKAN")
                .attr("startOffset", "50%").text(thkan);

            // c
            dimTopH(padding + 2 * widthGap, padding + heightGap - thickness, padding + 3 * widthGap, padding + heightGap - thickness, c, "XBAAC");

        }

        currentTabIndex = xbaad2d3.tabs('getTabIndex', xbaad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xbaa2d();
            xbaad2.off("resize").on("resize", function () {
                if (pg.length > 0) {
                    xbaa2d();
                }
            });
        }
        xbaad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xbaa2d();
                    xbaad2.off("resize").on("resize", function () {
                        if (pg.length > 0) {
                            xbaa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 耳式支座强度校核",
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

                if (index === 11) {
                    $(ed.target).combobox("loadData", Category);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", Type);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", STD);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", Name);
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

                    // sketch & model
                    xbaad2.empty();
                    xbaad3.empty();

                    // sketch
                    currentTabIndex = xbaad2d3.tabs('getTabIndex', xbaad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xbaa2d();
                        xbaad2.off("resize").on("resize", function () {
                            if (pg.length > 0) {
                                xbaa2d();
                            }
                        });
                    }
                    xbaad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xbaa2d();
                                xbaad2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbaa2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    // t → category
                    if (index === 0) {

                        DT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[11][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 11);
                        Category = null;
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        Type = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        STD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        Name = null;

                        // category list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: DT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                Category = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + DT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        Category[index] = {
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

                    // category → type
                    if (index === 11) {

                        CategoryVal = changes.value;

                        // clear type、std、name
                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        Type = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        STD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        Name = null;

                        // type list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CategoryVal,
                                temp: DT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                Type = [];
                                $(result).each(function (index, element) {
                                    Type[index] = {
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
                    // type → std
                    if (index === 12) {

                        TypeVal = changes.value;

                        // clear std、name
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        STD = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        Name = null;

                        // std list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CategoryVal,
                                type: TypeVal,
                                temp: DT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                STD = [];
                                $(result).each(function (index, element) {
                                    STD[index] = {
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
                    // std → Name
                    if (index === 13) {

                        STDVal = changes.value;

                        // clear name
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        Name = null;

                        // name list
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CategoryVal,
                                type: TypeVal,
                                std: STDVal,
                                temp: DT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                Name = [];
                                $(result).each(function (index, element) {
                                    Name[index] = {
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

                    // M0
                    let M0;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        M0 = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // H0
                    let H0;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        H0 = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // DI
                    let DI;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        DI = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // thksn
                    let THKSN;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        THKSN = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // dout
                    let DOUT;
                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])) {
                        DOUT = parseFloat(rows[5][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // thk3
                    let THK3;
                    if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                        THK3 = parseFloat(rows[6][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // q0
                    let Q0;
                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                        Q0 = parseFloat(rows[7][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // fi
                    let FI;
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        FI = parseFloat(rows[8][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // U
                    let U;
                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                        if (rows[9][columns[0][1].field] === "0.1g") {
                            U = 0.08;
                        }
                        else if (rows[9][columns[0][1].field] === "0.15g") {
                            U = 0.12;
                        }
                        else if (rows[9][columns[0][1].field] === "0.2g") {
                            U = 0.16;
                        }
                        else if (rows[9][columns[0][1].field] === "0.3g") {
                            U = 0.24;
                        }
                        else if (rows[9][columns[0][1].field] === "0.4g") {
                            U = 0.32;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }

                    // N
                    let N;
                    if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                        N = parseFloat(rows[10][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // NameVal
                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                        NameVal = rows[14][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 支座材料密度、最大最小厚度
                    let Density, ThkMin, ThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": CategoryVal,
                            "type": TypeVal,
                            "std": STDVal,
                            "name": NameVal,
                            "temp": DT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            Density = parseFloat(result.density);
                            ThkMin = parseFloat(result.thkMin);
                            ThkMax = parseFloat(result.thkMax);

                            // 腐蚀裕量 C2
                            let C2;
                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) < ThkMax) {
                                C2 = parseFloat(rows[15][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                && parseFloat(rows[15][columns[0][1].field]) >= ThkMax) {
                                south.html("耳座腐蚀裕量不能大于等于 " + ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // 夹角 α
                            let Alpha;
                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                Alpha = parseFloat(rows[16][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            let Rad = Alpha / 180 * Math.PI;

                            // Sketch
                            if (currentTabIndex === 0) {
                                xbaa2d(Alpha + "°");
                                xbaad2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbaa2d(Alpha + "°");
                                    }
                                });
                            }
                            xbaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        xbaa2d(Alpha + "°");
                                        xbaad2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbaa2d(Alpha + "°");
                                            }
                                        });
                                    }
                                }
                            });

                            // 筋板名义厚度 thkcn
                            let THKCN;
                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                && parseFloat(rows[17][columns[0][1].field]) > Math.max(ThkMin, C2)
                                && parseFloat(rows[17][columns[0][1].field]) <= ThkMax) {
                                THKCN = parseFloat(rows[17][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                && parseFloat(rows[17][columns[0][1].field]) <= Math.max(ThkMin, C2)) {
                                south.html("筋板名义厚度 δcn 不能小于等于 " + Math.max(ThkMin, C2) + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                && parseFloat(rows[17][columns[0][1].field]) > ThkMax) {
                                south.html("筋板名义厚度 δcn 不能大于 " + ThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                xbaa2d(Alpha + "°", THKCN);
                                xbaad2.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        xbaa2d(Alpha + "°", THKCN);
                                    }
                                });
                            }
                            xbaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        xbaa2d(Alpha + "°", THKCN);
                                        xbaad2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbaa2d(Alpha + "°", THKCN);
                                            }
                                        });
                                    }
                                }
                            });

                            let OCT, CC1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": CategoryVal,
                                    "type": TypeVal,
                                    "std": STDVal,
                                    "name": NameVal,
                                    "thk": THKCN,
                                    "temp": DT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": 100000
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    OCT = parseFloat(result.ot);
                                    if (OCT < 0) {
                                        south.html("查询筋板材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    CC1 = parseFloat(result.c1);
                                    if (CC1 < 0) {
                                        south.html("查询筋板材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 筋板高度 sh
                                    let SH;
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        SH = parseFloat(rows[18][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xbaa2d(Alpha + "°", THKCN, SH);
                                        xbaad2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH);
                                            }
                                        });
                                    }
                                    xbaad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH);
                                                xbaad2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 筋板宽度 b
                                    let B;
                                    if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                        B = parseFloat(rows[19][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xbaa2d(Alpha + "°", THKCN, SH, B);
                                        xbaad2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B);
                                            }
                                        });
                                    }
                                    xbaad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B);
                                                xbaad2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 筋板间距 b2
                                    let B2;
                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                        B2 = parseFloat(rows[20][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2);
                                        xbaad2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2);
                                            }
                                        });
                                    }
                                    xbaad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2);
                                                xbaad2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    // 底板名义厚度 thkbn
                                    let THKBN;
                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                        && parseFloat(rows[21][columns[0][1].field]) > Math.max(ThkMin, C2)
                                        && parseFloat(rows[21][columns[0][1].field]) <= ThkMax) {
                                        THKBN = parseFloat(rows[21][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                        && parseFloat(rows[21][columns[0][1].field]) <= Math.max(ThkMin, C2)) {
                                        south.html("底板名义厚度 δbn 不能小于等于 " + Math.max(ThkMin, C2) + " mm").css("color", "red");
                                        return false;
                                    }
                                    else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                        && parseFloat(rows[21][columns[0][1].field]) > ThkMax) {
                                        south.html("底板名义厚度 δbn 不能大于 " + ThkMax + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // Sketch
                                    if (currentTabIndex === 0) {
                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN);
                                        xbaad2.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN);
                                            }
                                        });
                                    }
                                    xbaad2d3.tabs({
                                        onSelect: function (title, index) {
                                            if (index === 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN);
                                                xbaad2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN);
                                                    }
                                                });
                                            }
                                        }
                                    });

                                    let OBT, CB1;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_com_property.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": CategoryVal,
                                            "type": TypeVal,
                                            "std": STDVal,
                                            "name": NameVal,
                                            "thk": THKBN,
                                            "temp": DT,
                                            "highLow": 3,
                                            "isTube": 0,
                                            "od": 100000
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            OBT = parseFloat(result.ot);
                                            if (OBT < 0) {
                                                south.html("查询底板材料设计温度许用应力失败！").css("color", "red");
                                                return false;
                                            }
                                            CB1 = parseFloat(result.c1);
                                            if (CB1 < 0) {
                                                south.html("查询底板材料厚度负偏差失败！").css("color", "red");
                                                return false;
                                            }

                                            // 底板长度 a
                                            let A;
                                            if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) >= Math.max((B2 + 2 * THKCN), 0.5 * B)
                                                && parseFloat(rows[22][columns[0][1].field]) <= 4 * B) {
                                                A = parseFloat(rows[22][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) < Math.max((B2 + 2 * THKCN), 0.5 * B)) {
                                                south.html("底板长度 a 不能小于 " + Math.max((B2 + 2 * THKCN), 0.5 * B) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) > 4 * B) {
                                                south.html("底板长度 a 不能大于 " + 4 * B + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A);
                                                xbaad2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A);
                                                    }
                                                });
                                            }
                                            xbaad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A);
                                                        xbaad2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // 重心高差
                                            let BH;
                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                BH = parseFloat(rows[23][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // 距离 sd
                                            let SD;
                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field]) < B) {
                                                SD = parseFloat(rows[24][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field]) >= B) {
                                                south.html("距离 d 不能大于等于 " + B + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD);
                                                xbaad2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD);
                                                    }
                                                });
                                            }
                                            xbaad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD);
                                                        xbaad2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // 盖板名义厚度 thkan
                                            let THKAN;
                                            if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                && parseFloat(rows[25][columns[0][1].field]) > Math.max(ThkMin, C2, 6.25)
                                                && parseFloat(rows[25][columns[0][1].field]) <= ThkMax) {
                                                THKAN = parseFloat(rows[25][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                && parseFloat(rows[25][columns[0][1].field]) <= Math.max(ThkMin, C2, 6.25)) {
                                                south.html("盖板名义厚度 δan 不能小于等于 " + Math.max(ThkMin, C2, 6.25) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                && parseFloat(rows[25][columns[0][1].field]) > ThkMax) {
                                                south.html("盖板名义厚度 δan 不能大于 " + ThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD, THKAN);
                                                xbaad2.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD, THKAN);
                                                    }
                                                });
                                            }
                                            xbaad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD, THKAN);
                                                        xbaad2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD, THKAN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let OAT, CA1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": CategoryVal,
                                                    "type": TypeVal,
                                                    "std": STDVal,
                                                    "name": NameVal,
                                                    "thk": THKAN,
                                                    "temp": DT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": 100000
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    OAT = parseFloat(result.ot);
                                                    if (OAT < 0) {
                                                        south.html("查询盖板材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    CA1 = parseFloat(result.c1);
                                                    if (CA1 < 0) {
                                                        south.html("查询盖板材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 盖板宽度 c
                                                    let C;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                        && parseFloat(rows[26][columns[0][1].field]) >= 50
                                                        && parseFloat(rows[26][columns[0][1].field]) <= Math.min(B, 8 * THKAN)) {
                                                        C = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                        && parseFloat(rows[26][columns[0][1].field]) < 50) {
                                                        south.html("盖板宽度 c 不能小于 " + 50 + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                        && parseFloat(rows[26][columns[0][1].field]) > Math.min(B, 8 * THKAN)) {
                                                        south.html("盖板宽度 c 不能大于 " + Math.min(B, 8 * THKAN) + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD, THKAN, C);
                                                        xbaad2.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD, THKAN, C);
                                                            }
                                                        });
                                                    }
                                                    xbaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD, THKAN, C);
                                                                xbaad2.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        xbaa2d(Alpha + "°", THKCN, SH, B, B2, THKBN, A, SD, THKAN, C);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 偏心载荷 GE
                                                    let GE;
                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                        GE = parseFloat(rows[27][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 偏心距 SE
                                                    let SE;
                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])) {
                                                        SE = parseFloat(rows[28][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // g
                                                    let G = 9.8;

                                                    // k
                                                    let K;
                                                    if (N <= 3) {
                                                        K = 1.0;
                                                    }
                                                    else if (N > 3) {
                                                        K = 0.83;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // bd
                                                    let BD = Math.sqrt(Math.pow(DI + 2 * THKSN + 2 * THK3, 2) - B2 * B2) + 2 * (B - SD);
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "耳座安装尺寸：" + BD.toFixed(2) + " mm" +
                                                        "</span>");

                                                    // PW
                                                    let PW = 1.2 * FI * Q0 * DOUT * H0 / 1000000;

                                                    // PE
                                                    let PE = U * M0 * G;

                                                    // P
                                                    let P = Math.max(PW, PE + 0.25 * PW);

                                                    // F
                                                    let F = (M0 * G + GE * G) / (K * N) + 4 * (P * BH + GE * G * SE) / (N * BD);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "单个耳座设计载荷：" + F.toFixed(2) + " N" +
                                                        "</span>");

                                                    // 筋板校核
                                                    let CC = CC1 + C2;
                                                    let THKCE = THKCN - CC;
                                                    let R = 0.289 * THKCE;
                                                    let L2 = SH / Math.sin(Rad);
                                                    let OCMaxAllow = OCT / (1 + (L2 / R) * (L2 / R) / (140 * OCT));
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "筋板许用压缩应力：" + OCMaxAllow.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let FR = F / (2 * Math.sin(Rad));
                                                    let L1 = B * Math.sin(Rad);
                                                    let E = (B - SD - B / 2) * Math.sin(Rad);
                                                    let OCMax = FR / (L1 * THKCE) + 6 * E * FR / (L1 * L1 * THKCE);
                                                    let OCMaxCHK;
                                                    if (OCMax <= OCMaxAllow) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "筋板实际压缩应力：" + OCMax.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        OCMaxCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "筋板实际压缩应力：" + OCMax.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        OCMaxCHK = "不合格";
                                                    }

                                                    // 底板校核
                                                    let CB = CB1 + C2;
                                                    let THKBE = THKBN - CB;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "底板许用应力：" + OBT.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let AB = A / B;
                                                    let Beta;
                                                    if (AB === 0.5) {
                                                        Beta = 0.36;
                                                    }
                                                    else if (AB > 0.5 && AB < 0.667) {
                                                        Beta = 0.36 + (AB - 0.5) / (0.667 - 0.50) * (0.45 - 0.36);
                                                    }
                                                    else if (AB === 0.667) {
                                                        Beta = 0.45;
                                                    }
                                                    else if (AB > 0.667 && AB < 1.0) {
                                                        Beta = 0.45 + (AB - 0.667) / (1.0 - 0.667) * (0.67 - 0.45);
                                                    }
                                                    else if (AB === 1.0) {
                                                        Beta = 0.67;
                                                    }
                                                    else if (AB > 1.0 && AB < 1.25) {
                                                        Beta = 0.67 + (AB - 1.0) / (1.25 - 1.0) * (0.72 - 0.67);
                                                    }
                                                    else if (AB === 1.25) {
                                                        Beta = 0.72;
                                                    }
                                                    else if (AB > 1.25 && AB < 1.5) {
                                                        Beta = 0.72 + (AB - 1.25) / (1.5 - 1.25) * (0.77 - 0.72);
                                                    }
                                                    else if (AB === 1.5) {
                                                        Beta = 0.77;
                                                    }
                                                    else if (AB > 1.5 && AB < 2.0) {
                                                        Beta = 0.77 + (AB - 1.5) / (2.0 - 1.5) * (0.79 - 0.77);
                                                    }
                                                    else if (AB === 2.0) {
                                                        Beta = 0.79;
                                                    }
                                                    else if (AB > 2.0 && AB < 4.0) {
                                                        Beta = 0.79 + (AB - 2.0) / (4.0 - 2.0) * (0.80 - 0.79);
                                                    }
                                                    else if (AB === 4.0) {
                                                        Beta = 0.80;
                                                    }
                                                    let OB = Beta * F * B / (A * THKBE * THKBE);
                                                    let OBCHK;
                                                    if (OB <= OBT) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "底板实际应力：" + OB.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        OBCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "底板实际应力：" + OB.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        OBCHK = "不合格";
                                                    }

                                                    // 盖板校核
                                                    let CA = CA1 + C2;
                                                    let THKAE = THKAN - CA;
                                                    let OA = 0.75 * F * (B - SD) * A / (THKAE * C * C * SH);
                                                    let OAAllow = 1.5 * OAT;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "盖板许用应力：" + OAAllow.toFixed(4) + " MPa" +
                                                        "</span>");
                                                    let OACHK;
                                                    if (OA <= OAAllow) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "盖板实际应力：" + OA.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        OACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "盖板实际应力：" + OA.toFixed(4) + " MPa" +
                                                            "</span>");
                                                        OACHK = "不合格";
                                                    }

                                                    // docx
                                                    let XBAAPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "xbaadocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "XBAA",

                                                                t: DT,
                                                                m0: M0,
                                                                h0: H0,
                                                                di: DI,
                                                                thksn: THKSN,
                                                                dout: DOUT,
                                                                thk3: THK3,
                                                                q0: Q0,
                                                                fi: FI,
                                                                u: U,
                                                                n: N.toFixed(0),
                                                                earstd: STDVal,
                                                                earname: NameVal,
                                                                c2: C2,
                                                                alpha: Alpha,
                                                                thkcn: THKCN,
                                                                sh: SH,
                                                                b: B,
                                                                b2: B2,
                                                                thkbn: THKBN,
                                                                a: A,
                                                                bh: BH,
                                                                sd: SD,
                                                                thkan: THKAN,
                                                                c: C,
                                                                ge: GE,
                                                                se: SE,
                                                                densityc: Density.toFixed(4),
                                                                densityb: Density.toFixed(4),
                                                                cc1: CC1.toFixed(4),
                                                                cb1: CB1.toFixed(4),
                                                                oct: OCT.toFixed(4),
                                                                obt: OBT.toFixed(4),
                                                                densitya: Density.toFixed(4),
                                                                oat: OAT.toFixed(4),
                                                                ca1: CA1.toFixed(4),
                                                                g: G.toFixed(4),
                                                                k: K.toFixed(4),
                                                                bd: BD.toFixed(4),
                                                                pw: PW.toFixed(4),
                                                                pe: PE.toFixed(4),
                                                                p: P.toFixed(4),
                                                                f: F.toFixed(4),
                                                                cc: CC.toFixed(4),
                                                                thkce: THKCE.toFixed(4),
                                                                r: R.toFixed(4),
                                                                l2: L2.toFixed(4),
                                                                ocmaxallow: OCMaxAllow.toFixed(4),
                                                                fr: FR.toFixed(4),
                                                                l1: L1.toFixed(4),
                                                                e: E.toFixed(4),
                                                                ocmax: OCMax.toFixed(4),
                                                                ocmaxchk: OCMaxCHK,
                                                                cb: CB.toFixed(4),
                                                                thkbe: THKBE.toFixed(4),
                                                                ab: AB.toFixed(4),
                                                                beta: Beta.toFixed(4),
                                                                ob: OB.toFixed(4),
                                                                obchk: OBCHK,
                                                                ca: CA.toFixed(4),
                                                                thkae: THKAE.toFixed(4),
                                                                oa: OA.toFixed(4),
                                                                oaallow: OAAllow.toFixed(4),
                                                                oachk: OACHK
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
                                                                    XBAAPayJS.dialog({
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
                                                                                XBAAPayJS.dialog("close");
                                                                                XBAAPayJS.dialog("clear");
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
                                                                                            XBAAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    XBAAPayJS.dialog('close');
                                                                                                    XBAAPayJS.dialog('clear');
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
                                                        "<span style='color:red;'>&ensp;盖板材料力学特性获取失败，请检查网络后重试</span>");
                                                }
                                            });
                                        },
                                        error: function () {
                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                "<span style='color:red;'>&ensp;底板材料力学特性获取失败，请检查网络后重试</span>");
                                        }
                                    });
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;筋板材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;耳座材料物理性质获取失败，请检查网络后重试</span>");
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