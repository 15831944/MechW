$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let aahaSketch = $("#d2");
    let aahaModel = $("#d3");
    let aahad2d3 = $('#d2d3');

    $("#cal").html("<table id='aaha'></table>");
    let pg = $("#aaha");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/a/h/a/AAHA.json", function (result) {

        let AAHADT,
            AAHAJCategory, AAHAJCategoryVal, AAHAJType, AAHAJTypeVal, AAHAJSTD, AAHAJSTDVal, AAHAJName, AAHAJNameVal,
            AAHASCategory, AAHASCategoryVal, AAHASType, AAHASTypeVal, AAHASSTD, AAHASSTDVal, AAHASName, AAHASNameVal,
            AAHABCategory, AAHABCategoryVal, AAHABType, AAHABTypeVal, AAHABSTD, AAHABSTDVal, AAHABName, AAHABNameVal,
            columns, rows, ed;

        function aaha2d(sdo = "do", thkjn = "δjn",
                        bdi = "Di", thksn = "δsn",
                        thkbn = "δbn",
                        l2 = "L2", l3 = "L3", h = "h", l1 = "L1") {

            aahaSketch.empty();

            let width = aahaSketch.width();
            let height = aahaSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "AAHASVG").attr("height", height);

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
            dimBottomH(cx - gapJ - thks, cy + ro + 3 * thks, cx + gapJ + thks, cy + ro + 3 * thks, l3, "AAHASketchL3");

            // L2
            dimTopH(cx - gapJ, cy + lengthI, cx + gapJ, cy + lengthI, l2, "AAHASketchL2");

            // L1
            dimBottomH(cx - ro - thks, cy + ro + 2 * thks + 50, cx + ro + thks, cy + ro + 2 * thks + 50, l1, "AAHASketchL1");
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
            ])).attr("id", "AAHASketchBDI").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHASketchBDI")
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
            ])).attr("id", "AAHASketchTHKBN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHASketchTHKBN")
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
            ])).attr("id", "AAHASketchH").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHASketchH")
                .attr("startOffset", "50%").text(h);
            svg.append("path").attr("d", line([
                {x: cx + 2 * ro + 30, y: cy + ro + 3 * thks + 15 + 50},
                {x: cx + 2 * ro + 30, y: cy + ro + 3 * thks + 15}
            ])).attr("id", "AAHASketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHASketchTHKSN")
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
                ])).classed("sketch", true).attr("id", "AAHASketchSDO");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHASketchSDO")
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
                ])).classed("sketch", true).attr("id", "AAHASketchTHKJN");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#AAHASketchTHKJN")
                .attr("startOffset", "50%").text(thkjn);
        }

        currentTabIndex = aahad2d3.tabs('getTabIndex', aahad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            aaha2d();
            aahaSketch.off("resize").on("resize", function () {
                if (pg.length > 0) {
                    aaha2d();
                }
            });
        }
        aahad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    aaha2d();
                    aahaSketch.off("resize").on("resize", function () {
                        if (pg.length > 0) {
                            aaha2d();
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
                    $(ed.target).combobox("loadData", AAHAJCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", AAHAJType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", AAHAJSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", AAHAJName);
                }

                else if (index === 12) {
                    $(ed.target).combobox("loadData", AAHASCategory);
                }
                else if (index === 13) {
                    $(ed.target).combobox("loadData", AAHASType);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", AAHASSTD);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", AAHASName);
                }

                else if (index === 19) {
                    $(ed.target).combobox("loadData", AAHABCategory);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", AAHABType);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", AAHABSTD);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", AAHABName);
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
                    aahaSketch.empty();
                    aahaModel.empty();

                    // sketch
                    currentTabIndex = aahad2d3.tabs('getTabIndex', aahad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        aaha2d();
                        aahaSketch.off("resize").on("resize", function () {
                            if (pg.length > 0) {
                                aaha2d();
                            }
                        });
                    }
                    aahad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                aaha2d();
                                aahaSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        aaha2d();
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

                        AAHADT = parseFloat(changes.value);

                        // clear category、type、std、name
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        AAHAJCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAHAJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAHAJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAHAJName = null;

                        rows[12][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 12);
                        AAHASCategory = null;
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAHASType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAHASSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAHASName = null;

                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        AAHABCategory = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        AAHABType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAHABSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAHABName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHAJCategory = [];
                                AAHASCategory = [];
                                AAHABCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + AAHADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        if (element === "碳素钢和低合金钢" || element === "高合金钢") {
                                            AAHAJCategory.push({
                                                "value": element,
                                                "text": element
                                            });
                                        }
                                        AAHASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        AAHABCategory[index] = {
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

                        AAHAJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        AAHAJType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAHAJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAHAJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHAJCategoryVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHAJType = [];
                                $(result).each(function (index, element) {
                                    AAHAJType[index] = {
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

                        AAHAJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        AAHAJSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAHAJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHAJCategoryVal,
                                type: AAHAJTypeVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHAJSTD = [];
                                $(result).each(function (index, element) {
                                    AAHAJSTD[index] = {
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

                        AAHAJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        AAHAJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHAJCategoryVal,
                                type: AAHAJTypeVal,
                                std: AAHAJSTDVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHAJName = [];
                                $(result).each(function (index, element) {
                                    AAHAJName[index] = {
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

                        AAHASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        AAHASType = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAHASSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAHASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHASCategoryVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHASType = [];
                                $(result).each(function (index, element) {
                                    AAHASType[index] = {
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

                        AAHASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        AAHASSTD = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAHASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHASCategoryVal,
                                type: AAHASTypeVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHASSTD = [];
                                $(result).each(function (index, element) {
                                    AAHASSTD[index] = {
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

                        AAHASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        AAHASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHASCategoryVal,
                                type: AAHASTypeVal,
                                std: AAHASSTDVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHASName = [];
                                $(result).each(function (index, element) {
                                    AAHASName[index] = {
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

                        AAHABCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        AAHABType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAHABSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAHABName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHABCategoryVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHABType = [];
                                $(result).each(function (index, element) {
                                    AAHABType[index] = {
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

                        AAHABTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        AAHABSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAHABName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHABCategoryVal,
                                type: AAHABTypeVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHABSTD = [];
                                $(result).each(function (index, element) {
                                    AAHABSTD[index] = {
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

                        AAHABSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        AAHABName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: AAHABCategoryVal,
                                type: AAHABTypeVal,
                                std: AAHABSTDVal,
                                temp: AAHADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                AAHABName = [];
                                $(result).each(function (index, element) {
                                    AAHABName[index] = {
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
                    let AAHAPD;
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        AAHAPD = parseFloat(rows[0][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // PS
                    let AAHAPS;
                    if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                        AAHAPS = parseFloat(rows[2][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // test
                    let AAHATest;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        AAHATest = rows[3][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // delta
                    let AAHADelta;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        AAHADelta = parseFloat(rows[4][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // JName
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        AAHAJNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // DJ、JThkMin、JThkMax
                    let AAHADJ, AAHAJThkMin, AAHAJThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: true,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": AAHAJCategoryVal,
                            "type": AAHAJTypeVal,
                            "std": AAHAJSTDVal,
                            "name": AAHAJNameVal,
                            "temp": AAHADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            AAHADJ = parseFloat(result.density);
                            AAHAJThkMin = parseFloat(result.thkMin);
                            AAHAJThkMax = parseFloat(result.thkMax);

                            // SDO
                            let AAHASDO;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                AAHASDO = parseFloat(rows[9][columns[0][1].field]);
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aaha2d("Φ" + AAHASDO);
                                aahaSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        aaha2d("Φ" + AAHASDO);
                                    }
                                });
                            }
                            aahad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaha2d("Φ" + AAHASDO);
                                        aahaSketch.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                aaha2d("Φ" + AAHASDO);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKJN
                            let AAHATHKJN;
                            if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > AAHAJThkMin
                                && parseFloat(rows[10][columns[0][1].field]) <= Math.min(AAHAJThkMax, AAHASDO / 2)) {
                                AAHATHKJN = parseFloat(rows[10][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) <= AAHAJThkMin) {
                                south.html("管子名义厚度不能小于等于 " + AAHAJThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                && parseFloat(rows[10][columns[0][1].field]) > Math.min(AAHAJThkMax, AAHASDO / 2)) {
                                south.html("管子名义厚度不能大于 " + Math.min(AAHAJThkMax, AAHASDO / 2) + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                aaha2d("Φ" + AAHASDO, AAHATHKJN);
                                aahaSketch.off("resize").on("resize", function () {
                                    if (pg.length > 0) {
                                        aaha2d("Φ" + AAHASDO, AAHATHKJN);
                                    }
                                });
                            }
                            aahad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        aaha2d("Φ" + AAHASDO, AAHATHKJN);
                                        aahaSketch.off("resize").on("resize", function () {
                                            if (pg.length > 0) {
                                                aaha2d("Φ" + AAHASDO, AAHATHKJN);
                                            }
                                        });
                                    }
                                }
                            });

                            let AAHAOJT, AAHAOJ, AAHAOJT1, AAHARJEL, AAHAEJT, AAHACJ1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_e_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": AAHAJCategoryVal,
                                    "type": AAHAJTypeVal,
                                    "std": AAHAJSTDVal,
                                    "name": AAHAJNameVal,
                                    "thk": AAHATHKJN,
                                    "temp": AAHADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": AAHASDO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    // 设计弹性模量
                                    AAHAEJT = 1000 * parseFloat(result.et);
                                    if (AAHAEJT < 0) {
                                        south.html("查询管子材料设计温度弹性模量失败！").css("color", "red");
                                        return false;
                                    }

                                    // 设计应力
                                    AAHAOJT = parseFloat(result.ot);
                                    if (AAHAOJT < 0) {
                                        south.html("查询管子材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温应力
                                    AAHAOJ = parseFloat(result.o);
                                    if (AAHAOJ < 0) {
                                        south.html("查询管子材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }

                                    // 常温屈服强度
                                    AAHARJEL = parseFloat(result.rel);
                                    if (AAHARJEL < 0) {
                                        south.html("查询管子材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }

                                    // 厚度负偏差
                                    AAHACJ1 = parseFloat(result.c1);
                                    if (AAHACJ1 < 0) {
                                        south.html("查询管子材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }

                                    // 标记应力
                                    AAHAOJT1 = parseFloat(result.ot1);

                                    // CJ2
                                    let AAHACJ2;
                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) < AAHATHKJN) {
                                        AAHACJ2 = parseFloat(rows[11][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                        && parseFloat(rows[11][columns[0][1].field]) >= AAHATHKJN) {
                                        south.html("管子腐蚀裕量不能大于等于 " + AAHATHKJN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    // SName
                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])) {
                                        AAHASNameVal = rows[15][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // DS、SThkMin、SThkMax
                                    let AAHADS, AAHASThkMin, AAHASThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": AAHASCategoryVal,
                                            "type": AAHASTypeVal,
                                            "std": AAHASSTDVal,
                                            "name": AAHASNameVal,
                                            "temp": AAHADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            AAHADS = parseFloat(result.density);
                                            AAHASThkMin = parseFloat(result.thkMin);
                                            AAHASThkMax = parseFloat(result.thkMax);

                                            // BDI
                                            let AAHABDI;
                                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                                AAHABDI = parseFloat(rows[16][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI);
                                                aahaSketch.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI);
                                                    }
                                                });
                                            }
                                            aahad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI);
                                                        aahaSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKSN
                                            let AAHATHKSN;
                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > AAHASThkMin
                                                && parseFloat(rows[17][columns[0][1].field]) <= AAHASThkMax) {
                                                AAHATHKSN = parseFloat(rows[17][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) <= AAHASThkMin) {
                                                south.html("筒体名义厚度不能小于等于 " + AAHASThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                                && parseFloat(rows[17][columns[0][1].field]) > AAHASThkMax) {
                                                south.html("筒体名义厚度不能大于 " + AAHASThkMax + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN);
                                                aahaSketch.off("resize").on("resize", function () {
                                                    if (pg.length > 0) {
                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN);
                                                    }
                                                });
                                            }
                                            aahad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN);
                                                        aahaSketch.off("resize").on("resize", function () {
                                                            if (pg.length > 0) {
                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let AAHABDO = AAHABDI + 2 * AAHATHKSN;

                                            let AAHAOST, AAHAOS, AAHAOST1, AAHARSEL, AAHAEST, AAHACS1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_e_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": AAHASCategoryVal,
                                                    "type": AAHASTypeVal,
                                                    "std": AAHASSTDVal,
                                                    "name": AAHASNameVal,
                                                    "thk": AAHATHKSN,
                                                    "temp": AAHADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": AAHABDO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    // 设计弹性模量
                                                    AAHAEST = 1000 * parseFloat(result.et);
                                                    if (AAHAEST < 0) {
                                                        south.html("查询筒体材料设计温度弹性模量失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 设计应力
                                                    AAHAOST = parseFloat(result.ot);
                                                    if (AAHAOST < 0) {
                                                        south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 常温应力
                                                    AAHAOS = parseFloat(result.o);
                                                    if (AAHAOS < 0) {
                                                        south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 常温屈服强度
                                                    AAHARSEL = parseFloat(result.rel);
                                                    if (AAHARSEL < 0) {
                                                        south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 厚度负偏差
                                                    AAHACS1 = parseFloat(result.c1);
                                                    if (AAHACS1 < 0) {
                                                        south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }

                                                    // 标记应力
                                                    AAHAOST1 = parseFloat(result.ot1);

                                                    // CS2
                                                    let AAHACS2;
                                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) < AAHATHKSN) {
                                                        AAHACS2 = parseFloat(rows[18][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                        && parseFloat(rows[18][columns[0][1].field]) >= AAHATHKSN) {
                                                        south.html("筒体腐蚀裕量不能大于等于 " + AAHATHKSN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BName
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        AAHABNameVal = rows[22][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // DB、BThkMin、BThkMax
                                                    let AAHADB, AAHABThkMin, AAHABThkMax;
                                                    $.ajax({
                                                        type: "POST",
                                                        contentType: "application/json; charset=utf-8",
                                                        url: "web_get_gbt_150_2011_index.action",
                                                        async: true,
                                                        dataType: "json",
                                                        data: JSON.stringify({
                                                            "category": AAHABCategoryVal,
                                                            "type": AAHABTypeVal,
                                                            "std": AAHABSTDVal,
                                                            "name": AAHABNameVal,
                                                            "temp": AAHADT
                                                        }),
                                                        beforeSend: function () {
                                                        },
                                                        success: function (result) {

                                                            AAHADB = parseFloat(result.density);
                                                            AAHABThkMin = parseFloat(result.thkMin);
                                                            AAHABThkMax = parseFloat(result.thkMax);

                                                            // THKBN
                                                            let AAHATHKBN;
                                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) > AAHABThkMin
                                                                && parseFloat(rows[23][columns[0][1].field]) <= AAHABThkMax) {
                                                                AAHATHKBN = parseFloat(rows[23][columns[0][1].field]);
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) <= AAHABThkMin) {
                                                                south.html("短节名义厚度不能小于等于 " + AAHABThkMin + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                && parseFloat(rows[23][columns[0][1].field]) > AAHABThkMax) {
                                                                south.html("短节名义厚度不能大于 " + AAHABThkMax + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN);
                                                                aahaSketch.off("resize").on("resize", function () {
                                                                    if (pg.length > 0) {
                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN);
                                                                    }
                                                                });
                                                            }
                                                            aahad2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN);
                                                                        aahaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            let AAHAOBT, AAHAOB, AAHAOBT1, AAHARBEL, AAHAEBT, AAHACB1;
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_gbt_150_2011_e_com_property.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": AAHABCategoryVal,
                                                                    "type": AAHABTypeVal,
                                                                    "std": AAHABSTDVal,
                                                                    "name": AAHABNameVal,
                                                                    "thk": AAHATHKBN,
                                                                    "temp": AAHADT,
                                                                    "highLow": 3,
                                                                    "isTube": 0,
                                                                    "od": AAHABDO + 2 * AAHATHKBN
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    // 设计弹性模量
                                                                    AAHAEBT = 1000 * parseFloat(result.et);
                                                                    if (AAHAEBT < 0) {
                                                                        south.html("查询短节材料设计温度弹性模量失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 设计应力
                                                                    AAHAOBT = parseFloat(result.ot);
                                                                    if (AAHAOBT < 0) {
                                                                        south.html("查询短节材料设计温度许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 常温应力
                                                                    AAHAOB = parseFloat(result.o);
                                                                    if (AAHAOB < 0) {
                                                                        south.html("查询短节材料常温许用应力失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 常温屈服强度
                                                                    AAHARBEL = parseFloat(result.rel);
                                                                    if (AAHARBEL < 0) {
                                                                        south.html("查询短节材料常温屈服强度失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 厚度负偏差
                                                                    AAHACB1 = parseFloat(result.c1);
                                                                    if (AAHACB1 < 0) {
                                                                        south.html("查询短节材料厚度负偏差失败！").css("color", "red");
                                                                        return false;
                                                                    }

                                                                    // 标记应力
                                                                    AAHAOBT1 = parseFloat(result.ot1);

                                                                    // L2
                                                                    let AAHAL2;
                                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                                        AAHAL2 = parseFloat(rows[24][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2);
                                                                        aahaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2);
                                                                            }
                                                                        });
                                                                    }
                                                                    aahad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2);
                                                                                aahaSketch.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // L3
                                                                    let AAHAL3;
                                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) > AAHAL2) {
                                                                        AAHAL3 = parseFloat(rows[25][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                                        && parseFloat(rows[25][columns[0][1].field]) <= AAHAL2) {
                                                                        south.html("自由状态壳体间距 L3 不能小于等于 " + AAHAL2 + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3);
                                                                        aahaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3);
                                                                            }
                                                                        });
                                                                    }
                                                                    aahad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3);
                                                                                aahaSketch.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // H
                                                                    let AAHAH;
                                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) > AAHATHKBN) {
                                                                        AAHAH = parseFloat(rows[26][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                                        && parseFloat(rows[26][columns[0][1].field]) <= AAHATHKBN) {
                                                                        south.html("开槽处管子外侧至壳体外侧高度 h 不能小于等于 " + AAHATHKBN + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3, AAHAH);
                                                                        aahaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3, AAHAH);
                                                                            }
                                                                        });
                                                                    }
                                                                    aahad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3, AAHAH);
                                                                                aahaSketch.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3, AAHAH);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // ND
                                                                    let AAHAND;
                                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                                        AAHAND = parseFloat(rows[27][columns[0][1].field]);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // 过程参数
                                                                    let AAHAPC = AAHAPD + AAHAPS;
                                                                    let AAHACJ = AAHACJ1 + AAHACJ2;
                                                                    let AAHATHKJE = AAHATHKJN - AAHACJ;
                                                                    let AAHASDM = AAHASDO - AAHATHKJN;
                                                                    let AAHASDI = AAHASDO - 2 * AAHATHKJN;
                                                                    let AAHACS = AAHACS1 + AAHACS2;
                                                                    let AAHATHKSE = AAHATHKSN - AAHACS;
                                                                    let AAHATHKBE = AAHATHKBN - AAHACB1;

                                                                    // 管子应力校核
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "管子许用应力：" + AAHAOJT.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    let AAHAO1 = (AAHAPC * AAHASDM) / (2 * AAHATHKJE);
                                                                    let AAHAO1CHK;
                                                                    if (AAHAO1 <= AAHAOJT) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "管子实际应力：" + AAHAO1.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        AAHAO1CHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "管子实际应力：" + AAHAO1.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        AAHAO1CHK = "不合格";
                                                                    }

                                                                    // 壳体应力校核
                                                                    let AAHAL1 = Math.min(1.1 * Math.sqrt(AAHABDO * AAHATHKBE), 120);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "短节长度：" + AAHAL1.toFixed(4) + " mm" +
                                                                        "</span>");

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3, AAHAH, AAHAL1.toFixed(2));
                                                                        aahaSketch.off("resize").on("resize", function () {
                                                                            if (pg.length > 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3, AAHAH, AAHAL1.toFixed(2));
                                                                            }
                                                                        });
                                                                    }
                                                                    aahad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3, AAHAH, AAHAL1.toFixed(2));
                                                                                aahaSketch.off("resize").on("resize", function () {
                                                                                    if (pg.length > 0) {
                                                                                        aaha2d("Φ" + AAHASDO, AAHATHKJN, "Φ" + AAHABDI, AAHATHKSN, AAHATHKBN, AAHAL2, AAHAL3, AAHAH, AAHAL1.toFixed(2));
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    let AAHAO2 = AAHAPC * (AAHABDO * AAHAL1 + 2 * (AAHAL2 * AAHAH + AAHAL3 * AAHATHKSN + 0.25 * Math.PI * AAHASDI * AAHASDI)) / (2 * ((AAHAL1 - AAHAL3) * AAHATHKSN + (AAHAL1 - AAHAL2) * AAHATHKBN + Math.PI * AAHASDM * AAHATHKJE));
                                                                    let AAHAOMIN = Math.min(AAHAOJT, AAHAOST, AAHAOBT);
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "壳体许用应力：" + AAHAOMIN.toFixed(4) + " MPa" +
                                                                        "</span>");
                                                                    let AAHAO2CHK;
                                                                    if (AAHAO2 <= AAHAOMIN) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "壳体实际应力：" + AAHAO2.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        AAHAO2CHK = "合格";
                                                                    }
                                                                    else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "壳体实际应力：" + AAHAO2.toFixed(4) + " MPa" +
                                                                            "</span>");
                                                                        AAHAO2CHK = "不合格";
                                                                    }

                                                                    // 疲劳寿命计算
                                                                    let AAHAO3 = 1.5 * AAHAEJT * AAHATHKJN * AAHADelta / (AAHASDO * AAHASDO * AAHAND);
                                                                    let AAHAOR = AAHAO1 + AAHAO3;
                                                                    let AAHAN;
                                                                    if (AAHAJCategoryVal === "碳素钢和低合金钢") {
                                                                        AAHAN = Math.pow(6187 / AAHAOR, 2.9);
                                                                    }
                                                                    else if (AAHAJCategoryVal === "高合金钢") {
                                                                        AAHAN = Math.pow(5835.5 / AAHAOR, 3.5);
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "膨胀节疲劳寿命：" + AAHAN.toFixed(0) +
                                                                        "</span>");

                                                                    // 压力试验
                                                                    let AAHAETA, AAHAPJT, AAHAPST, AAHAPBT, AAHAPT;
                                                                    if (AAHATest === "液压试验") {
                                                                        AAHAETA = 1.25;
                                                                        AAHAPJT = AAHAETA * AAHAPD * AAHAOJ / Math.max(AAHAOJT, AAHAOJT1);
                                                                        AAHAPST = AAHAETA * AAHAPD * AAHAOS / Math.max(AAHAOST, AAHAOST1);
                                                                        AAHAPBT = AAHAETA * AAHAPD * AAHAOB / Math.max(AAHAOBT, AAHAOBT1);
                                                                        AAHAPT = Math.min(AAHAPJT, AAHAPST, AAHAPBT);
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试压类型：液压" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试验压力：" + AAHAPT.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                    }
                                                                    else if (AAHATest === "气压试验") {
                                                                        AAHAETA = 1.10;
                                                                        AAHAPJT = AAHAETA * AAHAPD * AAHAOJ / Math.max(AAHAOJT, AAHAOJT1);
                                                                        AAHAPST = AAHAETA * AAHAPD * AAHAOS / Math.max(AAHAOST, AAHAOST1);
                                                                        AAHAPBT = AAHAETA * AAHAPD * AAHAOB / Math.max(AAHAOBT, AAHAOBT1);
                                                                        AAHAPT = Math.min(AAHAPJT, AAHAPST, AAHAPBT);
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试压类型：气压" +
                                                                            "&ensp;|&ensp;" +
                                                                            "试验压力：" + AAHAPT.toFixed(4) + " MPa" +
                                                                            "</span>");

                                                                    }

                                                                    // docx
                                                                    let AAHAPayJS = $('#payjs');

                                                                    function getDocx() {
                                                                        $.ajax({
                                                                            type: "POST",
                                                                            contentType: "application/json; charset=utf-8",
                                                                            url: "aahadocx.action",
                                                                            async: true,
                                                                            dataType: "json",
                                                                            data: JSON.stringify({
                                                                                ribbonName: "AAHA",
                                                                                pd: AAHAPD,
                                                                                t: AAHADT,
                                                                                ps: AAHAPS,
                                                                                test: AAHATest,
                                                                                delta: AAHADelta,
                                                                                jstd: AAHAJSTDVal,
                                                                                jname: AAHAJNameVal,
                                                                                sdo: AAHASDO,
                                                                                thkjn: AAHATHKJN,
                                                                                cj2: AAHACJ2,
                                                                                bstd: AAHABSTDVal,
                                                                                bname: AAHABNameVal,
                                                                                thkbn: AAHATHKBN,
                                                                                sstd: AAHASSTDVal,
                                                                                sname: AAHASNameVal,
                                                                                bdi: AAHABDI,
                                                                                thksn: AAHATHKSN,
                                                                                cs2: AAHACS2,
                                                                                l2: AAHAL2,
                                                                                l3: AAHAL3,
                                                                                h: AAHAH,
                                                                                nd: AAHAND,
                                                                                dj: AAHADJ.toFixed(4),
                                                                                ojt: AAHAOJT.toFixed(4),
                                                                                oj: AAHAOJ.toFixed(4),
                                                                                rjel: AAHARJEL.toFixed(4),
                                                                                ojt1: AAHAOJT1.toFixed(4),
                                                                                ejt: (AAHAEJT / 1000).toFixed(4),
                                                                                cj1: AAHACJ1.toFixed(4),
                                                                                ds: AAHADS.toFixed(4),
                                                                                rsel: AAHARSEL.toFixed(4),
                                                                                cs1: AAHACS1.toFixed(4),
                                                                                est: (AAHAEST / 1000).toFixed(4),
                                                                                db: AAHADB.toFixed(4),
                                                                                obt: AAHAOBT.toFixed(4),
                                                                                ob: AAHAOB.toFixed(4),
                                                                                rbel: AAHARBEL.toFixed(4),
                                                                                obt1: AAHAOBT1.toFixed(4),
                                                                                ebt: (AAHAEBT / 1000).toFixed(4),
                                                                                cb1: AAHACB1.toFixed(4),
                                                                                os: AAHAOS.toFixed(4),
                                                                                ost: AAHAOST.toFixed(4),
                                                                                ost1: AAHAOST1.toFixed(4),
                                                                                pc: AAHAPC.toFixed(4),
                                                                                cj: AAHACJ.toFixed(4),
                                                                                thkje: AAHATHKJE.toFixed(4),
                                                                                sdm: AAHASDM.toFixed(4),
                                                                                sdi: AAHASDI.toFixed(4),
                                                                                cs: AAHACS.toFixed(4),
                                                                                thkse: AAHATHKSE.toFixed(4),
                                                                                bdo: AAHABDO.toFixed(4),
                                                                                thkbe: AAHATHKBE.toFixed(4),
                                                                                o1: AAHAO1.toFixed(4),
                                                                                o1chk: AAHAO1CHK,
                                                                                l1: AAHAL1.toFixed(4),
                                                                                o2: AAHAO2.toFixed(4),
                                                                                omin: AAHAOMIN.toFixed(4),
                                                                                o2chk: AAHAO2CHK,
                                                                                o3: AAHAO3.toFixed(4),
                                                                                or: AAHAOR.toFixed(4),
                                                                                n: AAHAN.toFixed(0),
                                                                                eta: AAHAETA.toFixed(4),
                                                                                pjt: AAHAPJT.toFixed(4),
                                                                                pst: AAHAPST.toFixed(4),
                                                                                pbt: AAHAPBT.toFixed(4),
                                                                                pt: AAHAPT.toFixed(4)
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
                                                                                    AAHAPayJS.dialog({
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
                                                                                                AAHAPayJS.dialog("close");
                                                                                                AAHAPayJS.dialog("clear");
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
                                                                                                            AAHAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                    AAHAPayJS.dialog('close');
                                                                                                                    AAHAPayJS.dialog('clear');
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