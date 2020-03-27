$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bdbSketch = $("#d2");
    let bdbModel = $("#d3");
    let bdbd2d3 = $('#d2d3');

    $("#cal").html("<table id='bdb'></table>");
    let pg = $("#bdb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/d/b/BDB.json", function (result) {

        let BDBDT,
            BDBSCategory, BDBSCategoryVal, BDBSType, BDBSTypeVal, BDBSSTD, BDBSSTDVal, BDBSName, BDBSNameVal,
            BDBPCategory, BDBPCategoryVal, BDBPType, BDBPTypeVal, BDBPSTD, BDBPSTDVal, BDBPName, BDBPNameVal,
            BDBRCategory, BDBRCategoryVal, BDBRType, BDBRTypeVal, BDBRSTD, BDBRSTDVal, BDBRName, BDBRNameVal,
            columns, rows, ed;

        function bdb2d(dsi = "ΦDsi", thksn = "δsn",
                       dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α",
                       isPad, dro = "Φdro", thkrn = "δrn") {

            bdbSketch.empty();
            let width = bdbSketch.width();
            let height = bdbSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BDBSVG").attr("height", height);

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
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);
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

            // 图形边距
            let padding = 60;
            let thk = 10;
            let wg = (width - 2 * padding) / 4;
            let hg = (height - 2 * padding) / 4;

            /*
            左侧主视图
             */
            drawCenterLine(padding + wg, padding + hg - 10, padding + wg, padding + 3 * hg + 10);
            // 左侧接管
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg - thk, y: padding + hg},
                {x: padding + 0.5 * wg - thk, y: padding + 3 * hg},
                {x: padding + 0.5 * wg, y: padding + 3 * hg},
                {x: padding + 0.5 * wg, y: padding + hg},
                {x: padding + 0.5 * wg - thk, y: padding + hg}
            ])).classed("sketch", true);
            drawLine(padding + 0.5 * wg, padding + hg, padding + wg, padding + hg);
            drawLine(padding + 0.5 * wg, padding + 3 * hg, padding + wg, padding + 3 * hg);
            // 右侧接管
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg},
                {x: padding + 1.5 * wg, y: padding + 2 * hg + thk},
                {x: padding + 1.5 * wg + thk, y: padding + 2 * hg + thk},
                {x: padding + 1.5 * wg + thk, y: padding + hg},
                {x: padding + 1.5 * wg, y: padding + hg}
            ])).classed("sketch", true);
            drawLine(padding + 1.5 * wg, padding + hg, padding + wg, padding + hg);
            drawLine(padding + 1.5 * wg, padding + 2 * hg + thk, padding + wg, padding + 2 * hg + thk);

            // 左侧筒体
            drawLine(padding - 2 * thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + 2 * hg);
            drawLine(padding - 2 * thk, padding + 2 * hg + thk, padding + 0.5 * wg - thk, padding + 2 * hg + thk);

            // 右侧筒体
            drawLine(padding + 2 * wg + 2 * thk, padding + 2 * hg, padding + 1.5 * wg + thk, padding + 2 * hg);
            drawLine(padding + 2 * wg + 2 * thk, padding + 2 * hg + thk, padding + 1.5 * wg + thk, padding + 2 * hg + thk);

            // 补强圈图形及标记
            let padThk = 0;
            if (isPad === "是") {

                padThk = thk;

                // 左侧补强圈
                svg.append("path").attr("d", line([
                    {x: padding + 0.5 * wg - thk, y: padding + 2 * hg - padThk},
                    {x: padding, y: padding + 2 * hg - padThk},
                    {x: padding, y: padding + 2 * hg}
                ])).classed("sketch", true);

                // 右侧补强圈
                svg.append("path").attr("d", line([
                    {x: padding + 1.5 * wg + thk, y: padding + 2 * hg - padThk},
                    {x: padding + 2 * wg, y: padding + 2 * hg - padThk},
                    {x: padding + 2 * wg, y: padding + 2 * hg}
                ])).classed("sketch", true);

                // dro
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "BDBSketchDRO");
                drawLine(padding, padding + 2 * hg + 3, padding, padding + 3 * hg + 3);
                drawLine(padding + 2 * wg, padding + 2 * hg + 3, padding + 2 * wg, padding + 3 * hg + 3);

                // thkrn
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk},
                        {x: width / 2 - 2 * thk + 3, y: padding + 2 * hg - padThk - 15},
                        {x: width / 2 - 2 * thk - 3, y: padding + 2 * hg - padThk - 15},
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk}
                    ]));
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg},
                        {x: width / 2 - 2 * thk + 3, y: padding + 2 * hg + 15},
                        {x: width / 2 - 2 * thk - 3, y: padding + 2 * hg + 15},
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg}
                    ]));
                svg.append("path").attr("d", line([
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk},
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg + 15 + 10}
                ])).classed("sketch", true);
                svg.append("path").attr("d", line([
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk - 15},
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg - padThk - 15 - 40}
                ])).attr("id", "BDBSketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#BDBSketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "BDBSketchDPO");

            // thkpn
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg, y: padding + 1.5 * hg},
                    {x: padding + 0.5 * wg + 15, y: padding + 1.5 * hg + 3},
                    {x: padding + 0.5 * wg + 15, y: padding + 1.5 * hg - 3},
                    {x: padding + 0.5 * wg, y: padding + 1.5 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 0.5 * wg - thk, y: padding + 1.5 * hg},
                    {x: padding + 0.5 * wg - thk - 15, y: padding + 1.5 * hg + 3},
                    {x: padding + 0.5 * wg - thk - 15, y: padding + 1.5 * hg - 3},
                    {x: padding + 0.5 * wg - thk, y: padding + 1.5 * hg}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg, y: padding + 1.5 * hg},
                {x: padding + 0.5 * wg - thk - 15 - 10, y: padding + 1.5 * hg}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg + 15, y: padding + 1.5 * hg},
                {x: padding + 0.5 * wg + 15 + 40, y: padding + 1.5 * hg}
            ])).attr("id", "BDBSketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDBSketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "BDBSketchHPI");

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "BDBSketchHPO");

            // thksn
            extLineLeftH(padding + 1.5 * wg, padding + 2 * hg);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                    {x: padding + 1.5 * wg - 27, y: padding + 2 * hg - 15},
                    {x: padding + 1.5 * wg - 33, y: padding + 2 * hg - 15},
                    {x: padding + 1.5 * wg - 30, y: padding + 2 * hg}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk},
                    {x: padding + 1.5 * wg - 27, y: padding + 2 * hg + thk + 15},
                    {x: padding + 1.5 * wg - 33, y: padding + 2 * hg + thk + 15},
                    {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg - 15},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg - 15 - 40}
            ])).attr("id", "BDBSketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDBSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // dsi
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: width / 2 - 5 * thk, y: padding + 2 * hg + thk},
                    {x: width / 2 - 5 * thk + 3, y: padding + 2 * hg + thk + 15},
                    {x: width / 2 - 5 * thk - 3, y: padding + 2 * hg + thk + 15},
                    {x: width / 2 - 5 * thk, y: padding + 2 * hg + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: width / 2 - 5 * thk, y: padding + 2 * hg + thk + 15 + 60},
                {x: width / 2 - 5 * thk, y: padding + 2 * hg + thk + 15}
            ])).attr("id", "BDBSketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDBSketchDSI").attr("startOffset", "50%").text(dsi);

            // alpha
            let pr = thk;
            let sr = Math.min(wg, hg);
            let cx0 = padding + 3 * wg;
            let cy0 = height / 2;
            drawCenterLine(cx0 - sr - 10, cy0, cx0 + sr + 10, cy0);
            drawArc(sr, sr, cx0, cy0 + sr, cx0, cy0 - sr);
            drawArc(sr, sr, cx0, cy0 - sr, cx0, cy0 + sr);
            svg.append("path").attr("d", line([
                {x: cx0 - pr, y: cy0 - sr + 0.707 * pr},
                {x: cx0 - pr, y: cy0 - sr - 4 * pr},
                {x: cx0 + pr, y: cy0 - sr - 4 * pr},
                {x: cx0 + pr, y: cy0 - sr - 0.707 * pr}
            ])).classed("sketch", true)
                .attr("transform", "rotate(" + 45 + ", " + (cx0) + " " + (cy0 - sr) + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - sr + 15},
                {x: cx0, y: cy0 - sr - 4 * pr - 25}
            ])).attr("stroke-dasharray", "25,5,5,5")
                .attr("transform", "rotate(" + 45 + ", " + (cx0) + " " + (cy0 - sr) + ")")
                .classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0, y: cy0 - sr - 4 * pr - 25},
                {x: cx0, y: cy0 + sr + 10}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0, y: cy0 - sr - 4 * pr - 10},
                    {x: cx0 + 10, y: cy0 - sr - 4 * pr - 10 - 2},
                    {x: cx0 + 10, y: cy0 - sr - 4 * pr - 10 + 2},
                    {x: cx0, y: cy0 - sr - 4 * pr - 10}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx0, y: cy0 - sr - 4 * pr - 10},
                    {x: cx0 - 10, y: cy0 - sr - 4 * pr - 10 - 2},
                    {x: cx0 - 10, y: cy0 - sr - 4 * pr - 10 + 2},
                    {x: cx0, y: cy0 - sr - 4 * pr - 10}
                ])).attr("transform", "rotate(" + 45 + ", " + (cx0) + " " + (cy0 - sr) + ")");

            svg.append("path").attr("d", "M "
                + (cx0) + " " + (cy0 - sr - 4 * pr - 10) + " "
                + "A" + (4 * pr + 10) + " " + (4 * pr + 10) + " "
                + "1 0 1" + " "
                + (cx0 + (4 * pr + 10) * 0.707) + " " + (cy0 - sr - (4 * pr + 10) * 0.707)
            ).classed("sketch", true).attr("id", "BDBSketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDBSketchALPHA").attr("startOffset", "50%").text(alpha);

        }

        currentTabIndex = bdbd2d3.tabs('getTabIndex', bdbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bdb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bdb").length > 0) {
                    bdb2d();
                }
            });
        }
        bdbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bdb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bdb").length > 0) {
                            bdb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 球形封头插入式接管开孔补强",
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
                if (index === 25 || index === 26 || index === 27 || index === 28 || index === 29 || index === 30 || index === 31
                    || index === 34) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 5) {
                    $(ed.target).combobox("loadData", BDBSCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BDBSType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BDBSSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BDBSName);
                }

                else if (index === 13) {
                    $(ed.target).combobox("loadData", BDBPCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BDBPType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BDBPSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BDBPName);
                }

                else if (index === 25) {
                    $(ed.target).combobox("loadData", BDBRCategory);
                }
                else if (index === 26) {
                    $(ed.target).combobox("loadData", BDBRType);
                }
                else if (index === 27) {
                    $(ed.target).combobox("loadData", BDBRSTD);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BDBRName);
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
                    bdbSketch.empty();
                    bdbModel.empty();

                    // sketch
                    currentTabIndex = bdbd2d3.tabs('getTabIndex', bdbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bdb2d();
                        bdbSketch.off("resize").on("resize", function () {
                            if ($("#bdb").length > 0) {
                                bdb2d();
                            }
                        });
                    }
                    bdbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bdb2d();
                                bdbSketch.off("resize").on("resize", function () {
                                    if ($("#bdb").length > 0) {
                                        bdb2d();
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
                    if (index === 2) {

                        BDBDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BDBSCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDBSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDBSName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BDBPCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BDBPType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDBPSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDBPName = null;

                        rows[25][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 25);
                        BDBRCategory = null;
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        BDBRType = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BDBRSTD = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDBRName = null;

                        if (rows[24][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 25).hide();
                            pg.propertygrid('options').finder.getTr(this, 26).hide();
                            pg.propertygrid('options').finder.getTr(this, 27).hide();
                            pg.propertygrid('options').finder.getTr(this, 28).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBSCategory = [];
                                BDBPCategory = [];
                                BDBRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BDBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BDBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDBPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDBRCategory[index] = {
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
                    else if (index === 5) {

                        BDBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDBSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBSCategoryVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBSType = [];
                                $(result).each(function (index, element) {
                                    BDBSType[index] = {
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
                    else if (index === 6) {

                        BDBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBSCategoryVal,
                                type: BDBSTypeVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBSSTD = [];
                                $(result).each(function (index, element) {
                                    BDBSSTD[index] = {
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
                    else if (index === 7) {

                        BDBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBSCategoryVal,
                                type: BDBSTypeVal,
                                std: BDBSSTDVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBSName = [];
                                $(result).each(function (index, element) {
                                    BDBSName[index] = {
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

                        BDBPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BDBPType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDBPSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDBPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBPCategoryVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBPType = [];
                                $(result).each(function (index, element) {
                                    BDBPType[index] = {
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

                        BDBPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDBPSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDBPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBPCategoryVal,
                                type: BDBPTypeVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBPSTD = [];
                                $(result).each(function (index, element) {
                                    BDBPSTD[index] = {
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

                        BDBPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDBPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBPCategoryVal,
                                type: BDBPTypeVal,
                                std: BDBPSTDVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBPName = [];
                                $(result).each(function (index, element) {
                                    BDBPName[index] = {
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
                    else if (index === 25) {

                        BDBRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        BDBRType = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BDBRSTD = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDBRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBRCategoryVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBRType = [];
                                $(result).each(function (index, element) {
                                    BDBRType[index] = {
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
                    else if (index === 26) {

                        BDBRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BDBRSTD = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDBRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBRCategoryVal,
                                type: BDBRTypeVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBRSTD = [];
                                $(result).each(function (index, element) {
                                    BDBRSTD[index] = {
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
                    else if (index === 27) {

                        BDBRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDBRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDBRCategoryVal,
                                type: BDBRTypeVal,
                                std: BDBRSTDVal,
                                temp: BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDBRName = [];
                                $(result).each(function (index, element) {
                                    BDBRName[index] = {
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

                        /*
                        此处代码仅处理 UI，和 value 业务逻辑没关系
                         */
                        // UI - IsPAD
                        if (index === 24) {
                            if (rows[24][columns[0][1].field] === "是") {
                                pg.propertygrid('options').finder.getTr(this, 25).show();
                                pg.propertygrid('options').finder.getTr(this, 26).show();
                                pg.propertygrid('options').finder.getTr(this, 27).show();
                                pg.propertygrid('options').finder.getTr(this, 28).show();
                                pg.propertygrid('options').finder.getTr(this, 29).show();
                                pg.propertygrid('options').finder.getTr(this, 30).show();
                                pg.propertygrid('options').finder.getTr(this, 31).show();
                            }
                            else if (rows[24][columns[0][1].field] === "否") {
                                pg.propertygrid('options').finder.getTr(this, 25).hide();
                                pg.propertygrid('options').finder.getTr(this, 26).hide();
                                pg.propertygrid('options').finder.getTr(this, 27).hide();
                                pg.propertygrid('options').finder.getTr(this, 28).hide();
                                pg.propertygrid('options').finder.getTr(this, 29).hide();
                                pg.propertygrid('options').finder.getTr(this, 30).hide();
                                pg.propertygrid('options').finder.getTr(this, 31).hide();
                            }
                            else {
                                return false;
                            }
                        }
                        // UI - IsB
                        if (index === 33) {
                            if (rows[33][columns[0][1].field] === "是") {
                                pg.datagrid('options').finder.getTr(this, 34).show();
                            }
                            else if (rows[33][columns[0][1].field] === "否") {
                                pg.datagrid('options').finder.getTr(this, 34).hide();
                            }
                            else {
                                return false;
                            }
                        }

                        // Tag
                        let BDBTag = "符号标记";
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BDBTag = rows[0][columns[0][1].field];
                        }

                        // 设计压力
                        let BDBPD;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            BDBPD = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BDBPS;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BDBPS = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Test
                        let BDBTest;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            BDBTest = rows[4][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 圆筒材料名称
                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                            BDBSNameVal = rows[8][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取筒体材料密度、最大最小厚度
                        let BDBDS, BDBSThkMin, BDBSThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BDBSCategoryVal,
                                "type": BDBSTypeVal,
                                "std": BDBSSTDVal,
                                "name": BDBSNameVal,
                                "temp": BDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BDBDS = parseFloat(result.density);
                                BDBSThkMin = parseFloat(result.thkMin);
                                BDBSThkMax = parseFloat(result.thkMax);

                                let BDBDSI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    BDBDSI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdb2d("Φ" + BDBDSI);
                                    bdbSketch.off("resize").on("resize", function () {
                                        if ($("#bdb").length > 0) {
                                            bdb2d("Φ" + BDBDSI);
                                        }
                                    });
                                }
                                bdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdb2d("Φ" + BDBDSI);
                                            bdbSketch.off("resize").on("resize", function () {
                                                if ($("#bdb").length > 0) {
                                                    bdb2d("Φ" + BDBDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // THKSN
                                let BDBTHKSN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BDBSThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= BDBSThkMax) {
                                    BDBTHKSN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= BDBSThkMin) {
                                    south.html("封头材料厚度不能小于等于 " + BDBSThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BDBSThkMax) {
                                    south.html("封头材料厚度不能大于 " + BDBSThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdb2d("Φ" + BDBDSI, BDBTHKSN);
                                    bdbSketch.off("resize").on("resize", function () {
                                        if ($("#bdb").length > 0) {
                                            bdb2d("Φ" + BDBDSI, BDBTHKSN);
                                        }
                                    });
                                }
                                bdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdb2d("Φ" + BDBDSI, BDBTHKSN);
                                            bdbSketch.off("resize").on("resize", function () {
                                                if ($("#bdb").length > 0) {
                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                /*
                                获取筒体力学特性
                                 */
                                let BDBOST, BDBOS, BDBRSEL, BDBCS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BDBSCategoryVal,
                                        "type": BDBSTypeVal,
                                        "std": BDBSSTDVal,
                                        "name": BDBSNameVal,
                                        "thk": BDBTHKSN,
                                        "temp": BDBDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BDBDSI + 2 * BDBTHKSN
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BDBOST = parseFloat(result.ot);
                                        if (BDBOST < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDBOS = parseFloat(result.o);
                                        if (BDBOS < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDBRSEL = parseFloat(result.rel);
                                        if (BDBRSEL < 0) {
                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BDBCS1 = parseFloat(result.c1);
                                        if (BDBCS1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        let BDBCS2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < BDBTHKSN) {
                                            BDBCS2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= BDBTHKSN) {
                                            south.html("封头腐蚀裕量不能大于等于 " + BDBTHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        let BDBES;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            BDBES = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 接管材料名称
                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                            BDBPNameVal = rows[16][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取接管材料密度、最大最小厚度
                                        let BDBDP, BDBPThkMin, BDBPThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BDBPCategoryVal,
                                                "type": BDBPTypeVal,
                                                "std": BDBPSTDVal,
                                                "name": BDBPNameVal,
                                                "temp": BDBDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BDBDP = parseFloat(result.density);
                                                BDBPThkMin = parseFloat(result.thkMin);
                                                BDBPThkMax = parseFloat(result.thkMax);

                                                let BDBDPO;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                    BDBDPO = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO);
                                                    bdbSketch.off("resize").on("resize", function () {
                                                        if ($("#bdb").length > 0) {
                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO);
                                                        }
                                                    });
                                                }
                                                bdbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO);
                                                            bdbSketch.off("resize").on("resize", function () {
                                                                if ($("#bdb").length > 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // THKPN
                                                let BDBTHKPN;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > BDBPThkMin
                                                    && parseFloat(rows[18][columns[0][1].field]) <= Math.min(BDBPThkMax, BDBDPO / 2)) {
                                                    BDBTHKPN = parseFloat(rows[18][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) <= BDBPThkMin) {
                                                    south.html("接管材料厚度不能小于等于 " + BDBPThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > Math.min(BDBPThkMax, BDBDPO / 2)) {
                                                    south.html("接管材料厚度不能大于 " + Math.min(BDBPThkMax, BDBDPO / 2) + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN);
                                                    bdbSketch.off("resize").on("resize", function () {
                                                        if ($("#bdb").length > 0) {
                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN);
                                                        }
                                                    });
                                                }
                                                bdbd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN);
                                                            bdbSketch.off("resize").on("resize", function () {
                                                                if ($("#bdb").length > 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BDBOPT, BDBOP, BDBRPEL, BDBCP1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BDBPCategoryVal,
                                                        "type": BDBPTypeVal,
                                                        "std": BDBPSTDVal,
                                                        "name": BDBPNameVal,
                                                        "thk": BDBTHKPN,
                                                        "temp": BDBDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BDBDPO
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BDBOPT = parseFloat(result.ot);
                                                        if (BDBOPT < 0) {
                                                            south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDBOP = parseFloat(result.o);
                                                        if (BDBOP < 0) {
                                                            south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDBRPEL = parseFloat(result.rel);
                                                        if (BDBRPEL < 0) {
                                                            south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDBCP1 = parseFloat(result.c1);
                                                        if (BDBCP1 < 0) {
                                                            south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        let BDBHPO;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                            BDBHPO = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN, BDBHPO);
                                                            bdbSketch.off("resize").on("resize", function () {
                                                                if ($("#bdb").length > 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN, BDBHPO);
                                                                }
                                                            });
                                                        }
                                                        bdbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN, BDBHPO);
                                                                    bdbSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdb").length > 0) {
                                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN, BDBHPO);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDBHPI;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                            BDBHPI = parseFloat(rows[20][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI);
                                                            bdbSketch.off("resize").on("resize", function () {
                                                                if ($("#bdb").length > 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI);
                                                                }
                                                            });
                                                        }
                                                        bdbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI);
                                                                    bdbSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdb").length > 0) {
                                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN, "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDBALPHA;
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                            BDBALPHA = parseFloat(rows[21][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                BDBALPHA + "°");
                                                            bdbSketch.off("resize").on("resize", function () {
                                                                if ($("#bdb").length > 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                        "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                        BDBALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                        bdbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                        "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                        BDBALPHA + "°");
                                                                    bdbSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdb").length > 0) {
                                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                                "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                                BDBALPHA + "°");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDBCP2;
                                                        if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                            && parseFloat(rows[22][columns[0][1].field]) < BDBTHKPN) {
                                                            BDBCP2 = parseFloat(rows[22][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                            && parseFloat(rows[22][columns[0][1].field]) >= BDBTHKPN) {
                                                            south.html("接管腐蚀裕量不能大于等于 " + BDBTHKPN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let BDBEP;
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                            BDBEP = parseFloat(rows[23][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        这个层次为计算逻辑主线
                                                         */

                                                        // 补强圈分支
                                                        let BDBIsPAD;
                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                            BDBIsPAD = rows[24][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                BDBALPHA + "°", BDBIsPAD);
                                                            bdbSketch.off("resize").on("resize", function () {
                                                                if ($("#bdb").length > 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                        "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                        BDBALPHA + "°", BDBIsPAD);
                                                                }
                                                            });
                                                        }
                                                        bdbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                        "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                        BDBALPHA + "°", BDBIsPAD);
                                                                    bdbSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdb").length > 0) {
                                                                            bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                                "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                                BDBALPHA + "°", BDBIsPAD);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDBDR = -1.0, BDBRThkMin = -1.0, BDBRThkMax = -1.0;
                                                        let BDBDRO = -1.0, BDBTHKRN = -1.0, BDBCR2 = -1.0;
                                                        let BDBORT = -1.0, BDBOR = -1.0, BDBRREL = -1.0, BDBCR1 = -1.0;
                                                        if (BDBIsPAD === "是") {

                                                            if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])) {
                                                                BDBRNameVal = rows[28][columns[0][1].field];
                                                            }
                                                            else {
                                                                return false;
                                                            }

                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "web_get_nbt_47003_1_2009_index.action",
                                                                async: false,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    "category": BDBRCategoryVal,
                                                                    "type": BDBRTypeVal,
                                                                    "std": BDBRSTDVal,
                                                                    "name": BDBRNameVal,
                                                                    "temp": BDBDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BDBDR = parseFloat(result.density);
                                                                    BDBRThkMin = parseFloat(result.thkMin);
                                                                    BDBRThkMax = parseFloat(result.thkMax);

                                                                    // dro
                                                                    if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                        && parseFloat(rows[29][columns[0][1].field]) > BDBDPO) {
                                                                        BDBDRO = parseFloat(rows[29][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                                        && parseFloat(rows[29][columns[0][1].field]) <= BDBDPO) {
                                                                        south.html("补强圈外直径 Dro 不能小于等于 " + BDBDPO + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                            "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                            BDBALPHA + "°", BDBIsPAD, "Φ" + BDBDRO);
                                                                        bdbSketch.off("resize").on("resize", function () {
                                                                            if ($("#bdb").length > 0) {
                                                                                bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                                    "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                                    BDBALPHA + "°", BDBIsPAD, "Φ" + BDBDRO);
                                                                            }
                                                                        });
                                                                    }
                                                                    bdbd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                                    "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                                    BDBALPHA + "°", BDBIsPAD, "Φ" + BDBDRO);
                                                                                bdbSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bdb").length > 0) {
                                                                                        bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                                            "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                                            BDBALPHA + "°", BDBIsPAD, "Φ" + BDBDRO);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                        && parseFloat(rows[30][columns[0][1].field]) > BDBRThkMin
                                                                        && parseFloat(rows[30][columns[0][1].field]) <= Math.min(BDBRThkMax, 1.5 * BDBTHKSN)) {
                                                                        BDBTHKRN = parseFloat(rows[30][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                        && parseFloat(rows[30][columns[0][1].field]) <= BDBRThkMin) {
                                                                        south.html("补强圈材料厚度不能小于等于 " + BDBRThkMin + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                        && parseFloat(rows[30][columns[0][1].field]) > Math.min(BDBRThkMax, 1.5 * BDBTHKSN)) {
                                                                        south.html("补强圈材料厚度不能大于 " + Math.min(BDBRThkMax, 1.5 * BDBTHKSN) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                            "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                            BDBALPHA + "°", BDBIsPAD, "Φ" + BDBDRO, BDBTHKRN);
                                                                        bdbSketch.off("resize").on("resize", function () {
                                                                            if ($("#bdb").length > 0) {
                                                                                bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                                    "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                                    BDBALPHA + "°", BDBIsPAD, "Φ" + BDBDRO, BDBTHKRN);
                                                                            }
                                                                        });
                                                                    }
                                                                    bdbd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                                    "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                                    BDBALPHA + "°", BDBIsPAD, "Φ" + BDBDRO, BDBTHKRN);
                                                                                bdbSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bdb").length > 0) {
                                                                                        bdb2d("Φ" + BDBDSI, BDBTHKSN,
                                                                                            "Φ" + BDBDPO, BDBTHKPN, BDBHPO, BDBHPI,
                                                                                            BDBALPHA + "°", BDBIsPAD, "Φ" + BDBDRO, BDBTHKRN);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    $.ajax({
                                                                        type: "POST",
                                                                        contentType: "application/json; charset=utf-8",
                                                                        url: "web_get_nbt_47003_1_2009_com_property.action",
                                                                        async: false,
                                                                        dataType: "json",
                                                                        data: JSON.stringify({
                                                                            "category": BDBRCategoryVal,
                                                                            "type": BDBRTypeVal,
                                                                            "std": BDBRSTDVal,
                                                                            "name": BDBRNameVal,
                                                                            "thk": BDBTHKRN,
                                                                            "temp": BDBDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": BDBDRO
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BDBORT = parseFloat(result.ot);
                                                                            if (BDBORT < 0) {
                                                                                south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDBOR = parseFloat(result.o);
                                                                            if (BDBOR < 0) {
                                                                                south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDBRREL = parseFloat(result.rel);
                                                                            if (BDBRREL < 0) {
                                                                                south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDBCR1 = parseFloat(result.c1);
                                                                            if (BDBCR1 < 0) {
                                                                                south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 补强圈腐蚀裕量 cr2
                                                                            if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                && parseFloat(rows[31][columns[0][1].field]) < BDBTHKRN) {
                                                                                BDBCR2 = parseFloat(rows[31][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                                && parseFloat(rows[31][columns[0][1].field]) >= BDBTHKRN) {
                                                                                south.html("补强圈腐蚀裕量不能大于等于 " + BDBTHKRN + " mm").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                return false;
                                                                            }
                                                                        },
                                                                        error: function () {
                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                        }
                                                                    });
                                                                },
                                                                error: function () {
                                                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                        "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                }
                                                            });

                                                            // 判断补强圈数据是否输入完全
                                                            if (BDBCR2 < 0) {
                                                                return false;
                                                            }
                                                        }

                                                        // A3
                                                        let BDBA3;
                                                        if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                            BDBA3 = parseFloat(rows[32][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // IsB
                                                        let BDBIsB;
                                                        if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])) {
                                                            BDBIsB = rows[33][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // BS
                                                        let BDBBS = -1.0;
                                                        if (BDBIsB === "是") {

                                                            // 获取 BS
                                                            if (parseFloat(rows[34][columns[0][1].field]) > BDBDPO) {
                                                                BDBBS = parseFloat(rows[34][columns[0][1].field]);
                                                            }
                                                            else if (parseFloat(rows[34][columns[0][1].field]) <= BDBDPO) {
                                                                south.html("指定补强范围 B 不能小于等于 " + BDBDPO + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }
                                                        }

                                                        /*
                                                        过程参数
                                                         */

                                                        let BDBPC = BDBPD + BDBPS;

                                                        // 球壳
                                                        let BDBCS = BDBCS1 + BDBCS2;
                                                        let BDBTHKSE = BDBTHKSN - BDBCS;

                                                        // 接管
                                                        let BDBCP = BDBCP1 + BDBCP2;
                                                        let BDBTHKPE = BDBTHKPN - BDBCP;
                                                        let BDBDPC = BDBDPO - 2 * BDBTHKPN + 2 * BDBCP;
                                                        let BDBSA = BDBDPC / Math.cos(BDBALPHA / 180 * Math.PI);
                                                        let BDBSB = BDBDPC;
                                                        let BDBK = BDBSA / BDBSB;
                                                        if (BDBK > 2) {
                                                            south.html("开孔长短轴之比大于2，程序无法计算！")
                                                                .css("color", "red");
                                                            return false;
                                                        }
                                                        let BDBDOP = BDBSA;
                                                        if (BDBDOP > 0.6 * BDBDSI) {
                                                            south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                        let BDBFP = Math.min(1.0, BDBOPT / BDBOST);

                                                        // 补强圈
                                                        let BDBCR = -1.0, BDBTHKRE = -1.0, BDBFR = -1.0;
                                                        if (BDBIsPAD === "是") {
                                                            BDBCR = BDBCR1 + BDBCR2;
                                                            BDBTHKRE = BDBTHKRN - BDBCR;
                                                            BDBFR = Math.min(1.0, BDBORT / BDBOST);
                                                        }

                                                        /*
                                                        封头内压强度校核
                                                         */
                                                        let BDBTHKSC = BDBPC * BDBDSI / (4 * BDBOST * BDBES);
                                                        let BDBTHKSD = BDBTHKSC + BDBCS2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "球壳内压所需厚度：" + (BDBTHKSD + BDBCS1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDBTHKSCHK;
                                                        if (BDBTHKSN >= (BDBTHKSD + BDBCS1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDBTHKSN + " mm" +
                                                                "</span>");
                                                            BDBTHKSCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDBTHKSN + " mm" +
                                                                "</span>");
                                                            BDBTHKSCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        接管内压强度校核
                                                         */
                                                        let BDBTHKPC = BDBPC * (BDBDPO - 2 * BDBTHKPN) / (2 * BDBOPT * BDBEP);
                                                        let BDBTHKPD = BDBTHKPC + BDBCP2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "接管内压所需厚度：" + (BDBTHKPD + BDBCP1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDBTHKPCHK;
                                                        if (BDBTHKPN >= (BDBTHKPD + BDBCP1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDBTHKPN + " mm" +
                                                                "</span>");
                                                            BDBTHKPCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDBTHKPN + " mm" +
                                                                "</span>");
                                                            BDBTHKPCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        开孔补强计算
                                                         */
                                                        let BDBBA = BDBDOP * BDBTHKSC + 2 * BDBTHKSC * BDBTHKPE * (1 - BDBFP);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "开孔所需补强面积：" + BDBBA.toFixed(2) + " mm²" +
                                                            "</span>");

                                                        // 筒体
                                                        let BDBBB;
                                                        if (BDBIsB === "是") {
                                                            BDBBB = Math.min(Math.max(2 * BDBDOP, BDBDOP + 2 * BDBTHKSN + 2 * BDBTHKPN), BDBBS);
                                                        }
                                                        else if (BDBIsB === "否") {
                                                            BDBBB = Math.max(2 * BDBDOP, BDBDOP + 2 * BDBTHKSN + 2 * BDBTHKPN);
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                        let BDBA1 = (BDBBB - BDBDOP) * (BDBTHKSE - BDBTHKSC) - 2 * BDBTHKPE * (BDBTHKSE - BDBTHKSC) * (1 - BDBFP);

                                                        // 接管
                                                        let BDBHP1 = Math.min(BDBHPO, Math.sqrt(BDBDOP * BDBTHKPN));
                                                        let BDBHP2 = Math.min(BDBHPI, Math.sqrt(BDBDOP * BDBTHKPN));
                                                        let BDBA2 = 2 * BDBHP1 * (BDBTHKPE - BDBTHKPC) * BDBFP + 2 * BDBHP2 * (BDBTHKPE - BDBCP2) * BDBFP;

                                                        // 补强圈
                                                        let BDBA4 = 0.0, BDBDRE = -1.0;
                                                        if (BDBIsPAD === "是") {
                                                            BDBDRE = Math.min(BDBDRO, BDBBB);
                                                            BDBA4 = (BDBDRE - BDBDPO) * BDBTHKRE * BDBFR;
                                                        }

                                                        // Ae
                                                        let BDBAE = BDBA1 + BDBA2 + BDBA3 + BDBA4;
                                                        let BDBACHK;
                                                        if (BDBAE >= BDBBA.toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDBAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDBACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDBAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDBACHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        压力试验
                                                         */
                                                        let BDBETA, BDBPST, BDBPPT, BDBPT;
                                                        if (BDBTest === "液压试验") {
                                                            BDBETA = 1.25;
                                                            BDBPST = Math.max(BDBETA * BDBPD * BDBOS / BDBOST, 0.05);
                                                            BDBPPT = Math.max(BDBETA * BDBPD * BDBOP / BDBOPT, 0.05);
                                                            BDBPT = Math.min(BDBPST, BDBPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDBPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (BDBTest === "气压试验") {
                                                            BDBETA = 1.10;
                                                            BDBPST = Math.max(BDBETA * BDBPD * BDBOS / BDBOST, 0.05);
                                                            BDBPPT = Math.max(BDBETA * BDBPD * BDBOP / BDBOPT, 0.05);
                                                            BDBPT = Math.min(BDBPST, BDBPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDBPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        计算 MAWP
                                                         */
                                                        // 筒体
                                                        let BDBMAWPS = 4 * BDBTHKSE * BDBOST * BDBES / BDBDSI - BDBPS;

                                                        // 接管
                                                        let BDBMAWPP = 2 * BDBTHKPE * BDBOPT * BDBEP / (BDBDPO - 2 * BDBTHKPN) - BDBPS;

                                                        // 开孔补强
                                                        let BDBMAWPA1 = -1, BDBMAWPA2 = -1,
                                                            BDBMAWPA3 = BDBA3, BDBMAWPA4 = BDBA4,
                                                            BDBMAWPA = -1, BDBMAWPAE = -1,
                                                            BDBMAWPRC = BDBPC;
                                                        let BDBMAWPTHKSC, BDBMAWPTHKPC;
                                                        while (BDBMAWPAE >= BDBMAWPA) {

                                                            BDBMAWPRC += 0.0001;

                                                            // 封头计算厚度
                                                            BDBMAWPTHKSC = BDBMAWPRC * BDBDSI / (4 * BDBOST * BDBES);
                                                            BDBMAWPA = BDBDOP * BDBMAWPTHKSC + 2 * BDBMAWPTHKSC * BDBTHKPE * (1 - BDBFP);

                                                            // 接管计算厚度
                                                            BDBMAWPTHKPC = BDBMAWPRC * (BDBDPO - 2 * BDBTHKPN) / (2 * BDBOPT * BDBEP);
                                                            BDBMAWPA1 = (BDBBB - BDBDOP) * (BDBTHKSE - BDBMAWPTHKSC) - 2 * BDBTHKPE * (BDBTHKSE - BDBMAWPTHKSC) * (1 - BDBFP);
                                                            BDBMAWPA2 = 2 * BDBHP1 * (BDBTHKPE - BDBMAWPTHKPC) * BDBFP + 2 * BDBHP2 * (BDBTHKPE - BDBCP2) * BDBFP;
                                                            BDBMAWPAE = BDBMAWPA1 + BDBMAWPA2 + BDBMAWPA3 + BDBMAWPA4;
                                                        }

                                                        // 取用 MAWP
                                                        let BDBMAWPR = BDBMAWPRC - BDBPS - 0.0001;
                                                        let BDBMAWP = Math.min(BDBMAWPS, BDBMAWPP, BDBMAWPR);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "MAWP：" + BDBMAWP.toFixed(4) + " MPa" +
                                                            "</span>");

                                                        // docx
                                                        let BDBPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "bdbdocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "BDB",

                                                                    isPad: BDBIsPAD,
                                                                    isB: BDBIsB,

                                                                    tag: BDBTag,
                                                                    pd: BDBPD,
                                                                    t: BDBDT,
                                                                    ps: BDBPS,
                                                                    test: BDBTest,

                                                                    stds: BDBSSTDVal,
                                                                    names: BDBSNameVal,
                                                                    dsi: BDBDSI,
                                                                    thksn: BDBTHKSN,
                                                                    cs2: BDBCS2,
                                                                    es: BDBES,

                                                                    stdp: BDBPSTDVal,
                                                                    namep: BDBPNameVal,
                                                                    dpo: BDBDPO,
                                                                    thkpn: BDBTHKPN,
                                                                    hpo: BDBHPO,
                                                                    hpi: BDBHPI,
                                                                    alpha: BDBALPHA,
                                                                    cp2: BDBCP2,
                                                                    ep: BDBEP,

                                                                    stdr: BDBRSTDVal,
                                                                    namer: BDBRNameVal,
                                                                    dro: BDBDRO,
                                                                    thkrn: BDBTHKRN,
                                                                    cr2: BDBCR2,

                                                                    a3: BDBA3,
                                                                    bs: BDBBS,

                                                                    ds: BDBDS.toFixed(4),
                                                                    cs1: BDBCS1.toFixed(4),
                                                                    rsel: BDBRSEL.toFixed(4),
                                                                    ost: BDBOST.toFixed(4),
                                                                    os: BDBOS.toFixed(4),

                                                                    dp: BDBDP.toFixed(4),
                                                                    cp1: BDBCP1.toFixed(4),
                                                                    rpel: BDBRPEL.toFixed(4),
                                                                    opt: BDBOPT.toFixed(4),
                                                                    op: BDBOP.toFixed(4),

                                                                    dr: BDBDR.toFixed(4),
                                                                    cr1: BDBCR1.toFixed(4),
                                                                    rrel: BDBRREL.toFixed(4),
                                                                    ort: BDBORT.toFixed(4),
                                                                    or: BDBOR.toFixed(4),

                                                                    pc: BDBPC.toFixed(4),
                                                                    cs: BDBCS.toFixed(4),
                                                                    thkse: BDBTHKSE.toFixed(4),

                                                                    cp: BDBCP.toFixed(4),
                                                                    thkpe: BDBTHKPE.toFixed(4),
                                                                    dpc: BDBDPC.toFixed(4),
                                                                    sa: BDBSA.toFixed(4),
                                                                    sb: BDBSB.toFixed(4),
                                                                    k: BDBK.toFixed(4),
                                                                    dop: BDBDOP.toFixed(4),
                                                                    fp: BDBFP.toFixed(4),

                                                                    cr: BDBCR.toFixed(4),
                                                                    thkre: BDBTHKRE.toFixed(4),
                                                                    fr: BDBFR.toFixed(4),

                                                                    thksc: BDBTHKSC.toFixed(4),
                                                                    thksd: BDBTHKSD.toFixed(4),
                                                                    thkschk: BDBTHKSCHK,

                                                                    thkpc: BDBTHKPC.toFixed(4),
                                                                    thkpd: BDBTHKPD.toFixed(4),
                                                                    thkpchk: BDBTHKPCHK,

                                                                    ba: BDBBA.toFixed(4),
                                                                    bb: BDBBB.toFixed(4),
                                                                    a1: BDBA1.toFixed(4),
                                                                    hp1: BDBHP1.toFixed(4),
                                                                    hp2: BDBHP2.toFixed(4),
                                                                    a2: BDBA2.toFixed(4),
                                                                    dre: BDBDRE.toFixed(4),
                                                                    a4: BDBA4.toFixed(4),
                                                                    ae: BDBAE.toFixed(4),
                                                                    achk: BDBACHK,

                                                                    eta: BDBETA.toFixed(4),
                                                                    pst: BDBPST.toFixed(4),
                                                                    ppt: BDBPPT.toFixed(4),
                                                                    pt: BDBPT.toFixed(4),

                                                                    mawps: BDBMAWPS.toFixed(4),
                                                                    mawpp: BDBMAWPP.toFixed(4),
                                                                    mawpa1: BDBMAWPA1.toFixed(0),
                                                                    mawpa2: BDBMAWPA2.toFixed(0),
                                                                    mawpa3: BDBMAWPA3,
                                                                    mawpa4: BDBMAWPA4.toFixed(0),
                                                                    mawpa: BDBMAWPA.toFixed(0),
                                                                    mawpae: BDBMAWPAE.toFixed(0),
                                                                    mawpr: BDBMAWPR.toFixed(4),
                                                                    mawp: BDBMAWP.toFixed(4)
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
                                                                        BDBPayJS.dialog({
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
                                                                                    BDBPayJS.dialog("close");
                                                                                    BDBPayJS.dialog("clear");
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
                                                                                                BDBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        BDBPayJS.dialog('close');
                                                                                                        BDBPayJS.dialog('clear');
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
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    },
                                    error: function () {
                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
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
                pg.propertygrid('options').finder.getTr(this, 25).hide();
                pg.propertygrid('options').finder.getTr(this, 26).hide();
                pg.propertygrid('options').finder.getTr(this, 27).hide();
                pg.propertygrid('options').finder.getTr(this, 28).hide();
                pg.propertygrid('options').finder.getTr(this, 29).hide();
                pg.propertygrid('options').finder.getTr(this, 30).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 34).hide();
            }
        });
    });
});