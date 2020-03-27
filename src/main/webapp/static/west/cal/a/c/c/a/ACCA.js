$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let accaSketch = $("#d2");
    let accaModel = $("#d3");
    let accad2d3 = $('#d2d3');

    $("#cal").html("<table id='acca'></table>");
    let pg = $("#acca");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/c/a/ACCA.json", function (result) {

        let ACCADT,
            ACCASCategory, ACCASCategoryVal, ACCASType, ACCASTypeVal, ACCASSTD, ACCASSTDVal, ACCASName, ACCASNameVal,
            ACCAPCategory, ACCAPCategoryVal, ACCAPType, ACCAPTypeVal, ACCAPSTD, ACCAPSTDVal, ACCAPName, ACCAPNameVal,
            ACCARCategory, ACCARCategoryVal, ACCARType, ACCARTypeVal, ACCARSTD, ACCARSTDVal, ACCARName, ACCARNameVal,
            columns, rows, ed;

        // 壳体内径
        function acca2d(idod, dsi = "ΦDsi", dso = "ΦDso", hsi = "hsi", hso = "hso", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α", beta = "β", l = "L",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            accaSketch.empty();
            let width = accaSketch.width();
            let height = accaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACCASVG").attr("height", height);

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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACCASketchDRO");
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
                ])).attr("id", "ACCASketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACCASketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACCASketchDPO");

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
            ])).attr("id", "ACCASketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCASketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "ACCASketchHPI");

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACCASketchHPO");

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
            ])).attr("id", "ACCASketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCASketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ).classed("sketch", true).attr("id", "ACCASketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCASketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "ACCASketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCASketchL")
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
            ).classed("sketch", true).attr("id", "ACCASketchBETA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACCASketchBETA").attr("startOffset", "50%").text(beta);

            // dsi dso hpi hpo 因为封头是单线图，所以这四个尺寸没有在 sketch 中表示出来
            if (idod === "内径") {

            }
            else if (idod === "外径") {

            }

        }

        currentTabIndex = accad2d3.tabs('getTabIndex', accad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            acca2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#acca").length > 0) {
                    acca2d();
                }
            });
        }
        accad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    acca2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#acca").length > 0) {
                            acca2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 椭圆封头插入式接管补强计算",
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
                    || index === 31 || index === 32 || index === 33
                    || index === 34 || index === 35 || index === 36 || index === 37
                    || index === 40) {
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
                    $(ed.target).combobox("loadData", ACCASCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ACCASType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACCASSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACCASName);
                }

                else if (index === 17) {
                    $(ed.target).combobox("loadData", ACCAPCategory);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", ACCAPType);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", ACCAPSTD);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", ACCAPName);
                }

                else if (index === 31) {
                    $(ed.target).combobox("loadData", ACCARCategory);
                }
                else if (index === 32) {
                    $(ed.target).combobox("loadData", ACCARType);
                }
                else if (index === 33) {
                    $(ed.target).combobox("loadData", ACCARSTD);
                }
                else if (index === 34) {
                    $(ed.target).combobox("loadData", ACCARName);
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
                    accaSketch.empty();
                    accaModel.empty();

                    // sketch
                    currentTabIndex = accad2d3.tabs('getTabIndex', accad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        acca2d();
                        accaSketch.off("resize").on("resize", function () {
                            if ($("#acca").length > 0) {
                                acca2d();
                            }
                        });
                    }
                    accad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acca2d();
                                accaSketch.off("resize").on("resize", function () {
                                    if ($("#acca").length > 0) {
                                        acca2d();
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

                        ACCADT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ACCASCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACCASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACCASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACCASName = null;

                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACCAPCategory = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACCAPType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        ACCAPSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACCAPName = null;

                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACCARCategory = null;
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        ACCARType = null;
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACCARSTD = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACCARName = null;

                        if (rows[30][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                            pg.propertygrid('options').finder.getTr(this, 34).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCASCategory = [];
                                ACCAPCategory = [];
                                ACCARCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACCADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACCASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACCAPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACCARCategory[index] = {
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

                        ACCASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACCASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACCASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACCASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCASCategoryVal,
                                temp: ACCADT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCASType = [];
                                $(result).each(function (index, element) {
                                    ACCASType[index] = {
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

                        ACCASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACCASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACCASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCASCategoryVal,
                                type: ACCASTypeVal,
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCASSTD = [];
                                $(result).each(function (index, element) {
                                    ACCASSTD[index] = {
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

                        ACCASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACCASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCASCategoryVal,
                                type: ACCASTypeVal,
                                std: ACCASSTDVal,
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCASName = [];
                                $(result).each(function (index, element) {
                                    ACCASName[index] = {
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

                        ACCAPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACCAPType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        ACCAPSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACCAPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCAPCategoryVal,
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCAPType = [];
                                $(result).each(function (index, element) {
                                    ACCAPType[index] = {
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

                        ACCAPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        ACCAPSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACCAPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCAPCategoryVal,
                                type: ACCAPTypeVal,
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCAPSTD = [];
                                $(result).each(function (index, element) {
                                    ACCAPSTD[index] = {
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

                        ACCAPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACCAPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCAPCategoryVal,
                                type: ACCAPTypeVal,
                                std: ACCAPSTDVal,
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCAPName = [];
                                $(result).each(function (index, element) {
                                    ACCAPName[index] = {
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
                    if (index === 31) {

                        ACCARCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[32][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 32);
                        ACCARType = null;
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACCARSTD = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACCARName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCARCategoryVal,
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCARType = [];
                                $(result).each(function (index, element) {
                                    ACCARType[index] = {
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
                    if (index === 32) {

                        ACCARTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACCARSTD = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACCARName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCARCategoryVal,
                                type: ACCARTypeVal,
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCARSTD = [];
                                $(result).each(function (index, element) {
                                    ACCARSTD[index] = {
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
                    if (index === 33) {

                        ACCARSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACCARName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACCARCategoryVal,
                                type: ACCARTypeVal,
                                std: ACCARSTDVal,
                                temp: ACCADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACCARName = [];
                                $(result).each(function (index, element) {
                                    ACCARName[index] = {
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
                    if (index === 30) {
                        if (rows[30][columns[0][1].field] === "是") {
                            pg.propertygrid('options').finder.getTr(this, 31).show();
                            pg.propertygrid('options').finder.getTr(this, 32).show();
                            pg.propertygrid('options').finder.getTr(this, 33).show();
                            pg.propertygrid('options').finder.getTr(this, 34).show();
                            pg.propertygrid('options').finder.getTr(this, 35).show();
                            pg.propertygrid('options').finder.getTr(this, 36).show();
                            pg.propertygrid('options').finder.getTr(this, 37).show();
                        }
                        else if (rows[30][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                            pg.propertygrid('options').finder.getTr(this, 34).hide();
                            pg.propertygrid('options').finder.getTr(this, 35).hide();
                            pg.propertygrid('options').finder.getTr(this, 36).hide();
                            pg.propertygrid('options').finder.getTr(this, 37).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsB
                    if (index === 39) {
                        if (rows[39][columns[0][1].field] === "是") {
                            pg.datagrid('options').finder.getTr(this, 40).show();
                        }
                        else if (rows[39][columns[0][1].field] === "否") {
                            pg.datagrid('options').finder.getTr(this, 40).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    // Tag
                    let ACCATag = "符号标记";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACCATag = rows[0][columns[0][1].field];
                    }

                    // 设计压力
                    let ACCAPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACCAPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACCAPS;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        ACCAPS = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACCATest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACCATest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 椭圆封头材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        ACCASNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取椭圆封头材料密度、最大最小厚度
                    let ACCADS, ACCASThkMin, ACCASThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACCASCategoryVal,
                            "type": ACCASTypeVal,
                            "std": ACCASSTDVal,
                            "name": ACCASNameVal,
                            "temp": ACCADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACCADS = parseFloat(result.density);
                            ACCASThkMin = parseFloat(result.thkMin);
                            ACCASThkMax = parseFloat(result.thkMax);

                            // IDOD
                            let ACCAIDOD;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                ACCAIDOD = rows[9][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acca2d(ACCAIDOD);
                                accaSketch.off("resize").on("resize", function () {
                                    if ($("#acca").length > 0) {
                                        acca2d(ACCAIDOD);
                                    }
                                });
                            }
                            accad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acca2d(ACCAIDOD);
                                        accaSketch.off("resize").on("resize", function () {
                                            if ($("#acca").length > 0) {
                                                acca2d(ACCAIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACCADSI = -1, ACCADSO = -1, ACCAHSI = -1, ACCAHSO = -1;
                            if (ACCAIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    ACCADSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO);
                                    accaSketch.off("resize").on("resize", function () {
                                        if ($("#acca").length > 0) {
                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO);
                                        }
                                    });
                                }
                                accad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO);
                                            accaSketch.off("resize").on("resize", function () {
                                                if ($("#acca").length > 0) {
                                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    ACCAHSI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO);
                                    accaSketch.off("resize").on("resize", function () {
                                        if ($("#acca").length > 0) {
                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO);
                                        }
                                    });
                                }
                                accad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO);
                                            accaSketch.off("resize").on("resize", function () {
                                                if ($("#acca").length > 0) {
                                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else if (ACCAIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                    ACCADSO = parseFloat(rows[12][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO);
                                    accaSketch.off("resize").on("resize", function () {
                                        if ($("#acca").length > 0) {
                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO);
                                        }
                                    });
                                }
                                accad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO);
                                            accaSketch.off("resize").on("resize", function () {
                                                if ($("#acca").length > 0) {
                                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                    ACCAHSO = parseFloat(rows[13][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO);
                                    accaSketch.off("resize").on("resize", function () {
                                        if ($("#acca").length > 0) {
                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO);
                                        }
                                    });
                                }
                                accad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO);
                                            accaSketch.off("resize").on("resize", function () {
                                                if ($("#acca").length > 0) {
                                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO);
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
                            let ACCATHKSN;
                            if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                && parseFloat(rows[14][columns[0][1].field]) > ACCASThkMin
                                && parseFloat(rows[14][columns[0][1].field]) <= ACCASThkMax) {
                                ACCATHKSN = parseFloat(rows[14][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                && parseFloat(rows[14][columns[0][1].field]) <= ACCASThkMin) {
                                south.html("椭圆封头材料厚度不能小于等于 " + ACCASThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                && parseFloat(rows[14][columns[0][1].field]) > ACCASThkMax) {
                                south.html("椭圆封头材料厚度不能大于 " + ACCASThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN);
                                accaSketch.off("resize").on("resize", function () {
                                    if ($("#acca").length > 0) {
                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN);
                                    }
                                });
                            }
                            accad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN);
                                        accaSketch.off("resize").on("resize", function () {
                                            if ($("#acca").length > 0) {
                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 输入内径时补齐外径，输入外径时补齐内径
                            if (ACCAIDOD === "内径") {
                                ACCADSO = ACCADSI + 2 * ACCATHKSN;
                                ACCAHSO = ACCAHSI + ACCATHKSN;
                            }
                            else if (ACCAIDOD === "外径") {
                                ACCADSI = ACCADSO - 2 * ACCATHKSN;
                                ACCAHSI = ACCAHSO - ACCATHKSN;
                            }

                            /*
                            获取椭圆封头力学特性
                             */
                            let ACCAOST, ACCAOS, ACCAOST1, ACCARSEL, ACCACS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": ACCASCategoryVal,
                                    "type": ACCASTypeVal,
                                    "std": ACCASSTDVal,
                                    "name": ACCASNameVal,
                                    "thk": ACCATHKSN,
                                    "temp": ACCADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACCADSO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACCAOST = parseFloat(result.ot);
                                    if (ACCAOST < 0) {
                                        south.html("查询椭圆封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACCAOS = parseFloat(result.o);
                                    if (ACCAOS < 0) {
                                        south.html("查询椭圆封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACCARSEL = parseFloat(result.rel);
                                    if (ACCARSEL < 0) {
                                        south.html("查询椭圆封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACCACS1 = parseFloat(result.c1);
                                    if (ACCACS1 < 0) {
                                        south.html("查询椭圆封头材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACCAOST1 = parseFloat(result.ot1);

                                    let ACCACS2;
                                    if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                        && parseFloat(rows[15][columns[0][1].field]) < ACCATHKSN) {
                                        ACCACS2 = parseFloat(rows[15][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                        && parseFloat(rows[15][columns[0][1].field]) >= ACCATHKSN) {
                                        south.html("椭圆封头腐蚀裕量不能大于等于 " + ACCATHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACCAES;
                                    if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                        ACCAES = parseFloat(rows[16][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                        ACCAPNameVal = rows[20][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACCADP, ACCAPThkMin, ACCAPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACCAPCategoryVal,
                                            "type": ACCAPTypeVal,
                                            "std": ACCAPSTDVal,
                                            "name": ACCAPNameVal,
                                            "temp": ACCADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACCADP = parseFloat(result.density);
                                            ACCAPThkMin = parseFloat(result.thkMin);
                                            ACCAPThkMax = parseFloat(result.thkMax);

                                            let ACCADPO;
                                            if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                ACCADPO = parseFloat(rows[21][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO);
                                                accaSketch.off("resize").on("resize", function () {
                                                    if ($("#acca").length > 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO);
                                                    }
                                                });
                                            }
                                            accad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO);
                                                        accaSketch.off("resize").on("resize", function () {
                                                            if ($("#acca").length > 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKPN
                                            let ACCATHKPN;
                                            if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) > ACCAPThkMin
                                                && parseFloat(rows[22][columns[0][1].field]) <= Math.min(ACCAPThkMax, ACCADPO / 2)) {
                                                ACCATHKPN = parseFloat(rows[22][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) <= ACCAPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACCAPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                && parseFloat(rows[22][columns[0][1].field]) > Math.min(ACCAPThkMax, ACCADPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACCAPThkMax, ACCADPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN);
                                                accaSketch.off("resize").on("resize", function () {
                                                    if ($("#acca").length > 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN);
                                                    }
                                                });
                                            }
                                            accad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN);
                                                        accaSketch.off("resize").on("resize", function () {
                                                            if ($("#acca").length > 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACCAOPT, ACCAOP, ACCAOPT1, ACCARPEL, ACCACP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACCAPCategoryVal,
                                                    "type": ACCAPTypeVal,
                                                    "std": ACCAPSTDVal,
                                                    "name": ACCAPNameVal,
                                                    "thk": ACCATHKPN,
                                                    "temp": ACCADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACCADPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACCAOPT = parseFloat(result.ot);
                                                    if (ACCAOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACCAOP = parseFloat(result.o);
                                                    if (ACCAOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACCARPEL = parseFloat(result.rel);
                                                    if (ACCARPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACCACP1 = parseFloat(result.c1);
                                                    if (ACCACP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACCAOPT1 = parseFloat(result.ot1);

                                                    let ACCAHPO;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                        ACCAHPO = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO);
                                                        accaSketch.off("resize").on("resize", function () {
                                                            if ($("#acca").length > 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO);
                                                            }
                                                        });
                                                    }
                                                    accad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO);
                                                                accaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acca").length > 0) {
                                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCAHPI;
                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                        ACCAHPI = parseFloat(rows[24][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI);
                                                        accaSketch.off("resize").on("resize", function () {
                                                            if ($("#acca").length > 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI);
                                                            }
                                                        });
                                                    }
                                                    accad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI);
                                                                accaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acca").length > 0) {
                                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCAALPHA;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        ACCAALPHA = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°");
                                                        accaSketch.off("resize").on("resize", function () {
                                                            if ($("#acca").length > 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    accad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°");
                                                                accaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acca").length > 0) {
                                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCABETA;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                        ACCABETA = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°");
                                                        accaSketch.off("resize").on("resize", function () {
                                                            if ($("#acca").length > 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°");
                                                            }
                                                        });
                                                    }
                                                    accad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°");
                                                                accaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acca").length > 0) {
                                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCAL;
                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                        && parseFloat(rows[27][columns[0][1].field]) < (ACCADSO - ACCADPO) / 2) {
                                                        ACCAL = parseFloat(rows[27][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])
                                                        && parseFloat(rows[27][columns[0][1].field]) >= (ACCADSO - ACCADPO) / 2) {
                                                        south.html("开孔中心到封头轴线距离 L 不能大于等于 " + (ACCADSO - ACCADPO) / 2 + " mm!").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL);
                                                        accaSketch.off("resize").on("resize", function () {
                                                            if ($("#acca").length > 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL);
                                                            }
                                                        });
                                                    }
                                                    accad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL);
                                                                accaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acca").length > 0) {
                                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCACP2;
                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                        && parseFloat(rows[28][columns[0][1].field]) < ACCATHKPN) {
                                                        ACCACP2 = parseFloat(rows[28][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])
                                                        && parseFloat(rows[28][columns[0][1].field]) >= ACCATHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACCATHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACCAEP;
                                                    if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])) {
                                                        ACCAEP = parseFloat(rows[29][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACCAIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                        ACCAIsPAD = rows[30][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD);
                                                        accaSketch.off("resize").on("resize", function () {
                                                            if ($("#acca").length > 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD);
                                                            }
                                                        });
                                                    }
                                                    accad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD);
                                                                accaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acca").length > 0) {
                                                                        acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN, "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACCADR = -1.0, ACCARThkMin = -1.0, ACCARThkMax = -1.0;
                                                    let ACCADRO = -1.0, ACCATHKRN = -1.0, ACCACR2 = -1.0;
                                                    let ACCAORT = -1.0, ACCAOR = -1.0, ACCAORT1 = -1.0, ACCARREL = -1.0,
                                                        ACCACR1 = -1.0;
                                                    if (ACCAIsPAD === "是") {

                                                        if (ACCATHKSN > 38) {
                                                            south.html("椭圆封头厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (ACCASCategoryVal === "碳素钢和低合金钢" && ACCARSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                            ACCARNameVal = rows[34][columns[0][1].field];
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
                                                                "category": ACCARCategoryVal,
                                                                "type": ACCARTypeVal,
                                                                "std": ACCARSTDVal,
                                                                "name": ACCARNameVal,
                                                                "temp": ACCADT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACCADR = parseFloat(result.density);
                                                                ACCARThkMin = parseFloat(result.thkMin);
                                                                ACCARThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])
                                                                    && parseFloat(rows[35][columns[0][1].field]) > ACCADPO) {
                                                                    ACCADRO = parseFloat(rows[35][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])
                                                                    && parseFloat(rows[35][columns[0][1].field]) <= ACCADPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACCADPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN,
                                                                        "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD, "Φ" + ACCADRO);
                                                                    accaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acca").length > 0) {
                                                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN,
                                                                                "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD, "Φ" + ACCADRO);
                                                                        }
                                                                    });
                                                                }
                                                                accad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN,
                                                                                "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD, "Φ" + ACCADRO);
                                                                            accaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acca").length > 0) {
                                                                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN,
                                                                                        "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD, "Φ" + ACCADRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                    && parseFloat(rows[36][columns[0][1].field]) > ACCARThkMin
                                                                    && parseFloat(rows[36][columns[0][1].field]) <= Math.min(ACCARThkMax, 1.5 * ACCATHKSN)) {
                                                                    ACCATHKRN = parseFloat(rows[36][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                    && parseFloat(rows[36][columns[0][1].field]) <= ACCARThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACCARThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])
                                                                    && parseFloat(rows[36][columns[0][1].field]) > Math.min(ACCARThkMax, 1.5 * ACCATHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACCARThkMax, 1.5 * ACCATHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN,
                                                                        "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD, "Φ" + ACCADRO, ACCATHKRN);
                                                                    accaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acca").length > 0) {
                                                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN,
                                                                                "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD, "Φ" + ACCADRO, ACCATHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                accad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN,
                                                                                "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD, "Φ" + ACCADRO, ACCATHKRN);
                                                                            accaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acca").length > 0) {
                                                                                    acca2d(ACCAIDOD, "Φ" + ACCADSI, "Φ" + ACCADSO, ACCAHSI, ACCAHSO, ACCATHKSN,
                                                                                        "Φ" + ACCADPO, ACCATHKPN, ACCAHPO, ACCAHPI, ACCAALPHA + "°", ACCABETA + "°", ACCAL, ACCAIsPAD, "Φ" + ACCADRO, ACCATHKRN);
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
                                                                        "category": ACCARCategoryVal,
                                                                        "type": ACCARTypeVal,
                                                                        "std": ACCARSTDVal,
                                                                        "name": ACCARNameVal,
                                                                        "thk": ACCATHKRN,
                                                                        "temp": ACCADT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACCADRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACCAORT = parseFloat(result.ot);
                                                                        if (ACCAORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACCAOR = parseFloat(result.o);
                                                                        if (ACCAOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACCARREL = parseFloat(result.rel);
                                                                        if (ACCARREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACCACR1 = parseFloat(result.c1);
                                                                        if (ACCACR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACCAORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                            && parseFloat(rows[37][columns[0][1].field]) < ACCATHKRN) {
                                                                            ACCACR2 = parseFloat(rows[37][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                            && parseFloat(rows[37][columns[0][1].field]) >= ACCATHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACCATHKRN + " mm").css("color", "red");
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
                                                        if (ACCACR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACCAA3;
                                                    if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])) {
                                                        ACCAA3 = parseFloat(rows[38][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACCAIsB;
                                                    if (!jQuery.isEmptyObject(rows[39][columns[0][1].field])) {
                                                        ACCAIsB = rows[39][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACCABS = -1.0;
                                                    if (ACCAIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[40][columns[0][1].field]) > ACCADPO) {
                                                            ACCABS = parseFloat(rows[40][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[40][columns[0][1].field]) <= ACCADPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACCADPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */

                                                    let ACCAPC = ACCAPD + ACCAPS;

                                                    // 椭圆封头
                                                    let ACCACS = ACCACS1 + ACCACS2;
                                                    let ACCATHKSE = ACCATHKSN - ACCACS;
                                                    let ACCADSI2HSI = ACCADSI / (2 * ACCAHSI);
                                                    let ACCAK = (2 + ACCADSI2HSI * ACCADSI2HSI) / 6;
                                                    let ACCADSO2HSO = ACCADSO / (2 * ACCAHSO);
                                                    let ACCAK1;
                                                    if (ACCADSO2HSO > 2.6 || ACCADSO2HSO < 1.0) {
                                                        south.html("椭圆封头尺寸超限，程序无法计算！").css("color", "red");
                                                        return false;
                                                    }
                                                    else if (ACCADSO2HSO === 2.6) {
                                                        ACCAK1 = 1.18;
                                                    }
                                                    else if (ACCADSO2HSO < 2.6 && ACCADSO2HSO > 2.4) {
                                                        ACCAK1 = 1.18 + (ACCADSO2HSO - 2.6) / (2.4 - 2.6) * (1.08 - 1.18);
                                                    }
                                                    else if (ACCADSO2HSO === 2.4) {
                                                        ACCAK1 = 1.08;
                                                    }
                                                    else if (ACCADSO2HSO < 2.4 && ACCADSO2HSO > 2.2) {
                                                        ACCAK1 = 1.08 + (ACCADSO2HSO - 2.4) / (2.2 - 2.4) * (0.99 - 1.08);
                                                    }
                                                    else if (ACCADSO2HSO === 2.2) {
                                                        ACCAK1 = 0.99;
                                                    }
                                                    else if (ACCADSO2HSO < 2.2 && ACCADSO2HSO > 2.0) {
                                                        ACCAK1 = 0.99 + (ACCADSO2HSO - 2.2) / (2.0 - 2.2) * (0.90 - 0.99);
                                                    }
                                                    else if (ACCADSO2HSO === 2.0) {
                                                        ACCAK1 = 0.90;
                                                    }
                                                    else if (ACCADSO2HSO < 2.0 && ACCADSO2HSO > 1.8) {
                                                        ACCAK1 = 0.90 + (ACCADSO2HSO - 2) / (1.8 - 2) * (0.81 - 0.90);
                                                    }
                                                    else if (ACCADSO2HSO === 1.8) {
                                                        ACCAK1 = 0.81;
                                                    }
                                                    else if (ACCADSO2HSO < 1.8 && ACCADSO2HSO > 1.6) {
                                                        ACCAK1 = 0.81 + (ACCADSO2HSO - 1.8) / (1.6 - 1.8) * (0.73 - 0.81);
                                                    }
                                                    else if (ACCADSO2HSO === 1.6) {
                                                        ACCAK1 = 0.73;
                                                    }
                                                    else if (ACCADSO2HSO < 1.6 && ACCADSO2HSO > 1.4) {
                                                        ACCAK1 = 0.73 + (ACCADSO2HSO - 1.6) / (1.4 - 1.6) * (0.65 - 0.73);
                                                    }
                                                    else if (ACCADSO2HSO === 1.4) {
                                                        ACCAK1 = 0.65;
                                                    }
                                                    else if (ACCADSO2HSO < 1.4 && ACCADSO2HSO > 1.2) {
                                                        ACCAK1 = 0.65 + (ACCADSO2HSO - 1.4) / (1.2 - 1.4) * (0.57 - 0.65);
                                                    }
                                                    else if (ACCADSO2HSO === 1.2) {
                                                        ACCAK1 = 0.57;
                                                    }
                                                    else if (ACCADSO2HSO < 1.2 && ACCADSO2HSO > 1.0) {
                                                        ACCAK1 = 0.57 + (ACCADSO2HSO - 1.2) / (1.0 - 1.2) * (0.50 - 0.57);
                                                    }
                                                    else if (ACCADSO2HSO === 1.0) {
                                                        ACCAK1 = 0.50;
                                                    }
                                                    let ACCAASM = (ACCADSI + ACCADSO) / 4;
                                                    let ACCABSM = (ACCAHSI + ACCAHSO) / 2;
                                                    let ACCAH = ACCABSM / ACCAASM * Math.sqrt(ACCAASM * ACCAASM - ACCAL * ACCAL);
                                                    let ACCATHETA = Math.atan(ACCABSM * ACCABSM * ACCAL / ACCAASM / ACCAASM / ACCAH) / Math.PI * 180;

                                                    // 接管
                                                    let ACCACP = ACCACP1 + ACCACP2;
                                                    let ACCATHKPE = ACCATHKPN - ACCACP;
                                                    let ACCADPC = ACCADPO - 2 * ACCATHKPN + 2 * ACCACP;
                                                    let ACCASA = ACCADPC / Math.cos(ACCABETA / 180 * Math.PI);
                                                    let ACCASB = ACCADPC / Math.cos(Math.abs(ACCAALPHA - ACCATHETA) / 180 * Math.PI);
                                                    let ACCAKS = Math.max(ACCASA / ACCASB, ACCASB / ACCASA);
                                                    if (ACCAKS > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACCADOP = Math.max(ACCASA, ACCASB);
                                                    if (ACCADOP > ACCADSI / 2) {
                                                        south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                        return false;
                                                    }
                                                    let ACCAFP = Math.min(1.0, ACCAOPT / ACCAOST);

                                                    // 补强圈
                                                    let ACCACR = -1.0, ACCATHKRE = -1.0, ACCAFR = -1.0;
                                                    if (ACCAIsPAD === "是") {
                                                        ACCACR = ACCACR1 + ACCACR2;
                                                        ACCATHKRE = ACCATHKRN - ACCACR;
                                                        ACCAFR = Math.min(1.0, ACCAORT / ACCAOST);
                                                    }

                                                    /*
                                                    椭圆封头内压强度校核
                                                     */
                                                    let ACCATHKSC;
                                                    if (ACCAIDOD === "内径") {
                                                        if (ACCAL <= 0.4 * ACCADSI) {
                                                            ACCATHKSC = ACCAPC * ACCAK1 * ACCADSI / (2 * ACCAOST * ACCAES - 0.5 * ACCAPC);
                                                        }
                                                        else {
                                                            ACCATHKSC = ACCAPC * ACCAK * ACCADSI / (2 * ACCAOST * ACCAES - 0.5 * ACCAPC);
                                                        }
                                                    }
                                                    else if (ACCAIDOD === "外径") {
                                                        if (ACCAL <= 0.4 * ACCADSI) {
                                                            ACCATHKSC = ACCAPC * ACCAK1 * ACCADSI / (2 * ACCAOST * ACCAES - 0.5 * ACCAPC);
                                                        }
                                                        else {
                                                            ACCATHKSC = ACCAPC * ACCAK * ACCADSO / (2 * ACCAOST * ACCAES + (2 * ACCAK - 0.5) * ACCAPC);
                                                        }
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACCATHKSMIN;
                                                    if (ACCADSI2HSI <= 2) {
                                                        ACCATHKSMIN = 0.0015 * ACCADSI;
                                                    }
                                                    else {
                                                        ACCATHKSMIN = 0.003 * ACCADSI;
                                                    }
                                                    let ACCATHKSD = Math.max(ACCATHKSC, ACCATHKSMIN) + ACCACS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "椭圆封头内压所需厚度：" + (ACCATHKSD + ACCACS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACCATHKSCHK;
                                                    if (ACCATHKSN >= (ACCATHKSD + ACCACS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACCATHKSN + " mm" +
                                                            "</span>");
                                                        ACCATHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACCATHKSN + " mm" +
                                                            "</span>");
                                                        ACCATHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACCATHKPC = ACCAPC * ACCADPO / (2 * ACCAOPT * ACCAEP + ACCAPC);
                                                    let ACCATHKPD = ACCATHKPC + ACCACP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACCATHKPD + ACCACP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACCATHKPCHK;
                                                    if (ACCATHKPN >= (ACCATHKPD + ACCACP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACCATHKPN + " mm" +
                                                            "</span>");
                                                        ACCATHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACCATHKPN + " mm" +
                                                            "</span>");
                                                        ACCATHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACCABA = ACCADOP * ACCATHKSC + 2 * ACCATHKSC * ACCATHKPE * (1 - ACCAFP);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACCABA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 椭圆封头
                                                    let ACCABB;
                                                    if (ACCAIsB === "是") {
                                                        ACCABB = Math.min(Math.max(2 * ACCADOP, ACCADOP + 2 * ACCATHKSN + 2 * ACCATHKPN), ACCABS);
                                                    }
                                                    else if (ACCAIsB === "否") {
                                                        ACCABB = Math.max(2 * ACCADOP, ACCADOP + 2 * ACCATHKSN + 2 * ACCATHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACCAA1 = (ACCABB - ACCADOP) * (ACCATHKSE - ACCATHKSC) - 2 * ACCATHKPE * (ACCATHKSE - ACCATHKSC) * (1 - ACCAFP);

                                                    // 接管
                                                    let ACCAHP1 = Math.min(ACCAHPO, Math.sqrt(ACCADOP * ACCATHKPN));
                                                    let ACCAHP2 = Math.min(ACCAHPI, Math.sqrt(ACCADOP * ACCATHKPN));
                                                    let ACCAA2 = 2 * ACCAHP1 * (ACCATHKPE - ACCATHKPC) * ACCAFP + 2 * ACCAHP2 * (ACCATHKPE - ACCACP2) * ACCAFP;

                                                    // 补强圈
                                                    let ACCAA4 = 0.0, ACCADRE = -1.0;
                                                    if (ACCAIsPAD === "是") {
                                                        ACCADRE = Math.min(ACCADRO, ACCABB);
                                                        ACCAA4 = (ACCADRE - ACCADPO) * ACCATHKRE * ACCAFR;
                                                    }

                                                    // Ae
                                                    let ACCAAE = ACCAA1 + ACCAA2 + ACCAA3 + ACCAA4;
                                                    let ACCAACHK;
                                                    if (ACCAAE >= ACCABA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACCAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACCAACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACCAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACCAACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACCAETA, ACCAPST, ACCAPPT, ACCAPT;
                                                    if (ACCATest === "液压试验") {
                                                        ACCAETA = 1.25;
                                                        ACCAPST = ACCAETA * ACCAPD * ACCAOS / Math.max(ACCAOST, ACCAOST1);
                                                        ACCAPPT = ACCAETA * ACCAPD * ACCAOP / Math.max(ACCAOPT, ACCAOPT1);
                                                        ACCAPT = Math.min(ACCAPST, ACCAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACCAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACCATest === "气压试验") {
                                                        ACCAETA = 1.10;
                                                        ACCAPST = ACCAETA * ACCAPD * ACCAOS / Math.max(ACCAOST, ACCAOST1);
                                                        ACCAPPT = ACCAETA * ACCAPD * ACCAOP / Math.max(ACCAOPT, ACCAOPT1);
                                                        ACCAPT = Math.min(ACCAPST, ACCAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACCAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */

                                                    // 椭圆封头
                                                    let ACCAMAWPS;
                                                    if (ACCAIDOD === "内径") {
                                                        ACCAMAWPS = 2 * ACCATHKSE * ACCAOST * ACCAES / (ACCAK * ACCADSI + 0.5 * ACCATHKSE) - ACCAPS;
                                                    }
                                                    else if (ACCAIDOD === "外径") {
                                                        ACCAMAWPS = 2 * ACCATHKSE * ACCAOST * ACCAES / (ACCAK * ACCADSO - (2 * ACCAK - 0.5) * ACCATHKSE) - ACCAPS;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 接管
                                                    let ACCAMAWPP = 2 * ACCATHKPE * ACCAOPT * ACCAEP / (ACCADPO - ACCATHKPE) - ACCAPS;

                                                    // 开孔补强
                                                    let ACCAMAWPA1 = -1, ACCAMAWPA2 = -1,
                                                        ACCAMAWPA3 = ACCAA3, ACCAMAWPA4 = ACCAA4,
                                                        ACCAMAWPA = -1, ACCAMAWPAE = -1,
                                                        ACCAMAWPRC = ACCAPC;
                                                    let ACCAMAWPTHKSC, ACCAMAWPTHKPC;
                                                    while (ACCAMAWPAE >= ACCAMAWPA) {

                                                        ACCAMAWPRC += 0.0001;

                                                        // 椭圆封头计算厚度
                                                        if (ACCAIDOD === "内径") {
                                                            if (ACCAL <= 0.4 * ACCADSI) {
                                                                ACCAMAWPTHKSC = ACCAMAWPRC * ACCAK1 * ACCADSI / (2 * ACCAOST * ACCAES - 0.5 * ACCAPC);
                                                            }
                                                            else {
                                                                ACCAMAWPTHKSC = ACCAMAWPRC * ACCAK * ACCADSI / (2 * ACCAOST * ACCAES - 0.5 * ACCAPC);
                                                            }
                                                        }
                                                        else if (ACCAIDOD === "外径") {
                                                            if (ACCAL <= 0.4 * ACCADSI) {
                                                                ACCAMAWPTHKSC = ACCAMAWPRC * ACCAK1 * ACCADSI / (2 * ACCAOST * ACCAES - 0.5 * ACCAPC);
                                                            }
                                                            else {
                                                                ACCAMAWPTHKSC = ACCAMAWPRC * ACCAK * ACCADSO / (2 * ACCAOST * ACCAES + (2 * ACCAK - 0.5) * ACCAPC);
                                                            }
                                                        }
                                                        ACCAMAWPA = ACCADOP * ACCAMAWPTHKSC + 2 * ACCAMAWPTHKSC * ACCATHKPE * (1 - ACCAFP);

                                                        // 接管计算厚度
                                                        ACCAMAWPTHKPC = ACCAMAWPRC * ACCADPO / (2 * ACCAOPT * ACCAEP + ACCAPC);
                                                        ACCAMAWPA1 = (ACCABB - ACCADOP) * (ACCATHKSE - ACCAMAWPTHKSC) - 2 * ACCATHKPE * (ACCATHKSE - ACCAMAWPTHKSC) * (1 - ACCAFP);
                                                        ACCAMAWPA2 = 2 * ACCAHP1 * (ACCATHKPE - ACCAMAWPTHKPC) * ACCAFP + 2 * ACCAHP2 * (ACCATHKPE - ACCACP2) * ACCAFP;
                                                        ACCAMAWPAE = ACCAMAWPA1 + ACCAMAWPA2 + ACCAMAWPA3 + ACCAMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACCAMAWPR = ACCAMAWPRC - ACCAPS - 0.0001;
                                                    let ACCAMAWP = Math.min(ACCAMAWPS, ACCAMAWPP, ACCAMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACCAMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACCAPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "accadocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACCA",

                                                                idod: ACCAIDOD,
                                                                isPad: ACCAIsPAD,
                                                                isB: ACCAIsB,

                                                                tag: ACCATag,

                                                                pd: ACCAPD,
                                                                t: ACCADT,
                                                                ps: ACCAPS,
                                                                test: ACCATest,

                                                                stds: ACCASSTDVal,
                                                                names: ACCASNameVal,
                                                                dsi: ACCADSI,
                                                                dso: ACCADSO,
                                                                hsi: ACCAHSI,
                                                                hso: ACCAHSO,
                                                                thksn: ACCATHKSN,
                                                                cs2: ACCACS2,
                                                                es: ACCAES,

                                                                stdp: ACCAPSTDVal,
                                                                namep: ACCAPNameVal,
                                                                dpo: ACCADPO,
                                                                thkpn: ACCATHKPN,
                                                                hpo: ACCAHPO,
                                                                hpi: ACCAHPI,
                                                                alpha: ACCAALPHA,
                                                                beta: ACCABETA,
                                                                l: ACCAL,
                                                                cp2: ACCACP2,
                                                                ep: ACCAEP,

                                                                stdr: ACCARSTDVal,
                                                                namer: ACCARNameVal,
                                                                dro: ACCADRO,
                                                                thkrn: ACCATHKRN,
                                                                cr2: ACCACR2,

                                                                a3: ACCAA3,
                                                                bs: ACCABS,

                                                                ds: ACCADS.toFixed(4),
                                                                cs1: ACCACS1.toFixed(4),
                                                                rsel: ACCARSEL.toFixed(4),
                                                                ost: ACCAOST.toFixed(4),
                                                                os: ACCAOS.toFixed(4),
                                                                ost1: ACCAOST1.toFixed(4),

                                                                dp: ACCADP.toFixed(4),
                                                                cp1: ACCACP1.toFixed(4),
                                                                rpel: ACCARPEL.toFixed(4),
                                                                opt: ACCAOPT.toFixed(4),
                                                                op: ACCAOP.toFixed(4),
                                                                opt1: ACCAOPT1.toFixed(4),

                                                                dr: ACCADR.toFixed(4),
                                                                cr1: ACCACR1.toFixed(4),
                                                                rrel: ACCARREL.toFixed(4),
                                                                ort: ACCAORT.toFixed(4),
                                                                or: ACCAOR.toFixed(4),
                                                                ort1: ACCAORT1.toFixed(4),

                                                                pc: ACCAPC.toFixed(4),

                                                                cs: ACCACS.toFixed(4),
                                                                thkse: ACCATHKSE.toFixed(4),
                                                                dsi2hsi: ACCADSI2HSI.toFixed(4),
                                                                k: ACCAK.toFixed(4),
                                                                dso2hso: ACCADSO2HSO.toFixed(4),
                                                                k1: ACCAK1.toFixed(4),
                                                                asm: ACCAASM.toFixed(4),
                                                                bsm: ACCABSM.toFixed(4),
                                                                h: ACCAH.toFixed(4),
                                                                theta: ACCATHETA.toFixed(4),

                                                                cp: ACCACP.toFixed(4),
                                                                thkpe: ACCATHKPE.toFixed(4),
                                                                dpc: ACCADPC.toFixed(4),
                                                                sa: ACCASA.toFixed(4),
                                                                sb: ACCASB.toFixed(4),
                                                                ks: ACCAKS.toFixed(4),
                                                                dop: ACCADOP.toFixed(4),
                                                                fp: ACCAFP.toFixed(4),

                                                                cr: ACCACR.toFixed(4),
                                                                thkre: ACCATHKRE.toFixed(4),
                                                                fr: ACCAFR.toFixed(4),

                                                                thksc: ACCATHKSC.toFixed(4),
                                                                thksmin: ACCATHKSMIN.toFixed(4),
                                                                thksd: ACCATHKSD.toFixed(4),
                                                                thkschk: ACCATHKSCHK,

                                                                thkpc: ACCATHKPC.toFixed(4),
                                                                thkpd: ACCATHKPD.toFixed(4),
                                                                thkpchk: ACCATHKPCHK,

                                                                ba: ACCABA.toFixed(4),
                                                                bb: ACCABB.toFixed(4),
                                                                a1: ACCAA1.toFixed(4),
                                                                hp1: ACCAHP1.toFixed(4),
                                                                hp2: ACCAHP2.toFixed(4),
                                                                a2: ACCAA2.toFixed(4),
                                                                dre: ACCADRE.toFixed(4),
                                                                a4: ACCAA4.toFixed(4),
                                                                ae: ACCAAE.toFixed(4),
                                                                achk: ACCAACHK,

                                                                eta: ACCAETA.toFixed(4),
                                                                pst: ACCAPST.toFixed(4),
                                                                ppt: ACCAPPT.toFixed(4),
                                                                pt: ACCAPT.toFixed(4),

                                                                mawps: ACCAMAWPS.toFixed(4),
                                                                mawpp: ACCAMAWPP.toFixed(4),
                                                                mawpa1: ACCAMAWPA1.toFixed(0),
                                                                mawpa2: ACCAMAWPA2.toFixed(0),
                                                                mawpa3: ACCAMAWPA3,
                                                                mawpa4: ACCAMAWPA4.toFixed(0),
                                                                mawpa: ACCAMAWPA.toFixed(0),
                                                                mawpae: ACCAMAWPAE.toFixed(0),
                                                                mawpr: ACCAMAWPR.toFixed(4),
                                                                mawp: ACCAMAWP.toFixed(4)
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
                                                                    ACCAPayJS.dialog({
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
                                                                                ACCAPayJS.dialog("close");
                                                                                ACCAPayJS.dialog("clear");
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
                                                                                            ACCAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACCAPayJS.dialog('close');
                                                                                                    ACCAPayJS.dialog('clear');
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
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 34).hide();
                pg.propertygrid('options').finder.getTr(this, 35).hide();
                pg.propertygrid('options').finder.getTr(this, 36).hide();
                pg.propertygrid('options').finder.getTr(this, 37).hide();
                pg.propertygrid('options').finder.getTr(this, 40).hide();
            }
        });
    });
});