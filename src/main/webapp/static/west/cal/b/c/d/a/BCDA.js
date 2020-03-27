$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bcdad2 = $("#d2");
    let bcdad3 = $("#d3");
    let bcdad2d3 = $('#d2d3');

    $("#cal").html("<table id='bcda'></table>");
    let pg = $("#bcda");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/d/a/BCDA.json", function (result) {

        // 设计温度
        let BCDADT;

        // 许用压缩应力
        let BCDAOTCR = -1;

        // 材料
        let BCDASCategory, BCDASCategoryVal, BCDASType, BCDASTypeVal, BCDASSTD, BCDASSTDVal, BCDASName,
            BCDACCategory, BCDACCategoryVal, BCDACType, BCDACTypeVal, BCDACSTD, BCDACSTDVal, BCDACName;

        // propertyGrid
        let columns, rows, ed;

        // 2D Sketch
        function bcda2d(di = "ϕDi", thksn = "δsn", thksrn = "δsrn", ri = "Ri", thkcn = "δcn", thkcrn = "δcrn", l = "L") {

            bcdad2.empty();

            let width = bcdad2.width();
            let height = bcdad2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "BCDASVG")
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
                ])).attr("id", "BCDASketchDI").classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#BCDASketchDI").attr("startOffset", "50%").text(text);

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

            // 筒体内壁
            drawLine(padding, height - padding, width - padding, height - padding);
            drawLine(padding, padding, width - padding, padding);
            // 左侧筒体端部
            drawLine(padding, padding - thickness, padding, height - padding + thickness);
            // 右侧筒体端部
            drawLine(width - padding, padding - thickness, width - padding, height - padding + thickness);
            // 左侧筒体上外壁
            drawLine(padding, padding - thickness, width / 2 - 100, padding - thickness);
            // 左侧筒体下外壁
            drawLine(padding, height - padding + thickness, width / 2 - 100, height - padding + thickness);
            // 右侧侧筒体上外壁
            drawLine(width / 2 + 100, padding - thickness, width - padding, padding - thickness);
            // 右侧侧筒体下外壁
            drawLine(width / 2 + 100, height - padding + thickness, width - padding, height - padding + thickness);

            // 筒体截断线
            drawLine(width / 2 - 100, padding - thickness, width / 2 - 100, padding);
            drawLine(width / 2 - 100, height - padding, width / 2 - 100, height - padding + thickness);
            drawLine(width / 2 + 100, padding - thickness, width / 2 + 100, padding);
            drawLine(width / 2 + 100, height - padding, width / 2 + 100, height - padding + thickness);

            // 削边线
            drawLine(width / 2 - 100, padding - thickness, width / 2 - 100 + 30, padding - 2 * thickness);
            drawLine(width / 2 - 100, height - padding + thickness, width / 2 - 100 + 30, height - padding + 2 * thickness);
            drawLine(width / 2 + 100 - 30, padding - 2 * thickness, width / 2 + 100, padding - thickness);
            drawLine(width / 2 + 100 - 30, height - padding + 2 * thickness, width / 2 + 100, height - padding + thickness);

            // 加强段外壁
            drawLine(width / 2 - 100 + 30, padding - 2 * thickness, width / 2 + 100 - 30, padding - 2 * thickness);
            drawLine(width / 2 - 100 + 30, height - padding + 2 * thickness, width / 2 + 100 - 30, height - padding + 2 * thickness);

            // 封头轮廓
            let BCDARI = height - 2 * padding;
            let BCDARM = height - 2 * padding + thickness;
            let BCDARO = height - 2 * padding + 2 * thickness;

            // 圆心坐标
            let centerX = width / 2 - BCDARI * Math.cos(Math.PI / 6) - thickness;
            let centerY = height / 2;

            // 内壁
            let innerArcTopX = centerX + BCDARI * Math.cos(Math.PI / 6);
            let innerArcTopY = padding;
            let innerArcBottomX = centerX + BCDARI * Math.cos(Math.PI / 6);
            let innerArcBottomY = height - padding;
            drawArc(BCDARI, BCDARI, innerArcTopX, innerArcTopY, innerArcBottomX, innerArcBottomY);

            // 上侧加强段外壁
            let outerArcTopStartX = centerX + Math.sqrt(BCDARO * BCDARO - BCDARI * BCDARI / 4);
            let outerArcTopStartY = padding;
            let outerArcTopEndX = centerX + BCDARO * Math.cos(Math.PI / 9);
            let outerArcTopEndY = centerY - BCDARO * Math.sin(Math.PI / 9);
            drawArc(BCDARO, BCDARO, outerArcTopStartX, outerArcTopStartY, outerArcTopEndX, outerArcTopEndY);

            // 下侧加强段外壁
            let outerArcBottomStartX = outerArcTopEndX;
            let outerArcBottomStartY = height - outerArcTopEndY;
            let outerArcBottomEndX = outerArcTopStartX;
            let outerArcBottomEndY = height - outerArcTopStartY;
            drawArc(BCDARO, BCDARO, outerArcBottomStartX, outerArcBottomStartY, outerArcBottomEndX, outerArcBottomEndY);

            // 球冠区外壁
            let midArcStartX = centerX + BCDARM * Math.cos(Math.PI / 12);
            let midArcStartY = centerY - BCDARM * Math.sin(Math.PI / 12);
            let midArcEndX = centerX + BCDARM * Math.cos(Math.PI / 12);
            let midArcEndY = centerY + BCDARM * Math.sin(Math.PI / 12);
            drawArc(BCDARM, BCDARM, midArcStartX, midArcStartY, midArcEndX, midArcEndY);

            // 封头界限
            drawLine(midArcStartX, midArcStartY, centerX + BCDARI * Math.cos(Math.PI / 12), centerY - BCDARI * Math.sin(Math.PI / 12));
            drawLine(midArcEndX, midArcEndY, centerX + BCDARI * Math.cos(Math.PI / 12), centerY + BCDARI * Math.sin(Math.PI / 12));

            // 封头削边
            drawLine(midArcStartX, midArcStartY, outerArcTopEndX, outerArcTopEndY);
            drawLine(midArcEndX, midArcEndY, outerArcBottomStartX, outerArcBottomStartY);

            // 中心线
            drawCenterLine(padding - 10, height / 2, padding + 50, height / 2);
            drawCenterLine(padding + 75, height / 2, width - padding + 10, height / 2);

            // 筒体内直径
            dimLeftV(padding, height - padding, padding, padding, di, "BCDASketchSDI");

            // 筒体厚度
            drawLine(padding - 30, padding - thickness, padding - 30, padding);
            drawLine(padding - 40, padding - thickness, padding - 3, padding - thickness);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding - 30, y: padding - thickness},
                    {x: padding - 30 - 3, y: padding - thickness - 15},
                    {x: padding - 30 + 3, y: padding - thickness - 15},
                    {x: padding - 30, y: padding - thickness}
                ]));
            svg.append("path").attr("d", line([
                {x: padding - 30, y: padding - thickness - 15},
                {x: padding - 30, y: padding - thickness - 15 - 40}
            ])).attr("id", "BCDASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 筒体加强段厚度
            drawLine(width / 2 - 100 + 50, padding, width / 2 - 100 + 50, padding - 2 * thickness);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - 100 + 50, y: padding - 2 * thickness},
                    {x: width / 2 - 100 + 50 - 3, y: padding - 2 * thickness - 15},
                    {x: width / 2 - 100 + 50 + 3, y: padding - 2 * thickness - 15},
                    {x: width / 2 - 100 + 50, y: padding - 2 * thickness}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - 100 + 50, y: padding - 2 * thickness - 15},
                {x: width / 2 - 100 + 50, y: padding - 2 * thickness - 15 - 40}
            ])).attr("id", "BCDASketchTHKSRN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDASketchTHKSRN").attr("startOffset", "50%").text(thksrn);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - 100 + 50, y: padding},
                    {x: width / 2 - 100 + 50 - 3, y: padding + 15},
                    {x: width / 2 - 100 + 50 + 3, y: padding + 15},
                    {x: width / 2 - 100 + 50, y: padding}
                ]));
            drawLine(width / 2 - 100 + 50, padding + 15, width / 2 - 100 + 50, padding + 30);

            // L
            drawLine(width / 2 - 100, height - padding + thickness + 3, width / 2 - 100, height - padding + 2 * thickness + 40);
            drawLine(innerArcTopX, height - padding + 3, innerArcTopX, height - padding + 2 * thickness + 40);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: innerArcBottomX, y: height - padding + 2 * thickness + 30},
                    {x: innerArcBottomX - 15, y: height - padding + 2 * thickness + 30 - 3},
                    {x: innerArcBottomX - 15, y: height - padding + 2 * thickness + 30 + 3},
                    {x: innerArcBottomX, y: height - padding + 2 * thickness + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - 100 + 15, y: height - padding + 2 * thickness + 30},
                {x: innerArcBottomX - 15, y: height - padding + 2 * thickness + 30}
            ])).attr("id", "BCDASketchLL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDASketchLL").attr("startOffset", "50%").text(l);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - 100, y: height - padding + 2 * thickness + 30},
                    {x: width / 2 - 100 + 15, y: height - padding + 2 * thickness + 30 - 3},
                    {x: width / 2 - 100 + 15, y: height - padding + 2 * thickness + 30 + 3},
                    {x: width / 2 - 100, y: height - padding + 2 * thickness + 30}
                ]));

            // L
            drawLine(width / 2 + 100, height - padding + thickness + 3, width / 2 + 100, height - padding + 2 * thickness + 40);
            drawLine(outerArcBottomEndX, height - padding + 3, outerArcBottomEndX, height - padding + 2 * thickness + 40);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: outerArcBottomEndX, y: height - padding + 2 * thickness + 30},
                    {x: outerArcBottomEndX + 15, y: height - padding + 2 * thickness + 30 - 3},
                    {x: outerArcBottomEndX + 15, y: height - padding + 2 * thickness + 30 + 3},
                    {x: outerArcBottomEndX, y: height - padding + 2 * thickness + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: outerArcBottomEndX + 15, y: height - padding + 2 * thickness + 30},
                {x: width / 2 + 100 - 15, y: height - padding + 2 * thickness + 30}
            ])).attr("id", "BCDASketchLR").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCDASketchLR").attr("startOffset", "50%").text(l);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 + 100, y: height - padding + 2 * thickness + 30},
                    {x: width / 2 + 100 - 15, y: height - padding + 2 * thickness + 30 - 3},
                    {x: width / 2 + 100 - 15, y: height - padding + 2 * thickness + 30 + 3},
                    {x: width / 2 + 100, y: height - padding + 2 * thickness + 30}
                ]));

            // 封头球冠区
            let ang = 4;
            svg.append("path").attr("d", line([
                {x: centerX, y: centerY},
                {x: centerX + BCDARI, y: centerY}
            ])).attr("id", "BCDASketchRi").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCDASketchRi").attr("startOffset", "50%").text(ri);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + BCDARI, y: centerY},
                    {x: centerX + BCDARI - 15, y: centerY - 3},
                    {x: centerX + BCDARI - 15, y: centerY + 3},
                    {x: centerX + BCDARI, y: centerY}
                ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

            svg.append("path").attr("d", line([
                {x: centerX + BCDARI, y: centerY},
                {x: centerX + BCDARM, y: centerY}
            ])).classed("sketch", true).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");

            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + BCDARM, y: centerY},
                    {x: centerX + BCDARM + 15, y: centerY - 3},
                    {x: centerX + BCDARM + 15, y: centerY + 3},
                    {x: centerX + BCDARM, y: centerY}
                ])).attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + BCDARM + 15, y: centerY},
                {x: centerX + BCDARM + 60, y: centerY}
            ])).attr("id", "BCDASketchTHKCN").classed("sketch", true)
                .attr("transform", "rotate(" + -ang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCDASketchTHKCN").attr("startOffset", "50%").text(thkcn);
            let oppang = Math.asin(BCDARI / 2 / BCDARO) / Math.PI * 180 - ang;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + BCDARI, y: centerY},
                    {x: centerX + BCDARI - 15, y: centerY - 3},
                    {x: centerX + BCDARI - 15, y: centerY + 3},
                    {x: centerX + BCDARI, y: centerY}
                ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + BCDARI - 15, y: centerY},
                {x: centerX + BCDARI - 30, y: centerY}
            ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + BCDARO, y: centerY},
                {x: centerX + BCDARI, y: centerY}
            ])).classed("sketch", true).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: centerX + BCDARO, y: centerY},
                    {x: centerX + BCDARO + 15, y: centerY - 3},
                    {x: centerX + BCDARO + 15, y: centerY + 3},
                    {x: centerX + BCDARO, y: centerY}
                ])).attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("path").attr("d", line([
                {x: centerX + BCDARO + 15, y: centerY},
                {x: centerX + BCDARO + 50, y: centerY}
            ])).attr("id", "BCDASketchTHKCRN").classed("sketch", true)
                .attr("transform", "rotate(" + oppang + ", " + centerX + " " + centerY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#BCDASketchTHKCRN").attr("startOffset", "50%").text(thkcrn);
        }

        currentTabIndex = bcdad2d3.tabs('getTabIndex', bcdad2d3.tabs('getSelected'));

        // 初始化 Sketch
        if (currentTabIndex === 0) {
            bcda2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bcda").length > 0) {
                    bcda2d();
                }
            });
        }
        bcdad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcda2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bcda").length > 0) {
                            bcda2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 球冠形中间封头内压计算",
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
                    $(ed.target).combobox("loadData", BCDASCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", BCDASType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCDASSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCDASName);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCDACCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCDACType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCDACSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BCDACName);
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
                    bcdad2.empty();

                    // model
                    bcdad3.empty();

                    // sketch
                    currentTabIndex = bcdad2d3.tabs('getTabIndex', bcdad2d3.tabs('getSelected'));

                    // 初始化 Sketch
                    if (currentTabIndex === 0) {
                        bcda2d();
                        bcdad2.off("resize").on("resize", function () {
                            if ($("#bcda").length > 0) {
                                bcda2d();
                            }
                        });
                    }
                    bcdad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcda2d();
                                bcdad2.off("resize").on("resize", function () {
                                    if ($("#bcda").length > 0) {
                                        bcda2d();
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

                        BCDADT = parseFloat(changes.value);

                        if (BCDADT <= 100) {
                            BCDAOTCR = 103;
                        }
                        else if (BCDADT > 100 && BCDADT <= 200) {
                            BCDAOTCR = 100;
                        }
                        else if (BCDADT > 200 && BCDADT <= 250) {
                            BCDAOTCR = 95;
                        }
                        else if (BCDADT > 250 && BCDADT <= 350) {
                            BCDAOTCR = 80;
                        }

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        BCDASCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCDASType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDASName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCDACCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCDACType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDACSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCDACName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDASCategory = [];
                                BCDACCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCDADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        BCDASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCDACCategory[index] = {
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

                        BCDASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCDASType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDASCategoryVal,
                                temp: BCDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDASType = [];
                                $(result).each(function (index, element) {
                                    BCDASType[index] = {
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

                        BCDASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCDASSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDASCategoryVal,
                                type: BCDASTypeVal,
                                temp: BCDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDASSTD = [];
                                $(result).each(function (index, element) {
                                    BCDASSTD[index] = {
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

                        BCDASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCDASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDASCategoryVal,
                                type: BCDASTypeVal,
                                std: BCDASSTDVal,
                                temp: BCDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDASName = [];
                                $(result).each(function (index, element) {
                                    BCDASName[index] = {
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

                        BCDACCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCDACType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDACSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCDACName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDACCategoryVal,
                                temp: BCDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDACType = [];
                                $(result).each(function (index, element) {
                                    BCDACType[index] = {
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

                        BCDACTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCDACSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCDACName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDACCategoryVal,
                                type: BCDACTypeVal,
                                temp: BCDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDACSTD = [];
                                $(result).each(function (index, element) {
                                    BCDACSTD[index] = {
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

                        BCDACSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BCDACName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCDACCategoryVal,
                                type: BCDACTypeVal,
                                std: BCDACSTDVal,
                                temp: BCDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCDACName = [];
                                $(result).each(function (index, element) {
                                    BCDACName[index] = {
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
                            let BCDAPD = parseFloat(rows[0][columns[0][1].field]);

                            // 静压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let BCDAPS = parseFloat(rows[2][columns[0][1].field]);

                                // 计算压力
                                let BCDAPC = BCDAPD + BCDAPS;

                                // 试验类型
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let BCDATest = rows[3][columns[0][1].field];

                                    // 筒体材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let BCDASNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取筒体材料密度、最大最小厚度
                                        let BCDADS, BCDASThkMin, BCDASThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BCDASCategoryVal,
                                                "type": BCDASTypeVal,
                                                "std": BCDASSTDVal,
                                                "name": BCDASNameVal,
                                                "temp": BCDADT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BCDADS = parseFloat(result.density);
                                                BCDASThkMin = parseFloat(result.thkMin);
                                                BCDASThkMax = parseFloat(result.thkMax);

                                                // 筒体内直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let BCDASDI = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        bcda2d("Φ" + BCDASDI);
                                                        bcdad2.off("resize").on("resize", function () {
                                                            if ($("#bcda").length > 0) {
                                                                bcda2d("Φ" + BCDASDI);
                                                            }
                                                        });
                                                    }
                                                    bcdad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                bcda2d("Φ" + BCDASDI);
                                                                bcdad2.off("resize").on("resize", function () {
                                                                    if ($("#bcda").length > 0) {
                                                                        bcda2d("Φ" + BCDASDI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 筒体名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCDASThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCDASThkMax) {
                                                        let BCDATHKSN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bcda2d("Φ" + BCDASDI, BCDATHKSN);
                                                            bcdad2.off("resize").on("resize", function () {
                                                                if ($("#bcda").length > 0) {
                                                                    bcda2d("Φ" + BCDASDI, BCDATHKSN);
                                                                }
                                                            });
                                                        }
                                                        bcdad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bcda2d("Φ" + BCDASDI, BCDATHKSN);
                                                                    bcdad2.off("resize").on("resize", function () {
                                                                        if ($("#bcda").length > 0) {
                                                                            bcda2d("Φ" + BCDASDI, BCDATHKSN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BCDASDO = BCDASDI + 2 * BCDATHKSN;

                                                        let BCDAOST, BCDAOS, BCDARSREL, BCDACS1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": BCDASCategoryVal,
                                                                "type": BCDASTypeVal,
                                                                "std": BCDASSTDVal,
                                                                "name": BCDASNameVal,
                                                                "thk": BCDATHKSN,
                                                                "temp": BCDADT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": BCDASDO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                BCDAOST = parseFloat(result.ot);
                                                                if (BCDAOST < 0) {
                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDAOS = parseFloat(result.o);
                                                                if (BCDAOS < 0) {
                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDARSREL = parseFloat(result.rel);
                                                                if (BCDARSREL < 0) {
                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                BCDACS1 = parseFloat(result.c1);
                                                                if (BCDACS1 < 0) {
                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }

                                                                // 筒体腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < BCDATHKSN) {
                                                                    let BCDACS2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 筒体焊接接头系数
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                                                        let BCDAES = parseFloat(rows[11][columns[0][1].field]);

                                                                        // 筒体厚度附加量C
                                                                        let BCDACS = BCDACS1 + BCDACS2;

                                                                        // 筒体有效厚度
                                                                        let BCDATHKSE = BCDATHKSN - BCDACS;

                                                                        // 筒体计算厚度
                                                                        let BCDATHKSC = BCDAPC * BCDASDI / (2 * BCDAOST * BCDAES);

                                                                        // 筒体设计厚度
                                                                        let BCDATHKSD = BCDATHKSC + BCDACS2;

                                                                        // 所需厚度提示信息
                                                                        south.html(
                                                                            "<span style='color:#444444;'>" +
                                                                            "筒体(非加强段)所需厚度：" + (BCDATHKSD + BCDACS1).toFixed(2) + " mm" +
                                                                            "</span>");

                                                                        // 筒体厚度校核
                                                                        let BCDATHKSCHK;
                                                                        if (BCDATHKSN >= (BCDATHKSD + BCDACS1).toFixed(2)) {
                                                                            south.append(
                                                                                "<span style='color:#444444;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCDATHKSN + " mm" +
                                                                                "</span>");
                                                                            BCDATHKSCHK = "合格";
                                                                        }
                                                                        else {
                                                                            south.append(
                                                                                "<span style='color:red;'>" +
                                                                                "&ensp;|&ensp;" +
                                                                                "输入厚度：" + BCDATHKSN + " mm" +
                                                                                "</span>");
                                                                            BCDATHKSCHK = "不合格";
                                                                        }

                                                                        // 筒体加强段名义厚度
                                                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) >= BCDATHKSN
                                                                            && parseFloat(rows[12][columns[0][1].field]) <= BCDASThkMax) {
                                                                            let BCDATHKSRN = parseFloat(rows[12][columns[0][1].field]);

                                                                            // Sketch
                                                                            if (currentTabIndex === 0) {
                                                                                bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN);
                                                                                bcdad2.off("resize").on("resize", function () {
                                                                                    if ($("#bcda").length > 0) {
                                                                                        bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN);
                                                                                    }
                                                                                });
                                                                            }
                                                                            bcdad2d3.tabs({
                                                                                onSelect: function (title, index) {
                                                                                    if (index === 0) {
                                                                                        bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN);
                                                                                        bcdad2.off("resize").on("resize", function () {
                                                                                            if ($("#bcda").length > 0) {
                                                                                                bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });

                                                                            let BCDASRDO = BCDASDI + 2 * BCDATHKSRN;

                                                                            let BCDAOSRT, BCDAOSR, BCDARSRREL, BCDACSR1;
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                contentType: "application/json; charset=utf-8",
                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                async: true,
                                                                                dataType: "json",
                                                                                data: JSON.stringify({
                                                                                    "category": BCDASCategoryVal,
                                                                                    "type": BCDASTypeVal,
                                                                                    "std": BCDASSTDVal,
                                                                                    "name": BCDASNameVal,
                                                                                    "thk": BCDATHKSRN,
                                                                                    "temp": BCDADT,
                                                                                    "highLow": 3,
                                                                                    "isTube": 0,
                                                                                    "od": BCDASRDO
                                                                                }),
                                                                                beforeSend: function () {
                                                                                },
                                                                                success: function (result) {

                                                                                    BCDAOSRT = parseFloat(result.ot);
                                                                                    if (BCDAOSRT < 0) {
                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCDAOSR = parseFloat(result.o);
                                                                                    if (BCDAOSR < 0) {
                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCDARSRREL = parseFloat(result.rel);
                                                                                    if (BCDARSRREL < 0) {
                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                        return false;
                                                                                    }
                                                                                    BCDACSR1 = parseFloat(result.c1);
                                                                                    if (BCDACSR1 < 0) {
                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                        return false;
                                                                                    }

                                                                                    // 筒体加强段厚度附加量
                                                                                    let BCDACSR = BCDACSR1 + BCDACS2;

                                                                                    // 筒体加强段有效厚度
                                                                                    let BCDATHKSRE = BCDATHKSRN - BCDACSR;

                                                                                    // 封头材料名称
                                                                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                                                        let BCDACNameVal = rows[16][columns[0][1].field];

                                                                                        // AJAX 获取封头材料密度、最大最小厚度
                                                                                        let BCDADC, BCDACThkMin,
                                                                                            BCDACThkMax;
                                                                                        $.ajax({
                                                                                            type: "POST",
                                                                                            contentType: "application/json; charset=utf-8",
                                                                                            url: "web_get_nbt_47003_1_2009_index.action",
                                                                                            async: true,
                                                                                            dataType: "json",
                                                                                            data: JSON.stringify({
                                                                                                "category": BCDACCategoryVal,
                                                                                                "type": BCDACTypeVal,
                                                                                                "std": BCDACSTDVal,
                                                                                                "name": BCDACNameVal,
                                                                                                "temp": BCDADT
                                                                                            }),
                                                                                            beforeSend: function () {
                                                                                            },
                                                                                            success: function (result) {

                                                                                                BCDADC = parseFloat(result.density);
                                                                                                BCDACThkMin = parseFloat(result.thkMin);
                                                                                                BCDACThkMax = parseFloat(result.thkMax);

                                                                                                // 封头内半径
                                                                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                                    && parseFloat(rows[17][columns[0][1].field]) >= 0.5 * BCDASDI) {
                                                                                                    let BCDACRI = parseFloat(rows[17][columns[0][1].field]);

                                                                                                    // Sketch
                                                                                                    if (currentTabIndex === 0) {
                                                                                                        bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI);
                                                                                                        bcdad2.off("resize").on("resize", function () {
                                                                                                            if ($("#bcda").length > 0) {
                                                                                                                bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    bcdad2d3.tabs({
                                                                                                        onSelect: function (title, index) {
                                                                                                            if (index === 0) {
                                                                                                                bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI);
                                                                                                                bcdad2.off("resize").on("resize", function () {
                                                                                                                    if ($("#bcda").length > 0) {
                                                                                                                        bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI);
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }
                                                                                                    });

                                                                                                    // 球壳切线与圆筒壁夹角 alpha(弧度)
                                                                                                    let BCDAALPHA = Math.acos(BCDASDI / (2 * BCDACRI));

                                                                                                    // 度数
                                                                                                    let BCDADEGREE = BCDAALPHA / Math.PI * 180;

                                                                                                    // 封头名义厚度
                                                                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) > BCDACThkMin
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) <= BCDACThkMax) {
                                                                                                        let BCDATHKCN = parseFloat(rows[18][columns[0][1].field]);

                                                                                                        // Sketch
                                                                                                        if (currentTabIndex === 0) {
                                                                                                            bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN);
                                                                                                            bcdad2.off("resize").on("resize", function () {
                                                                                                                if ($("#bcda").length > 0) {
                                                                                                                    bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        bcdad2d3.tabs({
                                                                                                            onSelect: function (title, index) {
                                                                                                                if (index === 0) {
                                                                                                                    bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN);
                                                                                                                    bcdad2.off("resize").on("resize", function () {
                                                                                                                        if ($("#bcda").length > 0) {
                                                                                                                            bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN);
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                            }
                                                                                                        });

                                                                                                        let BCDACRO = BCDACRI + BCDATHKCN;

                                                                                                        let BCDAOCT,
                                                                                                            BCDAOC,
                                                                                                            BCDARCREL,
                                                                                                            BCDACC1;
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                "category": BCDACCategoryVal,
                                                                                                                "type": BCDACTypeVal,
                                                                                                                "std": BCDACSTDVal,
                                                                                                                "name": BCDACNameVal,
                                                                                                                "thk": BCDATHKCN,
                                                                                                                "temp": BCDADT,
                                                                                                                "highLow": 3,
                                                                                                                "isTube": 0,
                                                                                                                "od": BCDACRO * 2
                                                                                                            }),
                                                                                                            beforeSend: function () {
                                                                                                            },
                                                                                                            success: function (result) {

                                                                                                                BCDAOCT = parseFloat(result.ot);
                                                                                                                if (BCDAOCT < 0) {
                                                                                                                    south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCDAOC = parseFloat(result.o);
                                                                                                                if (BCDAOC < 0) {
                                                                                                                    south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCDARCREL = parseFloat(result.rel);
                                                                                                                if (BCDARCREL < 0) {
                                                                                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }
                                                                                                                BCDACC1 = parseFloat(result.c1);
                                                                                                                if (BCDACC1 < 0) {
                                                                                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                    return false;
                                                                                                                }

                                                                                                                // 封头腐蚀裕量
                                                                                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                                    && parseFloat(rows[19][columns[0][1].field]) < BCDATHKCN) {
                                                                                                                    let BCDACC2 = parseFloat(rows[19][columns[0][1].field]);

                                                                                                                    // 封头厚度附加量
                                                                                                                    let BCDACC = BCDACC1 + BCDACC2;

                                                                                                                    // 封头有效厚度
                                                                                                                    let BCDATHKCE = BCDATHKCN - BCDACC;

                                                                                                                    // 封头焊接接头系数
                                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                                                                                        let BCDAEC = parseFloat(rows[20][columns[0][1].field]);

                                                                                                                        // 封头计算厚度
                                                                                                                        let BCDATHKCC = BCDAPC * BCDASDI / (2 * BCDAOCT * BCDAEC);

                                                                                                                        // 设计厚度
                                                                                                                        let BCDATHKCD = BCDATHKCC + BCDACC2;

                                                                                                                        // 所需厚度提示信息
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头(非加强段)所需厚度：" + (BCDATHKCD + BCDACC1).toFixed(2) + " mm" +
                                                                                                                            "</span>");

                                                                                                                        // 封头厚度校核
                                                                                                                        let BCDATHKCCHK;
                                                                                                                        if (BCDATHKCN >= (BCDATHKCD + BCDACC1).toFixed(2)) {
                                                                                                                            south.append(
                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "输入厚度：" + BCDATHKCN + " mm" +
                                                                                                                                "</span>");
                                                                                                                            BCDATHKCCHK = "合格";
                                                                                                                        } else {
                                                                                                                            south.append(
                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                "输入厚度：" + BCDATHKCN + " mm" +
                                                                                                                                "</span>");
                                                                                                                            BCDATHKCCHK = "不合格";
                                                                                                                        }

                                                                                                                        // 封头加强段名义厚度
                                                                                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) >= BCDATHKCN
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) <= BCDACThkMax) {
                                                                                                                            let BCDATHKCRN = parseFloat(rows[21][columns[0][1].field]);

                                                                                                                            // Sketch
                                                                                                                            if (currentTabIndex === 0) {
                                                                                                                                bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN, BCDATHKCRN);
                                                                                                                                bcdad2.off("resize").on("resize", function () {
                                                                                                                                    if ($("#bcda").length > 0) {
                                                                                                                                        bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN, BCDATHKCRN);
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            }
                                                                                                                            bcdad2d3.tabs({
                                                                                                                                onSelect: function (title, index) {
                                                                                                                                    if (index === 0) {
                                                                                                                                        bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN, BCDATHKCRN);
                                                                                                                                        bcdad2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bcda").length > 0) {
                                                                                                                                                bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN, BCDATHKCRN);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            });

                                                                                                                            // 封头加强段外直径
                                                                                                                            let BCDACRDO = 2 * (BCDACRI + BCDATHKCRN);

                                                                                                                            // 封头加强段性质
                                                                                                                            let BCDAOCRT,
                                                                                                                                BCDAOCR,
                                                                                                                                BCDARCRREL,
                                                                                                                                BCDACCR1;
                                                                                                                            $.ajax({
                                                                                                                                type: "POST",
                                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                                url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                                                                                async: true,
                                                                                                                                dataType: "json",
                                                                                                                                data: JSON.stringify({
                                                                                                                                    "category": BCDACCategoryVal,
                                                                                                                                    "type": BCDACTypeVal,
                                                                                                                                    "std": BCDACSTDVal,
                                                                                                                                    "name": BCDACNameVal,
                                                                                                                                    "thk": BCDATHKCRN,
                                                                                                                                    "temp": BCDADT,
                                                                                                                                    "highLow": 3,
                                                                                                                                    "isTube": 0,
                                                                                                                                    "od": BCDACRDO
                                                                                                                                }),
                                                                                                                                beforeSend: function () {
                                                                                                                                },
                                                                                                                                success: function (result) {

                                                                                                                                    BCDAOCRT = parseFloat(result.ot);
                                                                                                                                    if (BCDAOCRT < 0) {
                                                                                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDAOCR = parseFloat(result.o);
                                                                                                                                    if (BCDAOCR < 0) {
                                                                                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDARCRREL = parseFloat(result.rel);
                                                                                                                                    if (BCDARCRREL < 0) {
                                                                                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }
                                                                                                                                    BCDACCR1 = parseFloat(result.c1);
                                                                                                                                    if (BCDACCR1 < 0) {
                                                                                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                                        return false;
                                                                                                                                    }

                                                                                                                                    // 封头加强段厚度附加量
                                                                                                                                    let BCDACCR = BCDACCR1 + BCDACC2;

                                                                                                                                    // 封头加强段有效厚度
                                                                                                                                    let BCDATHKCRE = BCDATHKCRN - BCDACCR;

                                                                                                                                    // t2s
                                                                                                                                    let BCDAT2S = BCDACRI * BCDAPC;

                                                                                                                                    let BCDAT1 = 0.5 * BCDACRI * BCDAPC;

                                                                                                                                    let BCDAT2 = 0.5 * BCDACRI * BCDAPC;

                                                                                                                                    let BCDAWS = 0.6 * Math.sqrt(BCDACRI * BCDATHKSRE);
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "筒体加强段单侧最小宽度：" + BCDAWS.toFixed(4) + " mm" +
                                                                                                                                        "</span>");

                                                                                                                                    // Sketch
                                                                                                                                    if (currentTabIndex === 0) {
                                                                                                                                        bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN, BCDATHKCRN, ">=" + BCDAWS.toFixed(2));
                                                                                                                                        bcdad2.off("resize").on("resize", function () {
                                                                                                                                            if ($("#bcda").length > 0) {
                                                                                                                                                bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN, BCDATHKCRN, ">=" + BCDAWS.toFixed(2));
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                    bcdad2d3.tabs({
                                                                                                                                        onSelect: function (title, index) {
                                                                                                                                            if (index === 0) {
                                                                                                                                                bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN, BCDATHKCRN, ">=" + BCDAWS.toFixed(2));
                                                                                                                                                bcdad2.off("resize").on("resize", function () {
                                                                                                                                                    if ($("#bcda").length > 0) {
                                                                                                                                                        bcda2d("Φ" + BCDASDI, BCDATHKSN, BCDATHKSRN, "SR" + BCDACRI, BCDATHKCN, BCDATHKCRN, ">=" + BCDAWS.toFixed(2));
                                                                                                                                                    }
                                                                                                                                                });
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    });

                                                                                                                                    let BCDAWC = 0.6 * Math.sqrt(BCDACRI * BCDATHKCRE);
                                                                                                                                    south.append(
                                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                                        "封头加强段最小宽度：" + BCDAWC.toFixed(4) + " mm" +
                                                                                                                                        "</span>");

                                                                                                                                    let BCDAQ = BCDAT2 * BCDAWC + BCDAT2S * BCDAWS - BCDAT2 * BCDACRI * Math.sin(BCDAALPHA);

                                                                                                                                    let BCDAA = -1,
                                                                                                                                        BCDAAR = -1,
                                                                                                                                        BCDAARCHK = -1,
                                                                                                                                        BCDAWCSINALPHA = -1,
                                                                                                                                        BCDARI00752 = -1,
                                                                                                                                        BCDAWCSINALPHACHK = -1;

                                                                                                                                    if (BCDAQ < 0) {

                                                                                                                                        BCDAA = Math.abs(BCDAQ) / BCDAOTCR;
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处所需总承压面积：" + BCDAA.toFixed(4) + " mm²" +
                                                                                                                                            "</span>");
                                                                                                                                        BCDAAR = BCDAA - 2 * BCDAWS * BCDATHKSRE - BCDAWC * BCDATHKCRE;
                                                                                                                                        if (BCDAAR <= 0) {
                                                                                                                                            BCDAARCHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (2 * BCDAWS * BCDATHKSRE + BCDAWC * BCDATHKCRE).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCDAARCHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (2 * BCDAWS * BCDATHKSRE + BCDAWC * BCDATHKCRE).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                        BCDARI00752 = 0.0075 * 2 * BCDACRI;
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处防止失稳所需的加强段最小径向投影长度：" + BCDARI00752.toFixed(4) + " mm" +
                                                                                                                                            "</span>");

                                                                                                                                        BCDAWCSINALPHA = BCDAWC * Math.sin(BCDAALPHA);
                                                                                                                                        if (BCDAWCSINALPHA >= BCDARI00752) {
                                                                                                                                            BCDAWCSINALPHACHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际径向投影长度：" + BCDAWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCDAWCSINALPHACHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际径向投影长度：" + BCDAWCSINALPHA.toFixed(4) + " mm" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                    } else {

                                                                                                                                        BCDAA = Math.abs(BCDAQ) / Math.min(BCDAEC * BCDAOCRT, BCDAES * BCDAOSRT);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "封头与筒体连接处所需总承压面积：" + BCDAA.toFixed(4) + " mm²" +
                                                                                                                                            "</span>");
                                                                                                                                        BCDAAR = BCDAA - 2 * BCDAWS * BCDATHKSRE - BCDAWC * BCDATHKCRE;
                                                                                                                                        if (BCDAAR <= 0) {
                                                                                                                                            BCDAARCHK = "合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (2 * BCDAWS * BCDATHKSRE + BCDAWC * BCDATHKCRE).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        } else {
                                                                                                                                            BCDAARCHK = "不合格";
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:red;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "实际承压面积：" + (2 * BCDAWS * BCDATHKSRE + BCDAWC * BCDATHKCRE).toFixed(4) + " mm²" +
                                                                                                                                                "</span>");
                                                                                                                                        }

                                                                                                                                    }

                                                                                                                                    // 试验压力
                                                                                                                                    let BCDAPCT,
                                                                                                                                        BCDAPCRT,
                                                                                                                                        BCDAPST,
                                                                                                                                        BCDAPSRT,
                                                                                                                                        BCDAPT;
                                                                                                                                    if (BCDATest === "液压试验") {
                                                                                                                                        BCDAPCT = Math.max(1.25 * BCDAPD * BCDAOC / BCDAOCT, 0.05);
                                                                                                                                        BCDAPCRT = Math.max(1.25 * BCDAPD * BCDAOCR / BCDAOCRT, 0.05);
                                                                                                                                        BCDAPST = Math.max(1.25 * BCDAPD * BCDAOS / BCDAOST, 0.05);
                                                                                                                                        BCDAPSRT = Math.max(1.25 * BCDAPD * BCDAOSR / BCDAOSRT, 0.05);
                                                                                                                                        BCDAPT = Math.min(BCDAPCT, BCDAPCRT, BCDAPST, BCDAPSRT);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "压力试验：" + "液压/" + BCDAPT.toFixed(4) + " MPa" +
                                                                                                                                            "</span>");
                                                                                                                                    } else {
                                                                                                                                        BCDAPCT = Math.max(1.10 * BCDAPD * BCDAOC / BCDAOCT, 0.05);
                                                                                                                                        BCDAPCRT = Math.max(1.10 * BCDAPD * BCDAOCR / BCDAOCRT, 0.05);
                                                                                                                                        BCDAPST = Math.max(1.10 * BCDAPD * BCDAOS / BCDAOST, 0.05);
                                                                                                                                        BCDAPSRT = Math.max(1.10 * BCDAPD * BCDAOSR / BCDAOSRT, 0.05);
                                                                                                                                        BCDAPT = Math.min(BCDAPCT, BCDAPCRT, BCDAPST, BCDAPSRT);
                                                                                                                                        south.append(
                                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                                            "压力试验：" + "气压/" + BCDAPT.toFixed(4) + " MPa" +
                                                                                                                                            "</span>");
                                                                                                                                    }

                                                                                                                                    // docx
                                                                                                                                    let BCDAPayJS = $('#payjs');

                                                                                                                                    function getDocx() {
                                                                                                                                        $.ajax({
                                                                                                                                            type: "POST",
                                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                                            url: "bcdadocx.action",
                                                                                                                                            async: true,
                                                                                                                                            dataType: "json",
                                                                                                                                            data: JSON.stringify({
                                                                                                                                                ribbonName: "BCDA",

                                                                                                                                                t: BCDADT,
                                                                                                                                                pd: BCDAPD,
                                                                                                                                                ps: BCDAPS,
                                                                                                                                                sstd: BCDASSTDVal,
                                                                                                                                                sname: BCDASNameVal,
                                                                                                                                                di: BCDASDI,
                                                                                                                                                thksn: BCDATHKSN,
                                                                                                                                                cs2: BCDACS2,
                                                                                                                                                es: BCDAES,
                                                                                                                                                thksrn: BCDATHKSRN,
                                                                                                                                                cstd: BCDACSTDVal,
                                                                                                                                                cname: BCDACNameVal,
                                                                                                                                                ri: BCDACRI,
                                                                                                                                                thkcn: BCDATHKCN,
                                                                                                                                                cc2: BCDACC2,
                                                                                                                                                ec: BCDAEC,
                                                                                                                                                thkcrn: BCDATHKCRN,
                                                                                                                                                test: BCDATest,
                                                                                                                                                dc: BCDADC.toFixed(4),
                                                                                                                                                ds: BCDADS.toFixed(4),
                                                                                                                                                oct: BCDAOCT.toFixed(4),
                                                                                                                                                ost: BCDAOST.toFixed(4),
                                                                                                                                                oc: BCDAOC.toFixed(4),
                                                                                                                                                os: BCDAOS.toFixed(4),
                                                                                                                                                rcrel: BCDARCREL.toFixed(4),
                                                                                                                                                rsrel: BCDARSREL.toFixed(4),
                                                                                                                                                cc1: BCDACC1.toFixed(4),
                                                                                                                                                cs1: BCDACS1.toFixed(4),
                                                                                                                                                ocrt: BCDAOCRT.toFixed(4),
                                                                                                                                                osrt: BCDAOSRT.toFixed(4),
                                                                                                                                                ocr: BCDAOCR.toFixed(4),
                                                                                                                                                osr: BCDAOSR.toFixed(4),
                                                                                                                                                rcrrel: BCDARCRREL.toFixed(4),
                                                                                                                                                rsrrel: BCDARSRREL.toFixed(4),
                                                                                                                                                ccr1: BCDACCR1.toFixed(4),
                                                                                                                                                csr1: BCDACSR1.toFixed(4),
                                                                                                                                                pc: BCDAPC.toFixed(4),
                                                                                                                                                cc: BCDACC.toFixed(4),
                                                                                                                                                thkce: BCDATHKCE.toFixed(4),
                                                                                                                                                ccr: BCDACCR.toFixed(4),
                                                                                                                                                thkcre: BCDATHKCRE.toFixed(4),
                                                                                                                                                cs: BCDACS.toFixed(4),
                                                                                                                                                thkse: BCDATHKSE.toFixed(4),
                                                                                                                                                csr: BCDACSR.toFixed(4),
                                                                                                                                                thksre: BCDATHKSRE.toFixed(4),
                                                                                                                                                alpha: BCDADEGREE.toFixed(4),
                                                                                                                                                otcr: BCDAOTCR.toFixed(4),
                                                                                                                                                thkcc: BCDATHKCC.toFixed(4),
                                                                                                                                                thkcd: BCDATHKCD.toFixed(4),
                                                                                                                                                thkcchk: BCDATHKCCHK,
                                                                                                                                                thksc: BCDATHKSC.toFixed(4),
                                                                                                                                                thksd: BCDATHKSD.toFixed(4),
                                                                                                                                                thkschk: BCDATHKSCHK,
                                                                                                                                                t2s: BCDAT2S.toFixed(4),
                                                                                                                                                t1: BCDAT1.toFixed(4),
                                                                                                                                                t2: BCDAT2.toFixed(4),
                                                                                                                                                ws: BCDAWS.toFixed(4),
                                                                                                                                                wc: BCDAWC.toFixed(4),
                                                                                                                                                q: BCDAQ.toFixed(4),
                                                                                                                                                a: BCDAA.toFixed(4),
                                                                                                                                                ar: BCDAAR.toFixed(4),
                                                                                                                                                archk: BCDAARCHK,
                                                                                                                                                wcsinalpha: BCDAWCSINALPHA.toFixed(4),
                                                                                                                                                ri000752: BCDARI00752.toFixed(4),
                                                                                                                                                wcsinalphachk: BCDAWCSINALPHACHK,
                                                                                                                                                pct: BCDAPCT.toFixed(4),
                                                                                                                                                pcrt: BCDAPCRT.toFixed(4),
                                                                                                                                                pst: BCDAPST.toFixed(4),
                                                                                                                                                psrt: BCDAPSRT.toFixed(4),
                                                                                                                                                pt: BCDAPT.toFixed(4)
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
                                                                                                                                                    BCDAPayJS.dialog({
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
                                                                                                                                                                BCDAPayJS.dialog("close");
                                                                                                                                                                BCDAPayJS.dialog("clear");
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
                                                                                                                                                                            BCDAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                    BCDAPayJS.dialog('close');
                                                                                                                                                                                    BCDAPayJS.dialog('clear');
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
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) < BCDATHKCN) {
                                                                                                                            south.html("封头加强段厚度不能小于 " + BCDATHKCN + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                        else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                            && parseFloat(rows[21][columns[0][1].field]) > BCDACThkMax) {
                                                                                                                            south.html("封头加强段厚度不能大于 " + BCDACThkMax + " mm").css("color", "red");
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                                    && parseFloat(rows[19][columns[0][1].field]) >= BCDATHKCN) {
                                                                                                                    south.html("封头腐蚀裕量不能大于等于 " + BCDATHKCN + " mm").css("color", "red");
                                                                                                                }
                                                                                                            },
                                                                                                            error: function () {
                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) <= BCDACThkMin) {
                                                                                                        south.html("封头名义厚度不能小于等于 " + BCDACThkMin + " mm").css("color", "red");
                                                                                                    }
                                                                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                                        && parseFloat(rows[18][columns[0][1].field]) > BCDACThkMax) {
                                                                                                        south.html("封头名义厚度不能大于 " + BCDACThkMax + " mm").css("color", "red");
                                                                                                    }
                                                                                                }
                                                                                                else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                                                                    && parseFloat(rows[17][columns[0][1].field]) < 0.5 * BCDASDI) {
                                                                                                    south.html("封头内半径不能小于 " + 0.5 * BCDASDI + " mm").css("color", "red");
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
                                                                            && parseFloat(rows[12][columns[0][1].field]) < BCDATHKSN) {
                                                                            south.html("筒体加强段名义厚度不能小于 " + BCDATHKSN + " mm").css("color", "red");
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) > BCDASThkMax) {
                                                                            south.html("筒体加强段名义厚度不能大于 " + BCDASThkMax + " mm").css("color", "red");
                                                                        }
                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= BCDATHKSN) {
                                                                    south.html("筒体腐蚀裕量不能大于等于 " + BCDATHKSN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= BCDASThkMin) {
                                                        south.html("筒体名义厚度不能小于等于 " + BCDASThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > BCDASThkMax) {
                                                        south.html("筒体名义厚度不能大于 " + BCDASThkMax + " mm").css("color", "red");
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