$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let acdaSketch = $("#d2");
    let acdaModel = $("#d3");
    let acdad2d3 = $('#d2d3');

    $("#cal").html("<table id='acda'></table>");
    let pg = $("#acda");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/d/a/ACDA.json", function (result) {

        let ACDADT,
            ACDASCategory, ACDASCategoryVal, ACDASType, ACDASTypeVal, ACDASSTD, ACDASSTDVal, ACDASName, ACDASNameVal,
            ACDAPCategory, ACDAPCategoryVal, ACDAPType, ACDAPTypeVal, ACDAPSTD, ACDAPSTDVal, ACDAPName, ACDAPNameVal,
            ACDARCategory, ACDARCategoryVal, ACDARType, ACDARTypeVal, ACDARSTD, ACDARSTDVal, ACDARName, ACDARNameVal,
            columns, rows, ed;

        // 壳体内径
        function acda2d(idod, dsi = "ΦDsi", dso = "ΦDso", brsi = "Rsi", brso = "Rso", srsi = "rsi", srso = "rso", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α", beta = "β", l = "L",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            acdaSketch.empty();
            let width = acdaSketch.width();
            let height = acdaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACDASVG").attr("height", height);

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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACDASketchDRO");
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
                ])).attr("id", "ACDASketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACDASketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACDASketchDPO");

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
            ])).attr("id", "ACDASketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDASketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "ACDASketchHPI");

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACDASketchHPO");

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
            ])).attr("id", "ACDASketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDASketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ).classed("sketch", true).attr("id", "ACDASketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDASketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "ACDASketchL").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDASketchL")
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
            ).classed("sketch", true).attr("id", "ACDASketchBETA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACDASketchBETA").attr("startOffset", "50%").text(beta);

            // dsi dso brsi srsi brso srso 因为封头是单线图，所以这四个尺寸没有在 sketch 中表示出来
            if (idod === "内径") {

            }
            else if (idod === "外径") {

            }
        }

        currentTabIndex = acdad2d3.tabs('getTabIndex', acdad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            acda2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#acda").length > 0) {
                    acda2d();
                }
            });
        }
        acdad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    acda2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#acda").length > 0) {
                            acda2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 碟形封头插入式接管补强计算",
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
                    || index === 33 || index === 34 || index === 35 || index === 36 || index === 37 || index === 38 || index === 39
                    || index === 42) {
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
                    $(ed.target).combobox("loadData", ACDASCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ACDASType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACDASSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACDASName);
                }

                else if (index === 19) {
                    $(ed.target).combobox("loadData", ACDAPCategory);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", ACDAPType);
                }
                else if (index === 21) {
                    $(ed.target).combobox("loadData", ACDAPSTD);
                }
                else if (index === 22) {
                    $(ed.target).combobox("loadData", ACDAPName);
                }

                else if (index === 33) {
                    $(ed.target).combobox("loadData", ACDARCategory);
                }
                else if (index === 34) {
                    $(ed.target).combobox("loadData", ACDARType);
                }
                else if (index === 35) {
                    $(ed.target).combobox("loadData", ACDARSTD);
                }
                else if (index === 36) {
                    $(ed.target).combobox("loadData", ACDARName);
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
                    acdaSketch.empty();
                    acdaModel.empty();

                    // sketch
                    currentTabIndex = acdad2d3.tabs('getTabIndex', acdad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        acda2d();
                        acdaSketch.off("resize").on("resize", function () {
                            if ($("#acda").length > 0) {
                                acda2d();
                            }
                        });
                    }
                    acdad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acda2d();
                                acdaSketch.off("resize").on("resize", function () {
                                    if ($("#acda").length > 0) {
                                        acda2d();
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

                        ACDADT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ACDASCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACDASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACDASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACDASName = null;

                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        ACDAPCategory = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACDAPType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        ACDAPSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        ACDAPName = null;

                        rows[33][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 33);
                        ACDARCategory = null;
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACDARType = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        ACDARSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        ACDARName = null;

                        if (rows[32][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                            pg.propertygrid('options').finder.getTr(this, 34).hide();
                            pg.propertygrid('options').finder.getTr(this, 35).hide();
                            pg.propertygrid('options').finder.getTr(this, 36).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDASCategory = [];
                                ACDAPCategory = [];
                                ACDARCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACDADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACDASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACDAPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACDARCategory[index] = {
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

                        ACDASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACDASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACDASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACDASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDASCategoryVal,
                                temp: ACDADT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDASType = [];
                                $(result).each(function (index, element) {
                                    ACDASType[index] = {
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

                        ACDASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACDASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACDASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDASCategoryVal,
                                type: ACDASTypeVal,
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDASSTD = [];
                                $(result).each(function (index, element) {
                                    ACDASSTD[index] = {
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

                        ACDASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACDASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDASCategoryVal,
                                type: ACDASTypeVal,
                                std: ACDASSTDVal,
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDASName = [];
                                $(result).each(function (index, element) {
                                    ACDASName[index] = {
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

                        ACDAPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        ACDAPType = null;
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        ACDAPSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        ACDAPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDAPCategoryVal,
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDAPType = [];
                                $(result).each(function (index, element) {
                                    ACDAPType[index] = {
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

                        ACDAPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[21][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 21);
                        ACDAPSTD = null;
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        ACDAPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDAPCategoryVal,
                                type: ACDAPTypeVal,
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDAPSTD = [];
                                $(result).each(function (index, element) {
                                    ACDAPSTD[index] = {
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

                        ACDAPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[22][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 22);
                        ACDAPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDAPCategoryVal,
                                type: ACDAPTypeVal,
                                std: ACDAPSTDVal,
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDAPName = [];
                                $(result).each(function (index, element) {
                                    ACDAPName[index] = {
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
                    if (index === 33) {

                        ACDARCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[34][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 34);
                        ACDARType = null;
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        ACDARSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        ACDARName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDARCategoryVal,
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDARType = [];
                                $(result).each(function (index, element) {
                                    ACDARType[index] = {
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
                    if (index === 34) {

                        ACDARTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[35][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 35);
                        ACDARSTD = null;
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        ACDARName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDARCategoryVal,
                                type: ACDARTypeVal,
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDARSTD = [];
                                $(result).each(function (index, element) {
                                    ACDARSTD[index] = {
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
                    if (index === 35) {

                        ACDARSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[36][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 36);
                        ACDARName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACDARCategoryVal,
                                type: ACDARTypeVal,
                                std: ACDARSTDVal,
                                temp: ACDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACDARName = [];
                                $(result).each(function (index, element) {
                                    ACDARName[index] = {
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
                    if (index === 32) {
                        if (rows[32][columns[0][1].field] === "是") {
                            pg.propertygrid('options').finder.getTr(this, 33).show();
                            pg.propertygrid('options').finder.getTr(this, 34).show();
                            pg.propertygrid('options').finder.getTr(this, 35).show();
                            pg.propertygrid('options').finder.getTr(this, 36).show();
                            pg.propertygrid('options').finder.getTr(this, 37).show();
                            pg.propertygrid('options').finder.getTr(this, 38).show();
                            pg.propertygrid('options').finder.getTr(this, 39).show();
                        }
                        else if (rows[32][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                            pg.propertygrid('options').finder.getTr(this, 34).hide();
                            pg.propertygrid('options').finder.getTr(this, 35).hide();
                            pg.propertygrid('options').finder.getTr(this, 36).hide();
                            pg.propertygrid('options').finder.getTr(this, 37).hide();
                            pg.propertygrid('options').finder.getTr(this, 38).hide();
                            pg.propertygrid('options').finder.getTr(this, 39).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsB
                    if (index === 41) {
                        if (rows[41][columns[0][1].field] === "是") {
                            pg.datagrid('options').finder.getTr(this, 42).show();
                        }
                        else if (rows[41][columns[0][1].field] === "否") {
                            pg.datagrid('options').finder.getTr(this, 42).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    // Tag
                    let ACDATag = "符号标记";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACDATag = rows[0][columns[0][1].field];
                    }

                    // 设计压力
                    let ACDAPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACDAPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACDAPS;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        ACDAPS = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACDATest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACDATest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 碟形封头材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        ACDASNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取碟形封头材料密度、最大最小厚度
                    let ACDADS, ACDASThkMin, ACDASThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACDASCategoryVal,
                            "type": ACDASTypeVal,
                            "std": ACDASSTDVal,
                            "name": ACDASNameVal,
                            "temp": ACDADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACDADS = parseFloat(result.density);
                            ACDASThkMin = parseFloat(result.thkMin);
                            ACDASThkMax = parseFloat(result.thkMax);

                            // IDOD
                            let ACDAIDOD;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                ACDAIDOD = rows[9][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acda2d(ACDAIDOD);
                                acdaSketch.off("resize").on("resize", function () {
                                    if ($("#acda").length > 0) {
                                        acda2d(ACDAIDOD);
                                    }
                                });
                            }
                            acdad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acda2d(ACDAIDOD);
                                        acdaSketch.off("resize").on("resize", function () {
                                            if ($("#acda").length > 0) {
                                                acda2d(ACDAIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACDADSI = -1, ACDADSO = -1, ACDABRSI = -1, ACDABRSO = -1, ACDASRSI = -1, ACDASRSO = -1;
                            if (ACDAIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    ACDADSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO);
                                    acdaSketch.off("resize").on("resize", function () {
                                        if ($("#acda").length > 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO);
                                        }
                                    });
                                }
                                acdad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO);
                                            acdaSketch.off("resize").on("resize", function () {
                                                if ($("#acda").length > 0) {
                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) <= ACDADSI) {
                                    ACDABRSI = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                    && parseFloat(rows[11][columns[0][1].field]) > ACDADSI) {
                                    south.html("球冠区内半径不能大于 " + ACDADSI + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO);
                                    acdaSketch.off("resize").on("resize", function () {
                                        if ($("#acda").length > 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO);
                                        }
                                    });
                                }
                                acdad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO);
                                            acdaSketch.off("resize").on("resize", function () {
                                                if ($("#acda").length > 0) {
                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                    && parseFloat(rows[12][columns[0][1].field]) >= 0.1 * ACDADSI) {
                                    ACDASRSI = parseFloat(rows[12][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                    && parseFloat(rows[12][columns[0][1].field]) < 0.1 * ACDADSI) {
                                    south.html("转角内半径不能小于 " + 0.1 * ACDADSI + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO);
                                    acdaSketch.off("resize").on("resize", function () {
                                        if ($("#acda").length > 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO);
                                        }
                                    });
                                }
                                acdad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO);
                                            acdaSketch.off("resize").on("resize", function () {
                                                if ($("#acda").length > 0) {
                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else if (ACDAIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                    ACDADSO = parseFloat(rows[13][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO);
                                    acdaSketch.off("resize").on("resize", function () {
                                        if ($("#acda").length > 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO);
                                        }
                                    });
                                }
                                acdad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO);
                                            acdaSketch.off("resize").on("resize", function () {
                                                if ($("#acda").length > 0) {
                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                    && parseFloat(rows[14][columns[0][1].field]) <= ACDADSO) {
                                    ACDABRSO = parseFloat(rows[14][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                    && parseFloat(rows[14][columns[0][1].field]) > ACDADSO) {
                                    south.html("球冠区外半径不能大于 " + ACDADSO + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO);
                                    acdaSketch.off("resize").on("resize", function () {
                                        if ($("#acda").length > 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO);
                                        }
                                    });
                                }
                                acdad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO);
                                            acdaSketch.off("resize").on("resize", function () {
                                                if ($("#acda").length > 0) {
                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO);
                                                }
                                            });
                                        }
                                    }
                                });

                                if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                    && parseFloat(rows[15][columns[0][1].field]) >= 0.1 * ACDADSO) {
                                    ACDASRSO = parseFloat(rows[15][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                    && parseFloat(rows[15][columns[0][1].field]) < 0.1 * ACDADSO) {
                                    south.html("转角外半径不能小于 " + 0.1 * ACDADSO + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO);
                                    acdaSketch.off("resize").on("resize", function () {
                                        if ($("#acda").length > 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO);
                                        }
                                    });
                                }
                                acdad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO);
                                            acdaSketch.off("resize").on("resize", function () {
                                                if ($("#acda").length > 0) {
                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO);
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
                            let ACDATHKSN;
                            if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                && parseFloat(rows[16][columns[0][1].field]) > ACDASThkMin
                                && parseFloat(rows[16][columns[0][1].field]) <= Math.min(ACDASThkMax, Math.max(ACDASRSI, ACDASRSO) / 3)) {
                                ACDATHKSN = parseFloat(rows[16][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                && parseFloat(rows[16][columns[0][1].field]) <= ACDASThkMin) {
                                south.html("碟形封头材料厚度不能小于等于 " + ACDASThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                && parseFloat(rows[16][columns[0][1].field]) > Math.min(ACDASThkMax, Math.max(ACDASRSI, ACDASRSO) / 3)) {
                                south.html("碟形封头材料厚度不能大于 " + Math.min(ACDASThkMax, Math.max(ACDASRSI, ACDASRSO) / 3).toFixed(2) + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                    ACDATHKSN);
                                acdaSketch.off("resize").on("resize", function () {
                                    if ($("#acda").length > 0) {
                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                            ACDATHKSN);
                                    }
                                });
                            }
                            acdad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                            ACDATHKSN);
                                        acdaSketch.off("resize").on("resize", function () {
                                            if ($("#acda").length > 0) {
                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                    ACDATHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 输入内径时补齐外径，输入外径时补齐内径
                            if (ACDAIDOD === "内径") {
                                ACDADSO = ACDADSI + 2 * ACDATHKSN;
                                ACDABRSO = ACDABRSI + ACDATHKSN;
                                ACDASRSO = ACDASRSI + ACDATHKSN;
                            }
                            else if (ACDAIDOD === "外径") {
                                ACDADSI = ACDADSO - 2 * ACDATHKSN;
                                ACDABRSI = ACDABRSO - ACDATHKSN;
                                ACDASRSI = ACDASRSO - ACDATHKSN;
                            }
                            else {
                                return false;
                            }

                            /*
                            获取碟形封头力学特性
                             */
                            let ACDAOST, ACDAOS, ACDAOST1, ACDARSEL, ACDACS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": ACDASCategoryVal,
                                    "type": ACDASTypeVal,
                                    "std": ACDASSTDVal,
                                    "name": ACDASNameVal,
                                    "thk": ACDATHKSN,
                                    "temp": ACDADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACDADSO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACDAOST = parseFloat(result.ot);
                                    if (ACDAOST < 0) {
                                        south.html("查询碟形封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACDAOS = parseFloat(result.o);
                                    if (ACDAOS < 0) {
                                        south.html("查询碟形封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACDARSEL = parseFloat(result.rel);
                                    if (ACDARSEL < 0) {
                                        south.html("查询碟形封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACDACS1 = parseFloat(result.c1);
                                    if (ACDACS1 < 0) {
                                        south.html("查询碟形封头材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACDAOST1 = parseFloat(result.ot1);

                                    let ACDACS2;
                                    if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                        && parseFloat(rows[17][columns[0][1].field]) < ACDATHKSN) {
                                        ACDACS2 = parseFloat(rows[17][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])
                                        && parseFloat(rows[17][columns[0][1].field]) >= ACDATHKSN) {
                                        south.html("碟形封头腐蚀裕量不能大于等于 " + ACDATHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACDAES;
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        ACDAES = parseFloat(rows[18][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                        ACDAPNameVal = rows[22][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACDADP, ACDAPThkMin, ACDAPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACDAPCategoryVal,
                                            "type": ACDAPTypeVal,
                                            "std": ACDAPSTDVal,
                                            "name": ACDAPNameVal,
                                            "temp": ACDADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACDADP = parseFloat(result.density);
                                            ACDAPThkMin = parseFloat(result.thkMin);
                                            ACDAPThkMax = parseFloat(result.thkMax);

                                            let ACDADPO;
                                            if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                ACDADPO = parseFloat(rows[23][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                    ACDATHKSN, "Φ" + ACDADPO);
                                                acdaSketch.off("resize").on("resize", function () {
                                                    if ($("#acda").length > 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO);
                                                    }
                                                });
                                            }
                                            acdad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO);
                                                        acdaSketch.off("resize").on("resize", function () {
                                                            if ($("#acda").length > 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKPN
                                            let ACDATHKPN;
                                            if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field]) > ACDAPThkMin
                                                && parseFloat(rows[24][columns[0][1].field]) <= Math.min(ACDAPThkMax, ACDADPO / 2)) {
                                                ACDATHKPN = parseFloat(rows[24][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field]) <= ACDAPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACDAPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                && parseFloat(rows[24][columns[0][1].field]) > Math.min(ACDAPThkMax, ACDADPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACDAPThkMax, ACDADPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN);
                                                acdaSketch.off("resize").on("resize", function () {
                                                    if ($("#acda").length > 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN);
                                                    }
                                                });
                                            }
                                            acdad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN);
                                                        acdaSketch.off("resize").on("resize", function () {
                                                            if ($("#acda").length > 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACDAOPT, ACDAOP, ACDAOPT1, ACDARPEL, ACDACP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACDAPCategoryVal,
                                                    "type": ACDAPTypeVal,
                                                    "std": ACDAPSTDVal,
                                                    "name": ACDAPNameVal,
                                                    "thk": ACDATHKPN,
                                                    "temp": ACDADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACDADPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACDAOPT = parseFloat(result.ot);
                                                    if (ACDAOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACDAOP = parseFloat(result.o);
                                                    if (ACDAOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACDARPEL = parseFloat(result.rel);
                                                    if (ACDARPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACDACP1 = parseFloat(result.c1);
                                                    if (ACDACP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACDAOPT1 = parseFloat(result.ot1);

                                                    let ACDAHPO;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        ACDAHPO = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO);
                                                        acdaSketch.off("resize").on("resize", function () {
                                                            if ($("#acda").length > 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO);
                                                            }
                                                        });
                                                    }
                                                    acdad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO);
                                                                acdaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acda").length > 0) {
                                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDAHPI;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                        ACDAHPI = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI);
                                                        acdaSketch.off("resize").on("resize", function () {
                                                            if ($("#acda").length > 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI);
                                                            }
                                                        });
                                                    }
                                                    acdad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI);
                                                                acdaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acda").length > 0) {
                                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDAALPHA;
                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                        ACDAALPHA = parseFloat(rows[27][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°");
                                                        acdaSketch.off("resize").on("resize", function () {
                                                            if ($("#acda").length > 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    acdad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°");
                                                                acdaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acda").length > 0) {
                                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDABETA;
                                                    if (!jQuery.isEmptyObject(rows[28][columns[0][1].field])) {
                                                        ACDABETA = parseFloat(rows[28][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°");
                                                        acdaSketch.off("resize").on("resize", function () {
                                                            if ($("#acda").length > 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°");
                                                            }
                                                        });
                                                    }
                                                    acdad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°");
                                                                acdaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acda").length > 0) {
                                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDAL;
                                                    if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                        && parseFloat(rows[29][columns[0][1].field]) < (ACDADSO - ACDADPO) / 2) {
                                                        ACDAL = parseFloat(rows[29][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])
                                                        && parseFloat(rows[29][columns[0][1].field]) >= (ACDADSO - ACDADPO) / 2) {
                                                        south.html("开孔中心到封头轴线距离 L 不能大于等于 " + (ACDADSO - ACDADPO) / 2 + " mm!").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL);
                                                        acdaSketch.off("resize").on("resize", function () {
                                                            if ($("#acda").length > 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL);
                                                            }
                                                        });
                                                    }
                                                    acdad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL);
                                                                acdaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acda").length > 0) {
                                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDACP2;
                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                        && parseFloat(rows[30][columns[0][1].field]) < ACDATHKPN) {
                                                        ACDACP2 = parseFloat(rows[30][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                        && parseFloat(rows[30][columns[0][1].field]) >= ACDATHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACDATHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACDAEP;
                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                        ACDAEP = parseFloat(rows[31][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACDAIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])) {
                                                        ACDAIsPAD = rows[32][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                            ACDAIsPAD);
                                                        acdaSketch.off("resize").on("resize", function () {
                                                            if ($("#acda").length > 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                    ACDAIsPAD);
                                                            }
                                                        });
                                                    }
                                                    acdad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                    ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                    ACDAIsPAD);
                                                                acdaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acda").length > 0) {
                                                                        acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                            ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                            ACDAIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACDADR = -1.0, ACDARThkMin = -1.0, ACDARThkMax = -1.0;
                                                    let ACDADRO = -1.0, ACDATHKRN = -1.0, ACDACR2 = -1.0;
                                                    let ACDAORT = -1.0, ACDAOR = -1.0, ACDAORT1 = -1.0, ACDARREL = -1.0,
                                                        ACDACR1 = -1.0;
                                                    if (ACDAIsPAD === "是") {

                                                        if (ACDATHKSN > 38) {
                                                            south.html("碟形封头厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (ACDASCategoryVal === "碳素钢和低合金钢" && ACDARSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                            ACDARNameVal = rows[36][columns[0][1].field];
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
                                                                "category": ACDARCategoryVal,
                                                                "type": ACDARTypeVal,
                                                                "std": ACDARSTDVal,
                                                                "name": ACDARNameVal,
                                                                "temp": ACDADT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACDADR = parseFloat(result.density);
                                                                ACDARThkMin = parseFloat(result.thkMin);
                                                                ACDARThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                    && parseFloat(rows[37][columns[0][1].field]) > ACDADPO) {
                                                                    ACDADRO = parseFloat(rows[37][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[37][columns[0][1].field])
                                                                    && parseFloat(rows[37][columns[0][1].field]) <= ACDADPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACDADPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                        ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                        ACDAIsPAD, "Φ" + ACDADRO);
                                                                    acdaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acda").length > 0) {
                                                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                                ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                                ACDAIsPAD, "Φ" + ACDADRO);
                                                                        }
                                                                    });
                                                                }
                                                                acdad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                                ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                                ACDAIsPAD, "Φ" + ACDADRO);
                                                                            acdaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acda").length > 0) {
                                                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                                        ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                                        ACDAIsPAD, "Φ" + ACDADRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                    && parseFloat(rows[38][columns[0][1].field]) > ACDARThkMin
                                                                    && parseFloat(rows[38][columns[0][1].field]) <= Math.min(ACDARThkMax, 1.5 * ACDATHKSN)) {
                                                                    ACDATHKRN = parseFloat(rows[38][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                    && parseFloat(rows[38][columns[0][1].field]) <= ACDARThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACDARThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[38][columns[0][1].field])
                                                                    && parseFloat(rows[38][columns[0][1].field]) > Math.min(ACDARThkMax, 1.5 * ACDATHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACDARThkMax, 1.5 * ACDATHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                        ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                        ACDAIsPAD, "Φ" + ACDADRO, ACDATHKRN);
                                                                    acdaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acda").length > 0) {
                                                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                                ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                                ACDAIsPAD, "Φ" + ACDADRO, ACDATHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                acdad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                                ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                                ACDAIsPAD, "Φ" + ACDADRO, ACDATHKRN);
                                                                            acdaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acda").length > 0) {
                                                                                    acda2d(ACDAIDOD, "Φ" + ACDADSI, "Φ" + ACDADSO, "R" + ACDABRSI, "R" + ACDABRSO, "R" + ACDASRSI, "R" + ACDASRSO,
                                                                                        ACDATHKSN, "Φ" + ACDADPO, ACDATHKPN, ACDAHPO, ACDAHPI, ACDAALPHA + "°", ACDABETA + "°", ACDAL,
                                                                                        ACDAIsPAD, "Φ" + ACDADRO, ACDATHKRN);
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
                                                                        "category": ACDARCategoryVal,
                                                                        "type": ACDARTypeVal,
                                                                        "std": ACDARSTDVal,
                                                                        "name": ACDARNameVal,
                                                                        "thk": ACDATHKRN,
                                                                        "temp": ACDADT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACDADRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACDAORT = parseFloat(result.ot);
                                                                        if (ACDAORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACDAOR = parseFloat(result.o);
                                                                        if (ACDAOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACDARREL = parseFloat(result.rel);
                                                                        if (ACDARREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACDACR1 = parseFloat(result.c1);
                                                                        if (ACDACR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACDAORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[39][columns[0][1].field])
                                                                            && parseFloat(rows[39][columns[0][1].field]) < ACDATHKRN) {
                                                                            ACDACR2 = parseFloat(rows[39][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[39][columns[0][1].field])
                                                                            && parseFloat(rows[39][columns[0][1].field]) >= ACDATHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACDATHKRN + " mm").css("color", "red");
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
                                                        if (ACDACR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACDAA3;
                                                    if (!jQuery.isEmptyObject(rows[40][columns[0][1].field])) {
                                                        ACDAA3 = parseFloat(rows[40][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACDAIsB;
                                                    if (!jQuery.isEmptyObject(rows[41][columns[0][1].field])) {
                                                        ACDAIsB = rows[41][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACDABS = -1.0;
                                                    if (ACDAIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[42][columns[0][1].field]) > ACDADPO) {
                                                            ACDABS = parseFloat(rows[42][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[42][columns[0][1].field]) <= ACDADPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACDADPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */

                                                    let ACDAPC = ACDAPD + ACDAPS;

                                                    // 碟形封头
                                                    let ACDACS = ACDACS1 + ACDACS2;
                                                    let ACDATHKSE = ACDATHKSN - ACDACS;
                                                    let ACDABRSISRSI = ACDABRSI / ACDASRSI;
                                                    let ACDAM = (3 + Math.sqrt(ACDABRSISRSI)) / 4;
                                                    let ACDADSM = (ACDADSI + ACDADSO) / 2;
                                                    let ACDABRSM = (ACDABRSI + ACDABRSO) / 2;
                                                    let ACDASRSM = (ACDASRSI + ACDASRSO) / 2;
                                                    let ACDADELTA = ACDABRSM / (ACDABRSM - ACDASRSM) * (ACDADSM / 2 - ACDASRSM);
                                                    let ACDATHETA;
                                                    if (ACDAL <= ACDADELTA) {
                                                        ACDATHETA = Math.asin(ACDAL / ACDABRSM) / Math.PI * 180;
                                                    }
                                                    else {
                                                        ACDATHETA = Math.asin((ACDAL - ACDADSM / 2 + ACDASRSM) / ACDASRSM) / Math.PI * 180;
                                                    }

                                                    // 接管
                                                    let ACDACP = ACDACP1 + ACDACP2;
                                                    let ACDATHKPE = ACDATHKPN - ACDACP;
                                                    let ACDADPC = ACDADPO - 2 * ACDATHKPN + 2 * ACDACP;
                                                    let ACDASA = ACDADPC / Math.cos(ACDABETA / 180 * Math.PI);
                                                    let ACDASB = ACDADPC / Math.cos(Math.abs(ACDAALPHA - ACDATHETA) / 180 * Math.PI);
                                                    let ACDAKS = Math.max(ACDASA / ACDASB, ACDASB / ACDASA);
                                                    if (ACDAKS > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACDADOP = Math.max(ACDASA, ACDASB);
                                                    if (ACDADOP > ACDADSI / 2) {
                                                        south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                        return false;
                                                    }
                                                    let ACDAFP = Math.min(1.0, ACDAOPT / ACDAOST);

                                                    // 补强圈
                                                    let ACDACR = -1.0, ACDATHKRE = -1.0, ACDAFR = -1.0;
                                                    if (ACDAIsPAD === "是") {
                                                        ACDACR = ACDACR1 + ACDACR2;
                                                        ACDATHKRE = ACDATHKRN - ACDACR;
                                                        ACDAFR = Math.min(1.0, ACDAORT / ACDAOST);
                                                    }

                                                    /*
                                                    碟形封头内压强度校核
                                                     */
                                                    let ACDATHKSC;
                                                    if (ACDAIDOD === "内径") {
                                                        if (ACDAL <= ACDADELTA) {
                                                            ACDATHKSC = ACDAPC * ACDABRSI / (2 * ACDAOST * ACDAES - 0.5 * ACDAPC);
                                                        }
                                                        else {
                                                            ACDATHKSC = ACDAM * ACDAPC * ACDABRSI / (2 * ACDAOST * ACDAES - 0.5 * ACDAPC);
                                                        }
                                                    }
                                                    else if (ACDAIDOD === "外径") {
                                                        if (ACDAL <= ACDADELTA) {
                                                            ACDATHKSC = ACDAPC * ACDABRSI / (2 * ACDAOST * ACDAES - 0.5 * ACDAPC);
                                                        }
                                                        else {
                                                            ACDATHKSC = ACDAM * ACDAPC * ACDABRSO / (2 * ACDAOST * ACDAES + (ACDAM - 0.5) * ACDAPC);
                                                        }
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACDATHKSMIN;
                                                    if (ACDABRSISRSI <= 5.5) {
                                                        ACDATHKSMIN = 0.0015 * ACDADSI;
                                                    }
                                                    else {
                                                        ACDATHKSMIN = 0.003 * ACDADSI;
                                                    }
                                                    let ACDATHKSD = Math.max(ACDATHKSC, ACDATHKSMIN) + ACDACS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "碟形封头内压所需厚度：" + (ACDATHKSD + ACDACS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACDATHKSCHK;
                                                    if (ACDATHKSN >= (ACDATHKSD + ACDACS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACDATHKSN + " mm" +
                                                            "</span>");
                                                        ACDATHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACDATHKSN + " mm" +
                                                            "</span>");
                                                        ACDATHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACDATHKPC = ACDAPC * ACDADPO / (2 * ACDAOPT * ACDAEP + ACDAPC);
                                                    let ACDATHKPD = ACDATHKPC + ACDACP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACDATHKPD + ACDACP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACDATHKPCHK;
                                                    if (ACDATHKPN >= (ACDATHKPD + ACDACP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACDATHKPN + " mm" +
                                                            "</span>");
                                                        ACDATHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACDATHKPN + " mm" +
                                                            "</span>");
                                                        ACDATHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACDABA = ACDADOP * ACDATHKSC + 2 * ACDATHKSC * ACDATHKPE * (1 - ACDAFP);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACDABA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 碟形封头
                                                    let ACDABB;
                                                    if (ACDAIsB === "是") {
                                                        ACDABB = Math.min(Math.max(2 * ACDADOP, ACDADOP + 2 * ACDATHKSN + 2 * ACDATHKPN), ACDABS);
                                                    }
                                                    else if (ACDAIsB === "否") {
                                                        ACDABB = Math.max(2 * ACDADOP, ACDADOP + 2 * ACDATHKSN + 2 * ACDATHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACDAA1 = (ACDABB - ACDADOP) * (ACDATHKSE - ACDATHKSC) - 2 * ACDATHKPE * (ACDATHKSE - ACDATHKSC) * (1 - ACDAFP);

                                                    // 接管
                                                    let ACDAHP1 = Math.min(ACDAHPO, Math.sqrt(ACDADOP * ACDATHKPN));
                                                    let ACDAHP2 = Math.min(ACDAHPI, Math.sqrt(ACDADOP * ACDATHKPN));
                                                    let ACDAA2 = 2 * ACDAHP1 * (ACDATHKPE - ACDATHKPC) * ACDAFP + 2 * ACDAHP2 * (ACDATHKPE - ACDACP2) * ACDAFP;

                                                    // 补强圈
                                                    let ACDAA4 = 0.0, ACDADRE = -1.0;
                                                    if (ACDAIsPAD === "是") {
                                                        ACDADRE = Math.min(ACDADRO, ACDABB);
                                                        ACDAA4 = (ACDADRE - ACDADPO) * ACDATHKRE * ACDAFR;
                                                    }

                                                    // Ae
                                                    let ACDAAE = ACDAA1 + ACDAA2 + ACDAA3 + ACDAA4;
                                                    let ACDAACHK;
                                                    if (ACDAAE >= ACDABA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACDAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACDAACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACDAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACDAACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACDAETA, ACDAPST, ACDAPPT, ACDAPT;
                                                    if (ACDATest === "液压试验") {
                                                        ACDAETA = 1.25;
                                                        ACDAPST = ACDAETA * ACDAPD * ACDAOS / Math.max(ACDAOST, ACDAOST1);
                                                        ACDAPPT = ACDAETA * ACDAPD * ACDAOP / Math.max(ACDAOPT, ACDAOPT1);
                                                        ACDAPT = Math.min(ACDAPST, ACDAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACDAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACDATest === "气压试验") {
                                                        ACDAETA = 1.10;
                                                        ACDAPST = ACDAETA * ACDAPD * ACDAOS / Math.max(ACDAOST, ACDAOST1);
                                                        ACDAPPT = ACDAETA * ACDAPD * ACDAOP / Math.max(ACDAOPT, ACDAOPT1);
                                                        ACDAPT = Math.min(ACDAPST, ACDAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACDAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */

                                                    // 碟形封头
                                                    let ACDAMAWPS;
                                                    if (ACDAIDOD === "内径") {
                                                        ACDAMAWPS = 2 * ACDATHKSE * ACDAOST * ACDAES / (ACDAM * ACDABRSI + 0.5 * ACDATHKSE) - ACDAPS;
                                                    }
                                                    else if (ACDAIDOD === "外径") {
                                                        ACDAMAWPS = 2 * ACDATHKSE * ACDAOST * ACDAES / (ACDAM * ACDABRSO - (ACDAM - 0.5) * ACDATHKSE) - ACDAPS;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 接管
                                                    let ACDAMAWPP = 2 * ACDATHKPE * ACDAOPT * ACDAEP / (ACDADPO - ACDATHKPE) - ACDAPS;

                                                    // 开孔补强
                                                    let ACDAMAWPA1 = -1, ACDAMAWPA2 = -1,
                                                        ACDAMAWPA3 = ACDAA3, ACDAMAWPA4 = ACDAA4,
                                                        ACDAMAWPA = -1, ACDAMAWPAE = -1,
                                                        ACDAMAWPRC = ACDAPC;
                                                    let ACDAMAWPTHKSC, ACDAMAWPTHKPC;
                                                    while (ACDAMAWPAE >= ACDAMAWPA) {

                                                        ACDAMAWPRC += 0.0001;

                                                        // 碟形封头计算厚度
                                                        if (ACDAIDOD === "内径") {
                                                            if (ACDAL <= ACDADELTA) {
                                                                ACDAMAWPTHKSC = ACDAMAWPRC * ACDABRSI / (2 * ACDAOST * ACDAES - 0.5 * ACDAPC);
                                                            }
                                                            else {
                                                                ACDAMAWPTHKSC = ACDAMAWPRC * ACDAM * ACDABRSI / (2 * ACDAOST * ACDAES - 0.5 * ACDAPC);
                                                            }
                                                        }
                                                        else if (ACDAIDOD === "外径") {
                                                            if (ACDAL <= ACDADELTA) {
                                                                ACDAMAWPTHKSC = ACDAMAWPRC * ACDABRSI / (2 * ACDAOST * ACDAES - 0.5 * ACDAPC);
                                                            }
                                                            else {
                                                                ACDAMAWPTHKSC = ACDAMAWPRC * ACDAM * ACDABRSO / (2 * ACDAOST * ACDAES + (ACDAM - 0.5) * ACDAPC);
                                                            }
                                                        }
                                                        ACDAMAWPA = ACDADOP * ACDAMAWPTHKSC + 2 * ACDAMAWPTHKSC * ACDATHKPE * (1 - ACDAFP);

                                                        // 接管计算厚度
                                                        ACDAMAWPTHKPC = ACDAMAWPRC * ACDADPO / (2 * ACDAOPT * ACDAEP + ACDAPC);
                                                        ACDAMAWPA1 = (ACDABB - ACDADOP) * (ACDATHKSE - ACDAMAWPTHKSC) - 2 * ACDATHKPE * (ACDATHKSE - ACDAMAWPTHKSC) * (1 - ACDAFP);
                                                        ACDAMAWPA2 = 2 * ACDAHP1 * (ACDATHKPE - ACDAMAWPTHKPC) * ACDAFP + 2 * ACDAHP2 * (ACDATHKPE - ACDACP2) * ACDAFP;
                                                        ACDAMAWPAE = ACDAMAWPA1 + ACDAMAWPA2 + ACDAMAWPA3 + ACDAMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACDAMAWPR = ACDAMAWPRC - ACDAPS - 0.0001;
                                                    let ACDAMAWP = Math.min(ACDAMAWPS, ACDAMAWPP, ACDAMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACDAMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACDAPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "acdadocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACDA",

                                                                idod: ACDAIDOD,
                                                                isPad: ACDAIsPAD,
                                                                isB: ACDAIsB,

                                                                tag: ACDATag,

                                                                pd: ACDAPD,
                                                                t: ACDADT,
                                                                ps: ACDAPS,
                                                                test: ACDATest,

                                                                stds: ACDASSTDVal,
                                                                names: ACDASNameVal,
                                                                dsi: ACDADSI,
                                                                dso: ACDADSO,
                                                                brsi: ACDABRSI,
                                                                srsi: ACDASRSI,
                                                                brso: ACDABRSO,
                                                                srso: ACDASRSO,
                                                                thksn: ACDATHKSN,
                                                                cs2: ACDACS2,
                                                                es: ACDAES,

                                                                stdp: ACDAPSTDVal,
                                                                namep: ACDAPNameVal,
                                                                dpo: ACDADPO,
                                                                thkpn: ACDATHKPN,
                                                                hpo: ACDAHPO,
                                                                hpi: ACDAHPI,
                                                                alpha: ACDAALPHA,
                                                                beta: ACDABETA,
                                                                l: ACDAL,
                                                                cp2: ACDACP2,
                                                                ep: ACDAEP,

                                                                stdr: ACDARSTDVal,
                                                                namer: ACDARNameVal,
                                                                dro: ACDADRO,
                                                                thkrn: ACDATHKRN,
                                                                cr2: ACDACR2,

                                                                a3: ACDAA3,
                                                                bs: ACDABS,

                                                                ds: ACDADS.toFixed(4),
                                                                cs1: ACDACS1.toFixed(4),
                                                                rsel: ACDARSEL.toFixed(4),
                                                                ost: ACDAOST.toFixed(4),
                                                                os: ACDAOS.toFixed(4),
                                                                ost1: ACDAOST1.toFixed(4),

                                                                dp: ACDADP.toFixed(4),
                                                                cp1: ACDACP1.toFixed(4),
                                                                rpel: ACDARPEL.toFixed(4),
                                                                opt: ACDAOPT.toFixed(4),
                                                                op: ACDAOP.toFixed(4),
                                                                opt1: ACDAOPT1.toFixed(4),

                                                                dr: ACDADR.toFixed(4),
                                                                cr1: ACDACR1.toFixed(4),
                                                                rrel: ACDARREL.toFixed(4),
                                                                ort: ACDAORT.toFixed(4),
                                                                or: ACDAOR.toFixed(4),
                                                                ort1: ACDAORT1.toFixed(4),

                                                                pc: ACDAPC.toFixed(4),

                                                                cs: ACDACS.toFixed(4),
                                                                thkse: ACDATHKSE.toFixed(4),
                                                                brsisrsi: ACDABRSISRSI.toFixed(4),
                                                                m: ACDAM.toFixed(4),
                                                                dsm: ACDADSM.toFixed(4),
                                                                brsm: ACDABRSM.toFixed(4),
                                                                srsm: ACDASRSM.toFixed(4),
                                                                delta: ACDADELTA.toFixed(4),
                                                                theta: ACDATHETA.toFixed(4),

                                                                cp: ACDACP.toFixed(4),
                                                                thkpe: ACDATHKPE.toFixed(4),
                                                                dpc: ACDADPC.toFixed(4),
                                                                sa: ACDASA.toFixed(4),
                                                                sb: ACDASB.toFixed(4),
                                                                ks: ACDAKS.toFixed(4),
                                                                dop: ACDADOP.toFixed(4),
                                                                fp: ACDAFP.toFixed(4),

                                                                cr: ACDACR.toFixed(4),
                                                                thkre: ACDATHKRE.toFixed(4),
                                                                fr: ACDAFR.toFixed(4),

                                                                thksc: ACDATHKSC.toFixed(4),
                                                                thksmin: ACDATHKSMIN.toFixed(4),
                                                                thksd: ACDATHKSD.toFixed(4),
                                                                thkschk: ACDATHKSCHK,

                                                                thkpc: ACDATHKPC.toFixed(4),
                                                                thkpd: ACDATHKPD.toFixed(4),
                                                                thkpchk: ACDATHKPCHK,

                                                                ba: ACDABA.toFixed(4),
                                                                bb: ACDABB.toFixed(4),
                                                                a1: ACDAA1.toFixed(4),
                                                                hp1: ACDAHP1.toFixed(4),
                                                                hp2: ACDAHP2.toFixed(4),
                                                                a2: ACDAA2.toFixed(4),
                                                                dre: ACDADRE.toFixed(4),
                                                                a4: ACDAA4.toFixed(4),
                                                                ae: ACDAAE.toFixed(4),
                                                                achk: ACDAACHK,

                                                                eta: ACDAETA.toFixed(4),
                                                                pst: ACDAPST.toFixed(4),
                                                                ppt: ACDAPPT.toFixed(4),
                                                                pt: ACDAPT.toFixed(4),

                                                                mawps: ACDAMAWPS.toFixed(4),
                                                                mawpp: ACDAMAWPP.toFixed(4),
                                                                mawpa1: ACDAMAWPA1.toFixed(0),
                                                                mawpa2: ACDAMAWPA2.toFixed(0),
                                                                mawpa3: ACDAMAWPA3,
                                                                mawpa4: ACDAMAWPA4.toFixed(0),
                                                                mawpa: ACDAMAWPA.toFixed(0),
                                                                mawpae: ACDAMAWPAE.toFixed(0),
                                                                mawpr: ACDAMAWPR.toFixed(4),
                                                                mawp: ACDAMAWP.toFixed(4)
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
                                                                    ACDAPayJS.dialog({
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
                                                                                ACDAPayJS.dialog("close");
                                                                                ACDAPayJS.dialog("clear");
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
                                                                                            ACDAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACDAPayJS.dialog('close');
                                                                                                    ACDAPayJS.dialog('clear');
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

                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 34).hide();
                pg.propertygrid('options').finder.getTr(this, 35).hide();
                pg.propertygrid('options').finder.getTr(this, 36).hide();
                pg.propertygrid('options').finder.getTr(this, 37).hide();
                pg.propertygrid('options').finder.getTr(this, 38).hide();
                pg.propertygrid('options').finder.getTr(this, 39).hide();

                pg.propertygrid('options').finder.getTr(this, 42).hide();
            }
        });
    });
});