$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let acdbSketch = $("#d2");
    let acdbModel = $("#d3");
    let acdbd2d3 = $('#d2d3');

    $("#cal").html("<table id='acdb'></table>");
    let pg = $("#acdb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/d/b/ACDB.json", function (result) {

        let ACDBDT,
            ACDBSCategory, ACDBSCategoryVal, ACDBSType, ACDBSTypeVal, ACDBSSTD, ACDBSSTDVal, ACDBSName, ACDBSNameVal,
            ACDBPCategory, ACDBPCategoryVal, ACDBPType, ACDBPTypeVal, ACDBPSTD, ACDBPSTDVal, ACDBPName, ACDBPNameVal,
            ACDBRCategory, ACDBRCategoryVal, ACDBRType, ACDBRTypeVal, ACDBRSTD, ACDBRSTDVal, ACDBRName, ACDBRNameVal,
            columns, rows, ed;

        // 壳体内径
        function acdb2d(idod, dsi = "ΦDsi", dso = "ΦDso", brsi = "Rsi", brso = "Rso", srsi = "rsi", srso = "rso", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", alpha = "α", beta = "β", l = "L",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            acdbSketch.empty();
            let width = acdbSketch.width();
            let height = acdbSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACDBSVG").attr("height", height);

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

            // 画圆弧/碟形弧
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
            drawCenterLine(padding + wg, padding + hg - 10, padding + wg, padding + 2 * hg + 10);
            // 左侧接管
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg - thk, y: padding + 2 * hg},
                {x: padding + 0.5 * wg - thk, y: padding + hg},
                {x: padding + 0.5 * wg, y: padding + hg},
                {x: padding + 0.5 * wg, y: padding + 2 * hg + thk}
            ])).classed("sketch", true);
            // 右侧接管
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + 2 * hg + thk},
                {x: padding + 1.5 * wg, y: padding + hg},
                {x: padding + 1.5 * wg + thk, y: padding + hg},
                {x: padding + 1.5 * wg + thk, y: padding + 2 * hg}
            ])).classed("sketch", true);

            drawLine(padding + 0.5 * wg, padding + hg, padding + 1.5 * wg, padding + hg);

            // 椭圆封头
            drawLine(padding - 2 * thk, padding + 2 * hg, padding + 2 * wg + 2 * thk, padding + 2 * hg);
            drawLine(padding - 2 * thk, padding + 2 * hg + thk, padding + 2 * wg + 2 * thk, padding + 2 * hg + thk);

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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACDBSketchDRO");
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
                ])).attr("id", "ACDBSketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACDBSketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACDBSketchDPO");

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
            ])).attr("id", "ACDBSketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDBSketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACDBSketchHPO");

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
            ])).attr("id", "ACDBSketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDBSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 上部碟形
            let cex = padding + 3 * wg;
            let cey = padding + hg;
            drawArc(wg / 2, wg / 4, cex - wg / 2, cey, cex + wg / 2, cey);
            drawLine(cex - wg / 2, cey, cex + wg / 2, cey);

            // alpha
            let pr = thk / 2;
            let br = 0.9045 * wg;
            let cy0 = cey - wg / 4 + br;
            let ang = 8;
            svg.append("path").attr("d", line([
                {x: cex - pr, y: cey - wg / 4},
                {x: cex - pr, y: cey - wg / 4 - 4 * pr},
                {x: cex + pr, y: cey - wg / 4 - 4 * pr},
                {x: cex + pr, y: cey - wg / 4}
            ])).classed("sketch", true).attr("transform", "rotate(" + ang + ", " + (cex) + " " + (cy0) + ")");
            svg.append("path").attr("d", line([
                {x: cex, y: cey - wg / 4 + 10},
                {x: cex, y: cey - wg / 4 - 4 * pr - 30}
            ])).attr("stroke-dasharray", "25,5,5,5")
                .attr("transform", "rotate(" + ang + ", " + (cex) + " " + (cy0) + ")")
                .classed("sketch", true);

            drawCenterLine(cex, cey - wg / 4 - 4 * pr - 30, cex, cey + 10);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cex, y: cey - wg / 4 - 4 * pr - 15},
                    {x: cex + 10, y: cey - wg / 4 - 4 * pr - 15 - 2},
                    {x: cex + 10, y: cey - wg / 4 - 4 * pr - 15 + 2},
                    {x: cex, y: cey - wg / 4 - 4 * pr - 15}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cex, y: cey - wg / 4 - 4 * pr - 15},
                    {x: cex - 10, y: cey - wg / 4 - 4 * pr - 15 - 2},
                    {x: cex - 10, y: cey - wg / 4 - 4 * pr - 15 + 2},
                    {x: cex, y: cey - wg / 4 - 4 * pr - 15}
                ])).attr("transform", "rotate(" + ang + ", " + (cex) + " " + (cy0) + ")");

            svg.append("path").attr("d", "M "
                + (cex) + " " + (cy0 - (br + 4 * pr + 15)) + " "
                + "A" + (br + 4 * pr + 15) + " " + (br + 4 * pr + 15) + " "
                + "1 0 1" + " "
                + (cex + (br + 4 * pr + 15) * Math.sin(ang / 180 * Math.PI)) + " " + (cy0 - (br + 4 * pr + 15) * Math.cos(ang / 180 * Math.PI))
            ).classed("sketch", true).attr("id", "ACDBSketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDBSketchALPHA").attr("startOffset", "50%").text(alpha);

            // L
            extLineBottomV(cex + br * Math.sin(ang / 180 * Math.PI), cy0 - br * Math.cos(ang / 180 * Math.PI));
            drawLine(cex, cy0 - br * Math.cos(ang / 180 * Math.PI) + 30,
                cex + br * Math.sin(ang / 180 * Math.PI) + 15 + 10, cy0 - br * Math.cos(ang / 180 * Math.PI) + 30);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cex + br * Math.sin(ang / 180 * Math.PI), y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30},
                    {
                        x: cex + br * Math.sin(ang / 180 * Math.PI) + 15,
                        y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30 + 3
                    },
                    {
                        x: cex + br * Math.sin(ang / 180 * Math.PI) + 15,
                        y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30 - 3
                    },
                    {x: cex + br * Math.sin(ang / 180 * Math.PI), y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cex, y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30},
                    {x: cex - 15, y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30 + 3},
                    {x: cex - 15, y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30 - 3},
                    {x: cex, y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30}
                ]));
            svg.append("path").attr("d", line([
                {x: cex - 15 - 40, y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30},
                {x: cex - 15, y: cy0 - br * Math.cos(ang / 180 * Math.PI) + 30}
            ])).attr("id", "ACDBSketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDBSketchL")
                .attr("startOffset", "50%").text(l);

            // 下部图形
            let cux = padding + 3 * wg;
            let cuy = padding + 3 * hg;
            drawArc(wg / 2, wg / 4, cux - wg / 2, cuy, cux + wg / 2, cuy);
            drawLine(cux - wg / 2, cuy, cux + wg / 2, cuy);
            drawCenterLine(cux, cuy, cux, cuy - wg / 8 - 8 * pr - 40);
            let cpx = cux;
            let cpy = cuy - wg / 8;
            svg.append("path").attr("d", line([
                {x: cux - pr, y: cpy},
                {x: cux - pr, y: cpy - 8 * pr},
                {x: cux + pr, y: cpy - 8 * pr},
                {x: cux + pr, y: cpy}
            ])).classed("sketch", true).attr("transform", "rotate(" + 3 * ang + ", " + (cpx) + " " + cpy + ")");
            svg.append("path").attr("d", line([
                {x: cux, y: cpy - 8 * pr - 40},
                {x: cux, y: cpy + 20}
            ])).attr("stroke-dasharray", "25,5,5,5")
                .attr("transform", "rotate(" + 3 * ang + ", " + (cpx) + " " + cpy + ")")
                .classed("sketch", true);

            // beta
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cux, y: cuy - wg / 8 - 8 * pr - 30},
                    {x: cux + 10, y: cuy - wg / 8 - 8 * pr - 30 - 2},
                    {x: cux + 10, y: cuy - wg / 8 - 8 * pr - 30 + 2},
                    {x: cux, y: cuy - wg / 8 - 8 * pr - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cux, y: cuy - wg / 8 - 8 * pr - 30},
                    {x: cux - 10, y: cuy - wg / 8 - 8 * pr - 30 - 2},
                    {x: cux - 10, y: cuy - wg / 8 - 8 * pr - 30 + 2},
                    {x: cux, y: cuy - wg / 8 - 8 * pr - 30}
                ])).attr("transform", "rotate(" + 3 * ang + ", " + (cux) + " " + (cuy - wg / 8) + ")");
            svg.append("path").attr("d", "M "
                + (cux) + " " + (cuy - wg / 8 - (8 * pr + 30)) + " "
                + "A" + (cux) + " " + (cuy - wg / 8) + " "
                + "1 0 1" + " "
                + (cux + (8 * pr + 30) * Math.sin(3 * ang / 180 * Math.PI)) + " " + (cuy - wg / 8 - (8 * pr + 30) * Math.cos(3 * ang / 180 * Math.PI))
            ).classed("sketch", true).attr("id", "ACDBSketchBETA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDBSketchBETA").attr("startOffset", "50%").text(beta);

            // dsi dso brsi srsi brso srso 因为封头是单线图，所以这四个尺寸没有在 sketch 中表示出来
            if (idod === "内径") {

            }
            else if (idod === "外径") {

            }
        }

        currentTabIndex = acdbd2d3.tabs('getTabIndex', acdbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            acdb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#acdb").length > 0) {
                    acdb2d();
                }
            });
        }
        acdbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    acdb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#acdb").length > 0) {
                            acdb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 碟形封头安放式接管补强计算",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 220,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 103,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {
                if (index === 13 || index === 14 || index === 15
                    || index === 32 || index === 33 || index === 34 || index === 35 || index === 36 || index === 37 || index === 38
                    || index === 41) {
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
                    $(ed.target).combobox("loadData", ACDBSCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ACDBSType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACDBSSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACDBSName);
                }

                else if (index === 19) {
                    $(ed.target).combobox("loadData", ACDBPCategory);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", ACDBPType);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", ACDBPSTD);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", ACDBPName);
                }

                else if (index === 32) {
                    $(ed.target).combobox("loadData", ACDBRCategory);
                }
                else if (index === 33) {
                    $(ed.target).combobox("loadData", ACDBRType);
                }
                else if (index === 34) {
                    $(ed.target).combobox("loadData", ACDBRSTD);
                }
                else if (index === 35) {
                    $(ed.target).combobox("loadData", ACDBRName);
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
                    acdbSketch.empty();
                    acdbModel.empty();

                    // sketch
                    currentTabIndex = acdbd2d3.tabs('getTabIndex', acdbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        acdb2d();
                        acdbSketch.off("resize").on("resize", function () {
                            if ($("#acdb").length > 0) {
                                acdb2d();
                            }
                        });
                    }
                    acdbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acdb2d();
                                acdbSketch.off("resize").on("resize", function () {
                                    if ($("#acdb").length > 0) {
                                        acdb2d();
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

                        ACDBDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ACDBSCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACDBSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACDBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACDBSName = null;

                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        ACDBPCategory = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACDBPType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        ACDBPSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        ACDBPName = null;

                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        ACDBRCategory = null;
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACDBRType = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACDBRSTD = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        ACDBRName = null;

                        if (rows[31][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                            pg.propertygrid('options').finder.getTr(this, 34).hide();
                            pg.propertygrid('options').finder.getTr(this, 35).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBSCategory = [];
                                ACDBPCategory = [];
                                ACDBRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACDBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACDBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACDBPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACDBRCategory[index] = {
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

                        ACDBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACDBSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACDBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACDBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBSCategoryVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBSType = [];
                                $(result).each(function (index, element) {
                                    ACDBSType[index] = {
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

                        ACDBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACDBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACDBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBSCategoryVal,
                                type: ACDBSTypeVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBSSTD = [];
                                $(result).each(function (index, element) {
                                    ACDBSSTD[index] = {
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

                        ACDBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACDBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBSCategoryVal,
                                type: ACDBSTypeVal,
                                std: ACDBSSTDVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBSName = [];
                                $(result).each(function (index, element) {
                                    ACDBSName[index] = {
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

                        ACDBPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACDBPType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        ACDBPSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        ACDBPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBPCategoryVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBPType = [];
                                $(result).each(function (index, element) {
                                    ACDBPType[index] = {
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

                        ACDBPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        ACDBPSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        ACDBPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBPCategoryVal,
                                type: ACDBPTypeVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBPSTD = [];
                                $(result).each(function (index, element) {
                                    ACDBPSTD[index] = {
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

                        ACDBPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        ACDBPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBPCategoryVal,
                                type: ACDBPTypeVal,
                                std: ACDBPSTDVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBPName = [];
                                $(result).each(function (index, element) {
                                    ACDBPName[index] = {
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
                    if (index === 32) {

                        ACDBRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACDBRType = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACDBRSTD = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        ACDBRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBRCategoryVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBRType = [];
                                $(result).each(function (index, element) {
                                    ACDBRType[index] = {
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
                    if (index === 33) {

                        ACDBRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACDBRSTD = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        ACDBRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBRCategoryVal,
                                type: ACDBRTypeVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBRSTD = [];
                                $(result).each(function (index, element) {
                                    ACDBRSTD[index] = {
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
                    if (index === 34) {

                        ACDBRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        ACDBRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDBRCategoryVal,
                                type: ACDBRTypeVal,
                                std: ACDBRSTDVal,
                                temp: ACDBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDBRName = [];
                                $(result).each(function (index, element) {
                                    ACDBRName[index] = {
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

                    /*
                        此处代码仅处理 UI，和 value 业务逻辑没关系
                         */
                    // UI - IDOD
                    if (index === 9) {
                        if (rows[9][columns[0][1].field] === "内径") {
                            pg.datagrid('options').finder.getTr(this, 10).show();
                            pg.datagrid('options').finder.getTr(this, 11).show();
                            pg.datagrid('options').finder.getTr(this, 12).show();
                            pg.datagrid('options').finder.getTr(this, 13).hide();
                            pg.datagrid('options').finder.getTr(this, 14).hide();
                            pg.datagrid('options').finder.getTr(this, 15).hide();
                        }
                        else if (rows[9][columns[0][1].field] === "外径") {
                            pg.datagrid('options').finder.getTr(this, 13).show();
                            pg.datagrid('options').finder.getTr(this, 14).show();
                            pg.datagrid('options').finder.getTr(this, 15).show();
                            pg.datagrid('options').finder.getTr(this, 10).hide();
                            pg.datagrid('options').finder.getTr(this, 11).hide();
                            pg.datagrid('options').finder.getTr(this, 12).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsPAD
                    if (index === 31) {
                        if (rows[31][columns[0][1].field] === "是") {
                            pg.propertygrid('options').finder.getTr(this, 32).show();
                            pg.propertygrid('options').finder.getTr(this, 33).show();
                            pg.propertygrid('options').finder.getTr(this, 34).show();
                            pg.propertygrid('options').finder.getTr(this, 35).show();
                            pg.propertygrid('options').finder.getTr(this, 36).show();
                            pg.propertygrid('options').finder.getTr(this, 37).show();
                            pg.propertygrid('options').finder.getTr(this, 38).show();
                        }
                        else if (rows[31][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                            pg.propertygrid('options').finder.getTr(this, 34).hide();
                            pg.propertygrid('options').finder.getTr(this, 35).hide();
                            pg.propertygrid('options').finder.getTr(this, 36).hide();
                            pg.propertygrid('options').finder.getTr(this, 37).hide();
                            pg.propertygrid('options').finder.getTr(this, 38).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsB
                    if (index === 40) {
                        if (rows[40][columns[0][1].field] === "是") {
                            pg.datagrid('options').finder.getTr(this, 41).show();
                        }
                        else if (rows[40][columns[0][1].field] === "否") {
                            pg.datagrid('options').finder.getTr(this, 41).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    // Tag
                    let ACDBTag = "符号标记";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACDBTag = rows[0][columns[0][1].field];
                    }

                    // 设计压力
                    let ACDBPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACDBPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACDBPS;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        ACDBPS = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACDBTest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACDBTest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 碟形封头材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        ACDBSNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取碟形封头材料密度、最大最小厚度
                    let ACDBDS, ACDBSThkMin, ACDBSThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACDBSCategoryVal,
                            "type": ACDBSTypeVal,
                            "std": ACDBSSTDVal,
                            "name": ACDBSNameVal,
                            "temp": ACDBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACDBDS = parseFloat(result.density);
                            ACDBSThkMin = parseFloat(result.thkMin);
                            ACDBSThkMax = parseFloat(result.thkMax);

                            // IDOD
                            let ACDBIDOD;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                ACDBIDOD = rows[9][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acdb2d(ACDBIDOD);
                                acdbSketch.off("resize").on("resize", function () {
                                    if ($("#acdb").length > 0) {
                                        acdb2d(ACDBIDOD);
                                    }
                                });
                            }
                            acdbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acdb2d(ACDBIDOD);
                                        acdbSketch.off("resize").on("resize", function () {
                                            if ($("#acdb").length > 0) {
                                                acdb2d(ACDBIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACDBDSI = -1, ACDBDSO = -1, ACDBBRSI = -1, ACDBBRSO = -1, ACDBSRSI = -1, ACDBSRSO = -1;
                            if (ACDBIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    ACDBDSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO);
                                    acdbSketch.off("resize").on("resize", function () {
                                        if ($("#acdb").length > 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO);
                                        }
                                    });
                                }
                                acdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO);
                                            acdbSketch.off("resize").on("resize", function () {
                                                if ($("#acdb").length > 0) {
                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) <= ACDBDSI) {
                                    ACDBBRSI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > ACDBDSI) {
                                    south.html("球冠区内半径不能大于 " + ACDBDSI + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO);
                                    acdbSketch.off("resize").on("resize", function () {
                                        if ($("#acdb").length > 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO);
                                        }
                                    });
                                }
                                acdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO);
                                            acdbSketch.off("resize").on("resize", function () {
                                                if ($("#acdb").length > 0) {
                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                    && parseFloat(rows[12][columns[0][1].field]) >= 0.1 * ACDBDSI) {
                                    ACDBSRSI = parseFloat(rows[12][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                    && parseFloat(rows[12][columns[0][1].field]) < 0.1 * ACDBDSI) {
                                    south.html("转角内半径不能小于 " + 0.1 * ACDBDSI + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO);
                                    acdbSketch.off("resize").on("resize", function () {
                                        if ($("#acdb").length > 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO);
                                        }
                                    });
                                }
                                acdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO);
                                            acdbSketch.off("resize").on("resize", function () {
                                                if ($("#acdb").length > 0) {
                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else if (ACDBIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                    ACDBDSO = parseFloat(rows[13][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO);
                                    acdbSketch.off("resize").on("resize", function () {
                                        if ($("#acdb").length > 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO);
                                        }
                                    });
                                }
                                acdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO);
                                            acdbSketch.off("resize").on("resize", function () {
                                                if ($("#acdb").length > 0) {
                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                    && parseFloat(rows[14][columns[0][1].field]) <= ACDBDSO) {
                                    ACDBBRSO = parseFloat(rows[14][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                    && parseFloat(rows[14][columns[0][1].field]) > ACDBDSO) {
                                    south.html("球冠区外半径不能大于 " + ACDBDSO + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO);
                                    acdbSketch.off("resize").on("resize", function () {
                                        if ($("#acdb").length > 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO);
                                        }
                                    });
                                }
                                acdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO);
                                            acdbSketch.off("resize").on("resize", function () {
                                                if ($("#acdb").length > 0) {
                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                    && parseFloat(rows[15][columns[0][1].field]) >= 0.1 * ACDBDSO) {
                                    ACDBSRSO = parseFloat(rows[15][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                    && parseFloat(rows[15][columns[0][1].field]) < 0.1 * ACDBDSO) {
                                    south.html("转角外半径不能小于 " + 0.1 * ACDBDSO + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO);
                                    acdbSketch.off("resize").on("resize", function () {
                                        if ($("#acdb").length > 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO);
                                        }
                                    });
                                }
                                acdbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO);
                                            acdbSketch.off("resize").on("resize", function () {
                                                if ($("#acdb").length > 0) {
                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else {
                                return false;
                            }

                            // THKSN
                            let ACDBTHKSN;
                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                && parseFloat(rows[16][columns[0][1].field]) > ACDBSThkMin
                                && parseFloat(rows[16][columns[0][1].field]) <= Math.min(ACDBSThkMax, Math.max(ACDBSRSI, ACDBSRSO) / 3)) {
                                ACDBTHKSN = parseFloat(rows[16][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                && parseFloat(rows[16][columns[0][1].field]) <= ACDBSThkMin) {
                                south.html("碟形封头材料厚度不能小于等于 " + ACDBSThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                && parseFloat(rows[16][columns[0][1].field]) > Math.min(ACDBSThkMax, Math.max(ACDBSRSI, ACDBSRSO) / 3)) {
                                south.html("碟形封头材料厚度不能大于 " + Math.min(ACDBSThkMax, Math.max(ACDBSRSI, ACDBSRSO) / 3).toFixed(2) + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                    ACDBTHKSN);
                                acdbSketch.off("resize").on("resize", function () {
                                    if ($("#acdb").length > 0) {
                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                            ACDBTHKSN);
                                    }
                                });
                            }
                            acdbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                            ACDBTHKSN);
                                        acdbSketch.off("resize").on("resize", function () {
                                            if ($("#acdb").length > 0) {
                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                    ACDBTHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 输入内径时补齐外径，输入外径时补齐内径
                            if (ACDBIDOD === "内径") {
                                ACDBDSO = ACDBDSI + 2 * ACDBTHKSN;
                                ACDBBRSO = ACDBBRSI + ACDBTHKSN;
                                ACDBSRSO = ACDBSRSI + ACDBTHKSN;
                            }
                            else if (ACDBIDOD === "外径") {
                                ACDBDSI = ACDBDSO - 2 * ACDBTHKSN;
                                ACDBBRSI = ACDBBRSO - ACDBTHKSN;
                                ACDBSRSI = ACDBSRSO - ACDBTHKSN;
                            }
                            else {
                                return false;
                            }

                            /*
                            获取碟形封头力学特性
                             */
                            let ACDBOST, ACDBOS, ACDBOST1, ACDBRSEL, ACDBCS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": ACDBSCategoryVal,
                                    "type": ACDBSTypeVal,
                                    "std": ACDBSSTDVal,
                                    "name": ACDBSNameVal,
                                    "thk": ACDBTHKSN,
                                    "temp": ACDBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACDBDSO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACDBOST = parseFloat(result.ot);
                                    if (ACDBOST < 0) {
                                        south.html("查询碟形封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACDBOS = parseFloat(result.o);
                                    if (ACDBOS < 0) {
                                        south.html("查询碟形封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACDBRSEL = parseFloat(result.rel);
                                    if (ACDBRSEL < 0) {
                                        south.html("查询碟形封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACDBCS1 = parseFloat(result.c1);
                                    if (ACDBCS1 < 0) {
                                        south.html("查询碟形封头材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACDBOST1 = parseFloat(result.ot1);

                                    let ACDBCS2;
                                    if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                        && parseFloat(rows[17][columns[0][1].field]) < ACDBTHKSN) {
                                        ACDBCS2 = parseFloat(rows[17][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                        && parseFloat(rows[17][columns[0][1].field]) >= ACDBTHKSN) {
                                        south.html("碟形封头腐蚀裕量不能大于等于 " + ACDBTHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACDBES;
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        ACDBES = parseFloat(rows[18][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                        ACDBPNameVal = rows[22][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACDBDP, ACDBPThkMin, ACDBPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACDBPCategoryVal,
                                            "type": ACDBPTypeVal,
                                            "std": ACDBPSTDVal,
                                            "name": ACDBPNameVal,
                                            "temp": ACDBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACDBDP = parseFloat(result.density);
                                            ACDBPThkMin = parseFloat(result.thkMin);
                                            ACDBPThkMax = parseFloat(result.thkMax);

                                            let ACDBDPO;
                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                ACDBDPO = parseFloat(rows[23][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                    ACDBTHKSN, "Φ" + ACDBDPO);
                                                acdbSketch.off("resize").on("resize", function () {
                                                    if ($("#acdb").length > 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO);
                                                    }
                                                });
                                            }
                                            acdbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO);
                                                        acdbSketch.off("resize").on("resize", function () {
                                                            if ($("#acdb").length > 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKPN
                                            let ACDBTHKPN;
                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field]) > ACDBPThkMin
                                                && parseFloat(rows[24][columns[0][1].field]) <= Math.min(ACDBPThkMax, ACDBDPO / 2)) {
                                                ACDBTHKPN = parseFloat(rows[24][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field]) <= ACDBPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACDBPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field]) > Math.min(ACDBPThkMax, ACDBDPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACDBPThkMax, ACDBDPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN);
                                                acdbSketch.off("resize").on("resize", function () {
                                                    if ($("#acdb").length > 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN);
                                                    }
                                                });
                                            }
                                            acdbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN);
                                                        acdbSketch.off("resize").on("resize", function () {
                                                            if ($("#acdb").length > 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACDBOPT, ACDBOP, ACDBOPT1, ACDBRPEL, ACDBCP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACDBPCategoryVal,
                                                    "type": ACDBPTypeVal,
                                                    "std": ACDBPSTDVal,
                                                    "name": ACDBPNameVal,
                                                    "thk": ACDBTHKPN,
                                                    "temp": ACDBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACDBDPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACDBOPT = parseFloat(result.ot);
                                                    if (ACDBOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACDBOP = parseFloat(result.o);
                                                    if (ACDBOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACDBRPEL = parseFloat(result.rel);
                                                    if (ACDBRPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACDBCP1 = parseFloat(result.c1);
                                                    if (ACDBCP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACDBOPT1 = parseFloat(result.ot1);

                                                    let ACDBHPO;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        ACDBHPO = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO);
                                                        acdbSketch.off("resize").on("resize", function () {
                                                            if ($("#acdb").length > 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO);
                                                            }
                                                        });
                                                    }
                                                    acdbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO);
                                                                acdbSketch.off("resize").on("resize", function () {
                                                                    if ($("#acdb").length > 0) {
                                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDBALPHA;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                        ACDBALPHA = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°");
                                                        acdbSketch.off("resize").on("resize", function () {
                                                            if ($("#acdb").length > 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    acdbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°");
                                                                acdbSketch.off("resize").on("resize", function () {
                                                                    if ($("#acdb").length > 0) {
                                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDBBETA;
                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                        ACDBBETA = parseFloat(rows[27][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°");
                                                        acdbSketch.off("resize").on("resize", function () {
                                                            if ($("#acdb").length > 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°");
                                                            }
                                                        });
                                                    }
                                                    acdbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°");
                                                                acdbSketch.off("resize").on("resize", function () {
                                                                    if ($("#acdb").length > 0) {
                                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDBL;
                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                        && parseFloat(rows[28][columns[0][1].field]) < (ACDBDSO - ACDBDPO) / 2) {
                                                        ACDBL = parseFloat(rows[28][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                        && parseFloat(rows[28][columns[0][1].field]) >= (ACDBDSO - ACDBDPO) / 2) {
                                                        south.html("开孔中心到封头轴线距离 L 不能大于等于 " + (ACDBDSO - ACDBDPO) / 2 + " mm!").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL);
                                                        acdbSketch.off("resize").on("resize", function () {
                                                            if ($("#acdb").length > 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL);
                                                            }
                                                        });
                                                    }
                                                    acdbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL);
                                                                acdbSketch.off("resize").on("resize", function () {
                                                                    if ($("#acdb").length > 0) {
                                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDBCP2;
                                                    if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                        && parseFloat(rows[29][columns[0][1].field]) < ACDBTHKPN) {
                                                        ACDBCP2 = parseFloat(rows[29][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                        && parseFloat(rows[29][columns[0][1].field]) >= ACDBTHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACDBTHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACDBEP;
                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                        ACDBEP = parseFloat(rows[30][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACDBIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                        ACDBIsPAD = rows[31][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                            ACDBIsPAD);
                                                        acdbSketch.off("resize").on("resize", function () {
                                                            if ($("#acdb").length > 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                    ACDBIsPAD);
                                                            }
                                                        });
                                                    }
                                                    acdbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                    ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                    ACDBIsPAD);
                                                                acdbSketch.off("resize").on("resize", function () {
                                                                    if ($("#acdb").length > 0) {
                                                                        acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                            ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                            ACDBIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDBDR = -1.0, ACDBRThkMin = -1.0, ACDBRThkMax = -1.0;
                                                    let ACDBDRO = -1.0, ACDBTHKRN = -1.0, ACDBCR2 = -1.0;
                                                    let ACDBORT = -1.0, ACDBOR = -1.0, ACDBORT1 = -1.0, ACDBRREL = -1.0,
                                                        ACDBCR1 = -1.0;
                                                    if (ACDBIsPAD === "是") {

                                                        if (ACDBTHKSN > 38) {
                                                            south.html("碟形封头厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (ACDBSCategoryVal === "碳素钢和低合金钢" && ACDBRSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                            ACDBRNameVal = rows[35][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_index.action",
                                                            async: false,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": ACDBRCategoryVal,
                                                                "type": ACDBRTypeVal,
                                                                "std": ACDBRSTDVal,
                                                                "name": ACDBRNameVal,
                                                                "temp": ACDBDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACDBDR = parseFloat(result.density);
                                                                ACDBRThkMin = parseFloat(result.thkMin);
                                                                ACDBRThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                    && parseFloat(rows[36][columns[0][1].field]) > ACDBDPO) {
                                                                    ACDBDRO = parseFloat(rows[36][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                    && parseFloat(rows[36][columns[0][1].field]) <= ACDBDPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACDBDPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                        ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                        ACDBIsPAD, "Φ" + ACDBDRO);
                                                                    acdbSketch.off("resize").on("resize", function () {
                                                                        if ($("#acdb").length > 0) {
                                                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                                ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                                ACDBIsPAD, "Φ" + ACDBDRO);
                                                                        }
                                                                    });
                                                                }
                                                                acdbd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                                ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                                ACDBIsPAD, "Φ" + ACDBDRO);
                                                                            acdbSketch.off("resize").on("resize", function () {
                                                                                if ($("#acdb").length > 0) {
                                                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                                        ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                                        ACDBIsPAD, "Φ" + ACDBDRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                    && parseFloat(rows[37][columns[0][1].field]) > ACDBRThkMin
                                                                    && parseFloat(rows[37][columns[0][1].field]) <= Math.min(ACDBRThkMax, 1.5 * ACDBTHKSN)) {
                                                                    ACDBTHKRN = parseFloat(rows[37][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                    && parseFloat(rows[37][columns[0][1].field]) <= ACDBRThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACDBRThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                    && parseFloat(rows[37][columns[0][1].field]) > Math.min(ACDBRThkMax, 1.5 * ACDBTHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACDBRThkMax, 1.5 * ACDBTHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                        ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                        ACDBIsPAD, "Φ" + ACDBDRO, ACDBTHKRN);
                                                                    acdbSketch.off("resize").on("resize", function () {
                                                                        if ($("#acdb").length > 0) {
                                                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                                ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                                ACDBIsPAD, "Φ" + ACDBDRO, ACDBTHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                acdbd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                                ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                                ACDBIsPAD, "Φ" + ACDBDRO, ACDBTHKRN);
                                                                            acdbSketch.off("resize").on("resize", function () {
                                                                                if ($("#acdb").length > 0) {
                                                                                    acdb2d(ACDBIDOD, "Φ" + ACDBDSI, "Φ" + ACDBDSO, "R" + ACDBBRSI, "R" + ACDBBRSO, "R" + ACDBSRSI, "R" + ACDBSRSO,
                                                                                        ACDBTHKSN, "Φ" + ACDBDPO, ACDBTHKPN, ACDBHPO, ACDBALPHA + "°", ACDBBETA + "°", ACDBL,
                                                                                        ACDBIsPAD, "Φ" + ACDBDRO, ACDBTHKRN);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                $.ajax({
                                                                    type: "POST",
                                                                    contentType: "application/json; charset=utf-8",
                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                    async: false,
                                                                    dataType: "json",
                                                                    data: JSON.stringify({
                                                                        "category": ACDBRCategoryVal,
                                                                        "type": ACDBRTypeVal,
                                                                        "std": ACDBRSTDVal,
                                                                        "name": ACDBRNameVal,
                                                                        "thk": ACDBTHKRN,
                                                                        "temp": ACDBDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACDBDRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACDBORT = parseFloat(result.ot);
                                                                        if (ACDBORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACDBOR = parseFloat(result.o);
                                                                        if (ACDBOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACDBRREL = parseFloat(result.rel);
                                                                        if (ACDBRREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACDBCR1 = parseFloat(result.c1);
                                                                        if (ACDBCR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACDBORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                            && parseFloat(rows[38][columns[0][1].field]) < ACDBTHKRN) {
                                                                            ACDBCR2 = parseFloat(rows[38][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                            && parseFloat(rows[38][columns[0][1].field]) >= ACDBTHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACDBTHKRN + " mm").css("color", "red");
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
                                                        if (ACDBCR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACDBA3;
                                                    if (!jQuery.isEmptyObject(rows[39][columns[0][1].field])) {
                                                        ACDBA3 = parseFloat(rows[39][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACDBIsB;
                                                    if (!jQuery.isEmptyObject(rows[40][columns[0][1].field])) {
                                                        ACDBIsB = rows[40][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACDBBS = -1.0;
                                                    if (ACDBIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[41][columns[0][1].field]) > ACDBDPO) {
                                                            ACDBBS = parseFloat(rows[41][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[41][columns[0][1].field]) <= ACDBDPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACDBDPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */

                                                    let ACDBPC = ACDBPD + ACDBPS;

                                                    // 碟形封头
                                                    let ACDBCS = ACDBCS1 + ACDBCS2;
                                                    let ACDBTHKSE = ACDBTHKSN - ACDBCS;
                                                    let ACDBBRSISRSI = ACDBBRSI / ACDBSRSI;
                                                    let ACDBM = (3 + Math.sqrt(ACDBBRSISRSI)) / 4;
                                                    let ACDBDSM = (ACDBDSI + ACDBDSO) / 2;
                                                    let ACDBBRSM = (ACDBBRSI + ACDBBRSO) / 2;
                                                    let ACDBSRSM = (ACDBSRSI + ACDBSRSO) / 2;
                                                    let ACDBDELTA = ACDBBRSM / (ACDBBRSM - ACDBSRSM) * (ACDBDSM / 2 - ACDBSRSM);
                                                    let ACDBTHETA;
                                                    if (ACDBL <= ACDBDELTA) {
                                                        ACDBTHETA = Math.asin(ACDBL / ACDBBRSM) / Math.PI * 180;
                                                    }
                                                    else {
                                                        ACDBTHETA = Math.asin((ACDBL - ACDBDSM / 2 + ACDBSRSM) / ACDBSRSM) / Math.PI * 180;
                                                    }

                                                    // 接管
                                                    let ACDBCP = ACDBCP1 + ACDBCP2;
                                                    let ACDBTHKPE = ACDBTHKPN - ACDBCP;
                                                    let ACDBDPC = ACDBDPO - 2 * ACDBTHKPN + 2 * ACDBCP1 + 2 * ACDBCS2;
                                                    let ACDBSA = ACDBDPC / Math.cos(ACDBBETA / 180 * Math.PI);
                                                    let ACDBSB = ACDBDPC / Math.cos(Math.abs(ACDBALPHA - ACDBTHETA) / 180 * Math.PI);
                                                    let ACDBKS = Math.max(ACDBSA / ACDBSB, ACDBSB / ACDBSA);
                                                    if (ACDBKS > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACDBDOP = Math.max(ACDBSA, ACDBSB);
                                                    if (ACDBDOP > ACDBDSI / 2) {
                                                        south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                        return false;
                                                    }
                                                    let ACDBFP = Math.min(1.0, ACDBOPT / ACDBOST);

                                                    // 补强圈
                                                    let ACDBCR = -1.0, ACDBTHKRE = -1.0, ACDBFR = -1.0;
                                                    if (ACDBIsPAD === "是") {
                                                        ACDBCR = ACDBCR1 + ACDBCR2;
                                                        ACDBTHKRE = ACDBTHKRN - ACDBCR;
                                                        ACDBFR = Math.min(1.0, ACDBORT / ACDBOST);
                                                    }

                                                    /*
                                                    碟形封头内压强度校核
                                                     */
                                                    let ACDBTHKSC;
                                                    if (ACDBIDOD === "内径") {
                                                        if (ACDBL <= ACDBDELTA) {
                                                            ACDBTHKSC = ACDBPC * ACDBBRSI / (2 * ACDBOST * ACDBES - 0.5 * ACDBPC);
                                                        }
                                                        else {
                                                            ACDBTHKSC = ACDBM * ACDBPC * ACDBBRSI / (2 * ACDBOST * ACDBES - 0.5 * ACDBPC);
                                                        }
                                                    }
                                                    else if (ACDBIDOD === "外径") {
                                                        if (ACDBL <= ACDBDELTA) {
                                                            ACDBTHKSC = ACDBPC * ACDBBRSI / (2 * ACDBOST * ACDBES - 0.5 * ACDBPC);
                                                        }
                                                        else {
                                                            ACDBTHKSC = ACDBM * ACDBPC * ACDBBRSO / (2 * ACDBOST * ACDBES + (ACDBM - 0.5) * ACDBPC);
                                                        }
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACDBTHKSMIN;
                                                    if (ACDBBRSISRSI <= 5.5) {
                                                        ACDBTHKSMIN = 0.0015 * ACDBDSI;
                                                    }
                                                    else {
                                                        ACDBTHKSMIN = 0.003 * ACDBDSI;
                                                    }
                                                    let ACDBTHKSD = Math.max(ACDBTHKSC, ACDBTHKSMIN) + ACDBCS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "碟形封头内压所需厚度：" + (ACDBTHKSD + ACDBCS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACDBTHKSCHK;
                                                    if (ACDBTHKSN >= (ACDBTHKSD + ACDBCS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACDBTHKSN + " mm" +
                                                            "</span>");
                                                        ACDBTHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACDBTHKSN + " mm" +
                                                            "</span>");
                                                        ACDBTHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACDBTHKPC = ACDBPC * ACDBDPO / (2 * ACDBOPT * ACDBEP + ACDBPC);
                                                    let ACDBTHKPD = ACDBTHKPC + ACDBCP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACDBTHKPD + ACDBCP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACDBTHKPCHK;
                                                    if (ACDBTHKPN >= (ACDBTHKPD + ACDBCP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACDBTHKPN + " mm" +
                                                            "</span>");
                                                        ACDBTHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACDBTHKPN + " mm" +
                                                            "</span>");
                                                        ACDBTHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACDBBA = ACDBDOP * ACDBTHKSC;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACDBBA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 碟形封头
                                                    let ACDBBB;
                                                    if (ACDBIsB === "是") {
                                                        ACDBBB = Math.min(Math.max(2 * ACDBDOP, ACDBDOP + 2 * ACDBTHKSN + 2 * ACDBTHKPN), ACDBBS);
                                                    }
                                                    else if (ACDBIsB === "否") {
                                                        ACDBBB = Math.max(2 * ACDBDOP, ACDBDOP + 2 * ACDBTHKSN + 2 * ACDBTHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACDBA1 = (ACDBBB - ACDBDOP) * (ACDBTHKSE - ACDBTHKSC);

                                                    // 接管
                                                    let ACDBHP1 = Math.min(ACDBHPO, Math.sqrt(ACDBDOP * ACDBTHKPN));
                                                    let ACDBA2 = 2 * ACDBHP1 * (ACDBTHKPE - ACDBTHKPC) * ACDBFP;

                                                    // 补强圈
                                                    let ACDBA4 = 0.0, ACDBDRE = -1.0;
                                                    if (ACDBIsPAD === "是") {
                                                        ACDBDRE = Math.min(ACDBDRO, ACDBBB);
                                                        ACDBA4 = (ACDBDRE - ACDBDPO) * ACDBTHKRE * ACDBFR;
                                                    }

                                                    // Ae
                                                    let ACDBAE = ACDBA1 + ACDBA2 + ACDBA3 + ACDBA4;
                                                    let ACDBACHK;
                                                    if (ACDBAE >= ACDBBA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACDBAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACDBACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACDBAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACDBACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACDBETA, ACDBPST, ACDBPPT, ACDBPT;
                                                    if (ACDBTest === "液压试验") {
                                                        ACDBETA = 1.25;
                                                        ACDBPST = ACDBETA * ACDBPD * ACDBOS / Math.max(ACDBOST, ACDBOST1);
                                                        ACDBPPT = ACDBETA * ACDBPD * ACDBOP / Math.max(ACDBOPT, ACDBOPT1);
                                                        ACDBPT = Math.min(ACDBPST, ACDBPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACDBPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACDBTest === "气压试验") {
                                                        ACDBETA = 1.10;
                                                        ACDBPST = ACDBETA * ACDBPD * ACDBOS / Math.max(ACDBOST, ACDBOST1);
                                                        ACDBPPT = ACDBETA * ACDBPD * ACDBOP / Math.max(ACDBOPT, ACDBOPT1);
                                                        ACDBPT = Math.min(ACDBPST, ACDBPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACDBPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */

                                                    // 碟形封头
                                                    let ACDBMAWPS;
                                                    if (ACDBIDOD === "内径") {
                                                        ACDBMAWPS = 2 * ACDBTHKSE * ACDBOST * ACDBES / (ACDBM * ACDBBRSI + 0.5 * ACDBTHKSE) - ACDBPS;
                                                    }
                                                    else if (ACDBIDOD === "外径") {
                                                        ACDBMAWPS = 2 * ACDBTHKSE * ACDBOST * ACDBES / (ACDBM * ACDBBRSO - (ACDBM - 0.5) * ACDBTHKSE) - ACDBPS;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 接管
                                                    let ACDBMAWPP = 2 * ACDBTHKPE * ACDBOPT * ACDBEP / (ACDBDPO - ACDBTHKPE) - ACDBPS;

                                                    // 开孔补强
                                                    let ACDBMAWPA1 = -1, ACDBMAWPA2 = -1,
                                                        ACDBMAWPA3 = ACDBA3, ACDBMAWPA4 = ACDBA4,
                                                        ACDBMAWPA = -1, ACDBMAWPAE = -1,
                                                        ACDBMAWPRC = ACDBPC;
                                                    let ACDBMAWPTHKSC, ACDBMAWPTHKPC;
                                                    while (ACDBMAWPAE >= ACDBMAWPA) {

                                                        ACDBMAWPRC += 0.0001;

                                                        // 碟形封头计算厚度
                                                        if (ACDBIDOD === "内径") {
                                                            if (ACDBL <= ACDBDELTA) {
                                                                ACDBMAWPTHKSC = ACDBMAWPRC * ACDBBRSI / (2 * ACDBOST * ACDBES - 0.5 * ACDBPC);
                                                            }
                                                            else {
                                                                ACDBMAWPTHKSC = ACDBMAWPRC * ACDBM * ACDBBRSI / (2 * ACDBOST * ACDBES - 0.5 * ACDBPC);
                                                            }
                                                        }
                                                        else if (ACDBIDOD === "外径") {
                                                            if (ACDBL <= ACDBDELTA) {
                                                                ACDBMAWPTHKSC = ACDBMAWPRC * ACDBBRSI / (2 * ACDBOST * ACDBES - 0.5 * ACDBPC);
                                                            }
                                                            else {
                                                                ACDBMAWPTHKSC = ACDBMAWPRC * ACDBM * ACDBBRSO / (2 * ACDBOST * ACDBES + (ACDBM - 0.5) * ACDBPC);
                                                            }
                                                        }
                                                        ACDBMAWPA = ACDBDOP * ACDBMAWPTHKSC;

                                                        // 接管计算厚度
                                                        ACDBMAWPTHKPC = ACDBMAWPRC * ACDBDPO / (2 * ACDBOPT * ACDBEP + ACDBPC);
                                                        ACDBMAWPA1 = (ACDBBB - ACDBDOP) * (ACDBTHKSE - ACDBMAWPTHKSC);
                                                        ACDBMAWPA2 = 2 * ACDBHP1 * (ACDBTHKPE - ACDBMAWPTHKPC) * ACDBFP;
                                                        ACDBMAWPAE = ACDBMAWPA1 + ACDBMAWPA2 + ACDBMAWPA3 + ACDBMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACDBMAWPR = ACDBMAWPRC - ACDBPS - 0.0001;
                                                    let ACDBMAWP = Math.min(ACDBMAWPS, ACDBMAWPP, ACDBMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACDBMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACDBPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "acdbdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACDB",

                                                                idod: ACDBIDOD,
                                                                isPad: ACDBIsPAD,
                                                                isB: ACDBIsB,

                                                                tag: ACDBTag,

                                                                pd: ACDBPD,
                                                                t: ACDBDT,
                                                                ps: ACDBPS,
                                                                test: ACDBTest,

                                                                stds: ACDBSSTDVal,
                                                                names: ACDBSNameVal,
                                                                dsi: ACDBDSI,
                                                                dso: ACDBDSO,
                                                                brsi: ACDBBRSI,
                                                                srsi: ACDBSRSI,
                                                                brso: ACDBBRSO,
                                                                srso: ACDBSRSO,
                                                                thksn: ACDBTHKSN,
                                                                cs2: ACDBCS2,
                                                                es: ACDBES,

                                                                stdp: ACDBPSTDVal,
                                                                namep: ACDBPNameVal,
                                                                dpo: ACDBDPO,
                                                                thkpn: ACDBTHKPN,
                                                                hpo: ACDBHPO,
                                                                alpha: ACDBALPHA,
                                                                beta: ACDBBETA,
                                                                l: ACDBL,
                                                                cp2: ACDBCP2,
                                                                ep: ACDBEP,

                                                                stdr: ACDBRSTDVal,
                                                                namer: ACDBRNameVal,
                                                                dro: ACDBDRO,
                                                                thkrn: ACDBTHKRN,
                                                                cr2: ACDBCR2,

                                                                a3: ACDBA3,
                                                                bs: ACDBBS,

                                                                ds: ACDBDS.toFixed(4),
                                                                cs1: ACDBCS1.toFixed(4),
                                                                rsel: ACDBRSEL.toFixed(4),
                                                                ost: ACDBOST.toFixed(4),
                                                                os: ACDBOS.toFixed(4),
                                                                ost1: ACDBOST1.toFixed(4),

                                                                dp: ACDBDP.toFixed(4),
                                                                cp1: ACDBCP1.toFixed(4),
                                                                rpel: ACDBRPEL.toFixed(4),
                                                                opt: ACDBOPT.toFixed(4),
                                                                op: ACDBOP.toFixed(4),
                                                                opt1: ACDBOPT1.toFixed(4),

                                                                dr: ACDBDR.toFixed(4),
                                                                cr1: ACDBCR1.toFixed(4),
                                                                rrel: ACDBRREL.toFixed(4),
                                                                ort: ACDBORT.toFixed(4),
                                                                or: ACDBOR.toFixed(4),
                                                                ort1: ACDBORT1.toFixed(4),

                                                                pc: ACDBPC.toFixed(4),

                                                                cs: ACDBCS.toFixed(4),
                                                                thkse: ACDBTHKSE.toFixed(4),
                                                                brsisrsi: ACDBBRSISRSI.toFixed(4),
                                                                m: ACDBM.toFixed(4),
                                                                dsm: ACDBDSM.toFixed(4),
                                                                brsm: ACDBBRSM.toFixed(4),
                                                                srsm: ACDBSRSM.toFixed(4),
                                                                delta: ACDBDELTA.toFixed(4),
                                                                theta: ACDBTHETA.toFixed(4),

                                                                cp: ACDBCP.toFixed(4),
                                                                thkpe: ACDBTHKPE.toFixed(4),
                                                                dpc: ACDBDPC.toFixed(4),
                                                                sa: ACDBSA.toFixed(4),
                                                                sb: ACDBSB.toFixed(4),
                                                                ks: ACDBKS.toFixed(4),
                                                                dop: ACDBDOP.toFixed(4),
                                                                fp: ACDBFP.toFixed(4),

                                                                cr: ACDBCR.toFixed(4),
                                                                thkre: ACDBTHKRE.toFixed(4),
                                                                fr: ACDBFR.toFixed(4),

                                                                thksc: ACDBTHKSC.toFixed(4),
                                                                thksmin: ACDBTHKSMIN.toFixed(4),
                                                                thksd: ACDBTHKSD.toFixed(4),
                                                                thkschk: ACDBTHKSCHK,

                                                                thkpc: ACDBTHKPC.toFixed(4),
                                                                thkpd: ACDBTHKPD.toFixed(4),
                                                                thkpchk: ACDBTHKPCHK,

                                                                ba: ACDBBA.toFixed(4),
                                                                bb: ACDBBB.toFixed(4),
                                                                a1: ACDBA1.toFixed(4),
                                                                hp1: ACDBHP1.toFixed(4),
                                                                a2: ACDBA2.toFixed(4),
                                                                dre: ACDBDRE.toFixed(4),
                                                                a4: ACDBA4.toFixed(4),
                                                                ae: ACDBAE.toFixed(4),
                                                                achk: ACDBACHK,

                                                                eta: ACDBETA.toFixed(4),
                                                                pst: ACDBPST.toFixed(4),
                                                                ppt: ACDBPPT.toFixed(4),
                                                                pt: ACDBPT.toFixed(4),

                                                                mawps: ACDBMAWPS.toFixed(4),
                                                                mawpp: ACDBMAWPP.toFixed(4),
                                                                mawpa1: ACDBMAWPA1.toFixed(0),
                                                                mawpa2: ACDBMAWPA2.toFixed(0),
                                                                mawpa3: ACDBMAWPA3,
                                                                mawpa4: ACDBMAWPA4.toFixed(0),
                                                                mawpa: ACDBMAWPA.toFixed(0),
                                                                mawpae: ACDBMAWPAE.toFixed(0),
                                                                mawpr: ACDBMAWPR.toFixed(4),
                                                                mawp: ACDBMAWP.toFixed(4)
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
                                                                    ACDBPayJS.dialog({
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
                                                                                ACDBPayJS.dialog("close");
                                                                                ACDBPayJS.dialog("clear");
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
                                                                                            ACDBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACDBPayJS.dialog('close');
                                                                                                    ACDBPayJS.dialog('clear');
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                pg.propertygrid('options').finder.getTr(this, 13).hide();
                pg.propertygrid('options').finder.getTr(this, 14).hide();
                pg.propertygrid('options').finder.getTr(this, 15).hide();

                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 34).hide();
                pg.propertygrid('options').finder.getTr(this, 35).hide();
                pg.propertygrid('options').finder.getTr(this, 36).hide();
                pg.propertygrid('options').finder.getTr(this, 37).hide();
                pg.propertygrid('options').finder.getTr(this, 38).hide();

                pg.propertygrid('options').finder.getTr(this, 41).hide();
            }
        });
    });
});