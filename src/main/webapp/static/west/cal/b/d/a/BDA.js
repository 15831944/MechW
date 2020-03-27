$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let bdaSketch = $("#d2");
    let bdaModel = $("#d3");
    let bdad2d3 = $('#d2d3');

    $("#cal").html("<table id='bda'></table>");
    let pg = $("#bda");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/b/d/a/BDA.json", function (result) {

        let BDADT,
            BDASCategory, BDASCategoryVal, BDASType, BDASTypeVal, BDASSTD, BDASSTDVal, BDASName, BDASNameVal,
            BDAPCategory, BDAPCategoryVal, BDAPType, BDAPTypeVal, BDAPSTD, BDAPSTDVal, BDAPName, BDAPNameVal,
            BDARCategory, BDARCategoryVal, BDARType, BDARTypeVal, BDARSTD, BDARSTDVal, BDARName, BDARNameVal,
            columns, rows, ed;

        function bda2d(dsi = "ΦDsi", thksn = "δsn",
                       dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α", l = "L",
                       isPad, dro = "Φdro", thkrn = "δrn") {

            bdaSketch.empty();
            let width = bdaSketch.width();
            let height = bdaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "BDASVG").attr("height", height);

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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "BDASketchDRO");
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
                ])).attr("id", "BDASketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#BDASketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "BDASketchDPO");

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
            ])).attr("id", "BDASketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDASketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "BDASketchHPI");

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "BDASketchHPO");

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
            ])).attr("id", "BDASketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDASketchTHKSN").attr("startOffset", "50%").text(thksn);

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
            ])).attr("id", "BDASketchDSI").classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDASketchDSI").attr("startOffset", "50%").text(dsi);

            // alpha
            let pr = thk;
            let cx0 = padding + 3 * wg;
            svg.append("path").attr("d", line([
                {x: padding + 2.5 * wg, y: padding + 2.5 * hg},
                {x: padding + 3.5 * wg, y: padding + 2.5 * hg},
                {x: padding + 3.5 * wg, y: padding + 3.5 * hg},
                {x: padding + 2.5 * wg, y: padding + 3.5 * hg},
                {x: padding + 2.5 * wg, y: padding + 2.5 * hg}
            ])).classed("sketch", true);
            drawCenterLine(padding + 2.5 * wg - 10, padding + 3 * hg, padding + 3.5 * wg + 10, padding + 3 * hg);
            svg.append("path").attr("d", line([
                {x: cx0 - pr, y: padding + 2.5 * hg + pr},
                {x: cx0 - pr, y: padding + 2 * hg},
                {x: cx0 + pr, y: padding + 2 * hg},
                {x: cx0 + pr, y: padding + 2.5 * hg - pr}
            ])).classed("sketch", true)
                .attr("transform", "rotate(" + 45 + ", " + (padding + 3 * wg) + " " + (padding + 2.5 * hg) + ")");
            svg.append("path").attr("d", line([
                {x: cx0, y: padding + 2 * hg - 20},
                {x: cx0, y: padding + 2.5 * hg + 10}
            ])).attr("stroke-dasharray", "25,5,5,5")
                .attr("transform", "rotate(" + 45 + ", " + (padding + 3 * wg) + " " + (padding + 2.5 * hg) + ")")
                .classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: cx0, y: padding + 2 * hg - 20},
                {x: cx0, y: padding + 2.5 * hg + 10}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: padding + 2 * hg - 10},
                    {x: padding + 3 * wg + 10, y: padding + 2 * hg - 10 - 2},
                    {x: padding + 3 * wg + 10, y: padding + 2 * hg - 10 + 2},
                    {x: padding + 3 * wg, y: padding + 2 * hg - 10}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: padding + 3 * wg, y: padding + 2 * hg - 10},
                    {x: padding + 3 * wg - 10, y: padding + 2 * hg - 10 - 2},
                    {x: padding + 3 * wg - 10, y: padding + 2 * hg - 10 + 2},
                    {x: padding + 3 * wg, y: padding + 2 * hg - 10}
                ])).attr("transform", "rotate(" + 45 + ", " + (padding + 3 * wg) + " " + (padding + 2.5 * hg) + ")");

            svg.append("path").attr("d", "M "
                + (padding + 3 * wg) + " " + (padding + 2 * hg - 10) + " "
                + "A" + (0.5 * hg + 10) + " " + (0.5 * hg + 10) + " "
                + "1 0 1" + " "
                + ((padding + 3 * wg) + (0.5 * hg + 10) * 0.707) + " " + (padding + 2.5 * hg - (0.5 * hg + 10) * 0.707)
            ).classed("sketch", true).attr("id", "BDASketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDASketchALPHA").attr("startOffset", "50%").text(alpha);

            // l
            let ri = 0.6 * Math.min(hg, wg);
            let xi = padding + 3 * wg;
            let yi = padding + hg;
            drawArc(ri, ri, xi, yi + ri, xi, yi - ri);
            drawArc(ri, ri, xi, yi - ri, xi, yi + ri);
            drawCenterLine(xi, yi + ri + 10, xi, yi - ri - 10);
            drawCenterLine(xi - ri - 10, yi, xi + ri + 10, yi);
            svg.append("path").attr("d", line([
                {x: xi + pr, y: yi - Math.sqrt(ri * ri - pr * pr)},
                {x: xi + pr, y: yi - ri - 2 * pr},
                {x: xi + 2 * pr, y: yi - ri - 2 * pr},
                {x: xi + 2 * pr, y: yi - Math.sqrt(ri * ri - 4 * pr * pr)}
            ])).classed("sketch", true);
            drawCenterLine(xi + 1.5 * pr, yi - ri - 2 * pr - 10, xi + 1.5 * pr, yi - Math.sqrt(ri * ri - 4 * pr * pr) + 10)

            extLineTopV(xi, yi - ri - 2 * pr - 10);
            extLineTopV(xi + 1.5 * pr, yi - ri - 2 * pr - 10);
            drawLine(xi, yi - ri - 2 * pr - 10 - 3, xi, yi - ri - 10 - 3);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xi + 1.5 * pr, y: yi - ri - 2 * pr - 10 - 30},
                    {x: xi + 1.5 * pr + 10, y: yi - ri - 2 * pr - 10 - 28},
                    {x: xi + 1.5 * pr + 10, y: yi - ri - 2 * pr - 10 - 32},
                    {x: xi + 1.5 * pr, y: yi - ri - 2 * pr - 10 - 30}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: xi, y: yi - ri - 2 * pr - 10 - 30},
                    {x: xi - 10, y: yi - ri - 2 * pr - 10 - 28},
                    {x: xi - 10, y: yi - ri - 2 * pr - 10 - 32},
                    {x: xi, y: yi - ri - 2 * pr - 10 - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: xi + 1.5 * pr + 10 + 10, y: yi - ri - 2 * pr - 10 - 30},
                {x: xi, y: yi - ri - 2 * pr - 10 - 30}
            ])).classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: xi - 10 - 40, y: yi - ri - 2 * pr - 10 - 30},
                {x: xi - 10, y: yi - ri - 2 * pr - 10 - 30}
            ])).attr("id", "BDASketchl").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#BDASketchl")
                .attr("startOffset", "50%").text(l);

        }

        currentTabIndex = bdad2d3.tabs('getTabIndex', bdad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            bda2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#bda").length > 0) {
                    bda2d();
                }
            });
        }
        bdad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    bda2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#bda").length > 0) {
                            bda2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "NB/T 47003.1-2009 圆筒插入式接管开孔补强",
            data: result,
            showHeader: false,
            showGroup: true,
            scrollbarSize: 0,
            autoRowHeight: true,
            columns: [[
                {
                    field: "name",
                    title: "名称",
                    width: 200,
                    resizable: true,
                    sortable: false,
                    align: "left"
                },
                {
                    field: 'value',
                    title: '值',
                    width: 123,
                    resizable: false,
                    sortable: false,
                    align: "center",
                    styler: function () {
                        return "color:#222222;";
                    }
                }
            ]],
            rowStyler: function (index) {
                if (index === 26 || index === 27 || index === 28
                    || index === 29 || index === 30 || index === 31 || index === 32
                    || index === 35) {
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
                    $(ed.target).combobox("loadData", BDASCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", BDASType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", BDASSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", BDASName);
                }

                else if (index === 13) {
                    $(ed.target).combobox("loadData", BDAPCategory);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", BDAPType);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", BDAPSTD);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", BDAPName);
                }

                else if (index === 26) {
                    $(ed.target).combobox("loadData", BDARCategory);
                }
                else if (index === 27) {
                    $(ed.target).combobox("loadData", BDARType);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", BDARSTD);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", BDARName);
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
                    bdaSketch.empty();
                    bdaModel.empty();

                    // sketch
                    currentTabIndex = bdad2d3.tabs('getTabIndex', bdad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        bda2d();
                        bdaSketch.off("resize").on("resize", function () {
                            if ($("#bda").length > 0) {
                                bda2d();
                            }
                        });
                    }
                    bdad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                bda2d();
                                bdaSketch.off("resize").on("resize", function () {
                                    if ($("#bda").length > 0) {
                                        bda2d();
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

                        BDADT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        BDASCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDASName = null;

                        rows[13][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 13);
                        BDAPCategory = null;
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BDAPType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDAPSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDAPName = null;

                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        BDARCategory = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BDARType = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDARSTD = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDARName = null;

                        if (rows[25][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 26).hide();
                            pg.propertygrid('options').finder.getTr(this, 27).hide();
                            pg.propertygrid('options').finder.getTr(this, 28).hide();
                            pg.propertygrid('options').finder.getTr(this, 29).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDASCategory = [];
                                BDAPCategory = [];
                                BDARCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + BDADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        BDASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDAPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        BDARCategory[index] = {
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

                        BDASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        BDASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDASCategoryVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDASType = [];
                                $(result).each(function (index, element) {
                                    BDASType[index] = {
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

                        BDASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        BDASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDASCategoryVal,
                                type: BDASTypeVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDASSTD = [];
                                $(result).each(function (index, element) {
                                    BDASSTD[index] = {
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

                        BDASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        BDASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDASCategoryVal,
                                type: BDASTypeVal,
                                std: BDASSTDVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDASName = [];
                                $(result).each(function (index, element) {
                                    BDASName[index] = {
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

                        BDAPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        BDAPType = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDAPSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDAPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDAPCategoryVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDAPType = [];
                                $(result).each(function (index, element) {
                                    BDAPType[index] = {
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

                        BDAPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        BDAPSTD = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDAPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDAPCategoryVal,
                                type: BDAPTypeVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDAPSTD = [];
                                $(result).each(function (index, element) {
                                    BDAPSTD[index] = {
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

                        BDAPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        BDAPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDAPCategoryVal,
                                type: BDAPTypeVal,
                                std: BDAPSTDVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDAPName = [];
                                $(result).each(function (index, element) {
                                    BDAPName[index] = {
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
                    else if (index === 26) {

                        BDARCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        BDARType = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDARSTD = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDARName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDARCategoryVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDARType = [];
                                $(result).each(function (index, element) {
                                    BDARType[index] = {
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
                    else if (index === 27) {

                        BDARTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        BDARSTD = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDARName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDARCategoryVal,
                                type: BDARTypeVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDARSTD = [];
                                $(result).each(function (index, element) {
                                    BDARSTD[index] = {
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
                    else if (index === 28) {

                        BDARSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        BDARName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_nbt_47003_1_2009_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: BDARCategoryVal,
                                type: BDARTypeVal,
                                std: BDARSTDVal,
                                temp: BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                BDARName = [];
                                $(result).each(function (index, element) {
                                    BDARName[index] = {
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
                        if (index === 25) {
                            if (rows[25][columns[0][1].field] === "是") {
                                pg.propertygrid('options').finder.getTr(this, 26).show();
                                pg.propertygrid('options').finder.getTr(this, 27).show();
                                pg.propertygrid('options').finder.getTr(this, 28).show();
                                pg.propertygrid('options').finder.getTr(this, 29).show();
                                pg.propertygrid('options').finder.getTr(this, 30).show();
                                pg.propertygrid('options').finder.getTr(this, 31).show();
                                pg.propertygrid('options').finder.getTr(this, 32).show();
                            }
                            else if (rows[25][columns[0][1].field] === "否") {
                                pg.propertygrid('options').finder.getTr(this, 26).hide();
                                pg.propertygrid('options').finder.getTr(this, 27).hide();
                                pg.propertygrid('options').finder.getTr(this, 28).hide();
                                pg.propertygrid('options').finder.getTr(this, 29).hide();
                                pg.propertygrid('options').finder.getTr(this, 30).hide();
                                pg.propertygrid('options').finder.getTr(this, 31).hide();
                                pg.propertygrid('options').finder.getTr(this, 32).hide();
                            }
                            else {
                                return false;
                            }
                        }
                        // UI - IsB
                        if (index === 34) {
                            if (rows[34][columns[0][1].field] === "是") {
                                pg.datagrid('options').finder.getTr(this, 35).show();
                            }
                            else if (rows[34][columns[0][1].field] === "否") {
                                pg.datagrid('options').finder.getTr(this, 35).hide();
                            }
                            else {
                                return false;
                            }
                        }

                        // Tag
                        let BDATag = "符号标记";
                        if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                            BDATag = rows[0][columns[0][1].field];
                        }

                        // 设计压力
                        let BDAPD;
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            BDAPD = parseFloat(rows[1][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // 静压力
                        let BDAPS;
                        if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                            BDAPS = parseFloat(rows[3][columns[0][1].field]);
                        }
                        else {
                            return false;
                        }

                        // Test
                        let BDATest;
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            BDATest = rows[4][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // 圆筒材料名称
                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                            BDASNameVal = rows[8][columns[0][1].field];
                        }
                        else {
                            return false;
                        }

                        // AJAX 获取筒体材料密度、最大最小厚度
                        let BDADS, BDASThkMin, BDASThkMax;
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_get_nbt_47003_1_2009_index.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                "category": BDASCategoryVal,
                                "type": BDASTypeVal,
                                "std": BDASSTDVal,
                                "name": BDASNameVal,
                                "temp": BDADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {

                                BDADS = parseFloat(result.density);
                                BDASThkMin = parseFloat(result.thkMin);
                                BDASThkMax = parseFloat(result.thkMax);

                                let BDADSI;
                                if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                    BDADSI = parseFloat(rows[9][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bda2d("Φ" + BDADSI);
                                    bdaSketch.off("resize").on("resize", function () {
                                        if ($("#bda").length > 0) {
                                            bda2d("Φ" + BDADSI);
                                        }
                                    });
                                }
                                bdad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bda2d("Φ" + BDADSI);
                                            bdaSketch.off("resize").on("resize", function () {
                                                if ($("#bda").length > 0) {
                                                    bda2d("Φ" + BDADSI);
                                                }
                                            });
                                        }
                                    }
                                });

                                // THKSN
                                let BDATHKSN;
                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BDASThkMin
                                    && parseFloat(rows[10][columns[0][1].field]) <= BDASThkMax) {
                                    BDATHKSN = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) <= BDASThkMin) {
                                    south.html("筒体材料厚度不能小于等于 " + BDASThkMin + " mm").css("color", "red");
                                    return false;
                                }
                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                    && parseFloat(rows[10][columns[0][1].field]) > BDASThkMax) {
                                    south.html("筒体材料厚度不能大于 " + BDASThkMax + " mm").css("color", "red");
                                    return false;
                                }
                                else {
                                    return false;
                                }

                                // Sketch
                                if (currentTabIndex === 0) {
                                    bda2d("Φ" + BDADSI, BDATHKSN);
                                    bdaSketch.off("resize").on("resize", function () {
                                        if ($("#bda").length > 0) {
                                            bda2d("Φ" + BDADSI, BDATHKSN);
                                        }
                                    });
                                }
                                bdad2d3.tabs({
                                    onSelect: function (title, index) {
                                        if (index === 0) {
                                            bda2d("Φ" + BDADSI, BDATHKSN);
                                            bdaSketch.off("resize").on("resize", function () {
                                                if ($("#bda").length > 0) {
                                                    bda2d("Φ" + BDADSI, BDATHKSN);
                                                }
                                            });
                                        }
                                    }
                                });

                                // 补齐外径
                                let BDADSO = BDADSI + 2 * BDATHKSN;

                                /*
                                获取筒体力学特性
                                 */
                                let BDAOST, BDAOS, BDARSEL, BDACS1;
                                $.ajax({
                                    type: "POST",
                                    contentType: "application/json; charset=utf-8",
                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                    async: true,
                                    dataType: "json",
                                    data: JSON.stringify({
                                        "category": BDASCategoryVal,
                                        "type": BDASTypeVal,
                                        "std": BDASSTDVal,
                                        "name": BDASNameVal,
                                        "thk": BDATHKSN,
                                        "temp": BDADT,
                                        "highLow": 3,
                                        "isTube": 0,
                                        "od": BDADSO
                                    }),
                                    beforeSend: function () {
                                    },
                                    success: function (result) {

                                        BDAOST = parseFloat(result.ot);
                                        if (BDAOST < 0) {
                                            south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDAOS = parseFloat(result.o);
                                        if (BDAOS < 0) {
                                            south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                            return false;
                                        }
                                        BDARSEL = parseFloat(result.rel);
                                        if (BDARSEL < 0) {
                                            south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                            return false;
                                        }
                                        BDACS1 = parseFloat(result.c1);
                                        if (BDACS1 < 0) {
                                            south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                            return false;
                                        }

                                        let BDACS2;
                                        if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) < BDATHKSN) {
                                            BDACS2 = parseFloat(rows[11][columns[0][1].field]);
                                        }
                                        else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                            && parseFloat(rows[11][columns[0][1].field]) >= BDATHKSN) {
                                            south.html("筒体腐蚀裕量不能大于等于 " + BDATHKSN + " mm").css("color", "red");
                                            return false;
                                        }
                                        else {
                                            return false;
                                        }

                                        let BDAES;
                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                            BDAES = parseFloat(rows[12][columns[0][1].field]);
                                        }
                                        else {
                                            return false;
                                        }

                                        // 接管材料名称
                                        if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])) {
                                            BDAPNameVal = rows[16][columns[0][1].field];
                                        }
                                        else {
                                            return false;
                                        }

                                        // AJAX 获取接管材料密度、最大最小厚度
                                        let BDADP, BDAPThkMin, BDAPThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_nbt_47003_1_2009_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": BDAPCategoryVal,
                                                "type": BDAPTypeVal,
                                                "std": BDAPSTDVal,
                                                "name": BDAPNameVal,
                                                "temp": BDADT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                BDADP = parseFloat(result.density);
                                                BDAPThkMin = parseFloat(result.thkMin);
                                                BDAPThkMax = parseFloat(result.thkMax);

                                                let BDADPO;
                                                if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                    BDADPO = parseFloat(rows[17][columns[0][1].field]);
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bda2d("Φ" + BDADSI, BDATHKSN, "Φ" + BDADPO);
                                                    bdaSketch.off("resize").on("resize", function () {
                                                        if ($("#bda").length > 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN, "Φ" + BDADPO);
                                                        }
                                                    });
                                                }
                                                bdad2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN, "Φ" + BDADPO);
                                                            bdaSketch.off("resize").on("resize", function () {
                                                                if ($("#bda").length > 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN, "Φ" + BDADPO);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                // THKPN
                                                let BDATHKPN;
                                                if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > BDAPThkMin
                                                    && parseFloat(rows[18][columns[0][1].field]) <= Math.min(BDAPThkMax, BDADPO / 2)) {
                                                    BDATHKPN = parseFloat(rows[18][columns[0][1].field]);
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) <= BDAPThkMin) {
                                                    south.html("接管材料厚度不能小于等于 " + BDAPThkMin + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                    && parseFloat(rows[18][columns[0][1].field]) > Math.min(BDAPThkMax, BDADPO / 2)) {
                                                    south.html("接管材料厚度不能大于 " + Math.min(BDAPThkMax, BDADPO / 2) + " mm").css("color", "red");
                                                    return false;
                                                }
                                                else {
                                                    return false;
                                                }

                                                // Sketch
                                                if (currentTabIndex === 0) {
                                                    bda2d("Φ" + BDADSI, BDATHKSN, "Φ" + BDADPO, BDATHKPN);
                                                    bdaSketch.off("resize").on("resize", function () {
                                                        if ($("#bda").length > 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN, "Φ" + BDADPO, BDATHKPN);
                                                        }
                                                    });
                                                }
                                                bdad2d3.tabs({
                                                    onSelect: function (title, index) {
                                                        if (index === 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN, "Φ" + BDADPO, BDATHKPN);
                                                            bdaSketch.off("resize").on("resize", function () {
                                                                if ($("#bda").length > 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN, "Φ" + BDADPO, BDATHKPN);
                                                                }
                                                            });
                                                        }
                                                    }
                                                });

                                                let BDAOPT, BDAOP, BDARPEL, BDACP1;
                                                $.ajax({
                                                    type: "POST",
                                                    contentType: "application/json; charset=utf-8",
                                                    url: "web_get_nbt_47003_1_2009_com_property.action",
                                                    async: true,
                                                    dataType: "json",
                                                    data: JSON.stringify({
                                                        "category": BDAPCategoryVal,
                                                        "type": BDAPTypeVal,
                                                        "std": BDAPSTDVal,
                                                        "name": BDAPNameVal,
                                                        "thk": BDATHKPN,
                                                        "temp": BDADT,
                                                        "highLow": 3,
                                                        "isTube": 0,
                                                        "od": BDADPO
                                                    }),
                                                    beforeSend: function () {
                                                    },
                                                    success: function (result) {

                                                        BDAOPT = parseFloat(result.ot);
                                                        if (BDAOPT < 0) {
                                                            south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDAOP = parseFloat(result.o);
                                                        if (BDAOP < 0) {
                                                            south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDARPEL = parseFloat(result.rel);
                                                        if (BDARPEL < 0) {
                                                            south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                            return false;
                                                        }
                                                        BDACP1 = parseFloat(result.c1);
                                                        if (BDACP1 < 0) {
                                                            south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                            return false;
                                                        }

                                                        let BDAHPO;
                                                        if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                            BDAHPO = parseFloat(rows[19][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO);
                                                            bdaSketch.off("resize").on("resize", function () {
                                                                if ($("#bda").length > 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO);
                                                                }
                                                            });
                                                        }
                                                        bdad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO);
                                                                    bdaSketch.off("resize").on("resize", function () {
                                                                        if ($("#bda").length > 0) {
                                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDAHPI;
                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                            BDAHPI = parseFloat(rows[20][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI);
                                                            bdaSketch.off("resize").on("resize", function () {
                                                                if ($("#bda").length > 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI);
                                                                }
                                                            });
                                                        }
                                                        bdad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI);
                                                                    bdaSketch.off("resize").on("resize", function () {
                                                                        if ($("#bda").length > 0) {
                                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDAALPHA;
                                                        if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                            BDAALPHA = parseFloat(rows[21][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                BDAALPHA + "°");
                                                            bdaSketch.off("resize").on("resize", function () {
                                                                if ($("#bda").length > 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                        BDAALPHA + "°");
                                                                }
                                                            });
                                                        }
                                                        bdad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                        BDAALPHA + "°");
                                                                    bdaSketch.off("resize").on("resize", function () {
                                                                        if ($("#bda").length > 0) {
                                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                BDAALPHA + "°");
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDAL;
                                                        if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                            && parseFloat(rows[22][columns[0][1].field]) < (BDADSO - BDADPO) / 2) {
                                                            BDAL = parseFloat(rows[22][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                            && parseFloat(rows[22][columns[0][1].field]) >= (BDADSO - BDADPO) / 2) {
                                                            south.html("接管轴线到封头轴线距离 L 不能大于等于 " + (BDADSO - BDADPO) / 2 + " mm!").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                BDAALPHA + "°", BDAL);
                                                            bdaSketch.off("resize").on("resize", function () {
                                                                if ($("#bda").length > 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                        BDAALPHA + "°", BDAL);
                                                                }
                                                            });
                                                        }
                                                        bdad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                        BDAALPHA + "°", BDAL);
                                                                    bdaSketch.off("resize").on("resize", function () {
                                                                        if ($("#bda").length > 0) {
                                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                BDAALPHA + "°", BDAL);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDACP2;
                                                        if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                            && parseFloat(rows[23][columns[0][1].field]) < BDATHKPN) {
                                                            BDACP2 = parseFloat(rows[23][columns[0][1].field]);
                                                        }
                                                        else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                            && parseFloat(rows[23][columns[0][1].field]) >= BDATHKPN) {
                                                            south.html("接管腐蚀裕量不能大于等于 " + BDATHKPN + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        let BDAEP;
                                                        if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                            BDAEP = parseFloat(rows[24][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        这个层次为计算逻辑主线
                                                         */

                                                        // 补强圈分支
                                                        let BDAIsPAD;
                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                            BDAIsPAD = rows[25][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                BDAALPHA + "°", BDAL, BDAIsPAD);
                                                            bdaSketch.off("resize").on("resize", function () {
                                                                if ($("#bda").length > 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                        BDAALPHA + "°", BDAL, BDAIsPAD);
                                                                }
                                                            });
                                                        }
                                                        bdad2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    bda2d("Φ" + BDADSI, BDATHKSN,
                                                                        "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                        BDAALPHA + "°", BDAL, BDAIsPAD);
                                                                    bdaSketch.off("resize").on("resize", function () {
                                                                        if ($("#bda").length > 0) {
                                                                            bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                BDAALPHA + "°", BDAL, BDAIsPAD);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let BDADR = -1.0, BDARThkMin = -1.0, BDARThkMax = -1.0;
                                                        let BDADRO = -1.0, BDATHKRN = -1.0, BDACR2 = -1.0;
                                                        let BDAORT = -1.0, BDAOR = -1.0, BDARREL = -1.0, BDACR1 = -1.0;
                                                        if (BDAIsPAD === "是") {

                                                            if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])) {
                                                                BDARNameVal = rows[29][columns[0][1].field];
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
                                                                    "category": BDARCategoryVal,
                                                                    "type": BDARTypeVal,
                                                                    "std": BDARSTDVal,
                                                                    "name": BDARNameVal,
                                                                    "temp": BDADT
                                                                }),
                                                                beforeSend: function () {
                                                                },
                                                                success: function (result) {

                                                                    BDADR = parseFloat(result.density);
                                                                    BDARThkMin = parseFloat(result.thkMin);
                                                                    BDARThkMax = parseFloat(result.thkMax);

                                                                    // dro
                                                                    if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                        && parseFloat(rows[30][columns[0][1].field]) > BDADPO) {
                                                                        BDADRO = parseFloat(rows[30][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                        && parseFloat(rows[30][columns[0][1].field]) <= BDADPO) {
                                                                        south.html("补强圈外直径 Dro 不能小于等于 " + BDADPO + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bda2d("Φ" + BDADSI, BDATHKSN,
                                                                            "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                            BDAALPHA + "°", BDAL, BDAIsPAD, "Φ" + BDADRO);
                                                                        bdaSketch.off("resize").on("resize", function () {
                                                                            if ($("#bda").length > 0) {
                                                                                bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                    "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                    BDAALPHA + "°", BDAL, BDAIsPAD, "Φ" + BDADRO);
                                                                            }
                                                                        });
                                                                    }
                                                                    bdad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                    "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                    BDAALPHA + "°", BDAL, BDAIsPAD, "Φ" + BDADRO);
                                                                                bdaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bda").length > 0) {
                                                                                        bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                            "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                            BDAALPHA + "°", BDAL, BDAIsPAD, "Φ" + BDADRO);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                        && parseFloat(rows[31][columns[0][1].field]) > BDARThkMin
                                                                        && parseFloat(rows[31][columns[0][1].field]) <= Math.min(BDARThkMax, 1.5 * BDATHKSN)) {
                                                                        BDATHKRN = parseFloat(rows[31][columns[0][1].field]);
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                        && parseFloat(rows[31][columns[0][1].field]) <= BDARThkMin) {
                                                                        south.html("补强圈材料厚度不能小于等于 " + BDARThkMin + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                        && parseFloat(rows[31][columns[0][1].field]) > Math.min(BDARThkMax, 1.5 * BDATHKSN)) {
                                                                        south.html("补强圈材料厚度不能大于 " + Math.min(BDARThkMax, 1.5 * BDATHKSN) + " mm").css("color", "red");
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        bda2d("Φ" + BDADSI, BDATHKSN,
                                                                            "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                            BDAALPHA + "°", BDAL, BDAIsPAD, "Φ" + BDADRO, BDATHKRN);
                                                                        bdaSketch.off("resize").on("resize", function () {
                                                                            if ($("#bda").length > 0) {
                                                                                bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                    "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                    BDAALPHA + "°", BDAL, BDAIsPAD, "Φ" + BDADRO, BDATHKRN);
                                                                            }
                                                                        });
                                                                    }
                                                                    bdad2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                    "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                    BDAALPHA + "°", BDAL, BDAIsPAD, "Φ" + BDADRO, BDATHKRN);
                                                                                bdaSketch.off("resize").on("resize", function () {
                                                                                    if ($("#bda").length > 0) {
                                                                                        bda2d("Φ" + BDADSI, BDATHKSN,
                                                                                            "Φ" + BDADPO, BDATHKPN, BDAHPO, BDAHPI,
                                                                                            BDAALPHA + "°", BDAL, BDAIsPAD, "Φ" + BDADRO, BDATHKRN);
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
                                                                            "category": BDARCategoryVal,
                                                                            "type": BDARTypeVal,
                                                                            "std": BDARSTDVal,
                                                                            "name": BDARNameVal,
                                                                            "thk": BDATHKRN,
                                                                            "temp": BDADT,
                                                                            "highLow": 3,
                                                                            "isTube": 0,
                                                                            "od": BDADRO
                                                                        }),
                                                                        beforeSend: function () {
                                                                        },
                                                                        success: function (result) {

                                                                            BDAORT = parseFloat(result.ot);
                                                                            if (BDAORT < 0) {
                                                                                south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDAOR = parseFloat(result.o);
                                                                            if (BDAOR < 0) {
                                                                                south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDARREL = parseFloat(result.rel);
                                                                            if (BDARREL < 0) {
                                                                                south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                                return false;
                                                                            }
                                                                            BDACR1 = parseFloat(result.c1);
                                                                            if (BDACR1 < 0) {
                                                                                south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                                return false;
                                                                            }

                                                                            // 补强圈腐蚀裕量 cr2
                                                                            if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                && parseFloat(rows[32][columns[0][1].field]) < BDATHKRN) {
                                                                                BDACR2 = parseFloat(rows[32][columns[0][1].field]);
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                                && parseFloat(rows[32][columns[0][1].field]) >= BDATHKRN) {
                                                                                south.html("补强圈腐蚀裕量不能大于等于 " + BDATHKRN + " mm").css("color", "red");
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
                                                            if (BDACR2 < 0) {
                                                                return false;
                                                            }
                                                        }

                                                        // A3
                                                        let BDAA3;
                                                        if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])) {
                                                            BDAA3 = parseFloat(rows[33][columns[0][1].field]);
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // IsB
                                                        let BDAIsB;
                                                        if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                            BDAIsB = rows[34][columns[0][1].field];
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        // BS
                                                        let BDABS = -1.0;
                                                        if (BDAIsB === "是") {

                                                            // 获取 BS
                                                            if (parseFloat(rows[35][columns[0][1].field]) > BDADPO) {
                                                                BDABS = parseFloat(rows[35][columns[0][1].field]);
                                                            }
                                                            else if (parseFloat(rows[35][columns[0][1].field]) <= BDADPO) {
                                                                south.html("指定补强范围 B 不能小于等于 " + BDADPO + " mm").css("color", "red");
                                                                return false;
                                                            }
                                                            else {
                                                                return false;
                                                            }
                                                        }

                                                        /*
                                                        过程参数
                                                         */

                                                        let BDAPC = BDAPD + BDAPS;

                                                        // 筒体
                                                        let BDACS = BDACS1 + BDACS2;
                                                        let BDATHKSE = BDATHKSN - BDACS;
                                                        let BDADSM = BDADSI + BDATHKSN;
                                                        let BDARSM = BDADSM / 2;

                                                        // 接管
                                                        let BDACP = BDACP1 + BDACP2;
                                                        let BDATHKPE = BDATHKPN - BDACP;
                                                        let BDADPC = BDADPO - 2 * BDATHKPN + 2 * BDACP;
                                                        let BDASA = BDADPC / Math.cos(BDAALPHA / 180 * Math.PI);
                                                        let BDASB = BDADPC * BDARSM / Math.sqrt(BDARSM * BDARSM - BDAL * BDAL);
                                                        let BDAK = Math.max(BDASA / BDASB, BDASB / BDASA);
                                                        if (BDAK > 2) {
                                                            south.html("开孔长短轴之比大于2，程序无法计算！")
                                                                .css("color", "red");
                                                            return false;
                                                        }
                                                        let BDADOP = BDASA;
                                                        if (BDADSI <= 1500) {
                                                            if (BDADOP > Math.min(0.6 * BDADSI, 600)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                        else if (BDADSI > 1500) {
                                                            if (BDADOP > Math.min(0.4 * BDADSI, 1200)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                        let BDAFP = Math.min(1.0, BDAOPT / BDAOST);

                                                        // 补强圈
                                                        let BDACR = -1.0, BDATHKRE = -1.0, BDAFR = -1.0;
                                                        if (BDAIsPAD === "是") {
                                                            BDACR = BDACR1 + BDACR2;
                                                            BDATHKRE = BDATHKRN - BDACR;
                                                            BDAFR = Math.min(1.0, BDAORT / BDAOST);
                                                        }

                                                        /*
                                                        筒体内压强度校核
                                                         */
                                                        let BDATHKSC = BDAPC * BDADSI / (2 * BDAOST * BDAES);
                                                        let BDATHKSMIN;
                                                        if (BDASCategoryVal === "高合金钢") {
                                                            BDATHKSMIN = 2;
                                                        } else {
                                                            BDATHKSMIN = 3;
                                                        }
                                                        let BDATHKSD = Math.max(BDATHKSC, BDATHKSMIN) + BDACS2;
                                                        south.html(
                                                            "<span style='color:#444444;'>" +
                                                            "筒体内压所需厚度：" + (BDATHKSD + BDACS1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDATHKSCHK;
                                                        if (BDATHKSN >= (BDATHKSD + BDACS1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDATHKSN + " mm" +
                                                                "</span>");
                                                            BDATHKSCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDATHKSN + " mm" +
                                                                "</span>");
                                                            BDATHKSCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        接管内压强度校核
                                                         */
                                                        let BDATHKPC = BDAPC * (BDADPO - 2 * BDATHKPN) / (2 * BDAOPT * BDAEP);
                                                        let BDATHKPD = BDATHKPC + BDACP2;
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "接管内压所需厚度：" + (BDATHKPD + BDACP1).toFixed(2) + " mm" +
                                                            "</span>");
                                                        let BDATHKPCHK;
                                                        if (BDATHKPN >= (BDATHKPD + BDACP1).toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDATHKPN + " mm" +
                                                                "</span>");
                                                            BDATHKPCHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "输入厚度：" + BDATHKPN + " mm" +
                                                                "</span>");
                                                            BDATHKPCHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        开孔补强计算
                                                         */
                                                        let BDABA = BDADOP * BDATHKSC + 2 * BDATHKSC * BDATHKPE * (1 - BDAFP);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "开孔所需补强面积：" + BDABA.toFixed(2) + " mm²" +
                                                            "</span>");

                                                        // 筒体
                                                        let BDABB;
                                                        if (BDAIsB === "是") {
                                                            BDABB = Math.min(Math.max(2 * BDADOP, BDADOP + 2 * BDATHKSN + 2 * BDATHKPN), BDABS);
                                                        }
                                                        else if (BDAIsB === "否") {
                                                            BDABB = Math.max(2 * BDADOP, BDADOP + 2 * BDATHKSN + 2 * BDATHKPN);
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                        let BDAA1 = (BDABB - BDADOP) * (BDATHKSE - BDATHKSC) - 2 * BDATHKPE * (BDATHKSE - BDATHKSC) * (1 - BDAFP);

                                                        // 接管
                                                        let BDAHP1 = Math.min(BDAHPO, Math.sqrt(BDADOP * BDATHKPN));
                                                        let BDAHP2 = Math.min(BDAHPI, Math.sqrt(BDADOP * BDATHKPN));
                                                        let BDAA2 = 2 * BDAHP1 * (BDATHKPE - BDATHKPC) * BDAFP + 2 * BDAHP2 * (BDATHKPE - BDACP2) * BDAFP;

                                                        // 补强圈
                                                        let BDAA4 = 0.0, BDADRE = -1.0;
                                                        if (BDAIsPAD === "是") {
                                                            BDADRE = Math.min(BDADRO, BDABB);
                                                            BDAA4 = (BDADRE - BDADPO) * BDATHKRE * BDAFR;
                                                        }

                                                        // Ae
                                                        let BDAAE = BDAA1 + BDAA2 + BDAA3 + BDAA4;
                                                        let BDAACHK;
                                                        if (BDAAE >= BDABA.toFixed(2)) {
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDAAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDAACHK = "合格";
                                                        }
                                                        else {
                                                            south.append(
                                                                "<span style='color:red;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "实际补强面积：" + BDAAE.toFixed(2) + " mm²" +
                                                                "</span>");
                                                            BDAACHK = "不合格";
                                                            return false;
                                                        }

                                                        /*
                                                        压力试验
                                                         */
                                                        let BDAETA, BDAPST, BDAPPT, BDAPT;
                                                        if (BDATest === "液压试验") {
                                                            BDAETA = 1.25;
                                                            BDAPST = Math.max(BDAETA * BDAPD * BDAOS / BDAOST, 0.05);
                                                            BDAPPT = Math.max(BDAETA * BDAPD * BDAOP / BDAOPT, 0.05);
                                                            BDAPT = Math.min(BDAPST, BDAPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：液压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDAPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else if (BDATest === "气压试验") {
                                                            BDAETA = 1.10;
                                                            BDAPST = Math.max(BDAETA * BDAPD * BDAOS / BDAOST, 0.05);
                                                            BDAPPT = Math.max(BDAETA * BDAPD * BDAOP / BDAOPT, 0.05);
                                                            BDAPT = Math.min(BDAPST, BDAPPT);
                                                            south.append(
                                                                "<span style='color:#444444;'>" +
                                                                "&ensp;|&ensp;" +
                                                                "试压类型：气压" +
                                                                "&ensp;|&ensp;" +
                                                                "试验压力：" + BDAPT.toFixed(4) + " MPa" +
                                                                "</span>");
                                                        }
                                                        else {
                                                            return false;
                                                        }

                                                        /*
                                                        计算 MAWP
                                                         */

                                                        // 筒体
                                                        let BDAMAWPS = 2 * BDATHKSE * BDAOST * BDAES / (BDADSI) - BDAPS;

                                                        // 接管
                                                        let BDAMAWPP = 2 * BDATHKPE * BDAOPT * BDAEP / (BDADPO - 2 * BDATHKPN) - BDAPS;

                                                        // 开孔补强
                                                        let BDAMAWPA1 = -1, BDAMAWPA2 = -1,
                                                            BDAMAWPA3 = BDAA3, BDAMAWPA4 = BDAA4,
                                                            BDAMAWPA = -1, BDAMAWPAE = -1,
                                                            BDAMAWPRC = BDAPC;
                                                        let BDAMAWPTHKSC, BDAMAWPTHKPC;
                                                        while (BDAMAWPAE >= BDAMAWPA) {

                                                            BDAMAWPRC += 0.0001;

                                                            // 筒体计算厚度
                                                            BDAMAWPTHKSC = BDAMAWPRC * BDADSI / (2 * BDAOST * BDAES);
                                                            BDAMAWPA = BDADOP * BDAMAWPTHKSC + 2 * BDAMAWPTHKSC * BDATHKPE * (1 - BDAFP);

                                                            // 接管计算厚度
                                                            BDAMAWPTHKPC = BDAMAWPRC * (BDADPO - 2 * BDATHKPN) / (2 * BDAOPT * BDAEP);
                                                            BDAMAWPA1 = (BDABB - BDADOP) * (BDATHKSE - BDAMAWPTHKSC) - 2 * BDATHKPE * (BDATHKSE - BDAMAWPTHKSC) * (1 - BDAFP);
                                                            BDAMAWPA2 = 2 * BDAHP1 * (BDATHKPE - BDAMAWPTHKPC) * BDAFP + 2 * BDAHP2 * (BDATHKPE - BDACP2) * BDAFP;
                                                            BDAMAWPAE = BDAMAWPA1 + BDAMAWPA2 + BDAMAWPA3 + BDAMAWPA4;
                                                        }

                                                        // 取用 MAWP
                                                        let BDAMAWPR = BDAMAWPRC - BDAPS - 0.0001;
                                                        let BDAMAWP = Math.min(BDAMAWPS, BDAMAWPP, BDAMAWPR);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "MAWP：" + BDAMAWP.toFixed(4) + " MPa" +
                                                            "</span>");

                                                        // docx
                                                        let BDAPayJS = $('#payjs');

                                                        function getDocx() {
                                                            $.ajax({
                                                                type: "POST",
                                                                contentType: "application/json; charset=utf-8",
                                                                url: "bdadocx.action",
                                                                async: true,
                                                                dataType: "json",
                                                                data: JSON.stringify({
                                                                    ribbonName: "BDA",

                                                                    isPad: BDAIsPAD,
                                                                    isB: BDAIsB,

                                                                    tag: BDATag,
                                                                    pd: BDAPD,
                                                                    t: BDADT,
                                                                    ps: BDAPS,
                                                                    test: BDATest,

                                                                    stds: BDASSTDVal,
                                                                    names: BDASNameVal,
                                                                    dsi: BDADSI,
                                                                    thksn: BDATHKSN,
                                                                    cs2: BDACS2,
                                                                    es: BDAES,

                                                                    stdp: BDAPSTDVal,
                                                                    namep: BDAPNameVal,
                                                                    dpo: BDADPO,
                                                                    thkpn: BDATHKPN,
                                                                    hpo: BDAHPO,
                                                                    hpi: BDAHPI,
                                                                    alpha: BDAALPHA,
                                                                    l: BDAL,
                                                                    cp2: BDACP2,
                                                                    ep: BDAEP,

                                                                    stdr: BDARSTDVal,
                                                                    namer: BDARNameVal,
                                                                    dro: BDADRO,
                                                                    thkrn: BDATHKRN,
                                                                    cr2: BDACR2,

                                                                    a3: BDAA3,
                                                                    bs: BDABS,

                                                                    ds: BDADS.toFixed(4),
                                                                    cs1: BDACS1.toFixed(4),
                                                                    rsel: BDARSEL.toFixed(4),
                                                                    ost: BDAOST.toFixed(4),
                                                                    os: BDAOS.toFixed(4),

                                                                    dp: BDADP.toFixed(4),
                                                                    cp1: BDACP1.toFixed(4),
                                                                    rpel: BDARPEL.toFixed(4),
                                                                    opt: BDAOPT.toFixed(4),
                                                                    op: BDAOP.toFixed(4),

                                                                    dr: BDADR.toFixed(4),
                                                                    cr1: BDACR1.toFixed(4),
                                                                    rrel: BDARREL.toFixed(4),
                                                                    ort: BDAORT.toFixed(4),
                                                                    or: BDAOR.toFixed(4),

                                                                    pc: BDAPC.toFixed(4),
                                                                    cs: BDACS.toFixed(4),
                                                                    thkse: BDATHKSE.toFixed(4),
                                                                    dsm: BDADSM.toFixed(4),
                                                                    rsm: BDARSM.toFixed(4),

                                                                    cp: BDACP.toFixed(4),
                                                                    thkpe: BDATHKPE.toFixed(4),
                                                                    dpc: BDADPC.toFixed(4),
                                                                    sa: BDASA.toFixed(4),
                                                                    sb: BDASB.toFixed(4),
                                                                    k: BDAK.toFixed(4),
                                                                    dop: BDADOP.toFixed(4),
                                                                    fp: BDAFP.toFixed(4),

                                                                    cr: BDACR.toFixed(4),
                                                                    thkre: BDATHKRE.toFixed(4),
                                                                    fr: BDAFR.toFixed(4),

                                                                    thksc: BDATHKSC.toFixed(4),
                                                                    thksmin: BDATHKSMIN.toFixed(4),
                                                                    thksd: BDATHKSD.toFixed(4),
                                                                    thkschk: BDATHKSCHK,

                                                                    thkpc: BDATHKPC.toFixed(4),
                                                                    thkpd: BDATHKPD.toFixed(4),
                                                                    thkpchk: BDATHKPCHK,

                                                                    ba: BDABA.toFixed(4),
                                                                    bb: BDABB.toFixed(4),
                                                                    a1: BDAA1.toFixed(4),
                                                                    hp1: BDAHP1.toFixed(4),
                                                                    hp2: BDAHP2.toFixed(4),
                                                                    a2: BDAA2.toFixed(4),
                                                                    dre: BDADRE.toFixed(4),
                                                                    a4: BDAA4.toFixed(4),
                                                                    ae: BDAAE.toFixed(4),
                                                                    achk: BDAACHK,

                                                                    eta: BDAETA.toFixed(4),
                                                                    pst: BDAPST.toFixed(4),
                                                                    ppt: BDAPPT.toFixed(4),
                                                                    pt: BDAPT.toFixed(4),

                                                                    mawps: BDAMAWPS.toFixed(4),
                                                                    mawpp: BDAMAWPP.toFixed(4),
                                                                    mawpa1: BDAMAWPA1.toFixed(0),
                                                                    mawpa2: BDAMAWPA2.toFixed(0),
                                                                    mawpa3: BDAMAWPA3,
                                                                    mawpa4: BDAMAWPA4.toFixed(0),
                                                                    mawpa: BDAMAWPA.toFixed(0),
                                                                    mawpae: BDAMAWPAE.toFixed(0),
                                                                    mawpr: BDAMAWPR.toFixed(4),
                                                                    mawp: BDAMAWP.toFixed(4)
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
                                                                        BDAPayJS.dialog({
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
                                                                                    BDAPayJS.dialog("close");
                                                                                    BDAPayJS.dialog("clear");
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
                                                                                                BDAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                // 倒计时计数器
                                                                                                let maxTime = 4, timer;

                                                                                                function CountDown() {
                                                                                                    if (maxTime >= 0) {
                                                                                                        $("#payjs_timer").html(maxTime);
                                                                                                        --maxTime;
                                                                                                    } else {

                                                                                                        clearInterval(timer);
                                                                                                        // 关闭并清空收银台
                                                                                                        BDAPayJS.dialog('close');
                                                                                                        BDAPayJS.dialog('clear');
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
                pg.propertygrid('options').finder.getTr(this, 26).hide();
                pg.propertygrid('options').finder.getTr(this, 27).hide();
                pg.propertygrid('options').finder.getTr(this, 28).hide();
                pg.propertygrid('options').finder.getTr(this, 29).hide();
                pg.propertygrid('options').finder.getTr(this, 30).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 35).hide();
            }
        });
    });
});