$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let acaaSketch = $("#d2");
    let acaaModel = $("#d3");
    let acaad2d3 = $('#d2d3');

    $("#cal").html("<table id='acaa'></table>");
    let pg = $("#acaa");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/a/c/a/a/ACAA.json", function (result) {

        let ACAADT,
            ACAASCategory, ACAASCategoryVal, ACAASType, ACAASTypeVal, ACAASSTD, ACAASSTDVal, ACAASName, ACAASNameVal,
            ACAAPCategory, ACAAPCategoryVal, ACAAPType, ACAAPTypeVal, ACAAPSTD, ACAAPSTDVal, ACAAPName, ACAAPNameVal,
            ACAARCategory, ACAARCategoryVal, ACAARType, ACAARTypeVal, ACAARSTD, ACAARSTDVal, ACAARName, ACAARNameVal,
            columns, rows, ed;

        // 壳体内径
        function acaa2d(idod, dsi = "ΦDsi", dso = "ΦDso", thksn = "δsn",
                        dpo = "Φdpo", thkpn = "δpn", hpo = "hpo", hpi = "hpi", alpha = "α", l = "L",
                        isPad, dro = "Φdro", thkrn = "δrn") {

            acaaSketch.empty();
            let width = acaaSketch.width();
            let height = acaaSketch.height();
            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "ACAASVG").attr("height", height);

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
                dimBottomH(padding, padding + 3 * hg, padding + 2 * wg, padding + 3 * hg, dro, "ACAASketchDRO");
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
                ])).attr("id", "ACAASketchTHKRN").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACAASketchTHKRN").attr("startOffset", "50%").text(thkrn);
            }

            // dpo
            dimTopH(padding + 0.5 * wg - thk, padding + hg, padding + 1.5 * wg + thk, padding + hg, dpo, "ACAASketchDPO");

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
            ])).attr("id", "ACAASketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACAASketchTHKPN")
                .attr("startOffset", "50%").text(thkpn);

            // hpi
            dimLeftV(padding + 0.5 * wg - thk, padding + 3 * hg, padding + 0.5 * wg - thk, padding + 2 * hg + thk, hpi, "ACAASketchHPI");

            // hpo
            dimLeftV(padding + 0.5 * wg - thk, padding + 2 * hg, padding + 0.5 * wg - thk, padding + hg, hpo, "ACAASketchHPO");

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
            ])).attr("id", "ACAASketchTHKSN").classed("sketch", true);
            svg.append("path").attr("d", line([
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg},
                {x: padding + 1.5 * wg - 30, y: padding + 2 * hg + thk + 15 + 10}
            ])).classed("sketch", true);
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACAASketchTHKSN").attr("startOffset", "50%").text(thksn);

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
                ])).attr("id", "ACAASketchDSI").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACAASketchDSI").attr("startOffset", "50%").text(dsi);
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
                ])).attr("id", "ACAASketchDSO").classed("sketch", true);
                svg.append("g")
                    .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                    .append("textPath").attr("xlink:href", "#ACAASketchDSO").attr("startOffset", "50%").text(dso);
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
            ).classed("sketch", true).attr("id", "ACAASketchALPHA");
            svg.append("g")
                .append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACAASketchALPHA").attr("startOffset", "50%").text(alpha);

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
            ])).attr("id", "ACAASketchl").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0)
                .attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#ACAASketchl")
                .attr("startOffset", "50%").text(l);

        }

        currentTabIndex = acaad2d3.tabs('getTabIndex', acaad2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            acaa2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#acaa").length > 0) {
                    acaa2d();
                }
            });
        }
        acaad2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    acaa2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#acaa").length > 0) {
                            acaa2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "GB/T 150-2011 圆筒插入式接管开孔补强计算",
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
                    || index === 28 || index === 29 || index === 30
                    || index === 31 || index === 32 || index === 33 || index === 34
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
                    $(ed.target).combobox("loadData", ACAASCategory);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", ACAASType);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", ACAASSTD);
                }
                else if (index === 8) {
                    $(ed.target).combobox("loadData", ACAASName);
                }

                else if (index === 15) {
                    $(ed.target).combobox("loadData", ACAAPCategory);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", ACAAPType);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", ACAAPSTD);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", ACAAPName);
                }

                else if (index === 28) {
                    $(ed.target).combobox("loadData", ACAARCategory);
                }
                else if (index === 29) {
                    $(ed.target).combobox("loadData", ACAARType);
                }
                else if (index === 30) {
                    $(ed.target).combobox("loadData", ACAARSTD);
                }
                else if (index === 31) {
                    $(ed.target).combobox("loadData", ACAARName);
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
                    acaaSketch.empty();
                    acaaModel.empty();

                    // sketch
                    currentTabIndex = acaad2d3.tabs('getTabIndex', acaad2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        acaa2d();
                        acaaSketch.off("resize").on("resize", function () {
                            if ($("#acaa").length > 0) {
                                acaa2d();
                            }
                        });
                    }
                    acaad2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                acaa2d();
                                acaaSketch.off("resize").on("resize", function () {
                                    if ($("#acaa").length > 0) {
                                        acaa2d();
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

                        ACAADT = parseFloat(changes.value);

                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        ACAASCategory = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACAASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACAASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACAASName = null;

                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        ACAAPCategory = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACAAPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACAAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACAAPName = null;

                        rows[28][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 28);
                        ACAARCategory = null;
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACAARType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACAARSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACAARName = null;

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
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAASCategory = [];
                                ACAAPCategory = [];
                                ACAARCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + ACAADT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                }
                                else {
                                    $(result).each(function (index, element) {
                                        ACAASCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACAAPCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        ACAARCategory[index] = {
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

                        ACAASCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        ACAASType = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACAASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACAASName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAASCategoryVal,
                                temp: ACAADT

                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAASType = [];
                                $(result).each(function (index, element) {
                                    ACAASType[index] = {
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

                        ACAASTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        ACAASSTD = null;
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACAASName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAASCategoryVal,
                                type: ACAASTypeVal,
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAASSTD = [];
                                $(result).each(function (index, element) {
                                    ACAASSTD[index] = {
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

                        ACAASSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[8][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 8);
                        ACAASName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAASCategoryVal,
                                type: ACAASTypeVal,
                                std: ACAASSTDVal,
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAASName = [];
                                $(result).each(function (index, element) {
                                    ACAASName[index] = {
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

                        ACAAPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        ACAAPType = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACAAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACAAPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAAPCategoryVal,
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAAPType = [];
                                $(result).each(function (index, element) {
                                    ACAAPType[index] = {
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

                        ACAAPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        ACAAPSTD = null;
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACAAPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAAPCategoryVal,
                                type: ACAAPTypeVal,
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAAPSTD = [];
                                $(result).each(function (index, element) {
                                    ACAAPSTD[index] = {
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

                        ACAAPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        ACAAPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAAPCategoryVal,
                                type: ACAAPTypeVal,
                                std: ACAAPSTDVal,
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAAPName = [];
                                $(result).each(function (index, element) {
                                    ACAAPName[index] = {
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
                    if (index === 28) {

                        ACAARCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[29][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 29);
                        ACAARType = null;
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACAARSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACAARName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAARCategoryVal,
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAARType = [];
                                $(result).each(function (index, element) {
                                    ACAARType[index] = {
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
                    if (index === 29) {

                        ACAARTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[30][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 30);
                        ACAARSTD = null;
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACAARName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAARCategoryVal,
                                type: ACAARTypeVal,
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAARSTD = [];
                                $(result).each(function (index, element) {
                                    ACAARSTD[index] = {
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
                    if (index === 30) {

                        ACAARSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[31][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 31);
                        ACAARName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: ACAARCategoryVal,
                                type: ACAARTypeVal,
                                std: ACAARSTDVal,
                                temp: ACAADT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                ACAARName = [];
                                $(result).each(function (index, element) {
                                    ACAARName[index] = {
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
                    let ACAATag = "符号标记";
                    if (!jQuery.isEmptyObject(rows[0][columns[0][1].field])) {
                        ACAATag = rows[0][columns[0][1].field];
                    }

                    // 设计压力
                    let ACAAPD;
                    if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                        ACAAPD = parseFloat(rows[1][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // 静压力
                    let ACAAPS;
                    if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                        ACAAPS = parseFloat(rows[3][columns[0][1].field]);
                    }
                    else {
                        return false;
                    }

                    // Test
                    let ACAATest;
                    if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                        ACAATest = rows[4][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // 圆筒材料名称
                    if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                        ACAASNameVal = rows[8][columns[0][1].field];
                    }
                    else {
                        return false;
                    }

                    // AJAX 获取筒体材料密度、最大最小厚度
                    let ACAADS, ACAASThkMin, ACAASThkMax;
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        url: "web_get_gbt_150_2011_index.action",
                        async: false,
                        dataType: "json",
                        data: JSON.stringify({
                            "category": ACAASCategoryVal,
                            "type": ACAASTypeVal,
                            "std": ACAASSTDVal,
                            "name": ACAASNameVal,
                            "temp": ACAADT
                        }),
                        beforeSend: function () {
                        },
                        success: function (result) {

                            ACAADS = parseFloat(result.density);
                            ACAASThkMin = parseFloat(result.thkMin);
                            ACAASThkMax = parseFloat(result.thkMax);

                            // IDOD
                            let ACAAIDOD;
                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                ACAAIDOD = rows[9][columns[0][1].field];
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acaa2d(ACAAIDOD);
                                acaaSketch.off("resize").on("resize", function () {
                                    if ($("#acaa").length > 0) {
                                        acaa2d(ACAAIDOD);
                                    }
                                });
                            }
                            acaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acaa2d(ACAAIDOD);
                                        acaaSketch.off("resize").on("resize", function () {
                                            if ($("#acaa").length > 0) {
                                                acaa2d(ACAAIDOD);
                                            }
                                        });
                                    }
                                }
                            });

                            let ACAADSI = -1, ACAADSO = -1;
                            if (ACAAIDOD === "内径") {

                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])) {
                                    ACAADSI = parseFloat(rows[10][columns[0][1].field]);
                                }
                                else {
                                    return false;
                                }
                            }
                            else if (ACAAIDOD === "外径") {

                                if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])) {
                                    ACAADSO = parseFloat(rows[11][columns[0][1].field]);
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
                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO);
                                acaaSketch.off("resize").on("resize", function () {
                                    if ($("#acaa").length > 0) {
                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO);
                                    }
                                });
                            }
                            acaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO);
                                        acaaSketch.off("resize").on("resize", function () {
                                            if ($("#acaa").length > 0) {
                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO);
                                            }
                                        });
                                    }
                                }
                            });

                            // ACAATHKSN
                            let ACAATHKSN;
                            if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACAASThkMin
                                && parseFloat(rows[12][columns[0][1].field]) <= ACAASThkMax) {
                                ACAATHKSN = parseFloat(rows[12][columns[0][1].field]);
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) <= ACAASThkMin) {
                                south.html("筒体材料厚度不能小于等于 " + ACAASThkMin + " mm").css("color", "red");
                                return false;
                            }
                            else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                && parseFloat(rows[12][columns[0][1].field]) > ACAASThkMax) {
                                south.html("筒体材料厚度不能大于 " + ACAASThkMax + " mm").css("color", "red");
                                return false;
                            }
                            else {
                                return false;
                            }

                            // Sketch
                            if (currentTabIndex === 0) {
                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN);
                                acaaSketch.off("resize").on("resize", function () {
                                    if ($("#acaa").length > 0) {
                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN);
                                    }
                                });
                            }
                            acaad2d3.tabs({
                                onSelect: function (title, index) {
                                    if (index === 0) {
                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN);
                                        acaaSketch.off("resize").on("resize", function () {
                                            if ($("#acaa").length > 0) {
                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN);
                                            }
                                        });
                                    }
                                }
                            });

                            // 补齐内外径
                            if (ACAAIDOD === "内径") {
                                ACAADSO = ACAADSI + 2 * ACAATHKSN;
                            }
                            else if (ACAAIDOD === "外径") {
                                ACAADSI = ACAADSO - 2 * ACAATHKSN;
                            }
                            else {
                                return false;
                            }

                            /*
                            获取筒体力学特性
                             */
                            let ACAAOST, ACAAOS, ACAAOST1, ACAARSEL, ACAACS1;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_com_property.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": ACAASCategoryVal,
                                    "type": ACAASTypeVal,
                                    "std": ACAASSTDVal,
                                    "name": ACAASNameVal,
                                    "thk": ACAATHKSN,
                                    "temp": ACAADT,
                                    "highLow": 3,
                                    "isTube": 0,
                                    "od": ACAADSO
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    ACAAOST = parseFloat(result.ot);
                                    if (ACAAOST < 0) {
                                        south.html("查询筒体材料设计温度许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACAAOS = parseFloat(result.o);
                                    if (ACAAOS < 0) {
                                        south.html("查询筒体材料常温许用应力失败！").css("color", "red");
                                        return false;
                                    }
                                    ACAARSEL = parseFloat(result.rel);
                                    if (ACAARSEL < 0) {
                                        south.html("查询筒体材料常温屈服强度失败！").css("color", "red");
                                        return false;
                                    }
                                    ACAACS1 = parseFloat(result.c1);
                                    if (ACAACS1 < 0) {
                                        south.html("查询筒体材料厚度负偏差失败！").css("color", "red");
                                        return false;
                                    }
                                    ACAAOST1 = parseFloat(result.ot1);

                                    let ACAACS2;
                                    if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) < ACAATHKSN) {
                                        ACAACS2 = parseFloat(rows[13][columns[0][1].field]);
                                    }
                                    else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                        && parseFloat(rows[13][columns[0][1].field]) >= ACAATHKSN) {
                                        south.html("筒体腐蚀裕量不能大于等于 " + ACAATHKSN + " mm").css("color", "red");
                                        return false;
                                    }
                                    else {
                                        return false;
                                    }

                                    let ACAAES;
                                    if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])) {
                                        ACAAES = parseFloat(rows[14][columns[0][1].field]);
                                    }
                                    else {
                                        return false;
                                    }

                                    // 接管材料名称
                                    if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])) {
                                        ACAAPNameVal = rows[18][columns[0][1].field];
                                    }
                                    else {
                                        return false;
                                    }

                                    // AJAX 获取接管材料密度、最大最小厚度
                                    let ACAADP, ACAAPThkMin, ACAAPThkMax;
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        url: "web_get_gbt_150_2011_index.action",
                                        async: true,
                                        dataType: "json",
                                        data: JSON.stringify({
                                            "category": ACAAPCategoryVal,
                                            "type": ACAAPTypeVal,
                                            "std": ACAAPSTDVal,
                                            "name": ACAAPNameVal,
                                            "temp": ACAADT
                                        }),
                                        beforeSend: function () {
                                        },
                                        success: function (result) {

                                            ACAADP = parseFloat(result.density);
                                            ACAAPThkMin = parseFloat(result.thkMin);
                                            ACAAPThkMax = parseFloat(result.thkMax);

                                            let ACAADPO;
                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])) {
                                                ACAADPO = parseFloat(rows[19][columns[0][1].field]);
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO);
                                                acaaSketch.off("resize").on("resize", function () {
                                                    if ($("#acaa").length > 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO);
                                                    }
                                                });
                                            }
                                            acaad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO);
                                                        acaaSketch.off("resize").on("resize", function () {
                                                            if ($("#acaa").length > 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            // ACAATHKPN
                                            let ACAATHKPN;
                                            if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > ACAAPThkMin
                                                && parseFloat(rows[20][columns[0][1].field]) <= Math.min(ACAAPThkMax, ACAADPO / 2)) {
                                                ACAATHKPN = parseFloat(rows[20][columns[0][1].field]);
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) <= ACAAPThkMin) {
                                                south.html("接管材料厚度不能小于等于 " + ACAAPThkMin + " mm").css("color", "red");
                                                return false;
                                            }
                                            else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                && parseFloat(rows[20][columns[0][1].field]) > Math.min(ACAAPThkMax, ACAADPO / 2)) {
                                                south.html("接管材料厚度不能大于 " + Math.min(ACAAPThkMax, ACAADPO / 2) + " mm").css("color", "red");
                                                return false;
                                            }
                                            else {
                                                return false;
                                            }

                                            // Sketch
                                            if (currentTabIndex === 0) {
                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN);
                                                acaaSketch.off("resize").on("resize", function () {
                                                    if ($("#acaa").length > 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN);
                                                    }
                                                });
                                            }
                                            acaad2d3.tabs({
                                                onSelect: function (title, index) {
                                                    if (index === 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN);
                                                        acaaSketch.off("resize").on("resize", function () {
                                                            if ($("#acaa").length > 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN);
                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                            let ACAAOPT, ACAAOP, ACAAOPT1, ACAARPEL, ACAACP1;
                                            $.ajax({
                                                type: "POST",
                                                contentType: "application/json; charset=utf-8",
                                                url: "web_get_gbt_150_2011_com_property.action",
                                                async: true,
                                                dataType: "json",
                                                data: JSON.stringify({
                                                    "category": ACAAPCategoryVal,
                                                    "type": ACAAPTypeVal,
                                                    "std": ACAAPSTDVal,
                                                    "name": ACAAPNameVal,
                                                    "thk": ACAATHKPN,
                                                    "temp": ACAADT,
                                                    "highLow": 3,
                                                    "isTube": 0,
                                                    "od": ACAADPO
                                                }),
                                                beforeSend: function () {
                                                },
                                                success: function (result) {

                                                    ACAAOPT = parseFloat(result.ot);
                                                    if (ACAAOPT < 0) {
                                                        south.html("查询接管材料设计温度许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACAAOP = parseFloat(result.o);
                                                    if (ACAAOP < 0) {
                                                        south.html("查询接管材料常温许用应力失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACAARPEL = parseFloat(result.rel);
                                                    if (ACAARPEL < 0) {
                                                        south.html("查询接管材料常温屈服强度失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACAACP1 = parseFloat(result.c1);
                                                    if (ACAACP1 < 0) {
                                                        south.html("查询接管材料厚度负偏差失败！").css("color", "red");
                                                        return false;
                                                    }
                                                    ACAAOPT1 = parseFloat(result.ot1);

                                                    let ACAAHPO;
                                                    if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])) {
                                                        ACAAHPO = parseFloat(rows[21][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN, ACAAHPO);
                                                        acaaSketch.off("resize").on("resize", function () {
                                                            if ($("#acaa").length > 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN, ACAAHPO);
                                                            }
                                                        });
                                                    }
                                                    acaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN, ACAAHPO);
                                                                acaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acaa").length > 0) {
                                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN, ACAAHPO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACAAHPI;
                                                    if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])) {
                                                        ACAAHPI = parseFloat(rows[22][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI);
                                                        acaaSketch.off("resize").on("resize", function () {
                                                            if ($("#acaa").length > 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI);
                                                            }
                                                        });
                                                    }
                                                    acaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI);
                                                                acaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acaa").length > 0) {
                                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN, "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACAAALPHA;
                                                    if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])) {
                                                        ACAAALPHA = parseFloat(rows[23][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                            "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                            ACAAALPHA + "°");
                                                        acaaSketch.off("resize").on("resize", function () {
                                                            if ($("#acaa").length > 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                    "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                    ACAAALPHA + "°");
                                                            }
                                                        });
                                                    }
                                                    acaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                    "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                    ACAAALPHA + "°");
                                                                acaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acaa").length > 0) {
                                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                            "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                            ACAAALPHA + "°");
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACAAL;
                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                        && parseFloat(rows[24][columns[0][1].field]) < (ACAADSO - ACAADPO) / 2) {
                                                        ACAAL = parseFloat(rows[24][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                        && parseFloat(rows[24][columns[0][1].field]) >= (ACAADSO - ACAADPO) / 2) {
                                                        south.html("接管轴线到封头轴线距离 L 不能大于等于 " + (ACAADSO - ACAADPO) / 2 + " mm!").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                            "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                            ACAAALPHA + "°", ACAAL);
                                                        acaaSketch.off("resize").on("resize", function () {
                                                            if ($("#acaa").length > 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                    "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                    ACAAALPHA + "°", ACAAL);
                                                            }
                                                        });
                                                    }
                                                    acaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                    "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                    ACAAALPHA + "°", ACAAL);
                                                                acaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acaa").length > 0) {
                                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                            "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                            ACAAALPHA + "°", ACAAL);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACAACP2;
                                                    if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                        && parseFloat(rows[25][columns[0][1].field]) < ACAATHKPN) {
                                                        ACAACP2 = parseFloat(rows[25][columns[0][1].field]);
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])
                                                        && parseFloat(rows[25][columns[0][1].field]) >= ACAATHKPN) {
                                                        south.html("接管腐蚀裕量不能大于等于 " + ACAATHKPN + " mm").css("color", "red");
                                                        return false;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    let ACAAEP;
                                                    if (!jQuery.isEmptyObject(rows[26][columns[0][1].field])) {
                                                        ACAAEP = parseFloat(rows[26][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    这个层次为计算逻辑主线
                                                     */

                                                    // 补强圈分支
                                                    let ACAAIsPAD;
                                                    if (!jQuery.isEmptyObject(rows[27][columns[0][1].field])) {
                                                        ACAAIsPAD = rows[27][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                            "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                            ACAAALPHA + "°", ACAAL, ACAAIsPAD);
                                                        acaaSketch.off("resize").on("resize", function () {
                                                            if ($("#acaa").length > 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                    "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                    ACAAALPHA + "°", ACAAL, ACAAIsPAD);
                                                            }
                                                        });
                                                    }
                                                    acaad2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                    "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                    ACAAALPHA + "°", ACAAL, ACAAIsPAD);
                                                                acaaSketch.off("resize").on("resize", function () {
                                                                    if ($("#acaa").length > 0) {
                                                                        acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                            "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                            ACAAALPHA + "°", ACAAL, ACAAIsPAD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    let ACAADR = -1.0, ACAARThkMin = -1.0, ACAARThkMax = -1.0;
                                                    let ACAADRO = -1.0, ACAATHKRN = -1.0, ACAACR2 = -1.0;
                                                    let ACAAORT = -1.0, ACAAOR = -1.0, ACAAORT1 = -1.0, ACAARREL = -1.0,
                                                        ACAACR1 = -1.0;
                                                    if (ACAAIsPAD === "是") {

                                                        if (ACAATHKSN > 38) {
                                                            south.html("筒体厚度大于 38 mm 时，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }
                                                        else if (ACAASCategoryVal === "碳素钢和低合金钢" && ACAARSEL >= 380) {
                                                            south.html("Rm ≥ 540 MPa 的低合金钢，不允许采用补强圈！").css("color", "red");
                                                            return false;
                                                        }

                                                        if (!jQuery.isEmptyObject(rows[31][columns[0][1].field])) {
                                                            ACAARNameVal = rows[31][columns[0][1].field];
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
                                                                "category": ACAARCategoryVal,
                                                                "type": ACAARTypeVal,
                                                                "std": ACAARSTDVal,
                                                                "name": ACAARNameVal,
                                                                "temp": ACAADT
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                ACAADR = parseFloat(result.density);
                                                                ACAARThkMin = parseFloat(result.thkMin);
                                                                ACAARThkMax = parseFloat(result.thkMax);

                                                                // dro
                                                                if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) > ACAADPO) {
                                                                    ACAADRO = parseFloat(rows[32][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[32][columns[0][1].field])
                                                                    && parseFloat(rows[32][columns[0][1].field]) <= ACAADPO) {
                                                                    south.html("补强圈外直径 Dro 不能小于等于 " + ACAADPO + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                        "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                        ACAAALPHA + "°", ACAAL, ACAAIsPAD, "Φ" + ACAADRO);
                                                                    acaaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acaa").length > 0) {
                                                                            acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                                "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                                ACAAALPHA + "°", ACAAL, ACAAIsPAD, "Φ" + ACAADRO);
                                                                        }
                                                                    });
                                                                }
                                                                acaad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                                "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                                ACAAALPHA + "°", ACAAL, ACAAIsPAD, "Φ" + ACAADRO);
                                                                            acaaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acaa").length > 0) {
                                                                                    acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                                        "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                                        ACAAALPHA + "°", ACAAL, ACAAIsPAD, "Φ" + ACAADRO);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                    && parseFloat(rows[33][columns[0][1].field]) > ACAARThkMin
                                                                    && parseFloat(rows[33][columns[0][1].field]) <= Math.min(ACAARThkMax, 1.5 * ACAATHKSN)) {
                                                                    ACAATHKRN = parseFloat(rows[33][columns[0][1].field]);
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                    && parseFloat(rows[33][columns[0][1].field]) <= ACAARThkMin) {
                                                                    south.html("补强圈材料厚度不能小于等于 " + ACAARThkMin + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[33][columns[0][1].field])
                                                                    && parseFloat(rows[33][columns[0][1].field]) > Math.min(ACAARThkMax, 1.5 * ACAATHKSN)) {
                                                                    south.html("补强圈材料厚度不能大于 " + Math.min(ACAARThkMax, 1.5 * ACAATHKSN) + " mm").css("color", "red");
                                                                    return false;
                                                                }
                                                                else {
                                                                    return false;
                                                                }

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                        "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                        ACAAALPHA + "°", ACAAL, ACAAIsPAD, "Φ" + ACAADRO, ACAATHKRN);
                                                                    acaaSketch.off("resize").on("resize", function () {
                                                                        if ($("#acaa").length > 0) {
                                                                            acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                                "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                                ACAAALPHA + "°", ACAAL, ACAAIsPAD, "Φ" + ACAADRO, ACAATHKRN);
                                                                        }
                                                                    });
                                                                }
                                                                acaad2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                                "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                                ACAAALPHA + "°", ACAAL, ACAAIsPAD, "Φ" + ACAADRO, ACAATHKRN);
                                                                            acaaSketch.off("resize").on("resize", function () {
                                                                                if ($("#acaa").length > 0) {
                                                                                    acaa2d(ACAAIDOD, "Φ" + ACAADSI, "Φ" + ACAADSO, ACAATHKSN,
                                                                                        "Φ" + ACAADPO, ACAATHKPN, ACAAHPO, ACAAHPI,
                                                                                        ACAAALPHA + "°", ACAAL, ACAAIsPAD, "Φ" + ACAADRO, ACAATHKRN);
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
                                                                        "category": ACAARCategoryVal,
                                                                        "type": ACAARTypeVal,
                                                                        "std": ACAARSTDVal,
                                                                        "name": ACAARNameVal,
                                                                        "thk": ACAATHKRN,
                                                                        "temp": ACAADT,
                                                                        "highLow": 3,
                                                                        "isTube": 0,
                                                                        "od": ACAADRO
                                                                    }),
                                                                    beforeSend: function () {
                                                                    },
                                                                    success: function (result) {

                                                                        ACAAORT = parseFloat(result.ot);
                                                                        if (ACAAORT < 0) {
                                                                            south.html("查询补强圈材料设计温度许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACAAOR = parseFloat(result.o);
                                                                        if (ACAAOR < 0) {
                                                                            south.html("查询补强圈材料常温许用应力失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACAARREL = parseFloat(result.rel);
                                                                        if (ACAARREL < 0) {
                                                                            south.html("查询补强圈材料常温屈服强度失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACAACR1 = parseFloat(result.c1);
                                                                        if (ACAACR1 < 0) {
                                                                            south.html("查询补强圈材料厚度负偏差失败！").css("color", "red");
                                                                            return false;
                                                                        }
                                                                        ACAAORT1 = parseFloat(result.ot1);

                                                                        // 补强圈腐蚀裕量 cr2
                                                                        if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                            && parseFloat(rows[34][columns[0][1].field]) < ACAATHKRN) {
                                                                            ACAACR2 = parseFloat(rows[34][columns[0][1].field]);
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[34][columns[0][1].field])
                                                                            && parseFloat(rows[34][columns[0][1].field]) >= ACAATHKRN) {
                                                                            south.html("补强圈腐蚀裕量不能大于等于 " + ACAATHKRN + " mm").css("color", "red");
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
                                                        if (ACAACR2 < 0) {
                                                            return false;
                                                        }
                                                    }

                                                    // A3
                                                    let ACAAA3;
                                                    if (!jQuery.isEmptyObject(rows[35][columns[0][1].field])) {
                                                        ACAAA3 = parseFloat(rows[35][columns[0][1].field]);
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // IsB
                                                    let ACAAIsB;
                                                    if (!jQuery.isEmptyObject(rows[36][columns[0][1].field])) {
                                                        ACAAIsB = rows[36][columns[0][1].field];
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // BS
                                                    let ACAABS = -1.0;
                                                    if (ACAAIsB === "是") {

                                                        // 获取 BS
                                                        if (parseFloat(rows[37][columns[0][1].field]) > ACAADPO) {
                                                            ACAABS = parseFloat(rows[37][columns[0][1].field]);
                                                        }
                                                        else if (parseFloat(rows[37][columns[0][1].field]) <= ACAADPO) {
                                                            south.html("指定补强范围 B 不能小于等于 " + ACAADPO + " mm").css("color", "red");
                                                            return false;
                                                        }
                                                        else {
                                                            return false;
                                                        }
                                                    }

                                                    /*
                                                    过程参数
                                                     */

                                                    let ACAAPC = ACAAPD + ACAAPS;

                                                    // 筒体
                                                    let ACAACS = ACAACS1 + ACAACS2;
                                                    let ACAATHKSE = ACAATHKSN - ACAACS;
                                                    let ACAADSM = -1;
                                                    if (ACAAIDOD === "内径") {
                                                        ACAADSM = ACAADSI + ACAATHKSN;
                                                    }
                                                    else if (ACAAIDOD === "外径") {
                                                        ACAADSM = ACAADSO - ACAATHKSN;
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACAARSM = ACAADSM / 2;

                                                    // 接管
                                                    let ACAACP = ACAACP1 + ACAACP2;
                                                    let ACAATHKPE = ACAATHKPN - ACAACP;
                                                    let ACAADPC = ACAADPO - 2 * ACAATHKPN + 2 * ACAACP;
                                                    let ACAASA = ACAADPC / Math.cos(ACAAALPHA / 180 * Math.PI);
                                                    let ACAASB = ACAADPC * ACAARSM / Math.sqrt(ACAARSM * ACAARSM - ACAAL * ACAAL);
                                                    let ACAAK = Math.max(ACAASA / ACAASB, ACAASB / ACAASA);
                                                    if (ACAAK > 2) {
                                                        south.html("开孔长短轴之比大于2，程序无法计算！")
                                                            .css("color", "red");
                                                        return false;
                                                    }
                                                    let ACAADOP = ACAASA;
                                                    if (ACAAIDOD === "内径") {
                                                        if (ACAADSI <= 1500) {
                                                            if (ACAADOP > Math.min(ACAADSI / 2, 520)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                        else if (ACAADSI > 1500) {
                                                            if (ACAADOP > Math.min(ACAADSI / 3, 1000)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                    else if (ACAAIDOD === "外径") {
                                                        if ((ACAADSO - 2 * ACAATHKSN) <= 1500) {
                                                            if (ACAADOP > Math.min((ACAADSO - 2 * ACAATHKSN) / 2, 520)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                        else if ((ACAADSO - 2 * ACAATHKSN) > 1500) {
                                                            if (ACAADOP > Math.min((ACAADSO - 2 * ACAATHKSN) / 3, 1000)) {
                                                                south.html("开孔直径超界，程序无法计算！").css("color", "red");
                                                                return false;
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACAAFP = Math.min(1.0, ACAAOPT / ACAAOST);

                                                    // 补强圈
                                                    let ACAACR = -1.0, ACAATHKRE = -1.0, ACAAFR = -1.0;
                                                    if (ACAAIsPAD === "是") {
                                                        ACAACR = ACAACR1 + ACAACR2;
                                                        ACAATHKRE = ACAATHKRN - ACAACR;
                                                        ACAAFR = Math.min(1.0, ACAAORT / ACAAOST);
                                                    }

                                                    /*
                                                    筒体内压长度校核
                                                     */
                                                    let ACAATHKSC;
                                                    if (ACAAIDOD === "内径") {
                                                        ACAATHKSC = ACAAPC * ACAADSI / (2 * ACAAOST * ACAAES - ACAAPC);
                                                    }
                                                    else if (ACAAIDOD === "外径") {
                                                        ACAATHKSC = ACAAPC * ACAADSO / (2 * ACAAOST * ACAAES + ACAAPC);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACAATHKSD = ACAATHKSC + ACAACS2;
                                                    south.html(
                                                        "<span style='color:#444444;'>" +
                                                        "筒体内压所需厚度：" + (ACAATHKSD + ACAACS1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACAATHKSCHK;
                                                    if (ACAATHKSN >= (ACAATHKSD + ACAACS1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACAATHKSN + " mm" +
                                                            "</span>");
                                                        ACAATHKSCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACAATHKSN + " mm" +
                                                            "</span>");
                                                        ACAATHKSCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    接管内压强度校核
                                                     */
                                                    let ACAATHKPC = ACAAPC * ACAADPO / (2 * ACAAOPT * ACAAEP + ACAAPC);
                                                    let ACAATHKPD = ACAATHKPC + ACAACP2;
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "接管内压所需厚度：" + (ACAATHKPD + ACAACP1).toFixed(2) + " mm" +
                                                        "</span>");
                                                    let ACAATHKPCHK;
                                                    if (ACAATHKPN >= (ACAATHKPD + ACAACP1).toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACAATHKPN + " mm" +
                                                            "</span>");
                                                        ACAATHKPCHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "输入厚度：" + ACAATHKPN + " mm" +
                                                            "</span>");
                                                        ACAATHKPCHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    开孔补强计算
                                                     */
                                                    let ACAABA = ACAADOP * ACAATHKSC + 2 * ACAATHKSC * ACAATHKPE * (1 - ACAAFP);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "开孔所需补强面积：" + ACAABA.toFixed(2) + " mm²" +
                                                        "</span>");

                                                    // 筒体
                                                    let ACAABB;
                                                    if (ACAAIsB === "是") {
                                                        ACAABB = Math.min(Math.max(2 * ACAADOP, ACAADOP + 2 * ACAATHKSN + 2 * ACAATHKPN), ACAABS);
                                                    }
                                                    else if (ACAAIsB === "否") {
                                                        ACAABB = Math.max(2 * ACAADOP, ACAADOP + 2 * ACAATHKSN + 2 * ACAATHKPN);
                                                    }
                                                    else {
                                                        return false;
                                                    }
                                                    let ACAAA1 = (ACAABB - ACAADOP) * (ACAATHKSE - ACAATHKSC) - 2 * ACAATHKPE * (ACAATHKSE - ACAATHKSC) * (1 - ACAAFP);

                                                    // 接管
                                                    let ACAAHP1 = Math.min(ACAAHPO, Math.sqrt(ACAADOP * ACAATHKPN));
                                                    let ACAAHP2 = Math.min(ACAAHPI, Math.sqrt(ACAADOP * ACAATHKPN));
                                                    let ACAAA2 = 2 * ACAAHP1 * (ACAATHKPE - ACAATHKPC) * ACAAFP + 2 * ACAAHP2 * (ACAATHKPE - ACAACP2) * ACAAFP;

                                                    // 补强圈
                                                    let ACAAA4 = 0.0, ACAADRE = -1.0;
                                                    if (ACAAIsPAD === "是") {
                                                        ACAADRE = Math.min(ACAADRO, ACAABB);
                                                        ACAAA4 = (ACAADRE - ACAADPO) * ACAATHKRE * ACAAFR;
                                                    }

                                                    // Ae
                                                    let ACAAAE = ACAAA1 + ACAAA2 + ACAAA3 + ACAAA4;
                                                    let ACAAACHK;
                                                    if (ACAAAE >= ACAABA.toFixed(2)) {
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACAAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACAAACHK = "合格";
                                                    }
                                                    else {
                                                        south.append(
                                                            "<span style='color:red;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "实际补强面积：" + ACAAAE.toFixed(2) + " mm²" +
                                                            "</span>");
                                                        ACAAACHK = "不合格";
                                                        return false;
                                                    }

                                                    /*
                                                    压力试验
                                                     */
                                                    let ACAAETA, ACAAPST, ACAAPPT, ACAAPT;
                                                    if (ACAATest === "液压试验") {
                                                        ACAAETA = 1.25;
                                                        ACAAPST = ACAAETA * ACAAPD * ACAAOS / Math.max(ACAAOST, ACAAOST1);
                                                        ACAAPPT = ACAAETA * ACAAPD * ACAAOP / Math.max(ACAAOPT, ACAAOPT1);
                                                        ACAAPT = Math.min(ACAAPST, ACAAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：液压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACAAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else if (ACAATest === "气压试验") {
                                                        ACAAETA = 1.10;
                                                        ACAAPST = ACAAETA * ACAAPD * ACAAOS / Math.max(ACAAOST, ACAAOST1);
                                                        ACAAPPT = ACAAETA * ACAAPD * ACAAOP / Math.max(ACAAOPT, ACAAOPT1);
                                                        ACAAPT = Math.min(ACAAPST, ACAAPPT);
                                                        south.append(
                                                            "<span style='color:#444444;'>" +
                                                            "&ensp;|&ensp;" +
                                                            "试压类型：气压" +
                                                            "&ensp;|&ensp;" +
                                                            "试验压力：" + ACAAPT.toFixed(4) + " MPa" +
                                                            "</span>");
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    /*
                                                    计算 MAWP
                                                     */

                                                    // 筒体
                                                    let ACAAMAWPS;
                                                    if (ACAAIDOD === "内径") {
                                                        ACAAMAWPS = 2 * ACAATHKSE * ACAAOST * ACAAES / (ACAADSI + ACAATHKSE) - ACAAPS;
                                                    }
                                                    else if (ACAAIDOD === "外径") {
                                                        ACAAMAWPS = 2 * ACAATHKSE * ACAAOST * ACAAES / (ACAADSO - ACAATHKSE) - ACAAPS;
                                                    }
                                                    else {
                                                        return false;
                                                    }

                                                    // 接管
                                                    let ACAAMAWPP = 2 * ACAATHKPE * ACAAOPT * ACAAEP / (ACAADPO - ACAATHKPE) - ACAAPS;

                                                    // 开孔补强
                                                    let ACAAMAWPA1 = -1, ACAAMAWPA2 = -1,
                                                        ACAAMAWPA3 = ACAAA3, ACAAMAWPA4 = ACAAA4,
                                                        ACAAMAWPA = -1, ACAAMAWPAE = -1,
                                                        ACAAMAWPRC = ACAAPC;
                                                    let ACAAMAWPTHKSC, ACAAMAWPTHKPC;
                                                    while (ACAAMAWPAE >= ACAAMAWPA) {

                                                        ACAAMAWPRC += 0.0001;

                                                        // 筒体计算厚度
                                                        if (ACAAIDOD === "内径") {
                                                            ACAAMAWPTHKSC = ACAAMAWPRC * ACAADSI / (2 * ACAAOST * ACAAES - ACAAPC);
                                                        }
                                                        else if (ACAAIDOD === "外径") {
                                                            ACAAMAWPTHKSC = ACAAMAWPRC * ACAADSO / (2 * ACAAOST * ACAAES + ACAAPC);
                                                        }
                                                        ACAAMAWPA = ACAADOP * ACAAMAWPTHKSC + 2 * ACAAMAWPTHKSC * ACAATHKPE * (1 - ACAAFP);

                                                        // 接管计算厚度
                                                        ACAAMAWPTHKPC = ACAAMAWPRC * ACAADPO / (2 * ACAAOPT * ACAAEP + ACAAPC);
                                                        ACAAMAWPA1 = (ACAABB - ACAADOP) * (ACAATHKSE - ACAAMAWPTHKSC) - 2 * ACAATHKPE * (ACAATHKSE - ACAAMAWPTHKSC) * (1 - ACAAFP);
                                                        ACAAMAWPA2 = 2 * ACAAHP1 * (ACAATHKPE - ACAAMAWPTHKPC) * ACAAFP + 2 * ACAAHP2 * (ACAATHKPE - ACAACP2) * ACAAFP;
                                                        ACAAMAWPAE = ACAAMAWPA1 + ACAAMAWPA2 + ACAAMAWPA3 + ACAAMAWPA4;
                                                    }

                                                    // 取用 MAWP
                                                    let ACAAMAWPR = ACAAMAWPRC - ACAAPS - 0.0001;
                                                    let ACAAMAWP = Math.min(ACAAMAWPS, ACAAMAWPP, ACAAMAWPR);
                                                    south.append(
                                                        "<span style='color:#444444;'>" +
                                                        "&ensp;|&ensp;" +
                                                        "MAWP：" + ACAAMAWP.toFixed(4) + " MPa" +
                                                        "</span>");

                                                    // docx
                                                    let ACAAPayJS = $('#payjs');

                                                    function getDocx() {
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "acaadocx.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                ribbonName: "ACAA",

                                                                idod: ACAAIDOD,
                                                                isPad: ACAAIsPAD,
                                                                isB: ACAAIsB,

                                                                tag: ACAATag,
                                                                pd: ACAAPD,
                                                                t: ACAADT,
                                                                ps: ACAAPS,
                                                                test: ACAATest,

                                                                stds: ACAASSTDVal,
                                                                names: ACAASNameVal,
                                                                dsi: ACAADSI,
                                                                dso: ACAADSO,
                                                                thksn: ACAATHKSN,
                                                                cs2: ACAACS2,
                                                                es: ACAAES,

                                                                stdp: ACAAPSTDVal,
                                                                namep: ACAAPNameVal,
                                                                dpo: ACAADPO,
                                                                thkpn: ACAATHKPN,
                                                                hpo: ACAAHPO,
                                                                hpi: ACAAHPI,
                                                                alpha: ACAAALPHA,
                                                                l: ACAAL,
                                                                cp2: ACAACP2,
                                                                ep: ACAAEP,

                                                                stdr: ACAARSTDVal,
                                                                namer: ACAARNameVal,
                                                                dro: ACAADRO,
                                                                thkrn: ACAATHKRN,
                                                                cr2: ACAACR2,

                                                                a3: ACAAA3,
                                                                bs: ACAABS,

                                                                ds: ACAADS.toFixed(4),
                                                                cs1: ACAACS1.toFixed(4),
                                                                rsel: ACAARSEL.toFixed(4),
                                                                ost: ACAAOST.toFixed(4),
                                                                os: ACAAOS.toFixed(4),
                                                                ost1: ACAAOST1.toFixed(4),

                                                                dp: ACAADP.toFixed(4),
                                                                cp1: ACAACP1.toFixed(4),
                                                                rpel: ACAARPEL.toFixed(4),
                                                                opt: ACAAOPT.toFixed(4),
                                                                op: ACAAOP.toFixed(4),
                                                                opt1: ACAAOPT1.toFixed(4),

                                                                dr: ACAADR.toFixed(4),
                                                                cr1: ACAACR1.toFixed(4),
                                                                rrel: ACAARREL.toFixed(4),
                                                                ort: ACAAORT.toFixed(4),
                                                                or: ACAAOR.toFixed(4),
                                                                ort1: ACAAORT1.toFixed(4),

                                                                pc: ACAAPC.toFixed(4),
                                                                cs: ACAACS.toFixed(4),
                                                                thkse: ACAATHKSE.toFixed(4),
                                                                dsm: ACAADSM.toFixed(4),
                                                                rsm: ACAARSM.toFixed(4),

                                                                cp: ACAACP.toFixed(4),
                                                                thkpe: ACAATHKPE.toFixed(4),
                                                                dpc: ACAADPC.toFixed(4),
                                                                sa: ACAASA.toFixed(4),
                                                                sb: ACAASB.toFixed(4),
                                                                k: ACAAK.toFixed(4),
                                                                dop: ACAADOP.toFixed(4),
                                                                fp: ACAAFP.toFixed(4),

                                                                cr: ACAACR.toFixed(4),
                                                                thkre: ACAATHKRE.toFixed(4),
                                                                fr: ACAAFR.toFixed(4),

                                                                thksc: ACAATHKSC.toFixed(4),
                                                                thksd: ACAATHKSD.toFixed(4),
                                                                thkschk: ACAATHKSCHK,

                                                                thkpc: ACAATHKPC.toFixed(4),
                                                                thkpd: ACAATHKPD.toFixed(4),
                                                                thkpchk: ACAATHKPCHK,

                                                                ba: ACAABA.toFixed(4),
                                                                bb: ACAABB.toFixed(4),
                                                                a1: ACAAA1.toFixed(4),
                                                                hp1: ACAAHP1.toFixed(4),
                                                                hp2: ACAAHP2.toFixed(4),
                                                                a2: ACAAA2.toFixed(4),
                                                                dre: ACAADRE.toFixed(4),
                                                                a4: ACAAA4.toFixed(4),
                                                                ae: ACAAAE.toFixed(4),
                                                                achk: ACAAACHK,

                                                                eta: ACAAETA.toFixed(4),
                                                                pst: ACAAPST.toFixed(4),
                                                                ppt: ACAAPPT.toFixed(4),
                                                                pt: ACAAPT.toFixed(4),

                                                                mawps: ACAAMAWPS.toFixed(4),
                                                                mawpp: ACAAMAWPP.toFixed(4),
                                                                mawpa1: ACAAMAWPA1.toFixed(0),
                                                                mawpa2: ACAAMAWPA2.toFixed(0),
                                                                mawpa3: ACAAMAWPA3,
                                                                mawpa4: ACAAMAWPA4.toFixed(0),
                                                                mawpa: ACAAMAWPA.toFixed(0),
                                                                mawpae: ACAAMAWPAE.toFixed(0),
                                                                mawpr: ACAAMAWPR.toFixed(4),
                                                                mawp: ACAAMAWP.toFixed(4)
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
                                                                    ACAAPayJS.dialog({
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
                                                                                ACAAPayJS.dialog("close");
                                                                                ACAAPayJS.dialog("clear");
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
                                                                                            ACAAPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                            // 倒计时计数器
                                                                                            let maxTime = 4, timer;

                                                                                            function CountDown() {
                                                                                                if (maxTime >= 0) {
                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                    --maxTime;
                                                                                                } else {

                                                                                                    clearInterval(timer);
                                                                                                    // 关闭并清空收银台
                                                                                                    ACAAPayJS.dialog('close');
                                                                                                    ACAAPayJS.dialog('clear');
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