$(document).ready(function () {

    let docx = $("#DOCX");
    let docxtext = $("#DOCXTEXT");

    let xccSketch = $("#d2");
    let xccModel = $("#d3");
    let xccd2d3 = $('#d2d3');

    $("#cal").html("<table id='xcc'></table>");
    let pg = $("#xcc");

    let south = $("#south");
    let currentTabIndex = null;
    $.getJSON("/static/west/cal/x/c/c/XCC.json", function (result) {

        let XCCDT = 20;
        let XCCDCategory, XCCDCategoryVal, XCCDType, XCCDTypeVal, XCCDSTD, XCCDSTDVal, XCCDName;
        let XCCPCategory, XCCPCategoryVal, XCCPType, XCCPTypeVal, XCCPSTD, XCCPSTDVal, XCCPName;
        let columns, rows, ed;

        function xcc2d(thkdn = "δdn", dd = "Dd", hd = "Hd", ld = "Ld", gd = "Gd", fd = "Fd",
                       a = "a", rd = "rd", thkcn = "δcn", dc = "Dc",
                       thkpn = "δpn", hp = "Hp", lp = "Lp") {

            xccSketch.empty();

            let width = xccSketch.width();
            let height = xccSketch.height();

            let svg = d3.select("#d2").append("svg")
                .attr("width", width).attr("id", "XCCSVG").attr("height", height);

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
                ])).attr("id", id).classed("sketch", true);

                svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle").append("textPath").attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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
                    .append("text").attr("x", 0)
                    .attr("y", 0).attr("dy", -5)
                    .attr("text-anchor", "middle")
                    .append("textPath")
                    .attr("xlink:href", "#" + id).attr("startOffset", "50%").text(text);

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

            let thk = 8;

            let paddingH, paddingV;
            if (width >= height) {
                paddingV = 50;
                paddingH = (width - (height - 2 * paddingV)) / 2;
            }
            else {
                paddingH = 50;
                paddingV = (height - (width - 2 * paddingH)) / 2;
            }
            let sketchWidth = width - 2 * paddingH;
            let SketchHeight = height - 2 * paddingV;

            /*
            ** 左视图
             */
            // 壳体外壁
            drawLine(paddingH, height / 2, paddingH, height - paddingV);
            // 壳体内壁
            drawLine(paddingH + thk, height / 2, paddingH + thk, height - paddingV);
            // TL
            svg.append("path").attr("d", line([
                {x: paddingH, y: height / 2},
                {x: paddingH + sketchWidth / 4, y: height / 2}
            ])).classed("sketch", true).attr("id", "XCCSketchTL");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchTL")
                .attr("startOffset", "50%").text("T.L.");
            // WL
            svg.append("path").attr("d", line([
                {x: paddingH, y: height / 2 + 20},
                {x: paddingH + sketchWidth / 4, y: height / 2 + 20}
            ])).classed("sketch", true).attr("id", "XCCSketchWL");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchWL")
                .attr("startOffset", "50%").text("W.L.");
            // 封头圆弧圆心
            let ro1 = sketchWidth / 2;
            let ri1 = ro1 - thk;
            let cx1 = paddingH + ro1;
            let cy1 = height / 2;
            // 封头外壁
            drawArc(ro1, ro1, cx1 - ro1, cy1, cx1 - ro1 / 2, cy1 - ro1 * 0.707);
            // 封头内壁
            drawArc(ri1, ri1, cx1 - ri1, cy1, cx1 - ri1 / 2, cy1 - ri1 * 0.707);
            // 垫板
            drawLine(paddingH - thk, height - paddingV - 20, paddingH, height - paddingV - 20);
            drawLine(paddingH - thk, height / 2 + 20 + 20, paddingH, height / 2 + 20 + 20);
            drawLine(paddingH - thk, height / 2 + 20 + 20, paddingH - thk, height - paddingV - 20);
            // 垫板焊缝
            drawLine(paddingH - thk, height / 2 + 20 + 20, paddingH, height / 2 + 20 + 20 - thk);
            drawLine(paddingH - thk, height - paddingV - 20, paddingH, height - paddingV - 20 + thk);
            // 吊耳板
            drawLine(paddingH - 2 * thk, height - paddingV - 20 - 20, paddingH - thk, height - paddingV - 20 - 20);
            drawLine(paddingH - 2 * thk, height / 2 + 20 + 20 + 20, paddingH - thk, height / 2 + 20 + 20 + 20);
            drawLine(paddingH - 2 * thk, paddingV, paddingH - thk, paddingV);
            drawLine(paddingH - 2 * thk, height - paddingV - 20 - 20, paddingH - 2 * thk, paddingV);
            drawLine(paddingH - thk, height / 2 + 20 + 20, paddingH - thk, paddingV);
            // 吊耳板焊缝
            drawLine(paddingH - 2 * thk, height - paddingV - 20 - 20, paddingH - thk, height - paddingV - 20 - 20 + thk);
            drawLine(paddingH - 2 * thk, height / 2 + 20 + 20 + 20, paddingH - thk, height / 2 + 20 + 20 + 20 + thk);

            // 吊耳半径
            let r2 = 60;
            // 垫板外半径
            let r3 = r2 * 4 / 5;
            // 吊孔半径
            let r4 = r3 / 2;
            // 吊孔中心线Y坐标
            let y5 = paddingV + r2;

            // 吊孔中心线
            drawCenterLine(paddingH - 2 * thk - 15, paddingV + r2, paddingH - thk + 15, paddingV + r2);

            // 垫板
            drawLine(paddingH - 2 * thk - 5, y5 + r3, paddingH - 2 * thk, y5 + r3);
            drawLine(paddingH - 2 * thk, y5 + r3, paddingH - thk + 5, y5 + r3);
            drawLine(paddingH - 2 * thk - 5, y5 - r3, paddingH - 2 * thk, y5 - r3);
            drawLine(paddingH - 2 * thk, y5 - r3, paddingH - thk + 5, y5 - r3);
            drawLine(paddingH - 2 * thk - 5, y5 + r4, paddingH - thk + 5, y5 + r4);
            drawLine(paddingH - 2 * thk - 5, y5 - r4, paddingH - thk + 5, y5 - r4);
            drawLine(paddingH - 2 * thk - 5, y5 + r3, paddingH - 2 * thk - 5, y5 - r3);
            drawLine(paddingH - thk + 5, y5 + r3, paddingH - thk + 5, y5 - r3);
            // 垫板焊缝
            drawLine(paddingH - 2 * thk - 5, y5 - r3, paddingH - 2 * thk, y5 - r3 - 5);
            drawLine(paddingH - 2 * thk - 5, y5 + r3, paddingH - 2 * thk, y5 + r3 + 5);
            drawLine(paddingH - thk, y5 - r3 - 5, paddingH - thk + 5, y5 - r3);
            drawLine(paddingH - thk, y5 + r3 + 5, paddingH - thk + 5, y5 + r3);
            // 支撑板
            //drawLine(paddingH-thk, height/2-20, paddingH+(ro1-Math.sqrt(ro1*ro1-20*20)), height/2-20);
            //drawLine(paddingH-thk, height/2-20-thk, paddingH+(ro1-Math.sqrt(ro1*ro1-(20+thk)*(20+thk))), height/2-20-thk);

            /*
            ** 右视图
             */
            let cx2 = paddingH + 3 / 4 * sketchWidth;
            let cy2 = y5;
            // 中心线
            drawCenterLine(cx2 - 60 - 10, y5, cx2 + 60 + 5, y5);
            drawCenterLine(cx2, paddingV - 10, cx2, height / 2 - 10);
            drawCenterLine(cx2, height / 2 + 15, cx2, height - paddingV - 20 + 5);
            // 载荷方向
            drawLine(cx2, cy2 - r2 - 15, cx2, cy2 - r2 - 35);
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx2, y: cy2 - r2 - 40},
                    {x: cx2 + 3, y: cy2 - r2 - 40 + 15},
                    {x: cx2 - 3, y: cy2 - r2 - 40 + 15},
                    {x: cx2, y: cy2 - r2 - 40}
                ]));
            svg.append("path").attr("d", line([
                {x: cx2 + 3, y: cy2 - r2 - 20},
                {x: cx2 + 63, y: cy2 - r2 - 20}
            ])).attr("id", "XCCSketchZX");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchZX")
                .attr("startOffset", "50%").text("载荷方向");
            // 顶部圆弧
            drawArc(r2, r2, cx2 - r2, cy2, cx2 + r2, cy2);
            drawArc(r3, r3, cx2 - r3, cy2, cx2 + r3, cy2);
            drawArc(r3, r3, cx2 + r3, cy2, cx2 - r3, cy2);
            drawArc(r4, r4, cx2 - r4, cy2, cx2 + r4, cy2);
            drawArc(r4, r4, cx2 + r4, cy2, cx2 - r4, cy2);
            // 吊耳板轮廓
            drawLine(cx2 - r2, cy2, cx2 - r2, height - paddingV - 20 - 20 - 12);
            drawLine(cx2 + r2, cy2, cx2 + r2, height - paddingV - 20 - 20 - 12);
            drawLine(cx2 - r2 + 12, height - paddingV - 20 - 20, cx2 - r2 + 40 - 12, height - paddingV - 20 - 20);
            drawLine(cx2 + r2 - 12, height - paddingV - 20 - 20, cx2 + r2 - 40 + 12, height - paddingV - 20 - 20);
            drawLine(cx2 - r2 + 40, height / 2 + 20 + 20 + 20 + 20, cx2 - r2 + 40, height - paddingV - 20 - 20 - 12);
            drawLine(cx2 + r2 - 40, height / 2 + 20 + 20 + 20 + 20, cx2 + r2 - 40, height - paddingV - 20 - 20 - 12);
            drawArc(20, 20, cx2 - r2 + 40, height / 2 + 20 + 20 + 20 + 20, cx2 + r2 - 40, height / 2 + 20 + 20 + 20 + 20);
            drawCenterLine(cx2 - 20 - 12, height / 2 + 20 + 20 + 20 + 20, cx2 + 20 + 12, height / 2 + 20 + 20 + 20 + 20);
            // 吊耳板下方圆角
            drawArc(12, 12, cx2 - r2 + 12, height - paddingV - 20 - 20, cx2 - r2, height - paddingV - 20 - 20 - 12);
            drawArc(12, 12, cx2 - r2 + 40, height - paddingV - 20 - 20 - 12, cx2 - r2 + 40 - 12, height - paddingV - 20 - 20);
            drawArc(12, 12, cx2 + r2 - 40 + 12, height - paddingV - 20 - 20, cx2 + r2 - 40, height - paddingV - 20 - 20 - 12);
            drawArc(12, 12, cx2 + r2, height - paddingV - 20 - 20 - 12, cx2 + r2 - 12, height - paddingV - 20 - 20);
            // 垫板
            drawLine(cx2 - r2 - 30 + 12, height / 2 + 20 + 20, cx2 - r2, height / 2 + 20 + 20);
            drawLine(cx2 + r2, height / 2 + 20 + 20, cx2 + r2 + 30 - 12, height / 2 + 20 + 20);
            drawLine(cx2 - r2 - 30, height / 2 + 20 + 20 + 12, cx2 - r2 - 30, height - paddingV - 20 - 12);
            drawLine(cx2 + r2 + 30, height / 2 + 20 + 20 + 12, cx2 + r2 + 30, height - paddingV - 20 - 12);
            drawLine(cx2 - r2 - 30 + 12, height - paddingV - 20, cx2 + r2 + 30 - 12, height - paddingV - 20);
            // 垫板四个圆角
            drawArc(12, 12, cx2 - r2 - 30, height / 2 + 20 + 20 + 12, cx2 - r2 - 30 + 12, height / 2 + 20 + 20);
            drawArc(12, 12, cx2 + r2 + 30 - 12, height / 2 + 20 + 20, cx2 + r2 + 30, height / 2 + 20 + 20 + 12);
            drawArc(12, 12, cx2 - r2 - 30 + 12, height - paddingV - 20, cx2 - r2 - 30, height - paddingV - 20 - 12);
            drawArc(12, 12, cx2 + r2 + 30, height - paddingV - 20 - 12, cx2 + r2 + 30 - 12, height - paddingV - 20);

            // HD
            dimBottomH(cx2 - r2, height / 2 - 20, cx2 + r2, height / 2 - 20, hd, "XCCSketchHD");

            // Lp
            dimRightV(cx2 + r2 + 30 - 6, height - paddingV - 20, cx2 + r2 + 30 - 6, height / 2 + 20 + 20, lp, "XCCSketchLP");

            // HP
            dimBottomH(cx2 - r2 - 30, height - paddingV - 20 - 6, cx2 + r2 + 30, height - paddingV - 20 - 6, hp, "XCCSketchHP");

            // FD
            dimTopH(cx2 - r2 + 40, height / 2 + 20 + 20 + 20 + 20 - 6, cx2 + r2 - 40, height / 2 + 20 + 20 + 20 + 20 - 6, fd, "XCCSketchFD");

            // DC
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx2 + r3, y: cy2},
                    {x: cx2 + r3 + 15, y: cy2 - 3},
                    {x: cx2 + r3 + 15, y: cy2 + 3},
                    {x: cx2 + r3, y: cy2}
                ])).attr("transform", "rotate(" + -45 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2, y: cy2},
                    {x: cx2 + r3 + 15 + r2 / 4, y: cy2}
                ])).attr("transform", "rotate(" + -45 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 + 0.707 * (r3 + 15 + r2 / 4), y: cy2 - 0.707 * (r3 + 15 + r2 / 4)},
                    {x: cx2 + 0.707 * (r3 + 15 + r2 / 4) + 40, y: cy2 - 0.707 * (r3 + 15 + r2 / 4)}
                ])).classed("sketch", true).attr("id", "XCCSketchDC");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchDC")
                .attr("startOffset", "50%").text(dc);

            // DD
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx2 + r4, y: cy2},
                    {x: cx2 + r4 + 15, y: cy2 - 3},
                    {x: cx2 + r4 + 15, y: cy2 + 3},
                    {x: cx2 + r4, y: cy2}
                ])).attr("transform", "rotate(" + -135 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2, y: cy2},
                    {x: cx2 + r3 + 15 + r2 / 4, y: cy2}
                ])).attr("transform", "rotate(" + -135 + ", " + cx2 + " " + cy2 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - 0.707 * (r3 + 15 + r2 / 4) - 40, y: cy2 - 0.707 * (r3 + 15 + r2 / 4)},
                    {x: cx2 - 0.707 * (r3 + 15 + r2 / 4), y: cy2 - 0.707 * (r3 + 15 + r2 / 4)}
                ])).classed("sketch", true).attr("id", "XCCSketchDD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchDD")
                .attr("startOffset", "50%").text(dd);

            // B-B 截面
            svg.append("path")
                .attr("d", line([
                    {x: cx2 - 10, y: cy2 - r2},
                    {x: cx2, y: cy2 - r2}
                ])).attr("id", "XCCSketchB1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchB1")
                .attr("startOffset", "50%").text("B");
            svg.append("path")
                .attr("d", line([
                    {x: cx2 - 10, y: cy2 - 5},
                    {x: cx2, y: cy2 - 5}
                ])).attr("id", "XCCSketchB2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchB2")
                .attr("startOffset", "50%").text("B");

            // LD
            dimLeftV(cx2 - r2 - 30, height - paddingV - 20 - 20, cx2 - r2 - 30, height / 2 + 20 + 20 + 20 + 20, ld, "XCCSketchLD");
            drawLine(cx2 - r2 - 33, height - paddingV - 20 - 20, cx2 - r2, height - paddingV - 20 - 20);
            drawLine(cx2 - r2 - 33, height / 2 + 20 + 20 + 20 + 20, cx2 - r2 + 40 - 18, height / 2 + 20 + 20 + 20 + 20);

            // GD
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - r2 - 30 - 30, y: height - paddingV - 20 - 20},
                    {x: cx2 - r2 - 30 - 30, y: height - paddingV - 20 + 15 + 40}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx2 - r2 - 30 - 40, y: height - paddingV - 20},
                    {x: cx2 - r2 - 30 + 6, y: height - paddingV - 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx2 - r2 - 30 - 30, y: height - paddingV - 20},
                    {x: cx2 - r2 - 30 - 30 + 3, y: height - paddingV - 20 + 15},
                    {x: cx2 - r2 - 30 - 30 - 3, y: height - paddingV - 20 + 15},
                    {x: cx2 - r2 - 30 - 30, y: height - paddingV - 20}
                ]));
            svg.append("path").attr("d", line([
                {x: cx2 - r2 - 30 - 30, y: height - paddingV - 20 + 15 + 30},
                {x: cx2 - r2 - 30 - 30, y: height - paddingV - 20 + 15}
            ])).attr("id", "XCCSketchGD").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#XCCSketchGD").attr("startOffset", "50%").text(gd);

            // 吊耳板圆角
            let cx3 = cx2 + r2 - 40;
            let cy3 = height - paddingV - 20 - 20;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx3 + 0.293 * 12, y: cy3},
                    {x: cx3 + 0.293 * 12 + 15, y: cy3 - 3},
                    {x: cx3 + 0.293 * 12 + 15, y: cy3 + 3},
                    {x: cx3 + 0.293 * 12, y: cy3}
                ])).attr("transform", "rotate(" + -45 + ", " + cx3 + " " + cy3 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx3 + 0.293 * 12, y: cy3},
                    {x: cx3 + 0.293 * 12 + 2 * 12, y: cy3}
                ])).attr("transform", "rotate(" + -45 + ", " + cx3 + " " + cy3 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx3 + 0.293 * 12 * 0.707 + 0.707 * 2 * 12, y: cy3 - 0.293 * 12 * 0.707 - 0.707 * 2 * 12},
                    {x: cx3 + 0.293 * 12 * 0.707 + 0.707 * 2 * 12 + 30, y: cy3 - 0.293 * 12 * 0.707 - 0.707 * 2 * 12}
                ])).classed("sketch", true).attr("id", "XCCSketchRD");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchRD")
                .attr("startOffset", "50%").text(rd);

            // 垫板圆角
            let cx4 = cx2 - r2 - 30 + 12;
            let cy4 = height / 2 + 20 + 20 + 12;
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: cx4 + 12, y: cy4},
                    {x: cx4 + 12 + 15, y: cy4 - 3},
                    {x: cx4 + 12 + 15, y: cy4 + 3},
                    {x: cx4 + 12, y: cy4}
                ])).attr("transform", "rotate(" + -135 + ", " + cx4 + " " + cy4 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx4, y: cy4},
                    {x: cx4 + 12 + 15 + 12, y: cy4}
                ])).attr("transform", "rotate(" + -135 + ", " + cx4 + " " + cy4 + ")");
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: cx4 - 0.707 * (12 + 15 + 12), y: cy4 - 0.707 * (12 + 15 + 12)},
                    {x: cx4 - 0.707 * (12 + 15 + 12) + 40, y: cy4 - 0.707 * (12 + 15 + 12)}
                ])).classed("sketch", true).attr("id", "XCCSketchR20");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchR20")
                .attr("startOffset", "50%").text("R20");

            // THKPN
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - thk - 15 - 40, y: height - paddingV + 25},
                    {x: paddingH + 15 + 10, y: height - paddingV + 25}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - thk, y: height - paddingV - 20 + 3},
                    {x: paddingH - thk, y: height - paddingV + 35}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH, y: height - paddingV + 3},
                    {x: paddingH, y: height - paddingV + 35}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH - thk, y: height - paddingV + 25},
                    {x: paddingH - thk - 15, y: height - paddingV + 25 + 3},
                    {x: paddingH - thk - 15, y: height - paddingV + 25 - 3},
                    {x: paddingH - thk, y: height - paddingV + 25}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH, y: height - paddingV + 25},
                    {x: paddingH + 15, y: height - paddingV + 25 + 3},
                    {x: paddingH + 15, y: height - paddingV + 25 - 3},
                    {x: paddingH, y: height - paddingV + 25}
                ]));
            svg.append("path").attr("d", line([
                {x: paddingH - thk - 15 - 40, y: height - paddingV + 25},
                {x: paddingH - thk - 15, y: height - paddingV + 25}
            ])).attr("id", "XCCSketchTHKPN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#XCCSketchTHKPN").attr("startOffset", "50%").text(thkpn);

            // 垫板角焊缝
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH + 3, y: height - paddingV - 20},
                    {x: paddingH + 40, y: height - paddingV - 20}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH + 30, y: height - paddingV - 20},
                    {x: paddingH + 30, y: height - paddingV - 20 + thk + 15 + 10}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH + 3, y: height - paddingV - 20 + thk},
                    {x: paddingH + 40, y: height - paddingV - 20 + thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH + 30, y: height - paddingV - 20},
                    {x: paddingH + 30 + 3, y: height - paddingV - 20 - 15},
                    {x: paddingH + 30 - 3, y: height - paddingV - 20 - 15},
                    {x: paddingH + 30, y: height - paddingV - 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH + 30, y: height - paddingV - 20 + thk},
                    {x: paddingH + 30 + 3, y: height - paddingV - 20 + thk + 15},
                    {x: paddingH + 30 - 3, y: height - paddingV - 20 + thk + 15},
                    {x: paddingH + 30, y: height - paddingV - 20 + thk}
                ]));
            svg.append("path").attr("d", line([
                {x: paddingH + 30, y: height - paddingV - 20 - 15},
                {x: paddingH + 30, y: height - paddingV - 20 - 15 - 50}
            ])).attr("id", "XCCSketch08THKPN").classed("sketch", true);
            let XCC08THKPN;
            if (thkpn === "δpn") {
                XCC08THKPN = "≥0.8δpn";
            }
            else {
                XCC08THKPN = "≥" + 0.8 * thkpn;
            }
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketch08THKPN")
                .attr("startOffset", "50%").text(XCC08THKPN);

            // a
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - thk - thk - 3, y: height - paddingV - 20 - 20},
                    {x: paddingH - thk - thk - 40, y: height - paddingV - 20 - 20}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - thk - 3, y: height - paddingV - 20 - 20 + thk},
                    {x: paddingH - thk - thk - 40, y: height - paddingV - 20 - 20 + thk}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - thk - thk - 30, y: height - paddingV - 20 - 20},
                    {x: paddingH - thk - thk - 30, y: height - paddingV - 20 - 20 + thk + 15 + 10}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH - thk - thk - 30, y: height - paddingV - 20 - 20 + thk},
                    {x: paddingH - thk - thk - 30 + 3, y: height - paddingV - 20 - 20 + thk + 15},
                    {x: paddingH - thk - thk - 30 - 3, y: height - paddingV - 20 - 20 + thk + 15},
                    {x: paddingH - thk - thk - 30, y: height - paddingV - 20 - 20 + thk}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH - thk - thk - 30, y: height - paddingV - 20 - 20},
                    {x: paddingH - thk - thk - 30 + 3, y: height - paddingV - 20 - 20 - 15},
                    {x: paddingH - thk - thk - 30 - 3, y: height - paddingV - 20 - 20 - 15},
                    {x: paddingH - thk - thk - 30, y: height - paddingV - 20 - 20}
                ]));
            svg.append("path").attr("d", line([
                {x: paddingH - thk - thk - 30, y: height - paddingV - 20 - 20 - 15},
                {x: paddingH - thk - thk - 30, y: height - paddingV - 20 - 20 - 15 - 25}
            ])).attr("id", "XCCSketchA").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchA")
                .attr("startOffset", "50%").text(a);

            // THKDN
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - 2 * thk, y: height / 2 + 80},
                    {x: paddingH - thk + 15 + 10, y: height / 2 + 80}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH - 2 * thk, y: height / 2 + 80},
                    {x: paddingH - 2 * thk - 15, y: height / 2 + 80 + 3},
                    {x: paddingH - 2 * thk - 15, y: height / 2 + 80 - 3},
                    {x: paddingH - 2 * thk, y: height / 2 + 80}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH - thk, y: height / 2 + 80},
                    {x: paddingH - thk + 15, y: height / 2 + 80 + 3},
                    {x: paddingH - thk + 15, y: height / 2 + 80 - 3},
                    {x: paddingH - thk, y: height / 2 + 80}
                ]));
            svg.append("path").attr("d", line([
                {x: paddingH - 2 * thk - 15 - 40, y: height / 2 + 80},
                {x: paddingH - 2 * thk - 15, y: height / 2 + 80}
            ])).attr("id", "XCCSketchTHKDN").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#XCCSketchTHKDN").attr("startOffset", "50%").text(thkdn);

            // 100
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - 2 * thk - 40, y: height / 2 + 20},
                    {x: paddingH - 2 * thk - 3, y: height / 2 + 20}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - 2 * thk - 40, y: height / 2 + 20 + 20},
                    {x: paddingH - thk - 3, y: height / 2 + 20 + 20}
                ]));
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - 2 * thk - 30, y: height / 2 + 20},
                    {x: paddingH - 2 * thk - 30, y: height / 2 + 20 + 20 + 15 + 10}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH - 2 * thk - 30, y: height / 2 + 20},
                    {x: paddingH - 2 * thk - 30 + 3, y: height / 2 + 20 - 15},
                    {x: paddingH - 2 * thk - 30 - 3, y: height / 2 + 20 - 15},
                    {x: paddingH - 2 * thk - 30, y: height / 2 + 20}
                ]));
            svg.append("path").classed("arrow sketch", true)
                .attr("d", line([
                    {x: paddingH - 2 * thk - 30, y: height / 2 + 40},
                    {x: paddingH - 2 * thk - 30 + 3, y: height / 2 + 40 + 15},
                    {x: paddingH - 2 * thk - 30 - 3, y: height / 2 + 40 + 15},
                    {x: paddingH - 2 * thk - 30, y: height / 2 + 40}
                ]));
            svg.append("path").attr("d", line([
                {x: paddingH - 2 * thk - 30, y: height / 2 + 20 - 15},
                {x: paddingH - 2 * thk - 30, y: height / 2 + 20 - 15 - 30}
            ])).attr("id", "XCCSketch100").classed("sketch", true);
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5)
                .attr("text-anchor", "middle").append("textPath")
                .attr("xlink:href", "#XCCSketch100").attr("startOffset", "50%").text("100");

            // A-A 截面
            svg.append("path")
                .attr("d", line([
                    {x: paddingH - 2 * thk - 15 - 10, y: cy2},
                    {x: paddingH - 2 * thk - 15, y: cy2}
                ])).attr("id", "XCCSketchA1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchA1")
                .attr("startOffset", "50%").text("A");
            svg.append("path")
                .attr("d", line([
                    {x: paddingH - thk + 15, y: cy2},
                    {x: paddingH - thk + 15 + 10, y: cy2}
                ])).attr("id", "XCCSketchA2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchA2")
                .attr("startOffset", "50%").text("A");

            // THKCN
            drawLine(paddingH - 2 * thk - 5, paddingV + r2 - r3 - 3, paddingH - 2 * thk - 5, paddingV - 30);
            drawLine(paddingH - 2 * thk, paddingV - 3, paddingH - 2 * thk, paddingV - 30);
            drawLine(paddingH - thk, paddingV - 3, paddingH - thk, paddingV - 30);
            drawLine(paddingH - thk + 5, paddingV + r2 - r3 - 3, paddingH - thk + 5, paddingV - 30);
            drawLine(paddingH - 2 * thk - 5, paddingV - 20, paddingH - thk + 5, paddingV - 20);
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - 2 * thk - 5 - 40, y: paddingV - 20},
                    {x: paddingH - 2 * thk - 5, y: paddingV - 20}
                ])).attr("id", "XCCSketchTHKCN1");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchTHKCN1")
                .attr("startOffset", "50%").text(thkcn);
            svg.append("path").classed("sketch", true)
                .attr("d", line([
                    {x: paddingH - thk + 5, y: paddingV - 20},
                    {x: paddingH - thk + 5 + 40, y: paddingV - 20}
                ])).attr("id", "XCCSketchTHKCN2");
            svg.append("g").append("text").attr("x", 0).attr("y", 0).attr("dy", -5).attr("text-anchor", "middle")
                .append("textPath").attr("xlink:href", "#XCCSketchTHKCN2")
                .attr("startOffset", "50%").text(thkcn);

        }

        currentTabIndex = xccd2d3.tabs('getTabIndex', xccd2d3.tabs('getSelected'));

        // Sketch
        if (currentTabIndex === 0) {
            xcc2d();
            $("#d2").off("resize").on("resize", function () {
                if ($("#xcc").length > 0) {
                    xcc2d();
                }
            });
        }
        xccd2d3.tabs({
            onSelect: function (title, index) {
                if (index === 0) {
                    xcc2d();
                    $("#d2").off("resize").on("resize", function () {
                        if ($("#xcc").length > 0) {
                            xcc2d();
                        }
                    });
                }
            }
        });

        let lastIndex;
        pg.propertygrid({
            title: "HG/T 21574-2008 立式侧壁板式吊耳(SP)计算",
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
                if (index === 1) {
                    $(ed.target).combobox("loadData", XCCDCategory);
                }
                else if (index === 2) {
                    $(ed.target).combobox("loadData", XCCDType);
                }
                else if (index === 3) {
                    $(ed.target).combobox("loadData", XCCDSTD);
                }
                else if (index === 4) {
                    $(ed.target).combobox("loadData", XCCDName);
                }
                else if (index === 17) {
                    $(ed.target).combobox("loadData", XCCPCategory);
                }
                else if (index === 18) {
                    $(ed.target).combobox("loadData", XCCPType);
                }
                else if (index === 19) {
                    $(ed.target).combobox("loadData", XCCPSTD);
                }
                else if (index === 20) {
                    $(ed.target).combobox("loadData", XCCPName);
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
                    xccSketch.empty();

                    // model
                    xccModel.empty();

                    // sketch
                    currentTabIndex = xccd2d3.tabs('getTabIndex', xccd2d3.tabs('getSelected'));

                    // Sketch
                    if (currentTabIndex === 0) {
                        xcc2d();
                        xccSketch.off("resize").on("resize", function () {
                            if ($("#xcc").length > 0) {
                                xcc2d();
                            }
                        });
                    }
                    xccd2d3.tabs({
                        onSelect: function (title, index) {
                            if (index === 0) {
                                xcc2d();
                                xccSketch.off("resize").on("resize", function () {
                                    if ($("#xcc").length > 0) {
                                        xcc2d();
                                    }
                                });
                            }
                        }
                    });

                    // alert
                    south.empty();

                    columns = pg.propertygrid("options").columns;
                    rows = pg.propertygrid("getRows");

                    if (index === 1) {

                        XCCDCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[2][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 2);
                        XCCDType = null;
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCCDSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCCDName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCCDCategoryVal,
                                temp: XCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCCDType = [];
                                $(result).each(function (index, element) {
                                    XCCDType[index] = {
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
                    else if (index === 2) {

                        XCCDTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[3][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 3);
                        XCCDSTD = null;
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCCDName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCCDCategoryVal,
                                type: XCCDTypeVal,
                                temp: XCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCCDSTD = [];
                                $(result).each(function (index, element) {
                                    XCCDSTD[index] = {
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
                    else if (index === 3) {

                        XCCDSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[4][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 4);
                        XCCDName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCCDCategoryVal,
                                type: XCCDTypeVal,
                                std: XCCDSTDVal,
                                temp: XCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCCDName = [];
                                $(result).each(function (index, element) {
                                    XCCDName[index] = {
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
                    else if (index === 17) {

                        XCCPCategoryVal = changes.value;

                        // 将下游级联菜单 type、std、name 清空
                        rows[18][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 18);
                        XCCPType = null;
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XCCPSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XCCPName = null;

                        // 获取 type 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_type.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCCPCategoryVal,
                                temp: XCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCCPType = [];
                                $(result).each(function (index, element) {
                                    XCCPType[index] = {
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
                    else if (index === 18) {

                        XCCPTypeVal = changes.value;

                        // 将下游级联菜单 std、name 清空
                        rows[19][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 19);
                        XCCPSTD = null;
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XCCPName = null;

                        // 获取 std 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_std.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCCPCategoryVal,
                                type: XCCPTypeVal,
                                temp: XCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCCPSTD = [];
                                $(result).each(function (index, element) {
                                    XCCPSTD[index] = {
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
                    else if (index === 19) {

                        XCCPSTDVal = changes.value;

                        // 将下游级联菜单name清空
                        rows[20][columns[0][1].field] = null;
                        pg.datagrid('refreshRow', 20);
                        XCCPName = null;

                        // 获取 name 列表
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: "web_list_gbt_150_2011_name.action",
                            async: false,
                            dataType: "json",
                            data: JSON.stringify({
                                category: XCCPCategoryVal,
                                type: XCCPTypeVal,
                                std: XCCPSTDVal,
                                temp: XCCDT
                            }),
                            beforeSend: function () {
                            },
                            success: function (result) {
                                XCCPName = [];
                                $(result).each(function (index, element) {
                                    XCCPName[index] = {
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

                        // 吊耳板材料名称
                        if (!jQuery.isEmptyObject(rows[4][columns[0][1].field])) {
                            let XCCDNameVal = rows[4][columns[0][1].field];

                            // AJAX 获取材料密度、最大最小厚度
                            let XCCDDensity, XCCDThkMin, XCCDThkMax;
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: "web_get_gbt_150_2011_index.action",
                                async: true,
                                dataType: "json",
                                data: JSON.stringify({
                                    "category": XCCDCategoryVal,
                                    "type": XCCDTypeVal,
                                    "std": XCCDSTDVal,
                                    "name": XCCDNameVal,
                                    "temp": XCCDT
                                }),
                                beforeSend: function () {
                                },
                                success: function (result) {

                                    XCCDDensity = parseFloat(result.density);
                                    XCCDThkMin = parseFloat(result.thkMin);
                                    XCCDThkMax = parseFloat(result.thkMax);

                                    if (XCCDNameVal === "Q235B" || XCCDNameVal === "Q235C") {
                                        XCCDThkMax = 200;
                                    }

                                    // 名义厚度
                                    if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) > XCCDThkMin
                                        && parseFloat(rows[5][columns[0][1].field]) <= XCCDThkMax) {
                                        let XCCTHKDN = parseFloat(rows[5][columns[0][1].field]);

                                        // Sketch
                                        if (currentTabIndex === 0) {
                                            xcc2d(XCCTHKDN);
                                            xccSketch.off("resize").on("resize", function () {
                                                if ($("#xcc").length > 0) {
                                                    xcc2d(XCCTHKDN);
                                                }
                                            });
                                        }
                                        xccd2d3.tabs({
                                            onSelect: function (title, index) {
                                                if (index === 0) {
                                                    xcc2d(XCCTHKDN);
                                                    xccSketch.off("resize").on("resize", function () {
                                                        if ($("#xcc").length > 0) {
                                                            xcc2d(XCCTHKDN);
                                                        }
                                                    });
                                                }
                                            }
                                        });

                                        // ajax 获取常温屈服强度、厚度负偏差
                                        let XCCDTestRel, XCCCD1;
                                        $.ajax({
                                            type: "POST",
                                            contentType: "application/json; charset=utf-8",
                                            url: "web_get_gbt_150_2011_com_property.action",
                                            async: true,
                                            dataType: "json",
                                            data: JSON.stringify({
                                                "category": XCCDCategoryVal,
                                                "type": XCCDTypeVal,
                                                "std": XCCDSTDVal,
                                                "name": XCCDNameVal,
                                                "thk": XCCTHKDN,
                                                "temp": XCCDT,
                                                "highLow": 3,
                                                "isTube": 0,
                                                "od": 100000
                                            }),
                                            beforeSend: function () {
                                            },
                                            success: function (result) {

                                                XCCDTestRel = parseFloat(result.testRel);
                                                XCCCD1 = parseFloat(result.c1);

                                                XCCDTestRel = parseFloat(result.rel);
                                                if (XCCDTestRel < 0) {
                                                    south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                    return false;
                                                }
                                                XCCCD1 = parseFloat(result.c1);
                                                if (XCCCD1 < 0) {
                                                    south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                    return false;
                                                }

                                                // 吊孔直径 Dd
                                                if (!jQuery.isEmptyObject(rows[6][columns[0][1].field])) {
                                                    let XCCDD = parseFloat(rows[6][columns[0][1].field]);

                                                    // Sketch
                                                    if (currentTabIndex === 0) {
                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD);
                                                        xccSketch.off("resize").on("resize", function () {
                                                            if ($("#xcc").length > 0) {
                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD);
                                                            }
                                                        });
                                                    }
                                                    xccd2d3.tabs({
                                                        onSelect: function (title, index) {
                                                            if (index === 0) {
                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD);
                                                                xccSketch.off("resize").on("resize", function () {
                                                                    if ($("#xcc").length > 0) {
                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });

                                                    // 宽度 Hd
                                                    if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                        && parseFloat(rows[7][columns[0][1].field]) > XCCDD) {
                                                        let XCCHD = parseFloat(rows[7][columns[0][1].field]);

                                                        // Sketch
                                                        if (currentTabIndex === 0) {
                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD);
                                                            xccSketch.off("resize").on("resize", function () {
                                                                if ($("#xcc").length > 0) {
                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD);
                                                                }
                                                            });
                                                        }
                                                        xccd2d3.tabs({
                                                            onSelect: function (title, index) {
                                                                if (index === 0) {
                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD);
                                                                    xccSketch.off("resize").on("resize", function () {
                                                                        if ($("#xcc").length > 0) {
                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD);
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });

                                                        // Ld
                                                        if (!jQuery.isEmptyObject(rows[8][columns[0][1].field])) {
                                                            let XCCLD = parseFloat(rows[8][columns[0][1].field]);

                                                            // Sketch
                                                            if (currentTabIndex === 0) {
                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD);
                                                                xccSketch.off("resize").on("resize", function () {
                                                                    if ($("#xcc").length > 0) {
                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD);
                                                                    }
                                                                });
                                                            }
                                                            xccd2d3.tabs({
                                                                onSelect: function (title, index) {
                                                                    if (index === 0) {
                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD);
                                                                        xccSketch.off("resize").on("resize", function () {
                                                                            if ($("#xcc").length > 0) {
                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD);
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });

                                                            // 尺寸 Gd
                                                            if (!jQuery.isEmptyObject(rows[9][columns[0][1].field])) {
                                                                let XCCGD = parseFloat(rows[9][columns[0][1].field]);

                                                                // Sketch
                                                                if (currentTabIndex === 0) {
                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD);
                                                                    xccSketch.off("resize").on("resize", function () {
                                                                        if ($("#xcc").length > 0) {
                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD);
                                                                        }
                                                                    });
                                                                }
                                                                xccd2d3.tabs({
                                                                    onSelect: function (title, index) {
                                                                        if (index === 0) {
                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD);
                                                                            xccSketch.off("resize").on("resize", function () {
                                                                                if ($("#xcc").length > 0) {
                                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD);
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });

                                                                // 尺寸 Fd
                                                                if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) < XCCHD) {
                                                                    let XCCFD = parseFloat(rows[10][columns[0][1].field]);

                                                                    // Sketch
                                                                    if (currentTabIndex === 0) {
                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD);
                                                                        xccSketch.off("resize").on("resize", function () {
                                                                            if ($("#xcc").length > 0) {
                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD);
                                                                            }
                                                                        });
                                                                    }
                                                                    xccd2d3.tabs({
                                                                        onSelect: function (title, index) {
                                                                            if (index === 0) {
                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD);
                                                                                xccSketch.off("resize").on("resize", function () {
                                                                                    if ($("#xcc").length > 0) {
                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD);
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });

                                                                    // 尺寸 A
                                                                    if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                        && parseFloat(rows[11][columns[0][1].field]) <= Math.min(XCCTHKDN, XCCGD, XCCFD / 2)) {
                                                                        let XCCA = parseFloat(rows[11][columns[0][1].field]);

                                                                        // Sketch
                                                                        if (currentTabIndex === 0) {
                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA);
                                                                            xccSketch.off("resize").on("resize", function () {
                                                                                if ($("#xcc").length > 0) {
                                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA);
                                                                                }
                                                                            });
                                                                        }
                                                                        xccd2d3.tabs({
                                                                            onSelect: function (title, index) {
                                                                                if (index === 0) {
                                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA);
                                                                                    xccSketch.off("resize").on("resize", function () {
                                                                                        if ($("#xcc").length > 0) {
                                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA);
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                        });

                                                                        // 尺寸 rd
                                                                        if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) <= Math.min((XCCHD - XCCFD) / 4, XCCLD)) {
                                                                            let XCCRD = parseFloat(rows[12][columns[0][1].field]);

                                                                            // Sketch
                                                                            if (currentTabIndex === 0) {
                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD);
                                                                                xccSketch.off("resize").on("resize", function () {
                                                                                    if ($("#xcc").length > 0) {
                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD);
                                                                                    }
                                                                                });
                                                                            }
                                                                            xccd2d3.tabs({
                                                                                onSelect: function (title, index) {
                                                                                    if (index === 0) {
                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD);
                                                                                        xccSketch.off("resize").on("resize", function () {
                                                                                            if ($("#xcc").length > 0) {
                                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                }
                                                                            });

                                                                            // 腐蚀裕量 cd2
                                                                            if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                                && parseFloat(rows[13][columns[0][1].field]) < XCCTHKDN) {
                                                                                let XCCCD2 = parseFloat(rows[13][columns[0][1].field]);

                                                                                // 衬板名义厚度 THKCN
                                                                                if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                                                    && parseFloat(rows[14][columns[0][1].field]) > XCCDThkMin
                                                                                    && parseFloat(rows[14][columns[0][1].field]) <= XCCDThkMax) {
                                                                                    let XCCTHKCN = parseFloat(rows[14][columns[0][1].field]);

                                                                                    // Sketch
                                                                                    if (currentTabIndex === 0) {
                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN);
                                                                                        xccSketch.off("resize").on("resize", function () {
                                                                                            if ($("#xcc").length > 0) {
                                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN);
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                    xccd2d3.tabs({
                                                                                        onSelect: function (title, index) {
                                                                                            if (index === 0) {
                                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN);
                                                                                                xccSketch.off("resize").on("resize", function () {
                                                                                                    if ($("#xcc").length > 0) {
                                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN);
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                    });

                                                                                    // ajax 获取 常温屈服强度、厚度负偏差
                                                                                    let XCCCTestRel, XCCCC1;
                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        contentType: "application/json; charset=utf-8",
                                                                                        url: "web_get_gbt_150_2011_com_property.action",
                                                                                        async: true,
                                                                                        dataType: "json",
                                                                                        data: JSON.stringify({
                                                                                            "category": XCCDCategoryVal,
                                                                                            "type": XCCDTypeVal,
                                                                                            "std": XCCDSTDVal,
                                                                                            "name": XCCDNameVal,
                                                                                            "thk": XCCTHKCN,
                                                                                            "temp": XCCDT,
                                                                                            "highLow": 3,
                                                                                            "isTube": 0,
                                                                                            "od": 100000
                                                                                        }),
                                                                                        beforeSend: function () {
                                                                                        },
                                                                                        success: function (result) {

                                                                                            XCCCTestRel = parseFloat(result.rel);
                                                                                            if (XCCCTestRel < 0) {
                                                                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                return false;
                                                                                            }
                                                                                            XCCCC1 = parseFloat(result.c1);
                                                                                            if (XCCCC1 < 0) {
                                                                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                return false;
                                                                                            }

                                                                                            // 衬板外直径 DC
                                                                                            if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                                                                && parseFloat(rows[15][columns[0][1].field]) > XCCDD
                                                                                                && parseFloat(rows[15][columns[0][1].field]) <= XCCHD) {
                                                                                                let XCCDC = parseFloat(rows[15][columns[0][1].field]);

                                                                                                // Sketch
                                                                                                if (currentTabIndex === 0) {
                                                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC);
                                                                                                    xccSketch.off("resize").on("resize", function () {
                                                                                                        if ($("#xcc").length > 0) {
                                                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC);
                                                                                                        }
                                                                                                    });
                                                                                                }
                                                                                                xccd2d3.tabs({
                                                                                                    onSelect: function (title, index) {
                                                                                                        if (index === 0) {
                                                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC);
                                                                                                            xccSketch.off("resize").on("resize", function () {
                                                                                                                if ($("#xcc").length > 0) {
                                                                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC);
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                    }
                                                                                                });

                                                                                                // 腐蚀裕量 cc2
                                                                                                if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                                    && parseFloat(rows[16][columns[0][1].field]) < XCCTHKCN) {
                                                                                                    let XCCCC2 = parseFloat(rows[16][columns[0][1].field]);

                                                                                                    // 垫板材料名称
                                                                                                    if (!jQuery.isEmptyObject(rows[20][columns[0][1].field])) {
                                                                                                        let XCCPNameVal = rows[20][columns[0][1].field];

                                                                                                        // AJAX 获取材料密度、最大最小厚度
                                                                                                        let XCCPDensity,
                                                                                                            XCCPThkMin,
                                                                                                            XCCPThkMax;
                                                                                                        $.ajax({
                                                                                                            type: "POST",
                                                                                                            contentType: "application/json; charset=utf-8",
                                                                                                            url: "web_get_gbt_150_2011_index.action",
                                                                                                            async: true,
                                                                                                            dataType: "json",
                                                                                                            data: JSON.stringify({
                                                                                                                "category": XCCPCategoryVal,
                                                                                                                "type": XCCPTypeVal,
                                                                                                                "std": XCCPSTDVal,
                                                                                                                "name": XCCPNameVal,
                                                                                                                "temp": XCCDT
                                                                                                            }),
                                                                                                            beforeSend: function () {
                                                                                                            },
                                                                                                            success: function (result) {

                                                                                                                XCCPDensity = parseFloat(result.density);
                                                                                                                XCCPThkMin = parseFloat(result.thkMin);
                                                                                                                XCCPThkMax = parseFloat(result.thkMax);

                                                                                                                if (XCCPNameVal === "Q235B" || XCCPNameVal === "Q235C") {
                                                                                                                    XCCPThkMax = 200;
                                                                                                                }

                                                                                                                // 名义厚度
                                                                                                                if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) > XCCPThkMin
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) <= XCCPThkMax) {
                                                                                                                    let XCCTHKPN = parseFloat(rows[21][columns[0][1].field]);

                                                                                                                    // Sketch
                                                                                                                    if (currentTabIndex === 0) {
                                                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN);
                                                                                                                        xccSketch.off("resize").on("resize", function () {
                                                                                                                            if ($("#xcc").length > 0) {
                                                                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN);
                                                                                                                            }
                                                                                                                        });
                                                                                                                    }
                                                                                                                    xccd2d3.tabs({
                                                                                                                        onSelect: function (title, index) {
                                                                                                                            if (index === 0) {
                                                                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN);
                                                                                                                                xccSketch.off("resize").on("resize", function () {
                                                                                                                                    if ($("#xcc").length > 0) {
                                                                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN);
                                                                                                                                    }
                                                                                                                                });
                                                                                                                            }
                                                                                                                        }
                                                                                                                    });

                                                                                                                    // ajax 获取常温屈服强度、厚度负偏差
                                                                                                                    let XCCPTestRel,
                                                                                                                        XCCCP1;
                                                                                                                    $.ajax({
                                                                                                                        type: "POST",
                                                                                                                        contentType: "application/json; charset=utf-8",
                                                                                                                        url: "web_get_gbt_150_2011_com_property.action",
                                                                                                                        async: true,
                                                                                                                        dataType: "json",
                                                                                                                        data: JSON.stringify({
                                                                                                                            "category": XCCPCategoryVal,
                                                                                                                            "type": XCCPTypeVal,
                                                                                                                            "std": XCCPSTDVal,
                                                                                                                            "name": XCCPNameVal,
                                                                                                                            "thk": XCCTHKPN,
                                                                                                                            "temp": XCCDT,
                                                                                                                            "highLow": 3,
                                                                                                                            "isTube": 0,
                                                                                                                            "od": 100000
                                                                                                                        }),
                                                                                                                        beforeSend: function () {
                                                                                                                        },
                                                                                                                        success: function (result) {

                                                                                                                            XCCPTestRel = parseFloat(result.rel);
                                                                                                                            if (XCCPTestRel < 0) {
                                                                                                                                south.html("查询材料常温屈服强度失败！").css("color", "red");
                                                                                                                                return false;
                                                                                                                            }
                                                                                                                            XCCCP1 = parseFloat(result.c1);
                                                                                                                            if (XCCCP1 < 0) {
                                                                                                                                south.html("查询材料厚度负偏差失败！").css("color", "red");
                                                                                                                                return false;
                                                                                                                            }

                                                                                                                            // 宽度 HP
                                                                                                                            if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                                                                                                && parseFloat(rows[22][columns[0][1].field]) > (XCCHD + 2 * XCCA)) {
                                                                                                                                let XCCHP = parseFloat(rows[22][columns[0][1].field]);

                                                                                                                                // Sketch
                                                                                                                                if (currentTabIndex === 0) {
                                                                                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN, XCCHP);
                                                                                                                                    xccSketch.off("resize").on("resize", function () {
                                                                                                                                        if ($("#xcc").length > 0) {
                                                                                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN, XCCHP);
                                                                                                                                        }
                                                                                                                                    });
                                                                                                                                }
                                                                                                                                xccd2d3.tabs({
                                                                                                                                    onSelect: function (title, index) {
                                                                                                                                        if (index === 0) {
                                                                                                                                            xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN, XCCHP);
                                                                                                                                            xccSketch.off("resize").on("resize", function () {
                                                                                                                                                if ($("#xcc").length > 0) {
                                                                                                                                                    xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN, XCCHP);
                                                                                                                                                }
                                                                                                                                            });
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                });

                                                                                                                                // 高度 LP
                                                                                                                                if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                                                                                    && parseFloat(rows[23][columns[0][1].field]) > (XCCFD / 2 + XCCLD + XCCGD)) {
                                                                                                                                    let XCCLP = parseFloat(rows[23][columns[0][1].field]);

                                                                                                                                    // Sketch
                                                                                                                                    if (currentTabIndex === 0) {
                                                                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN, XCCHP, XCCLP);
                                                                                                                                        xccSketch.off("resize").on("resize", function () {
                                                                                                                                            if ($("#xcc").length > 0) {
                                                                                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN, XCCHP, XCCLP);
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                    }
                                                                                                                                    xccd2d3.tabs({
                                                                                                                                        onSelect: function (title, index) {
                                                                                                                                            if (index === 0) {
                                                                                                                                                xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN, XCCHP, XCCLP);
                                                                                                                                                xccSketch.off("resize").on("resize", function () {
                                                                                                                                                    if ($("#xcc").length > 0) {
                                                                                                                                                        xcc2d(XCCTHKDN, "ϕ" + XCCDD, XCCHD, XCCLD, XCCGD, XCCFD, XCCA, "R" + XCCRD, XCCTHKCN, "ϕ" + XCCDC, XCCTHKPN, XCCHP, XCCLP);
                                                                                                                                                    }
                                                                                                                                                });
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    });

                                                                                                                                    // 腐蚀裕量 cp2
                                                                                                                                    if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[24][columns[0][1].field]) < XCCTHKPN) {
                                                                                                                                        let XCCCP2 = parseFloat(rows[24][columns[0][1].field]);

                                                                                                                                        // 吊重 mass
                                                                                                                                        if (!jQuery.isEmptyObject(rows[25][columns[0][1].field])) {
                                                                                                                                            let XCCMASS = parseFloat(rows[25][columns[0][1].field]);

                                                                                                                                            // 吊耳板过程参数
                                                                                                                                            let XCCCD = XCCCD1 + XCCCD2;
                                                                                                                                            let XCCTHKDE = XCCTHKDN - XCCCD;
                                                                                                                                            let XCCODALLOW = XCCDTestRel / 1.6;
                                                                                                                                            let XCCTDALLOW = XCCODALLOW * 0.6;

                                                                                                                                            // 衬板过程参数
                                                                                                                                            let XCCCC = XCCCC1 + XCCCC2;
                                                                                                                                            let XCCTHKCE = XCCTHKCN - XCCCC;
                                                                                                                                            let XCCOCALLOW = XCCCTestRel / 1.6;
                                                                                                                                            let XCCTCALLOW = XCCOCALLOW * 0.6;

                                                                                                                                            // 垫板过程参数
                                                                                                                                            let XCCCP = XCCCP1 + XCCCP2;
                                                                                                                                            let XCCTHKPE = XCCTHKPN - XCCCP;
                                                                                                                                            let XCCOPALLOW = XCCPTestRel / 1.6;
                                                                                                                                            let XCCTPALLOW = XCCOPALLOW * 0.6;

                                                                                                                                            // K
                                                                                                                                            let XCCK = 1.65;

                                                                                                                                            // FV
                                                                                                                                            let XCCFV = XCCMASS * 9.81 * XCCK;

                                                                                                                                            // OLALLOW
                                                                                                                                            let XCCOLALLOW = Math.min(XCCODALLOW, XCCOCALLOW);
                                                                                                                                            south.html(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "A-A 截面许用拉应力：" + XCCOLALLOW.toFixed(4) + " MPa" +
                                                                                                                                                "</span>");

                                                                                                                                            // OL
                                                                                                                                            let XCCOL = XCCFV / (XCCTHKDE * (XCCHD - XCCDD) + 2 * XCCTHKCE * (XCCDC - XCCDD));
                                                                                                                                            let XCCOLCHK;
                                                                                                                                            if (XCCOL <= XCCOLALLOW) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际拉应力：" + XCCOL.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                XCCOLCHK = "合格";
                                                                                                                                            } else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际拉应力：" + XCCOL.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                XCCOLCHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // TLALLOW
                                                                                                                                            let XCCTLALLOW = Math.min(XCCTDALLOW, XCCTCALLOW);
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "B-B 截面许用剪应力：" + XCCTLALLOW.toFixed(4) + " MPa" +
                                                                                                                                                "</span>");

                                                                                                                                            // TL
                                                                                                                                            let XCCTL = XCCOL;
                                                                                                                                            let XCCTLCHK;
                                                                                                                                            if (XCCTL <= XCCTLALLOW) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际剪应力：" + XCCTL.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                XCCTLCHK = "合格";
                                                                                                                                            } else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际剪应力：" + XCCTL.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                XCCTLCHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // E
                                                                                                                                            let XCCE = 0.7;

                                                                                                                                            // TWALLOW
                                                                                                                                            let XCCTWALLOW = XCCE * Math.min(XCCTDALLOW, XCCTPALLOW);
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "吊耳焊缝许用剪应力：" + XCCTWALLOW.toFixed(4) + " MPa" +
                                                                                                                                                "</span>");

                                                                                                                                            // TW
                                                                                                                                            let XCCTW = XCCFV / (0.707 * XCCA * (2 * (XCCLP - XCCGD + XCCLD) + (0.5 * Math.PI - 1) * XCCFD + XCCHD + (2 * Math.PI - 8) * XCCRD));
                                                                                                                                            let XCCTWCHK;
                                                                                                                                            if (XCCTW <= XCCTWALLOW) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际剪应力：" + XCCTW.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                XCCTWCHK = "合格";
                                                                                                                                            } else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际剪应力：" + XCCTW.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                XCCTWCHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // TBALLOW
                                                                                                                                            let XCCTBALLOW = XCCE * XCCTDALLOW;
                                                                                                                                            south.append(
                                                                                                                                                "<span style='color:#444444;'>" +
                                                                                                                                                "&ensp;|&ensp;" +
                                                                                                                                                "垫板焊缝许用剪应力：" + XCCTBALLOW.toFixed(4) + " MPa" +
                                                                                                                                                "</span>");

                                                                                                                                            // TB
                                                                                                                                            let XCCTB = XCCFV / (0.707 * 0.8 * XCCTHKPE * (2 * (XCCHP + XCCLP) - 8 * 20 + 40 * Math.PI));
                                                                                                                                            let XCCTBCHK;
                                                                                                                                            if (XCCTB <= XCCTBALLOW) {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:#444444;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际剪应力：" + XCCTB.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                XCCTBCHK = "合格";
                                                                                                                                            } else {
                                                                                                                                                south.append(
                                                                                                                                                    "<span style='color:red;'>" +
                                                                                                                                                    "&ensp;|&ensp;" +
                                                                                                                                                    "实际剪应力：" + XCCTB.toFixed(4) + " MPa" +
                                                                                                                                                    "</span>");
                                                                                                                                                XCCTBCHK = "不合格";
                                                                                                                                            }

                                                                                                                                            // docx
                                                                                                                                            let XCCPayJS = $('#payjs');

                                                                                                                                            function getDocx() {
                                                                                                                                                $.ajax({
                                                                                                                                                    type: "POST",
                                                                                                                                                    contentType: "application/json; charset=utf-8",
                                                                                                                                                    url: "xccdocx.action",
                                                                                                                                                    async: true,
                                                                                                                                                    dataType: "json",
                                                                                                                                                    data: JSON.stringify({
                                                                                                                                                        ribbonName: "XCC",

                                                                                                                                                        dstd: XCCDSTDVal,
                                                                                                                                                        dname: XCCDNameVal,
                                                                                                                                                        thkdn: XCCTHKDN,
                                                                                                                                                        dd: XCCDD,
                                                                                                                                                        hd: XCCHD,
                                                                                                                                                        ld: XCCLD,
                                                                                                                                                        gd: XCCGD,
                                                                                                                                                        fd: XCCFD,
                                                                                                                                                        a: XCCA,
                                                                                                                                                        rd: XCCRD,
                                                                                                                                                        cd2: XCCCD2,
                                                                                                                                                        cstd: XCCDSTDVal,
                                                                                                                                                        cname: XCCDNameVal,
                                                                                                                                                        thkcn: XCCTHKCN,
                                                                                                                                                        dc: XCCDC,
                                                                                                                                                        cc2: XCCCC2,
                                                                                                                                                        pstd: XCCPSTDVal,
                                                                                                                                                        pname: XCCPNameVal,
                                                                                                                                                        thkpn: XCCTHKPN,
                                                                                                                                                        hp: XCCHP,
                                                                                                                                                        lp: XCCLP,
                                                                                                                                                        cp2: XCCCP2,
                                                                                                                                                        m: XCCMASS,
                                                                                                                                                        densityd: XCCDDensity.toFixed(4),
                                                                                                                                                        densityc: XCCDDensity.toFixed(4),
                                                                                                                                                        rdel: XCCDTestRel.toFixed(4),
                                                                                                                                                        rcel: XCCDTestRel.toFixed(4),
                                                                                                                                                        cd1: XCCCD1.toFixed(4),
                                                                                                                                                        cc1: XCCCC1.toFixed(4),
                                                                                                                                                        densityp: XCCPDensity.toFixed(4),
                                                                                                                                                        rpel: XCCPTestRel.toFixed(4),
                                                                                                                                                        cp1: XCCCP1.toFixed(4),
                                                                                                                                                        cd: XCCCD.toFixed(4),
                                                                                                                                                        thkde: XCCTHKDE.toFixed(4),
                                                                                                                                                        od: XCCODALLOW.toFixed(4),
                                                                                                                                                        td: XCCTDALLOW.toFixed(4),
                                                                                                                                                        cc: XCCCC.toFixed(4),
                                                                                                                                                        thkce: XCCTHKCE.toFixed(4),
                                                                                                                                                        oc: XCCOCALLOW.toFixed(4),
                                                                                                                                                        tc: XCCTCALLOW.toFixed(4),
                                                                                                                                                        cp: XCCCP.toFixed(4),
                                                                                                                                                        thkpe: XCCTHKPE.toFixed(4),
                                                                                                                                                        op: XCCOPALLOW.toFixed(4),
                                                                                                                                                        tp: XCCTPALLOW.toFixed(4),
                                                                                                                                                        k: XCCK.toFixed(4),
                                                                                                                                                        fv: XCCFV.toFixed(4),
                                                                                                                                                        ol: XCCOL.toFixed(4),
                                                                                                                                                        olallow: XCCOLALLOW.toFixed(4),
                                                                                                                                                        olchk: XCCOLCHK,
                                                                                                                                                        tl: XCCTL.toFixed(4),
                                                                                                                                                        tlallow: XCCTLALLOW.toFixed(4),
                                                                                                                                                        tlchk: XCCTLCHK,
                                                                                                                                                        e: XCCE.toFixed(4),
                                                                                                                                                        tw: XCCTW.toFixed(4),
                                                                                                                                                        twallow: XCCTWALLOW.toFixed(4),
                                                                                                                                                        twchk: XCCTWCHK,
                                                                                                                                                        tb: XCCTB.toFixed(4),
                                                                                                                                                        tballow: XCCTBALLOW.toFixed(4),
                                                                                                                                                        tbchk: XCCTBCHK
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
                                                                                                                                                            XCCPayJS.dialog({
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
                                                                                                                                                                        XCCPayJS.dialog("close");
                                                                                                                                                                        XCCPayJS.dialog("clear");
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
                                                                                                                                                                                    XCCPayJS.dialog('refresh', '/static/payjs/payjs_success.html');

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
                                                                                                                                                                                            XCCPayJS.dialog('close');
                                                                                                                                                                                            XCCPayJS.dialog('clear');
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
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                    else if (!jQuery.isEmptyObject(rows[24][columns[0][1].field])
                                                                                                                                        && parseFloat(rows[24][columns[0][1].field]) >= XCCTHKPN) {
                                                                                                                                        south.html("垫板腐蚀裕量不能大于等于 " + XCCTHKPN + " mm").css("color", "red");
                                                                                                                                    }
                                                                                                                                }
                                                                                                                                else if (!jQuery.isEmptyObject(rows[23][columns[0][1].field])
                                                                                                                                    && parseFloat(rows[23][columns[0][1].field]) <= (XCCFD / 2 + XCCLD + XCCGD)) {
                                                                                                                                    south.html("垫板高度不能小于等于 " + (XCCFD / 2 + XCCLD + XCCGD) + " mm").css("color", "red");
                                                                                                                                }
                                                                                                                            }
                                                                                                                            else if (!jQuery.isEmptyObject(rows[22][columns[0][1].field])
                                                                                                                                && parseFloat(rows[22][columns[0][1].field]) <= (XCCHD + 2 * XCCA)) {
                                                                                                                                south.html("垫板宽度不能小于等于 " + (XCCHD + 2 * XCCA) + " mm").css("color", "red");
                                                                                                                            }
                                                                                                                        },
                                                                                                                        error: function () {
                                                                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                                "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                                else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) <= XCCPThkMin) {
                                                                                                                    south.html("垫板厚度不能小于等于 " + XCCPThkMin + " mm").css("color", "red");
                                                                                                                }
                                                                                                                else if (!jQuery.isEmptyObject(rows[21][columns[0][1].field])
                                                                                                                    && parseFloat(rows[21][columns[0][1].field]) > XCCPThkMax) {
                                                                                                                    south.html("垫板厚度不能大于 " + XCCPThkMax + " mm").css("color", "red");
                                                                                                                }
                                                                                                            },
                                                                                                            error: function () {
                                                                                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                                    "<span style='color:red;'>&ensp;材料物理性质获取失败，请检查网络后重试</span>");
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                }
                                                                                                else if (!jQuery.isEmptyObject(rows[16][columns[0][1].field])
                                                                                                    && parseFloat(rows[16][columns[0][1].field]) >= XCCTHKCN) {
                                                                                                    south.html("衬板腐蚀裕量不能大于等于 " + XCCTHKCN + " mm").css("color", "red");
                                                                                                }
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                                                                && parseFloat(rows[15][columns[0][1].field]) <= XCCDD) {
                                                                                                south.html("衬板外直径不能小于等于 " + XCCDD + " mm").css("color", "red");
                                                                                            }
                                                                                            else if (!jQuery.isEmptyObject(rows[15][columns[0][1].field])
                                                                                                && parseFloat(rows[15][columns[0][1].field]) > XCCHD) {
                                                                                                south.html("衬板外直径不能大于 " + XCCHD + " mm").css("color", "red");
                                                                                            }
                                                                                        },
                                                                                        error: function () {
                                                                                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                                                                "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                                                    && parseFloat(rows[14][columns[0][1].field]) <= XCCDThkMin) {
                                                                                    south.html("衬板厚度不能小于等于 " + XCCDThkMin + " mm").css("color", "red");
                                                                                }
                                                                                else if (!jQuery.isEmptyObject(rows[14][columns[0][1].field])
                                                                                    && parseFloat(rows[14][columns[0][1].field]) > XCCDThkMax) {
                                                                                    south.html("衬板厚度不能大于 " + XCCDThkMax + " mm").css("color", "red");
                                                                                }
                                                                            }
                                                                            else if (!jQuery.isEmptyObject(rows[13][columns[0][1].field])
                                                                                && parseFloat(rows[13][columns[0][1].field]) >= XCCTHKDN) {
                                                                                south.html("吊耳板腐蚀裕量不能大于等于 " + XCCTHKDN + " mm").css("color", "red");
                                                                            }
                                                                        }
                                                                        else if (!jQuery.isEmptyObject(rows[12][columns[0][1].field])
                                                                            && parseFloat(rows[12][columns[0][1].field]) > Math.min((XCCHD - XCCFD) / 4, XCCLD)) {
                                                                            south.html("吊耳板圆角半径 rd 不能大于 " + Math.min((XCCHD - XCCFD) / 4, XCCLD) + " mm").css("color", "red");
                                                                        }
                                                                    }
                                                                    else if (!jQuery.isEmptyObject(rows[11][columns[0][1].field])
                                                                        && parseFloat(rows[11][columns[0][1].field]) > Math.min(XCCTHKDN, XCCGD, XCCFD / 2)) {
                                                                        south.html("吊耳板焊缝角高 a 不能大于 " + Math.min(XCCTHKDN, XCCGD, XCCFD / 2) + " mm").css("color", "red");
                                                                    }
                                                                }
                                                                else if (!jQuery.isEmptyObject(rows[10][columns[0][1].field])
                                                                    && parseFloat(rows[10][columns[0][1].field]) >= XCCHD) {
                                                                    south.html("吊耳板尺寸 Fd 不能大于等于 " + XCCHD + " mm").css("color", "red");
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else if (!jQuery.isEmptyObject(rows[7][columns[0][1].field])
                                                        && parseFloat(rows[7][columns[0][1].field]) <= XCCDD) {
                                                        south.html("吊耳板宽度 Hd 不能小于等于 " + XCCDD + " mm").css("color", "red");
                                                    }
                                                }
                                            },
                                            error: function () {
                                                south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                                    "<span style='color:red;'>&ensp;材料力学特性获取失败，请检查网络后重试</span>");
                                            }
                                        });
                                    }
                                    else if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) <= XCCDThkMin) {
                                        south.html("吊耳板厚度不能小于等于 " + XCCDThkMin + " mm").css("color", "red");
                                    }
                                    else if (!jQuery.isEmptyObject(rows[5][columns[0][1].field])
                                        && parseFloat(rows[5][columns[0][1].field]) > XCCDThkMax) {
                                        south.html("吊耳板厚度不能大于 " + XCCDThkMax + " mm").css("color", "red");
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
            },
            onLoadSuccess: function () {
                $("#cal").mCustomScrollbar({theme: "minimal-dark"});
                // 获取 category 列表
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: "web_list_gbt_150_2011_category.action",
                    async: false,
                    dataType: "json",
                    data: JSON.stringify({
                        temp: XCCDT
                    }),
                    beforeSend: function () {
                    },
                    success: function (result) {
                        XCCDCategory = [];
                        XCCPCategory = [];
                        if (result.length <= 0) {
                            south.html("<i class='fa fa-exclamation-triangle' style='color:red;'></i>" +
                                "&ensp;" + "<span style='color:red;'>" + XCCDT + "</span>" +
                                "<span style='color:red;'>&ensp;℃ 下没有可用材料！</span>");
                        }
                        else {
                            $(result).each(function (index, element) {
                                XCCDCategory[index] = {
                                    "value": element,
                                    "text": element
                                };
                                XCCPCategory[index] = {
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
        });
    });
});