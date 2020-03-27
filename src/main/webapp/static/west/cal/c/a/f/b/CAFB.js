$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let cafbd2 = $("#d2");
    let cafbd3 = $("#d3");
    let cafbd2d3 = $('#d2d3');

    $("#cal").html("<table id='cafb'></table>");
    let pg = $("#cafb");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/c/a/f/b/CAFB.json", function (result) {

        let CAFBDT;
        let CAFBSCategory, CAFBSCategoryVal, CAFBSType, CAFBSTypeVal, CAFBSSTD, CAFBSSTDVal, CAFBSName,
            CAFBJCategory, CAFBJCategoryVal, CAFBJType, CAFBJTypeVal, CAFBJSTD, CAFBJSTDVal, CAFBJName;
        let columns, rows, ed;

        // 2D Sketch
        function cafb2d(djo, thkjn, dsi, thksn) {

            if (!djo) djo = "ϕdjo";
            if (!thkjn) thkjn = "δjn";
            if (!dsi) dsi = "ϕDsi";
            if (!thksn) thksn = "δsn";

            cafbd2.empty();

            let width = cafbd2.width();
            let height = cafbd2.height();

            let svg = d3.select("#d2").append("svg").attr("id", "CAFBSVG")
                .attr("width", width).attr("height", height);

            // X 轴比例尺
            let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);

            // Y 轴比例尺
            let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);

            // 轮廓线对象
            let line = d3.line().x(function (d) {
                return xScale(d.x);
            }).y(function (d) {
                return yScale(d.y);
            });

            // 图形边距
            let padding = 80;
            let thickness = 10;

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
                ])).attr("id", id).classed("sketch", true);

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

                let g2 = svg.append("g");
                let text2 = g2.append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle");
                text2.append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            // 封头内径
            let CAFBSketchSDI = Math.min((height - 2 * padding) * 2, width - 2 * padding);
            let CAFBSketchSDO = CAFBSketchSDI + 2 * thickness;
            let CAFBSketchSRI = CAFBSketchSDI / 2;
            let CAFBSketchSRO = CAFBSketchSDO / 2;
            let CAFBcenterX = width / 2;
            let CAFBcenterY = padding;

            drawLine(CAFBcenterX - CAFBSketchSRO, CAFBcenterY, CAFBcenterX + CAFBSketchSRO, CAFBcenterY);
            drawArc(CAFBSketchSRO, CAFBSketchSRO, CAFBcenterX + CAFBSketchSRO, CAFBcenterY, CAFBcenterX - CAFBSketchSRO, CAFBcenterY);
            drawArc(CAFBSketchSRI, CAFBSketchSRI, CAFBcenterX + CAFBSketchSRI, CAFBcenterY, CAFBcenterX - CAFBSketchSRI, CAFBcenterY);
            drawCenterLine(width / 2, padding - 10, width / 2, CAFBcenterY + CAFBSketchSRO + 10);

            // 封头直径标注
            dimTopH(CAFBcenterX - CAFBSketchSRI, CAFBcenterY, CAFBcenterX + CAFBSketchSRI, CAFBcenterY, dsi, "CAFBSketchDSI");

            // 封头厚度标注
            drawLine(CAFBcenterX - CAFBSketchSRO, padding - 3, CAFBcenterX - CAFBSketchSRO, padding - 40);
            drawLine(CAFBcenterX - CAFBSketchSRO, padding - 30, CAFBcenterX - CAFBSketchSRI, padding - 30);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: CAFBcenterX - CAFBSketchSRO, y: padding - 30},
                    {x: CAFBcenterX - CAFBSketchSRO - 15, y: padding - 30 - 3},
                    {x: CAFBcenterX - CAFBSketchSRO - 15, y: padding - 30 + 3},
                    {x: CAFBcenterX - CAFBSketchSRO, y: padding - 30}
                ]));
            svg.append("path").attr("d", line([
                {x: CAFBcenterX - CAFBSketchSRO - 15 - 40, y: padding - 30},
                {x: CAFBcenterX - CAFBSketchSRO - 15, y: padding - 30}
            ])).attr("id", "CAFBSketchTHKSN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#CAFBSketchTHKSN").attr("startOffset", "50%").text(thksn);

            let CAFBSketchJRI = 0.1 * CAFBSketchSRI;
            let CAFBSketchJRO = CAFBSketchJRI + 5;
            let CAFBSketchHalfRadI = 2 * Math.asin(CAFBSketchJRI / 2 / CAFBSketchSRO);
            let CAFBSketchHalfRadO = 2 * Math.asin(CAFBSketchJRO / 2 / CAFBSketchSRO);

            svg.append("path").attr("d", "M "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI)) + " "
                + "A" + CAFBSketchJRI + " " + CAFBSketchJRI + " "
                + "1 0 1" + " "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + -10 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", "M "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO)) + " "
                + "A" + CAFBSketchJRO + " " + CAFBSketchJRO + " "
                + "1 0 1" + " "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + -10 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBcenterX - CAFBSketchSRO - CAFBSketchJRO - 10, y: CAFBcenterY},
                {x: CAFBcenterX - CAFBSketchSRO + 10, y: CAFBcenterY}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true).attr("transform", "rotate(" + -10 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");

            svg.append("path").attr("d", "M "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI)) + " "
                + "A" + CAFBSketchJRI + " " + CAFBSketchJRI + " "
                + "1 0 1" + " "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + -28 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", "M "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO)) + " "
                + "A" + CAFBSketchJRO + " " + CAFBSketchJRO + " "
                + "1 0 1" + " "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + -28 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBcenterX - CAFBSketchSRO - CAFBSketchJRO - 10, y: CAFBcenterY},
                {x: CAFBcenterX - CAFBSketchSRO + 10, y: CAFBcenterY}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true).attr("transform", "rotate(" + -28 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");

            svg.append("path").attr("d", "M "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI)) + " "
                + "A" + CAFBSketchJRI + " " + CAFBSketchJRI + " "
                + "1 0 1" + " "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + -46 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", "M "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO)) + " "
                + "A" + CAFBSketchJRO + " " + CAFBSketchJRO + " "
                + "1 0 1" + " "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + -46 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBcenterX - CAFBSketchSRO - CAFBSketchJRO - 10, y: CAFBcenterY},
                {x: CAFBcenterX - CAFBSketchSRO + 10, y: CAFBcenterY}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true).attr("transform", "rotate(" + -46 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");

            svg.append("path").attr("d", "M "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI)) + " "
                + "A" + CAFBSketchJRI + " " + CAFBSketchJRI + " "
                + "1 0 1" + " "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + -64 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", "M "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO)) + " "
                + "A" + CAFBSketchJRO + " " + CAFBSketchJRO + " "
                + "1 0 1" + " "
                + (CAFBcenterX - CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + -64 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBcenterX - CAFBSketchSRO - CAFBSketchJRO - 10, y: CAFBcenterY},
                {x: CAFBcenterX - CAFBSketchSRO + 10, y: CAFBcenterY}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true).attr("transform", "rotate(" + -64 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");

            svg.append("path").attr("d", "M "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI)) + " "
                + "A" + CAFBSketchJRI + " " + CAFBSketchJRI + " "
                + "1 0 1" + " "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + 10 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", "M "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO)) + " "
                + "A" + CAFBSketchJRO + " " + CAFBSketchJRO + " "
                + "1 0 1" + " "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + 10 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBcenterX + CAFBSketchSRO + CAFBSketchJRO + 10, y: CAFBcenterY},
                {x: CAFBcenterX + CAFBSketchSRO - 10, y: CAFBcenterY}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true).attr("transform", "rotate(" + 10 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");

            svg.append("path").attr("d", "M "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI)) + " "
                + "A" + CAFBSketchJRI + " " + CAFBSketchJRI + " "
                + "1 0 1" + " "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + 28 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", "M "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO)) + " "
                + "A" + CAFBSketchJRO + " " + CAFBSketchJRO + " "
                + "1 0 1" + " "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + 28 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBcenterX + CAFBSketchSRO + CAFBSketchJRO + 10, y: CAFBcenterY},
                {x: CAFBcenterX + CAFBSketchSRO - 10, y: CAFBcenterY}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true).attr("transform", "rotate(" + 28 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");

            svg.append("path").attr("d", "M "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI)) + " "
                + "A" + CAFBSketchJRI + " " + CAFBSketchJRI + " "
                + "1 0 1" + " "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + 46 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", "M "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO)) + " "
                + "A" + CAFBSketchJRO + " " + CAFBSketchJRO + " "
                + "1 0 1" + " "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + 46 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBcenterX + CAFBSketchSRO + CAFBSketchJRO + 10, y: CAFBcenterY},
                {x: CAFBcenterX + CAFBSketchSRO - 10, y: CAFBcenterY}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true).attr("transform", "rotate(" + 46 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");

            svg.append("path").attr("d", "M "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI)) + " "
                + "A" + CAFBSketchJRI + " " + CAFBSketchJRI + " "
                + "1 0 1" + " "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadI)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadI))
            ).classed("sketch", true).attr("transform", "rotate(" + 64 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", "M "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY - CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO)) + " "
                + "A" + CAFBSketchJRO + " " + CAFBSketchJRO + " "
                + "1 0 1" + " "
                + (CAFBcenterX + CAFBSketchSRO * Math.cos(CAFBSketchHalfRadO)) + " " + (CAFBcenterY + CAFBSketchSRO * Math.sin(CAFBSketchHalfRadO))
            ).classed("sketch", true).attr("transform", "rotate(" + 64 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBcenterX + CAFBSketchSRO + CAFBSketchJRO + 10, y: CAFBcenterY},
                {x: CAFBcenterX + CAFBSketchSRO - 10, y: CAFBcenterY}
            ])).attr("stroke-dasharray", "25,5,5,5").classed("sketch", true).attr("transform", "rotate(" + 64 + ", " + CAFBcenterX + " " + CAFBcenterY + ")");

            // 夹套直径标注
            let CAFBJCenterX = CAFBcenterX - CAFBSketchSRO * Math.cos(10 / 180 * Math.PI);
            let CAFBJCenterY = CAFBcenterY + CAFBSketchSRO * Math.sin(10 / 180 * Math.PI);
            svg.append("path").attr("d", line([
                {x: CAFBJCenterX - CAFBSketchJRO, y: CAFBJCenterY},
                {x: CAFBJCenterX, y: CAFBJCenterY}
            ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + CAFBJCenterX + " " + CAFBJCenterY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: CAFBJCenterX - CAFBSketchJRO, y: CAFBJCenterY},
                    {x: CAFBJCenterX - CAFBSketchJRO - 15, y: CAFBJCenterY - 3},
                    {x: CAFBJCenterX - CAFBSketchJRO - 15, y: CAFBJCenterY + 3},
                    {x: CAFBJCenterX - CAFBSketchJRO, y: CAFBJCenterY}
                ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + CAFBJCenterX + " " + CAFBJCenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBJCenterX - CAFBSketchJRO - 15 - 25, y: CAFBJCenterY},
                {x: CAFBJCenterX - CAFBSketchJRO - 15, y: CAFBJCenterY}
            ])).classed("sketch", true).attr("transform", "rotate(" + 30 + ", " + CAFBJCenterX + " " + CAFBJCenterY + ")");
            svg.append("path").attr("d", line([
                {
                    x: CAFBJCenterX - 0.866 * (CAFBSketchJRO + 15 + 25) - 40,
                    y: CAFBJCenterY - 0.5 * (CAFBSketchJRO + 15 + 25)
                },
                {x: CAFBJCenterX - 0.866 * (CAFBSketchJRO + 15 + 25), y: CAFBJCenterY - 0.5 * (CAFBSketchJRO + 15 + 25)}
            ])).attr("id", "CAFBSketchDJO").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAFBSketchDJO").attr("startOffset", "50%").text(djo);

            // 夹套厚度
            let CAFBJRCenterX = CAFBcenterX + CAFBSketchSRO * Math.cos(10 / 180 * Math.PI);
            let CAFBJRCenterY = CAFBcenterY + CAFBSketchSRO * Math.sin(10 / 180 * Math.PI);
            svg.append("path").attr("d", line([
                {x: CAFBJRCenterX + CAFBSketchJRI - 15, y: CAFBJRCenterY},
                {x: CAFBJRCenterX, y: CAFBJRCenterY}
            ])).classed("sketch", true).attr("transform", "rotate(" + -30 + ", " + CAFBJRCenterX + " " + CAFBJRCenterY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: CAFBJRCenterX + CAFBSketchJRI, y: CAFBJRCenterY},
                    {x: CAFBJRCenterX + CAFBSketchJRI - 15, y: CAFBJRCenterY - 3},
                    {x: CAFBJRCenterX + CAFBSketchJRI - 15, y: CAFBJRCenterY + 3},
                    {x: CAFBJRCenterX + CAFBSketchJRI, y: CAFBJRCenterY}
                ])).attr("transform", "rotate(" + -30 + ", " + CAFBJRCenterX + " " + CAFBJRCenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBJRCenterX + CAFBSketchJRI, y: CAFBJRCenterY},
                {x: CAFBJRCenterX + CAFBSketchJRO, y: CAFBJRCenterY}
            ])).classed("sketch", true).attr("transform", "rotate(" + -30 + ", " + CAFBJRCenterX + " " + CAFBJRCenterY + ")");
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: CAFBJRCenterX + CAFBSketchJRO, y: CAFBJRCenterY},
                    {x: CAFBJRCenterX + CAFBSketchJRO + 15, y: CAFBJRCenterY - 3},
                    {x: CAFBJRCenterX + CAFBSketchJRO + 15, y: CAFBJRCenterY + 3},
                    {x: CAFBJRCenterX + CAFBSketchJRO, y: CAFBJRCenterY}
                ])).attr("transform", "rotate(" + -30 + ", " + CAFBJRCenterX + " " + CAFBJRCenterY + ")");
            svg.append("path").attr("d", line([
                {x: CAFBJRCenterX + CAFBSketchJRO + 15, y: CAFBJRCenterY},
                {x: CAFBJRCenterX + CAFBSketchJRO + 15 + 40, y: CAFBJRCenterY}
            ])).attr("id", "CAFBSketchTHKJN").classed("sketch", true)
                .attr("transform", "rotate(" + -30 + ", " + CAFBJRCenterX + " " + CAFBJRCenterY + ")");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", "#CAFBSketchTHKJN").attr("startOffset", "50%").text(thkjn);

        }

        currentTabIndex = cafbd2d3.tabs('getTabIndex', cafbd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            cafb2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#cafb").length > 0) {
                    cafb2d();
                }
            });
        }
        cafbd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    cafb2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#cafb").length > 0) {
                            cafb2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 20582-2011 半圆管夹套球形封头强度校核",
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
            onClickRow: function (index) {

                if (index !== lastIndex) {
                    pg.datagrid('endEdit', lastIndex);
                }
                pg.propertygrid('beginEdit', index);
                ed = pg.propertygrid("getEditor", {index: index, field: "value"});

                if (index === 4) {
                    $(ed.target).combobox("loadData", CAFBJCategory);
                }
                else if (index === 5) {
                    $(ed.target).combobox("loadData", CAFBJType);
                }
                else if (index === 6) {
                    $(ed.target).combobox("loadData", CAFBJSTD);
                }
                else if (index === 7) {
                    $(ed.target).combobox("loadData", CAFBJName);
                }
                else if (index === 14) {
                    $(ed.target).combobox("loadData", CAFBSCategory);
                }
                else if (index === 15) {
                    $(ed.target).combobox("loadData", CAFBSType);
                }
                else if (index === 16) {
                    $(ed.target).combobox("loadData", CAFBSSTD);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", CAFBSName);
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

                    docx.addClass("l-btn-disabled").off("click").attr("href", null);
                    docxtext.html("下载计算书");

                    // sketch
                    cafbd2.empty();

                    // model
                    cafbd3.empty();

                    // sketch
                    currentTabIndex = cafbd2d3.tabs('getTabIndex', cafbd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        cafb2d();
                        cafbd2.off("resize").on("resize", function () {
                            if ($("#cafb").length > 0) {
                                cafb2d();
                            }
                        });
                    }

                    cafbd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                cafb2d();
                                cafbd2.off("resize").on("resize", function () {
                                    if ($("#cafb").length > 0) {
                                        cafb2d();
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
                    if (index === 0) {

                        CAFBDT = parseFloat(changes.value);

                        // 将下游级联菜单 category、type、std、name 清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        CAFBJCategory = null;
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAFBJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFBJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFBJName = null;

                        rows[14][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 14);
                        CAFBSCategory = null;
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAFBSType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFBSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFBSName = null;

                        // 获取 category 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_category.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                temp: CAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFBJCategory = [];
                                CAFBSCategory = [];
                                if (result.length <= 0) {
                                    south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                        "&ensp;" + "<span style='color:red;'>" + CAFBDT + "</span>" +
                                        "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                                } else {
                                    $(result).each(function (index, element) {
                                        CAFBJCategory[index] = {
                                            "value": element,
                                            "text": element
                                        };
                                        CAFBSCategory[index] = {
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
                    else if (index === 4) {

                        CAFBJCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[5][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 5);
                        CAFBJType = null;
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFBJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFBJName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFBJCategoryVal,
                                temp: CAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFBJType = [];
                                $(result).each(function (index, element) {
                                    CAFBJType[index] = {
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
                    else if (index === 5) {

                        CAFBJTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[6][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 6);
                        CAFBJSTD = null;
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFBJName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFBJCategoryVal,
                                type: CAFBJTypeVal,
                                temp: CAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFBJSTD = [];
                                $(result).each(function (index, element) {
                                    CAFBJSTD[index] = {
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
                    else if (index === 6) {

                        CAFBJSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[7][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 7);
                        CAFBJName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFBJCategoryVal,
                                type: CAFBJTypeVal,
                                std: CAFBJSTDVal,
                                temp: CAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFBJName = [];
                                $(result).each(function (index, element) {
                                    CAFBJName[index] = {
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

                        CAFBSCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[15][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 15);
                        CAFBSType = null;
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFBSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFBSName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFBSCategoryVal,
                                temp: CAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFBSType = [];
                                $(result).each(function (index, element) {
                                    CAFBSType[index] = {
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

                        CAFBSTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[16][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 16);
                        CAFBSSTD = null;
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFBSName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFBSCategoryVal,
                                type: CAFBSTypeVal,
                                temp: CAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFBSSTD = [];
                                $(result).each(function (index, element) {
                                    CAFBSSTD[index] = {
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

                        CAFBSSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[17][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 17);
                        CAFBSName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: CAFBSCategoryVal,
                                type: CAFBSTypeVal,
                                std: CAFBSSTDVal,
                                temp: CAFBDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                CAFBSName = [];
                                $(result).each(function (index, element) {
                                    CAFBSName[index] = {
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

                    // name 及其他修改项改变，获取数据，并计算
                    else {

                        // 试验类型
                        if (!jQuery.isEmptyObject(rows[1][columns[0][1].field])) {
                            let CAFBTestVal = rows[1][columns[0][1].field];

                            // 夹套设计压力
                            if (!jQuery.isEmptyObject(rows[2][columns[0][1].field])) {
                                let CAFBPJD = parseFloat(rows[2][columns[0][1].field]);

                                // 夹套静压力
                                if (!jQuery.isEmptyObject(rows[3][columns[0][1].field])) {
                                    let CAFBPJS = parseFloat(rows[3][columns[0][1].field]);

                                    // 夹套计算压力
                                    let CAFBPJC = CAFBPJD + CAFBPJS;

                                    // 夹套材料名称
                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])) {
                                        let CAFBJNameVal = rows[7][columns[0][1].field];

                                        // AJAX 获取夹套材料密度、最大最小厚度
                                        let CAFBJDensity, CAFBJThkMin, CAFBJThkMax;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_index.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": CAFBJCategoryVal,
                                                "type": CAFBJTypeVal,
                                                "std": CAFBJSTDVal,
                                                "name": CAFBJNameVal,
                                                "temp": CAFBDT
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {
                                                CAFBJDensity = parseFloat(result.density);
                                                CAFBJThkMin = parseFloat(result.thkMin);
                                                CAFBJThkMax = parseFloat(result.thkMax);

                                                // 夹套外直径
                                                if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                    let CAFBDJO = parseFloat(rows[8][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        cafb2d("ϕ" + CAFBDJO);
                                                        cafbd2.off("resize").on("resize", function () {
                                                            if ($("#cafb").length > 0) {
                                                                cafb2d("ϕ" + CAFBDJO);
                                                            }
                                                        });
                                                    }

                                                    cafbd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                cafb2d("ϕ" + CAFBDJO);
                                                                cafbd2.off("resize").on("resize", function () {
                                                                    if ($("#cafb").length > 0) {
                                                                        cafb2d("ϕ" + CAFBDJO);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 标准限制的壳体厚度
                                                    let shellThkMaximum;
                                                    if (CAFBDJO === 60) {
                                                        shellThkMaximum = 25.4;
                                                    }
                                                    else {
                                                        shellThkMaximum = 50.8;
                                                    }

                                                    // 夹套名义厚度
                                                    if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > CAFBJThkMin
                                                        && parseFloat(rows[9][columns[0][1].field]) <= Math.min(CAFBDJO / 2, CAFBJThkMax)) {
                                                        let CAFBTHKJN = parseFloat(rows[9][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            cafb2d("ϕ" + CAFBDJO, CAFBTHKJN);
                                                            cafbd2.off("resize").on("resize", function () {
                                                                if ($("#cafb").length > 0) {
                                                                    cafb2d("ϕ" + CAFBDJO, CAFBTHKJN);
                                                                }
                                                            });
                                                        }
                                                        cafbd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    cafb2d("ϕ" + CAFBDJO, CAFBTHKJN);
                                                                    cafbd2.off("resize").on("resize", function () {
                                                                        if ($("#cafb").length > 0) {
                                                                            cafb2d("ϕ" + CAFBDJO, CAFBTHKJN);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        let CAFBDJI = CAFBDJO - 2 * CAFBTHKJN;

                                                        let CAFBJOT, CAFBJO, CAFBJOT1, CAFBJREL, CAFBCJ1;
                                                        $.ajax({
                                                            type: "POST",
                                                            contentType: "application/json; charset=utf-8",
                                                            url: "web_get_gbt_150_2011_com_property.action",
                                                            async: true,
                                                            dataType: "json",
                                                            data: JSON.stringify({
                                                                "category": CAFBJCategoryVal,
                                                                "type": CAFBJTypeVal,
                                                                "std": CAFBJSTDVal,
                                                                "name": CAFBJNameVal,
                                                                "thk": CAFBTHKJN,
                                                                "temp": CAFBDT,
                                                                "highLow": 3,
                                                                "isTube": 0,
                                                                "od": CAFBDJO
                                                            }),
                                                            beforeSend: function () {
                                                            },
                                                            success: function (result) {

                                                                CAFBJOT = parseFloat(result.ot);
                                                                if (CAFBJOT < 0) {
                                                                    south.html("查询盘管材料设计温度许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFBJO = parseFloat(result.o);
                                                                if (CAFBJO < 0) {
                                                                    south.html("查询盘管材料常温许用应力失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFBJREL = parseFloat(result.rel);
                                                                if (CAFBJREL < 0) {
                                                                    south.html("查询盘管材料常温屈服强度失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFBCJ1 = parseFloat(result.c1);
                                                                if (CAFBCJ1 < 0) {
                                                                    south.html("查询盘管材料厚度负偏差失败！").css("color", "red");
                                                                    return false;
                                                                }
                                                                CAFBJOT1 = parseFloat(result.ot1);

                                                                // 夹套腐蚀裕量
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < CAFBTHKJN) {
                                                                    let CAFBCJ2 = parseFloat(rows[10][columns[0][1].field]);

                                                                    // 夹套焊接接头系数
                                                                    let CAFBEJ = parseFloat(rows[11][columns[0][1].field]);

                                                                    // 夹套厚度附加量C
                                                                    let CAFBCJ = CAFBCJ1 + CAFBCJ2;

                                                                    // 夹套有效厚度
                                                                    let CAFBTHKJE = CAFBTHKJN - CAFBCJ;

                                                                    // 计算夹套内半径R
                                                                    let CAFBRJI = CAFBDJI / 2;

                                                                    // 夹套计算厚度
                                                                    let CAFBTHKJC = (CAFBPJC * CAFBRJI) / (CAFBEJ * CAFBJOT - 0.6 * CAFBPJC);

                                                                    // 设计厚度
                                                                    let CAFBTHKJD = CAFBTHKJC + CAFBCJ2;

                                                                    // 所需厚度提示信息
                                                                    south.html(
                                                                        "<span style='color:#444444;'>" +
                                                                        "夹套所需厚度：" + (CAFBTHKJD + CAFBCJ1).toFixed(2) + " mm" +
                                                                        "</span>");

                                                                    // 夹套厚度校核
                                                                    let CAFBTHKJCHK;
                                                                    if (CAFBTHKJN >= (CAFBTHKJD + CAFBCJ1).toFixed(2)) {
                                                                        south.append(
                                                                            "<span style='color:#444444;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + CAFBTHKJN + " mm" +
                                                                            "</span>");
                                                                        CAFBTHKJCHK = "合格";
                                                                    } else {
                                                                        south.append(
                                                                            "<span style='color:red;'>" +
                                                                            "&ensp;|&ensp;" +
                                                                            "输入厚度：" + CAFBTHKJN + " mm" +
                                                                            "</span>");
                                                                        CAFBTHKJCHK = "不合格";
                                                                    }

                                                                    // 夹套试验压力
                                                                    let CAFBPJT;
                                                                    if (CAFBTestVal === "液压试验") {
                                                                        CAFBPJT = 1.25 * CAFBPJD * CAFBJO / Math.max(CAFBJOT, CAFBJOT1);
                                                                    }
                                                                    else if (CAFBTestVal === "气压试验") {
                                                                        CAFBPJT = 1.1 * CAFBPJD * CAFBJO / Math.max(CAFBJOT, CAFBJOT1);
                                                                    }
                                                                    south.append(
                                                                        "<span style='color:#444444;'>" +
                                                                        "&ensp;|&ensp;" +
                                                                        "夹套试验压力：" + CAFBPJT.toFixed(4) + " MPa" +
                                                                        "</span>");

                                                                    // 环向应力限制的夹套 MAWPJJ
                                                                    let CAFBMAWPJJ = CAFBTHKJE * CAFBEJ * CAFBJOT / (CAFBRJI + 0.6 * CAFBTHKJE) - CAFBPJS;

                                                                    // 封头设计压力
                                                                    if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])) {
                                                                        let CAFBPSD = parseFloat(rows[12][columns[0][1].field]);

                                                                        // 封头静压力
                                                                        if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])) {
                                                                            let CAFBPSS = parseFloat(rows[13][columns[0][1].field]);

                                                                            // 封头计算压力
                                                                            let CAFBPSC = CAFBPSD + CAFBPSS;

                                                                            // 封头材料名称
                                                                            if (!jQuery.isEmptyObject(rows[17][columns[0][1].field])) {
                                                                                let CAFBSNameVal = rows[17][columns[0][1].field];

                                                                                // AJAX 获取封头材料密度、最大最小厚度
                                                                                let CAFBSDensity, CAFBSThkMin,
                                                                                    CAFBSThkMax;
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    contentType: "application/json; charset=utf-8",
                                                                                    url: "web_get_gbt_150_2011_index.action",
                                                                                    async: true,
                                                                                    dataType: "json",
                                                                                    data: JSON.stringify({
                                                                                        "category": CAFBSCategoryVal,
                                                                                        "type": CAFBSTypeVal,
                                                                                        "std": CAFBSSTDVal,
                                                                                        "name": CAFBSNameVal,
                                                                                        "temp": CAFBDT
                                                                                    }),
                                                                                    beforeSend: function () {
                                                                                    },
                                                                                    success: function (result) {

                                                                                        CAFBSDensity = parseFloat(result.density);
                                                                                        CAFBSThkMin = parseFloat(result.thkMin);
                                                                                        CAFBSThkMax = parseFloat(result.thkMax);

                                                                                        // 封头内直径
                                                                                        if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) >= 762
                                                                                            && parseFloat(rows[18][columns[0][1].field]) <= 4318) {
                                                                                            let CAFBDSI = parseFloat(rows[18][columns[0][1].field]);

                                                                                            // 封头内半径
                                                                                            let CAFBRSI = CAFBDSI / 2;

                                                                                            // Sketch
                                                                                            if (currentTabIndex === 0) {
                                                                                                cafb2d("ϕ" + CAFBDJO, CAFBTHKJN, "ϕ" + CAFBDSI);
                                                                                                cafbd2.off("resize").on("resize", function () {
                                                                                                    if ($("#cafb").length > 0) {
                                                                                                        cafb2d("ϕ" + CAFBDJO, CAFBTHKJN, "ϕ" + CAFBDSI);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            cafbd2d3.tabs({
                                                                                                onSelect: function (title, index) {
                                                                                                    if (index === 0) {
                                                                                                        cafb2d("ϕ" + CAFBDJO, CAFBTHKJN, "ϕ" + CAFBDSI);
                                                                                                        cafbd2.off("resize").on("resize", function () {
                                                                                                            if ($("#cafb").length > 0) {
                                                                                                                cafb2d("ϕ" + CAFBDJO, CAFBTHKJN, "ϕ" + CAFBDSI);
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                            });

                                                                                            // 封头名义厚度
                                                                                            if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) > Math.max(CAFBSThkMin, 4.8)
                                                                                                && parseFloat(rows[19][columns[0][1].field]) <= Math.min(CAFBSThkMax, shellThkMaximum)) {
                                                                                                let CAFBTHKSN = parseFloat(rows[19][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    cafb2d("ϕ" + CAFBDJO, CAFBTHKJN, "ϕ" + CAFBDSI, CAFBTHKSN);
                                                                                                    cafbd2.off("resize").on("resize", function () {
                                                                                                        if ($("#cafb").length > 0) {
                                                                                                            cafb2d("ϕ" + CAFBDJO, CAFBTHKJN, "ϕ" + CAFBDSI, CAFBTHKSN);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                cafbd2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            cafb2d("ϕ" + CAFBDJO, CAFBTHKJN, "ϕ" + CAFBDSI, CAFBTHKSN);
                                                                                                            cafbd2.off("resize").on("resize", function () {
                                                                                                                if ($("#cafb").length > 0) {
                                                                                                                    cafb2d("ϕ" + CAFBDJO, CAFBTHKJN, "ϕ" + CAFBDSI, CAFBTHKSN);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                let CAFBDSO = CAFBDSI + 2 * CAFBTHKSN;

                                                                                                let CAFBSOT, CAFBSO,
                                                                                                    CAFBSOT1, CAFBSREL,
                                                                                                    CAFBCS1;
                                                                                                $.ajax({
                                                                                                    type: "POST",
                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                    url: "web_get_gbt_150_2011_com_property.action",
                                                                                                    async: true,
                                                                                                    dataType: "json",
                                                                                                    data: JSON.stringify({
                                                                                                        "category": CAFBSCategoryVal,
                                                                                                        "type": CAFBSTypeVal,
                                                                                                        "std": CAFBSSTDVal,
                                                                                                        "name": CAFBSNameVal,
                                                                                                        "thk": CAFBTHKSN,
                                                                                                        "temp": CAFBDT,
                                                                                                        "highLow": 3,
                                                                                                        "isTube": 0,
                                                                                                        "od": CAFBDSO
                                                                                                    }),
                                                                                                    beforeSend: function () {
                                                                                                    },
                                                                                                    success: function (result) {

                                                                                                        CAFBSOT = parseFloat(result.ot);
                                                                                                        if (CAFBSOT < 0) {
                                                                                                            south.html("查询封头材料设计温度许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFBSO = parseFloat(result.o);
                                                                                                        if (CAFBSO < 0) {
                                                                                                            south.html("查询封头材料常温许用应力失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFBSREL = parseFloat(result.rel);
                                                                                                        if (CAFBSREL < 0) {
                                                                                                            south.html("查询封头材料常温屈服强度失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFBCS1 = parseFloat(result.c1);
                                                                                                        if (CAFBCS1 < 0) {
                                                                                                            south.html("查询封头材料厚度负偏差失败！").css("color", "red");
                                                                                                            return false;
                                                                                                        }
                                                                                                        CAFBSOT1 = parseFloat(result.ot1);

                                                                                                        // 封头腐蚀裕量
                                                                                                        if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                            && parseFloat(rows[20][columns[0][1].field]) <= (CAFBTHKSN - 4.8 - CAFBCS1)) {
                                                                                                            let CAFBCS2 = parseFloat(rows[20][columns[0][1].field]);

                                                                                                            // 封头焊接接头系数
                                                                                                            let CAFBES = parseFloat(rows[21][columns[0][1].field]);

                                                                                                            // 封头厚度附加量C
                                                                                                            let CAFBCS = CAFBCS1 + CAFBCS2;

                                                                                                            // 封头有效厚度
                                                                                                            let CAFBTHKSE = CAFBTHKSN - CAFBCS;

                                                                                                            // 封头许用应力
                                                                                                            let CAFBO15 = 1.5 * CAFBSOT;

                                                                                                            // 内压轴向拉应力
                                                                                                            let CAFBOPie = CAFBPSC * CAFBRSI / (2 * CAFBTHKSE);

                                                                                                            // 获取应力系数
                                                                                                            let CAFBK;
                                                                                                            $.ajax({
                                                                                                                type: "POST",
                                                                                                                contentType: "application/json; charset=utf-8",
                                                                                                                url: "hgt_20582_2011_table_3_2_get_k.action",
                                                                                                                async: true,
                                                                                                                dataType: "json",
                                                                                                                data: JSON.stringify({
                                                                                                                    "jacketDo": CAFBDJO,
                                                                                                                    "shellDi": CAFBDSI,
                                                                                                                    "shellThk": CAFBTHKSE,
                                                                                                                }),
                                                                                                                beforeSend: function () {
                                                                                                                },
                                                                                                                success: function (result) {
                                                                                                                    CAFBK = result;

                                                                                                                    // 夹套引起的轴向弯曲应力
                                                                                                                    let CAFBF = CAFBK * CAFBPJC;

                                                                                                                    // 计算总应力
                                                                                                                    let CAFBO = CAFBF + CAFBOPie;

                                                                                                                    // 封头限制的夹套MAWP
                                                                                                                    let m = CAFBPJC,
                                                                                                                        n = CAFBF + CAFBOPie;
                                                                                                                    for (; n <= CAFBO15; m += 0.0001) {
                                                                                                                        n = CAFBK * m + CAFBOPie;
                                                                                                                    }
                                                                                                                    let CAFBMAWPJS = m - 0.0001 - CAFBPJS;

                                                                                                                    let CAFBMAWPJ = Math.min(CAFBMAWPJJ, CAFBMAWPJS);
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "夹套MAWP：" + CAFBMAWPJ.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头许用应力：" + CAFBO15.toFixed(2) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // 封头应力校核
                                                                                                                    let CAFBOCHK;
                                                                                                                    if (CAFBO <= CAFBO15) {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:#444444;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头实际应力：" + CAFBO.toFixed(2) + " MPa" +
                                                                                                                            "</span>");
                                                                                                                        CAFBOCHK = "合格";
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        south.append(
                                                                                                                            "<span style='color:red;'>" +
                                                                                                                            "&ensp;|&ensp;" +
                                                                                                                            "封头实际应力：" + CAFBO.toFixed(2) + " MPa" +
                                                                                                                            "</span>");
                                                                                                                        CAFBOCHK = "不合格";
                                                                                                                    }

                                                                                                                    // 封头试验压力
                                                                                                                    let CAFBPST;
                                                                                                                    if (CAFBTestVal === "液压试验") {
                                                                                                                        CAFBPST = 1.25 * CAFBPSD * CAFBSO / Math.max(CAFBSOT, CAFBSOT1);
                                                                                                                    }
                                                                                                                    else if (CAFBTestVal === "气压试验") {
                                                                                                                        CAFBPST = 1.10 * CAFBPSD * CAFBSO / Math.max(CAFBSOT, CAFBSOT1);
                                                                                                                    }

                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头试验压力：" + CAFBPST.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // 封头受环向应力限制的 MAWPSS
                                                                                                                    let CAFBMAWPSS = 4 * CAFBTHKSE * CAFBSOT * CAFBES / (CAFBDSI + CAFBTHKSE) - CAFBPSS;

                                                                                                                    // 封头受夹套限制的 MAWPSJ
                                                                                                                    let i = CAFBPSC,
                                                                                                                        j = CAFBF + CAFBOPie;
                                                                                                                    for (; j <= CAFBO15; i += 0.0001) {
                                                                                                                        j = CAFBF + i * CAFBRSI / (2 * CAFBTHKSE);
                                                                                                                    }
                                                                                                                    let CAFBMAWPSJ = i - 0.0001 - CAFBPSS;
                                                                                                                    let CAFBMAWPS = Math.min(CAFBMAWPSS, CAFBMAWPSJ);
                                                                                                                    south.append(
                                                                                                                        "<span style='color:#444444;'>" +
                                                                                                                        "&ensp;|&ensp;" +
                                                                                                                        "封头MAWP：" + CAFBMAWPS.toFixed(4) + " MPa" +
                                                                                                                        "</span>");

                                                                                                                    // docx
                                                                                                                    let CAFBPayJS = $('#payjs');

                                                                                                                    function getDocx() {
                                                                                                                        $.ajax({
                                                                                                                            type: "POST",
                                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                                            url: "cafbdocx.action",
                                                                                                                            async: true,
                                                                                                                            dataType: "json",
                                                                                                                            data: JSON.stringify({
                                                                                                                                ribbonName: "CAFB",
                                                                                                                                t: CAFBDT,
                                                                                                                                psd: CAFBPSD,
                                                                                                                                pss: CAFBPSS,
                                                                                                                                sstd: CAFBSSTDVal,
                                                                                                                                sname: CAFBSNameVal,
                                                                                                                                dsi: CAFBDSI,
                                                                                                                                thksn: CAFBTHKSN,
                                                                                                                                cs2: CAFBCS2,
                                                                                                                                es: CAFBES,
                                                                                                                                pjd: CAFBPJD,
                                                                                                                                pjs: CAFBPJS,
                                                                                                                                jstd: CAFBJSTDVal,
                                                                                                                                jname: CAFBJNameVal,
                                                                                                                                djo: CAFBDJO,
                                                                                                                                thkjn: CAFBTHKJN,
                                                                                                                                cj2: CAFBCJ2,
                                                                                                                                ej: CAFBEJ,
                                                                                                                                test: CAFBTestVal,
                                                                                                                                densityj: CAFBJDensity.toFixed(4),
                                                                                                                                densitys: CAFBSDensity.toFixed(4),
                                                                                                                                ojt: CAFBJOT.toFixed(4),
                                                                                                                                ost: CAFBSOT.toFixed(4),
                                                                                                                                oj: CAFBJO.toFixed(4),
                                                                                                                                os: CAFBSO.toFixed(4),
                                                                                                                                rjrel: CAFBJREL.toFixed(4),
                                                                                                                                rsrel: CAFBSREL.toFixed(4),
                                                                                                                                ojt1: CAFBJOT1.toFixed(4),
                                                                                                                                ost1: CAFBSOT1.toFixed(4),
                                                                                                                                cj1: CAFBCJ1.toFixed(4),
                                                                                                                                cs1: CAFBCS1.toFixed(4),
                                                                                                                                psc: CAFBPSC.toFixed(4),
                                                                                                                                pjc: CAFBPJC.toFixed(4),
                                                                                                                                cj: CAFBCJ.toFixed(4),
                                                                                                                                thkje: CAFBTHKJE.toFixed(4),
                                                                                                                                rji: CAFBRJI.toFixed(4),
                                                                                                                                thkjc: CAFBTHKJC.toFixed(4),
                                                                                                                                thkjd: CAFBTHKJD.toFixed(4),
                                                                                                                                thkjchk: CAFBTHKJCHK,
                                                                                                                                cs: CAFBCS.toFixed(4),
                                                                                                                                thkse: CAFBTHKSE.toFixed(4),
                                                                                                                                rsi: CAFBRSI.toFixed(4),
                                                                                                                                opie: CAFBOPie.toFixed(4),
                                                                                                                                k: CAFBK.toFixed(4),
                                                                                                                                f: CAFBF.toFixed(4),
                                                                                                                                o: CAFBO.toFixed(4),
                                                                                                                                o15: CAFBO15.toFixed(4),
                                                                                                                                ochk: CAFBOCHK,
                                                                                                                                pjt: CAFBPJT.toFixed(4),
                                                                                                                                pst: CAFBPST.toFixed(4),
                                                                                                                                mawpjj: CAFBMAWPJJ.toFixed(4),
                                                                                                                                mawpjs: CAFBMAWPJS.toFixed(4),
                                                                                                                                mawpj: CAFBMAWPJ.toFixed(4),
                                                                                                                                mawpss: CAFBMAWPSS.toFixed(4),
                                                                                                                                mawpsj: CAFBMAWPSJ.toFixed(4),
                                                                                                                                mawps: CAFBMAWPS.toFixed(4)
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
                                                                                                                                    let query = null,
                                                                                                                                        status;
                                                                                                                                    CAFBPayJS.dialog({
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
                                                                                                                                                CAFBPayJS.dialog("close");
                                                                                                                                                CAFBPayJS.dialog("clear");
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
                                                                                                                                                            CAFBPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

                                                                                                                                                            // 倒计时计数器
                                                                                                                                                            let maxTime = 4,
                                                                                                                                                                timer;

                                                                                                                                                            function CountDown() {
                                                                                                                                                                if (maxTime >= 0) {
                                                                                                                                                                    $("#payjs_timer").html(maxTime);
                                                                                                                                                                    --maxTime;
                                                                                                                                                                } else {

                                                                                                                                                                    clearInterval(timer);
                                                                                                                                                                    // 关闭并清空收银台
                                                                                                                                                                    CAFBPayJS.dialog('close');
                                                                                                                                                                    CAFBPayJS.dialog('clear');
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
                                                                                                                        "<span style='color:red;'>&ensp;系数 K 获取失败，请检查网络后重试</span>");
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        else if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])
                                                                                                            && parseFloat(rows[20][columns[0][1].field]) > (CAFBTHKSN - 4.8 - CAFBCS1)) {
                                                                                                            south.html("封头有效厚度查表超界，请减小腐蚀裕量或增大封头厚度！").css("color", "red");
                                                                                                        }
                                                                                                    },
                                                                                                    error: function () {
                                                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                            "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) <= Math.max(CAFBSThkMin, 4.8)) {
                                                                                                south.html("封头名义厚度不能小于等于 " + Math.max(CAFBSThkMin, 4.8) + " mm").css("color", "red");
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[19][columns[0][1].field])
                                                                                                && parseFloat(rows[19][columns[0][1].field]) > Math.min(CAFBSThkMax, shellThkMaximum)) {
                                                                                                south.html("封头名义厚度不能大于 " + Math.min(CAFBSThkMax, shellThkMaximum) + " mm").css("color", "red");
                                                                                            }
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) < 762) {
                                                                                            south.html("封头内直径不能小于 762 mm").css("color", "red");
                                                                                        }
                                                                                        else if (!jQuery.isEmptyObject(rows[18][columns[0][1].field])
                                                                                            && parseFloat(rows[18][columns[0][1].field]) > 4318) {
                                                                                            south.html("封头内直径不能大于 4318 mm").css("color", "red");
                                                                                        }
                                                                                    },
                                                                                    error: function () {
                                                                                        south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                            "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= CAFBTHKJN) {
                                                                    south.html("夹套腐蚀裕量不能大于等于 " + CAFBTHKJN + " mm").css("color", "red");
                                                                }
                                                            },
                                                            error: function () {
                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                            }
                                                        });
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) <= CAFBJThkMin) {
                                                        south.html("夹套名义厚度不能小于等于 " + CAFBJThkMin + " mm").css("color", "red");
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])
                                                        && parseFloat(rows[9][columns[0][1].field]) > Math.min(CAFBDJO / 2, CAFBJThkMax)) {
                                                        south.html("夹套名义厚度不能大于 " + Math.min(CAFBDJO / 2, CAFBJThkMax) + " mm").css("color", "red");
                                                    }
                                                }
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
            }
        });
    });
});