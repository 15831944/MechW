$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bddSketch = $("#d2");
    let bddModel = $("#d3");
    let bddd2d3 = $('#d2d3');

    $("#cal").html("<table id='bdd'></table>");
    let pg = $("#bdd");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/d/d/BDD.json", function (result) {

        let BDDDT,
            BDDSCategory, BDDSCategoryVal, BDDSType, BDDSTypeVal, BDDSSTD, BDDSSTDVal, BDDSName, BDDSNameVal,
            BDDPCategory, BDDPCategoryVal, BDDPType, BDDPTypeVal, BDDPSTD, BDDPSTDVal, BDDPName, BDDPNameVal,
            BDDRCategory, BDDRCategoryVal, BDDRType, BDDRTypeVal, BDDRSTD, BDDRSTDVal, BDDRName, BDDRNameVal,
            columns, rows, ed;

        function bdd2d(dsi = "ΦDsi", brsi = "Rsi", srsi = "rsi", thksn = "δsn",
                       dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α", beta = "β", l = "L",
                       isPad, dro = "Φdro", thkrn = "δrn") {

            bddSketch.empty();
            let width = bddSketch.width();
            let height = bddSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BDDSVG").attr("height", height);

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

            // 左侧碟形封头
            drawLine(padding - 2 * thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + 2 * hg);
            drawLine(padding - 2 * thk, padding + 2 * hg + thk, padding + 0.5 * wg - thk, padding + 2 * hg + thk);

            // 右侧碟形封头
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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "BDDSketchDRO");
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
                ])).attr("id", "BDDSketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#BDDSketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "BDDSketchDPO");

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
            ])).attr("id", "BDDSketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDDSketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "BDDSketchHPI");

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "BDDSketchHPO");

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
            ])).attr("id", "BDDSketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDDSketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ).classed("sketch", true).attr("id", "BDDSketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDDSketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "BDDSketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDDSketchL")
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
            ).classed("sketch", true).attr("id", "BDDSketchBETA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDDSketchBETA").attr("startOffset", "50%").text(beta);
        }

        currentTabIndex = bddd2d3.tabs('getTabIndex', bddd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bdd2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bdd").length > 0) {
                    bdd2d();
                }
            });
        }
        bddd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bdd2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bdd").length > 0) {
                            bdd2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 碟形封头插入式接管补强计算",
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
                if (index === 29 || index === 30 || index === 31 || index === 32 || index === 33 || index === 34 || index === 35
                    || index === 38) {
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
                    $(ed.target).combobox("loadData", BDDSCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BDDSType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BDDSSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BDDSName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", BDDPCategory);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BDDPType);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BDDPSTD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", BDDPName);
                }

                else if (index === 29) {
                    $(ed.target).combobox("loadData", BDDRCategory);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BDDRType);
                }
                else if (index === 31) {
                    $(ed.target).combobox("loadData", BDDRSTD);
                }
                else if (index === 32) {
                    $(ed.target).combobox("loadData", BDDRName);
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
                    bddSketch.empty();
                    bddModel.empty();

                    // sketch
                    currentTabIndex = bddd2d3.tabs('getTabIndex', bddd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bdd2d();
                        bddSketch.off("resize").on("resize", function () {
                            if ($("#bdd").length > 0) {
                                bdd2d();
                            }
                        });
                    }
                    bddd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bdd2d();
                                bddSketch.off("resize").on("resize", function () {
                                    if ($("#bdd").length > 0) {
                                        bdd2d();
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

                        BDDDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BDDSCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDDSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDDSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDDSName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDDPCategory = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDDPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDDPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BDDPName = null;

                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDDRCategory = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDDRType = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BDDRSTD = null;
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        BDDRName = null;

                        if (rows[28][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 29).hide();
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDSCategory = [];
                                BDDPCategory = [];
                                BDDRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BDDDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BDDSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDDPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDDRCategory[index] = {
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

                        BDDSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDDSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDDSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDDSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDSCategoryVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDSType = [];
                                $(result).each(function (index, element) {
                                    BDDSType[index] = {
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

                        BDDSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDDSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDDSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDSCategoryVal,
                                type: BDDSTypeVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDSSTD = [];
                                $(result).each(function (index, element) {
                                    BDDSSTD[index] = {
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

                        BDDSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDDSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDSCategoryVal,
                                type: BDDSTypeVal,
                                std: BDDSSTDVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDSName = [];
                                $(result).each(function (index, element) {
                                    BDDSName[index] = {
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
                    else if (index === 15) {

                        BDDPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDDPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDDPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BDDPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDPCategoryVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDPType = [];
                                $(result).each(function (index, element) {
                                    BDDPType[index] = {
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
                    else if (index === 16) {

                        BDDPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDDPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BDDPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDPCategoryVal,
                                type: BDDPTypeVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDPSTD = [];
                                $(result).each(function (index, element) {
                                    BDDPSTD[index] = {
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
                    else if (index === 17) {

                        BDDPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        BDDPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDPCategoryVal,
                                type: BDDPTypeVal,
                                std: BDDPSTDVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDPName = [];
                                $(result).each(function (index, element) {
                                    BDDPName[index] = {
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
                    else if (index === 29) {

                        BDDRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDDRType = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BDDRSTD = null;
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        BDDRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDRCategoryVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDRType = [];
                                $(result).each(function (index, element) {
                                    BDDRType[index] = {
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
                    else if (index === 30) {

                        BDDRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BDDRSTD = null;
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        BDDRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDRCategoryVal,
                                type: BDDRTypeVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDRSTD = [];
                                $(result).each(function (index, element) {
                                    BDDRSTD[index] = {
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
                    else if (index === 31) {

                        BDDRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        BDDRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDDRCategoryVal,
                                type: BDDRTypeVal,
                                std: BDDRSTDVal,
                                temp: BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDDRName = [];
                                $(result).each(function (index, element) {
                                    BDDRName[index] = {
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
                        if (index === 28) {
                            if (rows[28][columns[0][1].field] === "是") {
                                pg.propertygrid('options').finder.getTr(this, 29).show();
                                pg.propertygrid('options').finder.getTr(this, 30).show();
                                pg.propertygrid('options').finder.getTr(this, 31).show();
                                pg.propertygrid('options').finder.getTr(this, 32).show();
                                pg.propertygrid('options').finder.getTr(this, 33).show();
                                pg.propertygrid('options').finder.getTr(this, 34).show();
                                pg.propertygrid('options').finder.getTr(this, 35).show();
                            }
                            else if (rows[28][columns[0][1].field] === "否") {
                                pg.propertygrid('options').finder.getTr(this, 29).hide();
                                pg.propertygrid('options').finder.getTr(this, 30).hide();
                                pg.propertygrid('options').finder.getTr(this, 31).hide();
                                pg.propertygrid('options').finder.getTr(this, 32).hide();
                                pg.propertygrid('options').finder.getTr(this, 33).hide();
                                pg.propertygrid('options').finder.getTr(this, 34).hide();
                                pg.propertygrid('options').finder.getTr(this, 35).hide();
                            }
                            else {
                                return false;
                            }
                        }
                        // UI - IsB
                        if (index === 37) {
                            if (rows[37][columns[0][1].field] === "是") {
                                pg.datagrid('options').finder.getTr(this, 38).show();
                            }
                            else if (rows[37][columns[0][1].field] === "否") {
                                pg.datagrid('options').finder.getTr(this, 38).hide();
                            }
                            else {
                                return false;
                            }
                        }

                        // Tag
                        let BDDTag = "符号标记";
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BDDTag = rows[0][columns[0][1].field];
                        }

                        // 设计压力
                        let BDDPD;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            BDDPD = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BDDPS;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BDDPS = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Test
                        let BDDTest;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            BDDTest = rows[4][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 碟形封头材料名称
                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                            BDDSNameVal = rows[8][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取碟形封头材料密度、最大最小厚度
                        let BDDDS, BDDSThkMin, BDDSThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BDDSCategoryVal,
                                "type": BDDSTypeVal,
                                "std": BDDSSTDVal,
                                "name": BDDSNameVal,
                                "temp": BDDDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BDDDS = parseFloat(result.density);
                                BDDSThkMin = parseFloat(result.thkMin);
                                BDDSThkMax = parseFloat(result.thkMax);

                                let BDDDSI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    BDDDSI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdd2d("Φ" + BDDDSI);
                                    bddSketch.off("resize").on("resize", function () {
                                        if ($("#bdd").length > 0) {
                                            bdd2d("Φ" + BDDDSI);
                                        }
                                    });
                                }
                                bddd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdd2d("Φ" + BDDDSI);
                                            bddSketch.off("resize").on("resize", function () {
                                                if ($("#bdd").length > 0) {
                                                    bdd2d("Φ" + BDDDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BDDBRSI;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= BDDDSI) {
                                    BDDBRSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BDDDSI) {
                                    south.html("球冠区内半径不能大于 " + BDDDSI + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI);
                                    bddSketch.off("resize").on("resize", function () {
                                        if ($("#bdd").length > 0) {
                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI);
                                        }
                                    });
                                }
                                bddd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI);
                                            bddSketch.off("resize").on("resize", function () {
                                                if ($("#bdd").length > 0) {
                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BDDSRSI;
                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) >= 0.1 * BDDDSI) {
                                    BDDSRSI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) < 0.1 * BDDDSI) {
                                    south.html("转角内半径不能小于 " + (0.1 * BDDDSI).toFixed(2) + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI);
                                    bddSketch.off("resize").on("resize", function () {
                                        if ($("#bdd").length > 0) {
                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI);
                                        }
                                    });
                                }
                                bddd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI);
                                            bddSketch.off("resize").on("resize", function () {
                                                if ($("#bdd").length > 0) {
                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // THKSN
                                let BDDTHKSN;
                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                    && parseFloat(rows[12][columns[0][1].field]) > BDDSThkMin
                                    && parseFloat(rows[12][columns[0][1].field]) <= Math.min(BDDSThkMax, BDDSRSI / 3)) {
                                    BDDTHKSN = parseFloat(rows[12][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                    && parseFloat(rows[12][columns[0][1].field]) <= BDDSThkMin) {
                                    south.html("碟形封头材料厚度不能小于等于 " + BDDSThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                    && parseFloat(rows[12][columns[0][1].field]) > Math.min(BDDSThkMax, BDDSRSI / 3)) {
                                    south.html("碟形封头材料厚度不能大于 " + Math.min(BDDSThkMax, BDDSRSI / 3).toFixed(2) + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI, BDDTHKSN);
                                    bddSketch.off("resize").on("resize", function () {
                                        if ($("#bdd").length > 0) {
                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI, BDDTHKSN);
                                        }
                                    });
                                }
                                bddd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI, BDDTHKSN);
                                            bddSketch.off("resize").on("resize", function () {
                                                if ($("#bdd").length > 0) {
                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI, BDDTHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 补齐外径
                                let BDDDSO = BDDDSI + 2 * BDDTHKSN;
                                let BDDBRSO = BDDBRSI + BDDTHKSN;
                                let BDDSRSO = BDDSRSI + BDDTHKSN;

                                /*
                                获取碟形封头力学特性
                                 */
                                let BDDOST, BDDOS, BDDRSEL, BDDCS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BDDSCategoryVal,
                                        "type": BDDSTypeVal,
                                        "std": BDDSSTDVal,
                                        "name": BDDSNameVal,
                                        "thk": BDDTHKSN,
                                        "temp": BDDDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BDDDSO
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BDDOST = parseFloat(result.ot);
                                        if (BDDOST < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDDOS = parseFloat(result.o);
                                        if (BDDOS < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDDRSEL = parseFloat(result.rel);
                                        if (BDDRSEL < 0) {
                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BDDCS1 = parseFloat(result.c1);
                                        if (BDDCS1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        let BDDCS2;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                            && parseFloat(rows[13][columns[0][1].field]) < BDDTHKSN) {
                                            BDDCS2 = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                            && parseFloat(rows[13][columns[0][1].field]) >= BDDTHKSN) {
                                            south.html("碟形封头腐蚀裕量不能大于等于 " + BDDTHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        let BDDES;
                                        if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                            BDDES = parseFloat(rows[14][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 接管材料名称
                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                            BDDPNameVal = rows[18][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取接管材料密度、最大最小厚度
                                        let BDDDP, BDDPThkMin, BDDPThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BDDPCategoryVal,
                                                "type": BDDPTypeVal,
                                                "std": BDDPSTDVal,
                                                "name": BDDPNameVal,
                                                "temp": BDDDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BDDDP = parseFloat(result.density);
                                                BDDPThkMin = parseFloat(result.thkMin);
                                                BDDPThkMax = parseFloat(result.thkMax);

                                                let BDDDPO;
                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                    BDDDPO = parseFloat(rows[19][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                        BDDTHKSN, "Φ" + BDDDPO);
                                                    bddSketch.off("resize").on("resize", function () {
                                                        if ($("#bdd").length > 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO);
                                                        }
                                                    });
                                                }
                                                bddd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO);
                                                            bddSketch.off("resize").on("resize", function () {
                                                                if ($("#bdd").length > 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // THKPN
                                                let BDDTHKPN;
                                                if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                    && parseFloat(rows[20][columns[0][1].field]) > BDDPThkMin
                                                    && parseFloat(rows[20][columns[0][1].field]) <= Math.min(BDDPThkMax, BDDDPO / 2)) {
                                                    BDDTHKPN = parseFloat(rows[20][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                    && parseFloat(rows[20][columns[0][1].field]) <= BDDPThkMin) {
                                                    south.html("接管材料厚度不能小于等于 " + BDDPThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                    && parseFloat(rows[20][columns[0][1].field]) > Math.min(BDDPThkMax, BDDDPO / 2)) {
                                                    south.html("接管材料厚度不能大于 " + Math.min(BDDPThkMax, BDDDPO / 2) + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN);
                                                    bddSketch.off("resize").on("resize", function () {
                                                        if ($("#bdd").length > 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN);
                                                        }
                                                    });
                                                }
                                                bddd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN);
                                                            bddSketch.off("resize").on("resize", function () {
                                                                if ($("#bdd").length > 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BDDOPT, BDDOP, BDDRPEL, BDDCP1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BDDPCategoryVal,
                                                        "type": BDDPTypeVal,
                                                        "std": BDDPSTDVal,
                                                        "name": BDDPNameVal,
                                                        "thk": BDDTHKPN,
                                                        "temp": BDDDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BDDDPO
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BDDOPT = parseFloat(result.ot);
                                                        if (BDDOPT < 0) {
                                                            south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDDOP = parseFloat(result.o);
                                                        if (BDDOP < 0) {
                                                            south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDDRPEL = parseFloat(result.rel);
                                                        if (BDDRPEL < 0) {
                                                            south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDDCP1 = parseFloat(result.c1);
                                                        if (BDDCP1 < 0) {
                                                            south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        let BDDHPO;
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                            BDDHPO = parseFloat(rows[21][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO);
                                                            bddSketch.off("resize").on("resize", function () {
                                                                if ($("#bdd").length > 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO);
                                                                }
                                                            });
                                                        }
                                                        bddd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO);
                                                                    bddSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdd").length > 0) {
                                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDDHPI;
                                                        if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                            BDDHPI = parseFloat(rows[22][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI);
                                                            bddSketch.off("resize").on("resize", function () {
                                                                if ($("#bdd").length > 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI);
                                                                }
                                                            });
                                                        }
                                                        bddd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI);
                                                                    bddSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdd").length > 0) {
                                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDDALPHA;
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                            BDDALPHA = parseFloat(rows[23][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°");
                                                            bddSketch.off("resize").on("resize", function () {
                                                                if ($("#bdd").length > 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                        bddd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°");
                                                                    bddSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdd").length > 0) {
                                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDDBETA;
                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                            BDDBETA = parseFloat(rows[24][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°");
                                                            bddSketch.off("resize").on("resize", function () {
                                                                if ($("#bdd").length > 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°");
                                                                }
                                                            });
                                                        }
                                                        bddd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°");
                                                                    bddSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdd").length > 0) {
                                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDDL;
                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                            && parseFloat(rows[25][columns[0][1].field]) < (BDDDSO - BDDDPO) / 2) {
                                                            BDDL = parseFloat(rows[25][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                            && parseFloat(rows[25][columns[0][1].field]) >= (BDDDSO - BDDDPO) / 2) {
                                                            south.html("开孔中心到封头轴线距离 L 不能大于等于 " + (BDDDSO - BDDDPO) / 2 + " mm!").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL);
                                                            bddSketch.off("resize").on("resize", function () {
                                                                if ($("#bdd").length > 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL);
                                                                }
                                                            });
                                                        }
                                                        bddd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL);
                                                                    bddSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdd").length > 0) {
                                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDDCP2;
                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                            && parseFloat(rows[26][columns[0][1].field]) < BDDTHKPN) {
                                                            BDDCP2 = parseFloat(rows[26][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                            && parseFloat(rows[26][columns[0][1].field]) >= BDDTHKPN) {
                                                            south.html("接管腐蚀裕量不能大于等于 " + BDDTHKPN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let BDDEP;
                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                            BDDEP = parseFloat(rows[27][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        这个层次为计算逻辑主线
                                                         */

                                                        // 补强圈分支
                                                        let BDDIsPAD;
                                                        if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])) {
                                                            BDDIsPAD = rows[28][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                BDDIsPAD);
                                                            bddSketch.off("resize").on("resize", function () {
                                                                if ($("#bdd").length > 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                        BDDIsPAD);
                                                                }
                                                            });
                                                        }
                                                        bddd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                        BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                        BDDIsPAD);
                                                                    bddSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdd").length > 0) {
                                                                            bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                                BDDIsPAD);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDDDR = -1.0, BDDRThkMin = -1.0, BDDRThkMax = -1.0;
                                                        let BDDDRO = -1.0, BDDTHKRN = -1.0, BDDCR2 = -1.0;
                                                        let BDDORT = -1.0, BDDOR = -1.0, BDDRREL = -1.0, BDDCR1 = -1.0;
                                                        if (BDDIsPAD === "是") {

                                                            if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                                BDDRNameVal = rows[32][columns[0][1].field];
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
                                                                    "category": BDDRCategoryVal,
                                                                    "type": BDDRTypeVal,
                                                                    "std": BDDRSTDVal,
                                                                    "name": BDDRNameVal,
                                                                    "temp": BDDDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BDDDR = parseFloat(result.density);
                                                                    BDDRThkMin = parseFloat(result.thkMin);
                                                                    BDDRThkMax = parseFloat(result.thkMax);

                                                                    // dro
                                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                        && parseFloat(rows[33][columns[0][1].field]) > BDDDPO) {
                                                                        BDDDRO = parseFloat(rows[33][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                        && parseFloat(rows[33][columns[0][1].field]) <= BDDDPO) {
                                                                        south.html("补强圈外直径 Dro 不能小于等于 " + BDDDPO + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                            BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                            BDDIsPAD, "Φ" + BDDDRO);
                                                                        bddSketch.off("resize").on("resize", function () {
                                                                            if ($("#bdd").length > 0) {
                                                                                bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                    BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                                    BDDIsPAD, "Φ" + BDDDRO);
                                                                            }
                                                                        });
                                                                    }
                                                                    bddd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                    BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                                    BDDIsPAD, "Φ" + BDDDRO);
                                                                                bddSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bdd").length > 0) {
                                                                                        bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                            BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                                            BDDIsPAD, "Φ" + BDDDRO);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                        && parseFloat(rows[34][columns[0][1].field]) > BDDRThkMin
                                                                        && parseFloat(rows[34][columns[0][1].field]) <= Math.min(BDDRThkMax, 1.5 * BDDTHKSN)) {
                                                                        BDDTHKRN = parseFloat(rows[34][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                        && parseFloat(rows[34][columns[0][1].field]) <= BDDRThkMin) {
                                                                        south.html("补强圈材料厚度不能小于等于 " + BDDRThkMin + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                        && parseFloat(rows[34][columns[0][1].field]) > Math.min(BDDRThkMax, 1.5 * BDDTHKSN)) {
                                                                        south.html("补强圈材料厚度不能大于 " + Math.min(BDDRThkMax, 1.5 * BDDTHKSN) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                            BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                            BDDIsPAD, "Φ" + BDDDRO, BDDTHKRN);
                                                                        bddSketch.off("resize").on("resize", function () {
                                                                            if ($("#bdd").length > 0) {
                                                                                bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                    BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                                    BDDIsPAD, "Φ" + BDDDRO, BDDTHKRN);
                                                                            }
                                                                        });
                                                                    }
                                                                    bddd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                    BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                                    BDDIsPAD, "Φ" + BDDDRO, BDDTHKRN);
                                                                                bddSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bdd").length > 0) {
                                                                                        bdd2d("Φ" + BDDDSI, "R" + BDDBRSI, "R" + BDDSRSI,
                                                                                            BDDTHKSN, "Φ" + BDDDPO, BDDTHKPN, BDDHPO, BDDHPI, BDDALPHA + "°", BDDBETA + "°", BDDL,
                                                                                            BDDIsPAD, "Φ" + BDDDRO, BDDTHKRN);
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
                                                                            "category": BDDRCategoryVal,
                                                                            "type": BDDRTypeVal,
                                                                            "std": BDDRSTDVal,
                                                                            "name": BDDRNameVal,
                                                                            "thk": BDDTHKRN,
                                                                            "temp": BDDDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": BDDDRO
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BDDORT = parseFloat(result.ot);
                                                                            if (BDDORT < 0) {
                                                                                south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDDOR = parseFloat(result.o);
                                                                            if (BDDOR < 0) {
                                                                                south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDDRREL = parseFloat(result.rel);
                                                                            if (BDDRREL < 0) {
                                                                                south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDDCR1 = parseFloat(result.c1);
                                                                            if (BDDCR1 < 0) {
                                                                                south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 补强圈腐蚀裕量 cr2
                                                                            if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])
                                                                                && parseFloat(rows[35][columns[0][1].field]) < BDDTHKRN) {
                                                                                BDDCR2 = parseFloat(rows[35][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])
                                                                                && parseFloat(rows[35][columns[0][1].field]) >= BDDTHKRN) {
                                                                                south.html("补强圈腐蚀裕量不能大于等于 " + BDDTHKRN + " mm").css("color", "red");
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
                                                            if (BDDCR2 < 0) {
                                                                return false;
                                                            }
                                                        }

                                                        // A3
                                                        let BDDA3;
                                                        if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                            BDDA3 = parseFloat(rows[36][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // IsB
                                                        let BDDIsB;
                                                        if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])) {
                                                            BDDIsB = rows[37][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // BS
                                                        let BDDBS = -1.0;
                                                        if (BDDIsB === "是") {

                                                            // 获取 BS
                                                            if (parseFloat(rows[38][columns[0][1].field]) > BDDDPO) {
                                                                BDDBS = parseFloat(rows[38][columns[0][1].field]);
                                                            }
                                                            else if (parseFloat(rows[38][columns[0][1].field]) <= BDDDPO) {
                                                                south.html("指定补强范围 B 不能小于等于 " + BDDDPO + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }
                                                        }

                                                        /*
                                                        过程参数
                                                         */

                                                        let BDDPC = BDDPD + BDDPS;

                                                        // 碟形封头
                                                        let BDDCS = BDDCS1 + BDDCS2;
                                                        let BDDTHKSE = BDDTHKSN - BDDCS;
                                                        let BDDBRSISRSI = BDDBRSI / BDDSRSI;
                                                        let BDDM = (3 + Math.sqrt(BDDBRSISRSI)) / 4;
                                                        let BDDDSM = (BDDDSI + BDDDSO) / 2;
                                                        let BDDBRSM = (BDDBRSI + BDDBRSO) / 2;
                                                        let BDDSRSM = (BDDSRSI + BDDSRSO) / 2;
                                                        let BDDDELTA = BDDBRSM / (BDDBRSM - BDDSRSM) * (BDDDSM / 2 - BDDSRSM);
                                                        let BDDTHETA;
                                                        if (BDDL <= BDDDELTA) {
                                                            BDDTHETA = Math.asin(BDDL / BDDBRSM) / Math.PI * 180;
                                                        }
                                                        else {
                                                            BDDTHETA = Math.asin((BDDL - BDDDSM / 2 + BDDSRSM) / BDDSRSM) / Math.PI * 180;
                                                        }

                                                        // 接管
                                                        let BDDCP = BDDCP1 + BDDCP2;
                                                        let BDDTHKPE = BDDTHKPN - BDDCP;
                                                        let BDDDPC = BDDDPO - 2 * BDDTHKPN + 2 * BDDCP;
                                                        let BDDSA = BDDDPC / Math.cos(BDDBETA / 180 * Math.PI);
                                                        let BDDSB = BDDDPC / Math.cos(Math.abs(BDDALPHA - BDDTHETA) / 180 * Math.PI);
                                                        let BDDKS = Math.max(BDDSA / BDDSB, BDDSB / BDDSA);
                                                        if (BDDKS > 2) {
                                                            south.html("开孔长短轴之比大于2，程序无法计算！")
                                                                .css("color", "red");
                                                            return false;
                                                        }
                                                        let BDDDOP = Math.max(BDDSA, BDDSB);
                                                        if (BDDDOP > 0.6 * BDDDSI) {
                                                            south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                        let BDDFP = Math.min(1.0, BDDOPT / BDDOST);

                                                        // 补强圈
                                                        let BDDCR = -1.0, BDDTHKRE = -1.0, BDDFR = -1.0;
                                                        if (BDDIsPAD === "是") {
                                                            BDDCR = BDDCR1 + BDDCR2;
                                                            BDDTHKRE = BDDTHKRN - BDDCR;
                                                            BDDFR = Math.min(1.0, BDDORT / BDDOST);
                                                        }

                                                        /*
                                                        碟形封头内压强度校核
                                                         */
                                                        let BDDTHKSC;
                                                        if (BDDL <= BDDDELTA) {
                                                            BDDTHKSC = BDDPC * BDDBRSI / (2 * BDDOST * BDDES);
                                                        }
                                                        else {
                                                            BDDTHKSC = BDDM * BDDPC * BDDBRSI / (2 * BDDOST * BDDES);
                                                        }
                                                        let BDDTHKSMIN;
                                                        if (BDDM <= 1.34) {
                                                            BDDTHKSMIN = 0.0015 * BDDDSI;
                                                        }
                                                        else {
                                                            BDDTHKSMIN = 0.003 * BDDDSI;
                                                        }
                                                        let BDDTHKSD = Math.max(BDDTHKSC, BDDTHKSMIN) + BDDCS2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "碟形封头内压所需厚度：" + (BDDTHKSD + BDDCS1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDDTHKSCHK;
                                                        if (BDDTHKSN >= (BDDTHKSD + BDDCS1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDDTHKSN + " mm" +
                                                                "</span>");
                                                            BDDTHKSCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDDTHKSN + " mm" +
                                                                "</span>");
                                                            BDDTHKSCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        接管内压强度校核
                                                         */
                                                        let BDDTHKPC = BDDPC * (BDDDPO - 2 * BDDTHKPN) / (2 * BDDOPT * BDDEP);
                                                        let BDDTHKPD = BDDTHKPC + BDDCP2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "接管内压所需厚度：" + (BDDTHKPD + BDDCP1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDDTHKPCHK;
                                                        if (BDDTHKPN >= (BDDTHKPD + BDDCP1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDDTHKPN + " mm" +
                                                                "</span>");
                                                            BDDTHKPCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDDTHKPN + " mm" +
                                                                "</span>");
                                                            BDDTHKPCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        开孔补强计算
                                                         */
                                                        let BDDBA = BDDDOP * BDDTHKSC + 2 * BDDTHKSC * BDDTHKPE * (1 - BDDFP);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "开孔所需补强面积：" + BDDBA.toFixed(2) + " mm²" +
                                                            "</span>");

                                                        // 碟形封头
                                                        let BDDBB;
                                                        if (BDDIsB === "是") {
                                                            BDDBB = Math.min(Math.max(2 * BDDDOP, BDDDOP + 2 * BDDTHKSN + 2 * BDDTHKPN), BDDBS);
                                                        }
                                                        else if (BDDIsB === "否") {
                                                            BDDBB = Math.max(2 * BDDDOP, BDDDOP + 2 * BDDTHKSN + 2 * BDDTHKPN);
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                        let BDDA1 = (BDDBB - BDDDOP) * (BDDTHKSE - BDDTHKSC) - 2 * BDDTHKPE * (BDDTHKSE - BDDTHKSC) * (1 - BDDFP);

                                                        // 接管
                                                        let BDDHP1 = Math.min(BDDHPO, Math.sqrt(BDDDOP * BDDTHKPN));
                                                        let BDDHP2 = Math.min(BDDHPI, Math.sqrt(BDDDOP * BDDTHKPN));
                                                        let BDDA2 = 2 * BDDHP1 * (BDDTHKPE - BDDTHKPC) * BDDFP + 2 * BDDHP2 * (BDDTHKPE - BDDCP2) * BDDFP;

                                                        // 补强圈
                                                        let BDDA4 = 0.0, BDDDRE = -1.0;
                                                        if (BDDIsPAD === "是") {
                                                            BDDDRE = Math.min(BDDDRO, BDDBB);
                                                            BDDA4 = (BDDDRE - BDDDPO) * BDDTHKRE * BDDFR;
                                                        }

                                                        // Ae
                                                        let BDDAE = BDDA1 + BDDA2 + BDDA3 + BDDA4;
                                                        let BDDACHK;
                                                        if (BDDAE >= BDDBA.toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDDAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDDACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDDAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDDACHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        压力试验
                                                         */
                                                        let BDDETA, BDDPST, BDDPPT, BDDPT;
                                                        if (BDDTest === "液压试验") {
                                                            BDDETA = 1.25;
                                                            BDDPST = Math.max(BDDETA * BDDPD * BDDOS / BDDOST, 0.05);
                                                            BDDPPT = Math.max(BDDETA * BDDPD * BDDOP / BDDOPT, 0.05);
                                                            BDDPT = Math.min(BDDPST, BDDPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDDPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (BDDTest === "气压试验") {
                                                            BDDETA = 1.10;
                                                            BDDPST = Math.max(BDDETA * BDDPD * BDDOS / BDDOST, 0.05);
                                                            BDDPPT = Math.max(BDDETA * BDDPD * BDDOP / BDDOPT, 0.05);
                                                            BDDPT = Math.min(BDDPST, BDDPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDDPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        计算 MAWP
                                                         */

                                                        // 碟形封头
                                                        let BDDMAWPS = 2 * BDDTHKSE * BDDOST * BDDES / (BDDM * BDDBRSI) - BDDPS;

                                                        // 接管
                                                        let BDDMAWPP = 2 * BDDTHKPE * BDDOPT * BDDEP / (BDDDPO - 2 * BDDTHKPN) - BDDPS;

                                                        // 开孔补强
                                                        let BDDMAWPA1 = -1, BDDMAWPA2 = -1,
                                                            BDDMAWPA3 = BDDA3, BDDMAWPA4 = BDDA4,
                                                            BDDMAWPA = -1, BDDMAWPAE = -1,
                                                            BDDMAWPRC = BDDPC;
                                                        let BDDMAWPTHKSC, BDDMAWPTHKPC;
                                                        while (BDDMAWPAE >= BDDMAWPA) {

                                                            BDDMAWPRC += 0.0001;

                                                            // 碟形封头计算厚度
                                                            if (BDDL <= BDDDELTA) {
                                                                BDDMAWPTHKSC = BDDMAWPRC * BDDBRSI / (2 * BDDOST * BDDES);
                                                            }
                                                            else {
                                                                BDDMAWPTHKSC = BDDMAWPRC * BDDM * BDDBRSI / (2 * BDDOST * BDDES);
                                                            }
                                                            BDDMAWPA = BDDDOP * BDDMAWPTHKSC + 2 * BDDMAWPTHKSC * BDDTHKPE * (1 - BDDFP);

                                                            // 接管计算厚度
                                                            BDDMAWPTHKPC = BDDMAWPRC * (BDDDPO - 2 * BDDTHKPN) / (2 * BDDOPT * BDDEP);
                                                            BDDMAWPA1 = (BDDBB - BDDDOP) * (BDDTHKSE - BDDMAWPTHKSC) - 2 * BDDTHKPE * (BDDTHKSE - BDDMAWPTHKSC) * (1 - BDDFP);
                                                            BDDMAWPA2 = 2 * BDDHP1 * (BDDTHKPE - BDDMAWPTHKPC) * BDDFP + 2 * BDDHP2 * (BDDTHKPE - BDDCP2) * BDDFP;
                                                            BDDMAWPAE = BDDMAWPA1 + BDDMAWPA2 + BDDMAWPA3 + BDDMAWPA4;
                                                        }

                                                        // 取用 MAWP
                                                        let BDDMAWPR = BDDMAWPRC - BDDPS - 0.0001;
                                                        let BDDMAWP = Math.min(BDDMAWPS, BDDMAWPP, BDDMAWPR);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "MAWP：" + BDDMAWP.toFixed(4) + " MPa" +
                                                            "</span>");

                                                        // docx
                                                        let BDDPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "bdddocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "BDD",

                                                                    isPad: BDDIsPAD,
                                                                    isB: BDDIsB,

                                                                    tag: BDDTag,

                                                                    pd: BDDPD,
                                                                    t: BDDDT,
                                                                    ps: BDDPS,
                                                                    test: BDDTest,

                                                                    stds: BDDSSTDVal,
                                                                    names: BDDSNameVal,
                                                                    dsi: BDDDSI,
                                                                    dso: BDDDSO,
                                                                    brsi: BDDBRSI,
                                                                    srsi: BDDSRSI,
                                                                    brso: BDDBRSO,
                                                                    srso: BDDSRSO,
                                                                    thksn: BDDTHKSN,
                                                                    cs2: BDDCS2,
                                                                    es: BDDES,

                                                                    stdp: BDDPSTDVal,
                                                                    namep: BDDPNameVal,
                                                                    dpo: BDDDPO,
                                                                    thkpn: BDDTHKPN,
                                                                    hpo: BDDHPO,
                                                                    hpi: BDDHPI,
                                                                    alpha: BDDALPHA,
                                                                    beta: BDDBETA,
                                                                    l: BDDL,
                                                                    cp2: BDDCP2,
                                                                    ep: BDDEP,

                                                                    stdr: BDDRSTDVal,
                                                                    namer: BDDRNameVal,
                                                                    dro: BDDDRO,
                                                                    thkrn: BDDTHKRN,
                                                                    cr2: BDDCR2,

                                                                    a3: BDDA3,
                                                                    bs: BDDBS,

                                                                    ds: BDDDS.toFixed(4),
                                                                    cs1: BDDCS1.toFixed(4),
                                                                    rsel: BDDRSEL.toFixed(4),
                                                                    ost: BDDOST.toFixed(4),
                                                                    os: BDDOS.toFixed(4),

                                                                    dp: BDDDP.toFixed(4),
                                                                    cp1: BDDCP1.toFixed(4),
                                                                    rpel: BDDRPEL.toFixed(4),
                                                                    opt: BDDOPT.toFixed(4),
                                                                    op: BDDOP.toFixed(4),

                                                                    dr: BDDDR.toFixed(4),
                                                                    cr1: BDDCR1.toFixed(4),
                                                                    rrel: BDDRREL.toFixed(4),
                                                                    ort: BDDORT.toFixed(4),
                                                                    or: BDDOR.toFixed(4),

                                                                    pc: BDDPC.toFixed(4),

                                                                    cs: BDDCS.toFixed(4),
                                                                    thkse: BDDTHKSE.toFixed(4),
                                                                    brsisrsi: BDDBRSISRSI.toFixed(4),
                                                                    m: BDDM.toFixed(4),
                                                                    dsm: BDDDSM.toFixed(4),
                                                                    brsm: BDDBRSM.toFixed(4),
                                                                    srsm: BDDSRSM.toFixed(4),
                                                                    delta: BDDDELTA.toFixed(4),
                                                                    theta: BDDTHETA.toFixed(4),

                                                                    cp: BDDCP.toFixed(4),
                                                                    thkpe: BDDTHKPE.toFixed(4),
                                                                    dpc: BDDDPC.toFixed(4),
                                                                    sa: BDDSA.toFixed(4),
                                                                    sb: BDDSB.toFixed(4),
                                                                    ks: BDDKS.toFixed(4),
                                                                    dop: BDDDOP.toFixed(4),
                                                                    fp: BDDFP.toFixed(4),

                                                                    cr: BDDCR.toFixed(4),
                                                                    thkre: BDDTHKRE.toFixed(4),
                                                                    fr: BDDFR.toFixed(4),

                                                                    thksc: BDDTHKSC.toFixed(4),
                                                                    thksmin: BDDTHKSMIN.toFixed(4),
                                                                    thksd: BDDTHKSD.toFixed(4),
                                                                    thkschk: BDDTHKSCHK,

                                                                    thkpc: BDDTHKPC.toFixed(4),
                                                                    thkpd: BDDTHKPD.toFixed(4),
                                                                    thkpchk: BDDTHKPCHK,

                                                                    ba: BDDBA.toFixed(4),
                                                                    bb: BDDBB.toFixed(4),
                                                                    a1: BDDA1.toFixed(4),
                                                                    hp1: BDDHP1.toFixed(4),
                                                                    hp2: BDDHP2.toFixed(4),
                                                                    a2: BDDA2.toFixed(4),
                                                                    dre: BDDDRE.toFixed(4),
                                                                    a4: BDDA4.toFixed(4),
                                                                    ae: BDDAE.toFixed(4),
                                                                    achk: BDDACHK,

                                                                    eta: BDDETA.toFixed(4),
                                                                    pst: BDDPST.toFixed(4),
                                                                    ppt: BDDPPT.toFixed(4),
                                                                    pt: BDDPT.toFixed(4),

                                                                    mawps: BDDMAWPS.toFixed(4),
                                                                    mawpp: BDDMAWPP.toFixed(4),
                                                                    mawpa1: BDDMAWPA1.toFixed(0),
                                                                    mawpa2: BDDMAWPA2.toFixed(0),
                                                                    mawpa3: BDDMAWPA3,
                                                                    mawpa4: BDDMAWPA4.toFixed(0),
                                                                    mawpa: BDDMAWPA.toFixed(0),
                                                                    mawpae: BDDMAWPAE.toFixed(0),
                                                                    mawpr: BDDMAWPR.toFixed(4),
                                                                    mawp: BDDMAWP.toFixed(4)
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
                                                                        BDDPayJS.dialog({
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
                                                                                    BDDPayJS.dialog("close");
                                                                                    BDDPayJS.dialog("clear");
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
                                                                                                BDDPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        BDDPayJS.dialog('close');
                                                                                                        BDDPayJS.dialog('clear');
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

                pg.propertygrid('options').finder.getTr(this, 29).hide();
                pg.propertygrid('options').finder.getTr(this, 30).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 34).hide();
                pg.propertygrid('options').finder.getTr(this, 35).hide();

                pg.propertygrid('options').finder.getTr(this, 38).hide();
            }
        });
    });
});