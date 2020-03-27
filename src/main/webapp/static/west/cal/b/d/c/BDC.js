$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bdcSketch = $("#d2");
    let bdcModel = $("#d3");
    let bdcd2d3 = $('#d2d3');

    $("#cal").html("<table id='bdc'></table>");
    let pg = $("#bdc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/d/c/BDC.json", function (result) {

        let BDCDT,
            BDCSCategory, BDCSCategoryVal, BDCSType, BDCSTypeVal, BDCSSTD, BDCSSTDVal, BDCSName, BDCSNameVal,
            BDCPCategory, BDCPCategoryVal, BDCPType, BDCPTypeVal, BDCPSTD, BDCPSTDVal, BDCPName, BDCPNameVal,
            BDCRCategory, BDCRCategoryVal, BDCRType, BDCRTypeVal, BDCRSTD, BDCRSTDVal, BDCRName, BDCRNameVal,
            columns, rows, ed;

        function bdc2d(dsi = "ΦDsi", hsi = "hsi", thksn = "δsn",
                       dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α", beta = "β", l = "L",
                       isPad, dro = "Φdro", thkrn = "δrn") {

            bdcSketch.empty();
            let width = bdcSketch.width();
            let height = bdcSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BDCSVG").attr("height", height);

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

            // 左侧椭圆封头
            drawLine(padding - 2 * thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + 2 * hg);
            drawLine(padding - 2 * thk, padding + 2 * hg + thk, padding + 0.5 * wg - thk, padding + 2 * hg + thk);

            // 右侧椭圆封头
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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "BDCSketchDRO");
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
                ])).attr("id", "BDCSketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#BDCSketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "BDCSketchDPO");

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
            ])).attr("id", "BDCSketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDCSketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "BDCSketchHPI");

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "BDCSketchHPO");

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
            ])).attr("id", "BDCSketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDCSketchTHKSN").attr("startOffset", "50%").text(thksn);

            // 上部椭圆
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
            ).classed("sketch", true).attr("id", "BDCSketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDCSketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "BDCSketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDCSketchL")
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
            ).classed("sketch", true).attr("id", "BDCSketchBETA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDCSketchBETA").attr("startOffset", "50%").text(beta);
        }

        currentTabIndex = bdcd2d3.tabs('getTabIndex', bdcd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bdc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bdc").length > 0) {
                    bdc2d();
                }
            });
        }
        bdcd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bdc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bdc").length > 0) {
                            bdc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 椭圆封头插入式接管补强计算",
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
                if (index === 28 || index === 29 || index === 30 || index === 31 || index === 32 || index === 33 || index === 34
                    || index === 37) {
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
                    $(ed.target).combobox("loadData", BDCSCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BDCSType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BDCSSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BDCSName);
                }

                else if (index === 14) {
                    $(ed.target).combobox("loadData", BDCPCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BDCPType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BDCPSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", BDCPName);
                }

                else if (index === 28) {
                    $(ed.target).combobox("loadData", BDCRCategory);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BDCRType);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", BDCRSTD);
                }
                else if (index === 31) {
                    $(ed.target).combobox("loadData", BDCRName);
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
                    bdcSketch.empty();
                    bdcModel.empty();

                    // sketch
                    currentTabIndex = bdcd2d3.tabs('getTabIndex', bdcd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bdc2d();
                        bdcSketch.off("resize").on("resize", function () {
                            if ($("#bdc").length > 0) {
                                bdc2d();
                            }
                        });
                    }
                    bdcd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bdc2d();
                                bdcSketch.off("resize").on("resize", function () {
                                    if ($("#bdc").length > 0) {
                                        bdc2d();
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

                        BDCDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BDCSCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDCSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDCSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDCSName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BDCPCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDCPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDCPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDCPName = null;

                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDCRCategory = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDCRType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDCRSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BDCRName = null;

                        if (rows[27][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 28).hide();
                            pg.propertygrid('options').finder.getTr(this, 29).hide();
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCSCategory = [];
                                BDCPCategory = [];
                                BDCRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BDCDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BDCSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDCPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDCRCategory[index] = {
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

                        BDCSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDCSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDCSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDCSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCSCategoryVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCSType = [];
                                $(result).each(function (index, element) {
                                    BDCSType[index] = {
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

                        BDCSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDCSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDCSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCSCategoryVal,
                                type: BDCSTypeVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCSSTD = [];
                                $(result).each(function (index, element) {
                                    BDCSSTD[index] = {
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

                        BDCSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDCSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCSCategoryVal,
                                type: BDCSTypeVal,
                                std: BDCSSTDVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCSName = [];
                                $(result).each(function (index, element) {
                                    BDCSName[index] = {
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
                    else if (index === 14) {

                        BDCPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDCPType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDCPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDCPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCPCategoryVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCPType = [];
                                $(result).each(function (index, element) {
                                    BDCPType[index] = {
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
                    else if (index === 15) {

                        BDCPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDCPSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDCPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCPCategoryVal,
                                type: BDCPTypeVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCPSTD = [];
                                $(result).each(function (index, element) {
                                    BDCPSTD[index] = {
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
                    else if (index === 16) {

                        BDCPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        BDCPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCPCategoryVal,
                                type: BDCPTypeVal,
                                std: BDCPSTDVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCPName = [];
                                $(result).each(function (index, element) {
                                    BDCPName[index] = {
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
                    else if (index === 28) {

                        BDCRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDCRType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDCRSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BDCRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCRCategoryVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCRType = [];
                                $(result).each(function (index, element) {
                                    BDCRType[index] = {
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
                    else if (index === 29) {

                        BDCRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        BDCRSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BDCRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCRCategoryVal,
                                type: BDCRTypeVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCRSTD = [];
                                $(result).each(function (index, element) {
                                    BDCRSTD[index] = {
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
                    else if (index === 30) {

                        BDCRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        BDCRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDCRCategoryVal,
                                type: BDCRTypeVal,
                                std: BDCRSTDVal,
                                temp: BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDCRName = [];
                                $(result).each(function (index, element) {
                                    BDCRName[index] = {
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
                        if (index === 27) {
                            if (rows[27][columns[0][1].field] === "是") {
                                pg.propertygrid('options').finder.getTr(this, 28).show();
                                pg.propertygrid('options').finder.getTr(this, 29).show();
                                pg.propertygrid('options').finder.getTr(this, 30).show();
                                pg.propertygrid('options').finder.getTr(this, 31).show();
                                pg.propertygrid('options').finder.getTr(this, 32).show();
                                pg.propertygrid('options').finder.getTr(this, 33).show();
                                pg.propertygrid('options').finder.getTr(this, 34).show();
                            }
                            else if (rows[27][columns[0][1].field] === "否") {
                                pg.propertygrid('options').finder.getTr(this, 28).hide();
                                pg.propertygrid('options').finder.getTr(this, 29).hide();
                                pg.propertygrid('options').finder.getTr(this, 30).hide();
                                pg.propertygrid('options').finder.getTr(this, 31).hide();
                                pg.propertygrid('options').finder.getTr(this, 32).hide();
                                pg.propertygrid('options').finder.getTr(this, 33).hide();
                                pg.propertygrid('options').finder.getTr(this, 34).hide();
                            }
                            else {
                                return false;
                            }
                        }
                        // UI - IsB
                        if (index === 36) {
                            if (rows[36][columns[0][1].field] === "是") {
                                pg.datagrid('options').finder.getTr(this, 37).show();
                            }
                            else if (rows[36][columns[0][1].field] === "否") {
                                pg.datagrid('options').finder.getTr(this, 37).hide();
                            }
                            else {
                                return false;
                            }
                        }

                        // Tag
                        let BDCTag = "符号标记";
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BDCTag = rows[0][columns[0][1].field];
                        }

                        // 设计压力
                        let BDCPD;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            BDCPD = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BDCPS;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BDCPS = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Test
                        let BDCTest;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            BDCTest = rows[4][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 椭圆封头材料名称
                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                            BDCSNameVal = rows[8][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取椭圆封头材料密度、最大最小厚度
                        let BDCDS, BDCSThkMin, BDCSThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BDCSCategoryVal,
                                "type": BDCSTypeVal,
                                "std": BDCSSTDVal,
                                "name": BDCSNameVal,
                                "temp": BDCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BDCDS = parseFloat(result.density);
                                BDCSThkMin = parseFloat(result.thkMin);
                                BDCSThkMax = parseFloat(result.thkMax);

                                let BDCDSI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    BDCDSI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdc2d("Φ" + BDCDSI);
                                    bdcSketch.off("resize").on("resize", function () {
                                        if ($("#bdc").length > 0) {
                                            bdc2d("Φ" + BDCDSI);
                                        }
                                    });
                                }
                                bdcd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdc2d("Φ" + BDCDSI);
                                            bdcSketch.off("resize").on("resize", function () {
                                                if ($("#bdc").length > 0) {
                                                    bdc2d("Φ" + BDCDSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                let BDCHSI;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    BDCHSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdc2d("Φ" + BDCDSI, BDCHSI);
                                    bdcSketch.off("resize").on("resize", function () {
                                        if ($("#bdc").length > 0) {
                                            bdc2d("Φ" + BDCDSI, BDCHSI);
                                        }
                                    });
                                }
                                bdcd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdc2d("Φ" + BDCDSI, BDCHSI);
                                            bdcSketch.off("resize").on("resize", function () {
                                                if ($("#bdc").length > 0) {
                                                    bdc2d("Φ" + BDCDSI, BDCHSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // THKSN
                                let BDCTHKSN;
                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > BDCSThkMin
                                    && parseFloat(rows[11][columns[0][1].field]) <= BDCSThkMax) {
                                    BDCTHKSN = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) <= BDCSThkMin) {
                                    south.html("椭圆封头材料厚度不能小于等于 " + BDCSThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > BDCSThkMax) {
                                    south.html("椭圆封头材料厚度不能大于 " + BDCSThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN);
                                    bdcSketch.off("resize").on("resize", function () {
                                        if ($("#bdc").length > 0) {
                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN);
                                        }
                                    });
                                }
                                bdcd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN);
                                            bdcSketch.off("resize").on("resize", function () {
                                                if ($("#bdc").length > 0) {
                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                /*
                                获取椭圆封头力学特性
                                 */
                                let BDCDSO = BDCDSI + 2 * BDCTHKSN;
                                let BDCHSO = BDCHSI + BDCTHKSN;
                                let BDCOST, BDCOS, BDCRSEL, BDCCS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BDCSCategoryVal,
                                        "type": BDCSTypeVal,
                                        "std": BDCSSTDVal,
                                        "name": BDCSNameVal,
                                        "thk": BDCTHKSN,
                                        "temp": BDCDT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BDCDSO
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BDCOST = parseFloat(result.ot);
                                        if (BDCOST < 0) {
                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDCOS = parseFloat(result.o);
                                        if (BDCOS < 0) {
                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDCRSEL = parseFloat(result.rel);
                                        if (BDCRSEL < 0) {
                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BDCCS1 = parseFloat(result.c1);
                                        if (BDCCS1 < 0) {
                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        let BDCCS2;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) < BDCTHKSN) {
                                            BDCCS2 = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                            && parseFloat(rows[12][columns[0][1].field]) >= BDCTHKSN) {
                                            south.html("椭圆封头腐蚀裕量不能大于等于 " + BDCTHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        let BDCES;
                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                            BDCES = parseFloat(rows[13][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 接管材料名称
                                        if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                            BDCPNameVal = rows[17][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取接管材料密度、最大最小厚度
                                        let BDCDP, BDCPThkMin, BDCPThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BDCPCategoryVal,
                                                "type": BDCPTypeVal,
                                                "std": BDCPSTDVal,
                                                "name": BDCPNameVal,
                                                "temp": BDCDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BDCDP = parseFloat(result.density);
                                                BDCPThkMin = parseFloat(result.thkMin);
                                                BDCPThkMax = parseFloat(result.thkMax);

                                                let BDCDPO;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                                    BDCDPO = parseFloat(rows[18][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO);
                                                    bdcSketch.off("resize").on("resize", function () {
                                                        if ($("#bdc").length > 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO);
                                                        }
                                                    });
                                                }
                                                bdcd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO);
                                                            bdcSketch.off("resize").on("resize", function () {
                                                                if ($("#bdc").length > 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // THKPN
                                                let BDCTHKPN;
                                                if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) > BDCPThkMin
                                                    && parseFloat(rows[19][columns[0][1].field]) <= Math.min(BDCPThkMax, BDCDPO / 2)) {
                                                    BDCTHKPN = parseFloat(rows[19][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) <= BDCPThkMin) {
                                                    south.html("接管材料厚度不能小于等于 " + BDCPThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                    && parseFloat(rows[19][columns[0][1].field]) > Math.min(BDCPThkMax, BDCDPO / 2)) {
                                                    south.html("接管材料厚度不能大于 " + Math.min(BDCPThkMax, BDCDPO / 2) + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN);
                                                    bdcSketch.off("resize").on("resize", function () {
                                                        if ($("#bdc").length > 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN);
                                                        }
                                                    });
                                                }
                                                bdcd2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN);
                                                            bdcSketch.off("resize").on("resize", function () {
                                                                if ($("#bdc").length > 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BDCOPT, BDCOP, BDCRPEL, BDCCP1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BDCPCategoryVal,
                                                        "type": BDCPTypeVal,
                                                        "std": BDCPSTDVal,
                                                        "name": BDCPNameVal,
                                                        "thk": BDCTHKPN,
                                                        "temp": BDCDT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BDCDPO
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BDCOPT = parseFloat(result.ot);
                                                        if (BDCOPT < 0) {
                                                            south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDCOP = parseFloat(result.o);
                                                        if (BDCOP < 0) {
                                                            south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDCRPEL = parseFloat(result.rel);
                                                        if (BDCRPEL < 0) {
                                                            south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDCCP1 = parseFloat(result.c1);
                                                        if (BDCCP1 < 0) {
                                                            south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        let BDCHPO;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                            BDCHPO = parseFloat(rows[20][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO);
                                                            bdcSketch.off("resize").on("resize", function () {
                                                                if ($("#bdc").length > 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO);
                                                                }
                                                            });
                                                        }
                                                        bdcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO);
                                                                    bdcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdc").length > 0) {
                                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDCHPI;
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                            BDCHPI = parseFloat(rows[21][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI);
                                                            bdcSketch.off("resize").on("resize", function () {
                                                                if ($("#bdc").length > 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI);
                                                                }
                                                            });
                                                        }
                                                        bdcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI);
                                                                    bdcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdc").length > 0) {
                                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDCALPHA;
                                                        if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                            BDCALPHA = parseFloat(rows[22][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°");
                                                            bdcSketch.off("resize").on("resize", function () {
                                                                if ($("#bdc").length > 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                        bdcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°");
                                                                    bdcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdc").length > 0) {
                                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDCBETA;
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                            BDCBETA = parseFloat(rows[23][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°");
                                                            bdcSketch.off("resize").on("resize", function () {
                                                                if ($("#bdc").length > 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°");
                                                                }
                                                            });
                                                        }
                                                        bdcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°");
                                                                    bdcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdc").length > 0) {
                                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDCL;
                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                            && parseFloat(rows[24][columns[0][1].field]) < (BDCDSO - BDCDPO) / 2) {
                                                            BDCL = parseFloat(rows[24][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                            && parseFloat(rows[24][columns[0][1].field]) >= (BDCDSO - BDCDPO) / 2) {
                                                            south.html("开孔中心到封头轴线距离 L 不能大于等于 " + (BDCDSI + 2 * BDCTHKSN - BDCDPO) / 2 + " mm!").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL);
                                                            bdcSketch.off("resize").on("resize", function () {
                                                                if ($("#bdc").length > 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL);
                                                                }
                                                            });
                                                        }
                                                        bdcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL);
                                                                    bdcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdc").length > 0) {
                                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDCCP2;
                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                            && parseFloat(rows[25][columns[0][1].field]) < BDCTHKPN) {
                                                            BDCCP2 = parseFloat(rows[25][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                            && parseFloat(rows[25][columns[0][1].field]) >= BDCTHKPN) {
                                                            south.html("接管腐蚀裕量不能大于等于 " + BDCTHKPN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let BDCEP;
                                                        if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                            BDCEP = parseFloat(rows[26][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        这个层次为计算逻辑主线
                                                         */

                                                        // 补强圈分支
                                                        let BDCIsPAD;
                                                        if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                            BDCIsPAD = rows[27][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD);
                                                            bdcSketch.off("resize").on("resize", function () {
                                                                if ($("#bdc").length > 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD);
                                                                }
                                                            });
                                                        }
                                                        bdcd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD);
                                                                    bdcSketch.off("resize").on("resize", function () {
                                                                        if ($("#bdc").length > 0) {
                                                                            bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN, "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDCDR = -1.0, BDCRThkMin = -1.0, BDCRThkMax = -1.0;
                                                        let BDCDRO = -1.0, BDCTHKRN = -1.0, BDCCR2 = -1.0;
                                                        let BDCORT = -1.0, BDCOR = -1.0, BDCRREL = -1.0, BDCCR1 = -1.0;
                                                        if (BDCIsPAD === "是") {

                                                            if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                                BDCRNameVal = rows[31][columns[0][1].field];
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
                                                                    "category": BDCRCategoryVal,
                                                                    "type": BDCRTypeVal,
                                                                    "std": BDCRSTDVal,
                                                                    "name": BDCRNameVal,
                                                                    "temp": BDCDT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BDCDR = parseFloat(result.density);
                                                                    BDCRThkMin = parseFloat(result.thkMin);
                                                                    BDCRThkMax = parseFloat(result.thkMax);

                                                                    // dro
                                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                        && parseFloat(rows[32][columns[0][1].field]) > BDCDPO) {
                                                                        BDCDRO = parseFloat(rows[32][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                        && parseFloat(rows[32][columns[0][1].field]) <= BDCDPO) {
                                                                        south.html("补强圈外直径 Dro 不能小于等于 " + BDCDPO + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN,
                                                                            "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD, "Φ" + BDCDRO);
                                                                        bdcSketch.off("resize").on("resize", function () {
                                                                            if ($("#bdc").length > 0) {
                                                                                bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN,
                                                                                    "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD, "Φ" + BDCDRO);
                                                                            }
                                                                        });
                                                                    }
                                                                    bdcd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN,
                                                                                    "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD, "Φ" + BDCDRO);
                                                                                bdcSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bdc").length > 0) {
                                                                                        bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN,
                                                                                            "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD, "Φ" + BDCDRO);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                        && parseFloat(rows[33][columns[0][1].field]) > BDCRThkMin
                                                                        && parseFloat(rows[33][columns[0][1].field]) <= Math.min(BDCRThkMax, 1.5 * BDCTHKSN)) {
                                                                        BDCTHKRN = parseFloat(rows[33][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                        && parseFloat(rows[33][columns[0][1].field]) <= BDCRThkMin) {
                                                                        south.html("补强圈材料厚度不能小于等于 " + BDCRThkMin + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                        && parseFloat(rows[33][columns[0][1].field]) > Math.min(BDCRThkMax, 1.5 * BDCTHKSN)) {
                                                                        south.html("补强圈材料厚度不能大于 " + Math.min(BDCRThkMax, 1.5 * BDCTHKSN) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN,
                                                                            "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD, "Φ" + BDCDRO, BDCTHKRN);
                                                                        bdcSketch.off("resize").on("resize", function () {
                                                                            if ($("#bdc").length > 0) {
                                                                                bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN,
                                                                                    "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD, "Φ" + BDCDRO, BDCTHKRN);
                                                                            }
                                                                        });
                                                                    }
                                                                    bdcd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN,
                                                                                    "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD, "Φ" + BDCDRO, BDCTHKRN);
                                                                                bdcSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bdc").length > 0) {
                                                                                        bdc2d("Φ" + BDCDSI, BDCHSI, BDCTHKSN,
                                                                                            "Φ" + BDCDPO, BDCTHKPN, BDCHPO, BDCHPI, BDCALPHA + "°", BDCBETA + "°", BDCL, BDCIsPAD, "Φ" + BDCDRO, BDCTHKRN);
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
                                                                            "category": BDCRCategoryVal,
                                                                            "type": BDCRTypeVal,
                                                                            "std": BDCRSTDVal,
                                                                            "name": BDCRNameVal,
                                                                            "thk": BDCTHKRN,
                                                                            "temp": BDCDT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": BDCDRO
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BDCORT = parseFloat(result.ot);
                                                                            if (BDCORT < 0) {
                                                                                south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDCOR = parseFloat(result.o);
                                                                            if (BDCOR < 0) {
                                                                                south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDCRREL = parseFloat(result.rel);
                                                                            if (BDCRREL < 0) {
                                                                                south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDCCR1 = parseFloat(result.c1);
                                                                            if (BDCCR1 < 0) {
                                                                                south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 补强圈腐蚀裕量 cr2
                                                                            if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                                && parseFloat(rows[34][columns[0][1].field]) < BDCTHKRN) {
                                                                                BDCCR2 = parseFloat(rows[34][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                                && parseFloat(rows[34][columns[0][1].field]) >= BDCTHKRN) {
                                                                                south.html("补强圈腐蚀裕量不能大于等于 " + BDCTHKRN + " mm").css("color", "red");
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
                                                            if (BDCCR2 < 0) {
                                                                return false;
                                                            }
                                                        }

                                                        // A3
                                                        let BDCA3;
                                                        if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                            BDCA3 = parseFloat(rows[35][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // IsB
                                                        let BDCIsB;
                                                        if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                            BDCIsB = rows[36][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // BS
                                                        let BDCBS = -1.0;
                                                        if (BDCIsB === "是") {

                                                            // 获取 BS
                                                            if (parseFloat(rows[37][columns[0][1].field]) > BDCDPO) {
                                                                BDCBS = parseFloat(rows[37][columns[0][1].field]);
                                                            }
                                                            else if (parseFloat(rows[37][columns[0][1].field]) <= BDCDPO) {
                                                                south.html("指定补强范围 B 不能小于等于 " + BDCDPO + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }
                                                        }

                                                        /*
                                                        过程参数
                                                         */

                                                        let BDCPC = BDCPD + BDCPS;

                                                        // 椭圆封头
                                                        let BDCCS = BDCCS1 + BDCCS2;
                                                        let BDCTHKSE = BDCTHKSN - BDCCS;
                                                        let BDCDSI2HSI = BDCDSI / (2 * BDCHSI);
                                                        let BDCK = (2 + BDCDSI2HSI * BDCDSI2HSI) / 6;
                                                        let BDCDSO2HSO = BDCDSO / (2 * BDCHSO);
                                                        let BDCK1;
                                                        if (BDCDSO2HSO > 2.6 || BDCDSO2HSO < 1.0) {
                                                            south.html("椭圆封头尺寸超限，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (BDCDSO2HSO === 2.6) {
                                                            BDCK1 = 1.18;
                                                        }
                                                        else if (BDCDSO2HSO < 2.6 && BDCDSO2HSO > 2.4) {
                                                            BDCK1 = 1.18 + (BDCDSO2HSO - 2.6) / (2.4 - 2.6) * (1.08 - 1.18);
                                                        }
                                                        else if (BDCDSO2HSO === 2.4) {
                                                            BDCK1 = 1.08;
                                                        }
                                                        else if (BDCDSO2HSO < 2.4 && BDCDSO2HSO > 2.2) {
                                                            BDCK1 = 1.08 + (BDCDSO2HSO - 2.4) / (2.2 - 2.4) * (0.99 - 1.08);
                                                        }
                                                        else if (BDCDSO2HSO === 2.2) {
                                                            BDCK1 = 0.99;
                                                        }
                                                        else if (BDCDSO2HSO < 2.2 && BDCDSO2HSO > 2.0) {
                                                            BDCK1 = 0.99 + (BDCDSO2HSO - 2.2) / (2.0 - 2.2) * (0.90 - 0.99);
                                                        }
                                                        else if (BDCDSO2HSO === 2.0) {
                                                            BDCK1 = 0.90;
                                                        }
                                                        else if (BDCDSO2HSO < 2.0 && BDCDSO2HSO > 1.8) {
                                                            BDCK1 = 0.90 + (BDCDSO2HSO - 2) / (1.8 - 2) * (0.81 - 0.90);
                                                        }
                                                        else if (BDCDSO2HSO === 1.8) {
                                                            BDCK1 = 0.81;
                                                        }
                                                        else if (BDCDSO2HSO < 1.8 && BDCDSO2HSO > 1.6) {
                                                            BDCK1 = 0.81 + (BDCDSO2HSO - 1.8) / (1.6 - 1.8) * (0.73 - 0.81);
                                                        }
                                                        else if (BDCDSO2HSO === 1.6) {
                                                            BDCK1 = 0.73;
                                                        }
                                                        else if (BDCDSO2HSO < 1.6 && BDCDSO2HSO > 1.4) {
                                                            BDCK1 = 0.73 + (BDCDSO2HSO - 1.6) / (1.4 - 1.6) * (0.65 - 0.73);
                                                        }
                                                        else if (BDCDSO2HSO === 1.4) {
                                                            BDCK1 = 0.65;
                                                        }
                                                        else if (BDCDSO2HSO < 1.4 && BDCDSO2HSO > 1.2) {
                                                            BDCK1 = 0.65 + (BDCDSO2HSO - 1.4) / (1.2 - 1.4) * (0.57 - 0.65);
                                                        }
                                                        else if (BDCDSO2HSO === 1.2) {
                                                            BDCK1 = 0.57;
                                                        }
                                                        else if (BDCDSO2HSO < 1.2 && BDCDSO2HSO > 1.0) {
                                                            BDCK1 = 0.57 + (BDCDSO2HSO - 1.2) / (1.0 - 1.2) * (0.50 - 0.57);
                                                        }
                                                        else if (BDCDSO2HSO === 1.0) {
                                                            BDCK1 = 0.50;
                                                        }
                                                        let BDCASM = (BDCDSI + BDCDSO) / 4;
                                                        let BDCBSM = (BDCHSI + BDCHSO) / 2;
                                                        let BDCH = BDCBSM / BDCASM * Math.sqrt(BDCASM * BDCASM - BDCL * BDCL);
                                                        let BDCTHETA = Math.atan(BDCBSM * BDCBSM * BDCL / BDCASM / BDCASM / BDCH) / Math.PI * 180;

                                                        // 接管
                                                        let BDCCP = BDCCP1 + BDCCP2;
                                                        let BDCTHKPE = BDCTHKPN - BDCCP;
                                                        let BDCDPC = BDCDPO - 2 * BDCTHKPN + 2 * BDCCP;
                                                        let BDCSA = BDCDPC / Math.cos(BDCBETA / 180 * Math.PI);
                                                        let BDCSB = BDCDPC / Math.cos(Math.abs(BDCALPHA - BDCTHETA) / 180 * Math.PI);
                                                        let BDCKS = Math.max(BDCSA / BDCSB, BDCSB / BDCSA);
                                                        if (BDCKS > 2) {
                                                            south.html("开孔长短轴之比大于2，程序无法计算！")
                                                                .css("color", "red");
                                                            return false;
                                                        }
                                                        let BDCDOP = Math.max(BDCSA, BDCSB);
                                                        if (BDCDOP > 0.6 * BDCDSI) {
                                                            south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                        let BDCFP = Math.min(1.0, BDCOPT / BDCOST);

                                                        // 补强圈
                                                        let BDCCR = -1.0, BDCTHKRE = -1.0, BDCFR = -1.0;
                                                        if (BDCIsPAD === "是") {
                                                            BDCCR = BDCCR1 + BDCCR2;
                                                            BDCTHKRE = BDCTHKRN - BDCCR;
                                                            BDCFR = Math.min(1.0, BDCORT / BDCOST);
                                                        }

                                                        /*
                                                        椭圆封头内压强度校核
                                                         */
                                                        let BDCTHKSC;
                                                        if (BDCL <= 0.4 * BDCDSI) {
                                                            BDCTHKSC = BDCPC * BDCK1 * BDCDSI / (2 * BDCOST * BDCES);
                                                        }
                                                        else {
                                                            BDCTHKSC = BDCPC * BDCK * BDCDSI / (2 * BDCOST * BDCES);
                                                        }
                                                        let BDCTHKSMIN;
                                                        if (BDCK <= 1) {
                                                            BDCTHKSMIN = 0.0015 * BDCDSI;
                                                        }
                                                        else {
                                                            BDCTHKSMIN = 0.003 * BDCDSI;
                                                        }
                                                        let BDCTHKSD = Math.max(BDCTHKSC, BDCTHKSMIN) + BDCCS2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "椭圆封头内压所需厚度：" + (BDCTHKSD + BDCCS1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDCTHKSCHK;
                                                        if (BDCTHKSN >= (BDCTHKSD + BDCCS1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDCTHKSN + " mm" +
                                                                "</span>");
                                                            BDCTHKSCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDCTHKSN + " mm" +
                                                                "</span>");
                                                            BDCTHKSCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        接管内压强度校核
                                                         */
                                                        let BDCTHKPC = BDCPC * (BDCDPO - 2 * BDCTHKPN) / (2 * BDCOPT * BDCEP);
                                                        let BDCTHKPD = BDCTHKPC + BDCCP2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "接管内压所需厚度：" + (BDCTHKPD + BDCCP1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDCTHKPCHK;
                                                        if (BDCTHKPN >= (BDCTHKPD + BDCCP1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDCTHKPN + " mm" +
                                                                "</span>");
                                                            BDCTHKPCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDCTHKPN + " mm" +
                                                                "</span>");
                                                            BDCTHKPCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        开孔补强计算
                                                         */
                                                        let BDCBA = BDCDOP * BDCTHKSC + 2 * BDCTHKSC * BDCTHKPE * (1 - BDCFP);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "开孔所需补强面积：" + BDCBA.toFixed(2) + " mm²" +
                                                            "</span>");

                                                        // 椭圆封头
                                                        let BDCBB;
                                                        if (BDCIsB === "是") {
                                                            BDCBB = Math.min(Math.max(2 * BDCDOP, BDCDOP + 2 * BDCTHKSN + 2 * BDCTHKPN), BDCBS);
                                                        }
                                                        else if (BDCIsB === "否") {
                                                            BDCBB = Math.max(2 * BDCDOP, BDCDOP + 2 * BDCTHKSN + 2 * BDCTHKPN);
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                        let BDCA1 = (BDCBB - BDCDOP) * (BDCTHKSE - BDCTHKSC) - 2 * BDCTHKPE * (BDCTHKSE - BDCTHKSC) * (1 - BDCFP);

                                                        // 接管
                                                        let BDCHP1 = Math.min(BDCHPO, Math.sqrt(BDCDOP * BDCTHKPN));
                                                        let BDCHP2 = Math.min(BDCHPI, Math.sqrt(BDCDOP * BDCTHKPN));
                                                        let BDCA2 = 2 * BDCHP1 * (BDCTHKPE - BDCTHKPC) * BDCFP + 2 * BDCHP2 * (BDCTHKPE - BDCCP2) * BDCFP;

                                                        // 补强圈
                                                        let BDCA4 = 0.0, BDCDRE = -1.0;
                                                        if (BDCIsPAD === "是") {
                                                            BDCDRE = Math.min(BDCDRO, BDCBB);
                                                            BDCA4 = (BDCDRE - BDCDPO) * BDCTHKRE * BDCFR;
                                                        }

                                                        // Ae
                                                        let BDCAE = BDCA1 + BDCA2 + BDCA3 + BDCA4;
                                                        let BDCACHK;
                                                        if (BDCAE >= BDCBA.toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDCAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDCACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDCAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDCACHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        压力试验
                                                         */
                                                        let BDCETA, BDCPST, BDCPPT, BDCPT;
                                                        if (BDCTest === "液压试验") {
                                                            BDCETA = 1.25;
                                                            BDCPST = Math.max(BDCETA * BDCPD * BDCOS / BDCOST, 0.05);
                                                            BDCPPT = Math.max(BDCETA * BDCPD * BDCOP / BDCOPT, 0.05);
                                                            BDCPT = Math.min(BDCPST, BDCPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDCPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (BDCTest === "气压试验") {
                                                            BDCETA = 1.10;
                                                            BDCPST = Math.max(BDCETA * BDCPD * BDCOS / BDCOST, 0.05);
                                                            BDCPPT = Math.max(BDCETA * BDCPD * BDCOP / BDCOPT, 0.05);
                                                            BDCPT = Math.min(BDCPST, BDCPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDCPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        计算 MAWP
                                                         */

                                                        // 椭圆封头
                                                        let BDCMAWPS = 2 * BDCTHKSE * BDCOST * BDCES / (BDCK * BDCDSI) - BDCPS;

                                                        // 接管
                                                        let BDCMAWPP = 2 * BDCTHKPE * BDCOPT * BDCEP / (BDCDPO - 2 * BDCTHKPN) - BDCPS;

                                                        // 开孔补强
                                                        let BDCMAWPA1 = -1, BDCMAWPA2 = -1,
                                                            BDCMAWPA3 = BDCA3, BDCMAWPA4 = BDCA4,
                                                            BDCMAWPA = -1, BDCMAWPAE = -1,
                                                            BDCMAWPRC = BDCPC;
                                                        let BDCMAWPTHKSC, BDCMAWPTHKPC;
                                                        while (BDCMAWPAE >= BDCMAWPA) {

                                                            BDCMAWPRC += 0.0001;

                                                            // 椭圆封头计算厚度
                                                            if (BDCL <= 0.4 * BDCDSI) {
                                                                BDCMAWPTHKSC = BDCMAWPRC * BDCK1 * BDCDSI / (2 * BDCOST * BDCES);
                                                            }
                                                            else {
                                                                BDCMAWPTHKSC = BDCMAWPRC * BDCK * BDCDSI / (2 * BDCOST * BDCES);
                                                            }
                                                            BDCMAWPA = BDCDOP * BDCMAWPTHKSC + 2 * BDCMAWPTHKSC * BDCTHKPE * (1 - BDCFP);

                                                            // 接管计算厚度
                                                            BDCMAWPTHKPC = BDCMAWPRC * (BDCDPO - 2 * BDCTHKPN) / (2 * BDCOPT * BDCEP);
                                                            BDCMAWPA1 = (BDCBB - BDCDOP) * (BDCTHKSE - BDCMAWPTHKSC) - 2 * BDCTHKPE * (BDCTHKSE - BDCMAWPTHKSC) * (1 - BDCFP);
                                                            BDCMAWPA2 = 2 * BDCHP1 * (BDCTHKPE - BDCMAWPTHKPC) * BDCFP + 2 * BDCHP2 * (BDCTHKPE - BDCCP2) * BDCFP;
                                                            BDCMAWPAE = BDCMAWPA1 + BDCMAWPA2 + BDCMAWPA3 + BDCMAWPA4;
                                                        }

                                                        // 取用 MAWP
                                                        let BDCMAWPR = BDCMAWPRC - BDCPS - 0.0001;
                                                        let BDCMAWP = Math.min(BDCMAWPS, BDCMAWPP, BDCMAWPR);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "MAWP：" + BDCMAWP.toFixed(4) + " MPa" +
                                                            "</span>");

                                                        // docx
                                                        let BDCPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "bdcdocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "BDC",

                                                                    isPad: BDCIsPAD,
                                                                    isB: BDCIsB,

                                                                    tag: BDCTag,

                                                                    pd: BDCPD,
                                                                    t: BDCDT,
                                                                    ps: BDCPS,
                                                                    test: BDCTest,

                                                                    stds: BDCSSTDVal,
                                                                    names: BDCSNameVal,
                                                                    dsi: BDCDSI,
                                                                    dso: BDCDSO,
                                                                    hsi: BDCHSI,
                                                                    hso: BDCHSO,
                                                                    thksn: BDCTHKSN,
                                                                    cs2: BDCCS2,
                                                                    es: BDCES,

                                                                    stdp: BDCPSTDVal,
                                                                    namep: BDCPNameVal,
                                                                    dpo: BDCDPO,
                                                                    thkpn: BDCTHKPN,
                                                                    hpo: BDCHPO,
                                                                    hpi: BDCHPI,
                                                                    alpha: BDCALPHA,
                                                                    beta: BDCBETA,
                                                                    l: BDCL,
                                                                    cp2: BDCCP2,
                                                                    ep: BDCEP,

                                                                    stdr: BDCRSTDVal,
                                                                    namer: BDCRNameVal,
                                                                    dro: BDCDRO,
                                                                    thkrn: BDCTHKRN,
                                                                    cr2: BDCCR2,

                                                                    a3: BDCA3,
                                                                    bs: BDCBS,

                                                                    ds: BDCDS.toFixed(4),
                                                                    cs1: BDCCS1.toFixed(4),
                                                                    rsel: BDCRSEL.toFixed(4),
                                                                    ost: BDCOST.toFixed(4),
                                                                    os: BDCOS.toFixed(4),

                                                                    dp: BDCDP.toFixed(4),
                                                                    cp1: BDCCP1.toFixed(4),
                                                                    rpel: BDCRPEL.toFixed(4),
                                                                    opt: BDCOPT.toFixed(4),
                                                                    op: BDCOP.toFixed(4),

                                                                    dr: BDCDR.toFixed(4),
                                                                    cr1: BDCCR1.toFixed(4),
                                                                    rrel: BDCRREL.toFixed(4),
                                                                    ort: BDCORT.toFixed(4),
                                                                    or: BDCOR.toFixed(4),

                                                                    pc: BDCPC.toFixed(4),

                                                                    cs: BDCCS.toFixed(4),
                                                                    thkse: BDCTHKSE.toFixed(4),
                                                                    dsi2hsi: BDCDSI2HSI.toFixed(4),
                                                                    k: BDCK.toFixed(4),
                                                                    dso2hso: BDCDSO2HSO.toFixed(4),
                                                                    k1: BDCK1.toFixed(4),
                                                                    asm: BDCASM.toFixed(4),
                                                                    bsm: BDCBSM.toFixed(4),
                                                                    h: BDCH.toFixed(4),
                                                                    theta: BDCTHETA.toFixed(4),

                                                                    cp: BDCCP.toFixed(4),
                                                                    thkpe: BDCTHKPE.toFixed(4),
                                                                    dpc: BDCDPC.toFixed(4),
                                                                    sa: BDCSA.toFixed(4),
                                                                    sb: BDCSB.toFixed(4),
                                                                    ks: BDCKS.toFixed(4),
                                                                    dop: BDCDOP.toFixed(4),
                                                                    fp: BDCFP.toFixed(4),

                                                                    cr: BDCCR.toFixed(4),
                                                                    thkre: BDCTHKRE.toFixed(4),
                                                                    fr: BDCFR.toFixed(4),

                                                                    thksc: BDCTHKSC.toFixed(4),
                                                                    thksmin: BDCTHKSMIN.toFixed(4),
                                                                    thksd: BDCTHKSD.toFixed(4),
                                                                    thkschk: BDCTHKSCHK,

                                                                    thkpc: BDCTHKPC.toFixed(4),
                                                                    thkpd: BDCTHKPD.toFixed(4),
                                                                    thkpchk: BDCTHKPCHK,

                                                                    ba: BDCBA.toFixed(4),
                                                                    bb: BDCBB.toFixed(4),
                                                                    a1: BDCA1.toFixed(4),
                                                                    hp1: BDCHP1.toFixed(4),
                                                                    hp2: BDCHP2.toFixed(4),
                                                                    a2: BDCA2.toFixed(4),
                                                                    dre: BDCDRE.toFixed(4),
                                                                    a4: BDCA4.toFixed(4),
                                                                    ae: BDCAE.toFixed(4),
                                                                    achk: BDCACHK,

                                                                    eta: BDCETA.toFixed(4),
                                                                    pst: BDCPST.toFixed(4),
                                                                    ppt: BDCPPT.toFixed(4),
                                                                    pt: BDCPT.toFixed(4),

                                                                    mawps: BDCMAWPS.toFixed(4),
                                                                    mawpp: BDCMAWPP.toFixed(4),
                                                                    mawpa1: BDCMAWPA1.toFixed(0),
                                                                    mawpa2: BDCMAWPA2.toFixed(0),
                                                                    mawpa3: BDCMAWPA3,
                                                                    mawpa4: BDCMAWPA4.toFixed(0),
                                                                    mawpa: BDCMAWPA.toFixed(0),
                                                                    mawpae: BDCMAWPAE.toFixed(0),
                                                                    mawpr: BDCMAWPR.toFixed(4),
                                                                    mawp: BDCMAWP.toFixed(4)
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
                                                                        BDCPayJS.dialog({
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
                                                                                    BDCPayJS.dialog("close");
                                                                                    BDCPayJS.dialog("clear");
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
                                                                                                BDCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        BDCPayJS.dialog('close');
                                                                                                        BDCPayJS.dialog('clear');
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
                pg.propertygrid('options').finder.getTr(this, 28).hide();
                pg.propertygrid('options').finder.getTr(this, 29).hide();
                pg.propertygrid('options').finder.getTr(this, 30).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 34).hide();
                pg.propertygrid('options').finder.getTr(this, 37).hide();
            }
        });
    });
});