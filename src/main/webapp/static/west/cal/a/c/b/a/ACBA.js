$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let acbaSketch = $("#d2");
    let acbaModel = $("#d3");
    let acbad2d3 = $('#d2d3');

    $("#cal").html("<table id='acba'></table>");
    let pg = $("#acba");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/b/a/ACBA.json", function (result) {

        let ACBADT,
            ACBASCategory, ACBASCategoryVal, ACBASType, ACBASTypeVal, ACBASSTD, ACBASSTDVal, ACBASName, ACBASNameVal,
            ACBAPCategory, ACBAPCategoryVal, ACBAPType, ACBAPTypeVal, ACBAPSTD, ACBAPSTDVal, ACBAPName, ACBAPNameVal,
            ACBARCategory, ACBARCategoryVal, ACBARType, ACBARTypeVal, ACBARSTD, ACBARSTDVal, ACBARName, ACBARNameVal,
            columns, rows, ed;

        // 壳体内径
        function acba2d(idod, dsi = "ΦDsi", dso = "ΦDso", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            acbaSketch.empty();
            let width = acbaSketch.width();
            let height = acbaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACBASVG").attr("height", height);

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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACBASketchDRO");
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
                ])).attr("id", "ACBASketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACBASketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACBASketchDPO");

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
            ])).attr("id", "ACBASketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACBASketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "ACBASketchHPI");

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACBASketchHPO");

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
            ])).attr("id", "ACBASketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACBASketchTHKSN").attr("startOffset", "50%").text(thksn);

            // dsi dso
            if (idod === "内径") {
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
                ])).attr("id", "ACBASketchDSI").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACBASketchDSI").attr("startOffset", "50%").text(dsi);
            }
            else if (idod === "外径") {
                svg.append("path").classed("arrow sketch", true)
                    .attr("d", line([
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg},
                        {x: width / 2 - 2 * thk + 3, y: padding + 2 * hg + 15},
                        {x: width / 2 - 2 * thk - 3, y: padding + 2 * hg + 15},
                        {x: width / 2 - 2 * thk, y: padding + 2 * hg}
                    ]));
                svg.append("path").attr("d", line([
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg + 15 + 60},
                    {x: width / 2 - 2 * thk, y: padding + 2 * hg + 15}
                ])).attr("id", "ACBASketchDSO").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACBASketchDSO").attr("startOffset", "50%").text(dso);
            }

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
            ).classed("sketch", true).attr("id", "ACBASketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACBASketchALPHA").attr("startOffset", "50%").text(alpha);

        }

        currentTabIndex = acbad2d3.tabs('getTabIndex', acbad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            acba2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#acba").length > 0) {
                    acba2d();
                }
            });
        }
        acbad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    acba2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#acba").length > 0) {
                            acba2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 球形封头插入式接管开孔补强计算",
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
                if (index === 11
                    || index === 27 || index === 28 || index === 29
                    || index === 30 || index === 31 || index === 32 || index === 33
                    || index === 36) {
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
                    $(ed.target).combobox("loadData", ACBASCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ACBASType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACBASSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACBASName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", ACBAPCategory);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", ACBAPType);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", ACBAPSTD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", ACBAPName);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", ACBARCategory);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", ACBARType);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", ACBARSTD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", ACBARName);
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
                    acbaSketch.empty();
                    acbaModel.empty();

                    // sketch
                    currentTabIndex = acbad2d3.tabs('getTabIndex', acbad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        acba2d();
                        acbaSketch.off("resize").on("resize", function () {
                            if ($("#acba").length > 0) {
                                acba2d();
                            }
                        });
                    }
                    acbad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acba2d();
                                acbaSketch.off("resize").on("resize", function () {
                                    if ($("#acba").length > 0) {
                                        acba2d();
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

                        ACBADT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ACBASCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACBASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACBASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACBASName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        ACBAPCategory = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACBAPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACBAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACBAPName = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        ACBARCategory = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACBARType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACBARSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACBARName = null;

                        if (rows[26][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 27).hide();
                            pg.propertygrid('options').finder.getTr(this, 28).hide();
                            pg.propertygrid('options').finder.getTr(this, 29).hide();
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                        }

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ACBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBASCategory = [];
                                ACBAPCategory = [];
                                ACBARCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACBADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACBASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACBAPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACBARCategory[index] = {
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

                        ACBASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACBASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACBASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACBASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBASCategoryVal,
                                temp: ACBADT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBASType = [];
                                $(result).each(function (index, element) {
                                    ACBASType[index] = {
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

                        ACBASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACBASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACBASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBASCategoryVal,
                                type: ACBASTypeVal,
                                temp: ACBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBASSTD = [];
                                $(result).each(function (index, element) {
                                    ACBASSTD[index] = {
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

                        ACBASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACBASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBASCategoryVal,
                                type: ACBASTypeVal,
                                std: ACBASSTDVal,
                                temp: ACBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBASName = [];
                                $(result).each(function (index, element) {
                                    ACBASName[index] = {
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
                    if (index === 15) {

                        ACBAPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACBAPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACBAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACBAPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBAPCategoryVal,
                                temp: ACBADT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBAPType = [];
                                $(result).each(function (index, element) {
                                    ACBAPType[index] = {
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
                    if (index === 16) {

                        ACBAPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACBAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACBAPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBAPCategoryVal,
                                type: ACBAPTypeVal,
                                temp: ACBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBAPSTD = [];
                                $(result).each(function (index, element) {
                                    ACBAPSTD[index] = {
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
                    if (index === 17) {

                        ACBAPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACBAPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBAPCategoryVal,
                                type: ACBAPTypeVal,
                                std: ACBAPSTDVal,
                                temp: ACBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBAPName = [];
                                $(result).each(function (index, element) {
                                    ACBAPName[index] = {
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
                    if (index === 27) {

                        ACBARCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACBARType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACBARSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACBARName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBARCategoryVal,
                                temp: ACBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBARType = [];
                                $(result).each(function (index, element) {
                                    ACBARType[index] = {
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
                    if (index === 28) {

                        ACBARTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACBARSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACBARName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBARCategoryVal,
                                type: ACBARTypeVal,
                                temp: ACBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBARSTD = [];
                                $(result).each(function (index, element) {
                                    ACBARSTD[index] = {
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
                    if (index === 29) {

                        ACBARSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACBARName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBARCategoryVal,
                                type: ACBARTypeVal,
                                std: ACBARSTDVal,
                                temp: ACBADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBARName = [];
                                $(result).each(function (index, element) {
                                    ACBARName[index] = {
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
                            pg.datagrid('options').finder.getTr(this, 11).hide();
                        }
                        else if (rows[9][columns[0][1].field] === "外径") {
                            pg.datagrid('options').finder.getTr(this, 11).show();
                            pg.datagrid('options').finder.getTr(this, 10).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsPAD
                    if (index === 26) {
                        if (rows[26][columns[0][1].field] === "是") {
                            pg.propertygrid('options').finder.getTr(this, 27).show();
                            pg.propertygrid('options').finder.getTr(this, 28).show();
                            pg.propertygrid('options').finder.getTr(this, 29).show();
                            pg.propertygrid('options').finder.getTr(this, 30).show();
                            pg.propertygrid('options').finder.getTr(this, 31).show();
                            pg.propertygrid('options').finder.getTr(this, 32).show();
                            pg.propertygrid('options').finder.getTr(this, 33).show();
                        }
                        else if (rows[26][columns[0][1].field] === "否") {
                            pg.propertygrid('options').finder.getTr(this, 27).hide();
                            pg.propertygrid('options').finder.getTr(this, 28).hide();
                            pg.propertygrid('options').finder.getTr(this, 29).hide();
                            pg.propertygrid('options').finder.getTr(this, 30).hide();
                            pg.propertygrid('options').finder.getTr(this, 31).hide();
                            pg.propertygrid('options').finder.getTr(this, 32).hide();
                            pg.propertygrid('options').finder.getTr(this, 33).hide();
                        }
                        else {
                            return false;
                        }
                    }
                    // UI - IsB
                    if (index === 35) {
                        if (rows[35][columns[0][1].field] === "是") {
                            pg.datagrid('options').finder.getTr(this, 36).show();
                        }
                        else if (rows[35][columns[0][1].field] === "否") {
                            pg.datagrid('options').finder.getTr(this, 36).hide();
                        }
                        else {
                            return false;
                        }
                    }

                    // Tag
                    let ACBATag = "符号标记";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACBATag = rows[0][columns[0][1].field];
                    }

                    // 设计压力
                    let ACBAPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACBAPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACBAPS;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        ACBAPS = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACBATest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACBATest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 圆筒材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        ACBASNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取筒体材料密度、最大最小厚度
                    let ACBADS, ACBASThkMin, ACBASThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACBASCategoryVal,
                            "type": ACBASTypeVal,
                            "std": ACBASSTDVal,
                            "name": ACBASNameVal,
                            "temp": ACBADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACBADS = parseFloat(result.density);
                            ACBASThkMin = parseFloat(result.thkMin);
                            ACBASThkMax = parseFloat(result.thkMax);

                            // IDOD
                            let ACBAIDOD;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                ACBAIDOD = rows[9][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acba2d(ACBAIDOD);
                                acbaSketch.off("resize").on("resize", function () {
                                    if ($("#acba").length > 0) {
                                        acba2d(ACBAIDOD);
                                    }
                                });
                            }
                            acbad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acba2d(ACBAIDOD);
                                        acbaSketch.off("resize").on("resize", function () {
                                            if ($("#acba").length > 0) {
                                                acba2d(ACBAIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACBADSI = -1, ACBADSO = -1;
                            if (ACBAIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    ACBADSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (ACBAIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    ACBADSO = parseFloat(rows[11][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO);
                                acbaSketch.off("resize").on("resize", function () {
                                    if ($("#acba").length > 0) {
                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO);
                                    }
                                });
                            }
                            acbad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO);
                                        acbaSketch.off("resize").on("resize", function () {
                                            if ($("#acba").length > 0) {
                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKSN
                            let ACBATHKSN;
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACBASThkMin
                                && parseFloat(rows[12][columns[0][1].field]) <= ACBASThkMax) {
                                ACBATHKSN = parseFloat(rows[12][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) <= ACBASThkMin) {
                                south.html("封头材料厚度不能小于等于 " + ACBASThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACBASThkMax) {
                                south.html("封头材料厚度不能大于 " + ACBASThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN);
                                acbaSketch.off("resize").on("resize", function () {
                                    if ($("#acba").length > 0) {
                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN);
                                    }
                                });
                            }
                            acbad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN);
                                        acbaSketch.off("resize").on("resize", function () {
                                            if ($("#acba").length > 0) {
                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            /*
                            获取筒体力学特性
                             */
                            let ACBAOST, ACBAOS, ACBAOST1, ACBARSEL, ACBACS1;
                            // 确定查询参数中的 od
                            let ACBAOD;
                            if (ACBAIDOD === "内径") {
                                ACBAOD = ACBADSI + 2 * ACBATHKSN;
                            }
                            else if (ACBAIDOD === "外径") {
                                ACBAOD = ACBADSO;
                            }
                            else {
                                return false;
                            }
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": ACBASCategoryVal,
                                    "type": ACBASTypeVal,
                                    "std": ACBASSTDVal,
                                    "name": ACBASNameVal,
                                    "thk": ACBATHKSN,
                                    "temp": ACBADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACBAOD
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACBAOST = parseFloat(result.ot);
                                    if (ACBAOST < 0) {
                                        south.html("查询球形封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACBAOS = parseFloat(result.o);
                                    if (ACBAOS < 0) {
                                        south.html("查询球形封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACBARSEL = parseFloat(result.rel);
                                    if (ACBARSEL < 0) {
                                        south.html("查询球形封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACBACS1 = parseFloat(result.c1);
                                    if (ACBACS1 < 0) {
                                        south.html("查询球形封头材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACBAOST1 = parseFloat(result.ot1);

                                    let ACBACS2;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < ACBATHKSN) {
                                        ACBACS2 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= ACBATHKSN) {
                                        south.html("封头腐蚀裕量不能大于等于 " + ACBATHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACBAES;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        ACBAES = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        ACBAPNameVal = rows[18][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACBADP, ACBAPThkMin, ACBAPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACBAPCategoryVal,
                                            "type": ACBAPTypeVal,
                                            "std": ACBAPSTDVal,
                                            "name": ACBAPNameVal,
                                            "temp": ACBADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACBADP = parseFloat(result.density);
                                            ACBAPThkMin = parseFloat(result.thkMin);
                                            ACBAPThkMax = parseFloat(result.thkMax);

                                            let ACBADPO;
                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                ACBADPO = parseFloat(rows[19][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO);
                                                acbaSketch.off("resize").on("resize", function () {
                                                    if ($("#acba").length > 0) {
                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO);
                                                    }
                                                });
                                            }
                                            acbad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO);
                                                        acbaSketch.off("resize").on("resize", function () {
                                                            if ($("#acba").length > 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKPN
                                            let ACBATHKPN;
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > ACBAPThkMin
                                                && parseFloat(rows[20][columns[0][1].field]) <= Math.min(ACBAPThkMax, ACBADPO / 2)) {
                                                ACBATHKPN = parseFloat(rows[20][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) <= ACBAPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACBAPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > Math.min(ACBAPThkMax, ACBADPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACBAPThkMax, ACBADPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN);
                                                acbaSketch.off("resize").on("resize", function () {
                                                    if ($("#acba").length > 0) {
                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN);
                                                    }
                                                });
                                            }
                                            acbad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN);
                                                        acbaSketch.off("resize").on("resize", function () {
                                                            if ($("#acba").length > 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACBAOPT, ACBAOP, ACBAOPT1, ACBARPEL, ACBACP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACBAPCategoryVal,
                                                    "type": ACBAPTypeVal,
                                                    "std": ACBAPSTDVal,
                                                    "name": ACBAPNameVal,
                                                    "thk": ACBATHKPN,
                                                    "temp": ACBADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACBADPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACBAOPT = parseFloat(result.ot);
                                                    if (ACBAOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACBAOP = parseFloat(result.o);
                                                    if (ACBAOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACBARPEL = parseFloat(result.rel);
                                                    if (ACBARPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACBACP1 = parseFloat(result.c1);
                                                    if (ACBACP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACBAOPT1 = parseFloat(result.ot1);

                                                    let ACBAHPO;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        ACBAHPO = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN, ACBAHPO);
                                                        acbaSketch.off("resize").on("resize", function () {
                                                            if ($("#acba").length > 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN, ACBAHPO);
                                                            }
                                                        });
                                                    }
                                                    acbad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN, ACBAHPO);
                                                                acbaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acba").length > 0) {
                                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN, ACBAHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACBAHPI;
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        ACBAHPI = parseFloat(rows[22][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI);
                                                        acbaSketch.off("resize").on("resize", function () {
                                                            if ($("#acba").length > 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI);
                                                            }
                                                        });
                                                    }
                                                    acbad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI);
                                                                acbaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acba").length > 0) {
                                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN, "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACBAALPHA;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                        ACBAALPHA = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                            "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                            ACBAALPHA + "°");
                                                        acbaSketch.off("resize").on("resize", function () {
                                                            if ($("#acba").length > 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                    "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                    ACBAALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    acbad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                    "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                    ACBAALPHA + "°");
                                                                acbaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acba").length > 0) {
                                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                            "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                            ACBAALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACBACP2;
                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                        && parseFloat(rows[24][columns[0][1].field]) < ACBATHKPN) {
                                                        ACBACP2 = parseFloat(rows[24][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                        && parseFloat(rows[24][columns[0][1].field]) >= ACBATHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACBATHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACBAEP;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        ACBAEP = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACBAIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                        ACBAIsPAD = rows[26][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                            "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                            ACBAALPHA + "°", ACBAIsPAD);
                                                        acbaSketch.off("resize").on("resize", function () {
                                                            if ($("#acba").length > 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                    "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                    ACBAALPHA + "°", ACBAIsPAD);
                                                            }
                                                        });
                                                    }
                                                    acbad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                    "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                    ACBAALPHA + "°", ACBAIsPAD);
                                                                acbaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acba").length > 0) {
                                                                        acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                            "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                            ACBAALPHA + "°", ACBAIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACBADR = -1.0, ACBARThkMin = -1.0, ACBARThkMax = -1.0;
                                                    let ACBADRO = -1.0, ACBATHKRN = -1.0, ACBACR2 = -1.0;
                                                    let ACBAORT = -1.0, ACBAOR = -1.0, ACBAORT1 = -1.0, ACBARREL = -1.0,
                                                        ACBACR1 = -1.0;
                                                    if (ACBAIsPAD === "是") {

                                                        if (ACBATHKSN > 38) {
                                                            south.html("封头厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (ACBASCategoryVal === "碳素钢和低合金钢" && ACBARSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                            ACBARNameVal = rows[30][columns[0][1].field];
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
                                                                "category": ACBARCategoryVal,
                                                                "type": ACBARTypeVal,
                                                                "std": ACBARSTDVal,
                                                                "name": ACBARNameVal,
                                                                "temp": ACBADT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACBADR = parseFloat(result.density);
                                                                ACBARThkMin = parseFloat(result.thkMin);
                                                                ACBARThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                    && parseFloat(rows[31][columns[0][1].field]) > ACBADPO) {
                                                                    ACBADRO = parseFloat(rows[31][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                    && parseFloat(rows[31][columns[0][1].field]) <= ACBADPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACBADPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                        "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                        ACBAALPHA + "°", ACBAIsPAD, "Φ" + ACBADRO);
                                                                    acbaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acba").length > 0) {
                                                                            acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                                "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                                ACBAALPHA + "°", ACBAIsPAD, "Φ" + ACBADRO);
                                                                        }
                                                                    });
                                                                }
                                                                acbad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                                "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                                ACBAALPHA + "°", ACBAIsPAD, "Φ" + ACBADRO);
                                                                            acbaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acba").length > 0) {
                                                                                    acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                                        "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                                        ACBAALPHA + "°", ACBAIsPAD, "Φ" + ACBADRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) > ACBARThkMin
                                                                    && parseFloat(rows[32][columns[0][1].field]) <= Math.min(ACBARThkMax, 1.5 * ACBATHKSN)) {
                                                                    ACBATHKRN = parseFloat(rows[32][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) <= ACBARThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACBARThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) > Math.min(ACBARThkMax, 1.5 * ACBATHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACBARThkMax, 1.5 * ACBATHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                        "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                        ACBAALPHA + "°", ACBAIsPAD, "Φ" + ACBADRO, ACBATHKRN);
                                                                    acbaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acba").length > 0) {
                                                                            acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                                "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                                ACBAALPHA + "°", ACBAIsPAD, "Φ" + ACBADRO, ACBATHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                acbad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                                "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                                ACBAALPHA + "°", ACBAIsPAD, "Φ" + ACBADRO, ACBATHKRN);
                                                                            acbaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acba").length > 0) {
                                                                                    acba2d(ACBAIDOD, "Φ" + ACBADSI, "Φ" + ACBADSO, ACBATHKSN,
                                                                                        "Φ" + ACBADPO, ACBATHKPN, ACBAHPO, ACBAHPI,
                                                                                        ACBAALPHA + "°", ACBAIsPAD, "Φ" + ACBADRO, ACBATHKRN);
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
                                                                        "category": ACBARCategoryVal,
                                                                        "type": ACBARTypeVal,
                                                                        "std": ACBARSTDVal,
                                                                        "name": ACBARNameVal,
                                                                        "thk": ACBATHKRN,
                                                                        "temp": ACBADT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACBADRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACBAORT = parseFloat(result.ot);
                                                                        if (ACBAORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACBAOR = parseFloat(result.o);
                                                                        if (ACBAOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACBARREL = parseFloat(result.rel);
                                                                        if (ACBARREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACBACR1 = parseFloat(result.c1);
                                                                        if (ACBACR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACBAORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                            && parseFloat(rows[33][columns[0][1].field]) < ACBATHKRN) {
                                                                            ACBACR2 = parseFloat(rows[33][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                            && parseFloat(rows[33][columns[0][1].field]) >= ACBATHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACBATHKRN + " mm").css("color", "red");
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
                                                        if (ACBACR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACBAA3;
                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                        ACBAA3 = parseFloat(rows[34][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACBAIsB;
                                                    if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                        ACBAIsB = rows[35][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACBABS = -1.0;
                                                    if (ACBAIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[36][columns[0][1].field]) > ACBADPO) {
                                                            ACBABS = parseFloat(rows[36][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[36][columns[0][1].field]) <= ACBADPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACBADPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */

                                                    let ACBAPC = ACBAPD + ACBAPS;

                                                    // 筒体
                                                    let ACBACS = ACBACS1 + ACBACS2;
                                                    let ACBATHKSE = ACBATHKSN - ACBACS;

                                                    // 接管
                                                    let ACBACP = ACBACP1 + ACBACP2;
                                                    let ACBATHKPE = ACBATHKPN - ACBACP;
                                                    let ACBADPC = ACBADPO - 2 * ACBATHKPN + 2 * ACBACP;
                                                    let ACBASA = ACBADPC / Math.cos(ACBAALPHA / 180 * Math.PI);
                                                    let ACBASB = ACBADPC;
                                                    let ACBAK = ACBASA / ACBASB;
                                                    if (ACBAK > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACBADOP = ACBASA;
                                                    if (ACBAIDOD === "内径") {
                                                        if (ACBADOP > ACBADSI / 2) {
                                                            south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                    }
                                                    else if (ACBAIDOD === "外径") {
                                                        if (ACBADOP > (ACBADSO - 2 * ACBATHKSN) / 2) {
                                                            south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACBAFP = Math.min(1.0, ACBAOPT / ACBAOST);

                                                    // 补强圈
                                                    let ACBACR = -1.0, ACBATHKRE = -1.0, ACBAFR = -1.0;
                                                    if (ACBAIsPAD === "是") {
                                                        ACBACR = ACBACR1 + ACBACR2;
                                                        ACBATHKRE = ACBATHKRN - ACBACR;
                                                        ACBAFR = Math.min(1.0, ACBAORT / ACBAOST);
                                                    }

                                                    /*
                                                    封头内压强度校核
                                                     */
                                                    let ACBATHKSC;
                                                    if (ACBAIDOD === "内径") {
                                                        ACBATHKSC = ACBAPC * ACBADSI / (4 * ACBAOST * ACBAES - ACBAPC);
                                                    }
                                                    else if (ACBAIDOD === "外径") {
                                                        ACBATHKSC = ACBAPC * ACBADSO / (4 * ACBAOST * ACBAES + ACBAPC);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACBATHKSD = ACBATHKSC + ACBACS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "封头内压所需厚度：" + (ACBATHKSD + ACBACS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACBATHKSCHK;
                                                    if (ACBATHKSN >= (ACBATHKSD + ACBACS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACBATHKSN + " mm" +
                                                            "</span>");
                                                        ACBATHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACBATHKSN + " mm" +
                                                            "</span>");
                                                        ACBATHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACBATHKPC = ACBAPC * ACBADPO / (2 * ACBAOPT * ACBAEP + ACBAPC);
                                                    let ACBATHKPD = ACBATHKPC + ACBACP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACBATHKPD + ACBACP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACBATHKPCHK;
                                                    if (ACBATHKPN >= (ACBATHKPD + ACBACP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACBATHKPN + " mm" +
                                                            "</span>");
                                                        ACBATHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACBATHKPN + " mm" +
                                                            "</span>");
                                                        ACBATHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACBABA = ACBADOP * ACBATHKSC + 2 * ACBATHKSC * ACBATHKPE * (1 - ACBAFP);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACBABA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 筒体
                                                    let ACBABB;
                                                    if (ACBAIsB === "是") {
                                                        ACBABB = Math.min(Math.max(2 * ACBADOP, ACBADOP + 2 * ACBATHKSN + 2 * ACBATHKPN), ACBABS);
                                                    }
                                                    else if (ACBAIsB === "否") {
                                                        ACBABB = Math.max(2 * ACBADOP, ACBADOP + 2 * ACBATHKSN + 2 * ACBATHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACBAA1 = (ACBABB - ACBADOP) * (ACBATHKSE - ACBATHKSC) - 2 * ACBATHKPE * (ACBATHKSE - ACBATHKSC) * (1 - ACBAFP);

                                                    // 接管
                                                    let ACBAHP1 = Math.min(ACBAHPO, Math.sqrt(ACBADOP * ACBATHKPN));
                                                    let ACBAHP2 = Math.min(ACBAHPI, Math.sqrt(ACBADOP * ACBATHKPN));
                                                    let ACBAA2 = 2 * ACBAHP1 * (ACBATHKPE - ACBATHKPC) * ACBAFP + 2 * ACBAHP2 * (ACBATHKPE - ACBACP2) * ACBAFP;

                                                    // 补强圈
                                                    let ACBAA4 = 0.0, ACBADRE = -1.0;
                                                    if (ACBAIsPAD === "是") {
                                                        ACBADRE = Math.min(ACBADRO, ACBABB);
                                                        ACBAA4 = (ACBADRE - ACBADPO) * ACBATHKRE * ACBAFR;
                                                    }

                                                    // Ae
                                                    let ACBAAE = ACBAA1 + ACBAA2 + ACBAA3 + ACBAA4;
                                                    let ACBAACHK;
                                                    if (ACBAAE >= ACBABA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACBAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACBAACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACBAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACBAACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACBAETA, ACBAPST, ACBAPPT, ACBAPT;
                                                    if (ACBATest === "液压试验") {
                                                        ACBAETA = 1.25;
                                                        ACBAPST = ACBAETA * ACBAPD * ACBAOS / Math.max(ACBAOST, ACBAOST1);
                                                        ACBAPPT = ACBAETA * ACBAPD * ACBAOP / Math.max(ACBAOPT, ACBAOPT1);
                                                        ACBAPT = Math.min(ACBAPST, ACBAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACBAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACBATest === "气压试验") {
                                                        ACBAETA = 1.10;
                                                        ACBAPST = ACBAETA * ACBAPD * ACBAOS / Math.max(ACBAOST, ACBAOST1);
                                                        ACBAPPT = ACBAETA * ACBAPD * ACBAOP / Math.max(ACBAOPT, ACBAOPT1);
                                                        ACBAPT = Math.min(ACBAPST, ACBAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACBAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */

                                                    // 筒体
                                                    let ACBAMAWPS;
                                                    if (ACBAIDOD === "内径") {
                                                        ACBAMAWPS = 4 * ACBATHKSE * ACBAOST * ACBAES / (ACBADSI + ACBATHKSE) - ACBAPS;
                                                    }
                                                    else if (ACBAIDOD === "外径") {
                                                        ACBAMAWPS = 4 * ACBATHKSE * ACBAOST * ACBAES / (ACBADSO - ACBATHKSE) - ACBAPS;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 接管
                                                    let ACBAMAWPP = 2 * ACBATHKPE * ACBAOPT * ACBAEP / (ACBADPO - ACBATHKPE) - ACBAPS;

                                                    // 开孔补强
                                                    let ACBAMAWPA1 = -1, ACBAMAWPA2 = -1,
                                                        ACBAMAWPA3 = ACBAA3, ACBAMAWPA4 = ACBAA4,
                                                        ACBAMAWPA = -1, ACBAMAWPAE = -1,
                                                        ACBAMAWPRC = ACBAPC;
                                                    let ACBAMAWPTHKSC, ACBAMAWPTHKPC;
                                                    while (ACBAMAWPAE >= ACBAMAWPA) {

                                                        ACBAMAWPRC += 0.0001;

                                                        // 封头计算厚度
                                                        if (ACBAIDOD === "内径") {
                                                            ACBAMAWPTHKSC = ACBAMAWPRC * ACBADSI / (4 * ACBAOST * ACBAES - ACBAPC);
                                                        }
                                                        else if (ACBAIDOD === "外径") {
                                                            ACBAMAWPTHKSC = ACBAMAWPRC * ACBADSO / (4 * ACBAOST * ACBAES + ACBAPC);
                                                        }
                                                        ACBAMAWPA = ACBADOP * ACBAMAWPTHKSC + 2 * ACBAMAWPTHKSC * ACBATHKPE * (1 - ACBAFP);

                                                        // 接管计算厚度
                                                        ACBAMAWPTHKPC = ACBAMAWPRC * ACBADPO / (2 * ACBAOPT * ACBAEP + ACBAPC);
                                                        ACBAMAWPA1 = (ACBABB - ACBADOP) * (ACBATHKSE - ACBAMAWPTHKSC) - 2 * ACBATHKPE * (ACBATHKSE - ACBAMAWPTHKSC) * (1 - ACBAFP);
                                                        ACBAMAWPA2 = 2 * ACBAHP1 * (ACBATHKPE - ACBAMAWPTHKPC) * ACBAFP + 2 * ACBAHP2 * (ACBATHKPE - ACBACP2) * ACBAFP;
                                                        ACBAMAWPAE = ACBAMAWPA1 + ACBAMAWPA2 + ACBAMAWPA3 + ACBAMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACBAMAWPR = ACBAMAWPRC - ACBAPS - 0.0001;
                                                    let ACBAMAWP = Math.min(ACBAMAWPS, ACBAMAWPP, ACBAMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACBAMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACBAPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "acbadocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACBA",

                                                                idod: ACBAIDOD,
                                                                isPad: ACBAIsPAD,
                                                                isB: ACBAIsB,

                                                                tag: ACBATag,
                                                                pd: ACBAPD,
                                                                t: ACBADT,
                                                                ps: ACBAPS,
                                                                test: ACBATest,

                                                                stds: ACBASSTDVal,
                                                                names: ACBASNameVal,
                                                                dsi: ACBADSI,
                                                                dso: ACBADSO,
                                                                thksn: ACBATHKSN,
                                                                cs2: ACBACS2,
                                                                es: ACBAES,

                                                                stdp: ACBAPSTDVal,
                                                                namep: ACBAPNameVal,
                                                                dpo: ACBADPO,
                                                                thkpn: ACBATHKPN,
                                                                hpo: ACBAHPO,
                                                                hpi: ACBAHPI,
                                                                alpha: ACBAALPHA,
                                                                cp2: ACBACP2,
                                                                ep: ACBAEP,

                                                                stdr: ACBARSTDVal,
                                                                namer: ACBARNameVal,
                                                                dro: ACBADRO,
                                                                thkrn: ACBATHKRN,
                                                                cr2: ACBACR2,

                                                                a3: ACBAA3,
                                                                bs: ACBABS,

                                                                ds: ACBADS.toFixed(4),
                                                                cs1: ACBACS1.toFixed(4),
                                                                rsel: ACBARSEL.toFixed(4),
                                                                ost: ACBAOST.toFixed(4),
                                                                os: ACBAOS.toFixed(4),
                                                                ost1: ACBAOST1.toFixed(4),

                                                                dp: ACBADP.toFixed(4),
                                                                cp1: ACBACP1.toFixed(4),
                                                                rpel: ACBARPEL.toFixed(4),
                                                                opt: ACBAOPT.toFixed(4),
                                                                op: ACBAOP.toFixed(4),
                                                                opt1: ACBAOPT1.toFixed(4),

                                                                dr: ACBADR.toFixed(4),
                                                                cr1: ACBACR1.toFixed(4),
                                                                rrel: ACBARREL.toFixed(4),
                                                                ort: ACBAORT.toFixed(4),
                                                                or: ACBAOR.toFixed(4),
                                                                ort1: ACBAORT1.toFixed(4),

                                                                pc: ACBAPC.toFixed(4),
                                                                cs: ACBACS.toFixed(4),
                                                                thkse: ACBATHKSE.toFixed(4),

                                                                cp: ACBACP.toFixed(4),
                                                                thkpe: ACBATHKPE.toFixed(4),
                                                                dpc: ACBADPC.toFixed(4),
                                                                sa: ACBASA.toFixed(4),
                                                                sb: ACBASB.toFixed(4),
                                                                k: ACBAK.toFixed(4),
                                                                dop: ACBADOP.toFixed(4),
                                                                fp: ACBAFP.toFixed(4),

                                                                cr: ACBACR.toFixed(4),
                                                                thkre: ACBATHKRE.toFixed(4),
                                                                fr: ACBAFR.toFixed(4),

                                                                thksc: ACBATHKSC.toFixed(4),
                                                                thksd: ACBATHKSD.toFixed(4),
                                                                thkschk: ACBATHKSCHK,

                                                                thkpc: ACBATHKPC.toFixed(4),
                                                                thkpd: ACBATHKPD.toFixed(4),
                                                                thkpchk: ACBATHKPCHK,

                                                                ba: ACBABA.toFixed(4),
                                                                bb: ACBABB.toFixed(4),
                                                                a1: ACBAA1.toFixed(4),
                                                                hp1: ACBAHP1.toFixed(4),
                                                                hp2: ACBAHP2.toFixed(4),
                                                                a2: ACBAA2.toFixed(4),
                                                                dre: ACBADRE.toFixed(4),
                                                                a4: ACBAA4.toFixed(4),
                                                                ae: ACBAAE.toFixed(4),
                                                                achk: ACBAACHK,

                                                                eta: ACBAETA.toFixed(4),
                                                                pst: ACBAPST.toFixed(4),
                                                                ppt: ACBAPPT.toFixed(4),
                                                                pt: ACBAPT.toFixed(4),

                                                                mawps: ACBAMAWPS.toFixed(4),
                                                                mawpp: ACBAMAWPP.toFixed(4),
                                                                mawpa1: ACBAMAWPA1.toFixed(0),
                                                                mawpa2: ACBAMAWPA2.toFixed(0),
                                                                mawpa3: ACBAMAWPA3,
                                                                mawpa4: ACBAMAWPA4.toFixed(0),
                                                                mawpa: ACBAMAWPA.toFixed(0),
                                                                mawpae: ACBAMAWPAE.toFixed(0),
                                                                mawpr: ACBAMAWPR.toFixed(4),
                                                                mawp: ACBAMAWP.toFixed(4)
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
                                                                    ACBAPayJS.dialog({
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
                                                                                ACBAPayJS.dialog("close");
                                                                                ACBAPayJS.dialog("clear");
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
                                                                                            ACBAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACBAPayJS.dialog('close');
                                                                                                    ACBAPayJS.dialog('clear');
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
                pg.propertygrid('options').finder.getTr(this, 11).hide();
                pg.propertygrid('options').finder.getTr(this, 27).hide();
                pg.propertygrid('options').finder.getTr(this, 28).hide();
                pg.propertygrid('options').finder.getTr(this, 29).hide();
                pg.propertygrid('options').finder.getTr(this, 30).hide();
                pg.propertygrid('options').finder.getTr(this, 31).hide();
                pg.propertygrid('options').finder.getTr(this, 32).hide();
                pg.propertygrid('options').finder.getTr(this, 33).hide();
                pg.propertygrid('options').finder.getTr(this, 36).hide();
            }
        });
    });
});