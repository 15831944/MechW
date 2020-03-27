$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let acabSketch = $("#d2");
    let acabModel = $("#d3");
    let acabd2d3 = $('#d2d3');

    $("#cal").html("<table id='acab'></table>");
    let pg = $("#acab");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/a/b/ACAB.json", function (result) {

        let ACABDT,
            ACABSCategory, ACABSCategoryVal, ACABSType, ACABSTypeVal, ACABSSTD, ACABSSTDVal, ACABSName, ACABSNameVal,
            ACABPCategory, ACABPCategoryVal, ACABPType, ACABPTypeVal, ACABPSTD, ACABPSTDVal, ACABPName, ACABPNameVal,
            ACABRCategory, ACABRCategoryVal, ACABRType, ACABRTypeVal, ACABRSTD, ACABRSTDVal, ACABRName, ACABRNameVal,
            columns, rows, ed;

        // 壳体内径
        function acab2d(idod, dsi = "ΦDsi", dso = "ΦDso", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", alpha = "α", l = "L",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            acabSketch.empty();
            let width = acabSketch.width();
            let height = acabSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACABSVG").attr("height", height);

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

            // 左侧筒体
            drawLine(padding - 2 * thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + 2 * hg);
            drawLine(padding - 2 * thk, padding + 2 * hg + thk, padding + 0.5 * wg - thk, padding + 2 * hg + thk);

            // 右侧筒体
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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACABSketchDRO");
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
                ])).attr("id", "ACABSketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACABSketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACABSketchDPO");

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
            ])).attr("id", "ACABSketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACABSketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACABSketchHPO");

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
            ])).attr("id", "ACABSketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACABSketchTHKSN").attr("startOffset", "50%").text(thksn);

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
                ])).attr("id", "ACABSketchDSI").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACABSketchDSI").attr("startOffset", "50%").text(dsi);
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
                ])).attr("id", "ACABSketchDSO").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACABSketchDSO").attr("startOffset", "50%").text(dso);
            }

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
            ).classed("sketch", true).attr("id", "ACABSketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACABSketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "ACABSketchl").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACABSketchl")
                .attr("startOffset", "50%").text(l);
        }

        currentTabIndex = acabd2d3.tabs('getTabIndex', acabd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            acab2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#acab").length > 0) {
                    acab2d();
                }
            });
        }
        acabd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    acab2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#acab").length > 0) {
                            acab2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 圆筒安放式接管开孔补强计算",
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
                if (index === 11
                    || index === 27 || index === 28 || index === 29
                    || index === 30 || index === 31 || index === 32 || index === 33
                    || index === 36) {
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
                    $(ed.target).combobox("loadData", ACABSCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ACABSType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACABSSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACABSName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", ACABPCategory);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", ACABPType);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", ACABPSTD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", ACABPName);
                }

                else if (index === 27) {
                    $(ed.target).combobox("loadData", ACABRCategory);
                }
                else if (index === 28) {
                    $(ed.target).combobox("loadData", ACABRType);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", ACABRSTD);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", ACABRName);
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
                    acabSketch.empty();
                    acabModel.empty();

                    // sketch
                    currentTabIndex = acabd2d3.tabs('getTabIndex', acabd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        acab2d();
                        acabSketch.off("resize").on("resize", function () {
                            if ($("#acab").length > 0) {
                                acab2d();
                            }
                        });
                    }
                    acabd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acab2d();
                                acabSketch.off("resize").on("resize", function () {
                                    if ($("#acab").length > 0) {
                                        acab2d();
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

                        ACABDT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ACABSCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACABSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACABSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACABSName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        ACABPCategory = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACABPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACABPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACABPName = null;

                        rows[27][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 27);
                        ACABRCategory = null;
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACABRType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACABRSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACABRName = null;

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
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABSCategory = [];
                                ACABPCategory = [];
                                ACABRCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACABDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACABSCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACABPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACABRCategory[index] = {
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

                        ACABSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACABSType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACABSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACABSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABSCategoryVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABSType = [];
                                $(result).each(function (index, element) {
                                    ACABSType[index] = {
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

                        ACABSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACABSSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACABSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABSCategoryVal,
                                type: ACABSTypeVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABSSTD = [];
                                $(result).each(function (index, element) {
                                    ACABSSTD[index] = {
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

                        ACABSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACABSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABSCategoryVal,
                                type: ACABSTypeVal,
                                std: ACABSSTDVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABSName = [];
                                $(result).each(function (index, element) {
                                    ACABSName[index] = {
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

                        ACABPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACABPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACABPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACABPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABPCategoryVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABPType = [];
                                $(result).each(function (index, element) {
                                    ACABPType[index] = {
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

                        ACABPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACABPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACABPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABPCategoryVal,
                                type: ACABPTypeVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABPSTD = [];
                                $(result).each(function (index, element) {
                                    ACABPSTD[index] = {
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

                        ACABPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACABPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABPCategoryVal,
                                type: ACABPTypeVal,
                                std: ACABPSTDVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABPName = [];
                                $(result).each(function (index, element) {
                                    ACABPName[index] = {
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

                        ACABRCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACABRType = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACABRSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACABRName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABRCategoryVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABRType = [];
                                $(result).each(function (index, element) {
                                    ACABRType[index] = {
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

                        ACABRTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACABRSTD = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACABRName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABRCategoryVal,
                                type: ACABRTypeVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABRSTD = [];
                                $(result).each(function (index, element) {
                                    ACABRSTD[index] = {
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

                        ACABRSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACABRName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACABRCategoryVal,
                                type: ACABRTypeVal,
                                std: ACABRSTDVal,
                                temp: ACABDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACABRName = [];
                                $(result).each(function (index, element) {
                                    ACABRName[index] = {
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
                    let ACABTag = "/";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACABTag = rows[0][columns[0][1].field];
                    }

                    // 设计压力
                    let ACABPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACABPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACABPS;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        ACABPS = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACABTest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACABTest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 圆筒材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        ACABSNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取筒体材料密度、最大最小厚度
                    let ACABDS, ACABSThkMin, ACABSThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACABSCategoryVal,
                            "type": ACABSTypeVal,
                            "std": ACABSSTDVal,
                            "name": ACABSNameVal,
                            "temp": ACABDT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACABDS = parseFloat(result.density);
                            ACABSThkMin = parseFloat(result.thkMin);
                            ACABSThkMax = parseFloat(result.thkMax);

                            // IDOD
                            let ACABIDOD;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                ACABIDOD = rows[9][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acab2d(ACABIDOD);
                                acabSketch.off("resize").on("resize", function () {
                                    if ($("#acab").length > 0) {
                                        acab2d(ACABIDOD);
                                    }
                                });
                            }
                            acabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acab2d(ACABIDOD);
                                        acabSketch.off("resize").on("resize", function () {
                                            if ($("#acab").length > 0) {
                                                acab2d(ACABIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACABDSI = -1, ACABDSO = -1;
                            if (ACABIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    ACABDSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (ACABIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    ACABDSO = parseFloat(rows[11][columns[0][1].field]);
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
                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO);
                                acabSketch.off("resize").on("resize", function () {
                                    if ($("#acab").length > 0) {
                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO);
                                    }
                                });
                            }
                            acabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO);
                                        acabSketch.off("resize").on("resize", function () {
                                            if ($("#acab").length > 0) {
                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO);
                                            }
                                        });
                                    }
                                }
                            });

                            // THKSN
                            let ACABTHKSN;
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACABSThkMin
                                && parseFloat(rows[12][columns[0][1].field]) <= ACABSThkMax) {
                                ACABTHKSN = parseFloat(rows[12][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) <= ACABSThkMin) {
                                south.html("筒体材料厚度不能小于等于 " + ACABSThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACABSThkMax) {
                                south.html("筒体材料厚度不能大于 " + ACABSThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN);
                                acabSketch.off("resize").on("resize", function () {
                                    if ($("#acab").length > 0) {
                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN);
                                    }
                                });
                            }
                            acabd2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN);
                                        acabSketch.off("resize").on("resize", function () {
                                            if ($("#acab").length > 0) {
                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 补齐内外径
                            if (ACABIDOD === "内径") {
                                ACABDSO = ACABDSI + 2 * ACABTHKSN;
                            }
                            else if (ACABIDOD === "外径") {
                                ACABDSI = ACABDSO - 2 * ACABTHKSN;
                            }
                            else {
                                return false;
                            }

                            /*
                            获取筒体力学特性
                             */
                            let ACABOST, ACABOS, ACABOST1, ACABRSEL, ACABCS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": ACABSCategoryVal,
                                    "type": ACABSTypeVal,
                                    "std": ACABSSTDVal,
                                    "name": ACABSNameVal,
                                    "thk": ACABTHKSN,
                                    "temp": ACABDT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACABDSO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACABOST = parseFloat(result.ot);
                                    if (ACABOST < 0) {
                                        south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACABOS = parseFloat(result.o);
                                    if (ACABOS < 0) {
                                        south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACABRSEL = parseFloat(result.rel);
                                    if (ACABRSEL < 0) {
                                        south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACABCS1 = parseFloat(result.c1);
                                    if (ACABCS1 < 0) {
                                        south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACABOST1 = parseFloat(result.ot1);

                                    let ACABCS2;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < ACABTHKSN) {
                                        ACABCS2 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= ACABTHKSN) {
                                        south.html("筒体腐蚀裕量不能大于等于 " + ACABTHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACABES;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        ACABES = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        ACABPNameVal = rows[18][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACABDP, ACABPThkMin, ACABPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACABPCategoryVal,
                                            "type": ACABPTypeVal,
                                            "std": ACABPSTDVal,
                                            "name": ACABPNameVal,
                                            "temp": ACABDT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACABDP = parseFloat(result.density);
                                            ACABPThkMin = parseFloat(result.thkMin);
                                            ACABPThkMax = parseFloat(result.thkMax);

                                            let ACABDPO;
                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                ACABDPO = parseFloat(rows[19][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO);
                                                acabSketch.off("resize").on("resize", function () {
                                                    if ($("#acab").length > 0) {
                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO);
                                                    }
                                                });
                                            }
                                            acabd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO);
                                                        acabSketch.off("resize").on("resize", function () {
                                                            if ($("#acab").length > 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // THKPN
                                            let ACABTHKPN;
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > ACABPThkMin
                                                && parseFloat(rows[20][columns[0][1].field]) <= Math.min(ACABPThkMax, ACABDPO / 2)) {
                                                ACABTHKPN = parseFloat(rows[20][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) <= ACABPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACABPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > Math.min(ACABPThkMax, ACABDPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACABPThkMax, ACABDPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO, ACABTHKPN);
                                                acabSketch.off("resize").on("resize", function () {
                                                    if ($("#acab").length > 0) {
                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO, ACABTHKPN);
                                                    }
                                                });
                                            }
                                            acabd2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO, ACABTHKPN);
                                                        acabSketch.off("resize").on("resize", function () {
                                                            if ($("#acab").length > 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO, ACABTHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACABOPT, ACABOP, ACABOPT1, ACABRPEL, ACABCP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACABPCategoryVal,
                                                    "type": ACABPTypeVal,
                                                    "std": ACABPSTDVal,
                                                    "name": ACABPNameVal,
                                                    "thk": ACABTHKPN,
                                                    "temp": ACABDT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACABDPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACABOPT = parseFloat(result.ot);
                                                    if (ACABOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACABOP = parseFloat(result.o);
                                                    if (ACABOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACABRPEL = parseFloat(result.rel);
                                                    if (ACABRPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACABCP1 = parseFloat(result.c1);
                                                    if (ACABCP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACABOPT1 = parseFloat(result.ot1);

                                                    let ACABHPO;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        ACABHPO = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO, ACABTHKPN, ACABHPO);
                                                        acabSketch.off("resize").on("resize", function () {
                                                            if ($("#acab").length > 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO, ACABTHKPN, ACABHPO);
                                                            }
                                                        });
                                                    }
                                                    acabd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO, ACABTHKPN, ACABHPO);
                                                                acabSketch.off("resize").on("resize", function () {
                                                                    if ($("#acab").length > 0) {
                                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN, "Φ" + ACABDPO, ACABTHKPN, ACABHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACABALPHA;
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        ACABALPHA = parseFloat(rows[22][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                            "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                            ACABALPHA + "°");
                                                        acabSketch.off("resize").on("resize", function () {
                                                            if ($("#acab").length > 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                    "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                    ACABALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    acabd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                    "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                    ACABALPHA + "°");
                                                                acabSketch.off("resize").on("resize", function () {
                                                                    if ($("#acab").length > 0) {
                                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                            "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                            ACABALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACABL;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                        && parseFloat(rows[23][columns[0][1].field]) < (ACABDSO - ACABDPO) / 2) {
                                                        ACABL = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                        && parseFloat(rows[23][columns[0][1].field]) >= (ACABDSO - ACABDPO) / 2) {
                                                        south.html("接管轴线到封头轴线距离 L 不能大于等于 " + (ACABDSO - ACABDPO) / 2 + " mm!").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                            "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                            ACABALPHA + "°", ACABL);
                                                        acabSketch.off("resize").on("resize", function () {
                                                            if ($("#acab").length > 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                    "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                    ACABALPHA + "°", ACABL);
                                                            }
                                                        });
                                                    }
                                                    acabd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                    "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                    ACABALPHA + "°", ACABL);
                                                                acabSketch.off("resize").on("resize", function () {
                                                                    if ($("#acab").length > 0) {
                                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                            "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                            ACABALPHA + "°", ACABL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACABCP2;
                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                        && parseFloat(rows[24][columns[0][1].field]) < ACABTHKPN) {
                                                        ACABCP2 = parseFloat(rows[24][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                        && parseFloat(rows[24][columns[0][1].field]) >= ACABTHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACABTHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACABEP;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                        ACABEP = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACABIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                        ACABIsPAD = rows[26][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                            "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                            ACABALPHA + "°", ACABL, ACABIsPAD);
                                                        acabSketch.off("resize").on("resize", function () {
                                                            if ($("#acab").length > 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                    "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                    ACABALPHA + "°", ACABL, ACABIsPAD);
                                                            }
                                                        });
                                                    }
                                                    acabd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                    "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                    ACABALPHA + "°", ACABL, ACABIsPAD);
                                                                acabSketch.off("resize").on("resize", function () {
                                                                    if ($("#acab").length > 0) {
                                                                        acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                            "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                            ACABALPHA + "°", ACABL, ACABIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACABDR = -1.0, ACABRThkMin = -1.0, ACABRThkMax = -1.0;
                                                    let ACABDRO = -1.0, ACABTHKRN = -1.0, ACABCR2 = -1.0;
                                                    let ACABORT = -1.0, ACABOR = -1.0, ACABORT1 = -1.0, ACABRREL = -1.0,
                                                        ACABCR1 = -1.0;
                                                    if (ACABIsPAD === "是") {

                                                        if (ACABTHKSN > 38) {
                                                            south.html("筒体厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (ACABSCategoryVal === "碳素钢和低合金钢" && ACABRSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[30][columns[0][1].field])) {
                                                            ACABRNameVal = rows[30][columns[0][1].field];
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
                                                                "category": ACABRCategoryVal,
                                                                "type": ACABRTypeVal,
                                                                "std": ACABRSTDVal,
                                                                "name": ACABRNameVal,
                                                                "temp": ACABDT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACABDR = parseFloat(result.density);
                                                                ACABRThkMin = parseFloat(result.thkMin);
                                                                ACABRThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                    && parseFloat(rows[31][columns[0][1].field]) > ACABDPO) {
                                                                    ACABDRO = parseFloat(rows[31][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])
                                                                    && parseFloat(rows[31][columns[0][1].field]) <= ACABDPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACABDPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                        "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                        ACABALPHA + "°", ACABL, ACABIsPAD, "Φ" + ACABDRO);
                                                                    acabSketch.off("resize").on("resize", function () {
                                                                        if ($("#acab").length > 0) {
                                                                            acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                                "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                                ACABALPHA + "°", ACABL, ACABIsPAD, "Φ" + ACABDRO);
                                                                        }
                                                                    });
                                                                }
                                                                acabd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                                "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                                ACABALPHA + "°", ACABL, ACABIsPAD, "Φ" + ACABDRO);
                                                                            acabSketch.off("resize").on("resize", function () {
                                                                                if ($("#acab").length > 0) {
                                                                                    acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                                        "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                                        ACABALPHA + "°", ACABL, ACABIsPAD, "Φ" + ACABDRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) > ACABRThkMin
                                                                    && parseFloat(rows[32][columns[0][1].field]) <= Math.min(ACABRThkMax, 1.5 * ACABTHKSN)) {
                                                                    ACABTHKRN = parseFloat(rows[32][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) <= ACABRThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACABRThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) > Math.min(ACABRThkMax, 1.5 * ACABTHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACABRThkMax, 1.5 * ACABTHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                        "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                        ACABALPHA + "°", ACABL, ACABIsPAD, "Φ" + ACABDRO, ACABTHKRN);
                                                                    acabSketch.off("resize").on("resize", function () {
                                                                        if ($("#acab").length > 0) {
                                                                            acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                                "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                                ACABALPHA + "°", ACABL, ACABIsPAD, "Φ" + ACABDRO, ACABTHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                acabd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                                "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                                ACABALPHA + "°", ACABL, ACABIsPAD, "Φ" + ACABDRO, ACABTHKRN);
                                                                            acabSketch.off("resize").on("resize", function () {
                                                                                if ($("#acab").length > 0) {
                                                                                    acab2d(ACABIDOD, "Φ" + ACABDSI, "Φ" + ACABDSO, ACABTHKSN,
                                                                                        "Φ" + ACABDPO, ACABTHKPN, ACABHPO,
                                                                                        ACABALPHA + "°", ACABL, ACABIsPAD, "Φ" + ACABDRO, ACABTHKRN);
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
                                                                        "category": ACABRCategoryVal,
                                                                        "type": ACABRTypeVal,
                                                                        "std": ACABRSTDVal,
                                                                        "name": ACABRNameVal,
                                                                        "thk": ACABTHKRN,
                                                                        "temp": ACABDT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACABDRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACABORT = parseFloat(result.ot);
                                                                        if (ACABORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACABOR = parseFloat(result.o);
                                                                        if (ACABOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACABRREL = parseFloat(result.rel);
                                                                        if (ACABRREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACABCR1 = parseFloat(result.c1);
                                                                        if (ACABCR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACABORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                            && parseFloat(rows[33][columns[0][1].field]) < ACABTHKRN) {
                                                                            ACABCR2 = parseFloat(rows[33][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                            && parseFloat(rows[33][columns[0][1].field]) >= ACABTHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACABTHKRN + " mm").css("color", "red");
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
                                                        if (ACABCR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACABA3;
                                                    if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])) {
                                                        ACABA3 = parseFloat(rows[34][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACABIsB;
                                                    if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                        ACABIsB = rows[35][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACABBS = -1.0;
                                                    if (ACABIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[36][columns[0][1].field]) > ACABDPO) {
                                                            ACABBS = parseFloat(rows[36][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[36][columns[0][1].field]) <= ACABDPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACABDPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */
                                                    let ACABPC = ACABPD + ACABPS;

                                                    // 筒体
                                                    let ACABCS = ACABCS1 + ACABCS2;
                                                    let ACABTHKSE = ACABTHKSN - ACABCS;
                                                    let ACABDSM = -1;
                                                    if (ACABIDOD === "内径") {
                                                        ACABDSM = ACABDSI + ACABTHKSN;
                                                    }
                                                    else if (ACABIDOD === "外径") {
                                                        ACABDSM = ACABDSO - ACABTHKSN;
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACABRSM = ACABDSM / 2;

                                                    // 接管
                                                    let ACABCP = ACABCP1 + ACABCP2;
                                                    let ACABTHKPE = ACABTHKPN - ACABCP;
                                                    let ACABDPC = ACABDPO - 2 * ACABTHKPN + 2 * ACABCP1 + 2 * ACABCS2;
                                                    let ACABSA = ACABDPC / Math.cos(ACABALPHA / 180 * Math.PI);
                                                    let ACABSB = ACABDPC * ACABRSM / Math.sqrt(ACABRSM * ACABRSM - ACABL * ACABL);
                                                    let ACABK = Math.max(ACABSA / ACABSB, ACABSB / ACABSA);
                                                    if (ACABK > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACABDOP = ACABSA;
                                                    if (ACABIDOD === "内径") {
                                                        if (ACABDSI <= 1500) {
                                                            if (ACABDOP > Math.min(ACABDSI / 2, 520)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                        else if (ACABDSI > 1500) {
                                                            if (ACABDOP > Math.min(ACABDSI / 3, 1000)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                    else if (ACABIDOD === "外径") {
                                                        if ((ACABDSO - 2 * ACABTHKSN) <= 1500) {
                                                            if (ACABDOP > Math.min((ACABDSO - 2 * ACABTHKSN) / 2, 520)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                        else if ((ACABDSO - 2 * ACABTHKSN) > 1500) {
                                                            if (ACABDOP > Math.min((ACABDSO - 2 * ACABTHKSN) / 3, 1000)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACABFP = Math.min(1.0, ACABOPT / ACABOST);

                                                    // 补强圈
                                                    let ACABCR = -1.0, ACABTHKRE = -1.0, ACABFR = -1.0;
                                                    if (ACABIsPAD === "是") {
                                                        ACABCR = ACABCR1 + ACABCR2;
                                                        ACABTHKRE = ACABTHKRN - ACABCR;
                                                        ACABFR = Math.min(1.0, ACABORT / ACABOST);
                                                    }

                                                    /*
                                                    筒体内压强度校核
                                                     */
                                                    let ACABTHKSC;
                                                    if (ACABIDOD === "内径") {
                                                        ACABTHKSC = ACABPC * ACABDSI / (2 * ACABOST * ACABES - ACABPC);
                                                    }
                                                    else if (ACABIDOD === "外径") {
                                                        ACABTHKSC = ACABPC * ACABDSO / (2 * ACABOST * ACABES + ACABPC);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACABTHKSD = ACABTHKSC + ACABCS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "筒体内压所需厚度：" + (ACABTHKSD + ACABCS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACABTHKSCHK;
                                                    if (ACABTHKSN >= (ACABTHKSD + ACABCS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACABTHKSN + " mm" +
                                                            "</span>");
                                                        ACABTHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACABTHKSN + " mm" +
                                                            "</span>");
                                                        ACABTHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACABTHKPC = ACABPC * ACABDPO / (2 * ACABOPT * ACABEP + ACABPC);
                                                    let ACABTHKPD = ACABTHKPC + ACABCP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACABTHKPD + ACABCP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACABTHKPCHK;
                                                    if (ACABTHKPN >= (ACABTHKPD + ACABCP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACABTHKPN + " mm" +
                                                            "</span>");
                                                        ACABTHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACABTHKPN + " mm" +
                                                            "</span>");
                                                        ACABTHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACABBA = ACABDOP * ACABTHKSC;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACABBA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 筒体
                                                    let ACABBB;
                                                    if (ACABIsB === "是") {
                                                        ACABBB = Math.min(Math.max(2 * ACABDOP, ACABDOP + 2 * ACABTHKSN + 2 * ACABTHKPN), ACABBS);
                                                    }
                                                    else if (ACABIsB === "否") {
                                                        ACABBB = Math.max(2 * ACABDOP, ACABDOP + 2 * ACABTHKSN + 2 * ACABTHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACABA1 = (ACABBB - ACABDOP) * (ACABTHKSE - ACABTHKSC);

                                                    // 接管
                                                    let ACABHP1 = Math.min(ACABHPO, Math.sqrt(ACABDOP * ACABTHKPN));
                                                    let ACABA2 = 2 * ACABHP1 * (ACABTHKPE - ACABTHKPC) * ACABFP;

                                                    // 补强圈
                                                    let ACABDRE = -1.0, ACABA4 = 0.0;
                                                    if (ACABIsPAD === "是") {
                                                        ACABDRE = Math.min(ACABDRO, ACABBB);
                                                        ACABA4 = (ACABDRE - ACABDPO) * ACABTHKRE * ACABFR;
                                                    }

                                                    // Ae
                                                    let ACABAE = ACABA1 + ACABA2 + ACABA3 + ACABA4;
                                                    let ACABACHK;
                                                    if (ACABAE >= ACABBA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACABAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACABACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACABAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACABACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACABETA, ACABPST, ACABPPT, ACABPT;
                                                    if (ACABTest === "液压试验") {
                                                        ACABETA = 1.25;
                                                        ACABPST = ACABETA * ACABPD * ACABOS / Math.max(ACABOST, ACABOST1);
                                                        ACABPPT = ACABETA * ACABPD * ACABOP / Math.max(ACABOPT, ACABOPT1);
                                                        ACABPT = Math.min(ACABPST, ACABPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACABPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACABTest === "气压试验") {
                                                        ACABETA = 1.10;
                                                        ACABPST = ACABETA * ACABPD * ACABOS / Math.max(ACABOST, ACABOST1);
                                                        ACABPPT = ACABETA * ACABPD * ACABOP / Math.max(ACABOPT, ACABOPT1);
                                                        ACABPT = Math.min(ACABPST, ACABPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACABPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */
                                                    // 筒体
                                                    let ACABMAWPS;
                                                    if (ACABIDOD === "内径") {
                                                        ACABMAWPS = 2 * ACABTHKSE * ACABOST * ACABES / (ACABDSI + ACABTHKSE) - ACABPS;
                                                    }
                                                    else if (ACABIDOD === "外径") {
                                                        ACABMAWPS = 2 * ACABTHKSE * ACABOST * ACABES / (ACABDSO - ACABTHKSE) - ACABPS;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 接管
                                                    let ACABMAWPP = 2 * ACABTHKPE * ACABOPT * ACABEP / (ACABDPO - ACABTHKPE) - ACABPS;

                                                    // 开孔补强
                                                    let ACABMAWPA1 = -1, ACABMAWPA2 = -1,
                                                        ACABMAWPA3 = ACABA3, ACABMAWPA4 = ACABA4,
                                                        ACABMAWPA = -1, ACABMAWPAE = -1,
                                                        ACABMAWPRC = ACABPC;
                                                    let ACABMAWPTHKSC, ACABMAWPTHKPC;
                                                    while (ACABMAWPAE >= ACABMAWPA) {

                                                        ACABMAWPRC += 0.0001;

                                                        // 筒体计算厚度
                                                        if (ACABIDOD === "内径") {
                                                            ACABMAWPTHKSC = ACABMAWPRC * ACABDSI / (2 * ACABOST * ACABES - ACABPC);
                                                        }
                                                        else if (ACABIDOD === "外径") {
                                                            ACABMAWPTHKSC = ACABMAWPRC * ACABDSO / (2 * ACABOST * ACABES + ACABPC);
                                                        }
                                                        ACABMAWPA = ACABDOP * ACABMAWPTHKSC;

                                                        // 接管计算厚度
                                                        ACABMAWPTHKPC = ACABMAWPRC * ACABDPO / (2 * ACABOPT * ACABEP + ACABPC);

                                                        ACABMAWPA1 = (ACABBB - ACABDOP) * (ACABTHKSE - ACABMAWPTHKSC);
                                                        ACABMAWPA2 = 2 * ACABHP1 * (ACABTHKPE - ACABMAWPTHKPC) * ACABFP;

                                                        ACABMAWPAE = ACABMAWPA1 + ACABMAWPA2 + ACABMAWPA3 + ACABMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACABMAWPR = ACABMAWPRC - ACABPS - 0.0001;
                                                    let ACABMAWP = Math.min(ACABMAWPS, ACABMAWPP, ACABMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACABMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACABPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "acabdocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACAB",

                                                                idod: ACABIDOD,
                                                                isPad: ACABIsPAD,
                                                                isB: ACABIsB,

                                                                tag: ACABTag,
                                                                pd: ACABPD,
                                                                t: ACABDT,
                                                                ps: ACABPS,
                                                                test: ACABTest,

                                                                stds: ACABSSTDVal,
                                                                names: ACABSNameVal,
                                                                dsi: ACABDSI,
                                                                dso: ACABDSO,
                                                                thksn: ACABTHKSN,
                                                                cs2: ACABCS2,
                                                                es: ACABES,

                                                                stdp: ACABPSTDVal,
                                                                namep: ACABPNameVal,
                                                                dpo: ACABDPO,
                                                                thkpn: ACABTHKPN,
                                                                hpo: ACABHPO,
                                                                alpha: ACABALPHA,
                                                                l: ACABL,
                                                                cp2: ACABCP2,
                                                                ep: ACABEP,

                                                                stdr: ACABRSTDVal,
                                                                namer: ACABRNameVal,
                                                                dro: ACABDRO,
                                                                thkrn: ACABTHKRN,
                                                                cr2: ACABCR2,

                                                                a3: ACABA3,
                                                                bs: ACABBS,

                                                                ds: ACABDS.toFixed(4),
                                                                cs1: ACABCS1.toFixed(4),
                                                                rsel: ACABRSEL.toFixed(4),
                                                                ost: ACABOST.toFixed(4),
                                                                os: ACABOS.toFixed(4),
                                                                ost1: ACABOST1.toFixed(4),

                                                                dp: ACABDP.toFixed(4),
                                                                cp1: ACABCP1.toFixed(4),
                                                                rpel: ACABRPEL.toFixed(4),
                                                                opt: ACABOPT.toFixed(4),
                                                                op: ACABOP.toFixed(4),
                                                                opt1: ACABOPT1.toFixed(4),

                                                                dr: ACABDR.toFixed(4),
                                                                cr1: ACABCR1.toFixed(4),
                                                                rrel: ACABRREL.toFixed(4),
                                                                ort: ACABORT.toFixed(4),
                                                                or: ACABOR.toFixed(4),
                                                                ort1: ACABORT1.toFixed(4),

                                                                pc: ACABPC.toFixed(4),
                                                                cs: ACABCS.toFixed(4),
                                                                thkse: ACABTHKSE.toFixed(4),
                                                                dsm: ACABDSM.toFixed(4),
                                                                rsm: ACABRSM.toFixed(4),

                                                                cp: ACABCP.toFixed(4),
                                                                thkpe: ACABTHKPE.toFixed(4),
                                                                dpc: ACABDPC.toFixed(4),
                                                                sa: ACABSA.toFixed(4),
                                                                sb: ACABSB.toFixed(4),
                                                                k: ACABK.toFixed(4),
                                                                dop: ACABDOP.toFixed(4),
                                                                fp: ACABFP.toFixed(4),

                                                                cr: ACABCR.toFixed(4),
                                                                thkre: ACABTHKRE.toFixed(4),
                                                                fr: ACABFR.toFixed(4),

                                                                thksc: ACABTHKSC.toFixed(4),
                                                                thksd: ACABTHKSD.toFixed(4),
                                                                thkschk: ACABTHKSCHK,

                                                                thkpc: ACABTHKPC.toFixed(4),
                                                                thkpd: ACABTHKPD.toFixed(4),
                                                                thkpchk: ACABTHKPCHK,

                                                                ba: ACABBA.toFixed(4),
                                                                bb: ACABBB.toFixed(4),
                                                                a1: ACABA1.toFixed(4),
                                                                hp1: ACABHP1.toFixed(4),
                                                                a2: ACABA2.toFixed(4),
                                                                dre: ACABDRE.toFixed(4),
                                                                a4: ACABA4.toFixed(4),
                                                                ae: ACABAE.toFixed(4),
                                                                achk: ACABACHK,

                                                                eta: ACABETA.toFixed(4),
                                                                pst: ACABPST.toFixed(4),
                                                                ppt: ACABPPT.toFixed(4),
                                                                pt: ACABPT.toFixed(4),

                                                                mawps: ACABMAWPS.toFixed(4),
                                                                mawpp: ACABMAWPP.toFixed(4),
                                                                mawpa1: ACABMAWPA1.toFixed(0),
                                                                mawpa2: ACABMAWPA2.toFixed(0),
                                                                mawpa3: ACABMAWPA3,
                                                                mawpa4: ACABMAWPA4.toFixed(0),
                                                                mawpa: ACABMAWPA.toFixed(0),
                                                                mawpae: ACABMAWPAE.toFixed(0),
                                                                mawpr: ACABMAWPR.toFixed(4),
                                                                mawp: ACABMAWP.toFixed(4)
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
                                                                    ACABPayJS.dialog({
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
                                                                                ACABPayJS.dialog("close");
                                                                                ACABPayJS.dialog("clear");
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
                                                                                            ACABPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACABPayJS.dialog('close');
                                                                                                    ACABPayJS.dialog('clear');
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