$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bccad2 = $("#d2");
    let bccad3 = $("#d3");
    let bccad2d3 = $('#d2d3');

    $("#cal").html("<table id='bcca'></table>");
    let pg = $("#bcca");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/c/a/BCCA.json", function (result) {

        // 设计温度
        let BCCADT;

        // 许用压缩应力
        let BCCAOTCR = -1;

        // 材料
        let BCCASCategory, BCCASCategoryVal, BCCASType, BCCASTypeVal, BCCASSTD, BCCASSTDVal, BCCASName,
            BCCACCategory, BCCACCategoryVal, BCCACType, BCCACTypeVal, BCCACSTD, BCCACSTDVal, BCCACName;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function bcca2d(di = "ϕDi", thksn = "δsn", thksrn = "δsrn", ri = "Ri", thkcn = "δcn", thkcrn = "δcrn", l = "L", offset = ">=2δsrn") {

            bccad2.empty();

            let width = bccad2.width();
            let height = bccad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCCASVG")
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
            let padding = 120;
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
                ])).attr("id", "BCCASketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCCASketchDI").attr("startOffset", "50%").text(text);

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

            // 画圆弧/椭圆弧
            function drawArc(radiusX, radiusY, startX, startY, endX, endY) {
                svg.append("path").attr("d", "M "
                    + startX + " " + startY + " "
                    + "A" + radiusX + " " + radiusY + " "
                    + "1 0 1" + " "
                    + endX + " " + endY
                ).classed("sketch", true);
            }

            // 筒体轮廓,内壁对应的是 padding 框
            drawLine(padding, height - padding, width - padding, height - padding);
            drawLine(padding, padding, width - padding, padding);
            drawLine(padding, padding - thickness, padding, height - padding + thickness);
            drawLine(width - padding, padding - 2 * thickness, width - padding, height - padding + 2 * thickness);
            drawLine(padding, padding - thickness, width - 2 * padding, padding - thickness);
            drawLine(padding, height - padding + thickness, width - 2 * padding, height - padding + thickness);
            drawLine(width - 2 * padding, padding - thickness, width - 2 * padding + 30, padding - 2 * thickness);
            drawLine(width - 2 * padding, height - padding + thickness, width - 2 * padding + 30, height - padding + 2 * thickness);
            drawLine(width - 2 * padding + 30, padding - 2 * thickness, width - padding, padding - 2 * thickness);
            drawLine(width - 2 * padding + 30, height - padding + 2 * thickness, width - padding, height - padding + 2 * thickness);
            drawLine(width - 2 * padding, padding - thickness, width - 2 * padding, padding);
            drawLine(width - 2 * padding, height - padding + thickness, width - 2 * padding, height - padding);

            // 封头轮廓
            let BCCARI = height - 2 * padding;
            let BCCARM = height - 2 * padding + thickness;
            let BCCARO = height - 2 * padding + 2 * thickness;

            let centerX = width - padding - BCCARO;
            let centerY = height / 2;

            // 内壁
            let innerArcTopX = centerX + BCCARI * Math.cos(Math.PI / 6);
            let innerArcTopY = padding;
            let innerArcBottomX = centerX + BCCARI * Math.cos(Math.PI / 6);
            let innerArcBottomY = height - padding;
            drawArc(BCCARI, BCCARI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);

            // 上侧加强段外壁
            let outerArcTopStartX = centerX + Math.sqrt(BCCARO * BCCARO - BCCARI * BCCARI / 4);
            let outerArcTopStartY = padding;
            let outerArcTopEndX = centerX + BCCARO * Math.cos(Math.PI / 9);
            let outerArcTopEndY = centerY - BCCARO * Math.sin(Math.PI / 9);
            drawArc(BCCARO, BCCARO, outerArcTopStartX, outerArcTopStartY, outerArcTopEndX, outerArcTopEndY);

            // 下侧加强段外壁
            let outerArcBottomStartX = outerArcTopEndX;
            let outerArcBottomStartY = height - outerArcTopEndY;
            let outerArcBottomEndX = outerArcTopStartX;
            let outerArcBottomEndY = height - outerArcTopStartY;
            drawArc(BCCARO, BCCARO, outerArcBottomStartX, outerArcBottomStartY, outerArcBottomEndX, outerArcBottomEndY);

            // 球冠区外壁
            let midArcStartX = centerX + BCCARM * Math.cos(Math.PI / 12);
            let midArcStartY = centerY - BCCARM * Math.sin(Math.PI / 12);
            let midArcEndX = centerX + BCCARM * Math.cos(Math.PI / 12);
            let midArcEndY = centerY + BCCARM * Math.sin(Math.PI / 12);
            drawArc(BCCARM, BCCARM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);

            // 封头界限
            drawLine(midArcStartX, midArcStartY, centerX + BCCARI * Math.cos(Math.PI / 12), centerY - BCCARI * Math.sin(Math.PI / 12));
            drawLine(midArcEndX, midArcEndY, centerX + BCCARI * Math.cos(Math.PI / 12), centerY + BCCARI * Math.sin(Math.PI / 12));

            // 封头削边
            drawLine(midArcStartX, midArcStartY, outerArcTopEndX, outerArcTopEndY);
            drawLine(midArcEndX, midArcEndY, outerArcBottomStartX, outerArcBottomStartY);

            // 中心线
            drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
            drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);

            // 筒体内直径
            dimLeftV(padding + 100, height - padding, padding + 100, padding, di, "BCCASketchSDI");

            // 筒体厚度
            drawLine(padding + 70, padding - thickness, padding + 70, padding);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 70, y: padding - thickness},
                    {x: padding + 70 - 3, y: padding - thickness - 15},
                    {x: padding + 70 + 3, y: padding - thickness - 15},
                    {x: padding + 70, y: padding - thickness}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 70, y: padding - thickness - 15},
                {x: padding + 70, y: padding - thickness - 15 - 40}
            ])).attr("id", "BCCASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 筒体加强段厚度
            drawLine(width - 2 * padding + 50, padding, width - 2 * padding + 50, padding - 2 * thickness);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - 2 * padding + 50, y: padding - 2 * thickness},
                    {x: width - 2 * padding + 50 - 3, y: padding - 2 * thickness - 15},
                    {x: width - 2 * padding + 50 + 3, y: padding - 2 * thickness - 15},
                    {x: width - 2 * padding + 50, y: padding - 2 * thickness}
                ]));
            svg.append("path").attr("d", line([
                {x: width - 2 * padding + 50, y: padding - 2 * thickness - 15},
                {x: width - 2 * padding + 50, y: padding - 2 * thickness - 15 - 40}
            ])).attr("id", "BCCASketchTHKRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCASketchTHKRN").attr("startOffset", "50%").text(thksrn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - 2 * padding + 50, y: padding},
                    {x: width - 2 * padding + 50 - 3, y: padding + 15},
                    {x: width - 2 * padding + 50 + 3, y: padding + 15},
                    {x: width - 2 * padding + 50, y: padding}
                ]));
            drawLine(width - 2 * padding + 50, padding + 15, width - 2 * padding + 50, padding + 30);

            // L
            drawLine(width - 2 * padding, height - padding + thickness + 3, width - 2 * padding, height - padding + 2 * thickness + 40);
            drawLine(innerArcTopX, height - padding + 3, innerArcTopX, height - padding + 2 * thickness + 40);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - 2 * padding, y: height - padding + 2 * thickness + 30},
                    {x: width - 2 * padding - 15, y: height - padding + 2 * thickness + 30 - 3},
                    {x: width - 2 * padding - 15, y: height - padding + 2 * thickness + 30 + 3},
                    {x: width - 2 * padding, y: height - padding + 2 * thickness + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width - 2 * padding, y: height - padding + 2 * thickness + 30},
                {x: innerArcBottomX, y: height - padding + 2 * thickness + 30}
            ])).attr("id", "BCCASketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCASketchL").attr("startOffset", "50%").text(l);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: innerArcTopX, y: height - padding + 2 * thickness + 30},
                    {x: innerArcTopX + 15, y: height - padding + 2 * thickness + 30 - 3},
                    {x: innerArcTopX + 15, y: height - padding + 2 * thickness + 30 + 3},
                    {x: innerArcTopX, y: height - padding + 2 * thickness + 30}
                ]));
            drawLine(innerArcTopX + 15, height - padding + 2 * thickness + 30, innerArcTopX + 30, height - padding + 2 * thickness + 30);
            svg.append("path").attr("d", line([
                {x: width - 2 * padding - 15, y: height - padding + 2 * thickness + 30},
                {x: width - 2 * padding - 30, y: height - padding + 2 * thickness + 30}
            ])).classed("sketch", true);

            // 2thkrn
            drawLine(width - padding, padding - 2 * thickness - 3, width - padding, padding - 2 * thickness - 40);
            drawLine(outerArcTopStartX, padding - 3, outerArcTopStartX, padding - 2 * thickness - 40);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: outerArcTopStartX, y: padding - 2 * thickness - 30},
                    {x: outerArcTopStartX - 15, y: padding - 2 * thickness - 30 - 3},
                    {x: outerArcTopStartX - 15, y: padding - 2 * thickness - 30 + 3},
                    {x: outerArcTopStartX, y: padding - 2 * thickness - 30}
                ]));
            drawLine(outerArcTopStartX - 15, padding - 2 * thickness - 30, outerArcTopStartX - 30, padding - 2 * thickness - 30);
            drawLine(outerArcTopStartX, padding - 2 * thickness - 30, width - padding, padding - 2 * thickness - 30);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding, y: padding - 2 * thickness - 30},
                    {x: width - padding + 15, y: padding - 2 * thickness - 30 - 3},
                    {x: width - padding + 15, y: padding - 2 * thickness - 30 + 3},
                    {x: width - padding, y: padding - 2 * thickness - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width - padding + 15, y: padding - 2 * thickness - 30},
                {x: width - padding + 80, y: padding - 2 * thickness - 30}
            ])).attr("id", "BCCASketchOffset").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCASketchOffset").attr("startOffset", "50%").text(offset);

            // 封头球冠区
            let ang = 4;
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY},
                {x: width - padding - 2 * thickness - 15, y: centerY}
            ])).attr("id", "BCCASketchRi").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCASketchRi").attr("startOffset", "50%").text(ri);

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - 2 * thickness, y: centerY},
                    {x: width - padding - 2 * thickness - 15, y: centerY - 3},
                    {x: width - padding - 2 * thickness - 15, y: centerY + 3},
                    {x: width - padding - 2 * thickness, y: centerY}
                ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

            svg.append("path").attr("d", line([
                {x: width - padding - 2 * thickness, y: centerY},
                {x: width - padding - thickness, y: centerY}
            ])).classed("sketch", true).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - thickness, y: centerY},
                    {x: width - padding - thickness + 15, y: centerY - 3},
                    {x: width - padding - thickness + 15, y: centerY + 3},
                    {x: width - padding - thickness, y: centerY}
                ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

            svg.append("path").attr("d", line([
                {x: width - padding - thickness + 15, y: centerY},
                {x: width - padding - thickness + 60, y: centerY}
            ])).attr("id", "BCCASketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCASketchTHKCN").attr("startOffset", "50%").text(thkcn);

            let oppang = Math.asin(BCCARI / 2 / BCCARO) / Math.PI * 180 - ang;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - 2 * thickness, y: centerY},
                    {x: width - padding - 2 * thickness - 15, y: centerY - 3},
                    {x: width - padding - 2 * thickness - 15, y: centerY + 3},
                    {x: width - padding - 2 * thickness, y: centerY}
                ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: width - padding - 2 * thickness - 15, y: centerY},
                {x: width - padding - 2 * thickness - 30, y: centerY}
            ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: width - padding, y: centerY},
                {x: width - padding - 2 * thickness, y: centerY}
            ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding, y: centerY},
                    {x: width - padding + 15, y: centerY - 3},
                    {x: width - padding + 15, y: centerY + 3},
                    {x: width - padding, y: centerY}
                ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: width - padding + 15, y: centerY},
                {x: width - padding + 50, y: centerY}
            ])).attr("id", "BCCASketchTHKCRN").classed("sketch", true)
                .attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCASketchTHKCRN").attr("startOffset", "50%").text(thkcrn);

        }

        currentTabIndex = bccad2d3.tabs('getTabIndex', bccad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcca2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcca").length > 0) {
                    bcca2d();
                }
            });
        }
        bccad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcca2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcca").length > 0) {
                            bcca2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 球冠端封头内压计算",
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
                    $(ed.target).combobox("loadData", BCCASCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCCASType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCCASSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCCASName);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCCACCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCCACType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCCACSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BCCACName);
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
                    bccad2.empty();

                    // model
                    bccad3.empty();

                    // sketch
                    currentTabIndex = bccad2d3.tabs('getTabIndex', bccad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcca2d();
                        bccad2.off("resize").on("resize", function () {
                            if ($("#bcca").length > 0) {
                                bcca2d();
                            }
                        });
                    }
                    bccad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcca2d();
                                bccad2.off("resize").on("resize", function () {
                                    if ($("#bcca").length > 0) {
                                        bcca2d();
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

                        BCCADT = parseFloat(changes.value);

                        if (BCCADT <= 100) {
                            BCCAOTCR = 103;
                        }
                        else if (BCCADT > 100 && BCCADT <= 200) {
                            BCCAOTCR = 100;
                        }
                        else if (BCCADT > 200 && BCCADT <= 250) {
                            BCCAOTCR = 95;
                        }
                        else if (BCCADT > 250 && BCCADT <= 350) {
                            BCCAOTCR = 80;
                        }

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCCASCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCCASType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCASName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCCACCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCACType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCACSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCCACName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCASCategory = [];
                                BCCACCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCCADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCCASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCCACCategory[index] = {
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

                        BCCASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCCASType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCASCategoryVal,
                                temp: BCCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCASType = [];
                                $(result).each(function (index, element) {
                                    BCCASType[index] = {
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

                        BCCASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCASCategoryVal,
                                type: BCCASTypeVal,
                                temp: BCCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCASSTD = [];
                                $(result).each(function (index, element) {
                                    BCCASSTD[index] = {
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

                        BCCASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCASCategoryVal,
                                type: BCCASTypeVal,
                                std: BCCASSTDVal,
                                temp: BCCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCASName = [];
                                $(result).each(function (index, element) {
                                    BCCASName[index] = {
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

                        BCCACCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCACType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCACSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCCACName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCACCategoryVal,
                                temp: BCCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCACType = [];
                                $(result).each(function (index, element) {
                                    BCCACType[index] = {
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

                        BCCACTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCACSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCCACName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCACCategoryVal,
                                type: BCCACTypeVal,
                                temp: BCCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCACSTD = [];
                                $(result).each(function (index, element) {
                                    BCCACSTD[index] = {
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

                        BCCACSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCCACName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCACCategoryVal,
                                type: BCCACTypeVal,
                                std: BCCACSTDVal,
                                temp: BCCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCACName = [];
                                $(result).each(function (index, element) {
                                    BCCACName[index] = {
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
                            let BCCAPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCCAPS = parseFloat(rows[2][columns[0][1].field]);

                                // 计算压力
                                let BCCAPC = BCCAPD + BCCAPS;

                                // 试验类型
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCCATest = rows[3][columns[0][1].field];

                                    // 筒体材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let BCCASNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取筒体材料密度、最大最小厚度
                                        let BCCADS, BCCASThkMin, BCCASThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCCASCategoryVal,
                                                "type": BCCASTypeVal,
                                                "std": BCCASSTDVal,
                                                "name": BCCASNameVal,
                                                "temp": BCCADT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCCADS = parseFloat(result.density);
                                                BCCASThkMin = parseFloat(result.thkMin);
                                                BCCASThkMax = parseFloat(result.thkMax);

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let BCCASDI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bcca2d("Φ" + BCCASDI);
                                                        bccad2.off("resize").on("resize", function () {
                                                            if ($("#bcca").length > 0) {
                                                                bcca2d("Φ" + BCCASDI);
                                                            }
                                                        });
                                                    }
                                                    bccad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bcca2d("Φ" + BCCASDI);
                                                                bccad2.off("resize").on("resize", function () {
                                                                    if ($("#bcca").length > 0) {
                                                                        bcca2d("Φ" + BCCASDI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCCASThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCCASThkMax) {
                                                        let BCCATHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcca2d("Φ" + BCCASDI, BCCATHKSN);
                                                            bccad2.off("resize").on("resize", function () {
                                                                if ($("#bcca").length > 0) {
                                                                    bcca2d("Φ" + BCCASDI, BCCATHKSN);
                                                                }
                                                            });
                                                        }
                                                        bccad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcca2d("Φ" + BCCASDI, BCCATHKSN);
                                                                    bccad2.off("resize").on("resize", function () {
                                                                        if ($("#bcca").length > 0) {
                                                                            bcca2d("Φ" + BCCASDI, BCCATHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BCCASDO = BCCASDI + 2 * BCCATHKSN;

                                                        let BCCAOST, BCCAOS, BCCARSREL, BCCACS1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCCASCategoryVal,
                                                                "type": BCCASTypeVal,
                                                                "std": BCCASSTDVal,
                                                                "name": BCCASNameVal,
                                                                "thk": BCCATHKSN,
                                                                "temp": BCCADT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": BCCASDO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCCAOST = parseFloat(result.ot);
                                                                if (BCCAOST < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCAOS = parseFloat(result.o);
                                                                if (BCCAOS < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCARSREL = parseFloat(result.rel);
                                                                if (BCCARSREL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCACS1 = parseFloat(result.c1);
                                                                if (BCCACS1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < BCCATHKSN) {
                                                                    let BCCACS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体焊接接头系数
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let BCCAES = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量C
                                                                        let BCCACS = BCCACS1 + BCCACS2;

                                                                        // 筒体有效厚度
                                                                        let BCCATHKSE = BCCATHKSN - BCCACS;

                                                                        // 筒体计算厚度
                                                                        let BCCATHKSC = BCCAPC * BCCASDI / (2 * BCCAOST * BCCAES);

                                                                        // 筒体设计厚度
                                                                        let BCCATHKSD = BCCATHKSC + BCCACS2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "筒体(非加强段)所需厚度：" + (BCCATHKSD + BCCACS1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 筒体厚度校核
                                                                        let BCCATHKSCHK;
                                                                        if (BCCATHKSN >= (BCCATHKSD + BCCACS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCCATHKSN + " mm" +
                                                                                "</span>");
                                                                            BCCATHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCCATHKSN + " mm" +
                                                                                "</span>");
                                                                            BCCATHKSCHK = "不合格";
                                                                        }

                                                                        // 筒体加强段名义厚度
                                                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) >= BCCATHKSN
                                                                            && parseFloat(rows[12][columns[0][1].field]) <= BCCASThkMax) {
                                                                            let BCCATHKSRN = parseFloat(rows[12][columns[0][1].field]);

                                                                            // Sketch
                                                                            if (currentTabIndex === 0) {
                                                                                bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN);
                                                                                bccad2.off("resize").on("resize", function () {
                                                                                    if ($("#bcca").length > 0) {
                                                                                        bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN);
                                                                                    }
                                                                                });
                                                                            }
                                                                            bccad2d3.tabs({
                                                                                onSelect: function (title, index) {
                                                                                    if (index === 0) {
                                                                                        bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN);
                                                                                        bccad2.off("resize").on("resize", function () {
                                                                                            if ($("#bcca").length > 0) {
                                                                                                bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });

                                                                            let BCCASRDO = BCCASDI + 2 * BCCATHKSRN;

                                                                            let BCCAOSRT, BCCAOSR, BCCARSRREL, BCCACSR1;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BCCASCategoryVal,
                                                                                    "type": BCCASTypeVal,
                                                                                    "std": BCCASSTDVal,
                                                                                    "name": BCCASNameVal,
                                                                                    "thk": BCCATHKSRN,
                                                                                    "temp": BCCADT,
                                                                                    "highLow": 3,
                                                                                    "isTube": 0,
                                                                                    "od": BCCASRDO
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BCCAOSRT = parseFloat(result.ot);
                                                                                    if (BCCAOSRT < 0) {
                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCCAOSR = parseFloat(result.o);
                                                                                    if (BCCAOSR < 0) {
                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCCARSRREL = parseFloat(result.rel);
                                                                                    if (BCCARSRREL < 0) {
                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCCACSR1 = parseFloat(result.c1);
                                                                                    if (BCCACSR1 < 0) {
                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                        return false;
                                                                                    }

                                                                                    // 筒体加强段厚度附加量
                                                                                    let BCCACSR = BCCACSR1 + BCCACS2;

                                                                                    // 筒体加强段有效厚度
                                                                                    let BCCATHKSRE = BCCATHKSRN - BCCACSR;

                                                                                    // 封头材料名称
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                        let BCCACNameVal = rows[16][columns[0][1].field];

                                                                                        // AJAX 获取封头材料密度、最大最小厚度
                                                                                        let BCCADC, BCCACThkMin,
                                                                                            BCCACThkMax;
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "web_get_nbt_47003_1_2009_index.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                "category": BCCACCategoryVal,
                                                                                                "type": BCCACTypeVal,
                                                                                                "std": BCCACSTDVal,
                                                                                                "name": BCCACNameVal,
                                                                                                "temp": BCCADT
                                                                                            }),
                                                                                            beforeSend: function () {
                                                                                            },
                                                                                            success: function (result) {

                                                                                                BCCADC = parseFloat(result.density);
                                                                                                BCCACThkMin = parseFloat(result.thkMin);
                                                                                                BCCACThkMax = parseFloat(result.thkMax);

                                                                                                // 封头内半径
                                                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                                    && parseFloat(rows[17][columns[0][1].field]) >= 0.5 * BCCASDI) {
                                                                                                    let BCCACRI = parseFloat(rows[17][columns[0][1].field]);

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI);
                                                                                                        bccad2.off("resize").on("resize", function () {
                                                                                                            if ($("#bcca").length > 0) {
                                                                                                                bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    bccad2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI);
                                                                                                                bccad2.off("resize").on("resize", function () {
                                                                                                                    if ($("#bcca").length > 0) {
                                                                                                                        bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // 球壳切线与圆筒壁夹角 alpha(弧度)
                                                                                                    let BCCAALPHA = Math.acos(BCCASDI / (2 * BCCACRI));

                                                                                                    // 度数
                                                                                                    let BCCADEGREE = BCCAALPHA / Math.PI * 180;

                                                                                                    // 封头名义厚度
                                                                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) > BCCACThkMin
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) <= BCCACThkMax) {
                                                                                                        let BCCATHKCN = parseFloat(rows[18][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN);
                                                                                                            bccad2.off("resize").on("resize", function () {
                                                                                                                if ($("#bcca").length > 0) {
                                                                                                                    bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        bccad2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN);
                                                                                                                    bccad2.off("resize").on("resize", function () {
                                                                                                                        if ($("#bcca").length > 0) {
                                                                                                                            bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        let BCCACRO = BCCACRI + BCCATHKCN;

                                                                                                        let BCCAOCT,
                                                                                                            BCCAOC,
                                                                                                            BCCARCREL,
                                                                                                            BCCACC1;
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                "category": BCCACCategoryVal,
                                                                                                                "type": BCCACTypeVal,
                                                                                                                "std": BCCACSTDVal,
                                                                                                                "name": BCCACNameVal,
                                                                                                                "thk": BCCATHKCN,
                                                                                                                "temp": BCCADT,
                                                                                                                "highLow": 3,
                                                                                                                "isTube": 0,
                                                                                                                "od": BCCACRO * 2
                                                                                                            }),
                                                                                                            beforeSend: function () {
                                                                                                            },
                                                                                                            success: function (result) {

                                                                                                                BCCAOCT = parseFloat(result.ot);
                                                                                                                if (BCCAOCT < 0) {
                                                                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCCAOC = parseFloat(result.o);
                                                                                                                if (BCCAOC < 0) {
                                                                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCCARCREL = parseFloat(result.rel);
                                                                                                                if (BCCARCREL < 0) {
                                                                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCCACC1 = parseFloat(result.c1);
                                                                                                                if (BCCACC1 < 0) {
                                                                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                // 封头腐蚀裕量
                                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                                    && parseFloat(rows[19][columns[0][1].field]) < BCCATHKCN) {
                                                                                                                    let BCCACC2 = parseFloat(rows[19][columns[0][1].field]);

                                                                                                                    // 封头厚度附加量
                                                                                                                    let BCCACC = BCCACC1 + BCCACC2;

                                                                                                                    // 封头有效厚度
                                                                                                                    let BCCATHKCE = BCCATHKCN - BCCACC;

                                                                                                                    // 封头焊接接头系数
                                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                                                                                        let BCCAEC = parseFloat(rows[20][columns[0][1].field]);

                                                                                                                        // 封头计算厚度
                                                                                                                        let BCCATHKCC = BCCAPC * BCCASDI / (2 * BCCAOCT * BCCAEC);

                                                                                                                        // 设计厚度
                                                                                                                        let BCCATHKCD = BCCATHKCC + BCCACC2;

                                                                                                                        // 所需厚度提示信息
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头(非加强段)所需厚度：" + (BCCATHKCD + BCCACC1).toFixed(2) + " mm" +
                                                                                                                            "</span>");

                                                                                                                        // 封头厚度校核
                                                                                                                        let BCCATHKCCHK;
                                                                                                                        if (BCCATHKCN >= (BCCATHKCD + BCCACC1).toFixed(2)) {
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "输入厚度：" + BCCATHKCN + " mm" +
                                                                                                                                "</span>");
                                                                                                                            BCCATHKCCHK = "合格";
                                                                                                                        } else {
                                                                                                                            south.append(
                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "输入厚度：" + BCCATHKCN + " mm" +
                                                                                                                                "</span>");
                                                                                                                            BCCATHKCCHK = "不合格";
                                                                                                                        }

                                                                                                                        // 封头加强段名义厚度
                                                                                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) >= BCCATHKCN
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) <= BCCACThkMax) {
                                                                                                                            let BCCATHKCRN = parseFloat(rows[21][columns[0][1].field]);

                                                                                                                            // Sketch
                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN, BCCATHKCRN);
                                                                                                                                bccad2.off("resize").on("resize", function () {
                                                                                                                                    if ($("#bcca").length > 0) {
                                                                                                                                        bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN, BCCATHKCRN);
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            }
                                                                                                                            bccad2d3.tabs({
                                                                                                                                onSelect: function (title, index) {
                                                                                                                                    if (index === 0) {
                                                                                                                                        bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN, BCCATHKCRN);
                                                                                                                                        bccad2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bcca").length > 0) {
                                                                                                                                                bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN, BCCATHKCRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            });

                                                                                                                            // 封头加强段外直径
                                                                                                                            let BCCACRDO = 2 * (BCCACRI + BCCATHKCRN);

                                                                                                                            // 封头加强段性质
                                                                                                                            let BCCAOCRT,
                                                                                                                                BCCAOCR,
                                                                                                                                BCCARCRREL,
                                                                                                                                BCCACCR1;
                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "category": BCCACCategoryVal,
                                                                                                                                    "type": BCCACTypeVal,
                                                                                                                                    "std": BCCACSTDVal,
                                                                                                                                    "name": BCCACNameVal,
                                                                                                                                    "thk": BCCATHKCRN,
                                                                                                                                    "temp": BCCADT,
                                                                                                                                    "highLow": 3,
                                                                                                                                    "isTube": 0,
                                                                                                                                    "od": BCCACRDO
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    BCCAOCRT = parseFloat(result.ot);
                                                                                                                                    if (BCCAOCRT < 0) {
                                                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCAOCR = parseFloat(result.o);
                                                                                                                                    if (BCCAOCR < 0) {
                                                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCARCRREL = parseFloat(result.rel);
                                                                                                                                    if (BCCARCRREL < 0) {
                                                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCACCR1 = parseFloat(result.c1);
                                                                                                                                    if (BCCACCR1 < 0) {
                                                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }

                                                                                                                                    // 封头加强段厚度附加量
                                                                                                                                    let BCCACCR = BCCACCR1 + BCCACC2;

                                                                                                                                    // 封头加强段有效厚度
                                                                                                                                    let BCCATHKCRE = BCCATHKCRN - BCCACCR;

                                                                                                                                    // t2s
                                                                                                                                    let BCCAT2S = BCCACRI * BCCAPC;

                                                                                                                                    let BCCAT1 = 0.5 * BCCACRI * BCCAPC;

                                                                                                                                    let BCCAT2 = 0.5 * BCCACRI * BCCAPC;

                                                                                                                                    let BCCAWS = 0.6 * Math.sqrt(BCCACRI * BCCATHKSRE);
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "筒体加强段最小宽度：" + BCCAWS.toFixed(4) + " mm" +
                                                                                                                                        "</span>");

                                                                                                                                    // Sketch
                                                                                                                                    if (currentTabIndex === 0) {
                                                                                                                                        bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN, BCCATHKCRN, ">=" + BCCAWS.toFixed(2), ">=" + 2 * BCCATHKSRN);
                                                                                                                                        bccad2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bcca").length > 0) {
                                                                                                                                                bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN, BCCATHKCRN, ">=" + BCCAWS.toFixed(2), ">=" + 2 * BCCATHKSRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                    bccad2d3.tabs({
                                                                                                                                        onSelect: function (title, index) {
                                                                                                                                            if (index === 0) {
                                                                                                                                                bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN, BCCATHKCRN, ">=" + BCCAWS.toFixed(2), ">=" + 2 * BCCATHKSRN);
                                                                                                                                                bccad2.off("resize").on("resize", function () {
                                                                                                                                                    if ($("#bcca").length > 0) {
                                                                                                                                                        bcca2d("Φ" + BCCASDI, BCCATHKSN, BCCATHKSRN, "SR" + BCCACRI, BCCATHKCN, BCCATHKCRN, ">=" + BCCAWS.toFixed(2), ">=" + 2 * BCCATHKSRN);
                                                                                                                                                    }
                                                                                                                                                });
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    });

                                                                                                                                    let BCCAWC = 0.6 * Math.sqrt(BCCACRI * BCCATHKCRE);
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "封头加强段最小宽度：" + BCCAWC.toFixed(4) + " mm" +
                                                                                                                                        "</span>");

                                                                                                                                    let BCCAQ = BCCAT2 * BCCAWC + BCCAT2S * BCCAWS - BCCAT2 * BCCACRI * Math.sin(BCCAALPHA);

                                                                                                                                    let BCCAA = -1,
                                                                                                                                        BCCAAR = -1,
                                                                                                                                        BCCAARCHK = -1,
                                                                                                                                        BCCAWCSINALPHA = -1,
                                                                                                                                        BCCARI00752 = -1,
                                                                                                                                        BCCAWCSINALPHACHK = -1;

                                                                                                                                    if (BCCAQ < 0) {

                                                                                                                                        BCCAA = Math.abs(BCCAQ) / BCCAOTCR;
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处所需总承压面积：" + BCCAA.toFixed(4) + " mm²" +
                                                                                                                                            "</span>");
                                                                                                                                        BCCAAR = BCCAA - BCCAWS * BCCATHKSRE - BCCAWC * BCCATHKCRE;
                                                                                                                                        if (BCCAAR <= 0) {
                                                                                                                                            BCCAARCHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (BCCAWS * BCCATHKSRE + BCCAWC * BCCATHKCRE).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCCAARCHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (BCCAWS * BCCATHKSRE + BCCAWC * BCCATHKCRE).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        BCCARI00752 = 0.0075 * 2 * BCCACRI;
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处防止失稳所需的加强段最小径向投影长度：" + BCCARI00752.toFixed(4) + " mm" +
                                                                                                                                            "</span>");

                                                                                                                                        BCCAWCSINALPHA = BCCAWC * Math.sin(BCCAALPHA);
                                                                                                                                        if (BCCAWCSINALPHA >= BCCARI00752) {
                                                                                                                                            BCCAWCSINALPHACHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际径向投影长度：" + BCCAWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCCAWCSINALPHACHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际径向投影长度：" + BCCAWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                    } else {

                                                                                                                                        BCCAA = Math.abs(BCCAQ) / Math.min(BCCAEC * BCCAOCRT, BCCAES * BCCAOSRT);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处所需总承压面积：" + BCCAA.toFixed(4) + " mm²" +
                                                                                                                                            "</span>");
                                                                                                                                        BCCAAR = BCCAA - BCCAWS * BCCATHKSRE - BCCAWC * BCCATHKCRE;
                                                                                                                                        if (BCCAAR <= 0) {
                                                                                                                                            BCCAARCHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (BCCAWS * BCCATHKSRE + BCCAWC * BCCATHKCRE).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCCAARCHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (BCCAWS * BCCATHKSRE + BCCAWC * BCCATHKCRE).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                    }

                                                                                                                                    // 试验压力
                                                                                                                                    let BCCAPCT,
                                                                                                                                        BCCAPCRT,
                                                                                                                                        BCCAPST,
                                                                                                                                        BCCAPSRT,
                                                                                                                                        BCCAPT;
                                                                                                                                    if (BCCATest === "液压试验") {
                                                                                                                                        BCCAPCT = Math.max(1.25 * BCCAPD * BCCAOC / BCCAOCT, 0.05);
                                                                                                                                        BCCAPCRT = Math.max(1.25 * BCCAPD * BCCAOCR / BCCAOCRT, 0.05);
                                                                                                                                        BCCAPST = Math.max(1.25 * BCCAPD * BCCAOS / BCCAOST, 0.05);
                                                                                                                                        BCCAPSRT = Math.max(1.25 * BCCAPD * BCCAOSR / BCCAOSRT, 0.05);
                                                                                                                                        BCCAPT = Math.min(BCCAPCT, BCCAPCRT, BCCAPST, BCCAPSRT);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "压力试验：" + "液压/" + BCCAPT.toFixed(4) + " MPa" +
                                                                                                                                            "</span>");
                                                                                                                                    } else {
                                                                                                                                        BCCAPCT = Math.max(1.10 * BCCAPD * BCCAOC / BCCAOCT, 0.05);
                                                                                                                                        BCCAPCRT = Math.max(1.10 * BCCAPD * BCCAOCR / BCCAOCRT, 0.05);
                                                                                                                                        BCCAPST = Math.max(1.10 * BCCAPD * BCCAOS / BCCAOST, 0.05);
                                                                                                                                        BCCAPSRT = Math.max(1.10 * BCCAPD * BCCAOSR / BCCAOSRT, 0.05);
                                                                                                                                        BCCAPT = Math.min(BCCAPCT, BCCAPCRT, BCCAPST, BCCAPSRT);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "压力试验：" + "气压/" + BCCAPT.toFixed(4) + " MPa" +
                                                                                                                                            "</span>");
                                                                                                                                    }

                                                                                                                                    // docx
                                                                                                                                    let BCCAPayJS = $('#payjs');

                                                                                                                                    function getDocx() {
                                                                                                                                        $.ajax({
                                                                                                                                            type: "POST",
                                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                                            url: "bccadocx.action",
                                                                                                                                            async: true,
                                                                                                                                            dataType: "json",
                                                                                                                                            data: JSON.stringify({
                                                                                                                                                ribbonName: "BCCA",

                                                                                                                                                t: BCCADT,
                                                                                                                                                pd: BCCAPD,
                                                                                                                                                ps: BCCAPS,
                                                                                                                                                sstd: BCCASSTDVal,
                                                                                                                                                sname: BCCASNameVal,
                                                                                                                                                di: BCCASDI,
                                                                                                                                                thksn: BCCATHKSN,
                                                                                                                                                cs2: BCCACS2,
                                                                                                                                                es: BCCAES,
                                                                                                                                                thksrn: BCCATHKSRN,
                                                                                                                                                cstd: BCCACSTDVal,
                                                                                                                                                cname: BCCACNameVal,
                                                                                                                                                ri: BCCACRI,
                                                                                                                                                thkcn: BCCATHKCN,
                                                                                                                                                cc2: BCCACC2,
                                                                                                                                                ec: BCCAEC,
                                                                                                                                                thkcrn: BCCATHKCRN,
                                                                                                                                                test: BCCATest,
                                                                                                                                                dc: BCCADC.toFixed(4),
                                                                                                                                                ds: BCCADS.toFixed(4),
                                                                                                                                                oct: BCCAOCT.toFixed(4),
                                                                                                                                                ost: BCCAOST.toFixed(4),
                                                                                                                                                oc: BCCAOC.toFixed(4),
                                                                                                                                                os: BCCAOS.toFixed(4),
                                                                                                                                                rcrel: BCCARCREL.toFixed(4),
                                                                                                                                                rsrel: BCCARSREL.toFixed(4),
                                                                                                                                                cc1: BCCACC1.toFixed(4),
                                                                                                                                                cs1: BCCACS1.toFixed(4),
                                                                                                                                                ocrt: BCCAOCRT.toFixed(4),
                                                                                                                                                osrt: BCCAOSRT.toFixed(4),
                                                                                                                                                ocr: BCCAOCR.toFixed(4),
                                                                                                                                                osr: BCCAOSR.toFixed(4),
                                                                                                                                                rcrrel: BCCARCRREL.toFixed(4),
                                                                                                                                                rsrrel: BCCARSRREL.toFixed(4),
                                                                                                                                                ccr1: BCCACCR1.toFixed(4),
                                                                                                                                                csr1: BCCACSR1.toFixed(4),
                                                                                                                                                pc: BCCAPC.toFixed(4),
                                                                                                                                                cc: BCCACC.toFixed(4),
                                                                                                                                                thkce: BCCATHKCE.toFixed(4),
                                                                                                                                                ccr: BCCACCR.toFixed(4),
                                                                                                                                                thkcre: BCCATHKCRE.toFixed(4),
                                                                                                                                                cs: BCCACS.toFixed(4),
                                                                                                                                                thkse: BCCATHKSE.toFixed(4),
                                                                                                                                                csr: BCCACSR.toFixed(4),
                                                                                                                                                thksre: BCCATHKSRE.toFixed(4),
                                                                                                                                                alpha: BCCADEGREE.toFixed(4),
                                                                                                                                                otcr: BCCAOTCR.toFixed(4),
                                                                                                                                                thkcc: BCCATHKCC.toFixed(4),
                                                                                                                                                thkcd: BCCATHKCD.toFixed(4),
                                                                                                                                                thkcchk: BCCATHKCCHK,
                                                                                                                                                thksc: BCCATHKSC.toFixed(4),
                                                                                                                                                thksd: BCCATHKSD.toFixed(4),
                                                                                                                                                thkschk: BCCATHKSCHK,
                                                                                                                                                t2s: BCCAT2S.toFixed(4),
                                                                                                                                                t1: BCCAT1.toFixed(4),
                                                                                                                                                t2: BCCAT2.toFixed(4),
                                                                                                                                                ws: BCCAWS.toFixed(4),
                                                                                                                                                wc: BCCAWC.toFixed(4),
                                                                                                                                                q: BCCAQ.toFixed(4),
                                                                                                                                                a: BCCAA.toFixed(4),
                                                                                                                                                ar: BCCAAR.toFixed(4),
                                                                                                                                                archk: BCCAARCHK,
                                                                                                                                                wcsinalpha: BCCAWCSINALPHA.toFixed(4),
                                                                                                                                                ri000752: BCCARI00752.toFixed(4),
                                                                                                                                                wcsinalphachk: BCCAWCSINALPHACHK,
                                                                                                                                                pct: BCCAPCT.toFixed(4),
                                                                                                                                                pcrt: BCCAPCRT.toFixed(4),
                                                                                                                                                pst: BCCAPST.toFixed(4),
                                                                                                                                                psrt: BCCAPSRT.toFixed(4),
                                                                                                                                                pt: BCCAPT.toFixed(4)
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
                                                                                                                                                    BCCAPayJS.dialog({
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
                                                                                                                                                                BCCAPayJS.dialog("close");
                                                                                                                                                                BCCAPayJS.dialog("clear");
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
                                                                                                                                                                            BCCAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                    BCCAPayJS.dialog('close');
                                                                                                                                                                                    BCCAPayJS.dialog('clear');
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
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) < BCCATHKCN) {
                                                                                                                            south.html("封头加强段厚度不能小于 " + BCCATHKCN + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) > BCCACThkMax) {
                                                                                                                            south.html("封头加强段厚度不能大于 " + BCCACThkMax + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                                    && parseFloat(rows[19][columns[0][1].field]) >= BCCATHKCN) {
                                                                                                                    south.html("封头腐蚀裕量不能大于等于 " + BCCATHKCN + " mm").css("color", "red");
                                                                                                                }
                                                                                                            },
                                                                                                            error: function () {
                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) <= BCCACThkMin) {
                                                                                                        south.html("封头名义厚度不能小于等于 " + BCCACThkMin + " mm").css("color", "red");
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) > BCCACThkMax) {
                                                                                                        south.html("封头名义厚度不能大于 " + BCCACThkMax + " mm").css("color", "red");
                                                                                                    }
                                                                                                }
                                                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                                    && parseFloat(rows[17][columns[0][1].field]) < 0.5 * BCCASDI) {
                                                                                                    south.html("封头内半径不能小于 " + 0.5 * BCCASDI + " mm").css("color", "red");
                                                                                                }
                                                                                            },
                                                                                            error: function () {
                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                },
                                                                                error: function () {
                                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                        "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                }
                                                                            });
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) < BCCATHKSN) {
                                                                            south.html("筒体加强段名义厚度不能小于 " + BCCATHKSN + " mm").css("color", "red");
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) > BCCASThkMax) {
                                                                            south.html("筒体加强段名义厚度不能大于 " + BCCASThkMax + " mm").css("color", "red");
                                                                        }
                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCCATHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCCATHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCCASThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + BCCASThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCCASThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + BCCASThkMax + " mm").css("color", "red");
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