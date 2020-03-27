$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let acbbSketch = $("#d2");
    let acbbModel = $("#d3");
    let acbbd2d3 = $('#d2d3');

    $("#cal").html("<table id='acbb'></table>");
    let pg = $("#acbb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/b/b/ACBB.json", function (result) {

        let ACBBDT,
            ACBBSCategory, ACBBSCategoryVal, ACBBSType, ACBBSTypeVal, ACBBSSTD, ACBBSSTDVal, ACBBSName, ACBBSNameVal,
            ACBBPCategory, ACBBPCategoryVal, ACBBPType, ACBBPTypeVal, ACBBPSTD, ACBBPSTDVal, ACBBPName, ACBBPNameVal,
            ACBBRCategory, ACBBRCategoryVal, ACBBRType, ACBBRTypeVal, ACBBRSTD, ACBBRSTDVal, ACBBRName, ACBBRNameVal,
            columns, rows, ed;

        // 壳体内径
        function acbb2d(idod, dsi = "ΦDsi", dso = "ΦDso", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", alpha = "α",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            acbbSketch.empty();
            let width = acbbSketch.width();
            let height = acbbSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACBBSVG").attr("height", height);

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
            drawCenterLine(padding + wg, padding + hg - 10, padding + wg, padding + 2 * hg + thk + 10);
            // 左侧接管
            svg.append("path").attr("d", line([
                {x: padding + 0.5 * wg - thk, y: padding + hg},
                {x: padding + 0.5 * wg - thk, y: padding + 2 * hg},
                {x: padding + 0.5 * wg, y: padding + 2 * hg},
                {x: padding + 0.5 * wg, y: padding + hg},
                {x: padding + 0.5 * wg - thk, y: padding + hg}
            ])).classed("sketch", true);
            drawLine(padding + 0.5 * wg, padding + hg, padding + wg, padding + hg);
            drawLine(padding + 0.5 * wg, padding + 2 * hg, padding + wg, padding + 2 * hg);
            drawLine(padding + 0.5 * wg - thk, padding + 2 * hg + thk, padding + wg, padding + 2 * hg + thk);
            drawLine(padding + 0.5 * wg, padding + 2 * hg + thk, padding + 0.5 * wg, padding + 2 * hg);
            // 右侧接管
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg, y: padding + hg},
                {x: padding + 1.5 * wg, y: padding + 2 * hg},
                {x: padding + 1.5 * wg + thk, y: padding + 2 * hg},
                {x: padding + 1.5 * wg + thk, y: padding + hg},
                {x: padding + 1.5 * wg, y: padding + hg}
            ])).classed("sketch", true);
            drawLine(padding + 1.5 * wg, padding + 2 * hg, padding + 1.5 * wg, padding + 2 * hg + thk);
            drawLine(padding + 1.5 * wg, padding + hg, padding + wg, padding + hg);
            drawLine(padding + 1.5 * wg, padding + 2 * hg + thk, padding + wg, padding + 2 * hg + thk);

            // 左侧封头
            drawLine(padding - 2 * thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + 2 * hg);
            drawLine(padding - 2 * thk, padding + 2 * hg + thk, padding + 0.5 * wg - thk, padding + 2 * hg + thk);

            // 右侧封头
            drawLine(padding + 2 * wg + 2 * thk, padding + 2 * hg, padding + wg, padding + 2 * hg);
            drawLine(padding + 2 * wg + 2 * thk, padding + 2 * hg + thk, padding + 1.5 * wg, padding + 2 * hg + thk);

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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACBBSketchDRO");
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
                ])).attr("id", "ACBBSketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACBBSketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACBBSketchDPO");

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
            ])).attr("id", "ACBBSketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACBBSketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACBBSketchHPO");

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
            ])).attr("id", "ACBBSketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACBBSketchTHKSN").attr("startOffset", "50%").text(thksn);

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
                ])).attr("id", "ACBBSketchDSI").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACBBSketchDSI").attr("startOffset", "50%").text(dsi);
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
                ])).attr("id", "ACBBSketchDSO").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACBBSketchDSO").attr("startOffset", "50%").text(dso);
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
            ).classed("sketch", true).attr("id", "ACBBSketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACBBSketchALPHA").attr("startOffset", "50%").text(alpha);
        }

        currentTabIndex = acbbd2d3.tabs('getTabIndex', acbbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            acbb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#acbb").length > 0) {
                    acbb2d();
                }
            });
        }
        acbbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    acbb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#acbb").length > 0) {
                            acbb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 球形封头安放式接管开孔补强计算",
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
                    || index === 26 || index === 27 || index === 28
                    || index === 29 || index === 30 || index === 31 || index === 32
                    || index === 35) {
                    pg.propertygrid('options').finder.getTr(this, index).hide();
                }
            },
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.propertygrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 5) {
                    $(ed.target).combobox("loadData", ACBBSCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ACBBSType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACBBSSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACBBSName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", ACBBPCategory);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", ACBBPType);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", ACBBPSTD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", ACBBPName);
                }

                else if (index === 26) {
                    $(ed.target).combobox("loadData", ACBBRCategory);
                }
                else if (index === 27) {
                    $(ed.target).combobox("loadData", ACBBRType);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", ACBBRSTD);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", ACBBRName);
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
                    acbbSketch.empty();
                    acbbModel.empty();

                    // sketch
                    currentTabIndex = acbbd2d3.tabs('getTabIndex', acbbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        acbb2d();
                        acbbSketch.off("resize").on("resize", function () {
                            if ($("#acbb").length > 0) {
                                acbb2d();
                            }
                        });
                    }
                    acbbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acbb2d();
                                acbbSketch.off("resize").on("resize", function () {
                                    if ($("#acbb").length > 0) {
                                        acbb2d();
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

                        ACBBDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ACBBSCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACBBSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACBBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACBBSName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        ACBBPCategory = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACBBPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACBBPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACBBPName = null;

                        rows[26][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 26);
                        ACBBRCategory = null;
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        ACBBRType = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACBBRSTD = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACBBRName = null;

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
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBSCategory = [];
                                ACBBPCategory = [];
                                ACBBRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACBBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACBBSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACBBPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACBBRCategory[index] = {
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

                        ACBBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACBBSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACBBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACBBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBSCategoryVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBSType = [];
                                $(result).each(function (index, element) {
                                    ACBBSType[index] = {
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

                        ACBBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACBBSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACBBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBSCategoryVal,
                                type: ACBBSTypeVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBSSTD = [];
                                $(result).each(function (index, element) {
                                    ACBBSSTD[index] = {
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

                        ACBBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACBBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBSCategoryVal,
                                type: ACBBSTypeVal,
                                std: ACBBSSTDVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBSName = [];
                                $(result).each(function (index, element) {
                                    ACBBSName[index] = {
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

                        ACBBPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACBBPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACBBPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACBBPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBPCategoryVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBPType = [];
                                $(result).each(function (index, element) {
                                    ACBBPType[index] = {
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

                        ACBBPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACBBPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACBBPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBPCategoryVal,
                                type: ACBBPTypeVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBPSTD = [];
                                $(result).each(function (index, element) {
                                    ACBBPSTD[index] = {
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

                        ACBBPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACBBPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBPCategoryVal,
                                type: ACBBPTypeVal,
                                std: ACBBPSTDVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBPName = [];
                                $(result).each(function (index, element) {
                                    ACBBPName[index] = {
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
                    if (index === 26) {

                        ACBBRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        ACBBRType = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACBBRSTD = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACBBRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBRCategoryVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBRType = [];
                                $(result).each(function (index, element) {
                                    ACBBRType[index] = {
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
                    if (index === 27) {

                        ACBBRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACBBRSTD = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACBBRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBRCategoryVal,
                                type: ACBBRTypeVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBRSTD = [];
                                $(result).each(function (index, element) {
                                    ACBBRSTD[index] = {
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
                    if (index === 28) {

                        ACBBRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACBBRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACBBRCategoryVal,
                                type: ACBBRTypeVal,
                                std: ACBBRSTDVal,
                                temp: ACBBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACBBRName = [];
                                $(result).each(function (index, element) {
                                    ACBBRName[index] = {
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
                    // UI - ID/OD
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
                    let ACBBTag = "/";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACBBTag = rows[0][columns[0][1].field];
                    }

                    // 设计压力
                    let ACBBPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACBBPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACBBPS;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        ACBBPS = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACBBTest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACBBTest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 圆筒材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        ACBBSNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取封头材料密度、最大最小厚度
                    let ACBBDS, ACBBSThkMin, ACBBSThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACBBSCategoryVal,
                            "type": ACBBSTypeVal,
                            "std": ACBBSSTDVal,
                            "name": ACBBSNameVal,
                            "temp": ACBBDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACBBDS = parseFloat(result.density);
                            ACBBSThkMin = parseFloat(result.thkMin);
                            ACBBSThkMax = parseFloat(result.thkMax);

                            // IDOD
                            let ACBBIDOD;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                ACBBIDOD = rows[9][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acbb2d(ACBBIDOD);
                                acbbSketch.off("resize").on("resize", function () {
                                    if ($("#acbb").length > 0) {
                                        acbb2d(ACBBIDOD);
                                    }
                                });
                            }
                            acbbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acbb2d(ACBBIDOD);
                                        acbbSketch.off("resize").on("resize", function () {
                                            if ($("#acbb").length > 0) {
                                                acbb2d(ACBBIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACBBDSI = -1, ACBBDSO = -1;
                            if (ACBBIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    ACBBDSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (ACBBIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    ACBBDSO = parseFloat(rows[11][columns[0][1].field]);
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
                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO);
                                acbbSketch.off("resize").on("resize", function () {
                                    if ($("#acbb").length > 0) {
                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO);
                                    }
                                });
                            }
                            acbbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO);
                                        acbbSketch.off("resize").on("resize", function () {
                                            if ($("#acbb").length > 0) {
                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKSN
                            let ACBBTHKSN;
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACBBSThkMin
                                && parseFloat(rows[12][columns[0][1].field]) <= ACBBSThkMax) {
                                ACBBTHKSN = parseFloat(rows[12][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) <= ACBBSThkMin) {
                                south.html("封头材料厚度不能小于等于 " + ACBBSThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACBBSThkMax) {
                                south.html("封头材料厚度不能大于 " + ACBBSThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN);
                                acbbSketch.off("resize").on("resize", function () {
                                    if ($("#acbb").length > 0) {
                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN);
                                    }
                                });
                            }
                            acbbd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN);
                                        acbbSketch.off("resize").on("resize", function () {
                                            if ($("#acbb").length > 0) {
                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            /*
                            获取封头力学特性
                             */
                            let ACBBOST, ACBBOS, ACBBOST1, ACBBRSEL, ACBBCS1;

                            // 确定查询参数中的 od
                            let ACBBOD;
                            if (ACBBIDOD === "内径") {
                                ACBBOD = ACBBDSI + 2 * ACBBTHKSN;
                            }
                            else if (ACBBIDOD === "外径") {
                                ACBBOD = ACBBDSO;
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
                                    "category": ACBBSCategoryVal,
                                    "type": ACBBSTypeVal,
                                    "std": ACBBSSTDVal,
                                    "name": ACBBSNameVal,
                                    "thk": ACBBTHKSN,
                                    "temp": ACBBDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACBBOD
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACBBOST = parseFloat(result.ot);
                                    if (ACBBOST < 0) {
                                        south.html("查询球形封头材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACBBOS = parseFloat(result.o);
                                    if (ACBBOS < 0) {
                                        south.html("查询球形封头材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACBBRSEL = parseFloat(result.rel);
                                    if (ACBBRSEL < 0) {
                                        south.html("查询球形封头材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACBBCS1 = parseFloat(result.c1);
                                    if (ACBBCS1 < 0) {
                                        south.html("查询球形封头材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACBBOST1 = parseFloat(result.ot1);

                                    let ACBBCS2;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < ACBBTHKSN) {
                                        ACBBCS2 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= ACBBTHKSN) {
                                        south.html("封头腐蚀裕量不能大于等于 " + ACBBTHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACBBES;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        ACBBES = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        ACBBPNameVal = rows[18][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACBBDP, ACBBPThkMin, ACBBPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACBBPCategoryVal,
                                            "type": ACBBPTypeVal,
                                            "std": ACBBPSTDVal,
                                            "name": ACBBPNameVal,
                                            "temp": ACBBDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACBBDP = parseFloat(result.density);
                                            ACBBPThkMin = parseFloat(result.thkMin);
                                            ACBBPThkMax = parseFloat(result.thkMax);

                                            let ACBBDPO;
                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                ACBBDPO = parseFloat(rows[19][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO);
                                                acbbSketch.off("resize").on("resize", function () {
                                                    if ($("#acbb").length > 0) {
                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO);
                                                    }
                                                });
                                            }
                                            acbbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO);
                                                        acbbSketch.off("resize").on("resize", function () {
                                                            if ($("#acbb").length > 0) {
                                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKPN
                                            let ACBBTHKPN;
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > ACBBPThkMin
                                                && parseFloat(rows[20][columns[0][1].field]) <= Math.min(ACBBPThkMax, ACBBDPO / 2)) {
                                                ACBBTHKPN = parseFloat(rows[20][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) <= ACBBPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACBBPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > Math.min(ACBBPThkMax, ACBBDPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACBBPThkMax, ACBBDPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO, ACBBTHKPN);
                                                acbbSketch.off("resize").on("resize", function () {
                                                    if ($("#acbb").length > 0) {
                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO, ACBBTHKPN);
                                                    }
                                                });
                                            }
                                            acbbd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO, ACBBTHKPN);
                                                        acbbSketch.off("resize").on("resize", function () {
                                                            if ($("#acbb").length > 0) {
                                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO, ACBBTHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACBBOPT, ACBBOP, ACBBOPT1, ACBBRPEL, ACBBCP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACBBPCategoryVal,
                                                    "type": ACBBPTypeVal,
                                                    "std": ACBBPSTDVal,
                                                    "name": ACBBPNameVal,
                                                    "thk": ACBBTHKPN,
                                                    "temp": ACBBDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACBBDPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACBBOPT = parseFloat(result.ot);
                                                    if (ACBBOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACBBOP = parseFloat(result.o);
                                                    if (ACBBOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACBBRPEL = parseFloat(result.rel);
                                                    if (ACBBRPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACBBCP1 = parseFloat(result.c1);
                                                    if (ACBBCP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACBBOPT1 = parseFloat(result.ot1);

                                                    let ACBBHPO;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        ACBBHPO = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO);
                                                        acbbSketch.off("resize").on("resize", function () {
                                                            if ($("#acbb").length > 0) {
                                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO);
                                                            }
                                                        });
                                                    }
                                                    acbbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO);
                                                                acbbSketch.off("resize").on("resize", function () {
                                                                    if ($("#acbb").length > 0) {
                                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN, "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACBBALPHA;
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        ACBBALPHA = parseFloat(rows[22][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                            "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                            ACBBALPHA + "°");
                                                        acbbSketch.off("resize").on("resize", function () {
                                                            if ($("#acbb").length > 0) {
                                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                    "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                    ACBBALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    acbbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                    "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                    ACBBALPHA + "°");
                                                                acbbSketch.off("resize").on("resize", function () {
                                                                    if ($("#acbb").length > 0) {
                                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                            "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                            ACBBALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACBBCP2;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                        && parseFloat(rows[23][columns[0][1].field]) < ACBBTHKPN) {
                                                        ACBBCP2 = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                        && parseFloat(rows[23][columns[0][1].field]) >= ACBBTHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACBBTHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACBBEP;
                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])) {
                                                        ACBBEP = parseFloat(rows[24][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACBBIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        ACBBIsPAD = rows[25][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                            "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                            ACBBALPHA + "°", ACBBIsPAD);
                                                        acbbSketch.off("resize").on("resize", function () {
                                                            if ($("#acbb").length > 0) {
                                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                    "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                    ACBBALPHA + "°", ACBBIsPAD);
                                                            }
                                                        });
                                                    }
                                                    acbbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                    "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                    ACBBALPHA + "°", ACBBIsPAD);
                                                                acbbSketch.off("resize").on("resize", function () {
                                                                    if ($("#acbb").length > 0) {
                                                                        acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                            "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                            ACBBALPHA + "°", ACBBIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACBBDR = -1.0, ACBBRThkMin = -1.0, ACBBRThkMax = -1.0;
                                                    let ACBBDRO = -1.0, ACBBTHKRN = -1.0, ACBBCR2 = -1.0;
                                                    let ACBBORT = -1.0, ACBBOR = -1.0, ACBBORT1 = -1.0, ACBBRREL = -1.0,
                                                        ACBBCR1 = -1.0;
                                                    if (ACBBIsPAD === "是") {

                                                        if (ACBBTHKSN > 38) {
                                                            south.html("封头厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (ACBBSCategoryVal === "碳素钢和低合金钢" && ACBBRSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[29][columns[0][1].field])) {
                                                            ACBBRNameVal = rows[29][columns[0][1].field];
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
                                                                "category": ACBBRCategoryVal,
                                                                "type": ACBBRTypeVal,
                                                                "std": ACBBRSTDVal,
                                                                "name": ACBBRNameVal,
                                                                "temp": ACBBDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACBBDR = parseFloat(result.density);
                                                                ACBBRThkMin = parseFloat(result.thkMin);
                                                                ACBBRThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                    && parseFloat(rows[30][columns[0][1].field]) > ACBBDPO) {
                                                                    ACBBDRO = parseFloat(rows[30][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])
                                                                    && parseFloat(rows[30][columns[0][1].field]) <= ACBBDPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACBBDPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                        "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                        ACBBALPHA + "°", ACBBIsPAD, "Φ" + ACBBDRO);
                                                                    acbbSketch.off("resize").on("resize", function () {
                                                                        if ($("#acbb").length > 0) {
                                                                            acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                                "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                                ACBBALPHA + "°", ACBBIsPAD, "Φ" + ACBBDRO);
                                                                        }
                                                                    });
                                                                }
                                                                acbbd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                                "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                                ACBBALPHA + "°", ACBBIsPAD, "Φ" + ACBBDRO);
                                                                            acbbSketch.off("resize").on("resize", function () {
                                                                                if ($("#acbb").length > 0) {
                                                                                    acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                                        "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                                        ACBBALPHA + "°", ACBBIsPAD, "Φ" + ACBBDRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                    && parseFloat(rows[31][columns[0][1].field]) > ACBBRThkMin
                                                                    && parseFloat(rows[31][columns[0][1].field]) <= Math.min(ACBBRThkMax, 1.5 * ACBBTHKSN)) {
                                                                    ACBBTHKRN = parseFloat(rows[31][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                    && parseFloat(rows[31][columns[0][1].field]) <= ACBBRThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACBBRThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                    && parseFloat(rows[31][columns[0][1].field]) > Math.min(ACBBRThkMax, 1.5 * ACBBTHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACBBRThkMax, 1.5 * ACBBTHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                        "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                        ACBBALPHA + "°", ACBBIsPAD, "Φ" + ACBBDRO, ACBBTHKRN);
                                                                    acbbSketch.off("resize").on("resize", function () {
                                                                        if ($("#acbb").length > 0) {
                                                                            acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                                "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                                ACBBALPHA + "°", ACBBIsPAD, "Φ" + ACBBDRO, ACBBTHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                acbbd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                                "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                                ACBBALPHA + "°", ACBBIsPAD, "Φ" + ACBBDRO, ACBBTHKRN);
                                                                            acbbSketch.off("resize").on("resize", function () {
                                                                                if ($("#acbb").length > 0) {
                                                                                    acbb2d(ACBBIDOD, "Φ" + ACBBDSI, "Φ" + ACBBDSO, ACBBTHKSN,
                                                                                        "Φ" + ACBBDPO, ACBBTHKPN, ACBBHPO,
                                                                                        ACBBALPHA + "°", ACBBIsPAD, "Φ" + ACBBDRO, ACBBTHKRN);
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
                                                                        "category": ACBBRCategoryVal,
                                                                        "type": ACBBRTypeVal,
                                                                        "std": ACBBRSTDVal,
                                                                        "name": ACBBRNameVal,
                                                                        "thk": ACBBTHKRN,
                                                                        "temp": ACBBDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACBBDRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACBBORT = parseFloat(result.ot);
                                                                        if (ACBBORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACBBOR = parseFloat(result.o);
                                                                        if (ACBBOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACBBRREL = parseFloat(result.rel);
                                                                        if (ACBBRREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACBBCR1 = parseFloat(result.c1);
                                                                        if (ACBBCR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACBBORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                            && parseFloat(rows[32][columns[0][1].field]) < ACBBTHKRN) {
                                                                            ACBBCR2 = parseFloat(rows[32][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                            && parseFloat(rows[32][columns[0][1].field]) >= ACBBTHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACBBTHKRN + " mm").css("color", "red");
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
                                                        if (ACBBCR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACBBA3;
                                                    if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])) {
                                                        ACBBA3 = parseFloat(rows[33][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACBBIsB;
                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                        ACBBIsB = rows[34][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACBBBS = -1.0;
                                                    if (ACBBIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[35][columns[0][1].field]) > ACBBDPO) {
                                                            ACBBBS = parseFloat(rows[35][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[35][columns[0][1].field]) <= ACBBDPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACBBDPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */
                                                    let ACBBPC = ACBBPD + ACBBPS;

                                                    // 封头
                                                    let ACBBCS = ACBBCS1 + ACBBCS2;
                                                    let ACBBTHKSE = ACBBTHKSN - ACBBCS;

                                                    // 接管
                                                    let ACBBCP = ACBBCP1 + ACBBCP2;
                                                    let ACBBTHKPE = ACBBTHKPN - ACBBCP;
                                                    let ACBBDPC = ACBBDPO - 2 * ACBBTHKPN + 2 * ACBBCP1 + 2 * ACBBCS2;
                                                    let ACBBSA = ACBBDPC / Math.cos(ACBBALPHA / 180 * Math.PI);
                                                    let ACBBSB = ACBBDPC;
                                                    let ACBBK = ACBBSA / ACBBSB;
                                                    if (ACBBK > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACBBDOP = ACBBSA;
                                                    if (ACBBIDOD === "内径") {
                                                        if (ACBBDOP > ACBBDSI / 2) {
                                                            south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                    }
                                                    else if (ACBBIDOD === "外径") {
                                                        if (ACBBDOP > (ACBBDSO - 2 * ACBBTHKSN) / 2) {
                                                            south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                            return false;
                                                        }
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACBBFP = Math.min(1.0, ACBBOPT / ACBBOST);

                                                    // 补强圈
                                                    let ACBBCR = -1.0, ACBBTHKRE = -1.0, ACBBFR = -1.0;
                                                    if (ACBBIsPAD === "是") {
                                                        ACBBCR = ACBBCR1 + ACBBCR2;
                                                        ACBBTHKRE = ACBBTHKRN - ACBBCR;
                                                        ACBBFR = Math.min(1.0, ACBBORT / ACBBOST);
                                                    }

                                                    /*
                                                    封头内压强度校核
                                                     */
                                                    let ACBBTHKSC;
                                                    if (ACBBIDOD === "内径") {
                                                        ACBBTHKSC = ACBBPC * ACBBDSI / (4 * ACBBOST * ACBBES - ACBBPC);
                                                    }
                                                    else if (ACBBIDOD === "外径") {
                                                        ACBBTHKSC = ACBBPC * ACBBDSO / (4 * ACBBOST * ACBBES + ACBBPC);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACBBTHKSD = ACBBTHKSC + ACBBCS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "封头内压所需厚度：" + (ACBBTHKSD + ACBBCS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACBBTHKSCHK;
                                                    if (ACBBTHKSN >= (ACBBTHKSD + ACBBCS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACBBTHKSN + " mm" +
                                                            "</span>");
                                                        ACBBTHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACBBTHKSN + " mm" +
                                                            "</span>");
                                                        ACBBTHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACBBTHKPC = ACBBPC * ACBBDPO / (2 * ACBBOPT * ACBBEP + ACBBPC);
                                                    let ACBBTHKPD = ACBBTHKPC + ACBBCP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACBBTHKPD + ACBBCP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACBBTHKPCHK;
                                                    if (ACBBTHKPN >= (ACBBTHKPD + ACBBCP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACBBTHKPN + " mm" +
                                                            "</span>");
                                                        ACBBTHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACBBTHKPN + " mm" +
                                                            "</span>");
                                                        ACBBTHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACBBBA = ACBBDOP * ACBBTHKSC;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACBBBA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 封头
                                                    let ACBBBB;
                                                    if (ACBBIsB === "是") {
                                                        ACBBBB = Math.min(Math.max(2 * ACBBDOP, ACBBDOP + 2 * ACBBTHKSN + 2 * ACBBTHKPN), ACBBBS);
                                                    }
                                                    else if (ACBBIsB === "否") {
                                                        ACBBBB = Math.max(2 * ACBBDOP, ACBBDOP + 2 * ACBBTHKSN + 2 * ACBBTHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACBBA1 = (ACBBBB - ACBBDOP) * (ACBBTHKSE - ACBBTHKSC);

                                                    // 接管
                                                    let ACBBHP1 = Math.min(ACBBHPO, Math.sqrt(ACBBDOP * ACBBTHKPN));
                                                    let ACBBA2 = 2 * ACBBHP1 * (ACBBTHKPE - ACBBTHKPC) * ACBBFP;

                                                    // 补强圈
                                                    let ACBBDRE = -1.0, ACBBA4 = 0.0;
                                                    if (ACBBIsPAD === "是") {
                                                        ACBBDRE = Math.min(ACBBDRO, ACBBBB);
                                                        ACBBA4 = (ACBBDRE - ACBBDPO) * ACBBTHKRE * ACBBFR;
                                                    }

                                                    // Ae
                                                    let ACBBAE = ACBBA1 + ACBBA2 + ACBBA3 + ACBBA4;
                                                    let ACBBACHK;
                                                    if (ACBBAE >= ACBBBA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACBBAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACBBACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACBBAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACBBACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACBBETA, ACBBPST, ACBBPPT, ACBBPT;
                                                    if (ACBBTest === "液压试验") {
                                                        ACBBETA = 1.25;
                                                        ACBBPST = ACBBETA * ACBBPD * ACBBOS / Math.max(ACBBOST, ACBBOST1);
                                                        ACBBPPT = ACBBETA * ACBBPD * ACBBOP / Math.max(ACBBOPT, ACBBOPT1);
                                                        ACBBPT = Math.min(ACBBPST, ACBBPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACBBPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACBBTest === "气压试验") {
                                                        ACBBETA = 1.10;
                                                        ACBBPST = ACBBETA * ACBBPD * ACBBOS / Math.max(ACBBOST, ACBBOST1);
                                                        ACBBPPT = ACBBETA * ACBBPD * ACBBOP / Math.max(ACBBOPT, ACBBOPT1);
                                                        ACBBPT = Math.min(ACBBPST, ACBBPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACBBPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */
                                                    // 封头
                                                    let ACBBMAWPS;
                                                    if (ACBBIDOD === "内径") {
                                                        ACBBMAWPS = 4 * ACBBTHKSE * ACBBOST * ACBBES / (ACBBDSI + ACBBTHKSE) - ACBBPS;
                                                    }
                                                    else if (ACBBIDOD === "外径") {
                                                        ACBBMAWPS = 4 * ACBBTHKSE * ACBBOST * ACBBES / (ACBBDSO - ACBBTHKSE) - ACBBPS;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 接管
                                                    let ACBBMAWPP = 2 * ACBBTHKPE * ACBBOPT * ACBBEP / (ACBBDPO - ACBBTHKPE) - ACBBPS;

                                                    // 开孔补强
                                                    let ACBBMAWPA1 = -1, ACBBMAWPA2 = -1,
                                                        ACBBMAWPA3 = ACBBA3, ACBBMAWPA4 = ACBBA4,
                                                        ACBBMAWPA = -1, ACBBMAWPAE = -1,
                                                        ACBBMAWPRC = ACBBPC;
                                                    let ACBBMAWPTHKSC, ACBBMAWPTHKPC;
                                                    while (ACBBMAWPAE >= ACBBMAWPA) {

                                                        ACBBMAWPRC += 0.0001;

                                                        // 封头计算厚度
                                                        if (ACBBIDOD === "内径") {
                                                            ACBBMAWPTHKSC = ACBBMAWPRC * ACBBDSI / (4 * ACBBOST * ACBBES - ACBBPC);
                                                        }
                                                        else if (ACBBIDOD === "外径") {
                                                            ACBBMAWPTHKSC = ACBBMAWPRC * ACBBDSO / (4 * ACBBOST * ACBBES + ACBBPC);
                                                        }
                                                        ACBBMAWPA = ACBBDOP * ACBBMAWPTHKSC;

                                                        // 接管计算厚度
                                                        ACBBMAWPTHKPC = ACBBMAWPRC * ACBBDPO / (2 * ACBBOPT * ACBBEP + ACBBPC);

                                                        ACBBMAWPA1 = (ACBBBB - ACBBDOP) * (ACBBTHKSE - ACBBMAWPTHKSC);
                                                        ACBBMAWPA2 = 2 * ACBBHP1 * (ACBBTHKPE - ACBBMAWPTHKPC) * ACBBFP;

                                                        ACBBMAWPAE = ACBBMAWPA1 + ACBBMAWPA2 + ACBBMAWPA3 + ACBBMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACBBMAWPR = ACBBMAWPRC - ACBBPS - 0.0001;
                                                    let ACBBMAWP = Math.min(ACBBMAWPS, ACBBMAWPP, ACBBMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACBBMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACBBPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "acbbdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACBB",

                                                                idod: ACBBIDOD,
                                                                isPad: ACBBIsPAD,
                                                                isB: ACBBIsB,

                                                                tag: ACBBTag,
                                                                pd: ACBBPD,
                                                                t: ACBBDT,
                                                                ps: ACBBPS,
                                                                test: ACBBTest,

                                                                stds: ACBBSSTDVal,
                                                                names: ACBBSNameVal,
                                                                dsi: ACBBDSI,
                                                                dso: ACBBDSO,
                                                                thksn: ACBBTHKSN,
                                                                cs2: ACBBCS2,
                                                                es: ACBBES,

                                                                stdp: ACBBPSTDVal,
                                                                namep: ACBBPNameVal,
                                                                dpo: ACBBDPO,
                                                                thkpn: ACBBTHKPN,
                                                                hpo: ACBBHPO,
                                                                alpha: ACBBALPHA,
                                                                cp2: ACBBCP2,
                                                                ep: ACBBEP,

                                                                stdr: ACBBRSTDVal,
                                                                namer: ACBBRNameVal,
                                                                dro: ACBBDRO,
                                                                thkrn: ACBBTHKRN,
                                                                cr2: ACBBCR2,

                                                                a3: ACBBA3,
                                                                bs: ACBBBS,

                                                                ds: ACBBDS.toFixed(4),
                                                                cs1: ACBBCS1.toFixed(4),
                                                                rsel: ACBBRSEL.toFixed(4),
                                                                ost: ACBBOST.toFixed(4),
                                                                os: ACBBOS.toFixed(4),
                                                                ost1: ACBBOST1.toFixed(4),

                                                                dp: ACBBDP.toFixed(4),
                                                                cp1: ACBBCP1.toFixed(4),
                                                                rpel: ACBBRPEL.toFixed(4),
                                                                opt: ACBBOPT.toFixed(4),
                                                                op: ACBBOP.toFixed(4),
                                                                opt1: ACBBOPT1.toFixed(4),

                                                                dr: ACBBDR.toFixed(4),
                                                                cr1: ACBBCR1.toFixed(4),
                                                                rrel: ACBBRREL.toFixed(4),
                                                                ort: ACBBORT.toFixed(4),
                                                                or: ACBBOR.toFixed(4),
                                                                ort1: ACBBORT1.toFixed(4),

                                                                pc: ACBBPC.toFixed(4),
                                                                cs: ACBBCS.toFixed(4),
                                                                thkse: ACBBTHKSE.toFixed(4),

                                                                cp: ACBBCP.toFixed(4),
                                                                thkpe: ACBBTHKPE.toFixed(4),
                                                                dpc: ACBBDPC.toFixed(4),
                                                                sa: ACBBSA.toFixed(4),
                                                                sb: ACBBSB.toFixed(4),
                                                                k: ACBBK.toFixed(4),
                                                                dop: ACBBDOP.toFixed(4),
                                                                fp: ACBBFP.toFixed(4),

                                                                cr: ACBBCR.toFixed(4),
                                                                thkre: ACBBTHKRE.toFixed(4),
                                                                fr: ACBBFR.toFixed(4),

                                                                thksc: ACBBTHKSC.toFixed(4),
                                                                thksd: ACBBTHKSD.toFixed(4),
                                                                thkschk: ACBBTHKSCHK,

                                                                thkpc: ACBBTHKPC.toFixed(4),
                                                                thkpd: ACBBTHKPD.toFixed(4),
                                                                thkpchk: ACBBTHKPCHK,

                                                                ba: ACBBBA.toFixed(4),
                                                                bb: ACBBBB.toFixed(4),
                                                                a1: ACBBA1.toFixed(4),
                                                                hp1: ACBBHP1.toFixed(4),
                                                                a2: ACBBA2.toFixed(4),
                                                                dre: ACBBDRE.toFixed(4),
                                                                a4: ACBBA4.toFixed(4),
                                                                ae: ACBBAE.toFixed(4),
                                                                achk: ACBBACHK,

                                                                eta: ACBBETA.toFixed(4),
                                                                pst: ACBBPST.toFixed(4),
                                                                ppt: ACBBPPT.toFixed(4),
                                                                pt: ACBBPT.toFixed(4),

                                                                mawps: ACBBMAWPS.toFixed(4),
                                                                mawpp: ACBBMAWPP.toFixed(4),
                                                                mawpa1: ACBBMAWPA1.toFixed(0),
                                                                mawpa2: ACBBMAWPA2.toFixed(0),
                                                                mawpa3: ACBBMAWPA3,
                                                                mawpa4: ACBBMAWPA4.toFixed(0),
                                                                mawpa: ACBBMAWPA.toFixed(0),
                                                                mawpae: ACBBMAWPAE.toFixed(0),
                                                                mawpr: ACBBMAWPR.toFixed(4),
                                                                mawp: ACBBMAWP.toFixed(4)
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
                                                                    ACBBPayJS.dialog({
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
                                                                                ACBBPayJS.dialog("close");
                                                                                ACBBPayJS.dialog("clear");
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
                                                                                            ACBBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACBBPayJS.dialog('close');
                                                                                                    ACBBPayJS.dialog('clear');
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