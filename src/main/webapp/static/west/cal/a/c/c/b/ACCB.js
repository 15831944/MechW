$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let accbSketch = $("#d2");
    let accbModel = $("#d3");
    let accbd2d3 = $('#d2d3');

    $("#cal").html("<table id='accb'></table>");
    let pg = $("#accb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/c/b/ACCB.json", function (result) {

        let ACCBDT,
            ACCBSCategory, ACCBSCategoryVal, ACCBSType, ACCBSTypeVal, ACCBSSTD, ACCBSSTDVal, ACCBSName, ACCBSNameVal,
            ACCBPCategory, ACCBPCategoryVal, ACCBPType, ACCBPTypeVal, ACCBPSTD, ACCBPSTDVal, ACCBPName, ACCBPNameVal,
            ACCBRCategory, ACCBRCategoryVal, ACCBRType, ACCBRTypeVal, ACCBRSTD, ACCBRSTDVal, ACCBRName, ACCBRNameVal,
            columns, rows, ed;

        // 壳体内径
        function accb2d(idod, dsi = "ΦDsi", dso = "ΦDso", hsi = "hsi", hso = "hso", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", alpha = "α", beta = "β", l = "L",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            accbSketch.empty();
            let width = accbSketch.width();
            let height = accbSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACCBSVG").attr("height", height);

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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACCBSketchDRO");
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
                ])).attr("id", "ACCBSketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACCBSketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACCBSketchDPO");

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
            ])).attr("id", "ACCBSketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCBSketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACCBSketchHPO");

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
            ])).attr("id", "ACCBSketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCBSketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ).classed("sketch", true).attr("id", "ACCBSketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCBSketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "ACCBSketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCBSketchL")
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
            ).classed("sketch", true).attr("id", "ACCBSketchBETA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCBSketchBETA").attr("startOffset", "50%").text(beta);

            // dsi dso hpi hpo 因为封头是单线图，所以这四个尺寸没有在 sketch 中表示出来
            if (idod === "内径") {

            }
            else if (idod === "外径") {

            }

        }

        currentTabIndex = accbd2d3.tabs('getTabIndex', accbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            accb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#accb").length > 0) {
                    accb2d();
                }
            });
        }
        accbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    accb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#accb").length > 0) {
                            accb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 椭圆封头安放式接管补强计算",
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
                if (index === 12 || index === 13
                    || index === 30 || index === 31 || index === 32
                    || index === 33 || index === 34 || index === 35 || index === 36
                    || index === 39) {
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
                    $(ed.target).combobox("loadData", ACCBSCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ACCBSType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACCBSSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACCBSName);
                }

                else if (index === 17) {
                    $(ed.target).combobox("loadData", ACCBPCategory);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", ACCBPType);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", ACCBPSTD);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", ACCBPName);
                }

                else if (index === 30) {
                    $(ed.target).combobox("loadData", ACCBRCategory);
                }
                else if (index === 31) {
                    $(ed.target).combobox("loadData", ACCBRType);
                }
                else if (index === 32) {
                    $(ed.target).combobox("loadData", ACCBRSTD);
                }
                else if (index === 33) {
                    $(ed.target).combobox("loadData", ACCBRName);
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
                    accbSketch.empty();
                    accbModel.empty();

                    // sketch
                    currentTabIndex = accbd2d3.tabs('getTabIndex', accbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        accb2d();
                        accbSketch.off("resize").on("resize", function () {
                            if ($("#accb").length > 0) {
                                accb2d();
                            }
                        });
                    }
                    accbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                accb2d();
                                accbSketch.off("resize").on("resize", function () {
                                    if ($("#accb").length > 0) {
                                        accb2d();
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

                        ACCBDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ACCBSCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACCBSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACCBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACCBSName = null;

                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACCBPCategory = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACCBPType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        ACCBPSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACCBPName = null;

                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACCBRCategory = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACCBRType = null;
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        ACCBRSTD = null;
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACCBRName = null;

                        if (rows[29][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBSCategory = [];
                                ACCBPCategory = [];
                                ACCBRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACCBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACCBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACCBPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACCBRCategory[index] = {
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

                        ACCBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACCBSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACCBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACCBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBSCategoryVal,
                                temp: ACCBDT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBSType = [];
                                $(result).each(function (index, element) {
                                    ACCBSType[index] = {
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

                        ACCBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACCBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACCBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBSCategoryVal,
                                type: ACCBSTypeVal,
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBSSTD = [];
                                $(result).each(function (index, element) {
                                    ACCBSSTD[index] = {
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

                        ACCBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACCBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBSCategoryVal,
                                type: ACCBSTypeVal,
                                std: ACCBSSTDVal,
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBSName = [];
                                $(result).each(function (index, element) {
                                    ACCBSName[index] = {
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
                    if (index === 17) {

                        ACCBPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACCBPType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        ACCBPSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACCBPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBPCategoryVal,
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBPType = [];
                                $(result).each(function (index, element) {
                                    ACCBPType[index] = {
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
                    if (index === 18) {

                        ACCBPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        ACCBPSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACCBPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBPCategoryVal,
                                type: ACCBPTypeVal,
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBPSTD = [];
                                $(result).each(function (index, element) {
                                    ACCBPSTD[index] = {
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
                    if (index === 19) {

                        ACCBPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACCBPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBPCategoryVal,
                                type: ACCBPTypeVal,
                                std: ACCBPSTDVal,
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBPName = [];
                                $(result).each(function (index, element) {
                                    ACCBPName[index] = {
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
                    if (index === 30) {

                        ACCBRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACCBRType = null;
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        ACCBRSTD = null;
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACCBRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBRCategoryVal,
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBRType = [];
                                $(result).each(function (index, element) {
                                    ACCBRType[index] = {
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
                    if (index === 31) {

                        ACCBRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        ACCBRSTD = null;
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACCBRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBRCategoryVal,
                                type: ACCBRTypeVal,
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBRSTD = [];
                                $(result).each(function (index, element) {
                                    ACCBRSTD[index] = {
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
                    if (index === 32) {

                        ACCBRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACCBRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCBRCategoryVal,
                                type: ACCBRTypeVal,
                                std: ACCBRSTDVal,
                                temp: ACCBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCBRName = [];
                                $(result).each(function (index, element) {
                                    ACCBRName[index] = {
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
                            pg.datagrid('options').finder.getTr(this, 12).hide();
                            pg.datagrid('options').finder.getTr(this, 13).hide();
                        }
                        else if (rows[9][columns[0][1].field] === "外径") {
                            pg.datagrid('options').finder.getTr(this, 12).show();
                            pg.datagrid('options').finder.getTr(this, 13).show();
                            pg.datagrid('options').finder.getTr(this, 10).hide();
                            pg.datagrid('options').finder.getTr(this, 11).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsPAD
                    if (index === 29) {
                        if (rows[29][columns[0][1].field] === "是") {
                            pg.propertygrid('options').finder.getTr(this, 30).show();
                            pg.propertygrid('options').finder.getTr(this, 31).show();
                            pg.propertygrid('options').finder.getTr(this, 32).show();
                            pg.propertygrid('options').finder.getTr(this, 33).show();
                            pg.propertygrid('options').finder.getTr(this, 34).show();
                            pg.propertygrid('options').finder.getTr(this, 35).show();
                            pg.propertygrid('options').finder.getTr(this, 36).show();
                        }
                        else if (rows[29][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                            pg.propertygrid('options').finder.getTr(this, 34).hide();
                            pg.propertygrid('options').finder.getTr(this, 35).hide();
                            pg.propertygrid('options').finder.getTr(this, 36).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsB
                    if (index === 38) {
                        if (rows[38][columns[0][1].field] === "是") {
                            pg.datagrid('options').finder.getTr(this, 39).show();
                        }
                        else if (rows[38][columns[0][1].field] === "否") {
                            pg.datagrid('options').finder.getTr(this, 39).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    // Tag
                    let ACCBTag = "符号标记";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACCBTag = rows[0][columns[0][1].field];
                    }

                    // 设计压力
                    let ACCBPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACCBPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACCBPS;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        ACCBPS = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACCBTest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACCBTest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 椭圆封头材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        ACCBSNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取椭圆封头材料密度、最大最小厚度
                    let ACCBDS, ACCBSThkMin, ACCBSThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACCBSCategoryVal,
                            "type": ACCBSTypeVal,
                            "std": ACCBSSTDVal,
                            "name": ACCBSNameVal,
                            "temp": ACCBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACCBDS = parseFloat(result.density);
                            ACCBSThkMin = parseFloat(result.thkMin);
                            ACCBSThkMax = parseFloat(result.thkMax);

                            // IDOD
                            let ACCBIDOD;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                ACCBIDOD = rows[9][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                accb2d(ACCBIDOD);
                                accbSketch.off("resize").on("resize", function () {
                                    if ($("#accb").length > 0) {
                                        accb2d(ACCBIDOD);
                                    }
                                });
                            }
                            accbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        accb2d(ACCBIDOD);
                                        accbSketch.off("resize").on("resize", function () {
                                            if ($("#accb").length > 0) {
                                                accb2d(ACCBIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACCBDSI = -1, ACCBDSO = -1, ACCBHSI = -1, ACCBHSO = -1;
                            if (ACCBIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    ACCBDSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO);
                                    accbSketch.off("resize").on("resize", function () {
                                        if ($("#accb").length > 0) {
                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO);
                                        }
                                    });
                                }
                                accbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO);
                                            accbSketch.off("resize").on("resize", function () {
                                                if ($("#accb").length > 0) {
                                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    ACCBHSI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO);
                                    accbSketch.off("resize").on("resize", function () {
                                        if ($("#accb").length > 0) {
                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO);
                                        }
                                    });
                                }
                                accbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO);
                                            accbSketch.off("resize").on("resize", function () {
                                                if ($("#accb").length > 0) {
                                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else if (ACCBIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                    ACCBDSO = parseFloat(rows[12][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO);
                                    accbSketch.off("resize").on("resize", function () {
                                        if ($("#accb").length > 0) {
                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO);
                                        }
                                    });
                                }
                                accbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO);
                                            accbSketch.off("resize").on("resize", function () {
                                                if ($("#accb").length > 0) {
                                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                    ACCBHSO = parseFloat(rows[13][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO);
                                    accbSketch.off("resize").on("resize", function () {
                                        if ($("#accb").length > 0) {
                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO);
                                        }
                                    });
                                }
                                accbd2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO);
                                            accbSketch.off("resize").on("resize", function () {
                                                if ($("#accb").length > 0) {
                                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO);
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
                            let ACCBTHKSN;
                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                && parseFloat(rows[14][columns[0][1].field]) > ACCBSThkMin
                                && parseFloat(rows[14][columns[0][1].field]) <= ACCBSThkMax) {
                                ACCBTHKSN = parseFloat(rows[14][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                && parseFloat(rows[14][columns[0][1].field]) <= ACCBSThkMin) {
                                south.html("椭圆封头材料厚度不能小于等于 " + ACCBSThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                && parseFloat(rows[14][columns[0][1].field]) > ACCBSThkMax) {
                                south.html("椭圆封头材料厚度不能大于 " + ACCBSThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN);
                                accbSketch.off("resize").on("resize", function () {
                                    if ($("#accb").length > 0) {
                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN);
                                    }
                                });
                            }
                            accbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN);
                                        accbSketch.off("resize").on("resize", function () {
                                            if ($("#accb").length > 0) {
                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 输入内径时补齐外径，输入外径时补齐内径
                            if (ACCBIDOD === "内径") {
                                ACCBDSO = ACCBDSI + 2 * ACCBTHKSN;
                                ACCBHSO = ACCBHSI + ACCBTHKSN;
                            }
                            else if (ACCBIDOD === "外径") {
                                ACCBDSI = ACCBDSO - 2 * ACCBTHKSN;
                                ACCBHSI = ACCBHSO - ACCBTHKSN;
                            }

                            /*
                            获取椭圆封头力学特性
                             */
                            let ACCBOST, ACCBOS, ACCBOST1, ACCBRSEL, ACCBCS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": ACCBSCategoryVal,
                                    "type": ACCBSTypeVal,
                                    "std": ACCBSSTDVal,
                                    "name": ACCBSNameVal,
                                    "thk": ACCBTHKSN,
                                    "temp": ACCBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACCBDSO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACCBOST = parseFloat(result.ot);
                                    if (ACCBOST < 0) {
                                        south.html("查询椭圆封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACCBOS = parseFloat(result.o);
                                    if (ACCBOS < 0) {
                                        south.html("查询椭圆封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACCBRSEL = parseFloat(result.rel);
                                    if (ACCBRSEL < 0) {
                                        south.html("查询椭圆封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACCBCS1 = parseFloat(result.c1);
                                    if (ACCBCS1 < 0) {
                                        south.html("查询椭圆封头材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACCBOST1 = parseFloat(result.ot1);

                                    let ACCBCS2;
                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                        && parseFloat(rows[15][columns[0][1].field]) < ACCBTHKSN) {
                                        ACCBCS2 = parseFloat(rows[15][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                        && parseFloat(rows[15][columns[0][1].field]) >= ACCBTHKSN) {
                                        south.html("椭圆封头腐蚀裕量不能大于等于 " + ACCBTHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACCBES;
                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                        ACCBES = parseFloat(rows[16][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                        ACCBPNameVal = rows[20][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACCBDP, ACCBPThkMin, ACCBPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACCBPCategoryVal,
                                            "type": ACCBPTypeVal,
                                            "std": ACCBPSTDVal,
                                            "name": ACCBPNameVal,
                                            "temp": ACCBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACCBDP = parseFloat(result.density);
                                            ACCBPThkMin = parseFloat(result.thkMin);
                                            ACCBPThkMax = parseFloat(result.thkMax);

                                            let ACCBDPO;
                                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                ACCBDPO = parseFloat(rows[21][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO);
                                                accbSketch.off("resize").on("resize", function () {
                                                    if ($("#accb").length > 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO);
                                                    }
                                                });
                                            }
                                            accbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO);
                                                        accbSketch.off("resize").on("resize", function () {
                                                            if ($("#accb").length > 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKPN
                                            let ACCBTHKPN;
                                            if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) > ACCBPThkMin
                                                && parseFloat(rows[22][columns[0][1].field]) <= Math.min(ACCBPThkMax, ACCBDPO / 2)) {
                                                ACCBTHKPN = parseFloat(rows[22][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) <= ACCBPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACCBPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) > Math.min(ACCBPThkMax, ACCBDPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACCBPThkMax, ACCBDPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO, ACCBTHKPN);
                                                accbSketch.off("resize").on("resize", function () {
                                                    if ($("#accb").length > 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO, ACCBTHKPN);
                                                    }
                                                });
                                            }
                                            accbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO, ACCBTHKPN);
                                                        accbSketch.off("resize").on("resize", function () {
                                                            if ($("#accb").length > 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO, ACCBTHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACCBOPT, ACCBOP, ACCBOPT1, ACCBRPEL, ACCBCP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACCBPCategoryVal,
                                                    "type": ACCBPTypeVal,
                                                    "std": ACCBPSTDVal,
                                                    "name": ACCBPNameVal,
                                                    "thk": ACCBTHKPN,
                                                    "temp": ACCBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACCBDPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACCBOPT = parseFloat(result.ot);
                                                    if (ACCBOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACCBOP = parseFloat(result.o);
                                                    if (ACCBOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACCBRPEL = parseFloat(result.rel);
                                                    if (ACCBRPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACCBCP1 = parseFloat(result.c1);
                                                    if (ACCBCP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACCBOPT1 = parseFloat(result.ot1);

                                                    let ACCBHPO;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                        ACCBHPO = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO);
                                                        accbSketch.off("resize").on("resize", function () {
                                                            if ($("#accb").length > 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO);
                                                            }
                                                        });
                                                    }
                                                    accbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO);
                                                                accbSketch.off("resize").on("resize", function () {
                                                                    if ($("#accb").length > 0) {
                                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN, "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCBALPHA;
                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                        ACCBALPHA = parseFloat(rows[24][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                            "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°");
                                                        accbSketch.off("resize").on("resize", function () {
                                                            if ($("#accb").length > 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                    "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    accbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                    "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°");
                                                                accbSketch.off("resize").on("resize", function () {
                                                                    if ($("#accb").length > 0) {
                                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                            "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCBBETA;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        ACCBBETA = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                            "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°");
                                                        accbSketch.off("resize").on("resize", function () {
                                                            if ($("#accb").length > 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                    "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°");
                                                            }
                                                        });
                                                    }
                                                    accbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                    "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°");
                                                                accbSketch.off("resize").on("resize", function () {
                                                                    if ($("#accb").length > 0) {
                                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                            "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCBL;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                        && parseFloat(rows[26][columns[0][1].field]) < (ACCBDSO - ACCBDPO) / 2) {
                                                        ACCBL = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])
                                                        && parseFloat(rows[26][columns[0][1].field]) >= (ACCBDSO - ACCBDPO) / 2) {
                                                        south.html("开孔中心到封头轴线距离 L 不能大于等于 " + (ACCBDSO - ACCBDPO) / 2 + " mm!").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                            "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL);
                                                        accbSketch.off("resize").on("resize", function () {
                                                            if ($("#accb").length > 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                    "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL);
                                                            }
                                                        });
                                                    }
                                                    accbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                    "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL);
                                                                accbSketch.off("resize").on("resize", function () {
                                                                    if ($("#accb").length > 0) {
                                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                            "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCBCP2;
                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                        && parseFloat(rows[27][columns[0][1].field]) < ACCBTHKPN) {
                                                        ACCBCP2 = parseFloat(rows[27][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                        && parseFloat(rows[27][columns[0][1].field]) >= ACCBTHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACCBTHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACCBEP;
                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])) {
                                                        ACCBEP = parseFloat(rows[28][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACCBIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])) {
                                                        ACCBIsPAD = rows[29][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                            "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD);
                                                        accbSketch.off("resize").on("resize", function () {
                                                            if ($("#accb").length > 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                    "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD);
                                                            }
                                                        });
                                                    }
                                                    accbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                    "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD);
                                                                accbSketch.off("resize").on("resize", function () {
                                                                    if ($("#accb").length > 0) {
                                                                        accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                            "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCBDR = -1.0, ACCBRThkMin = -1.0, ACCBRThkMax = -1.0;
                                                    let ACCBDRO = -1.0, ACCBTHKRN = -1.0, ACCBCR2 = -1.0;
                                                    let ACCBORT = -1.0, ACCBOR = -1.0, ACCBORT1 = -1.0, ACCBRREL = -1.0,
                                                        ACCBCR1 = -1.0;
                                                    if (ACCBIsPAD === "是") {

                                                        if (ACCBTHKSN > 38) {
                                                            south.html("椭圆封头厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (ACCBSCategoryVal === "碳素钢和低合金钢" && ACCBRSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])) {
                                                            ACCBRNameVal = rows[33][columns[0][1].field];
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
                                                                "category": ACCBRCategoryVal,
                                                                "type": ACCBRTypeVal,
                                                                "std": ACCBRSTDVal,
                                                                "name": ACCBRNameVal,
                                                                "temp": ACCBDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACCBDR = parseFloat(result.density);
                                                                ACCBRThkMin = parseFloat(result.thkMin);
                                                                ACCBRThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                    && parseFloat(rows[34][columns[0][1].field]) > ACCBDPO) {
                                                                    ACCBDRO = parseFloat(rows[34][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                    && parseFloat(rows[34][columns[0][1].field]) <= ACCBDPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACCBDPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                        "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD, "Φ" + ACCBDRO);
                                                                    accbSketch.off("resize").on("resize", function () {
                                                                        if ($("#accb").length > 0) {
                                                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                                "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD, "Φ" + ACCBDRO);
                                                                        }
                                                                    });
                                                                }
                                                                accbd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                                "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD, "Φ" + ACCBDRO);
                                                                            accbSketch.off("resize").on("resize", function () {
                                                                                if ($("#accb").length > 0) {
                                                                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                                        "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD, "Φ" + ACCBDRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])
                                                                    && parseFloat(rows[35][columns[0][1].field]) > ACCBRThkMin
                                                                    && parseFloat(rows[35][columns[0][1].field]) <= Math.min(ACCBRThkMax, 1.5 * ACCBTHKSN)) {
                                                                    ACCBTHKRN = parseFloat(rows[35][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])
                                                                    && parseFloat(rows[35][columns[0][1].field]) <= ACCBRThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACCBRThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])
                                                                    && parseFloat(rows[35][columns[0][1].field]) > Math.min(ACCBRThkMax, 1.5 * ACCBTHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACCBRThkMax, 1.5 * ACCBTHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                        "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD, "Φ" + ACCBDRO, ACCBTHKRN);
                                                                    accbSketch.off("resize").on("resize", function () {
                                                                        if ($("#accb").length > 0) {
                                                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                                "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD, "Φ" + ACCBDRO, ACCBTHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                accbd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                                "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD, "Φ" + ACCBDRO, ACCBTHKRN);
                                                                            accbSketch.off("resize").on("resize", function () {
                                                                                if ($("#accb").length > 0) {
                                                                                    accb2d(ACCBIDOD, "Φ" + ACCBDSI, "Φ" + ACCBDSO, ACCBHSI, ACCBHSO, ACCBTHKSN,
                                                                                        "Φ" + ACCBDPO, ACCBTHKPN, ACCBHPO, ACCBALPHA + "°", ACCBBETA + "°", ACCBL, ACCBIsPAD, "Φ" + ACCBDRO, ACCBTHKRN);
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
                                                                        "category": ACCBRCategoryVal,
                                                                        "type": ACCBRTypeVal,
                                                                        "std": ACCBRSTDVal,
                                                                        "name": ACCBRNameVal,
                                                                        "thk": ACCBTHKRN,
                                                                        "temp": ACCBDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACCBDRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACCBORT = parseFloat(result.ot);
                                                                        if (ACCBORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACCBOR = parseFloat(result.o);
                                                                        if (ACCBOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACCBRREL = parseFloat(result.rel);
                                                                        if (ACCBRREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACCBCR1 = parseFloat(result.c1);
                                                                        if (ACCBCR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACCBORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                            && parseFloat(rows[36][columns[0][1].field]) < ACCBTHKRN) {
                                                                            ACCBCR2 = parseFloat(rows[36][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                            && parseFloat(rows[36][columns[0][1].field]) >= ACCBTHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACCBTHKRN + " mm").css("color", "red");
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
                                                        if (ACCBCR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACCBA3;
                                                    if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])) {
                                                        ACCBA3 = parseFloat(rows[37][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACCBIsB;
                                                    if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])) {
                                                        ACCBIsB = rows[38][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACCBBS = -1.0;
                                                    if (ACCBIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[39][columns[0][1].field]) > ACCBDPO) {
                                                            ACCBBS = parseFloat(rows[39][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[39][columns[0][1].field]) <= ACCBDPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACCBDPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */

                                                    let ACCBPC = ACCBPD + ACCBPS;

                                                    // 椭圆封头
                                                    let ACCBCS = ACCBCS1 + ACCBCS2;
                                                    let ACCBTHKSE = ACCBTHKSN - ACCBCS;
                                                    let ACCBDSI2HSI = ACCBDSI / (2 * ACCBHSI);
                                                    let ACCBK = (2 + ACCBDSI2HSI * ACCBDSI2HSI) / 6;
                                                    let ACCBDSO2HSO = ACCBDSO / (2 * ACCBHSO);
                                                    let ACCBK1;
                                                    if (ACCBDSO2HSO > 2.6 || ACCBDSO2HSO < 1.0) {
                                                        south.html("椭圆封头尺寸超限，程序无法计算！").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (ACCBDSO2HSO === 2.6) {
                                                        ACCBK1 = 1.18;
                                                    }
                                                    else if (ACCBDSO2HSO < 2.6 && ACCBDSO2HSO > 2.4) {
                                                        ACCBK1 = 1.18 + (ACCBDSO2HSO - 2.6) / (2.4 - 2.6) * (1.08 - 1.18);
                                                    }
                                                    else if (ACCBDSO2HSO === 2.4) {
                                                        ACCBK1 = 1.08;
                                                    }
                                                    else if (ACCBDSO2HSO < 2.4 && ACCBDSO2HSO > 2.2) {
                                                        ACCBK1 = 1.08 + (ACCBDSO2HSO - 2.4) / (2.2 - 2.4) * (0.99 - 1.08);
                                                    }
                                                    else if (ACCBDSO2HSO === 2.2) {
                                                        ACCBK1 = 0.99;
                                                    }
                                                    else if (ACCBDSO2HSO < 2.2 && ACCBDSO2HSO > 2.0) {
                                                        ACCBK1 = 0.99 + (ACCBDSO2HSO - 2.2) / (2.0 - 2.2) * (0.90 - 0.99);
                                                    }
                                                    else if (ACCBDSO2HSO === 2.0) {
                                                        ACCBK1 = 0.90;
                                                    }
                                                    else if (ACCBDSO2HSO < 2.0 && ACCBDSO2HSO > 1.8) {
                                                        ACCBK1 = 0.90 + (ACCBDSO2HSO - 2) / (1.8 - 2) * (0.81 - 0.90);
                                                    }
                                                    else if (ACCBDSO2HSO === 1.8) {
                                                        ACCBK1 = 0.81;
                                                    }
                                                    else if (ACCBDSO2HSO < 1.8 && ACCBDSO2HSO > 1.6) {
                                                        ACCBK1 = 0.81 + (ACCBDSO2HSO - 1.8) / (1.6 - 1.8) * (0.73 - 0.81);
                                                    }
                                                    else if (ACCBDSO2HSO === 1.6) {
                                                        ACCBK1 = 0.73;
                                                    }
                                                    else if (ACCBDSO2HSO < 1.6 && ACCBDSO2HSO > 1.4) {
                                                        ACCBK1 = 0.73 + (ACCBDSO2HSO - 1.6) / (1.4 - 1.6) * (0.65 - 0.73);
                                                    }
                                                    else if (ACCBDSO2HSO === 1.4) {
                                                        ACCBK1 = 0.65;
                                                    }
                                                    else if (ACCBDSO2HSO < 1.4 && ACCBDSO2HSO > 1.2) {
                                                        ACCBK1 = 0.65 + (ACCBDSO2HSO - 1.4) / (1.2 - 1.4) * (0.57 - 0.65);
                                                    }
                                                    else if (ACCBDSO2HSO === 1.2) {
                                                        ACCBK1 = 0.57;
                                                    }
                                                    else if (ACCBDSO2HSO < 1.2 && ACCBDSO2HSO > 1.0) {
                                                        ACCBK1 = 0.57 + (ACCBDSO2HSO - 1.2) / (1.0 - 1.2) * (0.50 - 0.57);
                                                    }
                                                    else if (ACCBDSO2HSO === 1.0) {
                                                        ACCBK1 = 0.50;
                                                    }
                                                    let ACCBASM = (ACCBDSI + ACCBDSO) / 4;
                                                    let ACCBBSM = (ACCBHSI + ACCBHSO) / 2;
                                                    let ACCBH = ACCBBSM / ACCBASM * Math.sqrt(ACCBASM * ACCBASM - ACCBL * ACCBL);
                                                    let ACCBTHETA = Math.atan(ACCBBSM * ACCBBSM * ACCBL / ACCBASM / ACCBASM / ACCBH) / Math.PI * 180;

                                                    // 接管
                                                    let ACCBCP = ACCBCP1 + ACCBCP2;
                                                    let ACCBTHKPE = ACCBTHKPN - ACCBCP;
                                                    let ACCBDPC = ACCBDPO - 2 * ACCBTHKPN + 2 * ACCBCP1 + 2 * ACCBCS2;
                                                    let ACCBSA = ACCBDPC / Math.cos(ACCBBETA / 180 * Math.PI);
                                                    let ACCBSB = ACCBDPC / Math.cos(Math.abs(ACCBALPHA - ACCBTHETA) / 180 * Math.PI);
                                                    let ACCBKS = Math.max(ACCBSA / ACCBSB, ACCBSB / ACCBSA);
                                                    if (ACCBKS > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACCBDOP = Math.max(ACCBSA, ACCBSB);
                                                    if (ACCBDOP > ACCBDSI / 2) {
                                                        south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                        return false;
                                                    }
                                                    let ACCBFP = Math.min(1.0, ACCBOPT / ACCBOST);

                                                    // 补强圈
                                                    let ACCBCR = -1.0, ACCBTHKRE = -1.0, ACCBFR = -1.0;
                                                    if (ACCBIsPAD === "是") {
                                                        ACCBCR = ACCBCR1 + ACCBCR2;
                                                        ACCBTHKRE = ACCBTHKRN - ACCBCR;
                                                        ACCBFR = Math.min(1.0, ACCBORT / ACCBOST);
                                                    }

                                                    /*
                                                    椭圆封头内压强度校核
                                                     */
                                                    let ACCBTHKSC;
                                                    if (ACCBIDOD === "内径") {
                                                        if (ACCBL <= 0.4 * ACCBDSI) {
                                                            ACCBTHKSC = ACCBPC * ACCBK1 * ACCBDSI / (2 * ACCBOST * ACCBES - 0.5 * ACCBPC);
                                                        }
                                                        else {
                                                            ACCBTHKSC = ACCBPC * ACCBK * ACCBDSI / (2 * ACCBOST * ACCBES - 0.5 * ACCBPC);
                                                        }
                                                    }
                                                    else if (ACCBIDOD === "外径") {
                                                        if (ACCBL <= 0.4 * ACCBDSI) {
                                                            ACCBTHKSC = ACCBPC * ACCBK1 * ACCBDSI / (2 * ACCBOST * ACCBES - 0.5 * ACCBPC);
                                                        }
                                                        else {
                                                            ACCBTHKSC = ACCBPC * ACCBK * ACCBDSO / (2 * ACCBOST * ACCBES + (2 * ACCBK - 0.5) * ACCBPC);
                                                        }
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACCBTHKSMIN;
                                                    if (ACCBDSI2HSI <= 2) {
                                                        ACCBTHKSMIN = 0.0015 * ACCBDSI;
                                                    }
                                                    else {
                                                        ACCBTHKSMIN = 0.003 * ACCBDSI;
                                                    }
                                                    let ACCBTHKSD = Math.max(ACCBTHKSC, ACCBTHKSMIN) + ACCBCS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "椭圆封头内压所需厚度：" + (ACCBTHKSD + ACCBCS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACCBTHKSCHK;
                                                    if (ACCBTHKSN >= (ACCBTHKSD + ACCBCS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACCBTHKSN + " mm" +
                                                            "</span>");
                                                        ACCBTHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACCBTHKSN + " mm" +
                                                            "</span>");
                                                        ACCBTHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACCBTHKPC = ACCBPC * ACCBDPO / (2 * ACCBOPT * ACCBEP + ACCBPC);
                                                    let ACCBTHKPD = ACCBTHKPC + ACCBCP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACCBTHKPD + ACCBCP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACCBTHKPCHK;
                                                    if (ACCBTHKPN >= (ACCBTHKPD + ACCBCP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACCBTHKPN + " mm" +
                                                            "</span>");
                                                        ACCBTHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACCBTHKPN + " mm" +
                                                            "</span>");
                                                        ACCBTHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACCBBA = ACCBDOP * ACCBTHKSC;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACCBBA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 椭圆封头
                                                    let ACCBBB;
                                                    if (ACCBIsB === "是") {
                                                        ACCBBB = Math.min(Math.max(2 * ACCBDOP, ACCBDOP + 2 * ACCBTHKSN + 2 * ACCBTHKPN), ACCBBS);
                                                    }
                                                    else if (ACCBIsB === "否") {
                                                        ACCBBB = Math.max(2 * ACCBDOP, ACCBDOP + 2 * ACCBTHKSN + 2 * ACCBTHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACCBA1 = (ACCBBB - ACCBDOP) * (ACCBTHKSE - ACCBTHKSC);

                                                    // 接管
                                                    let ACCBHP1 = Math.min(ACCBHPO, Math.sqrt(ACCBDOP * ACCBTHKPN));
                                                    let ACCBA2 = 2 * ACCBHP1 * (ACCBTHKPE - ACCBTHKPC) * ACCBFP;

                                                    // 补强圈
                                                    let ACCBA4 = 0.0, ACCBDRE = -1.0;
                                                    if (ACCBIsPAD === "是") {
                                                        ACCBDRE = Math.min(ACCBDRO, ACCBBB);
                                                        ACCBA4 = (ACCBDRE - ACCBDPO) * ACCBTHKRE * ACCBFR;
                                                    }

                                                    // Ae
                                                    let ACCBAE = ACCBA1 + ACCBA2 + ACCBA3 + ACCBA4;
                                                    let ACCBACHK;
                                                    if (ACCBAE >= ACCBBA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACCBAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACCBACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACCBAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACCBACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACCBETA, ACCBPST, ACCBPPT, ACCBPT;
                                                    if (ACCBTest === "液压试验") {
                                                        ACCBETA = 1.25;
                                                        ACCBPST = ACCBETA * ACCBPD * ACCBOS / Math.max(ACCBOST, ACCBOST1);
                                                        ACCBPPT = ACCBETA * ACCBPD * ACCBOP / Math.max(ACCBOPT, ACCBOPT1);
                                                        ACCBPT = Math.min(ACCBPST, ACCBPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACCBPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACCBTest === "气压试验") {
                                                        ACCBETA = 1.10;
                                                        ACCBPST = ACCBETA * ACCBPD * ACCBOS / Math.max(ACCBOST, ACCBOST1);
                                                        ACCBPPT = ACCBETA * ACCBPD * ACCBOP / Math.max(ACCBOPT, ACCBOPT1);
                                                        ACCBPT = Math.min(ACCBPST, ACCBPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACCBPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */

                                                    // 椭圆封头
                                                    let ACCBMAWPS;
                                                    if (ACCBIDOD === "内径") {
                                                        ACCBMAWPS = 2 * ACCBTHKSE * ACCBOST * ACCBES / (ACCBK * ACCBDSI + 0.5 * ACCBTHKSE) - ACCBPS;
                                                    }
                                                    else if (ACCBIDOD === "外径") {
                                                        ACCBMAWPS = 2 * ACCBTHKSE * ACCBOST * ACCBES / (ACCBK * ACCBDSO - (2 * ACCBK - 0.5) * ACCBTHKSE) - ACCBPS;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 接管
                                                    let ACCBMAWPP = 2 * ACCBTHKPE * ACCBOPT * ACCBEP / (ACCBDPO - ACCBTHKPE) - ACCBPS;

                                                    // 开孔补强
                                                    let ACCBMAWPA1 = -1, ACCBMAWPA2 = -1,
                                                        ACCBMAWPA3 = ACCBA3, ACCBMAWPA4 = ACCBA4,
                                                        ACCBMAWPA = -1, ACCBMAWPAE = -1,
                                                        ACCBMAWPRC = ACCBPC;
                                                    let ACCBMAWPTHKSC, ACCBMAWPTHKPC;
                                                    while (ACCBMAWPAE >= ACCBMAWPA) {

                                                        ACCBMAWPRC += 0.0001;

                                                        // 椭圆封头计算厚度
                                                        if (ACCBIDOD === "内径") {
                                                            if (ACCBL <= 0.4 * ACCBDSI) {
                                                                ACCBMAWPTHKSC = ACCBMAWPRC * ACCBK1 * ACCBDSI / (2 * ACCBOST * ACCBES - 0.5 * ACCBPC);
                                                            }
                                                            else {
                                                                ACCBMAWPTHKSC = ACCBMAWPRC * ACCBK * ACCBDSI / (2 * ACCBOST * ACCBES - 0.5 * ACCBPC);
                                                            }
                                                        }
                                                        else if (ACCBIDOD === "外径") {
                                                            if (ACCBL <= 0.4 * ACCBDSI) {
                                                                ACCBMAWPTHKSC = ACCBMAWPRC * ACCBK1 * ACCBDSI / (2 * ACCBOST * ACCBES - 0.5 * ACCBPC);
                                                            }
                                                            else {
                                                                ACCBMAWPTHKSC = ACCBMAWPRC * ACCBK * ACCBDSO / (2 * ACCBOST * ACCBES + (2 * ACCBK - 0.5) * ACCBPC);
                                                            }
                                                        }
                                                        ACCBMAWPA = ACCBDOP * ACCBMAWPTHKSC;

                                                        // 接管计算厚度
                                                        ACCBMAWPTHKPC = ACCBMAWPRC * ACCBDPO / (2 * ACCBOPT * ACCBEP + ACCBPC);
                                                        ACCBMAWPA1 = (ACCBBB - ACCBDOP) * (ACCBTHKSE - ACCBMAWPTHKSC);
                                                        ACCBMAWPA2 = 2 * ACCBHP1 * (ACCBTHKPE - ACCBMAWPTHKPC) * ACCBFP;
                                                        ACCBMAWPAE = ACCBMAWPA1 + ACCBMAWPA2 + ACCBMAWPA3 + ACCBMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACCBMAWPR = ACCBMAWPRC - ACCBPS - 0.0001;
                                                    let ACCBMAWP = Math.min(ACCBMAWPS, ACCBMAWPP, ACCBMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACCBMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACCBPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "accbdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACCB",

                                                                idod: ACCBIDOD,
                                                                isPad: ACCBIsPAD,
                                                                isB: ACCBIsB,

                                                                tag: ACCBTag,

                                                                pd: ACCBPD,
                                                                t: ACCBDT,
                                                                ps: ACCBPS,
                                                                test: ACCBTest,

                                                                stds: ACCBSSTDVal,
                                                                names: ACCBSNameVal,
                                                                dsi: ACCBDSI,
                                                                dso: ACCBDSO,
                                                                hsi: ACCBHSI,
                                                                hso: ACCBHSO,
                                                                thksn: ACCBTHKSN,
                                                                cs2: ACCBCS2,
                                                                es: ACCBES,

                                                                stdp: ACCBPSTDVal,
                                                                namep: ACCBPNameVal,
                                                                dpo: ACCBDPO,
                                                                thkpn: ACCBTHKPN,
                                                                hpo: ACCBHPO,
                                                                alpha: ACCBALPHA,
                                                                beta: ACCBBETA,
                                                                l: ACCBL,
                                                                cp2: ACCBCP2,
                                                                ep: ACCBEP,

                                                                stdr: ACCBRSTDVal,
                                                                namer: ACCBRNameVal,
                                                                dro: ACCBDRO,
                                                                thkrn: ACCBTHKRN,
                                                                cr2: ACCBCR2,

                                                                a3: ACCBA3,
                                                                bs: ACCBBS,

                                                                ds: ACCBDS.toFixed(4),
                                                                cs1: ACCBCS1.toFixed(4),
                                                                rsel: ACCBRSEL.toFixed(4),
                                                                ost: ACCBOST.toFixed(4),
                                                                os: ACCBOS.toFixed(4),
                                                                ost1: ACCBOST1.toFixed(4),

                                                                dp: ACCBDP.toFixed(4),
                                                                cp1: ACCBCP1.toFixed(4),
                                                                rpel: ACCBRPEL.toFixed(4),
                                                                opt: ACCBOPT.toFixed(4),
                                                                op: ACCBOP.toFixed(4),
                                                                opt1: ACCBOPT1.toFixed(4),

                                                                dr: ACCBDR.toFixed(4),
                                                                cr1: ACCBCR1.toFixed(4),
                                                                rrel: ACCBRREL.toFixed(4),
                                                                ort: ACCBORT.toFixed(4),
                                                                or: ACCBOR.toFixed(4),
                                                                ort1: ACCBORT1.toFixed(4),

                                                                pc: ACCBPC.toFixed(4),

                                                                cs: ACCBCS.toFixed(4),
                                                                thkse: ACCBTHKSE.toFixed(4),
                                                                dsi2hsi: ACCBDSI2HSI.toFixed(4),
                                                                k: ACCBK.toFixed(4),
                                                                dso2hso: ACCBDSO2HSO.toFixed(4),
                                                                k1: ACCBK1.toFixed(4),
                                                                asm: ACCBASM.toFixed(4),
                                                                bsm: ACCBBSM.toFixed(4),
                                                                h: ACCBH.toFixed(4),
                                                                theta: ACCBTHETA.toFixed(4),

                                                                cp: ACCBCP.toFixed(4),
                                                                thkpe: ACCBTHKPE.toFixed(4),
                                                                dpc: ACCBDPC.toFixed(4),
                                                                sa: ACCBSA.toFixed(4),
                                                                sb: ACCBSB.toFixed(4),
                                                                ks: ACCBKS.toFixed(4),
                                                                dop: ACCBDOP.toFixed(4),
                                                                fp: ACCBFP.toFixed(4),

                                                                cr: ACCBCR.toFixed(4),
                                                                thkre: ACCBTHKRE.toFixed(4),
                                                                fr: ACCBFR.toFixed(4),

                                                                thksc: ACCBTHKSC.toFixed(4),
                                                                thksmin: ACCBTHKSMIN.toFixed(4),
                                                                thksd: ACCBTHKSD.toFixed(4),
                                                                thkschk: ACCBTHKSCHK,

                                                                thkpc: ACCBTHKPC.toFixed(4),
                                                                thkpd: ACCBTHKPD.toFixed(4),
                                                                thkpchk: ACCBTHKPCHK,

                                                                ba: ACCBBA.toFixed(4),
                                                                bb: ACCBBB.toFixed(4),
                                                                a1: ACCBA1.toFixed(4),
                                                                hp1: ACCBHP1.toFixed(4),
                                                                a2: ACCBA2.toFixed(4),
                                                                dre: ACCBDRE.toFixed(4),
                                                                a4: ACCBA4.toFixed(4),
                                                                ae: ACCBAE.toFixed(4),
                                                                achk: ACCBACHK,

                                                                eta: ACCBETA.toFixed(4),
                                                                pst: ACCBPST.toFixed(4),
                                                                ppt: ACCBPPT.toFixed(4),
                                                                pt: ACCBPT.toFixed(4),

                                                                mawps: ACCBMAWPS.toFixed(4),
                                                                mawpp: ACCBMAWPP.toFixed(4),
                                                                mawpa1: ACCBMAWPA1.toFixed(0),
                                                                mawpa2: ACCBMAWPA2.toFixed(0),
                                                                mawpa3: ACCBMAWPA3,
                                                                mawpa4: ACCBMAWPA4.toFixed(0),
                                                                mawpa: ACCBMAWPA.toFixed(0),
                                                                mawpae: ACCBMAWPAE.toFixed(0),
                                                                mawpr: ACCBMAWPR.toFixed(4),
                                                                mawp: ACCBMAWP.toFixed(4)
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
                                                                    ACCBPayJS.dialog({
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
                                                                                ACCBPayJS.dialog("close");
                                                                                ACCBPayJS.dialog("clear");
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
                                                                                            ACCBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACCBPayJS.dialog('close');
                                                                                                    ACCBPayJS.dialog('clear');
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
                pg.propertygrid('options').finder.getTr(this, 12).hide();
                pg.propertygrid('options').finder.getTr(this, 13).hide();
                pg.propertygrid('options').finder.getTr(this, 30).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 34).hide();
                pg.propertygrid('options').finder.getTr(this, 35).hide();
                pg.propertygrid('options').finder.getTr(this, 36).hide();
                pg.propertygrid('options').finder.getTr(this, 39).hide();
            }
        });
    });
});