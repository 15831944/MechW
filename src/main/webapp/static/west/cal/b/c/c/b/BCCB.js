$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bccbd2 = $("#d2");
    let bccbd3 = $("#d3");
    let bccbd2d3 = $('#d2d3');

    $("#cal").html("<table id='bccb'></table>");
    let pg = $("#bccb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/c/b/BCCB.json", function (result) {

        // 设计温度
        let BCCBDT;

        // 许用压缩应力
        let BCCBOTCR = -1;

        // 材料
        let BCCBSCategory, BCCBSCategoryVal, BCCBSType, BCCBSTypeVal, BCCBSSTD, BCCBSSTDVal, BCCBSName,
            BCCBCCategory, BCCBCCategoryVal, BCCBCType, BCCBCTypeVal, BCCBCSTD, BCCBCSTDVal, BCCBCName;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function bccb2d(di = "ϕDi", thksn = "δsn", thksrn = "δsrn", ri = "Ri", thkcn = "δcn", thkcrn = "δcrn", l = "L", offset = "2(δsrn+δsn)") {

            bccbd2.empty();

            let width = bccbd2.width();
            let height = bccbd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCCBSVG")
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
                ])).attr("id", "BCCBSketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCCBSketchDI").attr("startOffset", "50%").text(text);

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
            drawLine(padding, padding - thickness, width - padding, padding - thickness);
            drawLine(padding, height - padding + thickness, width - padding, height - padding + thickness);
            drawLine(width - 2 * padding, padding - thickness, width - 2 * padding, padding - 2 * thickness);
            drawLine(width - 2 * padding, height - padding + thickness, width - 2 * padding, height - padding + 2 * thickness);
            drawLine(width - 2 * padding, padding - 2 * thickness, width - padding, padding - 2 * thickness);
            drawLine(width - 2 * padding, height - padding + 2 * thickness, width - padding, height - padding + 2 * thickness);

            // 封头轮廓
            let BCCBRI = height - 2 * padding;
            let BCCBRM = height - 2 * padding + thickness;
            let BCCBRO = height - 2 * padding + 2 * thickness;

            let centerX = width - padding - BCCBRO;
            let centerY = height / 2;

            // 内壁
            let innerArcTopX = centerX + BCCBRI * Math.cos(Math.PI / 6);
            let innerArcTopY = padding;
            let innerArcBottomX = centerX + BCCBRI * Math.cos(Math.PI / 6);
            let innerArcBottomY = height - padding;
            drawArc(BCCBRI, BCCBRI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);

            // 上侧加强段外壁
            let outerArcTopStartX = centerX + Math.sqrt(BCCBRO * BCCBRO - BCCBRI * BCCBRI / 4);
            let outerArcTopStartY = padding;
            let outerArcTopEndX = centerX + BCCBRO * Math.cos(Math.PI / 12);
            let outerArcTopEndY = centerY - BCCBRO * Math.sin(Math.PI / 12);
            drawArc(BCCBRO, BCCBRO, outerArcTopStartX, outerArcTopStartY, outerArcTopEndX, outerArcTopEndY);

            // 下侧加强段外壁
            let outerArcBottomStartX = outerArcTopEndX;
            let outerArcBottomStartY = height - outerArcTopEndY;
            let outerArcBottomEndX = outerArcTopStartX;
            let outerArcBottomEndY = height - outerArcTopStartY;
            drawArc(BCCBRO, BCCBRO, outerArcBottomStartX, outerArcBottomStartY, outerArcBottomEndX, outerArcBottomEndY);

            // 球冠区外壁
            let midArcStartX = centerX + BCCBRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcStartY = centerY - BCCBRM * Math.sin(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            let midArcEndX = centerX + BCCBRM * Math.cos(Math.PI / 6) + thickness * Math.tan(Math.PI / 6) * Math.sin(Math.PI / 6);
            let midArcEndY = centerY + BCCBRM * Math.sin(Math.PI / 6) - thickness * Math.tan(Math.PI / 6) * Math.cos(Math.PI / 6);
            drawArc(BCCBRM, BCCBRM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);

            // 封头削边
            drawLine(centerX + BCCBRM * Math.cos(Math.PI / 12), centerY - BCCBRM * Math.sin(Math.PI / 12), outerArcTopEndX, outerArcTopEndY);
            drawLine(centerX + BCCBRM * Math.cos(Math.PI / 12), centerY + BCCBRM * Math.sin(Math.PI / 12), outerArcBottomStartX, outerArcBottomStartY);

            // 中心线
            drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
            drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);

            // 筒体内直径
            dimLeftV(padding + 100, height - padding, padding + 100, padding, di, "BCCBSketchSDI");

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
            ])).attr("id", "BCCBSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCBSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 筒体加强段厚度
            drawLine(width - 2 * padding + 50, padding - thickness, width - 2 * padding + 50, padding - 2 * thickness);
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
            ])).attr("id", "BCCBSketchTHKRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCBSketchTHKRN").attr("startOffset", "50%").text(thksrn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - 2 * padding + 50, y: padding - thickness},
                    {x: width - 2 * padding + 50 - 3, y: padding - thickness + 15},
                    {x: width - 2 * padding + 50 + 3, y: padding - thickness + 15},
                    {x: width - 2 * padding + 50, y: padding - thickness}
                ]));
            drawLine(width - 2 * padding + 50, padding - thickness + 15, width - 2 * padding + 50, padding - thickness + 30);

            // L
            drawLine(width - 2 * padding, height - padding + 2 * thickness + 3, width - 2 * padding, height - padding + 2 * thickness + 40);
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
            ])).attr("id", "BCCBSketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCBSketchL").attr("startOffset", "50%").text(l);

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
            ])).attr("id", "BCCBSketchOffset").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCCBSketchOffset").attr("startOffset", "50%").text(offset);

            // 封头球冠区
            let ang = 4;
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY},
                {x: width - padding - 2 * thickness - 15, y: centerY}
            ])).attr("id", "BCCBSketchRi").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCBSketchRi").attr("startOffset", "50%").text(ri);

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
            ])).attr("id", "BCCBSketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCBSketchTHKCN").attr("startOffset", "50%").text(thkcn);

            let oppang = Math.asin(BCCBRI / 2 / BCCBRO) / Math.PI * 180 - ang;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width - padding - thickness, y: centerY},
                    {x: width - padding - thickness - 15, y: centerY - 3},
                    {x: width - padding - thickness - 15, y: centerY + 3},
                    {x: width - padding - thickness, y: centerY}
                ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: width - padding - thickness - 15, y: centerY},
                {x: width - padding - thickness - 30, y: centerY}
            ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: width - padding, y: centerY},
                {x: width - padding - thickness, y: centerY}
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
            ])).attr("id", "BCCBSketchTHKCRN").classed("sketch", true)
                .attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCCBSketchTHKCRN").attr("startOffset", "50%").text(thkcrn);

        }

        currentTabIndex = bccbd2d3.tabs('getTabIndex', bccbd2d3.tabs('getSelected'));

        // 初始化 Sketch
        if (currentTabIndex === 0) {
            bccb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bccb").length > 0) {
                    bccb2d();
                }
            });
        }
        bccbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bccb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bccb").length > 0) {
                            bccb2d();
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
                    $(ed.target).combobox("loadData", BCCBSCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCCBSType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCCBSSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCCBSName);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCCBCCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCCBCType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCCBCSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BCCBCName);
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
                    bccbd2.empty();

                    // model
                    bccbd3.empty();

                    // sketch
                    currentTabIndex = bccbd2d3.tabs('getTabIndex', bccbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bccb2d();
                        bccbd2.off("resize").on("resize", function () {
                            if ($("#bccb").length > 0) {
                                bccb2d();
                            }
                        });
                    }
                    bccbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bccb2d();
                                bccbd2.off("resize").on("resize", function () {
                                    if ($("#bccb").length > 0) {
                                        bccb2d();
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

                        BCCBDT = parseFloat(changes.value);

                        if (BCCBDT <= 100) {
                            BCCBOTCR = 103;
                        }
                        else if (BCCBDT > 100 && BCCBDT <= 200) {
                            BCCBOTCR = 100;
                        }
                        else if (BCCBDT > 200 && BCCBDT <= 250) {
                            BCCBOTCR = 95;
                        }
                        else if (BCCBDT > 250 && BCCBDT <= 350) {
                            BCCBOTCR = 80;
                        }

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCCBSCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCCBSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCBSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCBSName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCCBCCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCBCType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCBCSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCCBCName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCBSCategory = [];
                                BCCBCCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCCBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCCBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCCBCCategory[index] = {
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

                        BCCBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCCBSType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCBSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCBSCategoryVal,
                                temp: BCCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCBSType = [];
                                $(result).each(function (index, element) {
                                    BCCBSType[index] = {
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

                        BCCBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCCBSSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCBSCategoryVal,
                                type: BCCBSTypeVal,
                                temp: BCCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCBSSTD = [];
                                $(result).each(function (index, element) {
                                    BCCBSSTD[index] = {
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

                        BCCBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCCBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCBSCategoryVal,
                                type: BCCBSTypeVal,
                                std: BCCBSSTDVal,
                                temp: BCCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCBSName = [];
                                $(result).each(function (index, element) {
                                    BCCBSName[index] = {
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

                        BCCBCCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCCBCType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCBCSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCCBCName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCBCCategoryVal,
                                temp: BCCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCBCType = [];
                                $(result).each(function (index, element) {
                                    BCCBCType[index] = {
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

                        BCCBCTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCCBCSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCCBCName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCBCCategoryVal,
                                type: BCCBCTypeVal,
                                temp: BCCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCBCSTD = [];
                                $(result).each(function (index, element) {
                                    BCCBCSTD[index] = {
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

                        BCCBCSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCCBCName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCCBCCategoryVal,
                                type: BCCBCTypeVal,
                                std: BCCBCSTDVal,
                                temp: BCCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCCBCName = [];
                                $(result).each(function (index, element) {
                                    BCCBCName[index] = {
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
                            let BCCBPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCCBPS = parseFloat(rows[2][columns[0][1].field]);

                                // 计算压力
                                let BCCBPC = BCCBPD + BCCBPS;

                                // 试验类型
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCCBTest = rows[3][columns[0][1].field];

                                    // 筒体材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let BCCBSNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取筒体材料密度、最大最小厚度
                                        let BCCBDS, BCCBSThkMin, BCCBSThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCCBSCategoryVal,
                                                "type": BCCBSTypeVal,
                                                "std": BCCBSSTDVal,
                                                "name": BCCBSNameVal,
                                                "temp": BCCBDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCCBDS = parseFloat(result.density);
                                                BCCBSThkMin = parseFloat(result.thkMin);
                                                BCCBSThkMax = parseFloat(result.thkMax);

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let BCCBSDI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bccb2d("Φ" + BCCBSDI);
                                                        bccbd2.off("resize").on("resize", function () {
                                                            if ($("#bccb").length > 0) {
                                                                bccb2d("Φ" + BCCBSDI);
                                                            }
                                                        });
                                                    }
                                                    bccbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bccb2d("Φ" + BCCBSDI);
                                                                bccbd2.off("resize").on("resize", function () {
                                                                    if ($("#bccb").length > 0) {
                                                                        bccb2d("Φ" + BCCBSDI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCCBSThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCCBSThkMax) {
                                                        let BCCBTHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bccb2d("Φ" + BCCBSDI, BCCBTHKSN);
                                                            bccbd2.off("resize").on("resize", function () {
                                                                if ($("#bccb").length > 0) {
                                                                    bccb2d("Φ" + BCCBSDI, BCCBTHKSN);
                                                                }
                                                            });
                                                        }
                                                        bccbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bccb2d("Φ" + BCCBSDI, BCCBTHKSN);
                                                                    bccbd2.off("resize").on("resize", function () {
                                                                        if ($("#bccb").length > 0) {
                                                                            bccb2d("Φ" + BCCBSDI, BCCBTHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BCCBSDO = BCCBSDI + 2 * BCCBTHKSN;

                                                        let BCCBOST, BCCBOS, BCCBRSREL, BCCBCS1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCCBSCategoryVal,
                                                                "type": BCCBSTypeVal,
                                                                "std": BCCBSSTDVal,
                                                                "name": BCCBSNameVal,
                                                                "thk": BCCBTHKSN,
                                                                "temp": BCCBDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": BCCBSDO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCCBOST = parseFloat(result.ot);
                                                                if (BCCBOST < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCBOS = parseFloat(result.o);
                                                                if (BCCBOS < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCBRSREL = parseFloat(result.rel);
                                                                if (BCCBRSREL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCCBCS1 = parseFloat(result.c1);
                                                                if (BCCBCS1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < BCCBTHKSN) {
                                                                    let BCCBCS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体焊接接头系数
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let BCCBES = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量C
                                                                        let BCCBCS = BCCBCS1 + BCCBCS2;

                                                                        // 筒体有效厚度
                                                                        let BCCBTHKSE = BCCBTHKSN - BCCBCS;

                                                                        // 筒体计算厚度
                                                                        let BCCBTHKSC = BCCBPC * BCCBSDI / (2 * BCCBOST * BCCBES);

                                                                        // 筒体设计厚度
                                                                        let BCCBTHKSD = BCCBTHKSC + BCCBCS2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "筒体所需厚度：" + (BCCBTHKSD + BCCBCS1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 筒体厚度校核
                                                                        let BCCBTHKSCHK;
                                                                        if (BCCBTHKSN >= (BCCBTHKSD + BCCBCS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCCBTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCCBTHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCCBTHKSN + " mm" +
                                                                                "</span>");
                                                                            BCCBTHKSCHK = "不合格";
                                                                        }

                                                                        // 筒体加强板名义厚度
                                                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) > BCCBSThkMin
                                                                            && parseFloat(rows[12][columns[0][1].field]) <= BCCBSThkMax) {
                                                                            let BCCBTHKSRN = parseFloat(rows[12][columns[0][1].field]);

                                                                            // Sketch
                                                                            if (currentTabIndex === 0) {
                                                                                bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN);
                                                                                bccbd2.off("resize").on("resize", function () {
                                                                                    if ($("#bccb").length > 0) {
                                                                                        bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN);
                                                                                    }
                                                                                });
                                                                            }
                                                                            bccbd2d3.tabs({
                                                                                onSelect: function (title, index) {
                                                                                    if (index === 0) {
                                                                                        bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN);
                                                                                        bccbd2.off("resize").on("resize", function () {
                                                                                            if ($("#bccb").length > 0) {
                                                                                                bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });

                                                                            let BCCBSRDO = BCCBSDO + 2 * BCCBTHKSRN;

                                                                            let BCCBOSRT, BCCBOSR, BCCBRSRREL, BCCBCSR1;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BCCBSCategoryVal,
                                                                                    "type": BCCBSTypeVal,
                                                                                    "std": BCCBSSTDVal,
                                                                                    "name": BCCBSNameVal,
                                                                                    "thk": BCCBTHKSRN,
                                                                                    "temp": BCCBDT,
                                                                                    "highLow": 3,
                                                                                    "isTube": 0,
                                                                                    "od": BCCBSRDO
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BCCBOSRT = parseFloat(result.ot);
                                                                                    if (BCCBOSRT < 0) {
                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCCBOSR = parseFloat(result.o);
                                                                                    if (BCCBOSR < 0) {
                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCCBRSRREL = parseFloat(result.rel);
                                                                                    if (BCCBRSRREL < 0) {
                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCCBCSR1 = parseFloat(result.c1);
                                                                                    if (BCCBCSR1 < 0) {
                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                        return false;
                                                                                    }

                                                                                    // 筒体加强板厚度附加量
                                                                                    let BCCBCSR = BCCBCSR1;

                                                                                    // 筒体加强段有效厚度
                                                                                    let BCCBTHKSRE = BCCBTHKSRN - BCCBCSR;

                                                                                    // 封头材料名称
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                        let BCCBCNameVal = rows[16][columns[0][1].field];

                                                                                        // AJAX 获取封头材料密度、最大最小厚度
                                                                                        let BCCBDC, BCCBCThkMin,
                                                                                            BCCBCThkMax;
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "web_get_nbt_47003_1_2009_index.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                "category": BCCBCCategoryVal,
                                                                                                "type": BCCBCTypeVal,
                                                                                                "std": BCCBCSTDVal,
                                                                                                "name": BCCBCNameVal,
                                                                                                "temp": BCCBDT
                                                                                            }),
                                                                                            beforeSend: function () {
                                                                                            },
                                                                                            success: function (result) {

                                                                                                BCCBDC = parseFloat(result.density);
                                                                                                BCCBCThkMin = parseFloat(result.thkMin);
                                                                                                BCCBCThkMax = parseFloat(result.thkMax);

                                                                                                // 封头内半径
                                                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                                    && parseFloat(rows[17][columns[0][1].field]) >= 0.5 * BCCBSDI) {
                                                                                                    let BCCBCRI = parseFloat(rows[17][columns[0][1].field]);

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI);
                                                                                                        bccbd2.off("resize").on("resize", function () {
                                                                                                            if ($("#bccb").length > 0) {
                                                                                                                bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    bccbd2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI);
                                                                                                                bccbd2.off("resize").on("resize", function () {
                                                                                                                    if ($("#bccb").length > 0) {
                                                                                                                        bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // 球壳切线与圆筒壁夹角 alpha(弧度)
                                                                                                    let BCCBALPHA = Math.acos(BCCBSDI / (2 * BCCBCRI));

                                                                                                    // 度数
                                                                                                    let BCCBDEGREE = BCCBALPHA / Math.PI * 180;

                                                                                                    // 封头名义厚度
                                                                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) > BCCBCThkMin
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) <= BCCBCThkMax) {
                                                                                                        let BCCBTHKCN = parseFloat(rows[18][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN);
                                                                                                            bccbd2.off("resize").on("resize", function () {
                                                                                                                if ($("#bccb").length > 0) {
                                                                                                                    bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        bccbd2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN);
                                                                                                                    bccbd2.off("resize").on("resize", function () {
                                                                                                                        if ($("#bccb").length > 0) {
                                                                                                                            bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        let BCCBCRO = BCCBCRI + BCCBTHKCN;

                                                                                                        let BCCBOCT,
                                                                                                            BCCBOC,
                                                                                                            BCCBRCREL,
                                                                                                            BCCBCC1;
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                "category": BCCBCCategoryVal,
                                                                                                                "type": BCCBCTypeVal,
                                                                                                                "std": BCCBCSTDVal,
                                                                                                                "name": BCCBCNameVal,
                                                                                                                "thk": BCCBTHKCN,
                                                                                                                "temp": BCCBDT,
                                                                                                                "highLow": 3,
                                                                                                                "isTube": 0,
                                                                                                                "od": BCCBCRO * 2
                                                                                                            }),
                                                                                                            beforeSend: function () {
                                                                                                            },
                                                                                                            success: function (result) {

                                                                                                                BCCBOCT = parseFloat(result.ot);
                                                                                                                if (BCCBOCT < 0) {
                                                                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCCBOC = parseFloat(result.o);
                                                                                                                if (BCCBOC < 0) {
                                                                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCCBRCREL = parseFloat(result.rel);
                                                                                                                if (BCCBRCREL < 0) {
                                                                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCCBCC1 = parseFloat(result.c1);
                                                                                                                if (BCCBCC1 < 0) {
                                                                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                // 封头腐蚀裕量
                                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                                    && parseFloat(rows[19][columns[0][1].field]) < BCCBTHKCN) {
                                                                                                                    let BCCBCC2 = parseFloat(rows[19][columns[0][1].field]);

                                                                                                                    // 封头厚度附加量
                                                                                                                    let BCCBCC = BCCBCC1 + BCCBCC2;

                                                                                                                    // 封头有效厚度
                                                                                                                    let BCCBTHKCE = BCCBTHKCN - BCCBCC;

                                                                                                                    // 封头焊接接头系数
                                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                                                                                        let BCCBEC = parseFloat(rows[20][columns[0][1].field]);

                                                                                                                        // 封头计算厚度
                                                                                                                        let BCCBTHKCC = BCCBPC * BCCBSDI / (2 * BCCBOCT * BCCBEC);

                                                                                                                        // 设计厚度
                                                                                                                        let BCCBTHKCD = BCCBTHKCC + BCCBCC2;

                                                                                                                        // 所需厚度提示信息
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头所需厚度：" + (BCCBTHKCD + BCCBCC1).toFixed(2) + " mm" +
                                                                                                                            "</span>");

                                                                                                                        // 封头厚度校核
                                                                                                                        let BCCBTHKCCHK;
                                                                                                                        if (BCCBTHKCN >= (BCCBTHKCD + BCCBCC1).toFixed(2)) {
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "输入厚度：" + BCCBTHKCN + " mm" +
                                                                                                                                "</span>");
                                                                                                                            BCCBTHKCCHK = "合格";
                                                                                                                        } else {
                                                                                                                            south.append(
                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "输入厚度：" + BCCBTHKCN + " mm" +
                                                                                                                                "</span>");
                                                                                                                            BCCBTHKCCHK = "不合格";
                                                                                                                        }

                                                                                                                        // 封头加强板名义厚度
                                                                                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) > BCCBCThkMin
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) <= BCCBCThkMax) {
                                                                                                                            let BCCBTHKCRN = parseFloat(rows[21][columns[0][1].field]);

                                                                                                                            // Sketch
                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN, BCCBTHKCRN);
                                                                                                                                bccbd2.off("resize").on("resize", function () {
                                                                                                                                    if ($("#bccb").length > 0) {
                                                                                                                                        bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN, BCCBTHKCRN);
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            }
                                                                                                                            bccbd2d3.tabs({
                                                                                                                                onSelect: function (title, index) {
                                                                                                                                    if (index === 0) {
                                                                                                                                        bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN, BCCBTHKCRN);
                                                                                                                                        bccbd2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bccb").length > 0) {
                                                                                                                                                bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN, BCCBTHKCRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            });

                                                                                                                            // 封头加强段外直径
                                                                                                                            let BCCBCRDO = 2 * (BCCBCRO + BCCBTHKCRN);

                                                                                                                            // 封头加强段性质
                                                                                                                            let BCCBOCRT,
                                                                                                                                BCCBOCR,
                                                                                                                                BCCBRCRREL,
                                                                                                                                BCCBCCR1;
                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "category": BCCBCCategoryVal,
                                                                                                                                    "type": BCCBCTypeVal,
                                                                                                                                    "std": BCCBCSTDVal,
                                                                                                                                    "name": BCCBCNameVal,
                                                                                                                                    "thk": BCCBTHKCRN,
                                                                                                                                    "temp": BCCBDT,
                                                                                                                                    "highLow": 3,
                                                                                                                                    "isTube": 0,
                                                                                                                                    "od": BCCBCRDO
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    BCCBOCRT = parseFloat(result.ot);
                                                                                                                                    if (BCCBOCRT < 0) {
                                                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCBOCR = parseFloat(result.o);
                                                                                                                                    if (BCCBOCR < 0) {
                                                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCBRCRREL = parseFloat(result.rel);
                                                                                                                                    if (BCCBRCRREL < 0) {
                                                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCCBCCR1 = parseFloat(result.c1);
                                                                                                                                    if (BCCBCCR1 < 0) {
                                                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }

                                                                                                                                    // 封头加强板厚度附加量
                                                                                                                                    let BCCBCCR = BCCBCCR1;

                                                                                                                                    // 封头加强板有效厚度
                                                                                                                                    let BCCBTHKCRE = BCCBTHKCRN - BCCBCCR;

                                                                                                                                    // t2s
                                                                                                                                    let BCCBT2S = BCCBCRI * BCCBPC;

                                                                                                                                    let BCCBT1 = 0.5 * BCCBCRI * BCCBPC;

                                                                                                                                    let BCCBT2 = 0.5 * BCCBCRI * BCCBPC;

                                                                                                                                    let BCCBWS = 0.6 * Math.sqrt(BCCBCRI * (BCCBTHKSRE + BCCBTHKSE));
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "筒体加强板最小宽度：" + BCCBWS.toFixed(4) + " mm" +
                                                                                                                                        "</span>");

                                                                                                                                    // Sketch
                                                                                                                                    if (currentTabIndex === 0) {
                                                                                                                                        bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN, BCCBTHKCRN, ">=" + BCCBWS.toFixed(2), ">=" + 2 * BCCBTHKSRN);
                                                                                                                                        bccbd2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bccb").length > 0) {
                                                                                                                                                bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN, BCCBTHKCRN, ">=" + BCCBWS.toFixed(2), ">=" + 2 * BCCBTHKSRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                    bccbd2d3.tabs({
                                                                                                                                        onSelect: function (title, index) {
                                                                                                                                            if (index === 0) {
                                                                                                                                                bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN, BCCBTHKCRN, ">=" + BCCBWS.toFixed(2), ">=" + 2 * BCCBTHKSRN);
                                                                                                                                                bccbd2.off("resize").on("resize", function () {
                                                                                                                                                    if ($("#bccb").length > 0) {
                                                                                                                                                        bccb2d("Φ" + BCCBSDI, BCCBTHKSN, BCCBTHKSRN, "SR" + BCCBCRI, BCCBTHKCN, BCCBTHKCRN, ">=" + BCCBWS.toFixed(2), ">=" + 2 * BCCBTHKSRN);
                                                                                                                                                    }
                                                                                                                                                });
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    });

                                                                                                                                    let BCCBWC = 0.6 * Math.sqrt(BCCBCRI * (BCCBTHKCRE + BCCBTHKCE));
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "封头加强板最小宽度：" + BCCBWC.toFixed(4) + " mm" +
                                                                                                                                        "</span>");

                                                                                                                                    let BCCBQ = BCCBT2 * BCCBWC + BCCBT2S * BCCBWS - BCCBT2 * BCCBCRI * Math.sin(BCCBALPHA);

                                                                                                                                    let BCCBA = -1,
                                                                                                                                        BCCBAR = -1,
                                                                                                                                        BCCBARCHK = -1,
                                                                                                                                        BCCBWCSINALPHA = -1,
                                                                                                                                        BCCBRI00752 = -1,
                                                                                                                                        BCCBWCSINALPHACHK = -1;

                                                                                                                                    if (BCCBQ < 0) {

                                                                                                                                        BCCBA = Math.abs(BCCBQ) / BCCBOTCR;
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处所需总承压面积：" + BCCBA.toFixed(4) + " mm²" +
                                                                                                                                            "</span>");
                                                                                                                                        BCCBAR = BCCBA - BCCBWS * (BCCBTHKSRE + BCCBTHKSE) - BCCBWC * (BCCBTHKCRE + BCCBTHKCE);
                                                                                                                                        if (BCCBAR <= 0) {
                                                                                                                                            BCCBARCHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (BCCBWS * (BCCBTHKSRE + BCCBTHKSE) + BCCBWC * (BCCBTHKCRE + BCCBTHKCE)).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCCBARCHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (BCCBWS * (BCCBTHKSRE + BCCBTHKSE) + BCCBWC * (BCCBTHKCRE + BCCBTHKCE)).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        BCCBRI00752 = 0.0075 * 2 * BCCBCRI;
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处防止失稳所需的加强板最小径向投影长度：" + BCCBRI00752.toFixed(4) + " mm" +
                                                                                                                                            "</span>");

                                                                                                                                        BCCBWCSINALPHA = BCCBWC * Math.sin(BCCBALPHA);
                                                                                                                                        if (BCCBWCSINALPHA >= BCCBRI00752) {
                                                                                                                                            BCCBWCSINALPHACHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际径向投影长度：" + BCCBWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCCBWCSINALPHACHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际径向投影长度：" + BCCBWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                    } else {

                                                                                                                                        BCCBA = Math.abs(BCCBQ) / Math.min(BCCBEC * BCCBOCRT, BCCBEC * BCCBOCT, BCCBES * BCCBOSRT, BCCBES * BCCBOST);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处所需总承压面积：" + BCCBA.toFixed(4) + " mm²" +
                                                                                                                                            "</span>");
                                                                                                                                        BCCBAR = BCCBA - BCCBWS * (BCCBTHKSRE + BCCBTHKSE) - BCCBWC * (BCCBTHKCRE + BCCBTHKCE);
                                                                                                                                        if (BCCBAR <= 0) {
                                                                                                                                            BCCBARCHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (BCCBWS * (BCCBTHKSRE + BCCBTHKSE) + BCCBWC * (BCCBTHKCRE + BCCBTHKCE)).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCCBARCHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (BCCBWS * (BCCBTHKSRE + BCCBTHKSE) + BCCBWC * (BCCBTHKCRE + BCCBTHKCE)).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                    }

                                                                                                                                    // 试验压力
                                                                                                                                    let BCCBPCT,
                                                                                                                                        BCCBPCRT,
                                                                                                                                        BCCBPST,
                                                                                                                                        BCCBPSRT,
                                                                                                                                        BCCBPT;
                                                                                                                                    if (BCCBTest === "液压试验") {
                                                                                                                                        BCCBPCT = Math.max(1.25 * BCCBPD * BCCBOC / BCCBOCT, 0.05);
                                                                                                                                        BCCBPCRT = Math.max(1.25 * BCCBPD * BCCBOCR / BCCBOCRT, 0.05);
                                                                                                                                        BCCBPST = Math.max(1.25 * BCCBPD * BCCBOS / BCCBOST, 0.05);
                                                                                                                                        BCCBPSRT = Math.max(1.25 * BCCBPD * BCCBOSR / BCCBOSRT, 0.05);
                                                                                                                                        BCCBPT = Math.min(BCCBPCT, BCCBPCRT, BCCBPST, BCCBPSRT);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "压力试验：" + "液压/" + BCCBPT.toFixed(4) + " MPa" +
                                                                                                                                            "</span>");
                                                                                                                                    } else {
                                                                                                                                        BCCBPCT = Math.max(1.10 * BCCBPD * BCCBOC / BCCBOCT, 0.05);
                                                                                                                                        BCCBPCRT = Math.max(1.10 * BCCBPD * BCCBOCR / BCCBOCRT, 0.05);
                                                                                                                                        BCCBPST = Math.max(1.10 * BCCBPD * BCCBOS / BCCBOST, 0.05);
                                                                                                                                        BCCBPSRT = Math.max(1.10 * BCCBPD * BCCBOSR / BCCBOSRT, 0.05);
                                                                                                                                        BCCBPT = Math.min(BCCBPCT, BCCBPCRT, BCCBPST, BCCBPSRT);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "压力试验：" + "气压/" + BCCBPT.toFixed(4) + " MPa" +
                                                                                                                                            "</span>");
                                                                                                                                    }

                                                                                                                                    // docx
                                                                                                                                    let BCCBPayJS = $('#payjs');

                                                                                                                                    function getDocx() {
                                                                                                                                        $.ajax({
                                                                                                                                            type: "POST",
                                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                                            url: "bccbdocx.action",
                                                                                                                                            async: true,
                                                                                                                                            dataType: "json",
                                                                                                                                            data: JSON.stringify({
                                                                                                                                                ribbonName: "BCCB",

                                                                                                                                                t: BCCBDT,
                                                                                                                                                pd: BCCBPD,
                                                                                                                                                ps: BCCBPS,
                                                                                                                                                sstd: BCCBSSTDVal,
                                                                                                                                                sname: BCCBSNameVal,
                                                                                                                                                di: BCCBSDI,
                                                                                                                                                thksn: BCCBTHKSN,
                                                                                                                                                cs2: BCCBCS2,
                                                                                                                                                es: BCCBES,
                                                                                                                                                thksrn: BCCBTHKSRN,
                                                                                                                                                cstd: BCCBCSTDVal,
                                                                                                                                                cname: BCCBCNameVal,
                                                                                                                                                ri: BCCBCRI,
                                                                                                                                                thkcn: BCCBTHKCN,
                                                                                                                                                cc2: BCCBCC2,
                                                                                                                                                ec: BCCBEC,
                                                                                                                                                thkcrn: BCCBTHKCRN,
                                                                                                                                                test: BCCBTest,
                                                                                                                                                dc: BCCBDC.toFixed(4),
                                                                                                                                                ds: BCCBDS.toFixed(4),
                                                                                                                                                oct: BCCBOCT.toFixed(4),
                                                                                                                                                ost: BCCBOST.toFixed(4),
                                                                                                                                                oc: BCCBOC.toFixed(4),
                                                                                                                                                os: BCCBOS.toFixed(4),
                                                                                                                                                rcrel: BCCBRCREL.toFixed(4),
                                                                                                                                                rsrel: BCCBRSREL.toFixed(4),
                                                                                                                                                cc1: BCCBCC1.toFixed(4),
                                                                                                                                                cs1: BCCBCS1.toFixed(4),
                                                                                                                                                ocrt: BCCBOCRT.toFixed(4),
                                                                                                                                                osrt: BCCBOSRT.toFixed(4),
                                                                                                                                                ocr: BCCBOCR.toFixed(4),
                                                                                                                                                osr: BCCBOSR.toFixed(4),
                                                                                                                                                rcrrel: BCCBRCRREL.toFixed(4),
                                                                                                                                                rsrrel: BCCBRSRREL.toFixed(4),
                                                                                                                                                ccr1: BCCBCCR1.toFixed(4),
                                                                                                                                                csr1: BCCBCSR1.toFixed(4),
                                                                                                                                                pc: BCCBPC.toFixed(4),
                                                                                                                                                cc: BCCBCC.toFixed(4),
                                                                                                                                                thkce: BCCBTHKCE.toFixed(4),
                                                                                                                                                ccr: BCCBCCR.toFixed(4),
                                                                                                                                                thkcre: BCCBTHKCRE.toFixed(4),
                                                                                                                                                cs: BCCBCS.toFixed(4),
                                                                                                                                                thkse: BCCBTHKSE.toFixed(4),
                                                                                                                                                csr: BCCBCSR.toFixed(4),
                                                                                                                                                thksre: BCCBTHKSRE.toFixed(4),
                                                                                                                                                alpha: BCCBDEGREE.toFixed(4),
                                                                                                                                                otcr: BCCBOTCR.toFixed(4),
                                                                                                                                                thkcc: BCCBTHKCC.toFixed(4),
                                                                                                                                                thkcd: BCCBTHKCD.toFixed(4),
                                                                                                                                                thkcchk: BCCBTHKCCHK,
                                                                                                                                                thksc: BCCBTHKSC.toFixed(4),
                                                                                                                                                thksd: BCCBTHKSD.toFixed(4),
                                                                                                                                                thkschk: BCCBTHKSCHK,
                                                                                                                                                t2s: BCCBT2S.toFixed(4),
                                                                                                                                                t1: BCCBT1.toFixed(4),
                                                                                                                                                t2: BCCBT2.toFixed(4),
                                                                                                                                                ws: BCCBWS.toFixed(4),
                                                                                                                                                wc: BCCBWC.toFixed(4),
                                                                                                                                                q: BCCBQ.toFixed(4),
                                                                                                                                                a: BCCBA.toFixed(4),
                                                                                                                                                ar: BCCBAR.toFixed(4),
                                                                                                                                                archk: BCCBARCHK,
                                                                                                                                                wcsinalpha: BCCBWCSINALPHA.toFixed(4),
                                                                                                                                                ri000752: BCCBRI00752.toFixed(4),
                                                                                                                                                wcsinalphachk: BCCBWCSINALPHACHK,
                                                                                                                                                pct: BCCBPCT.toFixed(4),
                                                                                                                                                pcrt: BCCBPCRT.toFixed(4),
                                                                                                                                                pst: BCCBPST.toFixed(4),
                                                                                                                                                psrt: BCCBPSRT.toFixed(4),
                                                                                                                                                pt: BCCBPT.toFixed(4)
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
                                                                                                                                                    BCCBPayJS.dialog({
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
                                                                                                                                                                BCCBPayJS.dialog("close");
                                                                                                                                                                BCCBPayJS.dialog("clear");
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
                                                                                                                                                                            BCCBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                    BCCBPayJS.dialog('close');
                                                                                                                                                                                    BCCBPayJS.dialog('clear');
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
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) <= BCCBCThkMin) {
                                                                                                                            south.html("封头加强板厚度不能小于等于 " + BCCBCThkMin + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) > BCCBCThkMax) {
                                                                                                                            south.html("封头加强板厚度不能大于 " + BCCBCThkMax + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                                    && parseFloat(rows[19][columns[0][1].field]) >= BCCBTHKCN) {
                                                                                                                    south.html("封头腐蚀裕量不能大于等于 " + BCCBTHKCN + " mm").css("color", "red");
                                                                                                                }
                                                                                                            },
                                                                                                            error: function () {
                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) <= BCCBCThkMin) {
                                                                                                        south.html("封头名义厚度不能小于等于 " + BCCBCThkMin + " mm").css("color", "red");
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) > BCCBCThkMax) {
                                                                                                        south.html("封头名义厚度不能大于 " + BCCBCThkMax + " mm").css("color", "red");
                                                                                                    }
                                                                                                }
                                                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                                    && parseFloat(rows[17][columns[0][1].field]) < 0.5 * BCCBSDI) {
                                                                                                    south.html("封头内半径不能小于 " + 0.5 * BCCBSDI + " mm").css("color", "red");
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
                                                                            && parseFloat(rows[12][columns[0][1].field]) <= BCCBSThkMin) {
                                                                            south.html("筒体加强板名义厚度不能小于等于 " + BCCBSThkMin + " mm").css("color", "red");
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) > BCCBSThkMax) {
                                                                            south.html("筒体加强板名义厚度不能大于 " + BCCBSThkMax + " mm").css("color", "red");
                                                                        }
                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCCBTHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCCBTHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCCBSThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + BCCBSThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCCBSThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + BCCBSThkMax + " mm").css("color", "red");
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