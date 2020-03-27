$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bchaSketch = $("#d2");
    let bchaModel = $("#d3");
    let bchad2d3 = $('#d2d3');

    $("#cal").html("<table id='bcha'></table>");
    let pg = $("#bcha");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/c/h/a/BCHA.json", function (result) {

        let BCHADT,
            BCHAJCategory, BCHAJCategoryVal, BCHAJType, BCHAJTypeVal, BCHAJSTD, BCHAJSTDVal, BCHAJName, BCHAJNameVal,
            BCHASCategory, BCHASCategoryVal, BCHASType, BCHASTypeVal, BCHASSTD, BCHASSTDVal, BCHASName, BCHASNameVal,
            BCHABCategory, BCHABCategoryVal, BCHABType, BCHABTypeVal, BCHABSTD, BCHABSTDVal, BCHABName, BCHABNameVal,
            columns, rows, ed;

        function bcha2d(sdo = "do", thkjn = "δjn",
                        bdi = "Di", thksn = "δsn",
                        thkbn = "δbn",
                        l2 = "L2", l3 = "L3", h = "h", l1 = "L1") {

            bchaSketch.empty();

            let width = bchaSketch.width();
            let height = bchaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BCHASVG").attr("height", height);

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

            let thks = 20;
            let widthGap = (width - 2 * padding) / 8;
            let heightGap = (height - 2 * padding) / 8;

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

            // 管子
            let cx = width / 2;
            let cy = height / 2;
            let thkj = 10;
            let gapJ = 30;
            // 管子内壁
            let ri = Math.min(2 * widthGap, 2 * heightGap);
            let lengthI = Math.sqrt(ri * ri - gapJ * gapJ);
            drawArc(ri, ri, cx - gapJ, cy + lengthI, cx, cy - ri);
            drawArc(ri, ri, cx, cy - ri, cx + gapJ, cy + lengthI);
            // 管子外壁
            let ro = ri + thkj;
            let lengthO = Math.sqrt(ro * ro - (gapJ + thkj) * (gapJ + thkj));
            drawArc(ro, ro, cx - gapJ - thkj, cy + lengthO, cx, cy - ro);
            drawArc(ro, ro, cx, cy - ro, cx + gapJ + thkj, cy + lengthO);
            drawCenterLine(cx - ro - 20, cy, cx + ro + 20, cy);
            drawCenterLine(cx, cy - ro - 20, cx, cy + lengthI - 48);
            drawCenterLine(cx, cy + lengthI - 27, cx, cy + ro + 3 * thks + 10);

            drawLine(cx - gapJ, cy + lengthI, cx - gapJ, cy + ro + 2 * thks);
            drawLine(cx - gapJ, cy + ro + 2 * thks, cx - ro - thks, cy + ro + 2 * thks);
            drawLine(cx - ro - thks, cy + ro + 2 * thks, cx - ro - thks, cy + ro + thks);
            drawLine(cx - ro - thks, cy + ro + thks, cx - thkj - thks - gapJ, cy + ro + thks);
            drawLine(cx - thkj - thks - gapJ, cy + ro + thks, cx - gapJ - thkj, cy + lengthO);

            drawLine(cx + gapJ, cy + lengthI, cx + gapJ, cy + ro + 2 * thks);
            drawLine(cx + gapJ, cy + ro + 2 * thks, cx + ro + thks, cy + ro + 2 * thks);
            drawLine(cx + ro + thks, cy + ro + 2 * thks, cx + ro + thks, cy + ro + thks);
            drawLine(cx + ro + thks, cy + ro + thks, cx + thkj + thks + gapJ, cy + ro + thks);
            drawLine(cx + thkj + thks + gapJ, cy + ro + thks, cx + gapJ + thkj, cy + lengthO);

            drawLine(cx - gapJ - thks, cy + ro + 2 * thks, cx - gapJ - thks, cy + ro + 3 * thks);
            drawLine(cx + gapJ + thks, cy + ro + 2 * thks, cx + gapJ + thks, cy + ro + 3 * thks);
            drawLine(cx - gapJ - thks, cy + ro + 3 * thks, cx - 2 * ro, cy + ro + 3 * thks);
            drawLine(cx + gapJ + thks, cy + ro + 3 * thks, cx + 2 * ro, cy + ro + 3 * thks);
            drawLine(cx - 2 * ro, cy + ro + 2 * thks, cx - ro - thks, cy + ro + 2 * thks);
            drawLine(cx + 2 * ro, cy + ro + 2 * thks, cx + ro + thks, cy + ro + 2 * thks);

            // L3
            dimBottomH(cx - gapJ - thks, cy + ro + 3 * thks, cx + gapJ + thks, cy + ro + 3 * thks, l3, "BCHASketchL3");

            // L2
            dimTopH(cx - gapJ, cy + lengthI, cx + gapJ, cy + lengthI, l2, "BCHASketchL2");

            // L1
            dimBottomH(cx - ro - thks, cy + ro + 2 * thks + 50, cx + ro + thks, cy + ro + 2 * thks + 50, l1, "BCHASketchL1");
            drawLine(cx - ro - thks, cy + ro + 2 * thks + 3, cx - ro - thks, cy + ro + 2 * thks + 53);
            drawLine(cx + ro + thks, cy + ro + 2 * thks + 3, cx + ro + thks, cy + ro + 2 * thks + 53);

            // bdi
            drawLine(cx - 2 * ro - 3, cy + ro + 3 * thks, cx - 2 * ro - 40, cy + ro + 3 * thks);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - 2 * ro - 30, y: cy + ro + 3 * thks},
                    {x: cx - 2 * ro - 30 + 3, y: cy + ro + 3 * thks + 15},
                    {x: cx - 2 * ro - 30 - 3, y: cy + ro + 3 * thks + 15},
                    {x: cx - 2 * ro - 30, y: cy + ro + 3 * thks}
                ]));
            svg.append("path").attr("d", line([
                {x: cx - 2 * ro - 30, y: cy + ro + 3 * thks + 15 + 50},
                {x: cx - 2 * ro - 30, y: cy + ro + 3 * thks + 15}
            ])).attr("id", "BCHASketchBDI").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHASketchBDI")
                .attr("startOffset", "50%").text(bdi);

            // thkbn
            drawLine(cx - 2 * ro - 3, cy + ro + 2 * thks, cx - 2 * ro - 80, cy + ro + 2 * thks);
            drawLine(cx - ro - thks - 3, cy + ro + thks, cx - 2 * ro - 80, cy + ro + thks);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - 2 * ro - 70, y: cy + ro + 2 * thks},
                    {x: cx - 2 * ro - 70 + 3, y: cy + ro + 2 * thks + 15},
                    {x: cx - 2 * ro - 70 - 3, y: cy + ro + 2 * thks + 15},
                    {x: cx - 2 * ro - 70, y: cy + ro + 2 * thks}
                ]));
            drawLine(cx - 2 * ro - 70, cy + ro + thks, cx - 2 * ro - 70, cy + ro + 2 * thks + 15 + 10);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - 2 * ro - 70, y: cy + ro + thks},
                    {x: cx - 2 * ro - 70 + 3, y: cy + ro + thks - 15},
                    {x: cx - 2 * ro - 70 - 3, y: cy + ro + thks - 15},
                    {x: cx - 2 * ro - 70, y: cy + ro + thks}
                ]));
            svg.append("path").attr("d", line([
                {x: cx - 2 * ro - 70, y: cy + ro + thks - 15},
                {x: cx - 2 * ro - 70, y: cy + ro + thks - 15 - 50}
            ])).attr("id", "BCHASketchTHKBN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHASketchTHKBN")
                .attr("startOffset", "50%").text(thkbn);

            // thksn h
            drawLine(cx + 2 * ro + 3, cy + ro + 3 * thks, cx + 2 * ro + 40, cy + ro + 3 * thks);
            drawLine(cx + 2 * ro + 3, cy + ro + 2 * thks, cx + 2 * ro + 40, cy + ro + 2 * thks);
            drawLine(cx + gapJ + thkj + 3, cy + lengthO, cx + 2 * ro + 40, cy + lengthO);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + 2 * ro + 30, y: cy + ro + 3 * thks},
                    {x: cx + 2 * ro + 30 + 3, y: cy + ro + 3 * thks + 15},
                    {x: cx + 2 * ro + 30 - 3, y: cy + ro + 3 * thks + 15},
                    {x: cx + 2 * ro + 30, y: cy + ro + 3 * thks}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + 2 * ro + 30, y: cy + lengthO},
                    {x: cx + 2 * ro + 30 + 3, y: cy + lengthO - 15},
                    {x: cx + 2 * ro + 30 - 3, y: cy + lengthO - 15},
                    {x: cx + 2 * ro + 30, y: cy + lengthO}
                ]));
            drawLine(cx + 2 * ro + 30, cy + lengthO, cx + 2 * ro + 30, cy + ro + 3 * thks);
            svg.append("path").attr("d", line([
                {x: cx + 2 * ro + 30, y: cy + lengthO - 15},
                {x: cx + 2 * ro + 30, y: cy + lengthO - 15 - 50}
            ])).attr("id", "BCHASketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHASketchH")
                .attr("startOffset", "50%").text(h);
            svg.append("path").attr("d", line([
                {x: cx + 2 * ro + 30, y: cy + ro + 3 * thks + 15 + 50},
                {x: cx + 2 * ro + 30, y: cy + ro + 3 * thks + 15}
            ])).attr("id", "BCHASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHASketchTHKSN")
                .attr("startOffset", "50%").text(thksn);
            svg.append("path").attr("d", "M "
                + (cx + 2 * ro + 30) + " " + (cy + ro + 2 * thks + 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + (cx + 2 * ro + 30) + " " + (cy + ro + 2 * thks - 2)
            ).classed("arrow", true);
            svg.append("path").attr("d", "M "
                + (cx + 2 * ro + 30) + " " + (cy + ro + 2 * thks - 2) + " "
                + "A" + 2 + " " + 2 + " "
                + "1 0 1" + " "
                + (cx + 2 * ro + 30) + " " + (cy + ro + 2 * thks + 2)
            ).classed("arrow", true);

            // sdo
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx + ro, y: cy},
                    {x: cx + ro + 15, y: cy - 3},
                    {x: cx + ro + 15, y: cy + 3},
                    {x: cx + ro, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + ro + 15, y: cy},
                    {x: cx + ro + 15 + 30, y: cy}
                ])).attr("transform", "rotate(" + -45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx + 0.707 * (ro + 15 + 30), y: cy - 0.707 * (ro + 15 + 30)},
                    {x: cx + 0.707 * (ro + 15 + 30) + 40, y: cy - 0.707 * (ro + 15 + 30)}
                ])).classed("sketch", true).attr("id", "BCHASketchSDO");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHASketchSDO")
                .attr("startOffset", "50%").text(sdo);

            // thkjn
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx - ro - 15 - 30, y: cy},
                    {x: cx - ro + thkj + 15 + 10, y: cy}
                ])).classed("sketch", true)
                .attr("transform", "rotate(" + 45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - ri, y: cy},
                    {x: cx - ri + 15, y: cy - 3},
                    {x: cx - ri + 15, y: cy + 3},
                    {x: cx - ri, y: cy}
                ])).attr("transform", "rotate(" + 45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx - ro, y: cy},
                    {x: cx - ro - 15, y: cy - 3},
                    {x: cx - ro - 15, y: cy + 3},
                    {x: cx - ro, y: cy}
                ])).attr("transform", "rotate(" + 45 + ", " + cx + " " + cy + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx - 0.707 * (ro + 15 + 30) - 40, y: cy - 0.707 * (ro + 15 + 30)},
                    {x: cx - 0.707 * (ro + 15 + 30), y: cy - 0.707 * (ro + 15 + 30)}
                ])).classed("sketch", true).attr("id", "BCHASketchTHKJN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BCHASketchTHKJN")
                .attr("startOffset", "50%").text(thkjn);

        }

        currentTabIndex = bchad2d3.tabs('getTabIndex', bchad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bcha2d();
            bchaSketch.off("resize").on("resize", function () {
                if (pg.length > 0) {
                    bcha2d();
                }
            });
        }
        bchad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bcha2d();
                    bchaSketch.off("resize").on("resize", function () {
                        if (pg.length > 0) {
                            bcha2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 与壳体搭接的Ω膨胀节计算",
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

                if (index === 5) {
                    $(ed.target).combobox("loadData", BCHAJCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BCHAJType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BCHAJSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BCHAJName);
                }
                else if (index === 12) {
                    $(ed.target).combobox("loadData", BCHASCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", BCHASType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BCHASSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BCHASName);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", BCHABCategory);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", BCHABType);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", BCHABSTD);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", BCHABName);
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
                    bchaSketch.empty();
                    bchaModel.empty();

                    // sketch
                    currentTabIndex = bchad2d3.tabs('getTabIndex', bchad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bcha2d();
                        bchaSketch.off("resize").on("resize", function () {
                            if (pg.length > 0) {
                                bcha2d();
                            }
                        });
                    }
                    bchad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bcha2d();
                                bchaSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        bcha2d();
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
                    if (index === 1) {

                        BCHADT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BCHAJCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCHAJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCHAJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCHAJName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        BCHASCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCHASType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCHASSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCHASName = null;

                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        BCHABCategory = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BCHABType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCHABSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCHABName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHAJCategory = [];
                                BCHASCategory = [];
                                BCHABCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BCHADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        if (element === "碳素钢" || element === "低合金钢" || element === "高合金钢") {
                                            BCHAJCategory.push({
                                                "value": element,
                                                "text": element
                                            });
                                        }
                                        BCHASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BCHABCategory[index] = {
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
                    if (index === 5) {

                        BCHAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BCHAJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCHAJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCHAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHAJCategoryVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHAJType = [];
                                $(result).each(function (index, element) {
                                    BCHAJType[index] = {
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
                    if (index === 6) {

                        BCHAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BCHAJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCHAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHAJCategoryVal,
                                type: BCHAJTypeVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHAJSTD = [];
                                $(result).each(function (index, element) {
                                    BCHAJSTD[index] = {
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
                    if (index === 7) {

                        BCHAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BCHAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHAJCategoryVal,
                                type: BCHAJTypeVal,
                                std: BCHAJSTDVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHAJName = [];
                                $(result).each(function (index, element) {
                                    BCHAJName[index] = {
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
                    if (index === 12) {

                        BCHASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BCHASType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCHASSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCHASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHASCategoryVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHASType = [];
                                $(result).each(function (index, element) {
                                    BCHASType[index] = {
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
                    if (index === 13) {

                        BCHASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BCHASSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCHASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHASCategoryVal,
                                type: BCHASTypeVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHASSTD = [];
                                $(result).each(function (index, element) {
                                    BCHASSTD[index] = {
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
                    if (index === 14) {

                        BCHASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BCHASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHASCategoryVal,
                                type: BCHASTypeVal,
                                std: BCHASSTDVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHASName = [];
                                $(result).each(function (index, element) {
                                    BCHASName[index] = {
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
                    if (index === 19) {

                        BCHABCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        BCHABType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCHABSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCHABName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHABCategoryVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHABType = [];
                                $(result).each(function (index, element) {
                                    BCHABType[index] = {
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
                    if (index === 20) {

                        BCHABTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        BCHABSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCHABName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHABCategoryVal,
                                type: BCHABTypeVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHABSTD = [];
                                $(result).each(function (index, element) {
                                    BCHABSTD[index] = {
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
                    if (index === 21) {

                        BCHABSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        BCHABName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BCHABCategoryVal,
                                type: BCHABTypeVal,
                                std: BCHABSTDVal,
                                temp: BCHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BCHABName = [];
                                $(result).each(function (index, element) {
                                    BCHABName[index] = {
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

                    // PD
                    let BCHAPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        BCHAPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // PS
                    let BCHAPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        BCHAPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // test
                    let BCHATest;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        BCHATest = rows[3][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // delta
                    let BCHADelta;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        BCHADelta = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // JName
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        BCHAJNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // DJ、JThkMin、JThkMax
                    let BCHADJ, BCHAJThkMin, BCHAJThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_nbt_47003_1_2009_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": BCHAJCategoryVal,
                            "type": BCHAJTypeVal,
                            "std": BCHAJSTDVal,
                            "name": BCHAJNameVal,
                            "temp": BCHADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            BCHADJ = parseFloat(result.density);
                            BCHAJThkMin = parseFloat(result.thkMin);
                            BCHAJThkMax = parseFloat(result.thkMax);

                            // SDO
                            let BCHASDO;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                BCHASDO = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                bcha2d("Φ" + BCHASDO);
                                bchaSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        bcha2d("Φ" + BCHASDO);
                                    }
                                });
                            }
                            bchad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        bcha2d("Φ" + BCHASDO);
                                        bchaSketch.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                bcha2d("Φ" + BCHASDO);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKJN
                            let BCHATHKJN;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > BCHAJThkMin
                                && parseFloat(rows[10][columns[0][1].field]) <= Math.min(BCHAJThkMax, BCHASDO / 2)) {
                                BCHATHKJN = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) <= BCHAJThkMin) {
                                south.html("管子名义厚度不能小于等于 " + BCHAJThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > Math.min(BCHAJThkMax, BCHASDO / 2)) {
                                south.html("管子名义厚度不能大于 " + Math.min(BCHAJThkMax, BCHASDO / 2) + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                bcha2d("Φ" + BCHASDO, BCHATHKJN);
                                bchaSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        bcha2d("Φ" + BCHASDO, BCHATHKJN);
                                    }
                                });
                            }
                            bchad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        bcha2d("Φ" + BCHASDO, BCHATHKJN);
                                        bchaSketch.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                bcha2d("Φ" + BCHASDO, BCHATHKJN);
                                            }
                                        });
                                    }
                                }
                            });

                            let BCHAOJT, BCHAOJ, BCHARJEL, BCHAEJT, BCHACJ1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": BCHAJCategoryVal,
                                    "type": BCHAJTypeVal,
                                    "std": BCHAJSTDVal,
                                    "name": BCHAJNameVal,
                                    "thk": BCHATHKJN,
                                    "temp": BCHADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": BCHASDO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    BCHAOJT = parseFloat(result.ot);
                                    if (BCHAOJT < 0) {
                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BCHAOJ = parseFloat(result.o);
                                    if (BCHAOJ < 0) {
                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    BCHARJEL = parseFloat(result.rel);
                                    if (BCHARJEL < 0) {
                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    BCHAEJT = 1000 * parseFloat(result.et);
                                    if (BCHAEJT < 0) {
                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                        return false;
                                    }
                                    BCHACJ1 = parseFloat(result.c1);
                                    if (BCHACJ1 < 0) {
                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // CJ2
                                    let BCHACJ2;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) < BCHATHKJN) {
                                        BCHACJ2 = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) >= BCHATHKJN) {
                                        south.html("管子腐蚀裕量不能大于等于 " + BCHATHKJN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // SName
                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                        BCHASNameVal = rows[15][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // DS、SThkMin、SThkMax
                                    let BCHADS, BCHASThkMin, BCHASThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_nbt_47003_1_2009_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": BCHASCategoryVal,
                                            "type": BCHASTypeVal,
                                            "std": BCHASSTDVal,
                                            "name": BCHASNameVal,
                                            "temp": BCHADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            BCHADS = parseFloat(result.density);
                                            BCHASThkMin = parseFloat(result.thkMin);
                                            BCHASThkMax = parseFloat(result.thkMax);

                                            // BDI
                                            let BCHABDI;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                BCHABDI = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI);
                                                bchaSketch.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI);
                                                    }
                                                });
                                            }
                                            bchad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI);
                                                        bchaSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKSN
                                            let BCHATHKSN;
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > BCHASThkMin
                                                && parseFloat(rows[17][columns[0][1].field]) <= BCHASThkMax) {
                                                BCHATHKSN = parseFloat(rows[17][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) <= BCHASThkMin) {
                                                south.html("筒体名义厚度不能小于等于 " + BCHASThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > BCHASThkMax) {
                                                south.html("筒体名义厚度不能大于 " + BCHASThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN);
                                                bchaSketch.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN);
                                                    }
                                                });
                                            }
                                            bchad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN);
                                                        bchaSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let BCHABDO = BCHABDI + 2 * BCHATHKSN;

                                            let BCHAOST, BCHAOS, BCHARSEL, BCHAEST, BCHACS1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": BCHASCategoryVal,
                                                    "type": BCHASTypeVal,
                                                    "std": BCHASSTDVal,
                                                    "name": BCHASNameVal,
                                                    "thk": BCHATHKSN,
                                                    "temp": BCHADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": BCHABDO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    BCHAOST = parseFloat(result.ot);
                                                    if (BCHAOST < 0) {
                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BCHAOS = parseFloat(result.o);
                                                    if (BCHAOS < 0) {
                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BCHARSEL = parseFloat(result.rel);
                                                    if (BCHARSEL < 0) {
                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BCHAEST = 1000 * parseFloat(result.et);
                                                    if (BCHAEST < 0) {
                                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    BCHACS1 = parseFloat(result.c1);
                                                    if (BCHACS1 < 0) {
                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // CS2
                                                    let BCHACS2;
                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) < BCHATHKSN) {
                                                        BCHACS2 = parseFloat(rows[18][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) >= BCHATHKSN) {
                                                        south.html("筒体腐蚀裕量不能大于等于 " + BCHATHKSN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BName
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        BCHABNameVal = rows[22][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // DB、BThkMin、BThkMax
                                                    let BCHADB, BCHABThkMin, BCHABThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_nbt_47003_1_2009_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": BCHABCategoryVal,
                                                            "type": BCHABTypeVal,
                                                            "std": BCHABSTDVal,
                                                            "name": BCHABNameVal,
                                                            "temp": BCHADT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            BCHADB = parseFloat(result.density);
                                                            BCHABThkMin = parseFloat(result.thkMin);
                                                            BCHABThkMax = parseFloat(result.thkMax);

                                                            // THKBN
                                                            let BCHATHKBN;
                                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) > BCHABThkMin
                                                                && parseFloat(rows[23][columns[0][1].field]) <= BCHABThkMax) {
                                                                BCHATHKBN = parseFloat(rows[23][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) <= BCHABThkMin) {
                                                                south.html("短节名义厚度不能小于等于 " + BCHABThkMin + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) > BCHABThkMax) {
                                                                south.html("短节名义厚度不能大于 " + BCHABThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN);
                                                                bchaSketch.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN);
                                                                    }
                                                                });
                                                            }
                                                            bchad2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN);
                                                                        bchaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            let BCHAOBT, BCHAOB, BCHARBEL, BCHAEBT, BCHACB1;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_e_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BCHABCategoryVal,
                                                                    "type": BCHABTypeVal,
                                                                    "std": BCHABSTDVal,
                                                                    "name": BCHABNameVal,
                                                                    "thk": BCHATHKBN,
                                                                    "temp": BCHADT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": BCHABDO + 2 * BCHATHKBN
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BCHAOBT = parseFloat(result.ot);
                                                                    if (BCHAOBT < 0) {
                                                                        south.html("查询材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BCHAOB = parseFloat(result.o);
                                                                    if (BCHAOB < 0) {
                                                                        south.html("查询材料常温许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BCHARBEL = parseFloat(result.rel);
                                                                    if (BCHARBEL < 0) {
                                                                        south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BCHAEBT = 1000 * parseFloat(result.et);
                                                                    if (BCHAEBT < 0) {
                                                                        south.html("查询材料设计温度弹性模量失败！").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    BCHACB1 = parseFloat(result.c1);
                                                                    if (BCHACB1 < 0) {
                                                                        south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // L2
                                                                    let BCHAL2;
                                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                        BCHAL2 = parseFloat(rows[24][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2);
                                                                        bchaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2);
                                                                            }
                                                                        });
                                                                    }
                                                                    bchad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2);
                                                                                bchaSketch.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // L3
                                                                    let BCHAL3;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) > BCHAL2) {
                                                                        BCHAL3 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) <= BCHAL2) {
                                                                        south.html("自由状态壳体间距 L3 不能小于等于 " + BCHAL2 + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3);
                                                                        bchaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3);
                                                                            }
                                                                        });
                                                                    }
                                                                    bchad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3);
                                                                                bchaSketch.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // H
                                                                    let BCHAH;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > BCHATHKBN) {
                                                                        BCHAH = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= BCHATHKBN) {
                                                                        south.html("开槽处管子外侧至壳体外侧高度 h 不能小于等于 " + BCHATHKBN + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3, BCHAH);
                                                                        bchaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3, BCHAH);
                                                                            }
                                                                        });
                                                                    }
                                                                    bchad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3, BCHAH);
                                                                                bchaSketch.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3, BCHAH);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // ND
                                                                    let BCHAND;
                                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                        BCHAND = parseFloat(rows[27][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 过程参数
                                                                    let BCHAPC = BCHAPD + BCHAPS;
                                                                    let BCHACJ = BCHACJ1 + BCHACJ2;
                                                                    let BCHATHKJE = BCHATHKJN - BCHACJ;
                                                                    let BCHASDM = BCHASDO - BCHATHKJN;
                                                                    let BCHASDI = BCHASDO - 2 * BCHATHKJN;
                                                                    let BCHACS = BCHACS1 + BCHACS2;
                                                                    let BCHATHKSE = BCHATHKSN - BCHACS;
                                                                    let BCHATHKBE = BCHATHKBN - BCHACB1;

                                                                    // 管子应力校核
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "管子许用应力：" + BCHAOJT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    let BCHAO1 = (BCHAPC * BCHASDM) / (2 * BCHATHKJE);
                                                                    let BCHAO1CHK;
                                                                    if (BCHAO1 <= BCHAOJT) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "管子实际应力：" + BCHAO1.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        BCHAO1CHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "管子实际应力：" + BCHAO1.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        BCHAO1CHK = "不合格";
                                                                    }

                                                                    // 壳体应力校核
                                                                    let BCHAL1 = Math.min(1.1 * Math.sqrt(BCHABDO * BCHATHKBE), 120);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "短节长度：" + BCHAL1.toFixed(4) + " mm" +
                                                                        "</span>");

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3, BCHAH, BCHAL1);
                                                                        bchaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3, BCHAH, BCHAL1);
                                                                            }
                                                                        });
                                                                    }
                                                                    bchad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3, BCHAH, BCHAL1);
                                                                                bchaSketch.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        bcha2d("Φ" + BCHASDO, BCHATHKJN, "Φ" + BCHABDI, BCHATHKSN, BCHATHKBN, BCHAL2, BCHAL3, BCHAH, BCHAL1);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    let BCHAO2 = BCHAPC * (BCHABDO * BCHAL1 + 2 * (BCHAL2 * BCHAH + BCHAL3 * BCHATHKSN + 0.25 * Math.PI * BCHASDI * BCHASDI)) / (2 * ((BCHAL1 - BCHAL3) * BCHATHKSN + (BCHAL1 - BCHAL2) * BCHATHKBN + Math.PI * BCHASDM * BCHATHKJE));
                                                                    let BCHAOMIN = Math.min(BCHAOJT, BCHAOST, BCHAOBT);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "壳体许用应力：" + BCHAOMIN.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    let BCHAO2CHK;
                                                                    if (BCHAO2 <= BCHAOMIN) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "壳体实际应力：" + BCHAO2.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        BCHAO2CHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "壳体实际应力：" + BCHAO2.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        BCHAO2CHK = "不合格";
                                                                    }

                                                                    // 疲劳寿命计算
                                                                    let BCHAO3 = 1.5 * BCHAEJT * BCHATHKJN * BCHADelta / (BCHASDO * BCHASDO * BCHAND);
                                                                    let BCHAOR = BCHAO1 + BCHAO3;
                                                                    let BCHAN;
                                                                    if (BCHAJCategoryVal === "碳素钢" || BCHAJCategoryVal === "低合金钢") {
                                                                        BCHAN = Math.pow(6187 / BCHAOR, 2.9);
                                                                    }
                                                                    else if (BCHAJCategoryVal === "高合金钢") {
                                                                        BCHAN = Math.pow(5835.5 / BCHAOR, 3.5);
                                                                    }
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "膨胀节疲劳寿命：" + BCHAN.toFixed(0) +
                                                                        "</span>");

                                                                    // 压力试验
                                                                    let BCHAPJT, BCHAPST, BCHAPBT, BCHAPT;
                                                                    if (BCHATest === "液压试验") {
                                                                        BCHAPJT = Math.max(1.25 * BCHAPD * BCHAOJ / BCHAOJT, 0.05);
                                                                        BCHAPST = Math.max(1.25 * BCHAPD * BCHAOS / BCHAOST, 0.05);
                                                                        BCHAPBT = Math.max(1.25 * BCHAPD * BCHAOB / BCHAOBT, 0.05);
                                                                        BCHAPT = Math.min(BCHAPJT, BCHAPST, BCHAPBT);
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试压类型：液压" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试验压力：" + BCHAPT.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                    }
                                                                    else if (BCHATest === "气压试验") {

                                                                        BCHAPJT = Math.max(1.1 * BCHAPD * BCHAOJ / BCHAOJT, 0.05);
                                                                        BCHAPST = Math.max(1.1 * BCHAPD * BCHAOS / BCHAOST, 0.05);
                                                                        BCHAPBT = Math.max(1.1 * BCHAPD * BCHAOB / BCHAOBT, 0.05);
                                                                        BCHAPT = Math.min(BCHAPJT, BCHAPST, BCHAPBT);
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试压类型：气压" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试验压力：" + BCHAPT.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // docx
                                                                    let BCHAPayJS = $('#payjs');

                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "bchadocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "BCHA",

                                                                                jcategory: BCHAJCategoryVal,
                                                                                pd: BCHAPD,
                                                                                t: BCHADT,
                                                                                ps: BCHAPS,
                                                                                test: BCHATest,
                                                                                delta: BCHADelta,
                                                                                jstd: BCHAJSTDVal,
                                                                                jname: BCHAJNameVal,
                                                                                sdo: BCHASDO,
                                                                                thkjn: BCHATHKJN,
                                                                                cj2: BCHACJ2,
                                                                                bstd: BCHABSTDVal,
                                                                                bname: BCHABNameVal,
                                                                                thkbn: BCHATHKBN,
                                                                                sstd: BCHASSTDVal,
                                                                                sname: BCHASNameVal,
                                                                                bdi: BCHABDI,
                                                                                thksn: BCHATHKSN,
                                                                                cs2: BCHACS2,
                                                                                l2: BCHAL2,
                                                                                l3: BCHAL3,
                                                                                h: BCHAH,
                                                                                nd: BCHAND,
                                                                                dj: BCHADJ.toFixed(4),
                                                                                ojt: BCHAOJT.toFixed(4),
                                                                                oj: BCHAOJ.toFixed(4),
                                                                                rjel: BCHARJEL.toFixed(4),
                                                                                ejt: (BCHAEJT / 1000).toFixed(4),
                                                                                cj1: BCHACJ1.toFixed(4),
                                                                                ds: BCHADS.toFixed(4),
                                                                                rsel: BCHARSEL.toFixed(4),
                                                                                cs1: BCHACS1.toFixed(4),
                                                                                est: (BCHAEST / 1000).toFixed(4),
                                                                                db: BCHADB.toFixed(4),
                                                                                obt: BCHAOBT.toFixed(4),
                                                                                ob: BCHAOB.toFixed(4),
                                                                                rbel: BCHARBEL.toFixed(4),
                                                                                ebt: (BCHAEBT / 1000).toFixed(4),
                                                                                cb1: BCHACB1.toFixed(4),
                                                                                os: BCHAOS.toFixed(4),
                                                                                ost: BCHAOST.toFixed(4),
                                                                                pc: BCHAPC.toFixed(4),
                                                                                cj: BCHACJ.toFixed(4),
                                                                                thkje: BCHATHKJE.toFixed(4),
                                                                                sdm: BCHASDM.toFixed(4),
                                                                                sdi: BCHASDI.toFixed(4),
                                                                                cs: BCHACS.toFixed(4),
                                                                                thkse: BCHATHKSE.toFixed(4),
                                                                                bdo: BCHABDO.toFixed(4),
                                                                                thkbe: BCHATHKBE.toFixed(4),
                                                                                o1: BCHAO1.toFixed(4),
                                                                                o1chk: BCHAO1CHK,
                                                                                l1: BCHAL1.toFixed(4),
                                                                                o2: BCHAO2.toFixed(4),
                                                                                omin: BCHAOMIN.toFixed(4),
                                                                                o2chk: BCHAO2CHK,
                                                                                o3: BCHAO3.toFixed(4),
                                                                                or: BCHAOR.toFixed(4),
                                                                                n: BCHAN.toFixed(0),
                                                                                pjt: BCHAPJT.toFixed(4),
                                                                                pst: BCHAPST.toFixed(4),
                                                                                pbt: BCHAPBT.toFixed(4),
                                                                                pt: BCHAPT.toFixed(4)
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
                                                                                    BCHAPayJS.dialog({
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
                                                                                                BCHAPayJS.dialog("close");
                                                                                                BCHAPayJS.dialog("clear");
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
                                                                                                            BCHAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    BCHAPayJS.dialog('close');
                                                                                                                    BCHAPayJS.dialog('clear');
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
                                                                        "<span style='color:red;'>&ensp;短节材料力学特性获取失败，请检查网络后重试</span>");
                                                                }
                                                            });
                                                        },
                                                        error: function () {
                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                "<span style='color:red;'>&ensp;短节材料物理性质获取失败，请检查网络后重试</span>");
                                                        }
                                                    });
                                                },
                                                error: function () {
                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                        "<span style='color:red;'>&ensp;筒体材料力学特性获取失败，请检查网络后重试</span>");
                                                }
                                            });
                                        },
                                        error: function () {
                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                "<span style='color:red;'>&ensp;筒体材料物理性质获取失败，请检查网络后重试</span>");
                                        }
                                    });
                                },
                                error: function () {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "<span style='color:red;'>&ensp;管子材料力学特性获取失败，请检查网络后重试</span>");
                                }
                            });
                        },
                        error: function () {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "<span style='color:red;'>&ensp;管子材料物理性质获取失败，请检查网络后重试</span>");
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